/* eslint-disable prefer-arrow-callback */
const assert = require('assert');

describe('When loading', function describe() {
  it('should have the right title', function it() {
    browser.url('/');
    const title = browser.getTitle();
    assert(title === 'CSV Search');
  });

  it('should load local csv file', () => function it() {
    browser.url('/?file=abc.csv');
    browser.waitUntil(function wait() {
      return !!browser.element('table').value;
    }, 10000);
    const rows = browser.elements('table tbody tr').value;
    assert(rows.length > 1);
  });

  it('should load external csv file', function it() {
    browser.url('/?externalFileUrl=http://devprogress.us/csv-simple-search/csv/abc.csv');
    browser.waitUntil(function wait() {
      return !!browser.element('table').value;
    }, 10000);
    const rows = browser.elements('table tbody tr').value;
    assert(rows.length > 1);
  });

  it('should show alert with invalid local file', function it() {
    browser.url('/?file=xxx.csv');
    browser.waitUntil(function wait() {
      return !!browser.element('.alert').value;
    }, 10000);
    const alert = browser.elements('.alert').value;
    assert(!!alert);
  });
});
