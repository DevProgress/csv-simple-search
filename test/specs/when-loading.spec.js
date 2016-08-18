/* eslint prefer-arrow-callback: ["error", { "allowNamedFunctions": true }] */

const assert = require('assert');

describe('When loading', () => {
  it('should have the right title', () => {
    browser.url('/');
    const title = browser.getTitle();
    assert(title === 'CSV Search');
  });

  it('should load local csv file', () => {
    browser.url('/?file=selenium-test-data.csv');
    browser.waitUntil(function wait() {
      return !!browser.element('table').value;
    }, 10000);
    const rows = browser.elements('table tbody tr').value;
    assert(rows.length > 1);
  });

  it('should load external csv file', () => {
    browser.url('/?externalFileUrl=http://devprogress.us/csv-simple-search/csv/selenium-test-data.csv');
    browser.waitUntil(function wait() {
      return !!browser.element('table').value;
    }, 10000);
    const rows = browser.elements('table tbody tr').value;
    assert(rows.length > 1);
  });

  it('should show alert with invalid local file', () => {
    browser.url('/?file=xxx.csv');
    browser.waitUntil(function wait() {
      return !!browser.element('.alert').value;
    }, 10000);
    const alert = browser.elements('.alert').value;
    assert(!!alert);
  });
});
