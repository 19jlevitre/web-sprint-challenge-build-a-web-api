const Project = require('./projects-model.js');

function checkProjectId(req, res, next) {
    Project.get(req.params.id)
        .then(possibleProject => {
            if (possibleProject) {
                req.projectFromDb = possibleProject
                next()
            } else {
                next({ status: 404, message: "project not found" })
            }
        })
        .catch(next)
}

function validateProject(req, res, next) {
    const { name, description} = req.body
    if (name && description) {
        next()
    } else {
        return res.status(400).json()
    }
}

function validateProjectUpdate(req, res, next) {
    const { name, description, complete} = req.body
    if(!name || !description || complete) {
        res.status(400).json()
    } else {
        next()
    }
}

module.exports = {
    checkProjectId,
    validateProject,
    validateProjectUpdate,
}
