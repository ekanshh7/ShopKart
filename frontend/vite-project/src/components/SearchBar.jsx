function SearchBar({filters, onChange}) {
  return (
    <div className="grid gap-3 rounded-2xl border border-[#dfe6dc] bg-white p-4 shadow-[0_12px_35px_rgba(43,58,45,0.05)] md:grid-cols-[1fr_190px_210px]">
      <label className="sr-only" htmlFor="product-search">Search products</label>
      <input
        id="product-search"
        type="search"
        value={filters.search}
        onChange={(event) => onChange('search', event.target.value)}
        placeholder="Search products..."
        className="rounded-xl border border-[#d5dfd3] px-4 py-3 outline-none transition focus:border-[#e56b45] focus:ring-2 focus:ring-[#e56b45]/15"
      />
      <label className="sr-only" htmlFor="product-category">Filter by category</label>
      <select
        id="product-category"
        value={filters.category}
        onChange={(event) => onChange('category', event.target.value)}
        className="rounded-xl border border-[#d5dfd3] bg-white px-4 py-3 outline-none focus:border-[#e56b45] focus:ring-2 focus:ring-[#e56b45]/15"
      >
        <option>All Categories</option>
        <option>Electronics</option>
        <option>Fashion</option>
        <option>Books</option>
        <option>Home</option>
      </select>
      <label className="sr-only" htmlFor="product-sort">Sort products</label>
      <select
        id="product-sort"
        value={filters.sort}
        onChange={(event) => onChange('sort', event.target.value)}
        className="rounded-xl border border-[#d5dfd3] bg-white px-4 py-3 outline-none focus:border-[#e56b45] focus:ring-2 focus:ring-[#e56b45]/15"
      >
        <option value="">Default</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  )
}

export default SearchBar
