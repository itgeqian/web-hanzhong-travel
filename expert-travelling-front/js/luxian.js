// 旅游线路页面JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    initRouteList();
    initRouteFilter();
    initRouteComparison();
    initCustomizeForm();
    initRouteBooking();
    initFilterTabs();
    initRouteCards();
    initButtonEffects();
    loadRoutesFromJSON();
});

// 旅游线路数据
const routeData = [
    {
        id: 1,
        title: '文化古韵三日游',
        category: 'culture',
        duration: 3,
        price: 899,
        originalPrice: 1299,
        difficulty: 'easy',
        rating: 4.8,
        reviewCount: 156,
        image: 'img/route1.jpg',
        description: '深度体验汉中历史文化，走访古迹名胜，感受千年文明魅力。',
        highlights: ['汉中博物馆', '石门栈道', '武侯祠', '张良庙', '古汉台'],
        included: ['住宿2晚', '专业导游', '景点门票', '文化讲解', '特色午餐'],
        excluded: ['往返交通', '晚餐', '个人消费', '旅游保险'],
        itinerary: [
            {
                day: 1,
                title: '汉中历史探索',
                activities: ['抵达汉中', '汉中博物馆参观', '古汉台游览', '入住酒店'],
                meals: '午餐',
                accommodation: '市区四星酒店'
            },
            {
                day: 2,
                title: '栈道奇观体验',
                activities: ['石门栈道游览', '摩崖石刻欣赏', '栈道文化体验', '返回市区'],
                meals: '午餐',
                accommodation: '市区四星酒店'
            },
            {
                day: 3,
                title: '三国文化之旅',
                activities: ['武侯祠参拜', '张良庙游览', '文化讲座', '愉快返程'],
                meals: '午餐',
                accommodation: '无'
            }
        ],
        tags: ['历史文化', '古迹探访', '专业讲解'],
        suitable: ['文化爱好者', '历史迷', '学生团体'],
        minPeople: 2,
        maxPeople: 30,
        bookingDeadline: 2,
        cancellationPolicy: '出发前72小时可免费取消'
    },
    {
        id: 2,
        title: '秦巴山水五日游',
        category: 'nature',
        duration: 5,
        price: 1599,
        originalPrice: 2199,
        difficulty: 'medium',
        rating: 4.7,
        reviewCount: 203,
        image: 'img/route2.jpg',
        description: '穿越秦巴山区，欣赏原始森林，体验生态之美。',
        highlights: ['黎坪森林公园', '朱鹮保护区', '紫柏山', '太白山', '嘉陵江源头'],
        included: ['住宿4晚', '专业导游', '景点门票', '生态讲解', '特色餐饮'],
        excluded: ['往返交通', '个人消费', '户外装备', '旅游保险'],
        itinerary: [
            {
                day: 1,
                title: '森林公园初探',
                activities: ['抵达汉中', '黎坪森林公园', '森林徒步', '入住山庄'],
                meals: '午餐、晚餐',
                accommodation: '森林山庄'
            },
            {
                day: 2,
                title: '朱鹮观鸟之旅',
                activities: ['朱鹮保护区', '观鸟体验', '生态科普', '湿地游览'],
                meals: '早餐、午餐、晚餐',
                accommodation: '生态酒店'
            },
            {
                day: 3,
                title: '紫柏山探秘',
                activities: ['紫柏山登山', '原始森林', '高山草甸', '篝火晚会'],
                meals: '早餐、午餐、晚餐',
                accommodation: '山地帐篷'
            },
            {
                day: 4,
                title: '太白雪峰',
                activities: ['太白山游览', '雪峰观景', '高山湖泊', '下山休整'],
                meals: '早餐、午餐、晚餐',
                accommodation: '山脚酒店'
            },
            {
                day: 5,
                title: '嘉陵江源',
                activities: ['嘉陵江源头', '溪流漂流', '山水摄影', '返程'],
                meals: '早餐、午餐',
                accommodation: '无'
            }
        ],
        tags: ['自然生态', '户外徒步', '观鸟摄影'],
        suitable: ['自然爱好者', '户外达人', '摄影师'],
        minPeople: 4,
        maxPeople: 20,
        bookingDeadline: 5,
        cancellationPolicy: '出发前120小时可免费取消'
    },
    {
        id: 3,
        title: '汉中美食探索游',
        category: 'food',
        duration: 2,
        price: 499,
        originalPrice: 699,
        difficulty: 'easy',
        rating: 4.9,
        reviewCount: 324,
        image: 'img/route3.jpg',
        description: '品尝地道汉中美食，探访传统小吃制作工艺。',
        highlights: ['汉中面皮', '菜豆腐', '浆水面', '粉皮子', '美食街'],
        included: ['美食品尝', '制作体验', '美食导览', '特色餐厅'],
        excluded: ['住宿', '往返交通', '酒水饮料', '额外消费'],
        itinerary: [
            {
                day: 1,
                title: '传统小吃之旅',
                activities: ['面皮制作体验', '老字号品尝', '美食街探索', '夜市小吃'],
                meals: '午餐、晚餐、夜宵',
                accommodation: '自理'
            },
            {
                day: 2,
                title: '特色餐厅体验',
                activities: ['农家乐体验', '特色菜制作', '美食摄影', '满载而归'],
                meals: '早餐、午餐',
                accommodation: '无'
            }
        ],
        tags: ['美食体验', '制作工艺', '传统文化'],
        suitable: ['美食爱好者', '亲子家庭', '文化体验者'],
        minPeople: 1,
        maxPeople: 15,
        bookingDeadline: 1,
        cancellationPolicy: '出发前24小时可免费取消'
    },
    {
        id: 4,
        title: '全景深度七日游',
        category: 'comprehensive',
        duration: 7,
        price: 2899,
        originalPrice: 3999,
        difficulty: 'medium',
        rating: 4.6,
        reviewCount: 98,
        image: 'img/route4.jpg',
        description: '汉中全景游览，文化、自然、美食一网打尽。',
        highlights: ['全景体验', '深度游览', '专业服务', '精品住宿', '特色体验'],
        included: ['住宿6晚', '全程导游', '所有门票', '特色餐饮', '专车接送'],
        excluded: ['往返大交通', '个人消费', '自费项目', '旅游保险'],
        itinerary: [
            {
                day: 1,
                title: '初识汉中',
                activities: ['接机服务', '市区游览', '欢迎晚宴', '行程说明'],
                meals: '晚餐',
                accommodation: '五星酒店'
            },
            {
                day: 2,
                title: '历史文化深度游',
                activities: ['汉中博物馆', '古汉台', '石门栈道', '文化讲座'],
                meals: '早餐、午餐、晚餐',
                accommodation: '五星酒店'
            },
            {
                day: 3,
                title: '三国文化探访',
                activities: ['武侯祠', '定军山', '张良庙', '三国文化体验'],
                meals: '早餐、午餐、晚餐',
                accommodation: '文化主题酒店'
            },
            {
                day: 4,
                title: '自然生态之旅',
                activities: ['黎坪森林公园', '朱鹮保护区', '生态科普', '篝火晚会'],
                meals: '早餐、午餐、晚餐',
                accommodation: '生态度假村'
            },
            {
                day: 5,
                title: '美食文化体验',
                activities: ['美食制作', '农家体验', '传统工艺', '市场游览'],
                meals: '早餐、午餐、晚餐',
                accommodation: '民俗客栈'
            },
            {
                day: 6,
                title: '休闲度假时光',
                activities: ['温泉养生', '茶园体验', '自由活动', '购物时间'],
                meals: '早餐、午餐、晚餐',
                accommodation: '温泉酒店'
            },
            {
                day: 7,
                title: '愉快返程',
                activities: ['最后游览', '纪念品购买', '送机服务', '结束行程'],
                meals: '早餐、午餐',
                accommodation: '无'
            }
        ],
        tags: ['全景游览', '深度体验', '精品服务'],
        suitable: ['首次来汉中', '深度游爱好者', '高端客户'],
        minPeople: 2,
        maxPeople: 12,
        bookingDeadline: 7,
        cancellationPolicy: '出发前168小时可免费取消'
    },
    {
        id: 5,
        title: '亲子研学四日游',
        category: 'family',
        duration: 4,
        price: 1299,
        originalPrice: 1799,
        difficulty: 'easy',
        rating: 4.7,
        reviewCount: 187,
        image: 'img/route5.jpg',
        description: '专为亲子家庭设计，寓教于乐，增进亲子感情。',
        highlights: ['亲子互动', '科普教育', '手工体验', '安全保障', '专业导师'],
        included: ['住宿3晚', '亲子导师', '研学材料', '手工材料', '特色餐饮'],
        excluded: ['往返交通', '个人消费', '额外活动', '旅游保险'],
        itinerary: [
            {
                day: 1,
                title: '历史启蒙之旅',
                activities: ['博物馆研学', '文物探秘', '历史故事', '手工制作'],
                meals: '午餐、晚餐',
                accommodation: '亲子主题酒店'
            },
            {
                day: 2,
                title: '自然科普体验',
                activities: ['朱鹮科普', '生态观察', '自然笔记', '户外游戏'],
                meals: '早餐、午餐、晚餐',
                accommodation: '亲子主题酒店'
            },
            {
                day: 3,
                title: '传统文化学习',
                activities: ['书法体验', '传统游戏', '民俗表演', '文化制作'],
                meals: '早餐、午餐、晚餐',
                accommodation: '亲子主题酒店'
            },
            {
                day: 4,
                title: '美食文化体验',
                activities: ['面皮制作', '家庭烹饪', '成果展示', '快乐返程'],
                meals: '早餐、午餐',
                accommodation: '无'
            }
        ],
        tags: ['亲子教育', '研学旅行', '互动体验'],
        suitable: ['亲子家庭', '学生团体', '教育机构'],
        minPeople: 2,
        maxPeople: 25,
        bookingDeadline: 3,
        cancellationPolicy: '出发前72小时可免费取消'
    },
    {
        id: 6,
        title: '摄影采风六日游',
        category: 'photography',
        duration: 6,
        price: 2199,
        originalPrice: 2999,
        difficulty: 'medium',
        rating: 4.5,
        reviewCount: 76,
        image: 'img/route6.jpg',
        description: '专业摄影指导，捕捉汉中最美瞬间，提升摄影技艺。',
        highlights: ['专业指导', '最佳机位', '日出日落', '四季美景', '后期处理'],
        included: ['住宿5晚', '摄影导师', '拍摄指导', '后期培训', '作品点评'],
        excluded: ['摄影器材', '往返交通', '个人消费', '作品制作'],
        itinerary: [
            {
                day: 1,
                title: '摄影基础课程',
                activities: ['摄影讲座', '器材检查', '构图训练', '市区夜景'],
                meals: '晚餐',
                accommodation: '摄影主题酒店'
            },
            {
                day: 2,
                title: '历史建筑摄影',
                activities: ['古建筑拍摄', '光影技巧', '细节捕捉', '作品点评'],
                meals: '早餐、午餐、晚餐',
                accommodation: '摄影主题酒店'
            },
            {
                day: 3,
                title: '自然风光摄影',
                activities: ['山水拍摄', '日出日落', '长曝光技巧', '风光构图'],
                meals: '早餐、午餐、晚餐',
                accommodation: '山地客栈'
            },
            {
                day: 4,
                title: '生态摄影专题',
                activities: ['野生动物', '生态环境', '微距摄影', '隐蔽拍摄'],
                meals: '早餐、午餐、晚餐',
                accommodation: '生态酒店'
            },
            {
                day: 5,
                title: '人文纪实摄影',
                activities: ['民俗拍摄', '街头摄影', '人物肖像', '故事记录'],
                meals: '早餐、午餐、晚餐',
                accommodation: '民俗客栈'
            },
            {
                day: 6,
                title: '后期处理与分享',
                activities: ['后期技巧', '作品整理', '经验分享', '结业仪式'],
                meals: '早餐、午餐',
                accommodation: '无'
            }
        ],
        tags: ['专业摄影', '技能提升', '作品创作'],
        suitable: ['摄影爱好者', '专业摄影师', '艺术创作者'],
        minPeople: 3,
        maxPeople: 10,
        bookingDeadline: 5,
        cancellationPolicy: '出发前120小时可免费取消'
    }
];

