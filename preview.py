import pandas as pd

df = pd.read_csv('iit_rankings_20260522_100013.csv')

print("=== DATA PREVIEW ===")
print(f"Total Records: {len(df)}")
print(f"Columns: {list(df.columns)}")
print(f"\nShape: {df.shape}")

print("\n=== Records per Round ===")
for r in range(1, 7):
    count = len(df[df['Round'] == str(r)])
    print(f"  Round {r}: {count} records")

print("\n=== First 3 Rows ===")
print(df.head(3).to_string())

print("\n=== Data Types ===")
print(df.dtypes)
