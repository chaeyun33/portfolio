/**
 * Ultra Modern Portfolio JavaScript
 */

// ==================== Loader ====================
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});

// ==================== Navigation ====================
const nav = document.querySelector('.nav');
const navItems = document.querySelectorAll('.nav-item');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// 스크롤 시 네비게이션 스타일 변경
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.padding = '16px 0';
        nav.style.boxShadow = '0 2px 16px rgba(0, 0, 0, 0.08)';
    } else {
        nav.style.padding = '24px 0';
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// 활성 메뉴 표시
const sections = document.querySelectorAll('section[id]');

const updateActiveNav = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', updateActiveNav);

// 모바일 메뉴 토글
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// ==================== Smooth Scroll ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // 모바일 메뉴 닫기
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// ==================== Parallax Effect ====================
const visualCards = document.querySelectorAll('.visual-card');

window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    visualCards.forEach((card, index) => {
        const speed = (index + 1) * 5;
        const xMove = (x - 0.5) * speed;
        const yMove = (y - 0.5) * speed;
        
        card.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
});

// ==================== Work Image Reveal ====================
const workImages = document.querySelectorAll('.work-image');

const revealImage = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
};

const imageObserver = new IntersectionObserver(revealImage, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

workImages.forEach(image => {
    image.style.opacity = '0';
    image.style.transform = 'translateY(40px)';
    image.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    imageObserver.observe(image);
});

// ==================== Console Message ====================
console.log('%c✨ Portfolio Loaded', 'font-size: 20px; color: #0066ff;');
console.log('%cDesigned & Developed by Chaeni', 'font-size: 12px; color: #999;');

// ==================== Eye Follow Mouse (부드럽게) ====================
const heroLeftPupil = document.querySelector('.hero-eye.left .hero-pupil');
const heroRightPupil = document.querySelector('.hero-eye.right .hero-pupil');
const heroLeftEye = document.querySelector('.hero-eye.left');
const heroRightEye = document.querySelector('.hero-eye.right');

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    // 화면 중앙 기준
    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;
    
    const deltaX = e.clientX - screenCenterX;
    const deltaY = e.clientY - screenCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    const directionX = deltaX / (distance || 1);
    const directionY = deltaY / (distance || 1);
    
    // 최대 이동 거리 계산
    if (heroLeftEye) {
        const eyeRect = heroLeftEye.getBoundingClientRect();
        const pupilWidth = 130;
        const pupilHeight = 170;
        const eyeWidth = eyeRect.width;
        const eyeHeight = eyeRect.height;
        
        const maxMoveX = (eyeWidth - pupilWidth) / 2 * 0.95;
        const maxMoveY = (eyeHeight - pupilHeight) / 2 * 0.95;
        
        let moveX = directionX * Math.min(distance / 3, 1000);
        let moveY = directionY * Math.min(distance / 3, 1000);
        
        targetX = Math.max(-maxMoveX, Math.min(maxMoveX, moveX));
        targetY = Math.max(-maxMoveY, Math.min(maxMoveY, moveY));
    }
});

// 부드러운 애니메이션 루프
function animatePupils() {
    // 이징 (0.12 = 느리고 부드럽게)
    const ease = 0.12;
    
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    
    // 두 눈동자에 적용
    if (heroLeftPupil) {
        heroLeftPupil.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))`;
    }
    if (heroRightPupil) {
        heroRightPupil.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))`;
    }
    
    requestAnimationFrame(animatePupils);
}

// 애니메이션 시작
animatePupils();