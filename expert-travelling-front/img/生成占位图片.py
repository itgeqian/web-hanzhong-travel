#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
汉中旅游网站占位图片生成器
自动生成所有需要的占位图片，包含中文标题和适当的颜色
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder_image(width, height, text, filename, bg_color=(70, 130, 180), text_color=(255, 255, 255)):
    """创建占位图片"""
    # 创建图片
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    
    # 尝试使用中文字体，如果没有则使用默认字体
    try:
        # Windows系统中文字体
        font_size = min(width, height) // 10
        font = ImageFont.truetype("simhei.ttf", font_size)
    except:
        try:
            # 尝试其他中文字体
            font_size = min(width, height) // 10
            font = ImageFont.truetype("msyh.ttf", font_size)
        except:
            # 使用默认字体
            font_size = min(width, height) // 15
            font = ImageFont.load_default()
    
    # 计算文字位置（居中）
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (width - text_width) // 2
    y = (height - text_height) // 2
    
    # 绘制文字
    draw.text((x, y), text, fill=text_color, font=font)
    
    # 添加尺寸信息
    size_text = f"{width}x{height}"
    try:
        size_font = ImageFont.truetype("simhei.ttf", 20)
    except:
        size_font = ImageFont.load_default()
    
    size_bbox = draw.textbbox((0, 0), size_text, font=size_font)
    size_width = size_bbox[2] - size_bbox[0]
    draw.text((width - size_width - 10, height - 30), size_text, fill=text_color, font=size_font)
    
    # 保存图片
    img.save(filename, 'JPEG', quality=85)
    print(f"已生成: {filename}")

