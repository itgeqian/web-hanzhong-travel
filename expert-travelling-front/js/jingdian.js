// 景点介绍页面JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    // 首先检查用户登录状态
    checkGlobalUserStatus();
    
    // 首先初始化景点卡片（如果需要动态生成）
    // initAttractionCards();
    
    // 然后初始化分类导航（这时HTML中的卡片已经存在）
    initCategoryNav();
    
    // 最后初始化其他功能
    initRankingList();
    initAttractionModal();
    initSearchFunction();
    
    // 初始化收藏状态 - 确保在页面加载完成后执行
    setTimeout(() => {
        initAttractionFavoriteStatus();
        // 同时调用全局状态更新函数
        if (typeof updateAllFavoriteButtonsStatus === 'function') {
            updateAllFavoriteButtonsStatus();
        }
    }, 100);
});

// 景点数据
const attractionsData = [
    {
        id: 'zhuyu-liyuan',
        name: '朱鹮梨园',
        category: '自然生态',
        image: 'img/zhuyu-liyuan.jpg',
        rating: 4.8,
        price: 60,
        description: '世界朱鹮之乡，万亩梨花海洋。每年春季，梨花盛开如雪，与朱鹮飞舞形成绝美画卷。',
        openTime: '8:00-18:00',
        address: '汉中市洋县朱鹮梨园景区',
        phone: '0916-8212345',
        duration: '2-3小时',
        highlights: ['朱鹮观赏', '梨花海洋', '生态摄影', '自然教育'],
        tips: ['春季梨花盛开最美', '携带望远镜观鸟', '注意保护环境', '适合亲子游览']
    },
    {
        id: 'shimen-zhandao',
        name: '石门栈道',
        category: '历史文化',
        image: 'img/shimen-zhandao.jpg',
        rating: 4.7,
        price: 80,
        description: '古代蜀道遗址，见证汉中历史变迁。栈道依山而建，惊险壮观，是古代交通的奇迹。',
        openTime: '8:30-17:30',
        address: '汉中市汉台区河东店镇',
        phone: '0916-2345678',
        duration: '3-4小时',
        highlights: ['古栈道遗址', '石门十三品', '褒斜道文化', '山水风光'],
        tips: ['穿着舒适的登山鞋', '注意安全防护', '了解历史背景', '适合历史爱好者']
    },
    {
        id: 'wuhou-ci',
        name: '勉县武侯祠',
        category: '历史文化',
        image: 'img/wuhou-ci.jpg',
        rating: 4.9,
        price: 50,
        description: '纪念诸葛亮的历史名胜，三国文化圣地。祠内古柏参天，文物众多。',
        openTime: '8:00-18:00',
        address: '汉中市勉县武侯镇',
        phone: '0916-3456789',
        duration: '2-3小时',
        highlights: ['诸葛亮墓', '古柏森林', '三国文物', '历史建筑'],
        tips: ['了解三国历史', '参观文物展览', '感受古柏神韵', '适合文化游']
    },
    {
        id: 'hanshui-yuan',
        name: '汉水源头',
        category: '自然风光',
        image: 'img/hanshui-yuan.jpg',
        rating: 4.6,
        price: 0,
        description: '汉江发源地，山清水秀，风景如画。水质清澈，环境优美。',
        openTime: '全天开放',
        address: '汉中市宁强县汉水源头',
        phone: '0916-4567890',
        duration: '1-2小时',
        highlights: ['汉江源头', '原始森林', '清澈泉水', '生态环境'],
        tips: ['保护水源环境', '适合徒步探索', '带好饮用水', '注意安全']
    },
    {
        id: 'baohe-zhandao',
        name: '褒河栈道',
        category: '自然风光',
        image: 'img/baohe-zhandao.jpg',
        rating: 4.5,
        price: 30,
        description: '沿褒河而建的现代栈道，集观光、健身于一体。栈道蜿蜒曲折，沿途风光秀美。',
        openTime: '7:00-19:00',
        address: '汉中市汉台区褒河沿岸',
        phone: '0916-5678901',
        duration: '2-4小时',
        highlights: ['河岸风光', '健身步道', '观景平台', '生态环境'],
        tips: ['适合晨练健身', '沿途风景优美', '注意防滑', '适合全家游览']
    },
    {
        id: 'zhangliang-miao',
        name: '张良庙',
        category: '历史文化',
        image: 'img/zhangliang-miao.jpg',
        rating: 4.4,
        price: 40,
        description: '纪念汉初三杰之一张良的古建筑群，建筑古朴典雅，环境清幽。',
        openTime: '8:00-17:30',
        address: '汉中市留坝县留侯镇',
        phone: '0916-6789012',
        duration: '1-2小时',
        highlights: ['古建筑群', '张良文化', '园林景观', '历史故事'],
        tips: ['了解张良生平', '欣赏古建筑', '感受历史氛围', '适合文化游']
    }
];

