# Playwright TypeScript Testing

A Playwright automation testing project for e-commerce website testing.

## � Documentation

- **[PLAYWRIGHT_KNOWLEDGE_BASE.md](PLAYWRIGHT_KNOWLEDGE_BASE.md)** — Comprehensive guide with setup, methods, best practices, and interview Q&A
- **[README.md](README.md)** — Project overview and test specifications

```bash
npm install
```

## 🏃 Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/ecommerceTest.spec.js
npx playwright test tests/StaticDropdown.spec.js

# Run in debug mode
npx playwright test --debug

# Run with UI mode (interactive)
npx playwright test --ui

# Run with headed mode (see browser)
npx playwright test --headed

# Run specific test by name
npx playwright test -g "Static dropdown"
```

## ⚙️ Configuration

- **Test Directory:** `./tests`
- **Browser:** Chromium (headless: false)
- **Timeout:** 30s (test), 40s (expect)
- **Reporter:** HTML

## 📁 Project Structure

```
├── playwright.config.js    # Playwright configuration
├── package.json            # Dependencies
├── tests/
│   ├── calendar.spec.js                  # Date picker calendar tests
│   ├── ecommerceTest.spec.js             # E-commerce tests
│   ├── getByLocatorPractice.spec.js      # Locator practice tests (Gender select)
│   ├── StaticDropdown.spec.js            # Static dropdown tests
│   └── WindowHandling.spec.js            # Window/Tab handling tests
└── .github/workflows/
    └── playwright.yml      # CI/CD workflow
```

## 🔧 Tech Stack

- Playwright: ^1.59.1
- Node.js types: ^25.6.0

---

## 🧪 Methods Used in `tests/ecommercee2e.spec.js`

This file demonstrates a Playwright end-to-end test that logs into an e-commerce site, adds a product to the cart, verifies the cart, and completes checkout.

### Playwright test utilities

- `test(name, async ({browser}) => {...})` — define a test case and get a `browser` fixture.
- `expect(value).toEqual(expected)` — assert the actual value equals the expected value.

### Browser and page lifecycle

- `browser.newContext()` — create a new browser context for an isolated test session.
- `context.newPage()` — open a new page/tab in the context.
- `page.goto(url)` — navigate to the target URL.

### Element actions and assertions

- `page.locator(selector)` — locate an element or set of elements on the page.
- `locator.fill(value)` — type or replace the value of an input field.
- `locator.click()` — click an element.
- `locator.waitFor()` — wait for the element to appear and be ready.
- `locator.allTextContents()` — get text content from all matching elements as an array.
- `locator.textContent()` — read text content from a single element.
- `locator.inputValue()` — read the current value of an input field.
- `locator.count()` — count how many elements match the locator.
- `locator.nth(index)` — target the nth element from a locator that matches multiple elements.

### Query helper methods

- `page.getByText(text)` — locate an element by its visible text.
- `page.getByPlaceholder(text)` — locate an input by its placeholder value.
- `locator.pressSequentially(keys, options)` — type text sequentially into a focused element with a delay.

### Test-specific patterns

- `for (const name of productName) { ... }` — loop through product names and click the matching item.
- `if (text === ' India') { ... }` — compare option labels before selecting the dropdown item.

---

## 🧪 Methods Used in `tests/getByLocatorPractice.spec.js`

This file practices Playwright locators for form controls on the Angular practice page, including checkboxes, dropdowns, form submission, and navigation.

### Locator patterns

- `page.getByLabel("Check me out if you Love IceCreams!")` — locate a checkbox by its label.
- `locator.check()` — select/activate a checkbox or radio control.
- `locator.isChecked()` — verify whether a checkbox or radio button is checked.
- `page.getByPlaceholder("Password")` — locate an input field by placeholder text.
- `page.getByLabel("Gender")` — locate a select dropdown by its label.
- `locator.selectOption("Female")` — choose an option from a dropdown by value.
- `page.getByRole("button", { name: "Submit" })` — locate a button by its role and name.
- `page.getByText("The Form has been submitted successfully!.")` — locate an element by its visible text.
- `page.getByRole("link", { name: "Shop" })` — locate a link by its role and name.
- `page.locator("app-card").filter({ hasText: "Nokia Edge" })` — filter elements by text content.
- `locator.getByRole("button")` — locate a button within a filtered element.

### Assertions

- `expect(value).toBeTruthy()` — assert that a value is truthy (e.g., checkbox is checked).
- `expect(value).toBeFalsy()` — assert that a value is falsy (e.g., checkbox is unchecked).
- `expect(message).toContain("Success!")` — assert that a string contains a substring.

---

## 🧪 Methods Used in `tests/calendar.spec.js`

This file tests a React date picker calendar component, navigating through months and years to select a specific date, then verifying the selected date values are populated in input fields.

### Locator patterns

- `page.locator(".react-date-picker__inputGroup")` — locate the date picker input group container.
- `page.locator(".react-calendar__navigation__label")` — locate the calendar navigation label (month/year display).
- `page.locator(".react-calendar__tile")` — locate calendar date tiles.
- `page.locator("//abbr[text()='15']")` — locate elements using XPath (day with specific text).
- `page.locator(".react-date-picker__inputGroup__input")` — locate individual date input fields.

### Query helper methods

- `page.getByText(year)` — locate an element by its visible text (e.g., year in calendar).

### Element interactions

- `locator.click()` — click an element to navigate or select.
- `locator.nth(i)` — access the nth element from a locator result set.
- `locator.first()` — access the first element from a locator result set.
- `locator.waitFor()` — wait for an element to appear and be ready.
- `locator.inputValue()` — read the current value of an input field.

### Assertions

- `expect(inputValue).toEqual(expectedList[i])` — verify the input value matches the expected month, day, or year.

### Test patterns

- Multiple `click()` calls to navigate calendar (month label → year selection → month → day).
- Loop through expected values and validate each date input field with `inputValue()`.
- Store expected values in an array and compare each input field value in sequence.

---

## 📝 textContent vs inputValue() vs innerText

### Quick Comparison

| Method          | Use For          | Returns                     |
| --------------- | ---------------- | --------------------------- |
| `textContent()` | Any element      | All text (including hidden) |
| `inputValue()`  | Input fields     | Current input value         |
| `innerText()`   | Visible elements | Only visible text           |

---

### textContent()

**What it returns:** All text content of an element, including text from child elements and hidden elements.

```typescript
// Get text content of any element
const text = await page.locator(".product-name").textContent();
console.log(text); // "iPhone 15 Pro"

