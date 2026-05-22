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

  addToCartItem: (newItem: CartItem, category: string) => void;
  addQuantity: (itemToUpdate: number, category: string) => void;
  minusQuantity: (itemToUpdate: number, category: string) => void;
  removeItem: (itemToUpdate: number, category: string) => void;
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

        addToCartItem: (newItem, category) =>
          set((state) => {
            const existingItem = state.items.find(
              (item) => item.id === newItem.id && category === item.category,
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

        addQuantity: (itemToUpdate, category) =>
          set((state) => ({
            items: state.items.map((item) =>
              item.id === itemToUpdate && item.category === category
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          })),

        minusQuantity: (itemToUpdate, category) =>
          set((state) => ({
            items: state.items.map((item) =>
              item.id === itemToUpdate && item.category === category
                ? {
                    ...item,
                    quantity: Math.max(1, item.quantity - 1),
                  }
                : item,
            ),
          })),
        removeItem: (id, category) =>
          set((state) => ({
            items: state.items.filter(
              (i) => !(i.id === id && i.category === category),
            ),
          })),
      }),
      {
        name: "cart-data",
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
