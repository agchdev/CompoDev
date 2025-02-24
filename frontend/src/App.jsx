import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Plantilla from './layout/Plantilla';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Plantilla />}>
            {/* <Route path='/' element={<Home />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
