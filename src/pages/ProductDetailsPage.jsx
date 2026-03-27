import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { useCart } from '../providers/CartContext.jsx'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const { data: product, loading, error } = useFetch(
    id ? `https://fakestoreapi.com/products/${id}` : null,
  )
  const { addItem } = useCart()

  if (loading) return <div className="card">Loading product…</div>
  if (error) {
    return (
      <div className="stack">
        <div className="card danger">
          <div className="h2">Error</div>
          <div className="muted">{String(error.message || error)}</div>
        </div>
        <Link className="btn" to="/products">
          Back to products
        </Link>
      </div>
    )
  }
  if (!product) return null

  return (
    <div className="stack">
      <div className="row between wrap gap">
        <Link className="btn" to="/products">
          ← Back
        </Link>
        <button className="btn primary" onClick={() => addItem(product)}>
          Add to cart
        </button>
      </div>

      <div className="card details">
        <div className="details-media">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="details-body">
          <h1 className="h1">{product.title}</h1>
          <div className="row gap wrap">
            <span className="pill">{product.category}</span>
            <span className="price">${product.price}</span>
          </div>
          <p className="muted">{product.description}</p>
          {product?.rating?.rate != null && (
            <div className="muted">
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