// 分类导航功能
function initCategoryNav() {
    const categoryItems = document.querySelectorAll('.category-item');
    const attractionCards = document.querySelectorAll('.attraction-card');
    
    // 统计各分类的景点数量
    const categoryData = {
        'all': attractionCards.length,
        'history': document.querySelectorAll('.attraction-card[data-category="history"]').length,
        'nature': document.querySelectorAll('.attraction-card[data-category="nature"]').length,
        'mountain': document.querySelectorAll('.attraction-card[data-category="mountain"]').length,
        'water': document.querySelectorAll('.attraction-card[data-category="water"]').length
    };
    
    // 初始化分类按钮
    categoryItems.forEach((item) => {
        const category = item.dataset.category;
        const originalText = item.textContent.replace(/\s*\(\d+\)$/, ''); // 移除可能已存在的数量
        const count = categoryData[category] || 0;
        
        // 更新显示文本
        item.textContent = `${originalText} (${count})`;
        
        // 分类点击事件
        item.addEventListener('click', function() {
            const selectedCategory = this.dataset.category;
            
            // 更新活动状态
            categoryItems.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选景点
            filterAttractions(selectedCategory);
        });
    });
    
    // 默认选中第一个
    if (categoryItems.length > 0) {
        categoryItems[0].classList.add('active');
    }
}

