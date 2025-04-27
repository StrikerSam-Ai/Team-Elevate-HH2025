# Team Elevate Project

## Project Structure

```
Team-Elevate-HH2025/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── contexts/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── styles/         # CSS and styling files
│   │   └── utils/          # Utility functions
│   └── public/             # Static frontend assets
├── companions/             # Django app for core features
│   ├── api/               # API endpoints
│   ├── migrations/        # Database migrations
│   └── models.py          # Data models
├── core/                  # Django project settings
│   ├── settings.py        # Project configuration
│   └── urls.py           # URL routing
└── static/               # Static files (CSS, JS, Images)

```

## Setup Instructions

### Backend Setup
1. Create and activate virtual environment:
```bash
python -m venv elev
source elev/Scripts/activate  # Windows: elev\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run migrations:
```bash
python manage.py migrate
```

### Frontend Setup
1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start development server:
```bash
npm start
```

## Development Guidelines

1. Backend:
   - Keep models organized in appropriate apps
   - Write tests for new features
   - Follow PEP 8 style guide

2. Frontend:
   - Use components for reusable UI elements
   - Keep business logic in services
   - Use contexts for state management
   - Follow consistent styling patterns

## Contributing
1. Create a new branch for features
2. Write clear commit messages
3. Submit pull requests with descriptions
