import { Fragment } from 'react'
import { Header } from './components'
import { Route, Routes } from 'react-router-dom'
import { Edit, Error, Home, Product } from './pages'
import { Forgot, Login, Register } from './features/auth'
import './App.scss'

function App() {

  return (
    <Fragment>
      {false && <Header />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/p/:id' element={<Product />} />
        <Route path='/add' element={<Edit isAdd />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot' element={<Forgot />} />
        <Route path='/register' element={<Register />} />

        <Route path='/*' element={<Error />} />
      </Routes>
    </Fragment>
  )
}

export default App
