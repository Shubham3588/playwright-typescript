const { test, expect } = require('@playwright/test');

test('Window Handling - Multi Tab/Window Test', async ({ browser }) => {
    // Create a new browser context
    const context = await browser.newContext();
    const page = await context.newPage();
    
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
    
    // Switch back to original tab
    await page.bringToFront();
    
    // Verify we're back on original page
    await expect(page).toHaveURL(/.*loginpagePractise/);
    
    // Close the new page
    await newPage.close();
    
    // Close the context
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