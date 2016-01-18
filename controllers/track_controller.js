var fs = require('fs');


exports.anadirTrack = function(req,res){
	var nasURL = "../mnt/nas/";

	if(req.method == 'POST'){
		var nombreFichero = '';
		var ficheromp3 = '';
		var ficheromp3Aux = '';
		var nombreFicheroAux = '';
		var body = '';
		var cuenta = '';
		req.on('data',function(data){
			body += data;
			if(cuenta == 0){
				var dataStr = data.toString();
				dataStr = dataStr.substr(dataStr.indexOf('nombreFichero')+18);
				dataStr = dataStr.substr(0,dataStr.indexOf('.')+4);
				nombreFichero = dataStr;
				var aleatorio = Math.floor((Math.random() * 1000)+1);
				if(nombreFichero == ""){nombreFichero = ".mp3";}
				nombreFicheroAux = new Date(.getTime()+aleatorio+'_'+nombreFichero);
				ficheromp3 = nasURL + nombreFicheroAux;
				ficheromp3Aux = fs.createWriteStream(ficheromp3);
				ficheromp3Aux.write(data);
				cuenta++;
			}else{
				ficheromp3Aux.write(data);
			}
		});
		req.on('end',function(){
			ficheromp3Aux.end();
			res.writeHead(200,{'Content-Type': 'text/html'});
			res.end(nombreFicheroAux);
		});
	}

};

exports.encontrarTrack = function(req,res){
	var finalURL = req.params.name;
	var nasURL = "../mnt/nas/";
	var URLsuma = nasURL+finalURL;
	res.sendFile(finalURL,{root: '../mnt/nas'});
};


exports.borrarTrack = function(req,res){
	var nasURL = "../mnt/nas";
	var finalURL = req.params.name;
	var URLsuma = nasURL+finalURL;

	var fs = require('fs');
	fs.unlinkSync(URLsuma);
	res.status(200);
	console.log(finalURL+' ha sido borrada');
};