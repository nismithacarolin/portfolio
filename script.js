const links = document.querySelectorAll("nav a");

links.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const id = this.getAttribute("href");
    const target = document.querySelector(id);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const heroVisual = document.querySelector(".hero-visual");
const cursorGlow = document.querySelector(".cursor-glow");
const particleField = document.getElementById("particleField");
const typingText = document.querySelector(".typing-text");

if (typingText) {
  const roles = ["Power Apps Developer", "Web Developer", "Python Enthusiast", "Frontend Developer"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentRole = roles[roleIndex];
    typingText.textContent = isDeleting
      ? currentRole.substring(0, charIndex - 1)
      : currentRole.substring(0, charIndex + 1);

    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

    if (!isDeleting && charIndex === currentRole.length) {
      setTimeout(typeLoop, 1400);
      isDeleting = true;
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    const speed = isDeleting ? 70 : 100;
    setTimeout(typeLoop, speed);
  }

  typeLoop();
}

if (particleField) {
  const particleCount = 24;

  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";

    const size = Math.random() * 5 + 2;
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const driftX = (Math.random() - 0.5) * 140;
    const driftY = (Math.random() - 0.5) * 140;
    const duration = Math.random() * 10 + 12;
    const delay = Math.random() * -duration;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${startX}%`;
    particle.style.top = `${startY}%`;
    particle.style.setProperty("--drift-x", `${driftX}px`);
    particle.style.setProperty("--drift-y", `${driftY}px`);
    particle.style.setProperty("--duration", `${duration}s`);
    particle.style.setProperty("--delay", `${delay}s`);

    particleField.appendChild(particle);
  }
}

if (heroVisual) {
  window.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 8;
    const y = (event.clientY / window.innerHeight - 0.5) * 8;
    heroVisual.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;

    if (cursorGlow) {
      cursorGlow.style.opacity = "1";
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    }
  });

  window.addEventListener("mouseleave", () => {
    heroVisual.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";

    if (cursorGlow) {
      cursorGlow.style.opacity = "0";
    }
  });
}

const inventoryImages = [
  { src: "images/inventory page.jpg", caption: "Inventory dashboard" },
  { src: "images/login page.jpg", caption: "Login screen" },
  { src: "images/welcome page.jpg", caption: "Welcome experience" },
  { src: "images/loading page.jpg", caption: "Loading screen" },
  { src: "images/restock alert page.jpg", caption: "Restock alert flow" },
  { src: "images/successful page.jpg", caption: "Success confirmation" },
  { src: "images/email page.jpg", caption: "Email interface" },
  { src: "images/help desk page.jpg", caption: "Help desk page" }
];

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("lightboxImage");
const modalCaption = document.getElementById("lightboxCaption");
const closeModalBtn = document.getElementById("closeLightbox");
const prevBtn = document.getElementById("prevImage");
const nextBtn = document.getElementById("nextImage");
let currentImageIndex = 0;

function showImage(index) {
  currentImageIndex = (index + inventoryImages.length) % inventoryImages.length;
  const currentImage = inventoryImages[currentImageIndex];
  modalImage.src = currentImage.src;
  modalImage.alt = currentImage.caption;
  modalCaption.textContent = currentImage.caption;
}

function openGallery() {
  showImage(0);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".project-card[data-project='inventory']").forEach((card) => {
  card.addEventListener("click", (event) => {
    if (!event.target.closest(".github-link")) {
      event.preventDefault();
      openGallery();
    }
  });
});

document.querySelectorAll(".gallery-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    openGallery();
  });
});

closeModalBtn.addEventListener("click", closeGallery);
prevBtn.addEventListener("click", () => showImage(currentImageIndex - 1));
nextBtn.addEventListener("click", () => showImage(currentImageIndex + 1));

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeGallery();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeGallery();
  }
  if (event.key === "ArrowRight" && modal.classList.contains("open")) {
    showImage(currentImageIndex + 1);
  }
  if (event.key === "ArrowLeft" && modal.classList.contains("open")) {
    showImage(currentImageIndex - 1);
  }
});
