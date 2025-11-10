# Manual Testing Instructions

**Document:** MANUAL_TEST_SPREADSHEET.csv
**Total Tests:** 45 scenarios
**Estimated Time:** 3-4 hours total (all devices)
**Required Devices:** 3 minimum (Desktop Chrome, iOS Safari, Android Chrome)

---

## Quick Start

### 1. Open the Spreadsheet

**Import CSV into:**
- Google Sheets (File > Import)
- Excel (Data > From Text/CSV)
- Numbers (File > Import)
- LibreOffice Calc (File > Open)

### 2. Understand the Columns

| Column | Purpose | How to Use |
|--------|---------|------------|
| **Test ID** | Unique identifier (MT-01, MT-02, etc) | Reference when reporting issues |
| **Category** | Feature area | Group related tests |
| **Device** | Platform to test on | Desktop Chrome, iOS Safari, Android Chrome |
| **Mode** | Testing mode | Online, Offline, Reduced Motion, Notifications |
| **Test Scenario** | What you're testing | Brief description |
| **Pre-Conditions** | Setup required | Do this before testing |
| **Test Steps** | Actions to perform | Follow step-by-step |
| **Expected Result** | What should happen | Multiple bullet points |
| **Actual Result** | What actually happened | **YOU FILL THIS IN** |
| **Status** | Test outcome | **PASS / FAIL / BLOCKED / SKIP** |
| **Notes** | Additional comments | Bug details, observations |
| **Tester** | Your name | Who performed test |
| **Date** | When tested | YYYY-MM-DD format |

---

## How to Test

### Step 1: Choose Your Device

Start with one device, complete all tests for that device, then move to next.

**Test Order:**
1. Desktop Chrome (MT-01 to MT-27) - ~90 minutes
2. iOS Safari (MT-28 to MT-35) - ~60 minutes
3. Android Chrome (MT-36 to MT-44) - ~60 minutes
4. Cross-device (MT-45) - ~15 minutes

### Step 2: Prepare Your Environment

**Before Starting:**
- Clear browser cache and LocalStorage
- Close other tabs (reduce interference)
- Ensure stable internet connection
- Have browser DevTools/Console ready (F12 on desktop)
- Disable browser extensions (test in Incognito/Private mode)

**Test App URL:**
- Local: http://localhost:5173 (after `npm run dev`)
- Staging: [your-staging-url]
- Production: [your-production-url]

### Step 3: Execute Each Test

**For Each Row:**

1. **Read Pre-Conditions** - Set up required state
2. **Follow Test Steps** - Perform actions exactly as written
3. **Compare with Expected Result** - Check each bullet point
4. **Fill in Actual Result** - Describe what you observed
5. **Set Status:**
   - **PASS** - All expected results match
   - **FAIL** - One or more expected results don't match
   - **BLOCKED** - Cannot complete (missing dependency, bug prevents testing)
   - **SKIP** - Intentionally not testing (document reason in Notes)
6. **Add Notes** - Screenshots, error messages, observations
7. **Enter Tester Name and Date**

### Step 4: Document Failures

**When a Test Fails:**

Record in the **Notes** column:
- What went wrong (be specific)
- Error messages (copy exact text)
- Screenshot filename (if captured)
- Browser version (e.g., Chrome 120.0)
- OS version (e.g., iOS 17.2, Windows 11)
- Reproducibility (Always / Sometimes / Once)

**Example:**
```
FAIL - Undo button not appearing after exercise completion.
Expected: Undo option in toast or near streak counter
Actual: No undo UI visible
Console error: "undoLastCompletion is not defined"
Chrome 120.0.6099.109, macOS 14.1
Reproducible: Always (tested 3 times)
Screenshot: bug-undo-missing-001.png
```

---

## Test Breakdown by Device

### Desktop Chrome (27 tests)

**Categories:**
- Core Functionality (6 tests)
- Streaks & Undo (3 tests)
- Snooze (2 tests)
- Settings (2 tests)
- Accessibility (3 tests)
- Pro Features (1 test)
- Calendar Export (1 test)
- Share (1 test)
- PWA (1 test)
- Offline Mode (2 tests)
- Notifications (2 tests)
- Reduced Motion (1 test)
- Responsive (1 test)
- Error Handling (1 test)
- Analytics (1 test)

**Time Estimate:** 90 minutes

**Special Setup:**
- Test MT-23 requires enabling Reduced Motion in OS settings
- Test MT-26 may require browser settings changes
- Test MT-27 requires console open (F12)

### iOS Safari (8 tests)

**Categories:**
- Core Functionality (2 tests)
- PWA Installation (1 test)
- Notifications (1 test)
- Offline Mode (1 test)
- Touch Interactions (1 test)
- iOS-Specific Quirks (1 test)
- Reduced Motion (1 test)

**Time Estimate:** 60 minutes

**Special Requirements:**
- iPhone running iOS 15 or later (iOS 16.4+ for full notifications)
- Safari browser (not Chrome on iOS)
- Access to iOS Settings > Accessibility

