const express = require("express")
const cors = require("cors")
require("./DbConnect")
const app = express();
app.use(express.json())
app.use(cors());
const router = require("./Router/RootRouter")
app.use("/api", router)

app.set(express.static("./public"))
app.use("/public", express.static("./public"))

app.listen(8000, () => {
    console.log("server running at  http://localhost:8000");
})