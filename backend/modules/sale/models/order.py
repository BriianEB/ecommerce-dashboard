from database import db


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.mapped_column(db.Integer, primary_key=True)    
    quantity = db.mapped_column(db.Float)
    total = db.mapped_column(db.Float)
    order_lines = db.relationship('OrderLine', back_populates='order')

    def to_dict(self):
        return {
            'id': self.id,
            'quantity': self.quantity,
            'total': self.total,
            'order_lines': [line.to_dict() for line in self.order_lines]
        }