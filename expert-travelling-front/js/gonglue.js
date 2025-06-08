// 旅游攻略页面JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    initTabNavigation();
    initSidebar();
    initBudgetCalculator();
    initTipsCards();
    initWeatherWidget();
});

// 攻略数据
const guideData = {
    planning: {
        title: '行程规划',
        content: [
            {
                title: '最佳旅游时间',
                content: '汉中四季分明，春季赏花（3-4月），夏季避暑（6-8月），秋季观叶（9-11月），冬季温泉（12-2月）。推荐春季和秋季前往，气候宜人，景色最美。',
                tips: ['春季：梨花盛开，朱鹮活跃', '夏季：森林避暑，山水清凉', '秋季：层林尽染，丰收季节', '冬季：温泉养生，古迹寻幽']
            },
            {
                title: '交通指南',
                content: '汉中交通便利，可通过飞机、高铁、汽车等多种方式到达。汉中城固机场有多条航线，西成高铁直达汉中站，市内公交和出租车网络完善。',
                tips: ['飞机：汉中城固机场，距市区20km', '高铁：汉中站，市中心直达', '汽车：多条高速公路交汇', '市内：公交便民，出租车充足']
            },
            {
                title: '住宿选择',
                content: '汉中住宿选择丰富，从经济型酒店到豪华度假村应有尽有。建议选择市中心或景区附近的酒店，交通便利，配套设施完善。',
                tips: ['市中心：购物方便，餐饮丰富', '景区附近：环境优美，体验佳', '经济型：性价比高，干净整洁', '豪华型：服务优质，设施完备']
            }
        ]
    },
    attractions: {
        title: '景点攻略',
        content: [
            {
                title: '必游景点Top5',
                content: '汉中拥有众多历史文化和自然景观，其中汉中博物馆、石门栈道、朱鹮梨园、武侯祠、黎坪森林公园被评为必游景点前五名。',
                tips: ['汉中博物馆：了解汉代历史文化', '石门栈道：体验古代工程奇迹', '朱鹮梨园：观赏珍稀鸟类', '武侯祠：感受三国文化', '黎坪森林公园：享受自然氧吧']
            },
            {
                title: '游览路线推荐',
                content: '根据不同兴趣和时间安排，推荐文化古迹线、自然风光线、综合体验线三条主要游览路线，可根据个人偏好选择。',
                tips: ['文化线：博物馆→武侯祠→张良庙', '自然线：朱鹮梨园→黎坪森林→石门栈道', '综合线：市区景点+周边自然景观', '深度游：单个景点深入体验']
            },
            {
                title: '拍照打卡地',
                content: '汉中有许多适合拍照的网红打卡地，包括古建筑群、自然风光、美食街区等，每个地点都有其独特的魅力和拍摄角度。',
                tips: ['古汉台：历史建筑背景', '梨花园：春季花海', '栈道悬崖：壮美山水', '美食街：地道小吃']
            }
        ]
    },
    food: {
        title: '美食攻略',
        content: [
            {
                title: '特色小吃必尝',
                content: '汉中面皮、菜豆腐、浆水面、粉皮子是汉中四大特色小吃，每样都有独特的制作工艺和风味特色，是来汉中必须品尝的美食。',
                tips: ['面皮：爽滑筋道，酸辣开胃', '菜豆腐：营养丰富，口感清香', '浆水面：酸汤爽口，消暑佳品', '粉皮子：劲道有嚼劲，配菜丰富']
            },
            {
                title: '推荐餐厅',
                content: '汉中有众多口碑餐厅，从街边小店到高档酒楼，各种档次和风味应有尽有。推荐老字号餐厅和当地人推荐的隐藏美食店。',
                tips: ['老城根：传统小吃聚集地', '兴汉胜境：高档餐饮', '民主街：夜市美食', '各县特色：不同地区风味']
            },
            {
                title: '用餐礼仪',
                content: '了解当地用餐习俗和礼仪，尊重当地文化，享受正宗的汉中美食体验。注意食物搭配和用餐时间安排。',
                tips: ['尊重习俗：了解当地饮食文化', '合理搭配：荤素搭配营养均衡', '适量品尝：多样少量，避免浪费', '卫生安全：选择正规餐厅']
            }
        ]
    },
    shopping: {
        title: '购物攻略',
        content: [
            {
                title: '特产推荐',
                content: '汉中特产丰富，包括汉中仙毫茶、城固蜜桔、洋县黑米、略阳乌鸡等，都是具有地方特色的优质农产品和传统工艺品。',
                tips: ['仙毫茶：汉中名茶，香气清雅', '蜜桔：甜美多汁，维C丰富', '黑米：营养价值高，药食同源', '乌鸡：滋补佳品，肉质鲜美']
            },
            {
                title: '购物场所',
                content: '汉中购物场所多样，有现代化商场、传统市场、特产店、手工艺品店等，可以根据需要选择不同的购物场所。',
                tips: ['商业中心：品牌齐全，环境舒适', '农贸市场：价格实惠，选择丰富', '特产店：正宗地道，质量保证', '手工艺店：独特工艺，收藏价值']
            },
            {
                title: '购物技巧',
                content: '掌握一些购物技巧，可以买到物美价廉的商品。注意比价、验货、保存发票等，确保购物体验愉快。',
                tips: ['货比三家：多比较价格和质量', '验货确认：检查商品完整性', '保留凭证：发票收据要保存', '理性消费：按需购买避免冲动']
            }
        ]
    },
    safety: {
        title: '安全须知',
        content: [
            {
                title: '旅游安全',
                content: '旅游安全是首要考虑因素，包括人身安全、财物安全、交通安全等多个方面。提前了解安全注意事项，做好充分准备。',
                tips: ['人身安全：遵守景区规定，注意警示标志', '财物安全：贵重物品妥善保管', '交通安全：遵守交通规则，选择正规交通工具', '通讯畅通：保持手机电量，告知行程']
            },
            {
                title: '应急联系',
                content: '记住重要的应急联系方式，包括当地旅游热线、医疗救护、公安报警等电话号码，遇到紧急情况及时求助。',
                tips: ['旅游热线：0916-12345', '医疗救护：120', '公安报警：110', '消防救援：119']
            },
            {
                title: '健康防护',
                content: '关注身体健康，做好防护措施。根据季节和活动特点，准备相应的防护用品和药品。',
                tips: ['防晒防雨：准备防晒霜、雨具', '常用药品：感冒药、止泻药等', '体质适应：根据体力安排行程', '饮食卫生：注意饮食安全']
            }
        ]
    }
};

