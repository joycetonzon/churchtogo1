var express = require('express');
var loginRouter = express.Router();
var loginAdminRouter = express.Router();
var logoutRouter = express.Router();
var loginGuestRouter = express.Router();//dontgetconfused,this is the signup router :)
var authMiddleware = require('./middlewares/auth');
var db = require('../../lib/database')();

loginRouter.route('/')
    .get(authMiddleware.noAuthed, (req, res) => {
        res.render('auth/views/login', req.query);
    })

loginRouter.route('/')
    .get(authMiddleware.noAuthed, (req, res) => {
        res.render('auth/views/login', req.query);
    })
    .post((req, res) => {
        console.log('POST LOGIN');
        var db = require('../../lib/database')();
        db.query(`SELECT * FROM tbl_user WHERE varchar_username="${req.body.user_username}"`, (err, results, fields) => {
            if (err) throw err;
            if (results.length === 0) return res.redirect('/login?incorrect');

            var user = results[0];
            
            if (user.varchar_password !== req.body.user_password) return res.redirect('/login?incorrect');
            
            if(user.char_usertype == "Admin"){
                delete user.varchar_password;
                // req.session.admin = req.body.user_username;
                req.session.admin = user;
                console.log(req.session);
                return res.redirect('/admin/home');
                
            }
            else{                
                delete user.varchar_password;
                // req.session.user = req.body.user_username;
                req.session.user = user;
                return res.redirect('/guest/home');
            }
        });
    })


    loginGuestRouter.route('/')
    .get(authMiddleware.noAuthed, (req, res) => {
        res.render('auth/login/views/loginguest', req.query);
    })
    .post((req, res) => {
        
        var queryString = `INSERT INTO \`tbl_user\` 
        (\`varchar_lastname\`, 
        \`varchar_firstname\`, 
        \`varchar_middlename\`, 
        \`varchar_username\`, 
        \`varchar_password\`, 
        \`char_usertype\`, 
        \`varchar_guestemail\`, 
        \`char_gender\`, 
        \`date_guestbirthday\`, 
        \`varchar_guestaddress\`, 
        \`varchar_guestcontactnumber\`)
        VALUES(
            "${req.body.userlastname}",
            "${req.body.userfirstname}",
            "${req.body.usermiddlename}",
            "${req.body.username}", 
            "${req.body.password}", 
            "User", 
            "${req.body.useremail}",
            "${req.body.usergender}", 
            "${req.body.userbirthday}", 
            "${req.body.useraddress}", 
            "${req.body.usercontactnumber}" 
        );`;
        
        db.query(queryString, (err, results, fields) => {
            if (err) throw err;
            
            res.redirect('/login?signUpSuccess');
        });

        // res.redirect('/guest/home')

        });
    // })

logoutRouter.get('/', (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/login');
    });
});

exports.login = loginRouter;
exports.logout = logoutRouter;
exports.signup = loginGuestRouter;