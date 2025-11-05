// OPTIMIZED Luxury Golden Particle Storm
function createGoldenStorm() {
    const stormContainer = document.createElement('div');
    stormContainer.className = 'golden-storm';
    document.body.appendChild(stormContainer);

    // REDUCED particle counts for better performance
    function createGoldenParticle() {
        const particle = document.createElement('div');
        particle.className = 'golden-particle';
        
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        
        particle.style.left = `${startX}%`;
        particle.style.top = `${startY}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        
        stormContainer.appendChild(particle);
        
        // Auto cleanup
        setTimeout(() => particle.remove(), 8000);
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
        
        setTimeout(() => orb.remove(), 12000);
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
        
        setTimeout(() => sparkle.remove(), 4000);
    }

    // REDUCED initial particle count
    function initializeStorm() {
        for (let i = 0; i < 8; i++) { // ↓ from 20 to 8
            setTimeout(() => createGoldenParticle(), i * 200);
        }

        for (let i = 0; i < 4; i++) { // ↓ from 10 to 4
            setTimeout(() => createLuxuryOrb(), i * 400);
        }

        for (let i = 0; i < 6; i++) { // ↓ from 15 to 6
            setTimeout(() => createGoldenSparkle(), i * 300);
        }
    }

    // REDUCED maintenance frequency
    function maintainStorm() {
        setInterval(() => {
            if (Math.random() < 0.4) createGoldenParticle(); // ↓ from 0.7
            if (Math.random() < 0.2) createLuxuryOrb();      // ↓ from 0.3
            if (Math.random() < 0.3) createGoldenSparkle();  // ↓ from 0.5
        }, 2000); // ↑ from 1000ms to 2000ms
    }

    // OPTIMIZED mousemove with throttling
    let lastMouseMove = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastMouseMove < 500) return; // Throttle to 500ms
        
        lastMouseMove = now;
        
        if (Math.random() < 0.05) { // ↓ from 0.1
            const interactiveParticle = document.createElement('div');
            interactiveParticle.className = 'golden-sparkle';
            interactiveParticle.style.left = `${e.clientX}px`;
            interactiveParticle.style.top = `${e.clientY}px`;
            interactiveParticle.style.animation = 'sparkleTwinkle 1.5s ease-out forwards';
            
            stormContainer.appendChild(interactiveParticle);
            
            setTimeout(() => interactiveParticle.remove(), 1500);
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
        // DEBOUNCED scroll for better performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrolled = window.pageYOffset;
                const heroBanner = document.querySelector('.hero-banner');
                if (heroBanner) {
                    heroBanner.style.transform = `translateY(${scrolled * 0.2}px)`; // Reduced effect
                }
            }, 10);
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
        // REDUCED sparkle count
        for (let i = 0; i < 2; i++) { // ↓ from 3 to 2
            const sparkle = document.createElement('div');
            sparkle.className = 'golden-sparkle';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.animationDelay = `${Math.random() * 1.5}s`; // Faster
            element.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1500); // Faster cleanup
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
    }

    init() {
        this.updateTime();
        this.setupGameRotation();
        this.generateGames();
        this.setupEventListeners();
        
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
        const providers = [
            { name: 'mega888', files: Array.from({length: 59}, (_, i) => `${i + 1}.png`) },
            { name: '918kiss', files: Array.from({length: 59}, (_, i) => `${i + 1}.png`) },
            { name: 'pussy888', files: Array.from({length: 59}, (_, i) => `${i + 1}.png`) },
            { name: 'megah5', files: Array.from({length: 59}, (_, i) => `${i + 1}.png`) },
            { name: 'jili', files: Array.from({length: 50}, (_, i) => `${i + 1}.png`) },
            { name: 'pragmatic', files: Array.from({length: 40}, (_, i) => `pm${i + 1}.png`) }
        ];
        
        this.games = [];

        providers.forEach(provider => {
            const shuffledGames = [...provider.files]
                .sort(() => Math.random() - 0.5);
            
            const providerGames = shuffledGames.slice(0, this.gameCount);
            
            providerGames.forEach((fileName, index) => {
                const baseRtp = 80 + Math.random() * 18;
                
                this.games.push({
                    id: `${provider.name}-${index}-${Date.now()}`,
                    provider: provider.name,
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
        
        await new Promise(resolve => setTimeout(resolve, 200)); // Faster transition
        
        const filteredGames = this.games.filter(game => game.provider === this.currentProvider);
        
        container.innerHTML = filteredGames.map(game => {
            let folder = 'mega888';
            if (game.provider === 'jili') folder = 'jili';
            else if (game.provider === 'pragmatic') folder = 'pragmatic';

            return `
            <div class="game-item" data-game="${game.id}">
                <img src="${folder}/${game.image}" 
                     alt="${game.image.split('.')[0]}" 
                     class="game-image"
                     loading="lazy" // ADDED lazy loading
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
            `;
        }).join('');

        await new Promise(resolve => setTimeout(resolve, 30));
        
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
        container.style.transition = 'all 0.4s ease'; // Faster transition

        this.isAnimating = false;
        this.initializeRTPAnimations();
    }

    initializeRTPAnimations() {
        const games = document.querySelectorAll('.game-item');
        
        games.forEach((gameItem) => {
            const rtpBar = gameItem.querySelector('.rtp-bar');
            const rtpValue = gameItem.querySelector('.rtp-value');
            const fluctuationUp = gameItem.querySelector('.fluctuation-up');
            const fluctuationDown = gameItem.querySelector('.fluctuation-down');
            
            if (!rtpBar || !rtpValue) return;
            
            let currentRtp = parseFloat(rtpValue.textContent);
            
            // REDUCED RTP update frequency
            setInterval(() => {
                const fluctuation = (Math.random() - 0.5) * 0.6; // Smaller fluctuations
                const newRtp = Math.max(80, Math.min(98, currentRtp + fluctuation));
                const change = newRtp - currentRtp;
                
                const formattedRtp = parseFloat(newRtp.toFixed(1));
                
                this.animateRTPChange(rtpBar, rtpValue, currentRtp, formattedRtp);
                
                if (Math.abs(change) > 0.15 && fluctuationUp && fluctuationDown) { // Higher threshold
                    const fluctuationElement = change > 0 ? fluctuationUp : fluctuationDown;
                    fluctuationElement.style.display = 'block';
                    
                    setTimeout(() => {
                        fluctuationElement.style.display = 'none';
                    }, 1200); // Faster hide
                }
                
                currentRtp = formattedRtp;
            }, 3000 + Math.random() * 3000); // ↑ from 2-4s to 3-6s
        });
    }

    animateRTPChange(barElement, valueElement, oldValue, newValue) {
        const duration = 800; // Faster animation
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 3); // Simpler easing
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
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrolled = window.pageYOffset;
                const header = document.querySelector('.header');
                
                if (header) {
                    if (scrolled > 100) {
                        header.style.background = 'rgba(0, 0, 0, 0.95)';
                        header.style.boxShadow = '0 2px 15px rgba(255, 215, 0, 0.1)';
                    } else {
                        header.style.background = 'rgba(0, 0, 0, 0.9)';
                        header.style.boxShadow = 'none';
                    }
                }
            }, 10);
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
        
        const rotateY = (x - centerX) / 30; // Reduced effect
        const rotateX = (centerY - y) / 30;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    }

    magneticEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / 15; // Reduced effect
        const moveY = (y - centerY) / 15;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
}

// OPTIMIZED Initialization with error handling
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Delay storm creation for faster initial load
        setTimeout(() => {
            createGoldenStorm();
        }, 1000);
        
        new TypographyEnhancer();
        window.gamePlatform = new GamePlatform();
        console.log('🎮 Game Platform optimized successfully!');
    } catch (error) {
        console.error('Failed to initialize GamePlatform:', error);
    }
});
