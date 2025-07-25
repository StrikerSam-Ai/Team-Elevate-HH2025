"""
Custom context processors for the Elevate project.
These functions add variables to the context of all templates.
"""

def common_variables(request):
    """
    Add common variables to the template context.
    """
    return {
        'app_name': 'Elevate',
        'app_version': '1.0.0',
        'debug': request.META.get('DJANGO_SETTINGS_MODULE', '').endswith('.development'),
    }

def user_info(request):
    """
    Add user information to the template context.
    """
    user_data = {}
    if request.user.is_authenticated:
        # Get name with fallbacks - first try 'name', then 'username' if it exists, otherwise use email
        name = getattr(request.user, 'name', None)
        if not name and hasattr(request.user, 'username'):
            name = request.user.username
        if not name:
            name = request.user.email.split('@')[0]  # Use part of email as last resort
            
        user_data = {
            'is_authenticated': True,
            'id': request.user.id,
            'name': name,
            'email': request.user.email,
        }
    else:
        user_data = {
            'is_authenticated': False,
        }
    return {'user_info': user_data}