// 初始化线路列表
function initRouteList() {
    const routeContainer = document.querySelector('.route-list');
    if (!routeContainer) return;
    
    renderRoutes(routeData);
}

// 渲染线路列表
function renderRoutes(routes) {
    const routeContainer = document.querySelector('.route-list');
    
    routeContainer.innerHTML = routes.map(route => `
        <div class="route-card" data-route-id="${route.id}">
            <div class="route-image">
                <img src="${route.image}" alt="${route.title}" loading="lazy">
                <div class="route-badge">
                    <span class="duration-badge">${route.duration}天</span>
                    <span class="difficulty-badge ${route.difficulty}">${getDifficultyText(route.difficulty)}</span>
                </div>
                <div class="route-actions">
                    <button class="action-btn favorite-btn" onclick="toggleFavorite(${route.id})" title="收藏">
                        ❤️
                    </button>
                    <button class="action-btn compare-btn" onclick="addToCompare(${route.id})" title="对比">
                        📊
                    </button>
                </div>
            </div>
            <div class="route-content">
                <div class="route-header">
                    <h3 class="route-title">${route.title}</h3>
                    <div class="route-rating">
                        <span class="stars">${generateStars(route.rating)}</span>
                        <span class="rating-score">${route.rating}</span>
                        <span class="review-count">(${route.reviewCount}条评价)</span>
                    </div>
                </div>
                <p class="route-description">${route.description}</p>
                <div class="route-highlights">
                    ${route.highlights.slice(0, 3).map(highlight => `
                        <span class="highlight-tag">${highlight}</span>
                    `).join('')}
                    ${route.highlights.length > 3 ? `<span class="more-tag">+${route.highlights.length - 3}</span>` : ''}
                </div>
                <div class="route-info">
                    <div class="info-item">
                        <span class="info-icon">👥</span>
                        <span>${route.minPeople}-${route.maxPeople}人</span>
                    </div>
                    <div class="info-item">
                        <span class="info-icon">📅</span>
                        <span>提前${route.bookingDeadline}天预订</span>
                    </div>
                    <div class="info-item">
                        <span class="info-icon">🏷️</span>
                        <span>${route.tags.join('、')}</span>
                    </div>
                </div>
                <div class="route-footer">
                    <div class="route-price">
                        <span class="original-price">¥${route.originalPrice}</span>
                        <span class="current-price">¥${route.price}</span>
                        <span class="price-unit">/人</span>
                    </div>
                    <div class="route-buttons">
                        <button class="btn btn-outline" onclick="showRouteDetail(${route.id})">查看详情</button>
                        <button class="btn btn-primary" onclick="bookRoute(${route.id})">立即预订</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// 获取难度文本
function getDifficultyText(difficulty) {
    const difficultyMap = {
        'easy': '轻松',
        'medium': '适中',
        'hard': '挑战'
    };
    return difficultyMap[difficulty] || '未知';
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

// 初始化筛选功能
function initRouteFilter() {
    const filterContainer = document.querySelector('.route-filter');
    if (!filterContainer) return;
    
    filterContainer.innerHTML = `
        <div class="filter-section">
            <div class="filter-group">
                <label>线路分类</label>
                <select id="categoryFilter" onchange="applyFilters()">
                    <option value="">全部分类</option>
                    <option value="culture">文化古迹</option>
                    <option value="nature">自然风光</option>
                    <option value="food">美食体验</option>
                    <option value="comprehensive">全景深度</option>
                    <option value="family">亲子研学</option>
                    <option value="photography">摄影采风</option>
                </select>
            </div>
            <div class="filter-group">
                <label>行程天数</label>
                <select id="durationFilter" onchange="applyFilters()">
                    <option value="">全部天数</option>
                    <option value="1-2">1-2天</option>
                    <option value="3-4">3-4天</option>
                    <option value="5-7">5-7天</option>
                </select>
            </div>
            <div class="filter-group">
                <label>价格范围</label>
                <select id="priceFilter" onchange="applyFilters()">
                    <option value="">全部价格</option>
                    <option value="0-500">¥500以下</option>
                    <option value="500-1000">¥500-1000</option>
                    <option value="1000-2000">¥1000-2000</option>
                    <option value="2000-3000">¥2000-3000</option>
                    <option value="3000+">¥3000以上</option>
                </select>
            </div>
            <div class="filter-group">
                <label>难度等级</label>
                <select id="difficultyFilter" onchange="applyFilters()">
                    <option value="">全部难度</option>
                    <option value="easy">轻松</option>
                    <option value="medium">适中</option>
                    <option value="hard">挑战</option>
                </select>
            </div>
            <div class="filter-group">
                <label>排序方式</label>
                <select id="sortFilter" onchange="applyFilters()">
                    <option value="default">默认排序</option>
                    <option value="price-asc">价格从低到高</option>
                    <option value="price-desc">价格从高到低</option>
                    <option value="rating-desc">评分从高到低</option>
                    <option value="duration-asc">天数从短到长</option>
                    <option value="duration-desc">天数从长到短</option>
                </select>
            </div>
            <div class="filter-actions">
                <button class="btn btn-outline" onclick="resetFilters()">重置筛选</button>
                <button class="btn btn-primary" onclick="applyFilters()">应用筛选</button>
            </div>
        </div>
    `;
}

// 应用筛选
function applyFilters() {
    const category = document.getElementById('categoryFilter').value;
    const duration = document.getElementById('durationFilter').value;
    const price = document.getElementById('priceFilter').value;
    const difficulty = document.getElementById('difficultyFilter').value;
    const sort = document.getElementById('sortFilter').value;
    
    let filteredRoutes = [...routeData];
    
    // 分类筛选
    if (category) {
        filteredRoutes = filteredRoutes.filter(route => route.category === category);
    }
    
    // 天数筛选
    if (duration) {
        const [min, max] = duration.split('-').map(Number);
        filteredRoutes = filteredRoutes.filter(route => {
            if (max) {
                return route.duration >= min && route.duration <= max;
            } else {
                return route.duration >= min;
            }
        });
    }
    
    // 价格筛选
    if (price) {
        if (price === '3000+') {
            filteredRoutes = filteredRoutes.filter(route => route.price >= 3000);
        } else {
            const [min, max] = price.split('-').map(Number);
            filteredRoutes = filteredRoutes.filter(route => route.price >= min && route.price <= max);
        }
    }
    
    // 难度筛选
    if (difficulty) {
        filteredRoutes = filteredRoutes.filter(route => route.difficulty === difficulty);
    }
    
    // 排序
    switch (sort) {
        case 'price-asc':
            filteredRoutes.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredRoutes.sort((a, b) => b.price - a.price);
            break;
        case 'rating-desc':
            filteredRoutes.sort((a, b) => b.rating - a.rating);
            break;
        case 'duration-asc':
            filteredRoutes.sort((a, b) => a.duration - b.duration);
            break;
        case 'duration-desc':
            filteredRoutes.sort((a, b) => b.duration - a.duration);
            break;
        default:
            // 保持默认排序
            break;
    }
    
    renderRoutes(filteredRoutes);
    
    // 显示筛选结果
    const resultCount = document.querySelector('.filter-result-count');
    if (resultCount) {
        resultCount.textContent = `找到 ${filteredRoutes.length} 条线路`;
    }
}

// 重置筛选
function resetFilters() {
    document.getElementById('categoryFilter').value = '';
    document.getElementById('durationFilter').value = '';
    document.getElementById('priceFilter').value = '';
    document.getElementById('difficultyFilter').value = '';
    document.getElementById('sortFilter').value = 'default';
    
    renderRoutes(routeData);
}

// 显示线路详情
function showRouteDetail(routeId) {
    const route = routeData.find(r => r.id === routeId);
    if (!route) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal large';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${route.title}</h3>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="route-detail">
                    <div class="detail-image">
                        <img src="${route.image}" alt="${route.title}">
                        <div class="detail-badges">
                            <span class="duration-badge">${route.duration}天</span>
                            <span class="difficulty-badge ${route.difficulty}">${getDifficultyText(route.difficulty)}</span>
                        </div>
                    </div>
                    <div class="detail-info">
                        <div class="detail-header">
                            <div class="rating-section">
                                <span class="stars">${generateStars(route.rating)}</span>
                                <span class="rating-score">${route.rating}</span>
                                <span class="review-count">(${route.reviewCount}条评价)</span>
                            </div>
                            <div class="price-section">
                                <span class="original-price">¥${route.originalPrice}</span>
                                <span class="current-price">¥${route.price}</span>
                                <span class="price-unit">/人</span>
                            </div>
                        </div>
                        
                        <div class="detail-description">
                            <p>${route.description}</p>
                        </div>
                        
                        <div class="detail-highlights">
                            <h4>行程亮点</h4>
                            <div class="highlights-grid">
                                ${route.highlights.map(highlight => `
                                    <span class="highlight-item">${highlight}</span>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="detail-included">
                            <div class="included-section">
                                <h4>费用包含</h4>
                                <ul>
                                    ${route.included.map(item => `<li>✓ ${item}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="excluded-section">
                                <h4>费用不含</h4>
                                <ul>
                                    ${route.excluded.map(item => `<li>✗ ${item}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        
                        <div class="detail-itinerary">
                            <h4>详细行程</h4>
                            <div class="itinerary-list">
                                ${route.itinerary.map((day, index) => `
                                    <div class="itinerary-day">
                                        <div class="day-header">
                                            <span class="day-number">第${day.day}天</span>
                                            <h5>${day.title}</h5>
                                        </div>
                                        <div class="day-content">
                                            <div class="activities">
                                                <strong>活动安排：</strong>
                                                ${day.activities.join(' → ')}
                                            </div>
                                            <div class="meals">
                                                <strong>用餐：</strong>${day.meals}
                                            </div>
                                            <div class="accommodation">
                                                <strong>住宿：</strong>${day.accommodation}
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="detail-info-grid">
                            <div class="info-item">
                                <strong>适合人群：</strong>
                                <span>${route.suitable.join('、')}</span>
                            </div>
                            <div class="info-item">
                                <strong>团队规模：</strong>
                                <span>${route.minPeople}-${route.maxPeople}人</span>
                            </div>
                            <div class="info-item">
                                <strong>预订要求：</strong>
                                <span>提前${route.bookingDeadline}天预订</span>
                            </div>
                            <div class="info-item">
                                <strong>取消政策：</strong>
                                <span>${route.cancellationPolicy}</span>
                            </div>
                        </div>
                        
                        <div class="detail-actions">
                            <button class="btn btn-outline" onclick="addToCompare(${route.id})">添加对比</button>
                            <button class="btn btn-primary" onclick="bookRoute(${route.id})">立即预订</button>
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

// 收藏功能
function toggleFavorite(routeId) {
    let favorites = JSON.parse(localStorage.getItem('hanzhong_route_favorites') || '[]');
    
    if (favorites.includes(routeId)) {
        favorites = favorites.filter(id => id !== routeId);
        Utils.showMessage('已取消收藏', 'info');
    } else {
        favorites.push(routeId);
        Utils.showMessage('收藏成功！', 'success');
    }
    
    localStorage.setItem('hanzhong_route_favorites', JSON.stringify(favorites));
    updateFavoriteButtons();
}

// 更新收藏按钮状态
function updateFavoriteButtons() {
    const favorites = JSON.parse(localStorage.getItem('hanzhong_route_favorites') || '[]');
    
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const routeCard = btn.closest('.route-card');
        const routeId = parseInt(routeCard.dataset.routeId);
        
        if (favorites.includes(routeId)) {
            btn.style.color = '#e74c3c';
            btn.title = '取消收藏';
        } else {
            btn.style.color = '#bdc3c7';
            btn.title = '收藏';
        }
    });
}

// 初始化线路对比
function initRouteComparison() {
    let compareList = [];
    
    window.addToCompare = function(routeId) {
        if (compareList.includes(routeId)) {
            Utils.showMessage('该线路已在对比列表中', 'warning');
            return;
        }
        
        if (compareList.length >= 3) {
            Utils.showMessage('最多只能对比3条线路', 'warning');
            return;
        }
        
        compareList.push(routeId);
        Utils.showMessage('已添加到对比列表', 'success');
        updateCompareWidget();
    };
    
    window.removeFromCompare = function(routeId) {
        compareList = compareList.filter(id => id !== routeId);
        updateCompareWidget();
    };
    
    window.showComparison = function() {
        if (compareList.length < 2) {
            Utils.showMessage('至少选择2条线路进行对比', 'warning');
            return;
        }
        
        const compareRoutes = compareList.map(id => routeData.find(r => r.id === id));
        showComparisonModal(compareRoutes);
    };
    
    function updateCompareWidget() {
        let compareWidget = document.querySelector('.compare-widget');
        
        if (compareList.length === 0) {
            if (compareWidget) {
                compareWidget.remove();
            }
            return;
        }
        
        if (!compareWidget) {
            compareWidget = document.createElement('div');
            compareWidget.className = 'compare-widget';
            document.body.appendChild(compareWidget);
        }
        
        const compareRoutes = compareList.map(id => routeData.find(r => r.id === id));
        
        compareWidget.innerHTML = `
            <div class="compare-header">
                <h4>线路对比 (${compareList.length}/3)</h4>
                <button class="compare-close" onclick="clearCompare()">×</button>
            </div>
            <div class="compare-list">
                ${compareRoutes.map(route => `
                    <div class="compare-item">
                        <img src="${route.image}" alt="${route.title}">
                        <span class="compare-title">${route.title}</span>
                        <button class="compare-remove" onclick="removeFromCompare(${route.id})">×</button>
                    </div>
                `).join('')}
            </div>
            <div class="compare-actions">
                <button class="btn btn-primary" onclick="showComparison()">开始对比</button>
            </div>
        `;
    }
    
    window.clearCompare = function() {
        compareList = [];
        updateCompareWidget();
    };
}

// 显示对比弹窗
function showComparisonModal(routes) {
    const modal = document.createElement('div');
    modal.className = 'modal large';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>线路对比</h3>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="comparison-table">
                    <table>
                        <thead>
                            <tr>
                                <th>对比项目</th>
                                ${routes.map(route => `<th>${route.title}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>线路图片</td>
                                ${routes.map(route => `
                                    <td><img src="${route.image}" alt="${route.title}" class="compare-image"></td>
                                `).join('')}
                            </tr>
                            <tr>
                                <td>行程天数</td>
                                ${routes.map(route => `<td>${route.duration}天</td>`).join('')}
                            </tr>
                            <tr>
                                <td>价格</td>
                                ${routes.map(route => `
                                    <td>
                                        <span class="original-price">¥${route.originalPrice}</span>
                                        <span class="current-price">¥${route.price}</span>
                                    </td>
                                `).join('')}
                            </tr>
                            <tr>
                                <td>难度等级</td>
                                ${routes.map(route => `<td>${getDifficultyText(route.difficulty)}</td>`).join('')}
                            </tr>
                            <tr>
                                <td>用户评分</td>
                                ${routes.map(route => `
                                    <td>
                                        <span class="stars">${generateStars(route.rating)}</span>
                                        <span>${route.rating}</span>
                                    </td>
                                `).join('')}
                            </tr>
                            <tr>
                                <td>团队规模</td>
                                ${routes.map(route => `<td>${route.minPeople}-${route.maxPeople}人</td>`).join('')}
                            </tr>
                            <tr>
                                <td>行程亮点</td>
                                ${routes.map(route => `
                                    <td>
                                        <ul class="highlights-list">
                                            ${route.highlights.slice(0, 3).map(h => `<li>${h}</li>`).join('')}
                                        </ul>
                                    </td>
                                `).join('')}
                            </tr>
                            <tr>
                                <td>适合人群</td>
                                ${routes.map(route => `<td>${route.suitable.join('、')}</td>`).join('')}
                            </tr>
                            <tr>
                                <td>预订要求</td>
                                ${routes.map(route => `<td>提前${route.bookingDeadline}天</td>`).join('')}
                            </tr>
                            <tr>
                                <td>操作</td>
                                ${routes.map(route => `
                                    <td>
                                        <button class="btn btn-sm btn-outline" onclick="showRouteDetail(${route.id})">查看详情</button>
                                        <button class="btn btn-sm btn-primary" onclick="bookRoute(${route.id})">立即预订</button>
                                    </td>
                                `).join('')}
                            </tr>
                        </tbody>
                    </table>
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

// 预订线路
function bookRoute(routeId) {
    const route = routeData.find(r => r.id === routeId);
    if (!route) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>预订线路</h3>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="booking-form">
                    <div class="route-summary">
                        <h4>${route.title}</h4>
                        <div class="summary-info">
                            <span>行程：${route.duration}天</span>
                            <span>价格：¥${route.price}/人</span>
                            <span>难度：${getDifficultyText(route.difficulty)}</span>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h5>出行信息</h5>
                        <div class="form-row">
                            <div class="form-group">
                                <label>出发日期</label>
                                <input type="date" id="departureDate" min="${new Date().toISOString().split('T')[0]}" required>
                            </div>
                            <div class="form-group">
                                <label>出行人数</label>
                                <select id="peopleCount" required>
                                    ${Array.from({length: route.maxPeople - route.minPeople + 1}, (_, i) => 
                                        `<option value="${route.minPeople + i}">${route.minPeople + i}人</option>`
                                    ).join('')}
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h5>联系信息</h5>
                        <div class="form-row">
                            <div class="form-group">
                                <label>联系人姓名</label>
                                <input type="text" id="contactName" placeholder="请输入联系人姓名" required>
                            </div>
                            <div class="form-group">
                                <label>手机号码</label>
                                <input type="tel" id="contactPhone" placeholder="请输入手机号码" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>邮箱地址（可选）</label>
                            <input type="email" id="contactEmail" placeholder="请输入邮箱地址">
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h5>特殊需求</h5>
                        <div class="form-group">
                            <label>备注说明</label>
                            <textarea id="specialRequests" placeholder="请输入特殊需求或备注..." rows="3"></textarea>
                        </div>
                    </div>
                    
                    <div class="price-summary">
                        <div class="price-item">
                            <span>单价：</span>
                            <span>¥${route.price}/人</span>
                        </div>
                        <div class="price-item">
                            <span>人数：</span>
                            <span id="selectedPeople">${route.minPeople}人</span>
                        </div>
                        <div class="price-item total">
                            <span>总价：</span>
                            <span id="totalPrice">¥${route.price * route.minPeople}</span>
                        </div>
                    </div>
                    
                    <div class="booking-actions">
                        <button class="btn btn-outline" onclick="closeBookingModal()">取消</button>
                        <button class="btn btn-primary" onclick="submitBooking(${route.id})">确认预订</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // 人数变化时更新价格
    const peopleSelect = modal.querySelector('#peopleCount');
    const selectedPeopleSpan = modal.querySelector('#selectedPeople');
    const totalPriceSpan = modal.querySelector('#totalPrice');
    
    peopleSelect.addEventListener('change', function() {
        const people = parseInt(this.value);
        selectedPeopleSpan.textContent = `${people}人`;
        totalPriceSpan.textContent = `¥${route.price * people}`;
    });
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', function() {
        modal.remove();
        document.body.style.overflow = 'auto';
    });
    
    window.closeBookingModal = function() {
        modal.remove();
        document.body.style.overflow = 'auto';
    };
}

// 提交预订
function submitBooking(routeId) {
    const route = routeData.find(r => r.id === routeId);
    const departureDate = document.getElementById('departureDate').value;
    const peopleCount = parseInt(document.getElementById('peopleCount').value);
    const contactName = document.getElementById('contactName').value.trim();
    const contactPhone = document.getElementById('contactPhone').value.trim();
    const contactEmail = document.getElementById('contactEmail').value.trim();
    const specialRequests = document.getElementById('specialRequests').value.trim();
    
    // 验证表单
    if (!departureDate) {
        Utils.showMessage('请选择出发日期', 'warning');
        return;
    }
    
    if (!contactName) {
        Utils.showMessage('请输入联系人姓名', 'warning');
        return;
    }
    
    if (!contactPhone || !Utils.validatePhone(contactPhone)) {
        Utils.showMessage('请输入正确的手机号码', 'warning');
        return;
    }
    
    if (contactEmail && !Utils.validateEmail(contactEmail)) {
        Utils.showMessage('邮箱格式不正确', 'warning');
        return;
    }
    
    // 检查日期是否符合预订要求
    const departure = new Date(departureDate);
    const today = new Date();
    const diffDays = Math.ceil((departure - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < route.bookingDeadline) {
        Utils.showMessage(`该线路需要提前${route.bookingDeadline}天预订`, 'warning');
        return;
    }
    
    // 保存预订信息
    const booking = {
        routeId: routeId,
        routeTitle: route.title,
        departureDate: departureDate,
        peopleCount: peopleCount,
        contactName: contactName,
        contactPhone: contactPhone,
        contactEmail: contactEmail,
        specialRequests: specialRequests,
        totalPrice: route.price * peopleCount,
        bookingTime: new Date().toISOString(),
        status: 'pending'
    };
    
    let bookings = JSON.parse(localStorage.getItem('hanzhong_route_bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('hanzhong_route_bookings', JSON.stringify(bookings));
    
    // 显示成功信息
    Utils.showMessage('预订成功！我们会尽快与您联系确认。', 'success');
    closeBookingModal();
    
    // 显示预订确认
    showBookingConfirmation(booking);
}

// 显示预订确认
function showBookingConfirmation(booking) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>预订确认</h3>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="confirmation-content">
                    <div class="success-icon">✓</div>
                    <h4>预订成功！</h4>
                    <p>感谢您选择汉中旅游线路，我们已收到您的预订信息。</p>
                    
                    <div class="booking-details">
                        <h5>预订详情</h5>
                        <div class="detail-item">
                            <span class="label">线路名称：</span>
                            <span class="value">${booking.routeTitle}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">出发日期：</span>
                            <span class="value">${booking.departureDate}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">出行人数：</span>
                            <span class="value">${booking.peopleCount}人</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">联系人：</span>
                            <span class="value">${booking.contactName}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">联系电话：</span>
                            <span class="value">${booking.contactPhone}</span>
                        </div>
                        <div class="detail-item total">
                            <span class="label">总价：</span>
                            <span class="value">¥${booking.totalPrice}</span>
                        </div>
                    </div>
                    
                    <div class="next-steps">
                        <h5>下一步</h5>
                        <ul>
                            <li>我们会在24小时内与您电话联系确认行程</li>
                            <li>确认后会发送详细的出行指南到您的邮箱</li>
                            <li>如有疑问，可随时联系客服：0916-12345</li>
                        </ul>
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

// 初始化个性化定制表单
function initCustomizeForm() {
    const customizeContainer = document.querySelector('.customize-form');
    if (!customizeContainer) return;
    
    customizeContainer.innerHTML = `
        <h3>个性化定制</h3>
        <p>没找到合适的线路？告诉我们您的需求，我们为您量身定制专属旅游线路。</p>
        
        <form class="customize-form-content">
            <div class="form-section">
                <h4>基本信息</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label>您的姓名</label>
                        <input type="text" id="customizeName" placeholder="请输入您的姓名" required>
                    </div>
                    <div class="form-group">
                        <label>联系电话</label>
                        <input type="tel" id="customizePhone" placeholder="请输入手机号码" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>邮箱地址</label>
                    <input type="email" id="customizeEmail" placeholder="请输入邮箱地址">
                </div>
            </div>
            
            <div class="form-section">
                <h4>旅行偏好</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label>旅行类型</label>
                        <select id="customizeType" required>
                            <option value="">请选择旅行类型</option>
                            <option value="culture">文化历史</option>
                            <option value="nature">自然风光</option>
                            <option value="food">美食体验</option>
                            <option value="adventure">户外探险</option>
                            <option value="leisure">休闲度假</option>
                            <option value="photography">摄影采风</option>
                            <option value="family">亲子游</option>
                            <option value="group">团队建设</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>行程天数</label>
                        <select id="customizeDuration" required>
                            <option value="">请选择天数</option>
                            <option value="1">1天</option>
                            <option value="2">2天</option>
                            <option value="3">3天</option>
                            <option value="4">4天</option>
                            <option value="5">5天</option>
                            <option value="6">6天</option>
                            <option value="7">7天</option>
                            <option value="7+">7天以上</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>出行人数</label>
                        <input type="number" id="customizePeople" min="1" max="50" placeholder="请输入人数" required>
                    </div>
                    <div class="form-group">
                        <label>预算范围（每人）</label>
                        <select id="customizeBudget" required>
                            <option value="">请选择预算</option>
                            <option value="0-500">¥500以下</option>
                            <option value="500-1000">¥500-1000</option>
                            <option value="1000-2000">¥1000-2000</option>
                            <option value="2000-3000">¥2000-3000</option>
                            <option value="3000-5000">¥3000-5000</option>
                            <option value="5000+">¥5000以上</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="form-section">
                <h4>出行安排</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label>出发日期</label>
                        <input type="date" id="customizeDate" min="${new Date().toISOString().split('T')[0]}" required>
                    </div>
                    <div class="form-group">
                        <label>出发城市</label>
                        <input type="text" id="customizeOrigin" placeholder="请输入出发城市" required>
                    </div>
                </div>
            </div>
            
            <div class="form-section">
                <h4>特殊需求</h4>
                <div class="form-group">
                    <label>详细需求描述</label>
                    <textarea id="customizeRequirements" placeholder="请详细描述您的旅行需求、兴趣偏好、特殊要求等..." rows="4" required></textarea>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-outline" onclick="resetCustomizeForm()">重置表单</button>
                <button type="button" class="btn btn-primary" onclick="submitCustomizeForm()">提交定制需求</button>
            </div>
        </form>
    `;
}

// 提交定制表单
function submitCustomizeForm() {
    const name = document.getElementById('customizeName').value.trim();
    const phone = document.getElementById('customizePhone').value.trim();
    const email = document.getElementById('customizeEmail').value.trim();
    const type = document.getElementById('customizeType').value;
    const duration = document.getElementById('customizeDuration').value;
    const people = document.getElementById('customizePeople').value;
    const budget = document.getElementById('customizeBudget').value;
    const date = document.getElementById('customizeDate').value;
    const origin = document.getElementById('customizeOrigin').value.trim();
    const requirements = document.getElementById('customizeRequirements').value.trim();
    
    // 验证表单
    if (!name) {
        Utils.showMessage('请输入您的姓名', 'warning');
        return;
    }
    
    if (!phone || !Utils.validatePhone(phone)) {
        Utils.showMessage('请输入正确的手机号码', 'warning');
        return;
    }
    
    if (email && !Utils.validateEmail(email)) {
        Utils.showMessage('邮箱格式不正确', 'warning');
        return;
    }
    
    if (!type) {
        Utils.showMessage('请选择旅行类型', 'warning');
        return;
    }
    
    if (!duration) {
        Utils.showMessage('请选择行程天数', 'warning');
        return;
    }
    
    if (!people || people < 1) {
        Utils.showMessage('请输入正确的出行人数', 'warning');
        return;
    }
    
    if (!budget) {
        Utils.showMessage('请选择预算范围', 'warning');
        return;
    }
    
    if (!date) {
        Utils.showMessage('请选择出发日期', 'warning');
        return;
    }
    
    if (!origin) {
        Utils.showMessage('请输入出发城市', 'warning');
        return;
    }
    
    if (!requirements) {
        Utils.showMessage('请描述您的详细需求', 'warning');
        return;
    }
    
    // 保存定制需求
    const customization = {
        name: name,
        phone: phone,
        email: email,
        type: type,
        duration: duration,
        people: parseInt(people),
        budget: budget,
        date: date,
        origin: origin,
        requirements: requirements,
        submitTime: new Date().toISOString(),
        status: 'pending'
    };
    
    let customizations = JSON.parse(localStorage.getItem('hanzhong_customizations') || '[]');
    customizations.push(customization);
    localStorage.setItem('hanzhong_customizations', JSON.stringify(customizations));
    
    Utils.showMessage('定制需求提交成功！我们会在24小时内与您联系。', 'success');
    resetCustomizeForm();
}

// 重置定制表单
function resetCustomizeForm() {
    document.getElementById('customizeName').value = '';
    document.getElementById('customizePhone').value = '';
    document.getElementById('customizeEmail').value = '';
    document.getElementById('customizeType').value = '';
    document.getElementById('customizeDuration').value = '';
    document.getElementById('customizePeople').value = '';
    document.getElementById('customizeBudget').value = '';
    document.getElementById('customizeDate').value = '';
    document.getElementById('customizeOrigin').value = '';
    document.getElementById('customizeRequirements').value = '';
}

// 初始化线路预订功能
function initRouteBooking() {
    // 恢复收藏状态
    updateFavoriteButtons();
    
    // 添加到页面底部的统计信息
    addRouteStatistics();
}

// 添加线路统计
function addRouteStatistics() {
    const statsContainer = document.querySelector('.route-stats');
    if (!statsContainer) return;
    
    const totalRoutes = routeData.length;
    const avgPrice = Math.round(routeData.reduce((sum, route) => sum + route.price, 0) / totalRoutes);
    const avgRating = (routeData.reduce((sum, route) => sum + route.rating, 0) / totalRoutes).toFixed(1);
    const maxDuration = Math.max(...routeData.map(route => route.duration));
    
    statsContainer.innerHTML = `
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-number">${totalRoutes}</div>
                <div class="stat-label">精选线路</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">¥${avgPrice}</div>
                <div class="stat-label">平均价格</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">${avgRating}</div>
                <div class="stat-label">平均评分</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">${maxDuration}</div>
                <div class="stat-label">最长天数</div>
            </div>
        </div>
    `;
}

// 初始化筛选标签
function initFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const routeCards = document.querySelectorAll('.route-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // 更新活动标签
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选路线卡片
            routeCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInScale 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 初始化路线卡片
function initRouteCards() {
    const routeCards = document.querySelectorAll('.route-card');
    
    routeCards.forEach(card => {
        // 卡片悬停效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // 添加收藏功能
        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'btn-icon favorite-btn';
        favoriteBtn.innerHTML = '❤️';
        favoriteBtn.title = '收藏路线';
        
        favoriteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('favorited');
            
            if (this.classList.contains('favorited')) {
                this.innerHTML = '💖';
                this.title = '已收藏';
                showNotification('已添加到收藏夹！', 'success');
            } else {
                this.innerHTML = '❤️';
                this.title = '收藏路线';
                showNotification('已从收藏夹移除', 'info');
            }
        });
        
        // 将收藏按钮添加到卡片
        const routeImage = card.querySelector('.route-image');
        if (routeImage) {
            favoriteBtn.style.position = 'absolute';
            favoriteBtn.style.top = '15px';
            favoriteBtn.style.right = '15px';
            favoriteBtn.style.zIndex = '10';
            routeImage.style.position = 'relative';
            routeImage.appendChild(favoriteBtn);
        }
    });
}

// 初始化按钮特效
function initButtonEffects() {
    // 波纹效果
    const rippleButtons = document.querySelectorAll('.btn-ripple');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
    
    // 主要按钮特效
    const primaryButtons = document.querySelectorAll('.btn-primary');
    
    primaryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 添加成功动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                showNotification('预订请求已提交！', 'success');
            }, 150);
        });
        
        // 按钮加载状态
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
    });
    
    // 查看详情按钮
    const outlineButtons = document.querySelectorAll('.btn-outline');
    
    outlineButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const routeCard = this.closest('.route-card');
            const routeTitle = routeCard.querySelector('.route-title').textContent;
            
            // 显示详情模态框
            showRouteDetails(routeCard);
        });
    });
}

