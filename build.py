#!/usr/bin/env python
"""
Build script for the Elevate project.

This script will:
1. Build the React app
2. Copy the built files to the static directory
3. Collect all static files
"""
import os
import sys
import subprocess
import shutil
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

# Project directories
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
REACT_DIR = os.path.join(BASE_DIR, 'react-website')
STATIC_DIR = os.path.join(BASE_DIR, 'static')
STATIC_FRONTEND_DIR = os.path.join(STATIC_DIR, 'frontend')

def run_command(command, cwd=None):
    """Run a command and return its output."""
    try:
        logger.info(f"Running command: {' '.join(command)}")
        result = subprocess.run(
            command,
            cwd=cwd,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        return result.stdout
    except subprocess.CalledProcessError as e:
        logger.error(f"Command failed with exit code {e.returncode}")
        logger.error(f"Error output: {e.stderr}")
        raise

def build_react_app():
    """Build the React app."""
    # Check if React directory exists
    if not os.path.exists(REACT_DIR):
        logger.warning(f"React directory {REACT_DIR} not found. Skipping React build.")
        return False

    try:
        # Install dependencies
        logger.info("Installing React dependencies...")
        run_command(['npm', 'install'], cwd=REACT_DIR)

        # Build the app
        logger.info("Building React app...")
        run_command(['npm', 'run', 'build'], cwd=REACT_DIR)

        # Check if build directory exists
        build_dir = os.path.join(REACT_DIR, 'build')
        if not os.path.exists(build_dir):
            logger.error(f"Build directory {build_dir} not found after build.")
            return False

        logger.info("React app built successfully.")
        return True
    except Exception as e:
        logger.error(f"Error building React app: {str(e)}")
        return False

def copy_react_build():
    """Copy React build files to the static directory."""
    react_build = os.path.join(REACT_DIR, 'build')
    
    # Ensure static/frontend directory exists
    if not os.path.exists(STATIC_FRONTEND_DIR):
        os.makedirs(STATIC_FRONTEND_DIR)

    try:
        # Copy React build static files to static/frontend
        react_static = os.path.join(react_build, 'static')
        if os.path.exists(react_static):
            logger.info(f"Copying static files to {STATIC_FRONTEND_DIR}...")
            
            # Copy JS files
            js_dir = os.path.join(react_static, 'js')
            static_js_dir = os.path.join(STATIC_FRONTEND_DIR, 'static', 'js')
            if os.path.exists(js_dir):
                if not os.path.exists(static_js_dir):
                    os.makedirs(static_js_dir)
                for file in os.listdir(js_dir):
                    if file.endswith('.js'):
                        shutil.copy(
                            os.path.join(js_dir, file),
                            os.path.join(static_js_dir, 'main.js')
                        )
                        break
            
            # Copy CSS files
            css_dir = os.path.join(react_static, 'css')
            static_css_dir = os.path.join(STATIC_FRONTEND_DIR, 'static', 'css')
            if os.path.exists(css_dir):
                if not os.path.exists(static_css_dir):
                    os.makedirs(static_css_dir)
                for file in os.listdir(css_dir):
                    if file.endswith('.css'):
                        shutil.copy(
                            os.path.join(css_dir, file),
                            os.path.join(static_css_dir, 'main.css')
                        )
                        break
        
        logger.info("React build files copied successfully.")
        return True
    except Exception as e:
        logger.error(f"Error copying React build files: {str(e)}")
        return False

def collect_static():
    """Collect all static files."""
    try:
        logger.info("Collecting static files...")
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
        
        import django
        from django.core.management import call_command
        
        django.setup()
        call_command('collectstatic', '--noinput', '--clear')
        
        logger.info("Static files collected successfully.")
        return True
    except Exception as e:
        logger.error(f"Error collecting static files: {str(e)}")
        return False

def main():
    """Run the build process."""
    logger.info("Starting build process...")
    
    success = True
    
    # Build React app
    if build_react_app():
        # Copy React build files
        success = copy_react_build()
    else:
        success = False
        
    # Collect static files
    if success:
        success = collect_static()
        
    if success:
        logger.info("Build completed successfully!")
        return 0
    else:
        logger.error("Build failed!")
        return 1

if __name__ == "__main__":
    sys.exit(main())