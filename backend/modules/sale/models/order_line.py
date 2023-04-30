from database import db


class OrderLine(db.Model):
    __tablename__ = 'order_lines'

    id = db.mapped_column(db.Integer, primary_key=True)
    quantity = db.mapped_column(db.Float)
    total = db.mapped_column(db.Float)
    product_id = db.mapped_column(db.ForeignKey('products.id'))
    order_id = db.mapped_column(db.ForeignKey('orders.id'))
    product = db.relationship('Product', back_populates='order_lines')
    order = db.relationship('Order', back_populates='order_lines')

    def to_dict(self):
        return {
            'id': self.id,
            'quantity': self.quantity,
            'total': self.total,
            'product': self.product.to_dict(),
            'order': self.order.id
        }