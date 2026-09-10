import { create } from "zustand";

type WishlistState = {
  items: string[];
  toggleItem: (id: string) => void;
  isSaved: (id: string) => boolean;
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: ["p1", "p3"],
  toggleItem: (id) => {
    const items = get().items.includes(id)
      ? get().items.filter((item) => item !== id)
      : [...get().items, id];

    set({ items });
  },
  isSaved: (id) => get().items.includes(id),
}));