def main():
    """主函数 - 生成所有占位图片"""
    
    # 确保img目录存在
    if not os.path.exists('img'):
        os.makedirs('img')
    
    print("开始生成汉中旅游网站占位图片...")
    
    # 通用资源
    create_placeholder_image(200, 60, "汉中旅游网", "logo.png", (255, 106, 53))
    
    # 轮播图片
    colors = [(70, 130, 180), (60, 120, 170), (50, 110, 160)]
    slides = ["汉中油菜花海", "汉中自然风光", "汉中历史文化"]
    for i, (color, title) in enumerate(zip(colors, slides), 1):
        create_placeholder_image(1920, 600, title, f"slide{i}.jpg", color)
    
    # 主要景点
    attractions = [
        ("朱鹮梨园", (34, 139, 34)),
        ("汉中石门栈道", (139, 69, 19)),
        ("勉县武侯祠", (178, 34, 34))
    ]
    for i, (name, color) in enumerate(attractions, 1):
        create_placeholder_image(400, 300, name, f"attraction{i}.jpg", color)
    
    # 景点详细页图片
    detailed_attractions = {
        "zhuyu-liyuan.jpg": "朱鹮梨园",
        "shimen-zhandao.jpg": "石门栈道", 
        "wuhou-ci.jpg": "勉县武侯祠",
        "hanshui-yuan.jpg": "汉水源头",
        "baohe-zhandao.jpg": "褒河栈道",
        "zhangliang-miao.jpg": "张良庙"
    }
    colors_detail = [(34, 139, 34), (139, 69, 19), (178, 34, 34), (70, 130, 180), (107, 142, 35), (160, 82, 45)]
    for (filename, name), color in zip(detailed_attractions.items(), colors_detail):
        create_placeholder_image(800, 500, name, filename, color)
    
    # 旅游线路图片
    routes = {
        "route-classic.jpg": "经典汉中3日游",
        "route-nature.jpg": "自然风光5日游",
        "route-culture.jpg": "汉文化体验2日游",
        "route-family.jpg": "亲子欢乐游3日",
        "route-photo.jpg": "摄影采风4日游",
        "route-food.jpg": "美食探索2日游"
    }
    route_colors = [(255, 140, 0), (46, 139, 87), (220, 20, 60), (255, 20, 147), (138, 43, 226), (255, 69, 0)]
    for (filename, name), color in zip(routes.items(), route_colors):
        create_placeholder_image(600, 400, name, filename, color)
    
    # 美食图片
    foods = {
        "remianpi.jpg": "汉中热面皮",
        "caidoufu.jpg": "汉中菜豆腐", 
        "jiangshuimian.jpg": "浆水面",
        "larou.jpg": "汉中腊肉",
        "huangjiu.jpg": "汉中黄酒",
        "hetaomo.jpg": "核桃馍"
    }
    food_colors = [(255, 165, 0), (154, 205, 50), (244, 164, 96), (210, 180, 140), (255, 215, 0), (222, 184, 135)]
    for (filename, name), color in zip(foods.items(), food_colors):
        create_placeholder_image(500, 400, name, filename, color)
    
    # 美食图标
    food_names = ["热面皮", "浆水面", "菜豆腐", "腊肉", "黄酒", "核桃馍"]
    for i, name in enumerate(food_names, 1):
        color = food_colors[i-1] if i-1 < len(food_colors) else (255, 165, 0)
        create_placeholder_image(100, 100, name, f"food-icon{i}.jpg", color)
    
    # 餐厅图片
    restaurants = {
        "restaurant1.jpg": "汉中老家餐厅",
        "restaurant2.jpg": "天汉楼",
        "restaurant3.jpg": "小吃一条街"
    }
    restaurant_colors = [(139, 69, 19), (160, 82, 45), (205, 133, 63)]
    for (filename, name), color in zip(restaurants.items(), restaurant_colors):
        create_placeholder_image(600, 400, name, filename, color)
    
    # 美食体验图片
    experiences = {
        "experience1.jpg": "制作热面皮",
        "experience2.jpg": "学习包饺子", 
        "experience3.jpg": "菜豆腐制作"
    }
    exp_colors = [(255, 140, 0), (220, 20, 60), (154, 205, 50)]
    for (filename, name), color in zip(experiences.items(), exp_colors):
        create_placeholder_image(400, 300, name, filename, color)
    
    # 文化活动图片
    cultures = {
        "hanfu-show.jpg": "汉服文化体验",
        "calligraphy.jpg": "汉代书法体验",
        "han-music.jpg": "汉代音乐演出",
        "han-dance.jpg": "汉舞教学", 
        "han-craft.jpg": "汉代手工艺",
        "han-poetry.jpg": "诗词吟诵"
    }
    culture_colors = [(138, 43, 226), (72, 61, 139), (123, 104, 238), (147, 112, 219), (186, 85, 211), (221, 160, 221)]
    for (filename, name), color in zip(cultures.items(), culture_colors):
        create_placeholder_image(400, 300, name, filename, color)
    
    # 页面背景图片
    backgrounds = {
        "hanzhong-faq.jpg": "常见问题",
        "hanzhong-culture.jpg": "汉文化活动",
        "hanzhong-contact.jpg": "联系我们"
    }
    bg_colors = [(70, 130, 180), (138, 43, 226), (34, 139, 34)]
    for (filename, name), color in zip(backgrounds.items(), bg_colors):
        create_placeholder_image(1920, 400, name, filename, color)
    
    # 生成小的背景图案
    img = Image.new('RGB', (20, 20), (245, 245, 245))
    draw = ImageDraw.Draw(img)
    draw.rectangle([8, 8, 12, 12], fill=(230, 230, 230))
    img.save("bg-pattern.png", 'PNG')
    print("已生成: bg-pattern.png")
    
    print(f"\n✅ 所有占位图片生成完成！")
    print(f"总共生成了 {len(os.listdir('.'))} 个图片文件")
    print("\n📝 使用说明：")
    print("1. 这些是临时占位图片，用于网站开发和测试")
    print("2. 正式上线前需要替换为真实的汉中旅游图片")
    print("3. 所有图片都包含了中文标题，便于识别用途")
    print("4. 如需修改图片内容或尺寸，可编辑此脚本重新生成")

if __name__ == "__main__":
    main() 