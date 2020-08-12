
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser());

app.get('/' , function (req , res ) {

	res.sendfile( __dirname + "/index.html");

});


html_text1 = `
<html>
<head>
	<title>enfty compile</title>
</head>
<body>
<center>
<h1>enfty compiler</h1>
<h3>Output</h3>
<div style="border:solid 1px; width: 60%;" id="Output" name="Output" >`

html_text2 =`
</div> 
<br/>
</center>
</body>
</html>
`


app.post('/compilecode' , function (req , res ) {
    
	var code = req.body.code;	
	var input = req.body.input;
    var inputRadio = req.body.inputRadio;
    var lang = req.body.lang;

    console.log("hello: ", code)
    console.log("input: ", input)
    console.log("inputRadio: ", inputRadio)
    console.log("lang: ", lang)

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
		//deal with error
		console.log("error: ",err)
		} else {
        console.log("result: ", response.substring(response.search("output_html") + 15 , response.search("memory_limit") - 4));
        var result = response.substring(response.search("output_html") + 15 , response.search("memory_limit") - 4);
        res.send(html_text1 + result + html_text2);
		}
    }); 
    
    // res.send(html_text1 + code + html_text2);

});

app.get('/fullStat' , function(req , res ){
    compiler.fullStat(function(data){
        res.send(data);
    });
});

app.listen(8080, () => {console.log("server at localhost:8080")});
