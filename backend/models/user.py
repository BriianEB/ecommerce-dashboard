import jwt
from datetime import datetime, timedelta, timezone
from flask import current_app
from werkzeug.security import generate_password_hash, check_password_hash

from database import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.mapped_column(db.Integer, primary_key=True)
    email = db.mapped_column(db.String(64), unique=True, index=True)
    password_hash = db.mapped_column(db.String(128))

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_auth_token(self, expiration=3600):
        secret = current_app.config['SECRET_KEY']
        exp_time = datetime.now(tz=timezone.utc) + timedelta(seconds=expiration)

        return jwt.encode(
            {'email': self.email, 'exp': exp_time},
            secret,
            algorithm='HS256'
        )

    def to_dict(self):
        return {
            'email': self.email
        }