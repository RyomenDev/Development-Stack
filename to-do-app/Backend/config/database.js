
// this file is to ensure connection b/w database and application

const mongoose = require('mongoose');

require('dotenv').config(); //to get the env variables

const dbConnect =()=>{ 
    mongoose.connect(process.env.DATABASE_URL) // promise - resolve or reject
    .then(()=>console.log('DB connection successful'))
    .catch((err)=>{
        console.log('Error received in DB connection')
        process.exit(1); //exit the process with failure
    });
}

module.exports = dbConnect;
