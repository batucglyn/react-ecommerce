import { useParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    StarIcon,
    ShieldCheckIcon,
    TruckIcon,
    CheckBadgeIcon,
    PlusIcon,
    MinusIcon,
} from "@heroicons/react/24/solid";

export default function ProductDetail() {
    const { id } = useParams();
    const { addItem } = useCart();
    const [qty, setQty] = useState(1);

    const product = useMemo(
        () => PRODUCTS.find((p) => String(p.id) === String(id)),
        [id]
    );

    if (!product) {
        return (
            <div className="p-6 rounded-xl border bg-white">
                Ürün bulunamadı. <Link className="text-blue-600 underline" to="/products">Ürünlere dön</Link>
            </div>
        );
    }

    const { title, price, img, category, createdAt } = product;

    const inc = () => setQty((n) => Math.min(99, n + 1));
    const dec = () => setQty((n) => Math.max(1, n - 1));

    const handleAdd = () => {
        addItem(product, qty);
        toast.success(`${title} sepete eklendi 🛒`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            theme: "colored",
        });
    };

    return (
        <section className="relative">
            {/* yumuşak arka plan */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 to-transparent" />

            <div className="max-w-6xl mx-auto px-4">
                {/* Breadcrumb */}
                <div className="pt-6 pb-4 text-sm text-slate-500">
                    <Link to="/" className="hover:text-slate-700">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/products" className="hover:text-slate-700">Products</Link>
                    <span className="mx-2">/</span>
                    <span className="text-slate-700">{title}</span>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
                    {/* Sol: görsel galeri */}
                    <div className="rounded-2xl border bg-white p-4 shadow-sm">
                        <div className="aspect-[4/3] bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center">
                            <img
                                src={img}
                                alt={title}
                                className="h-full w-full object-contain"
                            />
                        </div>

                        {/* basit thumbnail alanı (mock: tek görseli tekrar gösteriyoruz) */}
                        <div className="mt-4 grid grid-cols-4 gap-3">
                            {[img, img, img, img].map((t, i) => (
                                <button
                                    key={i}
                                    className="aspect-square rounded-lg border bg-white p-1 hover:border-blue-400 transition"
                                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                    aria-label="Önizleme"
                                >
                                    <img src={t} alt="" className="h-full w-full object-contain" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sağ: bilgi + satın alma (sticky kart) */}
                    <aside className="lg:sticky lg:top-20 h-max">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            {/* Başlık + rozetler */}
                            <div className="flex items-start justify-between gap-3">
                                <h1 className="text-2xl font-extrabold leading-7">{title}</h1>
                                <span className="rounded-full bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 border border-blue-200">
                                    Yeni
                                </span>
                            </div>

                            <div className="mt-2 text-sm text-slate-600">
                                Category: <span className="font-medium text-slate-700">{category}</span> • Added: {createdAt}
                            </div>

                            {/* rating mock */}
                            <div className="mt-3 flex items-center gap-1.5 text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} className={`h-4 w-4 ${i < 4 ? "" : "opacity-40"}`} />
                                ))}
                                <span className="ml-2 text-xs text-slate-500">(124 değerlendirme)</span>
                            </div>

                            {/* Fiyat */}
                            <div className="mt-5">
                                <div className="text-3xl font-extrabold tracking-tight text-blue-600">
                                    ₺{price}
                                </div>
                                <div className="mt-1 text-xs text-slate-500">
                                    KDV dahildir
                                </div>
                            </div>

                            {/* Açıklama */}
                            <p className="mt-5 text-slate-700 leading-6">
                                Description...
                            </p>

                            {/* Hizmet satırı */}
                            <div className="mt-5 grid grid-cols-3 gap-3 text-xs">
                                <div className="rounded-lg border bg-white px-3 py-2 flex items-center gap-2">
                                    <TruckIcon className="h-4 w-4 text-green-600" />
                                    <span>₺250+ Ücretsiz kargo</span>
                                </div>
                                <div className="rounded-lg border bg-white px-3 py-2 flex items-center gap-2">
                                    <ShieldCheckIcon className="h-4 w-4 text-blue-600" />
                                    <span>2 yıl garanti</span>
                                </div>
                                <div className="rounded-lg border bg-white px-3 py-2 flex items-center gap-2">
                                    <CheckBadgeIcon className="h-4 w-4 text-indigo-600" />
                                    <span>Orijinal ürün</span>
                                </div>
                            </div>

                            {/* Adet + CTA’lar */}
                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <label className="text-sm text-slate-600">Quantity</label>

                                <div className="flex items-center rounded-md border">
                                    <button
                                        onClick={dec}
                                        className="h-10 w-10 flex items-center justify-center hover:bg-red-100 border-r"
                                        aria-label="Azalt"
                                    >
                                        <MinusIcon className="h-4 w-4 text-red-600" />
                                    </button>
                                    <input
                                        type="number"
                                        min={1}
                                        max={99}
                                        value={qty}
                                        onChange={(e) =>
                                            setQty(Math.min(99, Math.max(1, Number(e.target.value) || 1)))
                                        }
                                        className="w-16 h-10 text-center outline-none"
                                    />
                                    <button
                                        onClick={inc}
                                        className="h-10 w-10 flex items-center justify-center hover:bg-green-100 border-l"
                                        aria-label="Arttır"
                                    >
                                        <PlusIcon className="h-4 w-4 text-green-600" />
                                    </button>
                                </div>

                                <button
                                    onClick={handleAdd}
                                    className="h-10 px-5 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                                >
                                    Sepete Ekle
                                </button>
                                <ToastContainer />

                                <Link
                                    to="/checkout"
                                    className="h-10 px-5 rounded-md border border-blue-200 text-blue-700 bg-white 
             hover:bg-green-600 hover:text-white transition duration-200 
             flex items-center justify-center"
                                >
                                    Hemen Al
                                </Link>


                            </div>

                            {/* Küçük notlar */}
                            <ul className="mt-6 text-xs text-slate-500 list-disc list-inside space-y-1">
                                <li>30 gün içinde ücretsiz iade.</li>
                                <li>Ödeme seçenekleri: Kredi/Banka kartı, Havale/EFT.</li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </section>

    );
}
