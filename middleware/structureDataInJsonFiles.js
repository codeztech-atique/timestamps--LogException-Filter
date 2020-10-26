const chalk = require('chalk');
const fs = require('fs');
const axios = require('axios');
var _this = this;

// Structure data from URL into a JSON file
exports.structureDataIntoJson = async(req, res, next) => {
    console.log();
    console.log(chalk.bgYellowBright('-------------------- Step 2 - Structure data from URL into a JSON file --------------------'));
    console.log();
    var arr = [];
    var data, formatData;
    for(var i=0;i<req.body.logFiles.length;i++) {
        data = req.body.logFiles[i];
        formatData = await _this.parseData(req, res, data);
        arr.push(formatData);
    }
    // Combine all the data into a single array
    if(arr.length > 1) {
        var temp = [];
        for(var j=0;j<arr.length;j++) {
          temp = temp.concat(arr[j]);
        }
        arr = temp; 
    } else {
        arr = arr[0];
    }
    
    // Sort the array based on time stamp accending order -> Javascript ES6
    arr.sort((a, b) => parseFloat(a.timeStamp) - parseFloat(b.timeStamp));

    // Writing the file in a JSON
    _this.writeFileInJson(arr).then(() => {
        next();
    });
};

exports.parseData = (req, res, data) => {
    var arr = [];
    return new Promise(async(resolve, reject) => {
        // Try catch block used
        try {
          const response = await axios.get(data);
          let splitted = response.data.toString().split("\n");
          for (let i = 0; i<splitted.length; i++) {
            let splitLine = splitted[i].split(" ");
            if(i===splitted.length-1) {
                arr.push({
                    'requestId': splitLine[0],
                    'timeStamp': splitLine[1],
                    'exceptionName' : splitLine[2],
                })
            } else {
                arr.push({
                    'requestId': splitLine[0],
                    'timeStamp': splitLine[1],
                    'exceptionName' : splitLine[2].substring(0, splitLine[2].length - 1),
                })
            }
           }
           resolve(arr);
        } catch (error) {
           console.log();
           console.log(chalk.red('Error! Invalid URL'));
           console.log();
           res.status(404).send({
               status: 404,
               message: 'Invalid URL!!'
           })
        }
    });
};

exports.writeFileInJson = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./data.json', JSON.stringify(data), (err) => {
            if (err) {
                console.log(err);
                reject('Not able to write the file!');
            }
            else {
                console.log(chalk.blue('File Successfully written !!!'));
                resolve(data);
            }
        })
    });
}