const express = require("express")
const path = require("path")
const session = require("express-session")
const db = require("siennasql")

const app = express()
db.connect("didheconnect.db")

app.use(
    express.static(
        path.join(__dirname, "public")
    )
)

app.use(
    session(
        {
            secret: "ia2attempt",
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 60000 * 60
            }
        }
    )
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.all(
    "/",
    (req, res) => {
        res.sendFile("./index.html")
    }
)
app.all(
    "/register",
    (req, res) => {
        let u = req.body.userID
        let sql = "INSERT ? INTO USER"
        db.run(sql,[username,password])
    }
)

app.all(
    "/login",
    (req, res) => {

    }
)

app.all(
    "/getUsersFromServer",
    (req, res)=>{
        let list = ["All Users"]
        let sql = "SELECT * FROM USERS WHERE ? = ?"
        db.run(sql, [])
    }
)

app.post(
    "/addFriend",
    (req, res)=>{
        let sender = req.body.sender
        let receiver = req.body.receiver

        req.session.userID = 1

        let friendship = "SELECT ID AND USERNAME FROM USERS WHERE ? = ?"
        db.run(sql, [])
    }
)

app.listen(
    3000,
    () => {
        console.log("Listening on port 3000")
    }
)