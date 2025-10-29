// src/components/SortBar.jsx
export default function SortBar({ total, sort, onSortChange }) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <h2 className="text-xl font-semibold">Products <span className="text-gray-500 text-base">({total})</span></h2>
            <select
                value={sort}
                onChange={(e) => onSortChange(e.target.value)}
                className="h-9 px-3 rounded-md border"
            >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
            </select>
        </div>
    );
}
