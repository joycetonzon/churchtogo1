var router = require('express').Router();
var db = require('../../../lib/database')();
var authMiddleware = require('../../auth/middlewares/auth');
router.use(authMiddleware.hasAuthadmin);


router.get('/', authMiddleware.hasAuthadmin, (req, res) => {
    res.render('admin/facilities/views/facilities');
    console.log(req.session);
});

module.exports = router;