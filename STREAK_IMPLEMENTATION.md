# Daily Streak Implementation Summary

## Overview

The BreakBreath app now implements a **daily streak system** that tracks:
- Consecutive days of micro-move completions
- Total all-time completions
- Personal best streak record

## Implementation Details

### Core Rule
**"Your first completed micro-move each calendar day increases the streak."**

### State Management

#### LocalStorage Keys
```javascript
bb_streak_total         // int: Total completions (all-time)
bb_daily_streak         // int: Current consecutive days
bb_best_streak          // int: Maximum streak achieved
bb_last_completion_local // string: YYYY-MM-DD (local timezone)
breakbreath_log         // array: Last 10 completions (for UI)
```

#### Legacy Keys (Auto-migrated)
- `bb_streak` → `bb_streak_total`
- `bb_last_active_date` → `bb_last_completion_local`

### Streak Logic

```javascript
function recordMicroMoveCompleted(activity) {
  const today = todayLocalISO(); // Uses toLocaleDateString('en-CA')

  if (lastCompletion === null) {
    // First ever → daily = 1
  } else if (lastCompletion === today) {
    // Same day → daily unchanged
  } else if (lastCompletion === yesterday) {
    // Consecutive → daily += 1
  } else {
    // Gap (2+ days) → daily = 1
  }

  total += 1;
  best = max(best, daily);

  // Store undo data for 30s
  lastCompletionData = { timestamp, wasFirstOfDay, ... };
}
```

### Undo Feature

**30-second undo window:**
```javascript
function undoLastCompletion() {
  if (elapsed > 30000) return { success: false };

  if (wasFirstOfDay) {
    // Roll back daily streak AND total
    daily = prevDaily;
    total = prevTotal;
    last = prevLast;
  } else {
    // Only decrement total (not first of day)
    total = prevTotal;
  }
}
```

### Date Handling

**Uses local calendar day (not UTC):**
```javascript
function todayLocalISO() {
  return new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
}
```

**Why local time?**
- ✅ Matches user's perceived "day"
- ✅ Works across DST transitions
- ✅ No timezone conversion bugs
- ✅ Standard format (en-CA = YYYY-MM-DD)

## UI/UX Updates

### Copy Changes
- Section header: **"Daily streak & activity"** (was "Your streak & activity")
- Share button: **"Share my daily streak"** (was "Share my streak")
- Share text: **"I'm on a X-day daily streak (Y completions total)"**

### Streak Display
```
🔥 3 days • 12 total
```

**Tooltip shows:**
```
Daily streak: 3 consecutive days
Total completions: 12
Best streak: 5 days  ← Only if best > current
```

### Quiet Hours
- Do NOT affect streak tracking
- Only suppress notifications
- Completions during quiet hours count normally

## Debug Tools

### Available Commands
```javascript
BreakBreathDebug.getStreaks()          // View state
BreakBreathDebug.recordMove(name)      // Simulate completion
BreakBreathDebug.undoLastMove()        // Undo (30s window)
BreakBreathDebug.resetStreaks()        // Clear all
BreakBreathDebug.getShareLine()        // Get share text

// Time travel
BreakBreathDebug.testYesterday()       // Set last to yesterday
BreakBreathDebug.testThreeDaysAgo()    // Set last to 3 days ago
BreakBreathDebug.setDate(daysAgo)      // Set last to N days ago
```

### Example Debug Session
```javascript
// Clear state
BreakBreathDebug.resetStreaks();

// Day 1
BreakBreathDebug.recordMove("Exercise 1");
// → { total: 1, daily: 1, best: 1 }

// Same day
BreakBreathDebug.recordMove("Exercise 2");
// → { total: 2, daily: 1, best: 1 }

// Yesterday
BreakBreathDebug.testYesterday();
BreakBreathDebug.recordMove("Exercise 3");
// → { total: 3, daily: 2, best: 2 }

// Gap (3 days)
BreakBreathDebug.setDate(4);
BreakBreathDebug.recordMove("After gap");
// → { total: 4, daily: 1, best: 2 }  ← best persists!
```

## Test Coverage

### Automated Tests (11 total)
1. First completion creates streak
2. Second completion same day doesn't increment
3. Consecutive days increments
4. Gap day resets to 1
5. Best streak persists after break
6. Undo within 30s rolls back
7. Undo not first of day (only decrements total)
8. Undo after 30s fails gracefully
9. Persistence across refresh
10. Local date boundary handling
11. Cross-tab synchronization (via storage events)

### Manual Tests (9 total)
1. Quiet hours don't affect streak
2. UI copy correctness
3. Tooltip shows best streak
4. Share button functionality
5. Cross-tab updates
6. Near-midnight completions
7. Analytics events (if wired)
8. Refresh persistence
9. Best streak display

**Total: 20 test scenarios**

## Running Tests

### Quick Test (5 seconds)
```javascript
// In browser console after loading app
StreakTestSuite.runQuick()
```

