// 常见问题页面JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    initFAQCategories();
    initFAQList();
    initFAQSearch();
    initQuestionFeedback();
    initHelpfulRating();
    initQuestionSubmission();
});

// FAQ数据
const faqData = [
    {
        id: 1,
        category: 'travel',
        question: '汉中最佳旅游季节是什么时候？',
        answer: '汉中四季分明，各有特色。春季（3-5月）是赏花的最佳时节，可以观赏油菜花、梨花等；夏季（6-8月）气候凉爽，适合避暑；秋季（9-11月）层林尽染，景色优美；冬季（12-2月）可以体验温泉养生。总体来说，春季和秋季是最佳旅游时间。',
        tags: ['季节', '时间', '推荐'],
        helpful: 156,
        views: 2890
    },
    {
        id: 2,
        category: 'travel',
        question: '从西安到汉中有哪些交通方式？',
        answer: '从西安到汉中主要有以下几种交通方式：1. 高铁：西安北站乘坐西成高铁到汉中站，约1小时；2. 飞机：西安咸阳机场飞汉中城固机场，约45分钟；3. 汽车：走西汉高速，约3小时车程；4. 火车：普通列车约4-5小时。推荐选择高铁，快捷舒适。',
        tags: ['交通', '西安', '高铁'],
        helpful: 234,
        views: 4560
    },
    {
        id: 3,
        category: 'attraction',
        question: '汉中有哪些必游景点？',
        answer: '汉中必游景点包括：1. 汉中博物馆 - 了解汉文化历史；2. 石门栈道 - 古代工程奇迹；3. 朱鹮梨园 - 观赏国宝朱鹮；4. 武侯祠 - 三国文化圣地；5. 黎坪森林公园 - 自然生态美景；6. 张良庙 - 历史古迹。建议安排2-3天时间游览。',
        tags: ['景点', '推荐', '必游'],
        helpful: 189,
        views: 3456
    },
    {
        id: 4,
        category: 'food',
        question: '汉中有什么特色美食？',
        answer: '汉中特色美食丰富：1. 汉中面皮 - 最具代表性的小吃；2. 菜豆腐 - 营养健康的汤品；3. 浆水面 - 夏季消暑佳品；4. 粉皮子 - 劲道爽口；5. 略阳乌鸡汤 - 滋补养生；6. 洋县黑米粥 - 抗氧化美容。建议去老城根美食街品尝。',
        tags: ['美食', '小吃', '特色'],
        helpful: 298,
        views: 5670
    },
    {
        id: 5,
        category: 'accommodation',
        question: '汉中住宿推荐，住哪里比较好？',
        answer: '汉中住宿推荐区域：1. 市中心区域 - 交通便利，购物方便；2. 兴汉胜境附近 - 环境优美，设施完善；3. 景区附近 - 方便游览，体验更佳。住宿类型从经济型酒店到五星级酒店都有，建议根据预算和行程安排选择。预订时可关注特价活动。',
        tags: ['住宿', '酒店', '推荐'],
        helpful: 127,
        views: 2340
    },
    {
        id: 6,
        category: 'food',
        question: '汉中面皮哪里最正宗？',
        answer: '推荐几家正宗的汉中面皮店：1. 老李面皮店（民主街）- 老字号，口味地道；2. 汉江面皮（汉台区）- 本地人推荐；3. 传统美食坊（中心广场）- 环境好，味道佳。选择面皮时注意观察面皮的透明度和韧性，配菜要新鲜，调料要正宗。',
        tags: ['面皮', '推荐', '正宗'],
        helpful: 167,
        views: 2890
    },
    {
        id: 7,
        category: 'transportation',
        question: '汉中市内交通如何解决？',
        answer: '汉中市内交通很便利：1. 公交车 - 线路覆盖全面，价格便宜；2. 出租车 - 24小时服务，起步价6元；3. 网约车 - 滴滴、神州等平台都有；4. 共享单车 - 短距离出行首选；5. 租车 - 适合自驾游。推荐下载"汉中出行"APP查询实时公交信息。',
        tags: ['交通', '市内', '公交'],
        helpful: 98,
        views: 1890
    },
    {
        id: 8,
        category: 'ticket',
        question: '汉中景点门票如何购买？有优惠吗？',
        answer: '景点门票购买方式：1. 现场购买 - 景区售票处；2. 在线预订 - 官方网站、携程、美团等；3. 团购优惠 - 旅行社或团体票。优惠政策：学生证半价，60岁以上老人免费，军人证免费，残疾证免费。建议提前在线预订，享受优惠价格并避免排队。',
        tags: ['门票', '优惠', '购买'],
        helpful: 145,
        views: 2670
    },
    {
        id: 9,
        category: 'weather',
        question: '去汉中旅游需要准备什么衣物？',
        answer: '根据季节准备衣物：春季（3-5月）：薄外套、长袖、防风衣；夏季（6-8月）：短袖、薄长裤、防晒衣；秋季（9-11月）：毛衣、外套、长裤；冬季（12-2月）：羽绒服、毛衣、厚裤子。无论什么季节都要准备舒适的徒步鞋、雨具、太阳镜和防晒霜。',
        tags: ['衣物', '准备', '天气'],
        helpful: 76,
        views: 1450
    },
    {
        id: 10,
        category: 'safety',
        question: '汉中旅游安全注意事项有哪些？',
        answer: '汉中旅游安全注意事项：1. 景区安全 - 遵守景区规定，不要攀爬危险区域；2. 交通安全 - 遵守交通规则，注意行车安全；3. 财物安全 - 贵重物品妥善保管；4. 饮食安全 - 选择正规餐厅，注意食品卫生；5. 天气安全 - 关注天气预报，做好防护。紧急情况拨打110、120、119。',
        tags: ['安全', '注意事项', '紧急'],
        helpful: 201,
        views: 3210
    }
];

