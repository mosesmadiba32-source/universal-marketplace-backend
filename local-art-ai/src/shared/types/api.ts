// Universal Marketplace — Shared API Types & Models

export type UserRole = 'CUSTOMER' | 'ADMIN';
export type ProductStatus = 'DRAFT' | 'ACTIVE' | 'OUT_OF_STOCK' | 'ARCHIVED';
export type OrderStatus = 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type DiscountType = 'PERCENTAGE' | 'FIXED';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
export type PaymentProvider = 'STRIPE' | 'MPESA' | 'PAYPAL' | 'FLUTTERWAVE' | 'PESAPAL';
export type InventoryAction = 'INCREASE' | 'DECREASE' | 'RESERVE' | 'RELEASE';
export type NotificationType = 'ORDER_CREATED' | 'ORDER_SHIPPED' | 'PAYMENT_RECEIVED' | 'REVIEW_APPROVED' | 'INVENTORY_LOW' | 'SYSTEM';

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  details?: unknown;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  items: T[];
  pagination: Pagination;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  phone?: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string | null;
  sortOrder: number;
  productId: string;
}

export interface ProductAttribute {
  id: string;
  productId: string;
  attributeName: string;
  attributeValue: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  name: string;
  price: number | string;
  stockQuantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  shortDescription?: string | null;
  sku: string;
  brand?: string | null;
  status: ProductStatus;
  basePrice: number | string;
  salePrice?: number | string | null;
  stockQuantity: number;
  weight?: number | string | null;
  categoryId: string;
  category?: Category;
  images?: ProductImage[];
  attributes?: ProductAttribute[];
  variants?: ProductVariant[];
  averageRating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  itemId: string;
  productId: string;
  variantId?: string | null;
  name: string;
  slug: string;
  sku: string;
  price: number;
  quantity: number;
  image?: string | null;
  stock: number;
}

export interface Cart {
  id: string;
  totalItems: number;
  subtotal: number;
  items: CartItem[];
}

export interface WishlistItem {
  productId: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  image?: string | null;
  stock: number;
  status: ProductStatus;
}

export interface Wishlist {
  id: string;
  totalItems: number;
  items: WishlistItem[];
}

export interface Address {
  id: string;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  street: string;
  isDefault: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId?: string | null;
  variantId?: string | null;
  productName: string;
  productSku: string;
  variantName?: string | null;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  userId: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  items: OrderItem[];
  // NOTE: shippingAddress is not yet included in the backend OrderResponse.
  // Add it here when the backend toOrderResponse() includes address data.
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number | string;
  currency: string;
  provider: PaymentProvider;
  transactionId?: string | null;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  order?: Order;
}

export interface Coupon {
  id: string;
  code: string;
  description?: string | null;
  discountType: DiscountType;
  discountValue: number | string;
  minimumOrderAmount?: number | string | null;
  maximumDiscountAmount?: number | string | null;
  usageLimit?: number | null;
  usedCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface CouponDiscount {
  code: string;
  discount: number;
  finalAmount: number;
}

export interface Review {
  id: string;
  rating: number;
  title?: string | null;
  comment?: string | null;
  status: ReviewStatus;
  createdAt: string;
  updatedAt: string;
  userId: string;
  productId: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  product?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface ReviewStats {
  averageRating: number;
  reviewCount: number;
  ratingBreakdown: Record<1 | 2 | 3 | 4 | 5, number>;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryLog {
  id: string;
  productId: string;
  variantId?: string | null;
  action: InventoryAction;
  quantity: number;
  beforeStock: number;
  afterStock: number;
  reason: string;
  createdBy: string;
  createdAt: string;
}

export interface SearchFacets {
  categories: Array<{ name: string; slug: string }>;
  brands: string[];
  priceRange: { min: number | null; max: number | null };
}

export interface SearchResult {
  products: Product[];
  pagination: Pagination;
  facets: SearchFacets;
}

export interface ProfileStats {
  orderCount: number;
  reviewCount: number;
  wishlistCount: number;
  addressCount: number;
}
