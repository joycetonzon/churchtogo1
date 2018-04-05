var router = require('express').Router();
var db = require('../../../lib/database')();
//var authMiddleware = require('../../auth/middlewares/auth');
//router.use(authMiddleware.noAuthed);


router.get('/', (req, res) => {


// router.get('/', (req, res) => {
    var queryString1 =`SELECT * FROM tbl_reservation 
    JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid 
    WHERE tbl_event.int_guestid = ? AND char_status = ?`
    db.query(queryString1, [req.session.user.int_guestid, "Approved"], (err, results, fields) => {
        if (err) console.log(err);
        console.log('----------')
        console.log(results[0]);
        console.log('----------')
        return res.render('guest/approved/views/Approved',{ tbl_reservation : results });
    });

});



router.get('/anointing/:int_reservationid', (req, res) => {
    
    var queryString = `SELECT * FROM tbl_reservation 
    JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid 
    WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}"`;
    db.query(queryString, (err, results, fields) => {
        
        res.render('guest/approved/views/anointinginfo',{ tbl_reservation : results });
    });
});


router.get('/baptismal/:int_reservationid', (req, res) => {
    
    var queryString = `SELECT * FROM tbl_reservation 
    JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid 
    WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}"`;
    db.query(queryString, (err, results, fields) => {
        
        res.render('guest/approved/views/baptismalinfo',{ tbl_reservation : results });
    });
});


router.get('/funeralmass/:int_reservationid', (req, res) => {
    
    var queryString = `SELECT * FROM tbl_reservation 
    JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid 
    WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}"`;
    db.query(queryString, (err, results, fields) => {
        
        res.render('guest/approved/views/funeralinfo',{ tbl_reservation : results });
    });
});


router.get('/masswedding/:int_reservationid', (req, res) => {
    
    var queryString = `SELECT * FROM tbl_reservation 
    JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid 
    WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}"`;
    db.query(queryString, (err, results, fields) => {
        
        res.render('guest/approved/views/massweddinginfo',{ tbl_reservation : results });
    });
});


router.get('/privatewedding/:int_reservationid', (req, res) => {
    
    var queryString = `SELECT * FROM tbl_reservation 
    JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid
    WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}"`;
    db.query(queryString, (err, results, fields) => {
        
        res.render('guest/approved/views/privateweddinginfo',{ tbl_reservation : results });
    });
});


router.get('/anointing', (req, res) => {

    var queryString1 =`SELECT * FROM tbl_reservation 
    JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid 
    WHERE tbl_event.int_guestid = ? AND char_status = ? AND char_event= ?`
    db.query(queryString1, [req.session.user.int_guestid, "Approved", "Anointing of the sick"], (err, results, fields) => {
        if (err) console.log(err);
        console.log('----------')
        console.log(results[0]);
        console.log('----------')
        return res.render('guest/approved/views/approvedanointing',{ tbl_reservation : results });
    });
    // res.render('guest/approved/views/approvedanointing');
});

router.get('/baptismal', (req, res) => {
    // res.render('guest/approved/views/approvedbaptismal');
    
    var queryString1 =`SELECT * FROM tbl_reservation 
    JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid 
    WHERE tbl_event.int_guestid = ? AND char_status = ? AND char_event= ?`
    db.query(queryString1, [req.session.user.int_guestid, "Approved", "Baptism"], (err, results, fields) => {
        if (err) console.log(err);
        console.log('----------')
        console.log(results[0]);
        console.log('----------')
        return res.render('guest/approved/views/approvedbaptismal',{ tbl_reservation : results });
    });
});

router.get('/funeralmass', (req, res) => {

    var queryString1 =`SELECT * FROM tbl_reservation 
    JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid 
    WHERE tbl_event.int_guestid = ? AND char_status = ? AND char_event= ?`
    db.query(queryString1, [req.session.user.int_guestid, "Approved", "Funeral Mass"], (err, results, fields) => {
        if (err) console.log(err);
        console.log('----------')
        console.log(results[0]);
        console.log('----------')
        return res.render('guest/approved/views/approvedfuneral',{ tbl_reservation : results });
    });
    // res.render('guest/approved/views/approvedfuneral');
});

router.get('/privatewedding', (req, res) => {

    var queryString1 =`SELECT * FROM tbl_reservation 
    JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid
    WHERE tbl_event.int_guestid = ? AND char_status = ? AND char_event= ?`
    db.query(queryString1, [req.session.user.int_guestid, "Approved", "Private Wedding"], (err, results, fields) => {
        if (err) console.log(err);
        console.log('----------')
        console.log(results[0]);
        console.log('----------')
        return res.render('guest/approved/views/approvedprivatewedding',{ tbl_reservation : results });
    });
    // res.render('guest/approved/views/approvedprivatewedding');
});

router.get('/masswedding', (req, res) => {

    var queryString1 =`SELECT * FROM tbl_reservation 
    JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid 
    WHERE tbl_event.int_guestid = ? AND char_status = ? AND char_event= ?`
    db.query(queryString1, [req.session.user.int_guestid, "Approved", "Mass Wedding"], (err, results, fields) => {
        if (err) console.log(err);
        console.log('----------')
        console.log(results[0]);
        console.log('----------')
        return res.render('guest/approved/views/approvedmasswedding',{ tbl_reservation : results });
    });
    // res.render('guest/approved/views/approvedmasswedding');
});
module.exports = router;