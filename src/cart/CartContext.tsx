import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type CartItem = { name: string; qty: number; price: number };

type CartContextValue = {
  cart: CartItem[];
  cartCount: number;
  totalPrice: number;
  addToCart: (name: string, price: number, qty?: number) => void;
  getItemQty: (name: string) => number;
  setItemQty: (name: string, qty: number) => void;
  incrementItem: (name: string) => void;
  decrementItem: (name: string) => void;
  clearCart: () => void;
  isCartEmpty: boolean;
  buildWhatsAppText: () => string;
  getWhatsAppOrderUrl: () => string;
};

const CartContext = createContext<CartContextValue | null>(null);

const WHATSAPP_NUMBER = "919035859999";
const RESTAURANT_NAME = "Bahubali Family Restaurant";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
  const isCartEmpty = cartCount === 0;

  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);

  const getItemQty = (name: string) => {
    return cart.find((i) => i.name === name)?.qty ?? 0;
  };

  const setItemQty = (name: string, qty: number) => {
    setCart((prev) => {
      const nextQty = Math.max(0, qty);
      const idx = prev.findIndex((i) => i.name === name);

      // Remove item if qty becomes 0
      if (idx === -1) {
        if (nextQty <= 0) return prev;
        return [...prev, { name, qty: nextQty, price: 0 }];
      }

      if (nextQty <= 0) {
        return prev.filter((i) => i.name !== name);
      }

      const next = [...prev];
      next[idx] = { ...next[idx], qty: nextQty };
      return next;
    });
  };

  const addToCart = (name: string, price: number, qty: number = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.name === name);
      if (idx === -1) return [...prev, { name, qty, price }];

      const next = [...prev];
      const existing = next[idx];
      const nextPrice = existing.price === 0 ? price : existing.price;
      next[idx] = { ...existing, qty: existing.qty + qty, price: nextPrice };
      return next;
    });
  };

  const incrementItem = (name: string) => setItemQty(name, getItemQty(name) + 1);
  const decrementItem = (name: string) => setItemQty(name, getItemQty(name) - 1);

  const clearCart = () => setCart([]);

  const buildWhatsAppText = () => {
    const lines = cart.map((item) => `${item.name} - Qty: ${item.qty}`);
    // WhatsApp message should include items only (total is shown in the cart UI).
    return `Order from ${RESTAURANT_NAME}:\n\n${lines.join("\n")}`;
  };

  const getWhatsAppOrderUrl = () => {
    const text = buildWhatsAppText();
    const encoded = encodeURIComponent(text);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  };

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      cartCount,
      totalPrice,
      addToCart,
      getItemQty,
      setItemQty,
      incrementItem,
      decrementItem,
      clearCart,
      isCartEmpty,
      buildWhatsAppText,
      getWhatsAppOrderUrl,
    }),
    [cart, cartCount, totalPrice],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

