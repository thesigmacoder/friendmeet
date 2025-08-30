
const fs = require("fs")
const db = require("siennasql")
db.connect("didheconnect.db")
let data = fs.readFileSync("cemetery.csv", "utf-8")
data = data.split("\r\n")

data.forEach(
    (record,index) => {
        if (index === 0) {            return}
        record = record.trim()
        if (record.length===0) {return}
       
        let fields = record.split(",")
        for (let i=0; i<fields.length; i++){
            fields[i] = fields[i].trim()
            if (i===0) {
                fields[i]= parseInt(fields[i])
            }
        }
        // console.log(fields)
        // console.log(record)
       
        db.run("INSERT INTO USERS (ID,USERNAME,EMAIL,PASSWORD,ABOUT_ME,SEX,AGE,STATUS) VALUES (?,?,?,?,?,?,?,?)",fields,
            (err,rows)=> {
                console.log(err)
            }
        )
    }
)

