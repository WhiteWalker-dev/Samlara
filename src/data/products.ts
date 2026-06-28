export interface Product {
  id: string;
  name: string;
  category: 'polos' | 'tees' | 'activewear' | 'tanks';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  details: string[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isSale?: boolean;
  tagline?: string;
  color?: string;
  colorHex?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'old-money-polo-black',
    name: 'Old Money Knitted Polo',
    category: 'polos',
    categoryLabel: 'Knitted Polos',
    price: 1899,
    originalPrice: 2499,
    rating: 4.8,
    reviewsCount: 124,
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Elevate your everyday look with our classic Old Money Knitted Polo. Crafted from a premium cotton-blend knit, it features a retro resort collar, relaxed fit, and breathable texture that feels soft against the skin.',
    details: [
      'Material: 80% Premium Cotton, 20% Nylon Knit',
      'Fit: Relaxed modern silhouette',
      'Collar: Open camp/resort collar (no buttons)',
      'Care: Hand wash cold, dry flat, do not iron directly on knit'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 15,
    isNew: true,
    tagline: 'Inspired by Vintage Luxury',
    color: 'Obsidian Black',
    colorHex: '#121212'
  },
  {
    id: 'old-money-polo-beige',
    name: 'Old Money Knitted Polo',
    category: 'polos',
    categoryLabel: 'Knitted Polos',
    price: 1899,
    originalPrice: 2499,
    rating: 4.9,
    reviewsCount: 98,
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'The epitome of casual refinement. Our sand-beige knitted polo offers a neutral, upscale tone that pairs effortlessly with linen trousers or relaxed denim.',
    details: [
      'Material: 80% Premium Cotton, 20% Nylon Knit',
      'Fit: Relaxed modern silhouette',
      'Collar: Open camp/resort collar (no buttons)',
      'Care: Hand wash cold, dry flat, do not iron directly on knit'
    ],
    sizes: ['M', 'L', 'XL'],
    inStock: true,
    stockCount: 4,
    isNew: false,
    tagline: 'Elegance in Simplicity',
    color: 'Sand Beige',
    colorHex: '#e1d6c3'
  },
  {
    id: 'racing-club-tee',
    name: 'AllStag Racing Club Graphic Tee',
    category: 'tees',
    categoryLabel: 'Graphic Tees',
    price: 1299,
    originalPrice: 1799,
    rating: 4.7,
    reviewsCount: 236,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Make a statement with the Racing Club Graphic Tee. Engineered from heavy-duty 240 GSM organic cotton, this boxy-fit tee features high-density streetwear prints on the chest and back representing our vintage motorsports collection.',
    details: [
      'Material: 100% Heavyweight Organic Cotton (240 GSM)',
      'Fit: Oversized / Boxy drop-shoulder fit',
      'Print: Front and back puff print detailing',
      'Care: Wash inside out, do not iron over print'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 28,
    isSale: true,
    tagline: 'Fast Lanes, Bold Statements',
    color: 'Vintage White',
    colorHex: '#f5f3ef'
  },
  {
    id: 'original-character-tee',
    name: 'Original Character Tee',
    category: 'tees',
    categoryLabel: 'Graphic Tees',
    price: 1299,
    rating: 4.6,
    reviewsCount: 147,
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Designed as a dialogue. The Original Character Tee features unique hand-drawn graphics that reflect individualistic streetwear culture. Super comfortable, breathable, and pre-shrunk.',
    details: [
      'Material: 100% Cotton (220 GSM)',
      'Fit: Relaxed drop-shoulder fit',
      'Print: Screen printed graphic on front chest',
      'Care: Machine wash cold, tumble dry low'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 8,
    isNew: true,
    tagline: 'Your Story, Your Fabric',
    color: 'Acid Wash Grey',
    colorHex: '#3c3d42'
  },
  {
    id: 'midnight-munchies-tee',
    name: 'Midnight Munchies Tee',
    category: 'tees',
    categoryLabel: 'Graphic Tees',
    price: 1199,
    originalPrice: 1599,
    rating: 4.8,
    reviewsCount: 84,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Perfect for late-night vibes. This graphic tee displays an artistic, colorful neon sign graphic on the back. Heavyweight feel with a super premium touch.',
    details: [
      'Material: 100% Ring-spun Cotton (240 GSM)',
      'Fit: Heavy oversized block',
      'Print: Premium DTG neon-style print',
      'Care: Machine wash cold inside out, iron on reverse'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 12,
    isSale: true,
    tagline: 'Vibrant Colors, Dark Nights',
    color: 'Pitch Black',
    colorHex: '#080808'
  },
  {
    id: 'performance-active-joggers',
    name: 'Pro-Active Street Joggers',
    category: 'activewear',
    categoryLabel: 'Active Wear',
    price: 2199,
    originalPrice: 2999,
    rating: 4.9,
    reviewsCount: 112,
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Where utility meets street aesthetics. Our performance active joggers feature cargo-style zip pockets, a heavy-duty drawcord, and flexible elastic cuffs, designed for high mobility and supreme comfort.',
    details: [
      'Material: 88% Nylon, 12% Spandex water-resistant blend',
      'Pockets: YKK zipper side and cargo pockets',
      'Waist: Adjustable elastic waistband with metal-tipped drawcord',
      'Care: Machine wash cold, do not tumble dry'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 3,
    isNew: false,
    isSale: true,
    tagline: 'Engineered for Movement',
    color: 'Sage Green',
    colorHex: '#5b6355'
  },
  {
    id: 'allstag-classic-tank',
    name: 'AllStag Classic Ribbed Tank',
    category: 'tanks',
    categoryLabel: 'Tanks',
    price: 799,
    originalPrice: 999,
    rating: 4.5,
    reviewsCount: 195,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'The ultimate base layer. Our ribbed tank top features a stretch-fit ribbed structure, cut deep at the armholes for a relaxed, athletic look. Perfect for showing off shoulders or layering under open shirts.',
    details: [
      'Material: 95% Organic Ribbed Cotton, 5% Elastane',
      'Texture: 2x2 fine rib pattern',
      'Fit: Fitted athletic silhouette',
      'Care: Tumble dry low, warm iron if needed'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 19,
    isNew: false,
    tagline: 'The Ultimate Base Layer',
    color: 'Heather Charcoal',
    colorHex: '#2f3032'
  },
  {
    id: 'resort-striped-polo',
    name: 'Resort Knit Striped Polo',
    category: 'polos',
    categoryLabel: 'Knitted Polos',
    price: 1999,
    rating: 4.8,
    reviewsCount: 42,
    images: [
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'An vintage-inspired striped design that captures the relaxed vibe of summer vacations. Intricately knitted with high-quality yarn for a structured drape.',
    details: [
      'Material: 85% Mercerized Cotton, 15% Linen Knit',
      'Pattern: Horizontal vintage cream and olive stripes',
      'Collar: Retro camp collar',
      'Care: Dry clean recommended, or cold hand wash'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 6,
    isNew: true,
    tagline: 'Retro Resort Vibes',
    color: 'Olive / Cream Stripe',
    colorHex: '#3b4235'
  }
];
