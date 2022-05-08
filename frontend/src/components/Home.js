import axios from "axios"
import { Link } from 'react-router-dom'

export default function Home({
  notesArray,
  handleToEdit
}) {
  
  const handleDelete = (id) => {
    axios.delete('/delete/'+id)
  }

  return (
    <div style={{ marginTop: '6rem'}}>
      {notesArray.map((x, i) => (
        <div key={i} className='container card p-3 mb-3'>
          <p className='mb-0'>Title:</p>
          <h3 className='border rounded ps-1 pe-1'>{x.title}</h3>
          <p className='mb-0'>Content:</p>
          <p className='border rounded ps-1 pe-1'>{x.content}</p>
          <div className='text-end'>
            <button
              className='btn btn-md btn-outline-info'
              onClick={()=>handleDelete(x._id)}
            >DELETE</button>
            <Link
              to='/edit'
              className='btn btn-md btn-outline-info ms-2'
              onClick={()=>handleToEdit(x._id)}
            >EDIT</Link>
          </div>
        </div>
      ))}
    </div>
  )
}
