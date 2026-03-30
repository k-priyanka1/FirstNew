import {test, expect} from '@playwright/test'
import { AddToCart } from '../pages/AddcartPage'
import { cart, validuserLogin, weblink, buttons, filters} from '../testdata/cartData'
import { LoginPage } from '../pages/LoginPage'
import { validUser } from '../testdata/loginData'

let loginPage : LoginPage
 test.beforeEach(async({page}) => {
    loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(validUser.username, validUser.password)
    await expect (page).toHaveURL(/inventory/) 
 })

 test ('View product details', async ({page}) => {
     const addtocart = new AddToCart(page)
     await addtocart.viewProduct(cart.validProduct)
     await expect.soft(page).toHaveURL(/inventory-item/)
     await expect.soft(page.locator('[data-test="inventory-item-name"]')).toHaveText(cart.pname)
     await expect.soft(page.locator('[data-test="inventory-item-desc"]')).toHaveText(cart.description)
     await expect.soft(page.locator('[data-test="inventory-item-price"]')).toHaveText(cart.price)
     await expect.soft(page.getByRole('button', {name:buttons.addcart})).toBeVisible()
 })

test ('Add Item to cart', async ({page}) => {
    const addToCart = new AddToCart(page)
    await addToCart.cartitem(cart.validProduct)
    await expect(page).toHaveURL(/inventory-item/)
    await expect.soft(page.getByRole('button', {name:buttons.remove})).toBeVisible()
    await expect.soft(page.locator('.shopping_cart_badge')).toHaveCount(1)
})
test('Remove Item from cart', async ({page}) => {
    const addtocart = new AddToCart(page)
    await addtocart.cartitem(cart.validProduct)
    await expect(page).toHaveURL(/inventory-item/)
    await addtocart.removeItem()
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0)

})
test ('filters hilo' , async ({page}) => {
    const addtocart = new AddToCart(page)
    await addtocart.filterHL(filters.dropdownselectionHL)
    const prices = page.locator('.inventory_item_price')
    await expect(prices.first()).toHaveText(filters.highPrice)

})
test ('filters lohi' , async ({page}) => {
    const addtocart = new AddToCart(page)
    await addtocart.filterLH(filters.dropdownselectionLH)
    const prices = page.locator('.inventory_item_price')
    await expect(prices.first()).toHaveText(filters.lowPrice)
})
