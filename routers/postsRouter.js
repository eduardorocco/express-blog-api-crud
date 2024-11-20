const express = require('express')
const router = express.Router()
const postsController = require('../controllers/postscontroller.js')

///////////CRUD/////////////////

// index
router.get('/', postsController.index)

// show 

router.get('/:id', postsController.show)

// store 
router.post('/', postsController.store)

// update
router.put('/:id', postsController.update)

// modify
router.patch('/:id', postsController.modify)

// destroy
router.delete('/:id', postsController.destroy)

module.exports = router