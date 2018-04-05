var router = require('express').Router();
var db = require('../../../lib/database')();
//var authMiddleware = require('../../auth/middlewares/auth');
//router.use(authMiddleware.noAuthed);


router.get('/', (req, res) => {


// router.get('/', (req, res) => {
    var queryString1 =`SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid WHERE tbl_event.int_guestid = ? AND char_status = ?`
    db.query(queryString1, [req.session.user.int_guestid, "Pending"], (err, results, fields) => {
        if (err) console.log(err);
        console.log('----------')
        console.log(results[0]);
        console.log('----------')
        return res.render('guest/requests/views/pending',{ tbl_reservation : results });
    });

});



router.get('/anointing/:int_reservationid', (req, res) => {
    
    var queryString = `SELECT * FROM tbl_reservation 
    JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid
    WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}"`;
    db.query(queryString, (err, results, fields) => {
        console.log(results)
        res.render('guest/requests/views/anointinginfo',{ tbl_reservation : results });
    });
});

//baptismal
router.get('/baptism/:int_reservationid', (req, res) => {
    
    var queryString = `SELECT * FROM tbl_event 
    JOIN tbl_reservation ON tbl_event.int_eventid = tbl_event.int_eventid 
    join tbl_baptismalevent on tbl_event.int_eventid = tbl_baptismalevent.int_eventid
    WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}" and
    tbl_baptismalevent.int_eventid = (SELECT int_eventid FROM tbl_reservation
    WHERE int_reservationid =  ${req.params.int_reservationid});`;
    db.query(queryString, (err, results, fields) => {
        
        res.render('guest/requests/views/baptisminfo',{ tbl_reservation : results });
    });
});

//funeral
router.get('/funeralmass/:int_reservationid', (req, res) => {
    
    var queryString = `SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}"`;
    db.query(queryString, (err, results, fields) => {
        
        res.render('guest/requests/views/funeralinfo',{ tbl_reservation : results });
    });
});

//masswedding
router.get('/masswedding/:int_reservationid', (req, res) => {
    
    var queryString = `SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid join tbl_weddingevent on tbl_reservation.int_eventid = tbl_weddingevent.int_eventid WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}" and
    tbl_weddingevent.int_eventid = (SELECT int_eventid FROM tbl_reservation
    WHERE int_reservationid =  ${req.params.int_reservationid})`;
    db.query(queryString, (err, results, fields) => {
        
        res.render('guest/requests/views/massweddinginfo',{ tbl_reservation : results });
    });
});

//privatewedding
router.get('/privatewedding/:int_reservationid', (req, res) => {
    
    var queryString = `SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid join tbl_weddingevent on tbl_reservation.int_eventid = tbl_weddingevent.int_eventid WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}" and
    tbl_weddingevent.int_eventid = (SELECT int_eventid FROM tbl_reservation
    WHERE int_reservationid =  ${req.params.int_reservationid})`;
    db.query(queryString, (err, results, fields) => {
        
        res.render('guest/requests/views/privateweddinginfo',{ tbl_reservation : results });
    });
});

