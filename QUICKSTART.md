# 🎓 IIT Rankings Browser - Quick Start Guide

## What You Have

A **Next.js web application** to search and view IIT rankings across all 6 JoSAA counseling rounds.

### Tech Stack
- **Frontend**: React + Next.js
- **Styling**: TailwindCSS
- **Deployment**: Vercel (free, instant)
- **Data**: Gender-Neutral seats only

---

## 1️⃣ Local Testing (Optional but Recommended)

Test the app on your computer before deploying:

```bash
# Navigate to project folder
cd "c:\Users\saran\OneDrive\Desktop\rank crawler"

# Install dependencies (one time, 2 minutes)
npm install

# Start dev server
npm run dev

# Open in browser: http://localhost:3000
```

Search for "Mumbai" or "Delhi" to test! 🔍

---

## 2️⃣ Deploy to Vercel (1 Click)

### Simplest Way: Vercel CLI

```bash
# Install globally (one time)
npm install -g vercel

# Deploy!
vercel

# Follow the prompts
# Your site will be LIVE in 30 seconds!
```

**Your URL:** `https://iit-rankings-xxxxx.vercel.app`

---

### Or: GitHub → Vercel

If you want automatic deployments on every code change:

```bash
# Push to GitHub
git init
git add .
git commit -m "IIT Rankings App"
git remote add origin https://github.com/YOUR_USERNAME/iit-rankings.git
git push origin main

# Then go to https://vercel.com/new
# Connect your GitHub repo
# Click Deploy
```

---

## 3️⃣ Share Your Site!

Once deployed, your site is live at a URL like:
```
https://iit-rankings-xxxxx.vercel.app
```

Share this with friends! They can search any IIT and see all rankings. 📱💻

---

## How It Works

### Architecture

```
┌─────────────────────────────────────┐
│  Browser (Your User's Computer)     │
│  - Searches for IIT                 │
│  - Displays rankings                │
└─────────────────────────────────────┘
         ↓              ↑
   Display Results  Fetch Results
         ↓              ↑
┌─────────────────────────────────────┐
│  Vercel (Cloud Server)              │
│  - Runs the website                 │
│  - Serves data.json file            │
│  - Free, fast, global!              │
└─────────────────────────────────────┘
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `pages/index.js` | Main search page |
| `components/*.js` | Reusable UI components |
| `public/data.json` | All 1,818 ranking records |
| `styles/globals.css` | Beautiful styling |
| `package.json` | Project dependencies |

---

## 🔄 Updating Rankings

To use new ranking data:

1. Get new CSV/JSON file from the crawler
2. Run `python setup.py` to copy to `public/data.json`
3. Push to GitHub (if using GitHub)
4. Vercel auto-deploys! 🚀

---

## ✨ Features Included

✅ **Search** - Find any IIT instantly
✅ **All Rounds** - View all 6 counseling rounds
✅ **Mobile Ready** - Works on phone/tablet/desktop
✅ **Fast** - Optimized for speed
✅ **Modern Design** - Beautiful UI with gradients
✅ **Free** - No credit card needed
✅ **Scalable** - Handle thousands of users

---

## 🎨 Customization

### Change Colors

Edit `styles/globals.css`:
```css
/* Change this gradient */
body {
  @apply bg-gradient-to-br from-gray-50 to-gray-100;
}
```

### Change Title

Edit `pages/index.js`:
```javascript
<h1 className="text-5xl font-bold">Your Custom Title</h1>
```

### Change Data

Edit `public/data.json` or regenerate from crawler

---

## 📊 Data Format

Each ranking record has:
- Round (1-6)
- Institute name
- Branch/Program
- Quota type
- Opening rank
- Closing rank

Example:
```json
{
  "Round": 1,
  "Institute": "IIT Mumbai",
  "Academic Program Name": "CSE",
  "Quota": "AI",
  "Opening Rank": 100,
  "Closing Rank": 500
}
```

---

## 🐛 Troubleshooting

### "npm not found"
- Install Node.js from https://nodejs.org
- Restart terminal/PowerShell

### "Build failed on Vercel"
- Run `npm run build` locally to check error
- Fix error
- Push to GitHub
- Vercel auto-retries

### "Data not showing"
- Check `npm run dev` works locally
- Verify `public/data.json` exists
- Run `python setup.py` again

---

## 📚 Learn More

- **Next.js**: https://nextjs.org/learn
- **TailwindCSS**: https://tailwindcss.com/docs
- **Vercel**: https://vercel.com/docs

---

## 🚀 Ready?

Pick one of these to deploy:

### 30 Seconds (Vercel CLI)
```bash
npm install -g vercel
vercel
```

### 2 Minutes (GitHub + Vercel)
```bash
git init
git add .
git commit -m "App"
git remote add origin https://github.com/YOU/iit-rankings
git push origin main
# Then vercel.com/new → select repo → Deploy
```

### Free, Fast, Global CDN ✅

**Your site will be live in minutes!**

---

## 💡 Pro Tips

1. **Bookmark your site** - Easy access later
2. **Share with friends** - Send the live URL
3. **Use mobile** - Try on phone to verify responsive
4. **Check analytics** - Vercel shows visitor stats
5. **Update data** - Regenerate from crawler anytime

---

## 🎉 You're All Set!

You now have:
- ✅ Modern Next.js web app
- ✅ Beautiful UI with TailwindCSS
- ✅ 1,818 IIT ranking records
- ✅ Ready to deploy globally
- ✅ Free hosting with Vercel

**Next: Run `npm install && npm run dev` to test locally!**

---

Questions? Check DEPLOYMENT.md for detailed deployment guide.
