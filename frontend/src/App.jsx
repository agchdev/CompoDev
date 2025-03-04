import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Plantilla from './layout/Plantilla';
import Login from './pages/login';
import Home from './pages/Home';
import Register from './pages/Register';



function App() {

  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Plantilla />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App