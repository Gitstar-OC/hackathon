from flask import Flask, request, jsonify
import spacy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the spaCy NLP model
nlp = spacy.load('en_core_web_sm')

# Dummy data for recipes
recipes = [
    {
        'title': 'Vegan Lentil Soup',
        'ingredients': 'lentils, garlic, onions, carrots',
        'instructions': 'Cook the lentils, sauté garlic and onions, mix together.'
    },
    {
        'title': 'Spinach Pasta',
        'ingredients': 'spinach, pasta, garlic',
        'instructions': 'Boil pasta, sauté spinach, mix together with garlic.'
    }
]

# Simple search endpoint
# Simple search endpoint
@app.route('/api/search', methods=['POST'])
def search_recipes():
    data = request.get_json()
    query = data.get('query').lower()  # Convert query to lowercase

    # Apply NLP to find matching recipes based on query
    doc = nlp(query)
    keywords = [token.text.lower() for token in doc if not token.is_stop]  # Convert keywords to lowercase

    matched_recipes = [
        r for r in recipes 
        if any(kw in r['ingredients'].lower() for kw in keywords)  # Convert ingredients to lowercase
    ]

    return jsonify({'recipes': matched_recipes})



# Simple instruction summarization (dummy implementation)
@app.route('/api/summarize', methods=['POST'])
def summarize_instructions():
    data = request.get_json()
    instructions = data.get('instructions')

    # Placeholder for real summarization
    summarized = " ".join(instructions.split()[:5]) + '...'

    return jsonify({'summary': summarized})

if __name__ == '__main__':
    app.run(debug=True)

