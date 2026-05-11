import { useEffect, useState } from "react";

const getStorageKey = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return user ? `cart_${user.email}` : "cart_guest";
};

const readCart = () => {
  const raw = localStorage.getItem(getStorageKey());
  return raw ? JSON.parse(raw) : [];
};

export const useCart = () => {
  const [items, setItems] = useState(readCart);

  // Re-read cart when user changes (e.g. login/logout)
  useEffect(() => {
    setItems(readCart());
  }, []);

  useEffect(() => {
    localStorage.setItem(getStorageKey(), JSON.stringify(items));
  }, [items]);

  const addItem = (product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return { items, addItem, removeItem, clearCart, total };
};