// 分类数据
const categoryData = [
    { key: 'all', name: '全部问题', icon: '❓', count: faqData.length },
    { key: 'travel', name: '旅游规划', icon: '🗺️', count: faqData.filter(f => f.category === 'travel').length },
    { key: 'attraction', name: '景点相关', icon: '🏛️', count: faqData.filter(f => f.category === 'attraction').length },
    { key: 'food', name: '美食餐饮', icon: '🍽️', count: faqData.filter(f => f.category === 'food').length },
    { key: 'accommodation', name: '住宿推荐', icon: '🏨', count: faqData.filter(f => f.category === 'accommodation').length },
    { key: 'transportation', name: '交通出行', icon: '🚗', count: faqData.filter(f => f.category === 'transportation').length },
    { key: 'ticket', name: '门票预订', icon: '🎫', count: faqData.filter(f => f.category === 'ticket').length },
    { key: 'weather', name: '天气服装', icon: '🌤️', count: faqData.filter(f => f.category === 'weather').length },
    { key: 'safety', name: '安全须知', icon: '🛡️', count: faqData.filter(f => f.category === 'safety').length }
];

// 初始化FAQ分类
function initFAQCategories() {
    const categoryContainer = document.querySelector('.faq-categories');
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
            <div class="category-icon">${category.icon}</div>
            <div class="category-info">
                <h4>${category.name}</h4>
                <span class="category-count">${category.count}个问题</span>
            </div>
        `;
        
        categoryItem.addEventListener('click', function() {
            // 更新活动状态
            document.querySelectorAll('.category-item').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
            
            // 筛选FAQ
            filterFAQByCategory(category.key);
        });
        
        categoryContainer.appendChild(categoryItem);
    });
}

// 按分类筛选FAQ
function filterFAQByCategory(category) {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        const faq = faqData[index];
        
        if (category === 'all' || faq.category === category) {
            item.style.display = 'block';
            item.classList.remove('hidden');
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// 初始化FAQ列表
function initFAQList() {
    const faqContainer = document.querySelector('.faq-list');
    if (!faqContainer) return;
    
    faqContainer.innerHTML = '';
    
    faqData.forEach((faq, index) => {
        const faqItem = createFAQItem(faq, index);
        faqContainer.appendChild(faqItem);
    });
}

// 创建FAQ项目
function createFAQItem(faq, index) {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.dataset.id = faq.id;
    item.dataset.category = faq.category;
    
    item.innerHTML = `
        <div class="faq-header" onclick="toggleFAQ(${index})">
            <div class="question-content">
                <h4 class="faq-question">${faq.question}</h4>
                <div class="faq-meta">
                    <span class="faq-tags">
                        ${faq.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </span>
                    <span class="faq-stats">
                        <span class="views">👁️ ${faq.views}</span>
                        <span class="helpful">👍 ${faq.helpful}</span>
                    </span>
                </div>
            </div>
            <div class="faq-toggle">
                <span class="toggle-icon">+</span>
            </div>
        </div>
        <div class="faq-answer" style="display: none;">
            <div class="answer-content">
                <p>${faq.answer}</p>
                <div class="answer-actions">
                    <div class="helpful-section">
                        <span>这个回答对您有帮助吗？</span>
                        <button class="helpful-btn" onclick="markHelpful(${faq.id}, true)">
                            👍 有帮助 (${faq.helpful})
                        </button>
                        <button class="unhelpful-btn" onclick="markHelpful(${faq.id}, false)">
                            👎 没帮助
                        </button>
                    </div>
                    <button class="feedback-btn" onclick="showFeedbackModal(${faq.id})">
                        💬 补充反馈
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // 添加展开动画
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, index * 100);
    
    return item;
}

