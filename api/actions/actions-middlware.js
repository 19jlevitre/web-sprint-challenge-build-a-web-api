// add middlewares here related to actions
const Action = require('./actions-model');

function checkActionId(req, res, next) {
    Action.get(req.params.id)
    .then(possibleAction => {
        if (possibleAction) {
            req.actionFromDb = possibleAction
            next()
        } else {
            next({ status: 404,message: "action not found"})
        }
    })
    .catch(next)
}

module.exports = {
    checkActionId,
}