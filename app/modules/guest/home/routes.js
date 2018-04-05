var router = require('express').Router();
var db = require('../../../lib/database')();
var authMiddleware = require('../../auth/middlewares/auth');
// router.use(authMiddleware.noAuthed);

router.get('/', (req, res) => {

    res.render('guest/home/views/home');
    console.log(req.session);
});
module.exports = router;