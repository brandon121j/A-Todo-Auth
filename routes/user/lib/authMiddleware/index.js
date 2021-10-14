const { jwtMiddleware } = require('./shared/jwtMiddleware')
const { checkIsEmpty } = require('./shared/checkIsEmpty');
const { checkIsUndefined } = require('./shared/checkIsUndefined');
const { validateCreateData } = require('./authCreateMiddleware/validateCreateData');
const { validateLoginData } = require('./authLoginMiddleware/validateLoginData');
const { validateUpdateData } = require('./authUpdateMiddleware/validateUpdateData');

module.exports = {
    jwtMiddleware,
    checkIsEmpty,
    checkIsUndefined,
    validateCreateData,
    validateLoginData,
    validateUpdateData
}