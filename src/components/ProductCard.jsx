import { Link } from 'react-router-dom'
import { useCart } from '../providers/CartContext.jsx'

export function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <article className="card product-card">
      <Link to={`/products/${product.id}`} className="product-media">
        <img src={product.image} alt={product.title} loading="lazy" />
      </Link>

      <div className="product-body">
        <div className="product-title" title={product.title}>
          {product.title}
        </div>
        <div className="product-meta">
          <span className="pill">{product.category}</span>
          <span className="price">${product.price}</span>
        </div>

        <div className="row gap">
          <Link className="btn" to={`/products/${product.id}`}>
            View
          </Link>
          <button className="btn primary" onClick={() => addItem(product)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}

