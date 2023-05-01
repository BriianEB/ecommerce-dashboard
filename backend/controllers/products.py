from flask import Blueprint, request
from werkzeug.exceptions import NotFound

from database import db
from exceptions import ValidationError
from models import Product
from utils import validation


products = Blueprint('products', __name__)

@products.route('/products')
def index():
    products = db.session.scalars(db.select(Product)).all()

    return [product.to_dict() for product in products]

@products.route('/products', methods=['POST'])
def create():
    data = request.get_json()

    errors = validation.validate(Product.validations, data)

    if errors:
        raise ValidationError({'fields': errors})

    product = Product(
        name=data['name'],
        price=data['price']
    )

    db.session.add(product)
    db.session.commit()

    return product.to_dict()

@products.route('/products/<id>')
def show(id):
    product = db.session.scalar(db.select(Product).filter_by(id=id))

    if product is None:
        raise NotFound()

    return product.to_dict()

@products.route('/products/<id>', methods=['PATCH'])
def update(id):
    data = request.get_json()

    product = db.session.scalar(db.select(Product).filter_by(id=id))

    if product is None:
        raise NotFound()

    errors = validation.validate(Product.validations, data)

    if errors:
        raise ValidationError({'fields': errors})

    product.name = data.get('name', product.name)
    product.price = data.get('price', product.price)

    db.session.add(product)
    db.session.commit()

    return product.to_dict()

@products.route('/products/<id>', methods=['DELETE'])
def destroy(id):
    product = db.session.scalar(db.select(Product).filter_by(id=id))

    if product is None:
        raise NotFound()

    db.session.delete(product)
    db.session.commit()

    return 'Product deleted.'

