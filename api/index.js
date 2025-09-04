import express from "express";
import cors from "cors";
import registerRouter from "./register.js";
const app = express()
const port = 5000


app.use(cors());
app.use(express.json())

// Available Routes
app.use("/api/register", registerRouter)