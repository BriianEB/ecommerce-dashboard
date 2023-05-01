from database import db
from utils import validation


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.mapped_column(db.Integer, primary_key=True)    
    total = db.mapped_column(db.Float)
    order_lines = db.relationship('OrderLine', back_populates='order', cascade='all, delete-orphan', passive_deletes=True, lazy='write_only')

    validations = {
        'order_lines': [validation.required()]
    }

    def to_dict(self):
        return {
            'id': self.id,
            'total': self.total,
            'order_lines': [line.to_dict() for line in db.session.scalars(self.order_lines.select()).all()]
        }