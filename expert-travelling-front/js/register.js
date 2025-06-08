// 注册页面JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    initRegisterForm();
    checkUserLoginStatus();
});

// 获取用户数据库（从login.js中获取）
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

// 初始化注册表单
function initRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;
    
    // 表单提交事件
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleRegister();
    });
    
    // 实时验证
    const inputs = registerForm.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    // 用户名唯一性检查
    const usernameInput = document.getElementById('username');
    usernameInput.addEventListener('blur', function() {
        checkUsernameAvailability(this.value.trim());
    });
    
    // 邮箱唯一性检查
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('blur', function() {
        checkEmailAvailability(this.value.trim());
    });
    
    // 手机号唯一性检查
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('blur', function() {
        checkPhoneAvailability(this.value.trim());
    });
}

// 处理注册
async function handleRegister() {
    const formData = getFormData();
    
    // 验证表单
    if (!validateRegisterForm(formData)) {
        return;
    }
    
    // 显示加载状态
    showRegisterLoading(true);
    
    try {
        // 模拟注册请求
        const result = await mockRegister(formData);
        
        if (result.success) {
            // 注册成功
            handleRegisterSuccess(result.user);
        } else {
            // 注册失败
            handleRegisterError(result.message);
        }
    } catch (error) {
        handleRegisterError('注册过程中发生错误，请稍后重试');
    } finally {
        showRegisterLoading(false);
    }
}

// 获取表单数据
function getFormData() {
    const form = document.getElementById('registerForm');
    const formData = new FormData(form);
    
    // 获取兴趣爱好
    const interests = [];
    const interestCheckboxes = form.querySelectorAll('input[name="interests"]:checked');
    interestCheckboxes.forEach(checkbox => {
        interests.push(checkbox.value);
    });
    
    return {
        username: formData.get('username').trim(),
        realname: formData.get('realname').trim(),
        password: formData.get('password').trim(),
        confirmPassword: formData.get('confirmPassword').trim(),
        email: formData.get('email').trim(),
        phone: formData.get('phone').trim(),
        gender: formData.get('gender'),
        birthday: formData.get('birthday'),
        address: formData.get('address').trim(),
        interests: interests,
        agreement: formData.get('agreement') === 'on'
    };
}

// 验证注册表单
function validateRegisterForm(data) {
    let isValid = true;
    
    // 验证用户名
    if (!data.username) {
        showFieldError(document.getElementById('username'), '请输入用户名');
        isValid = false;
    } else if (data.username.length < 3 || data.username.length > 20) {
        showFieldError(document.getElementById('username'), '用户名长度应为3-20个字符');
        isValid = false;
    } else if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(data.username)) {
        showFieldError(document.getElementById('username'), '用户名只能包含字母、数字、下划线和中文');
        isValid = false;
    }
    
    // 验证真实姓名
    if (!data.realname) {
        showFieldError(document.getElementById('realname'), '请输入真实姓名');
        isValid = false;
    } else if (data.realname.length < 2) {
        showFieldError(document.getElementById('realname'), '姓名至少需要2个字符');
        isValid = false;
    }
    
    // 验证密码
    if (!data.password) {
        showFieldError(document.getElementById('password'), '请输入密码');
        isValid = false;
    } else if (data.password.length < 6 || data.password.length > 20) {
        showFieldError(document.getElementById('password'), '密码长度应为6-20个字符');
        isValid = false;
    }
    
    // 验证确认密码
    if (!data.confirmPassword) {
        showFieldError(document.getElementById('confirmPassword'), '请确认密码');
        isValid = false;
    } else if (data.password !== data.confirmPassword) {
        showFieldError(document.getElementById('confirmPassword'), '两次输入的密码不一致');
        isValid = false;
    }
    
    // 验证邮箱
    if (!data.email) {
        showFieldError(document.getElementById('email'), '请输入邮箱地址');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        showFieldError(document.getElementById('email'), '请输入有效的邮箱地址');
        isValid = false;
    }
    
    // 验证手机号
    if (!data.phone) {
        showFieldError(document.getElementById('phone'), '请输入手机号码');
        isValid = false;
    } else if (!/^1[3-9]\d{9}$/.test(data.phone)) {
        showFieldError(document.getElementById('phone'), '请输入有效的手机号码');
        isValid = false;
    }
    
    // 验证性别
    if (!data.gender) {
        showFieldError(document.getElementById('gender'), '请选择性别');
        isValid = false;
    }
    
    // 验证协议
    if (!data.agreement) {
        showFieldError(document.getElementById('agreement'), '请阅读并同意用户协议');
        isValid = false;
    }
    
    return isValid;
}