// 初始化标签页导航
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // 初始化标签页数据
    Object.keys(guideData).forEach((key, index) => {
        if (tabButtons[index]) {
            tabButtons[index].dataset.tab = key;
            tabButtons[index].textContent = guideData[key].title;
        }
    });
    
    // 标签页点击事件
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // 更新按钮状态
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 显示对应内容
            showTabContent(tabId);
        });
    });
    
    // 默认显示第一个标签页
    if (tabButtons.length > 0) {
        tabButtons[0].classList.add('active');
        showTabContent(tabButtons[0].dataset.tab);
    }
}

// 显示标签页内容
function showTabContent(tabId) {
    const contentContainer = document.querySelector('.tab-content-area');
    if (!contentContainer) return;
    
    const data = guideData[tabId];
    if (!data) return;
    
    // 生成内容HTML
    let contentHTML = `<div class="tab-content active">`;
    
    data.content.forEach(section => {
        contentHTML += `
            <div class="guide-section">
                <h3 class="section-title">${section.title}</h3>
                <div class="section-content">
                    <p>${section.content}</p>
                    <div class="tips-list">
                        ${section.tips.map(tip => `
                            <div class="tip-item">
                                <span class="tip-icon">💡</span>
                                <span class="tip-text">${tip}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    });
    
    contentHTML += `</div>`;
    
    // 更新内容
    contentContainer.innerHTML = contentHTML;
    
    // 添加动画效果
    const sections = contentContainer.querySelectorAll('.guide-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// 初始化侧边栏
function initSidebar() {
    initQuickLinks();
    initUsefulLinks();
}

// 快速链接
function initQuickLinks() {
    const quickLinksContainer = document.querySelector('.quick-links-list');
    if (!quickLinksContainer) return;
    
    const quickLinks = [
        { icon: '🎫', text: '景点门票', href: 'jingdian.html' },
        { icon: '🗺️', text: '旅游线路', href: 'luxian.html' },
        { icon: '🍽️', text: '美食推荐', href: 'meishi.html' },
        { icon: '🏨', text: '酒店预订', href: '#', action: 'showBookingModal' },
        { icon: '🚗', text: '租车服务', href: '#', action: 'showRentalModal' },
        { icon: '📞', text: '联系客服', href: 'lianxi.html' }
    ];
    
    quickLinksContainer.innerHTML = '';
    
    quickLinks.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.className = 'quick-link-item';
        linkElement.href = link.href;
        linkElement.innerHTML = `
            <span class="link-icon">${link.icon}</span>
            <span class="link-text">${link.text}</span>
        `;
        
        if (link.action) {
            linkElement.addEventListener('click', function(e) {
                e.preventDefault();
                if (link.action === 'showBookingModal') {
                    Utils.showMessage('酒店预订功能开发中...', 'info');
                } else if (link.action === 'showRentalModal') {
                    Utils.showMessage('租车服务功能开发中...', 'info');
                }
            });
        }
        
        quickLinksContainer.appendChild(linkElement);
    });
}

