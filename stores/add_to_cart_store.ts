import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CartItem {
  id: number;
  quantity: number;
  name: string;
  price: number;
  imageSrc: string;
  category: string;
}

interface AddToCartState {
  items: CartItem[];

  addToCartItem: (newItem: CartItem) => void;
  addQuantity: (itemToUpdate: number) => void;
  minusQuantity: (itemToUpdate: number) => void;
}
interface OrderTypeState {
  type: number;
  selectType: (newMenu: number) => void;
}

export const useAddToCartStore = create<AddToCartState>()(
  devtools(
    persist(
      (set) => ({
        items: [],

        addToCartItem: (newItem) =>
          set((state) => {
            useAddToCartStore.persist.clearStorage();

            const existingItem = state.items.find(
              (item) => item.id === newItem.id,
            );
            if (existingItem) {
              return {
                items: state.items.map((item) =>
                  item.id === newItem.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
                ),
              };
            }

            return {
              items: [
                ...state.items,
                {
                  ...newItem,
                  quantity: 1,
                },
              ],
            };
          }),

        addQuantity: (itemToUpdate) =>
          set((state) => ({
            items: state.items.map((item) =>
              item.id === itemToUpdate
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          })),

        minusQuantity: (itemToUpdate) =>
          set((state) => ({
            items: state.items.map((item) =>
              item.id === itemToUpdate
                ? {
                    ...item,
                    quantity: Math.max(1, item.quantity - 1),
                  }
                : item,
            ),
          })),
      }),
      {
        name: "cart-storage",
      },
    ),
  ),
);

export const useOrderTypeStore = create<OrderTypeState>()((set) => ({
  type: 1,
  selectType: (newType) => set({ type: newType }),
}));

export const usePaymentTypeStore = create<OrderTypeState>()((set) => ({
  type: 1,
  selectType: (newType) => set({ type: newType }),
}));
