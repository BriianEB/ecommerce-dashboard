from flask import Blueprint, request
from werkzeug.exceptions import Unauthorized

from database import db
from exceptions import ValidationError
from models import User
from utils.auth import decode_token, generate_access_token, generate_refresh_token, is_token_valid

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

    access_token = generate_access_token({ 'email': user.email })
    refresh_token = generate_refresh_token({ 'user': user.id })

    return {
        'user': user.to_dict(),
        'access_token': access_token['token'],
        'access_token_exp_time': access_token['exp_time'].timestamp(),
        'refresh_token': refresh_token['token']
    }

@auth.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = db.session.scalar(db.select(User).filter_by(email=email))

    if not User:
        raise ValidationError({'error': 'Invalid credentials.'})

    if not user.verify_password(password):
        raise ValidationError({'error': 'Invalid credentials.'})

    access_token = generate_access_token({ 'email': user.email })
    refresh_token = generate_refresh_token({ 'user': user.id })

    return {
        'user': user.to_dict(),
        'access_token': access_token['token'],
        'access_token_exp_time': access_token['exp_time'].timestamp(),
        'refresh_token': refresh_token['token']
    }

@auth.route('/auth/refresh', methods=['POST'])
def refresh():
    data = request.get_json()

    refresh_token = data.get('refresh_token')

    if refresh_token is None:
        raise Unauthorized()

    payload = decode_token(refresh_token)

    if payload is None:
        raise Unauthorized()
    
    user = db.session.scalar(db.select(User).filter_by(id=payload['user']))
    access_token = generate_access_token({ 'email': user.email })
    refresh_token = generate_refresh_token({ 'user': user.id })

    return {
        'user': user.to_dict(),
        'access_token': access_token['token'],
        'access_token_exp_time': access_token['exp_time'].timestamp(),
        'refresh_token': refresh_token['token']
    }


    

    

    
