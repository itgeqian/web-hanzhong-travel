// 文化历史页面JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    initTimeline();
    initCulturalSites();
    initInteractiveMap();
    initPhotoGallery();
    initKnowledgeQuiz();
});

// 历史时间线数据
const timelineData = [
    {
        period: '秦朝 (公元前221年)',
        title: '设汉中郡',
        description: '秦统一六国后，在汉中设立汉中郡，成为连接关中与巴蜀的重要枢纽。',
        significance: '汉中正式成为行政区划，奠定了其重要的地理位置。',
        relics: ['古汉台', '秦岭古道遗迹']
    },
    {
        period: '汉朝 (公元前206年)',
        title: '刘邦受封汉王',
        description: '项羽分封天下，刘邦被封为汉王，定都南郑（今汉中），后建立汉朝。',
        significance: '汉中成为汉朝发源地，"汉"之名源于此。',
        relics: ['汉王府遗址', '拜将台', '韩信点兵台']
    },
    {
        period: '三国 (220-280年)',
        title: '蜀汉重镇',
        description: '诸葛亮北伐以汉中为基地，汉中成为蜀汉政权的军事重镇。',
        significance: '三国文化在汉中留下深刻印记，武侯祠见证这段历史。',
        relics: ['武侯祠', '定军山', '阳平关']
    },
    {
        period: '唐朝 (618-907年)',
        title: '金牛道通衢',
        description: '汉中作为连接长安与成都的金牛道重要节点，商贸繁荣。',
        significance: '石门栈道等古代交通工程展现古人智慧。',
        relics: ['石门栈道', '褒斜道', '金牛道遗迹']
    },
    {
        period: '现代 (1949年至今)',
        title: '历史文化名城',
        description: '汉中被确定为国家历史文化名城，大力保护和传承历史文化。',
        significance: '现代汉中在保护历史的同时，焕发新的活力。',
        relics: ['汉中博物馆', '古汉台', '文化遗产保护区']
    }
];

// 文化遗产数据
const culturalSites = [
    {
        id: 1,
        name: '汉中博物馆',
        category: 'museum',
        description: '全面展示汉中历史文化，馆藏文物丰富，是了解汉中文化的重要窗口。',
        highlights: ['汉代文物', '三国遗迹', '石门十三品'],
        address: '汉中市汉台区东大街26号',
        openTime: '9:00-17:00（周一闭馆）',
        ticket: '免费（需预约）',
        features: ['专业导览', '文物修复展示', '数字化展示'],
        rating: 4.8,
        image: 'img/museum.jpg'
    },
    {
        id: 2,
        name: '石门栈道',
        category: 'historic',
        description: '世界上最早的人工通车隧道，展现古代工程技术的伟大成就。',
        highlights: ['石门十三品', '栈道遗迹', '摩崖石刻'],
        address: '汉中市汉台区河东店镇',
        openTime: '8:00-18:00',
        ticket: '80元',
        features: ['栈道体验', '石刻艺术', '历史讲解'],
        rating: 4.7,
        image: 'img/shimen.jpg'
    },
    {
        id: 3,
        name: '武侯祠',
        category: 'temple',
        description: '纪念诸葛亮的祠堂，三国文化的重要载体，建筑精美。',
        highlights: ['诸葛亮塑像', '古建筑群', '三国文化展'],
        address: '汉中市勉县武侯镇',
        openTime: '8:00-18:00',
        ticket: '60元',
        features: ['三国历史', '古建艺术', '文化体验'],
        rating: 4.6,
        image: 'img/wuhou.jpg'
    },
    {
        id: 4,
        name: '张良庙',
        category: 'temple',
        description: '纪念汉初三杰之一张良的古庙，建筑风格独特，历史悠久。',
        highlights: ['张良文化', '古建群落', '山水景观'],
        address: '汉中市留坝县紫柏山',
        openTime: '8:00-17:30',
        ticket: '50元',
        features: ['历史人物', '建筑艺术', '自然风光'],
        rating: 4.5,
        image: 'img/zhangliang.jpg'
    },
    {
        id: 5,
        name: '汉中古汉台',
        category: 'historic',
        description: '刘邦受封汉王时的王府遗址，汉朝发源地的重要见证。',
        highlights: ['汉王府遗址', '历史展览', '古建筑'],
        address: '汉中市汉台区东大街',
        openTime: '8:30-17:30',
        ticket: '30元',
        features: ['汉文化', '考古发现', '历史教育'],
        rating: 4.4,
        image: 'img/guhantai.jpg'
    },
    {
        id: 6,
        name: '朱鹮文化园',
        category: 'cultural',
        description: '以朱鹮保护为主题的文化园区，展现汉中生态文化特色。',
        highlights: ['朱鹮保护', '生态展示', '文化体验'],
        address: '汉中市洋县朱鹮保护区',
        openTime: '8:30-17:00',
        ticket: '40元',
        features: ['生态保护', '科普教育', '文化传承'],
        rating: 4.3,
        image: 'img/zhuhuai.jpg'
    }
];

