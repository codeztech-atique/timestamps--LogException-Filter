const chalk = require('chalk');

//ParseLogs validate data
exports.validateData = (req, res, next) => {
   console.log();
   console.log(chalk.bgYellowBright('-------------------- Step 1 - Validated API --------------------'));
   console.log();
   var errorMessage = '';
   if(req.body.logFiles === undefined || req.body.logFiles === '') {
     errorMessage += 'Logfiles, ';
   } if(req.body.parallelFileProcessingCount === undefined || req.body.parallelFileProcessingCount === '') {
     errorMessage += 'Parallel File Processing Count, ';
   }
   if(errorMessage!=='') {
    console.log(chalk.red('- ',errorMessage + ' required !!'));
      res.status(400).send({
        status: 400,
        message: errorMessage + ' required'
      })
   } else {
     // Vaidate Fields -> logFiles, ParallelFileProcessingCountExpecting
     var logFiles = req.body.logFiles;
     var parallelFileProcessingCount = req.body.parallelFileProcessingCount;
     if(typeof logFiles === 'object' && typeof parallelFileProcessingCount === 'number') {
        if(parallelFileProcessingCount > 0) {
            if(parallelFileProcessingCount === logFiles.length) {
                // Check the Log Files Valid URL
                var validURL = false;
                for(var i=0;i<logFiles.length;i++) {
                  var path = logFiles[i];
                  // Url must starts with http: or https: and ends with .txt
                  var pattern = /^((http|https):\/\/).*\.txt$/;
                  if(pattern.test(path)) {
                    validURL = true;
                  } else {
                    validURL = false;
                    break;              
                  }
                }
                if(validURL) {
                  console.log(chalk.green('- LogsFiles Array Length is Equal to Parallel File Processing count value !!'));
                  console.log();
                  next()
                } else {
                  console.log(chalk.red('- LogsFiles Array contains invalid Input, Expected a input starts with (http|https) ends with .txt  !!'));
                  res.status(400).send({
                    "status": "failure",
                    "reason": "LogsFiles Array contains invalid Input, Expected a input starts with (http|https) ends with .txt !!"
                  })
                }
            } else {
                console.log(chalk.red('- Error - LogsFiles Array Length is not equal to Parallel File Processing count value !!'));
                res.status(200).send({
                    "status": "failure",
                    "reason": "LogsFiles Array Length is not equal to Parallel File Processing count value!"
                })
            }
        } else {
          console.log(chalk.red('- ','Parallel File Processing count must be greater than zero!!'));
            res.status(400).send({
                "status": "failure",
                "reason": "Parallel File Processing count must be greater than zero!"
            })
        }
     } else {
       console.log(chalk.red('- ','Logfiles expecting array & Parallel File Processing count expecting interger value!!'));
        res.status(400).send({
            "status": "failure",
            "reason": "Logfiles expecting array & Parallel File Processing count expecting interger value!"
        })
     }
   } 
};