const express = require('express')

    ,bodyParser = require('body-parser')

    ,path=require('path')

    ,session =require('express-session')

    ,FileStore = require('session-file-store')(session);

let app = express();

app.set('view engine', 'ejs');

app.set('views', 'views');

const Routes = require('./routes/myRoutes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views/js')));

app.use(session(
    {
        name:'beer_bank_session_cookie',
        secret: 'c@pv66in0',
        resave: false, 
        saveUninitialized: false,
        store: new FileStore(),
    }
));

app.use(Routes);


app.listen(3000, () => {
    console.log("Listening on port 3000");
});
