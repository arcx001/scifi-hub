/* SciFi — Updated Logic for 33 Clubs and Department-based Routing */

(function() {
    'use strict';

    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const mainContent = document.getElementById('mainContent');
    const backToTop = document.getElementById('backToTop');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    let currentPage = 'home';

    function init() {
        renderNavigation();
        setupNavigation();
        setupScrollEffects();
        renderDepartmentGrids();
        renderAllClubs();
        renderTeams();
        setupAchievements();
        setupEvents();
        setupForms();

        // Check for hash routing
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            handleHashNavigation(hash);
        }
    }

    // ─── Render Dynamic Nav ───
    function renderNavigation() {
        const deptDropdown = document.getElementById('deptDropdown');
        if (deptDropdown) {
            deptDropdown.innerHTML = DEPARTMENTS.map(dept => 
                `<li><a href="#dept-${dept.id}" class="nav-link" data-dept-id="${dept.id}">${dept.name}</a></li>`
            ).join('');
        }
    }

    // ─── Navigation & Routing ───
    function setupNavigation() {
        document.addEventListener('click', function(e) {
            const pageLink = e.target.closest('[data-page]');
            if (pageLink) {
                e.preventDefault();
                navigateTo(pageLink.getAttribute('data-page'));
            }

            const deptLink = e.target.closest('[data-dept-id]');
            if (deptLink) {
                e.preventDefault();
                showDepartment(deptLink.getAttribute('data-dept-id'));
            }

            const clubCard = e.target.closest('[data-club-id]');
            if (clubCard) {
                showClubDetail(clubCard.getAttribute('data-club-id'));
            }

            const teamCard = e.target.closest('[data-team-id]');
            if (teamCard) {
                showTeamDetail(teamCard.getAttribute('data-team-id'));
            }
        });

        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        if (backToTop) {
            backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        }
    }

    function navigateTo(pageId) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const target = document.getElementById('page-' + pageId);
        if (target) {
            target.classList.add('active');
            currentPage = pageId;
            window.location.hash = pageId === 'home' ? '' : pageId;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
    }

    function showDepartment(deptId) {
        const dept = DEPARTMENTS.find(d => d.id === deptId);
        if (!dept) return;

        document.getElementById('deptTitle').innerHTML = dept.name;
        document.getElementById('deptDesc').textContent = `Clubs and Societies under ${dept.name}`;
        
        const deptClubs = CLUBS.filter(c => c.departmentId === deptId);
        const grid = document.getElementById('deptClubsGrid');
        grid.innerHTML = deptClubs.map(club => renderClubCard(club)).join('');

        navigateTo('department');
        window.location.hash = `dept-${deptId}`;
    }

    function showClubDetail(clubId) {
        const club = CLUBS.find(c => c.id === clubId);
        if (!club) return;

        document.getElementById('detailTitle').innerHTML = club.name.replace(/(\S+)$/, '<span class="accent">$1</span>');
        document.getElementById('detailTagline').textContent = club.advisor ? `Faculty Advisor: ${club.advisor}` : club.shortDesc;
        document.getElementById('detailAbout').textContent = club.about;

        // Populate detail sections
        document.getElementById('detailAchievements').innerHTML = club.achievements.map(a => 
            `<div class="achievement-item"><i class="fas fa-award"></i><div><h4>${a.title}</h4><p>${a.desc}</p></div></div>`
        ).join('') || '<p>No recent achievements listed.</p>';

        document.getElementById('detailProjects').innerHTML = club.projects.map(p => 
            `<div class="project-card"><h4>${p.title}</h4><p>${p.desc}</p><span class="project-tag">${p.tag}</span></div>`
        ).join('') || '<p>No active projects listed.</p>';

        document.getElementById('detailTeamLeads').innerHTML = club.leads.map(l => 
            `<div class="lead-card"><div class="lead-avatar"><i class="fas fa-user-tie"></i></div><h4>${l.name}</h4><p>${l.role}</p></div>`
        ).join('');

        navigateTo('detail');
        window.location.hash = `club-${clubId}`;
    }

    function showTeamDetail(teamId) {
        const team = TEAMS.find(t => t.id === teamId);
        if (!team) return;

        document.getElementById('detailTitle').innerHTML = team.name.replace(/(\S+)$/, '<span class="accent">$1</span>');
        document.getElementById('detailTagline').textContent = team.tagline;
        document.getElementById('detailAbout').textContent = team.about;

        document.getElementById('detailAchievements').innerHTML = team.achievements.map(a => 
            `<div class="achievement-item"><i class="fas fa-trophy"></i><div><h4>${a.title}</h4><p>${a.desc}</p></div></div>`
        ).join('') || '<p>No recent achievements listed.</p>';

        document.getElementById('detailProjects').innerHTML = team.projects.map(p => 
            `<div class="project-card"><h4>${p.title}</h4><p>${p.desc}</p><span class="project-tag">${p.tag}</span></div>`
        ).join('') || '<p>No active projects listed.</p>';

        document.getElementById('detailTeamLeads').innerHTML = team.leads.map(l => 
            `<div class="lead-card"><div class="lead-avatar"><i class="fas fa-rocket"></i></div><h4>${l.name}</h4><p>${l.role}</p></div>`
        ).join('');

        navigateTo('detail');
        window.location.hash = `team-${teamId}`;
    }

    // ─── Rendering Helpers ───
    function renderTeams() {
        const homeGrid = document.getElementById('teamsGrid');
        const fullGrid = document.getElementById('teamsFullGrid');

        const teamHtml = TEAMS.map(team => `
            <div class="club-card" data-team-id="${team.id}">
                <div class="club-card-icon" style="background:${team.bgColor}; color:${team.color}">
                    <i class="${team.icon}"></i>
                </div>
                <h3>${team.name}</h3>
                <p>${team.shortDesc}</p>
                <span class="card-arrow">View Team <i class="fas fa-arrow-right"></i></span>
            </div>
        `).join('');

        if (homeGrid) homeGrid.innerHTML = teamHtml;
        if (fullGrid) fullGrid.innerHTML = teamHtml;
    }

    function renderClubCard(club) {
        return `
            <div class="club-card" data-club-id="${club.id}">
                <div class="club-card-icon" style="background:${club.bgColor}; color:${club.color}">
                    <i class="${club.icon}"></i>
                </div>
                <h3>${club.name}</h3>
                <p>${club.shortDesc}</p>
                <div class="advisor-tag"><i class="fas fa-user-shield"></i> ${club.advisor}</div>
                <span class="card-arrow">Explore <i class="fas fa-arrow-right"></i></span>
            </div>
        `;
    }

    function renderDepartmentGrids() {
        const deptHomeGrid = document.getElementById('deptHomeGrid');
        if (deptHomeGrid) {
            deptHomeGrid.innerHTML = DEPARTMENTS.map(dept => `
                <div class="department-card reveal" data-dept-id="${dept.id}">
                    <div class="dept-icon" style="background:${dept.bgColor}; color:${dept.color}">
                        <i class="${dept.icon}"></i>
                    </div>
                    <h3>${dept.name}</h3>
                    <p>${CLUBS.filter(c => c.departmentId === dept.id).length} Clubs</p>
                    <span class="btn-text">View Clubs <i class="fas fa-arrow-right"></i></span>
                </div>
            `).join('');
        }
    }

    function renderAllClubs() {
        const fullGrid = document.getElementById('clubsFullGrid');
        if (fullGrid) {
            fullGrid.innerHTML = CLUBS.map(club => renderClubCard(club)).join('');
        }
    }

    function setupAchievements() {
        const container = document.getElementById('achievementsTimeline');
        if (container) {
            container.innerHTML = ACHIEVEMENTS_DATA.map(a => `
                <div class="timeline-item reveal">
                    <div class="timeline-dot"><i class="${a.icon}"></i></div>
                    <div class="timeline-content">
                        <span class="timeline-date">${a.date}</span>
                        <h3>${a.title}</h3>
                        <p>${a.desc}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    function setupEvents() {
        // Simple events list
        const grid = document.getElementById('eventsGrid');
        if (grid) {
            grid.innerHTML = EVENTS_DATA.map(e => `
                <div class="event-card reveal">
                    <div class="event-date-box"><span class="day">${e.day}</span><span class="month">${e.month}</span></div>
                    <h3>${e.title}</h3>
                    <div class="event-meta">
                        <span><i class="fas fa-clock"></i> ${e.time}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${e.venue}</span>
                    </div>
                    <p>${e.desc}</p>
                </div>
            `).join('');
        }
    }

    function setupScrollEffects() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
            
            if (backToTop) {
                if (window.scrollY > 400) backToTop.classList.add('visible');
                else backToTop.classList.remove('visible');
            }
            handleReveal();
        });
    }

    function handleReveal() {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight - 50) el.classList.add('visible');
        });
    }

    function setupForms() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                showToast('Message sent! Our team will contact you soon.');
                contactForm.reset();
            });
        }
    }

    function showToast(msg) {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    function handleHashNavigation(hash) {
        if (hash.startsWith('dept-')) {
            showDepartment(hash.replace('dept-', ''));
        } else if (hash.startsWith('club-')) {
            showClubDetail(hash.replace('club-', ''));
        } else if (hash.startsWith('team-')) {
            showTeamDetail(hash.replace('team-', ''));
        } else {
            navigateTo(hash);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
