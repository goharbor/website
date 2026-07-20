import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:1313',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chromium'] },
    },
  ],

  webServer: {
    command: './scripts/setup-dart-sass.sh && hugo server --buildDrafts --buildFuture',
    url: 'http://localhost:1313',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
