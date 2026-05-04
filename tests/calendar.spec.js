const {test,expect} = require('@playwright/test');

test ('Ecommerce website',async ({page})=>
{
  
   const month = "6";
   const day= "15";
   const year = "2027";

    const expectedList=[month,day,year];

   await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator(".react-date-picker__inputGroup").click();
  await page.locator(".react-calendar__navigation__label").click();
  await  page.locator(".react-calendar__navigation__label").click();
   await page.getByText(year).click();
   //await page.getByText(Number(month)-1).click();
   await page.locator(".react-calendar__tile").nth(Number(month)-1).click();
   await page.locator("//abbr[text()='"+day+"']").click();
   await page.locator(".react-date-picker__inputGroup__input").first().waitFor();



   const inputDate = await page.locator(".react-date-picker__inputGroup__input")
   console.log(inputDate);
   for(let i=0;i<expectedList.length;i++){
    const inputValue = await inputDate.nth(i).inputValue();
    expect(inputValue).toEqual(expectedList[i]);
   }



});