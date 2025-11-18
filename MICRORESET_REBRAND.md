# MicroReset Rebrand Complete ✅

**Date:** November 17, 2025
**Status:** REBRAND COMPLETE
**Previous Name:** BreakBreath
**New Name:** MicroReset

---

## Rebrand Summary

All text, branding, and configuration updated from BreakBreath to MicroReset:

### Updated Files

#### Configuration
- ✅ `public/manifest.json` - App name, description, theme colors, icon paths
- ✅ `public/_headers` - No changes needed (brand-agnostic)
- ✅ `public/_redirects` - No changes needed

#### HTML & Meta Tags
- ✅ `index.html` - All meta tags, titles, Open Graph, Twitter Card
- ✅ Theme color: `#0B1220` → `#0E1223`
- ✅ Canonical URL: `breakbreath.app` → `microreset.app`
- ✅ All user-facing text updated
- ✅ All JavaScript strings and notifications
- ✅ Debug tool renamed: `BreakBreathDebug` → `MicroResetDebug`

#### Legal Documents
- ✅ `public/privacy.html` - All references updated
- ✅ `public/terms.html` - All references updated
- ✅ Email addresses updated:
  - `privacy@breakbreath.app` → `privacy@microreset.app`
  - `legal@breakbreath.app` → `legal@microreset.app`

#### Assets
- ✅ `public/robots.txt` - No changes needed
- ✅ Icon paths updated to `/icons/microreset-*.png`
- ✅ `public/icons/README-ICONS.txt` - Created with MicroReset guidelines

---

## New Branding

### Name & Tagline
**Name:** MicroReset
**Primary Tagline:** Small resets. Big clarity.

### Color Scheme
- **Theme Color:** `#0E1223` (dark blue-gray)
- **Background:** `#0E1223` (matching theme)

### Key Messaging
- **Tagline:** Small resets. Big clarity.
- **Description:** Tiny 30–60 second micro-exercises that reset your body and mind anywhere.
- **Sub-headline:** Tiny 30–60 second micro-exercises that refresh your body, reset your focus, and reduce fatigue — wherever you are.

### Icon Requirements
Required files in `/public/icons/`:
- `microreset-192.png` (192×192px)
- `microreset-512.png` (512×512px)
- `microreset-maskable.png` (512×512px with safe zone)

**Icon guidelines in:** `/public/icons/README-ICONS.txt`

### Domain
- **New Domain:** `microreset.app`
- **OG Image Path:** `/assets/og-microreset.png` (1200×630px)

---

## Critical Action Items Before Launch

### 1. Create MicroReset Icons (20 minutes)
**Required:**
- Design icon with dark background `#0E1223`
- Consider symbols: timer, refresh, breathing, movement
- Export as:
  - `microreset-192.png` (192×192px)
  - `microreset-512.png` (512×512px)
  - `microreset-maskable.png` (512×512px with safe zone)
- Place in `/public/icons/` directory

### 2. Create OG Image (15 minutes)
**Specs:**
- Dimensions: 1200×630px
- Format: PNG
- Content: "MicroReset — Small resets. Big clarity."
- Visual: Exercise/reset theme with dark background
- Save as: `/public/assets/og-microreset.png`

### 3. Update Domain Settings (if applicable)
- Point `microreset.app` to Cloudflare Pages
- Or update canonical URLs if using different domain

---

## Text Changes Reference

### Key User-Facing Changes

**Hero Section:**
- Title: "Small resets. Big clarity."
- Sub-headline: "Tiny 30–60 second micro-exercises that refresh your body, reset your focus, and reduce fatigue — wherever you are."

**Product Name:**
- All instances of "BreakBreath" → "MicroReset"
- Calendar files: `breakbreath-*.ics` → `microreset-*.ics`
- Weekly recap: `breakbreath-weekly-recap.txt` → `microreset-weekly-recap.txt`

**Notifications:**
- "BreakBreath Hourly Reset" → "MicroReset Hourly Reset"
- "BreakBreath installed!" → "MicroReset installed!"

**Debug Tools:**
- `window.BreakBreathDebug` → `window.MicroResetDebug`

**Legal:**
- Privacy policy updated with MicroReset branding
- Terms of use updated with MicroReset branding
- Medical disclaimer retained

---

## Build Status

