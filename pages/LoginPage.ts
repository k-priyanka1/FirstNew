import { Page } from '@playwright/test'

export class LoginPage {
     page: Page

    constructor (page : Page) {
       this.page = page 
    } 
   
     async goto() : Promise <void> {
           await this.page.goto('https://saucedemo.com/')
     }

     async login (username: string, password : string) : Promise <void> {
        await this.page.getByPlaceholder('username').fill(username)
        await this.page.getByPlaceholder('Password').fill(password)
        await this.page.getByRole('button', {name: "Login"}).click()
     }

      async invalidLogin ( username : string, password: string): Promise <void> {
         await this.page.getByPlaceholder('username').fill(username)
         await this.page.getByPlaceholder('password').fill(password)
         await this.page.getByRole('button', {name: "Login"}).click()
       
    }
      async emptyFields (): Promise <void> {
        await this.page.getByRole('button', {name:"Login"}).click()
    }
    
      async invalidValid (username: string, password: string): Promise <void> {
      await this.page.getByPlaceholder('Username').fill(username)
      await this.page.getByPlaceholder('password').fill(password)
      await this.page.getByRole('button',{name:"Login"}).click()

    }
      async validInvalid ( username: string , password:string): Promise <void> {
        await this.page.getByPlaceholder('username').fill(username)
        await this.page.getByPlaceholder('password').fill(password)
        await this.page.getByRole('button', {name: "Login"}).click()

      }
}



