var router = require('express').Router();
var db = require('../../../lib/database')();
var authMiddleware = require('../../auth/middlewares/auth');
router.use(authMiddleware.hasAuthadmin);


router.get('/', authMiddleware.hasAuthadmin, (req, res) => {
    db.query('SELECT * FROM tbl_reservation JOIN tbl_user ON tbl_reservation.int_guestid=tbl_user.int_guestid JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid WHERE tbl_reservation.char_status="Pending"', (err, results, fields) => {
        if (err) console.log(err)
        return res.render('admin/reservationrequests/views/reservationrequests', { tbl_event: results, user: req.session.user });
    });
});

     
router.get('/:int_reservationid/remove', (req, res) => {
    const queryString = `UPDATE tbl_reservation SET        
    char_status = "Declined",
    char_feestatus = "Unpaid"
    WHERE int_reservationid= ${req.params.int_reservationid}`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        res.redirect('/admin/reservationrequests');
    });
});
router.get('/:int_reservationid/approve', (req, res) => {
    const queryString = `UPDATE tbl_reservation SET        
    char_status = "Approved",
    char_feestatus = "Paid"
    WHERE int_reservationid= ${req.params.int_reservationid}`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        res.redirect(`/admin/reservationrequests/priestassignment/${req.params.int_reservationid}`);
    });
});


router.get('/priestassignment/:int_reservationid', (req, res) => {
    // res.render('admin/priestassignment/views/priestassignment');    
    var queryString = `SELECT * FROM tbl_event join tbl_reservation on tbl_event.int_eventid = tbl_reservation.int_eventid WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}" and tbl_event.int_eventid= (select int_eventid from tbl_reservation where int_reservationid = ${req.params.int_reservationid})`;
    db.query(queryString, (err, results, fields) => {
        console.log(results)
        var resultss = results[0];
        var queryString1 = `SELECT * FROM tbl_priest`;
        db.query( queryString1, (err, results, fields) => {
            console.log(results)
        
        res.render('admin/reservationrequests/views/priestassignment', { tbl_reservation : resultss , reservations : results, user: req.session.user});
    });

    });

});


router.post('/priestassignment/:int_reservationid', (req, res) => {
    const queryString = `UPDATE tbl_reservation SET        
    int_priestid = ${req.body.priestlist}
    WHERE int_reservationid= ${req.params.int_reservationid}`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        res.redirect('/admin/reservationrequests');
    });
});


router.get('/annointment', authMiddleware.hasAuthadmin, (req, res) => {
    // res.render('admin/reservationrequests/views/annointmentrequests');
    var queryString1 =`SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid JOIN tbl_user ON tbl_reservation.int_guestid = tbl_user.int_guestid WHERE char_event = "Annointment"`
    db.query(queryString1, (err, results, fields) => {
        if (err) console.log(err);
        res.render('admin/reservationrequests/views/annointmentrequests', { tbl_event : results, user: req.session.user  });
    });

});


router.get('/annointment/:int_reservationid', authMiddleware.hasAuthadmin, (req, res) => {
    var queryString1 = `SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}"`;
    db.query(queryString1, (err, results, fields) => {
        if (err) throw err;
        res.render('admin/reservationrequests/views/annointmentinfo', { tbl_reservation: results, user: req.session.user });
    });

})


    



router.get('/baptismal', authMiddleware.hasAuthadmin, (req, res) => {
    // res.render('admin/reservationrequests/views/annointmentrequests');
    var queryString1 =`SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid JOIN tbl_user ON tbl_reservation.int_guestid = tbl_user.int_guestid  WHERE char_event = "Baptismal"`
    db.query(queryString1, (err, results, fields) => {
        if (err) console.log(err);
        res.render('admin/reservationrequests/views/baptismalrequests',{ tbl_event : results, user: req.session.user  });
    });

});


router.get('/baptismal/:int_reservationid', authMiddleware.hasAuthadmin, (req, res) => {
    var queryString1 = `SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid JOIN tbl_baptismalevent ON tbl_reservation.int_eventid = tbl_baptismalevent.int_eventid WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}"`;
    db.query(queryString1, (err, results, fields) => {
        if (err) throw err;
        res.render('admin/reservationrequests/views/baptismalinfo', { tbl_reservation: results, user: req.session.user });
    });

})

router.get('/funeralmass', authMiddleware.hasAuthadmin, (req, res) => {
    // res.render('admin/reservationrequests/views/annointmentrequests');
    var queryString1 =`SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid JOIN tbl_user ON tbl_reservation.int_guestid = tbl_user.int_guestid WHERE char_event = "Funeral Mass"`
    db.query(queryString1, (err, results, fields) => {
        if (err) console.log(err);
        res.render('admin/reservationrequests/views/funeralrequests',{ tbl_event : results, user: req.session.user  });
    });

});


router.get('/funeralmass/:int_reservationid', authMiddleware.hasAuthadmin, (req, res) => {
    var queryString1 = `SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}"`;
    db.query(queryString1, (err, results, fields) => {
        if (err) throw err;
        res.render('admin/reservationrequests/views/funeralinfo', { tbl_reservation: results, user: req.session.user });
    });

})

router.get('/masswedding', authMiddleware.hasAuthadmin, (req, res) => {
    // res.render('admin/reservationrequests/views/annointmentrequests');
    var queryString1 =`SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid JOIN tbl_user ON tbl_reservation.int_guestid = tbl_user.int_guestid WHERE char_event = "Mass Wedding"`
    db.query(queryString1, (err, results, fields) => {
        if (err) console.log(err);
        res.render('admin/reservationrequests/views/massweddingrequests',{ tbl_event : results, user: req.session.user  });
    });

});


router.get('/masswedding/:int_reservationid', authMiddleware.hasAuthadmin, (req, res) => {
    var queryString1 = `SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid JOIN tbl_weddingevent ON tbl_reservation.int_eventid = tbl_weddingevent.int_eventid WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}"`;
    db.query(queryString1, (err, results, fields) => {
        if (err) throw err;
        res.render('admin/reservationrequests/views/massweddinginfo', { tbl_reservation: results, user: req.session.user });
    });

})

router.get('/privatewedding', authMiddleware.hasAuthadmin, (req, res) => {
    // res.render('admin/reservationrequests/views/annointmentrequests');
    var queryString1 =`SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid JOIN tbl_user ON tbl_reservation.int_guestid = tbl_user.int_guestid WHERE char_event = "Private Wedding"`
    db.query(queryString1, (err, results, fields) => {
        if (err) console.log(err);
        res.render('admin/reservationrequests/views/privateweddingrequests',{ tbl_event : results, user: req.session.user  });
    });

});

router.get('/privatewedding/:int_reservationid', authMiddleware.hasAuthadmin, (req, res) => {
    var queryString1 = `SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid JOIN tbl_weddingevent ON tbl_reservation.int_eventid = tbl_weddingevent.int_eventid  WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}" `;
    db.query(queryString1, (err, results, fields) => {
        if (err) throw err;
        res.render('admin/reservationrequests/views/privateweddinginfo', { tbl_reservation: results, user: req.session.user });
    });

})




module.exports = router;