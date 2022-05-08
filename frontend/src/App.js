//dependencies
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { useState, useEffect} from 'react'
import axios from 'axios'

//components
import Nav from './components/Nav'
import Home from './components/Home'
import Create from './components/Create'
import Edit from './components/Edit'

//App
function App() {

  // new note functions
  const [newNote, setNewNote] = useState({
    title: '',
    content: ''
  })
  
  const changeNewNote = (e) => {
    const {name, value} = e.target
    setNewNote(prev => ({
      ...prev,
      [name]: value
    }))  
  }

  // Home functions
  
  const [notesArray, setNotesArray] = useState([{
    title: '',
    content: ''
  }])

  useEffect(() => {
    fetch('http://localhost:3001')
      .catch(err => console.log(err))
      .then(x => x.json())
      .then(x=>setNotesArray(x))
  }, [notesArray])
  
  // edit

  const [noteToEdit, setNoteToEdit] = useState({
    title: '',
    content: ''
  })

  const handleToEdit = (id) => {
    axios.get('/find/' + id)
    fetch('http://localhost:3001/find/' + id)
      .catch(err => console.log(err))
      .then(x => x.json())
      .then(x=>setNoteToEdit(x))
  }

  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path='/'>
          <Home
            notesArray={notesArray}
            handleToEdit={handleToEdit}
          />
        </Route>
        <Route path='/create'>
          <Create
            newNote={newNote}
            changeNewNote={changeNewNote}
            setNewNote={setNewNote}
          />
        </Route>
        <Route path='/edit'>
          <Edit
            noteToEdit={noteToEdit}
            setNoteToEdit={setNoteToEdit}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