// 创建波纹效果
function createRipple(event, element) {
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - element.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - element.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = element.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    element.appendChild(circle);
    
    // 移除波纹元素
    setTimeout(() => {
        circle.remove();
    }, 600);
}

// 显示路线详情
function showRouteDetails(routeCard) {
    const routeTitle = routeCard.querySelector('.route-title').textContent;
    const routeDuration = routeCard.querySelector('.route-duration').textContent;
    const routePrice = routeCard.querySelector('.route-price').textContent;
    const highlights = Array.from(routeCard.querySelectorAll('.route-highlights li'))
        .map(li => li.textContent);
    
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'route-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${routeTitle}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="route-details">
                        <div class="detail-item">
                            <strong>行程时间：</strong>${routeDuration}
                        </div>
                        <div class="detail-item">
                            <strong>价格：</strong>${routePrice}
                        </div>
                        <div class="detail-item">
                            <strong>行程亮点：</strong>
                            <ul class="highlights-list">
                                ${highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                            </ul>
                        </div>
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
    
    // 模态框动画
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'translateY(0) scale(1)';
    }, 10);
    
    // 关闭模态框
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'translateY(-20px) scale(0.9)';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// 从JSON加载路线数据
function loadRoutesFromJSON() {
    fetch('data/routes.json')
        .then(response => response.json())
        .then(data => {
            console.log('路线数据加载成功：', data);
            // 可以在这里处理动态路线数据
        })
        .catch(error => {
            console.error('加载路线数据失败：', error);
        });
}

// 通知系统
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}
            </span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 动画显示
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // 自动移除
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 更新全局函数
window.toggleFavorite = toggleFavorite;
window.removeFromCompare = removeFromCompare;
window.showComparison = showComparison;
window.clearCompare = clearCompare;
window.closeBookingModal = closeBookingModal;
window.submitBooking = submitBooking;
window.submitCustomizeForm = submitCustomizeForm;
window.resetCustomizeForm = resetCustomizeForm; 