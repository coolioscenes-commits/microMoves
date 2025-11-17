# BreakBreath Release Process

## Pre-Release Checklist

### 1. Version Bump
- [ ] Update version in `package.json`
- [ ] Bump `CACHE_NAME` in `public/sw.js` (e.g., `breakbreath-v3`)
- [ ] Bump `RUNTIME_CACHE` in `public/sw.js` (e.g., `breakbreath-runtime-v3`)
- [ ] Update changelog or release notes

### 2. Code Quality
- [ ] All tests passing (if applicable)
- [ ] No console errors in dev environment
- [ ] Code reviewed (if team workflow)
- [ ] Accessibility verified (Lighthouse A11y ≥ 90)

### 3. Build & Test
```bash
# Clean install
rm -rf node_modules package-lock.json dist
npm install

# Build for production
npm run build

# Preview build locally
npm run preview
```

### 4. Smoke Test (5 minutes)
Visit http://localhost:4173 and verify:

**Core Functionality:**
- [ ] Load cold → app renders
- [ ] Start timer → try 60-sec exercise → completion works
- [ ] Streak increments correctly
- [ ] Undo within 30s → counters/log update
- [ ] Toggle Quiet/Seated-only → suggestion changes
- [ ] Download .ics → imports to calendar app
- [ ] Snooze sets → badge shows → resumes after time
- [ ] Widget Mode enters and exits

**PWA:**
- [ ] Service Worker activates (DevTools → Application → Service Workers)
- [ ] Manifest valid (DevTools → Application → Manifest)
- [ ] Install prompt appears (Chrome → Install app)
- [ ] Offline mode works (Network → Offline → refresh)

**Accessibility:**
- [ ] Tab navigation works through all modals
- [ ] Escape key closes modals
- [ ] Screen reader labels present (icon buttons have aria-label)
- [ ] Reduced motion respected (toggle in OS settings)

### 5. Performance Check
```bash
# Run Lighthouse in Chrome DevTools (Incognito mode)
# Targets:
# - Performance: ≥ 90
# - Accessibility: ≥ 90
# - Best Practices: ≥ 90
# - PWA: ✅ Installable
```

## Release Steps

### Option A: Git + Cloudflare Pages (Automatic)

1. **Commit changes**
```bash
git add .
git commit -m "Release v1.2.0: [brief description]"
git tag v1.2.0
```

2. **Push to main**
```bash
git push origin main
git push origin v1.2.0
```

3. **Monitor deployment**
- Go to Cloudflare Dashboard → Pages → Your Project
- Watch build logs
- Verify deployment succeeds (usually 2-3 minutes)

4. **Test production**
- Visit your .pages.dev URL or custom domain
- Run smoke test again on live site
- Check that service worker updates

### Option B: Manual Deploy via Wrangler

1. **Build**
```bash
npm run build
```

2. **Deploy**
```bash
wrangler pages deploy dist --project-name=breakbreath
```

3. **Verify deployment**
```bash
# Get deployment URL from output
# Visit URL and run smoke test
```

## Post-Release Verification

### Production Health Check (5 minutes)

1. **Visit production URL**
   - [ ] https://breakbreath.app loads
   - [ ] SSL certificate valid
   - [ ] No mixed content warnings

2. **Headers verification**
```bash
curl -I https://breakbreath.app | grep -E "(strict-transport|content-security|x-content-type)"
```
Expected headers:
- `strict-transport-security: max-age=31536000; includeSubDomains; preload`
- `content-security-policy: ...`
- `x-content-type-options: nosniff`

3. **PWA Check**
   - [ ] Open DevTools → Application
   - [ ] Manifest: no errors
   - [ ] Service Worker: "Activated and is running"
   - [ ] Cache Storage: new version cached
   - [ ] Install app: works on desktop & mobile

4. **Offline Test**
   - [ ] Toggle Network → Offline
   - [ ] Refresh page → app still loads
   - [ ] Core features work offline

