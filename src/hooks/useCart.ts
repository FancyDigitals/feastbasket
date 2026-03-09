// hooks/useCart.ts

import { useContext, useMemo } from "react";
import { CartContext } from "../contexts/CartContext";

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  const summary = useMemo(() => {
    const subtotal = context.items.reduce((total, item) => {
      const price = item.selectedVariation?.price || item.product.price;
      return total + price * item.quantity;
    }, 0);

    const itemCount = context.items.reduce((total, item) => total + item.quantity, 0);

    return {
      subtotal,
      deliveryFee: subtotal > 0 ? 2000 : 0,
      total: subtotal > 0 ? subtotal + 2000 : 0,
      itemCount,
    };
  }, [context.items]);

  return {
    ...context,
    summary,
  };
};