// For elements with children
// <div>Hello <span>World</span></div>
// textContent() returns: "Hello World"
```

**Best for:**

- Reading text from divs, spans, labels, buttons
- Getting text from nested elements
- When you need ALL text (visible + hidden)

---

### inputValue()

**What it returns:** The current value of input, textarea, or select elements.

```typescript
// Get value from input field
const email = await page.locator("#email").inputValue();
console.log(email); // "user@test.com"

// For textarea
const message = await page.locator("#message").inputValue();

// For select dropdown
const selected = await page.locator("select#country").inputValue();
```

**Best for:**

- Reading input field values
- Getting textarea content
- Reading selected dropdown values
- Form field values

> **Note:** `inputValue()` is specifically designed for form elements. Using it on non-input elements will throw an error.

---

### innerText()

**What it returns:** Only the visible text that is rendered (excludes hidden text, CSS styles).

```typescript
// Get visible text only
const text = await page.locator(".product-name").innerText();
console.log(text); // "iPhone 15 Pro"

// Hidden text is excluded
// <div style="display: none">Hidden</div>
// innerText() returns: ""
```

**Best for:**

- When you need only visible text
- Text that is rendered on page
- Avoiding hidden text content

---

### Interview Q&A

#### Q1: What is the difference between textContent() and inputValue()?

| Aspect          | textContent()        | inputValue()                 |
| --------------- | -------------------- | ---------------------------- |
| **Target**      | Any element          | Input/textarea/select        |
| **Returns**     | Text content         | Current value                |
| **Hidden text** | Includes hidden      | N/A (inputs can't be hidden) |
| **Use case**    | Read labels, buttons | Read form values             |

```typescript
// textContent - for any element
await page.locator("h1").textContent(); // "Welcome"

// inputValue - for form elements
await page.locator("#email").inputValue(); // "test@test.com"
```

#### Q2: When should you use innerText over textContent?

- Use `innerText()` when you only want visible text (what user sees)
- Use `textContent()` when you need all text including hidden elements

```typescript
// Hidden element
// <span style="display:none">Secret</span>

