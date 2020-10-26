# NodeJS with Express4.17.1

EXPRESS 4.17 SPA

IMPORTANT NOTES:

    1. Make sure you follow the steps mentioned under "PROJECT START STEPS" and ensure that the steps execute successfully. 
    2. Make sure you follow the steps mentioned under "DOCKER START STEPS" and ensure that the steps execute successfully. 

PROJECT START STEPS:

    Pre-requisites:
    1. Install node, npm
    2. Install express (npm install express --save)

    Steps:
    1. To run this application, do the following:
        1.a. Go to the project root directory.
        1.b. Run the following commands respectively in the terminal/command line to build and run the app:
            - npm install
            - npm start
    
    2. Go to http://localhost:8080 in your browser to view it.

PROJECTS API FOR TEST: 

http://codejudge-question-artifacts.s3.ap-south-1.amazonaws.com/q-120/log1.txt"
http://codejudge-question-artifacts.s3.ap-south-1.amazonaws.com/q-120/log2.txt"
http://codejudge-question-artifacts.s3.ap-south-1.amazonaws.com/q-120/log3.txt"
http://codejudge-question-artifacts.s3.ap-south-1.amazonaws.com/q-120/log4.txt"
http://codejudge-question-artifacts.s3.ap-south-1.amazonaws.com/q-120/log5.txt"
http://codejudge-question-artifacts.s3.ap-south-1.amazonaws.com/q-120/log6.txt"
http://codejudge-question-artifacts.s3.ap-south-1.amazonaws.com/q-120/log7.txt"
http://codejudge-question-artifacts.s3.ap-south-1.amazonaws.com/q-120/log8.txt"
http://codejudge-question-artifacts.s3.ap-south-1.amazonaws.com/q-120/log9.txt"
http://codejudge-question-artifacts.s3.ap-south-1.amazonaws.com/q-120/log10.txt"

PROJECTS API REQUEST PAYLOAD AS A JSON:

{ 
    "logFiles": ["http://codejudge-question-artifacts.s3.ap-south-1.amazonaws.com/q-120/log1.txt","http://codejudge-question-artifacts.s3.ap-south-1.amazonaws.com/q-120/log882.txt"], 
    "parallelFileProcessingCount": 2
}