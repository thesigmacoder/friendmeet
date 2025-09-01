const db = require("siennasql")

function initDb() {
    db.connect("didheconnect.db")
}

function registerUser(username, email, password, name, about, sex, dob, status) {
    let sql = "INSERT INTO USERS(USERNAME, EMAIL, PASSWORD, NAME, ABOUT_ME, SEX, DOB, STATUS) VALUES (?,?,?,?,?,?,?,?)"
    let res = db.run(sql, [username, email, password, name, about, sex, dob, status])

    // res.json({
    //     success: true
    // })
    if(res.error){
        console.error(res.error)
        return "fail"
        
    }
    return "success"

}

function loginUser(username, password) {
    let sql = "SELECT ID, PASSWORD FROM USERS WHERE USERNAME = ?"
    let res = db.run(sql, [username])

    if(res.length === 0){
        console.error("user does not exist")
        return "fail"
    }
    if(res[0].PASSWORD != password){
        console.error("password is incorrect")
        return "fail"
    }
    return (res[0].ID)
}

function getProfile(userID) {
    let sql = "SELECT * FROM USERS WHERE ID = ?"
    let res = db.run(sql, [userID])

    // add friends
    let profile = res[0]
    
    return profile
}

function updateProfile(userID, tags) {

}

function getNextUser(userID, tags) {

}

function markUserAsSeen(userID, userID) {

}

function createFriendRequest(userID, userID) {

}

function respondToFriendRequest(userID, acceptOrReject) {

}

function inviteToMeeting() {

}

function respondToMeetingInvite() {

}

module.exports = { initDb, registerUser, loginUser, getProfile };