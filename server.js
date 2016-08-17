var express = require('express');
var chrono = require("chrono-node");
var app = express();

app.get('/:date', function (req, res) {
    var output = {
        "unix": null,
        "natural": null
    }
    var d = req.params.date;
    var timereq = chrono.parseDate(d);
    
    if (timereq === "Invalid Date" || timereq === null) {
        timereq = new Date(parseInt(d) * 1000);
    }
    
    if (timereq != "Invalid Date" && timereq !== null) {
        output.unix = timereq.getTime()/1000;
        
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        output.natural = timereq.toLocaleDateString('de-DE', options);
    }
  
    res.send(JSON.stringify(output));
});

app.listen(8080, function () {
    console.log('Timestamp app listening on port 8080!');
});