const ProductRouter = require("express").Router()
const multer = require("multer")
const { getRecord, createRecord, getSingleRecord, getDataUpdate, deleteData } = require("../Controller/UserController")


const storage = multer.diskStorage({
    //cb is call back
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/User')
    },
    filename: function (req, file, cb) {

        cb(null, Date.now() + file.originalname)  //file name is unique
    }
})


const upload = multer({ storage: storage })

ProductRouter.get("/", getRecord)
// single hongi to field  and multiple hogi toh field
// middleware drawback iss if errror occur in name , maincategory etc in product database
// the show error but the thing is the picture we upload can be save too database 
// we cannt handle this
ProductRouter.post("/", upload.fields([
    { name: "pic1", maxCount: 1 },
    { name: "pic2", maxCount: 1 },
    { name: "pic3", maxCount: 1 },
    { name: "pic4", maxCount: 1 }
]), createRecord)
ProductRouter.get("/:_id", getSingleRecord)
ProductRouter.put("/:_id", upload.fields([
    { name: "pic1", maxCount: 1 },
    { name: "pic2", maxCount: 1 },
    { name: "pic3", maxCount: 1 },
    { name: "pic4", maxCount: 1 }
]), getDataUpdate)
ProductRouter.delete("/:_id", deleteData)

module.exports = ProductRouter
