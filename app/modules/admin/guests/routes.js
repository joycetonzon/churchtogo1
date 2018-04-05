var router = require('express').Router();
var db = require('../../../lib/database')();
var authMiddleware = require('../../auth/middlewares/auth');
router.use(authMiddleware.hasAuthadmin);



router.get('/', authMiddleware.hasAuthadmin, (req, res) => {
    // res.render('admin/records/views/records');
    db.query(`SELECT *
    FROM tbl_user 
    WHERE char_usertype = "User"`, (err, results, fields) => {
        if (err) console.log(err)
            console.log(results)
        return res.render('admin/guests/views/guests', { tbl_event: results });
    });
});


router.get('/:int_guestid', (req, res) => {
    
    var queryString = `SELECT * FROM tbl_user
   
    WHERE int_guestid = "${req.params.int_guestid}"`;
    db.query(queryString, (err, results, fields) => {
        console.log(results)
        res.render('admin/guests/views/guestinfo',{ tbl_event: results });
    });
});
module.exports = router;