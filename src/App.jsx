import { Suspense, lazy } from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import { useCart } from './providers/CartContext.jsx'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const ProductsPage = lazy(() => import('./pages/ProductsPage.jsx'))
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage.jsx'))
const CartPage = lazy(() => import('./pages/CartPage.jsx'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

function Nav() {
  const { cartCount } = useCart()

  return (
    <header className="app-header">
      <div className="container header-inner">
        <Link className="brand" to="/">
          Product Explorer
        </Link>
        <nav className="nav">
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart ({cartCount})</NavLink>
          <NavLink to="/checkout">Checkout</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default function App() {
  return (
    <div className="app">
      <Nav />
      <main className="container main">
        <Suspense fallback={<div className="card">Loading page…</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}
