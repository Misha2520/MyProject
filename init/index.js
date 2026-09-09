const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() =>{
    console.log("connection to DB");
    return initDB(); 
  })
  .catch((err) =>{
    console.log(err);
  });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((ob) => ({ ...ob, owner: "6a819e641a0b02b6728104a5"}));
    await Listing.insertMany( initData.data);
    console.log("data was initialized");
}

initDB();