import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from '@/context/CartContext'
import { CurrencyProvider } from '@/context/CurrencyContext'
import { Layout } from '@/components/Layout/Layout'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { Contact } from '@/pages/Contact'
import { ShopList } from '@/pages/Shop/ShopList'
import { Cart } from '@/pages/Shop/Cart'
import { Checkout } from '@/pages/Shop/Checkout'
import { Login } from '@/pages/Login'

export default function App() {
  return (
    <BrowserRouter>
      <CurrencyProvider>
        <CartProvider>
          <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/o-nas" element={<About />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/sklep" element={<ShopList />} />
            <Route path="/sklep/koszyk" element={<Cart />} />
            <Route path="/sklep/zamowienie" element={<Checkout />} />
            <Route path="/logowanie" element={<Login />} />
            <Route path="/rejestracja" element={<Login />} />
          </Route>
          </Routes>
        </CartProvider>
      </CurrencyProvider>
    </BrowserRouter>
  )
}
