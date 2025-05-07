import os
from app import create_app

# Create the Flask application
app = create_app(os.getenv('FLASK_ENV', 'default'))

if __name__ == '__main__':
    # Run the application
    app.run(host='0.0.0.0', port=5000, debug=True)
