class APIError(Exception):
    status_code = 400

    def __init__(self, name, message, status_code=None, data=None):
        super().__init__()
        self.message = message
        self.name = name

        if status_code is not None:
            self.status_code = status_code

        self.data = data

    def to_dict(self):
        error = dict(self.data or ())
        error['code'] = self.status_code
        error['name'] = self.name
        error['message'] = self.message

        return error


class ValidationError(APIError):
    def __init__(self, data=None):
        super().__init__('Bad Request', 'There were validation errors.', 400, data)
