import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('Page renders correctly', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle('CharTyper')
  })

  test('Can navigate to /play', async ({ page }) => {
    await page.getByRole('button', { name: 'Play' }).click()
    await expect(page).toHaveURL('/play')
  })

  test('Can type on keyboard', async ({ page }) => {
    await page.keyboard.press('john doe')
  })
})
