import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

function readInitialCart() {
  try {
    const raw = localStorage.getItem('cart_v1')
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const product = action.product
      const existing = state.find((i) => i.id === product.id)
      if (existing) {
        return state.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        )
      }
      return [
        ...state,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ]
    }
    case 'REMOVE': {
      return state.filter((i) => i.id !== action.id)
    }
    case 'UPDATE_QTY': {
      const qty = Number(action.quantity)
      if (!Number.isFinite(qty)) return state
      if (qty <= 0) return state.filter((i) => i.id !== action.id)
      return state.map((i) => (i.id === action.id ? { ...i, quantity: qty } : i))
    }
    case 'CLEAR': {
      return []
    }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, readInitialCart)

  useEffect(() => {
    localStorage.setItem('cart_v1', JSON.stringify(items))
  }, [items])

  const cartCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  )

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      cartCount,
      totalPrice,
      addItem: (product) => dispatch({ type: 'ADD', product }),
      removeItem: (id) => dispatch({ type: 'REMOVE', id }),
      updateQuantity: (id, quantity) =>
        dispatch({ type: 'UPDATE_QTY', id, quantity }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
    }),
    [items, cartCount, totalPrice],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}

