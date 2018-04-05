var router = require('express').Router();
var db = require('../../../lib/database')();
var multer = require ('multer');
var path = require('path');
var fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
// var authMiddleware = require('../../auth/middlewares/auth');
//router.use(authMiddleware.hasAuthadmin);


var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, path.join(__dirname + '/uploads/'))
    },
    filename: function(req, file, callback) {
        console.log(file)
        callback(null,req.session.user.int_guestid + file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})



router.get('/', (req, res) => {
    res.render('guest/submittingforms/views/submittingforms');
});

router.get('/anointingrequirements/:int_reservationid', (req, res) => {
    console.log(req.params.int_reservationid);
    req.session.user.int_reservationid = req.params.int_reservationid;
    console.log(req.session.user);
    res.render('guest/submittingforms/views/anointingrequirements');
});


router.get('/baptismrequirements/:int_reservationid', (req, res) => {
    console.log(req.params.int_reservationid);
    req.session.user.int_reservationid = req.params.int_reservationid;
    console.log(req.session.user);
    res.render('guest/submittingforms/views/baptismrequirements');
});

router.get('/funeralrequirements/:int_reservationid', (req, res) => {
    console.log(req.params.int_reservationid);
    req.session.user.int_reservationid = req.params.int_reservationid;
    console.log(req.session.user);
    res.render('guest/submittingforms/views/funeralrequirements');
});

router.get('/massweddingrequirements/:int_reservationid', (req, res) => {
    console.log(req.params.int_reservationid);
    req.session.user.int_reservationid = req.params.int_reservationid;
    console.log(req.session.user);
    res.render('guest/submittingforms/views/massweddingrequirements');
});

router.get('/privateweddingrequirements/:int_reservationid', (req, res) => {
    req.session.user.int_reservationid = req.params.int_reservationid;
    var queryString1 =`SELECT * FROM tbl_event JOIN tbl_weddingevent ON tbl_event.int_eventid = tbl_weddingevent.int_eventid JOIN tbl_reservation ON tbl_weddingevent.int_eventid = tbl_reservation.int_eventid WHERE tbl_event.int_guestid = ? AND tbl_reservation.int_reservationid=${req.session.user.int_reservationid}`
    db.query(queryString1, [req.session.user.int_guestid], (err, results, fields) => {
        if (err) console.log(err);
    console.log('===========================================================');
    console.log(results);
    console.log('===========================================================');
    console.log(req.params.int_reservationid);
    console.log(req.session.user);
    console.log('REQ.SESSION.USERWEDD***********************************************************');
    req.session.userWedd=results;
    console.log(req.session.userWedd);
    console.log('***********************************************************');
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    userWedd=req.session.userWedd;
    console.log(userWedd);
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    req.session.userWeddd=results[0];
    console.log(req.session.userWeddd);
    console.log(req.session.userWeddd.bool_brideifpregnant);
    res.render('guest/submittingforms/views/privateweddingrequirements',{ privateWedding : req.session.userWedd });
});
});


router.use(fileUpload());


router.post('/anointingrequirements/:int_reservationid', function(req, res) {      
                console.log(req.body, 'Body');
                console.log(req.files, 'Files');
                console.log(req.files.anointingBirthCert);
                console.log(req.files.anointingBirthCert.mv);
		let anointingBirthCert = req.files.anointingBirthCert;
        // var queryString = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path}")`;
        anointingBirthCert.mv(__dirname + '/uploads/' + req.session.user.int_reservationid+'-' + 'anointingBirthCert'+ '-' + req.files.anointingBirthCert.name + '-' + Date.now() + path.extname(req.files.anointingBirthCert.name), function(err) {
		pathanointing = (__dirname + '/uploads/' + req.session.user.int_reservationid+'-' + 'anointingsBirthCert'+ '-' + req.files.anointingBirthCert.name + '-' + Date.now() + path.extname(req.files.anointingBirthCert.name));
		        console.log(pathanointing);
		
		req.files.path = pathanointing
		var queryString = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid}, "${req.files.path}")`;
		
		db.query(queryString,(err,results,fields)=>{
		if (err)
		res.status(500).send(err);
 
		return res.redirect('/guest/home');
		});
	});
});

router.post('/baptismrequirements/:int_reservationid', function(req, res) {
                console.log(req.body, 'Body');
                console.log(req.files, 'Files');
                console.log(req.files.baptismBirtCert);
                console.log(req.files.baptismBirtCert.mv);
		let baptismBirtCert = req.files.baptismBirtCert;
        // var queryString = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path}")`;

        baptismBirtCert.mv(__dirname + '/uploads/' + req.session.user.int_reservationid+'-' + 'baptismBirtCert'+ '-' + req.files.baptismBirtCert.name + '-' + Date.now() + path.extname(req.files.baptismBirtCert.name), function(err) {
		pathbaptismBirtCert = (__dirname + '/uploads/' + req.session.user.int_reservationid+'-' + 'baptismBirtCert'+ '-' + req.files.baptismBirtCert.name + '-' + Date.now() + path.extname(req.files.baptismBirtCert.name));
		        console.log(pathbaptismBirtCert);
		
		req.files.path = baptismBirtCert
		var queryString = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES ( ${req.session.user.int_reservationid},"${req.files.path}")`;
		
		db.query(queryString,(err,results,fields)=>{
		if (err)
		res.status(500).send(err);
 
		return res.redirect('/guest/home');
		});
	});
});


router.post('/funeralrequirements/:int_reservationid', function(req, res) {
	
        //res.end('File is uploaded')
        console.log(req.body, 'Body');
        console.log(req.files, 'Files');
        console.log(req.files.FuneralBirthCert);
		
		//console.log(req.files.anointingBirthCert.mv);
		let FuneralBirthCert = req.files.FuneralBirthCert;
		
            // var queryString = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path}")`;

            FuneralBirthCert.mv(__dirname + '/uploads/' + req.session.user.int_reservationid+'-' + 'FuneralMassBirthCert'+ '-' + req.files.FuneralBirthCert.name + '-' + Date.now() + path.extname(req.files.FuneralBirthCert.name), function(err) {
		    pathFuneralBirthCert = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'FuneralMassBirthCert'+ '-' + req.files.FuneralBirthCert.name + '-' + Date.now() + path.extname(req.files.FuneralBirthCert.name));
		
        console.log(pathFuneralBirthCert);
		
		req.files.path1 = pathFuneralBirthCert
		var queryString = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path1}")`;
		
		    db.query(queryString,(err,results,fields)=>{
		
        let FuneralDeathCert = req.files.FuneralDeathCert;
        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path2}")`;
            FuneralDeathCert.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'FuneralMassDeathCert' + '-' + req.files.FuneralDeathCert.name + '-' + Date.now() + path.extname(req.files.FuneralDeathCert.name), function(err) {
            pathFuneralDeathCert = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'FuneralDeathCert'+ '-' + req.files.FuneralDeathCert.name + '-' + Date.now() + path.extname(req.files.FuneralDeathCert.name));
        
            console.log(req.files.FuneralDeathCertCert);
        
        req.files.path2 = pathFuneralDeathCert
		
		    db.query(queryString1,(err,results,fields)=>{
		    if (err)
		    res.status(500).send(err);	
 
		return res.redirect('/guest/home');
		});
	});
});
});       
});  


