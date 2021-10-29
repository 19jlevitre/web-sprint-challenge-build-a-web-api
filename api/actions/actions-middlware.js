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

function validateAction (req, res, next) {
    const { project_id , description, notes} = req.body
    if(project_id && description && notes) {
        next()
    } else {
        res.status(400).json()
    }
}

module.exports = {
    checkActionId,
    validateAction,
}