await page.locator("span").textContent(); // "Secret"
await page.locator("span").innerText(); // ""
```

#### Q3: Can you use textContent() on input fields?

Yes, but it returns the default value (placeholder), not the current typed value:

```typescript
// Input with typed value
// <input value="typed value">

await page.locator("input").textContent(); // "" (empty - not the typed value)
await page.locator("input").inputValue(); // "typed value" (correct)
```

**Always use `inputValue()` for input fields!**

---

### Summary Table

| Scenario                    | Method to Use                    |
| --------------------------- | -------------------------------- |
| Button text                 | `textContent()`                  |
| Label text                  | `textContent()`                  |
| Div/span text               | `textContent()` or `innerText()` |
| Input field value           | `inputValue()`                   |
| Textarea content            | `inputValue()`                   |
| Dropdown selected value     | `inputValue()`                   |
| Visible text only           | `innerText()`                    |
| All text (including hidden) | `textContent()`                  |

---

# 📖 Complete Playwright Guide

## 1. Test Structure

Every Playwright test follows this pattern:

```typescript
const { test, expect } = require("@playwright/test");

test("Test Name", async ({ page }) => {
  // Test code here
});
```

### Test Hooks

```typescript
// Run before each test
test.beforeEach(async ({ page }) => {
  await page.goto("https://example.com");
});

// Run after each test
test.afterEach(async ({ page }) => {
  await page.close();
});

// Run once before all tests
test.beforeAll(async () => {
  // Setup code
});

// Run once after all tests
test.afterAll(async () => {
  // Teardown code
});
```

---

## 2. Locators

Locators are the way to find elements on a page. Playwright provides multiple locator strategies:

### 2.1 CSS Selector

```typescript
await page.locator("#username").fill("rahulshettyacademy");
await page.locator(".card-body").first().click();
await page.locator('[formcontrolname="userPassword"]').fill("Test@123");
```

### 2.2 Text Locator

```typescript
// Find element by exact text
await page.getByText("Submit").click();

// Find element by role and text
await page.getByRole("button", { name: "Submit" }).click();
```

### 2.3 Nth Element

```typescript
// Select 2nd element (0-indexed)
await page.locator(".card-body").nth(1).click();

// Select first element
await page.locator(".card-body").first().click();

// Select last element
await page.locator(".card-body").last().click();
```

### 2.4 Filter Locators

```typescript
// Filter by text
await page.locator(".product").filter({ hasText: "iPhone" }).click();

// Filter by another locator
await page
  .locator(".product")
  .filter({ has: page.locator(".price") })
  .click();
```

---

## 3. Actions

### 3.1 Fill & Type

```typescript
// Fill - clears and fills (for input, textarea, contenteditable)
await page.locator("#username").fill("rahulshettyacademy");

// Type - types character by character
await page.locator("#search").type("Playwright", { delay: 100 });
```

### 3.2 Click

```typescript
// Simple click
await page.locator("#submit").click();

// Double click
await page.locator("#item").dblclick();

// Right click
await page.locator("#item").click({ button: "right" });

// Hover
await page.locator("#menu").hover();
```

### 3.3 Select Option

```typescript
// By value
await page.locator("select.form-control").selectOption("consultant");

// By label
await page.locator("select.form-control").selectOption({ label: "Consultant" });

// By index
await page.locator("select.form-control").selectOption({ index: 1 });
```

### 3.4 Checkbox & Radio

```typescript
// Check
await page.locator("#checkbox").check();

// Uncheck
await page.locator("#checkbox").uncheck();

// Click radio
await page.locator(".radiotextsty").nth(1).click();
```

---

## 4. Assertions

### 4.1 Common Assertions

```typescript
// Text content
await expect(page.locator("#title")).toHaveText("Welcome");
await expect(page.locator("#title")).toContainText("Welcome");

// Value
await expect(page.locator("#email")).toHaveValue("test@test.com");

// Visibility
await expect(page.locator("#modal")).toBeVisible();
await expect(page.locator("#modal")).toBeHidden();

// Enabled/Disabled
await expect(page.locator("#submit")).toBeEnabled();
await expect(page.locator("#submit")).toBeDisabled();

// Checked state
await expect(page.locator("#checkbox")).toBeChecked();
await expect(page.locator("#checkbox")).toBeUnchecked();

// Count
await expect(page.locator(".item")).toHaveCount(5);

