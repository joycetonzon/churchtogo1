var router = require('express').Router();
var db = require('../../../lib/database')();
var authMiddleware = require('../../auth/middlewares/auth');
router.use(authMiddleware.hasAuthadmin);


router.get('/', authMiddleware.hasAuthadmin, (req, res) => {
    // res.render('admin/records/views/records');
    db.query('SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid JOIN tbl_user ON tbl_reservation.int_guestid = tbl_user.int_guestid  WHERE tbl_reservation.char_status = "Approved"', (err, results, fields) => {
        if (err) console.log(err)
        return res.render('admin/records/views/records', { tbl_event: results });
    });
});

router.get('/annointment', authMiddleware.hasAuthadmin, (req, res) => {
    db.query('SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid JOIN tbl_user ON tbl_reservation.int_guestid = tbl_user.int_guestid  WHERE char_event = "Annointment" and tbl_reservation.char_status = "Approved"', (err, results, fields) => {
        if (err) console.log(err)
        return res.render('admin/records/views/annointmentrecords', { tbl_event: results });
    });
});

router.get('/baptismal', authMiddleware.hasAuthadmin, (req, res) => {
    db.query('SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid JOIN tbl_user ON tbl_reservation.int_guestid = tbl_user.int_guestid  WHERE char_event = "Baptismal"and tbl_reservation.char_status = "Approved"', (err, results, fields) => {
        if (err) console.log(err)
        return res.render('admin/records/views/baptismalrecords', { tbl_event: results });
    });
});

router.get('/funeralmass', authMiddleware.hasAuthadmin, (req, res) => {
    db.query('SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid JOIN tbl_user ON tbl_reservation.int_guestid = tbl_user.int_guestid  WHERE char_event = "Funeral Mass" and tbl_reservation.char_status = "Approved"', (err, results, fields) => {
        if (err) console.log(err)
        return res.render('admin/records/views/funeralrecords', { tbl_event: results });
    });

});

router.get('/masswedding', authMiddleware.hasAuthadmin, (req, res) => {
    db.query('SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid JOIN tbl_user ON tbl_reservation.int_guestid = tbl_user.int_guestid  WHERE char_event = "Mass Wedding" and tbl_reservation.char_status = "Approved"', (err, results, fields) => {
        if (err) console.log(err)
        return res.render('admin/records/views/massweddingrecords', { tbl_event: results });
    });
});

router.get('/privatewedding', authMiddleware.hasAuthadmin, (req, res) => {
    db.query('SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid JOIN tbl_user ON tbl_reservation.int_guestid = tbl_user.int_guestid  WHERE char_event = "Private Wedding" and tbl_reservation.char_status = "Approved"', (err, results, fields) => {
        if (err) console.log(err)
        return res.render('admin/records/views/privateweddingrecords', { tbl_event: results });
    });
});



router.get('/annointment/:int_reservationid', authMiddleware.hasAuthadmin, (req, res) => {
    var queryString1 = `SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}"`;
    db.query(queryString1, (err, results, fields) => {
        if (err) throw err;
        res.render('admin/records/views/annointmentinfo', { tbl_reservation: results, user: req.session.user });
    });

})


router.get('/baptismal/:int_reservationid', authMiddleware.hasAuthadmin, (req, res) => {
    var queryString1 = `SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid JOIN tbl_baptismalevent ON tbl_reservation.int_eventid = tbl_baptismalevent.int_eventid WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}"`;
    db.query(queryString1, (err, results, fields) => {
        if (err) throw err;
        res.render('admin/records/views/baptismalinfo', { tbl_reservation: results, user: req.session.user });
    });

})


router.get('/funeralmass/:int_reservationid', authMiddleware.hasAuthadmin, (req, res) => {
    var queryString1 = `SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}"`;
    db.query(queryString1, (err, results, fields) => {
        if (err) throw err;
        res.render('admin/records/views/funeralinfo', { tbl_reservation: results, user: req.session.user });
    });

})

router.get('/masswedding/:int_reservationid', authMiddleware.hasAuthadmin, (req, res) => {
    var queryString1 = `SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid JOIN tbl_weddingevent ON tbl_reservation.int_eventid = tbl_weddingevent.int_eventid WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}"`;
    db.query(queryString1, (err, results, fields) => {
        if (err) throw err;
        res.render('admin/records/views/massweddinginfo', { tbl_reservation: results, user: req.session.user });
    });

});
module.exports = router;
