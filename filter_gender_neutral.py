import pandas as pd
import json
from datetime import datetime

# Read the CSV
df = pd.read_csv('iit_rankings_20260522_100013.csv')

print(f"Original data: {len(df)} records")
print(f"Gender distribution:\n{df['Gender'].value_counts()}\n")

# Keep only Gender-Neutral
df_filtered = df[df['Gender'] == 'Gender-Neutral'].reset_index(drop=True)

print(f"Filtered data: {len(df_filtered)} records (removed {len(df) - len(df_filtered)} female-only records)")

# Generate new timestamp
ts = datetime.now().strftime("%Y%m%d_%H%M%S")

# Save CSV
csv_file = f"iit_rankings_gender_neutral_{ts}.csv"
df_filtered.to_csv(csv_file, index=False, encoding='utf-8')
print(f"\n✓ Saved: {csv_file}")

# Save JSON
json_file = f"iit_rankings_gender_neutral_{ts}.json"
with open(json_file, 'w', encoding='utf-8') as f:
    json.dump(df_filtered.to_dict(orient='records'), f, indent=2)
print(f"✓ Saved: {json_file}")

# Show summary
print(f"\nRecords per round (Gender-Neutral only):")
for r in sorted(df_filtered['Round'].unique()):
    count = len(df_filtered[df_filtered['Round'] == r])
    print(f"  Round {r}: {count} records")
