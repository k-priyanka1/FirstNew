import { Page } from "@playwright/test";

export class Checkout {
  private page : Page

  constructor (page:Page) {
    this.page = page
  }

  async checkoutNav():Promise <void> {
    await this.page.locator('[data-test="shopping-cart-link"]').click()

  }
  async checkOut(checkbutton:string):Promise <void> {
    await this.page.getByRole('button',{name:checkbutton}).click()

  }
  async backNav (backBTN:string):Promise<void> {
   await this.page.getByRole('button', {name:backBTN}).click()

  }
  async emptybillform ():Promise<void> {
    await this.page.getByRole('button',{name:'Continue'}).click()  

  }
  async checkForm (firstName:string, lastName:string, postcode:string, continuebtn:string): Promise <void> {
    await this.page.getByPlaceholder('First Name').fill(firstName)
    await this.page.getByPlaceholder('Last Name').fill(lastName)
    await this.page.getByPlaceholder('Zip/Postal Code').fill(postcode)
    await this.page.getByRole('button',{name:continuebtn}).click()
  }
  async completeOrder(finishbtn:string):Promise <void> {
     await this.page.getByRole('button',{name:finishbtn}).click()
  }

  async backtoHome (homebtn:string):Promise <void> {
     await this.page.getByRole('button',{name:homebtn}).click()
  }


}