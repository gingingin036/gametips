document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing GamePlatform');
    
    try {
        // Initialize game platform
        window.gamePlatform = new GamePlatform();
        console.log('GamePlatform initialized successfully');
        
    } catch (error) {
        console.error('Error initializing GamePlatform:', error);
    }
});
class GamePlatform {
    constructor() {
        this.games = [];
        this.currentProvider = 'mega888';
        this.gameCount = 18;
        this.isAnimating = false;
        this.rotationInterval = 3 * 60 * 60 * 1000; // 3 JAM
        this.currentSeed = 0;
        this.failedImages = new Set();
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
            second: '2-digit',
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
                folder: 'mega888',
                files: Array.from({length: 59}, (_, i) => `${i + 1}.png`) 
            },
            { 
                name: '918kaya', 
                folder: 'mega888',
                files: Array.from({length: 59}, (_, i) => `${i + 1}.png`) 
            },
            { 
                name: 'pussy888', 
                folder: 'mega888',
                files: Array.from({length: 59}, (_, i) => `${i + 1}.png`) 
            },
            { 
                name: 'megah5', 
                folder: 'mega888',
                files: Array.from({length: 59}, (_, i) => `${i + 1}.png`) 
            },
            { 
                name: 'jili', 
                folder: 'jili',
                files: Array.from({length: 59}, (_, i) => `${i + 1}.png`) 
            },
            { 
                name: 'pragmatic', 
                folder: 'pragmatic',
                files: Array.from({length: 55}, (_, i) => `${i + 1}.png`) 
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
                    image: `https://res.cloudinary.com/dg8c5ocjs/image/upload/f_webp,q_auto,w_300/${provider.folder}/${fileName}`,
                    // OPTIMIZED: q_auto untuk quality otomatis
                    placeholder: `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+`,
                    rtp: parseFloat(baseRtp.toFixed(1)),
                    currentRtp: parseFloat(baseRtp.toFixed(1))
                });
            });
        });

        this.preloadFirstBatch();
        this.renderGames();
    }

    preloadFirstBatch() {
        // Preload 6 gambar pertama dari provider aktif - OPTIMIZED
        const firstGames = this.games
            .filter(game => game.provider === this.currentProvider)
            .slice(0, 6);
        
        firstGames.forEach(game => {
            const img = new Image();
            img.src = game.image;
            img.loading = 'eager';
            img.decoding = 'async';
            
            // Fallback jika gambar gagal load
            img.onerror = () => {
                this.trackFailedImage(game.image);
            };
        });
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
        
        container.innerHTML = filteredGames.map((game, index) => {
            const shouldLoad = !this.failedImages.has(game.image);
            const loadingStrategy = index < 6 ? 'eager' : 'lazy'; // OPTIMIZED: 6 pertama eager, sisanya lazy
            
            return `
                <div class="game-item" data-game="${game.id}">
                    <img src="${shouldLoad ? game.image : game.placeholder}" 
                         alt="${game.provider} game ${index + 1}" 
                         class="game-image"
                         loading="${loadingStrategy}"
                         decoding="async"
                         width="300"
                         height="200"
                         onerror="this.src='${game.placeholder}'; window.gamePlatform?.trackFailedImage('${game.image}')">
                
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
        // Event delegation untuk provider cards
        document.addEventListener('click', (e) => {
            const providerCard = e.target.closest('.provider-card');
            if (providerCard && !this.isAnimating) {
                document.querySelectorAll('.provider-card').forEach(c => c.classList.remove('active'));
                providerCard.classList.add('active');
                this.currentProvider = providerCard.dataset.provider;
                
                this.preloadFirstBatch();
                this.renderGames();
            }
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
                this.showNotification('Redirecting to login...');
            });
        }
        
        if (registerBtn) {
            registerBtn.addEventListener('click', () => {
                this.showNotification('Redirecting to registration...');
            });
        }
    }

    handleGameClick(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (game) {
            this.showNotification(`Launching: ${game.provider} Game`);
        }
    }

    trackFailedImage(imageUrl) {
        this.failedImages.add(imageUrl);
        console.warn(`Image failed to load: ${imageUrl}`);
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'game-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-gamepad"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Enhanced Image Optimization
class ImageOptimizer {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        // Lazy load images when they enter viewport
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        this.observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });
        }
    }

    observeImage(img) {
        if (this.observer && img.dataset.src) {
            this.observer.observe(img);
        }
    }
}

// Text Logo Animation Class - FIXED VERSION
class TextLogoAnimator {
    constructor() {
        this.n1Element = null;
        this.gangElement = null;
        this.logoSection = null;
        this.isAnimating = false;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        setTimeout(() => {
            this.n1Element = document.querySelector('.n1-text');
            this.gangElement = document.querySelector('.gang-text');
            this.logoSection = document.querySelector('.logo-section');
            
            if (this.n1Element && this.gangElement) {
                this.startAnimations();
                this.addHoverEffects();
            }
        }, 1000);
    }

    startAnimations() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        // 1. Pulsating Glow Effect (FIXED - tidak override gradient)
        this.createPulsatingGlow();
        
        // 2. Subtle Float Animation 
        this.createFloatEffect();
        
        // 3. Random Sparkle Effect
        this.createSparkleEffect();
    }

    createPulsatingGlow() {
        setInterval(() => {
            if (!this.n1Element || !this.gangElement) return;
            
            const intensity = 15 + Math.random() * 10;
            // Hanya ubah text-shadow, biarkan gradient CSS tetap
            this.n1Element.style.textShadow = `0 0 ${intensity}px rgba(255, 215, 0, 0.7)`;
            this.gangElement.style.textShadow = `0 0 ${intensity}px rgba(255, 165, 0, 0.6)`;
        }, 2000);
    }

    createFloatEffect() {
        const animate = () => {
            if (!this.n1Element || !this.gangElement) return;
            
            const floatOffset = Math.sin(Date.now() / 1200) * 1.5; // Lebih halus
            this.n1Element.style.transform = `translateY(${floatOffset}px)`;
            this.gangElement.style.transform = `translateY(${floatOffset * 0.5}px)`;
            
            requestAnimationFrame(animate);
        };
        animate();
    }

    createSparkleEffect() {
        setInterval(() => {
            if (!this.logoSection || Math.random() < 0.2) return;
            
            this.createSparkleParticle();
        }, 1200);
    }

    createSparkleParticle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'text-sparkle';
        sparkle.innerHTML = '✨';
        
        const logoRect = this.logoSection.getBoundingClientRect();
        const x = 10 + Math.random() * (logoRect.width - 20);
        const y = 10 + Math.random() * (logoRect.height - 20);
        
        sparkle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            font-size: ${12 + Math.random() * 6}px;
            opacity: 0;
            pointer-events: none;
            z-index: 10;
            animation: sparkleFloat 1.2s ease-out forwards;
        `;
        
        this.logoSection.style.position = 'relative';
        this.logoSection.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
            }
        }, 1200);
    }

    addHoverEffects() {
        if (!this.logoSection) return;
        
        this.logoSection.addEventListener('mouseenter', () => {
            // Scale up on hover
            this.n1Element.style.transform = 'scale(1.08) translateY(0)';
            this.gangElement.style.transform = 'scale(1.08) translateY(0)';
            
            // Intensify glow
            this.n1Element.style.textShadow = '0 0 25px rgba(255, 215, 0, 0.9), 0 0 40px rgba(255, 215, 0, 0.4)';
            this.gangElement.style.textShadow = '0 0 20px rgba(255, 165, 0, 0.8), 0 0 35px rgba(255, 165, 0, 0.3)';
            
            // Create burst effect
            this.createHoverBurst();
        });

        this.logoSection.addEventListener('mouseleave', () => {
            // Return to normal float animation
            setTimeout(() => {
                this.createFloatEffect();
            }, 100);
        });
    }

    createHoverBurst() {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                if (this.logoSection) {
                    this.createSparkleParticle();
                }
            }, i * 150);
        }
    }
}

