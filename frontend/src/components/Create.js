import { useHistory, Link } from "react-router-dom"
import axios from 'axios'

export default function Create({
  newNote,
  changeNewNote,
  setNewNote
}) {

  const history = useHistory()
  
  const submitNewNote = () => {
    axios.post('/post', newNote)
    setNewNote({
      title: '',
      content: ''
    })
    history.push('/')
  }
  
  return (
    <div className='card container p-3' style={{ marginTop: '6rem'}}>
      <p className='mb-0'>Title:</p>
      <div className='form-group mb-3 border rounded'>
        <input
          name='title'
          onChange={changeNewNote}
          value={newNote.title}
          className='form-control ps-1 pe-1'
        />
      </div>
      <p className='mb-0'>Content:</p>
      <div className='form-group mb-3 border rounded'>
        <textarea
          name='content'
          onChange={changeNewNote}
          value={newNote.content}
          className='form-control ps-1 pe-1'
        />
      </div>
      <div className='text-end'>
        <button
          onClick={submitNewNote}
          className='btn btn-md btn-outline-info'
        >SAVE</button>
        <Link
          to='/'
          className='btn btn-md btn-outline-info ms-2'
          onClick={()=>setNewNote({title: '', content: ''})}
        >CANCEL</Link>
      </div>
    </div>
  )
}
