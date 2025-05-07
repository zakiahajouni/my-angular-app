from flask import Flask
from app.config import config
from app.extensions import db, jwt, cors

def create_app(config_name='default'):
    """Create and configure the Flask application."""
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    # Initialize extensions with app
    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)

    # Register blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.category_routes import category_bp
    from app.routes.subcategory_routes import subcategory_bp
    from app.routes.professional_routes import professional_bp
    from app.routes.service_routes import service_bp
    from app.routes.demande_routes import demande_bp
    from app.routes.feedback_routes import feedback_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(category_bp, url_prefix='/categories')
    app.register_blueprint(subcategory_bp, url_prefix='/sousCategories')
    app.register_blueprint(professional_bp, url_prefix='/professionnels')
    app.register_blueprint(service_bp, url_prefix='/services')
    app.register_blueprint(demande_bp, url_prefix='/demandes')
    app.register_blueprint(feedback_bp, url_prefix='/feedbacks')

    # Create a route to test the API
    @app.route('/api/health')
    def health_check():
        return {'status': 'healthy', 'message': 'CommunAid API is running'}

    return app