// Attribute
await expect(page.locator("#link")).toHaveAttribute("href", "/home");
```

### 4.2 Soft Assertions

```typescript
// Continues even if assertion fails
await expect.soft(page.locator("#title")).toHaveText("Welcome");
```

---

## 5. Waits

Playwright auto-waits for actions, but you can explicitly wait:

### 5.1 Wait for Element

```typescript
// Wait for visible
await page.locator("#loading").waitFor();

// Wait for hidden
await page.locator("#loading").waitFor({ state: "hidden" });

// Wait for attached
await page.locator("#dynamic").waitFor({ state: "attached" });
```

### 5.2 Wait for Load State

```typescript
await page.goto("https://example.com");
await page.waitForLoadState("networkidle"); // Wait until network is idle
await page.waitForLoadState("domcontentloaded");
await page.waitForLoadState("load");
```

### 5.3 Wait for URL

```typescript
await page.waitForURL("**/dashboard/**");
await page.waitForURL((url) => url.includes("/dashboard"));
```

### 5.4 Custom Wait

```typescript
await page.waitForFunction(() => document.querySelector(".loaded"));
```

---

## 6. Browser Context

Browser context creates isolated browser sessions:

```typescript
test("Browser Context Example", async ({ browser }) => {
  // Create new context (isolated cookies/storage)
  const context = await browser.newContext({
    storageState: "./auth.json", // Persist login state
    viewport: { width: 1280, height: 720 },
    locale: "en-US",
    timezoneId: "America/New_York",
  });

  const page = await context.newPage();

  // ... test code ...

  await context.close();
});
```

---

## 7. Network Interception

### 7.1 Mock API Response

```typescript
await page.route("**/api/user", async (route) => {
  await route.fulfill({
    status: 200,
    body: JSON.stringify({ name: "Test User", email: "test@test.com" }),
  });
});
```

### 7.2 Block Requests

```typescript
await page.route("**/*.png", (route) => route.abort());
await page.route("**/analytics/**", (route) => route.abort());
```

### 7.3 Spy on Requests

```typescript
await page.on("request", (request) => console.log(request.url()));
await page.on("response", (response) => console.log(response.status()));
```

---

## 8. Debugging

### 8.1 Pause Test

```typescript
await page.pause(); // Opens Playwright Inspector
```

### 8.2 Screenshot on Failure

```bash
npx playwright test --screenshot on
```

### 8.3 Trace Viewer

```bash
npx playwright test --trace on
```

Then view trace at: https://trace.playwright.dev

---

## 9. Best Practices

### ✅ Do

- Use `page.locator()` with descriptive selectors
- Use built-in auto-waits
- Use `test.beforeEach()` for repeated setup
- Use relative paths in selectors
- Handle async operations properly

### ❌ Don't

- Don't use `sleep()` or fixed delays
- Don't use XPath (use CSS or Playwright locators)
- Don't forget to clean up contexts
- Don't hardcode timeouts

---

## 📚 Playwright Methods Used

### Core Test Methods

| Method     | Description                      |
| ---------- | -------------------------------- |
| `test()`   | Defines a test case              |
| `expect()` | Assertion library for assertions |

### Browser & Context

| Method                 | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `browser.newContext()` | Creates a new browser context (isolated session) |
| `context.newPage()`    | Creates a new page within the context            |

### Page Navigation & Locators

| Method                      | Description                                    |
| --------------------------- | ---------------------------------------------- |
| `page.goto(url)`            | Navigates to the specified URL                 |
| `page.locator(selector)`    | Creates a locator for the given selector       |
| `page.locator().nth(index)` | Selects the nth element matching the locator   |
| `page.locator().first()`    | Selects the first element matching the locator |

### Locator Actions

| Method                        | Description                                |
| ----------------------------- | ------------------------------------------ |
| `locator.fill(text)`          | Fills the input field with text            |
| `locator.click()`             | Clicks on the element                      |
| `locator.selectOption(value)` | Selects an option from a dropdown          |
| `locator.allTextContents()`   | Gets text content of all matching elements |

### Wait & Assertions

| Method                          | Description                                          |
| ------------------------------- | ---------------------------------------------------- |
| `locator.waitFor()`             | Waits for the element to be visible                  |
| `expect(locator).toBeChecked()` | Asserts the checkbox is checked                      |
| `page.pause()`                  | Pauses the test for debugging (Playwright Inspector) |

### Additional Methods (from commented code)

| Method                         | Description                                                         |
| ------------------------------ | ------------------------------------------------------------------- |
| `page.getByText(text)`         | Locates element by visible text                                     |
| `page.waitForLoadState(state)` | Waits for specific load state (networkidle, domcontentloaded, etc.) |

---

## 🪟 Window Handling Guide (Interview Ready)

### Common Interview Questions & Answers

### Q1: How do you handle multiple tabs in Playwright?

```typescript
// Click link that opens new tab
const [newPage] = await Promise.all([
  context.waitForEvent("page"), // Wait for new page event
  page.locator(".link").click(), // Click the link
]);

