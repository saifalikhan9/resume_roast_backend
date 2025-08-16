import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

app.listen(3001);

export default app;
