const express = require('express');
const {getApp} = require('../config/app');
//const app = getApp();
const app = express();
const accountService = require('../account-service/account-service');
app.use('/api',accountService);

app.listen(4003, () => {
    console.log("Server listening on port 4003");
})

