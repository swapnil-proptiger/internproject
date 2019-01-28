let express = require('express'); // for creating the server
let fetch = require('node-fetch') // for using fetch in node or we can use axios also
const app = express();
// let hbs = require('express-handler');
var hbs = require( 'express-handlebars');

app.use(express.json());

const PORT = 3000 || process.env.PORT;

// set all the routes.....
//app.engine('hbs', hbs({extname : 'hbs', defaultLayout : 'layout', layoutsDir : __dirname + '/views/layouts'}));
//app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
app.use('/public',express.static('public'))



app.get('/',function(req,res){
   fetch('https://api.myjson.com/bins/1d77mc')
   .then(res1 => res1.json())
   .then(data => {console.log(data); res.render("resume",{data})})
   .catch(err=>console.log('error hai bhai'));
})



let server = app.listen(PORT,function(){
   console.log(`server just started listening to the ${PORT}`);
});