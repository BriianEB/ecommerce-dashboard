from flask import Blueprint, request
from werkzeug.exceptions import NotFound

from database import db
from models import Order, OrderLine, Product
from utils import validation
from utils.auth import auth_required


orders = Blueprint('orders', __name__)

@orders.route('/orders')
@auth_required
def index():
    orders = db.session.scalars(db.select(Order)).all()

    return [order.to_dict() for order in orders]

@orders.route('/orders', methods=['POST'])
@auth_required
def create():
    data = request.get_json()

    errors = validation.validate(Order.validations, data)

    if errors:
        raise ValidationError({'fields': errors})

    order = Order()
    total = 0

    for line in data['order_lines']:
        total += line['total']
        product = db.session.scalar(db.select(Product).filter_by(id=line['product']))
        order.order_lines.add(OrderLine(
            product=product,
            quantity=line['quantity'],
            total=line['total'],            
        ))

    order.total = total
    
    db.session.add(order)
    db.session.commit()

    return order.to_dict()

@orders.route('/orders/<id>')
@auth_required
def show(id):
    order = db.sesion.scalar(db.select(Order).filter_by(id=id))

    if order is None:
        raise NotFound()

    return order.to_dict()

@orders.route('/orders/<id>', methods=['PATCH'])
@auth_required
def update(id):    
    order = db.session.scalar(db.select(Order).filter_by(id=id))

    if order is None:
        raise NotFound()

    data = request.get_json()

    order.order_lines.delete()
    total = 0

    for line in data['order_lines']:
        total += line['total']
        product = db.session.scalar(db.select(Product).filter_by(id=line['product']))
        order.order_lines.add(OrderLine(
            product=product,
            quantity=line['quantity'],
            total=line['total']
        ))

    order.total = total
    
    db.session.add(order)
    db.session.commit()

    return order.to_dict()

@orders.route('/orders/<id>', methods=['DELETE'])
@auth_required
def destroy(id):
    order = db.session.scalar(db.select(Order).filter_by(id=id))

    if order is None:
        raise NotFound()

    db.session.delete(order)
    db.session.commit()

    return 'Order deleted.'
    