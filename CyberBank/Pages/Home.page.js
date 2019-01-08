require('../Utilities/customlocators.js');
var HomePage=function(){
this.homeButton=$('button.home');
this.pageHeader=$('.mainHeading');
this.bankManagerBtn=element(by.ngClick('manager()'));
};
module.exports=new HomePage();
