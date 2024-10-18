from flask import Blueprint, request, jsonify
from search import find_alternatives

# Function to create the routes with access to cache
def create_routes(cache):
    routes = Blueprint('routes', __name__)

    # Load cached data during the search
    @routes.route('/search', methods=['GET'])
    def search():
        query_item = request.args.get('item')
        page = int(request.args.get('page', 1))
        items_per_page = int(request.args.get('items_per_page', 10))
        revert = request.args.get('revert', 'false').lower() == 'true'

        # Check if a search query is provided
        if not query_item:
            return jsonify({"error": "No item provided"}), 400

        # Load the cached data
        df = cache.get('carbon_data')

        # Check if the data is available in the cache
        if df is None:
            return jsonify({"error": "Data not found in cache"}), 500

        # Find the alternatives using the updated search function
        item_footprint, alternatives, total_items = find_alternatives(df, query_item)

        # Check if the item was found
        if item_footprint is None:
            return jsonify({"error": "Item not found"}), 404

        # Sort the alternatives based on the revert flag
        if revert:
            alternatives = alternatives[::-1]  # Reverse the list

        # Paginate the sorted alternatives
        start = (page - 1) * items_per_page
        end = start + items_per_page
        paginated_alternatives = alternatives[start:end]

        return jsonify({
            "searched_item": query_item,
            "carbon_footprint": item_footprint,
            "alternatives": paginated_alternatives,
            "total_items": total_items,
            "page": page,
            "items_per_page": items_per_page
        })

    return routes
