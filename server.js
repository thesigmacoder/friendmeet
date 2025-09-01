const express = require("express")
const path = require("path")
const session = require("express-session")
const db = require("siennasql")
const dbfunctions = require("./dbfunctions");

const app = express()
db.connect("didheconnect.db")


// https://expressjs.com/en/resources/middleware/session.html user login


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
    "/register",
    (req, res) => {
        let u = req.body.userID
        let sql = "INSERT ? INTO USER"
        db.run(sql,[username,password])
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
function isAuthenticated (req, res, next) {
  if (req.session.user) next()
  else next('route')
}

app.get("/profile", isAuthenticated, function (req, res) {
    // get profile information
})

app.get('/', isAuthenticated, function (req, res) {
  // this is only called when there is an authentication user due to isAuthenticated
//   res.send('hello, ' + escapeHtml(req.session.user) + '!' +
//     ' <a href="/logout">Logout</a>')

    res.sendFile(__dirname + "/public/index.html")
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/login.html")
//   res.send('<form action="/login" method="post">' +
//     'Username: <input name="user"><br>' +
//     'Password: <input name="pass" type="password"><br>' +
//     '<input type="submit" text="Login"></form>')
})

app.post('/login', express.urlencoded({ extended: false }), function (req, res) {
  // login logic to validate req.body.user and req.body.pass
  // would be implemented here. for this example any combo works

  // regenerate the session, which is good practice to help
  // guard against forms of session fixation

    let un = req.body.username
    let pass = req.body.password

    let result = dbfunctions.loginUser(un,pass)

    if (result == "fail"){
        console.error("login failed")
        res.sendFile(__dirname + "/public/error.html")
    }
    else {
        console.log(res,"login success")

        req.session.regenerate(function (err) {
            if (err) next(err)

            // store user information in session, typically a user id
            req.session.user = result
            req.session.user = req.body.username


            // save the session before redirection to ensure page
            // load does not happen before session is saved
            req.session.save(function (err) {
                if (err) return next(err)
                res.redirect('/')
            })
        })
}
})


app.get('/logout', function (req, res, next) {
  // logout logic

  // clear the user from the session object and save.
  // this will ensure that re-using the old session id
  // does not have a logged in user
  req.session.user = null
  req.session.save(function (err) {
    if (err) next(err)

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err)
      res.redirect('/')
    })
  })
})


app.use(
    express.static(
        path.join(__dirname, "public")
    )
)

app.listen(
    3000,
    () => {
        console.log("Listening on port 3000")
    }
)
