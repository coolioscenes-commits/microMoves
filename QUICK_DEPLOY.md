# Quick Deploy Guide

## Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account
- Cloudflare account (free tier is fine)

## Deploy in 5 Minutes

### Step 1: Replace Icons (Optional but Recommended)
```bash
# Place your icon files in public/ directory:
# - icon-192.png (192x192px)
# - icon-512.png (512x512px)
# - apple-touch-icon.png (180x180px+)
```

### Step 2: Build
```bash
npm install
npm run build
```

### Step 3: Deploy to Cloudflare Pages

**Option A: Via GitHub (Automatic Deployments)**
```bash
# Initialize git and push
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

# Then:
# 1. Go to https://dash.cloudflare.com/
# 2. Pages → Create project → Connect to Git
# 3. Select your repo
# 4. Build command: npm run build
# 5. Output directory: dist
# 6. Deploy!
```

**Option B: CLI (Quick Manual Deploy)**
```bash
# Install Wrangler
npm install -g wrangler

# Login
wrangler login

# Deploy
wrangler pages deploy dist --project-name=breakbreath
```

### Step 4: Test
Visit your `.pages.dev` URL and verify:
- App loads
- Offline mode works
- PWA installs

## That's It!

Your app is now live on Cloudflare's global CDN with:
- ✅ HTTPS enabled
- ✅ PWA support
- ✅ Offline functionality
- ✅ Security headers
- ✅ Automatic edge caching

## Add Custom Domain (Optional)
1. Go to Pages → Custom domains
2. Add your domain
3. Follow DNS setup instructions
4. SSL certificate auto-provisions in ~5 minutes

## Deploy Updates
Push to GitHub (auto-deploys) or run:
```bash
npm run build && wrangler pages deploy dist
```

See PRODUCTION_CHECKLIST.md for detailed configuration and testing.
