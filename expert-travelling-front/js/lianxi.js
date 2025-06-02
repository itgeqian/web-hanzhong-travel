// 联系我们页面JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initCustomerService();
    initOfficeMap();
    initSocialMedia();
    initFeedbackSystem();
    initBusinessHours();
});

// 联系信息数据
const contactData = {
    office: {
        name: '汉中市旅游发展委员会',
        address: '陕西省汉中市汉台区天汉大道1号',
        phone: '0916-2696001',
        fax: '0916-2696002',
        email: 'tourism@hanzhong.gov.cn',
        website: 'www.hanzhong-tourism.com',
        coordinates: { lat: 33.0684, lng: 107.0281 }
    },
    emergencyContacts: [
        { name: '旅游咨询热线', phone: '0916-12345', available: '24小时' },
        { name: '医疗急救', phone: '120', available: '24小时' },
        { name: '公安报警', phone: '110', available: '24小时' },
        { name: '消防救援', phone: '119', available: '24小时' },
        { name: '旅游投诉', phone: '0916-2696000', available: '工作时间' }
    ],
    socialMedia: [
        { platform: '微信公众号', account: '汉中旅游', qrcode: 'img/wechat-qr.jpg' },
        { platform: '新浪微博', account: '@汉中旅游官方', url: 'https://weibo.com/hanzhongtourism' },
        { platform: '抖音', account: '汉中文旅', url: 'https://douyin.com/hanzhong' },
        { platform: '官方网站', account: 'www.hanzhong-tourism.com', url: 'http://www.hanzhong-tourism.com' }
    ]
};

