var express = require('express');
var router = express.Router();

var multer = require('multer');
var json2csv = require('json2csv');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.post('/', upload.single('json'), function (req, res, next) {
  res.setHeader('Content-Description','File Transfer');
  res.setHeader('Content-Disposition', 'attachment; filename=' + req.file.originalname + '.csv');
  res.setHeader('Content-Type', 'application/octet-stream');

  var buffer = req.file.buffer.toString('utf8');
  var jsonContent = JSON.parse(buffer);

  var fields = ['name','type','timestamp','sessionID','backendName','backendVersion','properties.contractNumber','properties.openedMap','properties.statusTechnician','properties.onTheWay','properties.travelTimeBegin','properties.travelTimeEnd'];
  var csv = json2csv({ data: jsonContent.items, fields: fields });

  var csvBuffer = new Buffer(csv);
  res.end(csvBuffer);
});

module.exports = router;
