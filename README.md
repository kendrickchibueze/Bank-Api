✅As you take a ride 🚗 through the Learnable Bank api, remember that For the .populate() method to work at your end, you have to make sure that _ids are pushed into the field(s) that is needed to be populated later.

✅ The users(regular or admin) registration is through a form-data and not just the request body. The profileImages uploaded to the mongoDB is also available in the uploads folder.


These are the Api Endpoints for easy access 
✅ User Registration and Login Endpoints

✅ADMIN
POST - users/signUp-admin
POST-users/login-admin

✅USERS
POST - users/signUp-users
POST - users/login-users

✅Accounts Endpoints
GET - admin/userAccounts
POST -admin/create-userAccount
PATCH - admin/disable/accountId
GET - admin/userAccounts/accountId
DELETE - admin/delete/accountId

✅Transaction Endpoints
GET - users/transactions
GET - users/transactions/userId
POST - users/transaction/deposit
POST -users/transaction/withdraw
POST - users/transaction/transfer
PATCH - admin/transaction/reverse/transactId


✅NOTE: Some Endpoints were added for ease of navigation through the Api. They were not particularly part of the demanded endpoints. These are:
GET - users/transactions/userId
GET - admin/userAccounts/accountId
GET - admin/userAccounts




