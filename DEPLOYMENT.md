# 🚀 Deployment Guide - IIT Rankings Browser

## Quick Deployment (Choose One)

### Option 1: Vercel CLI (Fastest - 30 seconds)

```bash
# Install Vercel CLI (one time)
npm install -g vercel

# Deploy
cd "c:\Users\saran\OneDrive\Desktop\rank crawler"
vercel

# Follow the prompts and your site is live!
```

**Result:** Your site will be at `iit-rankings-xxxxx.vercel.app`

---

### Option 2: GitHub → Vercel (Easiest for updates)

#### Step 1: Create GitHub Repository

```bash
cd "c:\Users\saran\OneDrive\Desktop\rank crawler"

git init
git add .
git commit -m "IIT Rankings Browser - Next.js App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/iit-rankings.git
git push -u origin main
```

#### Step 2: Deploy on Vercel

1. Go to https://vercel.com/new
2. Click "Continue with GitHub"
3. Authorize Vercel to access your repositories
4. Select `iit-rankings` repository
5. Click **Deploy**

Done! 🎉

**Benefits:**
- Automatic deployments on every push
- Free SSL/TLS certificate
- Global CDN
- Easy rollbacks

---

### Option 3: Other Platforms

#### Netlify
```bash
npm run build
netlify deploy --prod --dir=.next
```

#### Railway.app
1. Go to https://railway.app
2. Click "New Project"
3. Select "GitHub Repo"
4. Select your repo
5. Click "Deploy"

#### Render.com
1. Go to https://render.com
2. Click "New +"
3. Select "Web Service"
4. Connect GitHub
5. Configure and deploy

---

## Pre-Deployment Checklist

Before deploying, run locally to verify:

```bash
# Install dependencies
npm install

# Test development server
npm run dev

# Open http://localhost:3000 and test search

# Build for production
npm run build

# Test production build
npm start
```

All should work without errors! ✅

---

## Environment Variables (Optional)

Create `.env.local` if you want custom settings:

```env
NEXT_PUBLIC_APP_TITLE=IIT Rankings Browser
NEXT_PUBLIC_APP_DESCRIPTION=Gender-Neutral Rankings
```

These will be available in your app as:
```javascript
process.env.NEXT_PUBLIC_APP_TITLE
```

---

## File Structure

The deployment includes:

```
├── pages/                    # React pages
├── components/               # React components
├── styles/                   # TailwindCSS styles
├── public/
│   └── data.json            # Rankings data (auto-generated)
├── package.json             # Dependencies
├── next.config.js           # Next.js config
├── tailwind.config.js       # TailwindCSS config
└── vercel.json              # Vercel settings
```

---

## Troubleshooting

### Build Fails on Vercel

1. Check that `public/data.json` exists locally
2. Run `npm run build` locally to replicate error
3. Push fix to GitHub
4. Vercel will auto-rebuild

### Data Not Showing

- Verify `public/data.json` exists
- Check file size (should be ~700KB)
- Run setup.py locally again

### Site is Slow

- Check Vercel Analytics dashboard
- Ensure data.json is being cached
- Consider enabling image optimization

---

## Custom Domain (Optional)

### Add Custom Domain to Vercel

1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain (e.g., `iit-rankings.com`)
4. Update DNS settings with your domain provider
5. Verify domain

**DNS Records to Add:**
```
Type: CNAME
Name: www
Value: cname.vercel.com
```

---

## Database/CMS (Advanced)

To add admin panel for updating rankings:

```bash
npm install firebase
# or
npm install mongoose
```

Then create an admin page in `pages/admin.js`

---

## Monitoring & Analytics

### Enable Vercel Analytics

1. Vercel Project → Settings → Analytics
2. Copy paste code (optional - automatic with next/analytics)
3. Check insights dashboard

### Monitor Performance

```bash
npm run build -- --analyze
```

---

## Updates & Maintenance

### Update Data

1. Regenerate CSV/JSON using the crawler
2. Replace `iit_rankings_gender_neutral_*.json`
3. Run `python setup.py`
4. Push to GitHub
5. Vercel auto-deploys! 🚀

### Update Code

1. Make changes locally
2. Test with `npm run dev`
3. Push to GitHub
4. Vercel auto-deploys

---

## Rollback (Undo Deployment)

On Vercel Dashboard:
1. Go to Deployments
2. Click the deployment you want
3. Click "Promote to Production"

---

## Scaling & Performance

### Optimize for Production

Already included in `next.config.js`:
- Image optimization
- Code splitting
- CSS minification
- Auto compression

### CDN Caching

Vercel automatically:
- Caches static files globally
- Serves from nearest edge location
- Updates automatically on deploy

---

## Security

✅ HTTPS enabled by default
✅ No sensitive data in code
✅ Environment variables protected
✅ Automatic security headers

---

## Cost

### Vercel Free Plan Includes:
- ✅ Unlimited deploys
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ 100GB/month bandwidth
- ✅ Custom domains
- ✅ Fast builds

**No credit card required!**

---

## Next Steps

1. **Deploy Now**: Choose Option 1, 2, or 3 above
2. **Test**: Visit your live site
3. **Share**: Send link to friends
4. **Monitor**: Check Vercel analytics

---

## Support & Help

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: Use your repo issues page

---

**Deployed! 🎉 Your site is now live on the internet!**
