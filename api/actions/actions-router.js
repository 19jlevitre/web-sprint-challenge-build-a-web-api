const express = require('express');
const Action = require('./actions-model.js');
const router = express.Router();
const {
    checkActionId,
    validateAction,
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

router.post('/', validateAction, (req, res, next) => {
    Action.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })

});

router.put('/:id', checkActionId, validateAction, (req, res, next) => {


    Action.update(req.params.id, req.body)
        .then(updatedAction => {
            res.json(updatedAction)
        }).catch(err => {
            console.log(err)
            next()
        })

});

router.delete('/:id', checkActionId, (req, res, next) => {
    Action.remove(req.params.id)
        .then(() => {
            res.status(200).json(req.actionFromDb)
        }).catch(next)

});

module.exports = router
