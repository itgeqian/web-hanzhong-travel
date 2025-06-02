// 联系我们页面的内联JavaScript提取

// 表单提交处理
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // 验证必填字段
            if (!data.name || !data.phone || !data.message) {
                alert('请填写所有必填字段');
                return;
            }
            
            // 验证电话号码格式
            const phoneRegex = /^1[3-9]\d{9}$/;
            if (!phoneRegex.test(data.phone)) {
                alert('请输入正确的手机号码');
                return;
            }
            
            // 模拟提交
            alert('咨询信息已提交成功！我们会在24小时内与您联系。');
            this.reset();
        });
    }
}); 