import os
import sys
import random
from datetime import datetime, timedelta
from faker import Faker
from app import create_app, db
from app.models.user import User
from app.models.category import Category
from app.models.subcategory import SousCategory
from app.models.professional import Professional
from app.models.service import ServiceCustomer
from app.models.demande import Demande
from app.models.feedback import Feedback

# Initialize Faker
fake = Faker()

def seed_users():
    """Seed users table with admin and regular users."""
    print("Seeding users...")

    # Create admin user
    admin = User(
        email="admin@communaid.com",
        role="admin"
    )
    admin.set_password("admin123")

    # Create regular user
    user = User(
        email="user@communaid.com",
        role="user"
    )
    user.set_password("user123")

    db.session.add(admin)
    db.session.add(user)
    db.session.commit()

    print(f"Created {User.query.count()} users")

def seed_categories():
    """Seed categories table."""
    print("Seeding categories...")

    categories = [
        {"nom": "Plumbing", "description": "All plumbing services"},
        {"nom": "Electrical", "description": "Electrical installation and repair services"},
        {"nom": "Cleaning", "description": "Home and office cleaning services"},
        {"nom": "Gardening", "description": "Garden maintenance and landscaping"},
        {"nom": "Carpentry", "description": "Woodworking and furniture repair"}
    ]

    for category_data in categories:
        category = Category(**category_data)
        db.session.add(category)

    db.session.commit()

    print(f"Created {Category.query.count()} categories")
    return Category.query.all()

def seed_subcategories(categories):
    """Seed subcategories table."""
    print("Seeding subcategories...")

    subcategories_data = {
        "Plumbing": [
            {"nom": "Pipe Repair", "description": "Fixing leaky pipes and installations"},
            {"nom": "Drain Cleaning", "description": "Unclogging drains and sewers"},
            {"nom": "Fixture Installation", "description": "Installing sinks, toilets, and faucets"}
        ],
        "Electrical": [
            {"nom": "Wiring", "description": "Electrical wiring and rewiring"},
            {"nom": "Lighting", "description": "Light fixture installation and repair"},
            {"nom": "Appliance Installation", "description": "Installing electrical appliances"}
        ],
        "Cleaning": [
            {"nom": "House Cleaning", "description": "General house cleaning services"},
            {"nom": "Office Cleaning", "description": "Commercial office cleaning"},
            {"nom": "Deep Cleaning", "description": "Thorough cleaning of specific areas"}
        ],
        "Gardening": [
            {"nom": "Lawn Mowing", "description": "Regular lawn maintenance"},
            {"nom": "Landscaping", "description": "Garden design and implementation"},
            {"nom": "Tree Trimming", "description": "Pruning and trimming trees and shrubs"}
        ],
        "Carpentry": [
            {"nom": "Furniture Repair", "description": "Fixing broken furniture"},
            {"nom": "Custom Woodworking", "description": "Creating custom wooden items"},
            {"nom": "Cabinet Installation", "description": "Installing kitchen and bathroom cabinets"}
        ]
    }

    for category in categories:
        if category.nom in subcategories_data:
            for subcat_data in subcategories_data[category.nom]:
                subcategory = SousCategory(
                    nom=subcat_data["nom"],
                    description=subcat_data["description"],
                    categorie=category
                )
                db.session.add(subcategory)

    db.session.commit()

    print(f"Created {SousCategory.query.count()} subcategories")
    return SousCategory.query.all()

def seed_professionals(subcategories):
    """Seed professionals table."""
    print("Seeding professionals...")

    for _ in range(20):
        subcategory = random.choice(subcategories)
        professional = Professional(
            nomComplet=fake.name(),
            telephone=int(fake.numerify(text="##########")),
            adresse=fake.address(),
            experience=f"{random.randint(1, 20)} years",
            certification=fake.sentence(),
            description=fake.paragraph(),
            sousCategorie=subcategory
        )
        db.session.add(professional)

    db.session.commit()

    print(f"Created {Professional.query.count()} professionals")

def seed_services(subcategories):
    """Seed services table."""
    print("Seeding services...")

    for subcategory in subcategories:
        for _ in range(random.randint(2, 5)):
            service = ServiceCustomer(
                nom=fake.catch_phrase(),
                adresse=fake.address(),
                prix=f"${random.randint(20, 200)}",
                disponibilite=random.choice(["Weekdays", "Weekends", "24/7", "By appointment"]),
                description=fake.paragraph(),
                sousCategorie=subcategory
            )
            db.session.add(service)

    db.session.commit()

    print(f"Created {ServiceCustomer.query.count()} services")
    return ServiceCustomer.query.all()

def seed_demandes(services):
    """Seed demandes table."""
    print("Seeding demandes...")

    statuses = ["pending", "accepted", "refused", "cancelled"]

    for _ in range(50):
        service = random.choice(services)
        status = random.choice(statuses)
        date = fake.date_time_between(start_date="-30d", end_date="+30d")

        demande = Demande(
            date=date.strftime("%Y-%m-%d %H:%M:%S"),
            adresse=fake.address(),
            noteSupplementaire=fake.paragraph(),
            clientName=fake.name(),
            phoneNumber=fake.numerify(text="##########"),
            email=fake.email(),
            status=status,
            serviceClient=service
        )
        db.session.add(demande)

    db.session.commit()

    print(f"Created {Demande.query.count()} demandes")

def seed_feedbacks(services):
    """Seed feedbacks table."""
    print("Seeding feedbacks...")

    for service in services:
        # Add between 0 and 10 feedbacks per service
        for _ in range(random.randint(0, 10)):
            feedback = Feedback(
                note=random.randint(1, 5),
                commentaire=fake.paragraph(),
                nom_client=fake.name(),
                service_id=service.id
            )
            db.session.add(feedback)

    db.session.commit()

    print(f"Created {Feedback.query.count()} feedbacks")

def run_seeders():
    """Run all seeders."""
    # Create the Flask app context
    app = create_app()

    with app.app_context():
        # Drop all tables and recreate them
        db.drop_all()
        db.create_all()

        # Run seeders
        seed_users()
        categories = seed_categories()
        subcategories = seed_subcategories(categories)
        seed_professionals(subcategories)
        services = seed_services(subcategories)
        seed_demandes(services)
        seed_feedbacks(services)

        print("Database seeding completed successfully!")

if __name__ == "__main__":
    run_seeders()
