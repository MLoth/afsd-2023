# Credentials from Google

- Use Firebase for authentications.
- For i18n: [Google](https://console.cloud.google.com/apis/credentials/) (create credentials > Create Oauth client Id > Choose for : Desktop App). Save it as `credentials.json` in `packages/pwa/src/utils/`
  - Run `npx tsx src/utils/sheet.ts` in the terminal

# env files

## API

Use firebase > Project settings > Service Accounts > Generate new private key

```env
GOOGLE_APPLICATION_CREDENTIALS=path-to-firebase-adminsdk-on-the-harddisk.json #only in dev, production -> secret!

URL_FRONTEND=
DB_HOST=
DB_PORT=
DB_NAME=

WS_PORT=

NODE_ENV=
```

## PWA

Use firebase > Project settings > General > SDK setup and configuration > Config, and convert manual to a env syntax

```env
VITE_apiKey=""
VITE_authDomain=""
VITE_projectId=""
VITE_storageBucket=""
VITE_messagingSenderId=""
VITE_appId=""
VITE_MAPBOX_TOKEN=""
VITE_BACKEND_URL=""
```

# how to seed

- Do first a seeding of the birds,
- The observations rely on the birds,

```bash
npx nestjs-command seed:database:birds
npx nestjs-command seed:database:observations
```

- Reset all the seeds

```bash
npx nestjs-command seed:reset
```

- Reset a specific seed

```bash
npx nestjs-command seed:reset:birds
npx nestjs-command seed:reset:observations
npx nestjs-command seed:reset:locations
```
