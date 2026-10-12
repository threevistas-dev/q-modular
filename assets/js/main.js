const initApp = () => {
  // Elements
  const header = document.querySelector('.header');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const quoteModal = document.getElementById('quoteModal');
  const quoteButtons = document.querySelectorAll('.open-quote-modal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // 1. Sticky Header Scroll Effect
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Menu Toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      } else {
        mobileMenu.classList.add('open');
        mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('no-scroll');
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // 3. Active Nav Links on Scroll
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  // 4. Modal Interactions
  const openModal = () => {
    if (quoteModal) {
      quoteModal.classList.add('active');
      quoteModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
    }
  };

  const closeModal = () => {
    if (quoteModal) {
      quoteModal.classList.remove('active');
      quoteModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
    }
  };

  quoteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (quoteModal) {
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && quoteModal && quoteModal.classList.contains('active')) {
      closeModal();
    }
  });

  // 5. Quote Forms Handler
  const forms = document.querySelectorAll('form[name="quote-form"]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Submitting Request...';
      submitBtn.disabled = true;

      setTimeout(() => {
        form.innerHTML = `
          <div class="form-feedback-card">
            <div class="form-feedback-icon">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <h3 class="form-feedback-title">Inquiry Received</h3>
            <p class="form-feedback-message">
              Thank you for contacting Q Modular Sales and Leasing. Our experienced leadership team will review your project requirements and respond promptly.
            </p>
          </div>
        `;
      }, 800);
    });
  });

  // 6. Why Modular Slick Slider (One by one, auto slide, custom nav arrows)
  if (typeof jQuery !== 'undefined' && typeof jQuery.fn.slick === 'function') {
    const $slider = $('.why-modular-slider');
    if ($slider.length) {
      $slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 600,
        infinite: true,
        fade: false,
        dots: false,
        arrows: false,
        pauseOnHover: true,
        pauseOnFocus: true,
        adaptiveHeight: false
      });

      $(document).on('click', '.slider-prev-btn', function (e) {
        e.preventDefault();
        $('.why-modular-slider').slick('slickPrev');
      });

      $(document).on('click', '.slider-next-btn', function (e) {
        e.preventDefault();
        $('.why-modular-slider').slick('slickNext');
      });
    }

    // 7. Hero Banner Slick Slider (Auto slide with 4 hero images)
    const $heroSlider = $('.hero-slider');
    if ($heroSlider.length) {
      $heroSlider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4500,
        speed: 800,
        infinite: true,
        fade: false,
        dots: true,
        appendDots: $('.hero-dots-container'),
        arrows: false,
        pauseOnHover: false,
        pauseOnFocus: false,
        draggable: false,
        swipe: true,
        touchMove: true,
        adaptiveHeight: false
      });
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
