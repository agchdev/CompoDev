import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Plantilla from './layout/Plantilla';
import Login from './pages/login';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Plantilla />}>
            <Route index element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
