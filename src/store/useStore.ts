import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  id: number;
  name: string;
  price: number;
  discountedPrice: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  showCart: boolean;
  showWishlist: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  toggleCart: () => void;
  toggleWishlist: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      showCart: false,
      showWishlist: false,

      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      updateCartQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })),

      addToWishlist: (product) =>
        set((state) => {
          if (!state.wishlist.some((item) => item.id === product.id)) {
            return { wishlist: [...state.wishlist, product] };
          }
          return state;
        }),

      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== productId),
        })),

      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce(
          (total, item) => total + item.discountedPrice * item.quantity,
          0
        );
      },

      getCartCount: () => {
        const { cart } = get();
        return cart.reduce((count, item) => count + item.quantity, 0);
      },

      toggleCart: () =>
        set((state) => ({ showCart: !state.showCart })),
      toggleWishlist: () =>
        set((state) => ({ showWishlist: !state.showWishlist })),
    }),
    {
      name: 'ecommerce-store',
    }
  )
);
