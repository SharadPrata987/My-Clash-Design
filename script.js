document.addEventListener('DOMContentLoaded', () => {
    // Top Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                // Manually add the tailwind classes for scrolled state since 
                // we removed the @apply block to guarantee styling works
                navbar.classList.add('bg-darkBlue-900/80', 'backdrop-blur-xl', 'border-b', 'border-white/5', 'shadow-2xl');
            } else {
                navbar.classList.remove('bg-darkBlue-900/80', 'backdrop-blur-xl', 'border-b', 'border-white/5', 'shadow-2xl');
            }
        });
    }

    const services = [
        {
            title: "Bases & Subscriptions",
            description: "Premium base designs for every town hall level and strategy.",
            icon: "🏰",
            highlighted: true,
            hasLink: true,
            actionId: "openBasesModal"
        },
        {
            title: "Showcase Base",
            description: "Get a custom name base and logo base design.",
            icon: "🎨",
            highlighted: true,
            hasLink: true,
            actionId: "openShowcaseModal"
        },
        {
            title: "Custom Base Design",
            description: "Get a base designed specifically for your needs.",
            icon: "✏️",
            highlighted: true,
            hasLink: true,
            actionId: "openCustomBaseModal"
        },

        {
            title: "Clan Push",
            description: "Professional trophy pushing services for your clan.",
            icon: "🚀",
            highlighted: true,
            hasLink: true,
            actionId: "openClanPushModal"
        },
        {
            title: " Clan Top / HBD Top",
            description: "Surprise a friend or clan with a Local/Global #1 push for a special day!",
            icon: "🎉",
            highlighted: true,
            hasLink: true,
            actionId: "openCelebrationModal"
        },
        {
            title: "CWL League Promotion",
            description: "Get promoted to higher CWL leagues guaranteed.",
            icon: "⭐",
            highlighted: true,
            hasLink: true,
            actionId: "openCwlModal"
        },
        {
            title: "Clan Capital Maxing",
            description: "Max out your Clan Capital with our dedicated team.",
            icon: "🏗️",
            highlighted: true,
            hasLink: true,
            actionId: "openCapitalModal"
        },
        {
            title: "Buy COC Accounts",
            description: "Premium Clash of Clans accounts ready to play.",
            icon: "👤",
            highlighted: true,
            hasLink: true,
            actionId: "openAccountsModal"
        },
        {
            title: "Buy Clans",
            description: "Purchase established clans with history and members.",
            icon: "🛡️",
            highlighted: true,
            hasLink: true,
            actionId: "openBuyClansModal"
        }
    ];

    const servicesGrid = document.getElementById('servicesGrid');

    if (servicesGrid) {
        services.forEach((service, index) => {
            const card = document.createElement('div');

            // Fully expanding Tailwind classes directly so the CDN renders them 100% of the time!
            const highlightClasses = service.highlighted ? 'highlighted border-[rgba(6,182,212,0.5)] border-brand-500/50' : 'border-darkBlue-700/50 hover:border-darkBlue-500';
            const titleHighlightClass = service.highlighted ? 'text-brand-400' : 'text-white';

            card.className = `bg-darkBlue-800/50 backdrop-blur-md border rounded-2xl p-6 md:p-8 flex flex-col h-full relative overflow-hidden scroll-fade-up custom-service-card group ${highlightClasses}`;
            if (service.hasLink && service.actionId) {
                card.setAttribute('data-action', service.actionId);
            }

            // Injecting the custom glow wrapper logic using absolute positioning directly
            const beforeGlowHtml = `<div class="absolute inset-0 z-0 opacity-0 pointer-events-none transition-opacity duration-300 card-glow-layer" style="background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(6, 182, 212, 0.15), transparent 40%); mix-blend-mode: screen;"></div>`;

            let cardContent = `
                ${beforeGlowHtml}
                <div class="flex flex-col h-full pointer-events-none custom-service-card-inner relative z-10">
                    <div class="text-5xl mb-5 inline-block filter drop-shadow-md transition-transform duration-500 ease-out origin-bottom-left custom-service-card-icon">${service.icon}</div>
                    <h3 class="text-xl font-bold mb-3 font-serif ${titleHighlightClass}">${service.title}</h3>
                    <p class="text-slate-400 text-sm md:text-base leading-relaxed flex-grow">${service.description}</p>
            `;

            if (service.hasLink) {
                cardContent += `
                    <div class="mt-6 inline-flex items-center text-sm font-semibold text-brand-400 group-hover:text-brand-300 transition-colors pointer-events-none custom-service-card-link">
                        View Details 
                        <svg class="ml-2 w-4 h-4 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                `;
            }

            cardContent += `</div>`; // Close inner

            card.innerHTML = cardContent;
            servicesGrid.appendChild(card);
        });

        // Intersection Observer for graceful scroll effects
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // only animate once
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.scroll-fade-up').forEach((el) => {
            scrollObserver.observe(el);
        });

        const heroSection = document.getElementById('heroSection');
        if (heroSection) {
            setTimeout(() => {
                heroSection.classList.add('is-visible');
            }, 100);
        }

        // Interactive 3D Tilt & Glow Effect on Cards
        const allCards = document.querySelectorAll('.custom-service-card');

        allCards.forEach(card => {
            const glowLayer = card.querySelector('.card-glow-layer');

            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Set css variables for the tracking radial glow
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                // Calculate 3D tilt 
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;

                card.style.transition = 'none';
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

                if (glowLayer) glowLayer.style.opacity = '1';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.5s ease-out, opacity 0.8s' + ' !important';
                card.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

                if (glowLayer) glowLayer.style.opacity = '0';
            });

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'transform 0.1s ease-out';
            });
        });

        // Generic Modal Logic
        function openModalById(modalId) {
            const modal = document.getElementById(modalId);
            if (!modal) return;
            const content = modal.querySelector('.relative.z-10');

            modal.classList.remove('pointer-events-none', 'opacity-0');
            modal.classList.add('opacity-100');

            setTimeout(() => {
                if (content) {
                    content.classList.remove('scale-95', 'opacity-0');
                    content.classList.add('scale-100', 'opacity-100');
                }
            }, 50);
        }

        function closeModalByElement(closeBtn) {
            const modalId = closeBtn.getAttribute('data-close-modal');
            const modal = document.getElementById(modalId);
            if (!modal) return;
            const content = modal.querySelector('.relative.z-10');

            if (content) {
                content.classList.remove('scale-100', 'opacity-100');
                content.classList.add('scale-95', 'opacity-0');
            }

            setTimeout(() => {
                modal.classList.remove('opacity-100');
                modal.classList.add('opacity-0', 'pointer-events-none');
            }, 300);
        }

        // Global Event Delegation
        document.body.addEventListener('click', e => {
            // Check for modal triggers
            const trigger = e.target.closest('[data-action]');
            if (trigger) {
                e.preventDefault();
                const action = trigger.getAttribute('data-action');
                if (action === 'openBasesModal') openModalById('imageModal');
                if (action === 'openShowcaseModal') openModalById('showcaseModal');
                if (action === 'openCustomBaseModal') openModalById('customBaseModal');
                if (action === 'openCelebrationModal') openModalById('celebrationModal');
                if (action === 'openClanPushModal') openModalById('clanPushModal');
                if (action === 'openCwlModal') openModalById('cwlModal');
                if (action === 'openCapitalModal') openModalById('capitalModal');
                if (action === 'openAccountsModal') openModalById('accountsModal');
                if (action === 'openBuyClansModal') openModalById('buyClansModal');
            }

            // Check for modal close buttons or backdrop clicks
            const closeBtn = e.target.closest('[data-close-modal]');
            if (closeBtn) {
                e.preventDefault();
                closeModalByElement(closeBtn);
            }
        });
    }
});
