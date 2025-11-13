// ===== FIXED HERO SLIDER =====
function initHeroSlider() {
  const slides = document.querySelectorAll(".slide");
  const progressBar = document.querySelector(".progress-bar");

  if (slides.length === 0) {
    console.log("❌ No slides found");
    document.querySelector(".hero").style.background =
      "linear-gradient(135deg, #2c2c2c 0%, #5d5d5d 100%)";
    return;
  }

  let currentSlide = 0;
  let slideInterval;
  let isAnimating = false;

  console.log(`🎯 Found ${slides.length} slides`);

  function preloadImages() {
    slides.forEach((slide, index) => {
      const img = new Image();
      img.src = slide.src;
      img.onload = () => {
        console.log(`✅ Slide ${index + 1} loaded: ${slide.src}`);
        slide.style.opacity = "0";
      };
      img.onerror = () => {
        console.log(`❌ Failed to load slide ${index + 1}: ${slide.src}`);
        slide.style.display = "none";
      };
    });
  }

  function showSlide(index) {
    if (isAnimating) return;

    isAnimating = true;

    slides.forEach((slide) => {
      slide.style.opacity = "0";
      slide.classList.remove("active");
    });

    slides[index].style.opacity = "1";
    slides[index].classList.add("active");

    currentSlide = index;
    resetProgressBar();

    setTimeout(() => {
      isAnimating = false;
    }, 1500);
  }

  function resetProgressBar() {
    if (!progressBar) return;

    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
    void progressBar.offsetWidth;
    progressBar.style.transition = "width 5s linear";
    progressBar.style.width = "100%";
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  const slider = document.querySelector(".slider");
  if (slider) {
    slider.addEventListener("mouseenter", stopAutoSlide);
    slider.addEventListener("mouseleave", startAutoSlide);
    slider.addEventListener("touchstart", stopAutoSlide);
    slider.addEventListener("touchend", startAutoSlide);
  }

  preloadImages();

  setTimeout(() => {
    showSlide(0);
    startAutoSlide();
    console.log("✅ Hero slider initialized");
  }, 500);
}

// ===== FIXED QURAN ANIMATION - NO HORIZONTAL SCROLL =====
function initQuranAnimation() {
  const quranSection = document.querySelector(".quran-split");
  const splitLeft = document.querySelector(".split-left");
  const splitRight = document.querySelector(".split-right");
  const initialText = document.querySelector(".initial-text-cover");
  const glassCard = document.querySelector(".glass-card");

  if (!quranSection || !splitLeft || !splitRight) {
    console.log("❌ Quran section elements not found");
    return;
  }

  console.log("🎯 Initializing Quran animation - Fixed version");

  // ⚠️ FIX: Prevent horizontal scroll
  gsap.set(quranSection, { overflow: "hidden" });
  gsap.set([splitLeft, splitRight], {
    x: "0%",
    width: "50%",
  });

  gsap.set(initialText, { opacity: 1 });
  gsap.set(glassCard, { opacity: 0, scale: 0.8 });

  // ⚠️ FIX: Safe animation without horizontal overflow
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: quranSection,
      start: "top 70%",
      end: "top 10%",
      scrub: 1,
      markers: false,
      id: "quran-split-fixed",
    },
  });

  tl.to(splitLeft, {
    x: "-100%",
    duration: 1.5,
    ease: "power2.out",
  })
    .to(
      splitRight,
      {
        x: "100%",
        duration: 1.5,
        ease: "power2.out",
      },
      0
    )
    .to(
      initialText,
      {
        opacity: 0,
        duration: 0.5,
      },
      0.5
    )
    .to(
      glassCard,
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
      },
      0.8
    );

  console.log("✅ Quran animation fixed - no horizontal scroll");
}

// ===== WEDDING GIFT TOGGLE =====
function initGiftToggle() {
  const showCardsBtn = document.getElementById("show-cards");
  const cardContainer = document.getElementById("card-container");

  if (!showCardsBtn || !cardContainer) {
    console.log("❌ Gift toggle elements not found");
    return;
  }

  cardContainer.style.display = "none";
  cardContainer.style.opacity = "0";
  cardContainer.style.transform = "translateY(20px)";

  showCardsBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const isVisible = cardContainer.style.display === "grid";

    if (isVisible) {
      gsap.to(cardContainer, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
          cardContainer.style.display = "none";
        },
      });
    } else {
      cardContainer.style.display = "grid";

      gsap.fromTo(
        cardContainer,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.2)" }
      );

      setTimeout(() => {
        cardContainer.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
    }

    feather.replace();
  });
}

// ===== COPY FUNCTIONS =====
function initCopyFunctions() {
  const btnUtsman = document.querySelector('.salin[onclick="noUtsman()"]');
  if (btnUtsman) {
    btnUtsman.addEventListener("click", noUtsman);
  }

  const btnYani = document.querySelector('.salin[onclick="noYani()"]');
  if (btnYani) {
    btnYani.addEventListener("click", noYani);
  }
}

function noUtsman() {
  copyToClipboard("0821-2087-7636", "Utsman");
}

function noYani() {
  copyToClipboard("0813-1981-7474", "Yani Mulyani");
}

function copyToClipboard(text, name) {
  const cleanText = text.replace(/-/g, "");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(cleanText)
      .then(() => {
        showSuccessMessage(name);
      })
      .catch((err) => {
        fallbackCopy(cleanText, name);
      });
  } else {
    fallbackCopy(cleanText, name);
  }
}

function fallbackCopy(text, name) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    if (successful) {
      showSuccessMessage(name);
    } else {
      showManualCopy(text, name);
    }
  } catch (err) {
    document.body.removeChild(textArea);
    showManualCopy(text, name);
  }
}

function showSuccessMessage(name) {
  if (typeof Swal !== "undefined") {
    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: `Nomor DANA ${name} disalin`,
      timer: 2000,
      showConfirmButton: false,
    });
  } else if (typeof toastr !== "undefined") {
    toastr.success(`Nomor DANA ${name} berhasil disalin!`);
  } else {
    alert(`Nomor DANA ${name} berhasil disalin!`);
  }
}

function showManualCopy(text, name) {
  if (typeof Swal !== "undefined") {
    Swal.fire({
      icon: "info",
      title: "Salin Manual",
      html: `Nomor DANA ${name}:<br><strong style="font-size: 1.5em;">${text}</strong>`,
      confirmButtonText: "Oke",
    });
  } else {
    prompt(`Salin nomor DANA ${name}:`, text);
  }
}

// ===== MAIN INITIALIZATION =====
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Starting website initialization...");

  try {
    // Initialize core features
    initHeroSlider();

    // Initialize GSAP animations
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      initQuranAnimation(); // ✅ Gunakan versi fixed
    }

    // Initialize other features
    initGiftToggle();
    initCopyFunctions();

    // Initialize countdown jika ada
    if (typeof initCountdown === "function") {
      initCountdown();
    }

    // Feather Icons
    if (typeof feather !== "undefined") {
      feather.replace();
    }

    // AOS Initialization
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 1200,
        once: true,
        offset: 50,
      });
    }

    console.log("✅ All features initialized successfully");
  } catch (error) {
    console.error("❌ Initialization error:", error);
  }
});

window.addEventListener("load", function () {
  setTimeout(() => {
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  }, 1000);
});

// Export functions
window.initHeroSlider = initHeroSlider;
window.initQuranAnimation = initQuranAnimation;
window.noUtsman = noUtsman;
window.noYani = noYani;
