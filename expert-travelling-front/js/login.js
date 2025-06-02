// 登录页面JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    initLoginForm();
    initPrivilegeAnimation();
    initPasswordToggle();
    initRememberLogin();
});

// 登录表单功能
function initLoginForm() {
    const loginForm = document.querySelector('.login-form');
    const usernameInput = document.querySelector('input[name="username"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const rememberCheckbox = document.querySelector('input[name="remember"]');
    const loginBtn = document.querySelector('.login-btn');
    
    // 表单数据
    const formFields = {
        username: { element: usernameInput, rules: ['required', 'username'] },
        password: { element: passwordInput, rules: ['required', 'password'] }
    };
    
    // 模拟用户数据
    const mockUsers = [
        { username: 'admin', password: '123456', role: 'admin', name: '管理员' },
        { username: 'user1', password: '123456', role: 'user', name: '张三' },
        { username: 'vip', password: '123456', role: 'vip', name: 'VIP用户' }
    ];
    
    // 表单提交
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // 处理登录
    async function handleLogin() {
        const formData = {
            username: usernameInput.value.trim(),
            password: passwordInput.value.trim(),
            remember: rememberCheckbox.checked
        };
        
        // 验证表单
        if (!validateLoginForm(formData)) {
            return;
        }
        
        // 显示加载状态
        showLoginLoading(true);
        
        try {
            // 模拟登录请求
            const result = await mockLogin(formData);
            
            if (result.success) {
                // 登录成功
                handleLoginSuccess(result.user, formData.remember);
            } else {
                // 登录失败
                handleLoginError(result.message);
            }
        } catch (error) {
            handleLoginError('登录过程中发生错误，请稍后重试');
        } finally {
            showLoginLoading(false);
        }
    }
    
    // 验证登录表单
    function validateLoginForm(data) {
        let isValid = true;
        
        // 验证用户名
        if (!data.username) {
            showFieldError(usernameInput, '请输入用户名');
            isValid = false;
        } else if (data.username.length < 3) {
            showFieldError(usernameInput, '用户名至少需要3个字符');
            isValid = false;
        } else {
            showFieldSuccess(usernameInput);
        }
        
        // 验证密码
        if (!data.password) {
            showFieldError(passwordInput, '请输入密码');
            isValid = false;
        } else if (data.password.length < 6) {
            showFieldError(passwordInput, '密码至少需要6个字符');
            isValid = false;
        } else {
            showFieldSuccess(passwordInput);
        }
        
        return isValid;
    }
    
    // 模拟登录API
    function mockLogin(credentials) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = mockUsers.find(u => 
                    u.username === credentials.username && 
                    u.password === credentials.password
                );
                
                if (user) {
                    resolve({
                        success: true,
                        user: {
                            id: user.username,
                            name: user.name,
                            role: user.role,
                            loginTime: new Date().toISOString()
                        }
                    });
                } else {
                    resolve({
                        success: false,
                        message: '用户名或密码错误'
                    });
                }
            }, 1500); // 模拟网络延迟
        });
    }
    
    // 登录成功处理
    function handleLoginSuccess(user, remember) {
        // 保存用户信息
        const userData = {
            ...user,
            remember: remember,
            loginTime: Date.now()
        };
        
        if (remember) {
            localStorage.setItem('hanzhong_user', JSON.stringify(userData));
        } else {
            sessionStorage.setItem('hanzhong_user', JSON.stringify(userData));
        }
        
        // 显示成功消息
        Utils.showMessage(`欢迎回来，${user.name}！`, 'success');
        
        // 延迟跳转
        setTimeout(() => {
            const returnUrl = new URLSearchParams(window.location.search).get('return') || 'index.html';
            window.location.href = returnUrl;
        }, 1500);
    }
    
    // 登录失败处理
    function handleLoginError(message) {
        Utils.showMessage(message, 'error');
        
        // 密码框获得焦点
        passwordInput.focus();
        passwordInput.select();
        
        // 添加震动效果
        loginForm.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            loginForm.style.animation = '';
        }, 500);
    }
    
    // 显示加载状态
    function showLoginLoading(loading) {
        if (loading) {
            loginBtn.classList.add('loading');
            loginBtn.disabled = true;
        } else {
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
        }
    }
    
    // 实时验证
    Object.values(formFields).forEach(field => {
        if (field.element) {
            field.element.addEventListener('input', function() {
                clearFieldError(this);
                
                // 实时验证
                if (this.value.trim()) {
                    if (this.name === 'username' && this.value.length >= 3) {
                        showFieldSuccess(this);
                    } else if (this.name === 'password' && this.value.length >= 6) {
                        showFieldSuccess(this);
                    }
                }
            });
            
            field.element.addEventListener('blur', function() {
                if (this.value.trim()) {
                    validateField(this);
                }
            });
        }
    });
}

// 字段验证显示
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

