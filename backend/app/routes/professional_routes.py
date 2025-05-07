from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.professional import Professional
from app.models.subcategory import SousCategory
from app.extensions import db

professional_bp = Blueprint('professionnels', __name__)

@professional_bp.route('', methods=['GET'])
def get_all_professionals():
    """Get all professionals."""
    professionals = Professional.query.all()
    return jsonify([professional.to_dict() for professional in professionals]), 200

@professional_bp.route('/<int:id>', methods=['GET'])
def get_professional_by_id(id):
    """Get a professional by ID."""
    professional = Professional.query.get(id)

    if not professional:
        return jsonify({'message': 'Professional not found'}), 404

    return jsonify(professional.to_dict()), 200

@professional_bp.route('', methods=['POST'])
@jwt_required()
def add_professional():
    """Add a new professional."""
    data = request.get_json()

    if not data or not data.get('nomComplet'):
        return jsonify({'message': 'Missing professional name'}), 400

    # Check if subcategory exists if provided
    subcategory = None
    if data.get('sousCategorie') and data.get('sousCategorie').get('id'):
        subcategory = SousCategory.query.get(data.get('sousCategorie').get('id'))
        if not subcategory:
            return jsonify({'message': 'Subcategory not found'}), 404

    new_professional = Professional(
        nomComplet=data.get('nomComplet'),
        telephone=data.get('telephone'),
        adresse=data.get('adresse'),
        experience=data.get('experience'),
        certification=data.get('certification'),
        description=data.get('description'),
        sousCategorie=subcategory
    )

    db.session.add(new_professional)
    db.session.commit()

    return jsonify(new_professional.to_dict()), 201

@professional_bp.route('', methods=['PUT'])
@jwt_required()
def update_professional():
    """Update an existing professional."""
    data = request.get_json()

    if not data or not data.get('id'):
        return jsonify({'message': 'Missing professional ID'}), 400

    professional = Professional.query.get(data.get('id'))

    if not professional:
        return jsonify({'message': 'Professional not found'}), 404

    # Update fields if provided
    if data.get('nomComplet'):
        professional.nomComplet = data.get('nomComplet')
    if data.get('telephone') is not None:
        professional.telephone = data.get('telephone')
    if data.get('adresse') is not None:
        professional.adresse = data.get('adresse')
    if data.get('experience') is not None:
        professional.experience = data.get('experience')
    if data.get('certification') is not None:
        professional.certification = data.get('certification')
    if data.get('description') is not None:
        professional.description = data.get('description')

    # Update subcategory if provided
    if data.get('sousCategorie') and data.get('sousCategorie').get('id'):
        subcategory = SousCategory.query.get(data.get('sousCategorie').get('id'))
        if not subcategory:
            return jsonify({'message': 'Subcategory not found'}), 404
        professional.sousCategorie = subcategory

    db.session.commit()

    return jsonify(professional.to_dict()), 200

@professional_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_professional(id):
    """Delete a professional by ID."""
    professional = Professional.query.get(id)

    if not professional:
        return jsonify({'message': 'Professional not found'}), 404

    db.session.delete(professional)
    db.session.commit()

    return jsonify({'message': 'Professional deleted successfully'}), 200

@professional_bp.route('/total', methods=['GET'])
def get_total_professionals():
    """Get the total number of professionals."""
    total = Professional.query.count()
    return jsonify(total), 200
