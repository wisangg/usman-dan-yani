// Gallery Functionality with Lightbox
class WeddingGallery {
  constructor() {
    this.galleryItems = document.querySelectorAll(".img-gallery a");
    this.init();
  }

  init() {
    this.addGalleryEvents();
    this.addHoverEffects();
  }

  addGalleryEvents() {
    this.galleryItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (!this.isLightboxAvailable()) {
          e.preventDefault();
          this.showImageModal(item.href, item.dataset.title);
        }
      });

      // Add loading animation
      const img = item.querySelector("img");
      if (img) {
        img.addEventListener("load", () => {
          item.classList.add("loaded");
        });
      }
    });
  }

  addHoverEffects() {
    this.galleryItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        item.style.transform = "translateY(-10px) scale(1.05)";
      });

      item.addEventListener("mouseleave", () => {
        item.style.transform = "translateY(0) scale(1)";
      });
    });
  }

  isLightboxAvailable() {
    return typeof lightbox !== "undefined";
  }

  showImageModal(imageSrc, caption) {
    // Fallback modal if lightbox not available
    const modal = document.createElement("div");
    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            cursor: pointer;
        `;

    const img = document.createElement("img");
    img.src = imageSrc;
    img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 15px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        `;

    if (caption) {
      const captionEl = document.createElement("div");
      captionEl.textContent = caption;
      captionEl.style.cssText = `
                position: absolute;
                bottom: 20px;
                color: white;
                text-align: center;
                width: 100%;
                padding: 10px;
            `;
      modal.appendChild(captionEl);
    }

    modal.appendChild(img);
    modal.addEventListener("click", () => document.body.removeChild(modal));
    document.body.appendChild(modal);
  }

  // Auto-play gallery highlights
  startGalleryHighlight() {
    let currentIndex = 0;

    setInterval(() => {
      this.galleryItems.forEach((item) => item.classList.remove("highlight"));

      if (this.galleryItems.length > 0) {
        this.galleryItems[currentIndex].classList.add("highlight");
        currentIndex = (currentIndex + 1) % this.galleryItems.length;
      }
    }, 3000);
  }
}

// Initialize gallery when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  new WeddingGallery();
});

// Add CSS for gallery effects
const galleryStyles = `
    .img-gallery a {
        transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
    }
    
    .img-gallery a.loaded img {
        opacity: 1 !important;
    }
    
    .img-gallery a.highlight {
        transform: translateY(-10px) scale(1.05) !important;
        box-shadow: 0 25px 50px rgba(139, 115, 85, 0.3) !important;
    }
    
    .wedding-day-message {
        text-align: center;
        padding: 40px;
        background: linear-gradient(135deg, #8B7355, #D4B996);
        color: white;
        border-radius: 20px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.2);
    }
    
    .wedding-day-message h3 {
        font-size: 2.5rem !important;
        margin-bottom: 1rem !important;
    }
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.textContent = galleryStyles;
document.head.appendChild(styleSheet);
