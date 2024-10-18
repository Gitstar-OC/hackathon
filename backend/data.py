import pandas as pd

def load_data():
    # Load only the required columns from the CSV
    columns_needed = ['Entity', 'Emissions per kilogram', 'Emissions per 100 grams of protein', 'Emissions per 100 grams of fat']
    
    # Read the specific columns only
    carbon_data = pd.read_csv('machine-learning/food-footprints.csv', usecols=columns_needed)

    # Return the dataframe with the selected columns
    return carbon_data
