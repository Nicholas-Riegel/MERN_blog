import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Edit({ noteToEdit, setNoteToEdit }) {
  
  const handleEditChange = (e) => {
    const { name, value } = e.target
    setNoteToEdit(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const submitEdit = (id) => {
    axios.put('/edit/' + id, noteToEdit)
    setNoteToEdit({
      title: '',
      content: '',
      id: ''
    })
  }

  return (
    <div className='card container border p-3 rounded' style={{ marginTop: '6rem'}}>
      <p className='mb-0'>Title:</p>
      <div className='form-group mb-3 border rounded'>
        <input
          type="text"
          name='title'
          value={noteToEdit.title}
          onChange={handleEditChange}
          className='form-control'
        />
      </div>
      <p className='mb-0'>Content:</p>
      <div className='form-group mb-3 border rounded'>
        <textarea
          name="content"
          value={noteToEdit.content}
          onChange={handleEditChange}
          className='form-control'
        />
      </div>
      <div className='text-end'>
        <Link
          to='/'
          onClick={()=>submitEdit(noteToEdit._id)}
          className='btn btn-md btn-outline-info'
          >SAVE</Link>
        <Link
          to='/'
          onClick={()=>setNoteToEdit({title: '', content: '', _id: ''})}
          className='btn btn-md btn-outline-info ms-2'
        >CANCEL</Link>
      </div>
    </div>
  )
}
