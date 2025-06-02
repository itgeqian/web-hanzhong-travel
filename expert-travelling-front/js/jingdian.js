// 景点介绍页面JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    initCategoryNav();
    initAttractionCards();
    initRankingList();
    initAttractionModal();
    initSearchFunction();
});

// 景点数据
const attractionsData = [
    {
        id: 1,
        name: '汉中博物馆',
        category: 'culture',
        image: 'img/attraction1.jpg',
        rating: 4.8,
        price: 50,
        openTime: '9:00-17:00',
        address: '汉中市汉台区东大街26号',
        description: '汉中博物馆是展示汉中历史文化的重要场所，珍藏着大量汉代文物和历史资料。',
        features: ['历史文化', '文物展览', '导游讲解', '停车便利'],
        details: '汉中博物馆建于1958年，是陕西省重点博物馆之一。馆内收藏文物万余件，其中国家一级文物100余件。展览以汉代历史文化为主线，全面展示了汉中作为汉王朝发祥地的重要地位。'
    },
    {
        id: 2,
        name: '石门栈道',
        category: 'nature',
        image: 'img/attraction2.jpg',
        rating: 4.9,
        price: 80,
        openTime: '8:00-18:00',
        address: '汉中市汉台区河东店镇',
        description: '世界第一古栈道，古代蜀道的重要组成部分，工程奇迹，历史价值极高。',
        features: ['古代栈道', '自然风光', '历史遗迹', '摄影胜地'],
        details: '石门栈道开凿于秦汉时期，是古代川陕交通要道。栈道沿嘉陵江而建，全长234.3公里。这里不仅有丰富的历史文化内涵，还有壮美的自然风光。'
    },
    {
        id: 3,
        name: '朱鹮梨园',
        category: 'nature',
        image: 'img/attraction3.jpg',
        rating: 4.7,
        price: 60,
        openTime: '8:30-17:30',
        address: '汉中市洋县草庙村',
        description: '朱鹮自然保护区，生态环境优美，是观赏世界珍稀鸟类朱鹮的最佳地点。',
        features: ['生态保护', '珍稀动物', '自然教育', '梨花观赏'],
        details: '朱鹮梨园是朱鹮国家级自然保护区的核心区域。这里不仅是朱鹮的栖息地，还是万亩梨园的所在地。每年春季梨花盛开时，景色格外美丽。'
    },
    {
        id: 4,
        name: '武侯祠',
        category: 'culture',
        image: 'img/attraction4.jpg',
        rating: 4.6,
        price: 45,
        openTime: '8:00-18:00',
        address: '汉中市勉县108国道',
        description: '为纪念诸葛亮而建的祠堂，三国文化的重要载体，建筑古朴典雅。',
        features: ['三国文化', '古建筑', '历史名人', '文化体验'],
        details: '武侯祠是全国重点文物保护单位，始建于蜀汉景耀六年。祠内有诸葛亮塑像和众多碑刻，是研究三国文化的重要场所。'
    },
    {
        id: 5,
        name: '黎坪森林公园',
        category: 'nature',
        image: 'img/attraction5.jpg',
        rating: 4.5,
        price: 70,
        openTime: '7:00-19:00',
        address: '汉中市南郑区黎坪镇',
        description: '原始森林公园，植被丰富，空气清新，是避暑休闲的理想之地。',
        features: ['原始森林', '负氧离子', '徒步登山', '避暑胜地'],
        details: '黎坪森林公园总面积94平方公里，森林覆盖率达90%以上。公园内有珍稀植物1000多种，是天然的植物基因库。'
    },
    {
        id: 6,
        name: '张良庙',
        category: 'culture',
        image: 'img/attraction6.jpg',
        rating: 4.4,
        price: 55,
        openTime: '8:30-17:30',
        address: '汉中市留坝县庙台子街',
        description: '供奉汉初三杰之一张良的庙宇，建筑风格独特，历史文化底蕴深厚。',
        features: ['历史名人', '古建筑群', '道教文化', '山水结合'],
        details: '张良庙始建于东汉末年，是为纪念"汉初三杰"之一的张良而建。庙宇依山而建，与自然环境融为一体，建筑风格独特。'
    }
];

// 分类导航功能
function initCategoryNav() {
    const categoryItems = document.querySelectorAll('.category-item');
    const attractionCards = document.querySelectorAll('.attraction-card');
    
    // 分类数据
    const categories = [
        { key: 'all', name: '全部景点', count: attractionsData.length },
        { key: 'culture', name: '文化古迹', count: attractionsData.filter(item => item.category === 'culture').length },
        { key: 'nature', name: '自然风光', count: attractionsData.filter(item => item.category === 'nature').length },
        { key: 'recreation', name: '休闲娱乐', count: attractionsData.filter(item => item.category === 'recreation').length }
    ];
    
    // 初始化分类按钮
    categoryItems.forEach((item, index) => {
        if (categories[index]) {
            item.textContent = `${categories[index].name} (${categories[index].count})`;
            item.dataset.category = categories[index].key;
        }
        
        // 分类点击事件
        item.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // 更新活动状态
            categoryItems.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选景点
            filterAttractions(category);
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
    
    attractionCards.forEach((card, index) => {
        const cardData = attractionsData[index];
        
        if (category === 'all' || !cardData || cardData.category === category) {
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
    let count = attractionsData.length;
    if (category !== 'all') {
        count = attractionsData.filter(item => item.category === category).length;
    }
    
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
        'culture': '文化古迹',
        'nature': '自然风光',
        'recreation': '休闲娱乐'
    };
    return categoryNames[category] || '其他';
}

// 生成星级评分
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    
    if (hasHalfStar) {
        stars += '☆';
    }
    
    while (stars.length < 5) {
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