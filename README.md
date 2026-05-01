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
│   └── StaticDropdown.spec.js     # Static dropdown tests
└── .github/workflows/
    └── playwright.yml      # CI/CD workflow
```

## 🔧 Tech Stack

- Playwright: ^1.59.1
- Node.js types: ^25.6.0

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