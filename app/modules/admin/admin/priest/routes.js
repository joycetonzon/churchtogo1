var router = require('express').Router();
var db = require('../../../lib/database')();
var authMiddleware = require('../../auth/middlewares/auth');
router.use(authMiddleware.hasAuthadmin);


router.get('/', authMiddleware.hasAuthadmin, (req, res) => {
    db.query('SELECT * FROM tbl_priest', (err, results, fields) => {
        if (err) console.log(err)
        return res.render('admin/priest/views/priest', { tbl_reservation: results });
    });
});


router.get('/addpriest', authMiddleware.hasAuthadmin, (req, res) => {
    res.render('admin/priest/views/addpriest');
});

router.post('/addpriest', (req, res) => {
    var queryString = ` INSERT INTO tbl_priest(
    \`varchar_priestlastname\`,
    \`varchar_priestfirstname\`,
    \`varchar_priestmiddlename\`) 
    
    
    VALUES(
    "${req.body.priestlastname}",
    "${req.body.priestfirstname}",
    "${req.body.priestmiddlename}")`;
   

    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        res.redirect('/admin/priest');
    });
});





module.exports = router;