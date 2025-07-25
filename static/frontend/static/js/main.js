// Placeholder for React app bundle
// This file will be replaced by the actual React build in production

(function() {
    console.log('React app loading...');
    
    // Check if we're running in development mode
    const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    // Create root element if it doesn't exist
    const rootElement = document.getElementById('root');
    if (!rootElement) {
        const root = document.createElement('div');
        root.id = 'root';
        document.body.appendChild(root);
    }
    
    // Display loading message
    const rootEl = document.getElementById('root');
    rootEl.innerHTML = `
        <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            font-family: sans-serif;
            text-align: center;
            padding: 20px;
        ">
            <h1>Elevate - Senior Companion App</h1>
            <p>
                The application is initializing...
                ${isDev ? 'Make sure your React development server is running on port 3000.' : ''}
            </p>
            <div style="
                width: 50px;
                height: 50px;
                border: 5px solid #f3f3f3;
                border-top: 5px solid #3498db;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 20px 0;
            "></div>
            <p>
                If the app doesn't load, please contact support.
            </p>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            body {
                margin: 0;
                padding: 0;
                background-color: #f5f5f5;
            }
        </style>
    `;
})();