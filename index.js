const express = require('express');
const cors = require('cors')
const { connection_of_database } = require('./Connecton/connection');
const auth = require('./routes/auth');
const list = require('./routes/list');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/v1',auth)
app.use('/api/v1',list)


connection_of_database()

app.listen(3000,()=>{
    console.log("Server is running on port 3000")

})