var CasperUtils = require('./casperUtils').CasperUtils;

casper.start(
  CasperUtils.getUrl(),
  function() {

    casper.waitFor(CasperUtils.waits.jsMount)
    .then(CasperUtils.asserts.visibleSelectors([
      'a.intl',
      'a.commands',
      'a.fb',
      'div.helperBar'
    ]))
    .then(CasperUtils.screenshot.entirePage)
    .then(function() {
      this.mouse.click('a.intl');
    })
    .then(CasperUtils.waits.selectorVisible(
      'a.english'
    ))
    .wait(1000)
    .then(CasperUtils.screenshot.entirePage)
    .then(CasperUtils.asserts.visibleSelectors([
      'a.english',
      'a.korean',
      'a.japanese',
      'a.simpchinese'
    ]))
    .then(function() {
      this.mouse.click('a.japanese');
    })
    .wait(500)
    .then(function() {
      var locale = this.evaluate(function() {
        return debug_Intl_getLocale();
      });
      // Successfully changed locale
      this.test.assert(locale === 'ja');
    })
    .then(CasperUtils.testDone);
}).run();

