const{test,expect} = require('@playwright/test');

test("Pop Up Validations",async ({page})=>
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   // await page.goto("google.com");
   // await page.goBack();
   // await page.goForward();
   expect(await page.locator("#displayed-text")).toBeVisible();
   await page.locator("#hide-textbox").click();
   expect(await page.locator("#displayed-text")).toBeHidden();
     await page.on("dialog", dialog => dialog.accept());
     // await page.on("dialog", dialog => dialog.dismiss());
   await page.locator("#confirmbtn").click();
   await page.locator("#mousehover").hover();
   const framePage = await page.frameLocator("#courses-iframe");
   await framePage.locator("a[href='lifetime-access']:visible").click();
   const subscriberCount = await framePage.locator(".text h2").textContent();
  const num =  subscriberCount.split(" ");
  console.log(num[1]);
 




});