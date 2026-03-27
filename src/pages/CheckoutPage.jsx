import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../providers/CartContext.jsx'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, totalPrice, clearCart } = useCart()

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    payment: 'card',
  })

  const canSubmit = useMemo(() => {
    if (items.length === 0) return false
    return (
      form.name.trim() &&
      form.email.trim() &&
      form.address.trim() &&
      form.city.trim() &&
      form.zip.trim()
    )
  }, [form, items.length])

  function updateField(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function onSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    clearCart()
    navigate('/products')
  }

  if (items.length === 0) {
    return (
      <div className="stack">
        <div className="card">
          <h1 className="h1">Checkout</h1>
          <div className="muted">Your cart is empty.</div>
          <div className="row gap">
            <Link className="btn primary" to="/products">
              Browse products
            </Link>
            <Link className="btn" to="/cart">
              Back to cart
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="stack">
      <div className="row between wrap gap">
        <h1 className="h1">Checkout</h1>
        <Link className="btn" to="/cart">
          Back to cart
        </Link>
      </div>

      <div className="grid2">
        <form className="card stack" onSubmit={onSubmit}>
          <div className="h2">Shipping details</div>

          <label className="field">
            <span className="label">Name</span>
            <input
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Your name"
            />
          </label>

          <label className="field">
            <span className="label">Email</span>
            <input
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label className="field">
            <span className="label">Address</span>
            <input
              value={form.address}
              onChange={(e) => updateField('address', e.target.value)}
              placeholder="Street address"
            />
          </label>

          <div className="row gap">
            <label className="field" style={{ flex: 1 }}>
              <span className="label">City</span>
              <input
                value={form.city}
                onChange={(e) => updateField('city', e.target.value)}
              />
            </label>
            <label className="field" style={{ width: 140 }}>
              <span className="label">ZIP</span>
              <input
                value={form.zip}
                onChange={(e) => updateField('zip', e.target.value)}
              />
            </label>
          </div>

          <label className="field">
            <span className="label">Payment</span>
            <select
              value={form.payment}
              onChange={(e) => updateField('payment', e.target.value)}
            >
              <option value="card">Card</option>
              <option value="cod">Cash on delivery</option>
            </select>
          </label>

          <button className="btn primary" type="submit" disabled={!canSubmit}>
            Place order (${totalPrice.toFixed(2)})
          </button>

          {!canSubmit && (
            <div className="muted">
              Fill all fields to enable the button.
            </div>
          )}
        </form>

        <div className="card stack">
          <div className="h2">Order summary</div>
          <div className="stack">
            {items.map((i) => (
              <div key={i.id} className="row between gap">
                <div className="muted">
                  {i.title} × {i.quantity}
                </div>
                <div>${(i.price * i.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <hr className="sep" />
          <div className="row between gap">
            <div className="muted">Total</div>
            <div className="price">${totalPrice.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

