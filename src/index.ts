import express, { Express, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
dotenv.config();
import db from "./lib/db";
import indexRouter from "./router";


const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/uploads',express.static(path.join(__dirname,'src/uploads')))


app.use(indexRouter)

app.get("/", (_, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port,async () => {
  await db.$connect ()
  console.log(`[server]: Server is running at http://localhost:${port}`);
});