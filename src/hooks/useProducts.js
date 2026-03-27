import { useMemo, useState } from 'react'
import { useFetch } from './useFetch'

const API = 'https://fakestoreapi.com/products'

function normalize(s) {
  return String(s ?? '').trim().toLowerCase()
}

export function useProducts({ category, search }) {
  const { data, loading, error } = useFetch(API)
  const products = Array.isArray(data) ? data : []

  const categories = useMemo(() => {
    const set = new Set()
    for (const p of products) {
      if (p?.category) set.add(p.category)
    }
    return ['all', ...Array.from(set).sort()]
  }, [products])

  const filtered = useMemo(() => {
    const c = normalize(category)
    const q = normalize(search)

    return products.filter((p) => {
      if (c && c !== 'all' && normalize(p.category) !== c) return false
      if (!q) return true
      return (
        normalize(p.title).includes(q) ||
        normalize(p.description).includes(q)
      )
    })
  }, [products, category, search])

  return { products, filtered, categories, loading, error }
}

export function usePagination(items, pageSize = 8) {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))

  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * pageSize
  const pagedItems = items.slice(start, start + pageSize)

  function next() {
    setPage((p) => Math.min(totalPages, p + 1))
  }
  function prev() {
    setPage((p) => Math.max(1, p - 1))
  }
  function goTo(n) {
    setPage(Math.min(totalPages, Math.max(1, Number(n) || 1)))
  }

  return { page: safePage, totalPages, pagedItems, next, prev, goTo, setPage }
}

