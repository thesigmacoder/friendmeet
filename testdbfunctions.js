
const dbfunctions = require("./dbfunctions");

let un = "test"
let pass = "12345.ABC"
let result
dbfunctions.initDb();
result = dbfunctions.registerUser(un, "test@email.com", pass,"fred", "hi", "male", "2000-04-21", "0");
console.log("registerUser", result);

result = dbfunctions.loginUser(un,pass);
console.log("loginUser", result);
let userID = result

result = dbfunctions.getProfile(userID);
console.log("getProfile",result);