**Known iOS Quirks to Watch:**
- Notifications require iOS 16.4+
- Service Worker may need refresh on first load
- Fixed positioning can be tricky with Safari bars
- 100vh units behave differently

### Android Chrome (9 tests)

**Categories:**
- Core Functionality (2 tests)
- PWA Installation (1 test)
- Notifications (1 test)
- Offline Mode (1 test)
- Touch Interactions (1 test)
- Android-Specific Quirks (1 test)
- Background Behavior (1 test)
- Reduced Motion (1 test)

**Time Estimate:** 60 minutes

**Special Requirements:**
- Android phone running Android 10 or later
- Chrome browser (not Samsung Internet)
- Access to Settings > Accessibility

**Known Android Quirks to Watch:**
- Install prompt appears automatically
- Address bar hides/shows (affects viewport)
- Back button behavior
- Background/foreground transitions

### Cross-Device (1 test)

**Purpose:** Verify consistent experience

**Time Estimate:** 15 minutes

**What to Check:**
- Same features work on all devices
- Data format compatible
- No device-specific showstoppers

---

## Special Testing Modes

### Offline Testing

**Tests:** MT-19, MT-20, MT-32, MT-40

**How to Go Offline:**
- **Desktop:** DevTools > Network tab > "Offline" dropdown
- **iOS:** Settings > Airplane Mode ON
- **Android:** Settings > Airplane Mode ON

**What to Test:**
1. Load app while online
2. Enable offline mode
3. Refresh page
4. Verify app loads from cache
5. Test basic functions (suggest exercise, select environment)
6. Check Service Worker in console

**Expected:**
- App loads without network
- Cached content displays
- Basic UI functions work
- No network errors for cached resources

### Reduced Motion Testing

**Tests:** MT-23, MT-35, MT-44

**How to Enable:**
- **Windows:** Settings > Accessibility > Visual effects > Animation effects OFF
- **macOS:** System Preferences > Accessibility > Display > Reduce motion ON
- **iOS:** Settings > Accessibility > Motion > Reduce Motion ON
- **Android:** Settings > Accessibility > Remove animations ON

**What to Test:**
1. Enable reduced motion in OS
2. Refresh app
3. Interact with UI (timers, modals, transitions)
4. Verify animations are minimal/removed

**Expected:**
- No sliding/carousel effects
- Fade transitions only
- No motion that could cause discomfort
- Functionality intact

### Notification Testing

**Tests:** MT-21, MT-22, MT-31, MT-39

**How to Test:**

**First Run (Permission Request):**
1. Start nudges
2. Click "Allow" when prompted
3. Wait for notification (based on interval setting)

**Denied State:**
1. Deny permission OR revoke in browser settings
2. Verify app handles gracefully
3. Check for error messaging

**iOS Notes:**
- Requires iOS 16.4+ for web notifications
- Must be added to Home Screen first
- Test as PWA, not in Safari browser

**Android Notes:**
- Permission prompt appears inline
- Notifications appear in shade
- Can test immediately

---

## Tips for Effective Testing

### 1. Clear State Between Tests

**Reset LocalStorage:**
```javascript
// In browser console (F12)
localStorage.clear();
location.reload();
```

**Or:**
- Chrome: DevTools > Application > Storage > Clear site data
- Safari: Develop menu > Empty Caches
- Mobile: Settings > Safari/Chrome > Clear History and Website Data

### 2. Use Browser DevTools

**Essential Tools:**
- **Console (F12)** - See errors and analytics events
- **Network tab** - Monitor requests, test offline
- **Application tab** - Inspect LocalStorage, Service Worker
- **Lighthouse** - Run performance/PWA audits

**Check Console For:**
- `[Analytics]` events
- Error messages (red text)
- Warning messages (yellow text)
- Service Worker messages

### 3. Take Screenshots

**When to Screenshot:**
- Every FAIL status
- Unexpected behavior
- UI layout issues
- Error messages

**Naming Convention:**
```
bug-[test-id]-[description]-[number].png

Examples:
bug-mt-06-undo-not-visible-001.png
bug-mt-31-ios-notification-failed-001.png
bug-mt-38-android-install-missing-001.png
```

### 4. Test Systematically

**Don't Skip Tests:**
- Even if related test passed, run all tests
- Bugs can be context-specific

**Follow Order:**
- Tests may depend on state from previous tests
- Note any dependencies in Pre-Conditions

**Be Thorough:**
- Check every bullet in Expected Result
- Partial pass = FAIL (note what worked)

### 5. Report Issues Clearly

**Good Bug Report:**
```
Test ID: MT-06
Status: FAIL
Issue: Undo button not visible after exercise completion

Expected:
- Undo option appears in toast or near streak counter
- Can undo within 30 seconds

Actual:
- No undo UI visible anywhere
- Streak incremented and cannot be reversed
- Console shows no errors

Environment:
- Device: MacBook Pro M1
- OS: macOS 14.1
- Browser: Chrome 120.0.6099.109
- Screen: 1440x900
- Test Date: 2025-11-10

Steps to Reproduce:
1. Clear LocalStorage
2. Start nudges
3. Complete a 30-sec exercise
4. Look for undo option immediately after completion

Reproducibility: Always (tested 5 times)

Screenshots: bug-mt-06-001.png, bug-mt-06-002.png
```

