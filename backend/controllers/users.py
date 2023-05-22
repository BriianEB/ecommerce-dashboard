from flask import Blueprint, request
from werkzeug.exceptions import NotFound

from database import db
from exceptions import ValidationError
from models import User
from utils import validation
from utils.auth import auth_required


users = Blueprint('users', __name__)

@users.route('/users')
@auth_required
def index():
    users = db.session.scalars(db.select(User)).all()

    return [user.to_dict() for user in users]

@users.route('/users', methods=['POST'])
@auth_required
def create():
    data = request.get_json()

    errors = validation.validate(User.validations, data)

    if errors:
        raise ValidationError({'fields': errors})

    user = User(
        email=data['email'],
        password=data['password']
    )

    db.session.add(user)
    db.session.commit()

    return user.to_dict()


@users.route('/users/<id>')
@auth_required
def show(id):
    user = db.session.scalar(db.select(User).filter_by(id=id))

    if user is None:
        raise NotFound()

    return user.to_dict()

@users.route('/users/<id>', methods=['PATCH'])
@auth_required
def update(id):
    data = request.get_json()

    user = db.session.scalar(db.select(User).filter_by(id=id))

    if user is None:
        raise NotFound()

    user.email = data.get('email', user.email)

    db.session.add(user)
    db.session.commit()

    return user.to_dict()

@users.route('/users/<id>', methods=['DELETE'])
@auth_required
def destroy(id):
    user = db.session.scalar(db.select(User).filter_by(id=id))

    db.session.delete(user)
    db.session.commit()

    return 'user deleted'