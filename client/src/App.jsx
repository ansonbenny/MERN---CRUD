import { Fragment } from 'react'
import { Header } from './components'
import { Route, Routes } from 'react-router-dom'
import { Edit, Error, Home, Product } from './pages'
import { Forgot, Login, Register } from './features/auth'
import ProtectedRoute from './utils/ProtectedRoute'
import { useSelector } from 'react-redux'
import './App.scss'

function App() {
  const { header } = useSelector((state) => state?.additional)

  return (
    <Fragment>
      {header && <Header />}

      <Routes>
        <Route element={<ProtectedRoute isAuth />}>
          <Route path='/' exact element={<Home />} />
          <Route path='/p/:id' element={<Product />} />
          <Route path='/add' element={<Edit isAdd />} />
          <Route path='/edit/:id' element={<Edit />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/forgot' element={<Forgot />} />
          <Route path='/register' element={<Register />} />
        </Route>

        <Route path='/*' element={<Error />} />
      </Routes>
    </Fragment>
  )
}

export default App
