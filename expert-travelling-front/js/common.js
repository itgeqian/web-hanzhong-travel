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
    initFavorites();
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
        // 执行退出登录操作
        performLogout();
    });
}

// 执行退出登录操作
function performLogout() {
    // 清除用户数据
    clearGlobalUserData();
    
    // 清除收藏数据（用户退出登录后应该清空收藏）
    localStorage.removeItem('hanzhong_favorites');
    
    // 重置所有收藏按钮状态
    resetAllFavoriteButtons();
    
    // 显示退出成功消息
    showGlobalMessage('已成功退出登录', 'success');
    
    // 恢复登录注册按钮
    const userActions = document.getElementById('userActions');
    if (userActions) {
        userActions.innerHTML = `
            <a href="register.html" class="btn btn-outline">注册</a>
            <a href="login.html" class="btn btn-primary">登录</a>
        `;
    }
    
    // 延迟跳转到首页
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// 重置所有收藏按钮状态
function resetAllFavoriteButtons() {
    // 重置景点收藏按钮
    const attractionButtons = document.querySelectorAll('[data-favorite-type="attraction"]');
    attractionButtons.forEach(button => {
        button.textContent = '收藏';
        button.classList.remove('favorited');
    });
    
    // 重置美食收藏按钮
    const foodButtons = document.querySelectorAll('[data-favorite-type="food"]');
    foodButtons.forEach(button => {
        button.textContent = '收藏';
        button.classList.remove('favorited');
    });
    
    // 重置汉文化收藏按钮
    const cultureButtons = document.querySelectorAll('[data-favorite-type="culture"]');
    cultureButtons.forEach(button => {
        button.textContent = '收藏';
        button.classList.remove('favorited');
    });
    
    // 重置通用收藏按钮（没有特定类型的）
    const genericButtons = document.querySelectorAll('.favorite-btn:not([data-favorite-type])');
    genericButtons.forEach(button => {
        button.textContent = '收藏';
        button.classList.remove('favorited');
    });
    
    // 重置详情页面的收藏按钮
    const detailButtons = document.querySelectorAll('.collect-btn');
    detailButtons.forEach(button => {
        button.textContent = button.textContent.includes('景点') ? '收藏景点' : 
                           button.textContent.includes('美食') ? '收藏美食' : 
                           button.textContent.includes('文化') ? '收藏文化' : '收藏';
        button.classList.remove('favorited');
    });
}

// 更新所有页面的收藏按钮状态
function updateAllFavoriteButtonsStatus() {
    // 检查用户登录状态
    const userData = getGlobalUserData();
    
    if (!userData) {
        // 用户未登录，重置所有按钮
        resetAllFavoriteButtons();
        return;
    }
    
    // 用户已登录，根据收藏数据更新按钮状态
    const favorites = JSON.parse(localStorage.getItem('hanzhong_favorites') || '[]');
    
    // 更新所有收藏按钮
    const allFavoriteButtons = document.querySelectorAll('[data-favorite-id]');
    allFavoriteButtons.forEach(button => {
        const itemId = button.getAttribute('data-favorite-id');
        const itemType = button.getAttribute('data-favorite-type');
        
        if (itemId && itemType) {
            const isFavorited = favorites.some(fav => fav.id === itemId && fav.type === itemType);
            
            if (isFavorited) {
                button.textContent = '已收藏';
                button.classList.add('favorited');
            } else {
                button.textContent = '收藏';
                button.classList.remove('favorited');
            }
        }
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
        
        lastScrollTop = scrollTop;
    });
    
    // 创建返回顶部按钮
    createBackToTopButton();
}

// 创建返回顶部按钮
function createBackToTopButton() {
    // 创建收藏夹按钮
    const favoritesBtn = document.createElement('button');
    favoritesBtn.className = 'favorites-btn';
    favoritesBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
        <span class="btn-text">收藏夹</span>
    `;
    favoritesBtn.onclick = showFavoritesModal;
    
    // 创建回到顶部按钮
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 15l-6-6-6 6"></path>
        </svg>
        <span class="btn-text">回到顶部</span>
    `;
    backToTopBtn.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .favorites-btn, .back-to-top {
        position: fixed;
        right: 30px;
            width: 60px;
            height: 60px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
        }
        
        .favorites-btn {
            bottom: 120px;
        }
        
        .back-to-top {
            bottom: 50px;
        }
        
        .favorites-btn.show, .back-to-top.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .favorites-btn:hover, .back-to-top:hover {
            background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(102, 126, 234, 0.4);
        }
        
        .favorites-btn .btn-text, .back-to-top .btn-text {
            margin-top: 2px;
            font-size: 10px;
            line-height: 1;
        }
        
        @media (max-width: 768px) {
            .favorites-btn, .back-to-top {
                width: 50px;
                height: 50px;
                right: 20px;
            }
            
            .favorites-btn {
                bottom: 100px;
            }
            
            .back-to-top {
                bottom: 40px;
            }
            
            .favorites-btn .btn-text, .back-to-top .btn-text {
                font-size: 9px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(favoritesBtn);
    document.body.appendChild(backToTopBtn);

    // 初始检查滚动位置
    function checkScrollPosition() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) {
            favoritesBtn.classList.add('show');
            backToTopBtn.classList.add('show');
        } else {
            favoritesBtn.classList.remove('show');
            backToTopBtn.classList.remove('show');
        }
    }

    // 立即检查一次
    checkScrollPosition();

    // 滚动显示/隐藏按钮
    window.addEventListener('scroll', Utils.debounce(checkScrollPosition, 100));
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

// ==================== 收藏夹功能 ====================

// 获取收藏夹数据
function getFavoritesData() {
    const userData = getGlobalUserData();
    if (!userData) return [];
    
    // 统一使用 hanzhong_favorites 存储键
    const favorites = localStorage.getItem('hanzhong_favorites');
    return favorites ? JSON.parse(favorites) : [];
}

// 保存收藏夹数据
function saveFavoritesData(favorites) {
    const userData = getGlobalUserData();
    if (!userData) return false;
    
    // 统一使用 hanzhong_favorites 存储键
    localStorage.setItem('hanzhong_favorites', JSON.stringify(favorites));
    return true;
}

// 添加到收藏夹
function addToFavorites(item) {
    const userData = getGlobalUserData();
    if (!userData) {
        showLoginPrompt();
        return false;
    }
    
    const favorites = getFavoritesData();
    
    // 检查是否已收藏
    const existingIndex = favorites.findIndex(fav => fav.id === item.id && fav.type === item.type);
    if (existingIndex !== -1) {
        showGlobalMessage('该项目已在收藏夹中', 'warning');
        return false;
    }
    
    // 添加收藏项
    const favoriteItem = {
        id: item.id,
        type: item.type, // 'attraction', 'food', 'culture'
        title: item.title,
        description: item.description,
        image: item.image,
        rating: item.rating,
        price: item.price,
        addTime: new Date().toISOString(),
        url: item.url
    };
    
    favorites.push(favoriteItem);
    saveFavoritesData(favorites);
    
    showGlobalMessage(`已将"${item.title}"添加到收藏夹`, 'success');
    updateFavoriteButtons();
    return true;
}

// 从收藏夹移除
function removeFromFavorites(itemId, itemType) {
    const favorites = getFavoritesData();
    const newFavorites = favorites.filter(fav => !(fav.id === itemId && fav.type === itemType));
    
    if (newFavorites.length < favorites.length) {
        saveFavoritesData(newFavorites);
        showGlobalMessage('已从收藏夹中移除', 'info');
        updateFavoriteButtons();
        return true;
    }
    
    return false;
}

// 检查是否已收藏
function isFavorited(itemId, itemType) {
    const favorites = getFavoritesData();
    return favorites.some(fav => fav.id === itemId && fav.type === itemType);
}

// 显示登录提示
function showLoginPrompt() {
    showCustomConfirm(
        '您需要先登录才能使用收藏功能，是否前往登录？',
        '需要登录',
        function() {
            window.location.href = 'login.html?return=' + encodeURIComponent(window.location.href);
        }
    );
}

// 显示收藏夹弹窗
function showFavoritesModal() {
    const userData = getGlobalUserData();
    if (!userData) {
        showLoginPrompt();
        return;
    }
    
    const favorites = getFavoritesData();
    
    // 移除已存在的弹窗
    const existingModal = document.querySelector('.favorites-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'favorites-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>我的收藏夹</h2>
                <button class="modal-close" onclick="closeFavoritesModal()">×</button>
            </div>
            <div class="modal-body">
                ${favorites.length === 0 ? 
                    '<div class="empty-favorites"><p>您还没有收藏任何内容</p><p>快去收藏您喜欢的景点、美食和文化活动吧！</p></div>' :
                    generateFavoritesHTML(favorites)
                }
            </div>
        </div>
    `;
    
    // 添加样式
    addFavoritesModalStyles();
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // 添加动画
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// 关闭收藏夹弹窗
function closeFavoritesModal() {
    const modal = document.querySelector('.favorites-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// 生成收藏夹HTML
function generateFavoritesHTML(favorites) {
    const groupedFavorites = {
        attraction: favorites.filter(fav => fav.type === 'attraction'),
        food: favorites.filter(fav => fav.type === 'food'),
        culture: favorites.filter(fav => fav.type === 'culture')
    };
    
    let html = '<div class="favorites-tabs">';
    html += '<button class="tab-btn active" data-tab="all">全部 (' + favorites.length + ')</button>';
    html += '<button class="tab-btn" data-tab="attraction">景点 (' + groupedFavorites.attraction.length + ')</button>';
    html += '<button class="tab-btn" data-tab="food">美食 (' + groupedFavorites.food.length + ')</button>';
    html += '<button class="tab-btn" data-tab="culture">文化 (' + groupedFavorites.culture.length + ')</button>';
    html += '</div>';
    
    html += '<div class="favorites-content">';
    html += '<div class="favorites-list" data-content="all">';
    favorites.forEach(fav => {
        html += generateFavoriteItemHTML(fav);
    });
    html += '</div>';
    
    Object.keys(groupedFavorites).forEach(type => {
        html += '<div class="favorites-list" data-content="' + type + '" style="display: none;">';
        groupedFavorites[type].forEach(fav => {
            html += generateFavoriteItemHTML(fav);
        });
        html += '</div>';
    });
    
    html += '</div>';
    
    return html;
}

// 生成单个收藏项HTML
function generateFavoriteItemHTML(fav) {
    const typeNames = {
        attraction: '景点',
        food: '美食',
        culture: '文化'
    };
    
    return `
        <div class="favorite-item" data-type="${fav.type}">
            <div class="item-image">
                <img src="${fav.image}" alt="${fav.title}" onerror="this.src='img/default-image.jpg'">
                <span class="item-type">${typeNames[fav.type]}</span>
            </div>
            <div class="item-content">
                <h4 class="item-title">${fav.title}</h4>
                <p class="item-description">${fav.description}</p>
                ${fav.rating ? '<div class="item-rating">★★★★★ ' + fav.rating + '分</div>' : ''}
                ${fav.price ? '<div class="item-price">' + fav.price + '</div>' : ''}
                <div class="item-time">收藏时间：${new Date(fav.addTime).toLocaleDateString()}</div>
            </div>
            <div class="item-actions">
                <button class="btn btn-primary btn-sm" onclick="visitFavoriteItem('${fav.url}')">查看详情</button>
                <button class="btn btn-outline btn-sm" onclick="removeFromFavoritesModal('${fav.id}', '${fav.type}')">移除</button>
            </div>
        </div>
    `;
}

// 访问收藏项
function visitFavoriteItem(url) {
    if (url && url !== 'undefined') {
        window.open(url, '_blank');
    }
}

// 从收藏夹弹窗中移除项目
function removeFromFavoritesModal(itemId, itemType) {
    if (removeFromFavorites(itemId, itemType)) {
        // 重新显示收藏夹
        setTimeout(() => {
            showFavoritesModal();
        }, 500);
    }
}

// 添加收藏夹弹窗样式
function addFavoritesModalStyles() {
    if (document.querySelector('#favorites-modal-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'favorites-modal-styles';
    style.textContent = `
        .favorites-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .favorites-modal.show {
            opacity: 1;
            visibility: visible;
        }
        
        .favorites-modal .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
        }
        
        .favorites-modal .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 16px;
            width: 90%;
            max-width: 800px;
            max-height: 80vh;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        
        .favorites-modal .modal-header {
            padding: 20px 24px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .favorites-modal .modal-header h2 {
            margin: 0;
            font-size: 20px;
        }
        
        .favorites-modal .modal-close {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .favorites-modal .modal-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .favorites-modal .modal-body {
            padding: 0;
            max-height: calc(80vh - 80px);
            overflow-y: auto;
        }
        
        .favorites-modal .empty-favorites {
            text-align: center;
            padding: 60px 20px;
            color: #666;
        }
        
        .favorites-modal .empty-favorites p {
            margin: 10px 0;
            font-size: 16px;
        }
        
        .favorites-modal .favorites-tabs {
            display: flex;
            border-bottom: 1px solid #eee;
            background: #f8f9fa;
        }
        
        .favorites-modal .tab-btn {
            flex: 1;
            padding: 15px 20px;
            border: none;
            background: none;
            cursor: pointer;
            font-size: 14px;
            color: #666;
            transition: all 0.3s ease;
        }
        
        .favorites-modal .tab-btn.active {
            color: #667eea;
            background: white;
            border-bottom: 2px solid #667eea;
        }
        
        .favorites-modal .favorites-content {
            padding: 20px;
        }
        
        .favorites-modal .favorites-list {
            display: grid;
            gap: 20px;
        }
        
        .favorites-modal .favorite-item {
            display: flex;
            gap: 15px;
            padding: 15px;
            border: 1px solid #eee;
            border-radius: 12px;
            transition: all 0.3s ease;
        }
        
        .favorites-modal .favorite-item:hover {
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
        }
        
        .favorites-modal .item-image {
            position: relative;
            width: 120px;
            height: 90px;
            border-radius: 8px;
            overflow: hidden;
            flex-shrink: 0;
        }
        
        .favorites-modal .item-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .favorites-modal .item-type {
            position: absolute;
            top: 5px;
            left: 5px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 12px;
        }
        
        .favorites-modal .item-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .favorites-modal .item-title {
            margin: 0;
            font-size: 16px;
            color: #333;
            font-weight: 600;
        }
        
        .favorites-modal .item-description {
            margin: 0;
            color: #666;
            font-size: 14px;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .favorites-modal .item-rating {
            color: #ff6b35;
            font-size: 14px;
        }
        
        .favorites-modal .item-price {
            color: #667eea;
            font-weight: 600;
            font-size: 14px;
        }
        
        .favorites-modal .item-time {
            color: #999;
            font-size: 12px;
        }
        
        .favorites-modal .item-actions {
            display: flex;
            flex-direction: column;
            gap: 8px;
            align-items: flex-end;
        }
        
        .favorites-modal .btn-sm {
            padding: 6px 12px;
            font-size: 12px;
            min-width: 70px;
        }
        
        @media (max-width: 768px) {
            .favorites-modal .modal-content {
                width: 95%;
                max-height: 90vh;
            }
            
            .favorites-modal .favorite-item {
                flex-direction: column;
                gap: 10px;
            }
            
            .favorites-modal .item-image {
                width: 100%;
                height: 150px;
            }
            
            .favorites-modal .item-actions {
                flex-direction: row;
                justify-content: space-between;
            }
            
            .favorites-modal .favorites-tabs {
                flex-wrap: wrap;
            }
            
            .favorites-modal .tab-btn {
                flex: 1;
                min-width: 50%;
                font-size: 12px;
                padding: 12px 10px;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// 更新收藏按钮状态
function updateFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll('[data-favorite-id]');
    favoriteButtons.forEach(button => {
        const itemId = button.getAttribute('data-favorite-id');
        const itemType = button.getAttribute('data-favorite-type');
        const isFav = isFavorited(itemId, itemType);
        
        if (isFav) {
            button.textContent = '已收藏';
            button.classList.add('favorited');
        } else {
            button.textContent = '收藏';
            button.classList.remove('favorited');
        }
    });
}

// 处理收藏按钮点击
function handleFavoriteClick(button, itemData) {
    const itemId = itemData.id;
    const itemType = itemData.type;
    
    if (isFavorited(itemId, itemType)) {
        removeFromFavorites(itemId, itemType);
    } else {
        addToFavorites(itemData);
    }
}

// 初始化收藏夹功能
function initFavorites() {
    // 为收藏夹弹窗添加事件委托
    document.addEventListener('click', function(e) {
        // 处理收藏夹标签切换
        if (e.target.classList.contains('tab-btn')) {
            const tabs = document.querySelectorAll('.tab-btn');
            const contents = document.querySelectorAll('.favorites-list');
            const targetTab = e.target.getAttribute('data-tab');
            
            tabs.forEach(tab => tab.classList.remove('active'));
            contents.forEach(content => content.style.display = 'none');
            
            e.target.classList.add('active');
            const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
            if (targetContent) {
                targetContent.style.display = 'grid';
            }
        }
        
        // 处理弹窗外部点击关闭
        if (e.target.classList.contains('modal-overlay')) {
            closeFavoritesModal();
        }
    });
    
    // 更新现有的收藏按钮状态
    updateFavoriteButtons();
} 