// 美食页面JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    // 检查用户登录状态
    checkGlobalUserStatus();
    
    // 初始化美食分类
    initFoodCategories();
    
    // 初始化美食卡片
    initFoodCards();
    
    // 初始化餐厅地图
    initRestaurantMap();
    
    // 初始化搜索功能
    initFoodSearch();
    
    // 初始化评价系统
    initReviewSystem();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化悬浮效果
    initHoverEffects();
    
    // 初始化收藏状态 - 确保在页面加载完成后执行
    setTimeout(() => {
        initFoodFavoriteStatus();
        // 同时调用全局状态更新函数
        if (typeof updateAllFavoriteButtonsStatus === 'function') {
            updateAllFavoriteButtonsStatus();
        }
    }, 100);

    // 预约体验按钮事件
    const bookingBtn = document.querySelector('.experience-booking .btn');
    if (bookingBtn) {
        bookingBtn.addEventListener('click', showBookingModal);
    }
});

// 美食数据
const foodData = [
    {
        id: 'remianpi',
        name: '汉中热面皮',
        category: '面食类',
        image: 'img/remianpi.jpg',
        rating: 4.9,
        price: '10-15',
        tags: ['招牌美食', '非遗小吃', '必尝'],
        description: '汉中最著名的小吃，面皮爽滑筋道，配以特制辣椒油和蒜蓉，酸辣开胃，回味无穷。选用优质面粉制作，经过特殊工艺处理，口感独特。',
        ingredients: ['优质面粉', '豆芽菜', '胡萝卜丝', '黄瓜丝', '特制辣椒油', '蒜蓉', '香醋', '生抽'],
        nutrition: { calories: 280, protein: 8, carbs: 45, fat: 6 },
        cookingTime: '现做现卖',
        origin: '汉中传统小吃，历史悠久',
        restaurants: ['老李面皮店', '汉江面皮', '传统美食坊']
    },
    {
        id: 'caidoufu',
        name: '汉中菜豆腐',
        category: '汤品类',
        image: 'img/caidoufu.jpg',
        rating: 4.7,
        price: '12-18',
        tags: ['营养健康', '家常菜', '清香'],
        description: '汉中传统家常菜，将豆腐与时令蔬菜完美结合，营养丰富，口味清香。选用优质黄豆制作的嫩豆腐，配以新鲜蔬菜。',
        ingredients: ['嫩豆腐', '青菜', '胡萝卜', '木耳', '香菇', '葱花', '生姜', '香油'],
        nutrition: { calories: 180, protein: 12, carbs: 15, fat: 8 },
        cookingTime: '15分钟',
        origin: '汉中民间传统汤品',
        restaurants: ['老味道餐厅', '汉中人家', '绿色食府']
    },
    {
        id: 'jiangshuimian',
        name: '浆水面',
        category: '面食类',
        image: 'img/jiangshuimian.jpg',
        rating: 4.6,
        price: '8-12',
        tags: ['消暑佳品', '酸香开胃', '夏季特色'],
        description: '陕南特色面食，以酸菜浆水为汤底，清香开胃，是夏日消暑的绝佳选择，也是汉中人的家常美味。',
        ingredients: ['手工面条', '浆水', '韭菜', '胡萝卜', '土豆丝', '辣椒油', '蒜苗', '香菜'],
        nutrition: { calories: 320, protein: 10, carbs: 55, fat: 5 },
        cookingTime: '10分钟',
        origin: '汉中夏季特色面食',
        restaurants: ['张记浆水面', '老字号面馆', '汉中味道']
    },
    {
        id: 'larou',
        name: '汉中腊肉',
        category: '肉类',
        image: 'img/larou.jpg',
        rating: 4.8,
        price: '60-80',
        tags: ['传统工艺', '香醇浓郁', '年货首选'],
        description: '选用优质猪肉，经传统工艺腌制风干，肉质紧实，香味浓郁，是汉中人过年必备的传统美食。',
        ingredients: ['优质猪肉', '粗盐', '花椒', '八角', '桂皮', '丁香', '白酒'],
        nutrition: { calories: 450, protein: 25, carbs: 2, fat: 35 },
        cookingTime: '腌制15天，风干30天',
        origin: '汉中传统腌制工艺',
        restaurants: ['汉中特产店', '老字号腊味', '山区农家']
    },
    {
        id: 'huangjiu',
        name: '汉中黄酒',
        category: '饮品类',
        image: 'img/huangjiu.jpg',
        rating: 4.5,
        price: '30-50',
        tags: ['传统酿造', '甘甜醇厚', '文化传承'],
        description: '采用汉中优质糯米酿制，口感甘甜醇厚，酒精度适中，是汉中地区传统的特色酒类。',
        ingredients: ['优质糯米', '酒曲', '山泉水', '红糖'],
        nutrition: { calories: 120, protein: 2, carbs: 8, fat: 0 },
        cookingTime: '发酵45天',
        origin: '汉中传统酿造工艺',
        restaurants: ['汉中酒厂', '传统酿酒坊', '特产专卖店']
    },
    {
        id: 'hetaomo',
        name: '核桃馍',
        category: '糕点类',
        image: 'img/hetaomo.jpg',
        rating: 4.4,
        price: '15-25',
        tags: ['香甜可口', '营养丰富', '馈赠佳品'],
        description: '汉中传统糕点，选用当地优质核桃仁，香甜可口，营养丰富，是馈赠亲友的佳品。',
        ingredients: ['面粉', '核桃仁', '白糖', '鸡蛋', '植物油', '泡打粉', '芝麻'],
        nutrition: { calories: 380, protein: 8, carbs: 45, fat: 18 },
        cookingTime: '制作2小时',
        origin: '汉中传统糕点工艺',
        restaurants: ['老字号糕点店', '传统手工坊', '特色烘焙店']
    }
];

