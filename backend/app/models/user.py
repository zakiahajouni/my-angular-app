from app import db
from app.models.base import Base
from sqlalchemy import Column, String, Boolean
from werkzeug.security import generate_password_hash, check_password_hash

class User(Base):
    """User model for authentication and authorization."""

    __tablename__ = 'users'

    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), default='user')  # 'user' or 'admin'
    is_active = Column(Boolean, default=True)

    def set_password(self, password):
        """Set the password hash from a plain text password."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Check if the provided password matches the stored hash."""
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        """Convert model instance to dictionary, excluding sensitive data."""
        data = super().to_dict()
        # Remove sensitive data
        data.pop('password_hash', None)
        return data

    def is_admin(self):
        """Check if the user has admin role."""
        return self.role == 'admin'
