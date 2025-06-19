document.addEventListener('DOMContentLoaded', () => {
  // === Filter Buttons ===
  const filterButtons = document.querySelectorAll('.filter-button');
  const allProjects = document.querySelectorAll('.project');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-filter');

      // Update active state
      filterButtons.forEach(btn => btn.style.textDecoration = 'none');
      button.style.textDecoration = 'underline';

      allProjects.forEach(project => {
        const cluster = project.getAttribute('data-cluster');
        project.style.display = (target === 'all' || cluster === target) ? 'block' : 'none';
      });
    });
  });

  // === Intersection Observer for Fade-in ===
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  allProjects.forEach(project => observer.observe(project));

  // === Modal Carousel ===
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalPrice = document.getElementById('modal-price');
  const modalBadge = document.getElementById('modal-badge');
  const carousel = modal.querySelector('.carousel');
  const carouselPrev = carousel.querySelector('.carousel-prev');
  const carouselNext = carousel.querySelector('.carousel-next');
  const carouselPlus = document.querySelector('.carousel-plus');
  const modalCluster = document.getElementById('modal-cluster');

  const clusterNames = {
    a: "Carr.Nacional",
    b: "SPGG",
    c: "Centro"
  };

  let currentIndex = 0;
  let currentImages = [];

  function openModal(project) {
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    modalTitle.textContent = project.getAttribute('aria-label');
    modalDesc.textContent = '';
    modalPrice.textContent = project.dataset.price || '';

    const badge = project.querySelector('.badge');
    modalBadge.textContent = badge ? badge.textContent : '';

    const clusterKey = project.dataset.cluster.trim();
    modalCluster.textContent = clusterNames[clusterKey] || '';

    currentImages = (project.dataset.images || '').split(',');
    currentIndex = 0;
    updateCarousel();
    carousel.focus();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    clearCarousel();
  }

  function updateCarousel() {
    clearCarousel();
    if (currentImages.length === 0) return;

    const img = document.createElement('img');
    img.src = currentImages[currentIndex];
    img.alt = modalTitle.textContent + ' image ' + (currentIndex + 1);
    img.classList.add('active');
    carousel.insertBefore(img, carouselPrev);

    carouselPrev.style.display = currentImages.length > 1 ? 'block' : 'none';
    carouselNext.style.display = currentImages.length > 1 ? 'block' : 'none';
  }

  function clearCarousel() {
    carousel.querySelectorAll('img').forEach(img => img.remove());
  }

  function prevImage() {
    if (currentImages.length === 0) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateCarousel();
  }

  function nextImage() {
    if (currentImages.length === 0) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateCarousel();
  }

  allProjects.forEach(project => {
    project.addEventListener('click', e => {
      e.preventDefault();
      openModal(project);
    });

    project.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(project);
      }
    });
  });

  carouselPrev.addEventListener('click', prevImage);
  carouselNext.addEventListener('click', nextImage);
  carouselPlus.addEventListener('click', () => alert('Plus sign clicked!'));
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });

  // === Hamburger Menu ===
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (!hamburger || !navMenu) {
    console.error("Hamburger or navMenu not found");
    return;
  }

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    const newExpanded = !expanded;
    hamburger.setAttribute('aria-expanded', String(newExpanded));

    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');

    navMenu.setAttribute('aria-hidden', String(!newExpanded));
  });

  document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
});
