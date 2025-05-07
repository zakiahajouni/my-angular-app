from app import db
from app.models.base import Base
from sqlalchemy import Column, String, Integer, ForeignKey, Float
from sqlalchemy.orm import relationship

class Feedback(Base):
    """Feedback model for customer feedback on services."""

    __tablename__ = 'feedbacks'

    note = Column(Float, nullable=False)  # Rating from 1 to 5
    commentaire = Column(String(1000))
    nom_client = Column(String(100))
    service_id = Column(Integer, ForeignKey('services.id'), nullable=False)

    # Relationships
    service = relationship('ServiceCustomer', back_populates='feedbacks')

    def to_dict(self):
        """Convert model instance to dictionary."""
        data = super().to_dict()
        # Include basic service information
        if self.service:
            data['service'] = {
                'id': self.service.id,
                'nom': self.service.nom
            }
        return data
