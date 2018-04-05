var router = require('express').Router();
var db = require('../../../lib/database')();
//var authMiddleware = require('../../auth/middlewares/auth');
//router.use(authMiddleware.noAuthed);


router.get('/', (req, res) => {
    res.render('guestwithsession/masswedding/views/massweddingreservation',{user: req.session.user});
});

router.get('/listofrequirements', (req, res) => {
    res.render('guestwithsession/masswedding/views/listofrequirements');
});

router.get('/sponsors/:int_reservationid/listofsponsors', (req, res) => {
    // 
    var queryString = `select * from tbl_event join tbl_reservation on tbl_event.int_eventid = tbl_reservation.int_eventid join tbl_weddingevent on tbl_event.int_eventid = tbl_weddingevent.int_eventid where tbl_reservation.int_reservationid ="${req.session.user.int_reservationid}"`
    
        
        db.query(queryString, (err, results, fields) => {
            if (err) throw err;
            console.log('hello', results);
            return res.render('guestwithsession/masswedding/views/listofsponsors',{ sponsors : results, numberOfSponsors: req.query.numberofsponsors })
            });

});
        

router.get('/sponsors/:int_reservationid', (req, res) => {
    var queryString = `select * from tbl_event join tbl_reservation on tbl_event.int_eventid = tbl_reservation.int_eventid join tbl_weddingevent on tbl_event.int_eventid = tbl_weddingevent.int_eventid where tbl_reservation.int_reservationid ="${req.session.user.int_reservationid}"`
    
        
        db.query(queryString, (err, results, fields) => {
            if (err) throw err;
            return res.render('guestwithsession/masswedding/views/sponsors',{ sponsors : results, resid: req.params.int_reservationid })
            });


    // res.render('guestwithsession/masswedding/views/sponsors');
});


