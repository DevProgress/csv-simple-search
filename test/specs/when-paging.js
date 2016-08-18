/* eslint prefer-arrow-callback: ["error", { "allowNamedFunctions": true }] */

const assert = require('assert');

describe('When paging', () => {
  it('Should go to next page.', () => {
    browser.url('/?file=selenium-test-data.csv');
    browser.click('.pager li:nth-child(2)');
    const rows = browser.elements('table tbody tr').value;
    assert(rows.length === 9);
  });
});
