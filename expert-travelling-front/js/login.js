// 登录页面JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    initUserDatabase();
    initLoginForm();
    initPrivilegeAnimation();
    checkUserLoginStatus();
});

// 初始化用户数据库
function initUserDatabase() {
    // 检查是否已有用户数据库
    let storedUsers = localStorage.getItem('hanzhong_users_db');
    if (!storedUsers) {
        // 初始化默认用户数据
        const defaultUsers = [
            { 
                id: 1,
                username: 'admin', 
                email: 'admin@hanzhong.com',
                phone: '13800138000',
                password: '123456', 
                role: 'admin', 
                name: '管理员',
                avatar: 'img/avatar-admin.jpg'
            },
            { 
                id: 2,
                username: 'zhangsan', 
                email: 'zhangsan@example.com',
                phone: '13800138001',
                password: '123456', 
                role: 'user', 
                name: '张三',
                avatar: 'img/avatar-user.jpg'
            },
            { 
                id: 3,
                username: 'vipuser', 
                email: 'vip@hanzhong.com',
                phone: '13800138002',
                password: '123456', 
                role: 'vip', 
                name: 'VIP用户',
                avatar: 'img/avatar-vip.jpg'
            }
        ];
        localStorage.setItem('hanzhong_users_db', JSON.stringify(defaultUsers));
    }
}

// 获取用户数据库
function getUserDatabase() {
    const storedUsers = localStorage.getItem('hanzhong_users_db');
    return storedUsers ? JSON.parse(storedUsers) : [];
}

// 保存用户数据库
function saveUserDatabase(users) {
    localStorage.setItem('hanzhong_users_db', JSON.stringify(users));
}

// 添加新用户到数据库
function addUserToDatabase(userData) {
    const users = getUserDatabase();
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        ...userData,
        avatar: generateUserAvatar(userData.username, userData.role || 'user')
    };
    users.push(newUser);
    saveUserDatabase(users);
    return newUser;
}

// 更新用户数据库中的用户信息
function updateUserInDatabase(userId, updates) {
    const users = getUserDatabase();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        saveUserDatabase(users);
        return users[userIndex];
    }
    return null;
}

// 根据条件查找用户
function findUserInDatabase(condition) {
    const users = getUserDatabase();
    return users.find(condition);
}

// 生成用户头像路径
function generateUserAvatar(username, role) {
    // 根据角色返回对应的头像
    switch (role) {
        case 'admin':
            return 'img/avatar-admin.jpg';
        case 'vip':
            return 'img/avatar-vip.jpg';
        default:
            return 'img/avatar-user.jpg';
    }
}

// 模拟用户数据库（动态获取）
function getMockUsers() {
    return getUserDatabase();
}

