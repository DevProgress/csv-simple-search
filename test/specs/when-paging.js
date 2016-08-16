const assert = require('assert');

describe('When searching', function() {

    it('Should go to next page.', function () {
        browser.url('/');
        browser.click('.pager li:nth-child(2)');
        const rows = browser.elements('table tbody tr').value;
    });    

});