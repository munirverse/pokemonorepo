import { test, expect } from '@playwright/test';

test.describe('Searchpage E2E Test', () => {
  test('should load the searchpage with correct components', async ({
    page,
  }) => {
    // go to FE url
    await page.goto('http://localhost:3000/search?q=pikachu');

    // check search input on navbar is visible and have correct value
    const navbarSearchInput = page
      .locator('nav.navbar-desktop')
      .getByRole('textbox', { name: /search pokemon name/i });

    await expect(navbarSearchInput).toBeVisible();

    await expect(navbarSearchInput).toHaveValue('pikachu');

    // check list of pokemon cards has synced with query parameters
    const pokemonCard = page.locator('.mantine-Card-root').nth(0);

    await expect(pokemonCard.getByText('pikachu')).toBeVisible();
  });

  test('should request certain response when infinite scroll was triggered', async ({
    page,
  }) => {
    // go to FE url
    await page.goto('http://localhost:3000/search?q=pi');

    // init promise api response function
    const resPromise = (urlTarget: string) =>
      page.waitForResponse(async (res) => {
        const isTargetedEndpoint = res.url().includes(urlTarget);

        if (!isTargetedEndpoint) return false;
        return res.status() === 200;
      });

    // get body scrollHeight
    const bodyScrollHeight = await page.evaluate(async () => {
      // wait 1 seconds for waiting rendering process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return document.body.scrollHeight;
    });

    // trigger scroll to bottom
    await page.mouse.wheel(0, bodyScrollHeight);

    const paginationResponse = await resPromise('&page=2');

    const paginationResponseBody = await paginationResponse.json();

    expect(paginationResponseBody.pagination).toBeDefined();

    expect(paginationResponseBody.data).toBeDefined();

    expect(paginationResponseBody.pagination.pageNumber).toBe(2);
  });
});
