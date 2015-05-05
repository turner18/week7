var https = require('https');
var fs = require('fs');
var options = {
    key: fs.readFileSync('/etc/ssl/server.key'),
    cert: fs.readFileSync('/etc/ssl/server.crt'),
    ca: fs.readFileSync('/etc/ssl/server.ca.crt')
};

var physical = [];
physical.push("Do a backflip into the wall");
physical.push("Fly to the moon");
physical.push("Get me a pizza");

var mental = [];
mental.push("Praise the lord");
mental.push("Compute the square root of two in your head");
mental.push("Use your brain");


function getRandomPhysical() {
    return physical[Math.floor(Math.random() * physical.length)];
}

function getRandomMental() {
    return mental[Math.floor(Math.random() * mental.length)];
}


https.createServer(options, function(req, res) {
    if (req.method == 'POST') {
        var jsonString = '';
        req.on('data', function(data) {
            jsonString += data;
        });
        req.on('end', function() {
            console.dir(jsonString, {
                depth: 5
            });
            echoResponse = {};
            echoResponse.version = "1.0";
            echoResponse.response = {};
            echoResponse.response.outputSpeech = {};


            echoResponse.response.outputSpeech.type = "PlainText"
            echoResponse.response.outputSpeech.text = "Do you want a physical or mental challenge?"
            echoResponse.response.shouldEndSession = "false";
            theRequest = JSON.parse(jsonString);
            console.log('JSON', theRequest.request);
            if (typeof theRequest.request.intent !== 'undefined') {
                choice = theRequest.request.intent.slots.Choice.value;
                if (choice === "physical"){

                    pChallenge = getRandomPhysical();
                    echoResponse.response.outputSpeech.text = pChallenge;
                    // echoResponse.response.outputSpeech.text = "you said " + choice;
                
                    // echoResponse.response.card = {}
                    // echoResponse.response.card.type = "PlainText";
                    // echoResponse.response.card.title = "Truth or Dare";
                    // echoResponse.response.card.subtitle = choice;
                    // echoResponse.response.card.content = truth;
                    echoResponse.response.shouldEndSession = "true";
                }
                if (choice === "mental"){

                    mChallenge = getRandomMental();
                    echoResponse.response.outputSpeech.text = mChallenge;
                    // echoResponse.response.outputSpeech.text = "you said " + choice;
                
                    // echoResponse.response.card = {}
                    // echoResponse.response.card.type = "PlainText";
                    // echoResponse.response.card.title = "Truth or Dare";
                    // echoResponse.response.card.subtitle = choice;
                    // echoResponse.response.card.content = truth;
                    echoResponse.response.shouldEndSession = "true";
                }
            }
            myResponse = JSON.stringify(echoResponse);
            res.setHeader('Content-Length', myResponse.length);
            res.writeHead(200);
            res.end(myResponse);
            console.log('from post', myResponse);

        });
    } else {
        myResponse = JSON.stringify(echoResponse);
        res.setHeader('Content-Length', myResponse.length);
        res.writeHead(200);
        res.end(myResponse);
    }
}).listen(3018); //Put number in the 3000 range for testing and 443 for production
