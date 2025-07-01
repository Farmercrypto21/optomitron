// Centralized error handling
class ErrorHandler {
  constructor() {
    this.errorContainer = null;
    this.setupGlobalErrorHandling();
  }

  setupGlobalErrorHandling() {
    window.addEventListener('error', (event) => {
      this.logError('JavaScript Error', event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.logError('Unhandled Promise Rejection', event.reason);
    });
  }

  logError(type, error) {
    console.error(`[${type}]:`, error);
    
    // In development, show user-friendly error
    if (window.location.hostname === 'localhost') {
      this.showUserError(`${type}: ${error.message || error}`);
    }
  }

  showUserError(message, duration = 5000) {
    if (!this.errorContainer) {
      this.createErrorContainer();
    }

    const errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    errorEl.innerHTML = `
      <span class="error-icon">⚠️</span>
      <span class="error-text">${message}</span>
      <button class="error-close" onclick="this.parentElement.remove()">×</button>
    `;

    this.errorContainer.appendChild(errorEl);

    // Auto-remove after duration
    setTimeout(() => {
      if (errorEl.parentElement) {
        errorEl.remove();
      }
    }, duration);
  }

  createErrorContainer() {
    this.errorContainer = document.createElement('div');
    this.errorContainer.id = 'error-container';
    
    // Add CSS if not already present
    if (!document.querySelector('#error-handler-styles')) {
      const style = document.createElement('style');
      style.id = 'error-handler-styles';
      style.textContent = `
        #error-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 10000;
          max-width: 400px;
        }
        
        .error-message {
          background: rgba(255, 0, 0, 0.9);
          color: white;
          padding: 12px;
          margin-bottom: 10px;
          border-radius: 5px;
          border: 2px solid #ff0000;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: slideInError 0.3s ease-out;
        }
        
        .error-icon {
          font-size: 20px;
        }
        
        .error-text {
          flex: 1;
          font-family: monospace;
          font-size: 14px;
        }
        
        .error-close {
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          padding: 0;
          width: 20px;
          height: 20px;
        }
        
        @keyframes slideInError {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(this.errorContainer);
  }

  handleImageError(imageElement, fallbackSrc = null) {
    if (fallbackSrc) {
      imageElement.src = fallbackSrc;
    } else {
      imageElement.style.display = 'none';
      this.logError('Image Load Error', `Failed to load: ${imageElement.src}`);
    }
  }
}

export default new ErrorHandler();