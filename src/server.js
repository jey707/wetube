import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

// const gassipMiddleware = (req, res, next) => {
//   console.log(`Someone is going to:${req.url}`);
//   next();
// };

const handleHome = (req, res) => {
  return res.send("Hello main");
};
const handleLogin = (req, res) => {
  return res.send("Here login");
};

// app.use(gassipMiddleware);

app.use(logger);
app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () => console.log(`Server listening on port ${PORT}`);

app.listen(PORT, handleListening);
