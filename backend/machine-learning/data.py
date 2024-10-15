import pandas as pd
import os
print(os.getcwd())

# Load the dataset (replace 'food_environmental_impact.csv' with your actual file name)
carbon_data = pd.read_csv(r'C:/Users/chand/Nova Hacks/backend/machine-learning/food-footprints.csv')

# Display the first few rows to understand the structure
# print(carbon_data.head())
# print(carbon_data.head(25))
# print(carbon_data.shape)

# pd.set_option('display.max_rows', None)  # Show all rows
pd.set_option('display.max_columns', None)  # Show all columns

# print(carbon_data)
print(carbon_data)
# entity_column = carbon_data['Entity']

# Print each entity in the desired format
# for index, entity in enumerate(entity_column):
#     print(f"{index}: {entity}")

# for entity in entity_column:
#     print(f"{entity}")

# Check for missing values
# print(carbon_data.isnull().sum())

# For simplicity, drop rows with missing 'Entity' or 'Emissions per kilogram'
# carbon_data = carbon_data.dropna(subset=['Entity', 'Emissions per kilogram'])

# Convert 'Entity' to lowercase for easier matching
# carbon_data['Entity'] = carbon_data['Entity'].str.lower()
