describe('Rea11y Demo', function() {

  browser.ignoreSynchronization = true;

  it('should have a title', function() {
    browser.get('/');

    expect(browser.getTitle()).toEqual('Rea11y');
  });
});