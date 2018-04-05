var router = require('express').Router();
var db = require('../../../lib/database')();
var authMiddleware = require('../../auth/middlewares/auth');
router.use(authMiddleware.hasAuthadmin);


router.get('/', authMiddleware.hasAuthadmin, (req, res) => {
    res.render('admin/events/views/events');
    console.log(req.session);
});



// router.get('/sacraments', authMiddleware.hasAuthadmin, (req, res) => {
//     res.render('admin/events/views/sacraments');
//     console.log(req.session);
// });


router.get('/sacraments', (req, res) => {


// router.get('/', (req, res) => {
    var queryString1 =`SELECT * FROM tbl_eventinfo WHERE tbl_eventinfo.varchar_eventtype = ? `
    db.query(queryString1, ["Sacrament"], (err, results, fields) => {
        if (err) console.log(err);
        console.log('----------')
        console.log(results[0]);
        console.log('----------')
        return res.render('admin/events/views/sacraments',{ resulta : results });
    });

});


router.get('/seminars', authMiddleware.hasAuthadmin, (req, res) => {
    res.render('admin/events/views/seminars');
    console.log(req.session);
});

router.get('/services', authMiddleware.hasAuthadmin, (req, res) => {
    res.render('admin/events/views/services');
    console.log(req.session);
});

module.exports = router;