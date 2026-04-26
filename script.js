const links = document.querySelectorAll('.menu a');

links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".menu a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;

    if (pageYOffset >= sectionTop) {
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

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".slideshow").forEach((slideshow) => {
    const slides = slideshow.querySelectorAll(".slide");
    const prev = slideshow.querySelector(".prev");
    const next = slideshow.querySelector(".next");
    const dotsContainer = slideshow.querySelector(".dots");

    let index = 0;

    // CREATE DOTS
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        showSlide(i);
      });

      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    function showSlide(i) {
      slides.forEach(slide => slide.classList.remove("active"));
      dots.forEach(dot => dot.classList.remove("active"));

      index = i;

      slides[index].classList.add("active");
      dots[index].classList.add("active");
    }

    next.addEventListener("click", () => {
      showSlide((index + 1) % slides.length);
    });

    prev.addEventListener("click", () => {
      showSlide((index - 1 + slides.length) % slides.length);
    });
  });
});

function openLightbox(img) {
  const slides = img.closest(".slides").querySelectorAll(".slide");
  let currentIndex = Array.from(slides).indexOf(img);

  let lightbox = document.getElementById("lightbox");
  lightbox.innerHTML = "";

  // Create big image
  const bigImg = document.createElement("img");
  bigImg.src = img.src;

  // Create prev/next buttons
  const prevBtn = document.createElement("button");
  prevBtn.className = "nav-btn prev";
  prevBtn.innerHTML = "&#10094;";

  const nextBtn = document.createElement("button");
  nextBtn.className = "nav-btn next";
  nextBtn.innerHTML = "&#10095;";

  // Show image at index
  function showImage(index) {
    currentIndex = (index + slides.length) % slides.length;
    bigImg.src = slides[currentIndex].src;
  }

  prevBtn.onclick = () => showImage(currentIndex - 1);
  nextBtn.onclick = () => showImage(currentIndex + 1);

  // Close lightbox when clicking the image
  bigImg.onclick = () => lightbox.style.display = "none";

  // Append everything
  lightbox.appendChild(bigImg);
  lightbox.appendChild(prevBtn);
  lightbox.appendChild(nextBtn);

  lightbox.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tabs").forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll(".tab");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        // remove active from all tabs in this group
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        // hide all tab-content in this card
        const cardRight = tabGroup.closest(".card-right");
        cardRight.querySelectorAll(".tab-content").forEach(content => {
          content.classList.remove("active");
        });

        // show the selected tab-content
        const targetId = tab.dataset.target;
        cardRight.querySelector("#" + targetId).classList.add("active");
      });
    });
  });
});