import { test, expect } from '@playwright/test'

test('🔐 Basic auth flow', async ({ page }) => {
  // Open the page.
  await page.goto('http://localhost:5173/auth/login')

  // Go to the register page
  await page.getByRole('link', { name: 'Create an account and keep' }).click()

  // Fill form inputs
  await page.getByLabel('First name Last name').click()
  await page.getByLabel('First name Last name').fill('Test user')
  await page.getByLabel('First name Last name').press('Tab')
  await page.getByLabel('Email').fill('user@test.com')
  await page.getByLabel('Email').press('Tab')
  await page.getByLabel('Password').fill('Password123')

  // Submit form
  await page.getByRole('button', { name: 'label.register' }).click()

  // Expect to be redirected to the home page
  await expect(page).toHaveURL('**/')
  await page.getByRole('heading', { name: 'Dashboard' })

  // Expect to be redirected to the birds page
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Birds' })
    .click()
})
