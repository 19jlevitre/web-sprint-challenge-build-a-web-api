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

router.put('/:id', checkProjectId, validateProject, (req, res, next) => {
   
   
    Project.update(req.params.id, req.body)
        .then(updatedProject => {
            res.json(updatedProject)         
        }).catch(err => {
        console.log(err)
        next()
    })
  
});

router.delete('/:id', checkProjectId, (req, res, next) => {
    Project.remove(req.params.id)
    .then(() => {
        res.status(200).json(req.projectFromDbprojectFromDb)
    }).catch(next)

});

router.get('/:id/actions', (req, res, next)=> {

});



module.exports = router
