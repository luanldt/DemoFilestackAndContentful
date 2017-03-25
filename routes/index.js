var express = require('express');
var router = express.Router();
// var formidable = require('formidable');
var fs = require('fs');
var clientContentful = require('../config/contenful.js');
var clientContent = require('../config/contentfulGet');

/* GET home page. */
router.get('/', function (req, res, next) {
    clientContent(function(assets) {
        res.render('index', {title: 'Express', assets: JSON.parse(assets)});
    });

});

router.post('/upload', function (req, res, next) {
    /* var form = new formidable.IncomingForm();

     form.uploadDir = './img';
     form.keepExtensions = true;



     form.on('file', function(name, file) {
     fs.rename(file.path, './img/' + file.name);


     form.on('end', function() {
     res.render('index', {title: 'Express'});
     });

     form.parse(req);
     */
    var fileData = {
        fields: {
            title: {
                'en-US': 'DEMO'
            },
            file: {
                'en-US': {
                    contentType: req.body.mimetype,
                    fileName: req.body.filename,
                    upload: req.body.url
                }
            }
        }
    };
    clientContentful(fileData);
    clientContent(function(assets){

        res.render('index', {
            title: 'Express',
            assets: JSON.parse(assets)
        });
    });
});


module.exports = router;
