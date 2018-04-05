var router = require('express').Router();
var db = require('../../../lib/database')();
var authMiddleware = require('../../auth/middlewares/auth');
router.use(authMiddleware.hasAuthadmin);


router.get('/', authMiddleware.hasAuthadmin, (req, res) => {
    res.render('admin/home/views/home');
    console.log(req.session);
});

router.get('/coordinators', authMiddleware.hasAuthadmin, (req, res) => {
    res.render('admin/appointment/views/coordinators');
    console.log(req.session);
});

router.get('/members', authMiddleware.hasAuthadmin, (req, res) => {
    res.render('admin/appointment/views/members');
    console.log(req.session);
});

router.get('/pending', authMiddleware.hasAuthadmin, (req, res) => {
    res.render('admin/appointment/views/pending');
    console.log(req.session);
});

router.get('/priests', authMiddleware.hasAuthadmin, (req, res) => {
    res.render('admin/appointment/views/priests');
    console.log(req.session);
});

module.exports = router;