function showFieldSuccess(field) {
    field.classList.add('success');
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

function clearFieldError(field) {
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

// 密码显示/隐藏切换
function initPasswordToggle() {
    const passwordInput = document.querySelector('input[name="password"]');
    
    if (passwordInput) {
        // 创建眼睛图标
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'password-toggle';
        toggleBtn.innerHTML = '👁️';
        toggleBtn.style.cssText = `
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            font-size: 16px;
            color: #999;
            z-index: 10;
        `;
        
        // 设置容器相对定位
        passwordInput.parentNode.style.position = 'relative';
        passwordInput.parentNode.appendChild(toggleBtn);
        
        // 为密码框添加右边距
        passwordInput.style.paddingRight = '45px';
        
        let isVisible = false;
        
        toggleBtn.addEventListener('click', function() {
            isVisible = !isVisible;
            passwordInput.type = isVisible ? 'text' : 'password';
            this.innerHTML = isVisible ? '🙈' : '👁️';
            this.style.color = isVisible ? '#667eea' : '#999';
        });
    }
}

// 记住登录状态
function initRememberLogin() {
    const usernameInput = document.querySelector('input[name="username"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const rememberCheckbox = document.querySelector('input[name="remember"]');
    
    // 检查是否有保存的登录信息
    const savedUser = localStorage.getItem('hanzhong_user');
    if (savedUser) {
        try {
            const userData = JSON.parse(savedUser);
            
            // 检查登录是否过期（7天）
            const loginTime = userData.loginTime || 0;
            const now = Date.now();
            const daysDiff = (now - loginTime) / (1000 * 60 * 60 * 24);
            
            if (daysDiff < 7) {
                // 自动登录
                Utils.showMessage('欢迎回来！正在为您自动登录...', 'info');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
                return;
            } else {
                // 清除过期信息
                localStorage.removeItem('hanzhong_user');
            }
        } catch (error) {
            localStorage.removeItem('hanzhong_user');
        }
    }
    
    // 从记住的信息中填充表单
    const rememberedUsername = localStorage.getItem('remembered_username');
    if (rememberedUsername && usernameInput) {
        usernameInput.value = rememberedUsername;
        rememberCheckbox.checked = true;
    }
    
    // 监听记住密码选择
    if (rememberCheckbox) {
        rememberCheckbox.addEventListener('change', function() {
            if (!this.checked) {
                localStorage.removeItem('remembered_username');
            }
        });
    }
}

// 会员特权动画
function initPrivilegeAnimation() {
    const privilegeItems = document.querySelectorAll('.privilege-list li');
    
    // 特权数据
    const privileges = [
        { icon: '🎯', text: '专属客服服务，24小时在线解答' },
        { icon: '💰', text: '享受门票、酒店特价优惠' },
        { icon: '🎁', text: '生日专属礼品和祝福' },
        { icon: '⭐', text: '优先预订热门景点和活动' },
        { icon: '📱', text: '手机APP无广告体验' },
        { icon: '🏆', text: '积分兑换精美纪念品' }
    ];
    
    // 填充特权数据
    privilegeItems.forEach((item, index) => {
        if (privileges[index]) {
            item.textContent = privileges[index].text;
            item.style.setProperty('--before-content', `"${privileges[index].icon}"`);
        }
        
        // 添加悬浮效果
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.color = '#667eea';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = '#666';
        });
    });
    
    // 渐入动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.5 });
    
    privilegeItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.5s ease';
        observer.observe(item);
    });
}

// 社交登录功能
function initSocialLogin() {
    // 微信登录
    const wechatBtn = document.querySelector('.wechat-login');
    if (wechatBtn) {
        wechatBtn.addEventListener('click', function() {
            Utils.showMessage('微信登录功能开发中...', 'info');
        });
    }
    
    // QQ登录
    const qqBtn = document.querySelector('.qq-login');
    if (qqBtn) {
        qqBtn.addEventListener('click', function() {
            Utils.showMessage('QQ登录功能开发中...', 'info');
        });
    }
    
    // 微博登录
    const weiboBtn = document.querySelector('.weibo-login');
    if (weiboBtn) {
        weiboBtn.addEventListener('click', function() {
            Utils.showMessage('微博登录功能开发中...', 'info');
        });
    }
}

// 注册链接
function initRegisterLink() {
    const registerLink = document.querySelector('.register-link');
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            Utils.showMessage('注册功能开发中，请联系客服开通账号', 'info');
        });
    }
}

// 忘记密码链接
function initForgotPassword() {
    const forgotLink = document.querySelector('.forgot-password');
    if (forgotLink) {
        forgotLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = prompt('请输入您的注册邮箱地址：');
            if (email && validateEmail(email)) {
                Utils.showMessage('密码重置邮件已发送，请检查您的邮箱', 'success');
            } else if (email) {
                Utils.showMessage('请输入有效的邮箱地址', 'error');
            }
        });
    }
}

// 邮箱验证
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 添加震动动画CSS
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .password-toggle:hover {
        color: #667eea !important;
        transform: translateY(-50%) scale(1.1);
    }
    
    .form-input.error {
        animation: fieldShake 0.3s ease-in-out;
    }
    
    @keyframes fieldShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-3px); }
        75% { transform: translateX(3px); }
    }
`;
document.head.appendChild(shakeStyle);

// 初始化其他功能
initSocialLogin();
initRegisterLink();
initForgotPassword(); 