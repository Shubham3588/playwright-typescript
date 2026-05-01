# Playwright TypeScript Testing

A Playwright automation testing project for e-commerce website testing.

## 📦 Installation

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
│   ├── ecommerceTest.spec.js      # E-commerce tests
│   ├── StaticDropdown.spec.js     # Static dropdown tests
│   └── WindowHandling.spec.js     # Window/Tab handling tests
└── .github/workflows/
    └── playwright.yml      # CI/CD workflow
```

## 🔧 Tech Stack

- Playwright: ^1.59.1
- Node.js types: ^25.6.0

---

# 📖 Complete Playwright Guide

## 1. Test Structure

Every Playwright test follows this pattern:

```typescript
const { test, expect } = require('@playwright/test');

test('Test Name', async ({ page }) => {
    // Test code here
});
```

### Test Hooks

```typescript
// Run before each test
test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com');
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
await page.locator('#username').fill('rahulshettyacademy');
await page.locator('.card-body').first().click();
await page.locator('[formcontrolname="userPassword"]').fill('Test@123');
```

### 2.2 Text Locator
```typescript
// Find element by exact text
await page.getByText('Submit').click();

// Find element by role and text
await page.getByRole('button', { name: 'Submit' }).click();
```

### 2.3 Nth Element
```typescript
// Select 2nd element (0-indexed)
await page.locator('.card-body').nth(1).click();

// Select first element
await page.locator('.card-body').first().click();

// Select last element
await page.locator('.card-body').last().click();
```

### 2.4 Filter Locators
```typescript
// Filter by text
await page.locator('.product').filter({ hasText: 'iPhone' }).click();

// Filter by another locator
await page.locator('.product').filter({ has: page.locator('.price') }).click();
```

---

## 3. Actions

### 3.1 Fill & Type
```typescript
// Fill - clears and fills (for input, textarea, contenteditable)
await page.locator('#username').fill('rahulshettyacademy');

// Type - types character by character
await page.locator('#search').type('Playwright', { delay: 100 });
```

### 3.2 Click
```typescript
// Simple click
await page.locator('#submit').click();

// Double click
await page.locator('#item').dblclick();

// Right click
await page.locator('#item').click({ button: 'right' });

// Hover
await page.locator('#menu').hover();
```

### 3.3 Select Option
```typescript
// By value
await page.locator('select.form-control').selectOption('consultant');

// By label
await page.locator('select.form-control').selectOption({ label: 'Consultant' });

// By index
await page.locator('select.form-control').selectOption({ index: 1 });
```

### 3.4 Checkbox & Radio
```typescript
// Check
await page.locator('#checkbox').check();

// Uncheck
await page.locator('#checkbox').uncheck();

// Click radio
await page.locator('.radiotextsty').nth(1).click();
```

---

## 4. Assertions

### 4.1 Common Assertions
```typescript
// Text content
await expect(page.locator('#title')).toHaveText('Welcome');
await expect(page.locator('#title')).toContainText('Welcome');

// Value
await expect(page.locator('#email')).toHaveValue('test@test.com');

// Visibility
await expect(page.locator('#modal')).toBeVisible();
await expect(page.locator('#modal')).toBeHidden();

// Enabled/Disabled
await expect(page.locator('#submit')).toBeEnabled();
await expect(page.locator('#submit')).toBeDisabled();

// Checked state
await expect(page.locator('#checkbox')).toBeChecked();
await expect(page.locator('#checkbox')).toBeUnchecked();

// Count
await expect(page.locator('.item')).toHaveCount(5);

// Attribute
await expect(page.locator('#link')).toHaveAttribute('href', '/home');
```

### 4.2 Soft Assertions
```typescript
// Continues even if assertion fails
await expect.soft(page.locator('#title')).toHaveText('Welcome');
```

---

## 5. Waits

Playwright auto-waits for actions, but you can explicitly wait:

### 5.1 Wait for Element
```typescript
// Wait for visible
await page.locator('#loading').waitFor();

// Wait for hidden
await page.locator('#loading').waitFor({ state: 'hidden' });