**Build:** ✅ Success
**Output:** 338.54 kB (gzipped: 76.77 kB)
**Files:** All branding updated
**Icons:** Placeholders ready (awaiting final assets)

### Build Contents
```
dist/
├── _headers              (security headers)
├── _redirects            (SPA routing)
├── index.html            (338 KB, rebranded)
├── manifest.json         (MicroReset PWA manifest)
├── privacy.html          (MicroReset privacy policy)
├── terms.html            (MicroReset terms of use)
├── robots.txt            (SEO)
├── sw.js                 (service worker v2)
├── icons/
│   └── README-ICONS.txt  (icon creation guide)
├── icon.svg              (legacy, can remove)
└── README-ICONS.txt      (legacy, can remove)
```

---

## Deployment Checklist

### Pre-Deploy
- [ ] Create MicroReset icons (3 files)
- [ ] Create OG image (1200×630px)
- [ ] Place icons in `/public/icons/`
- [ ] Place OG image in `/public/assets/`
- [ ] Rebuild: `npm run build`
- [ ] Test locally: `npm run preview`

### Deploy
Choose one method:

**Option A: Cloudflare Pages (Git)**
```bash
git add .
git commit -m "Rebrand to MicroReset"
git push origin main
```

**Option B: Wrangler CLI**
```bash
npm run build
wrangler pages deploy dist --project-name=microreset
```

### Post-Deploy
- [ ] Visit production URL
- [ ] Verify branding: "MicroReset" appears throughout
- [ ] Check manifest: DevTools → Application → Manifest
- [ ] Test PWA install: Shows "MicroReset"
- [ ] Verify offline mode works
- [ ] Check OG tags: Share on social media

---

## Testing Checklist

### Visual Verification
- [ ] Page title: "MicroReset — Small resets. Big clarity."
- [ ] Header/logo: "MicroReset"
- [ ] Hero tagline: "Small resets. Big clarity."
- [ ] All text uses "MicroReset" (not "BreakBreath")
- [ ] Theme color: Dark blue-gray `#0E1223`

### Functional Verification
- [ ] Notifications show "MicroReset"
- [ ] Calendar downloads: `microreset-*.ics`
- [ ] Install prompt: "MicroReset"
- [ ] Installed app name: "MicroReset"
- [ ] Privacy/Terms pages: "MicroReset" branding

### Metadata Verification
- [ ] Open Graph title: "MicroReset — Small resets. Big clarity."
- [ ] OG image loads (after creating it)
- [ ] Twitter Card correct
- [ ] Manifest name: "MicroReset"

---

## Rollback Plan

If needed to revert to BreakBreath:

```bash
git revert HEAD
git push origin main
```

Or restore from previous deployment in Cloudflare Dashboard.

---

## Support Resources

**Icon Creation:**
- Figma: https://figma.com
- Maskable tester: https://maskable.app/
- Favicon generator: https://realfavicongenerator.net/

**OG Image Creation:**
- Canva: https://canva.com (1200×630 template)
- Figma: Design from scratch
- Photoshop/GIMP: Professional tools

**Documentation:**
- PWA Manifest: https://web.dev/add-manifest/
- Open Graph: https://ogp.me/
- Cloudflare Pages: https://developers.cloudflare.com/pages/

---

## Files Changed Summary

**Total Files Modified:** 5
1. `public/manifest.json` - Complete rebrand
2. `index.html` - All text, meta tags, code references
3. `public/privacy.html` - Complete rebrand
4. `public/terms.html` - Complete rebrand
5. `public/icons/README-ICONS.txt` - Created

**No Changes Required:**
- `public/_headers` - Brand-agnostic
- `public/_redirects` - Brand-agnostic
- `public/sw.js` - Brand-agnostic
- `public/robots.txt` - Brand-agnostic

---

## Next Steps

1. **Create icons** (20 min) - See `/public/icons/README-ICONS.txt`
2. **Create OG image** (15 min) - 1200×630px with tagline
3. **Test locally** (5 min) - `npm run preview`
4. **Deploy** (5 min) - Git push or Wrangler
5. **Verify** (10 min) - Check all branding in production

**Estimated Time to Launch:** 55 minutes

---

**Rebrand Status:** ✅ COMPLETE
**Build Status:** ✅ SUCCESS
**Ready to Deploy:** ✅ YES (after icons/OG image)

**Prepared by:** AI Assistant
**Date:** November 17, 2025
