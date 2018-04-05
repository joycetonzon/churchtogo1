var router = require('express').Router();
var authMiddleware = require('../auth/middlewares/auth');

router.use(authMiddleware.hasAuth);


router.use('/anointing', require('./anointing/routes'));
router.use('/anointing/listofrequirements', require('./baptism/routes'));

router.use('/baptism', require('./baptism/routes'));
router.use('/baptism/listofrequirements', require('./baptism/routes'));
router.use('/baptism/listofsponsors', require('./baptism/routes'));
router.use('/baptism/sponsors', require('./baptism/routes'));

router.use('/funeralmass', require('./funeralmass/routes'));
router.use('/funeralmass/listofrequirements', require('./funeralmass/routes'));

router.use('/masswedding', require('./masswedding/routes'));
router.use('/masswedding/listofsponsors', require('./masswedding/routes'));

router.use('/privatewedding', require('./privatewedding/routes'));
router.use('/privatewedding/listofsponsors', require('./privatewedding/routes'));
router.use('/privatewedding/listofrequirements', require('./privatewedding/routes'));

router.use('/masswedding/listofrequirements', require('./masswedding/routes'));


router.use('/home', require('./home/routes'));
router.use('/profile', require('./profile/routes'));
router.use('/profile/editprofile', require('./profile/routes'));
router.use('/guestreservation', require('./guestreservation/routes'));
router.use('/guestreservation/finalizingrequirements', require('./guestreservation/routes'));
router.use('/voucher', require('./voucher/routes'));
router.use('/requests', require('./requests/routes'));
router.use('/approved', require('./approved/routes'));

router.use('/requests/anointing', require('./requests/routes'));
router.use('/requests/anointing/edit', require('./requests/routes'));
router.use('/requests/baptism', require('./requests/routes'));
router.use('/requests/funeralmass', require('./requests/routes'));
router.use('/requests/masswedding', require('./requests/routes'));
router.use('/requests/privatewedding', require('./requests/routes'));


router.use('/approved/anointing', require('./approved/routes'));
router.use('/approved/baptism', require('./approved/routes'));
router.use('/approved/funeralmass', require('./approved/routes'));
router.use('/approved/masswedding', require('./approved/routes'));
router.use('/approved/privatewedding', require('./approved/routes'));

router.use('/submittingforms', require('./submittingforms/routes'));

router.use('/cancelled', require('./cancelled/routes'));

// router.use('/about', require('./about/routes'));
// router.use('/gallery', require('./gallery/routes'));
// router.use('/calendar', require('./calendar/routes'));
// router.use('/calendar/anointingevents', require('./calendar/routes'));
// router.use('/calendar/baptismevents', require('./calendar/routes'));
// router.use('/calendar/funeralmassevents', require('./calendar/routes'));
// router.use('/calendar/privateweddingevents', require('./calendar/routes'));
// router.use('/calendar/massweddingevents', require('./calendar/routes'));

// router.use('/voucher', require('./voucher/routes'));
exports.guest = router;