// 初始化联系表单
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const inputs = {
        name: form.querySelector('input[name="name"]'),
        email: form.querySelector('input[name="email"]'),
        phone: form.querySelector('input[name="phone"]'),
        subject: form.querySelector('select[name="subject"]'),
        message: form.querySelector('textarea[name="message"]'),
        captcha: form.querySelector('input[name="captcha"]')
    };
    
    const submitBtn = form.querySelector('.submit-btn');
    const resetBtn = form.querySelector('.reset-btn');
    
    // 实时验证
    Object.entries(inputs).forEach(([key, input]) => {
        if (!input) return;
        
        input.addEventListener('blur', function() {
            validateField(key, this.value, this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    // 表单提交
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            submitContactForm();
        });
    }
    
    // 重置表单
    if (resetBtn) {
        resetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resetContactForm();
        });
    }
    
    // 字符计数
    if (inputs.message) {
        const maxLength = 500;
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.textContent = `0/${maxLength}`;
        inputs.message.parentNode.appendChild(counter);
        
        inputs.message.addEventListener('input', function() {
            const currentLength = this.value.length;
            counter.textContent = `${currentLength}/${maxLength}`;
            
            if (currentLength > maxLength * 0.9) {
                counter.style.color = '#e74c3c';
            } else {
                counter.style.color = '#666';
            }
        });
    }
    
    // 验证字段
    function validateField(field, value, element) {
        let isValid = true;
        let errorMessage = '';
        
        switch (field) {
            case 'name':
                if (!value.trim()) {
                    isValid = false;
                    errorMessage = '请输入您的姓名';
                } else if (value.trim().length < 2) {
                    isValid = false;
                    errorMessage = '姓名至少需要2个字符';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) {
                    isValid = false;
                    errorMessage = '请输入邮箱地址';
                } else if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = '邮箱格式不正确';
                }
                break;
                
            case 'phone':
                const phoneRegex = /^1[3-9]\d{9}$/;
                if (!value.trim()) {
                    isValid = false;
                    errorMessage = '请输入手机号码';
                } else if (!phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = '手机号码格式不正确';
                }
                break;
                
            case 'subject':
                if (!value) {
                    isValid = false;
                    errorMessage = '请选择咨询主题';
                }
                break;
                
            case 'message':
                if (!value.trim()) {
                    isValid = false;
                    errorMessage = '请输入留言内容';
                } else if (value.trim().length < 10) {
                    isValid = false;
                    errorMessage = '留言内容至少需要10个字符';
                }
                break;
                
            case 'captcha':
                if (!value.trim()) {
                    isValid = false;
                    errorMessage = '请输入验证码';
                }
                break;
        }
        
        if (!isValid) {
            showFieldError(element, errorMessage);
        } else {
            clearFieldError(element);
        }
        
        return isValid;
    }
    
    // 显示字段错误
    function showFieldError(element, message) {
        clearFieldError(element);
        
        element.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        element.parentNode.appendChild(errorDiv);
    }
    
    // 清除字段错误
    function clearFieldError(element) {
        element.classList.remove('error');
        const existingError = element.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // 提交联系表单
    function submitContactForm() {
        let allValid = true;
        
        // 验证所有字段
        Object.entries(inputs).forEach(([key, input]) => {
            if (!input) return;
            
            if (!validateField(key, input.value, input)) {
                allValid = false;
            }
        });
        
        if (!allValid) {
            Utils.showMessage('请检查并修正表单中的错误', 'error');
            return;
        }
        
        // 显示提交状态
        submitBtn.disabled = true;
        submitBtn.textContent = '提交中...';
        
        // 模拟提交
        setTimeout(() => {
            // 保存到本地存储
            const formData = {
                name: inputs.name.value,
                email: inputs.email.value,
                phone: inputs.phone.value,
                subject: inputs.subject.value,
                message: inputs.message.value,
                submitTime: new Date().toISOString()
            };
            
            let submissions = JSON.parse(localStorage.getItem('hanzhong_contact_submissions') || '[]');
            submissions.push(formData);
            localStorage.setItem('hanzhong_contact_submissions', JSON.stringify(submissions));
            
            // 重置表单
            resetContactForm();
            
            // 恢复按钮状态
            submitBtn.disabled = false;
            submitBtn.textContent = '提交留言';
            
            Utils.showMessage('感谢您的留言！我们会在24小时内回复您。', 'success');
            
            // 显示确认弹窗
            showSubmissionConfirmation(formData);
            
        }, 2000);
    }
    
    // 重置表单
    function resetContactForm() {
        Object.values(inputs).forEach(input => {
            if (input) {
                input.value = '';
                clearFieldError(input);
            }
        });
        
        const charCounter = form.querySelector('.char-counter');
        if (charCounter) {
            charCounter.textContent = '0/500';
            charCounter.style.color = '#666';
        }
    }
    
    // 显示提交确认
    function showSubmissionConfirmation(data) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>提交成功</h3>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="success-icon">✓</div>
                    <h4>感谢您的留言！</h4>
                    <p>我们已收到您的咨询，以下是您的留言信息：</p>
                    <div class="submission-details">
                        <div class="detail-item">
                            <span class="label">姓名：</span>
                            <span class="value">${data.name}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">邮箱：</span>
                            <span class="value">${data.email}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">主题：</span>
                            <span class="value">${data.subject}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">提交时间：</span>
                            <span class="value">${new Date(data.submitTime).toLocaleString()}</span>
                        </div>
                    </div>
                    <p class="response-note">我们会在24小时内通过邮箱回复您的咨询。</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', function() {
            modal.remove();
            document.body.style.overflow = 'auto';
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// 初始化客服系统
function initCustomerService() {
    const chatWidget = document.querySelector('.chat-widget');
    if (!chatWidget) return;
    
    let isOpen = false;
    let messages = [];
    
    // 创建聊天界面
    const chatHTML = `
        <div class="chat-toggle" onclick="toggleChat()">
            <span class="chat-icon">💬</span>
            <span class="chat-text">在线客服</span>
            <div class="notification-dot" style="display: none;"></div>
        </div>
        <div class="chat-window" style="display: none;">
            <div class="chat-header">
                <h4>在线客服</h4>
                <div class="chat-status">
                    <span class="status-dot online"></span>
                    <span>客服在线</span>
                </div>
                <button class="chat-close" onclick="toggleChat()">&times;</button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="welcome-message">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">
                        <p>您好！欢迎咨询汉中旅游，我是您的专属客服小助手。</p>
                        <p>我可以帮您解答以下问题：</p>
                        <div class="quick-actions">
                            <button class="quick-btn" onclick="sendQuickMessage('景点推荐')">景点推荐</button>
                            <button class="quick-btn" onclick="sendQuickMessage('路线规划')">路线规划</button>
                            <button class="quick-btn" onclick="sendQuickMessage('美食咨询')">美食咨询</button>
                            <button class="quick-btn" onclick="sendQuickMessage('住宿推荐')">住宿推荐</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat-input">
                <input type="text" id="chatInput" placeholder="请输入您的问题..." maxlength="200">
                <button id="sendBtn" onclick="sendMessage()">发送</button>
            </div>
        </div>
    `;
    
    chatWidget.innerHTML = chatHTML;
    
    // 回车发送消息
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // 切换聊天窗口
    window.toggleChat = function() {
        const chatWindow = chatWidget.querySelector('.chat-window');
        const chatToggle = chatWidget.querySelector('.chat-toggle');
        
        isOpen = !isOpen;
        
        if (isOpen) {
            chatWindow.style.display = 'block';
            chatToggle.style.display = 'none';
            chatInput.focus();
        } else {
            chatWindow.style.display = 'none';
            chatToggle.style.display = 'flex';
        }
    };
    
    // 发送消息
    window.sendMessage = function() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        addMessage('user', message);
        input.value = '';
        
        // 模拟客服回复
        setTimeout(() => {
            const reply = getAutoReply(message);
            addMessage('agent', reply);
        }, 1000);
    };
    
    // 快速消息
    window.sendQuickMessage = function(message) {
        addMessage('user', message);
        
        setTimeout(() => {
            const reply = getAutoReply(message);
            addMessage('agent', reply);
        }, 1000);
    };
    
    // 添加消息
    function addMessage(sender, content) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = sender === 'user' ? '👤' : '🤖';
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <p>${content}</p>
                <span class="message-time">${time}</span>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        messages.push({ sender, content, time: new Date() });
    }
    
    // 自动回复
    function getAutoReply(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('景点') || lowerMessage.includes('推荐')) {
            return '汉中有很多精彩景点！推荐您游览汉中博物馆、石门栈道、朱鹮梨园、武侯祠等。具体想了解哪个景点呢？';
        } else if (lowerMessage.includes('路线') || lowerMessage.includes('规划')) {
            return '我们为您推荐几条经典路线：文化古迹线、自然风光线、美食体验线。您更偏向哪种类型的旅行？';
        } else if (lowerMessage.includes('美食')) {
            return '汉中美食丰富多彩！必尝的有汉中面皮、菜豆腐、浆水面、粉皮子等特色小吃。您想了解具体哪种美食？';
        } else if (lowerMessage.includes('住宿') || lowerMessage.includes('酒店')) {
            return '汉中有各类住宿选择，从经济型到豪华型都有。建议选择市中心或景区附近的酒店。您的预算大概是多少？';
        } else if (lowerMessage.includes('交通')) {
            return '汉中交通便利，有机场、高铁、高速公路。市内有公交、出租车、网约车等。您从哪里出发呢？';
        } else if (lowerMessage.includes('天气')) {
            return '汉中四季分明，春秋最宜旅游。建议您关注天气预报，准备合适衣物。需要其他旅行建议吗？';
        } else {
            return '感谢您的咨询！您的问题我已记录，稍后会有专业客服为您详细解答。还有其他问题吗？';
        }
    }
}