// Wait for attached
await page.locator('#dynamic').waitFor({ state: 'attached' });
```

### 5.2 Wait for Load State
```typescript
await page.goto('https://example.com');
await page.waitForLoadState('networkidle'); // Wait until network is idle
await page.waitForLoadState('domcontentloaded');
await page.waitForLoadState('load');
```

### 5.3 Wait for URL
```typescript
await page.waitForURL('**/dashboard/**');
await page.waitForURL(url => url.includes('/dashboard'));
```

### 5.4 Custom Wait
```typescript
await page.waitForFunction(() => document.querySelector('.loaded'));
```

---

## 6. Browser Context

Browser context creates isolated browser sessions:

```typescript
test('Browser Context Example', async ({ browser }) => {
    // Create new context (isolated cookies/storage)
    const context = await browser.newContext({
        storageState: './auth.json', // Persist login state
        viewport: { width: 1280, height: 720 },
        locale: 'en-US',
        timezoneId: 'America/New_York'
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
await page.route('**/api/user', async route => {
    await route.fulfill({
        status: 200,
        body: JSON.stringify({ name: 'Test User', email: 'test@test.com' })
    });
});
```

### 7.2 Block Requests
```typescript
await page.route('**/*.png', route => route.abort());
await page.route('**/analytics/**', route => route.abort());
```

### 7.3 Spy on Requests
```typescript
await page.on('request', request => console.log(request.url()));
await page.on('response', response => console.log(response.status()));
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
| Method | Description |
|--------|-------------|
| `test()` | Defines a test case |
| `expect()` | Assertion library for assertions |

### Browser & Context
| Method | Description |
|--------|-------------|
| `browser.newContext()` | Creates a new browser context (isolated session) |
| `context.newPage()` | Creates a new page within the context |

### Page Navigation & Locators
| Method | Description |
|--------|-------------|
| `page.goto(url)` | Navigates to the specified URL |
| `page.locator(selector)` | Creates a locator for the given selector |
| `page.locator().nth(index)` | Selects the nth element matching the locator |
| `page.locator().first()` | Selects the first element matching the locator |

### Locator Actions
| Method | Description |
|--------|-------------|
| `locator.fill(text)` | Fills the input field with text |
| `locator.click()` | Clicks on the element |
| `locator.selectOption(value)` | Selects an option from a dropdown |
| `locator.allTextContents()` | Gets text content of all matching elements |

### Wait & Assertions
| Method | Description |
|--------|-------------|
| `locator.waitFor()` | Waits for the element to be visible |
| `expect(locator).toBeChecked()` | Asserts the checkbox is checked |
| `page.pause()` | Pauses the test for debugging (Playwright Inspector) |

### Additional Methods (from commented code)
| Method | Description |
|--------|-------------|
| `page.getByText(text)` | Locates element by visible text |
| `page.waitForLoadState(state)` | Waits for specific load state (networkidle, domcontentloaded, etc.) |

---

## 🪟 Window Handling Guide (Interview Ready)

### Common Interview Questions & Answers

### Q1: How do you handle multiple tabs in Playwright?
```typescript
// Click link that opens new tab
const [newPage] = await Promise.all([
    context.waitForEvent('page'),  // Wait for new page event
    page.locator('.link').click()   // Click the link
]);

// Work with new page
await newPage.waitForLoadState('domcontentloaded');
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
    context.waitForEvent('page'),
    page.locator('#openwindow').click()
]);

await popup.waitForLoadState('load');
// Work with popup
await popup.close();
```

### Q4: What is the difference between page and context?
| Aspect | Browser Context | Page |
|--------|----------------|------|
| **Isolation** | Isolated cookies/storage | Shares context |
| **Creation** | `browser.newContext()` | `context.newPage()` |
| **Use Case** | Login state, parallel tests | Single tab/window |
| **Tabs** | Multiple pages | Single page |

### Q5: How do you handle new windows (not tabs)?
```typescript
// Playwright treats new windows as new pages within same context
const [newWindow] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('button').click()
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
await expect(newPage).toHaveURL('https://exact-url.com');
```

### Q8: What events can you listen for?
```typescript
// Wait for new page event
context.waitForEvent('page');

// Wait for popup window
context.waitForEvent('popup');

// Or listen to page events
page.on('popup', popup => console.log(popup.url()));
page.on('request', request => console.log(request.url()));
```

### Q9: How do you persist login state across tabs?
```typescript
// Create context with storage state
const context = await browser.newContext({
    storageState: './auth.json'  // Save/load login state
});

// All pages in this context share the login
```

### Q10: What is the difference between bringToFront() and close()?
| Method | Description |
|--------|-------------|
| `bringToFront()` | Brings page to focus/foreground |
| `close()` | Closes the page/tab |

---

### Key Methods Summary
| Method | Use Case |
|--------|----------|
| `context.waitForEvent('page')` | Wait for new tab/window |
| `context.pages()` | Get all open pages |
| `page.bringToFront()` | Focus on specific page |
| `newPage.waitForLoadState()` | Wait for page load |
| `expect(page).toHaveURL()` | Verify URL |