// 切换FAQ展开/收起
function toggleFAQ(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    const currentItem = faqItems[index];
    const answer = currentItem.querySelector('.faq-answer');
    const toggleIcon = currentItem.querySelector('.toggle-icon');
    const isOpen = answer.style.display === 'block';
    
    if (isOpen) {
        // 收起
        answer.style.display = 'none';
        toggleIcon.textContent = '+';
        currentItem.classList.remove('active');
    } else {
        // 展开前先收起其他项
        faqItems.forEach((item, i) => {
            if (i !== index) {
                const otherAnswer = item.querySelector('.faq-answer');
                const otherIcon = item.querySelector('.toggle-icon');
                otherAnswer.style.display = 'none';
                otherIcon.textContent = '+';
                item.classList.remove('active');
            }
        });
        
        // 展开当前项
        answer.style.display = 'block';
        toggleIcon.textContent = '-';
        currentItem.classList.add('active');
        
        // 更新浏览次数
        updateFAQViews(faqData[index].id);
    }
}

// 更新FAQ浏览次数
function updateFAQViews(faqId) {
    const faq = faqData.find(item => item.id === faqId);
    if (faq) {
        faq.views++;
        
        // 更新显示
        const faqItem = document.querySelector(`[data-id="${faqId}"]`);
        const viewsElement = faqItem.querySelector('.views');
        if (viewsElement) {
            viewsElement.textContent = `👁️ ${faq.views}`;
        }
    }
}

// 初始化FAQ搜索
function initFAQSearch() {
    const searchInput = document.querySelector('.faq-search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', Utils.debounce(function() {
        const keyword = this.value.trim().toLowerCase();
        searchFAQ(keyword);
    }, 300));
    
    // 搜索建议
    const searchSuggestions = document.createElement('div');
    searchSuggestions.className = 'search-suggestions';
    searchInput.parentNode.appendChild(searchSuggestions);
    
    searchInput.addEventListener('focus', function() {
        showSearchSuggestions();
    });
    
    searchInput.addEventListener('blur', function() {
        setTimeout(() => {
            hideSearchSuggestions();
        }, 200);
    });
    
    function showSearchSuggestions() {
        const hotKeywords = ['汉中面皮', '交通', '景点推荐', '住宿', '门票', '美食'];
        searchSuggestions.innerHTML = `
            <div class="suggestions-header">热门搜索</div>
            <div class="suggestions-list">
                ${hotKeywords.map(keyword => `
                    <span class="suggestion-item" onclick="searchWithKeyword('${keyword}')">${keyword}</span>
                `).join('')}
            </div>
        `;
        searchSuggestions.style.display = 'block';
    }
    
    function hideSearchSuggestions() {
        searchSuggestions.style.display = 'none';
    }
    
    window.searchWithKeyword = function(keyword) {
        searchInput.value = keyword;
        searchFAQ(keyword.toLowerCase());
        hideSearchSuggestions();
    };
}

