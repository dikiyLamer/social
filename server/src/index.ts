import express, { Express } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { AppDataSource } from "./configs/dataSource";
import appRouter from "./controllers";
import bodyParser from "body-parser"
import cors from "cors";
import passport from "passport";
import passportConf from "./configs/passport"

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
passportConf(passport);
app.use(cors());
app.use(bodyParser.json({limit: '5mb'}))
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', appRouter);

app.use(passport.initialize());
AppDataSource.initialize()
    .then(() => {
        console.log('init db');
    })
    .catch((error) => console.log(error))

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});