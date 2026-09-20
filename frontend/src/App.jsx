import "./style/app.css";
import Navbar from "./components/Navbar";
import AddTask from "./components/AddTask";
import List from "./components/List";
import UpdateTask from "./components/UpdateTask";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/update/:id" element={< UpdateTask />} />
      </Routes>
    </>
  );
}

export default App;