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
        this.updateTime(); // Panggil sekali saat init
        this.setupGameRotation();
        this.generateGames();
        this.setupEventListeners();
    
    // UBAH: dari 30000ms (30 detik) menjadi 1000ms (1 detik)
    setInterval(() => this.updateTime(), 1000);
    }

    updateTime() {
    const now = new Date();
    
    // Format waktu: HH:MM:SS
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // Update waktu live
    const timeElement = document.getElementById('liveTime');
    if (timeElement) {
        timeElement.textContent = timeString;
    }

    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'Asia/Kuala_Lumpur'
    };
    
    const dateElement = document.getElementById('currentTime');
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('ms-MY', options);
    }
    
    // Update semua statistik secara real-time
    this.updateLiveStats();
}

updateLiveStats() {
    // Active Players (1500-2500)
    const playerElement = document.getElementById('totalmember');
    if (playerElement) {
        const basePlayers = 1800;
        const fluctuation = Math.floor(Math.random() * 200) - 100; // -100 to +100
        const currentPlayers = basePlayers + fluctuation;
        playerElement.textContent = currentPlayers.toLocaleString();
    }
    
    // Games Online (120-130)
    const gamesElement = document.getElementById('playeronline');
    if (gamesElement) {
        const baseGames = 125;
        const fluctuation = Math.floor(Math.random() * 6) - 3; // -3 to +3
        const currentGames = baseGames + fluctuation;
        gamesElement.textContent = currentGames;
    }
    
    // Win Rate (97.0% - 98.5%)
    const winRateElement = document.getElementById('winRate');
    if (winRateElement) {
        const baseRate = 97.8;
        const fluctuation = (Math.random() * 0.3) - 0.15; // -0.15 to +0.15
        const currentRate = Math.min(98.5, Math.max(97.0, baseRate + fluctuation));
        winRateElement.textContent = currentRate.toFixed(1) + '%';
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
        this.mainElement = null;
        this.subElement = null;
        this.logoFrame = null;
        this.wrapperElement = null;
        this.isAnimating = false;
        this.init();
    }

    init() {
        setTimeout(() => {
            this.mainElement = document.querySelector('.main-text');
            this.subElement = document.querySelector('.sub-text');
            this.logoFrame = document.querySelector('.logo-frame');
            this.wrapperElement = document.querySelector('.text-scaling-wrapper');
            
            if (this.mainElement && this.subElement) {
                this.autoScaleLogo();
                this.startAnimations();
                this.addHoverEffects();
                this.addSparkleEffects();
                this.setupResizeListener();
            }
        }, 100);
    }

    // Fungsi utama: auto-scale berdasarkan lebar frame
    autoScaleLogo() {
        if (!this.logoFrame || !this.wrapperElement) return;
        
        const frameWidth = this.logoFrame.offsetWidth;
        const textWidth = this.getTextWidth();
        
        // Jika teks lebih lebar dari frame, scale down
        if (textWidth > frameWidth - 30) { // -30 untuk padding
            const scaleFactor = (frameWidth - 30) / textWidth;
            const safeScale = Math.max(0.5, Math.min(1, scaleFactor * 0.95));
            
            this.wrapperElement.style.transform = `scale(${safeScale})`;
            console.log('Auto-scaled logo:', { 
                frameWidth, 
                textWidth, 
                scaleFactor: safeScale 
            });
        } else {
            // Reset ke normal
            this.wrapperElement.style.transform = 'scale(1)';
        }
    }

    // Hitung lebar total teks
    getTextWidth() {
        if (!this.mainElement || !this.subElement) return 0;
        
        // Buat elemen sementara untuk mengukur
        const tempDiv = document.createElement('div');
        tempDiv.style.cssText = `
            position: absolute;
            visibility: hidden;
            white-space: nowrap;
            font-size: 1.8rem;
            font-weight: 900;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        `;
        
        // Clone teks
        const mainClone = this.mainElement.cloneNode(true);
        const subClone = this.subElement.cloneNode(true);
        
        tempDiv.appendChild(mainClone);
        tempDiv.appendChild(subClone);
        document.body.appendChild(tempDiv);
        
        const width = tempDiv.offsetWidth;
        document.body.removeChild(tempDiv);
        
        return width;
    }

    startAnimations() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        // 1. Pulsating Glow Effect
        this.createPulsatingGlow();
        
        // 2. Subtle Float Animation 
        this.createFloatEffect();
    }

    createPulsatingGlow() {
        setInterval(() => {
            if (!this.mainElement || !this.subElement) return;
            
            const intensity = 15 + Math.random() * 15;
            const mainGlow = `0 0 ${intensity}px rgba(255, 215, 0, 0.7)`;
            const subGlow = `0 0 ${intensity * 0.8}px rgba(255, 165, 0, 0.6)`;
            
            this.mainElement.style.textShadow = mainGlow;
            this.subElement.style.textShadow = subGlow;
        }, 1500);
    }    

    createFloatEffect() {
        const animate = () => {
            if (!this.wrapperElement) return;
            
            const time = Date.now() / 1800;
            const floatOffset = Math.sin(time) * 1.2;
            
            this.wrapperElement.style.transform = 
                `${this.wrapperElement.style.transform || 'scale(1)'} translateY(${floatOffset}px)`;
            
            requestAnimationFrame(animate);
        };
        animate();
    }

    createSparkleParticle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-particle';
        sparkle.innerHTML = '✨';
        
        const logoRect = this.logoFrame.getBoundingClientRect();
        const x = Math.random() * (logoRect.width - 20) + 10;
        const y = Math.random() * (logoRect.height - 20) + 10;
        
        sparkle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            font-size: ${10 + Math.random() * 8}px;
            opacity: 0;
            pointer-events: none;
            z-index: 10;
            animation: sparkleFloat 1.5s ease-out forwards;
            filter: drop-shadow(0 0 3px gold);
        `;
        
        this.logoFrame.style.position = 'relative';
        this.logoFrame.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) sparkle.remove();
        }, 1500);
    }

    addSparkleEffects() {
        setInterval(() => {
            if (!this.logoFrame || Math.random() < 0.3) return;
            this.createSparkleParticle();
        }, 800);
    }

    addHoverEffects() {
        if (!this.logoFrame) return;
        
        this.logoFrame.addEventListener('mouseenter', () => {
            if (!this.mainElement || !this.subElement) return;
            
            // Intensify glow
            this.mainElement.style.textShadow = 
                '0 3px 8px rgba(0, 0, 0, 0.7), 0 0 50px rgba(255, 215, 0, 0.9), 0 0 70px rgba(255, 215, 0, 0.6)';
            this.subElement.style.textShadow = 
                '0 2px 6px rgba(0, 0, 0, 0.7), 0 0 40px rgba(255, 165, 0, 0.8), 0 0 60px rgba(255, 165, 0, 0.5)';
            
            // Create sparkle burst
            for (let i = 0; i < 8; i++) {
                setTimeout(() => this.createSparkleParticle(), i * 80);
            }
        });

        this.logoFrame.addEventListener('mouseleave', () => {
            if (!this.mainElement || !this.subElement) return;
            
            // Return to normal animation
            setTimeout(() => {
                this.createPulsatingGlow();
            }, 200);
        });
    }
    
    // Fungsi untuk set ukuran font optimal berdasarkan teks panjang
    setOptimalFontSize() {
        if (!this.mainElement || !this.subElement || !this.logoFrame) return;
        
        const mainText = this.mainElement.textContent;
        const subText = this.subElement.textContent;
        const logoWidth = this.logoFrame.offsetWidth;
        
        // Set attribute untuk CSS targeting
        if (mainText.length > 8 || subText.length > 10) {
            this.logoFrame.setAttribute('data-text-length', 'long'); // Ubah ke logoFrame
        } else {
            this.logoFrame.setAttribute('data-text-length', 'normal'); // Ubah ke logoFrame
        }
        
        // Dynamic font size adjustment
        const calculateOptimalFontSize = (text, baseSize, minSize) => {
            const avgCharWidth = 0.6; // Approx width per character in rem
            const maxChars = (logoWidth / 16) / avgCharWidth; // Convert px to rem
            
            if (text.length > maxChars * 0.8) {
                return `calc(${baseSize} * 0.85)`;
            }
            return baseSize;
        };
        
        // Apply calculated sizes
        this.mainElement.style.fontSize = calculateOptimalFontSize(
            mainText, 
            'clamp(1.4rem, 2.5vw, 2.2rem)', 
            '1rem'
        );
        
        this.subElement.style.fontSize = calculateOptimalFontSize(
            subText, 
            'clamp(0.8rem, 1.4vw, 1.2rem)', 
            '0.6rem'
        );
        
        console.log('Logo optimized:', {
            width: logoWidth,
            mainText: mainText,
            subText: subText,
            mainFontSize: this.mainElement.style.fontSize,
            subFontSize: this.subElement.style.fontSize
        });
    }

    startAnimations() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        // 1. Pulsating Glow Effect
        this.createPulsatingGlow();
        
        // 2. Subtle Float Animation 
        this.createFloatEffect();
        
        // 3. Continuous sparkle
        this.createContinuousSparkles();
    }

    createPulsatingGlow() {
        setInterval(() => {
            if (!this.mainElement || !this.subElement) return;
            
            const intensity = 15 + Math.random() * 15;
            const mainGlow = `0 0 ${intensity}px rgba(255, 215, 0, 0.7)`;
            const subGlow = `0 0 ${intensity * 0.8}px rgba(255, 165, 0, 0.6)`;
            
            this.mainElement.style.textShadow = mainGlow;
            this.subElement.style.textShadow = subGlow;
        }, 1500);
    }

    createFloatEffect() {
        const animate = () => {
            if (!this.mainElement || !this.subElement) return;
            
            const time = Date.now() / 1800;
            const floatOffset = Math.sin(time) * 1.2;
            
            this.mainElement.style.transform = `translateY(${floatOffset}px) scale(1)`;
            this.subElement.style.transform = `translateY(${floatOffset * 0.5}px) scale(1)`;
            
            requestAnimationFrame(animate);
        };
        animate();
    }

    createContinuousSparkles() {
        setInterval(() => {
            if (!this.logoFrame || Math.random() < 0.3) return; // Ubah ke logoFrame
            this.createSparkleParticle();
        }, 800);
    }

    createSparkleParticle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-particle';
        sparkle.innerHTML = '✨';
        
        const logoRect = this.logoFrame.getBoundingClientRect(); // Ubah ke logoFrame
        const x = Math.random() * (logoRect.width - 20) + 10;
        const y = Math.random() * (logoRect.height - 20) + 10;
        
        sparkle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            font-size: ${10 + Math.random() * 8}px;
            opacity: 0;
            pointer-events: none;
            z-index: 10;
            animation: sparkleFloat 1.5s ease-out forwards;
            filter: drop-shadow(0 0 3px gold);
        `;
        
        this.logoFrame.style.position = 'relative'; // Ubah ke logoFrame
        this.logoFrame.appendChild(sparkle); // Ubah ke logoFrame
        
        setTimeout(() => {
            if (sparkle.parentNode) sparkle.remove();
        }, 1500);
    }

    addSparkleEffects() {
        const sparkleContainer = this.logoFrame.querySelector('.logo-sparkle'); // Ubah ke logoFrame
        if (!sparkleContainer) return;
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createSparkleParticle();
            }, i * 300);
        }
    }

    addHoverEffects() {
        if (!this.logoFrame) return; // Ubah ke logoFrame
        
        this.logoFrame.addEventListener('mouseenter', () => { // Ubah ke logoFrame
            if (!this.mainElement || !this.subElement) return;
            
            // Intensify effects
            this.mainElement.style.textShadow = 
                '0 3px 8px rgba(0, 0, 0, 0.7), 0 0 50px rgba(255, 215, 0, 0.9), 0 0 70px rgba(255, 215, 0, 0.6)';
            this.subElement.style.textShadow = 
                '0 2px 6px rgba(0, 0, 0, 0.7), 0 0 40px rgba(255, 165, 0, 0.8), 0 0 60px rgba(255, 165, 0, 0.5)';
            
            // Create sparkle burst
            for (let i = 0; i < 8; i++) {
                setTimeout(() => this.createSparkleParticle(), i * 80);
            }
        });

        this.logoFrame.addEventListener('mouseleave', () => { // Ubah ke logoFrame
            if (!this.mainElement || !this.subElement) return;
            
            // Return to normal animation
            setTimeout(() => {
                this.createPulsatingGlow();
            }, 200);
        });
    }

    setupResizeListener() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.setOptimalFontSize();
            }, 250);
        });
    }
}

