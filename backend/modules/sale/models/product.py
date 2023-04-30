from database import db


class Product(db.Model):
    id = db.mapped_column(db.Integer, primary_key=True)
    name = db.mapped_column(db.String(64))
    price = db.mapped_column(db.Float)
    order_lines = db.relationship('OrderLine', back_populates='product')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price
        }