// Work with new page
await newPage.waitForLoadState("domcontentloaded");
await expect(newPage).toHaveURL(/.*expected/);
```

### Q2: How do you switch between tabs/windows?

```typescript
// Get all pages in context
const allPages = context.pages();
console.log(`Total tabs: ${allPages.length}`);

// Switch to specific page
await page2.bringToFront();

// Or use page reference
await newPage.bringToFront();
```

### Q3: How do you handle popup windows?

```typescript
const [popup] = await Promise.all([
  context.waitForEvent("page"),
  page.locator("#openwindow").click(),
]);

await popup.waitForLoadState("load");
// Work with popup
await popup.close();
```

### Q4: What is the difference between page and context?

| Aspect        | Browser Context             | Page                |
| ------------- | --------------------------- | ------------------- |
| **Isolation** | Isolated cookies/storage    | Shares context      |
| **Creation**  | `browser.newContext()`      | `context.newPage()` |
| **Use Case**  | Login state, parallel tests | Single tab/window   |
| **Tabs**      | Multiple pages              | Single page         |

### Q5: How do you handle new windows (not tabs)?

```typescript
// Playwright treats new windows as new pages within same context
const [newWindow] = await Promise.all([
  context.waitForEvent("page"),
  page.locator("button").click(),
]);
```

### Q6: How do you close a tab/window?

```typescript
// Close specific page
await page.close();

// Close context (closes all pages)
await context.close();
```

### Q7: How do you verify URL in new tab?

```typescript
await expect(newPage).toHaveURL(/.*pattern/);
await expect(newPage).toHaveURL("https://exact-url.com");
```

### Q8: What events can you listen for?

```typescript
// Wait for new page event
context.waitForEvent("page");

// Wait for popup window
context.waitForEvent("popup");

// Or listen to page events
page.on("popup", (popup) => console.log(popup.url()));
page.on("request", (request) => console.log(request.url()));
```

### Q9: How do you persist login state across tabs?

```typescript
// Create context with storage state
const context = await browser.newContext({
  storageState: "./auth.json", // Save/load login state
});

// All pages in this context share the login
```

### Q10: What is the difference between bringToFront() and close()?

| Method           | Description                     |
| ---------------- | ------------------------------- |
| `bringToFront()` | Brings page to focus/foreground |
| `close()`        | Closes the page/tab             |

---

### Key Methods Summary

| Method                         | Use Case                |
| ------------------------------ | ----------------------- |
| `context.waitForEvent('page')` | Wait for new tab/window |
| `context.pages()`              | Get all open pages      |
| `page.bringToFront()`          | Focus on specific page  |
| `newPage.waitForLoadState()`   | Wait for page load      |
| `expect(page).toHaveURL()`     | Verify URL              |

### Q11: How do you switch back to parent window?

```typescript
// Store parent page reference before opening new tab
const parentPage = page;

// Open new tab
const [newPage] = await Promise.all([
  context.waitForEvent("page"),
  page.locator(".link").click(),
]);

// Work with new page...
await newPage.waitForLoadState("domcontentloaded");

// Switch back to parent window
await parentPage.bringToFront();

// Verify parent is active
await expect(parentPage).toHaveURL(/.*original/);
```

### Q12: How do you close child window and continue with parent?

```typescript
// Close child window
await childPage.close();

// Switch back to parent
await parentPage.bringToFront();

// Parent is still functional
await parentPage.locator("#input").fill("value");
```

### Q13: Can you store page reference for later use?

```typescript
// Store page references
const page1 = page;
const page2 = await context.newPage();
const page3 = await context.newPage();

// Switch between any stored reference
await page1.bringToFront();
await page2.bringToFront();
await page3.bringToFront();
```
