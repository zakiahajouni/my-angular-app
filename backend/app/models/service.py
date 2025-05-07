from app import db
from app.models.base import Base
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

class ServiceCustomer(Base):
    """Service model for services offered to customers."""

    __tablename__ = 'services'

    nom = Column(String(100), nullable=False)
    adresse = Column(String(255))
    prix = Column(String(50))
    disponibilite = Column(String(100))
    description = Column(String(1000))
    sous_categorie_id = Column(Integer, ForeignKey('sous_categories.id'))

    # Relationships
    sousCategorie = relationship('SousCategory', back_populates='services')
    demandes = relationship('Demande', back_populates='serviceClient', cascade='all, delete-orphan')
    feedbacks = relationship('Feedback', back_populates='service', cascade='all, delete-orphan')

    def to_dict(self):
        """Convert model instance to dictionary."""
        data = super().to_dict()
        # Include subcategory information
        if self.sousCategorie:
            data['sousCategorie'] = {
                'id': self.sousCategorie.id,
                'nom': self.sousCategorie.nom
            }
            # Include category information if available
            if self.sousCategorie.categorie:
                data['sousCategorie']['categorie'] = {
                    'id': self.sousCategorie.categorie.id,
                    'nom': self.sousCategorie.categorie.nom
                }
        # Don't include demandes and feedbacks by default to avoid circular references
        return data

    def to_dict_with_demandes(self):
        """Convert model instance to dictionary including demandes."""
        data = self.to_dict()
        data['demandes'] = [d.to_dict() for d in self.demandes]
        return data

    def to_dict_with_feedbacks(self):
        """Convert model instance to dictionary including feedbacks."""
        data = self.to_dict()
        data['feedbacks'] = [f.to_dict() for f in self.feedbacks]
        return data
