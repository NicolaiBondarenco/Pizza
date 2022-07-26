import { Routes, Route } from 'react-router-dom'

import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import Cart from './Pages/Cart'
import FullPizzas from './Pages/FullPizzas/FullPizzas'

import '../src/scss/app.scss'
import MainLayout from './Pages/MainLayout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizzas/:id" element={<FullPizzas />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
