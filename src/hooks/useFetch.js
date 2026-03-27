import { useEffect, useMemo, useState } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const key = useMemo(() => url, [url])

  useEffect(() => {
    if (!key) return
    let cancelled = false
    const controller = new AbortController()

    async function run() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(key, { signal: controller.signal })
        if (!res.ok) throw new Error(`Request failed (${res.status})`)
        const json = await res.json()
        if (!cancelled) setData(json)
      } catch (e) {
        if (cancelled) return
        if (e?.name === 'AbortError') return
        setError(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    run()
    return () => {
      cancelled = true
      controller.abort()
    }
  }, [key])

  return { data, loading, error }
}