// 筛选景点
function filterAttractions(category) {
    const attractionCards = document.querySelectorAll('.attraction-card');
    
    attractionCards.forEach((card) => {
        const cardCategory = card.dataset.category;
        
        if (category === 'all' || cardCategory === category) {
            // 显示卡片
            card.style.display = 'block';
            card.classList.remove('hidden');
            setTimeout(() => {
                card.classList.add('show');
            }, 100);
        } else {
            // 隐藏卡片
            card.classList.remove('show');
            card.classList.add('hidden');
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    // 更新结果计数
    updateResultCount(category);
}

// 更新结果计数
function updateResultCount(category) {
    const visibleCards = document.querySelectorAll('.attraction-card[style*="display: block"], .attraction-card:not([style*="display: none"])');
    const count = visibleCards.length;
    
    // 如果页面上有结果计数元素，则更新它
    const resultText = document.querySelector('.result-count');
    if (resultText) {
        resultText.textContent = `找到 ${count} 个景点`;
    }
}

// 初始化景点卡片
function initAttractionCards() {
    const attractionsGrid = document.querySelector('.attractions-grid');
    
    if (!attractionsGrid) return;
    
    // 清空现有内容
    attractionsGrid.innerHTML = '';
    
    // 生成景点卡片
    attractionsData.forEach((attraction, index) => {
        const card = createAttractionCard(attraction, index);
        attractionsGrid.appendChild(card);
    });
    
    // 添加滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.attraction-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// 创建景点卡片
function createAttractionCard(attraction, index) {
    const card = document.createElement('div');
    card.className = 'attraction-card';
    card.dataset.id = attraction.id;
    
    card.innerHTML = `
        <div class="card-image">
            <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
            <div class="card-overlay">
                <span class="card-tag">${getCategoryName(attraction.category)}</span>
            </div>
        </div>
        <div class="card-content">
            <h3 class="card-title">${attraction.name}</h3>
            <div class="card-rating">
                <span class="stars">${generateStars(attraction.rating)}</span>
                <span class="rating-text">${attraction.rating}分</span>
            </div>
            <p class="card-description">${attraction.description}</p>
            <div class="card-info">
                <div class="info-item">
                    <span class="info-label">门票价格</span>
                    <span class="info-value price">￥${attraction.price}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">开放时间</span>
                    <span class="info-value">${attraction.openTime}</span>
                </div>
            </div>
            <div class="card-actions">
                <button class="btn btn-primary" onclick="showAttractionModal(${attraction.id})">
                    查看详情
                </button>
                <button class="btn btn-outline" onclick="addToFavorites(${attraction.id})">
                    收藏
                </button>
            </div>
        </div>
    `;
    
    // 添加卡片悬浮效果
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        const img = this.querySelector('img');
        if (img) img.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        const img = this.querySelector('img');
        if (img) img.style.transform = 'scale(1)';
    });
    
    return card;
}

// 获取分类名称
function getCategoryName(category) {
    const categoryNames = {
        'history': '历史文化',
        'nature': '自然风光',
        'mountain': '山岳景观',
        'water': '水景名胜'
    };
    return categoryNames[category] || '其他';
}

// 生成星级评分
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    
    if (hasHalfStar) {
        stars += '☆';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }
    
    return stars;
}

// 初始化排行榜
function initRankingList() {
    const rankingList = document.querySelector('.attraction-ranking');
    
    if (!rankingList) return;
    
    // 按评分排序
    const sortedAttractions = [...attractionsData]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6);
    
    // 清空现有内容
    rankingList.innerHTML = '';
    
    // 生成排行榜项目
    sortedAttractions.forEach((attraction, index) => {
        const item = document.createElement('li');
        item.className = 'ranking-item';
        
        item.innerHTML = `
            <div class="rank-number">${index + 1}</div>
            <div class="rank-content">
                <h4>${attraction.name}</h4>
                <p>${attraction.description}</p>
            </div>
            <div class="rank-score">${attraction.rating}</div>
        `;
        
        // 添加点击事件
        item.addEventListener('click', function() {
            showAttractionModal(attraction.id);
        });
        
        rankingList.appendChild(item);
    });
}

