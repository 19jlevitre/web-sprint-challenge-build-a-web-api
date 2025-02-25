const express = require('express');
const Project = require('./projects-model');
const router = express.Router();
const {
    checkProjectId,
    validateProject,
    validateProjectUpdate,
} = require('./projects-middleware')

router.get('/', (req, res) => {
    Project.get(req.params.id)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            console.log(error)
        });
});

router.get('/:id', checkProjectId, (req, res) => {
    res.status(200).json(req.projectFromDb)

});

router.post('/', validateProject, (req, res) => {
    Project.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })

});

router.put('/:id', checkProjectId, validateProjectUpdate, (req, res, next) => {
        
            Project.update(req.params.id, req.body)
            .then(updated => {
                return res.json(updated)
            })
});

router.delete('/:id', checkProjectId, (req, res, next) => {
    Project.remove(req.params.id)
        .then(() => {
            res.status(200).json(req.projectFromDb)
        }).catch(next)

});

router.get('/:id/actions', (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(actions => {
            res.json(actions)
        }).catch(err => {
            console.log(err)
        })

});

module.exports = router
