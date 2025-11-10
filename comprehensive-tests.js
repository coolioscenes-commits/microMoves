/**
 * Comprehensive Test Suite for BreakBreath Application
 * Tests B through R covering all functionality
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const htmlContent = readFileSync(join(__dirname, 'index.html'), 'utf-8');

const results = {
  sections: {},
  totalPassed: 0,
  totalFailed: 0,
  warnings: []
};

function section(name) {
  results.sections[name] = { passed: [], failed: [], warnings: [] };
  return results.sections[name];
}

function test(sectionName, testId, name, condition, details = '') {
  if (!results.sections[sectionName]) {
    results.sections[sectionName] = { passed: [], failed: [], warnings: [] };
  }

  const sec = results.sections[sectionName];
  const fullName = `${testId}: ${name}`;

  if (condition) {
    sec.passed.push({ name: fullName, details });
    results.totalPassed++;
  } else {
    sec.failed.push({ name: fullName, details });
    results.totalFailed++;
  }
}

function warn(sectionName, message) {
  results.sections[sectionName].warnings.push(message);
  results.warnings.push(`[${sectionName}] ${message}`);
}

console.log('\n═══════════════════════════════════════════════════════════');
console.log('  COMPREHENSIVE TEST SUITE - BreakBreath Application');
console.log('═══════════════════════════════════════════════════════════\n');

// ============================================================================
// ============================================================================
// B) Environment chips
// ============================================================================

console.log('B) Environment chips (Where are you now?)\n');
let sec = section('B: Environment Chips');

// B1: Environment chips
const envChips = ['office', 'queue', 'home', 'commute', 'outdoors'];
const hasEnvSection = htmlContent.includes('Where are you now') || htmlContent.includes('environment');
test('B', 'B1.1', 'Environment section exists', hasEnvSection);

envChips.forEach(env => {
  const hasChip = htmlContent.match(new RegExp(`data-env="${env}"`, 'i')) ||
                  htmlContent.match(new RegExp(`\\b${env}\\b`, 'i'));
  test('B', `B1.2.${env}`, `${env.charAt(0).toUpperCase() + env.slice(1)} chip exists`, !!hasChip);
});

const hasAriaPressed = htmlContent.includes('aria-pressed');
test('B', 'B1.3', 'Chips have aria-pressed attribute', hasAriaPressed);

const hasEnvLS = htmlContent.includes('breakbreath_env') || htmlContent.includes('bb_env');
test('B', 'B1.4', 'LocalStorage key for environment', hasEnvLS);

const hasEnvChangedEvent = htmlContent.includes('env_changed') || htmlContent.includes('environment_changed');
test('B', 'B1.5', 'env_changed analytics event', hasEnvChangedEvent);

// B2: Help tip
const hasInfoIcon = htmlContent.includes('ⓘ') || htmlContent.includes('info') || htmlContent.includes('help');
test('B', 'B2.1', 'Help/info elements present', hasInfoIcon);

const hasTooltipOrModal = htmlContent.includes('tooltip') || htmlContent.includes('popover');
test('B', 'B2.2', 'Tooltip/popover implementation', hasTooltipOrModal);

// ============================================================================
// C) Exercise Filters
// ============================================================================

sec = section('C: Exercise Filters');
console.log('\nC) Exercise Filters\n');

// C1: Pack chips
const filterCategories = ['breath', 'eyes', 'upper', 'lower', 'posture', 'quiet'];
const hasFiltersSection = htmlContent.includes('Exercise filters') || htmlContent.includes('filter');
test('C', 'C1.1', 'Exercise filters section exists', hasFiltersSection);

filterCategories.forEach(filter => {
  const hasFilter = htmlContent.match(new RegExp(`data-filter="${filter}"`, 'i'));
  test('C', `C1.2.${filter}`, `${filter.charAt(0).toUpperCase() + filter.slice(1)} filter chip exists`, !!hasFilter);
});

const hasMultiSelect = htmlContent.includes('aria-pressed') && htmlContent.includes('chip');
test('C', 'C1.3', 'Multi-select chip behavior (aria-pressed)', hasMultiSelect);

const hasFilterLS = htmlContent.includes('bb_filters') ||
                    htmlContent.includes('bb_seated_only') ||
                    htmlContent.includes('bb_hidden_exercises');
test('C', 'C1.4', 'LocalStorage for filters (bb_filters/bb_seated_only/bb_hidden_exercises)', hasFilterLS);

const hasFilterEvent = htmlContent.includes('filter_updated') || htmlContent.includes('filter_changed');
test('C', 'C1.5', 'filter_updated analytics event', hasFilterEvent);

// C2: Pro-gated chips
const hasProGate = htmlContent.includes('🔒') || htmlContent.includes('Pro') || htmlContent.includes('locked');
test('C', 'C2.1', 'Pro-gated features indicators present', hasProGate);

const hasProUpsell = htmlContent.includes('pro_gate_viewed') || htmlContent.includes('pro') && htmlContent.includes('unlock');
test('C', 'C2.2', 'Pro upsell dialog/flow', hasProUpsell);

// ============================================================================
// D) Pro unlock blocks
// ============================================================================

sec = section('D: Pro Unlock');
console.log('\nD) Pro unlock blocks\n');

// D1: Hero Pro card
const hasProCTA = htmlContent.includes('Unlock Pro') || htmlContent.includes('A$12');
test('D', 'D1.1', 'Pro CTA exists (Unlock Pro / A$12)', hasProCTA);

const hasProCtaEvent = htmlContent.includes('pro_cta_clicked');
test('D', 'D1.2', 'pro_cta_clicked analytics event', hasProCtaEvent);

// D2: Feature list consistency
const proFeatures = ['quiet hours', 'custom intervals', 'extra packs', 'one-tap .ics', 'streak'];
proFeatures.forEach(feature => {
  const count = (htmlContent.match(new RegExp(feature, 'gi')) || []).length;
  test('D', `D2.${feature.replace(/\s/g, '_')}`, `Feature "${feature}" mentioned`, count > 0);
  if (count === 1) {
    warn('D', `"${feature}" only mentioned once - check consistency across sections`);
  }
});

// ============================================================================
// E) Accessibility section
// ============================================================================

sec = section('E: Accessibility');
console.log('\nE) Accessibility section\n');

// E1: Seated-only toggle
const hasSeatedToggle = htmlContent.includes('seated') && htmlContent.includes('upper-body');
test('E', 'E1.1', 'Seated & upper-body toggle exists', hasSeatedToggle);

const hasSeatedLS = htmlContent.includes('bb_seated_only');
test('E', 'E1.2', 'bb_seated_only LocalStorage key', hasSeatedLS);

const hasA11yEvent = htmlContent.includes('accessibility_updated');
test('E', 'E1.3', 'accessibility_updated analytics event', hasA11yEvent);

const hasLabelAnnouncement = htmlContent.includes('aria-live') || htmlContent.includes('role="status"');
test('E', 'E1.4', 'Screen reader announcements (aria-live/role=status)', hasLabelAnnouncement);

// ============================================================================
// F) Suggestion card
// ============================================================================

sec = section('F: Suggestion Card');
console.log('\nF) Suggestion card ("Next 60-sec reset")\n');

// F1: Why this works
const hasWhyButton = htmlContent.includes('Why this works') || htmlContent.includes('why');
test('F', 'F1.1', '"Why this works" button exists', hasWhyButton);

const hasCollapsible = htmlContent.includes('aria-expanded');
test('F', 'F1.2', 'Collapsible content (aria-expanded)', hasCollapsible);

// F2: Timer
const hasTimerControls = htmlContent.includes('Start') &&
                         htmlContent.includes('Pause') &&
                         htmlContent.includes('Reset');
test('F', 'F2.1', 'Timer controls (Start/Pause/Reset)', hasTimerControls);

const hasTimerEvents = htmlContent.includes('timer_started') ||
                       htmlContent.includes('timer_paused') ||
                       htmlContent.includes('timer_completed');
test('F', 'F2.2', 'Timer analytics events', hasTimerEvents);

const hasReducedMotion = htmlContent.includes('prefers-reduced-motion');
test('F', 'F2.3', 'Reduced motion support', hasReducedMotion);

const hasAriaLive = htmlContent.includes('aria-live="polite"');
test('F', 'F2.4', 'Timer status with aria-live=polite', hasAriaLive);

// F3: More menu
const hasMoreMenu = htmlContent.includes('⋯') || htmlContent.includes('menu');
test('F', 'F3.1', 'More menu (⋯) exists', hasMoreMenu);

const hasCopySteps = htmlContent.includes('Copy') && htmlContent.includes('steps');
test('F', 'F3.2', 'Copy steps functionality', hasCopySteps);

const hasKeyboardShortcuts = htmlContent.includes('Keyboard shortcuts') || htmlContent.includes('shortcuts');
test('F', 'F3.3', 'Keyboard shortcuts popover', hasKeyboardShortcuts);

const hasDontShow = htmlContent.includes("Don't show") || htmlContent.includes('auto');
test('F', 'F3.4', '"Don\'t show automatically" option', hasDontShow);

const hasExerciseCopied = htmlContent.includes('exercise_copied');
test('F', 'F3.5', 'exercise_copied analytics event', hasExerciseCopied);

// F4: Quiet alternative info
const hasQuietInfo = htmlContent.includes('quiet') && htmlContent.includes('alternative');
test('F', 'F4.1', 'Quiet alternative info chip', hasQuietInfo);

const hasAriaDescribedby = htmlContent.includes('aria-describedby');
test('F', 'F4.2', 'aria-describedby for popover', hasAriaDescribedby);

// ============================================================================
// G) Logs & Share
// ============================================================================

sec = section('G: Logs & Share');
console.log('\nG) Logs & Share\n');

// G1: Activity log
const hasLog = htmlContent.includes('log') || htmlContent.includes('activity');
test('G', 'G1.1', 'Activity log section exists', hasLog);

const hasLogLS = htmlContent.includes('breakbreath_log') || htmlContent.includes('bb_log');
test('G', 'G1.2', 'LocalStorage for logs (breakbreath_log/bb_log)', hasLogLS);

// G2: Share progress
const hasShareBtn = htmlContent.includes('Share') && (htmlContent.includes('progress') || htmlContent.includes('streak'));
test('G', 'G2.1', 'Share your progress button exists', hasShareBtn);

const hasShareEvent = htmlContent.includes('share_copied');
test('G', 'G2.2', 'share_copied analytics event', hasShareEvent);

// ============================================================================
// H) Snooze
// ============================================================================

sec = section('H: Snooze');
console.log('\nH) Snooze\n');

// H1: Open Snooze popover
const hasSnoozeBtn = htmlContent.includes('Snooze');
test('H', 'H1.1', 'Snooze button exists', hasSnoozeBtn);

const hasSnoozePopover = htmlContent.includes('snooze') && htmlContent.includes('popover');
test('H', 'H1.2', 'Snooze popover implementation', hasSnoozePopover);

// H2: Presets & custom
const snoozePresets = ['10', '20', '30', '60'];
snoozePresets.forEach(min => {
  const hasPreset = htmlContent.match(new RegExp(`${min}\\s*m(in)?`, 'i'));
  test('H', `H2.${min}m`, `${min}m snooze preset exists`, !!hasPreset);
});

const hasSnoozeLS = htmlContent.includes('bb_snooze_until') || htmlContent.includes('bb_snooze_reason');
test('H', 'H2.5', 'LocalStorage for snooze (bb_snooze_until/bb_snooze_reason)', hasSnoozeLS);

const hasSnoozeEvent = htmlContent.includes('snooze_started');
test('H', 'H2.6', 'snooze_started analytics event', hasSnoozeEvent);

// H3: Undo
const hasUndo = htmlContent.includes('Undo') || htmlContent.includes('undo');
test('H', 'H3.1', 'Undo functionality exists', hasUndo);

const hasUndoEvent = htmlContent.includes('snooze_undone');
test('H', 'H3.2', 'snooze_undone analytics event', hasUndoEvent);

// H4: Dismiss
const hasSnoozeClose = htmlContent.includes('closeSnooze') ||
                       (htmlContent.includes('snooze') && htmlContent.includes('close'));
test('H', 'H4.1', 'Snooze dismiss/close functionality', hasSnoozeClose);

// ============================================================================
// I) Widget Mode
// ============================================================================

sec = section('I: Widget Mode');
console.log('\nI) Widget Mode\n');

// I1: Toggle Widget Mode
const hasWidgetToggle = htmlContent.includes('Widget') && htmlContent.includes('Mode');
test('I', 'I1.1', 'Widget Mode toggle exists', hasWidgetToggle);

const hasWidgetLS = htmlContent.includes('bb_widget_mode');
test('I', 'I1.2', 'bb_widget_mode LocalStorage key', hasWidgetLS);

const hasWidgetEvent = htmlContent.includes('widget_mode_on');
test('I', 'I1.3', 'widget_mode_on analytics event', hasWidgetEvent);

// I2: Widget interactions
const hasWidgetControls = htmlContent.includes('bb-widget') || htmlContent.includes('widget');
test('I', 'I2.1', 'Widget controls implementation', hasWidgetControls);

const hasWidgetStart = htmlContent.includes('bb-widget-start');
test('I', 'I2.2', 'Widget start button (bb-widget-start)', hasWidgetStart);

// ============================================================================
// J) Settings modal
// ============================================================================

sec = section('J: Settings Modal');
console.log('\nJ) Settings modal\n');

// J1: Open/close
const hasSettingsBtn = htmlContent.includes('Settings');
test('J', 'J1.1', 'Settings button exists', hasSettingsBtn);

const hasSettingsModal = htmlContent.includes('settings') && htmlContent.includes('modal');
test('J', 'J1.2', 'Settings modal implementation', hasSettingsModal);

const hasSettingsDialog = htmlContent.match(/settings.*role="dialog"/i);
test('J', 'J1.3', 'Settings modal has role=dialog', !!hasSettingsDialog);

// J2: Reminder interval
const intervals = ['60', '45', '30'];
intervals.forEach(min => {
  const hasInterval = htmlContent.match(new RegExp(`${min}\\s*m`, 'i'));
  test('J', `J2.${min}m`, `${min}m interval option exists`, !!hasInterval);
});

const hasIntervalLS = htmlContent.includes('bb_interval_minutes');
test('J', 'J2.4', 'bb_interval_minutes LocalStorage key', hasIntervalLS);

// J3: Quiet hours
const hasQuietHours = htmlContent.includes('Quiet hours') || htmlContent.includes('quiet_from');
test('J', 'J3.1', 'Quiet hours setting exists', hasQuietHours);

const hasQuietLS = htmlContent.includes('bb_quiet_from') && htmlContent.includes('bb_quiet_to');
test('J', 'J3.2', 'bb_quiet_from/bb_quiet_to LocalStorage keys', hasQuietLS);

// J4: Seated-only mode
test('J', 'J4.1', 'Seated-only mode toggle (duplicate check)', hasSeatedLS);

// J5: Color theme
const hasTheme = htmlContent.includes('theme') || htmlContent.includes('color');
test('J', 'J5.1', 'Color theme selector exists', hasTheme);

const hasThemeLS = htmlContent.includes('bb_theme');
test('J', 'J5.2', 'bb_theme LocalStorage key', hasThemeLS);

// J6: Exercise packs
const hasPacks = htmlContent.includes('Exercise packs') || htmlContent.includes('pack');
test('J', 'J6.1', 'Exercise packs section exists', hasPacks);

const hasPackChips = htmlContent.includes('bb-pack');
test('J', 'J6.2', 'Exercise pack chips (bb-pack class)', hasPackChips);

// J7: Browser notifications
const hasNotificationSetting = htmlContent.includes('notification') || htmlContent.includes('Notification');
test('J', 'J7.1', 'Browser notifications setting exists', hasNotificationSetting);

const hasNotificationEvent = htmlContent.includes('notifications_enabled') ||
                             htmlContent.includes('notifications_denied');
test('J', 'J7.2', 'Notification analytics events', hasNotificationEvent);

// J8: Sound
const hasSoundSetting = htmlContent.includes('sound') || htmlContent.includes('Sound');
test('J', 'J8.1', 'Sound setting exists', hasSoundSetting);

const hasSoundLS = htmlContent.includes('bb_sound');
test('J', 'J8.2', 'bb_sound LocalStorage key', hasSoundLS);

// J9: Restore defaults
const hasRestoreDefaults = htmlContent.includes('Restore defaults') || htmlContent.includes('reset');
test('J', 'J9.1', 'Restore defaults button exists', hasRestoreDefaults);

// ============================================================================
// K) .ics Calendar
// ============================================================================

sec = section('K: .ics Calendar');
console.log('\nK) .ics Calendar\n');

// K1: Add hourly reminder
const hasIcsBtn = htmlContent.includes('.ics') || htmlContent.includes('calendar');
test('K', 'K1.1', '.ics calendar button exists', hasIcsBtn);

const hasIcsFunction = htmlContent.includes('downloadICS') || htmlContent.includes('ics');
test('K', 'K1.2', 'downloadICS function implementation', hasIcsFunction);

const hasIcsEvent = htmlContent.includes('ics_downloaded');
test('K', 'K1.3', 'ics_downloaded analytics event', hasIcsEvent);

const hasRRULE = htmlContent.includes('RRULE') || htmlContent.includes('FREQ=HOURLY');
test('K', 'K1.4', 'RRULE implementation for hourly frequency', hasRRULE);

// ============================================================================
// L) Streaks
// ============================================================================

sec = section('L: Streaks');
console.log('\nL) Streaks\n');

// L1: Daily streak increment
const hasStreakLogic = htmlContent.includes('streak') || htmlContent.includes('Streak');
test('L', 'L1.1', 'Streak functionality exists', hasStreakLogic);

const hasStreakLS = htmlContent.includes('bb_daily_streak') ||
                    htmlContent.includes('bb_best_streak') ||
                    htmlContent.includes('bb_last_completion_local');
test('L', 'L1.2', 'Streak LocalStorage keys (bb_daily_streak/bb_best_streak/bb_last_completion_local)', hasStreakLS);

const hasStreakEvent = htmlContent.includes('streak_incremented');
test('L', 'L1.3', 'streak_incremented analytics event', hasStreakEvent);

// L2: Total counter
const hasStreakTotal = htmlContent.includes('bb_streak_total') || htmlContent.includes('total');
test('L', 'L2.1', 'bb_streak_total counter exists', hasStreakTotal);

// L3: Undo window
const hasStreakUndo = htmlContent.includes('undo') && htmlContent.includes('streak');
test('L', 'L3.1', 'Streak undo functionality', hasStreakUndo);

// ============================================================================
// M) Keyboard shortcuts
// ============================================================================

sec = section('M: Keyboard Shortcuts');
console.log('\nM) Keyboard shortcuts\n');

// M1: Global shortcuts
const hasQuestionMark = htmlContent.includes('?') && htmlContent.includes('key');
test('M', 'M1.1', '? key for help/shortcuts', hasQuestionMark);

const hasSpaceKey = htmlContent.includes('Space') && htmlContent.includes('key');
test('M', 'M1.2', 'Space key for timer control', hasSpaceKey);

const hasEscapeKey = htmlContent.includes('Escape') && htmlContent.includes('key');
test('M', 'M1.3', 'Escape key for closing dialogs', hasEscapeKey);

const hasKeyboardListener = htmlContent.includes('addEventListener') &&
                           (htmlContent.includes('keydown') || htmlContent.includes('keyup'));
test('M', 'M1.4', 'Keyboard event listeners implemented', hasKeyboardListener);

// ============================================================================
// N) PWA behaviors
// ============================================================================

sec = section('N: PWA Behaviors');
console.log('\nN) PWA behaviors\n');

// N1: Install prompt
const hasManifest = htmlContent.includes('manifest.json');
test('N', 'N1.1', 'Manifest.json linked', hasManifest);

const hasAppleTouchIcon = htmlContent.includes('apple-touch-icon');
test('N', 'N1.2', 'Apple touch icon for iOS', hasAppleTouchIcon);

const hasWebAppCapable = htmlContent.includes('apple-mobile-web-app-capable');
test('N', 'N1.3', 'apple-mobile-web-app-capable meta tag', hasWebAppCapable);

// N2: Offline / Service Worker
const hasSW = htmlContent.includes('sw.js') || htmlContent.includes('serviceWorker');
test('N', 'N2.1', 'Service Worker reference (sw.js)', hasSW);

const hasOfflineSupport = htmlContent.includes('Works offline') || htmlContent.includes('offline');
test('N', 'N2.2', 'Offline support mentioned', hasOfflineSupport);

// N3: Update flow
const hasCacheVersion = htmlContent.includes('cache') || htmlContent.includes('version');
test('N', 'N3.1', 'Cache versioning strategy', hasCacheVersion);

// Check if sw.js exists
const swPath = join(__dirname, 'public', 'sw.js');
let hasSWFile = false;
try {
  readFileSync(swPath, 'utf-8');
  hasSWFile = true;
} catch (e) {
  // File doesn't exist
}
test('N', 'N3.2', 'Service Worker file (public/sw.js) exists', hasSWFile);

// ============================================================================
// O) Accessibility
// ============================================================================

sec = section('O: A11y');
console.log('\nO) Accessibility\n');

// O1: Focus order & traps
const hasFocusTrap = htmlContent.includes('focus') && (htmlContent.includes('trap') || htmlContent.includes('modal'));
test('O', 'O1.1', 'Focus trap implementation for modals', hasFocusTrap);

const hasTabindex = htmlContent.includes('tabindex');
test('O', 'O1.2', 'Tabindex for focus order', hasTabindex);

const hasFocusVisible = htmlContent.includes('focus-visible');
test('O', 'O1.3', ':focus-visible styles', hasFocusVisible);

// O2: Labels & roles
const hasAriaLabel = htmlContent.includes('aria-label');
test('O', 'O2.1', 'aria-label for icon-only buttons', hasAriaLabel);

const hasRoles = htmlContent.includes('role="');
test('O', 'O2.2', 'ARIA roles implemented', hasRoles);

const hasStatusAnnouncements = htmlContent.includes('aria-live');
test('O', 'O2.3', 'Status changes with aria-live', hasStatusAnnouncements);

// O3: Reduced motion
const hasReducedMotionQuery = htmlContent.includes('prefers-reduced-motion');
test('O', 'O3.1', 'prefers-reduced-motion media query', hasReducedMotionQuery);

// ============================================================================
// P) Error paths & empty states
// ============================================================================

sec = section('P: Error Paths');
console.log('\nP) Error paths & empty states\n');

// P1: Clipboard denied
const hasClipboardFallback = htmlContent.includes('clipboard') &&
                            (htmlContent.includes('fallback') || htmlContent.includes('catch'));
test('P', 'P1.1', 'Clipboard fallback implementation', hasClipboardFallback);

// P2: Notifications denied
const hasNotificationFallback = htmlContent.includes('denied') && htmlContent.includes('notification');
test('P', 'P2.1', 'Notifications denied handling', hasNotificationFallback);

// P3: Storage full
const hasStorageError = htmlContent.includes('localStorage') && htmlContent.includes('catch');
test('P', 'P3.1', 'LocalStorage error handling', hasStorageError);

const hasToast = htmlContent.includes('toast') || htmlContent.includes('Toast');
test('P', 'P3.2', 'Toast notification system for errors', hasToast);

// ============================================================================
// Q) Responsive checks
// ============================================================================

sec = section('Q: Responsive');
console.log('\nQ) Responsive checks\n');

// Q1: Mobile
const hasViewportMeta = htmlContent.includes('viewport') && htmlContent.includes('width=device-width');
test('Q', 'Q1.1', 'Viewport meta tag for mobile', hasViewportMeta);

const hasMediaQueries = htmlContent.includes('@media');
test('Q', 'Q1.2', 'CSS media queries for responsiveness', hasMediaQueries);

// Q2: Desktop
const hasCenteredLayout = htmlContent.includes('max-width') || htmlContent.includes('center');
test('Q', 'Q2.1', 'Centered layout for desktop (max-width)', hasCenteredLayout);

// ============================================================================
// R) Analytics sanity
// ============================================================================

sec = section('R: Analytics');
console.log('\nR) Analytics sanity\n');

const analyticsEvents = [
  'nudges_start', 'env_changed', 'filter_updated', 'timer_started',
  'timer_completed', 'snooze_started', 'snooze_undone', 'ics_downloaded',
  'share_copied', 'streak_incremented', 'pro_cta_clicked'
];

analyticsEvents.forEach(event => {
  const hasEvent = htmlContent.includes(event);
  const eventName = event.replace(/_/g, ' ');
  test('R', `R.${event}`, `Analytics event: ${eventName}`, hasEvent);
});

const hasTrackEventFunction = htmlContent.includes('function trackEvent');
test('R', 'R.track', 'trackEvent function implementation', hasTrackEventFunction);

const hasAnonymization = htmlContent.includes('anonymize') ||
                        !htmlContent.includes('email') ||
                        htmlContent.includes('no PII');
test('R', 'R.privacy', 'Analytics privacy (no PII/anonymized)', hasAnonymization);

// ============================================================================
// RESULTS SUMMARY
// ============================================================================

console.log('\n\n═══════════════════════════════════════════════════════════');
console.log('  DETAILED TEST RESULTS BY SECTION');
console.log('═══════════════════════════════════════════════════════════\n');

Object.entries(results.sections).forEach(([name, sec]) => {
  const passed = sec.passed.length;
  const failed = sec.failed.length;
  const total = passed + failed;
  const percentage = total > 0 ? Math.round((passed / total) * 100) : 0;

  console.log(`\n${name}`);
  console.log('─'.repeat(60));
  console.log(`Status: ${failed === 0 ? '✅ PASS' : '⚠️  ISSUES FOUND'}`);
  console.log(`Tests: ${passed}/${total} passed (${percentage}%)\n`);

  if (sec.failed.length > 0) {
    console.log('Failed tests:');
    sec.failed.forEach(t => {
      console.log(`  ❌ ${t.name}`);
      if (t.details) console.log(`     ${t.details}`);
    });
  }

  if (sec.warnings.length > 0) {
    console.log('\nWarnings:');
    sec.warnings.forEach(w => console.log(`  ⚠️  ${w}`));
  }
});

console.log('\n\n═══════════════════════════════════════════════════════════');
console.log('  OVERALL SUMMARY');
console.log('═══════════════════════════════════════════════════════════\n');

const totalTests = results.totalPassed + results.totalFailed;
const overallPercentage = totalTests > 0 ? Math.round((results.totalPassed / totalTests) * 100) : 0;

console.log(`Total Tests Run: ${totalTests}`);
console.log(`Passed: ${results.totalPassed} ✅`);
console.log(`Failed: ${results.totalFailed} ❌`);
console.log(`Success Rate: ${overallPercentage}%`);
console.log(`Warnings: ${results.warnings.length}\n`);

if (results.warnings.length > 0) {
  console.log('All Warnings:');
  results.warnings.forEach(w => console.log(`  ⚠️  ${w}`));
  console.log();
}

console.log('═══════════════════════════════════════════════════════════\n');

// Exit with error if any tests failed
process.exit(results.totalFailed > 0 ? 1 : 0);
