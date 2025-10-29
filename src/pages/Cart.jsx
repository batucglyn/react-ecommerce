import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart() {
    const { items, increase, decrease, remove, clear, subtotal } = useCart();

    if (items.length === 0) {
        return (
            <div className="p-6 rounded-xl border bg-white text-center">
                Sepetin boş. <Link className="text-blue-600 underline" to="/products">Ürünlere göz at</Link>
            </div>
        );
    }

    return (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            {/* Ürünler */}
            <div className="rounded-xl border bg-white">
                <div className="p-4 border-b font-semibold">Sepet</div>
                <ul className="divide-y">
                    {items.map((it) => (
                        <li key={it.id} className="p-4 flex items-center gap-4">
                            <img src={it.img} alt={it.title} className="w-20 h-16 object-cover rounded-md border" />
                            <div className="flex-1">
                                <div className="font-medium">{it.title}</div>
                                <div className="text-gray-600">₺{it.price}</div>
                                <div className="mt-2 flex items-center gap-2">
                                    <button onClick={() => decrease(it.id)} className="h-8 w-8 rounded-md border font-bold text-gray-700 hover:bg-red-200 hover:border-red-400 transition duration-200">-</button>
                                    <span className="w-10 text-center">{it.qty}</span>
                                    <button onClick={() => increase(it.id)} className="h-8 w-8 rounded-md border font-bold text-gray-700 hover:bg-green-200 hover:border-green-400 transition duration-200">+</button>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold">₺{(it.price * it.qty).toFixed(2)}</div>
                                <button
                                    onClick={() => {
                                        remove(it.id);
                                        toast.error(`${it.title} sepetten kaldırıldı ❌`, {
                                            position: "bottom-right",
                                            autoClose: 2000,
                                            hideProgressBar: true,
                                            theme: "colored",
                                        });
                                    }}
                                    className="mt-2 text-sm font-semibold text-white bg-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg transition duration-300 ease-in-out"
                                >
                                    Sepetten Kaldır
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="p-4 border-t">
                    <button onClick={clear} className="h-9 px-4 rounded-md bg-yellow-400 text-black font-semibold shadow-md hover:bg-yellow-500 hover:shadow-lg transition duration-300 ease-in-out">
                        Sepeti Temizle
                    </button>
                </div>
            </div>

            {/* 🧾 Sipariş Özeti */}
            <div className="rounded-xl border bg-white h-fit p-4">
                <h2 className="font-semibold text-lg border-b pb-2 mb-3">
                    Sipariş Özeti
                </h2>
                <ul className="text-sm space-y-2">
                    {items.map((it) => (
                        <li key={it.id} className="flex justify-between">
                            <div className="text-gray-700">
                                {it.title} <span className="text-gray-500">x{it.qty}</span>
                            </div>
                            <div className="font-medium text-gray-800">
                                ₺{(it.price * it.qty).toFixed(2)}
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="border-t mt-4 pt-3 flex justify-between font-semibold">
                    <span>Toplam:</span>
                    <span>
                        ₺
                        {items
                            .reduce((total, it) => total + it.price * it.qty, 0)
                            .toFixed(2)}
                    </span>
                </div>

                <Link
                    to="/checkout"
                    className="mt-4 flex items-center justify-center h-9 px-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                    Ödemeye Geç
                </Link>

            </div>
            <ToastContainer />
        </div>
    )
}
