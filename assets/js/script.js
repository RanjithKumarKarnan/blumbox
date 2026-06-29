/* ============================================================
   BlumBox — Single Page Website  |  Interactions
   ============================================================ */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '60167296636'; // BlumBox WhatsApp

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Year in footer ---------- */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Sticky navbar scroll state ---------- */
    var navbar = document.getElementById('navbar');
    var backToTop = document.getElementById('backToTop');

    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      if (navbar) navbar.classList.toggle('scrolled', y > 60);

      // Back-to-top appears after ~30% of the page
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      if (backToTop) backToTop.classList.toggle('show', docH > 0 && y / docH > 0.30);

      updateActiveNav();
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- Back to top ---------- */
    if (backToTop) {
      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* ---------- Mobile menu ---------- */
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');

    function closeMenu() {
      if (!navLinks) return;
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        var open = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', String(open));
      });
      navLinks.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeMenu);
      });
    }

    /* ---------- Active nav highlight (scroll spy) ---------- */
    var navAnchors = Array.prototype.slice.call(document.querySelectorAll('.nav-links .nav-link'));
    var sectionMap = navAnchors
      .map(function (a) {
        var id = a.getAttribute('href');
        if (!id || id.charAt(0) !== '#') return null;
        var sec = document.querySelector(id);
        return sec ? { link: a, sec: sec } : null;
      })
      .filter(Boolean);

    function updateActiveNav() {
      var pos = (window.scrollY || window.pageYOffset) + 120;
      var current = null;
      sectionMap.forEach(function (m) {
        if (m.sec.offsetTop <= pos) current = m;
      });
      navAnchors.forEach(function (a) { a.classList.remove('active'); });
      if (current) current.link.classList.add('active');
    }

    /* ---------- Smooth scroll (with navbar offset) ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var offset = navbar ? navbar.offsetHeight + 8 : 70;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });

    /* ---------- Hero image slider (auto, fade) ---------- */
    var slides = Array.prototype.slice.call(document.querySelectorAll('.hero-slide'));
    var dotsWrap = document.getElementById('heroDots');
    var current = 0, timer = null, INTERVAL = 5000;

    if (slides.length) {
      slides.forEach(function (_, i) {
        var b = document.createElement('button');
        b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        if (i === 0) b.classList.add('active');
        b.addEventListener('click', function () { goTo(i); resetTimer(); });
        if (dotsWrap) dotsWrap.appendChild(b);
      });

      var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.children) : [];

      // Preload images for smoother transitions
      slides.forEach(function (s) {
        var m = (s.style.backgroundImage || '').match(/url\(["']?(.*?)["']?\)/);
        if (m && m[1]) { var im = new Image(); im.src = m[1]; }
      });

      var goTo = function (i) {
        slides[current].classList.remove('is-active');
        if (dots[current]) dots[current].classList.remove('active');
        current = (i + slides.length) % slides.length;
        slides[current].classList.add('is-active');
        if (dots[current]) dots[current].classList.add('active');
      };
      var next = function () { goTo(current + 1); };
      var resetTimer = function () { clearInterval(timer); timer = setInterval(next, INTERVAL); };

      resetTimer();

      document.addEventListener('visibilitychange', function () {
        if (document.hidden) clearInterval(timer); else resetTimer();
      });
    }

    /* ---------- Comparison table rows ---------- */
    var compareRows = document.getElementById('compareRows');
    if (compareRows) {
      var features = [
        'Transparent Pricing',
        'Personalised Approach',
        'No Hidden Fees',
        'Dedicated Project Coordinator',
        'Creative & Flexible Solutions',
        'End-to-End Event Management',
        'Honest, Reliable Communication',
        'Genuine Care for Every Project'
      ];
      compareRows.innerHTML = features.map(function (f) {
        return (
          '<div class="compare-row">' +
            '<div class="cell-feature">' + f + '</div>' +
            '<div class="cell cell-others"><i class="fa-solid fa-xmark no"></i></div>' +
            '<div class="cell cell-us"><i class="fa-solid fa-circle-check yes"></i></div>' +
          '</div>'
        );
      }).join('');
    }

    /* ---------- Quick Enquiry -> WhatsApp ---------- */
    var enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
      enquiryForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var action = document.getElementById('action');
        var service = document.getElementById('service');
        var actionVal = action && action.value ? action.value : 'Enquire';
        var serviceVal = service && service.value ? service.value : '';

        if (!serviceVal) {
          service.focus();
          service.style.borderColor = '#e2660c';
          return;
        }

        var msg = 'Hi BlumBox, I would like to ' + actionVal.toLowerCase() +
                  ' regarding your ' + serviceVal + ' service. Please share more details.';
        var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
        window.open(url, '_blank', 'noopener');
      });
    }

    /* ---------- Contact form -> WhatsApp ---------- */
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = (document.getElementById('cName').value || '').trim();
        var phone = (document.getElementById('cPhone').value || '').trim();
        var email = (document.getElementById('cEmail').value || '').trim();
        var message = (document.getElementById('cMsg').value || '').trim();

        if (!name || !phone || !message) { return; }

        var lines = [
          'New enquiry from the BlumBox website',
          '',
          'Name: ' + name,
          'Phone: ' + phone
        ];
        if (email) lines.push('Email: ' + email);
        lines.push('Message: ' + message);

        var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
        window.open(url, '_blank', 'noopener');
      });
    }

    /* ---------- Scroll reveal (IntersectionObserver) ---------- */
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(function (el, i) {
        el.style.transitionDelay = (Math.min(i % 4, 3) * 0.07) + 's';
        io.observe(el);
      });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }

    // Initial paint
    onScroll();
  });
})();
