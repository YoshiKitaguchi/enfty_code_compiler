const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
var PORT = 8888;

app.use(bodyParser());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/editor.html");
});

app.post('/', (req , res ) => {
    
	var code = req.body.code;	
	var input = req.body.run;
    var lang = 'PYTHON';

    console.log('Compiling ...');
    console.log("code: ", code);
    console.log("input: ", input);
    console.log("lang: ", lang);

    // https://github.com/tarungarg546/HackerEarth-node
	var hackerEarth=require('hackerearth-node'); //require the Library
	//Now set your application 
	var hackerEarth=new hackerEarth(
		'13a3dcad1ec898bce32526ff5d52c0b02f8cba71',  //Your Client Secret Key here this is mandatory
		''  //mode sync=1 or async(optional)=0 or null async is by default and preferred for nodeJS
	);
	var config={};
	config.time_limit=1;  //your time limit in integer
	config.memory_limit=323244;  //your memory limit in integer
	config.source=code;  //your source code for which you want to use hackerEarth api
	config.input='';  //input against which you have to test your source code
	config.language=lang; //optional choose any one of them or none

    var result = "";
	//compile your code 
	hackerEarth.run(config,function(err,response){
		if(err) {
		// With internal server error
		return res.status(500).json({
            message: 'Unable to process the request',
            error: err
        });
		} else {
            var obj = JSON.parse(response);
            console.log(obj);
            var error = obj.run_status.stderr;
            var output = obj.run_status.output;

            // HTTP success status 
            return res.status(200).json({
                error: error,
                output: output
            });
        }
    }); 
});

app.get('/fullStat' , function(req , res ){
    compiler.fullStat(function(data){
        res.send(data);
    });
});

app.listen(PORT, () => {
    console.log("Server at => http://localhost:" + PORT);
});

module.exports = app;