import { createContext, useContext, useMemo, useState, useEffect } from "react";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
    // localStorage ile kalıcı yapalım
    const [items, setItems] = useState(() => {
        try {
            const raw = localStorage.getItem("cart_items");
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("cart_items", JSON.stringify(items));
    }, [items]);

    const addItem = (product, qty = 1) => {
        setItems((prev) => {
            const idx = prev.findIndex((x) => x.id === product.id);
            if (idx >= 0) {
                const next = [...prev];
                next[idx] = { ...next[idx], qty: next[idx].qty + qty };
                return next;
            }
            return [...prev, { id: product.id, title: product.title, price: product.price, img: product.img, qty }];
        });
    };

    const increase = (id) => setItems((prev) => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
    const decrease = (id) => setItems((prev) => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i));
    const remove = (id) => setItems((prev) => prev.filter(i => i.id !== id));
    const clear = () => setItems([]);

    const count = useMemo(() => items.reduce((a, b) => a + b.qty, 0), [items]);
    const subtotal = useMemo(() => items.reduce((a, b) => a + b.price * b.qty, 0), [items]);

    const value = { items, addItem, increase, decrease, remove, clear, count, subtotal };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
