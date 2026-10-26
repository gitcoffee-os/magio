/**
 * Linear issue links and the identifier each names (null: not an issue link).
 * One table for the server's `matchLinearUrl` (`server/lib/linear/tracker.test.js`)
 * and the UI's matcher over the served descriptor (`matchTrackerUrl.test.ts`),
 * since the rule exists on both sides.
 */
export const LINEAR_URL_CASES: ReadonlyArray<readonly [url: string, identifier: string | null]> = [
  ['https://linear.app/magio/issue/ENG-12', 'ENG-12'],
  ['https://linear.app/magio/issue/eng-12/broken-login', 'ENG-12'],
  ['https://www.linear.app/magio/issue/OPE-282?foo=1#c', 'OPE-282'],
  ['http://LINEAR.app/magio/issue/a1-7/', 'A1-7'],
  ['https://linear.app/issue/ENG-12', null],
  ['https://linear.app/magio/project/ENG-12', null],
  ['https://linear.app/magio/issue/12', null],
  ['https://linear.app.evil.test/magio/issue/ENG-12', null],
  ['https://example.com/magio/issue/ENG-12', null],
  ['linear://magio/issue/ENG-12', null],
  ['ENG-12', null],
  ['', null],
];
