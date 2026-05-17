// Ambil elemen menu
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav__link');
const revealElements = document.querySelectorAll('.reveal');

// Toggle menu mobile
menuToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Smooth scroll saat klik link navbar
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Tutup menu mobile setelah klik
    navMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Animasi section muncul saat discroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach(el => observer.observe(el));

// Fallback sederhana jika gambar gagal dimuat
function handleImageError(img) {
  const fallback = document.createElement('div');
  fallback.className = 'img-fallback';
  fallback.textContent = 'Gambar belum ditambahkan';

  img.parentNode.replaceChild(fallback, img);
}