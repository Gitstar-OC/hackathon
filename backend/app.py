from flask import Flask
from routes import routes
from flask_cors import CORS

# Initialize the Flask app
app = Flask(__name__)
CORS(app)

# Register the routes
app.register_blueprint(routes, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)