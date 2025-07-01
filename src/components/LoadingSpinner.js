// Reusable loading component
export class LoadingSpinner {
  constructor(container, message = 'Loading...') {
    this.container = container;
    this.message = message;
    this.element = null;
  }

  show() {
    if (this.element) return;

    this.element = document.createElement('div');
    this.element.className = 'loading-spinner';
    this.element.innerHTML = `
      <div class="spinner-animation"></div>
      <p class="spinner-message">${this.message}</p>
    `;

    // Add CSS if not already present
    if (!document.querySelector('#loading-spinner-styles')) {
      const style = document.createElement('style');
      style.id = 'loading-spinner-styles';
      style.textContent = `
        .loading-spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.8);
          padding: 20px;
          border-radius: 8px;
          border: 2px solid #00ff00;
        }
        
        .spinner-animation {
          width: 40px;
          height: 40px;
          border: 4px solid #333;
          border-top: 4px solid #00ff00;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 10px;
        }
        
        .spinner-message {
          color: #00ff00;
          font-family: 'Creepster', cursive;
          margin: 0;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    this.container.appendChild(this.element);
  }

  hide() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }

  updateMessage(message) {
    if (this.element) {
      const messageEl = this.element.querySelector('.spinner-message');
      if (messageEl) {
        messageEl.textContent = message;
      }
    }
  }
}