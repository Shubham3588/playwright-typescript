const { test, expect } = require('@playwright/test');

test('Window Handling - Multi Tab/Window Test', async ({ browser }) => {
    // Create a new browser context
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Store the original page reference (parent window)
    const parentPage = page;
    
    // Navigate to the initial page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // Click a link that opens in a new tab
    const [newPage] = await Promise.all([
        // Wait for new tab to open
        context.waitForEvent('page'),
        // Click the link that opens new tab
        page.locator('.blinkingText').click()
    ]);
    
    // Switch to the new tab
    await newPage.waitForLoadState('domcontentloaded');
    
    // Verify we're on the new page
    await expect(newPage).toHaveURL(/.*automationpractice.com/);
    
    // Get the course name from new page
    const courseName = await newPage.locator('.text-justify').textContent();
    console.log('Course:', courseName);
    
    // ===== SWITCH BACK TO PARENT WINDOW =====
    await parentPage.bringToFront();
    
    // Verify we're back on original page
    await expect(parentPage).toHaveURL(/.*loginpagePractise/);
    
    // Optional: Verify parent page is still active
    console.log('Switched back to parent window');
    
    // Close the new page
    await newPage.close();
    
    // Close the context
    await context.close();
});

test('Window Handling - Switch Between Multiple Tabs', async ({ browser }) => {
    const context = await browser.newContext();
    const page1 = await context.newPage();
    
    // Open first page (parent)
    await page1.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const parentWindow = page1;
    
    // Create second page
    const page2 = await context.newPage();
    await page2.goto('https://google.com');
    
    // Create third page
    const page3 = await context.newPage();
    await page3.goto('https://rahulshettyacademy.com/seleniumPractise/');
    
    // Get all pages
    const allPages = context.pages();
    console.log(`Total tabs: ${allPages.length}`);
    
    // Switch to page2
    await page2.bringToFront();
    console.log('On page2:', await page2.title());
    
    // Switch to page3
    await page3.bringToFront();
    console.log('On page3:', await page3.title());
    
    // ===== SWITCH BACK TO PARENT (page1) =====
    await parentWindow.bringToFront();
    console.log('Back to parent window:', await parentWindow.title());
    
    // Verify parent window is active
    await expect(parentWindow).toHaveURL(/.*loginpagePractise/);
    
    // Close all except parent
    await page2.close();
    await page3.close();
    
    await context.close();
});

test('Window Handling - Close Child and Switch to Parent', async ({ browser }) => {
    const context = await browser.newContext();
    const parentPage = await context.newPage();
    
    await parentPage.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // Open child window
    const [childPage] = await Promise.all([
        context.waitForEvent('page'),
        parentPage.locator('.blinkingText').click()
    ]);
    
    await childPage.waitForLoadState('load');
    console.log('Child window opened');
    
    // Work with child window
    const childUrl = childPage.url();
    console.log('Child URL:', childUrl);
    
    // Close the child window
    await childPage.close();
    console.log('Child window closed');
    
    // ===== SWITCH BACK TO PARENT WINDOW =====
    await parentPage.bringToFront();
    
    // Verify parent is still active and can perform actions
    await expect(parentPage).toHaveURL(/.*loginpagePractise/);
    
    // Continue working with parent
    await parentPage.locator('#username').fill('test');
    console.log('Parent window is active and functional');
    
    await context.close();
});

test('Window Handling - Multiple Windows', async ({ browser }) => {
    const context = await browser.newContext();
    const page1 = await context.newPage();
    
    // Open first page
    await page1.goto('https://google.com');
    
    // Create second page in same context
    const page2 = await context.newPage();
    await page2.goto('https://rahulshettyacademy.com');
    
    // Get all pages in context
    const allPages = context.pages();
    console.log(`Total pages: ${allPages.length}`);
    
    // Switch between pages
    await page1.bringToFront();
    await page2.bringToFront();
    
    // Close specific page
    await page2.close();
    
    await context.close();
});

test('Window Handling - New Window (Popup)', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractice/');
    
    // Wait for popup window
    const [popup] = await Promise.all([
        context.waitForEvent('page'),
        page.locator('#openwindow').click()
    ]);
    
    // Handle the popup
    await popup.waitForLoadState('load');
    
    // Switch to popup and perform actions
    await popup.locator('#search-input').fill('Test');
    
    // Close popup
    await popup.close();
    
    await context.close();
});