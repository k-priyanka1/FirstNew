import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { validUser } from '../testdata/loginData'
import { invalidUser } from '../testdata/loginData'
import { validInvalid } from '../testdata/loginData'
import { invalidValid } from '../testdata/loginData'

let loginPage: LoginPage
test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page)
    await loginPage.goto() 
})
 
test ('Valid login TC1', async ({page}) => {
    await loginPage.login(validUser.username , validUser.password)
    await expect (page).toHaveURL(/inventory/) 
})

test ('invalid login TC2', async ({page}) => {
    await loginPage.invalidLogin(invalidUser.username , invalidUser.password)
    await expect(page.getByText('epic sadface')).toBeVisible()
})

test ('Empty fields TC 3', async ({page}) => {
    await loginPage.emptyFields()
    await expect(page.getByText('epic sadface')).toBeVisible();
})

 test ('Invalid name/Valid Pass TC4', async ({page}) => {
    await loginPage.invalidValid(invalidValid.username, invalidValid.password)
    await expect(page.getByText('epic sadface')).toBeVisible()
 })

  test ('valid name/ invalid pass TC5', async ({page}) => {
    await loginPage.validInvalid(validInvalid.username, validInvalid.password)
    await expect(page.getByText('epic sadface')).toBeVisible()
  })