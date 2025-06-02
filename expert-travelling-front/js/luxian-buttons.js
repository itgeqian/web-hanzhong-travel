// 路线页面按钮增强效果

document.addEventListener('DOMContentLoaded', function() {
    initButtonEffects();
    initFilterTabEffects();
    initCardInteractions();
    addModalStyles();
    console.log('路线页面按钮效果已初始化');
});

// 初始化按钮特效
function initButtonEffects() {
    // 波纹效果
    const rippleButtons = document.querySelectorAll('.btn-ripple, .btn-primary');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
    
    // 主要按钮增强效果
    const primaryButtons = document.querySelectorAll('.btn-primary');
    
    primaryButtons.forEach(button => {
        // 点击动画
        button.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                showNotification('预订请求已提交！', 'success');
            }, 150);
        });
        
        // 鼠标按下效果
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        // 键盘焦点效果
        button.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.3)';
        });
        
        button.addEventListener('blur', function() {
            this.style.boxShadow = '';
        });
    });
    
    // 次要按钮（查看详情）
    const outlineButtons = document.querySelectorAll('.btn-outline');
    
    outlineButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const routeCard = this.closest('.route-card');
            if (routeCard) {
                showRouteDetailsModal(routeCard);
            }
        });
        
        // 键盘焦点效果
        button.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.3)';
        });
        
        button.addEventListener('blur', function() {
            this.style.boxShadow = '';
        });
    });
}

// 创建波纹效果
function createRippleEffect(event, element) {
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;
    
    const rect = element.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple-effect');
    
    // 移除之前的波纹
    const existingRipple = element.querySelector('.ripple-effect');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    element.appendChild(circle);
    
    // 自动移除波纹
    setTimeout(() => {
        if (circle.parentNode) {
            circle.remove();
        }
    }, 600);
}

// 初始化筛选标签效果
function initFilterTabEffects() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const routeCards = document.querySelectorAll('.route-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // 更新活动标签
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选动画
            routeCards.forEach((card, index) => {
                const shouldShow = filter === 'all' || card.dataset.category === filter;
                
                if (shouldShow) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease-out';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    card.style.transition = 'all 0.3s ease-out';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// 初始化卡片交互
function initCardInteractions() {
    const routeCards = document.querySelectorAll('.route-card');
    
    routeCards.forEach(card => {
        // 添加收藏按钮
        addFavoriteButton(card);
        
        // 卡片悬停效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 50px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
        
        // 键盘导航支持
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const detailBtn = this.querySelector('.btn-outline');
                if (detailBtn) {
                    detailBtn.click();
                }
            }
        });
    });
}

// 添加收藏按钮
function addFavoriteButton(card) {
    const routeImage = card.querySelector('.route-image');
    if (!routeImage || routeImage.querySelector('.favorite-btn')) return;
    
    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'btn-icon favorite-btn';
    favoriteBtn.innerHTML = '❤️';
    favoriteBtn.title = '收藏路线';
    favoriteBtn.setAttribute('aria-label', '收藏路线');
    
    favoriteBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        z-index: 10;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
    `;
    
    favoriteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        this.classList.toggle('favorited');
        
        if (this.classList.contains('favorited')) {
            this.innerHTML = '💖';
            this.title = '已收藏';
            this.style.animation = 'heartBeat 0.6s ease-in-out';
            showNotification('已添加到收藏夹！', 'success');
        } else {
            this.innerHTML = '❤️';
            this.title = '收藏路线';
            this.style.animation = '';
            showNotification('已从收藏夹移除', 'info');
        }
        
        // 清除动画
        setTimeout(() => {
            this.style.animation = '';
        }, 600);
    });
    
    routeImage.style.position = 'relative';
    routeImage.appendChild(favoriteBtn);
}

// 显示路线详情模态框
function showRouteDetailsModal(routeCard) {
    const routeTitle = routeCard.querySelector('.route-title')?.textContent || '路线详情';
    const routeDuration = routeCard.querySelector('.route-duration')?.textContent || '';
    const routePrice = routeCard.querySelector('.route-price')?.textContent || '';
    
    const highlights = Array.from(routeCard.querySelectorAll('.route-highlights li, ul li'))
        .map(li => li.textContent)
        .filter(text => text.trim());
    
    const modal = document.createElement('div');
    modal.className = 'route-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${routeTitle}</h2>
                    <button class="modal-close" aria-label="关闭">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="route-details">
                        <div class="detail-item">
                            <strong>行程时间：</strong><span>${routeDuration}</span>
                        </div>
                        <div class="detail-item">
                            <strong>价格：</strong><span class="price-highlight">${routePrice}</span>
                        </div>
                        ${highlights.length > 0 ? `
                        <div class="detail-item">
                            <strong>行程亮点：</strong>
                            <ul class="highlights-list">
                                ${highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                        <div class="detail-item">
                            <strong>包含服务：</strong>
                            <ul class="service-list">
                                <li>✅ 专业导游服务</li>
                                <li>✅ 景点门票</li>
                                <li>✅ 酒店住宿</li>
                                <li>✅ 交通接送</li>
                                <li>✅ 旅游保险</li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-primary btn-glow">
                            <span>💰 立即预订</span>
                        </button>
                        <button class="btn btn-outline">
                            <span>📞 咨询客服</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // 显示动画
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'translateY(0) scale(1)';
    });
    
    // 事件监听
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    const closeModal = () => {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'translateY(-20px) scale(0.9)';
        document.body.style.overflow = '';
        
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
    
    // 键盘支持
    const handleKeydown = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleKeydown);
        }
    };
    document.addEventListener('keydown', handleKeydown);
    
    // 初始化模态框内的按钮
    modal.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('btn-primary')) {
                showNotification('正在跳转到预订页面...', 'info');
                setTimeout(closeModal, 1000);
            } else {
                showNotification('客服电话：400-888-8888', 'info');
            }
        });
    });
}