// 登录表单功能
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const accountInput = document.getElementById('loginAccount');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    const loginBtn = document.querySelector('.login-btn');
    
    if (!loginForm) return;
    
    // 表单提交事件
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    
    // 实时验证
    accountInput.addEventListener('input', function() {
        clearFieldError(this);
        if (this.value.trim()) {
            validateAccount(this.value.trim());
        }
    });
    
    passwordInput.addEventListener('input', function() {
        clearFieldError(this);
        if (this.value.length >= 6) {
            showFieldSuccess(this);
        }
    });
    
    // 处理登录
    async function handleLogin() {
        const formData = {
            account: accountInput.value.trim(),
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
        
        // 验证账号
        if (!data.account) {
            showFieldError(accountInput, '请输入用户名、邮箱或手机号');
            isValid = false;
        } else if (!validateAccount(data.account)) {
            isValid = false;
        } else {
            showFieldSuccess(accountInput);
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
    
    // 验证账号格式
    function validateAccount(account) {
        // 用户名格式：3-20位字母数字下划线
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        // 邮箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // 手机号格式
        const phoneRegex = /^1[3-9]\d{9}$/;
        
        if (usernameRegex.test(account) || emailRegex.test(account) || phoneRegex.test(account)) {
            return true;
        } else {
            showFieldError(accountInput, '请输入正确的用户名、邮箱或手机号格式');
            return false;
        }
    }
    
    // 模拟登录API
    function mockLogin(credentials) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = getMockUsers().find(u => 
                    (u.username === credentials.account || 
                     u.email === credentials.account || 
                     u.phone === credentials.account) && 
                    u.password === credentials.password
                );
                
                if (user) {
                    resolve({
                        success: true,
                        user: {
                            id: user.id,
                            username: user.username,
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            role: user.role,
                            avatar: user.avatar,
                            loginTime: new Date().toISOString()
                        }
                    });
                } else {
                    resolve({
                        success: false,
                        message: '用户名/邮箱/手机号或密码错误'
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
            loginTime: Date.now(),
            expiresAt: remember ? Date.now() + (30 * 24 * 60 * 60 * 1000) : null // 记住我30天
        };
        
        // 根据记住我选项选择存储方式
        if (remember) {
            localStorage.setItem('hanzhong_user', JSON.stringify(userData));
        } else {
            sessionStorage.setItem('hanzhong_user', JSON.stringify(userData));
        }
        
        // 显示成功消息
        showMessage(`欢迎回来，${user.name}！`, 'success');
        
        // 更新页面用户状态
        updateUserInterface(user);
        
        // 延迟跳转
        setTimeout(() => {
            const returnUrl = new URLSearchParams(window.location.search).get('return') || 'index.html';
            window.location.href = returnUrl;
        }, 1500);
    }
    
    // 登录失败处理
    function handleLoginError(message) {
        showMessage(message, 'error');
        
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
        const btnText = loginBtn.querySelector('.btn-text');
        const btnLoading = loginBtn.querySelector('.btn-loading');
        
        if (loading) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            loginBtn.disabled = true;
            loginBtn.classList.add('loading');
        } else {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            loginBtn.disabled = false;
            loginBtn.classList.remove('loading');
        }
    }
}

// 检查用户登录状态
function checkUserLoginStatus() {
    const userData = getUserData();
    if (userData) {
        // 检查是否过期
        if (userData.expiresAt && Date.now() > userData.expiresAt) {
            // 已过期，清除数据
            clearUserData();
            return;
        }
        
        // 更新用户界面
        updateUserInterface(userData);
    }
}

// 获取用户数据
function getUserData() {
    let userData = localStorage.getItem('hanzhong_user');
    if (!userData) {
        userData = sessionStorage.getItem('hanzhong_user');
    }
    
    if (userData) {
        try {
            return JSON.parse(userData);
        } catch (e) {
            console.error('解析用户数据失败:', e);
            clearUserData();
            return null;
        }
    }
    
    return null;
}

// 清除用户数据
function clearUserData() {
    localStorage.removeItem('hanzhong_user');
    sessionStorage.removeItem('hanzhong_user');
}

// 更新用户界面
function updateUserInterface(userData) {
    const userActions = document.getElementById('userActions');
    if (!userActions) return;
    
    userActions.innerHTML = `
        <div class="user-info">
            <img src="${userData.avatar || 'img/default-avatar.jpg'}" alt="用户头像" class="user-avatar" onerror="this.src='img/default-avatar.jpg'">
            <span class="user-welcome">欢迎您，${userData.name}</span>
            <button class="btn btn-outline logout-btn" onclick="handleLogout()">退出</button>
        </div>
    `;
}

// 处理退出登录
function handleLogout() {
    showCustomConfirm('确定要退出登录吗？', '退出登录', function() {
        clearUserData();
        showMessage('已成功退出登录', 'info');
        
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

// 自定义确认弹窗（如果common.js中没有定义的话）
function showCustomConfirm(message, title, onConfirm, onCancel) {
    // 检查是否已经有全局的showCustomConfirm函数
    if (window.showCustomConfirm && typeof window.showCustomConfirm === 'function') {
        return window.showCustomConfirm(message, title, onConfirm, onCancel);
    }
    
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

// 密码显示/隐藏切换
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.password-toggle-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleIcon.textContent = '👁️';
    }
}

// 忘记密码功能
let forgotPasswordStep = 1;
let verificationTimer = null;

function showForgotPassword() {
    const modal = document.getElementById('forgotPasswordModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // 重置表单状态
    resetForgotPasswordForm();
}

function closeForgotPassword() {
    const modal = document.getElementById('forgotPasswordModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // 重置表单状态
    resetForgotPasswordForm();
}

function resetForgotPasswordForm() {
    forgotPasswordStep = 1;
    
    // 重置表单
    const form = document.getElementById('forgotPasswordForm');
    form.reset();
    
    // 隐藏所有步骤
    document.getElementById('verificationGroup').style.display = 'none';
    document.getElementById('newPasswordGroup').style.display = 'none';
    document.getElementById('confirmPasswordGroup').style.display = 'none';
    
    // 重置按钮文本
    document.getElementById('resetPasswordBtn').textContent = '下一步';
    
    // 清除验证码计时器
    if (verificationTimer) {
        clearInterval(verificationTimer);
        verificationTimer = null;
    }
    
    // 重置发送验证码按钮
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    sendCodeBtn.textContent = '发送验证码';
    sendCodeBtn.disabled = false;
    
    // 清除错误信息
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
}

// 处理忘记密码表单提交
document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleForgotPasswordSubmit();
        });
    }
});

function handleForgotPasswordSubmit() {
    switch (forgotPasswordStep) {
        case 1:
            handleAccountVerification();
            break;
        case 2:
            handleVerificationCode();
            break;
        case 3:
            handlePasswordReset();
            break;
    }
}

// 第一步：验证账号
function handleAccountVerification() {
    const accountInput = document.getElementById('resetAccount');
    const account = accountInput.value.trim();
    
    if (!account) {
        showFieldError(accountInput, '请输入用户名、邮箱或手机号');
        return;
    }
    
    // 检查账号是否存在
    const user = getMockUsers().find(u => 
        u.username === account || u.email === account || u.phone === account
    );
    
    if (!user) {
        showFieldError(accountInput, '账号不存在，请检查输入');
        return;
    }
    
    // 显示验证码输入框
    document.getElementById('verificationGroup').style.display = 'block';
    document.getElementById('resetPasswordBtn').textContent = '验证验证码';
    forgotPasswordStep = 2;
    
    showMessage('账号验证成功，请获取验证码', 'success');
}

// 发送验证码
function sendVerificationCode() {
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    
    // 模拟发送验证码
    showMessage('验证码已发送，请查收（模拟验证码：123456）', 'info');
    
    // 开始倒计时
    let countdown = 60;
    sendCodeBtn.disabled = true;
    
    verificationTimer = setInterval(() => {
        sendCodeBtn.textContent = `${countdown}秒后重发`;
        countdown--;
        
        if (countdown < 0) {
            clearInterval(verificationTimer);
            sendCodeBtn.textContent = '重新发送';
            sendCodeBtn.disabled = false;
        }
    }, 1000);
}

// 第二步：验证验证码
function handleVerificationCode() {
    const codeInput = document.getElementById('verificationCode');
    const code = codeInput.value.trim();
    
    if (!code) {
        showFieldError(codeInput, '请输入验证码');
        return;
    }
    
    // 模拟验证码验证（实际应该是后端验证）
    if (code !== '123456') {
        showFieldError(codeInput, '验证码错误，请重新输入');
        return;
    }
    
    // 显示新密码输入框
    document.getElementById('newPasswordGroup').style.display = 'block';
    document.getElementById('confirmPasswordGroup').style.display = 'block';
    document.getElementById('resetPasswordBtn').textContent = '重置密码';
    forgotPasswordStep = 3;
    
    showMessage('验证码验证成功，请设置新密码', 'success');
}

// 第三步：重置密码
function handlePasswordReset() {
    const accountInput = document.getElementById('resetAccount');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const account = accountInput.value.trim();
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    
    let isValid = true;
    
    // 验证新密码
    if (!newPassword) {
        showFieldError(newPasswordInput, '请输入新密码');
        isValid = false;
    } else if (newPassword.length < 6) {
        showFieldError(newPasswordInput, '密码至少需要6个字符');
        isValid = false;
    }
    
    // 验证确认密码
    if (!confirmPassword) {
        showFieldError(confirmPasswordInput, '请确认新密码');
        isValid = false;
    } else if (newPassword !== confirmPassword) {
        showFieldError(confirmPasswordInput, '两次输入的密码不一致');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // 找到对应用户并更新密码
    const users = getUserDatabase();
    const userIndex = users.findIndex(u => 
        u.username === account || u.email === account || u.phone === account
    );
    
    if (userIndex !== -1) {
        // 更新用户密码
        users[userIndex].password = newPassword;
        saveUserDatabase(users);
        
        // 如果用户当前已登录，清除登录状态
        const currentUser = getUserData();
        if (currentUser && (currentUser.username === account || currentUser.email === account || currentUser.phone === account)) {
            clearUserData();
            // 恢复登录注册按钮
            const userActions = document.getElementById('userActions');
            if (userActions) {
                userActions.innerHTML = `
                    <a href="register.html" class="btn btn-outline">注册</a>
                    <a href="login.html" class="btn btn-primary">登录</a>
                `;
            }
        }
        
        showMessage('密码重置成功，请使用新密码登录', 'success');
        closeForgotPassword();
        
        // 清空登录表单的密码
        const loginPasswordInput = document.getElementById('password');
        if (loginPasswordInput) {
            loginPasswordInput.value = '';
        }
        
        // 将账号填入登录表单
        const loginAccountInput = document.getElementById('loginAccount');
        if (loginAccountInput) {
            loginAccountInput.value = account;
        }
    } else {
        showFieldError(accountInput, '账号不存在，密码重置失败');
    }
}

// 表单验证辅助函数
function showFieldError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function showFieldSuccess(field) {
    field.classList.add('success');
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

function clearFieldError(field) {
    field.classList.remove('error', 'success');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// 消息提示函数
function showMessage(message, type = 'info') {
    // 移除已存在的消息
    const existingMessage = document.querySelector('.message-toast');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = `message-toast message-${type}`;
    messageElement.innerHTML = `
        <div class="message-content">
            <span class="message-icon">${getMessageIcon(type)}</span>
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

function getMessageIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

// 特权动画
function initPrivilegeAnimation() {
    const privilegeItems = document.querySelectorAll('.privilege-list li');
    
    privilegeItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-fade-in');
    });
}

// 全局函数导出
window.togglePassword = togglePassword;
window.showForgotPassword = showForgotPassword;
window.closeForgotPassword = closeForgotPassword;
window.sendVerificationCode = sendVerificationCode;
window.handleLogout = handleLogout;
window.getUserData = getUserData;
window.updateUserInterface = updateUserInterface; 