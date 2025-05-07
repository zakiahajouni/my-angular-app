from app import db
from app.models.base import Base
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

class Professional(Base):
    """Professional model for service providers."""

    __tablename__ = 'professionals'

    nomComplet = Column(String(100), nullable=False)
    telephone = Column(Integer)
    adresse = Column(String(255))
    experience = Column(String(100))
    certification = Column(String(255))
    description = Column(String(1000))
    sous_categorie_id = Column(Integer, ForeignKey('sous_categories.id'))

    # Relationships
    sousCategorie = relationship('SousCategory', back_populates='professionals')

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
        return data
