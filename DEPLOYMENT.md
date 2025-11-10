# Cloudflare Pages Deployment Guide

## Automatic Deployment via Git

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to Pages
   - Click "Create a project"
   - Connect your GitHub repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
     - **Node version**: `18` (automatically detected from .node-version)

3. **Deploy**:
   - Click "Save and Deploy"
   - Cloudflare will build and deploy automatically
   - Every push to main will trigger a new deployment

## Manual Deployment via Wrangler

1. **Install Wrangler CLI**:
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**:
   ```bash
   wrangler login
   ```

3. **Deploy**:
   ```bash
   npm run build
   wrangler pages deploy dist --project-name=breakbreath
   ```

## Performance Features

### Edge Caching
- Global CDN with edge caching via Cloudflare
- Custom cache headers in `_headers` file:
  - HTML: 1 hour cache with revalidation
  - JS/CSS: 1 year immutable cache
  - JSON: 24 hour cache with revalidation
  - Service Worker: No cache (always fresh)

### PWA & Offline Support
- Service Worker caches core assets for offline use
- Precaches: HTML, manifest, i18n files
- Runtime caching for visited pages
- Automatic update detection

### Performance Optimizations
- Preconnect to Google Fonts
- Preload critical i18n resources
- Lazy-loaded fonts with print media trick
- Service Worker registered on load event
- Minified HTML/CSS/JS via Vite

### Security Headers
Configured in `_headers`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- X-XSS-Protection enabled

## Environment Variables

No environment variables are required for basic deployment. The app runs entirely client-side.

## Custom Domain

1. Add custom domain in Cloudflare Pages settings
2. Cloudflare will provision SSL certificate automatically
3. Update DNS records as instructed

## Monitoring

- View analytics in Cloudflare Dashboard
- Monitor Core Web Vitals
- Track deployment history
- Review build logs

## Troubleshooting

**Build fails**: Ensure Node 18+ is used (check .node-version file)

**Service Worker not working**: Check browser console, ensure HTTPS is used

**i18n files not loading**: Verify files are in `public/i18n/` before build