// 分类数据
const categoryData = [
    { key: 'all', name: '全部美食', icon: '🍽️' },
    { key: 'noodles', name: '面食类', icon: '🍜' },
    { key: 'soup', name: '汤品类', icon: '🍲' },
    { key: 'cold', name: '凉拌类', icon: '🥗' },
    { key: 'dessert', name: '甜品类', icon: '🍯' },
    { key: 'fruit', name: '水果类', icon: '🍊' }
];

// 初始化分类筛选
function initFoodCategories() {
    const categoryContainer = document.querySelector('.category-tabs');
    if (!categoryContainer) return;
    
    // 不清空现有内容，直接使用HTML中已有的分类按钮
    const categoryButtons = categoryContainer.querySelectorAll('.category-tab');
    
    // 为每个分类按钮绑定点击事件
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // 更新活动状态
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // 筛选美食
            filterFoodByCategory(category);
        });
    });
}

// 获取分类数量
function getCountByCategory(category) {
    if (category === 'all') return foodData.length;
    return foodData.filter(food => food.category === category).length;
}

// 按分类筛选美食 - 修复分类逻辑
function filterFoodByCategory(category) {
    const foodCards = document.querySelectorAll('.food-card');
    const foodItems = document.querySelectorAll('.food-item');
    
    // 筛选特色美食卡片
    foodCards.forEach((card, index) => {
        if (index < foodData.length) {
            const food = foodData[index];
            let shouldShow = false;
            
            if (category === 'all') {
                shouldShow = true;
            } else {
                // 统一分类映射
                const categoryMap = {
                    'noodles': '面食类',
                    'snacks': '汤品类',
                    'meat': '肉类',
                    'drinks': '饮品类',
                    'desserts': '糕点类'
                };
                
                shouldShow = food.category === categoryMap[category];
            }
            
            if (shouldShow) {
                card.style.display = 'block';
                card.classList.remove('hidden');
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        }
    });
    
    // 筛选美食列表项
    foodItems.forEach(item => {
        const itemCategory = item.dataset.category;
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'flex';
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// 初始化美食卡片
function initFoodCards() {
    const foodGrid = document.querySelector('.food-grid');
    if (!foodGrid) return;
    
    foodGrid.innerHTML = '';
    
    foodData.forEach((food, index) => {
        const card = createFoodCard(food, index);
        foodGrid.appendChild(card);
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
    
    document.querySelectorAll('.food-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// 创建美食卡片
function createFoodCard(food) {
    const card = document.createElement('div');
    card.className = 'food-card';
    card.dataset.id = food.id;
    
    card.innerHTML = `
        <div class="card-image">
            <img src="${food.image}" alt="${food.name}" loading="lazy">
            <div class="card-overlay">
                <div class="food-tags">
                    ${food.tags ? food.tags.map(tag => `<span class="food-tag">${tag}</span>`).join('') : ''}
                </div>
            </div>
        </div>
        <div class="card-content">
            <h3 class="food-name">${food.name}</h3>
            <div class="food-rating">
                <span class="stars">${generateStars(food.rating)}</span>
                <span class="rating-text">${food.rating}分</span>
            </div>
            <p class="food-description">${food.description}</p>
            <div class="food-info">
                <div class="info-item">
                    <span class="info-label">参考价格</span>
                    <span class="info-value price">￥${food.price}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">制作时间</span>
                    <span class="info-value">${food.cookingTime}</span>
                </div>
            </div>
            <div class="nutrition-bar">
                <div class="nutrition-item">
                    <span>热量</span>
                    <span>${food.nutrition.calories}kcal</span>
                </div>
                <div class="nutrition-item">
                    <span>蛋白质</span>
                    <span>${food.nutrition.protein}g</span>
                </div>
            </div>
            <div class="card-actions">
                <button class="btn btn-primary" onclick="showFoodDetail('${food.id}')">
                    详细介绍
                </button>
                <button class="btn btn-outline favorite-btn" 
                        data-favorite-id="${food.id}"
                        data-favorite-type="food"
                        onclick="collectFood('${food.id}')">
                    收藏
                </button>
            </div>
        </div>
    `;
    
    // 添加悬浮效果
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

// 显示美食详情弹窗
function showFoodModal(foodId) {
    const food = foodData.find(item => item.id === foodId);
    if (!food) return;
    
    // 创建或获取弹窗
    let modal = document.getElementById('foodModal');
    if (!modal) {
        modal = createFoodModal();
    }
    
    // 填充数据
    const modalTitle = modal.querySelector('.modal-title');
    const modalImage = modal.querySelector('.modal-image img');
    const ratingValue = modal.querySelector('.rating-value');
    const priceValue = modal.querySelector('.price-value');
    const descriptionText = modal.querySelector('.description-text');
    const ingredientsList = modal.querySelector('.ingredients-list');
    const nutritionInfo = modal.querySelector('.nutrition-info');
    const originText = modal.querySelector('.origin-text');
    
    modalTitle.textContent = food.name;
    modalImage.src = food.image;
    modalImage.alt = food.name;
    ratingValue.textContent = `${food.rating}分`;
    priceValue.textContent = `￥${food.price}`;
    descriptionText.textContent = food.description;
    originText.textContent = food.origin;
    
    // 填充配料
    ingredientsList.innerHTML = '';
    food.ingredients.forEach(ingredient => {
        const item = document.createElement('span');
        item.className = 'ingredient-item';
        item.textContent = ingredient;
        ingredientsList.appendChild(item);
    });
    
    // 填充营养信息
    nutritionInfo.innerHTML = `
        <div class="nutrition-item">
            <span class="nutrition-label">热量</span>
            <span class="nutrition-value">${food.nutrition.calories} kcal</span>
        </div>
        <div class="nutrition-item">
            <span class="nutrition-label">蛋白质</span>
            <span class="nutrition-value">${food.nutrition.protein} g</span>
        </div>
        <div class="nutrition-item">
            <span class="nutrition-label">碳水化合物</span>
            <span class="nutrition-value">${food.nutrition.carbs} g</span>
        </div>
        <div class="nutrition-item">
            <span class="nutrition-label">脂肪</span>
            <span class="nutrition-value">${food.nutrition.fat} g</span>
        </div>
    `;
    
    // 显示弹窗
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// 创建美食详情弹窗
function createFoodModal() {
    const modalHTML = `
        <div id="foodModal" class="modal">
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
                        <div class="basic-info">
                            <div class="info-item">
                                <span class="info-label">评分</span>
                                <span class="rating-value"></span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">价格</span>
                                <span class="price-value"></span>
                            </div>
                        </div>
                        <div class="description">
                            <h4>美食介绍</h4>
                            <p class="description-text"></p>
                        </div>
                        <div class="ingredients">
                            <h4>主要配料</h4>
                            <div class="ingredients-list"></div>
                        </div>
                        <div class="nutrition">
                            <h4>营养成分</h4>
                            <div class="nutrition-info"></div>
                        </div>
                        <div class="origin">
                            <h4>美食起源</h4>
                            <p class="origin-text"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('foodModal');
    const closeBtn = modal.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', hideFoodModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideFoodModal();
        }
    });
    
    return modal;
}

// 隐藏美食详情弹窗
function hideFoodModal() {
    const modal = document.getElementById('foodModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// 显示推荐餐厅
function showRestaurants(foodId) {
    const food = foodData.find(item => item.id === foodId);
    if (!food) return;
    
    const restaurantList = food.restaurants.join('、');
    Utils.showMessage(`推荐餐厅：${restaurantList}`, 'info');
}

// 添加到收藏
function addToFavorites(foodId) {
    const food = foodData.find(item => item.id === foodId);
    if (!food) return;
    
    let favorites = JSON.parse(localStorage.getItem('hanzhong_favorites') || '[]');
    
    if (favorites.includes(foodId)) {
        Utils.showMessage('已经收藏过该美食了', 'info');
        return;
    }
    
    favorites.push(foodId);
    localStorage.setItem('hanzhong_favorites', JSON.stringify(favorites));
    
    Utils.showMessage(`已收藏 ${food.name}`, 'success');
}

// 初始化餐厅地图
function initRestaurantMap() {
    const mapContainer = document.querySelector('.restaurant-map');
    if (!mapContainer) return;
    
    // 模拟餐厅数据
    const restaurants = [
        { name: '老李面皮店', lat: 33.0684, lng: 107.0281, specialty: '汉中面皮', rating: 4.8 },
        { name: '汉江面皮', lat: 33.0694, lng: 107.0291, specialty: '热米皮', rating: 4.7 },
        { name: '老味道', lat: 33.0674, lng: 107.0271, specialty: '菜豆腐', rating: 4.6 },
        { name: '浆水面馆', lat: 33.0664, lng: 107.0261, specialty: '浆水面', rating: 4.9 },
        { name: '乌鸡王', lat: 33.0654, lng: 107.0251, specialty: '略阳乌鸡汤', rating: 4.8 }
    ];
    
    // 创建简易地图界面
    mapContainer.innerHTML = `
        <div class="map-header">
            <h3>推荐餐厅分布</h3>
            <div class="map-controls">
                <button class="map-btn" onclick="centerMap()">定位中心</button>
                <button class="map-btn" onclick="showAllRestaurants()">显示全部</button>
            </div>
        </div>
        <div class="map-content">
            <div class="restaurant-list">
                ${restaurants.map((restaurant, index) => `
                    <div class="restaurant-item" data-index="${index}">
                        <div class="restaurant-info">
                            <h4>${restaurant.name}</h4>
                            <p>招牌：${restaurant.specialty}</p>
                            <div class="restaurant-rating">
                                ${generateStars(restaurant.rating)} ${restaurant.rating}分
                            </div>
                        </div>
                        <div class="restaurant-actions">
                            <button class="btn-small" onclick="showOnMap(${index})">地图</button>
                            <button class="btn-small" onclick="getDirections(${index})">导航</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="map-placeholder">
                <div class="map-info">
                    <p>🗺️ 互动地图</p>
                    <p>点击餐厅查看位置</p>
                    <div class="map-legend">
                        <div class="legend-item">
                            <span class="legend-color" style="background: #ff6b6b;"></span>
                            <span>面食类餐厅</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-color" style="background: #4ecdc4;"></span>
                            <span>汤品类餐厅</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-color" style="background: #45b7d1;"></span>
                            <span>特色餐厅</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 地图相关函数
function centerMap() {
    Utils.showMessage('地图已定位到汉中市中心', 'info');
}

function showAllRestaurants() {
    Utils.showMessage('显示所有推荐餐厅', 'info');
}

function showOnMap(index) {
    Utils.showMessage(`在地图上显示餐厅位置`, 'info');
}

function getDirections(index) {
    Utils.showMessage('获取导航路线功能开发中...', 'info');
}

// 初始化搜索功能
function initFoodSearch() {
    const searchInput = document.querySelector('.food-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', Utils.debounce(function() {
        const keyword = this.value.trim().toLowerCase();
        searchFood(keyword);
    }, 300));
}

// 搜索美食
function searchFood(keyword) {
    const foodCards = document.querySelectorAll('.food-card');
    
    if (!keyword) {
        foodCards.forEach(card => {
            card.style.display = 'block';
        });
        return;
    }
    
    foodCards.forEach((card, index) => {
        const food = foodData[index];
        if (!food) return;
        
        const isMatch = food.name.toLowerCase().includes(keyword) ||
                       food.description.toLowerCase().includes(keyword) ||
                       food.tags.some(tag => tag.toLowerCase().includes(keyword)) ||
                       food.ingredients.some(ingredient => ingredient.toLowerCase().includes(keyword));
        
        card.style.display = isMatch ? 'block' : 'none';
    });
}

// 初始化评价系统
function initReviewSystem() {
    const reviewContainer = document.querySelector('.reviews-section');
    if (!reviewContainer) return;
    
    // 模拟评价数据
    const reviews = [
        {
            user: '美食爱好者',
            avatar: '👤',
            food: '汉中面皮',
            rating: 5,
            comment: '正宗的汉中面皮，味道太棒了！面皮爽滑，调料丰富，一定要尝试。',
            date: '2024-01-15',
            helpful: 23
        },
        {
            user: '本地人',
            avatar: '👨‍🍳',
            food: '菜豆腐',
            rating: 4,
            comment: '从小吃到大的味道，营养丰富，老少皆宜。推荐老味道这家店。',
            date: '2024-01-10',
            helpful: 18
        },
        {
            user: '游客',
            avatar: '🧳',
            food: '浆水面',
            rating: 5,
            comment: '第一次吃浆水面，酸爽开胃，特别适合夏天。汉中特色真不错！',
            date: '2024-01-08',
            helpful: 15
        }
    ];
    
    reviewContainer.innerHTML = `
        <div class="reviews-header">
            <h3>食客点评</h3>
            <button class="btn btn-primary" onclick="showReviewForm()">写点评</button>
        </div>
        <div class="reviews-list">
            ${reviews.map(review => `
                <div class="review-item">
                    <div class="review-header">
                        <div class="reviewer-info">
                            <span class="reviewer-avatar">${review.avatar}</span>
                            <div class="reviewer-details">
                                <h4>${review.user}</h4>
                                <p>点评了：${review.food}</p>
                            </div>
                        </div>
                        <div class="review-rating">
                            ${generateStars(review.rating)}
                        </div>
                    </div>
                    <div class="review-content">
                        <p>${review.comment}</p>
                    </div>
                    <div class="review-footer">
                        <span class="review-date">${review.date}</span>
                        <button class="helpful-btn" onclick="markHelpful(this)">
                            👍 有用 (${review.helpful})
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// 显示评价表单
function showReviewForm() {
    Utils.showMessage('评价功能开发中，敬请期待...', 'info');
}

// 标记有用
function markHelpful(button) {
    const currentText = button.textContent;
    const currentCount = parseInt(currentText.match(/\d+/)[0]);
    button.textContent = currentText.replace(/\d+/, currentCount + 1);
    button.disabled = true;
    button.style.opacity = '0.6';
    Utils.showMessage('感谢您的反馈！', 'success');
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll(
        '.food-card, .restaurant-card, .program-item, .gallery-item'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// 悬浮效果
function initHoverEffects() {
    // 美食卡片悬浮效果
    const foodCards = document.querySelectorAll('.food-card');
    foodCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 餐厅卡片悬浮效果
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    restaurantCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            const img = this.querySelector('img');
            if (img) img.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            const img = this.querySelector('img');
            if (img) img.style.transform = 'scale(1)';
        });
    });
    
    // 体验项目悬浮效果
    const programItems = document.querySelectorAll('.program-item');
    programItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.borderLeftColor = '#764ba2';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.borderLeftColor = '#667eea';
        });
    });
}

// 查看餐厅详情
function viewRestaurantDetails(restaurantId) {
    alert('餐厅详情页面正在开发中...');
}

// 分享美食功能
function shareFood(foodName, description) {
    const shareText = `${foodName} - ${description}\n查看更多汉中美食: ${window.location.href}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('分享链接已复制到剪贴板！');
        });
    } else {
        // 创建临时文本区域
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('分享链接已复制到剪贴板！');
    }
}

// 全局函数（供HTML调用）
window.viewRestaurantDetails = viewRestaurantDetails;
window.shareFood = shareFood;

// 添加样式
const style = document.createElement('style');
style.textContent = `
    .food-card {
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .card-image {
        position: relative;
        height: 200px;
        overflow: hidden;
    }
    
    .card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }
    
    .card-overlay {
        position: absolute;
        top: 15px;
        right: 15px;
    }
    
    .food-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
    }
    
    .food-tag {
        background: rgba(255,255,255,0.9);
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        color: #667eea;
        font-weight: bold;
    }
    
    .card-content {
        padding: 20px;
    }
    
    .food-name {
        color: #333;
        margin-bottom: 10px;
        font-size: 20px;
    }
    
    .food-rating {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 15px;
    }
    
    .stars {
        color: #ffc107;
        font-size: 16px;
    }
    
    .rating-text {
        color: #666;
        font-size: 14px;
    }
    
    .food-description {
        color: #666;
        line-height: 1.6;
        margin-bottom: 20px;
        font-size: 14px;
    }
    
    .food-info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin-bottom: 15px;
    }
    
    .info-item {
        text-align: center;
        padding: 10px;
        background: #f8f9fa;
        border-radius: 8px;
    }
    
    .info-label {
        display: block;
        font-size: 12px;
        color: #666;
        margin-bottom: 5px;
    }
    
    .info-value {
        font-weight: bold;
        color: #333;
    }
    
    .info-value.price {
        color: #e74c3c;
        font-size: 16px;
    }
    
    .nutrition-bar {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        padding: 10px;
        background: #f8f9fa;
        border-radius: 8px;
    }
    
    .nutrition-item {
        text-align: center;
        font-size: 12px;
    }
    
    .nutrition-item span:first-child {
        display: block;
        color: #666;
        margin-bottom: 5px;
    }
    
    .nutrition-item span:last-child {
        font-weight: bold;
        color: #667eea;
    }
    
    .card-actions {
        display: flex;
        gap: 10px;
    }
    
    .card-actions .btn {
        flex: 1;
        padding: 8px 12px;
        font-size: 13px;
    }
    
    .restaurant-map {
        background: white;
        border-radius: 20px;
        padding: 25px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .map-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    
    .map-controls {
        display: flex;
        gap: 10px;
    }
    
    .map-btn {
        padding: 8px 15px;
        background: #667eea;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 12px;
        transition: background 0.3s ease;
    }
    
    .map-btn:hover {
        background: #5a6fd8;
    }
    
    .map-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
    
    .restaurant-list {
        max-height: 400px;
        overflow-y: auto;
    }
    
    .restaurant-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        border: 1px solid #e0e0e0;
        border-radius: 10px;
        margin-bottom: 10px;
        transition: all 0.3s ease;
    }
    
    .restaurant-item:hover {
        border-color: #667eea;
        box-shadow: 0 3px 10px rgba(102, 126, 234, 0.2);
    }
    
    .restaurant-info h4 {
        color: #333;
        margin-bottom: 5px;
    }
    
    .restaurant-info p {
        color: #666;
        font-size: 13px;
        margin-bottom: 8px;
    }
    
    .restaurant-rating {
        font-size: 12px;
        color: #ffc107;
    }
    
    .restaurant-actions {
        display: flex;
        gap: 8px;
    }
    
    .btn-small {
        padding: 6px 12px;
        background: #f8f9fa;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        cursor: pointer;
        font-size: 11px;
        transition: all 0.3s ease;
    }
    
    .btn-small:hover {
        background: #667eea;
        color: white;
        border-color: #667eea;
    }
    
    .map-placeholder {
        background: #f8f9fa;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 400px;
    }
    
    .map-info {
        text-align: center;
        color: #666;
    }
    
    .map-info p:first-child {
        font-size: 2em;
        margin-bottom: 10px;
    }
    
    .map-legend {
        margin-top: 20px;
        text-align: left;
    }
    
    .legend-item {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
        font-size: 12px;
    }
    
    .legend-color {
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }
    
    .reviews-section {
        background: white;
        border-radius: 20px;
        padding: 25px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .reviews-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
    }
    
    .review-item {
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }
    
    .review-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }
    
    .review-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 15px;
    }
    
    .reviewer-info {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .reviewer-avatar {
        font-size: 2em;
    }
    
    .reviewer-details h4 {
        color: #333;
        margin-bottom: 5px;
        font-size: 16px;
    }
    
    .reviewer-details p {
        color: #666;
        font-size: 13px;
        margin: 0;
    }
    
    .review-rating {
        color: #ffc107;
    }
    
    .review-content p {
        color: #555;
        line-height: 1.6;
        margin-bottom: 15px;
    }
    
    .review-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .review-date {
        color: #999;
        font-size: 12px;
    }
    
    .helpful-btn {
        background: none;
        border: 1px solid #e0e0e0;
        padding: 6px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        color: #666;
        transition: all 0.3s ease;
    }
    
    .helpful-btn:hover:not(:disabled) {
        border-color: #667eea;
        color: #667eea;
    }
    
    .helpful-btn:disabled {
        cursor: not-allowed;
    }
    
    @media (max-width: 768px) {
        .map-content {
            grid-template-columns: 1fr;
        }
        
        .restaurant-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
        }
        
        .food-info {
            grid-template-columns: 1fr;
            gap: 10px;
        }
        
        .card-actions {
            flex-direction: column;
        }
    }
`;
document.head.appendChild(style); 

// 初始化美食收藏状态
function initFoodFavoriteStatus() {
    // 检查用户是否登录
    const userData = getGlobalUserData();
    
    // 检查所有收藏按钮的状态
    const favoriteButtons = document.querySelectorAll('[data-favorite-id]');
    favoriteButtons.forEach(button => {
        const foodId = button.getAttribute('data-favorite-id');
        const favoriteType = button.getAttribute('data-favorite-type');
        
        if (foodId && (favoriteType === 'food' || !favoriteType)) {
            if (!userData) {
                // 用户未登录，重置按钮状态
                updateSingleFoodFavoriteButton(button, false);
            } else {
                // 用户已登录，检查收藏状态
                const isFavorited = checkFoodFavoriteStatus(foodId);
                updateSingleFoodFavoriteButton(button, isFavorited);
            }
        }
    });
}

// 更新单个收藏按钮状态
function updateSingleFoodFavoriteButton(button, isFavorited) {
    if (isFavorited) {
        button.textContent = '已收藏';
        button.classList.add('favorited');
    } else {
        button.textContent = '收藏';
        button.classList.remove('favorited');
    }
}

// 修改美食收藏功能
function collectFood(foodId) {
    // 检查用户登录状态
    const userData = getGlobalUserData();
    if (!userData) {
        showCustomConfirm(
            '您需要先登录才能收藏美食，是否前往登录？',
            '需要登录',
            function() {
                window.location.href = 'login.html?return=' + encodeURIComponent(window.location.href);
            }
        );
        return;
    }

    // 获取当前收藏列表
    let favorites = JSON.parse(localStorage.getItem('hanzhong_favorites') || '[]');
    
    // 查找美食信息
    const food = foodData.find(f => f.id === foodId);
    if (!food) {
        showGlobalMessage('美食信息未找到', 'error');
        return;
    }

    // 检查是否已收藏
    const existingIndex = favorites.findIndex(fav => fav.id === foodId && fav.type === 'food');
    
    if (existingIndex !== -1) {
        // 已收藏，取消收藏
        favorites.splice(existingIndex, 1);
        localStorage.setItem('hanzhong_favorites', JSON.stringify(favorites));
        showGlobalMessage('已取消收藏', 'info');
        
        // 更新按钮状态
        updateFoodFavoriteButtons(foodId, false);
    } else {
        // 未收藏，添加收藏
        const favoriteItem = {
            id: foodId,
            type: 'food',
            title: food.name,
            description: food.description,
            image: food.image,
            rating: food.rating,
            price: `￥${food.price}`,
            url: `meishi.html#food-${foodId}`,
            addTime: new Date().toISOString()
        };
        
        favorites.push(favoriteItem);
        localStorage.setItem('hanzhong_favorites', JSON.stringify(favorites));
        showGlobalMessage('收藏成功！', 'success');
        
        // 更新按钮状态
        updateFoodFavoriteButtons(foodId, true);
    }
}

// 更新美食收藏按钮状态
function updateFoodFavoriteButtons(foodId, isFavorited) {
    // 更新所有相关的收藏按钮
    const cardButtons = document.querySelectorAll(`[data-favorite-id="${foodId}"]`);
    cardButtons.forEach(button => {
        updateSingleFoodFavoriteButton(button, isFavorited);
    });
    
    // 更新详情页面的收藏按钮
    const detailButton = document.querySelector('.food-detail .collect-btn');
    if (detailButton) {
        updateSingleFoodFavoriteButton(detailButton, isFavorited);
    }
}

// 检查美食收藏状态
function checkFoodFavoriteStatus(foodId) {
    const favorites = JSON.parse(localStorage.getItem('hanzhong_favorites') || '[]');
    return favorites.some(fav => fav.id === foodId && fav.type === 'food');
}

// 显示美食详情（修改版本，移除立即订购按钮）
function showFoodDetail(foodId) {
    const food = foodData.find(f => f.id === foodId);
    if (!food) {
        showGlobalMessage('美食信息未找到', 'error');
        return;
    }

    // 检查收藏状态
    const isFavorited = checkFoodFavoriteStatus(foodId);

    const modal = document.createElement('div');
    modal.className = 'food-detail-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeFoodDetail()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${food.name}</h2>
                <button class="modal-close" onclick="closeFoodDetail()">×</button>
            </div>
            <div class="modal-body">
                <div class="food-detail">
                    <div class="detail-image">
                        <img src="${food.image}" alt="${food.name}">
                        <div class="image-overlay">
                            <div class="rating-badge">
                                <span class="stars">${generateStars(food.rating)}</span>
                                <span class="rating-score">${food.rating}分</span>
                            </div>
                        </div>
                    </div>
                    <div class="detail-content">
                        <div class="basic-info">
                            <div class="info-item">
                                <span class="label">💰 参考价格：</span>
                                <span class="value price">￥${food.price}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">⏰ 制作时间：</span>
                                <span class="value">${food.cookingTime}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">📍 起源：</span>
                                <span class="value">${food.origin}</span>
                            </div>
                        </div>
                        
                        <div class="description-section">
                            <h3>美食介绍</h3>
                            <p>${food.description}</p>
                        </div>
                        
                        <div class="ingredients-section">
                            <h3>主要食材</h3>
                            <div class="ingredients-grid">
                                ${food.ingredients.map(ingredient => `
                                    <div class="ingredient-tag">${ingredient}</div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="nutrition-section">
                            <h3>营养信息</h3>
                            <div class="nutrition-grid">
                                <div class="nutrition-item">
                                    <span class="nutrition-label">热量</span>
                                    <span class="nutrition-value">${food.nutrition.calories}卡</span>
                                </div>
                                <div class="nutrition-item">
                                    <span class="nutrition-label">蛋白质</span>
                                    <span class="nutrition-value">${food.nutrition.protein}g</span>
                                </div>
                                <div class="nutrition-item">
                                    <span class="nutrition-label">碳水</span>
                                    <span class="nutrition-value">${food.nutrition.carbs}g</span>
                                </div>
                                <div class="nutrition-item">
                                    <span class="nutrition-label">脂肪</span>
                                    <span class="nutrition-value">${food.nutrition.fat}g</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="restaurants-section">
                            <h3>推荐店铺</h3>
                            <div class="restaurants-list">
                                ${food.restaurants.map(restaurant => `
                                    <div class="restaurant-item">
                                        <span class="restaurant-name">${restaurant}</span>
                                        <span class="restaurant-rating">⭐ 4.5</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="tips-section">
                            <h3>美食贴士</h3>
                            <ul class="tips-list">
                                <li>最佳食用时间：上午10点至下午2点</li>
                                <li>建议搭配温开水或清淡汤品</li>
                                <li>注意食材新鲜度，选择信誉好的店铺</li>
                                <li>如有过敏史，请提前告知店家</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeFoodDetail()">关闭</button>
                <button class="btn btn-primary collect-btn ${isFavorited ? 'favorited' : ''}" 
                        data-favorite-id="${foodId}"
                        onclick="collectFood('${foodId}')">
                    ${isFavorited ? '已收藏' : '收藏美食'}
                </button>
            </div>
        </div>
    `;

    // 添加样式
    addFoodDetailStyles();
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // 添加显示动画
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// 关闭美食详情弹窗
function closeFoodDetail() {
    const modal = document.querySelector('.food-detail-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// 订购美食
function orderFood(foodId) {
    const userData = getGlobalUserData();
    if (!userData) {
        showCustomConfirm(
            '您需要先登录才能订购美食，是否前往登录？',
            '需要登录',
            function() {
                window.location.href = 'login.html?return=' + encodeURIComponent(window.location.href);
            }
        );
        return;
    }
    
    showGlobalMessage('订购功能开发中，敬请期待！', 'info');
}

// 添加美食详情弹窗样式
function addFoodDetailStyles() {
    if (document.querySelector('#food-detail-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'food-detail-styles';
    style.textContent = `
        .food-detail-modal {
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
        
        .food-detail-modal.show {
            opacity: 1;
            visibility: visible;
        }
        
        .food-detail-modal .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
        }
        
        .food-detail-modal .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 16px;
            width: 90%;
            max-width: 900px;
            max-height: 90vh;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        
        .food-detail-modal .modal-header {
            padding: 20px 24px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
            color: white;
        }
        
        .food-detail-modal .modal-header h2 {
            margin: 0;
            font-size: 24px;
        }
        
        .food-detail-modal .modal-close {
            background: none;
            border: none;
            color: white;
            font-size: 28px;
            cursor: pointer;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .food-detail-modal .modal-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .food-detail-modal .modal-body {
            padding: 0;
            max-height: calc(90vh - 140px);
            overflow-y: auto;
        }
        
        .food-detail-modal .food-image {
            position: relative;
            height: 300px;
            overflow: hidden;
        }
        
        .food-detail-modal .food-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .food-detail-modal .food-badge {
            position: absolute;
            top: 20px;
            left: 20px;
            background: rgba(255, 107, 53, 0.9);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 14px;
        }
        
        .food-detail-modal .food-info {
            padding: 24px;
        }
        
        .food-detail-modal .info-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .food-detail-modal .rating {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .food-detail-modal .stars {
            color: #ff6b35;
            font-size: 18px;
        }
        
        .food-detail-modal .rating-score {
            font-weight: 600;
            color: #333;
        }
        
        .food-detail-modal .price {
            font-size: 20px;
            font-weight: 600;
            color: #ff6b35;
        }
        
        .food-detail-modal .description,
        .food-detail-modal .ingredients,
        .food-detail-modal .nutrition,
        .food-detail-modal .restaurants,
        .food-detail-modal .tips {
            margin-bottom: 24px;
        }
        
        .food-detail-modal h4 {
            margin: 0 0 12px 0;
            font-size: 16px;
            color: #333;
            font-weight: 600;
        }
        
        .food-detail-modal p {
            margin: 0;
            line-height: 1.6;
            color: #666;
        }
        
        .food-detail-modal .ingredient-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .food-detail-modal .ingredient-tag {
            background: #f8f9fa;
            color: #495057;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            border: 1px solid #dee2e6;
        }
        
        .food-detail-modal .nutrition-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 12px;
        }
        
        .food-detail-modal .nutrition-item {
            background: #f8f9fa;
            padding: 12px;
            border-radius: 8px;
            text-align: center;
        }
        
        .food-detail-modal .nutrition-item .label {
            display: block;
            font-size: 12px;
            color: #666;
            margin-bottom: 4px;
        }
        
        .food-detail-modal .nutrition-item .value {
            display: block;
            font-size: 16px;
            font-weight: 600;
            color: #333;
        }
        
        .food-detail-modal .restaurant-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .food-detail-modal .restaurant-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .food-detail-modal .restaurant-info h5 {
            margin: 0 0 4px 0;
            color: #333;
        }
        
        .food-detail-modal .restaurant-info p {
            margin: 2px 0;
            font-size: 12px;
            color: #666;
        }
        
        .food-detail-modal .restaurant-rating {
            text-align: right;
        }
        
        .food-detail-modal .restaurant-rating .stars {
            font-size: 14px;
        }
        
        .food-detail-modal .restaurant-rating .score {
            display: block;
            font-size: 12px;
            color: #666;
            margin-top: 2px;
        }
        
        .food-detail-modal ul {
            margin: 0;
            padding-left: 20px;
        }
        
        .food-detail-modal li {
            margin-bottom: 8px;
            color: #666;
            line-height: 1.5;
        }
        
        .food-detail-modal .modal-footer {
            padding: 20px 24px;
            border-top: 1px solid #eee;
            display: flex;
            gap: 12px;
            justify-content: flex-end;
        }
        
        .food-detail-modal .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        .food-detail-modal .btn-primary {
            background: #ff6b35;
            color: white;
        }
        
        .food-detail-modal .btn-primary:hover {
            background: #e55a2b;
        }
        
        .food-detail-modal .btn-secondary {
            background: #6c757d;
            color: white;
        }
        
        .food-detail-modal .btn-secondary:hover {
            background: #5a6268;
        }
        
        .food-detail-modal .btn-outline {
            background: transparent;
            color: #ff6b35;
            border: 1px solid #ff6b35;
        }
        
        .food-detail-modal .btn-outline:hover {
            background: #ff6b35;
            color: white;
        }
        
        @media (max-width: 768px) {
            .food-detail-modal .modal-content {
                width: 95%;
                max-height: 95vh;
            }
            
            .food-detail-modal .food-image {
                height: 200px;
            }
            
            .food-detail-modal .info-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
            }
            
            .food-detail-modal .nutrition-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .food-detail-modal .restaurant-item {
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
            }
            
            .food-detail-modal .restaurant-rating {
                text-align: left;
            }
            
            .food-detail-modal .modal-footer {
                flex-direction: column;
            }
            
            .food-detail-modal .btn {
                width: 100%;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// 显示自定义预约弹窗
function showBookingModal() {
    // 如果已存在弹窗，先移除
    const exist = document.getElementById('foodBookingModal');
    if (exist) exist.remove();

    // 弹窗HTML
    const modal = document.createElement('div');
    modal.id = 'foodBookingModal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeFoodBookingModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>预约美食制作体验</h2>
                <button class="modal-close" onclick="closeFoodBookingModal()">×</button>
            </div>
            <div class="modal-body">
                <form id="bookingForm">
                    <div class="form-group">
                        <label for="program">选择体验项目：</label>
                        <select id="program" name="program" class="form-control" required>
                            <option value="">请选择</option>
                            <option value="noodles">热面皮制作体验</option>
                            <option value="dumplings">汉中饺子体验</option>
                            <option value="tofu">菜豆腐制作体验</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="name">姓名：</label>
                        <input type="text" id="name" name="name" class="form-control" placeholder="请输入您的姓名" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">联系电话：</label>
                        <input type="tel" id="phone" name="phone" class="form-control" placeholder="请输入手机号" required>
                    </div>
                    <div class="form-group">
                        <label for="remark">备注（可选）：</label>
                        <textarea id="remark" name="remark" class="form-control" placeholder="如有特殊需求请填写"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-outline" onclick="closeFoodBookingModal()">取消</button>
                        <button type="submit" class="btn btn-primary">确认预约</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // 表单提交事件
    document.getElementById('bookingForm').onsubmit = function(e) {
        e.preventDefault();
        submitFoodBooking();
    };

    // 添加样式
    addFoodBookingModalStyles();
}

// 关闭弹窗
function closeFoodBookingModal() {
    const modal = document.getElementById('foodBookingModal');
    if (modal) modal.remove();
    document.body.style.overflow = '';
}

// 提交预约
function submitFoodBooking() {
    const program = document.getElementById('program').value;
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const remark = document.getElementById('remark').value.trim();
    if (!program) {
        showGlobalMessage('请选择体验项目', 'error');
        return;
    }
    if (!name) {
        showGlobalMessage('请输入姓名', 'error');
        return;
    }
    if (!phone) {
        showGlobalMessage('请输入联系电话', 'error');
        return;
    }
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        showGlobalMessage('请输入正确的手机号', 'error');
        return;
    }
    closeFoodBookingModal();
    showCustomConfirm(
        `预约成功！我们将在24小时内与您联系确认具体时间。`,
        '预约成功',
        null,
        '确定'
    );
}

// 添加弹窗样式
function addFoodBookingModalStyles() {
    if (document.getElementById('food-booking-modal-style')) return;
    const style = document.createElement('style');
    style.id = 'food-booking-modal-style';
    style.textContent = `
    #foodBookingModal {
        position: fixed; left: 0; top: 0; width: 100vw; height: 100vh; z-index: 9999;
        display: flex; align-items: center; justify-content: center;
    }
    #foodBookingModal .modal-overlay {
        position: absolute; left: 0; top: 0; width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.45); backdrop-filter: blur(2px);
    }
    #foodBookingModal .modal-content {
        position: relative; background: #fff; border-radius: 16px; max-width: 400px; width: 90vw;
        box-shadow: 0 8px 32px rgba(0,0,0,0.18); padding: 0; animation: fadeInUp 0.3s;
    }
    #foodBookingModal .modal-header {
        padding: 20px 24px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border-radius: 16px 16px 0 0;
    }
    #foodBookingModal .modal-header h2 { margin: 0; font-size: 20px; }
    #foodBookingModal .modal-close {
        background: none; border: none; color: #fff; font-size: 26px; cursor: pointer; padding: 0 6px;
        border-radius: 50%; transition: background 0.2s;
    }
    #foodBookingModal .modal-close:hover { background: rgba(255,255,255,0.15); }
    #foodBookingModal .modal-body { padding: 24px; }
    #foodBookingModal .form-group { margin-bottom: 18px; }
    #foodBookingModal label { display: block; margin-bottom: 6px; color: #333; font-weight: 500; }
    #foodBookingModal .form-control {
        width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 15px;
        transition: border 0.2s; box-sizing: border-box;
    }
    #foodBookingModal .form-control:focus { border-color: #667eea; outline: none; }
    #foodBookingModal textarea.form-control { min-height: 60px; resize: vertical; }
    #foodBookingModal .form-actions { display: flex; gap: 16px; justify-content: flex-end; margin-top: 10px; }
    #foodBookingModal .btn { min-width: 80px; }
    @media (max-width: 500px) {
        #foodBookingModal .modal-content { max-width: 98vw; padding: 0; }
        #foodBookingModal .modal-header, #foodBookingModal .modal-body { padding: 14px; }
    }
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(40px); }
        to { opacity: 1; transform: translateY(0); }
    }
    `;
    document.head.appendChild(style);
} 