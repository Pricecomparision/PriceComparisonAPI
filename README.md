# PriceComparisonAPI

PriceComparisonAPI is a RESTful API designed for comparing prices of products from various sources.

## Features

- Retrieve product information from different vendors.
- Compare prices for specific products.
- Search for products based on various criteria.

## Technologies Used

- Django: Python web framework for backend development.
- Sqllite3: Database management system for storing product and vendor information.
- Django REST Framework: Toolkit for building Web APIs in Django.
- Bootstrap: Frontend framework for designing responsive and modern web interfaces.

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.6+
- SQLite3

### Steps to Install and Run

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Pricecomparision/PriceComparisonAPI.git
   cd PriceComparisonAPI
   
2. ** Set up a virtual environment:
   
   # For Unix/macOS
   python3 -m venv env
    source env/bin/activate 

   # For Windows.
    python -m venv env
   .\env\Scripts\activate

3. **Install dependencies:**
    pip install -r requirements.txt
   
4. ** Set up the database: **
     python manage.py makemigrations
     python manage.py migrate

5. **Start the development server: **
     python manage.py runserver
   
6. **Access the API:**
    Open your web browser and go to http://localhost:8000/api to view the API.
   
   