// 景点详情弹窗
function initAttractionModal() {
    // 创建弹窗HTML
    const modalHTML = `
        <div id="attractionModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title"></h2>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="" alt="">
                    </div>
                    <div class="modal-info">
                        <div class="info-grid">
                            <div class="info-item">
                                <span class="info-label">评分</span>
                                <span class="info-value rating"></span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">门票</span>
                                <span class="info-value price"></span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">开放时间</span>
                                <span class="info-value time"></span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">地址</span>
                                <span class="info-value address"></span>
                            </div>
                        </div>
                        <div class="description"></div>
                        <div class="features">
                            <h4>景点特色</h4>
                            <div class="features-tags"></div>
                        </div>
                        <div class="details">
                            <h4>详细介绍</h4>
                            <p class="details-text"></p>
                        </div>
                        <div class="modal-actions">
                            <button class="btn btn-primary">立即预订</button>
                            <button class="btn btn-outline">查看路线</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 添加到页面
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // 添加样式
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .modal {
            display: none;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            backdrop-filter: blur(10px);
        }
        
        .modal-content {
            position: relative;
            background-color: white;
            margin: 5% auto;
            padding: 0;
            border-radius: 20px;
            width: 90%;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
            animation: modalSlideIn 0.3s ease-out;
        }
        
        @keyframes modalSlideIn {
            from { opacity: 0; transform: translateY(-50px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 25px 30px;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .modal-title {
            margin: 0;
            font-size: 24px;
            color: #333;
        }
        
        .modal-close {
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            color: #999;
            transition: color 0.3s ease;
        }
        
        .modal-close:hover {
            color: #667eea;
        }
        
        .modal-body {
            padding: 30px;
        }
        
        .modal-image img {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: 15px;
            margin-bottom: 25px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 25px;
        }
        
        .info-item {
            padding: 15px;
            background: #f8f9fa;
            border-radius: 10px;
            text-align: center;
        }
        
        .info-label {
            display: block;
            font-size: 12px;
            color: #666;
            margin-bottom: 8px;
        }
        
        .info-value {
            font-size: 16px;
            font-weight: bold;
            color: #333;
        }
        
        .info-value.price {
            color: #e74c3c;
        }
        
        .description {
            margin-bottom: 25px;
            color: #666;
            line-height: 1.8;
        }
        
        .features h4, .details h4 {
            margin-bottom: 15px;
            color: #333;
        }
        
        .features-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 25px;
        }
        
        .feature-tag {
            padding: 8px 15px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 20px;
            font-size: 14px;
        }
        
        .details-text {
            color: #666;
            line-height: 1.8;
            margin-bottom: 30px;
        }
        
        .modal-actions {
            display: flex;
            gap: 15px;
        }
        
        .modal-actions .btn {
            flex: 1;
            padding: 12px 20px;
        }
        
        @media (max-width: 768px) {
            .modal-content {
                margin: 10% auto;
                width: 95%;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .info-grid {
                grid-template-columns: 1fr;
                gap: 15px;
            }
            
            .modal-actions {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(modalStyle);
    
    // 绑定关闭事件
    const modal = document.getElementById('attractionModal');
    const closeBtn = modal.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', hideAttractionModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideAttractionModal();
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            hideAttractionModal();
        }
    });
}

// 显示景点详情弹窗
function showAttractionModal(attractionId) {
    const attraction = attractionsData.find(item => item.id === attractionId);
    if (!attraction) return;
    
    const modal = document.getElementById('attractionModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalImage = modal.querySelector('.modal-image img');
    const ratingValue = modal.querySelector('.rating');
    const priceValue = modal.querySelector('.price');
    const timeValue = modal.querySelector('.time');
    const addressValue = modal.querySelector('.address');
    const description = modal.querySelector('.description');
    const featuresContainer = modal.querySelector('.features-tags');
    const detailsText = modal.querySelector('.details-text');
    
    // 填充数据
    modalTitle.textContent = attraction.name;
    modalImage.src = attraction.image;
    modalImage.alt = attraction.name;
    ratingValue.textContent = `${attraction.rating}分`;
    priceValue.textContent = `￥${attraction.price}`;
    timeValue.textContent = attraction.openTime;
    addressValue.textContent = attraction.address;
    description.textContent = attraction.description;
    detailsText.textContent = attraction.details;
    
    // 生成特色标签
    featuresContainer.innerHTML = '';
    attraction.features.forEach(feature => {
        const tag = document.createElement('span');
        tag.className = 'feature-tag';
        tag.textContent = feature;
        featuresContainer.appendChild(tag);
    });
    
    // 显示弹窗
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// 隐藏景点详情弹窗
function hideAttractionModal() {
    const modal = document.getElementById('attractionModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 添加到收藏
function addToFavorites(attractionId) {
    const attraction = attractionsData.find(item => item.id === attractionId);
    if (!attraction) return;
    
    // 获取现有收藏
    let favorites = JSON.parse(localStorage.getItem('hanzhong_favorites') || '[]');
    
    // 检查是否已收藏
    if (favorites.includes(attractionId)) {
        Utils.showMessage('已经收藏过该景点了', 'info');
        return;
    }
    
    // 添加收藏
    favorites.push(attractionId);
    localStorage.setItem('hanzhong_favorites', JSON.stringify(favorites));
    
    Utils.showMessage(`已收藏 ${attraction.name}`, 'success');
}

// 搜索功能
function initSearchFunction() {
    const searchInput = document.querySelector('.search-attractions');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', Utils.debounce(function() {
        const keyword = this.value.trim().toLowerCase();
        searchAttractions(keyword);
    }, 300));
}

// 搜索景点
function searchAttractions(keyword) {
    const attractionCards = document.querySelectorAll('.attraction-card');
    
    if (!keyword) {
        // 显示所有卡片
        attractionCards.forEach(card => {
            card.style.display = 'block';
        });
        return;
    }
    
    // 搜索匹配
    attractionCards.forEach((card, index) => {
        const attraction = attractionsData[index];
        if (!attraction) return;
        
        const isMatch = attraction.name.toLowerCase().includes(keyword) ||
                       attraction.description.toLowerCase().includes(keyword) ||
                       attraction.features.some(feature => feature.toLowerCase().includes(keyword));
        
        card.style.display = isMatch ? 'block' : 'none';
    });
}

// 全局函数
window.showAttractionModal = showAttractionModal;
window.addToFavorites = addToFavorites;

// 初始化景点收藏状态
function initAttractionFavoriteStatus() {
    // 检查用户是否登录
    const userData = getGlobalUserData();
    
    // 检查所有收藏按钮的状态
    const favoriteButtons = document.querySelectorAll('[data-favorite-id]');
    favoriteButtons.forEach(button => {
        const attractionId = button.getAttribute('data-favorite-id');
        const favoriteType = button.getAttribute('data-favorite-type');
        
        if (attractionId && (favoriteType === 'attraction' || !favoriteType)) {
            if (!userData) {
                // 用户未登录，重置按钮状态
                updateSingleAttractionFavoriteButton(button, false);
            } else {
                // 用户已登录，检查收藏状态
                const isFavorited = checkAttractionFavoriteStatus(attractionId);
                updateSingleAttractionFavoriteButton(button, isFavorited);
            }
        }
    });
}

// 更新单个收藏按钮状态
function updateSingleAttractionFavoriteButton(button, isFavorited) {
    if (isFavorited) {
        button.textContent = '已收藏';
        button.classList.add('favorited');
    } else {
        button.textContent = '收藏';
        button.classList.remove('favorited');
    }
}

// 修改收藏景点功能
function collectAttraction(attractionId) {
    // 检查用户登录状态
    const userData = getGlobalUserData();
    if (!userData) {
        showCustomConfirm(
            '您需要先登录才能收藏景点，是否前往登录？',
            '需要登录',
            function() {
                window.location.href = 'login.html?return=' + encodeURIComponent(window.location.href);
            }
        );
        return;
    }

    // 获取当前收藏列表
    let favorites = JSON.parse(localStorage.getItem('hanzhong_favorites') || '[]');
    
    // 查找景点信息
    const attraction = attractionsData.find(a => a.id === attractionId);
    if (!attraction) {
        showGlobalMessage('景点信息未找到', 'error');
        return;
    }

    // 检查是否已收藏
    const existingIndex = favorites.findIndex(fav => fav.id === attractionId && fav.type === 'attraction');
    
    if (existingIndex !== -1) {
        // 已收藏，取消收藏
        favorites.splice(existingIndex, 1);
        localStorage.setItem('hanzhong_favorites', JSON.stringify(favorites));
        showGlobalMessage('已取消收藏', 'info');
        
        // 更新按钮状态
        updateAttractionFavoriteButtons(attractionId, false);
    } else {
        // 未收藏，添加收藏
        const favoriteItem = {
            id: attractionId,
            type: 'attraction',
            title: attraction.name,
            description: attraction.description,
            image: attraction.image,
            rating: attraction.rating,
            price: `￥${attraction.price}`,
            url: `jingdian.html#attraction-${attractionId}`,
            addTime: new Date().toISOString()
        };
        
        favorites.push(favoriteItem);
        localStorage.setItem('hanzhong_favorites', JSON.stringify(favorites));
        showGlobalMessage('收藏成功！', 'success');
        
        // 更新按钮状态
        updateAttractionFavoriteButtons(attractionId, true);
    }
}

