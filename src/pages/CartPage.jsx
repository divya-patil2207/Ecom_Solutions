import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../providers/CartContext.jsx'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()

  // Local state for quantity inputs (assignment requirement).
  const [qtyDraft, setQtyDraft] = useState({})

  useEffect(() => {
    const next = {}
    for (const i of items) next[i.id] = String(i.quantity)
    setQtyDraft(next)
  }, [items])

  const isEmpty = items.length === 0

  const lineTotal = useMemo(
    () => (item) => (item.price * item.quantity).toFixed(2),
    [],
  )

  if (isEmpty) {
    return (
      <div className="stack">
        <div className="card">
          <h1 className="h1">Cart</h1>
          <div className="muted">Your cart is empty.</div>
          <div className="row gap">
            <Link className="btn primary" to="/products">
              Browse products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="stack">
      <div className="row between wrap gap">
        <h1 className="h1">Cart</h1>
        <Link className="btn primary" to="/checkout">
          Checkout
        </Link>
      </div>

      <div className="stack">
        {items.map((item) => (
          <div key={item.id} className="card cart-row">
            <img className="thumb" src={item.image} alt={item.title} />
            <div className="stack">
              <div className="cart-title">{item.title}</div>
              <div className="muted">${item.price}</div>
              <div className="row wrap gap">
                <label className="field compact">
                  <span className="label">Qty</span>
                  <input
                    type="number"
                    min="1"
                    value={qtyDraft[item.id] ?? String(item.quantity)}
                    onChange={(e) =>
                      setQtyDraft((m) => ({ ...m, [item.id]: e.target.value }))
                    }
                    onBlur={() =>
                      updateQuantity(item.id, Number(qtyDraft[item.id]))
                    }
                  />
                </label>
                <button className="btn" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            </div>
            <div className="cart-line-price">${lineTotal(item)}</div>
          </div>
        ))}
      </div>

      <div className="card row between wrap gap">
        <div className="muted">Total</div>
        <div className="price">${totalPrice.toFixed(2)}</div>
      </div>
    </div>
  )
}