//anointing
router.get('/anointing', (req, res) => {

    var queryString1 =`SELECT * FROM tbl_reservation 
    JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid 
    WHERE tbl_event.int_guestid = ? AND char_status = ? AND char_event= ?`
    db.query(queryString1, [req.session.user.int_guestid, "Pending", "Anointing of the sick"], (err, results, fields) => {
        if (err) console.log(err);
        console.log('----------')
        console.log(results[0]);
        console.log('----------')
        return res.render('guest/requests/views/requestsanointing',{ tbl_reservation : results });
    });
    // res.render('guest/requests/views/requestsanointing');
});
//baptismal
router.get('/baptism', (req, res) => {
    // res.render('guest/requests/views/requestsbaptismal');
    
    var queryString1 =`SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid WHERE tbl_event.int_guestid = ? AND char_status = ? AND char_event= ?`
    db.query(queryString1, [req.session.user.int_guestid, "Pending", "Baptism"], (err, results, fields) => {
        if (err) console.log(err);
        console.log('----------')
        console.log(results[0]);
        console.log('----------')
        return res.render('guest/requests/views/requestsbaptism',{ tbl_reservation : results });
    });
});
//funeralmass
router.get('/funeralmass', (req, res) => {

    var queryString1 =`SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid WHERE tbl_event.int_guestid = ? AND char_status = ? AND char_event= ?`
    db.query(queryString1, [req.session.user.int_guestid, "Pending", "Funeral Mass"], (err, results, fields) => {
        if (err) console.log(err);
        console.log('----------')
        console.log(results[0]);
        console.log('----------')
        return res.render('guest/requests/views/requestsfuneral',{ tbl_reservation : results });
    });
    // res.render('guest/requests/views/requestsfuneral');
});
//private
router.get('/privatewedding', (req, res) => {

    var queryString1 =`SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid WHERE tbl_event.int_guestid = ? AND char_status = ? AND char_event= ?`
    db.query(queryString1, [req.session.user.int_guestid, "Pending", "Private Wedding"], (err, results, fields) => {
        if (err) console.log(err);
        console.log('----------')
        console.log(results[0]);
        console.log('----------')
        return res.render('guest/requests/views/requestsprivatewedding',{ tbl_reservation : results });
    });
    // res.render('guest/requests/views/requestsprivatewedding');
});

router.get('/masswedding', (req, res) => {

    var queryString1 =`SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid WHERE tbl_event.int_guestid = ? AND char_status = ? AND char_event= ?`
    db.query(queryString1, [req.session.user.int_guestid, "Pending", "Mass Wedding"], (err, results, fields) => {
        if (err) console.log(err);
        console.log('----------')
        console.log(results[0]);
        console.log('----------')
        return res.render('guest/requests/views/requestsmasswedding',{ tbl_reservation : results });
    });
    // res.render('guest/requests/views/requestsmasswedding');
});





router.get('/anointing/:int_reservationid/edit', (req, res) => {
    
    var queryString = `SELECT * FROM tbl_event 
    join tbl_reservation on tbl_event.int_eventid = tbl_reservation.int_eventid 
    WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}"`;
    db.query(queryString, (err, results, fields) => {
        console.log(results)
        res.render('guest/requests/views/editanointing', { reservation : results[0] ,  user: req.session.user});
    });
});


router.get('/baptism/:int_reservationid/edit', (req, res) => {
    
    var queryString = `SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid join tbl_baptismalevent on tbl_reservation.int_eventid = tbl_baptismalevent.int_eventid WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}"`;
    db.query(queryString, (err, results, fields) => {
        
        res.render('guest/requests/views/editbaptism',{ reservation : results[0], user: req.session.user });
    });
});


router.get('/funeralmass/:int_reservationid/edit', (req, res) => {
    
    var queryString = `SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}"`;
    db.query(queryString, (err, results, fields) => {
        
        res.render('guest/requests/views/editfuneral',{ reservation : results[0],user: req.session.user });
    });
});


router.get('/masswedding/:int_reservationid/edit', (req, res) => {
    
    var queryString = `SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid join tbl_weddingevent on tbl_reservation.int_eventid = tbl_weddingevent.int_eventid WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}"`;
    db.query(queryString, (err, results, fields) => {
        
        res.render('guest/requests/views/editmasswedding',{ reservation : results[0],user: req.session.user });
    });
});


router.get('/privatewedding/:int_reservationid/edit', (req, res) => {
    
    var queryString = `SELECT * FROM tbl_reservation JOIN tbl_event ON tbl_reservation.int_eventid = tbl_event.int_eventid join tbl_weddingevent on tbl_reservation.int_eventid = tbl_weddingevent.int_eventid WHERE tbl_reservation.int_reservationid = "${req.params.int_reservationid}"`;
    db.query(queryString, (err, results, fields) => {
        
        res.render('guest/requests/views/editprivatewedding',{ reservation : results[0], user: req.session.user });
    });
});




router.get('/anointing/:int_reservationid/cancel', (req, res) => {
    const queryString = `UPDATE tbl_reservation SET        
    char_status = "Cancelled"
    WHERE int_reservationid= ${req.params.int_reservationid}`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        return res.redirect('/guest/cancelled');
        // res.render('guest/requests/views/cancelled', { tbl_reservation : results[0], user: req.session.user })
    });
});

