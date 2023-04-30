import jwt
from flask import abort, current_app, request
from functools import wraps

from models import User


def is_token_valid(token):
    secret = current_app.config['SECRET_KEY']

    try:
        data = jwt.decode(token, secret, algorithms=['HS256'])
    except:
        return False

    return True

def auth_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth = request.headers.get('Authorization')

        if not auth:
            abort(401)

        token = auth.split()[1]

        if not is_token_valid(token):
            abort(401)

        return f(*args, **kwargs)

    return wrapper
