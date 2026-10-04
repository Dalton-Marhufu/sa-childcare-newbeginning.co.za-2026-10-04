/* New Beginning Pre-primary — bespoke interactions */
(function () {
  'use strict';

  /* Mobile nav toggle */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Hero slider */
  var slides = document.querySelectorAll('.hero-slide');
  var dotsWrap = document.getElementById('heroDots');
  var current = 0;
  var timer = null;

  if (slides.length > 0) {
    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); restart(); });
      dotsWrap.appendChild(dot);
    });
    updateDots();
    timer = setInterval(next, 6000);
  }

  function goTo(i) {
    slides[current].classList.remove('active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
    updateDots();
  }
  function next() { goTo(current + 1); }
  function updateDots() {
    dotsWrap.querySelectorAll('button').forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
  }
  function restart() { clearInterval(timer); timer = setInterval(next, 6000); }

  /* Enquiry form — mailto-style handoff so the school gets the message */
  var form = document.getElementById('enquiryForm');
  var note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name').value.trim();
      var phone = document.getElementById('phone').value.trim();
      var school = document.getElementById('school').value;
      var msg = document.getElementById('message').value.trim();
      if (!name || !phone) {
        note.textContent = 'Please add your name and phone number so we can reach you.';
        note.style.color = '#c0392b';
        return;
      }
      var body = 'Hi New Beginning Pre-primary,%0D%0A%0D%0A' +
        'Name: ' + encodeURIComponent(name) + '%0D%0A' +
        'Phone: ' + encodeURIComponent(phone) + '%0D%0A' +
        'Preferred school: ' + encodeURIComponent(school) + '%0D%0A' +
        'Message: ' + encodeURIComponent(msg || 'I would like to enrol my child.');
      window.location.href = 'mailto:info@newbeginning.co.za?subject=' +
        encodeURIComponent('Enrolment Enquiry - ' + name) + '&body=' + body;
      note.textContent = 'Thanks, ' + name + '! Your email app should open — or call us on 012 343 8225.';
      note.style.color = '#004a59';
      form.reset();
    });
  }

  /* Scroll reveal */
  var reveal = document.querySelectorAll('.programme-card, .school-card, .gallery-item, .about-media, .about-content');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.style.opacity = '1';
          en.target.style.transform = 'none';
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    reveal.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
      io.observe(el);
    });
  }

  /* Header shadow on scroll */
  var header = document.getElementById('siteHeader');
  window.addEventListener('scroll', function () {
    if (header) header.style.boxShadow = window.scrollY > 10
      ? '0 2px 16px rgba(0,74,89,.12)' : '0 2px 16px rgba(0,74,89,.08)';
  }, { passive: true });
})();
