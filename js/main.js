// Luxury Golden Particle Storm
function createGoldenStorm() {
    const stormContainer = document.createElement('div');
    stormContainer.className = 'golden-storm';
    document.body.appendChild(stormContainer);

    const luxuryGlow = document.createElement('div');
    luxuryGlow.className = 'luxury-glow';
    document.body.appendChild(luxuryGlow);

    function createGoldenParticle() {
        const particle = document.createElement('div');
        particle.className = 'golden-particle';
        
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        
        particle.style.left = `${startX}%`;
        particle.style.top = `${startY}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        
        stormContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
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
            orb.remove();
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
            sparkle.remove();
        }, 4000);
    }

    function initializeStorm() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createGoldenParticle();
            }, i * 100);
        }

        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createLuxuryOrb();
            }, i * 200);
        }

        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createGoldenSparkle();
            }, i * 150);
        }
    }

    function maintainStorm() {
        setInterval(() => {
            if (Math.random() < 0.7) createGoldenParticle();
            if (Math.random() < 0.3) createLuxuryOrb();
            if (Math.random() < 0.5) createGoldenSparkle();
        }, 1000);
    }

    document.addEventListener('mousemove', (e) => {
        if (Math.random() < 0.1) {
            const interactiveParticle = document.createElement('div');
            interactiveParticle.className = 'golden-sparkle';
            interactiveParticle.style.left = `${e.clientX}px`;
            interactiveParticle.style.top = `${e.clientY}px`;
            interactiveParticle.style.animation = 'sparkleTwinkle 2s ease-out forwards';
            
            stormContainer.appendChild(interactiveParticle);
            
            setTimeout(() => {
                interactiveParticle.remove();
            }, 2000);
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
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroBanner = document.querySelector('.hero-banner');
            if (heroBanner) {
                heroBanner.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
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
        for (let i = 0; i < 3; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'golden-sparkle';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.animationDelay = `${Math.random() * 2}s`;
            element.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }
    }
}

class GamePlatform {
    constructor() {
        this.games = [];
        this.currentProvider = 'mega888';
        this.gameCount = 18;
        this.isAnimating = false;
        this.rotationInterval = 3 * 60 * 60 * 1000;
        this.currentSeed = 0;
        this.animationSystem = new AnimationSystem();
        this.init();
        this.updateProviderLogos();
    }

    updateProviderLogos() {
        document.querySelectorAll('.provider-card').forEach(card => {
            const provider = card.dataset.provider;
            const iconElement = card.querySelector('.provider-icon');
            
            iconElement.innerHTML = `
                <img src="providers/${provider}-logo.png" 
                     alt="${provider}" 
                     class="provider-logo">
            `;
        });
    }

    init() {
        this.updateTime();
        this.setupGameRotation();
        this.generateGames();
        this.setupEventListeners();
        this.updateProviderLogos();
        
        setInterval(() => this.updateTime(), 1000);
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
            second: '2-digit',
            timeZone: 'Asia/Kuala_Lumpur'
        };
        
        const timeElement = document.getElementById('currentTime');
        if (timeElement) {
            timeElement.textContent = now.toLocaleDateString('ms-MY', options);
        }
    }

    setupGameRotation() {
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
    }

    rotateGames() {
        this.currentSeed = (this.currentSeed || 0) + 1;
        this.generateGames();
    }

    generateGames() {
        const allGameFiles = [
                    '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png',
                    '8.png', '9.png', '10.png', '11.png', '12.png', '13.png', '14.png',
                    '15.png', '16.png', '17.png', '18.png', '19.png', '20.png', '21.png',
                    '22.png', '23.png', '24.png', '25.png', '26.png', '27.png', '28.png',
                    '29.png', '30.png', '31.png', '32.png', '33.png', '34.png', '35.png',
                    '36.png', '37.png', '38.png', '39.png', '40.png', '41.png', '42.png',
                    '43.png', '44.png', '45.png', '46.png', '47.png', '48.png', '49.png',
                    '50.png', '51.png', '52.png', '53.png', '54.png', '55.png', '56.png',
                    '57.png', '58.png', '59.png'
                    ];

        const providers = ['mega888', '918kiss', 'pussy888', 'megah5'];
        
        this.games = [];

        providers.forEach(provider => {
            const shuffledGames = [...allGameFiles]
                .sort(() => Math.random() - 0.5)
                .sort(() => Math.random() - 0.5);
            
            const providerGames = shuffledGames.slice(0, this.gameCount);
            
            providerGames.forEach((fileName, index) => {
                // RTP AWAL: 80% - 98%
                const baseRtp = 80 + Math.random() * 18;
                
                this.games.push({
                    id: `${provider}-${index}-${Date.now()}`,
                    provider: provider,
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
        container.style.transform = 'translateY(20px)';
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const filteredGames = this.games.filter(game => game.provider === this.currentProvider);
        
        container.innerHTML = filteredGames.map(game => `
            <div class="game-item" data-game="${game.id}">
                <img src="mega888/${game.image}" 
                     alt="${game.image.split('.')[0]}" 
                     class="game-image"
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
                        <div class="fluctuation fluctuation-up" style="display: none;">
                            <i class="fas fa-arrow-up"></i>
                        </div>
                        <div class="fluctuation fluctuation-down" style="display: none;">
                            <i class="fas fa-arrow-down"></i>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        await new Promise(resolve => setTimeout(resolve, 50));
        
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
        container.style.transition = 'all 0.5s ease';

        this.isAnimating = false;
        this.initializeRTPAnimations();
    }

    initializeRTPAnimations() {
        const games = document.querySelectorAll('.game-item');
        
        games.forEach((gameItem, index) => {
            const rtpBar = gameItem.querySelector('.rtp-bar');
            const rtpValue = gameItem.querySelector('.rtp-value');
            const fluctuationUp = gameItem.querySelector('.fluctuation-up');
            const fluctuationDown = gameItem.querySelector('.fluctuation-down');
            
            if (!rtpBar || !rtpValue) return;
            
            let currentRtp = parseFloat(rtpValue.textContent);
            
            setInterval(() => {
                const fluctuation = (Math.random() - 0.5) * 0.8;
                // BATASI RTP: MIN 80% - MAX 98%
                const newRtp = Math.max(80, Math.min(98, currentRtp + fluctuation));
                const change = newRtp - currentRtp;
                
                const formattedRtp = parseFloat(newRtp.toFixed(1));
                
                this.animateRTPChange(rtpBar, rtpValue, currentRtp, formattedRtp);
                
                if (Math.abs(change) > 0.1 && fluctuationUp && fluctuationDown) {
                    const fluctuationElement = change > 0 ? fluctuationUp : fluctuationDown;
                    fluctuationElement.style.display = 'block';
                    
                    setTimeout(() => {
                        fluctuationElement.style.display = 'none';
                    }, 1500);
                }
                
                currentRtp = formattedRtp;
            }, 2000 + Math.random() * 2000);
        });
    }

    animateRTPChange(barElement, valueElement, oldValue, newValue) {
        const duration = 1000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentRtp = oldValue + (newValue - oldValue) * easeOutQuart;
            
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
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('.header');
            
            if (header) {
                if (scrolled > 100) {
                    header.style.background = 'rgba(0, 0, 0, 0.95)';
                    header.style.boxShadow = '0 2px 20px rgba(255, 215, 0, 0.1)';
                } else {
                    header.style.background = 'rgba(0, 0, 0, 0.9)';
                    header.style.boxShadow = 'none';
                }
            }
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
        
        const rotateY = (x - centerX) / 25;
        const rotateX = (centerY - y) / 25;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    magneticEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / 10;
        const moveY = (y - centerY) / 10;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    try {
        createGoldenStorm();
        new TypographyEnhancer();
        window.gamePlatform = new GamePlatform();
        console.log('🎮 Game Platform initialized successfully!');
    } catch (error) {
        console.error('Failed to initialize GamePlatform:', error);
    }
});
