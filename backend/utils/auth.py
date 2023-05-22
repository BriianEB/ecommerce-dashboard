import jwt
from datetime import datetime, timedelta, timezone
from flask import abort, current_app, request
from functools import wraps
from werkzeug.exceptions import Unauthorized


def generate_access_token(data):
    secret = current_app.config['SECRET_KEY']
    exp_time = datetime.now(tz=timezone.utc) + timedelta(seconds=5)
    payload = { 'exp': exp_time }
    payload.update(data)

    token = jwt.encode(
        payload,
        secret,
        algorithm='HS256'
    )

    return {
        'token': token,
        'exp_time': exp_time
    }

def generate_refresh_token(data):
    secret = current_app.config['SECRET_KEY']
    exp_time = datetime.now(tz=timezone.utc) + timedelta(days=15)
    payload = { 'exp': exp_time }
    payload.update(data)

    token = jwt.encode(
        payload,
        secret,
        algorithm='HS256'
    )

    return {
        'token': token,
        'exp_time': exp_time
    }

def is_token_valid(token):
    secret = current_app.config['SECRET_KEY']

    try:
        data = jwt.decode(token, secret, algorithms=['HS256'])
    except:
        return False

    return True

def decode_token(token):
    secret = current_app.config['SECRET_KEY']

    try:
        data = jwt.decode(token, secret, algorithms=['HS256'])
    except:
        return None

    return data

def auth_required(f):
    """Decorador para indicar que una ruta requiere autorización."""
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth = request.headers.get('Authorization')

        if not auth:
            raise Unauthorized()

        token = auth.split()[1]

        if not is_token_valid(token):
            raise Unauthorized()

        return f(*args, **kwargs)

    return wrapper
