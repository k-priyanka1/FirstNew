import{test,expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { AddToCart } from '../pages/AddcartPage'
import { url } from 'node:inspector'
import { buttons, cart ,formdetails} from '../testdata/cartData'
import {validUser} from '../testdata/loginData'
import { Checkout } from '../pages/CheckoutPage'

let loginPage : LoginPage
let addtoCart : AddToCart
test.beforeEach(async({page})=> {
    loginPage = new LoginPage (page)
    addtoCart = new AddToCart(page)
    await loginPage.goto()
    await loginPage.login(validUser.username , validUser.password)
    await expect(page).toHaveURL(/inventory/)
    await addtoCart.cartitem(cart.validProduct)
    await expect.soft(page.locator('.shopping_cart_badge')).toHaveCount(1)
})

test ('Navigate to checkout page', async ({page}) => {
    const checkout = new Checkout(page)
     await checkout.checkoutNav()
     await expect.soft(page).toHaveURL(/cart/)
     await expect.soft(page.getByText(cart.pname,{exact:true})).toBeVisible()  
})

test ('Back navigation - continue shopping', async({page}) => {
     const checkout = new Checkout(page)
     await checkout.checkoutNav()
     await expect.soft(page).toHaveURL(/cart/)
     await checkout.backNav(buttons.backbtn)
     await expect(page).toHaveURL(/inventory/)
})
test ('Checkout for bill' ,async({page}) => {
    const checkout = new Checkout(page)
    await checkout.checkoutNav()
    await expect(page).toHaveURL(/cart/)
    await checkout.checkOut(buttons.checkbutton)
    await expect(page).toHaveURL(/checkout-step-one/)
})
test('Billing details- empty form', async({page}) => {
    const checkout = new Checkout(page)
    await checkout.checkoutNav()
    await expect(page).toHaveURL(/cart/)
    await checkout.checkOut(buttons.checkbutton)
    await expect(page).toHaveURL(/checkout-step-one/)
    await checkout.emptybillform()
    await expect(page.locator('[data-test="error"]')).toBeVisible()
})
test('Billing details- form submission', async({page}) => {
    const checkout = new Checkout(page)
    await checkout.checkoutNav()
    await expect(page).toHaveURL(/cart/)
    await checkout.checkOut(buttons.checkbutton)
    await expect(page).toHaveURL(/checkout-step-one/)
    await checkout.checkForm(formdetails.firstname,formdetails.lastname,formdetails.postCode,buttons.continueBTN)
    await expect.soft(page).toHaveURL(/checkout-step-two/)
    await expect.soft(page.locator('.title').filter({hasText:'Checkout: Overview'})).toBeVisible()
})
test ('Complete Order', async({page}) => {
   const checkout = new Checkout(page)
   await checkout.checkoutNav()
   await expect(page).toHaveURL(/cart/)
   await checkout.checkOut(buttons.checkbutton)
    await expect(page).toHaveURL(/checkout-step-one/)
    await checkout.checkForm(formdetails.firstname,formdetails.lastname,formdetails.postCode,buttons.continueBTN)
    await expect.soft(page).toHaveURL(/checkout-step-two/)
   await checkout.completeOrder(buttons.finishbtn)
   await expect.soft(page).toHaveURL(/checkout-complete/)
   await expect.soft(page.getByText('Thank you for your order!')).toBeVisible()
})
test ('Back To Home', async({page}) => {
   const checkout = new Checkout(page)
   await checkout.checkoutNav()
   await expect(page).toHaveURL(/cart/)
   await checkout.checkOut(buttons.checkbutton)
   await expect(page).toHaveURL(/checkout-step-one/)
   await checkout.checkForm(formdetails.firstname,formdetails.lastname,formdetails.postCode,buttons.continueBTN)
   await expect.soft(page).toHaveURL(/checkout-step-two/)
   await checkout.completeOrder(buttons.finishbtn)
   await expect(page).toHaveURL(/checkout-complete/)
   await checkout.backtoHome(buttons.homebtn)
   await expect(page).toHaveURL(/inventory/)
})