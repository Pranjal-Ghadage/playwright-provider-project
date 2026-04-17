class bookingPage {
  constructor(page) {
    this.page = page;
    this.booking = page.getByRole('button', { name: 'Bookings' });
    this.allbook = page.getByRole('link', { name: 'All Bookings' });
        this.header=page.getByText("All Bookings");
  }

  async gotobooking() {
     await this.booking.click();
         await this.allbook.waitFor({ state: 'visible' }); // important


  }
  

  async clickallbookings() {
    await this.allbook.click();
  }
 
}
module.exports = { bookingPage };