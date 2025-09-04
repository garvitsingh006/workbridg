import express from "express";
import cors from "cors";
import registerRouter from "./routes/register.js";
const app = express()
const port = 5000


app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'auth-token'], // Specify allowed headers
}));
app.use(express.json())

// Available Routes
app.use("/api/register", registerRouter)

app.listen(port, () => {
  console.log(`WorkBridg backend listening on port http://localhost:${port}`)
})