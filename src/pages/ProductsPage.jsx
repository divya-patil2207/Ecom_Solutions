import { useEffect, useMemo, useState } from 'react'
import { ProductCard } from '../components/ProductCard.jsx'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { usePagination, useProducts } from '../hooks/useProducts'

export default function ProductsPage() {
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search, 350)

  const { filtered, categories, loading, error } = useProducts({
    category,
    search: debouncedSearch,
  })

  const { page, totalPages, pagedItems, next, prev, goTo, setPage } =
    usePagination(filtered, 8)

  useEffect(() => {
    setPage(1)
  }, [category, debouncedSearch, setPage])

  const resultsText = useMemo(() => {
    if (loading) return 'Loading products…'
    if (error) return 'Could not load products.'
    return `${filtered.length} result(s)`
  }, [loading, error, filtered.length])

  return (
    <div className="stack">
      <div className="row between wrap gap">
        <div>
          <h1 className="h1">Products</h1>
          <div className="muted">{resultsText}</div>
        </div>

        <div className="row wrap gap">
          <label className="field">
            <span className="label">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="label">Search</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title or description…"
            />
          </label>
        </div>
      </div>

      {loading && <div className="card">Loading…</div>}
      {error && (
        <div className="card danger">
          <div className="h2">Error</div>
          <div className="muted">{String(error.message || error)}</div>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="grid">
            {pagedItems.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="card row between wrap gap">
            <div className="row gap">
              <button className="btn" onClick={prev} disabled={page <= 1}>
                Prev
              </button>
              <button
                className="btn"
                onClick={next}
                disabled={page >= totalPages}
              >
                Next
              </button>
            </div>

            <div className="row gap">
              <span className="muted">
                Page {page} / {totalPages}
              </span>
              <label className="field compact">
                <span className="label">Go to</span>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={page}
                  onChange={(e) => goTo(e.target.value)}
                />
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

