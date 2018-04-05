var router = require('express').Router();
var db = require('../../../lib/database')();
var authMiddleware = require('../../auth/middlewares/auth');
    
router.get('/', (req, res) => {
    db.query(`SELECT * FROM tbl_reservation 
    join tbl_event on tbl_reservation.int_eventid = tbl_event.int_eventid 
    join tbl_user on tbl_reservation.int_guestid = tbl_user.int_guestid 
    join tbl_priest on tbl_reservation.int_priestid = tbl_priest.int_priestid  
    where tbl_reservation.char_status = "Approved"`, (err, results, fields) => {
        if (err) console.log(err)
        res.render('guest/calendar/views/calendar', { tbl_event: results});
    });
});

router.get('/annointmentevents', (req, res) => {
    db.query(`SELECT * FROM tbl_reservation 
    join tbl_event on tbl_reservation.int_eventid = tbl_event.int_eventid 
    join tbl_user on tbl_reservation.int_guestid = tbl_user.int_guestid 
    join tbl_priest on tbl_reservation.int_priestid = tbl_priest.int_priestid  
    where tbl_reservation.char_status = "Approved" AND tbl_event.char_event = "Annointment"`, (err, results, fields) => {
        if (err) console.log(err)
        res.render('guest/calendar/views/calendar', { tbl_event: results});
    });
});

router.get('/baptismalevents', (req, res) => {
    db.query(`SELECT * FROM tbl_reservation 
    join tbl_event on tbl_reservation.int_eventid = tbl_event.int_eventid 
    join tbl_user on tbl_reservation.int_guestid = tbl_user.int_guestid 
    join tbl_priest on tbl_reservation.int_priestid = tbl_priest.int_priestid 
    where tbl_reservation.char_status = "Approved" AND tbl_event.char_event = "Baptismal"`, (err, results, fields) => {
        if (err) console.log(err)
        res.render('guest/calendar/views/calendar', { tbl_event: results});
    });
});

router.get('/funeralmassevents', (req, res) => {
    db.query(`SELECT * FROM tbl_reservation 
    join tbl_event on tbl_reservation.int_eventid = tbl_event.int_eventid 
    join tbl_user on tbl_reservation.int_guestid = tbl_user.int_guestid 
    join tbl_priest on tbl_reservation.int_priestid = tbl_priest.int_priestid 
    where tbl_reservation.char_status = "Approved" AND tbl_event.char_event = "Funeral Mass"`, (err, results, fields) => {
        if (err) console.log(err)
        res.render('guest/calendar/views/calendar', { tbl_event: results});
    });
});

router.get('/massweddingevents', (req, res) => {
    db.query(`SELECT * FROM tbl_reservation 
    join tbl_event on tbl_reservation.int_eventid = tbl_event.int_eventid 
    join tbl_user on tbl_reservation.int_guestid = tbl_user.int_guestid 
    join tbl_priest on tbl_reservation.int_priestid = tbl_priest.int_priestid 
    where tbl_reservation.char_status = "Approved" AND tbl_event.char_event = "Mass Wedding"`, (err, results, fields) => {
        if (err) console.log(err)
        res.render('guest/calendar/views/calendar', { tbl_event: results});
    });
});

router.get('/privateweddingevents', (req, res) => {
    db.query(`SELECT * FROM tbl_reservation 
    join tbl_event on tbl_reservation.int_eventid = tbl_event.int_eventid 
    join tbl_user on tbl_reservation.int_guestid = tbl_user.int_guestid 
    join tbl_priest on tbl_reservation.int_priestid = tbl_priest.int_priestid 
    where tbl_reservation.char_status = "Approved" AND tbl_event.char_event = "Private Wedding"`, (err, results, fields) => {
        if (err) console.log(err)
        res.render('guest/calendar/views/calendar', { tbl_event: results});
    });
});

module.exports = router;