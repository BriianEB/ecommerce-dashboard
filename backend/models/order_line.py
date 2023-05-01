from database import db
from utils import validation


class OrderLine(db.Model):
    __tablename__ = 'order_lines'

    id = db.mapped_column(db.Integer, primary_key=True)
    quantity = db.mapped_column(db.Float)
    total = db.mapped_column(db.Float)
    order_id = db.mapped_column(db.Integer, db.ForeignKey('orders.id', ondelete='CASCADE'))
    product_id = db.mapped_column(db.Integer, db.ForeignKey('products.id', ondelete='CASCADE'))    
    order = db.relationship('Order', back_populates='order_lines')
    product = db.relationship('Product', back_populates='order_lines')

    validations = {
        'quantity': [validation.required()],
        'total': [validation.required()],
        'product': [validation.required()]        
    }

    def to_dict(self):
        return {
            'id': self.id,
            'quantity': self.quantity,
            'total': self.total,
            'product': self.product.to_dict(),
            'order': self.order.id
        }