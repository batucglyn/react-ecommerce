// src/components/FilterPanel.jsx
import { CATEGORIES } from "../data/products";

export default function FilterPanel({ filters, onChange }) {
    const handle = (key, val) => onChange({ ...filters, [key]: val });

    return (
        <aside className="p-4 rounded-xl border bg-white h-max sticky top-20">
            <h3 className="font-semibold mb-3">Filtrele</h3>

            {/* Search */}
            <label className="block text-sm text-gray-600 mb-1">Arama</label>
            <input
                value={filters.search}
                onChange={(e) => handle("search", e.target.value)}
                placeholder="type to search..."
                className="w-full h-9 px-3 rounded-md border outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Category */}
            <label className="block mt-4 text-sm text-gray-600 mb-1">Kategori</label>
            <select
                value={filters.category}
                onChange={(e) => handle("category", e.target.value)}
                className="w-full h-9 px-3 rounded-md border"
            >
                {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>

            {/* Price range */}
            <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Min ₺</label>
                    <input
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) => handle("minPrice", e.target.value)}
                        className="w-full h-9 px-3 rounded-md border"
                        placeholder="0"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Max ₺</label>
                    <input
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) => handle("maxPrice", e.target.value)}
                        className="w-full h-9 px-3 rounded-md border"
                        placeholder="9999"
                    />
                </div>
            </div>

            <button
                onClick={() => onChange({ search: "", category: "All", minPrice: "", maxPrice: "" })}
                className="mt-4 w-full h-9 rounded-md border border-gray-300 text-gray-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition duration-200"

            >
                Temizle
            </button>
        </aside>
    );
}
