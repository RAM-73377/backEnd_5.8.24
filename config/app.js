const express =  require('express');
let appInstance = null;

const getApp = () => {
    if(!appInstance) {
        appInstance = express();
    }
    return appInstance;
};

module.exports = { getApp };