import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Hugo breaking changes are fixed', () => {
  test('admonition shortcodes render HTML correctly (markdownify fix)', async ({ page }) => {
    // Use a docs page known to have admonitions
    await page.goto('/docs/2.1.0/administration/configuring-replication/');

    // Check that admonition elements exist
    const admonitions = page.locator('.admonition');
    await expect(admonitions).not.toHaveCount(0);

    // Verify content is rendered, not raw markdown
    const firstAdmonition = admonitions.first().locator('.content');
    const innerHTML = await firstAdmonition.innerHTML();

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

    // Verify stylesheet link exists in head (link elements are never "visible" in Playwright)
    const styleLink = page.locator('link[rel="stylesheet"]').first();
    await expect(styleLink).toHaveCount(1);

    const href = await styleLink.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toContain('.css');

    // Verify the stylesheet loaded by checking computed styles are applied
    const body = page.locator('body');
    const computedStyle = await body.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );
    expect(computedStyle).not.toBe('');
  });

  test('built CSS is fingerprinted and valid', async () => {
    // In production build (hugo build), CSS should be fingerprinted
    const publicDir = path.join(process.cwd(), 'public');
    const cssDir = path.join(publicDir, 'css');

    const files = fs.readdirSync(cssDir);
    const fingerprinted = files.find(f => f.match(/\.[a-f0-9]{64}\.css$/));

    expect(fingerprinted).toBeDefined();

    const content = fs.readFileSync(path.join(cssDir, fingerprinted!), 'utf-8');
    expect(content.length).toBeGreaterThan(100000);
  });
});
