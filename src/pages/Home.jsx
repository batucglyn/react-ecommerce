import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from "../data/products"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

let list = [...PRODUCTS].slice(0, 8)

export default function Home() {
    return (
        <section className="relative">
            {/* Arkaplan tonlama */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 to-transparent" />

            {/* Hero */}
            <div className="py-12 text-center max-w-4xl mx-auto px-4">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Tailwind & React
                    </span>{" "}
                    with Ecommerce
                </h1>
                <p className="mt-3 text-gray-600">
                    Modern, hızlı ve şık bir e-ticaret deneyimi.
                </p>

                <div className="mt-6 flex items-center justify-center gap-3">
                    <Link
                        to="/products"
                        className="h-10 px-5 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition  flex items-center justify-center"
                    >
                        Tüm Ürünler
                    </Link>
                    <Link
                        to="/cart"
                        className="h-10 px-5 rounded-md border border-orange-300 text-white bg-orange-500 
             hover:bg-orange-600 transition duration-200 flex items-center justify-center"
                    >
                        Sepete Git
                    </Link>
                </div>

                {/* İnce ayraç */}
                <div className="mt-8 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            </div>

            {/* Küçük özellik şeritleri */}
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid gap-3 sm:grid-cols-3 text-sm mb-8">
                    <div className="rounded-lg border bg-white px-4 py-2.5 flex items-center justify-center gap-2">
                        <span>🚚</span> <span>₺250+ ücretsiz kargo</span>
                    </div>
                    <div className="rounded-lg border bg-white px-4 py-2.5 flex items-center justify-center gap-2">
                        <span>🔒</span> <span>Güvenli ödeme</span>
                    </div>
                    <div className="rounded-lg border bg-white px-4 py-2.5 flex items-center justify-center gap-2">
                        <span>💬</span> <span>7/24 destek</span>
                    </div>
                </div>
            </div>

            {/* Ürünler */}
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="mb-4 text-lg font-semibold text-slate-800">Popüler Ürünler</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {list.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar
                theme="colored"
            />
        </section>
    )
}
