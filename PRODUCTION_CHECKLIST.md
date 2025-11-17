# Production Deployment Checklist

## Pre-Deployment

### 1. Replace Placeholder Icons
- [ ] Replace `icon.svg` with your branded icon
- [ ] Generate `icon-192.png` (192x192px)
- [ ] Generate `icon-512.png` (512x512px)
- [ ] Generate `apple-touch-icon.png` (180x180 minimum, recommend 512x512)
- [ ] (Optional) Create `favicon.ico`

**Tools to convert SVG to PNG:**
- https://cloudconvert.com/svg-to-png
- ImageMagick: `convert icon.svg -resize 192x192 icon-192.png`
- Or hire a designer for professional icons

### 2. Update Branding
- [ ] Update app name in `manifest.json` if needed
- [ ] Update theme colors in `manifest.json` and `index.html` `<meta name="theme-color">`
- [ ] Review description in `manifest.json`

### 3. Build & Test Locally
```bash
npm run build
npm run preview
```
- [ ] Visit http://localhost:4173
- [ ] Test offline mode (DevTools → Network → Offline)
- [ ] Check PWA manifest (DevTools → Application → Manifest)
- [ ] Verify service worker (DevTools → Application → Service Workers)

## Cloudflare Pages Deployment

### Option A: Git Integration (Recommended)

