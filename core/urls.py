"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
<<<<<<< HEAD
from django.urls import path, include, re_path
=======
from django.urls import path, include
<<<<<<< HEAD
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
 # Map root URL to app URLs
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('companions.urls')),
    path('', include('companions.urls')),
]

=======
>>>>>>> 80d9ef0d5dab9ef00ce5fe8b19b03a87ca4e474d
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('companions.urls')),  # All backend APIs under /api/
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),  # Catch-all for React routes
]
<<<<<<< HEAD

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
=======
>>>>>>> 400b421c6146e256ac674f3832dbd7278a106b7b
>>>>>>> 80d9ef0d5dab9ef00ce5fe8b19b03a87ca4e474d
