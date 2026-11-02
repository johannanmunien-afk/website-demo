"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  productId: number;
  slug: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
};

type State = { items: CartItem[]; hydrated: boolean };

type Action =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; item: CartItem }
  | { type: "remove"; productId: number }
  | { type: "setQty"; productId: number; quantity: number }
  | { type: "clear" };

const STORAGE_KEY = "esthers-kingdom-cart-v1";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { items: action.items, hydrated: true };
    case "add": {
      const existing = state.items.find((i) => i.productId === action.item.productId);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.productId === action.item.productId
              ? { ...i, quantity: Math.min(i.stock, i.quantity + action.item.quantity) }
              : i,
          ),
        };
      }
      return { ...state, items: [...state.items, action.item] };
    }
    case "remove":
      return { ...state, items: state.items.filter((i) => i.productId !== action.productId) };
    case "setQty":
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.productId !== action.productId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.productId ? { ...i, quantity: Math.min(i.stock, action.quantity) } : i,
        ),
      };
    case "clear":
      return { ...state, items: [] };
  }
}

type CartContextValue = {
  items: CartItem[];
  hydrated: boolean;
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], hydrated: false });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const items = raw ? (JSON.parse(raw) as CartItem[]) : [];
      dispatch({ type: "hydrate", items: Array.isArray(items) ? items : [] });
    } catch {
      dispatch({ type: "hydrate", items: [] });
    }
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items, state.hydrated]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    dispatch({ type: "add", item: { ...item, quantity } });
    setIsOpen(true);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      hydrated: state.hydrated,
      count: state.items.reduce((n, i) => n + i.quantity, 0),
      subtotal: state.items.reduce((n, i) => n + i.price * i.quantity, 0),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem: (productId) => dispatch({ type: "remove", productId }),
      setQuantity: (productId, quantity) => dispatch({ type: "setQty", productId, quantity }),
      clear: () => dispatch({ type: "clear" }),
    }),
    [state.items, state.hydrated, isOpen, addItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
