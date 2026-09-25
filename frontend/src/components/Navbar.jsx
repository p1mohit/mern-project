
import { Link,useNavigate } from 'react-router-dom'
import '../style/navbar.css'
import { useEffect, useState } from 'react'

function Navbar() {
 const [login, setLogin] = useState(localStorage.getItem('login'))
 const navigate=useNavigate()
 const logout=()=>{
  localStorage.removeItem("login");
localStorage.removeItem("token");
setLogin(null);
setTimeout(() => {
  navigate("/login",{replace:true});
},0);
//navigate("/login",{replace:true});
 }
 useEffect(()=>{
 const handleStorage=()=>{
  setLogin(localStorage.getItem('login'))
 }
 window.addEventListener("localStorage-change",handleStorage)
 return()=>{
  window.removeEventListener("localStorage-change", handleStorage)
 }
 },[]);
  return (
    <nav className='navbar'>
      <div className='logo'>ToDo App</div>
      <ul className='nav-links'>
        {
          login ?
          <>
          <li><Link to="/">List</Link></li>
        <li><Link to="/add">Add Task</Link></li>
        <li><button onClick={logout}>Logout</button></li>
        </>:null
        }
      </ul>
    </nav>
  )
}
export default Navbar
