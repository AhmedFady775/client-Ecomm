import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";

export const updateWidthState = create(
  devtools((set) => ({
    width: false,
    setWidth: () => set((state) => ({ width: !state.width })),
  }))
);

export const userInfoStore = create(
  devtools(
    persist(
      (set) => ({
        userInfo: null,
        userSignIn: (user) => set({ userInfo: user }),
        userSignOut: () => set({ userInfo: null }),
      }),
      {
        name: "userInfo",
      }
    )
  )
);

export const CartItemsStore = create(
  devtools(
    persist(
      (set, get) => ({
        total: 0,
        cartItems: [],
        getTotalItemsQuantity: () => {
          let totalQuantity = 0;
          for (let item of get().cartItems) {
            totalQuantity += item.quantity;
          }
          return totalQuantity;
        },
        addToCart: (item) => {
          const newItem = { ...item, quantity: 1 };

          set((state) => ({
            cartItems: [...state.cartItems, newItem],
          }));
        },
        removeFromCart: (item) => {
          set((state) => ({
            cartItems: state.cartItems.filter((x) => x._id !== item._id),
          }));
        },
        updateItemQuantity: (item, quantity) => {
          set((state) => ({
            cartItems: state.cartItems.map((x) =>
              x._id === item._id ? { ...item, quantity } : x
            ),
          }));
        },
        clearCart: () => set({ cartItems: [] }),
      }),
      {
        name: "cartItems",
      }
    )
  )
);
