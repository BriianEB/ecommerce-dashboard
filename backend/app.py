import os
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate

from config import config
from database import db
from errors import register_errors_handlers

from controllers import auth, users, orders, products
from models import User, Order, OrderLine, Product


basedir = os.path.abspath(os.path.dirname(__file__))

migrate = Migrate()

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    db.init_app(app)
    cors = CORS(app, resources={r'*': {'origins': '*'}})
    migrate.init_app(app, db, directory=os.path.join(basedir, 'database/migrations'))

    app.register_blueprint(auth)
    app.register_blueprint(users)
    app.register_blueprint(orders)
    app.register_blueprint(products)

    register_errors_handlers(app)

    return app

app = create_app(os.environ.get('APP_ENV'))

# shell context
@app.shell_context_processor
def make_shell_context():
    return dict(db=db, User=User, Order=Order, OrderLine=OrderLine, Product=Product)
