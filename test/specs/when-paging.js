/* eslint-disable prefer-arrow-callback */
const assert = require('assert');

describe('When paging', function describe() {
  it('Should go to next page.', function it() {
    browser.url('/?file=selenium-test-data.csv');
    browser.click('.pager li:nth-child(2)');
    const rows = browser.elements('table tbody tr').value;
    assert(rows.length === 9);
  });
});
