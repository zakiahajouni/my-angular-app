from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.feedback import Feedback
from app.models.service import ServiceCustomer
from app import db

feedback_bp = Blueprint('feedbacks', __name__)

@feedback_bp.route('', methods=['GET'])
def get_all_feedbacks():
    """Get all feedbacks."""
    feedbacks = Feedback.query.all()
    return jsonify([feedback.to_dict() for feedback in feedbacks]), 200

@feedback_bp.route('/service/<int:service_id>', methods=['GET'])
def get_feedbacks_by_service_id(service_id):
    """Get feedbacks by service ID."""
    service = ServiceCustomer.query.get(service_id)

    if not service:
        return jsonify({'message': 'Service not found'}), 404

    feedbacks = Feedback.query.filter_by(service_id=service_id).all()
    return jsonify([feedback.to_dict() for feedback in feedbacks]), 200

@feedback_bp.route('', methods=['POST'])
def add_feedback():
    """Add a new feedback. This endpoint is public to allow customers to submit feedback."""
    data = request.get_json()

    if not data or not data.get('note') or not data.get('service_id'):
        return jsonify({'message': 'Missing required fields'}), 400

    # Check if service exists
    service = ServiceCustomer.query.get(data.get('service_id'))
    if not service:
        return jsonify({'message': 'Service not found'}), 404

    new_feedback = Feedback(
        note=data.get('note'),
        commentaire=data.get('commentaire'),
        nom_client=data.get('nom_client'),
        service_id=data.get('service_id')
    )

    db.session.add(new_feedback)
    db.session.commit()

    return jsonify({'message': 'Feedback submitted successfully'}), 201

@feedback_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_feedback(id):
    """Delete a feedback by ID."""
    feedback = Feedback.query.get(id)

    if not feedback:
        return jsonify({'message': 'Feedback not found'}), 404

    db.session.delete(feedback)
    db.session.commit()

    return jsonify({'message': 'Feedback deleted successfully'}), 200

@feedback_bp.route('/average/<int:service_id>', methods=['GET'])
def get_average_note_by_service_id(service_id):
    """Get the average note by service ID."""
    service = ServiceCustomer.query.get(service_id)

    if not service:
        return jsonify({'message': 'Service not found'}), 404

    feedbacks = Feedback.query.filter_by(service_id=service_id).all()

    if not feedbacks:
        return jsonify(0), 200  # Return 0 if no feedbacks

    total_note = sum(feedback.note for feedback in feedbacks)
    average_note = total_note / len(feedbacks)

    return jsonify(average_note), 200

@feedback_bp.route('/total/<int:service_id>', methods=['GET'])
def get_total_feedbacks_by_service_id(service_id):
    """Get the total number of feedbacks by service ID."""
    service = ServiceCustomer.query.get(service_id)

    if not service:
        return jsonify({'message': 'Service not found'}), 404

    total = Feedback.query.filter_by(service_id=service_id).count()
    return jsonify(total), 200
