var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    http = require("http"),
    servidor = http.createServer(app),
    methodOverride = require("method-override");


app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

var trackController = require('./controllers/track_controller');

var router = express.Router();

router.get('/',function(req,res){
  res.send("Esta es la API REST");
});

router.route('/tracks')
  .post(track_controller.anadirTrack);

router.route('/tracks/:name')
  .get(track_controller.encontrarTrack)
  .post(track_controller.borrarTrack);

app.use('/api',router);

app.listen(5050,function(){
  console.log("Servidor en http://localhost:5050");
});