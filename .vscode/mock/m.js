const db = require("quick.db")



db.set("user.test3.rooms", db.get("user.test3.rooms").slice(0,db.get("user.test3.rooms").length-2))