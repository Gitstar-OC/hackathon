def find_alternatives(df, query_item):
    # Convert the query to lowercase for case-insensitive matching
    query_item = query_item.lower()

    # Print the query item for debugging
    print(f"Searching for: {query_item}")

    # Get the row corresponding to the food item searched
    item_row = df[df['Entity'].str.lower() == query_item]
    
    # Print the result of the query
    print(f"Item row found: {item_row}")

    # If the item is not found, return None
    if item_row.empty:
        return None, None

    # Extract the carbon footprint for the searched item (per kg emissions)
    item_footprint = item_row['Emissions per kilogram'].values[0]

    # Find alternatives with a lower carbon footprint
    alternatives = df[df['Emissions per kilogram'] < item_footprint].sort_values('Emissions per kilogram')

    return item_footprint, alternatives[['Entity', 'Emissions per kilogram', 'Emissions per 100 grams of protein', 'Emissions per 100 grams of fat']].to_dict(orient='records')
