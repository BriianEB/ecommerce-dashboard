from flask import Blueprint, request

from database import db
from exceptions import ValidationError
from models import User


auth = Blueprint('auth', __name__)

@auth.route('/auth/signup', methods=['POST'])
def sign_up():
    data = request.get_json()

    email = data['email']
    password = data['password']

    user = db.session.scalar(db.select(User).filter_by(email=email))
    if user is not None:
        raise ValidationError({'fields': {'email': 'Email exists already.'}})

    user = User(
        email=email,
        password=password
    )

    db.session.add(user)
    db.session.commit()

    auth_token = user.generate_auth_token()

    return {
        'message': 'User created',
        'user': user.to_dict(),
        'token': auth_token
    }

@auth.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = db.session.scalar(db.select(User).filter_by(email=email))    

    if not user.verify_password(password):
        raise ValidationError({'error': 'Invalid credentials.'})

    auth_token = user.generate_auth_token()

    return {
        'token': auth_token
    }
