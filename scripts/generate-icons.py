#!/usr/bin/env python3
"""Generate PWA icons from the restaurant logo."""

from PIL import Image
import os

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    icons_dir = os.path.join(base_dir, 'public', 'icons')
    logo_path = os.path.join(base_dir, 'recursos', 'tap300.png')

    logo = Image.open(logo_path).convert('RGBA')

    # Standard icons - just resize the logo
    for size, name in [
        (192, 'icon-192.png'),
        (512, 'icon-512.png'),
        (180, 'apple-touch-icon.png'),
    ]:
        resized = logo.resize((size, size), Image.LANCZOS)
        resized.save(os.path.join(icons_dir, name))
        print(f"Generated {name} ({size}x{size})")

    # Maskable icon - logo centered on white background with safe zone padding
    maskable_size = 512
    padding = int(maskable_size * 0.2)  # 20% padding each side
    inner = maskable_size - padding * 2
    bg = Image.new('RGBA', (maskable_size, maskable_size), (255, 255, 255, 255))
    resized = logo.resize((inner, inner), Image.LANCZOS)
    bg.paste(resized, (padding, padding), resized)
    bg.save(os.path.join(icons_dir, 'icon-512-maskable.png'))
    print("Generated icon-512-maskable.png (512x512)")

    # Favicon
    resized = logo.resize((32, 32), Image.LANCZOS)
    resized.save(os.path.join(base_dir, 'public', 'favicon.ico'), format='ICO', sizes=[(32, 32)])
    print("Generated favicon.ico (32x32)")

    print("\nDone!")

if __name__ == '__main__':
    main()