// 图片画廊数据
const galleryData = [
    {
        category: 'ancient',
        title: '古代建筑',
        images: [
            { src: 'img/gallery/ancient1.jpg', title: '武侯祠大殿', desc: '三国时期建筑风格' },
            { src: 'img/gallery/ancient2.jpg', title: '张良庙山门', desc: '汉代建筑艺术' },
            { src: 'img/gallery/ancient3.jpg', title: '古汉台遗址', desc: '汉王府建筑基础' }
        ]
    },
    {
        category: 'relics',
        title: '珍贵文物',
        images: [
            { src: 'img/gallery/relic1.jpg', title: '汉代铜镜', desc: '精美的汉代青铜器' },
            { src: 'img/gallery/relic2.jpg', title: '三国兵器', desc: '蜀汉时期军事装备' },
            { src: 'img/gallery/relic3.jpg', title: '石门摩崖', desc: '珍贵的石刻艺术' }
        ]
    },
    {
        category: 'culture',
        title: '文化活动',
        images: [
            { src: 'img/gallery/culture1.jpg', title: '汉文化节', desc: '传统文化庆典' },
            { src: 'img/gallery/culture2.jpg', title: '三国表演', desc: '历史文化演出' },
            { src: 'img/gallery/culture3.jpg', title: '书法展示', desc: '传统书法艺术' }
        ]
    }
];

// 知识问答数据
const quizData = [
    {
        question: '汉中被称为"汉家发祥地"，这是因为哪位历史人物在此建立了汉朝？',
        options: ['刘邦', '刘秀', '刘备', '刘彻'],
        correct: 0,
        explanation: '刘邦被项羽分封为汉王，在汉中建立根据地，后来统一天下建立汉朝，所以汉中被称为"汉家发祥地"。'
    },
    {
        question: '诸葛亮在汉中进行了几次北伐？',
        options: ['三次', '五次', '六次', '七次'],
        correct: 2,
        explanation: '诸葛亮以汉中为基地，前后进行了六次北伐，体现了他"鞠躬尽瘁，死而后已"的精神。'
    },
    {
        question: '石门栈道最著名的文化遗产是什么？',
        options: ['古代隧道', '栈道遗迹', '石门十三品', '古代桥梁'],
        correct: 2,
        explanation: '石门十三品是指石门栈道上的十三处摩崖石刻，是中国书法艺术的瑰宝，具有很高的历史和艺术价值。'
    }
];

// 初始化时间线
function initTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');
    if (!timelineContainer) return;
    
    timelineContainer.innerHTML = `
        <h2>汉中历史时间线</h2>
        <div class="timeline">
            ${timelineData.map((item, index) => `
                <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}" data-index="${index}">
                    <div class="timeline-content">
                        <div class="timeline-period">${item.period}</div>
                        <h3 class="timeline-title">${item.title}</h3>
                        <p class="timeline-description">${item.description}</p>
                        <div class="timeline-significance">
                            <strong>历史意义：</strong>${item.significance}
                        </div>
                        <div class="timeline-relics">
                            <strong>相关遗迹：</strong>
                            ${item.relics.map(relic => `<span class="relic-tag">${relic}</span>`).join('')}
                        </div>
                        <button class="timeline-detail-btn" onclick="showTimelineDetail(${index})">
                            查看详情
                        </button>
                    </div>
                    <div class="timeline-marker"></div>
                </div>
            `).join('')}
        </div>
    `;
    
    // 添加滚动动画
    observeTimelineItems();
}

