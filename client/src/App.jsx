// import './App.css'
import Home from './components/Home/Home'
import EditorPage from './components/Editor/EditorPage'
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
      <div><Toaster position="top-center"></Toaster></div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/editor/:roomId' element={<EditorPage />} />
      </Routes>
    </>

  )
}

export default App