// 检查用户名可用性
function checkUsernameAvailability(username) {
    if (!username || username.length < 3) return;
    
    // 检查是否已存在
    const existingUser = getUserDatabase().find(u => u.username === username);
    if (existingUser) {
        showFieldError(document.getElementById('username'), '该用户名已被使用');
        return false;
    } else {
        showFieldSuccess(document.getElementById('username'));
        return true;
    }
}

// 检查邮箱可用性
function checkEmailAvailability(email) {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    
    // 检查是否已存在
    const existingUser = getUserDatabase().find(u => u.email === email);
    if (existingUser) {
        showFieldError(document.getElementById('email'), '该邮箱已被注册');
        return false;
    } else {
        showFieldSuccess(document.getElementById('email'));
        return true;
    }
}

// 检查手机号可用性
function checkPhoneAvailability(phone) {
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) return;
    
    // 检查是否已存在
    const existingUser = getUserDatabase().find(u => u.phone === phone);
    if (existingUser) {
        showFieldError(document.getElementById('phone'), '该手机号已被注册');
        return false;
    } else {
        showFieldSuccess(document.getElementById('phone'));
        return true;
    }
}

// 模拟注册API
function mockRegister(userData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // 检查用户名、邮箱、手机号是否已存在
            const existingUser = getUserDatabase().find(u => 
                u.username === userData.username || 
                u.email === userData.email || 
                u.phone === userData.phone
            );
            
            if (existingUser) {
                let message = '注册失败：';
                if (existingUser.username === userData.username) {
                    message += '用户名已存在';
                } else if (existingUser.email === userData.email) {
                    message += '邮箱已被注册';
                } else if (existingUser.phone === userData.phone) {
                    message += '手机号已被注册';
                }
                
                resolve({
                    success: false,
                    message: message
                });
            } else {
                // 创建新用户数据
                const newUserData = {
                    username: userData.username,
                    email: userData.email,
                    phone: userData.phone,
                    password: userData.password,
                    role: 'user',
                    name: userData.realname,
                    gender: userData.gender,
                    birthday: userData.birthday,
                    address: userData.address,
                    interests: userData.interests,
                    registerTime: new Date().toISOString()
                };
                
                // 添加到数据库
                const newUser = addUserToDatabase(newUserData);
                
                resolve({
                    success: true,
                    user: {
                        id: newUser.id,
                        username: newUser.username,
                        name: newUser.name,
                        email: newUser.email,
                        phone: newUser.phone,
                        role: newUser.role,
                        avatar: newUser.avatar,
                        registerTime: newUser.registerTime
                    }
                });
            }
        }, 2000); // 模拟网络延迟
    });
}

// 注册成功处理
function handleRegisterSuccess(user) {
    showMessage(`注册成功！欢迎加入汉中旅游，${user.name}！`, 'success');
    
    // 自动登录
    const userData = {
        ...user,
        remember: false,
        loginTime: Date.now(),
        expiresAt: null
    };
    
    // 保存到sessionStorage
    sessionStorage.setItem('hanzhong_user', JSON.stringify(userData));
    
    // 更新页面用户状态
    updateUserInterface(user);
    
    // 延迟跳转到首页
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// 注册失败处理
function handleRegisterError(message) {
    showMessage(message, 'error');
    
    // 表单震动效果
    const form = document.getElementById('registerForm');
    form.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        form.style.animation = '';
    }, 500);
}

