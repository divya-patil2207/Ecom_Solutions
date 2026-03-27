import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="stack">
      <div className="card hero">
        <h1 className="h1">E-Commerce Product Explorer</h1>
        <p className="muted">
          Browse products, filter by category, search, add items to a global cart,
          and checkout.
        </p>
        <div className="row gap">
          <Link className="btn primary" to="/products">
            Browse products
          </Link>
          <Link className="btn" to="/cart">
            Go to cart
          </Link>
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <div className="h2">Filters + Search</div>
          <div className="muted">Category dropdown and debounced search.</div>
        </div>
        <div className="card">
          <div className="h2">Cart (Context API)</div>
          <div className="muted">Persisted to localStorage.</div>
        </div>
      </div>
    </div>
  )
}

