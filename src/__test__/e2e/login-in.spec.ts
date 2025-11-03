import { expect, test } from '@playwright/test'

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/AI Store/)
  await page.getByRole('link', { name: 'Winter Jacket' }).click()
  await expect(page.locator('span').filter({ hasText: '$' })).toBeVisible()
  await expect(page.locator('span').filter({ hasText: '$' })).toContainText('$149.99')
  await page.getByRole('button', { name: 'Add to Cart' }).click()
  await page.locator('[href="/cart"]').click()
  await expect(page.getByRole('link', { name: 'Winter Jacket Winter Jacket' })).toBeVisible()
  await expect(page.getByText('1', { exact: true })).toContainText('1')
  await page.getByRole('button').nth(2).click()
  await expect(page.getByText('2', { exact: true })).toContainText('2')
  await expect(page.getByText('$299.98')).toBeVisible({ timeout: 10000 })
  await page.pause()
})

test('record', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: 'Winter Jacket' }).click()

  // Wait for product page to load
  await page.getByRole('button', { name: 'Add to Cart' }).click()

  // Wait for cart action to complete
  await page.waitForLoadState('networkidle')

  await page.locator('[href="/cart"]').click()

  await page.getByRole('button').nth(2).click()

  await expect(page.getByText('$299.98')).toBeVisible({ timeout: 10000 })
})
