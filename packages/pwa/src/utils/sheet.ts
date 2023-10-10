// @ts-nocheck

import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'
import { authenticate } from '@google-cloud/local-auth'
import { google } from 'googleapis'

import { SUPPORTED_LOCALES } from '../bootstrap/i18n'

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), '/src/utils/token.json')
const CREDENTIALS_PATH = path.join(
  process.cwd(),
  '/src/utils/translations.json',
)

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH)
    const credentials = JSON.parse(content)
    return google.auth.fromJSON(credentials)
  } catch (err) {
    return null
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH)
  const keys = JSON.parse(content)
  const key = keys.installed || keys.web
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  })
  await fs.writeFile(TOKEN_PATH, payload)
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist()
  if (client) {
    return client
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  })
  if (client.credentials) {
    await saveCredentials(client)
  }
  return client
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function listMajors(auth) {
  const sheets = google.sheets({ version: 'v4', auth })
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
  })
  const rows = res.data.values
  if (!rows || rows.length === 0) {
    console.log('No data found.')
    return
  }
  console.log('Name, Major:')
  rows.forEach(row => {
    // Print columns A and E, which correspond to indices 0 and 4.
    console.log(`${row[0]}, ${row[4]}`)
  })
}

async function generateTranslations(auth) {
  const sheets = google.sheets({ version: 'v4', auth })

  for (const locale in SUPPORTED_LOCALES) {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: '1XtHJVf7jJGY-im3M6Au8gW-A_J32BW5pAsEo8VLucpg',
      range: locale,
    })
    const rows = res.data.values
    console.log(rows)

    if (!rows || rows.length === 0) {
      console.log('No data found.')
      return
    }

    const translations = { [locale]: {} }
    for (const row of rows) {
      translations[locale][row[0]] = row[2]
    }

    // Create enum with all the keys of translations
    // const enumName = `${locale}Keys`
    // const enumContent = `export enum ${enumName} {\n${Object.keys(
    //   translations[locale],
    // )
    //   .map(key => `  ${key} = '${key}'`)
    //   .join(',\n')}\n}`
    // .d.ts

    await fs.writeFile(
      path.join(process.cwd(), `/src/locales/${locale}.json`),
      JSON.stringify(translations),
    )
  }
}

authorize().then(generateTranslations).catch(console.error)
