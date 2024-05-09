require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const {db} = require("./db/db")
const PORT  = process.env.PORT
const {readdirSync} = require("fs")
app.use(express.json())
app.use(cors())
// app.get("/", (req,res) => {
//     res.send("Hello")
// })
//routes 
readdirSync("./routes").map((route) => app.use("/api/v1", require("./routes/"+ route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log(`running on ${PORT}`)
    })
}
server()