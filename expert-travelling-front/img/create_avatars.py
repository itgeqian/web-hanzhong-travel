#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
生成用户头像图片
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import os
    print("PIL imported successfully")
except ImportError as e:
    print(f"Import error: {e}")
    exit(1)

def create_avatar(name, color, filename, size=200):
    """
    创建圆形头像
    :param name: 用户名首字母
    :param color: 背景颜色
    :param filename: 保存文件名
    :param size: 图片尺寸
    """
    try:
        print(f"Creating avatar for {name} with color {color}")
        
        # 创建图片
        img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        
        # 绘制圆形背景
        draw.ellipse([0, 0, size, size], fill=color)
        
        # 添加渐变效果（简单的高光）
        highlight_color = tuple(min(255, c + 30) for c in color[:3]) + (color[3],)
        draw.ellipse([size//8, size//8, size//2, size//2], fill=highlight_color)
        
        # 绘制文字
        try:
            # 尝试使用系统字体
            font_size = size // 3
            font = ImageFont.truetype("arial.ttf", font_size)
        except:
            try:
                # 如果没有arial，尝试其他字体
                font = ImageFont.truetype("C:/Windows/Fonts/msyh.ttc", font_size)
            except:
                # 使用默认字体
                font = ImageFont.load_default()
        
        # 计算文字位置（居中）
        bbox = draw.textbbox((0, 0), name, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        x = (size - text_width) // 2
        y = (size - text_height) // 2 - 5  # 稍微向上偏移
        
        # 绘制文字阴影
        draw.text((x+2, y+2), name, font=font, fill=(0, 0, 0, 100))
        # 绘制文字
        draw.text((x, y), name, font=font, fill=(255, 255, 255, 255))
        
        # 保存图片
        img.save(filename, 'PNG')
        print(f"Created avatar: {filename}")
        
    except Exception as e:
        print(f"Error creating avatar {filename}: {e}")

def main():
    """主函数"""
    try:
        print("Starting avatar creation...")
        
        # 确保目录存在
        os.makedirs('.', exist_ok=True)
        
        # 创建不同角色的头像
        avatars = [
            {
                'name': '管',
                'color': (102, 126, 234, 255),  # 蓝紫色
                'filename': 'avatar-admin.png'
            },
            {
                'name': '张',
                'color': (46, 204, 113, 255),   # 绿色
                'filename': 'avatar-user.png'
            },
            {
                'name': 'V',
                'color': (241, 196, 15, 255),   # 金色
                'filename': 'avatar-vip.png'
            },
            {
                'name': '?',
                'color': (149, 165, 166, 255),  # 灰色
                'filename': 'default-avatar.png'
            }
        ]
        
        # 生成头像
        for avatar in avatars:
            create_avatar(
                avatar['name'],
                avatar['color'],
                avatar['filename'],
                200
            )
        
        print("All avatars created successfully!")
        
    except Exception as e:
        print(f"Error in main: {e}")

if __name__ == '__main__':
    main() 