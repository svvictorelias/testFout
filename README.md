## Documentation

Link to api documentation: http://localhost:3333/api-docs/

## Configuring and initializing the project

First, you must clone the application on your machine:

```
    git clone https://github.com/svvictorelias/fourTest
```

through ssh

```
    git clone git@github.com:svvictorelias/fourTest.git
```

In this case I uploaded the file `.env` to make the assessment easier. But by default, I put it in .gitignore.

```
    ./env
```

Use `npm install` to install all project dependencies.

```
    npm install
```

And finally, use the `npm run dev` to start the server in development mode using the library `nodemon` in this path: [http://localhost:3333](http://localhost:3333)

```
    npm run dev
```

## Endpoints

\*\* All information on endpoints in parentheses "{}" are the values or parameters<br>
\*\* All endpoint's of Post need to pass Bearer Token

<h3>
    Post
</h3>

| Action                                     | Request  | endpoint        |
| ------------------------------------------ | -------- | --------------- |
| List all posts                             | `GET`    | /api/posts      |
| List posts in range - query: {page, limit} | `GET`    | /api/posts      |
| Create a post - body: {title,body,tags}    | `POST`   | /api/posts      |
| Update a post - body: {title,body,tags}    | `PUT`    | /api/posts      |
| Delete a post                              | `DELETE` | /api/posts/{id} |

<br/>
<h3>
    User
</h3>

| Action                                     | Request | endpoint          |
| ------------------------------------------ | ------- | ----------------- |
| List all users                             | `GET`   | /api/users        |
| Create a user - body: {username, password} | `POST`  | /api/users/signup |
| Login - body: {username, password}         | `POST`  | /api/users/signin |

<br/>

## With more details, acess the http://localhost:3333/api-docs/

## Contact https://www.linkedin.com/in/svvictorelias/
