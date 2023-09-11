import { Fragment } from 'react'
import { Header } from './components'
import { Route, Routes } from 'react-router-dom'
import { Home, Product } from './pages'
import './App.scss'

function App() {

  return (
    <Fragment>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/p/:id' element={<Product />} />
      </Routes>
    </Fragment>
  )
}

export default App
