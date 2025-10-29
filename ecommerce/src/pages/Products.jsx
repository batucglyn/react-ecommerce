import { useMemo, useState } from "react";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";
import FilterPanel from "../components/FilterPanel";
import SortBar from "../components/SortBar";
import Pagination from "../components/Pagination";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PAGE_SIZE = 9;

export default function Products() {
    const [filters, setFilters] = useState({
        search: "",
        category: "All",
        minPrice: "",
        maxPrice: "",
    });
    const [sort, setSort] = useState("newest");
    const [page, setPage] = useState(1);

    // Hızlı kategori çipleri için kategori listesi
    const categories = useMemo(() => {
        const set = new Set(PRODUCTS.map(p => p.category).filter(Boolean));
        return ["All", ...Array.from(set)];
    }, []);

    const filteredSorted = useMemo(() => {
        let list = [...PRODUCTS];

        if (filters.search.trim()) {
            const q = filters.search.toLowerCase();
            list = list.filter(p => p.title.toLowerCase().includes(q));
        }
        if (filters.category !== "All") {
            list = list.filter(p => p.category === filters.category);
        }

        const min = filters.minPrice !== "" ? Number(filters.minPrice) : -Infinity;
        const max = filters.maxPrice !== "" ? Number(filters.maxPrice) : Infinity;
        list = list.filter(p => p.price >= min && p.price <= max);

        if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
        else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
        else if (sort === "newest") list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return list;
    }, [filters, sort]);

    const onFiltersChange = (f) => { setFilters(f); setPage(1); };

    const total = filteredSorted.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const paged = filteredSorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <section className="relative">
            {/* Arkaplan blob + degrade */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 to-transparent" />
            <div className="absolute -z-10 top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full blur-3xl opacity-20 bg-blue-300" />
            <div className="absolute -z-10 top-64 right-[10%] h-52 w-52 rounded-full blur-3xl opacity-20 bg-indigo-300" />

            <div className="max-w-6xl mx-auto px-4 pb-10">
                {/* Üst başlık alanı */}
                <div className="pt-6 pb-4">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <div className="text-xs text-slate-500">Home / <span className="text-slate-700">Products</span></div>
                            <h1 className="mt-1 text-3xl font-extrabold tracking-tight">
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Products
                                </span>
                                <span className="ml-2 text-base font-medium text-slate-500">({total})</span>
                            </h1>
                            <p className="text-sm text-slate-500 mt-1">Arayın, filtreleyin ve dilediğiniz gibi sıralayın.</p>
                        </div>

                        {/* Sağda şık sort kapsülü (desktop) */}
                        <div className="hidden md:block">
                            <div className="rounded-xl border bg-white/80 backdrop-blur px-3 py-2 shadow-sm">
                                <SortBar total={total} sort={sort} onSortChange={(v) => setSort(v)} />
                            </div>
                        </div>
                    </div>

                    {/* Hızlı kategori çipleri */}
                    <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
                        {categories.map(cat => {
                            const active = filters.category === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => onFiltersChange({ ...filters, category: cat })}
                                    className={`whitespace-nowrap rounded-full border px-3 py-1 text-sm transition
                    ${active
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* İçerik grid’i */}
                <div className="grid gap-6 md:grid-cols-[300px_1fr]">
                    {/* Sol: Sticky cam efektli filtre paneli */}
                    <aside className="md:sticky md:top-20 h-max">
                        <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur shadow-sm">
                            <div className="px-4 py-3 border-b font-semibold">Arama Yap</div>
                            <div className="p-4">
                                <FilterPanel filters={filters} onChange={onFiltersChange} />
                            </div>
                        </div>

                        {/* Mobilde Sort */}
                        <div className="md:hidden mt-4 rounded-xl border bg-white/80 backdrop-blur px-3 py-2 shadow-sm">
                            <SortBar total={total} sort={sort} onSortChange={(v) => setSort(v)} />
                        </div>
                    </aside>

                    {/* Sağ: Liste */}
                    <div>
                        {paged.length === 0 ? (
                            <div className="p-10 rounded-2xl border bg-white/80 backdrop-blur text-slate-600 text-center shadow-sm">
                                <div className="text-4xl mb-2">🔍</div>
                                <div className="text-lg font-semibold">No products found</div>
                                <div className="text-sm text-slate-500">Filtreleri genişletmeyi deneyin.</div>
                            </div>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-3">
                                {paged.map((p) => (<ProductCard key={p.id} product={p} />))}
                            </div>
                        )}

                        {/* Pagination merkezli */}
                        <div className="mt-8 flex justify-center">
                            <Pagination page={page} totalPages={totalPages} onPage={setPage} />
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar theme="colored" />
        </section>
    );
}
