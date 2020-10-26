const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const config = require('config');
const chalk = require('chalk');
const port = process.env.PORT || config.port;


const app = express();

// Enable cors
app.use(cors())
app.options('*', cors());

// Enable bodyparser - Maximum data transfer limit 5 mb
app.use(bodyparser.json({limit: '5mb', extended: true}))
app.use(bodyparser.urlencoded({limit: '5mb', extended: true}))


const apiRoutes = require('./routes/routes.js');

app.use('', apiRoutes);

//Capture All 404 errors
app.use(function (req,res,next){
	res.status(404).send('Error - Unable to find the requested resource!');
});

app.use((req, res, next) => {
  req.socket.on('error', () => {});
  next();
});

app.listen(port, () => {
  console.log(chalk.blueBright("Server is listening port number:", port));
})

module.exports = app;