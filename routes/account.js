const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const accountController = require('../controllers/account')




/**
 * @desc -private route for getting all the user account
 * @routeType - get
 * @route -admin/userAccounts
 *
 */

router.get('/userAccounts', checkAuth, accountController.getAllUserAccounts)



/**
 * @desc -private route for creating a user account
 * @routeType - post
 * @route -admin/create-userAccount
 *
 */

router.post('/create-userAccount', checkAuth, accountController.createUserAccount)




/**
 * @desc -private route for disabling a user account
 * @routeType - patch
 * @route -admin/disable/accountId
 */

router.patch('/disable/:accountId',checkAuth, accountController.disableUserAccount)



/**
 * @desc -private route for getting a particular user account
 * @routeType - get
 * @route -admin/userAccounts/accountId
 *
 */

router.get('/userAccounts/:accountId', checkAuth, accountController.getAUserAccount)


/**
 * @desc -private route for deleting a user account
 * @routeType - delete
 * @route -admin/delete/accountId
 *
 */

router.delete('/delete/:accountId', checkAuth, accountController.deleteUserAccount )


module.exports = router