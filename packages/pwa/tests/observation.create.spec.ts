import { test, expect } from '@playwright/test'

beforeAll(async ({ page }) => {
  await page.goto('http://localhost:5173/auth/login')
  await page.getByRole('textbox', { name: 'Email' }).fill('test@test')
  await page.getByRole('textbox', { name: 'Password' }).fill('test')
  await page.getByRole('button', { name: 'Login' }).click()
})

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await page.goto('http://localhost:5173/auth/login')
  await page.getByRole('link', { name: 'Add observation' }).click()
  await page
    .getByLabel('Bird What bird did you see?')
    .selectOption('65660bc8a84682f8e4a7586d')
  await page
    .getByLabel('Location Where did you see it')
    .selectOption('65660bc8a84682f8e4a7593e')
  await page.getByRole('heading', { name: 'Add observation' }).click()
  await page
    .getByLabel('Bird What bird did you see?')
    .selectOption('65660bc8a84682f8e4a7580b')
  await page
    .getByLabel('Location Where did you see it')
    .selectOption('65660bc8a84682f8e4a7593e')
  await page.getByLabel('Map', { exact: true }).click({
    position: {
      x: 944,
      y: 25,
    },
  })
  await page.getByLabel('Description').click()
  await page.getByLabel('Description').fill('Im stupid/')
  await page.getByRole('button', { name: 'Add observation' }).click()
})
