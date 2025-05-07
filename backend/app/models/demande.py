from app import db
from app.models.base import Base
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

class Demande(Base):
    """Demande model for service requests from customers."""

    __tablename__ = 'demandes'

    date = Column(String(50))
    adresse = Column(String(255))
    noteSupplementaire = Column(String(1000))
    clientName = Column(String(100), nullable=False)
    phoneNumber = Column(String(20), nullable=False)
    email = Column(String(100), nullable=False)
    status = Column(String(20), default='pending')  # pending, accepted, refused, cancelled
    service_id = Column(Integer, ForeignKey('services.id'))

    # Relationships
    serviceClient = relationship('ServiceCustomer', back_populates='demandes')

    def to_dict(self):
        """Convert model instance to dictionary."""
        data = super().to_dict()
        # Include service information
        if self.serviceClient:
            data['serviceClient'] = {
                'id': self.serviceClient.id,
                'nom': self.serviceClient.nom
            }
            # Include subcategory information if available
            if self.serviceClient.sousCategorie:
                data['serviceClient']['sousCategorie'] = {
                    'id': self.serviceClient.sousCategorie.id,
                    'nom': self.serviceClient.sousCategorie.nom
                }
                # Include category information if available
                if self.serviceClient.sousCategorie.categorie:
                    data['serviceClient']['sousCategorie']['categorie'] = {
                        'id': self.serviceClient.sousCategorie.categorie.id,
                        'nom': self.serviceClient.sousCategorie.categorie.nom
                    }
        return data
