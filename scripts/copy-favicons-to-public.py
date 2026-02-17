import os
import shutil

src_icons = r'c:\Users\Кирилл\Documents\GitHub\toolshop\src\assets\icons'
public_dir = r'c:\Users\Кирилл\Documents\GitHub\toolshop\public'

os.makedirs(public_dir, exist_ok=True)

files = ['logo-light.png', 'logo-dark.png']

for f in files:
    src = os.path.join(src_icons, f)
    dst = os.path.join(public_dir, f)
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f'✓ Copied {f}')
    else:
        print(f'✗ File not found: {src}')

print('Done!')
