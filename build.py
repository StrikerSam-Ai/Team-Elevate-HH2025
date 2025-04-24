import os
import shutil
import subprocess
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

def run_command(command, cwd=None):
    """Run a command and return its output"""
    print(f"Running: {command}")
    result = subprocess.run(command, cwd=cwd, shell=True, text=True)
    if result.returncode != 0:
        raise Exception(f"Command failed with exit code {result.returncode}")

def build_react():
    """Build React application"""
    frontend_dir = BASE_DIR / 'frontend'
    print("Building React application...")
    run_command("npm install", cwd=frontend_dir)
    run_command("npm run build", cwd=frontend_dir)

def copy_react_build():
    """Copy React build files to Django static directory"""
    react_build = BASE_DIR / 'frontend' / 'build'
    django_static = BASE_DIR / 'static' / 'react'
    django_templates = BASE_DIR / 'core' / 'templates' / 'html'

    # Ensure directories exist
    django_static.mkdir(parents=True, exist_ok=True)
    django_templates.mkdir(parents=True, exist_ok=True)

    # Copy static files
    if django_static.exists():
        shutil.rmtree(django_static)
    shutil.copytree(react_build / 'static', django_static)

    # Copy index.html template
    shutil.copy2(react_build / 'index.html', django_templates / 'react_app.html')

def collect_static():
    """Run Django's collectstatic command"""
    print("Collecting static files...")
    run_command("python manage.py collectstatic --noinput")

def main():
    """Main build process"""
    try:
        print("Starting build process...")
        build_react()
        copy_react_build()
        collect_static()
        print("Build process completed successfully!")
    except Exception as e:
        print(f"Build failed: {str(e)}")
        exit(1)

if __name__ == "__main__":
    main()