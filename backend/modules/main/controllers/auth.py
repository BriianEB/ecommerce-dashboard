from flask import Blueprint, request, abort

from db import db
from models import User


auth = Blueprint('auth', __name__)

@auth.route('/auth/signup', methods=['POST'])
def sign_up():
    data = request.get_json()

    email = data['email']
    password = data['password']

    user = db.session.execute(db.select(User).filter_by(email='asd@asd.com')).scalar()

    if user is not None:
        abort(422, description='Email exists already')

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

    try:
        user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one()
    except:
        abort(422, description='Invalid credentials')

    if not user.verify_password(password):
        abort(422, description='Invalid credentials')

    auth_token = user.generate_auth_token()

    return {
        'token': auth_token
    }
