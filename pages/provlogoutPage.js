class provLogoutPage {
    constructor(page){
        this.page=page;
         this.logo = page.locator("//img[contains(@alt,'Logo')]");
         this.signoutbutton=page.locator("//button[normalize-space()='Sign out']");
    }
     async profilebutton(){
     await this.profile.click();
   }
   
    async clickSignout(){
     await this.signoutbutton.click();
   }
}; module.exports={provLogoutPage};