from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.category import Category
from app.extensions import db

category_bp = Blueprint('categories', __name__)

@category_bp.route('', methods=['GET'])
def get_all_categories():
    """Get all categories."""
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories]), 200

@category_bp.route('/<int:id>', methods=['GET'])
def get_category_by_id(id):
    """Get a category by ID."""
    category = Category.query.get(id)

    if not category:
        return jsonify({'message': 'Category not found'}), 404

    return jsonify(category.to_dict()), 200

@category_bp.route('', methods=['POST'])
@jwt_required()
def add_category():
    """Add a new category."""
    data = request.get_json()

    if not data or not data.get('nom'):
        return jsonify({'message': 'Missing category name'}), 400

    new_category = Category(
        nom=data.get('nom'),
        description=data.get('description')
    )

    db.session.add(new_category)
    db.session.commit()

    return jsonify(new_category.to_dict()), 201

@category_bp.route('', methods=['PUT'])
@jwt_required()
def update_category():
    """Update an existing category."""
    data = request.get_json()

    if not data or not data.get('id') or not data.get('nom'):
        return jsonify({'message': 'Missing category ID or name'}), 400

    category = Category.query.get(data.get('id'))

    if not category:
        return jsonify({'message': 'Category not found'}), 404

    category.nom = data.get('nom')
    category.description = data.get('description')

    db.session.commit()

    return jsonify(category.to_dict()), 200

@category_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_category(id):
    """Delete a category by ID."""
    category = Category.query.get(id)

    if not category:
        return jsonify({'message': 'Category not found'}), 404

    db.session.delete(category)
    db.session.commit()

    return jsonify({'message': 'Category deleted successfully'}), 200

@category_bp.route('/total', methods=['GET'])
def get_total_categories():
    """Get the total number of categories."""
    total = Category.query.count()
    return jsonify(total), 200
