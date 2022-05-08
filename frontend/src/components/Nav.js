import {Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="navbar fixed-top bg-secondary">
      <div className="container">
        <Link
          to='/'
          className='text-decoration-none'
          ><h1 className='display-6 text-info'>Blog</h1></Link>
        <Link
          to='/create'
          className='text-decoration-none'
        ><h1 className='display-6 text-info'>Create New Post</h1></Link>
      </div>      
    </nav>
  )
}
