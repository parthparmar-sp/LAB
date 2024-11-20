const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const { default: connectdb } = require("./utils/db.js");
dotenv.config({});
const app = express();

const AdminRoutes = require('./Routes/AdminRoutes.js')
const StudentRoutes = require('./Routes/StudentRoutes.js')

// import { AdminRoutes } from "./Routes/AdminRoutes.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  credentials: true, // Corrected to lowercase
};

app.use(cors(corsOptions));

const port = 3000;
// app.use("/api/v1/admin", AdminRoutes);
// app.use("/api/v1/student", StudentRoutes);
 
app.use('/api/auth',StudentRoutes)


app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
  connectdb();
});
