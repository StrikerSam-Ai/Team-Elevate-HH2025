#!/usr/bin/env python
"""
Development server script for the Elevate project.
This script will:
1. Check environment setup
2. Install dependencies if needed
3. Run database migrations
4. Start development servers for Django and React
"""
import os
import sys
import subprocess
import webbrowser
from time import sleep
import signal
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

# Project directories
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
REACT_DIR = os.path.join(BASE_DIR, 'react-website')

def check_environment():
    """Check if all required environment variables and dependencies are available."""
    logger.info("Checking environment setup...")
    
    # Check Python version
    python_version = sys.version_info
    if python_version.major < 3 or (python_version.major == 3 and python_version.minor < 10):
        logger.error("Python 3.10 or higher is required")
        return False
    
    # Check if virtual environment is activated
    if not hasattr(sys, 'real_prefix') and not (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
        logger.warning("Virtual environment is not activated. It's recommended to use a virtual environment.")
    
    # Check for required files
    required_files = [
        os.path.join(BASE_DIR, 'manage.py'),
        os.path.join(BASE_DIR, 'requirements.txt'),
        os.path.join(REACT_DIR, 'package.json'),
    ]
    
    for file_path in required_files:
        if not os.path.exists(file_path):
            logger.error(f"Required file not found: {file_path}")
            return False
    
    return True

def install_dependencies():
    """Install Python and Node.js dependencies."""
    logger.info("Installing dependencies...")
    
    try:
        # Install Python dependencies
        subprocess.run([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'], check=True)
        
        # Install Node.js dependencies
        subprocess.run(['npm', 'install'], cwd=REACT_DIR, check=True)
        
        return True
    except subprocess.CalledProcessError as e:
        logger.error(f"Failed to install dependencies: {str(e)}")
        return False

def run_migrations():
    """Run database migrations."""
    logger.info("Running database migrations...")
    
    try:
        subprocess.run([sys.executable, 'manage.py', 'migrate'], check=True)
        return True
    except subprocess.CalledProcessError as e:
        logger.error(f"Failed to run migrations: {str(e)}")
        return False

def start_servers():
    """Start development servers."""
    logger.info("Starting development servers...")
    
    # Start Django development server
    django_process = subprocess.Popen(
        [sys.executable, 'manage.py', 'runserver'],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        universal_newlines=True
    )
    
    # Start React development server
    react_process = subprocess.Popen(
        ['npm', 'start'],
        cwd=REACT_DIR,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        universal_newlines=True
    )
    
    # Open browser after a short delay
    sleep(2)
    webbrowser.open('http://localhost:3000')
    
    try:
        # Monitor server output
        while True:
            # Check Django server output
            django_out = django_process.stdout.readline()
            if django_out:
                print("Django:", django_out.strip())
            
            django_err = django_process.stderr.readline()
            if django_err:
                print("Django Error:", django_err.strip(), file=sys.stderr)
            
            # Check React server output
            react_out = react_process.stdout.readline()
            if react_out:
                print("React:", react_out.strip())
            
            react_err = react_process.stderr.readline()
            if react_err:
                print("React Error:", react_err.strip(), file=sys.stderr)
            
            # Check if either process has terminated
            if django_process.poll() is not None:
                logger.error("Django server has stopped")
                break
            
            if react_process.poll() is not None:
                logger.error("React server has stopped")
                break
            
    except KeyboardInterrupt:
        logger.info("Shutting down servers...")
    finally:
        # Terminate processes
        django_process.terminate()
        react_process.terminate()
        
        # Wait for processes to close
        django_process.wait()
        react_process.wait()

def main():
    """Main entry point."""
    # Handle Ctrl+C gracefully
    signal.signal(signal.SIGINT, lambda sig, frame: sys.exit(0))
    
    logger.info("Starting Elevate development environment...")
    
    # Check environment
    if not check_environment():
        logger.error("Environment check failed")
        return 1
    
    # Install dependencies
    if not install_dependencies():
        logger.error("Failed to install dependencies")
        return 1
    
    # Run migrations
    if not run_migrations():
        logger.error("Failed to run migrations")
        return 1
    
    # Start servers
    start_servers()
    
    return 0

if __name__ == "__main__":
    sys.exit(main())