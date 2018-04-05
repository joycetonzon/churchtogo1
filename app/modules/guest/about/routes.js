var router = require('express').Router();
var db = require('../../../lib/database')();
var multer = require ('multer');
var path = require('path');
//var authMiddleware = require('../../auth/middlewares/auth');
//router.use(authMiddleware.noAuthed);
// var upload = multer({ dest: function(req, file, callback) {
//                 callback(null, path.join(__dirname + '/uploads/'))
//                 },

//                 filename: function(req, file, callback) {
//                 var originalname = file.originalname;
//                 var extension = originalname.split(".");
//                 filename = req.user.username +  Date.now() + '.' + extension[extension.length-1];
//                 callback(null, filename);
//                 // callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))            
//                  }
//                     });


router.get('/', (req, res) => {
    res.render('guest/about/views/about');
});

var storage = multer.diskStorage({
            destination: function(req, file, callback) {
                callback(null, path.join(__dirname + '/uploads/'))
            },
            filename: function(req, file, callback) {
                console.log(file)
                callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
            }
        })
router.post('/', function(req, res) {
	var upload = multer({
		storage: storage
	}).single('userFile')
	upload(req, res, function(err) {
        //res.end('File is uploaded')
        console.log(req.body, 'Body');
        console.log(req.file, 'Files');
        var queryString = `INSERT INTO tbl_requirements(\`int_eventid\`, \`varchar_requirements\`) VALUES (25,"${req.file.path}")`;

        db.query(queryString,(err,results,fields)=>{
            if (err) throw err;
        return res.redirect('/guest/home');
        });
       
    })
    

    // console.log(req.file, 'userFile') 
})
/* POST saveblog router. */
// router.post('/', upload.any(), function(req, res, next) {
//   console.log(req.body, 'Body');
//   console.log(req.files, 'files');  
//   return res.redirect('/guest/home');
// });
module.exports = router;