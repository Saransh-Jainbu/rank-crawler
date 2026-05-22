import shutil
import os
import json

print("\n" + "="*60)
print("📦 Setting up IIT Rankings Browser")
print("="*60 + "\n")

# Create public directory if it doesn't exist
os.makedirs('public', exist_ok=True)

# Copy data file
src = 'iit_rankings_gender_neutral_20260522_100203.json'
dst = 'public/data.json'

print(f"📋 Copying {src} to {dst}...")

try:
    shutil.copy(src, dst)
    
    # Verify the copy
    if os.path.exists(dst):
        size_kb = os.path.getsize(dst) / 1024
        print(f"✅ File copied successfully ({size_kb:.2f} KB)")
    else:
        print("❌ Copy failed!")
        exit(1)
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)

print("\n" + "="*60)
print("✅ Setup complete!")
print("="*60)
print("\n🚀 Next steps:")
print("   1. npm install")
print("   2. npm run dev")
print("\n📦 To build for production:")
print("   npm run build && npm start")
print("\n🚀 To deploy on Vercel:")
print("   - Push to GitHub")
print("   - Connect repo to Vercel dashboard")
print("   - Click 'Deploy'")
print()
