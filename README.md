# 🎓 IIT Rankings Browser - Next.js

A modern, responsive web application to browse IIT rankings across all 6 JoSAA counseling rounds. Built with Next.js and TailwindCSS for optimal performance and beautiful UI.

**🚀 Deploy to Vercel in 1 click!**

---

## ✨ Features

- 🔍 **Smart Search** - Autocomplete search for any IIT
- 📊 **All 6 Rounds** - View complete ranking data for all counseling rounds
- 🌿 **Gender-Neutral Only** - Filtered data for gender-neutral seats
- 📱 **Fully Responsive** - Perfect on desktop, tablet, and mobile
- ⚡ **Lightning Fast** - Optimized with Next.js and TailwindCSS
- 🎨 **Modern Design** - Beautiful gradients and smooth animations

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Local Development (2 minutes)

1. **Setup data file**
```bash
# Windows:
python setup.py

# Or:
setup.bat

# macOS/Linux:
bash setup.sh
```

2. **Install & run**
```bash
npm install
npm run dev
```

3. **Open browser**
```
http://localhost:3000
```

---

## 📦 Deploy to Vercel (Recommended)

### Method 1: Using Vercel CLI (Fastest - 30 seconds)

```bash
npm install -g vercel
vercel
```

Done! Your site is live! 🎉

### Method 2: GitHub + Vercel Dashboard

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "IIT Rankings App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/iit-rankings.git
git push -u origin main
```

2. **Go to https://vercel.com/new**

3. **Select your GitHub repo**

4. **Click Deploy**

Your site will be at: `iit-rankings-xxxxx.vercel.app`

### Method 3: Other Platforms

- **Netlify**: Similar to Vercel, just connect GitHub repo
- **Railway.app**: Full-stack friendly
- **Render**: Good alternative to Vercel

---

## 📁 Project Structure

```
.
├── pages/
│   ├── _app.js              # Global app wrapper
│   └── index.js             # Main page
├── components/
│   ├── SearchBar.js         # Search component
│   ├── BranchTable.js       # Rankings table
│   └── Stats.js             # Stats cards
├── styles/
│   └── globals.css          # TailwindCSS styles
├── public/
│   └── data.json            # Rankings data (auto-generated)
├── setup.py / setup.bat     # Setup scripts
├── package.json             # Dependencies
├── next.config.js           # Next.js config
└── tailwind.config.js       # TailwindCSS config
```

---

## 📊 Data

The crawler generates:
- CSV files: `iit_rankings_gender_neutral_*.csv`
- JSON files: `iit_rankings_gender_neutral_*.json`

---

## 🎯 How to Use the Website

1. **Search**: Type an IIT name in the search box
   - Examples: "Mumbai", "Delhi", "Bombay", "Kanpur", "Madras"

2. **View Results**: See all branches and their ranks for each round

3. **Data Shown**:
   - Round number (1-6)
   - Quota type (AI, HS, OS, etc.)
   - Seat type (OPEN)
   - Opening rank
   - Closing rank

---

## 🔧 Configuration

### Change Data Source

To use different ranking data:

1. Replace `iit_rankings_gender_neutral_20260522_100203.json` with your file
2. Run setup:
```bash
python setup.py
```

### Customize Colors

Edit `styles/globals.css` to change the purple/blue gradient theme.

---

## 📝 Environment Setup (Optional)

Create `.env.local`:
```env
NEXT_PUBLIC_APP_TITLE=IIT Rankings Browser
```

---

## 🌐 Browser Support

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

---

## ⚡ Performance

- Optimized images & assets
- Code splitting & lazy loading
- Mobile-first responsive design
- Fast initial page load

---

## 📱 Mobile Friendly

The website is fully responsive and works great on:
- Phones (iPhone, Android)
- Tablets (iPad, etc.)
- Desktops

---

## 🚀 Deployment Checklist

Before deploying:

- [ ] Run `npm run build` locally (no errors)
- [ ] Test `npm start` (production build works)
- [ ] Verify data file exists in `public/data.json`
- [ ] Check all pages load in browser

---

## 📧 Troubleshooting

### `npm install` fails
```bash
# Clear npm cache
npm cache clean --force
npm install
```

### Data not showing
```bash
# Make sure setup was run
python setup.py

# Check if public/data.json exists
ls public/
```

### Local dev server not starting
```bash
# Kill existing process
Ctrl + C

# Try again with verbose logging
npm run dev -- -v
```

---

## 🎨 Customization

### Change Color Scheme
Edit `tailwind.config.js`:
```js
theme: {
  colors: {
    primary: '#667eea',  // Change primary color
    secondary: '#764ba2',  // Change secondary color
  }
}
```

### Add More Data
Simply replace the JSON file and run setup again!

---

## 🚢 Production Deployment

### Vercel (Recommended)
- Automatic deployments on push
- Free SSL/TLS
- CDN globally distributed
- 1-click rollbacks

### Other Options
- **Netlify**: `netlify deploy`
- **Railway**: Connect GitHub repo
- **Render**: Similar to Railway
- **AWS Amplify**: For enterprise

---

## 💡 Tips & Tricks

1. **Use keyboard shortcuts**
   - Type to search
   - Arrow keys to navigate
   - Enter to select

2. **Bookmark the site**
   - Save your most-used IITs
   - Share the link with friends

3. **Mobile tip**
   - Use in landscape for better table view

---

## 📄 License

Open source and free to use!

---

## 🙏 Credits

- Built with **Next.js**
- Styled with **TailwindCSS**
- Deployed on **Vercel**
- Data from **JOSAA**

---

**Ready to deploy? Just run `vercel` or push to GitHub!** 🚀

3. **Change delays**: Modify the `time.sleep()` values (in seconds) - currently minimized for speed

## Troubleshooting

### ChromeDriver errors
- Download the correct version matching your Chrome browser
- Place it in project directory or add to PATH

### No data extracted
- Check if the website structure has changed
- Verify dropdown IDs match the current website
- Try increasing `time.sleep()` durations

### Connection errors
- Check internet connection
- Website may have rate limiting - increase delays
- Try running at different times

## Legal Notice

Use this crawler responsibly and in accordance with JOSAA website's terms of service.