// 观察时间线项目
function observeTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// 显示时间线详情
function showTimelineDetail(index) {
    const item = timelineData[index];
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${item.title}</h3>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="detail-period">${item.period}</div>
                <div class="detail-content">
                    <h4>历史背景</h4>
                    <p>${item.description}</p>
                    <h4>历史意义</h4>
                    <p>${item.significance}</p>
                    <h4>相关遗迹</h4>
                    <ul>
                        ${item.relics.map(relic => `<li>${relic}</li>`).join('')}
                    </ul>
                </div>
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

// 初始化文化遗产
function initCulturalSites() {
    const sitesContainer = document.querySelector('.cultural-sites');
    if (!sitesContainer) return;
    
    const categories = ['all', 'museum', 'historic', 'temple', 'cultural'];
    const categoryNames = {
        'all': '全部',
        'museum': '博物馆',
        'historic': '历史遗址',
        'temple': '古建筑',
        'cultural': '文化园区'
    };
    
    sitesContainer.innerHTML = `
        <h2>文化遗产</h2>
        <div class="sites-filter">
            ${categories.map(cat => `
                <button class="filter-btn ${cat === 'all' ? 'active' : ''}" 
                        data-category="${cat}" onclick="filterSites('${cat}')">
                    ${categoryNames[cat]}
                </button>
            `).join('')}
        </div>
        <div class="sites-grid">
            ${culturalSites.map(site => `
                <div class="site-card" data-category="${site.category}">
                    <div class="site-image">
                        <img src="${site.image}" alt="${site.name}" loading="lazy">
                        <div class="site-rating">
                            <span class="rating-stars">${generateStars(site.rating)}</span>
                            <span class="rating-score">${site.rating}</span>
                        </div>
                    </div>
                    <div class="site-content">
                        <h3 class="site-name">${site.name}</h3>
                        <p class="site-description">${site.description}</p>
                        <div class="site-highlights">
                            ${site.highlights.map(h => `<span class="highlight-tag">${h}</span>`).join('')}
                        </div>
                        <div class="site-info">
                            <div class="info-item">
                                <span class="info-label">📍 地址：</span>
                                <span>${site.address}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">🕒 开放时间：</span>
                                <span>${site.openTime}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">🎫 门票：</span>
                                <span>${site.ticket}</span>
                            </div>
                        </div>
                        <div class="site-actions">
                            <button class="btn btn-primary" onclick="showSiteDetail(${site.id})">
                                查看详情
                            </button>
                            <button class="btn btn-outline" onclick="collectSite(${site.id})">
                                收藏
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// 生成星级评分
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    if (hasHalfStar) {
        stars += '☆';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
        stars += '☆';
    }
    
    return stars;
}

// 筛选遗产地
function filterSites(category) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const siteCards = document.querySelectorAll('.site-card');
    
    // 更新按钮状态
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    // 筛选卡片
    siteCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.classList.remove('hidden');
        } else {
            card.style.display = 'none';
        }
    });
}

