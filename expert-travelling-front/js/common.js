// 汉中旅游网站 - 通用JavaScript功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initAnimations();
    initCommonForms();
    initSmoothScroll();
    initSearch();
    checkGlobalUserStatus(); // 检查全局用户状态
});

// 全局用户状态检查
function checkGlobalUserStatus() {
    const userData = getGlobalUserData();
    if (userData) {
        // 检查是否过期
        if (userData.expiresAt && Date.now() > userData.expiresAt) {
            // 已过期，清除数据
            clearGlobalUserData();
            return;
        }
        
        // 更新用户界面
        updateGlobalUserInterface(userData);
    }
}

// 获取全局用户数据
function getGlobalUserData() {
    let userData = localStorage.getItem('hanzhong_user');
    if (!userData) {
        userData = sessionStorage.getItem('hanzhong_user');
    }
    
    if (userData) {
        try {
            return JSON.parse(userData);
        } catch (e) {
            console.error('解析用户数据失败:', e);
            clearGlobalUserData();
            return null;
        }
    }
    
    return null;
}

// 清除全局用户数据
function clearGlobalUserData() {
    localStorage.removeItem('hanzhong_user');
    sessionStorage.removeItem('hanzhong_user');
}

// 更新全局用户界面
function updateGlobalUserInterface(userData) {
    const userActions = document.getElementById('userActions');
    if (!userActions) return;
    
    userActions.innerHTML = `
        <div class="user-info">
            <img src="${userData.avatar || 'img/default-avatar.jpg'}" alt="用户头像" class="user-avatar" onerror="this.src='img/default-avatar.jpg'">
            <span class="user-welcome">欢迎您，${userData.name}</span>
            <button class="btn btn-outline logout-btn" onclick="handleGlobalLogout()">退出</button>
        </div>
    `;
}

// 处理全局退出登录
function handleGlobalLogout() {
    showCustomConfirm('确定要退出登录吗？', '退出登录', function() {
        clearGlobalUserData();
        showGlobalMessage('已成功退出登录', 'info');
        
        // 恢复登录注册按钮
        const userActions = document.getElementById('userActions');
        if (userActions) {
            userActions.innerHTML = `
                <a href="register.html" class="btn btn-outline">注册</a>
                <a href="login.html" class="btn btn-primary">登录</a>
            `;
        }
        
        // 如果在需要登录的页面，跳转到首页
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });
}

// 自定义确认弹窗
function showCustomConfirm(message, title, onConfirm, onCancel) {
    // 移除已存在的确认弹窗
    const existingConfirm = document.querySelector('.custom-confirm');
    if (existingConfirm) {
        existingConfirm.remove();
    }
    
    const confirmModal = document.createElement('div');
    confirmModal.className = 'custom-confirm';
    confirmModal.innerHTML = `
        <div class="confirm-overlay"></div>
        <div class="confirm-content">
            <div class="confirm-header">
                <h3>${title || '确认操作'}</h3>
            </div>
            <div class="confirm-body">
                <div class="confirm-icon">⚠️</div>
                <p>${message}</p>
            </div>
            <div class="confirm-actions">
                <button class="confirm-btn confirm-cancel">取消</button>
                <button class="confirm-btn confirm-ok">确定</button>
            </div>
        </div>
    `;
    
    // 添加样式
    confirmModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .custom-confirm .confirm-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
        }
        
        .custom-confirm .confirm-content {
            position: relative;
            background: white;
            border-radius: 16px;
            min-width: 320px;
            max-width: 400px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            animation: confirmSlideIn 0.3s ease-out;
            overflow: hidden;
        }
        
        @keyframes confirmSlideIn {
            from {
                opacity: 0;
                transform: scale(0.9) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        
        .custom-confirm .confirm-header {
            padding: 20px 24px 0;
            text-align: center;
        }
        
        .custom-confirm .confirm-header h3 {
            margin: 0;
            font-size: 18px;
            color: #333;
            font-weight: 600;
        }
        
        .custom-confirm .confirm-body {
            padding: 20px 24px;
            text-align: center;
        }
        
        .custom-confirm .confirm-icon {
            font-size: 48px;
            margin-bottom: 16px;
        }
        
        .custom-confirm .confirm-body p {
            margin: 0;
            font-size: 16px;
            color: #666;
            line-height: 1.5;
        }
        
        .custom-confirm .confirm-actions {
            padding: 0 24px 24px;
            display: flex;
            gap: 12px;
        }
        
        .custom-confirm .confirm-btn {
            flex: 1;
            padding: 12px 20px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .custom-confirm .confirm-cancel {
            background: #f5f5f5;
            color: #666;
        }
        
        .custom-confirm .confirm-cancel:hover {
            background: #e8e8e8;
            color: #333;
        }
        
        .custom-confirm .confirm-ok {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .custom-confirm .confirm-ok:hover {
            background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(confirmModal);
    
    // 事件处理
    const cancelBtn = confirmModal.querySelector('.confirm-cancel');
    const okBtn = confirmModal.querySelector('.confirm-ok');
    const overlay = confirmModal.querySelector('.confirm-overlay');
    
    function closeConfirm() {
        confirmModal.style.animation = 'confirmSlideOut 0.3s ease-in forwards';
        setTimeout(() => {
            confirmModal.remove();
            style.remove();
        }, 300);
    }
    
    cancelBtn.addEventListener('click', function() {
        closeConfirm();
        if (onCancel) onCancel();
    });
    
    okBtn.addEventListener('click', function() {
        closeConfirm();
        if (onConfirm) onConfirm();
    });
    
    overlay.addEventListener('click', function() {
        closeConfirm();
        if (onCancel) onCancel();
    });
    
    // 添加退出动画
    const exitStyle = document.createElement('style');
    exitStyle.textContent = `
        @keyframes confirmSlideOut {
            from {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
            to {
                opacity: 0;
                transform: scale(0.9) translateY(-20px);
            }
        }
    `;
    document.head.appendChild(exitStyle);
}

// 全局消息提示函数
function showGlobalMessage(message, type = 'info') {
    // 移除已存在的消息
    const existingMessage = document.querySelector('.message-toast');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = `message-toast message-${type}`;
    messageElement.innerHTML = `
        <div class="message-content">
            <span class="message-icon">${getGlobalMessageIcon(type)}</span>
            <span class="message-text">${message}</span>
        </div>
    `;
    
    document.body.appendChild(messageElement);
    
    // 显示动画
    setTimeout(() => {
        messageElement.classList.add('show');
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        messageElement.classList.remove('show');
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 300);
    }, 3000);
}

function getGlobalMessageIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

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

// 全局函数导出
window.handleGlobalLogout = handleGlobalLogout;
window.getGlobalUserData = getGlobalUserData;
window.updateGlobalUserInterface = updateGlobalUserInterface;
window.showGlobalMessage = showGlobalMessage;
window.checkGlobalUserStatus = checkGlobalUserStatus; 