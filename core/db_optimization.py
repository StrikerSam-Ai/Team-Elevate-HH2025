from django.db import connection
from django.core.cache import cache
from django.conf import settings
import psycopg2
from psycopg2 import pool
from typing import Dict, Any, Optional
import logging

logger = logging.getLogger(__name__)

class DatabaseOptimizer:
    """Handles database connection pooling and optimization."""
    
    _pool = None
    
    @classmethod
    def initialize_pool(cls):
        """Initialize the connection pool."""
        if cls._pool is None:
            try:
                cls._pool = pool.ThreadedConnectionPool(
                    minconn=settings.DB_OPTIMIZATION['CONNECTION_POOL_SIZE'],
                    maxconn=settings.DB_OPTIMIZATION['CONNECTION_POOL_SIZE'] + 
                            settings.DB_OPTIMIZATION['MAX_OVERFLOW'],
                    host=settings.DATABASES['default']['HOST'],
                    database=settings.DATABASES['default']['NAME'],
                    user=settings.DATABASES['default']['USER'],
                    password=settings.DATABASES['default']['PASSWORD'],
                    port=settings.DATABASES['default']['PORT']
                )
                logger.info("Database connection pool initialized successfully")
            except Exception as e:
                logger.error(f"Failed to initialize database connection pool: {e}")
                raise
    
    @classmethod
    def get_connection(cls):
        """Get a connection from the pool."""
        if cls._pool is None:
            cls.initialize_pool()
        return cls._pool.getconn()
    
    @classmethod
    def release_connection(cls, conn):
        """Release a connection back to the pool."""
        if cls._pool is not None:
            cls._pool.putconn(conn)
    
    @classmethod
    def close_pool(cls):
        """Close all connections in the pool."""
        if cls._pool is not None:
            cls._pool.closeall()
            cls._pool = None
            logger.info("Database connection pool closed")

class QueryCache:
    """Handles query result caching."""
    
    @staticmethod
    def get_cache_key(query, params=None):
        """Generate a cache key for a query."""
        key_parts = [query]
        if params:
            key_parts.extend(str(p) for p in params)
        return f"query_cache:{hash(''.join(key_parts))}"
    
    @staticmethod
    def get_cached_query(query, params=None):
        """Get cached query results."""
        if not settings.QUERY_CACHE['ENABLED']:
            return None
        
        cache_key = QueryCache.get_cache_key(query, params)
        return cache.get(cache_key)
    
    @staticmethod
    def set_cached_query(query, params=None, result=None):
        """Cache query results."""
        if not settings.QUERY_CACHE['ENABLED']:
            return
        
        cache_key = QueryCache.get_cache_key(query, params)
        cache.set(
            cache_key,
            result,
            timeout=settings.QUERY_CACHE['TIMEOUT']
        )
    
    @staticmethod
    def invalidate_cache(pattern=None):
        """Invalidate cached queries."""
        if pattern:
            cache.delete_pattern(f"query_cache:{pattern}*")
        else:
            cache.delete_pattern("query_cache:*")

class DatabaseBackup:
    """
    Database backup handler.
    """
    @staticmethod
    def create_backup():
        """
        Create a database backup.
        """
        if settings.DATABASES['default']['ENGINE'] == 'django.db.backends.postgresql':
            try:
                import subprocess
                from datetime import datetime
                
                # Create backup directory if it doesn't exist
                backup_dir = settings.BASE_DIR / 'backups'
                backup_dir.mkdir(exist_ok=True)
                
                # Generate backup filename with timestamp
                timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                backup_file = backup_dir / f'backup_{timestamp}.sql'
                
                # Create backup using pg_dump
                db = settings.DATABASES['default']
                subprocess.run([
                    'pg_dump',
                    '-h', db['HOST'],
                    '-U', db['USER'],
                    '-d', db['NAME'],
                    '-f', str(backup_file)
                ], env={'PGPASSWORD': db['PASSWORD']})
                
                logger.info(f"Database backup created: {backup_file}")
                return backup_file
            except Exception as e:
                logger.error(f"Failed to create database backup: {str(e)}")
                raise
        else:
            logger.warning("Database backup is only supported for PostgreSQL")

    @staticmethod
    def restore_backup(backup_file: str):
        """
        Restore a database backup.
        """
        if settings.DATABASES['default']['ENGINE'] == 'django.db.backends.postgresql':
            try:
                import subprocess
                
                # Restore backup using psql
                db = settings.DATABASES['default']
                subprocess.run([
                    'psql',
                    '-h', db['HOST'],
                    '-U', db['USER'],
                    '-d', db['NAME'],
                    '-f', backup_file
                ], env={'PGPASSWORD': db['PASSWORD']})
                
                logger.info(f"Database backup restored from: {backup_file}")
            except Exception as e:
                logger.error(f"Failed to restore database backup: {str(e)}")
                raise
        else:
            logger.warning("Database backup restore is only supported for PostgreSQL")

def optimize_queries():
    """Analyze and optimize database queries."""
    with connection.cursor() as cursor:
        # Analyze all tables
        cursor.execute("ANALYZE VERBOSE;")
        
        # Get slow query statistics
        cursor.execute("""
            SELECT query, calls, total_time, mean_time
            FROM pg_stat_statements
            ORDER BY mean_time DESC
            LIMIT 10;
        """)
        slow_queries = cursor.fetchall()
        
        # Log slow queries
        for query in slow_queries:
            logger.warning(f"Slow query detected: {query}")
        
        return slow_queries

def create_indexes():
    """Create necessary database indexes."""
    from django.db import connection
    
    with connection.cursor() as cursor:
        # User model indexes
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_user_email ON companions_customuser(email);
            CREATE INDEX IF NOT EXISTS idx_user_date_joined ON companions_customuser(date_joined);
            CREATE INDEX IF NOT EXISTS idx_user_last_login ON companions_customuser(last_login);
        """)
        
        # Event model indexes
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_event_start_time ON companions_event(start_time);
            CREATE INDEX IF NOT EXISTS idx_event_status ON companions_event(status);
            CREATE INDEX IF NOT EXISTS idx_event_date_created ON companions_event(date_created);
        """)
        
        # Community model indexes
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_community_name ON companions_community(name);
            CREATE INDEX IF NOT EXISTS idx_community_category ON companions_community(category);
            CREATE INDEX IF NOT EXISTS idx_community_created_at ON companions_community(created_at);
        """)
        
        # Journal model indexes
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_journal_user ON companions_journal(user_id);
            CREATE INDEX IF NOT EXISTS idx_journal_date_created ON companions_journal(date_created);
            CREATE INDEX IF NOT EXISTS idx_journal_title ON companions_journal(title);
        """)
        
        print("Database indexes created successfully.") 