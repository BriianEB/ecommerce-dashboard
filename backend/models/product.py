from database import db
from utils import validation


class Product(db.Model):
    __tablename__ = 'products'

    id = db.mapped_column(db.Integer, primary_key=True)
    name = db.mapped_column(db.String(64))
    price = db.mapped_column(db.Float)
    order_lines = db.relationship('OrderLine')

    validations = {
        'name': [validation.required()],
        'price': [validation.required()]
    }

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price
        }