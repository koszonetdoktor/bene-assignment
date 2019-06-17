const express = require("express")
const bodyParse = require("body-parser")
const cookieParser = require("cookie-parser")
const path = require("path")
const routes = require("./routes")

const app = express()

app.use(bodyParse.json())
app.use(cookieParser())
app.use(routes)

let port = 5000
if (process.env.NODE_ENV === "production") {
    app.use(express.static("../ui/build"))
    app.get("/", (req, res) => {
        console.log("GET")
        res.sendFile(path.join(__dirname, "../ui/build", "index.html"))
    })
} else if (process.env.NODE_ENV === "develop") {
    console.log("set port")
    port = 3001
}

app.listen(port, () => console.log(`App is listening to port ${port}`))