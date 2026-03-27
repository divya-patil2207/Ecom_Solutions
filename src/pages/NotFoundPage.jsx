import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="card stack">
      <h1 className="h1">404</h1>
      <div className="muted">That page does not exist.</div>
      <div className="row gap">
        <Link className="btn primary" to="/products">
          Go to products
        </Link>
        <Link className="btn" to="/">
          Home
        </Link>
      </div>
    </div>
  )
}

