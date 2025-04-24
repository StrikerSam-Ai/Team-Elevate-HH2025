import os
import shutil

# Corrected paths based on your structure
REACT_BUILD_SRC = 'frontend/react-website/build'
DJANGO_REACT_TEMPLATES = 'core/templates/react/build'

def copy_files():
    if not os.path.exists(REACT_BUILD_SRC):
        print(f"❌ React build folder not found at: {REACT_BUILD_SRC}")
        return

    # Remove old build files
    if os.path.exists(DJANGO_REACT_TEMPLATES):
        shutil.rmtree(DJANGO_REACT_TEMPLATES)

    shutil.copytree(REACT_BUILD_SRC, DJANGO_REACT_TEMPLATES)
    print(f"✅ React build copied to: {DJANGO_REACT_TEMPLATES}")

if __name__ == "__main__":
    copy_files()
