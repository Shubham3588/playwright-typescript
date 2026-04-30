const {test,expect} = require('@playwright/test');

test ('Ecommerce website',async ({browser})=>
{
    const userEmail = "test3467@test.com";
      const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
/*     await page.locator(".text-reset").click();
    await page.locator("#firstName").fill("Test");
    await page.locator("#lastName").fill("Test");
    
    await page.locator("#userEmail").fill(userEmail);
    await page.locator("[formcontrolname='userPassword']").fill("Test@123");
    await page.locator("#confirmPassword").fill("Test@123");
    await page.locator("[formcontrolname='required']").click();


    
    await page.locator("#userMobile").fill("7867678680");
    await page.locator("#login").click();
    console.log(await page.getByText("Account Created Successfully").textContent());
    await page.locator(".btn.btn-primary").click(); */
      await page.locator("#userEmail").fill(userEmail);
    await page.locator("[formcontrolname='userPassword']").fill("Test@123");
    await page.locator("#login").click();
    // await page.waitForLoadState("networkidle"); - can be flaky in some scenarios, consider using specific waits for elements instead
    await page.locator(".card-body").first().waitFor(); // this can not work if tere are more than 1 element with same locator, in that case we can use nth() method to target specific element
    const productName = await page.locator(".card-body").allTextContents();
    console.log(productName);



}
);