const chalk = require('chalk');
const fs = require('fs');
var _this = this;

//Filters logs based on 15 minutes timestamp
exports.filterLogsBasedOnTimeStamp = async(req, res, next) => {
    console.log();
    console.log(chalk.bgYellowBright('-------------------- Step 3 - Filters logs based on 15 minutes timestamp --------------------'));
    console.log();
    // As we know 900000 -> Miliseconds means 900 seconds --> 15 Mintues
    // So we need to filter the data from the data.json each and every 15 mintues (Each and Every 900 seconds durations)
    
    // Find first IllegalAgrumentsException - 15 Mintues Durations using recurssion
    
    var finalresult = [];

    var IllegalAgrumentsException = (data, startDate, endDate) => {
        var response = {
            "timestamp": '',
            "logs": []
        };
        var count = {};
        console.log("StartDate:", startDate, "EndDate:", endDate);
        var getLastDateTraverSe_IValue;
        for(var i=0;i<data.length;i++) {
            if(data[i].timeStamp >= startDate && data[i].timeStamp <= endDate) {
                count[data[i].exceptionName] = (count[data[i].exceptionName]||0) + 1;
                getLastDateTraverSe_IValue = i;
            }
        };
        // Format Final Logs as a Response array
        Object.keys(count).forEach(function (item) {
            // console.log(item); // key
            // console.log(count[item]); // value
            var getHourUpto2DecimalPointStartDate = (new Date(startDate).getUTCHours()<10?'0':'') + new Date(startDate).getUTCHours();
            var getHourUpto2DecimalPointEndDate = (new Date(endDate).getUTCHours()<10?'0':'') + new Date(endDate).getUTCHours();
            

            var getMinutesUpto2DecimalPointStartDate = (new Date(startDate).getUTCMinutes()<10?'0':'') + new Date(startDate).getUTCMinutes();
            var getMinutesUpto2DecimalPointEndDate = (new Date(endDate).getUTCMinutes()<10?'0':'') + new Date(endDate).getUTCMinutes();

            // // Apply 00, 15, 30, 45, 60 Logic
            // var minutesStartDate = parseInt(getMinutesUpto2DecimalPointStartDate);
            // var minutesEndDate = parseInt(getMinutesUpto2DecimalPointEndDate);

            // // Apply logic for minutes start date
            // if(minutesStartDate >= 0) {
            //     minutesStartDate = 0;
            // } if(minutesStartDate >= 15) {
            //     minutesStartDate = 15;
            // } if(minutesStartDate >= 30) {
            //     minutesStartDate = 30;
            // } if(minutesStartDate >= 45) {
            //     minutesStartDate = 45
            // }
            // if(minutesStartDate > 45) {

            // }
            // if(minutesStartDate > 30) {

            // } 
            // if(minutesStartDate > 15) {
            
            // }
            // if(minutesStartDate > 0) {
            
            // }

            // // Apply logic for minutes end date
            // if(minutesEndDate >= 0) {
            //     minutesEndDate = 0;
            // } if(minutesEndDate >= 15) {
            //     minutesEndDate = 15;
            // } if(minutesEndDate >= 30) {
            //     minutesEndDate = 30;
            // } if(minutesEndDate >= 45) {
            //     minutesEndDate = 45
            // }
            // getMinutesUpto2DecimalPointStartDate = (new Date(minutesStartDate).getUTCMinutes()<10?'0':'') + new Date(minutesStartDate).getUTCMinutes();
            // getMinutesUpto2DecimalPointEndDate = (new Date(minutesEndDate).getUTCMinutes()<10?'0':'') + new Date(minutesEndDate).getUTCMinutes();
            
            // Apply 00, 15, 30, 45, 60 Logic
            
            response.timestamp = getHourUpto2DecimalPointStartDate+":"+getMinutesUpto2DecimalPointStartDate+"-"+getHourUpto2DecimalPointEndDate+":"+getMinutesUpto2DecimalPointEndDate;
            response.logs.push({
                'exception': item,
                'count': count[item]
            })
        });
        // Sort the exception array based on count accending order -> Javascript ES6
        response.logs.sort((a, b) => parseFloat(a.count) - parseFloat(b.count));
    
        finalresult.push(response);

        var srtDate = (getLastDateTraverSe_IValue === data.length - 1) ? parseInt(data[getLastDateTraverSe_IValue].timeStamp) : parseInt(data[getLastDateTraverSe_IValue+1].timeStamp);
        var endDate = srtDate + 900000; //15 mintues duration
       
        // Logic here
        if(endDate >= parseInt(data[data.length-1].timeStamp) && getLastDateTraverSe_IValue === data.length-1) {
            console.log(chalk.green(JSON.stringify(finalresult)));
            console.log();
            return;
        } else {
            IllegalAgrumentsException(data, srtDate, endDate);
        }
    };
    fs.readFile('./data.json','utf-8', (err,data) => {
       if (err) {
        return console.log(err);
      }
      data = JSON.parse(data);
      var startD = parseInt(data[0].timeStamp);
      var endD = parseInt(data[0].timeStamp) + 900000; //15 mintues duration
      IllegalAgrumentsException(data, startD, endD);
      req.body.result = finalresult;
      next();
    });
};