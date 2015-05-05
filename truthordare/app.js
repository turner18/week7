var https = require('https');
var fs = require('fs');
var options = {
    key: fs.readFileSync('/etc/ssl/server.key'),
    cert: fs.readFileSync('/etc/ssl/server.crt'),
    ca: fs.readFileSync('/etc/ssl/server.ca.crt')
};

var quotes = [];
quotes.push("What personality traits would cause you to end a friendship?");
quotes.push("Have you ever lied to your best friend?  If so, describe what happened.");
quotes.push("How long have you gone without showering?");


function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
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
            echoResponse.response.outputSpeech.text = "Do you want truth or dare?"
            echoResponse.response.shouldEndSession = "false";
            theRequest = JSON.parse(jsonString);
            console.log('JSON', theRequest.request);
            if (typeof theRequest.request.intent !== 'undefined') {
                choice = theRequest.request.intent.slots.Choice.value;
                echoResponse.response.outputSpeech.text = "you said " + choice;
                // echoResponse.response.card = {}
                // echoResponse.response.card.type = "PlainText";
                // echoResponse.response.card.title = choice;
                // echoResponse.response.card.subtitle = choice;
                // echoResponse.response.card.content = choice;
                echoResponse.response.shouldEndSession = "true";

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
}).listen(xxxx); //Put number in the 3000 range for testing and 443 for production
