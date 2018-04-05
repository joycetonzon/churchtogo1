var router = require('express').Router();
var db = require('../../../lib/database')();
var authMiddleware = require('../../auth/middlewares/auth');
router.use(authMiddleware.hasAuthadmin);


router.get('/', authMiddleware.hasAuthadmin, (req, res) => {
    res.render('admin/transactions/views/transactions');
    console.log(req.session);
});

// router.get('/approved', authMiddleware.hasAuthadmin, (req, res) => {
//     // res.render('admin/records/views/records');
//     db.query(`SELECT DATE_FORMAT(date_schedule, "%Y %M %d"), 
//     tbl_reservation.int_reservationid,
//     tbl_event.char_event, 
//     tbl_user.int_guestid,
//     tbl_user.varchar_lastname,
//     tbl_user.varchar_firstname,
    
//     tbl_reservation.char_status
//     FROM tbl_reservation 
//     JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid 
//     JOIN tbl_user ON tbl_reservation.int_guestid = tbl_user.int_guestid  
//     WHERE tbl_reservation.char_status = "Approved"`, (err, results, fields) => {
//         if (err) console.log(err)
//             console.log(results)
//         return res.render('admin/transactions/views/approved', { tbl_event: results });
//     });
// });


router.get('/approved', authMiddleware.hasAuthadmin, (req, res) => {
    // res.render('admin/records/views/records');
    db.query(`SELECT *
    FROM tbl_reservation 
    JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid 
    JOIN tbl_user ON tbl_reservation.int_guestid = tbl_user.int_guestid  
    WHERE tbl_reservation.char_status = "Approved"`, (err, results, fields) => {
        if (err) console.log(err)
            console.log(results)
        return res.render('admin/transactions/views/approved', { tbl_event: results });
    });
});


router.get('/cancelled', authMiddleware.hasAuthadmin, (req, res) => {
    // res.render('admin/records/views/records');
    db.query(`SELECT * FROM tbl_reservation 
    JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid 
    JOIN tbl_user ON tbl_reservation.int_guestid = tbl_user.int_guestid  
    WHERE tbl_reservation.char_status = "Cancelled"`, (err, results, fields) => {
        if (err) console.log(err)
        return res.render('admin/transactions/views/cancelled', { tbl_event: results });
    });
});

router.get('/requests', authMiddleware.hasAuthadmin, (req, res) => {
    // res.render('admin/records/views/records');
    db.query(`SELECT * FROM tbl_reservation 
    JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid 
    JOIN tbl_user ON tbl_reservation.int_guestid = tbl_user.int_guestid  
    WHERE tbl_reservation.char_status = "Pending"`, (err, results, fields) => {
        if (err) console.log(err)
        return res.render('admin/transactions/views/requests', { tbl_event: results });
    });
});
module.exports = router;