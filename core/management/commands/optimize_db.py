from django.core.management.base import BaseCommand
from django.db import connection
from core.db_optimization import (
    DatabaseOptimizer,
    QueryCache,
    DatabaseBackup,
    optimize_queries,
    create_indexes
)
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Apply database optimizations including indexes and connection pooling'

    def add_arguments(self, parser):
        parser.add_argument(
            '--backup',
            action='store_true',
            help='Create a database backup',
        )
        parser.add_argument(
            '--analyze',
            action='store_true',
            help='Analyze and optimize slow queries'
        )
        parser.add_argument(
            '--vacuum',
            action='store_true',
            help='Run VACUUM ANALYZE on all tables',
        )
        parser.add_argument(
            '--indexes',
            action='store_true',
            help='Create database indexes'
        )
        parser.add_argument(
            '--pool',
            action='store_true',
            help='Initialize connection pool'
        )

    def handle(self, *args, **options):
        if options['backup']:
            self.create_backup()
        
        if options['analyze']:
            self.stdout.write('Analyzing and optimizing slow queries...')
            slow_queries = optimize_queries()
            if slow_queries:
                self.stdout.write(self.style.WARNING('Slow queries detected:'))
                for query in slow_queries:
                    self.stdout.write(f"- {query}")
            else:
                self.stdout.write(self.style.SUCCESS('No slow queries detected.'))
        
        if options['vacuum']:
            self.vacuum_tables()
        
        if options['indexes']:
            self.stdout.write('Creating database indexes...')
            create_indexes()
            self.stdout.write(self.style.SUCCESS('Database indexes created successfully.'))
        
        if options['pool']:
            self.stdout.write('Initializing database connection pool...')
            DatabaseOptimizer.initialize_pool()
            self.stdout.write(self.style.SUCCESS('Database connection pool initialized.'))

        if not any([options['backup'], options['analyze'], options['vacuum'], options['indexes'], options['pool']]):
            self.stdout.write('No optimization options specified. Use --backup, --analyze, --vacuum, --indexes, or --pool.')

    def create_backup(self):
        """Create a database backup."""
        self.stdout.write('Creating database backup...')
        try:
            backup_file = DatabaseBackup.create_backup()
            self.stdout.write(self.style.SUCCESS(f'Backup created successfully: {backup_file}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Failed to create backup: {str(e)}'))

    def vacuum_tables(self):
        """Run VACUUM ANALYZE on all tables."""
        self.stdout.write('Running VACUUM ANALYZE...')
        try:
            with connection.cursor() as cursor:
                cursor.execute("VACUUM ANALYZE;")
            self.stdout.write(self.style.SUCCESS('VACUUM ANALYZE completed'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Failed to run VACUUM ANALYZE: {str(e)}')) 