const assert = require('assert');

describe('When searching', function() {

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

});