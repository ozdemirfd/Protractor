require('../Utilities/customlocators.js');
require('./Home.page.js');
var BankManagerPage=function(){
this.ButtonText=element(by.buttonText('Bank Manager Login'));
this.homeButton=$('button.home');
this.addCustumButton=element(by.ngClick('addCust()'));
this.openAccountButton=element(by.ngClick('openAccount()'));
this.customersButton=element(by.ngClick('showCust()'));
this.formDisplay=element(by.name('myForm'))
this.addButton=element(by.css('button[type=submit]'));

this.GetText=function(){
    return element(by.ngClick('manager()')).getText();
}
this.addCustomerAttr=function(modelName){
return element(by.model(modelName)).getAttribute("required");
}

}
module.exports=new BankManagerPage();