// Marquee Logo Animator Class - PASTIKAN DI LUAR TextLogoAnimator
// Marquee Logo Animator Class - TAMBAHKAN INI
class MarqueeAnimator {
    constructor() {
        this.marqueeContainer = null;
        this.logoSlides = [];
        this.init();
    }

    init() {
        setTimeout(() => {
            this.marqueeContainer = document.querySelector('.main-header .marquee-container');
            if (this.marqueeContainer) {
                this.logoSlides = this.marqueeContainer.querySelectorAll('.logo-slide');
                this.startMarqueeAnimations();
            }
        }, 1500);
    }

    startMarqueeAnimations() {
        // 1. Sequential Entrance Animation
        this.animateEntrance();
        
        // 2. Continuous Glow Pulse
        this.startGlowPulse();
        
        // 3. Random Bounce Effects
        this.startRandomBounce();
        
        // 4. Hover Enhancement
        this.enhanceHoverEffects();
    }

    animateEntrance() {
        this.logoSlides.forEach((slide, index) => {
            // Reset untuk animation
            slide.style.opacity = '0';
            slide.style.transform = 'translateY(20px) scale(0.8)';
            
            // Staggered entrance
            setTimeout(() => {
                slide.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                slide.style.opacity = '1';
                slide.style.transform = 'translateY(0) scale(1)';
            }, index * 200);
        });
    }

    startGlowPulse() {
        setInterval(() => {
            this.logoSlides.forEach((slide, index) => {
                const delay = index * 300;
                setTimeout(() => {
                    if (slide.isHovered) return; // Skip if hovered
                    
                    slide.style.boxShadow = `
                        0 0 20px rgba(100, 100, 255, 0.4),
                        0 0 40px rgba(255, 215, 0, 0.2)
                    `;
                    
                    setTimeout(() => {
                        if (!slide.isHovered) {
                            slide.style.boxShadow = `
                                0 0 10px rgba(100, 100, 255, 0.2),
                                0 0 20px rgba(255, 215, 0, 0.1)
                            `;
                        }
                    }, 600);
                }, delay);
            });
        }, 3000);
    }

