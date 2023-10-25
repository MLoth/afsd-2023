import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'
import { authenticate } from '@google-cloud/local-auth'
import { google } from 'googleapis'

// Meh...
// TODO: handle with Lerna? -> monorepo approach
import { SUPPORTED_LOCALES } from '../../../packages/pwa/src/bootstrap/i18n'

const pathArgument = process.argv[2]
let localePath = ''

if (!pathArgument) {
  throw new Error(
    'There is no output path given. Please provide it: "path:packages/pwa/src/locales/"',
  )
} else {
  localePath = pathArgument.split(':')[1]
}

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), './token.json')
const CREDENTIALS_PATH = path.join(process.cwd(), './translations.json')

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH, {
      encoding: 'utf8',
    })
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
  const content = await fs.readFile(CREDENTIALS_PATH, { encoding: 'utf8' })
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
  let client: any = await loadSavedCredentialsIfExist()
  if (client) return client

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

    await fs.writeFile(
      path.join(process.cwd(), `../${localePath}/${locale}.json`),
      JSON.stringify(translations),
    )
  }
}

authorize().then(generateTranslations).catch(console.error)
