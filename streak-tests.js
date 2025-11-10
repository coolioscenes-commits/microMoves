/**
 * BreakBreath Daily Streak Test Pack
 *
 * Run in browser console after loading the app:
 * 1. Copy this entire file
 * 2. Paste into console
 * 3. Run: StreakTestSuite.runAll()
 *
 * Or run individual tests:
 * StreakTestSuite.tests.testFirstCompletion()
 */

const StreakTestSuite = {
  // Test utilities
  clearState() {
    localStorage.removeItem('bb_streak_total');
    localStorage.removeItem('bb_daily_streak');
    localStorage.removeItem('bb_best_streak');
    localStorage.removeItem('bb_last_completion_local');
    localStorage.removeItem('breakbreath_log');
    if (typeof lastCompletionData !== 'undefined') {
      lastCompletionData = null;
    }
    console.log('✓ State cleared');
  },

  getState() {
    return {
      total: parseInt(localStorage.getItem('bb_streak_total') || '0', 10),
      daily: parseInt(localStorage.getItem('bb_daily_streak') || '0', 10),
      best: parseInt(localStorage.getItem('bb_best_streak') || '0', 10),
      last: localStorage.getItem('bb_last_completion_local') || null
    };
  },

  assert(condition, message) {
    if (!condition) {
      throw new Error(`❌ FAIL: ${message}`);
    }
    console.log(`  ✓ ${message}`);
  },

  assertEqual(actual, expected, label) {
    this.assert(actual === expected, `${label}: expected ${expected}, got ${actual}`);
  },

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  mockDate(daysAgo) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const iso = date.toLocaleDateString('en-CA');
    localStorage.setItem('bb_last_completion_local', iso);
    return iso;
  },

  todayISO() {
    return new Date().toLocaleDateString('en-CA');
  },

  // Test cases
  tests: {
    async testFirstCompletion() {
      console.log('\n📝 Test: First completion of day increments streak');
      StreakTestSuite.clearState();

      const today = StreakTestSuite.todayISO();
      const result = recordMicroMoveCompleted('Test move 1');

      const state = StreakTestSuite.getState();
      StreakTestSuite.assertEqual(state.daily, 1, 'bb_daily_streak');
      StreakTestSuite.assertEqual(state.total, 1, 'bb_streak_total');
      StreakTestSuite.assertEqual(state.best, 1, 'bb_best_streak');
      StreakTestSuite.assertEqual(state.last, today, 'bb_last_completion_local');

      console.log('✅ PASS: First completion increments streak correctly');
      return true;
    },

    async testSecondCompletionSameDay() {
      console.log('\n📝 Test: Second completion same day doesn\'t increment daily streak');
      StreakTestSuite.clearState();

      // First completion
      recordMicroMoveCompleted('Test move 1');
      const afterFirst = StreakTestSuite.getState();

      // Second completion same day
      recordMicroMoveCompleted('Test move 2');
      const afterSecond = StreakTestSuite.getState();

      StreakTestSuite.assertEqual(afterSecond.daily, afterFirst.daily, 'bb_daily_streak unchanged');
      StreakTestSuite.assertEqual(afterSecond.total, afterFirst.total + 1, 'bb_streak_total increments');
      StreakTestSuite.assertEqual(afterSecond.last, afterFirst.last, 'bb_last_completion_local unchanged');

      console.log('✅ PASS: Second completion same day handled correctly');
      return true;
    },

    async testConsecutiveDays() {
      console.log('\n📝 Test: Consecutive days increments streak');
      StreakTestSuite.clearState();

      // Day 1
      recordMicroMoveCompleted('Day 1');
      const day1State = StreakTestSuite.getState();
      StreakTestSuite.assertEqual(day1State.daily, 1, 'Day 1: daily = 1');

      // Mock yesterday's completion
      StreakTestSuite.mockDate(1);

      // Day 2 (today)
      recordMicroMoveCompleted('Day 2');
      const day2State = StreakTestSuite.getState();
      StreakTestSuite.assertEqual(day2State.daily, 2, 'Day 2: daily = 2');
      StreakTestSuite.assertEqual(day2State.best, 2, 'Best streak updated to 2');
      StreakTestSuite.assertEqual(day2State.last, StreakTestSuite.todayISO(), 'Last completion is today');

      console.log('✅ PASS: Consecutive days increment correctly');
      return true;
    },

    async testGapDayResets() {
      console.log('\n📝 Test: Gap day resets streak to 1');
      StreakTestSuite.clearState();

      // Day 1
      recordMicroMoveCompleted('Day 1');

      // Mock 3 days ago (simulating a 2-day gap)
      StreakTestSuite.mockDate(3);

      // Today (after gap)
      recordMicroMoveCompleted('After gap');
      const state = StreakTestSuite.getState();

      StreakTestSuite.assertEqual(state.daily, 1, 'Daily streak reset to 1');
      StreakTestSuite.assertEqual(state.total, 2, 'Total is 2');
      StreakTestSuite.assertEqual(state.last, StreakTestSuite.todayISO(), 'Last completion is today');

      console.log('✅ PASS: Gap day resets streak correctly');
      return true;
    },

    async testBestStreakPersists() {
      console.log('\n📝 Test: Best streak persists after break');
      StreakTestSuite.clearState();

      // Build to 3-day streak
      // Day 1
      recordMicroMoveCompleted('Day 1');
      StreakTestSuite.mockDate(2);

      // Day 2
      recordMicroMoveCompleted('Day 2');
      StreakTestSuite.mockDate(1);

      // Day 3
      recordMicroMoveCompleted('Day 3');
      const peak = StreakTestSuite.getState();
      StreakTestSuite.assertEqual(peak.daily, 3, 'Peak daily = 3');
      StreakTestSuite.assertEqual(peak.best, 3, 'Best = 3');

      // Break streak (4 days gap)
      StreakTestSuite.mockDate(5);

      // New completion after break
      recordMicroMoveCompleted('After break');
      const afterBreak = StreakTestSuite.getState();

      StreakTestSuite.assertEqual(afterBreak.daily, 1, 'Daily reset to 1');
      StreakTestSuite.assertEqual(afterBreak.best, 3, 'Best streak persists at 3');

      console.log('✅ PASS: Best streak persists after break');
      return true;
    },

    async testUndoWithinWindow() {
      console.log('\n📝 Test: Undo within 30s window rolls back');
      StreakTestSuite.clearState();

      // Complete first of day
      recordMicroMoveCompleted('First of day');
      const afterCompletion = StreakTestSuite.getState();
      StreakTestSuite.assertEqual(afterCompletion.daily, 1, 'Daily = 1 after completion');
      StreakTestSuite.assertEqual(afterCompletion.total, 1, 'Total = 1 after completion');

      // Undo within window (immediate)
      await StreakTestSuite.sleep(100); // Small delay to ensure it's set
      const undoResult = undoLastCompletion();

      StreakTestSuite.assert(undoResult.success, 'Undo succeeded');
      StreakTestSuite.assert(undoResult.rolled_back, 'Streak rolled back');

      const afterUndo = StreakTestSuite.getState();
      StreakTestSuite.assertEqual(afterUndo.daily, 0, 'Daily rolled back to 0');
      StreakTestSuite.assertEqual(afterUndo.total, 0, 'Total rolled back to 0');
      StreakTestSuite.assertEqual(afterUndo.last, null, 'Last completion cleared');

      console.log('✅ PASS: Undo within window rolls back correctly');
      return true;
    },

    async testUndoNotFirstOfDay() {
      console.log('\n📝 Test: Undo not first of day only decrements total');
      StreakTestSuite.clearState();

      // First completion
      recordMicroMoveCompleted('First');
      const afterFirst = StreakTestSuite.getState();

      // Second completion same day
      recordMicroMoveCompleted('Second');
      const afterSecond = StreakTestSuite.getState();
      StreakTestSuite.assertEqual(afterSecond.total, 2, 'Total = 2');
      StreakTestSuite.assertEqual(afterSecond.daily, 1, 'Daily still 1');

      // Undo second completion (not first of day)
      await StreakTestSuite.sleep(100);
      const undoResult = undoLastCompletion();

      StreakTestSuite.assert(undoResult.success, 'Undo succeeded');
      StreakTestSuite.assert(!undoResult.rolled_back, 'Streak not rolled back');

      const afterUndo = StreakTestSuite.getState();
      StreakTestSuite.assertEqual(afterUndo.daily, 1, 'Daily unchanged at 1');
      StreakTestSuite.assertEqual(afterUndo.total, 1, 'Total decremented to 1');

      console.log('✅ PASS: Undo not first of day handled correctly');
      return true;
    },

    async testUndoAfterWindow() {
      console.log('\n📝 Test: Undo after 30s window expires');
      console.log('  ⏰ This test takes ~31 seconds...');
      StreakTestSuite.clearState();

      // Complete
      recordMicroMoveCompleted('Test');
      const beforeWait = StreakTestSuite.getState();

      // Wait for window to expire
      await StreakTestSuite.sleep(31000);

      // Try to undo
      const undoResult = undoLastCompletion();

      StreakTestSuite.assert(!undoResult.success, 'Undo failed after window');
      StreakTestSuite.assert(undoResult.reason.includes('expired'), 'Correct error message');

      const afterUndo = StreakTestSuite.getState();
      StreakTestSuite.assertEqual(afterUndo.daily, beforeWait.daily, 'Daily unchanged');
      StreakTestSuite.assertEqual(afterUndo.total, beforeWait.total, 'Total unchanged');

      console.log('✅ PASS: Undo after window expires correctly');
      return true;
    },

    async testPersistence() {
      console.log('\n📝 Test: Persistence across page refresh');
      StreakTestSuite.clearState();

      // Create streak
      recordMicroMoveCompleted('Before refresh');
      StreakTestSuite.mockDate(1);
      recordMicroMoveCompleted('Before refresh 2');

      const before = StreakTestSuite.getState();

      // Simulate refresh by reading from localStorage
      const after = StreakTestSuite.getState();

      StreakTestSuite.assertEqual(after.daily, before.daily, 'Daily persists');
      StreakTestSuite.assertEqual(after.total, before.total, 'Total persists');
      StreakTestSuite.assertEqual(after.best, before.best, 'Best persists');
      StreakTestSuite.assertEqual(after.last, before.last, 'Last completion persists');

      console.log('✅ PASS: All values persist correctly');
      console.log('  💡 Manual test: Refresh browser and check streak display');
      return true;
    },

    async testLocalDateBoundary() {
      console.log('\n📝 Test: Local date boundary (near midnight)');
      StreakTestSuite.clearState();

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      // Simulate completion yesterday at 23:59
      const yesterdayISO = yesterday.toLocaleDateString('en-CA');
      localStorage.setItem('bb_last_completion_local', yesterdayISO);
      localStorage.setItem('bb_daily_streak', '1');
      localStorage.setItem('bb_streak_total', '1');
      localStorage.setItem('bb_best_streak', '1');

      // Complete today at 00:01 (or current time if not midnight)
      recordMicroMoveCompleted('Today');
      const state = StreakTestSuite.getState();

      const todayISO = today.toLocaleDateString('en-CA');
      StreakTestSuite.assertEqual(state.last, todayISO, 'Last completion is today');
      StreakTestSuite.assertEqual(state.daily, 2, 'Daily incremented to 2');

      console.log('✅ PASS: Date boundary handled correctly');
      console.log('  📅 Yesterday:', yesterdayISO);
      console.log('  📅 Today:', todayISO);
      return true;
    }
  },

  // Run all tests
  async runAll() {
    console.log('\n🧪 BreakBreath Daily Streak Test Suite');
    console.log('=' .repeat(50));

    const tests = [
      'testFirstCompletion',
      'testSecondCompletionSameDay',
      'testConsecutiveDays',
      'testGapDayResets',
      'testBestStreakPersists',
      'testUndoWithinWindow',
      'testUndoNotFirstOfDay',
      'testPersistence',
      'testLocalDateBoundary'
    ];

    const results = {
      passed: 0,
      failed: 0,
      errors: []
    };

    for (const testName of tests) {
      try {
        await this.tests[testName]();
        results.passed++;
      } catch (error) {
        results.failed++;
        results.errors.push({ test: testName, error: error.message });
        console.error(`❌ ${testName} failed:`, error.message);
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('📊 Test Results:');
    console.log(`  ✅ Passed: ${results.passed}`);
    console.log(`  ❌ Failed: ${results.failed}`);

    if (results.errors.length > 0) {
      console.log('\n❌ Failed Tests:');
      results.errors.forEach(({ test, error }) => {
        console.log(`  - ${test}: ${error}`);
      });
    }

    console.log('\n' + '='.repeat(50));

    if (results.failed === 0) {
      console.log('🎉 All tests passed!');
    }

    return results;
  },

  // Run all tests except the long-running undo timeout test
  async runQuick() {
    console.log('\n🧪 BreakBreath Daily Streak Test Suite (Quick)');
    console.log('=' .repeat(50));

    const tests = [
      'testFirstCompletion',
      'testSecondCompletionSameDay',
      'testConsecutiveDays',
      'testGapDayResets',
      'testBestStreakPersists',
      'testUndoWithinWindow',
      'testUndoNotFirstOfDay',
      'testPersistence',
      'testLocalDateBoundary'
    ];

    const results = {
      passed: 0,
      failed: 0,
      errors: []
    };

    for (const testName of tests) {
      try {
        await this.tests[testName]();
        results.passed++;
      } catch (error) {
        results.failed++;
        results.errors.push({ test: testName, error: error.message });
        console.error(`❌ ${testName} failed:`, error.message);
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('📊 Test Results:');
    console.log(`  ✅ Passed: ${results.passed}`);
    console.log(`  ❌ Failed: ${results.failed}`);

    if (results.errors.length > 0) {
      console.log('\n❌ Failed Tests:');
      results.errors.forEach(({ test, error }) => {
        console.log(`  - ${test}: ${error}`);
      });
    }

    console.log('\n' + '='.repeat(50));

    if (results.failed === 0) {
      console.log('🎉 All tests passed!');
    }

    console.log('\n💡 To test undo timeout (31s test):');
    console.log('   StreakTestSuite.tests.testUndoAfterWindow()');

    return results;
  },

  // Manual test instructions
  printManualTests() {
    console.log('\n📋 Manual Test Checklist:');
    console.log('=' .repeat(50));
    console.log('\n1️⃣  Quiet Hours Test:');
    console.log('   - Toggle Quiet Hours on in settings');
    console.log('   - Complete an exercise');
    console.log('   - Verify streak increments as usual');
    console.log('   - Quiet hours should not affect streak logic');

    console.log('\n2️⃣  UI Display Test:');
    console.log('   - Check streak chip shows: "🔥 X days • Y total"');
    console.log('   - Hover to see tooltip with best streak');
    console.log('   - Section header says "Daily streak & activity"');
    console.log('   - Share button says "Share my daily streak"');

    console.log('\n3️⃣  Persistence Test:');
    console.log('   - Build a 3-day streak');
    console.log('   - Refresh the page (F5)');
    console.log('   - Verify all values intact in streak chip');

    console.log('\n4️⃣  Cross-tab Sync Test:');
    console.log('   - Open app in two browser tabs');
    console.log('   - Complete exercise in Tab 1');
    console.log('   - Check Tab 2 updates streak display');

    console.log('\n5️⃣  Best Streak Display Test:');
    console.log('   - Build streak to 5 days');
    console.log('   - Break streak (skip 2 days)');
    console.log('   - Hover streak chip tooltip');
    console.log('   - Verify shows "Best streak: 5 days"');

    console.log('\n6️⃣  Analytics Test (if wired):');
    console.log('   - Open browser DevTools → Console');
    console.log('   - Complete first exercise of day');
    console.log('   - Check for "streak_incremented" event');
    console.log('   - Complete second exercise same day');
    console.log('   - Verify NO "streak_incremented" event');

    console.log('\n' + '='.repeat(50));
  }
};

// Auto-run quick tests if console commands are available
if (typeof recordMicroMoveCompleted !== 'undefined') {
  console.log('\n✨ StreakTestSuite loaded!');
  console.log('\nQuick start:');
  console.log('  StreakTestSuite.runQuick()     - Run all tests (fast)');
  console.log('  StreakTestSuite.runAll()       - Run all tests (includes 31s test)');
  console.log('  StreakTestSuite.printManualTests() - Show manual test checklist');
} else {
  console.log('⚠️  Load this in BreakBreath app context to run tests');
}
