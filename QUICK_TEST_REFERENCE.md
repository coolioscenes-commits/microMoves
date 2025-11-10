# Daily Streak Test Pack - Quick Reference

## 🚀 Quick Start (30 seconds)

1. Open BreakBreath in browser
2. Open DevTools Console (F12)
3. Copy/paste contents of `streak-tests.js`
4. Run: `StreakTestSuite.runQuick()`

## 📋 Test Scenarios (P0)

### Core Tests
```javascript
// All fast tests (~5 seconds)
StreakTestSuite.runQuick()

// Individual tests
StreakTestSuite.tests.testFirstCompletion()          // First creates streak
StreakTestSuite.tests.testSecondCompletionSameDay()  // Same day doesn't increment
StreakTestSuite.tests.testConsecutiveDays()          // Yesterday → +1
StreakTestSuite.tests.testGapDayResets()             // 2+ days → reset to 1
StreakTestSuite.tests.testBestStreakPersists()       // Best survives breaks
```

### Undo Tests
```javascript
StreakTestSuite.tests.testUndoWithinWindow()         // Undo works < 30s
StreakTestSuite.tests.testUndoNotFirstOfDay()        // Undo 2nd completion
StreakTestSuite.tests.testUndoAfterWindow()          // Takes 31s!
```

### Edge Cases
```javascript
StreakTestSuite.tests.testPersistence()              // Survives refresh
StreakTestSuite.tests.testLocalDateBoundary()        // Midnight transitions
```

## 🧪 Expected Results

| State | Initial | After 1st | After 2nd Same Day | After Yesterday | After Gap |
|-------|---------|-----------|-------------------|-----------------|-----------|
| **daily** | 0 | 1 | 1 | 2 | 1 |
| **total** | 0 | 1 | 2 | 3 | 4 |
| **best** | 0 | 1 | 1 | 2 | 2 |
| **last** | null | today | today | today | today |

## 🔧 Debug Commands

```javascript
// View state
BreakBreathDebug.getStreaks()

// Test completions
BreakBreathDebug.recordMove("Test")

// Time travel
BreakBreathDebug.testYesterday()      // Last = yesterday
BreakBreathDebug.testThreeDaysAgo()   // Last = 3 days ago
BreakBreathDebug.setDate(7)           // Last = 7 days ago

// Undo & reset
BreakBreathDebug.undoLastMove()       // Undo (30s window)
BreakBreathDebug.resetStreaks()       // Clear all

// Utils
StreakTestSuite.clearState()          // Reset for testing
StreakTestSuite.getState()            // View localStorage
```

## ✅ Manual Checklist

- [ ] **Quiet Hours:** Toggle on → complete → streak increments
- [ ] **UI Text:** "Daily streak & activity" section header
- [ ] **Share Button:** Says "Share my daily streak"
- [ ] **Tooltip:** Hover chip → shows best if > current
- [ ] **Cross-tab:** Complete in Tab 1 → Tab 2 updates
- [ ] **Persistence:** Refresh page → values intact

## 📊 Success Criteria

All tests pass when:
- ✅ First of day: `daily += 1`, `total += 1`
- ✅ Same day: `daily` unchanged, `total += 1`
- ✅ Yesterday: `daily += 1`, updates `best`
- ✅ Gap (2+ days): `daily = 1`, `best` unchanged
- ✅ Undo < 30s: Rolls back if first of day
- ✅ Undo > 30s: Fails gracefully
- ✅ Local time: Uses `toLocaleDateString('en-CA')`
- ✅ Persists: All values in localStorage

## 🐛 Common Failures

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Daily not incrementing | Same-day completion | Expected behavior |
| Wrong date | Using UTC | Switch to local time |
| Undo fails | > 30s elapsed | Expected behavior |
| Best too low | Not updating max | Check `Math.max()` logic |

## 📝 One-Liner Tests

```javascript
// Quick smoke test
StreakTestSuite.clearState();
BreakBreathDebug.recordMove("Test");
console.log(StreakTestSuite.getState()); // Should show daily=1, total=1

// Test consecutive days
StreakTestSuite.clearState();
BreakBreathDebug.recordMove("Day 1");
BreakBreathDebug.testYesterday();
BreakBreathDebug.recordMove("Day 2");
console.log(StreakTestSuite.getState()); // Should show daily=2

// Test gap reset
StreakTestSuite.clearState();
BreakBreathDebug.recordMove("Day 1");
BreakBreathDebug.setDate(3);
BreakBreathDebug.recordMove("After gap");
console.log(StreakTestSuite.getState()); // Should show daily=1

// Test undo (quick)
StreakTestSuite.clearState();
BreakBreathDebug.recordMove("Test");
console.log(BreakBreathDebug.undoLastMove()); // Should succeed
console.log(StreakTestSuite.getState()); // Should show daily=0, total=0
```

## 📦 State Keys Reference

```javascript
localStorage.getItem('bb_streak_total')         // Total completions (int)
localStorage.getItem('bb_daily_streak')         // Current daily streak (int)
localStorage.getItem('bb_best_streak')          // Best daily streak (int)
localStorage.getItem('bb_last_completion_local') // Last date YYYY-MM-DD (string)
localStorage.getItem('breakbreath_log')         // Last 10 activities (JSON array)
```

## 🎯 What to Test

1. **Happy Path:** Complete → check chip shows streak
2. **Same Day:** Complete twice → daily unchanged
3. **Consecutive:** Yesterday mock → complete → daily +1
4. **Gap:** 3 days ago mock → complete → daily = 1
5. **Undo:** Complete → undo immediately → streak reverted
6. **Persistence:** Build streak → refresh → still there
7. **Quiet Hours:** Enable → complete → streak increments
8. **UI Copy:** Check all text says "Daily streak"

## ⚡ Lightning Round (60 seconds)

```javascript
// Load test suite (paste streak-tests.js)

// Run all fast tests
StreakTestSuite.runQuick()

// Manual spot checks
// 1. Check UI says "Daily streak"
// 2. Complete exercise → streak chip appears
// 3. Hover chip → tooltip shows best if applicable
// 4. Refresh page → streak persists

// Done! 🎉
```
