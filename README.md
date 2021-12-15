#  Central Bank of Learnable API Basic Template.

This project is a standardization project for Learnable'21  Backend Interns

## Installation

1. Install dependencies - `npm install`

2. Create a new file `.env` if it doesn't exist and provide a PORT and a JWT_SECRET_KEY to enable you run the code on production mode.

3. Then you need to provide values for the configuration env files at the `/env file`.


## Running the server locally

1. Start up the server - Run `npm start` for production or `npm run dev` for development

2. Server should be running on http://localhost:6005/ by default



## Code Test scaffolding

✅As you take a ride 🚗 through the Learnable Bank api, remember that For the `.populate()` method to work at your end, you have to make sure that _ids are pushed into the field(s) that is needed to be populated later.

✅ The users(regular or admin) registration is through a form-data and not just the request body. The profileImages uploaded to the mongoDB is also available in the uploads folder.

✅As shown from the codebase, when using the PATCH request, the request body should be in an array of object. Example ` [{"propName":"transaction", "value":"deposit" }]`.

✅The response to all endpoints in the bank-Api includes a request response object with a GET request Link for easy Navigation
.

## Routes

| Routes                                                           | Description                              | Auth roles                            |
| -----------------------------------------------------------------|----------------------------------------- | ------------------------------------- |
| [POST] &nbsp; /users/signup-admin                                 | Admin Signup                    | none
| [POST] &nbsp; /users/login-admin                                  | Admin login                              | none
| [POST] &nbsp; /users/signup-users              | users signup                 | none
| [POST] &nbsp; /users/login-users                             | users login                    | none
| [GET] &nbsp; admin/userAccounts                  | get all user accounts by admin          | Admin
| [POST] &nbsp; admin/create-userAccount                   | Add user account by Admin               | Admin
| [PATCH] &nbsp; admin/disable/accountId             | Disable a user account by Admin                         | Admin
| [GET] &nbsp; admin/userAccounts/accountId      | Get a Particular user Account by Id                          | Admin
| [DELETE] &nbsp;  admin/delete/accountId       | Delete a user account by Admin                              | Admin
| [GET] &nbsp; users/transactions             |  users  see their transactions                           | User
| [GET] &nbsp;  users/transactions/userId      | Get a particular user transaction                           | User
| [POST] &nbsp; users/transaction/withdraw  | Make Withdrawal transaction by User    | User
|✅[POST] &nbsp; users/transaction/transfer  |  Make a transfer transaction by User      |      User
|✅[POST] &nbsp; users/transaction/deposit       |  Make a deposit transaction by a user          | User
|✅[PATCH] &nbsp; admin/transaction/reverse/transactId  |  Reverse Transaction by Admin     | Admin