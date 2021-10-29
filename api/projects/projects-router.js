const express = require('express');
const Project = require('./projects-model');
const router = express.Router();
const {
    checkProjectId,
    validateProject,
} = require('./projects-middleware')

router.get('/', (req, res) => {
    Project.get(req.params.id)
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(error => {
        console.log(error)
        res.json([])
    });
});

router.get('/:id', checkProjectId, (req, res) => {
    res.status(200).json(req.projectFromDb)

});

router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.body)
    .then(newProject => {
        res.status(201).json(newProject)
    })

});

router.put('/:id', (req, res, next) => {

});

router.delete('/:id', (req, res, next) => {

});

router.get('/:id/actions', (req, res, next)=> {

});



module.exports = router