router.get('/baptism/:int_reservationid/cancel', (req, res) => {
    const queryString = `UPDATE tbl_reservation SET        
    char_status = "Cancelled"
    WHERE int_reservationid= ${req.params.int_reservationid}`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        return res.redirect('/guest/cancelled');
        // res.render('guest/requests/views/cancelled', { tbl_reservation : results[0], user: req.session.user })
    });
});

router.get('/funeralmass/:int_reservationid/cancel', (req, res) => {
    const queryString = `UPDATE tbl_reservation SET        
    char_status = "Cancelled"
    WHERE int_reservationid= ${req.params.int_reservationid}`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        return res.redirect('/guest/cancelled');
        // res.render('guest/requests/views/cancelled', { tbl_reservation : results[0], user: req.session.user })
    });
});

router.get('/masswedding/:int_reservationid/cancel', (req, res) => {
    const queryString = `UPDATE tbl_reservation SET        
    char_status = "Cancelled"
    WHERE int_reservationid= ${req.params.int_reservationid}`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        return res.redirect('/guest/cancelled');
        // res.render('guest/requests/views/cancelled', { tbl_reservation : results[0], user: req.session.user })
    });
});

router.get('/privatewedding/:int_reservationid/cancel', (req, res) => {
    const queryString = `UPDATE tbl_reservation SET        
    char_status = "Cancelled"
    WHERE int_reservationid= ${req.params.int_reservationid}`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        return res.redirect('/guest/cancelled');
        // res.render('guest/requests/views/cancelled', { tbl_reservation : results[0], user: req.session.user })
    });
});



router.post('/anointing/:int_reservationid/edit', (req, res) => {

console.log('NANDITO SIYA SA EDITPROFILE POST');
const queryString = `UPDATE tbl_event SET        
date_schedule = "${req.body.annointdate}",
date_birthday = "${req.body.annointbirthday}", 
varchar_address = "${req.body.annointaddress}", 
char_event = 'Anointing of the sick', 
char_relation = "${req.body.annointrelationship}", 
varchar_lastname = "${req.body.annointlastname}",
varchar_firstname =  "${req.body.annointfirstname}",
varchar_middlename = "${req.body.annointmiddlename}"
where  int_eventid=(SELECT int_eventid
    FROM tbl_reservation
    WHERE int_reservationid = ${req.params.int_reservationid});`;


db.query(queryString, (err, results, fields) => {        
    if (err) throw err;          
    return res.redirect('/guest/requests'); 
    
});
});




router.post('/funeralmass/:int_reservationid/edit', (req, res) => {
    
    console.log('NANDITO SIYA SA EDITPROFILE POST');
    const queryString = `UPDATE tbl_event SET        
    date_schedule = "${req.body.deaddate}",
    date_birthday = "${req.body.deadbirthday}", 
    varchar_address = "${req.body.deadaddress}", 
    char_event = 'Funeral Mass', 
    char_relation = "${req.body.deadrelationship}", 
    varchar_lastname = "${req.body.deadlastname}",
    varchar_firstname =  "${req.body.deadfirstname}",
    varchar_middlename = "${req.body.deadmiddlename}"
    where  int_eventid=(SELECT int_eventid
        FROM tbl_reservation
        WHERE int_reservationid = ${req.params.int_reservationid});`;
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;          
        return res.redirect('/guest/requests'); 
        
    });
    });

    
