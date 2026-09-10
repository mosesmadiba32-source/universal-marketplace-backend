import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/api';

export interface CartItem {
  id: string; // product id or line item id
  product: Product;
  quantity: number;
  selectedVariantId?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  isAdding: boolean;
  error: string | null;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addItem: (product: Product, quantity?: number) => Promise<boolean>;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getShipping: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

const FREE_SHIPPING_THRESHOLD = 50.0;
const STANDARD_SHIPPING_FEE = 9.99;
const TAX_RATE = 0.08;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [
        // Seed default item if empty so preview widgets and cart have initial items
      ],
      isOpen: false,
      isAdding: false,
      error: null,

      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),
      toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: async (product: Product, quantity = 1) => {
        set({ isAdding: true, error: null });
        try {
          // Simulate short network flight or backend sync
          await new Promise((resolve) => setTimeout(resolve, 150));
          
          const currentItems = get().items;
          const existingIndex = currentItems.findIndex((item) => item.product.id === product.id);

          if (existingIndex > -1) {
            const newItems = [...currentItems];
            newItems[existingIndex].quantity += quantity;
            set({ items: newItems, isAdding: false, isOpen: true });
          } else {
            set({
              items: [
                ...currentItems,
                {
                  id: product.id,
                  product,
                  quantity,
                },
              ],
              isAdding: false,
              isOpen: true,
            });
          }
          return true;
        } catch (err: any) {
          set({
            isAdding: false,
            error: "Couldn't add — try again",
          });
          return false;
        }
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id || item.product.id === id
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id && item.product.id !== id),
        }));
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => {
          const price = Number(item.product.salePrice ?? item.product.basePrice);
          return sum + price * item.quantity;
        }, 0);
      },

      getShipping: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
      },

      getTax: () => {
        return get().getSubtotal() * TAX_RATE;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal + get().getShipping() + get().getTax();
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'local-art-ai-cart',
    }
  )
);
