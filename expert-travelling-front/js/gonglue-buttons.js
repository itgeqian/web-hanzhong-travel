/**
 * 攻略页面按钮效果增强脚本
 * 提供现代化的交互体验
 */

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initGuideButtonEffects();
    initTabInteractions();
    initCalculatorEffects();
    addModalStyles();
});

/**
 * 初始化攻略按钮效果
 */
function initGuideButtonEffects() {
    // 为所有按钮添加波纹效果
    const buttons = document.querySelectorAll('.nav-tab, .budget-calculator button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
        
        // 添加键盘支持
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * 创建波纹效果
 */
function createRippleEffect(event, element) {
    const button = element;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        top: ${y}px;
        left: ${x}px;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 100;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * 初始化标签页交互效果
 */
function initTabInteractions() {
    const tabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // 移除所有活跃状态
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            // 添加当前活跃状态
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.display = 'block';
                
                // 添加淡入动画
                targetContent.style.opacity = '0';
                targetContent.style.transform = 'translateY(20px)';
                
                requestAnimationFrame(() => {
                    targetContent.style.transition = 'all 0.4s ease';
                    targetContent.style.opacity = '1';
                    targetContent.style.transform = 'translateY(0)';
                });
            }
            
            // 显示通知
            // showNotification(`已切换到：${this.textContent}`, 'info');
        });
        
        // 悬停效果增强
        tab.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        tab.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

/**
 * 初始化计算器效果
 */
function initCalculatorEffects() {
    const calculatorButton = document.querySelector('.budget-calculator button');
    const inputs = document.querySelectorAll('.calc-group input, .calc-group select');
    
    if (calculatorButton) {
        calculatorButton.addEventListener('click', function() {
            // 添加计算动画
            this.style.transform = 'scale(0.95)';
            this.innerHTML = '<span>🔄 计算中...</span>';
            
            setTimeout(() => {
                calculateBudget();
                this.style.transform = 'scale(1)';
                this.innerHTML = '<span>🧮 重新计算</span>';
                
                // 显示成功通知
                showNotification('预算计算完成！', 'success');
            }, 800);
        });
    }
    
    // 输入框焦点效果
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.style.borderColor = '#667eea';
            this.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
        
        // 实时计算
        input.addEventListener('change', function() {
            if (typeof calculateBudget === 'function') {
                calculateBudget();
            }
        });
    });
}

/**
 * 增强的预算计算函数
 */
function calculateBudget() {
    const days = parseInt(document.getElementById('days').value) || 3;
    const people = parseInt(document.getElementById('people').value) || 2;
    const budgetLevel = parseInt(document.getElementById('budget-level').value) || 650;
    
    const total = days * people * budgetLevel;
    const totalElement = document.getElementById('total-budget');
    
    if (totalElement) {
        // 数字滚动动画
        const currentValue = parseInt(totalElement.textContent) || 0;
        animateNumber(totalElement, currentValue, total, 800);
    }
}

/**
 * 数字滚动动画
 */
function animateNumber(element, start, end, duration) {
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * easeProgress);
        
        element.textContent = current.toLocaleString();
        element.style.color = '#667eea';
        element.style.transform = 'scale(1.1)';
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 100);
        }
    }
    
    update();
}

/**
 * 显示通知消息
 */
function showNotification(message, type = 'info') {
    // 移除现有通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        info: '#667eea',
        success: '#27ae60',
        warning: '#f39c12',
        error: '#e74c3c'
    };
    
    const icons = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        error: '❌'
    };
    
    notification.innerHTML = `
        <span class="notification-icon">${icons[type]}</span>
        <span class="notification-message">${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-left: 4px solid ${colors[type]};
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 300px;
        font-size: 14px;
        color: #333;
    `;
    
    document.body.appendChild(notification);
    
    // 滑入动画
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // 3秒后自动移除
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    }, 3000);
}

/**
 * 添加模态框样式
 */
function addModalStyles() {
    if (document.getElementById('guide-modal-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'guide-modal-styles';
    style.textContent = `
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .nav-tab {
            position: relative;
        }
        
        .nav-tab:focus {
            outline: 2px solid #667eea;
            outline-offset: 2px;
        }
        
        .budget-calculator button:focus {
            outline: 2px solid #667eea;
            outline-offset: 2px;
        }
        
        .calc-group input:focus,
        .calc-group select:focus {
            transform: scale(1.02);
            transition: all 0.3s ease;
        }
        
        .notification {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .notification-icon {
            font-size: 16px;
        }
        
        .notification-message {
            font-weight: 500;
        }
        
        /* 悬停状态增强 */
        .transport-card:hover,
        .hotel-category:hover,
        .budget-category:hover,
        .season-card:hover {
            animation: cardPulse 0.6s ease-in-out;
        }
        
        @keyframes cardPulse {
            0%, 100% { transform: translateY(-5px) scale(1); }
            50% { transform: translateY(-8px) scale(1.02); }
        }
        
        /* 焦点状态 */
        .nav-tab:focus-visible {
            outline: 3px solid rgba(102, 126, 234, 0.5);
            outline-offset: 2px;
        }
        
        .budget-calculator button:focus-visible {
            outline: 3px solid rgba(102, 126, 234, 0.5);
            outline-offset: 2px;
        }
    `;
    
    document.head.appendChild(style);
}

// 为所有卡片添加悬停效果
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.transport-card, .hotel-category, .budget-category, .season-card, .content-card, .sidebar-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}); 