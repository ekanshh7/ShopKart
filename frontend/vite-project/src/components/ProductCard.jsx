import { Link } from 'react-router-dom'

function ProductCard({product}) {
  const isOutOfStock = product.stock === 0

  return (
    <article className="overflow-hidden rounded-2xl border border-[#dfe6dc] bg-white shadow-[0_12px_35px_rgba(43,58,45,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(43,58,45,0.1)]">
      <div className="aspect-[4/3] overflow-hidden bg-[#edf2eb]">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#e56b45]">{product.category}</span>
          <span className={`text-xs font-semibold ${isOutOfStock ? 'text-[#bd482a]' : 'text-[#68756b]'}`}>
            {isOutOfStock ? 'Out of stock' : `${product.stock} in stock`}
          </span>
        </div>
        <h2 className="mt-3 truncate text-xl font-bold">{product.name}</h2>
        <p className="mt-2 text-2xl font-bold text-[#17211b]">${Number(product.price).toFixed(2)}</p>
        <Link to={`/products/${product._id}`} className="mt-5 block rounded-xl bg-[#17211b] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[#e56b45]">
          View Details
        </Link>
      </div>
    </article>
  )
}

export default ProductCard
