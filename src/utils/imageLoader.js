// Centralized image loading with error handling
class ImageLoader {
  constructor() {
    this.images = {};
    this.loadPromises = new Map();
  }

  async loadImage(id, src, fallbackSrc = null) {
    if (this.images[id]) {
      return this.images[id];
    }

    if (this.loadPromises.has(id)) {
      return this.loadPromises.get(id);
    }

    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.images[id] = src;
        resolve(src);
      };
      
      img.onerror = () => {
        if (fallbackSrc) {
          const fallbackImg = new Image();
          fallbackImg.onload = () => {
            this.images[id] = fallbackSrc;
            resolve(fallbackSrc);
          };
          fallbackImg.onerror = () => reject(new Error(`Failed to load image: ${id}`));
          fallbackImg.src = fallbackSrc;
        } else {
          reject(new Error(`Failed to load image: ${id}`));
        }
      };
      
      img.src = src;
    });

    this.loadPromises.set(id, promise);
    return promise;
  }

  async loadImagesFromConfig(config) {
    const loadPromises = Object.entries(config).map(([id, src]) => 
      this.loadImage(id, src).catch(error => {
        console.warn(`Failed to load image ${id}:`, error);
        return null;
      })
    );

    await Promise.allSettled(loadPromises);
  }

  getImageSrc(id) {
    return this.images[id] || null;
  }
}

export default new ImageLoader();