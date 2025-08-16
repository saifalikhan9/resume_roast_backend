import express from "express";
import fileupload from "express-fileupload";

import cors from "cors";
import router from "./route.js";


const port = 3001;
const app = express();

app.use(cors());
app.use(fileupload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("working");
});

app.use(router)

export default app;
