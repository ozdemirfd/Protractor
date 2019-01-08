describe('Demonstrating Jasmine Reporter ',()=>{
      beforeAll(function(){
       browser.waitForAngularEnabled(false);
       browser.get('https://the-internet.herokuapp.com/javascript_alerts');

        //element(by.linkText('JavaScript Alerts')).click();
   })
    // it('should check if elemenet is displayed',()=>{
    //     browser.get('https://www.bhtp.com/');
    //     expect(element(by.linkText("GET A QUOTE")).isDisplayed()).toBe(true);
    // })

    it('allertboxes ',()=>{
        element(by.buttonText('Click for JS Alert')).click();
        browser.sleep(4000);
        expect(browser.switchTo().alert().getText()).toEqual('I am a JS Alert');
    })
    it('should',()=>{
        var myAlert=browser.switchTo().alert();
        myAlert.accept();
        expect(element(by.id('result')).getText()).toEqual('You successfuly clicked an alert');
    })
    it('Dismiss the alert',()=>{
        element(by.buttonText('Click for JS Confirm')).click();
        browser.sleep(3000);
        myAlert=browser.switchTo().alert();
        expect(myAlert.getText()).toEqual('I am a JS Confirm');
        browser.sleep(2000);
        myAlert.dismiss();
        expect(element(by.id('result')).getText()).toEqual('You clicked: Cancel');
    })
    it('Accept the alert',()=>{
        element(by.buttonText('Click for JS Confirm')).click();
        browser.sleep(3000);
        myAlert=browser.switchTo().alert();
        expect(myAlert.getText()).toEqual('I am a JS Confirm');
        browser.sleep(2000);
        myAlert.accept();
        expect(element(by.id('result')).getText()).toEqual('You clicked: Ok');
    })

    it('Send keys',()=>{
        element(by.buttonText('Click for JS Prompt')).click();
        browser.sleep(3000);
        myAlert=browser.switchTo().alert();
        expect(myAlert.getText()).toEqual('I am a JS prompt');
        browser.sleep(2000);
        var text="Cyberstar";
        myAlert.sendKeys(text);
        myAlert.accept();
        browser.sleep(2000);
        expect(element(by.id('result')).getText()).toEqual('You entered: '+text);
    })
});
