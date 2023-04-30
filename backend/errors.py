from flask import json, jsonify
from werkzeug.exceptions import HTTPException, NotFound

from exceptions import ValidationError


def handle_exception(e):
    """Devuelve JSON en vez de HTML para todos los errores HTTP."""

    response = e.get_response()

    response.data = json.dumps({
        'code': e.code,
        'name': e.name,
        'message': e.description,
    })

    response.content_type = 'application/json'

    return response

def resource_not_found(e):
    """Sobreescribe el manejador del error 404."""

    response = e.get_response()

    response.data = json.dumps({
        'code': e.code,
        'name': 'Resource Not Found',
        'message': 'The specified resource does not exist.',
    })

    response.content_type = 'application/json'

    return response

def validation_error(e):
    return jsonify(e.to_dict()), e.status_code


def register_errors_handlers(app):
    app.register_error_handler(HTTPException, handle_exception)
    app.register_error_handler(NotFound, resource_not_found)
    app.register_error_handler(ValidationError, validation_error)
