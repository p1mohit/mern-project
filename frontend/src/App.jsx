import "./style/app.css";
import Navbar from "./components/Navbar"
import AddTask from "./components/AddTask"
import List from "./components/List"
import UpdateTask from "./components/UpdateTask"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Protected from "./components/Protected";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Protected><List/></Protected>} />
        <Route path="/add" element={<Protected><AddTask/></Protected>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login/>} />
        <Route path="/update/:id" element={<Protected><UpdateTask/></Protected>} />
      </Routes>
    </>
  );
}
export default App;