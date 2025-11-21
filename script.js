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
            // Si solo quieres que aparezcan una vez:
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
    // Fallback simple
    revealElements.forEach((el) => el.classList.add("visible"));
  }
  
  // Efecto parallax ligero en la tarjeta de preview del hero
  const parallaxTarget = document.querySelector(".parallax-target .hero-preview-main");
  
  if (parallaxTarget) {
    const maxRotate = 6; // grados máximos
    const maxTranslate = 12; // px máximos
  
    parallaxTarget.addEventListener("mousemove", (e) => {
      const rect = parallaxTarget.getBoundingClientRect();
      const x = e.clientX - rect.left; // posición dentro del elemento
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
  