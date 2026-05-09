const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../tests/utils/APIUtils");

const loginPayload = {
  userEmail: "test3467@test.com",
  userPassword: "Test@123",
};

const createOrderPayload = {
  orders: [
    {
      country: "Cuba",
      productOrderedId: "6960eac0c941646b7a8b3e68",
    },
  ],
};

let response;

test.beforeAll(async () => {
  //Login
  const apiContext = await request.newContext();
  const apiutils = new APIUtils(apiContext, loginPayload);
  response = await apiutils.createOrder(createOrderPayload);
  //Create order
});

test("Ecommerce website login", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator(".card-body").first().waitFor();
  const productName = await page.locator(".card-body").allTextContents();
  console.log(productName);

  await page.locator(".btn-custom").nth(1).click();
  await page.getByText("Your Orders").waitFor();
  await page.pause();

  const actualOrderId = await page
    .locator(".ng-star-inserted tbody tr th")
    .allTextContents();
  console.log(actualOrderId);

  for (let i = 0; i < actualOrderId.length; i++) {
    if (actualOrderId[i].includes(response.orderId)) {
      await page.getByRole("button", { name: "View" }).nth(i).click();
      // await page.getByText("View").nth(i).click();
      break;
    }
  }

  const orderDetails = await page.locator(".-main").textContent();
  expect(orderDetails).toContain(response.orderId);
});
