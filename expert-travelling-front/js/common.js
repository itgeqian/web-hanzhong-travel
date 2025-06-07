// 汉中旅游网站 - 通用JavaScript功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initAnimations();
    initCommonForms();
    initSmoothScroll();
    initSearch();
});

// 导航栏功能
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // 高亮当前页面
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // 移动端导航切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navList.classList.toggle('show');
            this.classList.toggle('active');
        });
    }
    
    // 下拉菜单
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        dropdown.addEventListener('mouseenter', function() {
            dropdownMenu.style.display = 'block';
            setTimeout(() => {
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.transform = 'translateY(0)';
            }, 10);
        });
        
        dropdown.addEventListener('mouseleave', function() {
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                dropdownMenu.style.display = 'none';
            }, 300);
        });
    });
}

// 搜索功能初始化
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const searchSuggestions = document.querySelector('.search-suggestions');
    
    if (!searchInput) return;
    
    // 搜索建议数据
    const suggestions = [
        { text: '朱鹮梨园', type: 'attraction', url: 'jingdian.html#zhuhui' },
        { text: '石门栈道', type: 'attraction', url: 'jingdian.html#shimen' },
        { text: '武侯祠', type: 'attraction', url: 'jingdian.html#wuhou' },
        { text: '汉中热面皮', type: 'food', url: 'meishi.html#mianpi' },
        { text: '菜豆腐', type: 'food', url: 'meishi.html#caidoufu' },
        { text: '旅游攻略', type: 'guide', url: 'gonglue.html' },
        { text: '精品线路', type: 'route', url: 'luxian.html' },
        { text: '汉文化活动', type: 'culture', url: 'wenhua.html' },
        { text: '联系我们', type: 'contact', url: 'lianxi.html' }
    ];
    
    // 输入框事件
    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        if (query.length > 0) {
            showSearchSuggestions(query, suggestions);
        } else {
            hideSearchSuggestions();
        }
    });
    
    // 输入框获得焦点时显示建议
    searchInput.addEventListener('focus', function() {
        const query = this.value.trim().toLowerCase();
        if (query.length > 0) {
            showSearchSuggestions(query, suggestions);
        } else {
            showAllSuggestions(suggestions);
        }
    });
    
    // 点击其他地方隐藏建议
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            hideSearchSuggestions();
        }
    });
    
    // 搜索按钮点击事件
    searchBtn.addEventListener('click', performSearch);
    
    // 回车键搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// 显示搜索建议
function showSearchSuggestions(query, suggestions) {
    const searchSuggestions = document.querySelector('.search-suggestions');
    const filtered = suggestions.filter(item => 
        item.text.toLowerCase().includes(query)
    );
    
    if (filtered.length > 0) {
        searchSuggestions.innerHTML = filtered.map(item => 
            `<div class="suggestion-item" onclick="selectSuggestion('${item.text}', '${item.url}')">${item.text}</div>`
        ).join('');
        searchSuggestions.classList.add('show');
    } else {
        hideSearchSuggestions();
    }
}

// 显示所有建议
function showAllSuggestions(suggestions) {
    const searchSuggestions = document.querySelector('.search-suggestions');
    searchSuggestions.innerHTML = suggestions.slice(0, 6).map(item => 
        `<div class="suggestion-item" onclick="selectSuggestion('${item.text}', '${item.url}')">${item.text}</div>`
    ).join('');
    searchSuggestions.classList.add('show');
}

// 隐藏搜索建议
function hideSearchSuggestions() {
    const searchSuggestions = document.querySelector('.search-suggestions');
    searchSuggestions.classList.remove('show');
}

// 选择搜索建议
function selectSuggestion(text, url) {
    const searchInput = document.querySelector('.search-input');
    searchInput.value = text;
    hideSearchSuggestions();
    
    if (url) {
        window.location.href = url;
    }
}

