#!/usr/bin/env python
"""
Production deployment script for the Elevate project.
This script will:
1. Check production environment
2. Install production dependencies
3. Build React app
4. Collect static files
5. Run database migrations
6. Configure Gunicorn
"""
import os
import sys
import subprocess
import logging
from pathlib import Path

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

# Project directories
BASE_DIR = Path(__file__).resolve().parent
REACT_DIR = BASE_DIR / 'react-website'
STATIC_ROOT = BASE_DIR / 'staticfiles'

def run_command(command, cwd=None, check=True):
    """Run a command and return its output."""
    try:
        logger.info(f"Running command: {' '.join(command)}")
        result = subprocess.run(
            command,
            cwd=cwd,
            check=check,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        return result
    except subprocess.CalledProcessError as e:
        logger.error(f"Command failed with exit code {e.returncode}")
        logger.error(f"Error output: {e.stderr}")
        if check:
            raise
        return e

def check_production_env():
    """Check if production environment is properly configured."""
    logger.info("Checking production environment...")
    
    # Check required environment variables
    required_vars = [
        'DJANGO_SETTINGS_MODULE',
        'DJANGO_SECRET_KEY',
        'DB_ENGINE',
        'GROQ_API_KEY'
    ]
    
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    if missing_vars:
        logger.error(f"Missing required environment variables: {', '.join(missing_vars)}")
        return False
    
    # Check if DEBUG is disabled
    if os.getenv('DEBUG', '').lower() == 'true':
        logger.warning("DEBUG should be set to False in production")
        return False
    
    # Check if PostgreSQL is configured when using postgres engine
    if os.getenv('DB_ENGINE') == 'postgres':
        db_vars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT']
        missing_db_vars = [var for var in db_vars if not os.getenv(var)]
        if missing_db_vars:
            logger.error(f"Missing PostgreSQL environment variables: {', '.join(missing_db_vars)}")
            return False
    
    return True

def install_production_deps():
    """Install production dependencies."""
    logger.info("Installing production dependencies...")
    
    try:
        # Install Python production dependencies
        run_command([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])
        
        # Install Node.js production dependencies
        run_command(['npm', 'ci', '--only=production'], cwd=REACT_DIR)
        
        # Install Gunicorn
        run_command([sys.executable, '-m', 'pip', 'install', 'gunicorn'])
        
        return True
    except Exception as e:
        logger.error(f"Failed to install dependencies: {str(e)}")
        return False

def build_react_app():
    """Build React app for production."""
    logger.info("Building React app...")
    
    try:
        # Build React app
        run_command(['npm', 'run', 'build'], cwd=REACT_DIR)
        return True
    except Exception as e:
        logger.error(f"Failed to build React app: {str(e)}")
        return False

def collect_static():
    """Collect static files."""
    logger.info("Collecting static files...")
    
    try:
        # Ensure static root exists
        STATIC_ROOT.mkdir(parents=True, exist_ok=True)
        
        # Collect static files
        run_command([sys.executable, 'manage.py', 'collectstatic', '--noinput'])
        return True
    except Exception as e:
        logger.error(f"Failed to collect static files: {str(e)}")
        return False

def run_migrations():
    """Run database migrations."""
    logger.info("Running database migrations...")
    
    try:
        run_command([sys.executable, 'manage.py', 'migrate'])
        return True
    except Exception as e:
        logger.error(f"Failed to run migrations: {str(e)}")
        return False

def configure_gunicorn():
    """Configure Gunicorn."""
    logger.info("Configuring Gunicorn...")
    
    config = """import multiprocessing

bind = "0.0.0.0:8000"
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "uvicorn.workers.UvicornWorker"
max_requests = 1000
max_requests_jitter = 50
timeout = 30
keepalive = 2

# Logging
accesslog = "-"
errorlog = "-"
loglevel = "info"

# SSL (uncomment and modify if using SSL)
# keyfile = "/path/to/keyfile"
# certfile = "/path/to/certfile"
"""
    
    try:
        config_path = BASE_DIR / 'gunicorn.conf.py'
        with open(config_path, 'w') as f:
            f.write(config)
        logger.info(f"Gunicorn config written to {config_path}")
        return True
    except Exception as e:
        logger.error(f"Failed to configure Gunicorn: {str(e)}")
        return False

def main():
    """Main deployment process."""
    logger.info("Starting production deployment...")
    
    # Check production environment
    if not check_production_env():
        logger.error("Production environment check failed")
        return 1
    
    # Install production dependencies
    if not install_production_deps():
        logger.error("Failed to install production dependencies")
        return 1
    
    # Build React app
    if not build_react_app():
        logger.error("Failed to build React app")
        return 1
    
    # Collect static files
    if not collect_static():
        logger.error("Failed to collect static files")
        return 1
    
    # Run migrations
    if not run_migrations():
        logger.error("Failed to run migrations")
        return 1
    
    # Configure Gunicorn
    if not configure_gunicorn():
        logger.error("Failed to configure Gunicorn")
        return 1
    
    logger.info("""
Deployment completed successfully!

To start the production server:
1. Ensure all environment variables are set
2. Run: gunicorn -c gunicorn.conf.py core.asgi:application

For proper production setup, consider:
- Setting up Nginx as a reverse proxy
- Configuring SSL certificates
- Setting up process management (e.g., systemd)
- Implementing proper logging
- Setting up monitoring
""")
    
    return 0

if __name__ == "__main__":
    sys.exit(main()) 