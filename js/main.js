// OPTIMIZED Luxury Golden Particle Storm - LIGHTWEIGHT
function createGoldenStorm() {
    const stormContainer = document.createElement('div');
    stormContainer.className = 'golden-storm';
    document.body.appendChild(stormContainer);

    // REDUCED particle counts - dari 45 jadi 12 total
    function createGoldenParticle() {
        const particle = document.createElement('div');
        particle.className = 'golden-particle';
        
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        
        particle.style.left = `${startX}%`;
        particle.style.top = `${startY}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        
        stormContainer.appendChild(particle);
        
        // Auto cleanup - lebih cepat
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 8000);
    }
    
    function createLuxuryOrb() {
        const orb = document.createElement('div');
        orb.className = 'luxury-orb';
        
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        
        orb.style.left = `${startX}%`;
        orb.style.top = `${startY}%`;
        orb.style.animationDelay = `${Math.random() * 12}s`;
        
        stormContainer.appendChild(orb);
        
        setTimeout(() => {
            if (orb.parentNode) {
                orb.remove();
            }
        }, 12000);
    }

    function createGoldenSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'golden-sparkle';
        
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        
        sparkle.style.left = `${startX}%`;
        sparkle.style.top = `${startY}%`;
        sparkle.style.animationDelay = `${Math.random() * 4}s`;
        
        stormContainer.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
            }
        }, 4000);
    }

    // REDUCED initial particle count - DRASTIS!
    function initializeStorm() {
        for (let i = 0; i < 4; i++) {
            setTimeout(() => createGoldenParticle(), i * 300);
        }

        for (let i = 0; i < 2; i++) {
            setTimeout(() => createLuxuryOrb(), i * 600);
        }

        for (let i = 0; i < 3; i++) {
            setTimeout(() => createGoldenSparkle(), i * 400);
        }
    }

    // REDUCED maintenance frequency
    function maintainStorm() {
        setInterval(() => {
            if (Math.random() < 0.3) createGoldenParticle();
            if (Math.random() < 0.15) createLuxuryOrb();
            if (Math.random() < 0.2) createGoldenSparkle();
        }, 3000);
    }

    // OPTIMIZED mousemove dengan throttling lebih ketat
    let lastMouseMove = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastMouseMove < 800) return;
        
        lastMouseMove = now;
        
        if (Math.random() < 0.03) {
            const interactiveParticle = document.createElement('div');
            interactiveParticle.className = 'golden-sparkle';
            interactiveParticle.style.left = `${e.clientX}px`;
            interactiveParticle.style.top = `${e.clientY}px`;
            interactiveParticle.style.animation = 'sparkleTwinkle 1s ease-out forwards';
            
            stormContainer.appendChild(interactiveParticle);
            
            setTimeout(() => {
                if (interactiveParticle.parentNode) {
                    interactiveParticle.remove();
                }
            }, 1000);
        }
    });

    initializeStorm();
    maintainStorm();
}

class TypographyEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.addScrollEffects();
        this.enhanceHoverEffects();
    }

    addScrollEffects() {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                cancelAnimationFrame(scrollTimeout);
            }
            
            scrollTimeout = requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroBanner = document.querySelector('.hero-banner');
                if (heroBanner) {
                    heroBanner.style.transform = `translateY(${scrolled * 0.1}px)`;
                }
            });
        });
    }

    enhanceHoverEffects() {
        const providerCards = document.querySelectorAll('.provider-card');
        providerCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createSparkleEffect(e, card);
            });
        });

        const gameItems = document.querySelectorAll('.game-item');
        gameItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                this.createSparkleEffect(e, item);
            });
        });
    }

    createSparkleEffect(event, element) {
        for (let i = 0; i < 1; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'golden-sparkle';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.animationDelay = `${Math.random() * 1}s`;
            element.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.remove();
                }
            }, 1000);
        }
    }
}

class GamePlatform {
    constructor() {
        this.games = [];
        this.currentProvider = 'mega888';
        this.gameCount = 18;
        this.isAnimating = false;
        this.rotationInterval = 3 * 60 * 60 * 1000; // 3 JAM
        this.currentSeed = 0;
        this.init();
    }

    init() {
        this.updateTime();
        this.setupGameRotation();
        this.generateGames();
        this.setupEventListeners();
        
        setInterval(() => this.updateTime(), 30000);
    }

    updateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit', 
            second: '2-digit', // TETAP ADA DETIKNYA
            timeZone: 'Asia/Kuala_Lumpur'
        };
        
        const timeElement = document.getElementById('currentTime');
        if (timeElement) {
            timeElement.textContent = now.toLocaleDateString('ms-MY', options);
        }
    }

    setupGameRotation() {
        // Rotate setiap 3 jam
        setInterval(() => {
            this.rotateGames();
        }, this.rotationInterval);

        this.rotateGamesBasedOnTime();
    }

    rotateGamesBasedOnTime() {
        const now = new Date();
        const hours = now.getHours();
        const period = Math.floor(hours / 3);
        this.currentSeed = period;
        this.generateGames();
    }

    rotateGames() {
        this.currentSeed = (this.currentSeed || 0) + 1;
        this.generateGames();
    }

    generateGames() {
        const providers = [
            { 
                name: 'mega888', 
                folder: 'mega888',
                files: Array.from({length: 59}, (_, i) => `${i + 1}.png`) 
            },
            { 
                name: '918kiss', 
                folder: 'mega888', // PAKAI FOLDER YANG SAMA
                files: Array.from({length: 59}, (_, i) => `${i + 1}.png`) 
            },
            { 
                name: '918kaya', 
                folder: 'mega888', // PAKAI FOLDER YANG SAMA
                files: Array.from({length: 59}, (_, i) => `${i + 1}.png`) 
            },
            { 
                name: 'pussy888', 
                folder: 'mega888', // PAKAI FOLDER YANG SAMA
                files: Array.from({length: 59}, (_, i) => `${i + 1}.png`) 
            },
            { 
                name: 'megah5', 
                folder: 'mega888', // PAKAI FOLDER YANG SAMA
                files: Array.from({length: 59}, (_, i) => `${i + 1}.png`) 
            },
            { 
                name: 'jili', 
                folder: 'jili',
                files: Array.from({length: 50}, (_, i) => `${i + 1}.png`) 
            },
            { 
                name: 'pragmatic', 
                folder: 'pragmatic',
                files: Array.from({length: 40}, (_, i) => `${i + 1}.png`) 
            }
        ];
        
        this.games = [];

        providers.forEach(provider => {
            // Seed-based shuffling untuk konsistensi 3 jam
            const seed = this.currentSeed + provider.name.length;
            const shuffledGames = [...provider.files]
                .sort(() => Math.random() - 0.5)
                .slice(0, this.gameCount);
            
            shuffledGames.forEach((fileName, index) => {
                const baseRtp = 80 + Math.random() * 18;
                
                this.games.push({
                    id: `${provider.name}-${index}-${this.currentSeed}`,
                    provider: provider.name,
                    folder: provider.folder, // SIMPAN FOLDER
                    image: fileName,
                    rtp: parseFloat(baseRtp.toFixed(1)),
                    currentRtp: parseFloat(baseRtp.toFixed(1))
                });
            });
        });

        this.renderGames();
    }

    async renderGames() {
        if (this.isAnimating) return;
        
        const container = document.getElementById('gamesContainer');
        if (!container) return;

        this.isAnimating = true;

        container.style.opacity = '0';
        container.style.transform = 'translateY(10px)';
        
        await new Promise(resolve => setTimeout(resolve, 150));
        
        const filteredGames = this.games.filter(game => game.provider === this.currentProvider);
        
        container.innerHTML = filteredGames.map(game => {
            // GUNAKAN FOLDER YANG TELAH DISIMPAN
            return `
            <div class="game-item" data-game="${game.id}">
                <img src="${game.folder}/${game.image}" 
                     alt="${game.image.split('.')[0]}" 
                     class="game-image"
                     loading="lazy"
                     width="300"
                     height="200"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                <div class="game-placeholder" style="display: none;">
                    <i class="fas fa-gamepad"></i>
                    <span>${game.image.split('.')[0]}</span>
                </div>
                
                <div class="rtp-indicator">
                    <div class="rtp-header">
                        <div class="rtp-label">RTP LIVE</div>
                        <div class="rtp-value">${game.currentRtp}%</div>
                    </div>
                    <div class="rtp-bar-container">
                        <div class="rtp-bar" style="width: ${game.currentRtp}%"></div>
                        <div class="rtp-bar-glow"></div>
                    </div>
                </div>
            </div>
            `;
        }).join('');

        await new Promise(resolve => setTimeout(resolve, 50));
        
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
        container.style.transition = 'all 0.3s ease';

        this.isAnimating = false;
        this.initializeRTPAnimations();
    }

    initializeRTPAnimations() {
        const games = document.querySelectorAll('.game-item');
        
        games.forEach((gameItem) => {
            const rtpBar = gameItem.querySelector('.rtp-bar');
            const rtpValue = gameItem.querySelector('.rtp-value');
            
            if (!rtpBar || !rtpValue) return;
            
            let currentRtp = parseFloat(rtpValue.textContent);
            
            setInterval(() => {
                const fluctuation = (Math.random() - 0.5) * 0.4;
                const newRtp = Math.max(80, Math.min(98, currentRtp + fluctuation));
                const formattedRtp = parseFloat(newRtp.toFixed(1));
                
                this.animateRTPChange(rtpBar, rtpValue, currentRtp, formattedRtp);
                
                currentRtp = formattedRtp;
            }, 5000 + Math.random() * 5000);
        });
    }

    animateRTPChange(barElement, valueElement, oldValue, newValue) {
        const duration = 600;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOut = 1 - Math.pow(1 - progress, 2);
            const currentRtp = oldValue + (newValue - oldValue) * easeOut;
            
            barElement.style.width = currentRtp + '%';
            valueElement.textContent = currentRtp.toFixed(1) + '%';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    setupEventListeners() {
        document.querySelectorAll('.provider-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (this.isAnimating) return;
                
                document.querySelectorAll('.provider-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                this.currentProvider = card.dataset.provider;
                this.renderGames();
            });
        });

        document.addEventListener('click', (e) => {
            const gameItem = e.target.closest('.game-item');
            if (gameItem) {
                this.handleGameClick(gameItem.dataset.game);
            }
        });

        const loginBtn = document.querySelector('.login-btn');
        const registerBtn = document.querySelector('.register-btn');
        
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                alert('Redirecting to login...');
            });
        }
        
        if (registerBtn) {
            registerBtn.addEventListener('click', () => {
                alert('Redirecting to registration...');
            });
        }
    }

    handleGameClick(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (game) {
            alert(`Launching: ${game.image.split('.')[0]}`);
        }
    }
}

class AnimationSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
    }

    setupScrollAnimations() {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                cancelAnimationFrame(scrollTimeout);
            }
            
            scrollTimeout = requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const header = document.querySelector('.header');
                
                if (header) {
                    if (scrolled > 100) {
                        header.style.background = 'rgba(0, 0, 0, 0.95)';
                        header.style.boxShadow = '0 2px 15px rgba(255, 215, 0, 0.1)';
                    } else {
                        header.style.background = 'rgba(17, 17, 17, 0.95)';
                        header.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.5)';
                    }
                }
            });
        });
    }

    setupHoverEffects() {
        document.querySelectorAll('.game-item').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                this.tiltElement(e, card);
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });

        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                this.magneticEffect(e, btn);
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    tiltElement(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = (x - centerX) / 40;
        const rotateX = (centerY - y) / 40;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    }

    magneticEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / 15;
        const moveY = (y - centerY) / 15;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
}

// OPTIMIZED Initialization
document.addEventListener('DOMContentLoaded', () => {
    try {
        setTimeout(() => {
            createGoldenStorm();
        }, 2000);
        
        new TypographyEnhancer();
        window.gamePlatform = new GamePlatform();
        
    } catch (error) {
        console.error('Initialization error:', error);
    }
});
