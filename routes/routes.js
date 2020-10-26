const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());

app.use(cors());

// Request Payload - API validation
const requestPayloadValidation = require('../middleware/processLogsValidated');
const structureData = require('../middleware/structureDataInJsonFiles');
const processLogsIn15Mintues = require('../middleware/processLogsFilters');
// ParseLogs file
const skuad = require('../controllers/parselogs');


// Sample API testing
app.get('/', (req, res) => {
  res.status(200).send({
    status:200,
    message:'App is working fine!'
  });
});

// Register users
app.post('/api/process-logs/', [requestPayloadValidation.validateData, structureData.structureDataIntoJson, processLogsIn15Mintues.filterLogsBasedOnTimeStamp], (req, res, next) => {
  skuad.parseLogsData(req, res);
});

module.exports = app;