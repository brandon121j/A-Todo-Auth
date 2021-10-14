const { isEmpty } = require('validator');

function checkIsEmpty(req, res, next) {
    let body = req.body;
    let errObj = {};

    for (let iterator in body) {
        if (isEmpty(body[iterator])) {
            errObj[`${key}`] = `${key} cannot be empty`
        }
    }

    if (Object.keys(errObj).length > 0) {
        return res
            .status(500)
            .json({ 
                message: "ERROR",
                error: errObj
            })
    } else {
        next()
    }      
}

module.exports = {
    checkIsEmpty
}