router.post('/', (req, res) => {
    // res.redirect('/guestwithsession/masswedding/listofsponsors');
     // res.redirect('/guestwithsession/funeralmass/listofrequirements');
     var queryString = `INSERT INTO tbl_event(
        \`int_guestid\`,
        \`date_schedule\`,
        \`date_birthday\`,
        \`varchar_address\`,
        \`char_event\`,
        \`char_relation\`,
        \`varchar_lastname\`,
        \`varchar_firstname\`,
        \`varchar_middlename\`) 
        
        
        VALUES("${req.body.guestid}",
        "${req.body.weddingdate}", 
        "${req.body.bridebirthday}", 
        "${req.body.brideaddress}", 
        'mass Wedding', 
        "", 
        "${req.body.bridelastname}",
        "${req.body.bridefirstname}",
        "${req.body.bridemiddlename}")`;
       
        
        db.query(queryString, (err, results, fields) => {
            if (err) throw err;
            // return res.redirect('/guestwithsession/annointment/lisofrequirements');
            var eventid= results;
            console.log(eventid)
            
            var queryString2 = `INSERT INTO tbl_reservation(
            \`int_eventid\`,
            \`int_guestid\`,
            \`int_priestid\`,
            \`char_status\`,
            \`char_feestatus\`) 
            
            VALUES(
            "${eventid.insertId}",
            "${req.body.guestid}", 
            "2", 
            "Pending", 
            "Unpaid")`;
        //    (select int_eventid from tbl_event where int_guestid= ${req.session.int_guestid})
            db.query(queryString2, (err, results, fields) => {
                if (err) throw err;
                var weddingid= results;
                console.log(weddingid)
                req.session.user.int_reservationid = weddingid.insertId;
                // return res.redirect('/guestwithsession/masswedding/listofrequirements');
                // var button1 = document.getElementById("optionsRadios1");
                // var button2 = document.getElementById("optionRadios2");
                
                // if (button1.checked){
                //     var if
                // }else if (button2.checked) {
                    
                // }


                 var queryString3 = `INSERT INTO tbl_weddingevent(
                \`int_eventid\`,
                \`varchar_brideoccupation\`,
                \`char_bridecivilstatus\`,
                \`char_bridereligion\`,
                \`bool_brideifpregnant\`,
                \`bool_brideifbaptized\`,
                \`bool_brideifconfirmed\`,
                \`varchar_bridemotherlastname\`,
                \`varchar_bridemotherfirstname\`,
                \`varchar_bridemothermiddlename\`,
                \`varchar_bridefatherlastname\`,
                \`varchar_bridefatherfirstname\`,
                \`varchar_bridefathermiddlename\`,
                \`varchar_groomlastname\`,
                \`varchar_groomfirstname\`,
                \`varchar_groommiddlename\`,
                \`date_groombirthday\`,
                \`varchar_groomaddress\`,
                \`varchar_groomoccupation\`,
                \`char_groomcivilstatus\`,
                \`char_groomreligion\`,
                \`bool_groomifbaptized\`,
                \`bool_groomifconfirmed\`,
                \`varchar_groommotherlastname\`,
                \`varchar_groommotherfirstname\`,
                \`varchar_groommothermiddlename\`,
                \`varchar_groomfatherlastname\`,
                \`varchar_groomfatherfirstname\`,
                \`varchar_groomfathermiddlename\`,
                \`bool_ifcivillymarried\`,
                \`bool_ifchurchmarried\`,
                \`char_motif\`) 
                
                VALUES(
                "${eventid.insertId}",
                "${req.body.brideoccupation}",
                "${req.body.bridestatus}",
                "${req.body.bridereligion}",
                "${req.body.pregnant}",
                "${req.body.bridebaptized}",
                "${req.body.brideconfirmed}",
                "${req.body.bridemotherlastname}",
                "${req.body.bridemotherfirstname}",
                "${req.body.bridemothermiddlename}",
                "${req.body.bridefatherlastname}",
                "${req.body.bridefatherfirstname}",
                "${req.body.bridefathermiddlename}",
                "${req.body.groomlastname}",
                "${req.body.groomfirstname}",
                "${req.body.groommiddlename}",
                "${req.body.groombirthday}",
                "${req.body.groomaddress}",
                "${req.body.groomoccupation}",
                "${req.body.groomstatus}",
                "${req.body.groomreligion}",
                "${req.body.groombaptized}",
                "${req.body.groomconfirmed}",
                "${req.body.groommotherlastname}",
                "${req.body.groommotherfirstname}",
                "${req.body.groommothermiddlename}",
                "${req.body.groomfatherlastname}",
                "${req.body.groomfatherfirstname}",
                "${req.body.groomfathermiddlename}",
                "${req.body.churchmarried}",
                "${req.body.civilmarried}",
                "Ordinary")`;
            
                db.query(queryString3, (err, results, fields) => {
                    if (err) throw err;
                    // var sponsorid=results;                
                    // console.log(sponsorid);
                    // var queryString4 = `INSERT INTO tbl_sponsorswedding(
                    //     \`int_sponsorid\`,
                    //     \`varchar_sponsorlastname\`,
                    //     \`varchar_sponsorfirstname\`,
                    //     \`varchar_sponsormiddlename\`) 
                        
                    //     VALUES(
                    //     "${sponsorid.insertId}",
                    //     "${req.body.ninonglastname}",
                    //     "${req.body.ninongfirstname}",
                    //     "${req.body.ninongmiddlename}")`;
                    
                    //     db.query(queryString4, (err, results, fields) => {
                    //         if (err) throw err;
                    return res.redirect(`/guestwithsession/masswedding/sponsors/${weddingid.insertId}`);
                    //     });
    
                }); 
            }); 
        }); 
    
    // });
});
router.post('/sponsors/:int_reservationid/listofsponsors', (req, res) => {
    
    // console.log(req.body.numberofsponsors);
    //         return res.redirect('/guestwithsession/masswedding/listofrequirements');
    console.log(req.body);
    var i;
    for(i=0; i<=`${req.body.numberofsponsors}`; i++){
        var queryString3 = `INSERT INTO tbl_sponsorswedding(
        \`int_sponsorid\`,
        \`varchar_sponsorlastname\`,
        \`varchar_sponsorfirstname\`,
        \`varchar_sponsormiddlename\`) 
        
        VALUES(
            "${req.body.weddingid}",
            "${req.body.sponsorlastname[i]}",
            "${req.body.sponsorfirstname[i]}",
            "${req.body.sponsormiddlename[i]}")`;
            
            if(i== `${req.body.numberofsponsors}`){
                return res.redirect(`/guestwithsession/masswedding/listofrequirements`);
                    }
        
        db.query(queryString3, (err, results, fields) => {
            if (err) throw err;
            
        });
    }
 });

router.post('/sponsors/:int_reservationid', (req, res) => {
    
    console.log(req.body.numberofsponsors);
    return res.redirect(`/guestwithsession/masswedding/sponsors/${req.session.user.int_reservationid}?sponsors=${req.body.numberofsponsors}`);
 });
module.exports = router;