// 初始化办公地址地图
function initOfficeMap() {
    const mapContainer = document.querySelector('.office-map');
    if (!mapContainer) return;
    
    const office = contactData.office;
    
    mapContainer.innerHTML = `
        <div class="map-header">
            <h3>办公地址</h3>
            <button class="map-btn" onclick="getDirections()">获取路线</button>
        </div>
        <div class="map-content">
            <div class="office-info">
                <h4>${office.name}</h4>
                <div class="info-item">
                    <span class="info-icon">📍</span>
                    <span>${office.address}</span>
                </div>
                <div class="info-item">
                    <span class="info-icon">📞</span>
                    <span>${office.phone}</span>
                </div>
                <div class="info-item">
                    <span class="info-icon">📠</span>
                    <span>${office.fax}</span>
                </div>
                <div class="info-item">
                    <span class="info-icon">✉️</span>
                    <span>${office.email}</span>
                </div>
            </div>
            <div class="map-placeholder">
                <div class="map-display">
                    <p>🗺️ 交互地图</p>
                    <p>点击获取详细路线</p>
                    <div class="coordinates">
                        坐标：${office.coordinates.lat}, ${office.coordinates.lng}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    window.getDirections = function() {
        Utils.showMessage('正在获取导航路线...', 'info');
    };
}

// 初始化社交媒体
function initSocialMedia() {
    const socialContainer = document.querySelector('.social-media');
    if (!socialContainer) return;
    
    socialContainer.innerHTML = `
        <h3>关注我们</h3>
        <div class="social-platforms">
            ${contactData.socialMedia.map(social => `
                <div class="social-item">
                    <div class="social-icon">${getSocialIcon(social.platform)}</div>
                    <div class="social-info">
                        <h4>${social.platform}</h4>
                        <p>${social.account}</p>
                        ${social.qrcode ? `<img src="${social.qrcode}" alt="二维码" class="qr-code">` : ''}
                    </div>
                    ${social.url ? `<a href="${social.url}" target="_blank" class="social-link">访问</a>` : ''}
                </div>
            `).join('')}
        </div>
    `;
    
    function getSocialIcon(platform) {
        const icons = {
            '微信公众号': '💬',
            '新浪微博': '📱',
            '抖音': '🎵',
            '官方网站': '🌐'
        };
        return icons[platform] || '📧';
    }
}

// 初始化反馈系统
function initFeedbackSystem() {
    const feedbackContainer = document.querySelector('.feedback-section');
    if (!feedbackContainer) return;
    
    feedbackContainer.innerHTML = `
        <h3>服务评价</h3>
        <div class="rating-section">
            <p>请为我们的服务打分：</p>
            <div class="star-rating" id="serviceRating">
                ${[1,2,3,4,5].map(i => `<span class="star" data-rating="${i}">☆</span>`).join('')}
            </div>
            <div class="rating-text">请选择评分</div>
        </div>
        <div class="feedback-form">
            <textarea placeholder="请留下您的宝贵建议..." id="feedbackText" maxlength="300"></textarea>
            <div class="feedback-actions">
                <button class="btn btn-primary" onclick="submitFeedback()">提交反馈</button>
                <div class="char-count">0/300</div>
            </div>
        </div>
    `;
    
    // 星级评分
    const stars = feedbackContainer.querySelectorAll('.star');
    const ratingText = feedbackContainer.querySelector('.rating-text');
    let currentRating = 0;
    
    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            currentRating = index + 1;
            updateStars();
            updateRatingText();
        });
        
        star.addEventListener('mouseenter', function() {
            highlightStars(index + 1);
        });
    });
    
    feedbackContainer.querySelector('.star-rating').addEventListener('mouseleave', function() {
        updateStars();
    });
    
    function updateStars() {
        stars.forEach((star, index) => {
            if (index < currentRating) {
                star.textContent = '★';
                star.style.color = '#ffc107';
            } else {
                star.textContent = '☆';
                star.style.color = '#ddd';
            }
        });
    }
    
    function highlightStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.textContent = '★';
                star.style.color = '#ffc107';
            } else {
                star.textContent = '☆';
                star.style.color = '#ddd';
            }
        });
    }
    
    function updateRatingText() {
        const texts = ['', '很不满意', '不满意', '一般', '满意', '非常满意'];
        ratingText.textContent = texts[currentRating];
    }
    
    // 字符计数
    const textarea = feedbackContainer.querySelector('#feedbackText');
    const charCount = feedbackContainer.querySelector('.char-count');
    
    textarea.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = `${count}/300`;
        
        if (count > 270) {
            charCount.style.color = '#e74c3c';
        } else {
            charCount.style.color = '#666';
        }
    });
    
    // 提交反馈
    window.submitFeedback = function() {
        if (currentRating === 0) {
            Utils.showMessage('请先为我们的服务评分', 'warning');
            return;
        }
        
        const feedback = textarea.value.trim();
        if (!feedback) {
            Utils.showMessage('请填写您的反馈意见', 'warning');
            return;
        }
        
        // 保存反馈
        const feedbackData = {
            rating: currentRating,
            feedback: feedback,
            submitTime: new Date().toISOString()
        };
        
        let feedbacks = JSON.parse(localStorage.getItem('hanzhong_feedbacks') || '[]');
        feedbacks.push(feedbackData);
        localStorage.setItem('hanzhong_feedbacks', JSON.stringify(feedbacks));
        
        // 重置表单
        currentRating = 0;
        updateStars();
        ratingText.textContent = '请选择评分';
        textarea.value = '';
        charCount.textContent = '0/300';
        charCount.style.color = '#666';
        
        Utils.showMessage('感谢您的反馈！我们会持续改进服务质量。', 'success');
    };
}

// 初始化营业时间
function initBusinessHours() {
    const hoursContainer = document.querySelector('.business-hours');
    if (!hoursContainer) return;
    
    const hours = [
        { day: '周一至周五', time: '08:30 - 17:30', note: '工作日' },
        { day: '周六至周日', time: '09:00 - 17:00', note: '周末' },
        { day: '法定节假日', time: '09:00 - 16:30', note: '节假日' }
    ];
    
    const emergency = contactData.emergencyContacts;
    
    hoursContainer.innerHTML = `
        <h3>营业时间</h3>
        <div class="hours-list">
            ${hours.map(item => `
                <div class="hours-item">
                    <div class="day-info">
                        <span class="day">${item.day}</span>
                        <span class="note">${item.note}</span>
                    </div>
                    <div class="time">${item.time}</div>
                </div>
            `).join('')}
        </div>
        <h3>紧急联系方式</h3>
        <div class="emergency-contacts">
            ${emergency.map(contact => `
                <div class="emergency-item">
                    <div class="contact-info">
                        <span class="contact-name">${contact.name}</span>
                        <span class="contact-phone">${contact.phone}</span>
                    </div>
                    <div class="availability">${contact.available}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// 全局函数
window.toggleChat = toggleChat;
window.sendMessage = sendMessage;
window.sendQuickMessage = sendQuickMessage;
window.getDirections = getDirections;
window.submitFeedback = submitFeedback; 