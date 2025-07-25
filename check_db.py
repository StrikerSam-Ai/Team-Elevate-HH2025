# Database configuration check script
import os
import sys
import django
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

# Add the current directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

def check_database_connection():
    """Check if the database connection is working."""
    try:
        # Initialize Django
        django.setup()
        
        # Import Django modules after setting up Django
        from django.db import connections
        from django.db.utils import OperationalError
        
        # Try to connect to all database connections
        for connection_name in connections:
            connection = connections[connection_name]
            try:
                connection.ensure_connection()
                logger.info(f"✓ Connection '{connection_name}' is working!")
                
                # Check if we can query data
                cursor = connection.cursor()
                cursor.execute("SELECT 1")
                result = cursor.fetchone()
                if result and result[0] == 1:
                    logger.info(f"✓ Database '{connection_name}' is responding to queries!")
                
            except OperationalError as e:
                logger.error(f"✗ Connection '{connection_name}' failed: {str(e)}")
                return False
        
        # If no exceptions were raised, the connection is working
        return True
        
    except Exception as e:
        logger.error(f"✗ Error setting up Django: {str(e)}")
        return False

def check_models():
    """Check if the models are properly registered."""
    try:
        # Get all models and check if they can be accessed
        from django.apps import apps
        models = apps.get_models()
        
        logger.info(f"Found {len(models)} models:")
        for model in models:
            logger.info(f"  ✓ {model.__name__}")
            try:
                # Try to get the first object or count objects
                count = model.objects.count()
                logger.info(f"    ✓ Contains {count} records")
            except Exception as e:
                logger.warning(f"    ✗ Could not query objects: {str(e)}")
                
        return True
    except Exception as e:
        logger.error(f"✗ Error checking models: {str(e)}")
        return False

def main():
    """Run all checks."""
    logger.info("Starting database configuration check...")
    
    # Check database connection
    if check_database_connection():
        logger.info("✓ Database connection check passed!")
    else:
        logger.error("✗ Database connection check failed!")
        
    # Check models
    if check_models():
        logger.info("✓ Model check passed!")
    else:
        logger.error("✗ Model check failed!")
    
    logger.info("Database configuration check completed.")

if __name__ == "__main__":
    main()