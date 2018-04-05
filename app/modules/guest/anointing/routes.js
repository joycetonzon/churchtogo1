var router = require('express').Router();
var db = require('../../../lib/database')();
var authMiddleware = require('../../auth/middlewares/auth');
//router.use(authMiddleware.hasAuthadmin);

// router.post('/', (req, res) => {
//     var queryString = `INSERT INTO \`int_guestId\` (\`int_annoinmentId\`,\`int_annointrelation\`,\`char_annointmentName\`, \`date_annointbirth\` \`date_annointmentSchedule\`, \`varchar_annoinmentAddress\`)
//     VALUES("${req.body.annointrelationship}", "${req.body.annointname}", ${req.body.annointbirth},${req.body.annointdate},"${req.body.annointaddress}");`;
//     });


router.get('/', (req, res) => {
    res.render('guest/anointing/views/annointmentreservation',{user: req.session.user});
});


router.get('/listofrequirements', (req, res) => {
    res.render('guest/anointing/views/listofrequirements');
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
    
    
    VALUES("${req.body.annointid}",
    "${req.body.annointdate}", 
    "${req.body.annointbirthday}", 
    "${req.body.annointaddress}", 
    'Anointing of the sick', 
    "${req.body.annointrelationship}", 
    "${req.body.annointlastname}",
    "${req.body.annointfirstname}",
    "${req.body.annointmiddlename}")`;
   
    
    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        // return res.redirect('/guest/annointment/lisofrequirements');
        var eventid= results;
        console.log(eventid)
        
        var queryString2 = `INSERT INTO tbl_reservation(
        \`int_eventid\`,
        \`int_guestid\`,
        
        \`char_status\`,
        \`char_feestatus\`) 
        
        VALUES(
        "${eventid.insertId}",
        "${req.body.annointid}", 
        
        "Pending", 
        "Unpaid")`;
    //    (select int_eventid from tbl_event where int_guestid= ${req.session.int_guestid})
        db.query(queryString2, (err, results, fields) => {
            if (err) throw err;
            return res.redirect('/guest/anointing/listofrequirements');
        
        }); 
    }); 

});

module.exports = router;