### Full Test Suite (36 seconds)
```javascript
StreakTestSuite.runAll()  // Includes 31s timeout test
```

### Individual Test
```javascript
StreakTestSuite.tests.testFirstCompletion()
```

### Manual Checklist
```javascript
StreakTestSuite.printManualTests()
```

## Acceptance Criteria ✅

- [x] **State keys:** bb_streak_total, bb_daily_streak, bb_best_streak, bb_last_completion_local
- [x] **First of day:** Increments daily streak once
- [x] **Same day:** Increments total only
- [x] **Yesterday:** Increments daily streak
- [x] **Gap (2+ days):** Resets daily to 1
- [x] **Best tracking:** Updates when daily > best, persists after breaks
- [x] **Undo (30s):** Rolls back first-of-day completions
- [x] **Local time:** Uses toLocaleDateString('en-CA')
- [x] **Persistence:** All values survive refresh
- [x] **UI copy:** Says "Daily streak" consistently
- [x] **Quiet hours:** Don't affect tracking
- [x] **Backward compat:** Migrates legacy keys
- [x] **Debug tools:** Full API exposed

## Key Design Decisions

### Why Daily (not Hourly)?
- Simpler mental model
- Less pressure on users
- Industry standard (Duolingo, GitHub)
- Sustainable long-term

### Why 30s Undo Window?
- Long enough for accidents
- Short enough to prevent gaming
- Industry standard (Gmail, Slack)
- Balances UX and integrity

### Why Best Streak?
- Motivation boost
- Shows progress over time
- Survives setbacks
- Common pattern in habit apps

### Why Local Calendar Day?
- Matches user perception
- No UTC midnight bugs
- DST-safe
- Simpler debugging

## Edge Cases Handled

1. **Clock skew:** Ignores negative day differences
2. **DST transitions:** Local date string handles automatically
3. **Midnight boundary:** Distinct days recognized correctly
4. **Same-second completions:** Total increments, daily once
5. **Page refresh during undo window:** Window resets (by design)
6. **Cross-tab completions:** Syncs via storage events
7. **Legacy data:** Auto-migrates old keys on load
8. **Empty state:** Handles null/undefined gracefully

## Analytics Events (Optional)

```javascript
trackEvent('streak_incremented', {
  daily: newDailyStreak,
  total: newTotal,
  best: newBest,
  isNewBest: newBest > oldBest
})

trackEvent('streak_broken', {
  lastStreak: oldDaily,
  daysGap: gap,
  bestStreak: best
})

trackEvent('undo_completion', {
  withinWindow: true,
  wasFirstOfDay: true,
  timeElapsed: elapsedMs
})
```

## Files

- `index.html` - Main implementation
- `streak-tests.js` - Automated test suite
- `STREAK_TESTS.md` - Comprehensive test documentation
- `QUICK_TEST_REFERENCE.md` - Quick reference card
- `STREAK_IMPLEMENTATION.md` - This file

## Migration Notes

### From Old System
Old keys auto-migrate on first load:
```javascript
if (localStorage.getItem('bb_streak') && !localStorage.getItem('bb_streak_total')) {
  localStorage.setItem('bb_streak_total', localStorage.getItem('bb_streak'));
}
```

### For Users
- Existing streak counts preserved
- Daily streak resets (fresh start with new rules)
- Best streak initialized from current daily

## Future Enhancements (Not Implemented)

- [ ] Weekly/monthly streak views
- [ ] Streak freeze (miss a day without penalty)
- [ ] Calendar heat map visualization
- [ ] Push notifications for streak reminders
- [ ] Social sharing with rich previews
- [ ] Achievements/badges for milestones
- [ ] Streak leaderboards (Teams feature)
- [ ] Export streak data (CSV/JSON)

## Support & Debugging

### Check State
```javascript
BreakBreathDebug.getStreaks()
```

### Reset Everything
```javascript
BreakBreathDebug.resetStreaks()
```

### Verify Implementation
```javascript
// Should return function
typeof recordMicroMoveCompleted

// Should return function
typeof undoLastCompletion

// Should use local time
new Date().toLocaleDateString('en-CA')
```

### Common Issues

**Q: Streak not incrementing?**
A: Check if it's the first completion today. Same-day completions only increment total.

**Q: Wrong date shown?**
A: Ensure using `toLocaleDateString('en-CA')`, not UTC methods.

**Q: Undo not working?**
A: Check if > 30s elapsed. Window expires after 30 seconds.

**Q: Best streak too low?**
A: Best only updates when daily > best. Check if you broke streak before reaching old best.

## Conclusion

The daily streak system is production-ready with:
- ✅ Robust state management
- ✅ Clear user-facing rules
- ✅ Comprehensive test coverage
- ✅ Debug tools for development
- ✅ Graceful error handling
- ✅ Backward compatibility
- ✅ DST-safe date handling

**Ready for deployment! 🚀**
