import { Page } from '@playwright/test'
import { buttons } from '../testdata/cartData'


export class AddToCart {
     page:Page

    constructor ( page : Page) {
        this.page = page
    }

    async viewProduct(productName:string): Promise <void> {
         await this.page.locator(productName).click()

    }
    async cartitem (productName:string): Promise <void> {
        //await console.log (`product name : ${productName}`)
         await this.page.locator(productName).click()
         await this.page.getByRole('button', {name:buttons.addcart}).click()
    }
    async removeItem ():Promise <void>  {
         await this.page.getByRole('button', {name:buttons.remove}).click()

    }
    async filterHL (dropdownselectionHL:string): Promise <void> {
         await this.page.locator('.product_sort_container').selectOption(dropdownselectionHL)

    }
    async filterLH (dropdownselectionLH :string): Promise <void> {
         await this.page.locator('.product_sort_container').selectOption(dropdownselectionLH)

    }
}    


