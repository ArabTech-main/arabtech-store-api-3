require('dotenv').config()
require('express-async-errors');

//express
const express = require('express')
const app = express()

// rest of the packages
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');


// database
const connectDB = require('./db/connect')

//  routers
const productsRoutes = require('./routes/routes')


// middleware
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
    message: 'Too many requests from this IP, please try again after 15 minutes'
  })
);


app.use(express.static('./public'))
app.use(express.json())
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());


// api routes
app.use('/api/v1/products',productsRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT | 5000

const start = async ()=>{
    try {
        // connect to DB
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log('server is listening on port ' + port)
        })
    } catch (error) {
        console.log('server error: ' + error)
    }
}

start()