router.post('/baptism/:int_reservationid/edit', (req, res) => {
    
    console.log('NANDITO SIYA SA EDITPROFILE POST');
    
    const queryString = `UPDATE tbl_event SET        
    date_schedule = "${req.body.baptismaldate}",
    date_birthday = "${req.body.childbirthday}", 
    varchar_address = "${req.body.familyaddress}", 
    char_event = 'Baptism', 
    char_relation = "${req.body.baptismalrelationship}", 
    varchar_lastname = "${req.body.childlastname}",
    varchar_firstname =  "${req.body.childfirstname}",
    varchar_middlename = "${req.body.childmiddlename}"
    where  tbl_event.int_eventid=(SELECT int_eventid
            FROM tbl_reservation
            WHERE int_reservationid = ${req.params.int_reservationid});`;
    

    const queryString1 = `UPDATE tbl_baptismalevent SET
    
    varchar_childsbirthplace = "${req.body.childbirthplace}",
    varchar_motherlastname = "${req.body.motherlastname}",
    varchar_motherfirstname = "${req.body.motherfirstname}",
    varchar_mothermiddlename = "${req.body.mothermiddlename}",
    varchar_motherbirthplace = "${req.body.motherbirthplace}",
    varchar_fatherlastname = "${req.body.fatherlastname}",
    varchar_fatherfirstname = "${req.body.fatherfirstname}",
    varchar_fathermiddlename = "${req.body.fathermiddlename}",
    varchar_motherbirthplace = "${req.body.motherbirthplace}",
    varchar_parentmarriageaddress = "${req.body.placeofmarriage}",
    varchar_baptismalcontact = "${req.body.familycontact}"
    
    where tbl_baptismalevent.int_eventid = (SELECT int_eventid
            FROM tbl_reservation
            WHERE int_reservationid = ${req.params.int_reservationid});`;
        
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;             
        db.query(queryString1, (err, results, fields)=>{
            if (err) throw err;   

            return res.redirect('/guest/requests'); 
        })
        
        
    });

    });




router.post('/privatewedding/:int_reservationid/edit', (req, res) => {
        
        console.log('NANDITO SIYA SA EDITPROFILE POST');
        const queryString = `UPDATE tbl_event SET        
        date_schedule = "${req.body.weddingdate}",
        date_birthday = "${req.body.bridebirthday}", 
        varchar_address = "${req.body.brideaddress}", 
        char_event = 'Private Wedding', 
        char_relation = "${req.body.briderelationship}", 
        varchar_lastname = "${req.body.bridelastname}",
        varchar_firstname =  "${req.body.bridefirstname}",
        varchar_middlename = "${req.body.bridemiddlename}"
        where  int_eventid=(SELECT int_eventid
            FROM tbl_reservation
            WHERE int_reservationid = ${req.params.int_reservationid});`;
        

        const queryString1 = `UPDATE tbl_weddingevent SET

        varchar_brideoccupation ="${req.body.brideoccupation}", 
        char_bridecivilstatus = "${req.body.bridestatus}", 
        char_bridereligion = "${req.body.bridereligion}",
        bool_brideifpregnant = "${req.body.pregnant}",
        bool_brideifbaptized = "${req.body.bridebaptized}",
        bool_brideifconfirmed = "${req.body.brideconfirmed}",
        varchar_bridemotherlastname = "${req.body.bridemotherlastname}",
        varchar_bridemotherfirstname = "${req.body.bridemotherfirstname}",
        varchar_bridemothermiddlename = "${req.body.bridemothermiddlename}",
        varchar_bridefatherlastname =  "${req.body.bridefatherlastname}",
        varchar_bridefatherfirstname = "${req.body.bridefatherfirstname}",
        varchar_bridefathermiddlename = "${req.body.bridefathermiddlename}",
        varchar_groomlastname = "${req.body.groomlastname}",
        varchar_groomfirstname = "${req.body.groomfirstname}",
        varchar_groommiddlename = "${req.body.groommiddlename}",
        date_groombirthday = "${req.body.groombirthday}",
        varchar_groomaddress = "${req.body.groomaddress}",
        varchar_groomoccupation = "${req.body.groomoccupation}",
        char_groomcivilstatus = "${req.body.groomstatus}",
        char_groomreligion = "${req.body.groomreligion}",
        bool_groomifbaptized = "${req.body.groombaptized}",
        bool_groomifconfirmed = "${req.body.groomconfirmed}",
        varchar_groommotherlastname = "${req.body.groommotherlastname}",
        varchar_groommotherfirstname = "${req.body.groommotherfirstname}",
        varchar_groommothermiddlename = "${req.body.groommothermiddlename}",
        varchar_groomfatherlastname = "${req.body.groomfatherlastname}",
        varchar_groomfatherfirstname = "${req.body.groomfatherfirstname}",
        varchar_groomfathermiddlename = "${req.body.groomfathermiddlename}",
        bool_ifcivillymarried = "${req.body.churchmarried}",
        bool_ifchurchmarried = "${req.body.civilmarried}",
        char_motif = "Ordinary"


        where int_eventid=(SELECT int_eventid
            FROM tbl_reservation
            WHERE int_reservationid = ${req.params.int_reservationid});`;
        
        db.query(queryString,(err, results, fields) => {        
            if (err) throw err;  
            db.query(queryString1, (err, results, fields)=>{
                if (err) throw err;   
    
           
            return res.redirect('/guest/requests'); 
            
        });
        });
    });
            
        

