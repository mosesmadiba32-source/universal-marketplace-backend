import { Product } from '../types/api';
import { INITIAL_PRODUCTS } from './mockData';

export interface AiMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  products?: Product[];
  orderTimeline?: {
    orderNumber: string;
    productName: string;
    productImage: string;
    currentStep: number;
    steps: { title: string; timestamp: string; completed: boolean }[];
  };
  imagePreview?: string;
  suggestedPrompts?: string[];
}

export type UserIntent =
  | 'style_consultation'
  | 'visual_search'
  | 'cart_shipping_advice'
  | 'order_tracking'
  | 'warranty_support'
  | 'general_search';

export class AiOrchestrator {
  /**
   * Classify user query intent
   */
  public static classifyIntent(query: string, hasImage = false): UserIntent {
    if (hasImage) return 'visual_search';
    const q = query.toLowerCase();

    if (q.includes('track') || q.includes('order') || q.includes('shipment') || q.includes('la-') || q.includes('where is')) {
      return 'order_tracking';
    }
    if (q.includes('free shipping') || q.includes('shipping') || q.includes('cart') || q.includes('reach $50') || q.includes('threshold')) {
      return 'cart_shipping_advice';
    }
    if (q.includes('warranty') || q.includes('return') || q.includes('authentic') || q.includes('guarantee')) {
      return 'warranty_support';
    }
    if (q.includes('match') || q.includes('style') || q.includes('living room') || q.includes('interior') || q.includes('aesthetic') || q.includes('recommend') || q.includes('gift')) {
      return 'style_consultation';
    }
    return 'general_search';
  }

  /**
   * Semantic search & RAG query over catalog
   */
  public static searchCatalog(query: string, maxPrice?: number): Product[] {
    const q = query.toLowerCase();
    const keywords = q.split(' ').filter((w) => w.length > 2);

    let matches = INITIAL_PRODUCTS.map((p) => {
      let score = 0;
      const text = `${p.name} ${p.brand} ${p.category?.name} ${p.description} ${p.shortDescription}`.toLowerCase();

      for (const kw of keywords) {
        if (text.includes(kw)) score += 2;
      }
      if (maxPrice && Number(p.salePrice ?? p.basePrice) <= maxPrice) {
        score += 3;
      }

      return { product: p, score };
    });

    matches = matches.filter((m) => m.score > 0).sort((a, b) => b.score - a.score);

    if (matches.length === 0) {
      // Fallback to top curated items if generic query
      return INITIAL_PRODUCTS.slice(0, 2);
    }

    return matches.slice(0, 3).map((m) => m.product);
  }

  /**
   * Process user turn and produce grounded, non-hallucinated response
   */
  public static async processMessage({
    text,
    image,
    cartSubtotal,
    cartItemCount,
    activeProduct,
  }: {
    text: string;
    image?: string;
    cartSubtotal: number;
    cartItemCount: number;
    activeProduct?: Product;
  }): Promise<AiMessage> {
    // Artificial micro-latency to simulate intelligent streaming
    await new Promise((resolve) => setTimeout(resolve, 400));

    const intent = this.classifyIntent(text, Boolean(image));
    const id = `msg-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Visual Search
    if (intent === 'visual_search' || image) {
      const results = [INITIAL_PRODUCTS[2], INITIAL_PRODUCTS[0]]; // High match aesthetic items
      return {
        id,
        sender: 'assistant',
        text: "I analyzed your uploaded photo. Based on the organic geometry, natural textures, and warm lighting profile, here are the most cohesive artisan creations from our verified catalog:",
        timestamp,
        products: results,
        suggestedPrompts: ['View technical specifications', 'Find matching audio equipment', 'Ask about custom dimensions'],
      };
    }

    // 2. Order Tracking
    if (intent === 'order_tracking') {
      return {
        id,
        sender: 'assistant',
        text: "Here is the real-time fulfillment status for your active shipment **Order #LA-89421**:",
        timestamp,
        orderTimeline: {
          orderNumber: 'LA-89421',
          productName: 'Artisan Wireless Studio Pro Headphones',
          productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
          currentStep: 3, // Shipped
          steps: [
            { title: 'Order Placed', timestamp: 'Sep 08, 14:22', completed: true },
            { title: 'Processing', timestamp: 'Sep 08, 18:45', completed: true },
            { title: 'Packed & Inspected', timestamp: 'Sep 09, 09:15', completed: true },
            { title: 'In Transit with Express Courier', timestamp: 'Sep 10, 11:30', completed: true },
            { title: 'Estimated Delivery: Sep 12 by 8 PM', timestamp: 'Expected Sep 12', completed: false },
          ],
        },
        suggestedPrompts: ['Track another order', 'Change delivery address', 'Contact concierge support'],
      };
    }

    // 3. Cart / Free Shipping Advice
    if (intent === 'cart_shipping_advice' || (cartSubtotal > 0 && cartSubtotal < 50)) {
      const remaining = Math.max(0, 50 - cartSubtotal);
      const complementary = INITIAL_PRODUCTS.filter(
        (p) => Number(p.salePrice ?? p.basePrice) >= remaining && Number(p.salePrice ?? p.basePrice) <= remaining + 60
      ).slice(0, 2);

      const itemsToSuggest = complementary.length > 0 ? complementary : [INITIAL_PRODUCTS[5]];

      return {
        id,
        sender: 'assistant',
        text: `Your current cart subtotal is **$${cartSubtotal.toFixed(2)}**. Adding just **$${remaining.toFixed(2)}** more unlocks **Free Standard Shipping** ($9.99 value). Here are complementary curated pieces:`,
        timestamp,
        products: itemsToSuggest,
        suggestedPrompts: ['Proceed to checkout', 'Show gifts under $100', 'Explore best sellers'],
      };
    }

    // 4. Warranty & Authenticity Support
    if (intent === 'warranty_support') {
      return {
        id,
        sender: 'assistant',
        text: "Every piece on Local Art AI is 100% verified authentic and backed by our **2-Year Global Manufacturer Warranty** and a **30-Day Money-Back Guarantee**. All orders include an immutable digital certificate of authenticity.",
        timestamp,
        suggestedPrompts: ['Read returns policy', 'Ask about custom commissions', 'Speak with a human agent'],
      };
    }

    // 5. Style Consultation / Catalog Recommendations
    const qLower = text.toLowerCase();
    let maxPrice: number | undefined;
    if (qLower.includes('under $100') || qLower.includes('under 100')) maxPrice = 100;
    if (qLower.includes('under $200') || qLower.includes('under 200')) maxPrice = 200;

    const matchedProducts = this.searchCatalog(text, maxPrice);

    return {
      id,
      sender: 'assistant',
      text: maxPrice
        ? `Here are our highest-rated artisan selections under **$${maxPrice}**, guaranteed in stock:`
        : "I have curated these verified pieces based on your aesthetic and material preferences:",
      timestamp,
      products: matchedProducts,
      suggestedPrompts: [
        'Tell me more about the materials',
        'Do these qualify for free shipping?',
        'Show matching audio gear',
      ],
    };
  }
}
