from flask import Flask
from routes import create_routes  # Updated import
from flask_cors import CORS
from flask_caching import Cache
from data import load_data  # Import your data loading function here

# Initialize the Flask app
app = Flask(__name__)

# Allow CORS only from your frontend URL
CORS(app, resources={r"/api/*": {"origins": "https://nova-hacks.vercel.app"}})

# Configure caching (simple in-memory cache)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

# Load and cache the data during app startup
df = load_data()  # Load your data here
cache.set('carbon_data', df)

# Register the routes, and pass the cache to routes
routes = create_routes(cache)
app.register_blueprint(routes, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
