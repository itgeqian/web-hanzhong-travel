// 首页JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    // 移除轮播图初始化，现在由carousel.js处理
    initFeatureCards();
    initAttractionCards();
    initQuickLinks();
});

// 特色介绍卡片动画
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    // 特色数据
    const features = [
        {
            icon: '🏛️',
            title: '历史文化',
            description: '两汉三国历史名城，文化底蕴深厚，古迹遗址众多，是中华文明的重要发源地之一。'
        },
        {
            icon: '🌿',
            title: '自然风光',
            description: '秦巴山区美景，四季分明，山清水秀，拥有众多自然保护区和风景名胜区。'
        },
        {
            icon: '🍜',
            title: '特色美食',
            description: '汉中热面皮、菜豆腐、粉皮子等地方特色小吃，味道独特，回味无穷。'
        },
        {
            icon: '🎭',
            title: '民俗文化',
            description: '汉调桄桄、皮影戏、民间剪纸等非物质文化遗产，展现汉中独特的民俗风情。'
        }
    ];
    
    // 更新特色卡片内容
    featureCards.forEach((card, index) => {
        if (features[index]) {
            const icon = card.querySelector('.feature-icon');
            const title = card.querySelector('h3');
            const description = card.querySelector('p');
            
            if (icon) icon.textContent = features[index].icon;
            if (title) title.textContent = features[index].title;
            if (description) description.textContent = features[index].description;
        }
    });
    
    // 添加悬停效果
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 景点卡片功能
function initAttractionCards() {
    const attractionCards = document.querySelectorAll('.attraction-card');
    
    // 景点数据
    const attractions = [
        {
            name: '朱鹮梨园',
            description: '世界朱鹮之乡，万亩梨花海洋，春来花满园，是观赏朱鹮和梨花的绝佳场所。',
            image: 'img/attraction1.jpg',
            link: 'jingdian.html#zhuyu'
        },
        {
            name: '汉中石门栈道',
            description: '古代栈道遗址，见证汉中历史变迁，体验古人智慧结晶。',
            image: 'img/attraction2.jpg',
            link: 'jingdian.html#shimen'
        },
        {
            name: '武侯祠',
            description: '纪念诸葛亮的历史名胜，三国文化圣地，感受智者风范。',
            image: 'img/attraction3.jpg',
            link: 'jingdian.html#wuhou'
        }
    ];
    
    // 更新景点卡片内容
    attractionCards.forEach((card, index) => {
        if (attractions[index]) {
            const img = card.querySelector('img');
            const title = card.querySelector('h3');
            const description = card.querySelector('p');
            const link = card.querySelector('.btn');
            
            if (img) {
                img.src = attractions[index].image;
                img.alt = attractions[index].name;
            }
            if (title) title.textContent = attractions[index].name;
            if (description) description.textContent = attractions[index].description;
            if (link) link.href = attractions[index].link;
        }
    });
    
    // 添加卡片动画效果
    attractionCards.forEach(card => {
        // 鼠标悬停效果
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
        
        // 点击动画
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn')) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
}

// 快捷链接功能
function initQuickLinks() {
    const quickLinks = document.querySelectorAll('.quick-link');
    
    // 快捷链接数据
    const links = [
        {
            icon: '👤',
            text: '用户登录',
            href: 'login.html',
            description: '登录享受个性化服务'
        },
        {
            icon: '🗺️',
            text: '精品线路',
            href: 'luxian.html',
            description: '精心设计的旅游路线'
        },
        {
            icon: '📖',
            text: '旅游攻略',
            href: 'gonglue.html',
            description: '详细的旅游指南'
        },
        {
            icon: '🍽️',
            text: '美食推荐',
            href: 'meishi.html',
            description: '品味汉中特色美食'
        }
    ];
    
    // 更新快捷链接内容
    quickLinks.forEach((link, index) => {
        if (links[index]) {
            const icon = link.querySelector('.link-icon');
            const text = link.querySelector('span');
            
            if (icon) icon.textContent = links[index].icon;
            if (text) text.textContent = links[index].text;
            
            link.href = links[index].href;
            link.title = links[index].description;
        }
    });
    
    // 添加悬停效果
    quickLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.link-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.link-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // 点击波纹效果
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.5);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
            `;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 页面性能优化
function optimizePerformance() {
    // 图片懒加载
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // 预加载关键资源
    const criticalImages = [
        'img/slide1.jpg',
        'img/slide2.jpg', 
        'img/slide3.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// CSS动画类
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .quick-link {
        position: relative;
        overflow: hidden;
    }
    
    .feature-card,
    .attraction-card {
        transition: all 0.3s ease;
    }
    
    .link-icon {
        transition: all 0.3s ease;
    }
    
    .attraction-card img {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// 初始化性能优化
document.addEventListener('DOMContentLoaded', optimizePerformance); 