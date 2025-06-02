// 常见问题页面的内联JavaScript提取

// FAQ功能
document.addEventListener('DOMContentLoaded', function() {
    // FAQ展开/收起功能
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // 关闭所有其他FAQ
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            // 切换当前FAQ
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('active');
            }
        });
    });

    // 分类筛选功能
    const categoryBtns = document.querySelectorAll('.category-btn');
    const faqSections = document.querySelectorAll('.faq-section');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // 更新按钮状态
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 显示/隐藏对应分类
            faqSections.forEach(section => {
                if (category === 'all' || section.dataset.category === category) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });

    // 搜索功能
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // 显示所有问题
            faqSections.forEach(section => {
                section.style.display = 'block';
                const items = section.querySelectorAll('.faq-item');
                items.forEach(item => item.style.display = 'block');
            });
            return;
        }
        
        // 搜索匹配的问题
        faqSections.forEach(section => {
            let hasVisibleItems = false;
            const items = section.querySelectorAll('.faq-item');
            
            items.forEach(item => {
                const question = item.querySelector('.faq-question span').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer-content').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    hasVisibleItems = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            section.style.display = hasVisibleItems ? 'block' : 'none';
        });
    });
}); 