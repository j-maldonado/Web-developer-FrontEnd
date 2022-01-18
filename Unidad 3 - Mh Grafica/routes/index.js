var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async (req, res, next) => {

  var nombre = req.body.nombre;
  var telefono = req.body.telefono;
  var email = req.body.email;
  var motivo = req.body.motivo;
  var mensaje = req.body.mensaje;

  // console.log(req.body);
  

  var obj = {
    to: "sixcomusic@gmail.com",
    subject: "Consulta desde la Web",
    html: nombre + " " + " se contacto a traves de la web y quiere mas info a este correo: " + email + ". <br> Ademas, hizo el siguiente comentario: " + mensaje + ". <br> Su tel es " + telefono
  }

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  console.log(process.env.SMTP_HOST);
  console.log(process.env.SMTP_PORT);
  console.log(process.env.SMTP_USER);
  console.log(process.env.SMTP_PASS);
  
  
  var info = await transporter.sendMail(obj);
  

  res.render('index', {
    message: 'Mensaje enviado correctamente en breve nos pondremos en contacto', 
  });

});

module.exports = router;
