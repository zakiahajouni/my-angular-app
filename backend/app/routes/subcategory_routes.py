from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.subcategory import SousCategory
from app.models.category import Category
from app.extensions import db

subcategory_bp = Blueprint('sousCategories', __name__)

@subcategory_bp.route('', methods=['GET'])
def get_all_subcategories():
    """Get all subcategories."""
    subcategories = SousCategory.query.all()
    return jsonify([subcategory.to_dict() for subcategory in subcategories]), 200

@subcategory_bp.route('/<int:id>', methods=['GET'])
def get_subcategory_by_id(id):
    """Get a subcategory by ID."""
    subcategory = SousCategory.query.get(id)

    if not subcategory:
        return jsonify({'message': 'Subcategory not found'}), 404

    return jsonify(subcategory.to_dict()), 200

@subcategory_bp.route('', methods=['POST'])
@jwt_required()
def add_subcategory():
    """Add a new subcategory."""
    data = request.get_json()

    if not data or not data.get('nom') or not data.get('categorie') or not data.get('categorie').get('id'):
        return jsonify({'message': 'Missing subcategory name or category ID'}), 400

    # Check if category exists
    category = Category.query.get(data.get('categorie').get('id'))
    if not category:
        return jsonify({'message': 'Category not found'}), 404

    new_subcategory = SousCategory(
        nom=data.get('nom'),
        description=data.get('description'),
        categorie=category
    )

    db.session.add(new_subcategory)
    db.session.commit()

    return jsonify(new_subcategory.to_dict()), 201

@subcategory_bp.route('', methods=['PUT'])
@jwt_required()
def update_subcategory():
    """Update an existing subcategory."""
    data = request.get_json()

    if not data or not data.get('id') or not data.get('nom'):
        return jsonify({'message': 'Missing subcategory ID or name'}), 400

    subcategory = SousCategory.query.get(data.get('id'))

    if not subcategory:
        return jsonify({'message': 'Subcategory not found'}), 404

    subcategory.nom = data.get('nom')
    subcategory.description = data.get('description')

    # Update category if provided
    if data.get('categorie') and data.get('categorie').get('id'):
        category = Category.query.get(data.get('categorie').get('id'))
        if not category:
            return jsonify({'message': 'Category not found'}), 404
        subcategory.categorie = category

    db.session.commit()

    return jsonify(subcategory.to_dict()), 200

@subcategory_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_subcategory(id):
    """Delete a subcategory by ID."""
    subcategory = SousCategory.query.get(id)

    if not subcategory:
        return jsonify({'message': 'Subcategory not found'}), 404

    db.session.delete(subcategory)
    db.session.commit()

    return jsonify({'message': 'Subcategory deleted successfully'}), 200

@subcategory_bp.route('/total', methods=['GET'])
def get_total_subcategories():
    """Get the total number of subcategories."""
    total = SousCategory.query.count()
    return jsonify(total), 200
