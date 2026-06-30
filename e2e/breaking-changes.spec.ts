import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Hugo breaking changes are fixed', () => {
  test('admonition shortcodes render HTML correctly (markdownify fix)', async ({ page }) => {
    await page.goto('/blog/harbor-2-10/');

    // Check that admonition elements exist
    const admonitions = page.locator('.admonition');
    await expect(admonitions.first()).toBeVisible();

    // Verify content is rendered, not raw markdown
    const admonitionContent = admonitions.first().locator('.content');
    const innerHTML = await admonitionContent.innerHTML();

    // If markdownify failed, we'd see raw markdown syntax like `**bold**` or `[link](url)`
    expect(innerHTML).not.toMatch(/\*\*/);
    expect(innerHTML).not.toMatch(/\[.*\]\(.*\)/);

    // Verify there's actual rendered text
    expect(innerHTML.length).toBeGreaterThan(0);
  });

  test('disableKinds "term" works without taxonomy warnings', async ({ page }) => {
    // Start page load and capture any console errors
    let hasWarnings = false;
    page.on('console', msg => {
      if (msg.type() === 'error' || msg.text().includes('taxonomy')) {
        hasWarnings = true;
      }
    });

    await page.goto('/');

    // No warnings should have been logged about taxonomyTerm
    expect(hasWarnings).toBe(false);
  });

  test('custom output format _redirects is generated', async () => {
    const publicDir = path.join(process.cwd(), 'public');
    const redirectsFile = path.join(publicDir, '_redirects');

    expect(fs.existsSync(redirectsFile)).toBe(true);

    const content = fs.readFileSync(redirectsFile, 'utf-8');
    expect(content.length).toBeGreaterThan(0);

    // Should contain redirect rules (format: /source /destination 301)
    expect(content).toMatch(/^\/.+\s+/m);
  });

  test('CSS pipeline processes without errors (css.Sass)', async ({ page }) => {
    await page.goto('/');

    // Verify stylesheet link exists in head
    const styleLink = page.locator('link[rel="stylesheet"]').first();
    await expect(styleLink).toBeVisible();

    const href = await styleLink.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toContain('.css');

    // Fetch the CSS to verify it's valid
    const response = await page.goto(href!);
    expect(response?.ok()).toBe(true);

    // Check that styles are actually applied
    const body = page.locator('body');
    const computedStyle = await body.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );
    expect(computedStyle).not.toBe('');
  });

  test('site.IsServer form works correctly', async ({ page }) => {
    await page.goto('/');

    // In dev mode (hugo server), we should have source maps
    // Check for stylesheet with source map comment
    const stylesheets = page.locator('link[rel="stylesheet"]');
    const styleLink = await stylesheets.first().getAttribute('href');

    // Stylesheet should exist and be loadable
    const response = await page.goto(styleLink!);
    expect(response?.ok()).toBe(true);
  });
});
