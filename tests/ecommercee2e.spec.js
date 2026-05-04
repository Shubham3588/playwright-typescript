const {test,expect} = require('@playwright/test');

test ('Ecommerce website',async ({browser})=>
{
    const userEmail = "test3467@test.com";
      const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
      await page.locator("#userEmail").fill(userEmail);
    await page.locator("[formcontrolname='userPassword']").fill("Test@123");
    await page.locator("#login").click();
    // await page.waitForLoadState("networkidle"); - can be flaky in some scenarios, consider using specific waits for elements instead
    await page.locator(".card-body").first().waitFor(); // this can not work if tere are more than 1 element with same locator, in that case we can use nth() method to target specific element
    const productName = await page.locator(".card-body").allTextContents();
   // console.log(productName);
   
    for(const name of productName){
        if(name.includes("ZARA COAT 3")){
            await page.locator(".card-body").nth(productName.indexOf(name)).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator(".infoWrap").first().waitFor();

    const cartItemList = await page.locator(".infoWrap").allTextContents();
    console.log(cartItemList);

    console.log(await page.locator(".cartSection h3").textContent());
    expect(await page.locator(".cartSection h3").textContent()).toEqual("ZARA COAT 3");

    const orderId = await page.locator(".itemNumber").textContent();
    console.log(orderId);

    await page.getByText("Buy Now").click();
    await page.locator("text=Credit Card Number ").locator("..").locator("input").fill("4324 5432 6543 9876");

    await page.locator("text=Name on Card ").locator("..").locator("input").fill("432");
     await page.locator("text=CVV Code").locator("..").locator("input").fill("Shubham");
     await page.locator("[name='coupon']").fill("rahulshettyacademy");
     await page.getByText("Apply Coupon").last().click();
     const verifyEmail=await page.locator(".user__name.mt-5 input").first().inputValue();
     console.log(verifyEmail);
     expect(verifyEmail).toEqual(userEmail);
         await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) 
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }




     

     

    


}
);