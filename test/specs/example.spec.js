var assert = require('assert');

describe('When searching', function() {

    it('should have the right title', function () {
        browser.url('/');
        var title = browser.getTitle();
        assert(title === 'CSV Search');
    });

    it('should load local csv file', function () {
        browser.url('/?file=abc.csv');
        const rows = browser.elements('table tbody tr').value;
        assert(rows.length > 1);
    });    

    it('"New York" should return one result.', function () {
        browser.url('/');
        browser.setValue('input', 'New York');
        const rows = browser.elements('table tbody tr').value;
        assert(rows.length === 1);
    });    

    it('"nv flow" should return two results.', function () {
        browser.url('/');
        browser.setValue('input', 'nv flow');
        const rows = browser.elements('table tbody tr').value;
        assert(rows.length === 2);
    });

    it('Should go to next page.', function () {
        browser.url('/');
        browser.click('.pager li:nth-child(2)');
        const rows = browser.elements('table tbody tr').value;
    });    

});