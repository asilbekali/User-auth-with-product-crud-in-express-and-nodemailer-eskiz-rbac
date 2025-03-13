const winston = require("winston");

require("winston-mongodb");

let { json, combine, timestamp } = winston.format;

const logger = winston.createLogger({
    level: "silly",
    format: combine(timestamp(), json()),
    transports: [
        new winston.transports.File({ filename: "logger.log" }),
        new winston.transports.Console(),
        new winston.transports.MongoDB({
            collection: "authLogs",
            db: "mongodb://localhost:27017/auth",
        }),
    ],
});

let registerLoger = logger.child({ module: "register" });
let loginLoger = logger.child({ module: "login" });
let resentOtpLoger = logger.child({ module: "resent otp" });
let verifyOtpLoger = logger.child({ module: "verify otp" });
let testRefreshLoger = logger.child({ module: "test refresh token" });
let accessRefreshTokenLoger = logger.child({
    module: "created acces and refresh token",
});
let sendSmsandEmailLoger = logger.child({ module: "otp send sms and email" });
let refreshTokenLoger = logger.child({ module: "resfresh token" });

//product loggers

let createProLoger = logger.child({ module: "resfresh token" });
let updateProLoger = logger.child({ module: "resfresh token" });
let deleteProProLoger = logger.child({ module: "resfresh token" });
let getAllProProLoger = logger.child({ module: "resfresh token" });
let getOneIdProProLoger = logger.child({ module: "resfresh token" });

module.exports = {
    createProLoger,
    updateProLoger,
    deleteProProLoger,
    getAllProProLoger,
    getOneIdProProLoger,
    refreshTokenLoger,
    sendSmsandEmailLoger,
    accessRefreshTokenLoger,
    testRefreshLoger,
    resentOtpLoger,
    registerLoger,
    loginLoger,
    verifyOtpLoger,
};