// 显示注册加载状态
function showRegisterLoading(loading) {
    const registerBtn = document.querySelector('.register-btn');
    const btnText = registerBtn.querySelector('.btn-text');
    const btnLoading = registerBtn.querySelector('.btn-loading');
    
    if (loading) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        registerBtn.disabled = true;
        registerBtn.classList.add('loading');
    } else {
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        registerBtn.disabled = false;
        registerBtn.classList.remove('loading');
    }
}

// 字段验证
function validateField(field) {
    const value = field.value.trim();
    const name = field.name;
    let isValid = true;
    let message = '';
    
    switch (name) {
        case 'username':
            if (!value) {
                isValid = false;
                message = '请输入用户名';
            } else if (value.length < 3 || value.length > 20) {
                isValid = false;
                message = '用户名长度应为3-20个字符';
            } else if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)) {
                isValid = false;
                message = '用户名只能包含字母、数字、下划线和中文';
            }
            break;
            
        case 'realname':
            if (!value) {
                isValid = false;
                message = '请输入真实姓名';
            } else if (value.length < 2) {
                isValid = false;
                message = '姓名至少需要2个字符';
            }
            break;
            
        case 'password':
            if (!value) {
                isValid = false;
                message = '请输入密码';
            } else if (value.length < 6 || value.length > 20) {
                isValid = false;
                message = '密码长度应为6-20个字符';
            }
            break;
            
        case 'confirmPassword':
            const password = document.getElementById('password').value;
            if (!value) {
                isValid = false;
                message = '请确认密码';
            } else if (value !== password) {
                isValid = false;
                message = '两次输入的密码不一致';
            }
            break;
            
        case 'email':
            if (!value) {
                isValid = false;
                message = '请输入邮箱地址';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                isValid = false;
                message = '请输入有效的邮箱地址';
            }
            break;
            
        case 'phone':
            if (!value) {
                isValid = false;
                message = '请输入手机号码';
            } else if (!/^1[3-9]\d{9}$/.test(value)) {
                isValid = false;
                message = '请输入有效的手机号码';
            }
            break;
            
        case 'gender':
            if (!value) {
                isValid = false;
                message = '请选择性别';
            }
            break;
    }
    
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
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// 显示字段成功
function showFieldSuccess(field) {
    field.classList.add('success');
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// 清除字段错误
function clearFieldError(field) {
    field.classList.remove('error', 'success');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
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
            <img src="${userData.avatar || 'img/default-avatar.png'}" alt="用户头像" class="user-avatar" onerror="this.src='img/default-avatar.png'">
            <span class="user-welcome">欢迎您，${userData.name}</span>
            <button class="btn btn-outline logout-btn" onclick="handleLogout()">退出</button>
        </div>
    `;
}

// 处理退出登录
function handleLogout() {
    if (window.showCustomConfirm && typeof window.showCustomConfirm === 'function') {
        window.showCustomConfirm('确定要退出登录吗？', '退出登录', function() {
            clearUserData();
            showMessage('已成功退出登录', 'info');
            
            // 恢复登录注册按钮
            const userActions = document.getElementById('userActions');
            if (userActions) {
                userActions.innerHTML = `
                    <a href="register.html" class="btn btn-outline active">注册</a>
                    <a href="login.html" class="btn btn-primary">登录</a>
                `;
            }
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    } else {
        if (confirm('确定要退出登录吗？')) {
            clearUserData();
            showMessage('已成功退出登录', 'info');
            
            // 恢复登录注册按钮
            const userActions = document.getElementById('userActions');
            if (userActions) {
                userActions.innerHTML = `
                    <a href="register.html" class="btn btn-outline active">注册</a>
                    <a href="login.html" class="btn btn-primary">登录</a>
                `;
            }
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
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

// 全局函数导出
window.handleLogout = handleLogout; 