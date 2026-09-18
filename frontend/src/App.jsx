import "./style/app.css";
import Navbar from "./components/Navbar";
import AddTask from "./components/AddTask";
import List from "./components/List";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/add" element={<AddTask />} />
      </Routes>
    </>
  );
}

export default App;