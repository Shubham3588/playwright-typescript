const {test,expect} = require('@playwright/test');

test ('Playwright special Locator Practice',async ({browser})=>
{
    const userEmail = "test3467@test.com";
      const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    expect(await page.getByLabel("Check me out if you Love IceCreams!").isChecked()).toBeTruthy();
    await page.getByLabel("Employed").check();
    expect(await page.getByLabel("Employed").isChecked()).toBeTruthy();
    await page.getByLabel("Student").check();
    expect(await page.getByLabel("Employed").isChecked()).toBeFalsy();
    await page.getByPlaceholder("Password").fill("Test@123");
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByRole("button", { name: "Submit" }).click();
    const successMessage = await page.getByText("The Form has been submitted successfully!.").textContent();
    expect(successMessage).toContain("Success! The Form has been submitted successfully!.");
    await page.getByRole("link", { name: "Shop" }).click();
    await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button").click();






});