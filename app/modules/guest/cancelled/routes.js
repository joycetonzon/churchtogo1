var router = require('express').Router();
var db = require('../../../lib/database')();
//var authMiddleware = require('../../auth/middlewares/auth');
//router.use(authMiddleware.noAuthed);


router.get('/', (req, res) => {


// router.get('/', (req, res) => {
    var queryString1 =`SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid WHERE tbl_event.int_guestid = ? AND char_status = ?`
    db.query(queryString1, [req.session.user.int_guestid, "Cancelled"], (err, results, fields) => {
        if (err) console.log(err);
        console.log('----------')
        console.log(results[0]);
        console.log('----------')
        return res.render('guest/cancelled/views/cancelled',{ tbl_reservation : results });
    });

});


module.exports = router;