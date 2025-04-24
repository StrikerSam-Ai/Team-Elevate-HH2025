from django.apps import AppConfig

class CompanionsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'companions'
    verbose_name = 'Companions'

    def ready(self):
        import companions.signals  # Import signals