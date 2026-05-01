const {test,expect} = require('@playwright/test');

test('Static deopdown',async ({browser})=>
{
          const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("Learning@830$3mK2");
    
    await page.locator("select.form-control").selectOption("Consultant");
    await page.locator(".radiotextsty").nth(1).click();
    await expect(await page.locator(".radiotextsty").nth(1)).toBeChecked();
    await page.locator("#okayBtn").click();
   // await page.pause();
   await page.locator("#terms").check();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    await expect(page.locator("#terms")).not.toBeChecked();
    const locator = page.locator("[target='_blank']").nth(0);
    await expect(locator).toHaveAttribute("class","blinkingText");
    await page.locator("#signInBtn").click();

},

test.only('windows Handling',async ({browser})=>
{
     const context = await browser.newContext();
             const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
       await  page.locator("[href*='documents-request']").click(),

    ]);

    console.log(await newPage.locator(".red").textContent());


})
);