// 执行搜索
function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim();
    
    if (query) {
        // 这里可以实现实际的搜索逻辑
        // 目前简单地根据关键词跳转到相应页面
        const searchMap = {
            '景点': 'jingdian.html',
            '朱鹮': 'jingdian.html',
            '石门': 'jingdian.html',
            '武侯': 'jingdian.html',
            '线路': 'luxian.html',
            '路线': 'luxian.html',
            '攻略': 'gonglue.html',
            '美食': 'meishi.html',
            '面皮': 'meishi.html',
            '豆腐': 'meishi.html',
            '文化': 'wenhua.html',
            '活动': 'wenhua.html',
            '联系': 'lianxi.html',
            '问题': 'wenti.html'
        };
        
        let targetPage = null;
        for (const [keyword, page] of Object.entries(searchMap)) {
            if (query.includes(keyword)) {
                targetPage = page;
                break;
            }
        }
        
        if (targetPage) {
            window.location.href = targetPage;
        } else {
            // 如果没有匹配的页面，显示搜索结果提示
            alert(`正在搜索"${query}"相关内容...`);
        }
    }
}

// 滚动效果
function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 滚动时头部样式变化
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 返回顶部按钮
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            if (scrollTop > 300) {
                backToTop.style.display = 'block';
                backToTop.style.opacity = '1';
            } else {
                backToTop.style.opacity = '0';
                setTimeout(() => {
                    if (scrollTop <= 300) {
                        backToTop.style.display = 'none';
                    }
                }, 300);
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 创建返回顶部按钮
    createBackToTopButton();
}

// 创建返回顶部按钮
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: none;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    `;
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(backToTop);
}

// 初始化动画
function initAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.card, .feature-card, .attraction-card, .route-card, .food-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // 数字动画
    const counters = document.querySelectorAll('.stat-number, .counter');
    counters.forEach(counter => {
        observer.observe(counter);
        counter.addEventListener('animate-in', function() {
            animateCounter(counter);
        });
    });
}

// 数字动画函数
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count') || element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// 通用表单功能
function initCommonForms() {
    // 表单验证
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(form)) {
                e.preventDefault();
            }
        });
        
        // 实时验证
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(input);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(input);
            });
        });
    });
}

// 表单验证函数
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// 字段验证
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const name = field.name;
    let isValid = true;
    let message = '';
    
    // 必填验证
    if (field.required && !value) {
        isValid = false;
        message = '此字段为必填项';
    }
    
    // 邮箱验证
    else if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = '请输入有效的邮箱地址';
        }
    }
    
    // 电话验证
    else if (name === 'phone' && value) {
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            message = '请输入有效的手机号码';
        }
    }
    
    // 姓名验证
    else if (name === 'name' && value) {
        if (value.length < 2) {
            isValid = false;
            message = '姓名至少需要2个字符';
        }
    }
    
    // 显示验证结果
    if (!isValid) {
        showFieldError(field, message);
    } else {
        showFieldSuccess(field);
    }
    
    return isValid;
}

// 显示字段错误
function showFieldError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// 显示字段成功
function showFieldSuccess(field) {
    field.classList.add('success');
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

// 清除字段错误
function clearFieldError(field) {
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

// 平滑滚动
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 工具函数
const Utils = {
    // 防抖函数
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },
    
    // 节流函数
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // 格式化日期
    formatDate: function(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },
    
    // 格式化价格
    formatPrice: function(price) {
        return new Intl.NumberFormat('zh-CN', {
            style: 'currency',
            currency: 'CNY'
        }).format(price);
    },
    
    // 显示加载状态
    showLoading: function(element) {
        element.classList.add('loading');
        element.disabled = true;
    },
    
    // 隐藏加载状态
    hideLoading: function(element) {
        element.classList.remove('loading');
        element.disabled = false;
    },
    
    // 显示消息提示
    showMessage: function(message, type = 'info') {
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#667eea'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            messageEl.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(messageEl);
            }, 300);
        }, 3000);
    }
};

// 全局暴露工具函数
window.Utils = Utils; 