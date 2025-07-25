# Elevate - Senior Companion Platform

Elevate is a platform designed to help seniors stay connected, maintain better health, and engage with their communities. It combines health monitoring, social connections, and personalized assistance in one place.

## Features

- **User Authentication**: Secure login and registration system
- **Profile Management**: Store and manage personal and health information
- **Community Engagement**: Join communities and chat with others
- **Event Participation**: Discover and join local events
- **Health Monitoring**: Track health vitals and medication
- **AI Assistance**: Get personalized help through natural language conversation
- **Journal**: Keep personal records and reflections
- **Real-time Chat**: Connect with others via WebSocket-based chat rooms

## Technology Stack

- **Backend**: Django 5.2 with Python 3.13
- **Frontend**: React with TypeScript
- **Database**: PostgreSQL (production) / SQLite (development)
- **Real-time**: Django Channels (WebSockets)
- **API**: Django REST Framework
- **Authentication**: JWT-based authentication
- **AI Integration**: Integration with Groq LLM API
- **Deployment**: WhiteNoise for static files

## Setup Instructions

### Prerequisites

- Python 3.10+
- Node.js 16+
- npm or yarn
- PostgreSQL (optional for development, required for production)

### Environment Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Team-Elevate-HH2025
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv elev
   # On Windows
   elev\Scripts\activate
   # On macOS/Linux
   source elev/bin/activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file with necessary environment variables:
   ```
   DEBUG=True
   DJANGO_ENV=development
   DJANGO_SECRET_KEY=your-secret-key-here
   ALLOWED_HOSTS=localhost,127.0.0.1
   DB_ENGINE=sqlite  # Use "postgres" for PostgreSQL

   # For PostgreSQL (if used)
   # DB_NAME=hackhazard_db
   # DB_USER=postgres
   # DB_PASSWORD=your-password
   # DB_HOST=localhost
   # DB_PORT=5432

   # API Keys
   GROQ_API_KEY=your-groq-api-key

   # Security Settings
   CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8000
   CSRF_TRUSTED_ORIGINS=http://localhost:3000,http://localhost:8000
   SESSION_COOKIE_SECURE=False  # Set to True in production
   CSRF_COOKIE_SECURE=False    # Set to True in production

   # Redis Configuration (for caching and channels)
   REDIS_URL=redis://localhost:6379/0

   # Email Configuration
   EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USE_TLS=True
   EMAIL_HOST_USER=your-email@gmail.com
   EMAIL_HOST_PASSWORD=your-app-specific-password

   # Static and Media Files
   STATIC_URL=/static/
   MEDIA_URL=/media/
   STATIC_ROOT=staticfiles/
   MEDIA_ROOT=media/

   # Logging Configuration
   LOG_LEVEL=INFO
   LOG_FILE=logs/elevate.log

   # Rate Limiting
   RATE_LIMIT_REQUESTS=100
   RATE_LIMIT_PERIOD=60  # in seconds

   # JWT Settings
   JWT_SECRET_KEY=your-jwt-secret-key-here
   JWT_ACCESS_TOKEN_LIFETIME=5  # minutes
   JWT_REFRESH_TOKEN_LIFETIME=1440  # minutes (24 hours)

   # WebSocket Configuration
   CHANNEL_LAYERS_DEFAULT=default
   CHANNEL_LAYERS_REDIS_HOST=localhost
   CHANNEL_LAYERS_REDIS_PORT=6379
   ```

5. Install frontend dependencies:
   ```bash
   # For the react-website directory
   cd react-website
   npm install
   
   # For the frontend directory
   cd ../frontend
   npm install
   ```

### Database Setup

1. Apply migrations:
   ```bash
   python manage.py migrate
   ```

2. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

### Building Frontend Assets

1. Build the React application:
   ```bash
   # Option 1: Use our build script
   python build.py
   
   # Option 2: Build manually
   cd react-website
   npm run build
   ```

### Running the Application

1. Start the development server:
   ```bash
   python manage.py runserver
   ```

2. Access the application at [http://localhost:8000](http://localhost:8000)

3. To check for database connectivity:
   ```bash
   python check_db.py
   ```

## Project Structure

- `companions/`: Main Django app containing models, views, etc.
- `core/`: Project settings and configuration
- `templates/`: Django HTML templates
- `static/`: Static assets (CSS, JS, images)
- `react-website/`: React frontend source code
- `media/`: User-uploaded content

## Deployment

For production deployments:

1. Set DEBUG=False in .env
2. Configure PostgreSQL database
3. Set up static files collection:
   ```bash
   python manage.py collectstatic
   ```
4. Consider using Gunicorn or uWSGI as the application server:
   ```bash
   gunicorn core.wsgi:application
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the terms of the license included in the repository.

## Support

For support, please contact the project maintainers.
