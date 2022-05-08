const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

// app
const app = express()

// middleware
app.use(express.json())
app.use(cors())

// connection
mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => console.log(err))
  .then(() => console.log('Connection to db successful.'))

// model
const noteSchema = {
  title: String,
  content: String,
}
const NoteModel = mongoose.model('NoteModel', noteSchema)

// routes
// post
app.post('/post', async (req, res) => {
  try {
    const newNote = new NoteModel({
      title: req.body.title,
      content: req.body.content
    })
    await newNote.save()
    console.log('New note saved to db.')
  }

  catch { err => console.log(err) }
})

// get
app.get('/', async (req, res) => {
  try {
    const noteArray = await NoteModel.find()
    res.json(noteArray)
  }
  catch(err){console.log(err)}
})

// delete
app.delete('/delete/:id', async (req, res) => {
  try {
    await NoteModel.findByIdAndDelete(req.params.id)
    console.log('Note deleted')
  }

  catch (err) {
    res.status(400).json(err)
  }
})

//find one
app.get('/find/:id', async (req, res) => {
  try {
    const noteToEdit = await NoteModel.findById(req.params.id)
    res.json(noteToEdit)
  }
  catch (err) {
    res.status(400).json(err)
  }
})

// put
app.put('/edit/:id', async (req, res) => {
  try {
    const editedNote = {
      title: req.body.title,
      content: req.body.content
    }
    await NoteModel.findByIdAndUpdate(req.params.id, { $set: editedNote })
  }

  catch(err){ console.log(err)}
})

// listen
app.listen(3001, () => console.log('Server listening on port 3001'))