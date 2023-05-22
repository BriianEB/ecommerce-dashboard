from werkzeug.security import generate_password_hash, check_password_hash

from database import db
from utils import validation


class User(db.Model):
    __tablename__ = 'users'

    id = db.mapped_column(db.Integer, primary_key=True)
    email = db.mapped_column(db.String(64), unique=True, index=True)
    password_hash = db.mapped_column(db.String(128))

    validations = {
        'email': [validation.required(), validation.email()],
        'password': [validation.required()]
    }

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'email': self.email
        }