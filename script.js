// common interactive behaviors: tilt effect, scroll reveal, quick view modal, contact form, profile animations, counters
document.addEventListener('DOMContentLoaded', () => {
  // set year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // scroll reveal for cards
  const revealEls = document.querySelectorAll('.member-card, .project-card');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'all 700ms cubic-bezier(.2,.9,.3,1)';
    revealObserver.observe(el);
  });

  // mouse tilt 3D effect on member cards
  const cards = document.querySelectorAll('.member-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      const tiltX = (dy * 6).toFixed(2);
      const tiltY = (dx * -6).toFixed(2);
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // quick view modal
  const quickModal = document.getElementById('quickModal');
  const quickClose = document.getElementById('quickClose');
  const quickContent = document.getElementById('quickContent');

  document.querySelectorAll('[data-quickview]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-quickview');
      const members = {
        al: {
          name: 'Sofian Ariyadi (Al)',
          role: 'Front-end Developer',
          bio: 'Spesialis React, animasi UI, dan micro-interactions. Pernah memimpin 10+ landing page dan aplikasi SPA.',
          projects: [
            { title: 'Portal Sekolah', year: 2024 },
            { title: 'To-Do Gamified', year: 2023 },
            { title: 'Interactive UI Kit', year: 2025 }
          ]
        },
        roofi: {
          name: 'Roofi Meynur',
          role: 'UI/UX Designer',
          bio: 'Designer yang fokus pada research & prototyping. Ahli Figma dan motion design.',
          projects: [
            { title: 'Mobile App UI', year: 2024 },
            { title: 'Brand Kit', year: 2022 }
          ]
        },
        alex: { name: 'Alexandra', role: 'Back-end Developer', bio: 'API, arsitektur microservice, DB tuning.', projects: [{ title: 'API Gateway', year: 2023 }] },
        mira: { name: 'Mira', role: 'Product Designer', bio: 'Product discovery & roadmap.', projects: [] },
        dinda: { name: 'Dinda', role: 'Content Creator', bio: 'Content strategy & copy.', projects: [] },
        rafi: { name: 'Rafi', role: 'DevOps / SRE', bio: 'CI/CD, monitoring, infra as code.', projects: [] },
        naya: { name: 'Naya', role: 'QA & Research', bio: 'Testing & user research.', projects: [] }
      };

      const data = members[id];
      if (!data) return;
      quickContent.innerHTML = `
        <div class="quick-grid">
          <div><h3>${data.name}</h3><div class="muted">${data.role}</div><p class="muted">${data.bio}</p></div>
          <div>
            <h4>Projects</h4>
            <ul class="muted">${data.projects.map(p => `<li>${p.title} <small>(${p.year})</small></li>`).join('')}</ul>
            <div style="margin-top:10px"><a class="btn small primary" href="members/${id}.html">Lihat Profil Lengkap</a></div>
          </div>
        </div>
      `;
      quickModal.classList.add('open');
    });
  });

  if (quickClose) quickClose.addEventListener('click', () => quickModal.classList.remove('open'));
  if (quickModal) quickModal.addEventListener('click', (e) => {
    if (e.target === quickModal) quickModal.classList.remove('open');
  });

  // contact form basic handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      alert(`Terima kasih, ${formData.get('name')}. Pesanmu sudah kami terima!`);
      contactForm.reset();
    });
  }

  // 🌟 animasi muncul lembut untuk profil
  const profileHero = document.querySelector('.profile-hero');
  if (profileHero) {
    profileHero.style.opacity = 0;
    profileHero.style.transform = 'translateY(30px)';
    setTimeout(() => {
      profileHero.style.transition = 'all 1s cubic-bezier(.2,.9,.3,1)';
      profileHero.style.opacity = 1;
      profileHero.style.transform = 'translateY(0)';
    }, 200);
  }

  // 🌈 efek parallax ringan untuk foto profil
  const profilePhoto = document.querySelector('.profile-photo img');
  if (profilePhoto) {
    document.addEventListener('mousemove', (e) => {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 10;
      profilePhoto.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    });
    document.addEventListener('mouseleave', () => {
      profilePhoto.style.transform = 'translate(0,0) scale(1)';
    });
  }

  // 💨 animasi counter angka
  function animateCounter(el, target) {
    let current = 0;
    const increment = target / 60;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = Math.floor(current);
    }, 16);
  }

  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.dataset.target;
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));
});