// 搜索FAQ
function searchFAQ(keyword) {
    const faqItems = document.querySelectorAll('.faq-item');
    let hasResults = false;
    
    if (!keyword) {
        faqItems.forEach(item => {
            item.style.display = 'block';
        });
        hideNoResults();
        return;
    }
    
    faqItems.forEach((item, index) => {
        const faq = faqData[index];
        if (!faq) return;
        
        const isMatch = faq.question.toLowerCase().includes(keyword) ||
                       faq.answer.toLowerCase().includes(keyword) ||
                       faq.tags.some(tag => tag.toLowerCase().includes(keyword));
        
        if (isMatch) {
            item.style.display = 'block';
            highlightSearchTerm(item, keyword);
            hasResults = true;
        } else {
            item.style.display = 'none';
        }
    });
    
    if (!hasResults) {
        showNoResults(keyword);
    } else {
        hideNoResults();
    }
}

// 高亮搜索关键词
function highlightSearchTerm(item, keyword) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.answer-content p');
    
    if (question) {
        const questionText = question.textContent;
        const highlightedQuestion = questionText.replace(
            new RegExp(`(${keyword})`, 'gi'),
            '<mark>$1</mark>'
        );
        question.innerHTML = highlightedQuestion;
    }
    
    if (answer) {
        const answerText = answer.textContent;
        const highlightedAnswer = answerText.replace(
            new RegExp(`(${keyword})`, 'gi'),
            '<mark>$1</mark>'
        );
        answer.innerHTML = highlightedAnswer;
    }
}

// 显示无搜索结果
function showNoResults(keyword) {
    let noResultsDiv = document.querySelector('.no-results');
    if (!noResultsDiv) {
        noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results';
        document.querySelector('.faq-list').appendChild(noResultsDiv);
    }
    
    noResultsDiv.innerHTML = `
        <div class="no-results-content">
            <div class="no-results-icon">🔍</div>
            <h3>未找到相关问题</h3>
            <p>没有找到包含"${keyword}"的问题，您可以：</p>
            <div class="no-results-actions">
                <button class="btn btn-primary" onclick="clearSearch()">清除搜索</button>
                <button class="btn btn-outline" onclick="showQuestionForm()">提交问题</button>
            </div>
        </div>
    `;
    noResultsDiv.style.display = 'block';
}

// 隐藏无搜索结果
function hideNoResults() {
    const noResultsDiv = document.querySelector('.no-results');
    if (noResultsDiv) {
        noResultsDiv.style.display = 'none';
    }
}

// 清除搜索
function clearSearch() {
    const searchInput = document.querySelector('.faq-search-input');
    if (searchInput) {
        searchInput.value = '';
        searchFAQ('');
    }
}

// 标记有帮助
function markHelpful(faqId, isHelpful) {
    const faq = faqData.find(item => item.id === faqId);
    if (!faq) return;
    
    if (isHelpful) {
        faq.helpful++;
        
        // 更新显示
        const faqItem = document.querySelector(`[data-id="${faqId}"]`);
        const helpfulBtn = faqItem.querySelector('.helpful-btn');
        const helpfulStat = faqItem.querySelector('.helpful');
        
        if (helpfulBtn) {
            helpfulBtn.textContent = `👍 有帮助 (${faq.helpful})`;
            helpfulBtn.disabled = true;
            helpfulBtn.style.opacity = '0.6';
        }
        
        if (helpfulStat) {
            helpfulStat.textContent = `👍 ${faq.helpful}`;
        }
        
        Utils.showMessage('感谢您的反馈！', 'success');
    } else {
        Utils.showMessage('我们会改进这个回答', 'info');
    }
    
    // 保存到本地存储
    const ratedFAQs = JSON.parse(localStorage.getItem('hanzhong_rated_faqs') || '[]');
    if (!ratedFAQs.includes(faqId)) {
        ratedFAQs.push(faqId);
        localStorage.setItem('hanzhong_rated_faqs', JSON.stringify(ratedFAQs));
    }
}

