import express from "express"
import Connection from './database/db.js'
import dotenv from 'dotenv';
import Routes from "./routes/route.js";
// import bodyParser from 'body-parser';
import cors from 'cors'
import xssclean from 'xss-clean'

const corsOptions = {
  origin:  [ 'http://localhost:3000' ] ,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Access-Control-Allow-Headers',
  ],
};


dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;


const app = express()
const port = process.env.PORT || 8000;

app.use(xssclean())
app.disable('x-powered-by');

  app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', Routes)



Connection(username, password)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})