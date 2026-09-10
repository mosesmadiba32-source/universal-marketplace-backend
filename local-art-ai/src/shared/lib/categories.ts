import {
  Smartphone,
  Shirt,
  Home,
  Sparkles,
  Trophy,
  BookOpen,
  Gamepad2,
  Car,
  Briefcase,
  Layers,
  LucideIcon,
} from 'lucide-react';

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  icon: LucideIcon;
  description: string;
  itemCount?: number;
  image: string;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    icon: Smartphone,
    description: 'Smartphones, audio, computing & modern gadgets',
    itemCount: 1420,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    icon: Shirt,
    description: 'Designer apparel, footwear & luxury accessories',
    itemCount: 2350,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'home-living',
    name: 'Home & Living',
    slug: 'home-living',
    icon: Home,
    description: 'Artisan furniture, modern decor & kitchen essentials',
    itemCount: 1890,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'beauty',
    name: 'Beauty',
    slug: 'beauty',
    icon: Sparkles,
    description: 'Organic skincare, fragrance & premium wellness',
    itemCount: 940,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'sports',
    name: 'Sports',
    slug: 'sports',
    icon: Trophy,
    description: 'Athletic wear, fitness trackers & outdoor gear',
    itemCount: 1120,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'books',
    name: 'Books',
    slug: 'books',
    icon: BookOpen,
    description: 'Bestsellers, art volumes, graphic novels & audiobooks',
    itemCount: 3100,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'toys',
    name: 'Toys',
    slug: 'toys',
    icon: Gamepad2,
    description: 'Creative building sets, STEM kits & family games',
    itemCount: 820,
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'automotive',
    name: 'Automotive',
    slug: 'automotive',
    icon: Car,
    description: 'Smart dashcams, car care, detailing & accessories',
    itemCount: 650,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'services',
    name: 'Services',
    slug: 'services',
    icon: Briefcase,
    description: 'Custom art commissioning, installation & styling',
    itemCount: 380,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=80',
  },
];
