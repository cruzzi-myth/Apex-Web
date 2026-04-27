(function() {
  'use strict';

  // navbar scroll shadow
  var nav = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // hamburger menu
  var burger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', function() {
    navLinks.classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    a.addEventListener('click', function() { navLinks.classList.remove('open'); });
  });

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    });
  });

  // scroll reveal
  var revealObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(function(el) { revealObs.observe(el); });

  // stats counter
  function countUp(el) {
    var target = parseInt(el.dataset.target, 10);
    var dur = 1800, step = 16;
    var ticks = Math.ceil(dur / step);
    var inc = target / ticks;
    var cur = 0;
    var t = setInterval(function() {
      cur = Math.min(cur + inc, target);
      el.textContent = Math.floor(cur);
      if (cur >= target) clearInterval(t);
    }, step);
  }

  var statsObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        document.querySelectorAll('.sn').forEach(countUp);
        statsObs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  var strip = document.querySelector('.stats-strip');
  if (strip) statsObs.observe(strip);

  // phone formatter
  var ph = document.getElementById('apexPhone');
  if (ph) {
    ph.addEventListener('input', function() {
      var v = this.value.replace(/\D/g, '').slice(0, 10);
      if (v.length >= 7)      v = '(' + v.slice(0,3) + ') ' + v.slice(3,6) + '-' + v.slice(6);
      else if (v.length >= 4) v = '(' + v.slice(0,3) + ') ' + v.slice(3);
      else if (v.length)      v = '(' + v;
      this.value = v;
    });
  }

  // form submit
  var form = document.getElementById('apexForm');
  var succ = document.getElementById('apexSuccess');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      form.style.display = 'none';
      succ.style.display = 'block';
      notify('Your request has been received — we\'ll be in touch within 24 hours!');
    });
  }

  // notification toast
  function notify(msg) {
    var n = document.getElementById('notification');
    n.textContent = msg;
    n.classList.add('show');
    clearTimeout(n._t);
    n._t = setTimeout(function() { n.classList.remove('show'); }, 4500);
  }

})();