// 通知系统
function showNotification(message, type = 'info') {
    // 移除已有通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        'success': '✅',
        'warning': '⚠️',
        'error': '❌',
        'info': 'ℹ️'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icons[type] || icons.info}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 显示动画
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    });
    
    // 自动移除
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 3000);
}

// 添加必要的CSS样式
function addModalStyles() {
    if (document.getElementById('luxian-button-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'luxian-button-styles';
    style.textContent = `
        /* 波纹效果 */
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* 心跳动画 */
        @keyframes heartBeat {
            0% { transform: scale(1); }
            14% { transform: scale(1.3); }
            28% { transform: scale(1); }
            42% { transform: scale(1.3); }
            70% { transform: scale(1); }
        }
        
        /* 模态框样式 */
        .route-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            background: white;
            border-radius: 20px;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            transform: translateY(-20px) scale(0.9);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }
        
        .modal-header {
            padding: 30px 30px 20px;
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 20px 20px 0 0;
        }
        
        .modal-header h2 {
            margin: 0;
            font-size: 24px;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 30px;
            cursor: pointer;
            color: rgba(255, 255, 255, 0.8);
            transition: all 0.3s ease;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-close:hover {
            color: white;
            background: rgba(255, 255, 255, 0.2);
        }
        
        .modal-body {
            padding: 30px;
        }
        
        .detail-item {
            margin-bottom: 20px;
        }
        
        .detail-item strong {
            color: #333;
            display: inline-block;
            margin-bottom: 8px;
            font-size: 16px;
        }
        
        .price-highlight {
            color: #e74c3c;
            font-size: 18px;
            font-weight: bold;
        }
        
        .highlights-list,
        .service-list {
            margin: 10px 0;
            padding-left: 20px;
        }
        
        .highlights-list li {
            margin-bottom: 8px;
            color: #666;
        }
        
        .service-list li {
            margin-bottom: 5px;
            color: #27ae60;
            font-weight: 500;
        }
        
        .modal-actions {
            display: flex;
            gap: 15px;
            margin-top: 30px;
        }
        
        /* 通知样式 */
        .notification {
            position: fixed;
            top: 30px;
            right: 30px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            padding: 15px 20px;
            z-index: 3000;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            min-width: 300px;
            max-width: 400px;
        }
        
        .notification.success { border-left: 4px solid #27ae60; }
        .notification.warning { border-left: 4px solid #f39c12; }
        .notification.error { border-left: 4px solid #e74c3c; }
        .notification.info { border-left: 4px solid #667eea; }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-icon {
            font-size: 18px;
            flex-shrink: 0;
        }
        
        .notification-message {
            color: #333;
            font-weight: 500;
            line-height: 1.4;
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
            .modal-content {
                margin: 20px;
                max-height: calc(100vh - 40px);
            }
            
            .modal-header,
            .modal-body {
                padding: 20px;
            }
            
            .notification {
                right: 20px;
                left: 20px;
                max-width: none;
                min-width: auto;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// 导出函数供其他模块使用
window.LuxianButtons = {
    createRippleEffect,
    showNotification,
    showRouteDetailsModal
}; 