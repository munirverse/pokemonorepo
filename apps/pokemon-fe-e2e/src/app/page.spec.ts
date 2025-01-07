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

  test('should request certain response when filter and pagination was selected', async ({
    page,
  }) => {
    // go to FE url
    await page.goto('http://localhost:3000/');

    // init promise api response function
    const resPromise = (urlTarget: string) =>
      page.waitForResponse(async (res) => {
        const isTargetedEndpoint = res.url().includes(urlTarget);

        if (!isTargetedEndpoint) return false;
        return res.status() === 200;
      });

    // type filter test
    const typesFilter = page.getByRole('textbox', { name: 'Types' }).first();

    await typesFilter.click();

    await page.getByRole('option', { name: 'Fire' }).click();

    const typeFilterResponse = await resPromise('&types=');

    const typeFilterResponseBody = await typeFilterResponse.json();

    await expect(typesFilter).toHaveValue('Fire');

    expect(typeFilterResponse.status()).toBe(200);

    expect(typeFilterResponseBody.pagination).toBeDefined();

    expect(typeFilterResponseBody.data).toBeDefined();

    expect(typeFilterResponseBody.data.length).toBeGreaterThan(0);

    expect(typeFilterResponseBody.data[0].types).toContain('fire');

    // shape filter test
    const shapeFilter = page.getByRole('textbox', { name: 'Shape' }).first();

    await shapeFilter.click();

    await page.getByRole('option', { name: 'Quadruped' }).click();

    const shapeFilterResponse = await resPromise('&shape=');

    const shapeFilterResponseBody = await shapeFilterResponse.json();

    await expect(shapeFilter).toHaveValue('Quadruped');

    expect(shapeFilterResponse.status()).toBe(200);

    expect(shapeFilterResponseBody.pagination).toBeDefined();

    expect(shapeFilterResponseBody.data).toBeDefined();

    expect(shapeFilterResponseBody.data.length).toBeGreaterThan(0);

    expect(shapeFilterResponseBody.data[0].shape).toBe('quadruped');

    // clear filter types and shape
    const typesFilterClear = typesFilter.locator('..').locator('button');
    await typesFilterClear.click();

    const shapeFilterClear = shapeFilter.locator('..').locator('button');
    await shapeFilterClear.click();

    // page size and page number test
    const pageSizeFilter = page
      .getByRole('textbox', { name: 'Page Size Desktop' })
      .first();

    await pageSizeFilter.click();

    await page.getByRole('option', { name: '16' }).click();

    const pageNumberButton = page
      .locator('.mantine-Pagination-root')
      .locator('button')
      .nth(2);

    await pageNumberButton.click();

    const paginationResponse = await resPromise('page=2&limit=16');

    const paginationResponseBody = await paginationResponse.json();

    expect(paginationResponse.status()).toBe(200);

    expect(paginationResponseBody.pagination).toBeDefined();

    expect(paginationResponseBody.data).toBeDefined();

    expect(paginationResponseBody.pagination.pageNumber).toBe(2);

    expect(paginationResponseBody.pagination.pageSize).toBe(16);
  });
});