---

## After Testing

### 1. Calculate Results

**Summary Metrics:**
```
Total Tests: 45
Passed: [count]
Failed: [count]
Blocked: [count]
Skipped: [count]

Pass Rate: [passed / (total - skipped)] %
```

**By Device:**
- Desktop Chrome: X/27 passed (X%)
- iOS Safari: X/8 passed (X%)
- Android Chrome: X/9 passed (X%)
- Cross-device: X/1 passed (X%)

**By Category:**
- Core Functionality: X/X passed
- Streaks: X/X passed
- PWA: X/X passed
- Accessibility: X/X passed
- (etc.)

### 2. Prioritize Failures

**Severity Levels:**
- **Critical** - App unusable, data loss, security issue
- **High** - Major feature broken, bad UX
- **Medium** - Minor feature broken, workaround exists
- **Low** - Cosmetic, edge case, nice-to-have

**Examples:**
- MT-05 FAIL (Streaks don't increment) = **Critical**
- MT-06 FAIL (No undo button) = **High**
- MT-24 FAIL (Layout shift at 768px) = **Medium**
- MT-27 FAIL (Analytics event typo) = **Low**

### 3. Create Bug Tickets

**For Each FAIL:**
1. Create issue/ticket in bug tracker
2. Reference Test ID
3. Copy Expected/Actual from spreadsheet
4. Attach screenshots
5. Assign priority
6. Link related tests

### 4. Retest After Fixes

**Regression Testing:**
- After bugs fixed, re-run failed tests
- Verify fix works
- Check related tests still pass
- Update spreadsheet status

---

## FAQ

**Q: What if I don't have iOS device?**
A: Skip iOS tests (MT-28 to MT-35), note in summary. Test on iOS Simulator if available (Xcode on Mac).

**Q: What if I don't have Android device?**
A: Skip Android tests (MT-36 to MT-44), note in summary. Test on Android Emulator (Android Studio).

**Q: Can I test on different browsers?**
A: Yes, but minimum requirement is Chrome, Safari, and Chrome (Android). Additional browsers (Firefox, Edge) are bonus.

**Q: How do I test notifications if I already allowed/denied?**
A: Reset permissions in browser settings:
- Chrome: Site settings > Notifications > Reset
- Safari: Preferences > Websites > Notifications
- Mobile: App settings > Notifications

**Q: What's the minimum passing criteria?**
A:
- **Critical:** 100% pass (Core functionality, Streaks, Data persistence)
- **High:** 95%+ pass (PWA, Accessibility, Settings)
- **Medium:** 90%+ pass (Offline, Notifications)
- **Low:** 80%+ pass (Analytics, Nice-to-haves)

**Q: What if test is blocked?**
A: Note blocking issue in Notes column, file separate bug, mark as BLOCKED. Don't count toward pass rate.

**Q: How long should each test take?**
A: Most tests: 2-3 minutes. Complex tests (PWA install, offline): 5-7 minutes.

**Q: Can I test in parallel (multiple testers)?**
A: Yes! Assign devices to different testers. Use "Tester" column to track who did what.

---

## Reporting Template

After completing all tests, create summary report:

```markdown
# Manual Testing Summary

**Date:** YYYY-MM-DD
**Tester(s):** [Names]
**Environment:** [Local / Staging / Production]
**App URL:** [URL tested]

## Results

### Overall
- Total Tests: 45
- Passed: X
- Failed: X
- Blocked: X
- Skipped: X
- **Pass Rate: X%**

### By Device
- Desktop Chrome: X/27 (X%)
- iOS Safari: X/8 (X%)
- Android Chrome: X/9 (X%)
- Cross-device: X/1 (X%)

### By Category
- Core Functionality: X/X
- Streaks: X/X
- Accessibility: X/X
- PWA: X/X
- Offline: X/X
- Notifications: X/X

## Critical Failures

[List any CRITICAL severity issues]

## High Priority Failures

[List any HIGH severity issues]

## Medium/Low Priority Issues

[List remaining issues]

## Recommendations

- [ ] Fix critical issues before launch
- [ ] Address high priority items
- [ ] Schedule medium/low for future releases
- [ ] Retest after fixes

## Sign-Off

- [ ] Desktop Chrome: Ready for production
- [ ] iOS Safari: Ready for production
- [ ] Android Chrome: Ready for production

**Overall Status:** ✅ PASS / ❌ FAIL

**Approved By:** _______________
**Date:** _______________
```

---

**Need Help?**
- Review COMPREHENSIVE_TEST_REPORT.md for code references
- Check BUG_HUNT_CHECKLIST.md for known issues
- Consult DEVICE_BROWSER_TEST_MATRIX.md for platform quirks

**Ready to Start?**
1. Import MANUAL_TEST_SPREADSHEET.csv
2. Pick a device
3. Start with MT-01
4. Follow test steps
5. Fill in results

Good luck! 🧪
