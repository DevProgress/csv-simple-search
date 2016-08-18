/* eslint prefer-arrow-callback: ["error", { "allowNamedFunctions": true }] */

const assert = require('assert');

describe('When searching', () => {
  it('"New York" should return one result.', () => {
    browser.url('/?file=selenium-test-data.csv');
    browser.setValue('input', 'New York');
    const rows = browser.elements('table tbody tr').value;
    assert(rows.length === 1);
  });

  it('"nv flow" should return two results.', () => {
    browser.url('/?file=selenium-test-data.csv');
    browser.setValue('input', 'nv flow');
    const rows = browser.elements('table tbody tr').value;
    assert(rows.length === 2);
  });
});
