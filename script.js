/* ===== Fade-in on scroll ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ===== Before/After carousel ===== */
let currentSlide = 0;
const track = document.getElementById('carouselTrack');

if (track) {
  const totalSlides = track.children.length;

  function getSlidesPerView() {
    return window.innerWidth <= 768 ? 1 : 2;
  }

  function buildDots() {
    const dotsWrap = document.getElementById('carouselDots');
    dotsWrap.innerHTML = '';
    const maxSlide = totalSlides - getSlidesPerView();
    for (let i = 0; i <= maxSlide; i++) {
      const dot = document.createElement('span');
      if (i === currentSlide) dot.classList.add('active');
      dot.addEventListener('click', () => { currentSlide = i; render(); });
      dotsWrap.appendChild(dot);
    }
  }

  function render() {
    const slidesPerView = getSlidesPerView();
    const slideWidth = 100 / slidesPerView;
    track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    document.querySelectorAll('.carousel-dots span').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  window.moveSlide = function(direction) {
    const maxSlide = totalSlides - getSlidesPerView();
    currentSlide = Math.max(0, Math.min(currentSlide + direction, maxSlide));
    render();
  };

  window.addEventListener('resize', () => {
    const maxSlide = totalSlides - getSlidesPerView();
    if (currentSlide > maxSlide) currentSlide = maxSlide;
    buildDots();
    render();
  });

  buildDots();
  render();
}
