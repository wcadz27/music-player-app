const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware.js");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const usersRouter = require("./routes/users");
const playlistsRouter = require("./routes/playlists");

app.use("/users", usersRouter);
app.use("/playlists", playlistsRouter);

//Middlewares
app.use(errorHandler);
//End of Middlewares

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