// 显示遗产地详情
function showSiteDetail(siteId) {
    const site = culturalSites.find(s => s.id === siteId);
    if (!site) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal large';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${site.name}</h3>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="site-detail">
                    <div class="detail-image">
                        <img src="${site.image}" alt="${site.name}">
                    </div>
                    <div class="detail-info">
                        <div class="site-rating-large">
                            <span class="rating-stars">${generateStars(site.rating)}</span>
                            <span class="rating-score">${site.rating}分</span>
                        </div>
                        <p class="detail-description">${site.description}</p>
                        <div class="detail-features">
                            <h4>特色亮点</h4>
                            <ul>
                                ${site.highlights.map(h => `<li>${h}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="detail-features">
                            <h4>服务特色</h4>
                            <ul>
                                ${site.features.map(f => `<li>${f}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="visit-info">
                            <div class="info-grid">
                                <div class="info-item">
                                    <strong>📍 地址</strong>
                                    <span>${site.address}</span>
                                </div>
                                <div class="info-item">
                                    <strong>🕒 开放时间</strong>
                                    <span>${site.openTime}</span>
                                </div>
                                <div class="info-item">
                                    <strong>🎫 门票价格</strong>
                                    <span>${site.ticket}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

// 收藏遗产地
function collectSite(siteId) {
    let collections = JSON.parse(localStorage.getItem('hanzhong_cultural_collections') || '[]');
    
    if (collections.includes(siteId)) {
        Utils.showMessage('已在收藏列表中', 'info');
        return;
    }
    
    collections.push(siteId);
    localStorage.setItem('hanzhong_cultural_collections', JSON.stringify(collections));
    Utils.showMessage('收藏成功！', 'success');
}

// 初始化互动地图
function initInteractiveMap() {
    const mapContainer = document.querySelector('.interactive-map');
    if (!mapContainer) return;
    
    const mapCategories = ['all', 'museum', 'historic', 'temple', 'cultural'];
    const categoryNames = {
        'all': '全部地标',
        'museum': '博物馆',
        'historic': '历史遗址', 
        'temple': '古建筑',
        'cultural': '文化园区'
    };
    
    mapContainer.innerHTML = `
        <h2>文化地图</h2>
        <div class="map-controls">
            <div class="map-filter">
                ${mapCategories.map(cat => `
                    <button class="map-filter-btn ${cat === 'all' ? 'active' : ''}" 
                            data-category="${cat}" onclick="filterMapSites('${cat}')">
                        ${categoryNames[cat]}
                    </button>
                `).join('')}
            </div>
        </div>
        <div class="map-display">
            <div class="map-placeholder">
                <div class="map-title">汉中文化地标分布图</div>
                <div class="map-markers">
                    ${culturalSites.map(site => `
                        <div class="map-marker" data-category="${site.category}" 
                             data-site-id="${site.id}" onclick="showMapMarkerInfo(${site.id})">
                            <div class="marker-icon">${getMarkerIcon(site.category)}</div>
                            <div class="marker-label">${site.name}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="map-legend">
                    <div class="legend-title">图例</div>
                    <div class="legend-items">
                        <div class="legend-item">🏛️ 博物馆</div>
                        <div class="legend-item">🏯 历史遗址</div>
                        <div class="legend-item">⛩️ 古建筑</div>
                        <div class="legend-item">🎭 文化园区</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 获取地图标记图标
function getMarkerIcon(category) {
    const icons = {
        'museum': '🏛️',
        'historic': '🏯',
        'temple': '⛩️',
        'cultural': '🎭'
    };
    return icons[category] || '📍';
}

// 筛选地图遗产地
function filterMapSites(category) {
    const filterBtns = document.querySelectorAll('.map-filter-btn');
    const markers = document.querySelectorAll('.map-marker');
    
    // 更新按钮状态
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    // 筛选标记
    markers.forEach(marker => {
        if (category === 'all' || marker.dataset.category === category) {
            marker.style.display = 'block';
            marker.style.opacity = '1';
        } else {
            marker.style.opacity = '0.3';
        }
    });
}

// 显示地图标记信息
function showMapMarkerInfo(siteId) {
    const site = culturalSites.find(s => s.id === siteId);
    if (!site) return;
    
    const infoBox = document.createElement('div');
    infoBox.className = 'map-info-box';
    infoBox.innerHTML = `
        <div class="info-box-content">
            <h4>${site.name}</h4>
            <p>${site.description}</p>
            <div class="info-box-details">
                <div>📍 ${site.address}</div>
                <div>🎫 ${site.ticket}</div>
                <div>⭐ ${site.rating}分</div>
            </div>
            <div class="info-box-actions">
                <button class="btn btn-sm btn-primary" onclick="showSiteDetail(${site.id})">详细信息</button>
                <button class="btn btn-sm btn-outline" onclick="closeMapInfo()">关闭</button>
            </div>
        </div>
    `;
    
    // 移除已存在的信息框
    const existingInfo = document.querySelector('.map-info-box');
    if (existingInfo) {
        existingInfo.remove();
    }
    
    document.querySelector('.map-display').appendChild(infoBox);
    
    window.closeMapInfo = function() {
        infoBox.remove();
    };
}

// 初始化图片画廊
function initPhotoGallery() {
    const galleryContainer = document.querySelector('.photo-gallery');
    if (!galleryContainer) return;
    
    galleryContainer.innerHTML = `
        <h2>文化画廊</h2>
        <div class="gallery-filter">
            <button class="gallery-filter-btn active" data-category="all" onclick="filterGallery('all')">
                全部
            </button>
            ${galleryData.map(cat => `
                <button class="gallery-filter-btn" data-category="${cat.category}" 
                        onclick="filterGallery('${cat.category}')">
                    ${cat.title}
                </button>
            `).join('')}
        </div>
        <div class="gallery-grid">
            ${galleryData.map(category => 
                category.images.map(img => `
                    <div class="gallery-item" data-category="${category.category}">
                        <div class="gallery-image">
                            <img src="${img.src}" alt="${img.title}" loading="lazy" 
                                 onclick="openLightbox('${img.src}', '${img.title}', '${img.desc}')">
                            <div class="gallery-overlay">
                                <h4>${img.title}</h4>
                                <p>${img.desc}</p>
                            </div>
                        </div>
                    </div>
                `).join('')
            ).join('')}
        </div>
    `;
}

// 筛选画廊
function filterGallery(category) {
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // 更新按钮状态
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    // 筛选图片
    galleryItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// 打开灯箱
function openLightbox(src, title, desc) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${src}" alt="${title}">
            <div class="lightbox-info">
                <h3>${title}</h3>
                <p>${desc}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', function() {
        lightbox.remove();
        document.body.style.overflow = 'auto';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.remove();
            document.body.style.overflow = 'auto';
        }
    });
}

// 初始化知识问答
function initKnowledgeQuiz() {
    const quizContainer = document.querySelector('.knowledge-quiz');
    if (!quizContainer) return;
    
    let currentQuestion = 0;
    let score = 0;
    let answered = [];
    
    function renderQuiz() {
        const question = quizData[currentQuestion];
        
        quizContainer.innerHTML = `
            <h2>汉中文化知识问答</h2>
            <div class="quiz-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(currentQuestion / quizData.length) * 100}%"></div>
                </div>
                <div class="progress-text">第 ${currentQuestion + 1} 题 / 共 ${quizData.length} 题</div>
            </div>
            <div class="quiz-content">
                <div class="question-container">
                    <h3 class="question-text">${question.question}</h3>
                    <div class="options-container">
                        ${question.options.map((option, index) => `
                            <button class="option-btn" data-index="${index}" onclick="selectAnswer(${index})">
                                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                                <span class="option-text">${option}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div class="quiz-actions" style="display: none;">
                    <button class="btn btn-primary" onclick="nextQuestion()">
                        ${currentQuestion < quizData.length - 1 ? '下一题' : '查看结果'}
                    </button>
                </div>
            </div>
        `;
    }
    
    window.selectAnswer = function(selectedIndex) {
        const question = quizData[currentQuestion];
        const optionBtns = document.querySelectorAll('.option-btn');
        const quizActions = document.querySelector('.quiz-actions');
        
        // 禁用所有选项
        optionBtns.forEach((btn, index) => {
            btn.disabled = true;
            
            if (index === question.correct) {
                btn.classList.add('correct');
            } else if (index === selectedIndex && index !== question.correct) {
                btn.classList.add('wrong');
            }
        });
        
        // 记录答案
        const isCorrect = selectedIndex === question.correct;
        answered.push({
            questionIndex: currentQuestion,
            selectedIndex: selectedIndex,
            isCorrect: isCorrect
        });
        
        if (isCorrect) {
            score++;
        }
        
        // 显示解释
        const explanation = document.createElement('div');
        explanation.className = 'question-explanation';
        explanation.innerHTML = `
            <div class="explanation-content">
                <h4>${isCorrect ? '回答正确！' : '回答错误'}</h4>
                <p>${question.explanation}</p>
            </div>
        `;
        
        document.querySelector('.question-container').appendChild(explanation);
        quizActions.style.display = 'block';
    };
    
    window.nextQuestion = function() {
        currentQuestion++;
        
        if (currentQuestion < quizData.length) {
            renderQuiz();
        } else {
            showQuizResult();
        }
    };
    
    function showQuizResult() {
        const percentage = Math.round((score / quizData.length) * 100);
        let level = '';
        let message = '';
        
        if (percentage >= 90) {
            level = '文化达人';
            message = '恭喜您！您对汉中文化了解深入，是真正的文化达人！';
        } else if (percentage >= 70) {
            level = '文化爱好者';
            message = '很好！您对汉中文化有较好的了解，继续学习会更棒！';
        } else if (percentage >= 50) {
            level = '文化探索者';
            message = '不错！您正在探索汉中文化的奥秘，建议多了解相关知识。';
        } else {
            level = '文化新手';
            message = '没关系！每个人都有学习的过程，建议您多参观汉中的文化景点。';
        }
        
        quizContainer.innerHTML = `
            <h2>问答结果</h2>
            <div class="quiz-result">
                <div class="result-score">
                    <div class="score-circle">
                        <span class="score-number">${percentage}</span>
                        <span class="score-unit">%</span>
                    </div>
                    <div class="score-details">
                        <div class="score-text">您答对了 ${score} 题，共 ${quizData.length} 题</div>
                        <div class="level-badge">${level}</div>
                    </div>
                </div>
                <div class="result-message">
                    <p>${message}</p>
                </div>
                <div class="result-actions">
                    <button class="btn btn-primary" onclick="restartQuiz()">重新挑战</button>
                    <button class="btn btn-outline" onclick="showQuizReview()">查看解析</button>
                </div>
            </div>
        `;
    }
    
    window.restartQuiz = function() {
        currentQuestion = 0;
        score = 0;
        answered = [];
        renderQuiz();
    };
    
    window.showQuizReview = function() {
        const reviewHTML = `
            <h2>答题解析</h2>
            <div class="quiz-review">
                ${quizData.map((question, index) => {
                    const userAnswer = answered[index];
                    const isCorrect = userAnswer && userAnswer.isCorrect;
                    
                    return `
                        <div class="review-item ${isCorrect ? 'correct' : 'wrong'}">
                            <div class="review-question">
                                <h4>第${index + 1}题：${question.question}</h4>
                                <div class="review-answer">
                                    <span class="answer-label">正确答案：</span>
                                    <span class="answer-text">${String.fromCharCode(65 + question.correct)}. ${question.options[question.correct]}</span>
                                </div>
                                ${userAnswer ? `
                                    <div class="review-user-answer">
                                        <span class="answer-label">您的答案：</span>
                                        <span class="answer-text ${isCorrect ? 'correct' : 'wrong'}">
                                            ${String.fromCharCode(65 + userAnswer.selectedIndex)}. ${question.options[userAnswer.selectedIndex]}
                                        </span>
                                    </div>
                                ` : ''}
                                <div class="review-explanation">
                                    <p>${question.explanation}</p>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="review-actions">
                <button class="btn btn-primary" onclick="restartQuiz()">重新挑战</button>
            </div>
        `;
        
        quizContainer.innerHTML = reviewHTML;
    };
    
    // 初始化第一题
    renderQuiz();
}

// 全局函数
window.showTimelineDetail = showTimelineDetail;
window.filterSites = filterSites;
window.showSiteDetail = showSiteDetail;
window.collectSite = collectSite;
window.filterMapSites = filterMapSites;
window.showMapMarkerInfo = showMapMarkerInfo;
window.closeMapInfo = closeMapInfo;
window.filterGallery = filterGallery;
window.openLightbox = openLightbox;
window.selectAnswer = selectAnswer;
window.nextQuestion = nextQuestion;
window.restartQuiz = restartQuiz;
window.showQuizReview = showQuizReview; 