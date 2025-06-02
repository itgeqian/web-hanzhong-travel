// 轮播图功能
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
let slideInterval;

// 页面加载完成后初始化轮播图
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
});

function initCarousel() {
    if (slides.length === 0) return;
    
    // 显示第一张幻灯片
    showSlide(0);
    
    // 开始自动播放
    startAutoPlay();
    
    // 鼠标悬停暂停
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // 键盘控制
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
    
    // 触摸滑动支持
    let startX = 0;
    let endX = 0;
    
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carouselContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                changeSlide(1);
            } else {
                changeSlide(-1);
            }
        }
    }
}

// 改变幻灯片（HTML中调用的函数）
function changeSlide(direction) {
    if (direction === 1) {
        // 下一张
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    } else if (direction === -1) {
        // 上一张
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    }
    
    showSlide(currentSlideIndex);
    
    // 重新开始自动播放
    stopAutoPlay();
    setTimeout(startAutoPlay, 5000);
}

// 跳转到指定幻灯片（HTML中调用的函数）
function currentSlide(index) {
    currentSlideIndex = index - 1; // HTML中传入的是1-3，需要转换为0-2
    showSlide(currentSlideIndex);
    
    // 重新开始自动播放
    stopAutoPlay();
    setTimeout(startAutoPlay, 5000);
}

// 显示指定幻灯片
function showSlide(index) {
    // 隐藏所有幻灯片
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // 取消所有指示器的活动状态
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // 显示当前幻灯片
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    
    // 激活当前指示器
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
    
    currentSlideIndex = index;
}

// 开始自动播放
function startAutoPlay() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // 每5秒切换一次
}

// 停止自动播放
function stopAutoPlay() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
} 