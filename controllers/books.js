const router = require('express').Router()
const Books = require('../models/books')

router.get('/seed', (req, res) => {
    Books.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
      },
      {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
      },
      {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
      },
      {
        "title": "Wâˆ€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
      }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})

router.get('/:id', async (req,res) => {
    try {
        const { id } = req.params
        const books = await Books.findById(id)
        res.json(books)
    } catch (error) {
        console.log(error)
        res.status(400).json({'message': 'error fetching resource'})
    }
})

router.get('/', async (req,res) =>{
    try {
        const books = await Books.find()
        res.json(books)
    } catch (error) {
        console.log(error)
        res.status(400).json({'message': 'error fetching resource'})
    }
})

router.put('/:id', async (req,res) => {
    try {
        const { id } = req.params
        const books = await Books.findByIdAndUpdate(id,req.body)
        res.json(books)
    } catch (error) {
        console.log(error)
        res.status(400).json({'message': 'error updating resource'})
    }
})
router.delete('/:id', async (req,res) => {
    try {
        const { id } = req.params
        const books = await Books.findByIdAndDelete(id)
        res.status(303).json({'message': 'Delete successful'})
    } catch (error) {
        console.log(error)
        res.status(400).json({'message': 'error updating resource'})
    }
})
router.post('/', async (req,res) => {
    try {
        const books = await new Books(req.body).save()
        res.json(books)
    } catch (error) {
        console.log(error)
        res.status(400).json({'message': 'error creating resource'})
    }
})

module.exports = router