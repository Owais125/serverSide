const mongoose = require("mongoose");



const connection_of_database =  () => {

  // await mongoose.connect("",{

  // })
  // mongoose.connect(process.env.MONGODB_URL)
  //   .then(() => console.log('Database is Connected!')).catch((err) => {
  //     console.log(err)
  //     console.log(process.env.MONGODB_URL)

  //   })
  mongoose.connect(process.env.MONGODB_URL, {});

  mongoose.connection.on("connected", () => {
    console.log("Mongodb is connected!");
    
  });

  mongoose.connection.on("error", (err) => {
    console.log("An error occured in database connection!", err);
  });

}


module.exports = { connection_of_database }