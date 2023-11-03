require("dotenv").config();

//Express
const express = require("express");
const app = express();
const port = 7895;

//PACKAGES
const cookieParser = require("cookie-parser");

//DATABASE
const connectDatabase = require("./db/connect");

//ROUTERS
const adminRouter = require("./routes/adminRouter");
const studentRouter = require("./routes/studentRouter");
const courseRouter = require("./routes/courseRouter");

//NotFound and ErrorHandler Middlewares
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

app.use(cookieParser(process.env.JWT_SECRET_TOKEN));
app.use(express.json());

//SETUP ROUTERS
app.use("/api/tech-pros/admins", adminRouter);
app.use("/api/tech-pros/students", studentRouter);
app.use("/api/tech-pros/courses", courseRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDatabase(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is live on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
