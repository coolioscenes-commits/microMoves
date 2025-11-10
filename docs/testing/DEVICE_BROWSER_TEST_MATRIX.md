# Device/Browser Test Matrix - BreakBreath Application

**Version:** 1.0
**Last Updated:** 2025-11-10

---

## Test Matrix Overview

This document provides a minimal but comprehensive device and browser testing matrix to ensure BreakBreath works correctly across all target platforms.

---

## Desktop Browser Tests

### 1. Chrome (Windows/Mac/Linux)

#### Test Scenarios:

**A. Core Functionality**
- [ ] Open app at `/` (clean LocalStorage)
- [ ] Click "Start nudges" → verify header shows running state
- [ ] Select environment chip → verify `breakbreath_env` in LocalStorage
- [ ] Toggle exercise filters → verify suggestions update
- [ ] Start 30-sec demo → verify timer counts down correctly
- [ ] Complete exercise → verify streak increments

**B. Online Mode**
- [ ] Load app with network enabled
- [ ] Verify all assets load (no 404s in Console)
- [ ] Verify Service Worker registers successfully
- [ ] Check Console for no JavaScript errors

**C. Offline Mode**
- [ ] Open DevTools → Application → Service Workers
- [ ] Check "Offline" mode
- [ ] Refresh page → verify app loads from cache
- [ ] Start nudges → verify full functionality offline
- [ ] Toggle settings → verify LocalStorage persists
- [ ] Complete exercise → verify streak updates offline

**D. Notifications (Allow)**
- [ ] Click "Enable notifications" in Settings
- [ ] Click "Allow" in browser prompt
- [ ] Verify status shows "Enabled"
- [ ] Verify `notifications_enabled=true` in LocalStorage
- [ ] Close app → wait for next hour → verify notification appears

**E. Notifications (Deny)**
- [ ] Click "Enable notifications" in Settings
- [ ] Click "Block" in browser prompt
- [ ] Verify helpful message appears
- [ ] Verify status shows instructions to enable
- [ ] Verify CTA still shows "Enable" option

**F. Reduced Motion (Off - Default)**
- [ ] Open Settings → verify no motion preferences set
- [ ] Start timer → verify smooth countdown animation
- [ ] Open modals → verify fade/slide transitions
- [ ] Toggle snooze → verify animations play

**G. Reduced Motion (On)**
- [ ] Open Chrome Settings → Accessibility
- [ ] Enable "Prefers reduced motion"
- [ ] Refresh BreakBreath app
- [ ] Start timer → verify no/minimal animations
- [ ] Open modals → verify instant transitions (no fade)
- [ ] Verify progress bar shows static updates

**Browser-Specific Checks:**
- [ ] PWA install banner appears (after engagement)
- [ ] Clipboard operations work (Copy steps, Share streak)
- [ ] LocalStorage quota sufficient (30 keys)
- [ ] Service Worker updates correctly on cache version bump

---

### 2. Edge (Windows/Mac)

#### Test Scenarios:

**A. Core Functionality**
- [ ] All Chrome tests (sections A-G above)

**Edge-Specific Checks:**
- [ ] PWA installation via address bar icon
- [ ] Collections/favorites work if app added
- [ ] Reading mode compatibility (if triggered)
- [ ] Windows 11 widget compatibility (if applicable)

---

### 3. Safari (Mac)

#### Test Scenarios:

**A. Core Functionality**
- [ ] All Chrome tests (sections A-G above)

**Safari-Specific Checks:**
- [ ] Service Worker registers (Safari 11.1+)
- [ ] Add to Dock (PWA) works correctly
- [ ] LocalStorage persists after browser quit
- [ ] Clipboard API fallback works (Safari restrictions)
- [ ] `prefers-reduced-motion` media query works
- [ ] Notification API works (Safari 16+)
- [ ] No console warnings about webkit-specific issues

**Known Safari Quirks:**
- [ ] Verify timer continues when tab backgrounded
- [ ] Test LocalStorage after 7 days (Safari purge policy)
- [ ] Confirm Service Worker activates on first visit
- [ ] Check manifest.json display mode in standalone

---

## Mobile Browser Tests

### 4. iOS Safari (iPhone/iPad)

#### Test Scenarios:

