from app import db
from app.models.base import Base
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship

class SousCategory(Base):
    """Subcategory model for service subcategories."""

    __tablename__ = 'sous_categories'

    nom = Column(String(100), nullable=False)
    description = Column(String(500))
    categorie_id = Column(Integer, ForeignKey('categories.id'), nullable=False)

    # Relationships
    categorie = relationship('Category', back_populates='sous_categories')
    professionals = relationship('Professional', back_populates='sousCategorie', cascade='all, delete-orphan')
    services = relationship('ServiceCustomer', back_populates='sousCategorie', cascade='all, delete-orphan')

    def to_dict(self):
        """Convert model instance to dictionary."""
        data = super().to_dict()
        # Include category information
        if self.categorie:
            data['categorie'] = {
                'id': self.categorie.id,
                'nom': self.categorie.nom
            }
        # Don't include professionals and services by default to avoid circular references
        return data

    def to_dict_with_professionals(self):
        """Convert model instance to dictionary including professionals."""
        data = self.to_dict()
        data['professionals'] = [p.to_dict() for p in self.professionals]
        return data

    def to_dict_with_services(self):
        """Convert model instance to dictionary including services."""
        data = self.to_dict()
        data['services'] = [s.to_dict() for s in self.services]
        return data
