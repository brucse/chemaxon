# File upload demo
## Installation
git clone https://github.com/brucse/chemaxon.git
* cd chemaxon/backend
* npm install
* npm run create-db
* create directory uploads and make it readeable/writeable
* create file .env.dev similar to:
```
APP_PORT=3002
DB_HOST = ./models/chemaxon-dev.db
DB_DIALECT=sqlite
```
* create file .env.test similar to:
```
APP_PORT=3003
DB_DIALECT=sqlite
```

* cd chemaxon/frontend
* npm install
* create .env.local stimilar to:
```
REACT_APP_REST_URL=http://localhost:3002
```

## Usage
start backend dev server:
cd chemaxon/backend
npm run dev

start frontend dev server:
cd chemaxon/frontend
npm start


## Short description
This is a development demo, do not use it in production environment!

The backend uses [express.js](http://expressjs.com) with [multer](http://expressjs.com/en/resources/middleware/multer.html) middleware as a static file server, but minimally put it behind a reverse proxy (for example nginx)

The database is an [sqlite](https://www.sqlite.org/index.html) only for development purposes. In dev mode sqlite uses file storage, in test mode it uses memory, not designed for production. The `create-db` script creates two test users in the db, check the `chemaxon/backend/models/createDB.js` file for more info. 

I implemented user authentication in lightweight mode. The client sends only the logged user's database id in the *Authorization* header. In real implementation it should be a jwt token for example. The backend simply checks if the user with given id exists in the database. In real world an authentication provider service would do the work, for example Amazon Cognito, KeyCloack etc. On client side, the "token" (the id) isn't stored permanently, so the page refresh logs out the user.

**The direct file downloading function is out of scope, but I implemented it, because it's cool :)**

The application tested only with Chrome. Some code uses **conditional property operator** [(optional chaining)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining), so it would fail in some browsers.


## Known bugs

### backend:
You can't run the tests in batch mode. The [supertest](https://github.com/visionmedia/supertest#readme) occupies the port and you get a `port already in use` error. Run tests one-by-one like this:
```
npm test -- fileList.test.js
```
### frontend
The direct download doesn't work properly. The downloaded file is ruined. Probably the buffer conversion or the file extension handling is wrong

I used [pretty bytes](https://www.npmjs.com/package/pretty-bytes) make the upload file size human readeble, but the calculation is wrong. I also ruins the test, please check the source code in: `Upload.test.js`