**A. Core Functionality - Online**
- [ ] Open app in Safari (clean state)
- [ ] Click "Start nudges" → verify touch interaction works
- [ ] Tap environment chips → verify aria-pressed updates
- [ ] Scroll through exercise filters → verify no layout issues
- [ ] Start 30-sec demo → verify timer readable on mobile
- [ ] Complete exercise → verify toast notifications visible

**B. PWA Installation**
- [ ] Tap Share icon → "Add to Home Screen"
- [ ] Verify app icon appears on home screen
- [ ] Launch from home screen → verify standalone mode (no Safari chrome)
- [ ] Verify status bar matches theme color (#0B1220)
- [ ] Verify app title shows "BreakBreath"

**C. Offline Mode (PWA)**
- [ ] Add to Home Screen first
- [ ] Enable Airplane Mode
- [ ] Launch app from home screen → verify loads
- [ ] Start nudges → verify full functionality
- [ ] Complete exercise → verify persists after coming online

**D. Notifications**
- [ ] Click "Enable notifications" → verify iOS permission prompt
- [ ] Grant permission → verify confirmation
- [ ] Background app → wait for notification time
- [ ] Verify notification appears (iOS 16.4+)
- [ ] Tap notification → verify app opens to correct screen

**E. Reduced Motion**
- [ ] iOS Settings → Accessibility → Motion → Reduce Motion ON
- [ ] Open BreakBreath app
- [ ] Start timer → verify no parallax/zoom effects
- [ ] Open modals → verify instant transitions

**F. Touch & Gesture**
- [ ] Verify tap targets ≥44px × 44px (Apple HIG)
- [ ] Test pinch-zoom disabled (max-scale=5 in viewport)
- [ ] Swipe gestures don't conflict with browser navigation
- [ ] Long-press doesn't trigger unwanted context menus

**G. Viewport & Orientation**
- [ ] Test portrait mode (375×667, 390×844, 430×932)
- [ ] Test landscape mode → verify no horizontal scroll
- [ ] Rotate device → verify layout adapts
- [ ] Test on iPad (810×1080, 1024×1366)

**iOS-Specific Checks:**
- [ ] Safari 15+ features work (notification API)
- [ ] Dark mode respects system preference
- [ ] No zoom on input focus (font-size ≥16px)
- [ ] Safe area insets respected (notch devices)
- [ ] Haptic feedback works (if implemented)

**Known iOS Quirks:**
- [ ] Confirm LocalStorage persists after app kill
- [ ] Verify timer continues in background (limited)
- [ ] Test after iOS update (Service Worker may clear)
- [ ] Check notification badges if implemented

---

### 5. Android Chrome (Phone/Tablet)

#### Test Scenarios:

**A. Core Functionality - Online**
- [ ] Open app in Chrome (clean state)
- [ ] Click "Start nudges" → verify touch response
- [ ] Tap environment chips → verify visual feedback
- [ ] Scroll exercise filters → verify smooth performance
- [ ] Start 30-sec demo → verify timer accuracy
- [ ] Complete exercise → verify streak increments

**B. PWA Installation**
- [ ] Tap "Add to Home screen" banner (or menu)
- [ ] Verify app icon appears on home screen
- [ ] Launch from home screen → verify standalone mode
- [ ] Verify splash screen shows (if configured)
- [ ] Verify theme color matches

**C. Offline Mode (PWA)**
- [ ] Install app first
- [ ] Enable Airplane Mode
- [ ] Launch app → verify loads from cache
- [ ] Start nudges → verify functionality intact
- [ ] Complete exercise → verify syncs when online

**D. Notifications**
- [ ] Click "Enable notifications" → verify Chrome prompt
- [ ] Grant permission → verify confirmed
- [ ] Background app → wait for notification time
- [ ] Verify notification appears in notification shade
- [ ] Tap notification → verify deep link works

**E. Reduced Motion**
- [ ] Android Settings → Accessibility → Remove animations
- [ ] Open BreakBreath app
- [ ] Start timer → verify simplified animations
- [ ] Open modals → verify reduced transitions

**F. Touch & Gesture**
- [ ] Verify tap targets ≥48dp (Android guidelines)
- [ ] Test swipe gestures don't conflict
- [ ] Test pull-to-refresh doesn't interfere
- [ ] Long-press functionality (if any)

**G. Viewport & Orientation**
- [ ] Test portrait (360×640, 412×915)
- [ ] Test landscape → verify layout adapts
- [ ] Rotate device → verify no content loss
- [ ] Test on tablet (800×1280, 1920×1200)

**Android-Specific Checks:**
- [ ] Chrome 90+ features work (notification API)
- [ ] Dark mode works (system or in-app)
- [ ] Back button behavior correct (closes modals first)
- [ ] App shortcuts work (if implemented)
- [ ] Share sheet integration works

**Known Android Quirks:**
- [ ] Confirm Service Worker survives "Clear cache"
- [ ] Test battery saver mode impact
- [ ] Verify timer accuracy when device sleeping
- [ ] Check notification channels configured correctly

---

## Cross-Platform Test Modes

### Online Mode Verification

**All Platforms:**
- [ ] First visit loads all assets (check Network tab)
- [ ] Service Worker registers successfully
- [ ] No console errors or warnings
- [ ] All images/icons load correctly
- [ ] Fonts load (Inter from Google Fonts)
- [ ] Manifest.json loads correctly

---

### Offline Mode Verification

**All Platforms:**
- [ ] App loads from Service Worker cache
- [ ] All features work without network
- [ ] LocalStorage operations succeed
- [ ] No network errors in console
- [ ] Streak updates persist
- [ ] Settings changes save
- [ ] Timer functionality works
- [ ] Suggestions rotate correctly

**To Test:**
1. Load app online first
2. Open DevTools → Network → Throttling → Offline
3. Refresh page
4. Verify full functionality
5. Go online → verify no data loss

---

### Reduced Motion Verification

**All Platforms:**

**With Reduced Motion OFF (default):**
- [ ] Timer countdown has smooth animation
- [ ] Modal fade-in/fade-out transitions
- [ ] Chip selection has bounce/scale effect
- [ ] Toast notifications slide in
- [ ] Progress bar animates smoothly
- [ ] Loading states show spinners

**With Reduced Motion ON:**
- [ ] Timer countdown shows instant updates
- [ ] Modals appear/disappear instantly
- [ ] Chip selection shows immediate state change
- [ ] Toast notifications appear without slide
- [ ] Progress bar jumps to position
- [ ] Loading states show static indicator

**How to Enable:**
- **Windows:** Settings → Accessibility → Visual effects → Animations off
- **Mac:** System Preferences → Accessibility → Display → Reduce motion
- **iOS:** Settings → Accessibility → Motion → Reduce Motion ON
- **Android:** Settings → Accessibility → Remove animations

**Verify in CSS:**
```css
@media (prefers-reduced-motion: reduce) {
  /* Animations disabled or simplified */
}
```

---

### Notifications Mode Testing

#### Allow Mode

**All Platforms:**
- [ ] Click "Enable notifications" in Settings
- [ ] Browser/OS shows permission prompt
- [ ] User clicks "Allow"
- [ ] App confirms "Notifications enabled"
- [ ] LocalStorage shows `notifications_enabled=true`
- [ ] Setting up next notification time
- [ ] Background app until notification time
- [ ] Notification appears with correct content
- [ ] Click notification → app opens to correct state
- [ ] Notification includes action buttons (if supported)

**Content Verification:**
- Title: "Time for a 60-second reset"
- Body: Includes exercise name
- Icon: App icon visible
- Badge: Shows if supported

#### Deny Mode

**All Platforms:**
- [ ] Click "Enable notifications" in Settings
- [ ] Browser/OS shows permission prompt
- [ ] User clicks "Block" or "Don't Allow"
- [ ] App shows helpful message
- [ ] LocalStorage shows `notifications_enabled=false`
- [ ] Instructions explain how to enable manually
- [ ] CTA button still shows "Enable" option
- [ ] Link to browser/OS settings (if helpful)

**Error Handling:**
- [ ] No console errors when denied
- [ ] App continues to function normally
- [ ] Can still use timer and other features
- [ ] Helpful recovery instructions shown

---

## Testing Checklist Template

### Per Device/Browser Test

**Device:** ________________
**Browser:** ________________
**Version:** ________________
**Date:** ________________
**Tester:** ________________

#### Core Functionality
- [ ] Start nudges button works
- [ ] Environment chips toggle
- [ ] Exercise filters multi-select
- [ ] Timer starts/pauses/resets
- [ ] Streaks increment correctly
- [ ] Settings persist
- [ ] Snooze functions correctly
- [ ] Share/copy works

#### Modes
- [ ] Online: All assets load
- [ ] Offline: App works from cache
- [ ] Reduced Motion ON: Animations disabled
- [ ] Reduced Motion OFF: Animations smooth
- [ ] Notifications Allow: Received correctly
- [ ] Notifications Deny: Handled gracefully

#### Accessibility
- [ ] Keyboard navigation (Tab, Esc, Space, ?)
- [ ] Screen reader labels present
- [ ] Focus visible on all interactive elements
- [ ] Color contrast sufficient
- [ ] Touch targets ≥44px (mobile)

#### PWA
- [ ] Install prompt appears
- [ ] Installs correctly
- [ ] Standalone mode works
- [ ] Theme color correct
- [ ] Icons display properly

#### Visual/Layout
- [ ] No horizontal scroll
- [ ] Responsive breakpoints work
- [ ] Modals fit viewport
- [ ] Text readable (no clipping)
- [ ] Footer visible and accessible

#### Performance
- [ ] Loads in <3 seconds
- [ ] Smooth scrolling
- [ ] No jank during animations
- [ ] LocalStorage operations fast
- [ ] No memory leaks (long session)

#### Notes/Issues:
```
[Add any issues or observations here]
```

---

## Quick Test Script (5 minutes per device)

```
1. Load app (clean state)
2. Start nudges
3. Select environment (Office)
4. Toggle 2 filters
5. Start 30-sec demo
6. Complete exercise
7. Check streak incremented
8. Open Settings
9. Toggle seated-only mode
10. Enable notifications (allow)
11. Snooze for 10m
12. Copy share link
13. Go offline (DevTools)
14. Refresh page
15. Verify app loads
16. Complete another exercise
17. Go back online
18. Verify streak synced
19. Enable Reduced Motion (OS)
20. Start timer (verify no animations)
```

**Expected:** All 20 steps complete without errors

---

## Minimum Required Test Coverage

To sign off on a release, test at minimum:

### Desktop (Pick 1)
- ✅ **Chrome on Windows or Mac** (most common)

### Mobile (Pick 2)
- ✅ **iOS Safari on iPhone** (iOS 15+)
- ✅ **Android Chrome on Phone** (Android 10+)

### Modes (All)
- ✅ **Online** → Offline → Online (all devices)
- ✅ **Reduced Motion** ON/OFF (at least 1 device)
- ✅ **Notifications** Allow/Deny (at least 1 device)

### Result
**Minimum: 3 devices × 3 modes = 9 test runs**

---

## Automation Considerations

### Can Be Automated
- ✅ Online/Offline mode switching
- ✅ LocalStorage key verification
- ✅ Console error detection
- ✅ Network request validation
- ✅ Accessibility audit (Lighthouse)
- ✅ Build size checks

### Must Be Manual
- ❌ Visual regression (subjective)
- ❌ Notification appearance
- ❌ PWA install flow
- ❌ Reduced motion feel
- ❌ Touch gesture responsiveness
- ❌ Real device performance

---

## Issue Reporting Template

```markdown
**Device:** [iPhone 13, Samsung Galaxy S22, etc.]
**Browser:** [Safari 16.2, Chrome 112, etc.]
**OS:** [iOS 16.3, Android 13, Windows 11, etc.]
**Mode:** [Online/Offline, Reduced Motion ON/OFF, Notifications Allow/Deny]

**Steps to Reproduce:**
1.
2.
3.

**Expected Result:**
[What should happen]

**Actual Result:**
[What actually happened]

**Screenshot/Video:**
[Attach if possible]

**Console Errors:**
```
[Paste console output]
```

**Severity:** [Critical / High / Medium / Low]
**Workaround:** [If any exists]
```

---

## Platform-Specific Known Issues

### iOS Safari
- Service Worker may not activate on first load (refresh required)
- LocalStorage cleared after 7 days if app not used
- Notifications require iOS 16.4+
- Timer may pause when tab backgrounded >5 minutes

### Android Chrome
- Notification permission persists across installs
- Battery saver mode may delay notifications
- Back button closes app (not modals) in some versions

### Desktop Safari
- Clipboard API requires user interaction
- Service Worker debugging limited vs Chrome DevTools
- Push notifications not supported (macOS Big Sur+)

### All Platforms
- LocalStorage limited to ~5-10MB
- Service Worker cache typically 50MB limit
- Notification support varies by OS version

---

**Next Step:** Use this matrix to test BreakBreath across minimum required platforms before production deployment.

**Pro Tip:** Test on real devices, not just emulators. Emulators don't capture touch precision, performance issues, or notification behavior accurately.
