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
    page = int(request.args.get('page', 1))
    items_per_page = int(request.args.get('items_per_page', 10))

    # Check if a search query is provided
    if not query_item:
        return jsonify({"error": "No item provided"}), 400

    # Find the alternatives using the updated search function
    item_footprint, paginated_alternatives, total_items = find_alternatives(df, query_item, page, items_per_page)

    # If the item is not found, return an error
    if item_footprint is None:
        return jsonify({"error": "Item not found"}), 404

    # Return the carbon footprint and paginated alternatives with additional info
    return jsonify({
        "searched_item": query_item,
        "carbon_footprint": item_footprint,
        "alternatives": paginated_alternatives,
        "total_items": total_items,
        "page": page,
        "items_per_page": items_per_page
    })