// 初始化问题反馈
function initQuestionFeedback() {
    // 反馈功能已在markHelpful中实现
}

// 显示反馈弹窗
function showFeedbackModal(faqId) {
    const faq = faqData.find(item => item.id === faqId);
    if (!faq) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>问题反馈</h3>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="feedback-question">
                    <h4>您对以下问题的反馈：</h4>
                    <p class="question-text">${faq.question}</p>
                </div>
                <div class="feedback-form">
                    <div class="feedback-type">
                        <h5>问题类型：</h5>
                        <label><input type="radio" name="feedbackType" value="incomplete"> 回答不完整</label>
                        <label><input type="radio" name="feedbackType" value="outdated"> 信息过时</label>
                        <label><input type="radio" name="feedbackType" value="incorrect"> 信息错误</label>
                        <label><input type="radio" name="feedbackType" value="other"> 其他问题</label>
                    </div>
                    <div class="feedback-content">
                        <h5>详细说明：</h5>
                        <textarea id="feedbackDetail" placeholder="请详细说明您遇到的问题..." maxlength="300"></textarea>
                        <div class="char-count">0/300</div>
                    </div>
                    <div class="feedback-actions">
                        <button class="btn btn-primary" onclick="submitQuestionFeedback(${faqId})">提交反馈</button>
                        <button class="btn btn-outline" onclick="closeFeedbackModal()">取消</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // 字符计数
    const textarea = modal.querySelector('#feedbackDetail');
    const charCount = modal.querySelector('.char-count');
    
    textarea.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = `${count}/300`;
        
        if (count > 270) {
            charCount.style.color = '#e74c3c';
        } else {
            charCount.style.color = '#666';
        }
    });
    
    // 关闭按钮
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeFeedbackModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeFeedbackModal();
        }
    });
    
    window.closeFeedbackModal = function() {
        modal.remove();
        document.body.style.overflow = 'auto';
    };
}

// 提交问题反馈
function submitQuestionFeedback(faqId) {
    const modal = document.querySelector('.modal');
    const feedbackType = modal.querySelector('input[name="feedbackType"]:checked');
    const feedbackDetail = modal.querySelector('#feedbackDetail').value.trim();
    
    if (!feedbackType) {
        Utils.showMessage('请选择问题类型', 'warning');
        return;
    }
    
    if (!feedbackDetail) {
        Utils.showMessage('请填写详细说明', 'warning');
        return;
    }
    
    // 保存反馈
    const feedback = {
        faqId: faqId,
        type: feedbackType.value,
        detail: feedbackDetail,
        submitTime: new Date().toISOString()
    };
    
    let feedbacks = JSON.parse(localStorage.getItem('hanzhong_faq_feedbacks') || '[]');
    feedbacks.push(feedback);
    localStorage.setItem('hanzhong_faq_feedbacks', JSON.stringify(feedbacks));
    
    Utils.showMessage('感谢您的反馈！我们会尽快处理。', 'success');
    closeFeedbackModal();
}

// 初始化有帮助评分
function initHelpfulRating() {
    // 恢复已评分状态
    const ratedFAQs = JSON.parse(localStorage.getItem('hanzhong_rated_faqs') || '[]');
    
    ratedFAQs.forEach(faqId => {
        const faqItem = document.querySelector(`[data-id="${faqId}"]`);
        if (faqItem) {
            const helpfulBtn = faqItem.querySelector('.helpful-btn');
            if (helpfulBtn) {
                helpfulBtn.disabled = true;
                helpfulBtn.style.opacity = '0.6';
            }
        }
    });
}

