// main.js — slideshow + scroll reveal
document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------
  // SLIDESHOW COVERS
  // -----------------------------
  const slideshows = document.querySelectorAll(".slideshow");

  slideshows.forEach((el) => {
    const img = el.querySelector("img.thumb");
    if (!img) return;

    let images;
    try {
      const raw = el.getAttribute("data-images");
      images = raw ? JSON.parse(raw) : [];
    } catch {
      images = [];
    }

    if (!images || images.length === 0) return;

    const interval =
      parseInt(el.getAttribute("data-interval"), 10) || 3500;

    let index = 0;

    // Ensure first image is correct
    img.src = images[0];

    setInterval(() => {
      index = (index + 1) % images.length;
      const nextSrc = images[index];

      // Quick fade effect
      img.style.opacity = 0;
      setTimeout(() => {
        img.src = nextSrc;
        img.style.opacity = 1;
      }, 220);
    }, interval);
  });

  // -----------------------------
  // SCROLL REVEAL
  // -----------------------------
  const revealItems = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  revealItems.forEach((el) => observer.observe(el));
});


