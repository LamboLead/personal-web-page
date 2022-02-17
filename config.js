const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    HOST : process.env.HOST || 'localhost',
    PORT : process.env.PORT || 3000,
    EMAIL: process.env.EMAIL || "undefined",
    PASSWORD: process.env.PASSWORD || "undefined"
}

// Learn how to set up environment variables!!!