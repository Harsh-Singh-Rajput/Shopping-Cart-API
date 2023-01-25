import express from "express"
import ProductRoute from "./routes/ProductRoute.js"
import dotenv from "dotenv"
dotenv.config()

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended:true}))

const PORT = 5000

app.get("/", (req,res) => {
    res.send("Server is Running ⚡⚡⚡")
})

app.use("/api/v1/products", ProductRoute)

app.listen(PORT, (req, res) =>{
    console.log("server is running on PORT =>", PORT)
})