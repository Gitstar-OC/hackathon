from flask import Blueprint, request, jsonify
from data import load_data
from search import find_alternatives

# Create a Blueprint for routes
routes = Blueprint('routes', __name__)

# Load the data when the app starts
df = load_data()

@routes.route('/search', methods=['GET'])
def search():
    query_item = request.args.get('item')
    
    # Check if a search query is provided
    if not query_item:
        return jsonify({"error": "No item provided"}), 400

    # Find the alternatives using the search function
    item_footprint, alternatives = find_alternatives(df, query_item)
    
    # If the item is not found, return an error
    if item_footprint is None:
        return jsonify({"error": "Item not found"}), 404

    # Return the carbon footprint and alternatives
    return jsonify({
        "searched_item": query_item,
        "carbon_footprint": item_footprint,
        "alternatives": alternatives
    })
