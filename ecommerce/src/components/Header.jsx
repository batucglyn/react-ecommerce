import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HomeIcon, ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { CreditCardIcon } from "@heroicons/react/24/solid";

export default function Header() {
    const { count } = useCart();

    return (
        <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold tracking-tight">Ecommerce</Link>

                <nav className="flex items-center gap-6 text-sm">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-1 hover:text-blue-600 transition ${isActive ? 'text-blue-600 font-semibold' : ''}`
                        }
                    >
                        <HomeIcon className="h-5 w-5" />
                        Home
                    </NavLink>

                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            `flex items-center gap-1 hover:text-blue-600 transition ${isActive ? 'text-blue-600 font-semibold' : ''}`
                        }
                    >
                        <ShoppingBagIcon className="h-5 w-5" />
                        Products
                    </NavLink>

                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            `flex items-center gap-1 hover:text-blue-600 transition ${isActive ? 'text-blue-600 font-semibold' : ''}`
                        }
                    >
                        <ShoppingCartIcon
                            className={`h-5 w-5 ${count > 0 ? 'text-orange-500' : 'text-gray-500'
                                } transition duration-200`}
                        />

                        <span className="flex items-center gap-1">
                            Cart
                            {count > 0 && (
                                <span className="text-red-600 font-semibold">
                                    ({count})
                                </span>
                            )}
                        </span>
                    </NavLink>


                </nav>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            placeholder="Search…"
                            className="h-9 pl-9 pr-3 rounded-md border outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <Link
                        to="/checkout"
                        className="h-9 px-3 flex items-center gap-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200"
                    >
                        <CreditCardIcon className="h-5 w-5 text-white" />
                        Checkout
                    </Link>
                </div>
            </div>
        </header>
    )
}
