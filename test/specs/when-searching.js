/* eslint-disable prefer-arrow-callback */
const assert = require('assert');

describe('When searching', function describe() {
  it('"New York" should return one result.', function it() {
    browser.url('/');
    browser.setValue('input', 'New York');
    const rows = browser.elements('table tbody tr').value;
    assert(rows.length === 1);
  });

  it('"nv flow" should return two results.', function it() {
    browser.url('/');
    browser.setValue('input', 'nv flow');
    const rows = browser.elements('table tbody tr').value;
    assert(rows.length === 2);
  });
});