// Initialize ketika DOM ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.textLogoAnimator = new TextLogoAnimator();
    }, 500);
});

// ===== BRAND MARQUEE ANIMATOR =====
class BrandMarqueeAnimator {
    constructor() {
        this.marqueeContainer = null;
        this.brandItems = [];
        this.init();
    }

    init() {
        setTimeout(() => {
            this.marqueeContainer = document.querySelector('.text-marquee .marquee-text-container');
            if (this.marqueeContainer) {
                this.brandItems = this.marqueeContainer.querySelectorAll('.marquee-text-item');
                this.startBrandAnimations();
                this.addClickEffects();
            }
        }, 1000);
    }

    startBrandAnimations() {
        // 1. Staggered Entrance Animation
        this.animateEntrance();
        
        // 2. Continuous Color Intensity Variation
        this.startColorIntensity();
        
        // 3. Random Float Effects
        this.startRandomFloat();
    }

    animateEntrance() {
        this.brandItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px) scale(0.8)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, index * 200);
        });
    }

    startColorIntensity() {
        setInterval(() => {
            this.brandItems.forEach((item, index) => {
                setTimeout(() => {
                    const intensity = 0.7 + Math.random() * 0.3;
                    item.style.filter = `brightness(${intensity})`;
                    
                    setTimeout(() => {
                        item.style.filter = 'brightness(1)';
                    }, 1000);
                }, index * 300);
            });
        }, 4000);
    }

    startRandomFloat() {
        setInterval(() => {
            this.brandItems.forEach(item => {
                if (Math.random() < 0.2) {
                    this.animateFloat(item);
                }
            });
        }, 3000);
    }

    animateFloat(item) {
        item.style.transform = 'translateY(-5px) scale(1.02)';
        item.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            item.style.transform = 'translateY(0) scale(1)';
        }, 800);
    }

    addClickEffects() {
        this.brandItems.forEach(item => {
            item.addEventListener('click', () => {
                // Add click animation
                item.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 150);
                
                // Show brand name in console
                const brandText = item.textContent || item.innerText;
                console.log(`Brand clicked: ${brandText}`);
            });
        });
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
        window.brandMarqueeAnimator = new BrandMarqueeAnimator();

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
