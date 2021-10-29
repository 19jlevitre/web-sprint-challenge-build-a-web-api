const express = require('express');
const Action = require('./actions-model.js');
const router = express.Router();
const {
    checkActionId,
} = require('./actions-middlware');
router.get('/', (req, res) => {
    Action.get(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        console.log(error)
    });
});

router.get('/:id', checkActionId, (req, res) => {
    res.status(200).json(req.actionFromDb)
});

// router.post('/', validateProject, (req, res, next) => {
//     Project.insert(req.body)
//     .then(newProject => {
//         res.status(201).json(newProject)
//     })

// });

// router.put('/:id', checkProjectId, validateProject, (req, res, next) => {
   
   
//     Project.update(req.params.id, req.body)
//         .then(updatedProject => {
//             res.json(updatedProject)         
//         }).catch(err => {
//         console.log(err)
//         next()
//     })
  
// });

// router.delete('/:id', checkProjectId, (req, res, next) => {
//     Project.remove(req.params.id)
//     .then(() => {
//         res.status(200).json(req.projectFromDbprojectFromDb)
//     }).catch(next)

// });

// router.get('/:id/actions', (req, res, next)=> {
//     Project.getProjectActions(req.params.id)
//     .then(actions => {
//         res.json(actions)
//     }).catch(err => {
//         console.log(err)
//     })

// });





module.exports = router
