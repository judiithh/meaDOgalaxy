import "./App.css";
import Todo from "./Todo";
import Pethouse from "./Pethouse";
import Home from "./home/home.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Todo />} />
      <Route path="/home" element={<Home />} />
      <Route path="/pethouse" element={<Pethouse />} />
    </Routes>
  );
}

export default App;
