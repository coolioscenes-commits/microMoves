# BreakBreath Daily Streak Test Pack

Comprehensive test suite for the daily streak tracking system.

## Quick Start

### Running Tests in Browser Console

1. Open BreakBreath app in browser
2. Open DevTools (F12) → Console tab
3. Load the test file:
   ```javascript
   // Copy/paste contents of streak-tests.js, then run:
   StreakTestSuite.runQuick()
   ```

### Test Commands

```javascript
// Run all automated tests (fast, skips 31s timeout test)
StreakTestSuite.runQuick()

// Run ALL tests including timeout test (~31s total)
StreakTestSuite.runAll()

// Run individual test
StreakTestSuite.tests.testFirstCompletion()

// Show manual test checklist
StreakTestSuite.printManualTests()

// Utility commands
StreakTestSuite.clearState()  // Reset all streak data
StreakTestSuite.getState()    // View current state
```

## State Schema

### LocalStorage Keys

| Key | Type | Description |
|-----|------|-------------|
| `bb_streak_total` | int | Total completions (all-time) |
| `bb_daily_streak` | int | Current consecutive days streak |
| `bb_best_streak` | int | Maximum daily streak achieved |
| `bb_last_completion_local` | string | Last completion date (YYYY-MM-DD in local time) |
| `breakbreath_log` | array | Last 10 completions (for UI) |

### Legacy Keys (Backward Compatibility)

- `bb_streak` → migrated to `bb_streak_total`
- `bb_last_active_date` → migrated to `bb_last_completion_local`

## Streak Rules

### Daily Streak Increment

**Rule:** Your first completed micro-move each calendar day increases the streak.

- **Yesterday** → `bb_daily_streak += 1`
- **Today** → `bb_daily_streak` unchanged
- **2+ days ago** → `bb_daily_streak = 1` (reset)

### Total Completions

- Increments on **every** completion
- Never resets (all-time counter)

### Best Streak

- `bb_best_streak = max(current_daily, best_streak)`
- Persists even after streak breaks
- Shown in tooltip when higher than current

### Local Calendar Day

Uses `toLocaleDateString('en-CA')` for YYYY-MM-DD format in **local timezone**:
- ✅ Works across DST transitions
- ✅ No UTC conversion issues
- ✅ Matches user's perceived "day"

## Automated Tests

### P0 Tests (Core Functionality)

#### ✅ S1: First completion creates streak
```javascript
StreakTestSuite.tests.testFirstCompletion()
```
- **Precondition:** No keys in localStorage
- **Action:** Complete one exercise
- **Expected:**
  - `bb_daily_streak = 1`
  - `bb_streak_total = 1`
  - `bb_best_streak = 1`
  - `bb_last_completion_local = today`

#### ✅ S2: Second completion same day doesn't increment
```javascript
StreakTestSuite.tests.testSecondCompletionSameDay()
```
- **Action:** Complete two exercises same day
- **Expected:**
  - `bb_daily_streak` unchanged after 2nd
  - `bb_streak_total` increments to 2

#### ✅ S3: Consecutive days increments
```javascript
StreakTestSuite.tests.testConsecutiveDays()
```
- **Action:** Complete on Day 1, mock yesterday, complete today
- **Expected:**
  - `bb_daily_streak = 2`
  - `bb_best_streak = 2`
  - `bb_last_completion_local = today`

#### ✅ S4: Gap day resets
```javascript
StreakTestSuite.tests.testGapDayResets()
```
- **Action:** Complete Day 1, mock 3 days ago, complete today
- **Expected:**
  - `bb_daily_streak = 1` (reset)
  - `bb_streak_total = 2`
  - Previous best preserved

#### ✅ S5: Best streak persists
```javascript
StreakTestSuite.tests.testBestStreakPersists()
```
- **Action:** Build to 3 days → break streak → new completion
- **Expected:**
  - `bb_daily_streak = 1` (reset)
  - `bb_best_streak = 3` (persists)

### Undo Tests

#### ✅ S6: Undo within 30s window rolls back
```javascript
StreakTestSuite.tests.testUndoWithinWindow()
```
- **Action:** Complete first of day → undo within 10s
- **Expected:**
  - Streak decremented
  - `bb_last_completion_local` rolled back
  - Total decremented
  - Log entry removed

#### ✅ S7: Undo not first of day
```javascript
StreakTestSuite.tests.testUndoNotFirstOfDay()
```
- **Action:** Complete twice same day → undo 2nd
- **Expected:**
  - `bb_daily_streak` unchanged
  - `bb_streak_total` decremented
  - Daily streak NOT rolled back

#### ✅ S8: Undo after 30s window expires
```javascript
StreakTestSuite.tests.testUndoAfterWindow()
```
- **Duration:** 31 seconds
- **Action:** Complete → wait > 30s → undo
- **Expected:**
  - Undo fails with "expired" message
  - Streak unchanged

### Persistence Tests

#### ✅ S9: Persistence across refresh
```javascript
StreakTestSuite.tests.testPersistence()
```
- **Action:** Build streak → read from localStorage
- **Expected:** All values intact

