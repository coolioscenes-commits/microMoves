/**
 * Convention Tests for BreakBreath Application
 *
 * Test scenarios:
 * A1. "Start nudges" button
 * A2. "Try a 30-sec exercise" button
 * A3. Footer micro-links (Safety, Accessibility, Privacy, Terms, Contact)
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const htmlContent = readFileSync(join(__dirname, 'index.html'), 'utf-8');

const results = {
  passed: [],
  failed: [],
  warnings: []
};

function test(name, condition, details = '') {
  if (condition) {
    results.passed.push(`✅ ${name}`);
    if (details) results.passed.push(`   ${details}`);
  } else {
    results.failed.push(`❌ ${name}`);
    if (details) results.failed.push(`   ${details}`);
  }
}

function warn(message) {
  results.warnings.push(`⚠️  ${message}`);
}

console.log('\n═══════════════════════════════════════════════════════════');
console.log('  CONVENTION TESTS - BreakBreath Application');
console.log('═══════════════════════════════════════════════════════════\n');

// ============================================================================
// A1: "Start nudges" button functionality
// ============================================================================

console.log('A1. Testing "Start nudges" button\n');

// Check if button exists with correct ID
const hasStartBtn = htmlContent.includes('id="startBtn"');
test('A1.1: Start button exists with id="startBtn"', hasStartBtn);

// Check button text
const startBtnMatch = htmlContent.match(/<button[^>]*id="startBtn"[^>]*>([^<]*)<\/button>/);
const hasCorrectText = startBtnMatch && startBtnMatch[1].trim() === 'Start nudges';
test('A1.2: Button text is "Start nudges"', hasCorrectText);

// Check button has aria-label
const hasStartAriaLabel = htmlContent.match(/id="startBtn"[^>]*aria-label="Start hourly nudges"/);
test('A1.3: Button has proper aria-label', !!hasStartAriaLabel);

// Check for tabindex
const hasStartTabindex = htmlContent.match(/id="startBtn"[^>]*tabindex="1"/);
test('A1.4: Button has tabindex for keyboard navigation', !!hasStartTabindex);

// Check expected functionality markers
const hasLocalStorageRefs = htmlContent.includes('bb_last_active_date') &&
                            htmlContent.includes('localStorage');
test('A1.5: LocalStorage keys (bb_last_active_date, streak keys) referenced', hasLocalStorageRefs);

const hasNudgesStartEvent = htmlContent.includes('nudges_start');
test('A1.6: Analytics event "nudges_start" found', hasNudgesStartEvent);

// Check for header/running state indicators
const hasRunningState = htmlContent.includes('running') ||
                        htmlContent.includes('active') ||
                        htmlContent.includes('started');
test('A1.7: Running state indicators present', hasRunningState);

// ============================================================================
// A2: "Try a 30-sec exercise" button (Note: spec says 60-sec but actual is 30-sec)
// ============================================================================

console.log('\nA2. Testing "Try a 30-sec exercise" button\n');

// Check if quick demo button exists
const hasQuickDemoBtn = htmlContent.includes('id="quickDemoBtn"');
test('A2.1: Quick demo button exists with id="quickDemoBtn"', hasQuickDemoBtn);

// Check button text
const quickDemoBtnMatch = htmlContent.match(/<button[^>]*id="quickDemoBtn"[^>]*>([^<]*)<\/button>/);
const hasExerciseText = quickDemoBtnMatch && quickDemoBtnMatch[1].includes('30-sec exercise');
test('A2.2: Button text contains "30-sec exercise"', hasExerciseText);

if (!quickDemoBtnMatch?.[1].includes('60-sec')) {
  warn('Spec mentions "60-sec exercise" but button shows "30-sec exercise"');
}

// Check for aria-label
const hasExerciseAriaLabel = htmlContent.match(/id="quickDemoBtn"[^>]*aria-label="Try a sample exercise"/);
test('A2.3: Button has proper aria-label', !!hasExerciseAriaLabel);

// Check for tabindex
const hasExerciseTabindex = htmlContent.match(/id="quickDemoBtn"[^>]*tabindex="2"/);
test('A2.4: Button has tabindex for keyboard navigation', !!hasExerciseTabindex);

// Check for how-to card references
const hasHowtoCard = htmlContent.includes('howto') && htmlContent.includes('card');
test('A2.5: How-to card implementation present', hasHowtoCard);

// Check for timer references (00:30 or similar)
const hasTimerRefs = htmlContent.includes('timer') ||
                     htmlContent.includes('countdown') ||
                     htmlContent.includes('howtoTime');
test('A2.6: Timer functionality references found', hasTimerRefs);

// Check for exercise_try_once event
const hasExerciseTryEvent = htmlContent.includes('exercise_try_once');
test('A2.7: Analytics event "exercise_try_once" found', hasExerciseTryEvent);

// ============================================================================
// A3: Footer micro-links (Safety, Accessibility, Privacy, Terms, Contact)
// ============================================================================

console.log('\nA3. Testing footer micro-links\n');

// Check for footer section
const hasFooter = htmlContent.includes('<footer') ||
                  htmlContent.match(/style="display: flex; gap: 20px.*footer/i);
test('A3.1: Footer section exists', hasFooter);

// Test individual links
const links = [
  { name: 'Safety', modalId: 'safetyModal', function: 'openSafetyModal' },
  { name: 'Accessibility', anchor: 'accessibilityCard', scroll: true },
  { name: 'Privacy', modalId: 'privacy', display: true },
  { name: 'Terms', modalId: 'region', display: true },
  { name: 'Contact', href: 'mailto:', external: true }
];

links.forEach(link => {
  const linkPattern = new RegExp(`<a[^>]*>\\s*${link.name}\\s*</a>`, 'i');
  const linkExists = linkPattern.test(htmlContent);
  test(`A3.2.${link.name}: "${link.name}" link exists`, linkExists);

  if (link.modalId) {
    const modalExists = htmlContent.includes(`id="${link.modalId}"`);
    test(`A3.3.${link.name}: Modal/section id="${link.modalId}" exists`, modalExists);
  }

  if (link.function) {
    const functionExists = htmlContent.includes(`${link.function}(`);
    test(`A3.4.${link.name}: Function ${link.function}() exists`, functionExists);
  }

  if (link.href) {
    const hrefExists = htmlContent.includes(link.href);
    test(`A3.5.${link.name}: Contains ${link.href} reference`, hrefExists);
  }
});

// Check for proper link styling/hover states
const hasLinkStyling = htmlContent.includes('onmouseover') &&
                       htmlContent.includes('onmouseout');
test('A3.6: Links have hover state styling', hasLinkStyling);

// Check for accessibility features on links
const hasLinkAccessibility = htmlContent.includes('aria-label') ||
                             htmlContent.includes('aria-labelledby');
test('A3.7: Links/modals have ARIA attributes', hasLinkAccessibility);

// Check for proper modal structure
const safetyModalCheck = htmlContent.match(/id="safetyModal"[^>]*role="dialog"/);
const privacyModalCheck = htmlContent.match(/id="privacy"[^>]*role="dialog"/);
const termsModalCheck = htmlContent.match(/id="region"[^>]*role="dialog"/);
test('A3.8: Modals have proper dialog role',
     !!(safetyModalCheck || privacyModalCheck || termsModalCheck));

// Check for modal close functionality
const hasModalClose = htmlContent.includes('closeSafetyModal') &&
                      htmlContent.includes('closePrivacyModal') &&
                      htmlContent.includes('closeRegionModal');
test('A3.9: Modal close functions exist', hasModalClose);

// Check for escape key handler
const hasEscapeHandler = htmlContent.includes('Escape') &&
                         htmlContent.includes('addEventListener');
test('A3.10: Keyboard navigation (Escape key) implemented', hasEscapeHandler);

// ============================================================================
// RESULTS SUMMARY
// ============================================================================

console.log('\n═══════════════════════════════════════════════════════════');
console.log('  TEST RESULTS SUMMARY');
console.log('═══════════════════════════════════════════════════════════\n');

if (results.passed.length > 0) {
  console.log('PASSED TESTS:\n');
  results.passed.forEach(msg => console.log(msg));
}

if (results.failed.length > 0) {
  console.log('\n\nFAILED TESTS:\n');
  results.failed.forEach(msg => console.log(msg));
}

if (results.warnings.length > 0) {
  console.log('\n\nWARNINGS:\n');
  results.warnings.forEach(msg => console.log(msg));
}

const passCount = results.passed.filter(r => r.startsWith('✅')).length;
const failCount = results.failed.filter(r => r.startsWith('❌')).length;
const total = passCount + failCount;
const percentage = total > 0 ? Math.round((passCount / total) * 100) : 0;

console.log('\n═══════════════════════════════════════════════════════════');
console.log(`  TOTAL: ${passCount}/${total} tests passed (${percentage}%)`);
console.log('═══════════════════════════════════════════════════════════\n');

process.exit(failCount > 0 ? 1 : 0);
