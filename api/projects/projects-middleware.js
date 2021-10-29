const Project = require('./projects-model.js');

function checkProjectId(req, res, next) {
    Project.get(req.params.id)
    .then(possibleProject => {
        if (possibleProject) {
            req.projectFromDb = possibleProject
            next()
        } else {
            next({ status: 404,message: "project not found"})
        }
    })
    .catch(next)
}


module.exports = {
    checkProjectId,
}