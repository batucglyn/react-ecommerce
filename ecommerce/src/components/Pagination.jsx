// src/components/Pagination.jsx
export default function Pagination({ page, totalPages, onPage }) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="mt-6 flex items-center justify-center gap-2">
            <button
                onClick={() => onPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="h-9 px-3 rounded-md border border-gray-300 text-gray-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition duration-200 disabled:opacity-50"


            >
                Önceki
            </button>

            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onPage(p)}
                    className={`h-9 px-3 rounded-md border ${p === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'}`}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={() => onPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="h-9 px-3 rounded-md border border-gray-300 text-gray-700 disabled:opacity-50 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition duration-200"


            >
                Sonraki
            </button>
        </div>
    );
}
