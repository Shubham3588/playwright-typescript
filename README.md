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