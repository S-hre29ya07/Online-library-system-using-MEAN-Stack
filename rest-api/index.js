// now i am going to write connection code 
let express = require('express'),
path = require('path'),
mongoose = require('mongoose'),
cors = require('cors'),
bodyParser = require('body-parser'),
mongoDb = require('./database/db');
mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('DataBase successfully connected')
},
error=>{
    console.log('Database Error:' + error)
}
)


// NOW I AM GOING TO MAKE PORT AND SERVER
const bookRoute = require("./node-backend/routes/book.routes");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
// NOW CREATE STATIC PATH
app.use(express.static(path.join(__dirname,'dist/Bookstore')));
// API ROOT
app.use('/api',bookRoute);
// PORT CREATE
const port = process.env.port || 8000;
app.listen(port,()=>{
    console.log('Listening Port on:' +port);
})

// 404 ERROR HANDLING
app.use((req,res,next)=>{
    next(createError(404));
});
// BASE ROUTE
app.get('/',(req,res)=>{
    res.send('invalid Endpoint');
});
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'dist/Bookstore/index.html'));
});
app.use(function(err, req, res, next){
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});