#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
补充缺失的图片
"""

from PIL import Image, ImageDraw, ImageFont

def create_placeholder_image(width, height, text, filename, bg_color=(70, 130, 180)):
    """创建占位图片"""
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    
    # 尝试使用中文字体，如果没有则使用默认字体
    try:
        font_size = min(width, height) // 10
        font = ImageFont.truetype("simhei.ttf", font_size)
    except:
        try:
            font_size = min(width, height) // 10
            font = ImageFont.truetype("msyh.ttf", font_size)
        except:
            font_size = min(width, height) // 15
            font = ImageFont.load_default()
    
    # 计算文字位置（居中）
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (width - text_width) // 2
    y = (height - text_height) // 2
    
    # 绘制文字
    draw.text((x, y), text, fill=(255, 255, 255), font=font)
    
    # 添加尺寸信息
    size_text = f"{width}x{height}"
    try:
        size_font = ImageFont.truetype("simhei.ttf", 20)
    except:
        size_font = ImageFont.load_default()
    
    size_bbox = draw.textbbox((0, 0), size_text, font=size_font)
    size_width = size_bbox[2] - size_bbox[0]
    draw.text((width - size_width - 10, height - 30), size_text, fill=(255, 255, 255), font=size_font)
    
    # 保存图片
    img.save(filename, 'JPEG', quality=85)
    print(f"已生成: {filename}")

# 检查并补充缺失的图片
import os

missing_images = []

# 检查关键图片是否存在
required_images = [
    ("logo.png", 200, 60, "汉中旅游网", (255, 106, 53)),
    ("slide1.jpg", 1920, 600, "汉中油菜花海", (70, 130, 180)),
    ("slide2.jpg", 1920, 600, "汉中自然风光", (60, 120, 170)),
    ("slide3.jpg", 1920, 600, "汉中历史文化", (50, 110, 160)),
    ("attraction1.jpg", 400, 300, "朱鹮梨园", (34, 139, 34)),
    ("attraction2.jpg", 400, 300, "汉中石门栈道", (139, 69, 19)),
    ("attraction3.jpg", 400, 300, "勉县武侯祠", (178, 34, 34))
]

for filename, width, height, text, color in required_images:
    if not os.path.exists(filename):
        missing_images.append((filename, width, height, text, color))

if missing_images:
    print("发现缺失的图片，正在补充...")
    for filename, width, height, text, color in missing_images:
        create_placeholder_image(width, height, text, filename, color)
    print("补充完成!")
else:
    print("所有关键图片都已存在!")

# 输出统计信息
total_files = len([f for f in os.listdir('.') if f.endswith(('.jpg', '.png'))])
print(f"当前图片文件总数: {total_files}") 