    startRandomBounce() {
        setInterval(() => {
            this.logoSlides.forEach(slide => {
                if (Math.random() < 0.1 && !slide.isHovered) {
                    this.animateBounce(slide);
                }
            });
        }, 2000);
    }

    animateBounce(slide) {
        slide.style.transform = 'translateY(-8px) scale(1.05)';
        slide.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            if (!slide.isHovered) {
                slide.style.transform = 'translateY(0) scale(1)';
            }
        }, 300);
    }

    enhanceHoverEffects() {
        this.logoSlides.forEach(slide => {
            // Track hover state
            slide.isHovered = false;
            
            slide.addEventListener('mouseenter', () => {
                slide.isHovered = true;
                
                // Enhanced hover effects
                slide.style.transform = 'translateY(-10px) scale(1.1)';
                slide.style.boxShadow = `
                    0 15px 35px rgba(100, 100, 255, 0.5),
                    0 0 50px rgba(255, 215, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `;
                slide.style.borderColor = 'rgba(255, 215, 0, 0.8)';
                
                // Add particle effect on hover
                this.createHoverParticles(slide);
            });
            
            slide.addEventListener('mouseleave', () => {
                slide.isHovered = false;
                
                slide.style.transform = 'translateY(0) scale(1)';
                slide.style.boxShadow = `
                    0 0 10px rgba(100, 100, 255, 0.2),
                    0 0 20px rgba(255, 215, 0, 0.1)
                `;
                slide.style.borderColor = 'rgba(100, 100, 255, 0.2)';
            });
        });
    }

    createHoverParticles(slide) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'marquee-particle';
                particle.innerHTML = '⭐';
                
                const rect = slide.getBoundingClientRect();
                const x = Math.random() * rect.width;
                
                particle.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${rect.height}px;
                    font-size: ${8 + Math.random() * 6}px;
                    opacity: 0;
                    pointer-events: none;
                    z-index: 5;
                    animation: particleFloat 1s ease-out forwards;
                `;
                
                slide.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                }, 1000);
            }, i * 200);
        }
    }
}

// Add CSS for marquee animations - TAMBAHKAN INI
const marqueeAnimationStyles = `
@keyframes particleFloat {
    0% {
        opacity: 0;
        transform: translateY(0) scale(0);
    }
    50% {
        opacity: 1;
        transform: translateY(-15px) scale(1);
    }
    100% {
        opacity: 0;
        transform: translateY(-30px) scale(0);
    }
}

.marquee-particle {
    animation: particleFloat 1s ease-out forwards;
}

/* Smooth marquee animation */
.marquee-container {
    animation: marqueeScroll 25s linear infinite;
}

@keyframes marqueeScroll {
    0% { 
        transform: translateX(0); 
    }
    100% { 
        transform: translateX(-50%); 
    }
}

/* Pause animation on hover */
.logo-marquee:hover .marquee-container {
    animation-play-state: paused;
}
`;

// Inject marquee styles
const marqueeStyleSheet = document.createElement('style');
marqueeStyleSheet.textContent = marqueeAnimationStyles;
document.head.appendChild(marqueeStyleSheet);

// Add CSS for sparkle animation - TAMBAHKAN INI
const sparkleStyles = `
@keyframes sparkleFloat {
    0% {
        opacity: 0;
        transform: translateY(0) scale(0);
    }
    50% {
        opacity: 1;
        transform: translateY(-20px) scale(1);
    }
    100% {
        opacity: 0;
        transform: translateY(-40px) scale(0);
    }
}

.text-sparkle {
    animation: sparkleFloat 1.5s ease-out forwards;
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = sparkleStyles;
document.head.appendChild(styleSheet);

// OPTIMIZED Initialization dengan Image Optimizer
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize image optimizer
        window.imageOptimizer = new ImageOptimizer();
        
        // Initialize game platform
        window.gamePlatform = new GamePlatform();

        // Initialize text logo animator
        window.textLogoAnimator = new TextLogoAnimator();

        // Enhanced marquee controls
        const marquees = document.querySelectorAll('.marquee-container');
        marquees.forEach(marquee => {
            let isPaused = false;

            marquee.addEventListener('mouseenter', () => {
                isPaused = true;
                marquee.style.animationPlayState = 'paused';
            });

            marquee.addEventListener('mouseleave', () => {
                isPaused = false;
                marquee.style.animationPlayState = 'running';
            });

            // Pause marquee when window is not visible
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    marquee.style.animationPlayState = 'paused';
                } else if (!isPaused) {
                    marquee.style.animationPlayState = 'running';
                }
            });
        });

    } catch (error) {
        console.error('Initialization error:', error);
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
            
            // Log image performance
            const images = performance.getEntriesByType('resource')
                .filter(entry => entry.name.includes('cloudinary'));
            console.log(`${images.length} Cloudinary images loaded`);
        }, 0);
    });
}
