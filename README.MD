# Online Marketplace (e-commerce)

## Live preview: [DEMO](https://igneous-etching-301316.ew.r.appspot.com/)

Use this account or create your own

- **Login**: user1@example.com
- **Password**: 123123

## Build with

- **Server**: Express, REST, MongoDB(Mongoose), JWT, Jest
- **Client**: React, REST, Redux, Jest, Cypress, html/sass

## Core features

- Sell as users
- Buy as users
- Cart and checkout
- Search and sort
- Pagination
- SignIn/SignUp/Restore
- Account profile:
  - informations about items: watching, bought, selling, sold, unsold
  - settings
    - change password
    - remove account

## Docker

Replace **<prod|test|dev>** with destination build type.

```bash
docker-compose -f docker-compose.yml -f docker-compose.<prod|test|dev>.yml up -d
```

## Test

**Client**
```powershell
npm test
```

**Server**
```powershell
npm test
```

## Install and run

- Instal mongodb server
- Configure **.env** files for client and server, examples bellow.

**Client**
```powershell
npm install
npm start
```

**Server**
```powershell
npm install
npm run dev
```

## Client - example .env

In client root directory create:

- .env.development .env.production .env.test

```environment
REACT_APP_NAME=ecommerce
REACT_APP_API_URL=http://localhost:8080
REACT_APP_ACCOUNT_RECOVER_ENABLED=true
REACT_APP_GITHUB_URL=https://github.com/Pioryd/ecommerce
```

## Server - example .env

In server root directory create:

- .env.development .env.production .env.test

```environment
PORT=8080
APP_NAME=Ecommerce
WEB_SERVER=false

# mongodb://localhost:27017/<DB_NAME>
# mongodb+srv://<USER>:<PASSWORD>@<URL>/<DB_NAME>
DB_URL=<MONGODB_URL>

TOKEN_SECRET=6c21eceb5e4c753c17f3819d63d9473ece46ea9b0da13be04856eb755f6ebdcdfd8a2e8a79dcd9dcb0aa5705fb02e3eff9378cb74798031d5a528e16e6d781a6
TOKEN_EXPIRES_IN=86400s

ITEMS_PER_PAGE=10
DAYS_TO_EXPIRE=30
CART_MAX_UNIQUE_ITEMS=100

PASSWORD_SALT_BYTES=16
PASSWORD_HASH_ITERATIONS=1000
PASSWORD_HASH_BYTES=64
PASSWORD_HASH_DIGEST=sha512

# Comment all EMAIL_* when you want to disable account recover
EMAIL_SERVICE_NAME=<SERVICE_NAME>
EMAIL_SERVICE_HOST=<SERVICE_HOST>
EMAIL_SERVICE_SECURE=<SERVICE_SECURE>
EMAIL_SERVICE_PORT=<PORT>
EMAIL_USER_NAME=<EMAIL_NAME>
EMAIL_USER_PASSWORD=<EMAIL_PASSWORD>
```
