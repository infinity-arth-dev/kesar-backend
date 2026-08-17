export type Role = 'CUSTOMER' | 'ADMIN';

export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  label: string; // e.g. "1g", "1g Pack of 2", "1g Pack of 4", "5g"
  sku: string;
  price: number; // in INR rupees
  compareAtPrice?: number;
  stock: number;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt: string;
  position: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  shippingInfo?: string;
  returnInfo?: string;
  images: ProductImage[];
  variants: ProductVariant[];
  categoryId: string;
  categoryName?: string;
  basePrice: number; // in INR rupees
  compareAtPrice?: number;
  weightGrams?: number;
  isBestSeller?: boolean;
  isActive?: boolean;
  createdAt: string;
  rating?: number;
  reviewCount?: number;
}

export interface Review {
  id: string;
  productId: string;
  productTitle?: string;
  userId?: string;
  authorName: string;
  rating: number; // 1-5
  title: string;
  body: string;
  isApproved: boolean;
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  addresses?: Address[];
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  variantId: string;
  variant: ProductVariant;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  couponCode?: string;
  discountAmount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId: string;
  title: string;
  variantLabel: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentId?: string;
  paymentMethod: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  createdAt: string;
  estimatedDelivery?: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'PERCENT' | 'FLAT';
  value: number;
  minOrderValue?: number;
  expiresAt?: string;
  isActive: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  content: string; // Rich markdown or text
  category: string; // e.g. "recipes", "wellness", "saffron-guide"
  publishedAt: string;
  readTime?: string;
  author?: string;
}

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  status: 'UNREAD' | 'READ';
}

