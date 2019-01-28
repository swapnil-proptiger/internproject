let express = require('express'); // for creating the server
let fetch = require('node-fetch') // for using fetch in node or we can use axios also
const app = express();
let path= require('path');
let fs=require('fs');
let bp=require('body-parser');
// let hbs = require('express-handler');
var hbs = require( 'express-handlebars');

app.use(express.json());

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json()); 

const PORT = 3000 || process.env.PORT;

// set all the routes.....
//app.engine('hbs', hbs({extname : 'hbs', defaultLayout : 'layout', layoutsDir : __dirname + '/views/layouts'}));
//app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
//app.use('/public',express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/download', function(req, res){
  var file = __dirname + '/download.pdf';
  res.download(file); // Set disposition and send it.
});

app.post('/resume', function(req, res) {
	console.log("Here I am");
	console.log(req.body);
    const form = {
        name: req.body.firstname,
        email: req.body.Email,
        phone: req.body.mob,
        message: req.body.subject
    }
    console.log(form);
    fs.appendFile('mynewfile.txt', JSON.stringify(form), function(err) {
        if (err) throw err;
        console.log('Saved!');
    });

    res.redirect('/#contact');
})

app.get('/',function(req,res){
   fetch('https://api.myjson.com/bins/10w1zs')
   .then(res1 => res1.json())
   .then(data => {console.log(data); res.render("resume",{data})})
   .catch(err=>console.log('error'));
})








let server = app.listen(PORT,function(){
   console.log(`server just started listening to the ${PORT}`);
});