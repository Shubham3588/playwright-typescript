const {test,expect} = require('@playwright/test');

test('Static deopdown',async ({browser})=>
{
          const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("Learning@830$3mK2");
    await page.locator("select.form-control").selectOption("Consultant");
    await page.locator("#signInBtn").click();
    await page.locator("select.form-control").selectOption("consult");
    console.log(await page.locator(".alert.alert-danger").textContent());
}




);