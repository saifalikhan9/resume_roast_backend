import express from "express";
import fileupload from "express-fileupload";
import cors from "cors";
import router from "../src/route.js";

// const port = 3001;
const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
// app.use(fileupload());
app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});
// app.use(router);
app.listen(3001);

export default app;
