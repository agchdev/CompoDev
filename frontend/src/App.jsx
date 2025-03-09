import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Plantilla from './layout/Plantilla';
import Login from './pages/login';
import Home from './pages/Home';
import Register from './pages/Register';
import Ide from './pages/Ide';
import CrearProyecto from './components/ide/CrearProyecto';
import Buscador from './components/Buscador';
import Perfil from './pages/Perfil';
import IA from './pages/IA';



function App() {

  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Plantilla />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/ide/:id' element={<Ide />} />
            <Route path='/crearProyecto' element={<CrearProyecto />} />
            <Route path='/search' element={<Buscador />} />
            <Route path='/profile/:id' element={<Perfil />} />
            <Route path='/res' element={<IA />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App