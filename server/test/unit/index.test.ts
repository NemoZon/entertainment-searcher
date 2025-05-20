import { test, fc } from '@fast-check/jest';
import {expect} from '@jest/globals';

test.prop({ a: fc.string(), b: fc.string(), c: fc.string() })('should detect the substring', ({ a, b, c }) => {
  const text = a + b + c;
  expect(isSubtring(text, b)).toBe(true);
});

// Code under test: should rather be imported from another file
function isSubtring(text: string, pattern: string): boolean {
  return text.includes(pattern);
}