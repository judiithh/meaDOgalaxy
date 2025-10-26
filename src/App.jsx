import './App.css'
import Todo from './Todo'
import Pethouse from './Pethouse'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Todo />} />
      <Route path="/pethouse" element={<Pethouse />} />
    </Routes>
  )
}

export default App;
