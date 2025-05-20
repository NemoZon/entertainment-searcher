const { test, fc } = require('@fast-check/jest');

test.prop({ a: fc.string(), b: fc.string(), c: fc.string() })('should detect the substring', ({ a, b, c }) => {
  const text = a + b + c;
  expect(isSubtring(text, b)).toBe(true);
});

// Code under test: should rather be imported from another file
function isSubtring(text, pattern) {
  return text.includes(pattern);
}