1. **Initialize Git & Push to GitHub**
```bash
git init
git add .
git commit -m "Initial production deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

2. **Connect to Cloudflare Pages**
- Go to https://dash.cloudflare.com/
- Navigate to **Pages** → **Create a project**
- Click **Connect to Git** → Select your repository
- Configure build settings:
  - **Framework preset**: None or Vite
  - **Build command**: `npm run build`
  - **Build output directory**: `dist`
  - **Node version**: 18 or higher (auto-detected)
- Click **Save and Deploy**

3. **Monitor First Deployment**
- Watch the build logs
- Verify deployment succeeds
- Visit the `.pages.dev` URL

### Option B: Manual Deploy via Wrangler CLI

1. **Install Wrangler**
```bash
npm install -g wrangler
```

2. **Login to Cloudflare**
```bash
wrangler login
```

3. **Create Project & Deploy**
```bash
npm run build
wrangler pages project create breakbreath
wrangler pages deploy dist --project-name=breakbreath
```

## Post-Deployment Configuration

### 1. Custom Domain (Optional)
- [ ] Go to Pages → Your Project → **Custom domains**
- [ ] Click **Set up a custom domain**
- [ ] Enter your domain (e.g., `breakbreath.app`)
- [ ] If DNS on Cloudflare: automatic setup (orange cloud = proxied)
- [ ] If external DNS: follow CNAME instructions
- [ ] Wait for SSL certificate (usually < 5 minutes)

### 2. Cloudflare Settings to Enable
- [ ] **Brotli compression**: On (Cloudflare Dashboard → Speed → Optimization)
- [ ] **HTTP/3 with QUIC**: On (Network → HTTP/3)
- [ ] **0-RTT Connection Resumption**: On (Network → 0-RTT)
- [ ] **Always Use HTTPS**: On (SSL/TLS → Edge Certificates)
- [ ] **Automatic HTTPS Rewrites**: On (SSL/TLS → Edge Certificates)
- [ ] **Minimum TLS Version**: 1.2 or higher (SSL/TLS → Edge Certificates)

### 3. SSL/TLS Configuration
- [ ] Go to **SSL/TLS** → **Overview**
- [ ] Set encryption mode to **Full (strict)**
- [ ] Enable **HSTS** in SSL/TLS → Edge Certificates:
  - Max Age: 31536000 (1 year)
  - Include subdomains: Yes
  - Preload: Yes
  - No-Sniff: Yes

### 4. Security Headers Verification
Your `_headers` file already includes:
- ✅ Strict-Transport-Security with preload
- ✅ Content-Security-Policy
- ✅ X-Content-Type-Options
- ✅ X-Frame-Options
- ✅ Referrer-Policy
- ✅ Permissions-Policy

Test headers: https://securityheaders.com/

### 5. Optional: Submit to HSTS Preload List
After HSTS is stable for 2+ weeks:
- [ ] Visit https://hstspreload.org/
- [ ] Enter your domain
- [ ] Submit for inclusion in browser preload lists

## Testing Post-Deployment

### Desktop Testing
- [ ] Visit your production URL
- [ ] Check SSL padlock in browser
- [ ] Open DevTools → **Application** → **Manifest**: no errors
- [ ] Open DevTools → **Application** → **Service Workers**: "Activated and is running"
- [ ] Toggle **Network → Offline** → refresh: app still works
- [ ] Install PWA (Chrome → Install app in menu)
- [ ] Launch installed app: runs standalone
- [ ] Run Lighthouse audit: should score 90+ on PWA

### Mobile Testing
- [ ] **iOS Safari**: Add to Home Screen → launch → verify standalone mode
- [ ] **Android Chrome**: Install prompt appears → install → verify standalone
- [ ] Test offline functionality on mobile
- [ ] Check responsive design at various screen sizes

### Performance Testing
- [ ] Run Lighthouse performance audit (target 90+)
- [ ] Check Core Web Vitals in Cloudflare Analytics
- [ ] Test page load speed: https://www.webpagetest.org/

### Security Testing
- [ ] https://securityheaders.com/ (should score A or A+)
- [ ] https://observatory.mozilla.org/ (verify headers)
- [ ] Check mixed content warnings (none should exist)

## Monitoring Setup (Optional)

### Analytics
- [ ] **Cloudflare Web Analytics** (privacy-first, free)
  - Pages → Your Project → Analytics → Enable
- [ ] **Alternative**: Plausible, Fathom, or Simple Analytics
  - If using external analytics, update CSP in `_headers`

### Error Tracking (Optional)
- [ ] Set up Sentry or similar
- [ ] Add Sentry DSN to CSP `connect-src` in `_headers`

### Uptime Monitoring (Optional)
- [ ] Better Stack (betterstack.com)
- [ ] UptimeRobot (uptimerobot.com)
- [ ] Pingdom
- [ ] Set up alerts for downtime

## Continuous Deployment

If using Git integration with Cloudflare Pages:
- [x] Every push to `main` triggers automatic deployment
- [x] Pull requests get preview deployments
- [ ] Set up branch protection on `main`
- [ ] Require PR reviews before merging

## Pre-Production Smoke Test

Run through this checklist after deployment:

1. **SSL & Domain**
   - [ ] https://yourdomain.com loads
   - [ ] Certificate is valid and trusted
   - [ ] HTTP redirects to HTTPS

2. **PWA Functionality**
   - [ ] Manifest loads without errors
   - [ ] Service worker activates
   - [ ] App installs successfully
   - [ ] Offline mode works

3. **Core Features**
   - [ ] Timer starts and counts down
   - [ ] Exercise completion works
   - [ ] Streak tracking increments
   - [ ] Undo functionality works
   - [ ] Notifications work (if enabled)
   - [ ] Settings persist

4. **Performance**
   - [ ] Page loads in < 3 seconds
   - [ ] No console errors
   - [ ] Images/icons load correctly
   - [ ] Smooth animations

5. **Cross-Browser**
   - [ ] Chrome/Edge (Chromium)
   - [ ] Safari (macOS/iOS)
   - [ ] Firefox

## Rollback Plan

If issues occur in production:

### Via Git
```bash
git revert HEAD
git push origin main
# Cloudflare auto-deploys the rollback
```

### Via Wrangler
```bash
# Check deployment history
wrangler pages deployment list --project-name=breakbreath

# Rollback to previous deployment
wrangler pages deployment tail <PREVIOUS_DEPLOYMENT_ID>
```

### Via Cloudflare Dashboard
- Pages → Your Project → Deployments
- Find previous working deployment
- Click **...** → **Rollback to this deployment**

## Ongoing Maintenance

- [ ] Bump `CACHE_NAME` in `sw.js` when deploying updates
- [ ] Test before each deployment
- [ ] Monitor Cloudflare Analytics weekly
- [ ] Review error logs if available
- [ ] Update dependencies quarterly: `npm outdated`

## Cost Expectations

**Cloudflare Pages Free Tier:**
- 500 builds/month
- Unlimited bandwidth
- Unlimited requests
- Sufficient for most personal/small business apps

**You only pay if you exceed free tier or add:**
- Workers (serverless functions)
- KV storage
- R2 object storage
- High volume traffic (rare to hit limits)

## Support Resources

- Cloudflare Pages Docs: https://developers.cloudflare.com/pages/
- Cloudflare Community: https://community.cloudflare.com/
- PWA Docs: https://web.dev/progressive-web-apps/
- Web.dev Best Practices: https://web.dev/
