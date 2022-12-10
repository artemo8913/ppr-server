const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const userRouter = require("./routes/user-router");
const pprRouter = require("./routes/ppr-router");
const companyDivisionsRouter = require("./routes/company-division-router");
const workRouter = require("./routes/work-router");

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/ppr", pprRouter);
app.use("/api/divisions", companyDivisionsRouter);
app.use("/api/work", workRouter);

const startServer = async (port) => {
  try {
    app.listen(port, () => console.log(`Server start on port = ${port}`));
  } catch (e) {
    console.log(e);
  }
};

startServer(port);
