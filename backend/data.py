import pandas as pd

def load_data():
    # Load the CSV file containing food footprint data
    carbon_data = pd.read_csv('machine-learning/food-footprints.csv')

    # Print first few rows of data for debugging
    print(carbon_data[['Entity', 'Emissions per kilogram']].head())

    # Return the full dataframe for further use
    return carbon_data
