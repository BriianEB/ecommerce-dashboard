from flask import Blueprint, request

from database import db
from models import User


users = Blueprint('users', __name__)

@users.route('/users')
def index():
    users = db.session.scalars(db.select(User)).all()

    return [user.to_dict() for user in users]

@users.route('/users/<id>')
def show(id):
    user = db.session.scalar(db.select(User).filter_by(id=id))

    return user.to_dict()

@users.route('/users/<id>', methods=['PATCH'])
def update(id):
    data = request.get_json()

    user = db.session.scalar(db.select(User).filter_by(id=id))
    user.email = data.get('email', user.email)

    db.session.add(user)
    db.session.commit()

    return user.to_dict()

@users.route('/users/<id>', methods=['DELETE'])
def destroy(id):
    user = db.session.scalar(db.select(User).filter_by(id=id))

    db.session.delete(user)
    db.session.commit()

    return 'user deleted'