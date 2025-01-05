import { test, expect } from '@playwright/test';

test.describe('Homepage E2E Tests', () => {
  test('should load the homepage with the correct components', async ({
    page,
  }) => {
    // go to FE url
    await page.goto('http://localhost:3000/');

    // Check Navbar is visible & provide some a links
    const navbar = page.locator('nav.navbar-desktop');
    await expect(navbar).toBeVisible();

    expect(await navbar.locator('a').count()).toBe(2);

    // Check Hero input is visible
    await expect(
      page.getByRole('textbox', { name: /search pokemon name/i })
    ).toBeVisible();

    // Check filter and pagination is visible
    const textFilter = page.getByPlaceholder('Types').nth(1);
    await expect(textFilter).toBeVisible();

    const shapeFilter = page.getByPlaceholder('Shape').nth(1);
    await expect(shapeFilter).toBeVisible();

    const pageSizeFilter = page.getByPlaceholder('Page Size Desktop').nth(1);
    await expect(pageSizeFilter).toBeVisible();

    const pagination = page.locator('.mantine-Pagination-root');
    expect(await pagination.locator('button').count()).toBeGreaterThan(1);
  });

  test('should redirect to search page when input search is submit', async ({
    page,
  }) => {
    // go to FE url
    await page.goto('http://localhost:3000/');

    // get and submit input search
    const searchInput = page.getByRole('textbox', {
      name: /search pokemon name/i,
    });

    await searchInput.fill('pikachu');

    await searchInput.press('Enter');

    await page.waitForURL('http://localhost:3000/search?q=pikachu');

    expect(page.url()).toBe('http://localhost:3000/search?q=pikachu');
  });
});
