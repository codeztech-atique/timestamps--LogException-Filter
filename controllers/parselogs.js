const chalk = require('chalk');


//ParseLogs data
exports.parseLogsData = (req, res, next) => {
    console.log(chalk.bgYellowBright('-------------------- Step 5 - Final --------------------'));
    console.log();
    console.log(chalk.bgWhiteBright('================== Quick recall all the steps =================='));
    console.log();
    console.log(chalk.blue('Done - Step 1 : Validate API 404 as Express Middleware.'));
    console.log();
    console.log(chalk.blue('Done - Step 2 : Request Payload Validated Properly.'));
    console.log();
    console.log(chalk.blue('Done - Step 3 : Request URL Validate Properly! Means if the url not giving response, throw error !!'));
    console.log();
    console.log(chalk.blue('Done - Step 4 : Constructed txt record into JSON and save into local data.json'));
    console.log();
    console.log(chalk.blue('Done - Step 5 : Filter all the Exception based on 15 mintues duration.'));
    console.log();
    console.log(chalk.green('Success - Step 6 : Congratulations you are all done, Interviewer will call you shortly !!!'));
    console.log();
    res.status(200).send({
        // status: 200,
        response: req.body.result
    })
};