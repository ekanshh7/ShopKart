import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import { fetchProducts } from '../services/api'

function Products() {
  const [filters, setFilters] = useState({search: '', category: 'All Categories', sort: ''})
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')

  const handleFilterChange = (name, value) => {
    setStatus('loading')
    setFilters((currentFilters) => ({...currentFilters, [name]: value}))
  }

  useEffect(() => {
    let isCurrent = true
    fetchProducts(filters)
      .then(({data}) => {
        if (isCurrent) {
          setProducts(data.products || [])
          setStatus('success')
        }
      })
      .catch(() => {
        if (isCurrent) setStatus('error')
      })

    return () => {
      isCurrent = false
    }
  }, [filters])

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#e56b45]">Discover</p>
          <h1 className="mt-2 text-5xl font-bold tracking-tight">Find your next favorite.</h1>
        </div>
        <p className="max-w-xs text-sm leading-6 text-[#68756b]">Browse useful, beautiful things selected for everyday living.</p>
      </div>
      <SearchBar filters={filters} onChange={handleFilterChange} />
      {status === 'loading' && <p className="py-20 text-center text-[#68756b]">Loading products...</p>}
      {status === 'error' && <p className="py-20 text-center text-[#bd482a]">Something went wrong while loading products.</p>}
      {status === 'success' && products.length === 0 && <p className="py-20 text-center text-[#68756b]">No products found.</p>}
      {status === 'success' && products.length > 0 && <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product._id} product={product} />)}</div>}
    </section>
  )
}

export default Products
