import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartState = {
  items: CartItem[];
  isDrawerOpen: boolean;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, quantity: number) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [
    {
      id: "p1",
      name: "Abstract Canvas",
      price: 120,
      quantity: 1,
      image: "/images/sample-art.jpg",
    },
  ],
  isDrawerOpen: false,
  subtotal: 120,
  addItem: (item) => {
    const existing = get().items.find((entry) => entry.id === item.id);

    const nextItems = existing
      ? get().items.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + (item.quantity ?? 1) }
            : entry
        )
      : [...get().items, { ...item, quantity: item.quantity ?? 1 }];

    set({ items: nextItems, subtotal: nextItems.reduce((sum, entry) => sum + entry.price * entry.quantity, 0) });
  },
  removeItem: (id) => {
    const nextItems = get().items.filter((entry) => entry.id !== id);
    set({ items: nextItems, subtotal: nextItems.reduce((sum, entry) => sum + entry.price * entry.quantity, 0) });
  },
  updateQty: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }

    const nextItems = get().items.map((entry) =>
      entry.id === id ? { ...entry, quantity } : entry
    );

    set({ items: nextItems, subtotal: nextItems.reduce((sum, entry) => sum + entry.price * entry.quantity, 0) });
  },
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
}));
