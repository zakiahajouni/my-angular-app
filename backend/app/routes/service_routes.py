from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.service import ServiceCustomer
from app.models.subcategory import SousCategory
from app import db

service_bp = Blueprint('services', __name__)

@service_bp.route('', methods=['GET'])
def get_all_services():
    """Get all services."""
    services = ServiceCustomer.query.all()
    return jsonify([service.to_dict() for service in services]), 200

@service_bp.route('/<int:id>', methods=['GET'])
def get_service_by_id(id):
    """Get a service by ID."""
    service = ServiceCustomer.query.get(id)

    if not service:
        return jsonify({'message': 'Service not found'}), 404

    return jsonify(service.to_dict()), 200

@service_bp.route('', methods=['POST'])
@jwt_required()
def add_service():
    """Add a new service."""
    data = request.get_json()

    if not data or not data.get('nom'):
        return jsonify({'message': 'Missing service name'}), 400

    # Check if subcategory exists if provided
    subcategory = None
    if data.get('sousCategorie') and data.get('sousCategorie').get('id'):
        subcategory = SousCategory.query.get(data.get('sousCategorie').get('id'))
        if not subcategory:
            return jsonify({'message': 'Subcategory not found'}), 404

    new_service = ServiceCustomer(
        nom=data.get('nom'),
        adresse=data.get('adresse'),
        prix=data.get('prix'),
        disponibilite=data.get('disponibilite'),
        description=data.get('description'),
        sousCategorie=subcategory
    )

    db.session.add(new_service)
    db.session.commit()

    return jsonify(new_service.to_dict()), 201

@service_bp.route('', methods=['PUT'])
@jwt_required()
def update_service():
    """Update an existing service."""
    data = request.get_json()

    if not data or not data.get('id'):
        return jsonify({'message': 'Missing service ID'}), 400

    service = ServiceCustomer.query.get(data.get('id'))

    if not service:
        return jsonify({'message': 'Service not found'}), 404

    # Update fields if provided
    if data.get('nom'):
        service.nom = data.get('nom')
    if data.get('adresse') is not None:
        service.adresse = data.get('adresse')
    if data.get('prix') is not None:
        service.prix = data.get('prix')
    if data.get('disponibilite') is not None:
        service.disponibilite = data.get('disponibilite')
    if data.get('description') is not None:
        service.description = data.get('description')

    # Update subcategory if provided
    if data.get('sousCategorie') and data.get('sousCategorie').get('id'):
        subcategory = SousCategory.query.get(data.get('sousCategorie').get('id'))
        if not subcategory:
            return jsonify({'message': 'Subcategory not found'}), 404
        service.sousCategorie = subcategory

    db.session.commit()

    return jsonify(service.to_dict()), 200

@service_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_service(id):
    """Delete a service by ID."""
    service = ServiceCustomer.query.get(id)

    if not service:
        return jsonify({'message': 'Service not found'}), 404

    db.session.delete(service)
    db.session.commit()

    return jsonify({'message': 'Service deleted successfully'}), 200

@service_bp.route('/total', methods=['GET'])
def get_total_services():
    """Get the total number of services."""
    total = ServiceCustomer.query.count()
    return jsonify(total), 200
