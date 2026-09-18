
import { Link } from 'react-router-dom'
import '../style/navbar.css'

function Navbar() {
  return (
    <nav className='navbar'>
      <div className='logo'>ToDo App</div>
      <ul className='nav-links'>
        <li><Link to="/">List</Link></li>
        <li><Link to="/add">Add Task</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
