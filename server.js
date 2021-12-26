require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDbStore = require('connect-mongo');      
const passport = require('passport')

const PORT = process.env.PORT || 3000

// Database connection
// const url = 'mongodb://localhost/test';
const url = process.env.DB

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});
// const connection = mongoose.connection ;

// connection.on('error', console.error.bind(console, 'connection error:'));
// connection.once('open', () => {
//     console.log('Database connected...');
// });

// Session store
let mongoStore = MongoDbStore.create({
    mongoUrl: url,
    collection: 'sessions'
})

// Session config
app.use(session({
    secret: "SomeSecret",
    resave: false,
    store: mongoStore,          // save sessions in mongostore
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 }  // 24 hours
}))

// Passport config
const passportInit = require('./config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use(express.json())
app.use(express.urlencoded({ extended: false}))


// Global Middleware  
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()           
})

// routes
app.get('/', (req, res) => {
    res.send('Helloo')
})

app.use('/', require('./routes/web'))

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})