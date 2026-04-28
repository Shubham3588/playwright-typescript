const {test,expect} = require('@playwright/test');

test ('Ecommerce website',async ({browser})=>
{

      const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
    await page.locator(".text-reset").click();
    await page.locator("#firstName").fill("Test");
    await page.locator("#lastName").fill("Test");
    
    await page.locator("#userEmail").fill("test3457@test.com");
    await page.locator("[formcontrolname='userPassword']").fill("Test@123");
    await page.locator("#confirmPassword").fill("Test@123");
    await page.locator("[formcontrolname='required']").click();


    
    await page.locator("#userMobile").fill("7867678680");
    await page.locator("#login").click();
    console.log(await page.getByText("Account Created Successfully").textContent());



}
);