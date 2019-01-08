describe('Example project',()=>{
    beforeAll(function(){
        browser.waitForAngularEnabled(false);
        browser.get("https://www.google.com/");
        browser.manage().timeouts().implicitlyWait(10000);  
        
        })
        it('Check title ',()=>{
            element(by.name("q")).sendKeys("CyberTek");
            element(by.name("q")).sendKeys(protractor.Key.ENTER);
            browser.getTitle().then(function(title){
                console.log(title);
            })
            
        })
})