// 实用链接
function initUsefulLinks() {
    const usefulLinksContainer = document.querySelector('.useful-links-list');
    if (!usefulLinksContainer) return;
    
    const usefulLinks = [
        { text: '汉中旅游局官网', href: '#' },
        { text: '汉中交通指南', href: '#' },
        { text: '汉中天气预报', href: '#' },
        { text: '紧急联系电话', href: '#' },
        { text: '医疗服务指南', href: '#' },
        { text: '投诉建议平台', href: '#' }
    ];
    
    usefulLinksContainer.innerHTML = '';
    
    usefulLinks.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.className = 'useful-link-item';
        linkElement.href = link.href;
        linkElement.textContent = link.text;
        linkElement.addEventListener('click', function(e) {
            e.preventDefault();
            Utils.showMessage('链接功能开发中...', 'info');
        });
        
        usefulLinksContainer.appendChild(linkElement);
    });
}

// 初始化预算计算器
function initBudgetCalculator() {
    const calculator = document.querySelector('.budget-calculator');
    if (!calculator) return;
    
    const inputs = {
        days: calculator.querySelector('input[name="days"]'),
        people: calculator.querySelector('input[name="people"]'),
        accommodation: calculator.querySelector('select[name="accommodation"]'),
        transportation: calculator.querySelector('select[name="transportation"]'),
        meals: calculator.querySelector('select[name="meals"]'),
        attractions: calculator.querySelector('select[name="attractions"]')
    };
    
    const resultElement = calculator.querySelector('.budget-result');
    const calculateBtn = calculator.querySelector('.calculate-btn');
    
    // 预算标准
    const budgetStandards = {
        accommodation: {
            economy: 80,
            standard: 200,
            luxury: 500
        },
        transportation: {
            public: 30,
            taxi: 100,
            private: 200
        },
        meals: {
            economy: 50,
            standard: 100,
            luxury: 200
        },
        attractions: {
            basic: 100,
            standard: 200,
            premium: 300
        }
    };
    
    // 计算预算
    function calculateBudget() {
        // 添加空值检查，防止访问null对象的属性
        const days = (inputs.days && inputs.days.value) ? parseInt(inputs.days.value) : 1;
        const people = (inputs.people && inputs.people.value) ? parseInt(inputs.people.value) : 1;
        const accommodation = (inputs.accommodation && inputs.accommodation.value) ? inputs.accommodation.value : 'standard';
        const transportation = (inputs.transportation && inputs.transportation.value) ? inputs.transportation.value : 'public';
        const meals = (inputs.meals && inputs.meals.value) ? inputs.meals.value : 'standard';
        const attractions = (inputs.attractions && inputs.attractions.value) ? inputs.attractions.value : 'standard';
        
        let totalBudget = 0;
        
        // 住宿费用
        const accommodationCost = budgetStandards.accommodation[accommodation] * (days - 1) * Math.ceil(people / 2);
        
        // 交通费用
        const transportationCost = budgetStandards.transportation[transportation] * days * people;
        
        // 餐饮费用
        const mealsCost = budgetStandards.meals[meals] * days * people;
        
        // 景点费用
        const attractionsCost = budgetStandards.attractions[attractions] * people;
        
        totalBudget = accommodationCost + transportationCost + mealsCost + attractionsCost;
        
        // 显示结果
        showBudgetResult({
            accommodation: accommodationCost,
            transportation: transportationCost,
            meals: mealsCost,
            attractions: attractionsCost,
            total: totalBudget,
            days: days,
            people: people
        });
    }
    
    // 显示预算结果
    function showBudgetResult(budget) {
        // 检查结果元素是否存在
        if (!resultElement) {
            console.warn('预算结果显示区域未找到');
            return;
        }
        
        const resultHTML = `
            <div class="budget-breakdown">
                <h4>预算明细（${budget.days}天${budget.people}人）</h4>
                <div class="budget-item">
                    <span>住宿费用</span>
                    <span>￥${budget.accommodation}</span>
                </div>
                <div class="budget-item">
                    <span>交通费用</span>
                    <span>￥${budget.transportation}</span>
                </div>
                <div class="budget-item">
                    <span>餐饮费用</span>
                    <span>￥${budget.meals}</span>
                </div>
                <div class="budget-item">
                    <span>景点费用</span>
                    <span>￥${budget.attractions}</span>
                </div>
                <div class="budget-total">
                    <span>总计</span>
                    <span>￥${budget.total}</span>
                </div>
                <div class="budget-tips">
                    <p>💡 以上预算仅供参考，实际费用可能因季节、具体选择而有所差异</p>
                    <p>💡 建议预留10-20%的额外预算应对突发情况</p>
                </div>
            </div>
        `;
        
        resultElement.innerHTML = resultHTML;
        resultElement.style.display = 'block';
        
        // 添加动画效果
        resultElement.style.opacity = '0';
        resultElement.style.transform = 'translateY(20px)';
        setTimeout(() => {
            resultElement.style.opacity = '1';
            resultElement.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // 事件监听
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateBudget);
    }
    
    // 实时计算
    Object.values(inputs).forEach(input => {
        if (input) {
            // 安全检查Utils是否存在
            if (typeof Utils !== 'undefined' && Utils.debounce) {
                input.addEventListener('change', Utils.debounce(calculateBudget, 500));
            } else {
                // 降级处理：直接添加事件监听器
                input.addEventListener('change', calculateBudget);
            }
        }
    });
    
    // 初始计算
    setTimeout(calculateBudget, 1000);
}

// 初始化贴士卡片
function initTipsCards() {
    const tipsContainer = document.querySelector('.tips-cards');
    if (!tipsContainer) return;
    
    const tips = [
        {
            icon: '📱',
            title: '手机必备',
            content: '下载汉中旅游APP，离线地图，翻译软件，天气预报等实用工具。'
        },
        {
            icon: '🎒',
            title: '行李清单',
            content: '根据季节准备衣物，舒适的鞋子，常用药品，充电宝，相机等。'
        },
        {
            icon: '💰',
            title: '支付方式',
            content: '现金+移动支付双保险，微信、支付宝在当地广泛使用。'
        },
        {
            icon: '🌡️',
            title: '气候适应',
            content: '关注天气变化，及时增减衣物，防晒防雨措施要做好。'
        }
    ];
    
    tipsContainer.innerHTML = '';
    
    tips.forEach((tip, index) => {
        const tipCard = document.createElement('div');
        tipCard.className = 'tip-card';
        tipCard.innerHTML = `
            <div class="tip-icon">${tip.icon}</div>
            <h4 class="tip-title">${tip.title}</h4>
            <p class="tip-content">${tip.content}</p>
        `;
        
        // 添加悬浮效果
        tipCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        tipCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        tipsContainer.appendChild(tipCard);
        
        // 添加滚动动画
        tipCard.style.opacity = '0';
        tipCard.style.transform = 'translateY(30px)';
        tipCard.style.transition = 'all 0.6s ease';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(tipCard);
    });
}

// 初始化天气小部件
function initWeatherWidget() {
    const weatherWidget = document.querySelector('.weather-widget');
    if (!weatherWidget) return;
    
    // 模拟天气数据
    const weatherData = {
        current: {
            temperature: 22,
            condition: '晴',
            humidity: 65,
            windSpeed: '微风'
        },
        forecast: [
            { day: '今天', temp: '22/15°C', condition: '晴' },
            { day: '明天', temp: '24/16°C', condition: '多云' },
            { day: '后天', temp: '20/12°C', condition: '小雨' }
        ]
    };
    
    const weatherHTML = `
        <div class="current-weather">
            <div class="weather-icon">☀️</div>
            <div class="weather-info">
                <div class="temperature">${weatherData.current.temperature}°C</div>
                <div class="condition">${weatherData.current.condition}</div>
            </div>
        </div>
        <div class="weather-details">
            <div class="detail-item">
                <span>湿度</span>
                <span>${weatherData.current.humidity}%</span>
            </div>
            <div class="detail-item">
                <span>风力</span>
                <span>${weatherData.current.windSpeed}</span>
            </div>
        </div>
        <div class="weather-forecast">
            ${weatherData.forecast.map(day => `
                <div class="forecast-item">
                    <div class="forecast-day">${day.day}</div>
                    <div class="forecast-temp">${day.temp}</div>
                    <div class="forecast-condition">${day.condition}</div>
                </div>
            `).join('')}
        </div>
        <div class="weather-update">
            <small>数据更新时间：${new Date().toLocaleTimeString()}</small>
        </div>
    `;
    
    weatherWidget.innerHTML = weatherHTML;
}

// 添加样式
const style = document.createElement('style');
style.textContent = `
    .guide-section {
        margin-bottom: 40px;
        padding: 25px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .section-title {
        color: #333;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #667eea;
    }
    
    .section-content p {
        color: #666;
        line-height: 1.8;
        margin-bottom: 20px;
    }
    
    .tips-list {
        display: grid;
        gap: 15px;
    }
    
    .tip-item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 10px;
        border-left: 4px solid #667eea;
    }
    
    .tip-icon {
        font-size: 18px;
        margin-top: 2px;
    }
    
    .tip-text {
        color: #555;
        line-height: 1.6;
    }
    
    .budget-breakdown {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 10px;
        margin-top: 15px;
    }
    
    .budget-item {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #e0e0e0;
    }
    
    .budget-total {
        display: flex;
        justify-content: space-between;
        padding: 15px 0;
        font-weight: bold;
        font-size: 18px;
        color: #667eea;
        border-top: 2px solid #667eea;
        margin-top: 10px;
    }
    
    .budget-tips {
        margin-top: 20px;
        padding-top: 15px;
        border-top: 1px solid #e0e0e0;
    }
    
    .budget-tips p {
        color: #666;
        font-size: 14px;
        margin: 5px 0;
    }
    
    .tip-card {
        background: white;
        padding: 25px;
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        text-align: center;
        transition: all 0.3s ease;
    }
    
    .tip-card .tip-icon {
        font-size: 2.5em;
        margin-bottom: 15px;
    }
    
    .tip-card .tip-title {
        color: #333;
        margin-bottom: 10px;
    }
    
    .tip-card .tip-content {
        color: #666;
        line-height: 1.6;
        font-size: 14px;
    }
    
    .weather-widget {
        background: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .current-weather {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;
    }
    
    .weather-icon {
        font-size: 3em;
    }
    
    .temperature {
        font-size: 2em;
        font-weight: bold;
        color: #333;
    }
    
    .condition {
        color: #666;
        font-size: 14px;
    }
    
    .weather-details {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 10px;
    }
    
    .detail-item {
        text-align: center;
    }
    
    .detail-item span:first-child {
        display: block;
        color: #666;
        font-size: 12px;
        margin-bottom: 5px;
    }
    
    .detail-item span:last-child {
        color: #333;
        font-weight: bold;
    }
    
    .forecast-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #e0e0e0;
    }
    
    .forecast-item:last-child {
        border-bottom: none;
    }
    
    .forecast-day {
        color: #666;
        font-size: 14px;
    }
    
    .forecast-temp {
        color: #333;
        font-weight: bold;
    }
    
    .forecast-condition {
        color: #666;
        font-size: 14px;
    }
    
    .weather-update {
        margin-top: 15px;
        text-align: center;
        color: #999;
    }
`;
document.head.appendChild(style); 