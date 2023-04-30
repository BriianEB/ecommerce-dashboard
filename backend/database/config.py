import os


basedir = os.path.abspath(os.path.dirname(__file__))

def get_database_uri():
    connection = os.environ.get('DB_CONNECTION')
    host = os.environ.get('DB_HOST')
    port = os.environ.get('DB_PORT')
    user = os.environ.get('DB_USERNAME')
    database = os.environ.get('DB_DATABASE')
    password = os.environ.get('DB_PASSWORD')

    url = f'{user}:{password}@{host}:{port}/{database}'

    if connection == 'mysql':
        return 'mysql+pymysql://' + url
    elif connection == 'postgres':
        return 'postgresql://' + url
    elif connection == 'sqlite':
        return 'sqlite:///' + os.path.join(basedir, 'data.db')
