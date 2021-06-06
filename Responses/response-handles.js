const Response = require('../models/response');

let resp = new Response();

var handler = {
    send20xResponse: (res, data, message, error, statusCode) => {
        resp.status = 1;
        resp.error = error;
        resp.data = data;
        resp.message = message;
        res.status(statusCode).json(resp);
    },
    send40xResponse: (res, data, message, error, statusCode) => {
        resp.status = 0;
        resp.error = error;
        resp.data = data;
        resp.message = message;
        res.status(statusCode).json(resp);
    },
    sendRequiredFieldsError(result, field){
        resp.status = 0;
        resp.data = null;
        resp.message = `${field} is required`;
        resp.error = {};
        result.status(400).json(resp);
    }
}

module.exports = handler;