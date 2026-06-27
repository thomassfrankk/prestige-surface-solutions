/* ===== Fade-in on scroll ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ===== Before/After carousel ===== */
// Steps by however many slides are visible at once, so on desktop
// (2 visible) the before/after pair always moves and lands together.
let currentSlide = 0;
const track = document.getElementById('carouselTrack');

if (track) {
  const totalSlides = track.children.length;

  function getSlidesPerView() {
    return window.innerWidth <= 768 ? 1 : 2;
  }

  function maxSlide() {
    return totalSlides - getSlidesPerView();
  }

  function buildDots() {
    const dotsWrap = document.getElementById('carouselDots');
    dotsWrap.innerHTML = '';
    const step = getSlidesPerView();
    const max = maxSlide();
    for (let i = 0; i <= max; i += step) {
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
      dot.classList.toggle('active', currentSlide === i * getSlidesPerView());
    });
  }

  window.moveSlide = function(direction) {
    const step = getSlidesPerView();
    const max = maxSlide();
    currentSlide = Math.max(0, Math.min(currentSlide + direction * step, max));
    render();
  };

  window.addEventListener('resize', () => {
    const max = maxSlide();
    if (currentSlide > max) currentSlide = max;
    buildDots();
    render();
  });

  buildDots();
  render();
}
