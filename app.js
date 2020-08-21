var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrega credenciales
mercadopago.configure({
sandbox: true,
  access_token: 'TEST-5445896726241933-082116-dcf027175d54b5e8002e250c120398d1-268715267'
});

// Crea un objeto de preferencia
let preference = {
  items: [
    {
      title: 'Mi producto',
      unit_price: 100,
      quantity: 1,
    }
  ]
};

mercadopago.preferences.create(preference)
.then(function(response){
// Este valor reemplazará el string "<%= global.id %>" en tu HTML
  global.id = response.body.id;
}).catch(function(error){
  console.log(error);
});




app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));
 
app.listen(process.env.PORT || 3000);