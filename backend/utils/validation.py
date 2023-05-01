import re


def required():
    return lambda value: 'Debes llenar este campo.' if value == '' else False

def email():
    return lambda value: 'Ingresa un email válido.' if re.search('[\w-]+@[\w]+\.[\w]+', value) == None else False

def phone():
    return lambda value: 'Ingresa un número de teléfono válido.' if re.search('^[\d-]+$', value) == None else False

def length(length):
    return lambda value: f'Ingresa un valor de exactamente {length} caracteres.' if len(value) != length else False

def validate(validations, data):
    errors = {}

    for field, field_validations in validations.items():
        for validation in field_validations:
            if not field in data:
                errors.update({field: 'Falta este campo.'})
                break

            error = validation(data[field])

            if error:
                errors.update({field: error})
                break

    return errors
