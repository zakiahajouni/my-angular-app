from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.demande import Demande
from app.models.service import ServiceCustomer
from app import db

demande_bp = Blueprint('demandes', __name__)

@demande_bp.route('', methods=['GET'])
@jwt_required()
def get_all_demandes():
    """Get all demandes."""
    demandes = Demande.query.all()
    return jsonify([demande.to_dict() for demande in demandes]), 200

@demande_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_demande_by_id(id):
    """Get a demande by ID."""
    demande = Demande.query.get(id)

    if not demande:
        return jsonify({'message': 'Demande not found'}), 404

    return jsonify(demande.to_dict()), 200

@demande_bp.route('', methods=['POST'])
def add_demande():
    """Add a new demande. This endpoint is public to allow customers to submit requests."""
    data = request.get_json()

    if not data or not data.get('clientName') or not data.get('phoneNumber') or not data.get('email'):
        return jsonify({'message': 'Missing required fields'}), 400

    # Check if service exists if provided
    service = None
    if data.get('serviceClient') and data.get('serviceClient').get('id'):
        service = ServiceCustomer.query.get(data.get('serviceClient').get('id'))
        if not service:
            return jsonify({'message': 'Service not found'}), 404

    new_demande = Demande(
        date=data.get('date'),
        adresse=data.get('adresse'),
        noteSupplementaire=data.get('noteSupplementaire'),
        clientName=data.get('clientName'),
        phoneNumber=data.get('phoneNumber'),
        email=data.get('email'),
        status='pending',  # Default status
        serviceClient=service
    )

    db.session.add(new_demande)
    db.session.commit()

    return jsonify({'message': 'Demande submitted successfully'}), 201

@demande_bp.route('', methods=['PUT'])
@jwt_required()
def update_demande():
    """Update an existing demande."""
    data = request.get_json()

    if not data or not data.get('id'):
        return jsonify({'message': 'Missing demande ID'}), 400

    demande = Demande.query.get(data.get('id'))

    if not demande:
        return jsonify({'message': 'Demande not found'}), 404

    # Update fields if provided
    if data.get('date'):
        demande.date = data.get('date')
    if data.get('adresse') is not None:
        demande.adresse = data.get('adresse')
    if data.get('noteSupplementaire') is not None:
        demande.noteSupplementaire = data.get('noteSupplementaire')
    if data.get('clientName'):
        demande.clientName = data.get('clientName')
    if data.get('phoneNumber'):
        demande.phoneNumber = data.get('phoneNumber')
    if data.get('email'):
        demande.email = data.get('email')
    if data.get('status'):
        demande.status = data.get('status')

    # Update service if provided
    if data.get('serviceClient') and data.get('serviceClient').get('id'):
        service = ServiceCustomer.query.get(data.get('serviceClient').get('id'))
        if not service:
            return jsonify({'message': 'Service not found'}), 404
        demande.serviceClient = service

    db.session.commit()

    return jsonify(demande.to_dict()), 200

@demande_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_demande(id):
    """Delete a demande by ID."""
    demande = Demande.query.get(id)

    if not demande:
        return jsonify({'message': 'Demande not found'}), 404

    db.session.delete(demande)
    db.session.commit()

    return jsonify({'message': 'Demande deleted successfully'}), 200

@demande_bp.route('/<int:id>/accepter', methods=['PUT'])
@jwt_required()
def accepter_demande(id):
    """Accept a demande."""
    demande = Demande.query.get(id)

    if not demande:
        return jsonify({'message': 'Demande not found'}), 404

    demande.status = 'accepted'
    db.session.commit()

    return jsonify({'message': 'Demande accepted successfully'}), 200

@demande_bp.route('/<int:id>/refuser', methods=['PUT'])
@jwt_required()
def refuser_demande(id):
    """Refuse a demande."""
    demande = Demande.query.get(id)

    if not demande:
        return jsonify({'message': 'Demande not found'}), 404

    demande.status = 'refused'
    db.session.commit()

    return jsonify({'message': 'Demande refused successfully'}), 200

@demande_bp.route('/<int:id>/annuler', methods=['PUT'])
@jwt_required()
def annuler_demande(id):
    """Cancel a demande."""
    demande = Demande.query.get(id)

    if not demande:
        return jsonify({'message': 'Demande not found'}), 404

    demande.status = 'cancelled'
    db.session.commit()

    return jsonify({'message': 'Demande cancelled successfully'}), 200

@demande_bp.route('/status-distribution', methods=['GET'])
@jwt_required()
def get_status_distribution():
    """Get the distribution of demandes by status."""
    statuses = ['pending', 'accepted', 'refused', 'cancelled']
    distribution = {}

    for status in statuses:
        count = Demande.query.filter_by(status=status).count()
        distribution[status] = count

    return jsonify(distribution), 200

@demande_bp.route('/top-services', methods=['GET'])
@jwt_required()
def get_top_services():
    """Get the top services by number of demandes."""
    # This is a simplified implementation
    # In a real application, you would use a more efficient SQL query
    demandes = Demande.query.all()
    service_counts = {}

    for demande in demandes:
        if demande.serviceClient:
            service_id = demande.serviceClient.id
            service_name = demande.serviceClient.nom
            key = f"{service_id}:{service_name}"
            if key in service_counts:
                service_counts[key] += 1
            else:
                service_counts[key] = 1

    # Convert to format expected by frontend
    result = {}
    for key, count in service_counts.items():
        service_name = key.split(':', 1)[1]
        result[service_name] = count

    return jsonify(result), 200
