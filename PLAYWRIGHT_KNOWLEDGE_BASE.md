# 🎭 Playwright Complete Knowledge Base

**For Interview Preparation & Comprehensive Learning**

---

## Table of Contents

1. [Setup & Installation](#setup--installation)
2. [Core Concepts](#core-concepts)
3. [Locators & Selectors](#locators--selectors)
4. [Common Methods](#common-methods)
5. [Assertions](#assertions)
6. [Best Practices](#best-practices)
7. [Interview Q&A](#interview-qa)
8. [Real-world Examples](#real-world-examples)

---

## Setup & Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

```bash
# Create a new project
npm init -y

# Install Playwright
npm install --save-dev @playwright/test

# Install browser binaries
npx playwright install

# (Optional) Install dependencies for VS Code integration
npm install --save-dev @playwright/test typescript
```

### Project Structure

```
project-root/
├── playwright.config.js       # Playwright configuration
├── package.json               # Dependencies
├── tests/                     # Test files directory
│   ├── example.spec.js
│   └── ...
├── playwright-report/         # Test reports
└── test-results/             # Test results
```

### Basic Configuration (playwright.config.js)

```javascript
const { defineConfig, devices } = require("@playwright/test");

export const config = defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000, // 30 seconds per test
  expect: {
    timeout: 5000, // 5 seconds per assertion
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
```

---

## Core Concepts

### 1. Browser, Context, and Page

**Browser:** The browser instance (Chromium, Firefox, WebKit)
**Context:** An isolated session within a browser
**Page:** A tab/window within a context

```javascript
const { chromium } = require("@playwright/test");

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

await page.goto("https://example.com");

await page.close();
await context.close();
await browser.close();
```

### 2. Test Structure

```javascript
const { test, expect } = require("@playwright/test");

test("Test Name", async ({ page }) => {
  // Arrange
  await page.goto("https://example.com");

  // Act
  await page.click("#button");

  // Assert
  await expect(page.locator(".message")).toContainText("Success");
});
```

### 3. Test Fixtures

```javascript
test.describe("Feature Group", () => {
  test.beforeEach(async ({ page }) => {
    // Runs before each test
    await page.goto("https://example.com");
  });

  test.afterEach(async ({ page }) => {
    // Runs after each test
    console.log("Test completed");
  });

  test("Test 1", async ({ page }) => {
    // Test code
  });
});
```

---

## Locators & Selectors

### Types of Locators

#### 1. CSS Selectors

```javascript
// Element by class
await page.locator(".button").click();

// Element by ID
await page.locator("#email").fill("test@test.com");

// Attribute selector
await page.locator('[name="username"]').fill("user");

// Combined
await page.locator("div.container > button.submit").click();
```

#### 2. XPath

```javascript
// Element by text
await page.locator("//button[text()='Submit']").click();

// Element by attribute
await page.locator("//input[@id='email']").fill("test@test.com");

// Parent-child relationship
await page.locator("//div[@class='form']//input[@type='text']").fill("value");
```

#### 3. Playwright Built-in Locators (Recommended)

```javascript
// By label (for form controls)
await page.getByLabel("Username").fill("user123");

// By placeholder
await page.getByPlaceholder("Enter password").fill("Pass@123");

// By text
await page.getByText("Click Me").click();

// By role (accessibility-based)
await page.getByRole("button", { name: "Submit" }).click();
await page.getByRole("textbox", { name: "Email" }).fill("test@test.com");

// By test ID (data-testid)
await page.getByTestId("login-button").click();
```

### Advanced Locator Methods

```javascript
// Combine locators with filter
await page.locator("button").filter({ hasText: "Submit" }).click();

// Filter by child element
await page
  .locator(".card")
  .filter({ has: page.locator(".badge") })
  .first()
  .click();

// Using nth() to select specific element
await page.locator(".item").nth(2).click();

// Using first() and last()
await page.locator(".item").first().click();
await page.locator(".item").last().click();

// Using count()
const count = await page.locator(".item").count();
```

---

## Common Methods

### Navigation

```javascript
// Navigate to URL
await page.goto("https://example.com");
await page.goto("https://example.com", { waitUntil: "networkidle" });

// Back/Forward
await page.goBack();
await page.goForward();

// Reload
await page.reload();
```

### Waiting

```javascript
// Wait for element
await page.locator(".message").waitFor();

// Wait for navigation
await page.waitForNavigation();

// Wait for specific timeout
await page.waitForTimeout(2000);

// Wait for load state
await page.waitForLoadState("networkidle");
await page.waitForLoadState("domcontentloaded");
await page.waitForLoadState("load");
```

### Element Interactions

```javascript
// Click
await page.locator("button").click();
await page.locator("button").dblClick();
await page.locator("button").click({ button: "right" });

// Fill input
await page.locator("#email").fill("test@test.com");

// Type text (slower, character by character)
await page.locator("#email").type("test@test.com");

// Press keys
await page.locator("input").press("Enter");
await page.keyboard.press("Tab");

// Check/Uncheck
await page.locator('input[type="checkbox"]').check();
await page.locator('input[type="checkbox"]').uncheck();

// Select option
await page.locator("select").selectOption("value");
await page.locator("select").selectOption({ label: "Option 1" });

// Drag and drop
await page.locator("#source").dragTo(page.locator("#target"));

// Hover
await page.locator(".menu-item").hover();

// Scroll
await page.locator(".item").scrollIntoViewIfNeeded();
```

### Reading Element Data

```javascript
// Get text content
const text = await page.locator(".message").textContent();

// Get inner text (visible only)
const visibleText = await page.locator(".message").innerText();

// Get input value
const value = await page.locator("#email").inputValue();

// Get attribute
const href = await page.locator("a").getAttribute("href");

// Get all text contents (from multiple elements)
const texts = await page.locator(".item").allTextContents();

// Check visibility
const isVisible = await page.locator(".message").isVisible();

// Check if checked
const isChecked = await page.locator('input[type="checkbox"]').isChecked();

// Get element count
const count = await page.locator(".item").count();
```

### DOM Manipulation

```javascript
// Execute JavaScript
const result = await page.evaluate(() => {
  return document.title;
});

// Execute with arguments
const sum = await page.evaluate(([a, b]) => a + b, [5, 10]);

// Add element
await page.evaluate(() => {
  const div = document.createElement("div");
  div.textContent = "New element";
  document.body.appendChild(div);
});
```

### Screenshot & Video

```javascript
// Take screenshot
await page.screenshot({ path: "screenshot.png" });

// Take screenshot of specific element
await page.locator(".card").screenshot({ path: "card.png" });

// Enable video recording (in config)
// video: 'retain-on-failure' or 'on'
```

---

## Assertions

### Basic Assertions

```javascript
const { expect } = require("@playwright/test");

// Text content
await expect(page.locator(".message")).toContainText("Success");
await expect(page.locator(".message")).toHaveText("Exact Text");

// Visibility
await expect(page.locator(".message")).toBeVisible();
await expect(page.locator(".hidden")).toBeHidden();

// Enabled/Disabled
await expect(page.locator("button")).toBeEnabled();
await expect(page.locator("button")).toBeDisabled();

// Checked
await expect(page.locator('input[type="checkbox"]')).toBeChecked();
await expect(page.locator('input[type="checkbox"]')).not.toBeChecked();

// Editable
await expect(page.locator("input")).toBeEditable();

// Value
await expect(page.locator("input")).toHaveValue("expected value");

// Attribute
await expect(page.locator("a")).toHaveAttribute("href", "/path");

// Count
await expect(page.locator(".item")).toHaveCount(5);

// Class
await expect(page.locator(".button")).toHaveClass("active");

// Focus
await expect(page.locator("input")).toBeFocused();
```

### Page Assertions

```javascript
// URL
await expect(page).toHaveURL("https://example.com/dashboard");

// Title
await expect(page).toHaveTitle("Dashboard - Example App");
```

### Custom Assertions

```javascript
// Use Truthy/Falsy
const isValid = await page.locator(".error").isVisible();
expect(isValid).toBeTruthy();

// Use toEqual for exact match
const text = await page.locator(".title").textContent();
expect(text).toEqual("Expected Title");
```

---

## Best Practices

### 1. Use Built-in Locators Over CSS/XPath

```javascript
// ❌ Avoid
await page.locator("button.submit-btn").click();

// ✅ Prefer
await page.getByRole("button", { name: "Submit" }).click();
```

### 2. Wait Intelligently

```javascript
// ❌ Avoid - Flaky
await page.waitForTimeout(5000);

// ✅ Prefer - Reliable
await page.locator(".loader").waitFor({ state: "hidden" });
```

### 3. Use Page Object Model

```javascript
// pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("https://app.com/login");
  }

  async login(email, password) {
    await this.page.getByLabel("Email").fill(email);
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }
}

module.exports = LoginPage;
```

### 4. Test Isolation

```javascript
// Each test should be independent
test.describe("User Profile", () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await loginUser(page);
  });

  test("should display user info", async ({ page }) => {
    // Test specific functionality
  });
});
```

### 5. Use Meaningful Assertions

```javascript
// ❌ Weak
await expect(page.locator("div")).toBeVisible();

// ✅ Strong
await expect(page.locator(".success-message")).toContainText(
  "Order placed successfully",
);
```

---

## Interview Q&A

### Q1: What is Playwright and why use it?

**Answer:**
Playwright is a Node.js library for automating web applications across Chromium, Firefox, and WebKit browsers.

**Why use it:**

- Multi-browser support out of the box
- Fast execution with parallel test capabilities
- Excellent API for waiting and handling async operations
- Better than Selenium for modern applications
- Built-in locator strategies (getByRole, getByLabel, etc.)
- Good support for mobile testing
- Comprehensive debugging tools (trace viewer, video recording)

---

### Q2: Difference between Locators and Selectors

**Answer:**
| Aspect | Locator | Selector |
|--------|---------|----------|
| **Definition** | Playwright's API method to find elements | Raw CSS or XPath string |
| **Resilience** | Auto-waiting and retry logic | No built-in retry |
| **API** | `page.locator()`, `page.getByRole()` | Used inside locator |
| **Best for** | Reliable element interaction | Simple selections |
| **Accessibility** | Built-in locators use ARIA roles | Only CSS/XPath |

**Example:**

```javascript
// Selector
const selector = "#email";

// Locator using selector
const locator = page.locator("#email");

// Built-in locator (no selector)
const builtInLocator = page.getByLabel("Email");
```

---

### Q3: How do you handle waits in Playwright?

**Answer:**
Playwright has intelligent waiting built-in. Three main strategies:

```javascript
// 1. Auto-waiting (recommended)
// Playwright waits for actionability before interacting
await page.locator("#submit").click(); // Waits for element to be visible, stable, enabled

// 2. Explicit waiting
await page.locator(".loader").waitFor({ state: "hidden" });
await page.waitForNavigation();

// 3. Timeout-based (avoid if possible)
await page.waitForTimeout(2000); // ❌ Flaky
```

**Best Practice:** Let Playwright handle waits automatically via actionability checks.

---

### Q4: What is the difference between `textContent()`, `inputValue()`, and `innerText()`?

**Answer:**

| Method          | Use Case              | Returns             | Hidden Text     |
| --------------- | --------------------- | ------------------- | --------------- |
| `textContent()` | Any element           | All text content    | Includes hidden |
| `inputValue()`  | Input/textarea/select | Current field value | N/A             |
| `innerText()`   | Visible text          | Only visible text   | Excludes        |

```javascript
// HTML: <div style="display:none">Hidden</div><div>Visible</div>

await page.locator("div").textContent(); // "HiddenVisible"
await page.locator("div").innerText(); // "Visible"
await page.locator("input").inputValue(); // "form_value"
```

---

### Q5: How do you handle multiple browser tabs/windows?

**Answer:**

```javascript
// Listen for popup
const popupPromise = page.waitForEvent("popup");
await page.locator('a[target="_blank"]').click();
const popup = await popupPromise;

// Use popup page
await popup.waitForLoadState();
const title = await popup.title();
await popup.close();
```

---

### Q6: What is the Page Object Model pattern?

**Answer:**
Page Object Model (POM) is a design pattern that represents each web page as a class, encapsulating element locators and interaction methods.

**Benefits:**

- Maintainability
- Reusability
- Readability
- Reduces code duplication

**Example:**

```javascript
// pages/Dashboard.js
class Dashboard {
  constructor(page) {
    this.page = page;
    this.welcomeMessage = page.getByRole("heading", { name: /Welcome/ });
    this.logoutButton = page.getByRole("button", { name: "Logout" });
  }

  async logout() {
    await this.logoutButton.click();
  }

  async getWelcomeText() {
    return await this.welcomeMessage.textContent();
  }
}

// test.js
const dashboard = new Dashboard(page);
await dashboard.logout();
```

---

### Q7: How do you run tests in parallel?

**Answer:**

```javascript
// playwright.config.js
export const config = {
  fullyParallel: true,  // Run all tests in parallel
  workers: 4,           // Number of worker processes
};

// Or use command line
npx playwright test --workers=4
```

**Note:** Tests in the same file run sequentially by default. Use separate files for parallel execution.

---

### Q8: How do you handle authentication in tests?

**Answer:**

```javascript
// 1. Save authenticated state
test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // Login
  await page.goto("https://app.com/login");
  await page.getByLabel("Email").fill("user@test.com");
  await page.getByLabel("Password").fill("password");
  await page.getByRole("button", { name: "Login" }).click();

  // Save state
  await context.storageState({ path: "auth.json" });
});

// 2. Reuse authenticated state
test("should access dashboard", async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "auth.json",
  });
  const page = await context.newPage();
  await page.goto("https://app.com/dashboard");
});
```

---

### Q9: What are the types of waits in Playwright?

**Answer:**

1. **Auto-waiting** - Playwright waits for element actionability
2. **Explicit waiting** - Using `waitFor()` methods
3. **Navigation waiting** - Using `waitForNavigation()`
4. **Load state waiting** - Using `waitForLoadState()`
5. **Event waiting** - Using `waitForEvent()`

```javascript
// Auto-waiting (recommended)
await page.locator("#button").click();

// Explicit wait
await page.locator(".loader").waitFor({ state: "hidden" });

// Navigation wait
await page.waitForNavigation();

// Load state wait
await page.waitForLoadState("networkidle");

// Event wait
const popup = await page.waitForEvent("popup");
```

---

### Q10: How do you debug Playwright tests?

**Answer:**

```bash
# 1. Run with headed mode
npx playwright test --headed

# 2. Run in debug mode (interactive debugger)
npx playwright test --debug

# 3. Run with UI mode
npx playwright test --ui

# 4. View test report
npx playwright show-report
```

**In Code:**

```javascript
test("debug test", async ({ page }) => {
  await page.goto("https://example.com");
  await page.pause(); // Pause execution for debugging
});
```

---

## Real-world Examples

### Example 1: Complete Login Flow

```javascript
const { test, expect } = require("@playwright/test");

test("Complete login flow", async ({ page }) => {
  // Navigate to login page
  await page.goto("https://example.com/login");

  // Fill credentials
  await page.getByLabel("Email").fill("user@test.com");
  await page.getByLabel("Password").fill("Password123");

  // Submit form
  await page.getByRole("button", { name: "Login" }).click();

  // Wait for dashboard
  await page.waitForNavigation();

  // Assert successful login
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});
```

### Example 2: Form Validation

```javascript
test("Form validation", async ({ page }) => {
  await page.goto("https://example.com/signup");

  // Leave email empty and submit
  await page.getByRole("button", { name: "Sign Up" }).click();

  // Check error message
  const error = page.locator(".error-message");
  await expect(error).toContainText("Email is required");

  // Fill email
  await page.getByLabel("Email").fill("test@test.com");

  // Error should disappear
  await expect(error).not.toBeVisible();
});
```

### Example 3: Table Data Verification

```javascript
test("Verify table data", async ({ page }) => {
  await page.goto("https://example.com/users");

  // Get all rows
  const rows = page.locator("table tbody tr");
  const count = await rows.count();

  // Verify first row
  const firstRow = rows.first();
  await expect(firstRow.locator("td:nth-child(1)")).toContainText("John");

  // Verify all rows contain expected data
  for (let i = 0; i < count; i++) {
    const row = rows.nth(i);
    const status = await row.locator("td:nth-child(3)").textContent();
    expect(["Active", "Inactive"]).toContain(status);
  }
});
```

### Example 4: Date Picker Interaction

```javascript
test("Select date from calendar", async ({ page }) => {
  await page.goto("https://example.com/calendar");

  // Click date picker
  await page.getByLabel("Select Date").click();

  // Navigate to year
  await page.locator(".calendar-header").click();

  // Select year
  await page.getByText("2024").click();

  // Select month
  await page.getByText("June").click();

  // Select day
  await page.locator("button").filter({ hasText: "15" }).click();

  // Verify selected date
  await expect(page.getByLabel("Select Date")).toHaveValue("06/15/2024");
});
```

### Example 5: API Testing with Playwright

```javascript
test("Verify API response in UI", async ({ page }) => {
  // Intercept API request
  const responsePromise = page.waitForResponse((response) =>
    response.url().includes("/api/users"),
  );

  await page.goto("https://example.com/users");
  const response = await responsePromise;

  // Verify response status
  expect(response.status()).toBe(200);

  // Get response data
  const data = await response.json();
  expect(data.users.length).toBeGreaterThan(0);

  // Verify UI shows correct data
  await expect(page.locator(".user-count")).toContainText(data.users.length);
});
```

---

## Quick Reference Cheat Sheet

| Task             | Code                                             |
| ---------------- | ------------------------------------------------ |
| Navigate         | `await page.goto(url)`                           |
| Click            | `await page.locator(selector).click()`           |
| Fill input       | `await page.locator(selector).fill(text)`        |
| Get text         | `await page.locator(selector).textContent()`     |
| Check element    | `await expect(locator).toBeVisible()`            |
| Wait for element | `await page.locator(selector).waitFor()`         |
| Take screenshot  | `await page.screenshot({ path: 'file.png' })`    |
| Execute JS       | `await page.evaluate(() => { ... })`             |
| Get all items    | `await page.locator(selector).allTextContents()` |
| Count elements   | `await page.locator(selector).count()`           |

---

## Additional Resources

- [Official Playwright Docs](https://playwright.dev)
- [API Reference](https://playwright.dev/docs/api/class-page)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [CI/CD Integration](https://playwright.dev/docs/ci)

---

**Last Updated:** May 2026
**Suitable for:** Beginners to Intermediate Automation Engineers
