import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Registrar from './pages/Registrar'
import OlvidePassword from './pages/OlvidePassword'
import NuevoPassword from './pages/NuevoPassword'
import ConfirmarCuenta from './pages/ConfirmarCuenta'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Area publica */}
        <Route path='/' element={<AuthLayout/>}>
          <Route index element={<Login/>}/>
          <Route path='registrar' element={<Registrar/>}/>
          <Route path='olvide-password' element={<OlvidePassword/>}/>
          <Route path='olvide-password/:token' element={<NuevoPassword/>}/>
          <Route path='confirmar/:id' element={<ConfirmarCuenta/>}/>
        </Route>
        {/* Area privada */}
        {/* <Route path='/'>

        </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App