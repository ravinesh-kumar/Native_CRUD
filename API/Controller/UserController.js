//Model call kro 
// const { log } = require("console")
const User = require("../Models/User")
const fs = require("fs")
// for all record 
async function getRecord(req, res) {
    try {
        let data = await User.find().sort({ _id: -1 })  //sort data in descending order
        res.send({ status: 200, result: "Data Received Successfully", count: data.length, data: data })
    } catch (error) {
        res.send({ status: 500, result: "Failed", message: "Internal Server Error" })
    }

}
// create data
async function createRecord(req, res) {
    try {
        const data = new User(req.body);
        if (req.files.pic1) {
            data.pic1 = await req.files.pic1[0].path
        }
        await data.save()
        res.send({ status: 200, result: "Data saved Sucessfullly", data: data })
    } catch (error) {
        console.log(error);
        res.send({ status: 500, result: "Failed", message: "Internal Server Error" })



    }
}
// for single record
async function getSingleRecord(req, res) {
    let data = await User.findOne({ _id: req.params._id })

    if (data) {
        res.send({ status: 200, result: "Data Found Get Single Record", data: data })
    }
    else {
        res.send({ status: 404, result: "Result", message: "Data Not Found" })
    }
}
// Update Data
async function getDataUpdate(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.email = req.body.email ?? data.email
            data.phone = req.body.phone ?? data.phone
            data.message = req.body.message ?? data.message
            if (req.files.pic1) {
                try {
                    fs.unlinkSync(data.pic1)
                } catch (error) { }

                data.pic1 = await req.files.pic1[0].path
            }
            await data.save()
            res.send({ status: 200, result: "Data Saved", message: "Data Saved Successfully" })
        }
        else {
            res.send({ status: 500, result: "Data Not Found", message: "Invalid Entry / Data Not Found" })
        }
    } catch (error) {
        console.log(error);
        if (error.keyValue) {
            res.send({ status: 401, result: "failed", message: "Data already Exists" })
        }
        else {
            res.send({ status: 500, result: "Error occured", message: "Internal Server Error at getdataupdate" })
        }
    }
}

async function deleteData(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data) {
            try {
                await fs.unlinkSync(data.pic1)
            } catch (error) { }
            await data.deleteOne()
            res.send({ status: 200, result: "Data Delete Successfully", message: "Record Deleted " })
        }
        else {
            res.send({ status: 404, result: "Data Not Found", message: "Data Not Found" })
        }
    } catch (error) {
        console.log(error);
        res.send({ status: 500, result: "Failed", message: "Internal Server Error" })
    }


}


module.exports = {
    getRecord: getRecord,
    createRecord: createRecord,
    getSingleRecord: getSingleRecord,
    getDataUpdate: getDataUpdate,
    deleteData: deleteData,

}