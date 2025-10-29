import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export default function ProductCard({ product }) {
    const { id, title, price, img } = product
    const { addItem } = useCart();

    return (
        <div className="group rounded-xl border bg-white overflow-hidden [box-shadow:0_6px_20px_-8px_rgba(0,0,0,0.2)] hover:[box-shadow:0_10px_25px_-10px_rgba(0,0,0,0.3)] transition">
            <Link to={`/products/${id}`} className="block">
                <div className="aspect-[4/3] bg-gray-50">
                    <img src={img} alt={title} className="w-full h-full object-cover" />
                </div>
            </Link>
            <div className="p-4">
                <h3 className="font-semibold truncate" title={title}>{title}</h3>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">₺{price}</span>
                    <div className="flex items-center gap-2">
                        <Link to={`/products/${id}`} className="text-sm px-3 py-1.5 rounded-md border hover:bg-gray-50 ml-[10px]">
                            Detaylar
                        </Link>
                        <button
                            onClick={() => {
                                addItem(product, 1);
                                toast.success(`${title} sepete eklendi 🛒`, {
                                    position: "bottom-right",
                                    autoClose: 2000,
                                    hideProgressBar: true,
                                    theme: "colored",
                                });
                            }}
                            className="text-sm h-9 px-4 flex items-center justify-center rounded-md border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
                        >
                            Sepete Ekle
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
