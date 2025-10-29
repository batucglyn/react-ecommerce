export default function Footer() {
    return (
        <footer className="border-t bg-white">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center text-sm text-gray-600">
                © {new Date().getFullYear()} Ecom. All rights reserved.
            </div>
        </footer>
    )
}
