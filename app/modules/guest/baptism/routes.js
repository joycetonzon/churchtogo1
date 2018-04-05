var router = require('express').Router();
var db = require('../../../lib/database')();
var authMiddleware = require('../../auth/middlewares/auth');
//router.use(authMiddleware.hasAuthadmin);


router.get('/', (req, res) => {
    res.render('guest/baptism/views/baptismreservation',{user: req.session.user});
});


router.get('/listofrequirements', (req, res) => {
    res.render('guest/baptism/views/listofrequirements');
});

router.get('/sponsors/:int_reservationid/listofsponsors', (req, res) => {
    // 
    var queryString = `select * from tbl_event join tbl_reservation on tbl_event.int_eventid = tbl_reservation.int_eventid join tbl_baptismalevent on tbl_event.int_eventid = tbl_baptismalevent.int_eventid where tbl_reservation.int_reservationid ="${req.session.user.int_reservationid}"`
    
        
        db.query(queryString, (err, results, fields) => {
            if (err) throw err;
            console.log('hello', results);
            return res.render('guest/baptism/views/listofsponsors',{ sponsors : results, numberOfSponsors: req.query.numberofsponsors })
            });

});
        

router.get('/sponsors/:int_reservationid', (req, res) => {
    var queryString = `select * from tbl_event join tbl_reservation on tbl_event.int_eventid = tbl_reservation.int_eventid join tbl_baptismalevent on tbl_event.int_eventid = tbl_baptismalevent.int_eventid where tbl_reservation.int_reservationid ="${req.session.user.int_reservationid}"`
    
        
        db.query(queryString, (err, results, fields) => {
            if (err) throw err;
            return res.render('guest/baptism/views/sponsors',{ sponsors : results, resid: req.params.int_reservationid })
            });


    // res.render('guest/baptismal/views/sponsors');
});

router.post('/', (req, res) => {
    // res.redirect('/guest/funeralmass/listofrequirements');
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
    
    
    VALUES(
    "${req.body.guestid}",
    "${req.body.baptismdate}", 
    "${req.body.childbirthday}", 
    "${req.body.familyaddress}", 
    'Baptism', 
    "${req.body.baptismrelationship}", 
    "${req.body.childlastname}",
    "${req.body.childfirstname}",
    "${req.body.childmiddlename}")`;
   
    
    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        // return res.redirect('/guest/annointment/lisofrequirements');
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
                var baptismalid= results;
                console.log(baptismalid)
                req.session.user.int_reservationid = baptismalid.insertId;
            
                // return res.redirect('/guest/baptismal/listofrequirements');
                var queryString3 = `INSERT INTO tbl_baptismalevent(
                \`int_eventid\`,
                \`varchar_childsbirthplace\`,
                \`varchar_motherlastname\`,
                \`varchar_motherfirstname\`,
                \`varchar_mothermiddlename\`,
                \`varchar_motherbirthplace\`,
                \`varchar_fatherlastname\`,
                \`varchar_fatherfirstname\`,
                \`varchar_fathermiddlename\`,
                \`varchar_fatherbirthplace\`,
                \`varchar_parentmarriageaddress\`,
                \`varchar_baptismalcontact\`) 
                
                VALUES(
                "${eventid.insertId}",
                "${req.body.childbirthplace}"
                "${req.body.motherlastname}", 
                "${req.body.motherfirstname}", 
                "${req.body.mothermiddlename}",
                "${req.body.motherbirthplace}",
                "${req.body.fatherlastname}", 
                "${req.body.fatherfirstname}", 
                "${req.body.fathermiddlename}", 
                "${req.body.fatherbirthplace}",
                "${req.body.placeofmarriage}",
                "${req.body.familycontact}")`;
            
                // });
                db.query(queryString3, (err, results, fields) => {
                    if (err) throw err;
                    
                    return res.redirect(`/guest/baptism/sponsors/${baptismalid.insertId}`);
                        
                        });
        
            // }); 
        }); 
    }); 

});
// });

router.post('/sponsors/:int_reservationid/listofsponsors', (req, res) => {
    
    // console.log(req.body.numberofsponsors);
    //         return res.redirect('/guest/baptismal/listofrequirements');
    console.log(req.body);
    var i;
    for(i=0; i<=`${req.body.numberofsponsors}`; i++){
        var queryString3 = `INSERT INTO tbl_sponsorsbaptismal(
        \`int_sponsorid\`,
        \`varchar_sponsorlastname\`,
        \`varchar_sponsorfirstname\`,
        \`varchar_sponsormiddlename\`) 
        
        VALUES(
            "${req.body.baptismalid}",
            "${req.body.sponsorlastname[i]}",
            "${req.body.sponsorfirstname[i]}",
            "${req.body.sponsormiddlename[i]}")`;
            
            if(i== `${req.body.numberofsponsors}`){
                return res.redirect(`/guest/baptism/listofrequirements`);
                    }
        
        db.query(queryString3, (err, results, fields) => {
            if (err) throw err;
            
        });
    }
 });

router.post('/sponsors/:int_reservationid', (req, res) => {
    
    console.log(req.body.numberofsponsors);
    return res.redirect(`/guest/baptism/sponsors/${req.session.user.int_reservationid}?sponsors=${req.body.numberofsponsors}`);
 });
module.exports = router;