router.post('/masswedding/:int_reservationid/edit', (req, res) => {
    
    console.log('NANDITO SIYA SA EDITPROFILE POST');
    const queryString = `UPDATE tbl_event SET        
    date_schedule = "${req.body.weddingdate}",
    date_birthday = "${req.body.bridebirthday}", 
    varchar_address = "${req.body.brideaddress}", 
    char_event = 'Mass Wedding', 
    char_relation = "${req.body.briderelationship}", 
    varchar_lastname = "${req.body.bridelastname}",
    varchar_firstname =  "${req.body.bridefirstname}",
    varchar_middlename = "${req.body.bridemiddlename}"
    where  int_eventid=(SELECT int_eventid
        FROM tbl_reservation
        WHERE int_reservationid = ${req.params.int_reservationid});`;
    

    const queryString1 = `UPDATE tbl_weddingevent SET

    varchar_brideoccupation ="${req.body.brideoccupation}", 
    char_bridecivilstatus = "${req.body.bridestatus}", 
    char_bridereligion = "${req.body.bridereligion}",
    bool_brideifpregnant = "${req.body.pregnant}",
    bool_brideifbaptized = "${req.body.bridebaptized}",
    bool_brideifconfirmed = "${req.body.brideconfirmed}",
    varchar_bridemotherlastname = "${req.body.bridemotherlastname}",
    varchar_bridemotherfirstname = "${req.body.bridemotherfirstname}",
    varchar_bridemothermiddlename = "${req.body.bridemothermiddlename}",
    varchar_bridefatherlastname =  "${req.body.bridefatherlastname}",
    varchar_bridefatherfirstname = "${req.body.bridefatherfirstname}",
    varchar_bridefathermiddlename = "${req.body.bridefathermiddlename}",
    varchar_groomlastname = "${req.body.groomlastname}",
    varchar_groomfirstname = "${req.body.groomfirstname}",
    varchar_groommiddlename = "${req.body.groommiddlename}",
    date_groombirthday = "${req.body.groombirthday}",
    varchar_groomaddress = "${req.body.groomaddress}",
    varchar_groomoccupation = "${req.body.groomoccupation}",
    char_groomcivilstatus = "${req.body.groomstatus}",
    char_groomreligion = "${req.body.groomreligion}",
    bool_groomifbaptized = "${req.body.groombaptized}",
    bool_groomifconfirmed = "${req.body.groomconfirmed}",
    varchar_groommotherlastname = "${req.body.groommotherlastname}",
    varchar_groommotherfirstname = "${req.body.groommotherfirstname}",
    varchar_groommothermiddlename = "${req.body.groommothermiddlename}",
    varchar_groomfatherlastname = "${req.body.groomfatherlastname}",
    varchar_groomfatherfirstname = "${req.body.groomfatherfirstname}",
    varchar_groomfathermiddlename = "${req.body.groomfathermiddlename}",
    bool_ifcivillymarried = "${req.body.churchmarried}",
    bool_ifchurchmarried = "${req.body.civilmarried}",
    char_motif = "Ordinary"


    where int_eventid=(SELECT int_eventid
        FROM tbl_reservation
        WHERE int_reservationid = ${req.params.int_reservationid});`;
    
    db.query(queryString,(err, results, fields) => {        
        if (err) throw err;  
        db.query(queryString1, (err, results, fields)=>{
            if (err) throw err;   

       
        return res.redirect('/guest/requests'); 
        
    });
    });
});
        

module.exports = router;