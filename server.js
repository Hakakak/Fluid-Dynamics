const express = require("express");
const app = express();

app.use(express.static(__dirname + "/"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "./index.html")
})

app.set("port", process.env.PORT || 8080)

app.listen(app.get("port"), () => {
    console.log("Server started on " + app.get("port"));
})