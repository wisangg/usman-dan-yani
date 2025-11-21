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

// ===== STAGGERED REVEAL UNTUK ELEMEN INDIVIDUAL =====
function triggerStaggeredReveal() {
  const elements = [
    { selector: ".surah-title", delay: 0 },
    { selector: ".divider", delay: 200 },
    { selector: ".arabic-text", delay: 400 },
    { selector: ".translation-text", delay: 600 },
    { selector: ".verse-meta", delay: 800 },
    { selector: ".quran-controls", delay: 1000 },
    { selector: ".quran-footer", delay: 1200 },
  ];

  elements.forEach((element) => {
    setTimeout(() => {
      const el = document.querySelector(element.selector);
      if (el) {
        el.classList.add("revealed");
      }
    }, element.delay);
  });

  console.log("✨ Staggered reveal triggered for Quran content");
}

// ===== 3D POP EFFECT UNTUK KONTEN =====
function init3DPopEffects() {
  // Efek glow yang dinamis untuk teks Arab
  gsap.to(".arabic-text", {
    textShadow:
      "0 0 25px rgba(201, 169, 110, 0.8), 0 0 50px rgba(201, 169, 110, 0.4)",
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // Efek subtle float untuk card aktif
  gsap.to(".verse-card.active", {
    y: -5,
    duration: 3,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
}

// ===== PARTICLE EFFECT UNTUK KONTEN QURAN =====
function initContentParticles() {
  const contentParticles = document.createElement("div");
  contentParticles.className = "content-particles";
  contentParticles.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;

  document.querySelector(".core-container").appendChild(contentParticles);

  // Buat partikel di sekitar konten Quran
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "content-particle";
    particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: var(--gold);
            border-radius: 50%;
            opacity: ${Math.random() * 0.4 + 0.1};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
    contentParticles.appendChild(particle);

    // Animasi partikel mengambang di sekitar konten
    gsap.to(particle, {
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 50,
      duration: Math.random() * 4 + 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }
}

// ===== QURAN SLIDER FUNCTIONALITY =====
function initQuranSlider() {
  const verseCards = document.querySelectorAll(".verse-card");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const quranContent = document.querySelector(".quran-content");

  if (!verseCards.length || !quranContent) {
    console.log("❌ Quran slider elements not found");
    return;
  }

  let currentSlide = 0;
  const totalSlides = verseCards.length;
  let autoSlideInterval;

  function showSlide(index) {
    // Remove active class from all slides and dots
    verseCards.forEach((card) => card.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Add active class to current slide and dot
    verseCards[index].classList.add("active");
    if (dots[index]) {
      dots[index].classList.add("active");
    }

    currentSlide = index;

    // Update Feather Icons
    if (typeof feather !== "undefined") {
      feather.replace();
    }
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    showSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prevIndex);
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 8000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Event Listeners
  if (nextBtn) {
    nextBtn.addEventListener("click", nextSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", prevSlide);
  }

  // Dot indicators
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });

  // Auto-slide
  startAutoSlide();

  // Pause on hover
  const verseSlider = document.querySelector(".verse-slider");
  if (verseSlider) {
    verseSlider.addEventListener("mouseenter", stopAutoSlide);
    verseSlider.addEventListener("mouseleave", startAutoSlide);
    verseSlider.addEventListener("touchstart", stopAutoSlide);
    verseSlider.addEventListener("touchend", startAutoSlide);
  }

  console.log("✅ Quran slider initialized with " + totalSlides + " verses");
}

// ===== ENHANCED QURAN ANIMATION - KONTEN MUNCUL SETELAH GATES =====
function initEnhancedQuranAnimation() {
  const quranSection = document.querySelector(".quran-section");
  const lockContainer = document.querySelector(".lock-container");
  const gateLeft = document.querySelector(".gate-left");
  const gateRight = document.querySelector(".gate-right");
  const coreContainer = document.querySelector(".core-container");
  const quranContent = document.querySelector(".quran-content");

  if (
    !quranSection ||
    !lockContainer ||
    !gateLeft ||
    !gateRight ||
    !coreContainer
  ) {
    console.log("❌ Quran section elements not found");
    return;
  }

  console.log("🎯 Initializing Quran Animation - Content Reveal After Gates");

  // Reset states
  gsap.set(lockContainer, { opacity: 1, scale: 1, y: 0, zIndex: 20 });
  gsap.set([gateLeft, gateRight], { x: "0%", zIndex: 15 });
  gsap.set(coreContainer, { opacity: 0, scale: 1, zIndex: 5 });
  gsap.set(quranContent, { opacity: 0, scale: 0.8, y: 50 });

  // Timeline utama
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: quranSection,
      start: "top 80%",
      end: "top 20%",
      scrub: 3,
      markers: false,
    },
  });

  // Phase 1: Lock animation
  tl.to(
    lockContainer,
    {
      duration: 4,
      opacity: 0,
      scale: 0.5,
      y: 50,
      ease: "power2.in",
    },
    0
  );

  // Phase 2: Gate animation (55%)
  tl.to(
    gateLeft,
    {
      duration: 6,
      x: "-55%",
      ease: "power2.out",
    },
    1
  ).to(
    gateRight,
    {
      duration: 6,
      x: "55%",
      ease: "power2.out",
      onComplete: function () {
        gsap.set([gateLeft, gateRight], { zIndex: 5 });
        console.log("🚪 Gates terbuka sepenuhnya - Memulai reveal konten");
      },
    },
    1
  );

  // Phase 3: Core container reveal SETELAH gates terbuka
  tl.to(
    coreContainer,
    {
      duration: 1,
      opacity: 1,
      ease: "power2.out",
      onComplete: function () {
        coreContainer.classList.add("revealed");
      },
    },
    3.5 // Start setelah gates selesai
  );

  // Phase 4: Quran content reveal dengan staggered effect
  tl.to(
    quranContent,
    {
      duration: 1.5,
      opacity: 1,
      scale: 1,
      y: 0,
      ease: "back.out(1.7)",
      onComplete: function () {
        quranContent.classList.add("revealed");

        // Trigger staggered reveal untuk elemen individual
        triggerStaggeredReveal();

        // Init efek tambahan
        init3DPopEffects();
        initContentParticles();

        // Init Quran slider
        setTimeout(() => {
          initQuranSlider();
        }, 1000);

        console.log("✨ Quran content fully revealed with staggered effects");
      },
    },
    4 // Start setelah core container
  );
}

// ===== FALLBACK ANIMATION (Jika GSAP tidak tersedia) =====
function initQuranFallback() {
  const quranSection = document.querySelector(".quran-section");
  const quranContent = document.querySelector(".quran-content");
  const gateLeft = document.querySelector(".gate-left");
  const gateRight = document.querySelector(".gate-right");
  const coreContainer = document.querySelector(".core-container");

  if (!quranSection || !quranContent) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          quranContent.classList.add("revealed");

          // Fallback: sembunyikan gates dan tampilkan content
          if (gateLeft && gateRight) {
            gateLeft.style.display = "none";
            gateRight.style.display = "none";
          }

          if (coreContainer) {
            coreContainer.style.opacity = "1";
            coreContainer.style.zIndex = "15";
          }

          // Trigger staggered reveal untuk fallback
          triggerStaggeredReveal();

          console.log("🎯 Quran section triggered (fallback)");

          // Initialize Quran slider
          setTimeout(() => {
            initQuranSlider();
          }, 500);
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  observer.observe(quranSection);
}

// ===== WEDDING GIFT TOGGLE =====
function initGiftToggle() {
  const showCardsBtn = document.getElementById("show-cards");
  const cardContainer = document.querySelector(".card-container");

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

    if (typeof feather !== "undefined") {
      feather.replace();
    }
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

// ===== PERFORMANCE OPTIMIZATIONS =====
function initPerformance() {
  // Handle resize events efficiently
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
        console.log("🔄 ScrollTrigger refreshed on resize");
      }
    }, 250);
  });

  // Handle image errors gracefully
  document.addEventListener(
    "error",
    function (e) {
      if (e.target.tagName === "IMG") {
        console.error("❌ Image failed to load:", e.target.src);
      }
    },
    true
  );
}

// ===== MAIN INITIALIZATION =====
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Starting website initialization...");

  try {
    // Initialize core features
    initHeroSlider();
    initPerformance();

    // Initialize GSAP animations dengan Quran animation baru
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      initEnhancedQuranAnimation();
      console.log("✅ GSAP ScrollTrigger Quran animation initialized");
    } else {
      console.log("⚠️ GSAP not available, using fallback animation");
      initQuranFallback();
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

    // Fallback initialization jika ada error
    initQuranFallback();
  }
});

// Handle window load untuk refresh ScrollTrigger
window.addEventListener("load", function () {
  setTimeout(() => {
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
      console.log("🔄 ScrollTrigger refreshed after page load");
    }

    // Re-initialize Feather Icons setelah semua konten dimuat
    if (typeof feather !== "undefined") {
      feather.replace();
    }
  }, 1000);
});

// Export functions untuk global access
window.initHeroSlider = initHeroSlider;
window.initEnhancedQuranAnimation = initEnhancedQuranAnimation;
window.initQuranSlider = initQuranSlider;
window.noUtsman = noUtsman;
window.noYani = noYani;
