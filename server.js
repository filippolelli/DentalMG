const express = require('express')
const PDFDocument = require('pdfkit');
const fs = require('fs');
const https = require("https");
const bodyParser  = require('body-parser');
const Canvas  = require('canvas')

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

const options={
 key:fs.readFileSync(__dirname + '/certs/localhost-key.pem'),
cert: fs.readFileSync(__dirname +'/certs/localhost.pem')
}

https.createServer(options, app).listen(port,function () {
  console.log(
    "Server listening on port 3000! Go to https://localhost:3000/"
  );
});

app.post('/', (req, res) => {
  console.log(req.get("content-length"));
  const canvas = new Canvas.createCanvas(800, 800);
  const ctx = canvas.getContext('2d');

  const [nome,cognome,indirizzo,tel,sesso,data]=
  [req.body.nome,req.body.cognome,
    req.body.indirizzo,req.body.tel,
    req.body.sex,new Date(req.body.data).toLocaleDateString()];
 
  mergeImage('public/images/denti.png',req.body.sketch_denti,ctx)
  const doc = new PDFDocument({size:'A4'});
  doc.font('fonts/verdana.ttf').fontSize(10);
  doc.pipe(fs.createWriteStream(`./PDFs/${nome}_${cognome}.pdf`));
  
  doc.text(`- Nome: ${nome}`);
  doc.text(`- Cognome: ${cognome}`);
  doc.text(`- Indirizzo: ${indirizzo}`);
  doc.text(`- Telefono: ${tel}`);
  doc.text(`- Sesso: ${sesso}`);
  doc.text(`- Nato il: ${data}`);
  doc.image(canvas.toBuffer('image/png'), {fit: [200,200],align:'center'});

  doc.end();
  //res.redirect("/home.html");
  
});

function mergeImage(pathBackground,sketchBuffer,ctx){
  var img = new Canvas.Image; 
  img.src = pathBackground;
  ctx.drawImage(img,0,0);
  img.src=sketchBuffer;
  ctx.drawImage(img,0,0);
}

