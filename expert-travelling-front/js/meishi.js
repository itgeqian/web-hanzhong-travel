// 美食页面JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    // initFoodCategories(); // 注释掉这个函数，保持HTML中的分类区域结构
    initFoodCards();
    initRestaurantMap();
    initFoodSearch();
    initReviewSystem();
    initCategoryTabs();
    initScrollAnimations();
    initHoverEffects();
});

// 美食数据
const foodData = [
    {
        id: 1,
        name: '汉中面皮',
        category: 'noodles',
        image: 'img/food1.jpg',
        rating: 4.9,
        price: 15,
        description: '汉中最著名的小吃，面皮爽滑筋道，配以特制辣椒油和蒜蓉，酸辣开胃，回味无穷。',
        ingredients: ['面皮', '豆芽菜', '胡萝卜丝', '黄瓜丝', '辣椒油', '蒜蓉', '醋'],
        restaurants: ['老李面皮店', '汉江面皮', '传统美食坊'],
        nutrition: { calories: 280, protein: 8, carbs: 45, fat: 6 },
        tags: ['经典', '必尝', '素食'],
        cookingTime: '现做现卖',
        origin: '汉中传统小吃，历史悠久'
    },
    {
        id: 2,
        name: '菜豆腐',
        category: 'soup',
        image: 'img/food2.jpg',
        rating: 4.7,
        price: 12,
        description: '汉中特色汤品，选用优质黄豆制作，配以时令蔬菜，营养丰富，口感清香。',
        ingredients: ['嫩豆腐', '青菜', '胡萝卜', '木耳', '香菇', '葱花'],
        restaurants: ['老味道', '汉中人家', '绿色食府'],
        nutrition: { calories: 180, protein: 12, carbs: 15, fat: 8 },
        tags: ['健康', '营养', '清淡'],
        cookingTime: '15分钟',
        origin: '汉中民间传统汤品'
    },
    {
        id: 3,
        name: '浆水面',
        category: 'noodles',
        image: 'img/food3.jpg',
        rating: 4.6,
        price: 18,
        description: '夏日消暑佳品，酸汤爽口，面条劲道，配菜丰富，是汉中人夏天的最爱。',
        ingredients: ['手工面条', '浆水', '韭菜', '胡萝卜', '土豆丝', '辣椒油'],
        restaurants: ['浆水面馆', '老字号', '汉中味道'],
        nutrition: { calories: 320, protein: 10, carbs: 55, fat: 5 },
        tags: ['消暑', '酸爽', '传统'],
        cookingTime: '10分钟',
        origin: '汉中夏季特色面食'
    },
    {
        id: 4,
        name: '粉皮子',
        category: 'cold',
        image: 'img/food4.jpg',
        rating: 4.5,
        price: 20,
        description: '劲道有嚼劲的粉皮，配以多种蔬菜丝和特制调料，口感丰富，营养均衡。',
        ingredients: ['红薯粉皮', '豆芽', '胡萝卜丝', '黄瓜丝', '香菜', '花生米'],
        restaurants: ['粉皮专家', '巷子深处', '传统小吃'],
        nutrition: { calories: 250, protein: 6, carbs: 40, fat: 8 },
        tags: ['劲道', '爽口', '配菜丰富'],
        cookingTime: '现拌现吃',
        origin: '汉中传统凉拌食品'
    },
    {
        id: 5,
        name: '略阳乌鸡汤',
        category: 'soup',
        image: 'img/food5.jpg',
        rating: 4.8,
        price: 58,
        description: '选用略阳特产乌鸡炖制，肉质鲜美，营养价值极高，是滋补养生的佳品。',
        ingredients: ['略阳乌鸡', '山药', '枸杞', '红枣', '党参', '当归'],
        restaurants: ['乌鸡王', '养生餐厅', '滋补堂'],
        nutrition: { calories: 380, protein: 35, carbs: 8, fat: 20 },
        tags: ['滋补', '营养', '特产'],
        cookingTime: '2小时慢炖',
        origin: '略阳县特色养生汤品'
    },
    {
        id: 6,
        name: '洋县黑米粥',
        category: 'dessert',
        image: 'img/food6.jpg',
        rating: 4.4,
        price: 25,
        description: '选用洋县优质黑米熬制，富含花青素和多种维生素，既美味又健康。',
        ingredients: ['洋县黑米', '红枣', '桂圆', '冰糖', '枸杞'],
        restaurants: ['养生粥铺', '健康食府', '黑米专家'],
        nutrition: { calories: 220, protein: 8, carbs: 45, fat: 2 },
        tags: ['养生', '抗氧化', '美容'],
        cookingTime: '1小时慢煮',
        origin: '洋县特产黑米制品'
    },
    {
        id: 7,
        name: '汉中热米皮',
        category: 'noodles',
        image: 'img/food7.jpg',
        rating: 4.7,
        price: 16,
        description: '热腾腾的米皮配以鲜美汤汁，温暖的口感适合寒冷季节享用。',
        ingredients: ['米皮', '豆芽', '韭菜', '肉丝', '高汤', '辣椒油'],
        restaurants: ['热米皮专家', '温暖小吃', '汉中特色'],
        nutrition: { calories: 300, protein: 12, carbs: 48, fat: 7 },
        tags: ['温热', '鲜美', '冬季首选'],
        cookingTime: '现做现吃',
        origin: '汉中冬季特色小吃'
    },
    {
        id: 8,
        name: '城固蜜桔',
        category: 'fruit',
        image: 'img/food8.jpg',
        rating: 4.6,
        price: 30,
        description: '城固特产蜜桔，甜美多汁，富含维生素C，是天然的健康水果。',
        ingredients: ['新鲜蜜桔'],
        restaurants: ['水果超市', '农家直销', '特产店'],
        nutrition: { calories: 60, protein: 1, carbs: 15, fat: 0 },
        tags: ['新鲜', '维C丰富', '特产'],
        cookingTime: '即食',
        origin: '城固县特产水果'
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
    const categoryContainer = document.querySelector('.food-categories');
    if (!categoryContainer) return;
    
    categoryContainer.innerHTML = '';
    
    categoryData.forEach(category => {
        const categoryItem = document.createElement('div');
        categoryItem.className = 'category-item';
        categoryItem.dataset.category = category.key;
        
        if (category.key === 'all') {
            categoryItem.classList.add('active');
        }
        
        categoryItem.innerHTML = `
            <span class="category-icon">${category.icon}</span>
            <span class="category-name">${category.name}</span>
            <span class="category-count">(${getCountByCategory(category.key)})</span>
        `;
        
        categoryItem.addEventListener('click', function() {
            // 更新活动状态
            document.querySelectorAll('.category-item').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
            
            // 筛选美食
            filterFoodByCategory(category.key);
        });
        
        categoryContainer.appendChild(categoryItem);
    });
}

// 获取分类数量
function getCountByCategory(category) {
    if (category === 'all') return foodData.length;
    return foodData.filter(food => food.category === category).length;
}

// 按分类筛选美食
function filterFoodByCategory(category) {
    const foodCards = document.querySelectorAll('.food-card');
    
    foodCards.forEach((card, index) => {
        const food = foodData[index];
        
        if (category === 'all' || food.category === category) {
            card.style.display = 'block';
            card.classList.remove('hidden');
            setTimeout(() => {
                card.classList.add('show');
            }, 100);
        } else {
            card.classList.remove('show');
            card.classList.add('hidden');
            setTimeout(() => {
                card.style.display = 'none';
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
                    ${food.tags.map(tag => `<span class="food-tag">${tag}</span>`).join('')}
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
                <button class="btn btn-primary" onclick="showFoodModal(${food.id})">
                    详细介绍
                </button>
                <button class="btn btn-outline" onclick="addToFavorites(${food.id})">
                    收藏
                </button>
                <button class="btn btn-outline" onclick="showRestaurants(${food.id})">
                    推荐餐厅
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
    
    let favorites = JSON.parse(localStorage.getItem('hanzhong_food_favorites') || '[]');
    
    if (favorites.includes(foodId)) {
        Utils.showMessage('已经收藏过该美食了', 'info');
        return;
    }
    
    favorites.push(foodId);
    localStorage.setItem('hanzhong_food_favorites', JSON.stringify(favorites));
    
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

// 初始化分类标签功能
function initCategoryTabs() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const foodItems = document.querySelectorAll('.food-item');
    
    if (!categoryTabs.length || !foodItems.length) {
        return;
    }
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // 更新活动标签
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选美食项目
            filterFoodItems(category, foodItems);
        });
    });
}

// 筛选美食项目
function filterFoodItems(category, foodItems) {
    foodItems.forEach(item => {
        const itemCategory = item.dataset.category;
        
        if (category === 'all' || itemCategory === category) {
            // 显示项目
            item.style.display = 'flex';
            item.style.opacity = '0';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        } else {
            // 隐藏项目
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
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

// 预约体验功能
function bookExperience(programType) {
    const programs = {
        'noodles': '热面皮制作体验',
        'dumplings': '汉中饺子体验', 
        'tofu': '菜豆腐制作体验'
    };
    
    const programName = programs[programType] || '美食制作体验';
    
    if (confirm(`确定要预约"${programName}"吗？`)) {
        alert(`预约成功！我们将在24小时内联系您确认具体时间。`);
    }
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
window.bookExperience = bookExperience;
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