5. **Cross-Browser Spot Check**
   - [ ] Chrome/Edge: install & offline work
   - [ ] Safari (macOS): install & offline work
   - [ ] iOS Safari: Add to Home Screen → launch → standalone mode
   - [ ] Android Chrome: install prompt → standalone mode

6. **Performance**
   - [ ] Run Lighthouse on production URL
   - [ ] Performance ≥ 90
   - [ ] PWA score: Installable ✅

### Security Headers Test
Visit https://securityheaders.com/?q=https://breakbreath.app
- Target grade: A or A+

### Analytics Check (Optional)
If using Cloudflare Analytics or Plausible:
- [ ] Page views tracking
- [ ] No PII in events
- [ ] Real-time stats showing

## Rollback Procedure

### If Critical Issue Detected

**Via Cloudflare Dashboard (Fastest):**
1. Go to Pages → Your Project → Deployments
2. Find previous working deployment
3. Click **...** → **Rollback to this deployment**
4. Confirm → takes effect in ~30 seconds

**Via Git:**
```bash
git revert HEAD
git push origin main
# Cloudflare auto-deploys the revert
```

**Via Wrangler:**
```bash
# List deployments
wrangler pages deployment list --project-name=breakbreath

# Find previous working deployment ID
# Promote it (if Wrangler supports this - check docs)
```

**Manual Emergency:**
```bash
# Checkout previous version
git checkout v1.1.0
npm run build
wrangler pages deploy dist --project-name=breakbreath
```

## Post-Release Monitoring

### First 24 Hours
- [ ] Check Cloudflare Analytics for traffic patterns
- [ ] Monitor error logs (if using Sentry)
- [ ] Watch for support emails or GitHub issues
- [ ] Verify service worker updates propagating to users

### First Week
- [ ] Review Core Web Vitals in Cloudflare Dashboard
- [ ] Check PWA install rate (if tracking)
- [ ] Monitor uptime (if using UptimeRobot)
- [ ] Gather user feedback

## Common Issues & Fixes

### Service Worker Not Updating
**Symptom:** Users still see old version after deployment

**Fix:**
1. Verify `CACHE_NAME` was bumped in sw.js
2. Check _headers has `Cache-Control: no-cache` for sw.js
3. Users can force update: Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

### PWA Not Installing
**Symptom:** No install prompt on mobile

**Check:**
- [ ] Manifest.json valid (no 404)
- [ ] Service worker registered
- [ ] HTTPS enabled
- [ ] start_url and scope correct

### Headers Not Applied
**Symptom:** securityheaders.com shows poor score

**Fix:**
- Verify `_headers` file in dist/ after build
- Check Cloudflare Pages settings → Functions → _headers enabled
- Clear Cloudflare cache: Caching → Configuration → Purge Everything

### Build Fails
**Check:**
- [ ] Node version 18+ (check in Cloudflare build settings)
- [ ] package-lock.json committed
- [ ] No syntax errors in code
- [ ] Dependencies installed correctly

## Release Cadence

**Suggested schedule:**
- Hotfixes: as needed (critical bugs)
- Minor releases: bi-weekly (features, improvements)
- Major releases: quarterly (breaking changes, redesigns)

## Communication

**After each release:**
- [ ] Update CHANGELOG.md (if maintaining)
- [ ] Tweet/post on social (if applicable)
- [ ] Email newsletter (if you have one)
- [ ] Update press kit if significant features added

## Continuous Improvement

**After 10 releases, review:**
- Average deployment time
- Rollback frequency
- User-reported issues per release
- Process pain points

**Optimize:**
- Add automated tests
- Set up staging environment
- Implement canary deployments (Cloudflare Pages previews)
- Add monitoring/alerting

---

**Quick Command Reference:**

```bash
# Complete release flow
npm run build
npm run preview  # test locally
git commit -am "Release vX.Y.Z"
git tag vX.Y.Z
git push origin main --tags

# Manual deploy
wrangler pages deploy dist --project-name=breakbreath

# Rollback
git revert HEAD && git push
```

**Emergency Contact:**
- Cloudflare Status: https://www.cloudflarestatus.com/
- Support: https://community.cloudflare.com/
