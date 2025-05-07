from app import db
from app.models.base import Base
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

class Category(Base):
    """Category model for service categories."""

    __tablename__ = 'categories'

    nom = Column(String(100), nullable=False)
    description = Column(String(500))

    # Relationships
    sous_categories = relationship('SousCategory', back_populates='categorie', cascade='all, delete-orphan')

    def to_dict(self):
        """Convert model instance to dictionary."""
        data = super().to_dict()
        # Don't include sous_categories by default to avoid circular references
        return data

    def to_dict_with_subcategories(self):
        """Convert model instance to dictionary including subcategories."""
        data = self.to_dict()
        data['sousCategories'] = [sc.to_dict() for sc in self.sous_categories]
        return data