// 初始化问题提交
function initQuestionSubmission() {
    const submitSection = document.querySelector('.question-submit');
    if (!submitSection) return;
    
    submitSection.innerHTML = `
        <div class="submit-header">
            <h3>没有找到答案？</h3>
            <p>向我们提交您的问题，我们会尽快为您解答</p>
        </div>
        <div class="submit-form">
            <div class="form-row">
                <div class="form-group">
                    <label>问题分类</label>
                    <select id="questionCategory">
                        <option value="">请选择分类</option>
                        ${categoryData.slice(1).map(cat => `<option value="${cat.key}">${cat.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>问题标题</label>
                    <input type="text" id="questionTitle" placeholder="请简要描述您的问题" maxlength="100">
                </div>
            </div>
            <div class="form-group">
                <label>问题详情</label>
                <textarea id="questionDetail" placeholder="请详细描述您的问题，以便我们提供更准确的答案..." maxlength="500"></textarea>
                <div class="char-count">0/500</div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>联系邮箱（可选）</label>
                    <input type="email" id="questionEmail" placeholder="如需回复请填写邮箱">
                </div>
                <div class="form-group">
                    <label>紧急程度</label>
                    <select id="questionUrgency">
                        <option value="low">一般</option>
                        <option value="medium">较急</option>
                        <option value="high">紧急</option>
                    </select>
                </div>
            </div>
            <div class="submit-actions">
                <button class="btn btn-primary" onclick="submitNewQuestion()">提交问题</button>
                <button class="btn btn-outline" onclick="resetQuestionForm()">重置表单</button>
            </div>
        </div>
    `;
    
    // 字符计数
    const textarea = submitSection.querySelector('#questionDetail');
    const charCount = submitSection.querySelector('.char-count');
    
    textarea.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = `${count}/500`;
        
        if (count > 450) {
            charCount.style.color = '#e74c3c';
        } else {
            charCount.style.color = '#666';
        }
    });
}

// 显示问题表单
function showQuestionForm() {
    const submitSection = document.querySelector('.question-submit');
    if (submitSection) {
        submitSection.scrollIntoView({ behavior: 'smooth' });
        const titleInput = submitSection.querySelector('#questionTitle');
        if (titleInput) {
            titleInput.focus();
        }
    }
}

// 提交新问题
function submitNewQuestion() {
    const category = document.getElementById('questionCategory').value;
    const title = document.getElementById('questionTitle').value.trim();
    const detail = document.getElementById('questionDetail').value.trim();
    const email = document.getElementById('questionEmail').value.trim();
    const urgency = document.getElementById('questionUrgency').value;
    
    // 验证
    if (!category) {
        Utils.showMessage('请选择问题分类', 'warning');
        return;
    }
    
    if (!title) {
        Utils.showMessage('请填写问题标题', 'warning');
        return;
    }
    
    if (!detail) {
        Utils.showMessage('请填写问题详情', 'warning');
        return;
    }
    
    if (email && !Utils.validateEmail(email)) {
        Utils.showMessage('邮箱格式不正确', 'warning');
        return;
    }
    
    // 保存问题
    const question = {
        category: category,
        title: title,
        detail: detail,
        email: email,
        urgency: urgency,
        submitTime: new Date().toISOString(),
        status: 'pending'
    };
    
    let questions = JSON.parse(localStorage.getItem('hanzhong_submitted_questions') || '[]');
    questions.push(question);
    localStorage.setItem('hanzhong_submitted_questions', JSON.stringify(questions));
    
    Utils.showMessage('问题提交成功！我们会在24小时内为您解答。', 'success');
    resetQuestionForm();
}

// 重置问题表单
function resetQuestionForm() {
    document.getElementById('questionCategory').value = '';
    document.getElementById('questionTitle').value = '';
    document.getElementById('questionDetail').value = '';
    document.getElementById('questionEmail').value = '';
    document.getElementById('questionUrgency').value = 'low';
    
    const charCount = document.querySelector('.char-count');
    if (charCount) {
        charCount.textContent = '0/500';
        charCount.style.color = '#666';
    }
}

// 全局函数
window.toggleFAQ = toggleFAQ;
window.searchWithKeyword = searchWithKeyword;
window.markHelpful = markHelpful;
window.showFeedbackModal = showFeedbackModal;
window.closeFeedbackModal = closeFeedbackModal;
window.submitQuestionFeedback = submitQuestionFeedback;
window.showQuestionForm = showQuestionForm;
window.submitNewQuestion = submitNewQuestion;
window.resetQuestionForm = resetQuestionForm;
window.clearSearch = clearSearch; 