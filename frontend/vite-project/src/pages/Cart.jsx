import { useState } from 'react'
import { Link } from 'react-router-dom'

const readWishlist = () => {
  try {
    return JSON.parse(localStorage.getItem('shopkart-wishlist') || '[]')
  } catch {
    return []
  }
}

function Cart() {
  const [items, setItems] = useState(readWishlist)

  const removeItem = (id) => {
    const nextItems = items.filter((item) => item._id !== id)
    localStorage.setItem('shopkart-wishlist', JSON.stringify(nextItems))
    setItems(nextItems)
  }

  if (items.length === 0) {
    return <section className="mx-auto max-w-3xl px-6 py-24 text-center"><p className="text-sm font-bold uppercase tracking-[0.24em] text-[#e56b45]">Your wishlist</p><h1 className="mt-3 text-4xl font-bold">Your wishlist is empty.</h1><p className="mt-4 text-[#68756b]">Save the pieces you love for later.</p><Link to="/products" className="mt-8 inline-block rounded-xl bg-[#17211b] px-5 py-3 font-bold text-white transition hover:bg-[#e56b45]">Browse products</Link></section>
  }

  return <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8"><div className="flex items-end justify-between gap-5"><div><p className="text-sm font-bold uppercase tracking-[0.24em] text-[#e56b45]">Your wishlist</p><h1 className="mt-2 text-5xl font-bold tracking-tight">Saved for later.</h1></div><Link to="/products" className="text-sm font-bold text-[#c95333] hover:underline">Continue shopping</Link></div><div className="mt-10 space-y-4">{items.map((item) => <article key={item._id} className="flex gap-4 rounded-2xl border border-[#dfe6dc] bg-white p-4"><img src={item.image} alt={item.name} className="h-24 w-24 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="text-xs font-bold uppercase tracking-wider text-[#e56b45]">{item.category}</p><h2 className="mt-1 truncate text-lg font-bold">{item.name}</h2><p className="mt-2 text-sm text-[#68756b]">${Number(item.price).toFixed(2)} x {item.quantity}</p></div><button type="button" onClick={() => removeItem(item._id)} className="self-start text-sm font-bold text-[#bd482a] hover:underline">Remove</button></article>)}</div></section>
}

export default Cart
