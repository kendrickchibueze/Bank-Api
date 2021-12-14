const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const transactController = require('../controllers/transaction')






/**
 * @desc -public route to see all transactions by users
 * @routeType - get
 * @route -users/transactions/
 *
 */


router.get('/transactions',  checkAuth, transactController.getAllTransactions )




/**
 * @desc -public route to see the transaction of a particular user
 * @routeType - get
 * @route -users/transactions/userId
 *
 */

router.get('/transactions/:userId', checkAuth, transactController.getUserTransaction)


/**
 * @desc -public route to deposit money by users
 * @routeType - post
 * @route -users/transaction/deposit
 *
 */


router.post('/transaction/deposit', checkAuth, transactController.depositTransaction)








/**
 * @desc -public route to withdraw money by users
 * @routeType - post
 * @route -users/transaction/withdraw
 *
 */
router.post('/transaction/withdraw', checkAuth, transactController.withdrawTransaction)






/**
 * @desc -public route to transfer money to other users
 * @routeType - post
 * @route -users/transaction/transfer
 *
 */

router.post('/transaction/transfer', checkAuth, transactController.transferTransaction)





/**
 * @desc -private admin route to reverse users' transactions
 * @routeType - patch
 * @route -admin/transaction/reverse/transactId
 *
 */

router.patch('/transaction/reverse/:transactId', checkAuth, transactController.adminReverseTransaction)


module.exports = router