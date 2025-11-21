// Scroll suave para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Animación de aparición (scroll reveal) con IntersectionObserver
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

// Efecto parallax ligero en la tarjeta de preview del hero
const parallaxTarget = document.querySelector(
  ".parallax-target .hero-preview-main"
);

if (parallaxTarget) {
  const maxRotate = 6; // grados máximos
  const maxTranslate = 12; // px máximos

  parallaxTarget.addEventListener("mousemove", (e) => {
    const rect = parallaxTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    const rotateY = -percentX * maxRotate;
    const rotateX = percentY * maxRotate;
    const translateX = -percentX * maxTranslate;
    const translateY = -percentY * maxTranslate;

    parallaxTarget.style.transform = `
      translate3d(${translateX}px, ${translateY}px, 0)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  });

  parallaxTarget.addEventListener("mouseleave", () => {
    parallaxTarget.style.transform =
      "translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)";
  });
}

/* ============================
   REPRODUCTOR PARA MUESTRAS
   ============================ */

const videoModal = document.getElementById("video-modal");
const videoPlayer = document.getElementById("video-player");
const videoModalTitle = document.getElementById("video-modal-title");

function openVideoModal(src, title) {
  if (!videoModal || !videoPlayer) return;

  videoPlayer.pause();
  videoPlayer.src = src;
  videoPlayer.load();

  if (videoModalTitle) {
    videoModalTitle.textContent = title || "Reproducción de video";
  }

  videoModal.classList.add("open");
  videoModal.setAttribute("aria-hidden", "false");

  // Intentar reproducir automáticamente (algunos navegadores requerirán interacción)
  const playPromise = videoPlayer.play();
  if (playPromise && typeof playPromise.then === "function") {
    playPromise.catch(() => {
      // Si no puede auto-reproducir, no pasa nada: el usuario puede darle play.
    });
  }
}

function closeVideoModal() {
  if (!videoModal || !videoPlayer) return;

  videoPlayer.pause();
  videoPlayer.currentTime = 0;
  videoPlayer.removeAttribute("src");
  videoPlayer.load();

  videoModal.classList.remove("open");
  videoModal.setAttribute("aria-hidden", "true");
}

// Click en tarjetas de muestras
document.querySelectorAll(".muestra[data-video]").forEach((card) => {
  card.addEventListener("click", () => {
    const src = card.getAttribute("data-video");
    const titleElement = card.querySelector(".muestra-thumb");
    const title = titleElement ? titleElement.textContent.trim() : "";

    if (src) {
      openVideoModal(src, title);
    }
  });
});

// Cerrar modal (botón y fondo)
if (videoModal) {
  videoModal.addEventListener("click", (e) => {
    const closeAttr = e.target.getAttribute("data-modal-close");
    if (closeAttr !== null) {
      closeVideoModal();
    }
  });

  // Cerrar con ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && videoModal.classList.contains("open")) {
      closeVideoModal();
    }
  });
}
