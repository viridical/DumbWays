// ===== PROJECT.JS - Main Logic =====
document.addEventListener('DOMContentLoaded', () => {

    // --- LOADING ---
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        loader.classList.add('hidden');
        setTimeout(() => loader.style.display = 'none', 600);
    });

    // --- BACK TO TOP ---
    const backBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) backBtn.classList.add('visible');
        else backBtn.classList.remove('visible');
    });
    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- THEME TOGGLE (Dark default) ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'dark');
    }
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    } else {
        body.classList.remove('light-mode');
        themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
    }
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        if (isLight) {
            themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
        } else {
            themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
        }
    });

    // --- ACTIVE NAV LINK ON SCROLL ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 150;
            if (window.scrollY >= top) current = sec.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // --- SMOOTH SCROLL for nav links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- TYPING ANIMATION ---
    const typedElement = document.getElementById('typedText');
    const words = ['Web Developer', 'Content Creator', 'UI/UX Enthusiast', 'Creative Thinker'];
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    function typeEffect() {
        const current = words[wordIndex];
        if (isDeleting) {
            typedElement.textContent = current.substring(0, charIndex--);
            if (charIndex < 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typeEffect, 400);
                return;
            }
            setTimeout(typeEffect, 60);
        } else {
            typedElement.textContent = current.substring(0, charIndex++);
            if (charIndex > current.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1500);
                return;
            }
            setTimeout(typeEffect, 100);
        }
    }
    typeEffect();

    // --- COUNTER ANIMATION ---
    const counters = document.querySelectorAll('.counter-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                let current = 0;
                const increment = target / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        el.textContent = target;
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(current);
                    }
                }, 30);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    // --- PROJECT DATA ---
    const projects = [
        {
            id: 1,
            title: 'Website Brand',
            desc: 'Membuat website untuk sebuah brand',
            tech: ['HTML', 'CSS'],
            category: 'web',
            img: 'Screenshot 2026-08-08 014811.png',
            live: '#',
            github: 'github.com/viridical'
        },
        {
            id: 2,
            title: 'Guest Book',
            desc: 'Website Guest Book',
            tech: ['HTML', 'JavaScript', 'CSS'],
            category: 'mobile',
            img: 'Screenshot 2026-08-08 014853.png',
            live: '#',
            github: 'github.com/viridical'
        },
        {
            id: 3,
            title: 'Expense Tracker',
            desc: 'Membuat expense tracker untuk menghitung pengeluaran',
            tech: ['JavaScript', 'CSS', 'HTML'],
            category: 'design',
            img: 'Screenshot 2026-08-08 014917.png',
            live: '#',
            github: 'github.com/viridical'
        },
        {
            id: 4,
            title: 'Daftar Nama Siswa',
            desc: 'Membuat website dengan daftar-daftar nama siswa serta nilai',
            tech: ['HTML', 'CSS', 'JavaScript'],
            category: 'web',
            img: 'Screenshot 2026-08-08 014947.png',
            live: '#',
            github: 'github.com/viridical'
        },
    ];

    const grid = document.getElementById('projectGrid');

    function renderProjects(filter) {
        const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
        grid.innerHTML = filtered.map(p => `
            <div class="col-md-6 col-lg-4 project-item" data-category="${p.category}">
                <div class="project-card" data-aos="fade-up" data-aos-duration="600">
                    <img src="${p.img}" class="project-thumb" alt="${p.title}" loading="lazy" />
                    <div class="project-body">
                        <h5 class="project-title">${p.title}</h5>
                        <p class="project-desc">${p.desc}</p>
                        <div class="project-tech">
                            ${p.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                        </div>
                        <div class="project-links">
                            <a href="${p.live}" target="_blank"><i class="bi bi-box-arrow-up-right"></i> Live</a>
                            <a href="${p.github}" target="_blank"><i class="bi bi-github"></i> GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        AOS.refresh();
    }

    renderProjects('all');

    // --- FILTER BUTTONS ---
    document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderProjects(this.getAttribute('data-filter'));
        });
    });

    // --- CURSOR GLOW EFFECT ---
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    // --- AOS INIT ---
    AOS.init({
        duration: 800,
        once: true,
        offset: 50
    });
});