// *** IMPORTS ***
const express = require("express");
// this middleware will apply try catch block in our controllers
// automatically so we dont need to add it manually
require("express-async-errors");
const connectDB = require("./db/connect");
require("dotenv").config();
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const morgan = require("morgan");
const authRouter = require("./routes/AuthRoutes");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");

const app = express();

// *** MIDDLEWARE ***
// morgan
app.use(morgan("tiny"));
// cookie parser, with it every time browser will be sending request with
// the cookies, and we will have access in req.cookies on the server
app.use(cookieParser(process.env.JWT_SECRET));
// json middleware
app.use(express.json());

// *** ROUTES ***
app.get("/", (req, res) => {
  // console.log(req.signedCookies);
  res.send("<h1>E-commerce App</h1>");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
//errors middleware    404(not found)goes first!!!
// we hit this only then route does not exist
app.use(notFound);
// this for handling errors in existing routes
app.use(errorHandler);

// *** CONNECT TO SERVER ***
const port = process.env.PORT || 5000;

const connect = async () => {
  try {
    //connect to db
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

connect();
