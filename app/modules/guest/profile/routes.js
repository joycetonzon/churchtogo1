var router = require('express').Router();
var db = require('../../../lib/database')();
//var authMiddleware = require('../../auth/middlewares/auth');
//router.use(authMiddleware.noAuthed);


router.get('/', (req, res) => {
    var queryString = `SELECT * from tbl_user where int_guestid = ?`
    console.log(req.session.user.int_guestid)
    db.query(queryString, [req.session.user.int_guestid], (err, results, fields) => {
        if (err) throw err;

        // return res.redirect('/guest/profile/listofrequirements');
        return res.render('guest/profile/views/profile',{ users : results });
    
    });

});

router.get('/editprofile', (req, res) => {
    var queryString = `SELECT * from tbl_user where int_guestid = ?`
    console.log(req.session.user.int_guestid)
    db.query(queryString, [req.session.user.int_guestid], (err, results, fields) => {
        if (err) throw err;

        // return res.redirect('/guest/profile/listofrequirements');
        return res.render('guest/profile/views/editprofile',{ users : results });
   });
});

router.post('/editprofile', (req, res) => {
    console.log('NANDITO SIYA SA EDITPROFILE POST');
    const queryString = `UPDATE tbl_user SET        
    varchar_lastname = ("${req.body.userlastname}"),
    varchar_firstname = ("${req.body.userfirstname}"),
    varchar_middlename = ("${req.body.usermiddlename}"),
    varchar_username = ("${req.body.username}"),
    varchar_password = ("${req.body.password}"),
    char_usertype = "User",
    varchar_guestemail = ("${req.body.useremail}"),
    char_gender = ("${req.body.usergender}"),
    date_guestbirthday = ("${req.body.userbirthday}"),
    varchar_guestaddress = ("${req.body.useraddress}"),
    varchar_guestcontactnumber = ("${req.body.usercontactnumber}")
    WHERE int_guestid = "${req.body.guestid}";`;

    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;         
        
        return res.redirect('/guest/profile'); 
        
    });
});
module.exports = router;