// 更新收藏按钮状态
function updateAttractionFavoriteButtons(attractionId, isFavorited) {
    // 更新所有相关的收藏按钮
    const cardButtons = document.querySelectorAll(`[data-favorite-id="${attractionId}"]`);
    cardButtons.forEach(button => {
        updateSingleAttractionFavoriteButton(button, isFavorited);
    });
    
    // 更新详情页面的收藏按钮
    const detailButton = document.querySelector('.attraction-detail .collect-btn');
    if (detailButton) {
        updateSingleAttractionFavoriteButton(detailButton, isFavorited);
    }
}

// 检查景点收藏状态
function checkAttractionFavoriteStatus(attractionId) {
    const favorites = JSON.parse(localStorage.getItem('hanzhong_favorites') || '[]');
    return favorites.some(fav => fav.id === attractionId && fav.type === 'attraction');
}

// 显示景点详情（修改版本，移除立即订购按钮）
function showAttractionDetail(attractionId) {
    const attraction = attractionsData.find(a => a.id === attractionId);
    if (!attraction) {
        showGlobalMessage('景点信息未找到', 'error');
        return;
    }

    // 检查收藏状态
    const isFavorited = checkAttractionFavoriteStatus(attractionId);

    // 确保highlights和tips是数组
    const highlights = Array.isArray(attraction.highlights) ? attraction.highlights : [];
    const tips = Array.isArray(attraction.tips) ? attraction.tips : [];

    const modal = document.createElement('div');
    modal.className = 'attraction-detail-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeAttractionDetail()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${attraction.name}</h2>
                <button class="modal-close" onclick="closeAttractionDetail()">×</button>
            </div>
            <div class="modal-body">
                <div class="attraction-detail">
                    <div class="detail-image">
                        <img src="${attraction.image}" alt="${attraction.name}">
                        <div class="image-overlay">
                            <div class="rating-badge">
                                <span class="stars">${generateStars(attraction.rating)}</span>
                                <span class="rating-score">${attraction.rating}分</span>
                            </div>
                        </div>
                    </div>
                    <div class="detail-content">
                        <div class="basic-info">
                            <div class="info-item">
                                <span class="label">🎫 门票价格：</span>
                                <span class="value price">￥${attraction.price}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">⏰ 开放时间：</span>
                                <span class="value">${attraction.openTime}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">📍 景点地址：</span>
                                <span class="value">${attraction.address}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">📞 联系电话：</span>
                                <span class="value">${attraction.phone}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">⏱️ 游览时长：</span>
                                <span class="value">${attraction.duration}</span>
                            </div>
                        </div>
                        
                        <div class="description-section">
                            <h3>景点介绍</h3>
                            <p>${attraction.description}</p>
                        </div>
                        
                        ${highlights.length > 0 ? `
                        <div class="features-section">
                            <h3>景点特色</h3>
                            <div class="features-grid">
                                ${highlights.map(highlight => `
                                    <div class="feature-tag">${highlight}</div>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}
                        
                        ${tips.length > 0 ? `
                        <div class="tips-section">
                            <h3>游览贴士</h3>
                            <ul class="tips-list">
                                ${tips.map(tip => `
                                    <li>${tip}</li>
                                `).join('')}
                            </ul>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeAttractionDetail()">关闭</button>
                <button class="btn btn-primary collect-btn ${isFavorited ? 'favorited' : ''}" 
                        data-favorite-id="${attractionId}"
                        onclick="collectAttraction('${attractionId}')">
                    ${isFavorited ? '已收藏' : '收藏景点'}
                </button>
            </div>
        </div>
    `;

    // 添加样式
    addAttractionDetailStyles();
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // 添加显示动画
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// 关闭景点详情弹窗
function closeAttractionDetail() {
    const modal = document.querySelector('.attraction-detail-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// 添加景点详情弹窗样式
function addAttractionDetailStyles() {
    if (document.querySelector('#attraction-detail-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'attraction-detail-styles';
    style.textContent = `
        .attraction-detail-modal {
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
        
        .attraction-detail-modal.show {
            opacity: 1;
            visibility: visible;
        }
        
        .attraction-detail-modal .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
        }
        
        .attraction-detail-modal .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 16px;
            width: 90%;
            max-width: 900px;
            max-height: 80vh;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
        }
        
        .attraction-detail-modal .modal-header {
            padding: 16px 20px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            flex-shrink: 0;
        }
        
        .attraction-detail-modal .modal-header h2 {
            margin: 0;
            font-size: 20px;
        }
        
        .attraction-detail-modal .modal-close {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 4px;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .attraction-detail-modal .modal-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .attraction-detail-modal .modal-body {
            padding: 0;
            flex: 1;
            overflow-y: auto;
            min-height: 0;
        }
        
        .attraction-detail-modal .detail-image {
            position: relative;
            height: 200px;
            overflow: hidden;
            flex-shrink: 0;
        }
        
        .attraction-detail-modal .detail-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .attraction-detail-modal .image-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%);
            display: flex;
            align-items: flex-end;
            padding: 16px;
        }
        
        .attraction-detail-modal .rating-badge {
            background: rgba(255, 255, 255, 0.9);
            padding: 6px 12px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .attraction-detail-modal .stars {
            color: #ff6b35;
            font-size: 14px;
        }
        
        .attraction-detail-modal .rating-score {
            font-weight: 600;
            color: #333;
            font-size: 14px;
        }
        
        .attraction-detail-modal .detail-content {
            padding: 20px;
        }
        
        .attraction-detail-modal .basic-info {
            margin-bottom: 20px;
        }
        
        .attraction-detail-modal .info-item {
            display: flex;
            margin-bottom: 10px;
            align-items: flex-start;
        }
        
        .attraction-detail-modal .label {
            min-width: 90px;
            font-weight: 500;
            color: #666;
            font-size: 14px;
        }
        
        .attraction-detail-modal .value {
            color: #333;
            flex: 1;
            font-size: 14px;
        }
        
        .attraction-detail-modal .value.price {
            color: #667eea;
            font-weight: 600;
        }
        
        .attraction-detail-modal .description-section,
        .attraction-detail-modal .features-section,
        .attraction-detail-modal .tips-section {
            margin-bottom: 20px;
        }
        
        .attraction-detail-modal h3 {
            margin: 0 0 12px 0;
            font-size: 16px;
            color: #333;
            font-weight: 600;
        }
        
        .attraction-detail-modal p {
            margin: 0;
            line-height: 1.6;
            color: #666;
            font-size: 14px;
        }
        
        .attraction-detail-modal .features-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .attraction-detail-modal .feature-tag {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 500;
        }
        
        .attraction-detail-modal .tips-list {
            margin: 0;
            padding-left: 16px;
        }
        
        .attraction-detail-modal .tips-list li {
            margin-bottom: 6px;
            color: #666;
            line-height: 1.5;
            font-size: 14px;
        }
        
        .attraction-detail-modal .modal-footer {
            padding: 16px 20px;
            border-top: 1px solid #eee;
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            flex-shrink: 0;
            background: white;
        }
        
        .attraction-detail-modal .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;
            font-weight: 500;
        }
        
        .attraction-detail-modal .btn-primary {
            background: #667eea;
            color: white;
        }
        
        .attraction-detail-modal .btn-primary:hover {
            background: #5a6fd8;
        }
        
        .attraction-detail-modal .btn-primary.favorited {
            background: #28a745;
        }
        
        .attraction-detail-modal .btn-primary.favorited:hover {
            background: #218838;
        }
        
        .attraction-detail-modal .btn-outline {
            background: transparent;
            color: #667eea;
            border: 1px solid #667eea;
        }
        
        .attraction-detail-modal .btn-outline:hover {
            background: #667eea;
            color: white;
        }
        
        @media (max-width: 768px) {
            .attraction-detail-modal .modal-content {
                width: 95%;
                max-height: 85vh;
                margin: 0;
                top: 50%;
                transform: translate(-50%, -50%);
            }
            
            .attraction-detail-modal .detail-image {
                height: 180px;
            }
            
            .attraction-detail-modal .detail-content {
                padding: 16px;
            }
            
            .attraction-detail-modal .modal-footer {
                flex-direction: column;
                padding: 12px 16px;
            }
            
            .attraction-detail-modal .btn {
                width: 100%;
                padding: 12px;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// 导出全局函数
window.collectAttraction = collectAttraction; 