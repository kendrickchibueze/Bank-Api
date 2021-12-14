const express = require('express');
const router = express.Router();
const multer =require('multer');
const userController = require('../controllers/users')


const storage = multer.diskStorage({
    destination: function(req,file,cb) { //cb means callback
        cb(null, './uploads/')
    },
    filename: function(req,file,cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)

    }
})

const fileFilter = (req, file, cb) => {

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        //accept file or throw an error(if u dont set null, it will return an error)
        cb(null, true)
    }else{
    //reject or ignore file and will not save it. It does not return an error
      cb(null, false)
    }


}


const upload = multer({storage:storage, limit:{
    fileSize:1024*1024*5
}, fileFilter:fileFilter})




/**
 * @desc - private route for admin signup
 * @routeType - post
 * @Routes users/signup-admin
 * @todo-add the role of an admin to the request body and not use the default for other users
 */

 router.post('/signup-admin',upload.single('profileImage'), userController.adminSignUp)





/**
 * @desc -private route for login Users
 * @routeType -post
 * @routes - users/login-admin
 */

 router.post('/login-admin', userController.adminLogin)





/**
 * @desc - public route for user signup
 * @routeType - post
 * @Routes -users/signup-user
 * @check - the role is excluded from the request body but will take the default of "regular" for all users
 */

router.post('/signup-user',upload.single('profileImage'), userController.UserSignUp)




/**
 * @desc -public route for login Users
 * @routeType -post
 * @routes -users/login-user
 */

router.post('/login-user', userController.userLogin)





module.exports = router
