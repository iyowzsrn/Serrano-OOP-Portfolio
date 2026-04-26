// Run everything after DOM loads
document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // Smooth scroll for nav
  // =========================
  const links = document.querySelectorAll('.menu a');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =========================
  // Active nav on scroll
  // =========================
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".menu a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  // =========================
  // Slideshow
  // =========================
  function showSlide(n, slideshow) {
    const slides = slideshow.querySelectorAll(".slide");
    const dots = slideshow.querySelectorAll(".dot");

    if (n >= slides.length) n = 0;
    if (n < 0) n = slides.length - 1;

    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slides[n].classList.add("active");
    if (dots[n]) dots[n].classList.add("active");

    slideshow.dataset.index = n;
  }

  function plusSlides(step, slideshowId) {
    const slideshow = document.getElementById(slideshowId);
    let index = parseInt(slideshow.dataset.index || 0, 10);
    showSlide(index + step, slideshow);
  }

  function currentSlide(n, slideshowId) {
    const slideshow = document.getElementById(slideshowId);
    showSlide(n, slideshow);
  }

  // Initialize slideshows
  document.querySelectorAll(".slideshow").forEach(slideshow => {
    slideshow.dataset.index = 0;
    showSlide(0, slideshow);

    // Attach controls
    slideshow.querySelectorAll(".prev").forEach(btn => {
      btn.addEventListener("click", () => plusSlides(-1, slideshow.id));
    });
    slideshow.querySelectorAll(".next").forEach(btn => {
      btn.addEventListener("click", () => plusSlides(1, slideshow.id));
    });
    slideshow.querySelectorAll(".dot").forEach((dot, i) => {
      dot.addEventListener("click", () => currentSlide(i, slideshow.id));
    });
    slideshow.querySelectorAll(".slide").forEach((img, i) => {
      img.addEventListener("click", () => openLightbox(slideshow, i));
    });
  });

  // =========================
  // QUIZ / SEATWORK TABS
  // =========================
  document.querySelectorAll(".tabs").forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll(".tab");
    const card = tabGroup.closest(".card.two-column");

    const leftContents = card.querySelectorAll(".card-left .tab-left");
    const rightContents = card.querySelectorAll(".card-right .tab-content");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-target");

        // deactivate all tabs
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        // deactivate all right reflections
        rightContents.forEach(c => c.classList.remove("active"));
        const right = card.querySelector("#" + target);
        if (right) right.classList.add("active");

        // deactivate all left columns
        leftContents.forEach(l => l.classList.remove("active"));
        const left = card.querySelector("#" + target + "-left");
        if (left) left.classList.add("active");
      });
    });
  });

});

// =========================
// LIGHTBOX
// =========================
function openLightbox(slideshow, index) {
  const slides = slideshow.querySelectorAll(".slide");
  let currentIndex = index;

  const lightbox = document.getElementById("lightbox");
  lightbox.innerHTML = "";

  const bigImg = document.createElement("img");
  bigImg.src = slides[currentIndex].src;

  const prevBtn = document.createElement("button");
  prevBtn.className = "nav-btn prev";
  prevBtn.innerHTML = "&#10094;";

  const nextBtn = document.createElement("button");
  nextBtn.className = "nav-btn next";
  nextBtn.innerHTML = "&#10095;";

  const dotsContainer = document.createElement("div");
  dotsContainer.className = "dots";
  const dots = [];

  slides.forEach((slide, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    if (i === currentIndex) dot.classList.add("active");
    dot.onclick = () => showImage(i);
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  function showImage(i) {
    currentIndex = (i + slides.length) % slides.length;
    bigImg.src = slides[currentIndex].src;
    dots.forEach(d => d.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  prevBtn.onclick = () => showImage(currentIndex - 1);
  nextBtn.onclick = () => showImage(currentIndex + 1);
  bigImg.onclick = () => lightbox.style.display = "none";

  lightbox.appendChild(bigImg);
  lightbox.appendChild(prevBtn);
  lightbox.appendChild(nextBtn);
  lightbox.appendChild(dotsContainer);

  lightbox.style.display = "flex";
}
