# Session Cookie Authentication With Node.js

Example repo for my post on [session cookie authentication with Node.js](https://sohamkamani.com/nodejs/session-cookie-authentication/)

Before we begin, we need to install the libraries that we will use for this example:

```
npm install
```

To start the application, we can run:

```sh
node index.js
```
Now, using any HTTP client with support for cookies (like [Postman](https://www.getpostman.com/apps), or your web browser) make a sign-in request with the appropriate credentials:

```
POST http://localhost:8080/signin

{"username":"user2","password":"password2"}
```

You can now try hitting the welcome route from the same client to get the welcome message:

```
GET http://localhost:8080/welcome
```

Hit the refresh route, and then inspect the clients cookies to see the new value of the `session_token`:

```
POST http://localhost:8080/refresh
```

Finally, call the logout route to clear session data:

```
GET http://localhost:8080/logout
```

Calling the welcome and refresh routes after this will result in a `401` error.