#### ✅ S10: Local date boundary
```javascript
StreakTestSuite.tests.testLocalDateBoundary()
```
- **Action:** Set yesterday 23:59 → complete today
- **Expected:** Two distinct days recognized

## Manual Tests

### M1: Quiet Hours Don't Affect Streak
1. Toggle Quiet Hours ON in settings
2. Complete an exercise during quiet hours
3. **Expected:** Streak increments normally
4. **Rationale:** Quiet hours suppress notifications, not tracking

### M2: UI Display Correctness
- [ ] Streak chip shows: `🔥 X days • Y total`
- [ ] Tooltip shows best streak when > current
- [ ] Section header: "Daily streak & activity"
- [ ] Share button: "Share my daily streak"
- [ ] Share text: "I'm on a X-day daily streak (Y completions total) with BreakBreath."

### M3: Cross-Tab Synchronization
1. Open app in two tabs
2. Complete exercise in Tab 1
3. **Expected:** Tab 2 updates streak display via `storage` event

### M4: Near-Midnight Completions
1. Set system time to 23:58 local
2. Complete exercise (before midnight)
3. Wait until 00:01
4. Complete another exercise (after midnight)
5. **Expected:** Two consecutive days, streak = 2

### M5: Analytics Events (if implemented)
1. Open Console → Filter for analytics
2. Complete **first** exercise of day
3. **Expected:** `streak_incremented` event fires
4. Complete **second** exercise same day
5. **Expected:** NO `streak_incremented` event

## Debug Tools

### BreakBreathDebug API

```javascript
// View current state
BreakBreathDebug.getStreaks()
// → { total: 5, daily: 3, best: 5, last: "2025-11-10" }

// Simulate completion
BreakBreathDebug.recordMove("Test exercise")

// Undo last completion (30s window)
BreakBreathDebug.undoLastMove()

// Reset all streaks
BreakBreathDebug.resetStreaks()

// Get share text
BreakBreathDebug.getShareLine()

// Time travel tests
BreakBreathDebug.testYesterday()      // Set last completion to yesterday
BreakBreathDebug.testThreeDaysAgo()   // Set last completion to 3 days ago
BreakBreathDebug.setDate(7)           // Set to 7 days ago
```

## Expected Behavior Matrix

| Last Completion | Next Completion | Daily Streak | Total | Best |
|----------------|-----------------|--------------|-------|------|
| null | Today | 1 | 1 | 1 |
| Today | Today | unchanged | +1 | unchanged |
| Yesterday | Today | +1 | +1 | max(daily, best) |
| 2+ days ago | Today | reset to 1 | +1 | unchanged |

## Common Issues & Solutions

### Issue: Streak not incrementing
- **Check:** Is it the first completion today?
- **Check:** Is `bb_last_completion_local` set to today already?
- **Solution:** Same-day completions don't increment daily streak

### Issue: Wrong date calculations
- **Check:** Using local time or UTC?
- **Solution:** We use `toLocaleDateString('en-CA')` for local calendar day

### Issue: Undo not working
- **Check:** Is it within 30 seconds?
- **Check:** Check console for undo result message
- **Solution:** Window expires after 30s

### Issue: Best streak wrong
- **Check:** Was best streak higher before?
- **Solution:** Best streak only increases, never decreases

## Test Coverage Summary

| Category | Automated | Manual | Total |
|----------|-----------|--------|-------|
| Core Increment | 5 tests | 0 | 5 |
| Undo Logic | 3 tests | 0 | 3 |
| Persistence | 2 tests | 2 | 4 |
| Edge Cases | 1 test | 2 | 3 |
| UI/UX | 0 | 5 | 5 |
| **Total** | **11** | **9** | **20** |

## Running Tests in CI/CD

For headless testing (e.g., Playwright/Cypress):

```javascript
// Load app
await page.goto('http://localhost:5173');

// Inject test suite
await page.addScriptTag({ path: './streak-tests.js' });

// Run tests
const results = await page.evaluate(() => {
  return StreakTestSuite.runQuick();
});

// Assert all passed
expect(results.failed).toBe(0);
```

## Acceptance Criteria Checklist

- [x] First completion increments to 1
- [x] Same-day completions don't increment daily
- [x] Consecutive days increment
- [x] Gap days reset to 1
- [x] Best streak tracked and persists
- [x] 30s undo window functional
- [x] Undo after window fails gracefully
- [x] Local calendar day used (not UTC)
- [x] Persistence across refresh
- [x] Backward compatibility with legacy keys
- [x] UI copy says "Daily streak"
- [x] Debug tools available

## Notes

### Why Local Calendar Day?

Using `toLocaleDateString('en-CA')`:
- Returns YYYY-MM-DD in **user's local timezone**
- Avoids UTC midnight bugs
- Matches user's perceived "day"
- Works correctly during DST transitions

### Why 30s Undo Window?

Balance between:
- Long enough for accidental clicks
- Short enough to prevent gaming the system
- Standard industry practice (Gmail = 30s, Slack = 10s)

### Why Track Best Streak?

- Motivation: "Beat your record"
- Shows progress over time
- Persists through breaks
- Common in habit-tracking apps
