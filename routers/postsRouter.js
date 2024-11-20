const express = require('express')
const router = express.Router()
const posts = require('../data/posts.js')

///////////CRUD/////////////////

// index
router.get('/', (req, res) => {
    res.json(posts)
})

// show con id////////////////

router.get('/:id',(req, res) => {
     const id = parseInt(req.params.id)
     const post = posts.find((el) => el.id === id)

     if (post){
         console.log(`Ecco il post con id: ${id}`)
          res.json(post)
      } else {
         res.json({message: `Post con id: ${id} non trovato`})
     }
 })


// // show con slug
// router.get('/:slug', (req, res) => {
//     const slug = req.params.slug
//     const post = posts.find((el) => el.slug === slug)

//     if (post) {
//         console.log(`Ecco il post con slug: ${slug}`);
//         res.json(post)
//     } else {
//         res.json({ message: `Post con slug ${slug} non trovato` })
//     }
// })

// store 
router.post('/', (req, res) => {
    res.send('Creo un nuovo post')
})

// update
router.put('/:id', (req, res) => {
    const id = req.params.id
    res.send(`Aggiorno il post con id: ${id}`)
})

// modify
router.patch('/:id', (req, res) => {
    const id = req.params.id
    res.send(`Modifico il post con id: ${id}`)
})

// destroy
router.delete('/:id', (req, res) => {
    const id = req.params.id
    res.send(`Elimino il post con id: ${id}`)
})

module.exports = router