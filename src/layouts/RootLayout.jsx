import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function RootLayout() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 grid grid-rows-[auto_1fr_auto]">
            <Header />
            <main className="max-w-6xl mx-auto w-full px-4 py-6">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
