var router = require('express').Router();

var authMiddleware = require('../auth/middlewares/auth');

router.use(authMiddleware.hasAuthadmin);
router.use('/home', require('./home/routes'));
// router.use('/about', require('./about/routes'));
// router.use('/calendar', require('./calendar/routes'));
// router.use('/calendar/annointmentevents', require('./calendar/routes'));
// router.use('/calendar/baptismalevents', require('./calendar/routes'));
// router.use('/calendar/funeralmassevents', require('./calendar/routes'));
// router.use('/calendar/privateweddingevents', require('./calendar/routes'));
// router.use('/calendar/massweddingevents', require('./calendar/routes'));


// router.use('/gallery', require('./gallery/routes'));
// router.use('/priest', require('./priest/routes'));
// router.use('/priest/addpriest', require('./priest/routes'));

// router.use('/reservationrequests', require('./reservationrequests/routes'));
// router.use('/reservationrequests/annointment', require('./reservationrequests/routes'));
// router.use('/reservationrequests/baptismal', require('./reservationrequests/routes'));
// router.use('/reservationrequests/funeralmass', require('./reservationrequests/routes'));
// router.use('/reservationrequests/masswedding', require('./reservationrequests/routes'));
// router.use('/reservationrequests/privatewedding', require('./reservationrequests/routes'));

// router.use('/records', require('./records/routes'));
// router.use('/records/annointment', require('./records/routes'));
// router.use('/records/baptismal', require('./records/routes'));
// router.use('/records/funeralmass', require('./records/routes'));
// router.use('/records/masswedding', require('./records/routes'));
// router.use('/records/privatewedding', require('./records/routes'));
// router.use('/records/annointment/view', require('./records/routes'));
// router.use('/records/baptismal/view', require('./records/routes'));
// router.use('/records/funeralmass/view', require('./records/routes'));
// router.use('/records/masswedding/view', require('./records/routes'));
// router.use('/records/privatewedding/view', require('./records/routes'));



router.use('/appointment', require('./appointment/routes'));
router.use('/appointment/coordinators', require('./appointment/routes'));
router.use('/appointment/members', require('./appointment/routes'));
router.use('/appointment/pending', require('./appointment/routes'));
router.use('/appointment/priests', require('./appointment/routes'));

router.use('/events', require('./events/routes'));
router.use('/events/sacraments', require('./events/routes'));
router.use('/events/seminars', require('./events/routes'));
router.use('/events/services', require('./events/routes'));

router.use('/facilities', require('./facilities/routes'));

router.use('/staff', require('./staff/routes'));
router.use('/coordinators', require('./staff/routes'));
router.use('/members', require('./staff/routes'));
router.use('/priests', require('./staff/routes'));

router.use('/transactions', require('./transactions/routes'));
router.use('/transactions/approved', require('./transactions/routes'));
router.use('/transactions/cancelled', require('./transactions/routes'));
router.use('/transactions/requests', require('./transactions/routes'));


router.use('/guests', require('./guests/routes'));

exports.admin = router;