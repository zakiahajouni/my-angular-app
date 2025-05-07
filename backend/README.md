# CommunAid Backend

This is the Flask backend for the CommunAid application. It provides RESTful API endpoints to serve the Angular frontend.

## Project Structure

```
backend/
├── app/
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── seeders/        # Database seeders
│   ├── __init__.py     # Flask application factory
│   └── config.py       # Application configuration
├── .env                # Environment variables
├── requirements.txt    # Python dependencies
└── app.py              # Application entry point
```

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- MySQL 5.7 or higher
- pip (Python package manager)

### Installation

1. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

2. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   Create a `.env` file in the backend directory with the following content:
   ```
   FLASK_APP=app.py
   FLASK_ENV=development
   SECRET_KEY=your_secret_key
   DATABASE_URI=mysql+pymysql://username:password@localhost/communaid
   JWT_SECRET_KEY=your_jwt_secret_key
   ```
   Replace `username`, `password`, and other values with your actual database credentials.

5. Create the MySQL database:
   ```sql
   CREATE DATABASE communaid CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

### Running the Application

1. Start the Flask development server:
   ```bash
   flask run
   ```
   The API will be available at http://localhost:5000

### Database Seeding

To populate the database with initial data:

1. Run the seeder script:
   ```bash
   python -m app.seeders.seeder
   ```

This will create:
- Admin user (email: admin@communaid.com, password: admin123)
- Regular user (email: user@communaid.com, password: user123)
- Categories, subcategories, professionals, services, demandes, and feedbacks

## API Endpoints

### Authentication
- `POST /auth/authenticate` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile

### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Add new category (requires authentication)
- `PUT /categories` - Update category (requires authentication)
- `DELETE /categories/:id` - Delete category (requires authentication)
- `GET /categories/total` - Get total number of categories

### Subcategories
- `GET /sousCategories` - Get all subcategories
- `GET /sousCategories/:id` - Get subcategory by ID
- `POST /sousCategories` - Add new subcategory (requires authentication)
- `PUT /sousCategories` - Update subcategory (requires authentication)
- `DELETE /sousCategories/:id` - Delete subcategory (requires authentication)
- `GET /sousCategories/total` - Get total number of subcategories

### Professionals
- `GET /professionnels` - Get all professionals
- `GET /professionnels/:id` - Get professional by ID
- `POST /professionnels` - Add new professional (requires authentication)
- `PUT /professionnels` - Update professional (requires authentication)
- `DELETE /professionnels/:id` - Delete professional (requires authentication)
- `GET /professionnels/total` - Get total number of professionals

### Services
- `GET /services` - Get all services
- `GET /services/:id` - Get service by ID
- `POST /services` - Add new service (requires authentication)
- `PUT /services` - Update service (requires authentication)
- `DELETE /services/:id` - Delete service (requires authentication)
- `GET /services/total` - Get total number of services

### Demandes (Service Requests)
- `GET /demandes` - Get all demandes (requires authentication)
- `GET /demandes/:id` - Get demande by ID (requires authentication)
- `POST /demandes` - Add new demande (public endpoint)
- `PUT /demandes` - Update demande (requires authentication)
- `DELETE /demandes/:id` - Delete demande (requires authentication)
- `PUT /demandes/:id/accepter` - Accept demande (requires authentication)
- `PUT /demandes/:id/refuser` - Refuse demande (requires authentication)
- `PUT /demandes/:id/annuler` - Cancel demande (requires authentication)
- `GET /demandes/status-distribution` - Get distribution by status (requires authentication)
- `GET /demandes/top-services` - Get top services by number of demandes (requires authentication)

### Feedbacks
- `GET /feedbacks` - Get all feedbacks
- `GET /feedbacks/service/:service_id` - Get feedbacks by service ID
- `POST /feedbacks` - Add new feedback (public endpoint)
- `DELETE /feedbacks/:id` - Delete feedback (requires authentication)
- `GET /feedbacks/average/:service_id` - Get average note by service ID
- `GET /feedbacks/total/:service_id` - Get total number of feedbacks by service ID