router.post('/massweddingrequirements/:int_reservationid', function(req, res) {
	
    console.log(req.session.userWeddd.bool_brideifpregnant);
    console.log(req.body, 'Body');
    console.log(req.files, 'Files');
    console.log(req.files.PrivateWeddbaptismCert);
    
    
    //console.log(req.files.anointingBirthCert.mv);
    let MassWeddbaptismCert = req.files.MassWeddbaptismCert;

        MassWeddbaptismCert.mv(__dirname + '/uploads/' + req.session.user.int_reservationid+'-' + 'MassWeddbaptismCert'+ '-' + req.files.MassWeddbaptismCert.name + '-' + Date.now() + path.extname(req.files.MassWeddbaptismCert.name), function(err) {
    
        pathMassWeddbaptismCert = (__dirname + '/uploads/' + req.session.user.int_reservationidint_reservationid +'-' + 'MassWeddbaptismCert'+ '-' + req.files.MassWeddbaptismCert.name + '-' + Date.now() + path.extname(req.files.MassWeddbaptismCert.name));
    
    console.log(pathMassWeddbaptismCert);
    
    req.files.path1 = pathMassWeddbaptismCert
    var queryString = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path1}")`;
    
        db.query(queryString,(err,results,fields)=>{
    
            

    console.log(req.files.MassWeddConfirmationCert);
    
    pathMassWeddConfirmationCert = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddConfirmationCert'+ '-' + req.files.MassWeddConfirmationCert.name + '-' + Date.now() + path.extname(req.files.MassWeddConfirmationCert.name));
    req.files.path2 = pathMassWeddConfirmationCert
    
    let MassWeddConfirmationCert = req.files.MassWeddConfirmationCert;
        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path2}")`;
        MassWeddConfirmationCert.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddConfirmationCert' + '-' + req.files.MassWeddConfirmationCert.name + '-' + Date.now() + path.extname(req.files.MassWeddConfirmationCert.name), function(err) {
            
        db.query(queryString1,(err,results,fields)=>{
        if (err)
        res.status(500).send(err);	
    


    pathMassWeddBirthCert = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddBirthCert'+ '-' + req.files.MassWeddBirthCert.name + '-' + Date.now() + path.extname(req.files.MassWeddBirthCert.name));
    req.files.path3 = pathMassWeddBirthCert
    
    let MassWeddBirthCert = req.files.MassWeddBirthCert;
        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path3}")`;
        MassWeddBirthCert.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddBirthCert' + '-' + req.files.MassWeddBirthCert.name + '-' + Date.now() + path.extname(req.files.MassWeddBirthCert.name), function(err) {
    
        db.query(queryString1,(err,results,fields)=>{
        if (err)
        res.status(500).send(err);	
    


    pathMassWeddMarriageLicense = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddMarriageLicense'+ '-' + req.files.MassWeddMarriageLicense.name + '-' + Date.now() + path.extname(req.files.MassWeddMarriageLicense.name));
    req.files.path4 = pathMassWeddMarriageLicense
    
    let MassWeddMarriageLicense = req.files.MassWeddMarriageLicense;
        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path4}")`;
        MassWeddMarriageLicense.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddMarriageLicense' + '-' + req.files.MassWeddMarriageLicense.name + '-' + Date.now() + path.extname(req.files.MassWeddMarriageLicense.name), function(err) {
            
        db.query(queryString1,(err,results,fields)=>{
        if (err)
        res.status(500).send(err);
    


    pathMassWeddCENOMAR = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddCENOMAR'+ '-' + req.files.MassWeddCENOMAR.name + '-' + Date.now() + path.extname(req.files.MassWeddCENOMAR.name));
    req.files.path5 = pathMassWeddCENOMAR
    
    let MassWeddCENOMAR = req.files.MassWeddCENOMAR;
        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path5}")`;
        MassWeddCENOMAR.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddCENOMAR' + '-' + req.files.MassWeddCENOMAR.name + '-' + Date.now() + path.extname(req.files.MassWeddCENOMAR.name), function(err) {
    
        db.query(queryString1,(err,results,fields)=>{
        if (err)
        res.status(500).send(err);
        // res.render('guest/submittingforms/views/submittingforms');
        // return res.redirect('/guest/home');
        validationMassWeddingPregnant();
    });


        function validationMassWeddingPregnant(){
            console.log('Nandito ako sa loob ng Validation Private Wedding Function Pregnant');
            console.log(req.session.userWeddd.bool_brideifpregnant);
            if(req.session.userWeddd.bool_brideifpregnant == 1){
            pathMassWeddClearanceChancery = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddClearanceChancery'+ '-' + req.files.MassWeddClearanceChancery.name + '-' + Date.now() + path.extname(req.files.MassWeddClearanceChancery.name));
            req.files.path6 = pathMassWeddClearanceChancery
            let MassWeddClearanceChancery = req.files.MassWeddClearanceChancery;
            var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path6}")`;
            MassWeddClearanceChancery.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddClearanceChancery' + '-' + req.files.MassWeddClearanceChancery.name + '-' + Date.now() + path.extname(req.files.MassWeddClearanceChancery.name), function(err) {
            
            db.query(queryString1,(err,results,fields)=>{
            if (err)
            res.status(500).send(err);
            // return res.redirect('/guest/home');
            // res.redirect('guest/home');
            validationBrideReligion(); 
            });
            // console.log('Nandito na siya sa pagtapos ng validationMassWeddingPregnant tas dat punta siya sa BrideReligion');
            // return res.redirect('/guest/home');
                                                });
                                            }
            else{
                console.log('Di siya preggy function');
                // return res.redirect('/guest/home');
                validationBrideReligion();
            }
            }

            function validationBrideReligion(){
            console.log('Nandito siya sa Function Bride ng Religion');
            if(req.session.userWeddd.char_bridereligion =='Non-Catholic'){
                pathMassWeddCertOfFreedomBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddCertOfFreedomBride'+ '-' + req.files.MassWeddCertOfFreedomBride.name + '-' + Date.now() + path.extname(req.files.MassWeddCertOfFreedomBride.name));
                req.files.path7 = pathMassWeddCertOfFreedomBride
                let MassWeddCertOfFreedomBride = req.files.MassWeddCertOfFreedomBride;
                var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path7}")`;
                MassWeddCertOfFreedomBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddCertOfFreedomBride' + '-' + req.files.MassWeddCertOfFreedomBride.name + '-' + Date.now() + path.extname(req.files.MassWeddCertOfFreedomBride.name), function(err) {
                
                db.query(queryString1,(err,results,fields)=>{
                if (err)
                res.status(500).send(err); 
                // validationGroomReligion();
                // return res.redirect('/guest/home');
                                                        });
                                                    });
                pathMassWeddPermissionMixedBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddPermissionMixedBride'+ '-' + req.files.MassWeddPermissionMixedBride.name + '-' + Date.now() + path.extname(req.files.MassWeddPermissionMixedBride.name));
                req.files.path8 = pathMassWeddPermissionMixedBride
                let MassWeddPermissionMixedBride = req.files.MassWeddPermissionMixedBride;
                var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path8}")`;
                MassWeddPermissionMixedBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddPermissionMixedBride' + '-' + req.files.MassWeddPermissionMixedBride.name + '-' + Date.now() + path.extname(req.files.MassWeddPermissionMixedBride.name), function(err) {
                
                db.query(queryString1,(err,results,fields)=>{
                if (err)
                res.status(500).send(err); 
                // validationGroomReligion();
                // return res.redirect('/guest/home');
                                                        });
                                                    });
                console.log('Non Catholic Bride');
                validationGroomReligion();
                }
            if(req.session.userWeddd.char_bridereligion =='Non-Christian'){
                pathMassWeddCertOfFreedomBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddCertOfFreedomBride'+ '-' + req.files.MassWeddCertOfFreedomBride.name + '-' + Date.now() + path.extname(req.files.MassWeddCertOfFreedomBride.name));
                req.files.path9 = pathMassWeddCertOfFreedomBride
                let MassWeddCertOfFreedomBride = req.files.MassWeddCertOfFreedomBride;
                var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path9}")`;
                MassWeddCertOfFreedomBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddCertOfFreedomBride' + '-' + req.files.MassWeddCertOfFreedomBride.name + '-' + Date.now() + path.extname(req.files.MassWeddCertOfFreedomBride.name), function(err) {
                  
                db.query(queryString1,(err,results,fields)=>{
                if (err)
                res.status(500).send(err); 
                // validationGroomReligion();
                // return res.redirect('/guest/home');
                                                         });
                                                      });
                pathMassWeddDispensationChanceryBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddDispensationChanceryBride'+ '-' + req.files.MassWeddDispensationChanceryBride.name + '-' + Date.now() + path.extname(req.files.MassWeddDispensationChanceryBride.name));
                req.files.path10 = pathMassWeddDispensationChanceryBride
                let MassWeddDispensationChanceryBride = req.files.MassWeddDispensationChanceryBride;
                var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path10}")`;
                MassWeddDispensationChanceryBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddDispensationChanceryBride' + '-' + req.files.MassWeddDispensationChanceryBride.name + '-' + Date.now() + path.extname(req.files.MassWeddDispensationChanceryBride.name), function(err) {
                    
                db.query(queryString1,(err,results,fields)=>{
                if (err)
                res.status(500).send(err); 
                // validationGroomReligion();
                // return res.redirect('/guest/home');
                                                       });
                                                   });
                console.log('Non-Christian Bride');
                validationGroomReligion();
                }

            if(req.session.userWeddd.char_bridereligion =='No-Religion'){
                console.log('No-Religion Bride');
                pathMassWeddAffidOfFreedomBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddAffidOfFreedomBride'+ '-' + req.files.MassWeddAffidOfFreedomBride.name + '-' + Date.now() + path.extname(req.files.MassWeddAffidOfFreedomBride.name));
                req.files.path11 = pathMassWeddAffidOfFreedomBride
                let MassWeddAffidOfFreedomBride = req.files.MassWeddAffidOfFreedomBride;
                var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path11}")`;
                MassWeddAffidOfFreedomBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddAffidOfFreedomBride' + '-' + req.files.MassWeddAffidOfFreedomBride.name + '-' + Date.now() + path.extname(req.files.MassWeddAffidOfFreedomBride.name), function(err) {
                    
                db.query(queryString1,(err,results,fields)=>{
                // if (err)
                // res.status(500).send(err); 
                // return res.redirect('/guest/home');
                pathMassWeddDispensationChanceryBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddDispensationChanceryBride'+ '-' + req.files.MassWeddDispensationChanceryBride.name + '-' + Date.now() + path.extname(req.files.MassWeddDispensationChanceryBride.name));
                req.files.path12 = pathMassWeddDispensationChanceryBride
                let MassWeddDispensationChanceryBride = req.files.MassWeddDispensationChanceryBride;
                var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path12}")`;
                MassWeddDispensationChanceryBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddDispensationChanceryBride' + '-' + req.files.MassWeddDispensationChanceryBride.name + '-' + Date.now() + path.extname(req.files.MassWeddDispensationChanceryBride.name), function(err) {
                  
                db.query(queryString1,(err,results,fields)=>{
                if (err)
                res.status(500).send(err);
                validationGroomReligion();
                //return res.redirect('/guest/home');
                                                       });
                                                  });
                         });
                   });
                }
            if(req.session.userWeddd.char_bridereligion =='Catholic'){
                console.log('Catholic si Bride');
                validationGroomReligion();
                // return res.redirect('/guest/home');
                }
            }

            function validationGroomReligion(){
                    console.log('Nandito siya sa Function ng Groom Religion(NON-CATHOLIC)');
                    if(req.session.userWeddd.char_groomreligion =='Non-Catholic'){
                    pathMassWeddCertOfFreedomGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddCertOfFreedomGroom'+ '-' + req.files.MassWeddCertOfFreedomGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddCertOfFreedomGroom.name));
                    req.files.path13 = pathMassWeddCertOfFreedomGroom
                    let MassWeddCertOfFreedomGroom = req.files.MassWeddCertOfFreedomGroom;
                    var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path13}")`;
                    MassWeddCertOfFreedomGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddCertOfFreedomGroom' + '-' + req.files.MassWeddCertOfFreedomGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddCertOfFreedomGroom.name), function(err) {
                    
                    db.query(queryString1,(err,results,fields)=>{
                    // if (err)
                    // res.status(500).send(err); 
                    // return res.redirect('/guest/home');
                    pathMassWeddPermissionMixedGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddPermissionMixedGroom'+ '-' + req.files.MassWeddPermissionMixedGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddPermissionMixedGroom.name));
                    req.files.path14 = pathMassWeddPermissionMixedGroom
                    let MassWeddPermissionMixedGroom = req.files.MassWeddPermissionMixedGroom;
                    var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path14}")`;
                    MassWeddPermissionMixedGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddPermissionMixedGroom' + '-' + req.files.MassWeddPermissionMixedGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddPermissionMixedGroom.name), function(err) {
                    
                    db.query(queryString1,(err,results,fields)=>{
                    if (err)
                    res.status(500).send(err);
                    validationBrideStatus();
                                                            });
                                                        });
                        });
                    });
                    }
                    if(req.session.userWeddd.char_groomreligion =='Non-Christian'){
                        console.log('Non-Christian Groom');
                        pathMassWeddCertOfFreedomGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddCertOfFreedomGroom'+ '-' + req.files.MassWeddCertOfFreedomGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddCertOfFreedomGroom.name));
                        req.files.path15 = pathMassWeddCertOfFreedomGroom
                        let MassWeddCertOfFreedomGroom = req.files.MassWeddCertOfFreedomGroom;
                        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path15}")`;
                        MassWeddCertOfFreedomGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddCertOfFreedomGroom' + '-' + req.files.MassWeddCertOfFreedomGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddCertOfFreedomGroom.name), function(err) {
                        
                        db.query(queryString1,(err,results,fields)=>{
                        // if (err)
                        // res.status(500).send(err); 
                        // return res.redirect('/guest/home');
                        pathMassWeddDispensationChanceryGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddDispensationChanceryGroom'+ '-' + req.files.MassWeddDispensationChanceryGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddDispensationChanceryGroom.name));
                        req.files.path16 = pathMassWeddDispensationChanceryGroom
                        let MassWeddDispensationChanceryGroom = req.files.MassWeddDispensationChanceryGroom;
                        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path16}")`;
                        MassWeddDispensationChanceryGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddDispensationChanceryGroom' + '-' + req.files.MassWeddDispensationChanceryGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddDispensationChanceryGroom.name), function(err) {
                        
                        db.query(queryString1,(err,results,fields)=>{
                        if (err)
                        res.status(500).send(err); 
                        validationBrideStatus();
                                                                });
                                                            });
                            });
                        });
                        }
                    if(req.session.userWeddd.char_groomreligion =='No-Religion'){
                        console.log('No-Religion Groom');
                        pathMassWeddAffidOfFreedomGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddAffidOfFreedomGroom'+ '-' + req.files.MassWeddAffidOfFreedomGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddAffidOfFreedomGroom.name));
                        req.files.path17 = pathMassWeddAffidOfFreedomGroom
                        let MassWeddAffidOfFreedomGroom = req.files.MassWeddAffidOfFreedomGroom;
                        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path17}")`;
                        MassWeddAffidOfFreedomGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddAffidOfFreedomGroom' + '-' + req.files.MassWeddAffidOfFreedomGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddAffidOfFreedomGroom.name), function(err) {
                           
                        db.query(queryString1,(err,results,fields)=>{
                        // if (err)
                        // res.status(500).send(err); 
                        // return res.redirect('/guest/home');
                        pathMassWeddDispensationChanceryGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddDispensationChanceryGroom'+ '-' + req.files.MassWeddDispensationChanceryGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddDispensationChanceryGroom.name));
                        req.files.path18 = pathMassWeddDispensationChanceryGroom
                        let MassWeddDispensationChanceryGroom = req.files.MassWeddDispensationChanceryGroom;
                        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path18}")`;
                        MassWeddDispensationChanceryGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddDispensationChanceryGroom' + '-' + req.files.MassWeddDispensationChanceryGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddDispensationChanceryGroom.name), function(err) {
                           
                        db.query(queryString1,(err,results,fields)=>{
                        if (err)
                        res.status(500).send(err); 
                        validationBrideStatus();
                                                                    });
                                                                });
                                });
                            });
                            }
                    if(req.session.userWeddd.char_groomreligion =='Catholic'){
                         console.log('Catholic si Groom');
                         validationBrideStatus();
                        }
                        }
                    function validationBrideStatus(){
                    if(req.session.userWeddd.char_bridecivilstatus =='Widowed'){
                        pathMassWeddPrevMarrBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddPrevMarrBride'+ '-' + req.files.MassWeddPrevMarrBride.name + '-' + Date.now() + path.extname(req.files.MassWeddPrevMarrBride.name));
                        req.files.path19 = pathMassWeddPrevMarrBride
                        let MassWeddPrevMarrBride = req.files.MassWeddPrevMarrBride;
                        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path19}")`;
                        MassWeddPrevMarrBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddPrevMarrBride' + '-' + req.files.MassWeddPrevMarrBride.name + '-' + Date.now() + path.extname(req.files.MassWeddPrevMarrBride.name), function(err) {
                        
                        db.query(queryString1,(err,results,fields)=>{
                        // if (err)
                        // res.status(500).send(err); 
                        // return res.redirect('/guest/home');
                        pathMassWeddDeathCertBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddDeathCertBride'+ '-' + req.files.MassWeddDeathCertBride.name + '-' + Date.now() + path.extname(req.files.MassWeddDeathCertBride.name));
                        req.files.path20 = pathMassWeddDeathCertBride
                        let MassWeddDeathCertBride = req.files.MassWeddDeathCertBride;
                        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path20}")`;
                        MassWeddDeathCertBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddDeathCertBride' + '-' + req.files.MassWeddDeathCertBride.name + '-' + Date.now() + path.extname(req.files.MassWeddDeathCertBride.name), function(err) {
                        
                        db.query(queryString1,(err,results,fields)=>{
                        if (err)
                        res.status(500).send(err);
                        validationGroomStatus();
                                                                });
                                                            });
                            });
                        });
                        }

                    if(req.session.userWeddd.char_bridecivilstatus =='Divorced'){
                        pathMassWeddCertOfFreedomBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddCertOfFreedomBride'+ '-' + req.files.MassWeddCertOfFreedomBride.name + '-' + Date.now() + path.extname(req.files.MassWeddCertOfFreedomBride.name));
                        req.files.path21 = pathMassWeddCertOfFreedomBride
                        let MassWeddCertOfFreedomBride = req.files.MassWeddCertOfFreedomBride;
                        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path21}")`;
                        MassWeddCertOfFreedomBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddCertOfFreedomBride' + '-' + req.files.MassWeddCertOfFreedomBride.name + '-' + Date.now() + path.extname(req.files.MassWeddCertOfFreedomBride.name), function(err) {
                        
                        db.query(queryString1,(err,results,fields)=>{
                        // if (err)
                        // res.status(500).send(err); 
                        // return res.redirect('/guest/home');
                        pathMassWeddDecreeDivorceBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddDecreeDivorceBride'+ '-' + req.files.MassWeddDecreeDivorceBride.name + '-' + Date.now() + path.extname(req.files.MassWeddDecreeDivorceBride.name));
                        req.files.path22 = pathMassWeddDecreeDivorceBride
                        let MassWeddDecreeDivorceBride = req.files.MassWeddDecreeDivorceBride;
                        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path22}")`;
                        MassWeddDecreeDivorceBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddDecreeDivorceBride' + '-' + req.files.MassWeddDecreeDivorceBride.name + '-' + Date.now() + path.extname(req.files.MassWeddDecreeDivorceBride.name), function(err) {
                        
                        db.query(queryString1,(err,results,fields)=>{

                        pathMassWeddAnnulDecBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddAnnulDecBride'+ '-' + req.files.MassWeddAnnulDecBride.name + '-' + Date.now() + path.extname(req.files.MassWeddAnnulDecBride.name));
                        req.files.path23 = pathMassWeddAnnulDecBride
                        let MassWeddAnnulDecBride = req.files.MassWeddAnnulDecBride;
                        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path23}")`;
                        MassWeddAnnulDecBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddAnnulDecBride' + '-' + req.files.MassWeddAnnulDecBride.name + '-' + Date.now() + path.extname(req.files.MassWeddAnnulDecBride.name), function(err) {
                        
                        db.query(queryString1,(err,results,fields)=>{

                        pathMassWeddMarrCertBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddMarrCertBride'+ '-' + req.files.MassWeddMarrCertBride.name + '-' + Date.now() + path.extname(req.files.MassWeddMarrCertBride.name));
                        req.files.path24 = pathMassWeddMarrCertBride
                        let MassWeddMarrCertBride = req.files.MassWeddMarrCertBride;
                        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path24}")`;
                        MassWeddMarrCertBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddMarrCertBride' + '-' + req.files.MassWeddMarrCertBride.name + '-' + Date.now() + path.extname(req.files.MassWeddMarrCertBride.name), function(err) {
                        
                        db.query(queryString1,(err,results,fields)=>{
                        if (err)
                        res.status(500).send(err);
                        validationGroomStatus();
                                                                }); });
                            });
                        });
                                    });});
                                }); });
                        }

                    if(req.session.userWeddd.char_bridecivilstatus =='Single/Never Married'){
                        console.log("First time ni ate mo XD");     
                        validationGroomStatus();  
                        }
                    if(req.session.userWeddd.char_bridecivilstatus =='Married'){
                        console.log("Kasal na sila ate mo XD");     
                        validationGroomStatus();  
                        }
                        }
                        
                    function validationGroomStatus(){
                    if(req.session.userWeddd.char_groomcivilstatus =='Widowed'){
                        pathMassWeddPrevMarrGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddPrevMarrGroom'+ '-' + req.files.MassWeddPrevMarrGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddPrevMarrGroom.name));
                        req.files.path25 = pathMassWeddPrevMarrGroom
                        let MassWeddPrevMarrGroom = req.files.MassWeddPrevMarrGroom;
                        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path25}")`;
                        MassWeddPrevMarrGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddPrevMarrGroom' + '-' + req.files.MassWeddPrevMarrGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddPrevMarrGroom.name), function(err) {
                        
                        db.query(queryString1,(err,results,fields)=>{
                        // if (err)
                        // res.status(500).send(err); 
                        // return res.redirect('/guest/home');
                        pathMassWeddDeathCertGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddDeathCertGroom'+ '-' + req.files.MassWeddDeathCertGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddDeathCertGroom.name));
                        req.files.path26 = pathMassWeddDeathCertGroom
                        let MassWeddDeathCertGroom = req.files.MassWeddDeathCertGroom;
                        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path26}")`;
                        MassWeddDeathCertGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddDeathCertGroom' + '-' + req.files.MassWeddDeathCertGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddDeathCertGroom.name), function(err) {
                        
                        db.query(queryString1,(err,results,fields)=>{
                        if (err)
                        res.status(500).send(err);
                        validationBrideJob();
                                                                });
                                                            });
                            });
                        });
                        }

                    if(req.session.userWeddd.char_groomcivilstatus =='Divorced'){
                        pathMassWeddCertOfFreedomGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddCertOfFreedomGroom'+ '-' + req.files.MassWeddCertOfFreedomGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddCertOfFreedomGroom.name));
                        req.files.path27 = pathMassWeddCertOfFreedomGroom
                        let MassWeddCertOfFreedomGroom = req.files.MassWeddCertOfFreedomGroom;
                        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path27}")`;
                        MassWeddCertOfFreedomGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddCertOfFreedomGroom' + '-' + req.files.MassWeddCertOfFreedomGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddCertOfFreedomGroom.name), function(err) {
                        
                        db.query(queryString1,(err,results,fields)=>{
                        // if (err)
                        // res.status(500).send(err); 
                        // return res.redirect('/guest/home');
                        pathMassWeddDecreeDivorceGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddDecreeDivorceGroom'+ '-' + req.files.MassWeddDecreeDivorceGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddDecreeDivorceGroom.name));
                        req.files.path28 = pathMassWeddDecreeDivorceGroom
                        let MassWeddDecreeDivorceGroom = req.files.MassWeddDecreeDivorceGroom;
                        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path28}")`;
                        MassWeddDecreeDivorceGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddDecreeDivorceGroom' + '-' + req.files.MassWeddDecreeDivorceGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddDecreeDivorceGroom.name), function(err) {
                        
                        db.query(queryString1,(err,results,fields)=>{

                        pathMassWeddAnnulDecGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddAnnulDecGroom'+ '-' + req.files.MassWeddAnnulDecGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddAnnulDecGroom.name));
                        req.files.path29 = pathMassWeddAnnulDecGroom
                        let MassWeddAnnulDecGroom = req.files.MassWeddAnnulDecGroom;
                        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path29}")`;
                        MassWeddAnnulDecGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddAnnulDecGroom' + '-' + req.files.MassWeddAnnulDecGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddAnnulDecGroom.name), function(err) {
                        
                        db.query(queryString1,(err,results,fields)=>{

                        pathMassWeddMarrCertGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddMarrCertGroom'+ '-' + req.files.MassWeddMarrCertGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddMarrCertGroom.name));
                        req.files.path30 = pathMassWeddMarrCertGroom
                        let MassWeddMarrCertGroom = req.files.MassWeddMarrCertGroom;
                        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path30}")`;
                        MassWeddMarrCertGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddMarrCertGroom' + '-' + req.files.MassWeddMarrCertGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddMarrCertGroom.name), function(err) {
                        
                        db.query(queryString1,(err,results,fields)=>{
                        if (err)
                        res.status(500).send(err);
                        validationBrideJob();
                                                                }); });
                            });
                        });
                                    });});
                                }); });
                        }

                    if(req.session.userWeddd.char_groomcivilstatus =='Single/Never Married'){
                        console.log("First time ni kuya mo XD");     
                        validationBrideJob();;  
                        }
                    if(req.session.userWeddd.char_groomcivilstatus =='Married'){
                        console.log("Kasal na sila kuya mo XD");     
                        validationBrideJob();  
                        }
                        }  

                    function validationBrideJob(){
                    if(req.session.userWeddd.varchar_brideoccupation=='Military'){
                        pathMassWeddMilClearBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddMilClearBride'+ '-' + req.files.MassWeddMilClearBride.name + '-' + Date.now() + path.extname(req.files.MassWeddMilClearBride.name));
                        req.files.path31 = pathMassWeddMilClearBride
                        let MassWeddMilClearBride = req.files.MassWeddMilClearBride;
                        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path31}")`;
                        MassWeddMilClearBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddMilClearBride' + '-' + req.files.MassWeddMilClearBride.name + '-' + Date.now() + path.extname(req.files.MassWeddMilClearBride.name), function(err) {
                        
                        db.query(queryString1,(err,results,fields)=>{
                        if (err)
                        res.status(500).send(err);
                        validationGroomJob();
                                                                }); });
                    }
                    else
                        {
                        console.log("di sya sundalo");
                        validationGroomJob();

                        }
                    }

                    function validationGroomJob(){
                    if(req.session.userWeddd.varchar_groomoccupation=='Military'){
                        pathMassWeddMilClearGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddMilClearGroom'+ '-' + req.files.MassWeddMilClearGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddMilClearGroom.name));
                        req.files.path32 = pathMassWeddMilClearGroom
                        let MassWeddMilClearGroom = req.files.MassWeddMilClearGroom;
                        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path32}")`;
                        MassWeddMilClearGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddMilClearGroom' + '-' + req.files.MassWeddMilClearGroom.name + '-' + Date.now() + path.extname(req.files.MassWeddMilClearGroom.name), function(err) {
                        
                        db.query(queryString1,(err,results,fields)=>{
                        if (err)
                        res.status(500).send(err);
                        validationcoupleChurchStatus();
                                                                }); });
                    }
                    else
                        {
                        console.log("di sya sundalo");
                        validationcoupleChurchStatus();

                        }
                    }

                    function validationcoupleChurchStatus(){
                        if(req.session.userWeddd.bool_ifchurchmarried==1){
                            pathMassWeddChurchContract = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddChurchContract'+ '-' + req.files.MassWeddChurchContract.name + '-' + Date.now() + path.extname(req.files.MassWeddChurchContract.name));
                            req.files.path33 = pathMassWeddChurchContract
                            let MassWeddChurchContract = req.files.MassWeddChurchContract;
                            var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path33}")`;
                            MassWeddChurchContract.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddChurchContract' + '-' + req.files.MassWeddChurchContract.name + '-' + Date.now() + path.extname(req.files.MassWeddChurchContract.name), function(err) {
                            
                            db.query(queryString1,(err,results,fields)=>{
                            if (err)
                            res.status(500).send(err);
                            validationcoupleCivilStatus();
                                                                    }); });
                        }
                        else
                            {
                            console.log("di pa sila kasal dati sa church");
                            validationcoupleCivilStatus();
                            return res.redirect('/guest/home');

                            }
                        }
                    
                        function validationcoupleCivilStatus(){
                            if(req.session.userWeddd.bool_ifcivillymarried==1){
                                pathMassWeddCivilContract = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'MassWeddCivilContract'+ '-' + req.files.MassWeddCivilContract.name + '-' + Date.now() + path.extname(req.files.MassWeddCivilContract.name));
                                req.files.path34 = pathMassWeddCivilContract
                                let MassWeddCivilContract = req.files.MassWeddCivilContract;
                                var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path34}")`;
                                MassWeddCivilContract.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'MassWeddCivilContract' + '-' + req.files.MassWeddCivilContract.name + '-' + Date.now() + path.extname(req.files.MassWeddCivilContract.name), function(err) {
                                
                                db.query(queryString1,(err,results,fields)=>{
                                if (err)
                                res.status(500).send(err);
                                return res.redirect('/guest/home');
                                                                        }); });
                            }
                            else
                                {
                                console.log("di pa sila kasal dati sa west");
                                return res.redirect('/guest/home');
    
                                }
                            }
                                    });
                                });
                            });       
                        });  
                    });
                });
            });
        });
    });
});


    router.post('/privateweddingrequirements/:int_reservationid', function(req, res) {
	
        //res.end('File is uploaded')
        console.log(req.session.userWeddd.bool_brideifpregnant);
        console.log(req.body, 'Body');
        console.log(req.files, 'Files');
        console.log(req.files.PrivateWeddbaptismCert);
        
        
		//console.log(req.files.anointingBirthCert.mv);
		let PrivateWeddbaptismCert = req.files.PrivateWeddbaptismCert;

            PrivateWeddbaptismCert.mv(__dirname + '/uploads/' + req.session.user.int_reservationid+'-' + 'PrivateWeddbaptismCert'+ '-' + req.files.PrivateWeddbaptismCert.name + '-' + Date.now() + path.extname(req.files.PrivateWeddbaptismCert.name), function(err) {
		
		    pathPrivateWeddbaptismCert = (__dirname + '/uploads/' + req.session.user.int_reservationidint_reservationid +'-' + 'PrivateWeddbaptismCert'+ '-' + req.files.PrivateWeddbaptismCert.name + '-' + Date.now() + path.extname(req.files.PrivateWeddbaptismCert.name));
		
        console.log(pathPrivateWeddbaptismCert);
        
		req.files.path1 = pathPrivateWeddbaptismCert
		var queryString = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path1}")`;
		
		    db.query(queryString,(err,results,fields)=>{
        
                

		console.log(req.files.PrivateWeddConfirmationCert);
        
        pathPrivateWeddConfirmationCert = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddConfirmationCert'+ '-' + req.files.PrivateWeddConfirmationCert.name + '-' + Date.now() + path.extname(req.files.PrivateWeddConfirmationCert.name));
        req.files.path2 = pathPrivateWeddConfirmationCert
		
        let PrivateWeddConfirmationCert = req.files.PrivateWeddConfirmationCert;
		    var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path2}")`;
		    PrivateWeddConfirmationCert.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddConfirmationCert' + '-' + req.files.PrivateWeddConfirmationCert.name + '-' + Date.now() + path.extname(req.files.PrivateWeddConfirmationCert.name), function(err) {
				
		    db.query(queryString1,(err,results,fields)=>{
		    if (err)
            res.status(500).send(err);	
        


        pathPrivateWeddBirthCert = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddBirthCert'+ '-' + req.files.PrivateWeddBirthCert.name + '-' + Date.now() + path.extname(req.files.PrivateWeddBirthCert.name));
        req.files.path3 = pathPrivateWeddBirthCert
		
        let PrivateWeddBirthCert = req.files.PrivateWeddBirthCert;
		    var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path3}")`;
		    PrivateWeddBirthCert.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddBirthCert' + '-' + req.files.PrivateWeddBirthCert.name + '-' + Date.now() + path.extname(req.files.PrivateWeddBirthCert.name), function(err) {
		
		    db.query(queryString1,(err,results,fields)=>{
		    if (err)
            res.status(500).send(err);	
        


        pathPrivateWeddMarriageLicense = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddMarriageLicense'+ '-' + req.files.PrivateWeddMarriageLicense.name + '-' + Date.now() + path.extname(req.files.PrivateWeddMarriageLicense.name));
        req.files.path4 = pathPrivateWeddMarriageLicense
		
        let PrivateWeddMarriageLicense = req.files.PrivateWeddMarriageLicense;
		    var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path4}")`;
		    PrivateWeddMarriageLicense.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddMarriageLicense' + '-' + req.files.PrivateWeddMarriageLicense.name + '-' + Date.now() + path.extname(req.files.PrivateWeddMarriageLicense.name), function(err) {
				
		    db.query(queryString1,(err,results,fields)=>{
		    if (err)
            res.status(500).send(err);
        


        pathPrivateWeddCENOMAR = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddCENOMAR'+ '-' + req.files.PrivateWeddCENOMAR.name + '-' + Date.now() + path.extname(req.files.PrivateWeddCENOMAR.name));
        req.files.path5 = pathPrivateWeddCENOMAR
		
        let PrivateWeddCENOMAR = req.files.PrivateWeddCENOMAR;
		    var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path5}")`;
		    PrivateWeddCENOMAR.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddCENOMAR' + '-' + req.files.PrivateWeddCENOMAR.name + '-' + Date.now() + path.extname(req.files.PrivateWeddCENOMAR.name), function(err) {
		
		    db.query(queryString1,(err,results,fields)=>{
		    if (err)
            res.status(500).send(err);
            // res.render('guest/submittingforms/views/submittingforms');
            // return res.redirect('/guest/home');
            validationPrivateWeddingPregnant();
        });


            function validationPrivateWeddingPregnant(){
                console.log('Nandito ako sa loob ng Validation Private Wedding Function Pregnant');
                console.log(req.session.userWeddd.bool_brideifpregnant);
                if(req.session.userWeddd.bool_brideifpregnant == 1){
                pathPrivateWeddClearanceChancery = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddClearanceChancery'+ '-' + req.files.PrivateWeddClearanceChancery.name + '-' + Date.now() + path.extname(req.files.PrivateWeddClearanceChancery.name));
                req.files.path6 = pathPrivateWeddClearanceChancery
                let PrivateWeddClearanceChancery = req.files.PrivateWeddClearanceChancery;
                var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path6}")`;
                PrivateWeddClearanceChancery.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddClearanceChancery' + '-' + req.files.PrivateWeddClearanceChancery.name + '-' + Date.now() + path.extname(req.files.PrivateWeddClearanceChancery.name), function(err) {
                
                db.query(queryString1,(err,results,fields)=>{
                if (err)
                res.status(500).send(err);
                // return res.redirect('/guest/home');
                // res.redirect('guest/home');
                validationBrideReligion(); 
                });
                // console.log('Nandito na siya sa pagtapos ng validationPrivateWeddingPregnant tas dat punta siya sa BrideReligion');
                // return res.redirect('/guest/home');
                                                    });
                                                }
                else{
                    console.log('Di siya preggy function');
                    // return res.redirect('/guest/home');
                    validationBrideReligion();
                }
                }

                function validationBrideReligion(){
                console.log('Nandito siya sa Function Bride ng Religion');
                if(req.session.userWeddd.char_bridereligion =='Non-Catholic'){
                    pathPrivateWeddCertOfFreedomBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddCertOfFreedomBride'+ '-' + req.files.PrivateWeddCertOfFreedomBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddCertOfFreedomBride.name));
                    req.files.path7 = pathPrivateWeddCertOfFreedomBride
                    let PrivateWeddCertOfFreedomBride = req.files.PrivateWeddCertOfFreedomBride;
                    var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path7}")`;
                    PrivateWeddCertOfFreedomBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddCertOfFreedomBride' + '-' + req.files.PrivateWeddCertOfFreedomBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddCertOfFreedomBride.name), function(err) {
                    
                    db.query(queryString1,(err,results,fields)=>{
                    if (err)
                    res.status(500).send(err); 
                    // validationGroomReligion();
                    // return res.redirect('/guest/home');
                                                            });
                                                        });
                    pathPrivateWeddPermissionMixedBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddPermissionMixedBride'+ '-' + req.files.PrivateWeddPermissionMixedBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddPermissionMixedBride.name));
                    req.files.path8 = pathPrivateWeddPermissionMixedBride
                    let PrivateWeddPermissionMixedBride = req.files.PrivateWeddPermissionMixedBride;
                    var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path8}")`;
                    PrivateWeddPermissionMixedBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddPermissionMixedBride' + '-' + req.files.PrivateWeddPermissionMixedBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddPermissionMixedBride.name), function(err) {
                    
                    db.query(queryString1,(err,results,fields)=>{
                    if (err)
                    res.status(500).send(err); 
                    // validationGroomReligion();
                    // return res.redirect('/guest/home');
                                                            });
                                                        });
                    console.log('Non Catholic Bride');
                    validationGroomReligion();
                    }
                if(req.session.userWeddd.char_bridereligion =='Non-Christian'){
                    pathPrivateWeddCertOfFreedomBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddCertOfFreedomBride'+ '-' + req.files.PrivateWeddCertOfFreedomBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddCertOfFreedomBride.name));
                    req.files.path9 = pathPrivateWeddCertOfFreedomBride
                    let PrivateWeddCertOfFreedomBride = req.files.PrivateWeddCertOfFreedomBride;
                    var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path9}")`;
                    PrivateWeddCertOfFreedomBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddCertOfFreedomBride' + '-' + req.files.PrivateWeddCertOfFreedomBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddCertOfFreedomBride.name), function(err) {
                      
                    db.query(queryString1,(err,results,fields)=>{
                    if (err)
                    res.status(500).send(err); 
                    // validationGroomReligion();
                    // return res.redirect('/guest/home');
                                                             });
                                                          });
                    pathPrivateWeddDispensationChanceryBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddDispensationChanceryBride'+ '-' + req.files.PrivateWeddDispensationChanceryBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddDispensationChanceryBride.name));
                    req.files.path10 = pathPrivateWeddDispensationChanceryBride
                    let PrivateWeddDispensationChanceryBride = req.files.PrivateWeddDispensationChanceryBride;
                    var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path10}")`;
                    PrivateWeddDispensationChanceryBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddDispensationChanceryBride' + '-' + req.files.PrivateWeddDispensationChanceryBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddDispensationChanceryBride.name), function(err) {
                        
                    db.query(queryString1,(err,results,fields)=>{
                    if (err)
                    res.status(500).send(err); 
                    // validationGroomReligion();
                    // return res.redirect('/guest/home');
                                                           });
                                                       });
                    console.log('Non-Christian Bride');
                    validationGroomReligion();
                    }

                if(req.session.userWeddd.char_bridereligion =='No-Religion'){
                    console.log('No-Religion Bride');
                    pathPrivateWeddAffidOfFreedomBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddAffidOfFreedomBride'+ '-' + req.files.PrivateWeddAffidOfFreedomBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddAffidOfFreedomBride.name));
                    req.files.path11 = pathPrivateWeddAffidOfFreedomBride
                    let PrivateWeddAffidOfFreedomBride = req.files.PrivateWeddAffidOfFreedomBride;
                    var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path11}")`;
                    PrivateWeddAffidOfFreedomBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddAffidOfFreedomBride' + '-' + req.files.PrivateWeddAffidOfFreedomBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddAffidOfFreedomBride.name), function(err) {
                        
                    db.query(queryString1,(err,results,fields)=>{
                    // if (err)
                    // res.status(500).send(err); 
                    // return res.redirect('/guest/home');
                    pathPrivateWeddDispensationChanceryBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddDispensationChanceryBride'+ '-' + req.files.PrivateWeddDispensationChanceryBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddDispensationChanceryBride.name));
                    req.files.path12 = pathPrivateWeddDispensationChanceryBride
                    let PrivateWeddDispensationChanceryBride = req.files.PrivateWeddDispensationChanceryBride;
                    var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path12}")`;
                    PrivateWeddDispensationChanceryBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddDispensationChanceryBride' + '-' + req.files.PrivateWeddDispensationChanceryBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddDispensationChanceryBride.name), function(err) {
                      
                    db.query(queryString1,(err,results,fields)=>{
                    if (err)
                    res.status(500).send(err);
                    validationGroomReligion();
                    //return res.redirect('/guest/home');
                                                           });
                                                      });
                             });
                       });
                    }
                if(req.session.userWeddd.char_bridereligion =='Catholic'){
                    console.log('Catholic si Bride');
                    validationGroomReligion();
                    // return res.redirect('/guest/home');
                    }
                }

                function validationGroomReligion(){
                        console.log('Nandito siya sa Function ng Groom Religion(NON-CATHOLIC)');
                        if(req.session.userWeddd.char_groomreligion =='Non-Catholic'){
                        pathPrivateWeddCertOfFreedomGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddCertOfFreedomGroom'+ '-' + req.files.PrivateWeddCertOfFreedomGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddCertOfFreedomGroom.name));
                        req.files.path13 = pathPrivateWeddCertOfFreedomGroom
                        let PrivateWeddCertOfFreedomGroom = req.files.PrivateWeddCertOfFreedomGroom;
                        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path13}")`;
                        PrivateWeddCertOfFreedomGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddCertOfFreedomGroom' + '-' + req.files.PrivateWeddCertOfFreedomGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddCertOfFreedomGroom.name), function(err) {
                        
                        db.query(queryString1,(err,results,fields)=>{
                        // if (err)
                        // res.status(500).send(err); 
                        // return res.redirect('/guest/home');
                        pathPrivateWeddPermissionMixedGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddPermissionMixedGroom'+ '-' + req.files.PrivateWeddPermissionMixedGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddPermissionMixedGroom.name));
                        req.files.path14 = pathPrivateWeddPermissionMixedGroom
                        let PrivateWeddPermissionMixedGroom = req.files.PrivateWeddPermissionMixedGroom;
                        var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path14}")`;
                        PrivateWeddPermissionMixedGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddPermissionMixedGroom' + '-' + req.files.PrivateWeddPermissionMixedGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddPermissionMixedGroom.name), function(err) {
                        
                        db.query(queryString1,(err,results,fields)=>{
                        if (err)
                        res.status(500).send(err);
                        validationBrideStatus();
                                                                });
                                                            });
                            });
                        });
                        }
                        if(req.session.userWeddd.char_groomreligion =='Non-Christian'){
                            console.log('Non-Christian Groom');
                            pathPrivateWeddCertOfFreedomGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddCertOfFreedomGroom'+ '-' + req.files.PrivateWeddCertOfFreedomGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddCertOfFreedomGroom.name));
                            req.files.path15 = pathPrivateWeddCertOfFreedomGroom
                            let PrivateWeddCertOfFreedomGroom = req.files.PrivateWeddCertOfFreedomGroom;
                            var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path15}")`;
                            PrivateWeddCertOfFreedomGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddCertOfFreedomGroom' + '-' + req.files.PrivateWeddCertOfFreedomGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddCertOfFreedomGroom.name), function(err) {
                            
                            db.query(queryString1,(err,results,fields)=>{
                            // if (err)
                            // res.status(500).send(err); 
                            // return res.redirect('/guest/home');
                            pathPrivateWeddDispensationChanceryGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddDispensationChanceryGroom'+ '-' + req.files.PrivateWeddDispensationChanceryGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddDispensationChanceryGroom.name));
                            req.files.path16 = pathPrivateWeddDispensationChanceryGroom
                            let PrivateWeddDispensationChanceryGroom = req.files.PrivateWeddDispensationChanceryGroom;
                            var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path16}")`;
                            PrivateWeddDispensationChanceryGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddDispensationChanceryGroom' + '-' + req.files.PrivateWeddDispensationChanceryGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddDispensationChanceryGroom.name), function(err) {
                            
                            db.query(queryString1,(err,results,fields)=>{
                            if (err)
                            res.status(500).send(err); 
                            validationBrideStatus();
                                                                    });
                                                                });
                                });
                            });
                            }
                        if(req.session.userWeddd.char_groomreligion =='No-Religion'){
                            console.log('No-Religion Groom');
                            pathPrivateWeddAffidOfFreedomGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddAffidOfFreedomGroom'+ '-' + req.files.PrivateWeddAffidOfFreedomGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddAffidOfFreedomGroom.name));
                            req.files.path17 = pathPrivateWeddAffidOfFreedomGroom
                            let PrivateWeddAffidOfFreedomGroom = req.files.PrivateWeddAffidOfFreedomGroom;
                            var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path17}")`;
                            PrivateWeddAffidOfFreedomGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddAffidOfFreedomGroom' + '-' + req.files.PrivateWeddAffidOfFreedomGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddAffidOfFreedomGroom.name), function(err) {
                               
                            db.query(queryString1,(err,results,fields)=>{
                            // if (err)
                            // res.status(500).send(err); 
                            // return res.redirect('/guest/home');
                            pathPrivateWeddDispensationChanceryGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddDispensationChanceryGroom'+ '-' + req.files.PrivateWeddDispensationChanceryGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddDispensationChanceryGroom.name));
                            req.files.path18 = pathPrivateWeddDispensationChanceryGroom
                            let PrivateWeddDispensationChanceryGroom = req.files.PrivateWeddDispensationChanceryGroom;
                            var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path18}")`;
                            PrivateWeddDispensationChanceryGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddDispensationChanceryGroom' + '-' + req.files.PrivateWeddDispensationChanceryGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddDispensationChanceryGroom.name), function(err) {
                               
                            db.query(queryString1,(err,results,fields)=>{
                            if (err)
                            res.status(500).send(err); 
                            validationBrideStatus();
                                                                        });
                                                                    });
                                    });
                                });
                                }
                        if(req.session.userWeddd.char_groomreligion =='Catholic'){
                             console.log('Catholic si Groom');
                             validationBrideStatus();
                            }
                            }
                        function validationBrideStatus(){
                        if(req.session.userWeddd.char_bridecivilstatus =='Widowed'){
                            pathPrivateWeddPrevMarrBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddPrevMarrBride'+ '-' + req.files.PrivateWeddPrevMarrBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddPrevMarrBride.name));
                            req.files.path19 = pathPrivateWeddPrevMarrBride
                            let PrivateWeddPrevMarrBride = req.files.PrivateWeddPrevMarrBride;
                            var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path19}")`;
                            PrivateWeddPrevMarrBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddPrevMarrBride' + '-' + req.files.PrivateWeddPrevMarrBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddPrevMarrBride.name), function(err) {
                            
                            db.query(queryString1,(err,results,fields)=>{
                            // if (err)
                            // res.status(500).send(err); 
                            // return res.redirect('/guest/home');
                            pathPrivateWeddDeathCertBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddDeathCertBride'+ '-' + req.files.PrivateWeddDeathCertBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddDeathCertBride.name));
                            req.files.path20 = pathPrivateWeddDeathCertBride
                            let PrivateWeddDeathCertBride = req.files.PrivateWeddDeathCertBride;
                            var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path20}")`;
                            PrivateWeddDeathCertBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddDeathCertBride' + '-' + req.files.PrivateWeddDeathCertBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddDeathCertBride.name), function(err) {
                            
                            db.query(queryString1,(err,results,fields)=>{
                            if (err)
                            res.status(500).send(err);
                            validationGroomStatus();
                                                                    });
                                                                });
                                });
                            });
                            }

                        if(req.session.userWeddd.char_bridecivilstatus =='Divorced'){
                            pathPrivateWeddCertOfFreedomBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddCertOfFreedomBride'+ '-' + req.files.PrivateWeddCertOfFreedomBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddCertOfFreedomBride.name));
                            req.files.path21 = pathPrivateWeddCertOfFreedomBride
                            let PrivateWeddCertOfFreedomBride = req.files.PrivateWeddCertOfFreedomBride;
                            var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path21}")`;
                            PrivateWeddCertOfFreedomBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddCertOfFreedomBride' + '-' + req.files.PrivateWeddCertOfFreedomBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddCertOfFreedomBride.name), function(err) {
                            
                            db.query(queryString1,(err,results,fields)=>{
                            // if (err)
                            // res.status(500).send(err); 
                            // return res.redirect('/guest/home');
                            pathPrivateWeddDecreeDivorceBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddDecreeDivorceBride'+ '-' + req.files.PrivateWeddDecreeDivorceBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddDecreeDivorceBride.name));
                            req.files.path22 = pathPrivateWeddDecreeDivorceBride
                            let PrivateWeddDecreeDivorceBride = req.files.PrivateWeddDecreeDivorceBride;
                            var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path22}")`;
                            PrivateWeddDecreeDivorceBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddDecreeDivorceBride' + '-' + req.files.PrivateWeddDecreeDivorceBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddDecreeDivorceBride.name), function(err) {
                            
                            db.query(queryString1,(err,results,fields)=>{

                            pathPrivateWeddAnnulDecBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddAnnulDecBride'+ '-' + req.files.PrivateWeddAnnulDecBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddAnnulDecBride.name));
                            req.files.path23 = pathPrivateWeddAnnulDecBride
                            let PrivateWeddAnnulDecBride = req.files.PrivateWeddAnnulDecBride;
                            var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path23}")`;
                            PrivateWeddAnnulDecBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddAnnulDecBride' + '-' + req.files.PrivateWeddAnnulDecBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddAnnulDecBride.name), function(err) {
                            
                            db.query(queryString1,(err,results,fields)=>{

                            pathPrivateWeddMarrCertBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddMarrCertBride'+ '-' + req.files.PrivateWeddMarrCertBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddMarrCertBride.name));
                            req.files.path24 = pathPrivateWeddMarrCertBride
                            let PrivateWeddMarrCertBride = req.files.PrivateWeddMarrCertBride;
                            var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path24}")`;
                            PrivateWeddMarrCertBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddMarrCertBride' + '-' + req.files.PrivateWeddMarrCertBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddMarrCertBride.name), function(err) {
                            
                            db.query(queryString1,(err,results,fields)=>{
                            if (err)
                            res.status(500).send(err);
                            validationGroomStatus();
                                                                    }); });
                                });
                            });
                                        });});
                                    }); });
                            }

                        if(req.session.userWeddd.char_bridecivilstatus =='Single/Never Married'){
                            console.log("First time ni ate mo XD");     
                            validationGroomStatus();  
                            }
                        if(req.session.userWeddd.char_bridecivilstatus =='Married'){
                            console.log("Kasal na sila ate mo XD");     
                            validationGroomStatus();  
                            }
                            }
                            
                        function validationGroomStatus(){
                        if(req.session.userWeddd.char_groomcivilstatus =='Widowed'){
                            pathPrivateWeddPrevMarrGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddPrevMarrGroom'+ '-' + req.files.PrivateWeddPrevMarrGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddPrevMarrGroom.name));
                            req.files.path25 = pathPrivateWeddPrevMarrGroom
                            let PrivateWeddPrevMarrGroom = req.files.PrivateWeddPrevMarrGroom;
                            var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path25}")`;
                            PrivateWeddPrevMarrGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddPrevMarrGroom' + '-' + req.files.PrivateWeddPrevMarrGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddPrevMarrGroom.name), function(err) {
                            
                            db.query(queryString1,(err,results,fields)=>{
                            // if (err)
                            // res.status(500).send(err); 
                            // return res.redirect('/guest/home');
                            pathPrivateWeddDeathCertGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddDeathCertGroom'+ '-' + req.files.PrivateWeddDeathCertGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddDeathCertGroom.name));
                            req.files.path26 = pathPrivateWeddDeathCertGroom
                            let PrivateWeddDeathCertGroom = req.files.PrivateWeddDeathCertGroom;
                            var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path26}")`;
                            PrivateWeddDeathCertGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddDeathCertGroom' + '-' + req.files.PrivateWeddDeathCertGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddDeathCertGroom.name), function(err) {
                            
                            db.query(queryString1,(err,results,fields)=>{
                            if (err)
                            res.status(500).send(err);
                            validationBrideJob();
                                                                    });
                                                                });
                                });
                            });
                            }

                        if(req.session.userWeddd.char_groomcivilstatus =='Divorced'){
                            pathPrivateWeddCertOfFreedomGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddCertOfFreedomGroom'+ '-' + req.files.PrivateWeddCertOfFreedomGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddCertOfFreedomGroom.name));
                            req.files.path27 = pathPrivateWeddCertOfFreedomGroom
                            let PrivateWeddCertOfFreedomGroom = req.files.PrivateWeddCertOfFreedomGroom;
                            var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path27}")`;
                            PrivateWeddCertOfFreedomGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddCertOfFreedomGroom' + '-' + req.files.PrivateWeddCertOfFreedomGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddCertOfFreedomGroom.name), function(err) {
                            
                            db.query(queryString1,(err,results,fields)=>{
                            // if (err)
                            // res.status(500).send(err); 
                            // return res.redirect('/guest/home');
                            pathPrivateWeddDecreeDivorceGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddDecreeDivorceGroom'+ '-' + req.files.PrivateWeddDecreeDivorceGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddDecreeDivorceGroom.name));
                            req.files.path28 = pathPrivateWeddDecreeDivorceGroom
                            let PrivateWeddDecreeDivorceGroom = req.files.PrivateWeddDecreeDivorceGroom;
                            var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path28}")`;
                            PrivateWeddDecreeDivorceGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddDecreeDivorceGroom' + '-' + req.files.PrivateWeddDecreeDivorceGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddDecreeDivorceGroom.name), function(err) {
                            
                            db.query(queryString1,(err,results,fields)=>{

                            pathPrivateWeddAnnulDecGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddAnnulDecGroom'+ '-' + req.files.PrivateWeddAnnulDecGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddAnnulDecGroom.name));
                            req.files.path29 = pathPrivateWeddAnnulDecGroom
                            let PrivateWeddAnnulDecGroom = req.files.PrivateWeddAnnulDecGroom;
                            var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path29}")`;
                            PrivateWeddAnnulDecGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddAnnulDecGroom' + '-' + req.files.PrivateWeddAnnulDecGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddAnnulDecGroom.name), function(err) {
                            
                            db.query(queryString1,(err,results,fields)=>{

                            pathPrivateWeddMarrCertGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddMarrCertGroom'+ '-' + req.files.PrivateWeddMarrCertGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddMarrCertGroom.name));
                            req.files.path30 = pathPrivateWeddMarrCertGroom
                            let PrivateWeddMarrCertGroom = req.files.PrivateWeddMarrCertGroom;
                            var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path30}")`;
                            PrivateWeddMarrCertGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddMarrCertGroom' + '-' + req.files.PrivateWeddMarrCertGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddMarrCertGroom.name), function(err) {
                            
                            db.query(queryString1,(err,results,fields)=>{
                            if (err)
                            res.status(500).send(err);
                            validationBrideJob();
                                                                    }); });
                                });
                            });
                                        });});
                                    }); });
                            }

                        if(req.session.userWeddd.char_groomcivilstatus =='Single/Never Married'){
                            console.log("First time ni kuya mo XD");     
                            validationBrideJob();;  
                            }
                        if(req.session.userWeddd.char_groomcivilstatus =='Married'){
                            console.log("Kasal na sila kuya mo XD");     
                            validationBrideJob();  
                            }
                            }  

                        function validationBrideJob(){
                        if(req.session.userWeddd.varchar_brideoccupation=='Military'){
                            pathPrivateWeddMilClearBride = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddMilClearBride'+ '-' + req.files.PrivateWeddMilClearBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddMilClearBride.name));
                            req.files.path31 = pathPrivateWeddMilClearBride
                            let PrivateWeddMilClearBride = req.files.PrivateWeddMilClearBride;
                            var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path31}")`;
                            PrivateWeddMilClearBride.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddMilClearBride' + '-' + req.files.PrivateWeddMilClearBride.name + '-' + Date.now() + path.extname(req.files.PrivateWeddMilClearBride.name), function(err) {
                            
                            db.query(queryString1,(err,results,fields)=>{
                            if (err)
                            res.status(500).send(err);
                            validationGroomJob();
                                                                    }); });
                        }
                        else
                            {
                            console.log("di sya sundalo");
                            validationGroomJob();

                            }
                        }

                        function validationGroomJob(){
                        if(req.session.userWeddd.varchar_groomoccupation=='Military'){
                            pathPrivateWeddMilClearGroom = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddMilClearGroom'+ '-' + req.files.PrivateWeddMilClearGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddMilClearGroom.name));
                            req.files.path32 = pathPrivateWeddMilClearGroom
                            let PrivateWeddMilClearGroom = req.files.PrivateWeddMilClearGroom;
                            var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path32}")`;
                            PrivateWeddMilClearGroom.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddMilClearGroom' + '-' + req.files.PrivateWeddMilClearGroom.name + '-' + Date.now() + path.extname(req.files.PrivateWeddMilClearGroom.name), function(err) {
                            
                            db.query(queryString1,(err,results,fields)=>{
                            if (err)
                            res.status(500).send(err);
                            validationcoupleChurchStatus();
                                                                    }); });
                        }
                        else
                            {
                            console.log("di sya sundalo");
                            validationcoupleChurchStatus();

                            }
                        }

                        function validationcoupleChurchStatus(){
                            if(req.session.userWeddd.bool_ifchurchmarried==1){
                                pathPrivateWeddChurchContract = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddChurchContract'+ '-' + req.files.PrivateWeddChurchContract.name + '-' + Date.now() + path.extname(req.files.PrivateWeddChurchContract.name));
                                req.files.path33 = pathPrivateWeddChurchContract
                                let PrivateWeddChurchContract = req.files.PrivateWeddChurchContract;
                                var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path33}")`;
                                PrivateWeddChurchContract.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddChurchContract' + '-' + req.files.PrivateWeddChurchContract.name + '-' + Date.now() + path.extname(req.files.PrivateWeddChurchContract.name), function(err) {
                                
                                db.query(queryString1,(err,results,fields)=>{
                                if (err)
                                res.status(500).send(err);
                                validationcoupleCivilStatus();
                                                                        }); });
                            }
                            else
                                {
                                console.log("di pa sila kasal dati sa church");
                                validationcoupleCivilStatus();
                                return res.redirect('/guest/home');
    
                                }
                            }
                        
                            function validationcoupleCivilStatus(){
                                if(req.session.userWeddd.bool_ifcivillymarried==1){
                                    pathPrivateWeddCivilContract = (__dirname + '/uploads/' + req.session.user.int_reservationid +'-' + 'PrivateWeddCivilContract'+ '-' + req.files.PrivateWeddCivilContract.name + '-' + Date.now() + path.extname(req.files.PrivateWeddCivilContract.name));
                                    req.files.path34 = pathPrivateWeddCivilContract
                                    let PrivateWeddCivilContract = req.files.PrivateWeddCivilContract;
                                    var queryString1 = `INSERT INTO tbl_requirements(\`int_reservationid\`, \`varchar_requirements\`) VALUES (${req.session.user.int_reservationid},"${req.files.path34}")`;
                                    PrivateWeddCivilContract.mv(__dirname + '/uploads/' + req.session.user.int_reservationid + '-' + 'PrivateWeddCivilContract' + '-' + req.files.PrivateWeddCivilContract.name + '-' + Date.now() + path.extname(req.files.PrivateWeddCivilContract.name), function(err) {
                                    
                                    db.query(queryString1,(err,results,fields)=>{
                                    if (err)
                                    res.status(500).send(err);
                                    return res.redirect('/guest/home');
                                                                            }); });
                                }
                                else
                                    {
                                    console.log("di pa sila kasal dati sa west");
                                    return res.redirect('/guest/home');
        
                                    }
                                }
	                                    });
                                    });
                                });       
                            });  
                        });
                    });
                });
            });
        });
    });
        

module.exports = router;