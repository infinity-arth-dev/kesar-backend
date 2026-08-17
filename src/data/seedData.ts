import { Category, Product, Review, Coupon, BlogPost, CmsPage, Order, User } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-bestsellers',
    name: 'Bestsellers',
    slug: 'bestsellers',
    description: 'Our most loved 100% Grade-1 Kashmir Mongra Saffron crimson threads on vintage silver spoon.',
    imageUrl: '/assets/saffron-spice-still-life-composition_a15d1d9d-378b-4929-b5d5-90bc7304f4d0_540x.webp',
  },
  {
    id: 'cat-retail',
    name: 'Retail Packs',
    slug: 'retail-packs',
    description: 'Airtight, anti-moisture glass jars & single-gram packs preserving pure golden saffron liquid & aroma.',
    imageUrl: '/assets/aromatic-saffron-still-life-arrangement_23-2149186961.webp',
  },
  {
    id: 'cat-combos',
    name: 'Combo Packs',
    slug: 'combo-packs',
    description: 'Multi-pack value bundles & culinary saffron sets for daily health, traditional kheer & tea.',
    imageUrl: '/assets/Baby20Aamras_540x.webp',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1g',
    slug: 'maa-kesar-1g',
    title: 'MAA KESAR - 1G',
    subtitle: 'Homegrown Saffron • 100% Pure and Authentic • Freshness Sealed',
    description: `Maa Kesar – 1g Single Pack brings you the finest, handpicked saffron strands packed with natural aroma, rich color, and unmatched purity. Sourced from trusted farms in Pampore, Kashmir, this compact pack is perfect for daily use, tea, or culinary delights.

Key Features:
* Premium Grade: Carefully selected saffron threads for superior quality.
* Pure & Natural: Free from additives, preservatives, and artificial color.
* Aroma & Flavor: Enhances food and drink with authentic saffron fragrance and taste.
* Secure Packaging: Airtight and tamper-proof for lasting freshness.`,
    categoryId: 'cat-bestsellers',
    categoryName: 'Bestsellers',
    basePrice: 390,
    compareAtPrice: 490,
    isBestSeller: true,
    isActive: true,
    createdAt: '2026-01-10T10:00:00Z',
    rating: 5.0,
    reviewCount: 5,
    weightGrams: 1,
    images: [
      {
        id: 'img-1g',
        productId: 'prod-1g',
        url: '/assets/1packwala.webp',
        alt: 'MAA KESAR - 1G',
        position: 0,
      },
    ],
    variants: [
      { id: 'var-1g', productId: 'prod-1g', label: '1g Pack', sku: 'MK-1G', price: 390, compareAtPrice: 490, stock: 150 },
    ],
  },
  {
    id: 'prod-1g-pack-2',
    slug: 'maa-kesar-1g-pack-of-2',
    title: 'MAA KESAR - 1G PACK OF 2',
    subtitle: 'Homegrown Saffron • 100% Pure and Authentic • Freshness Sealed',
    description: `Maa Kesar – 1g Pack of 2 brings you the finest, handpicked saffron strands packed with natural aroma, rich color, and unmatched purity. Sourced from trusted farms, this compact combo is perfect for occasional users or gifting. Whether you're enhancing a dish or embracing wellness, Maa Kesar adds a luxurious touch to every use.

Key Features:
Premium Grade: Carefully selected saffron threads for superior quality.
Pure & Natural: Free from additives, preservatives, and artificial color.
Perfect Portions: 1g x 2 packs ideal for smaller, controlled usage.
Aroma & Flavor: Enhances food and drink with authentic saffron fragrance and taste.
Secure Packaging: Airtight and tamper-proof for lasting freshness.

Uses:
Food & Beverage: Ideal for biryanis, sweets, milk, and tea.
Health & Wellness: Known for antioxidant and mood-enhancing properties.
Beauty Rituals: Can be used in face masks or homemade skincare blends.
Gifting: A thoughtful, elegant gift for festive occasions and rituals.`,
    categoryId: 'cat-bestsellers',
    categoryName: 'Bestsellers',
    basePrice: 700,
    compareAtPrice: 980,
    isBestSeller: true,
    isActive: true,
    createdAt: '2026-01-12T10:00:00Z',
    rating: 5.0,
    reviewCount: 3,
    weightGrams: 2,
    images: [
      {
        id: 'img-1g-pack-2',
        productId: 'prod-1g-pack-2',
        url: '/assets/2packwala.webp',
        alt: 'MAA KESAR - 1G PACK OF 2',
        position: 0,
      },
    ],
    variants: [
      { id: 'var-1g-2-pack', productId: 'prod-1g-pack-2', label: '1g Pack of 2', sku: 'MK-1G-2P-PACK', price: 700, compareAtPrice: 980, stock: 637 },
    ],
  },
  {
    id: 'prod-1g-pack-4',
    slug: 'maa-kesar-1g-pack-of-4',
    title: 'MAA KESAR - 1G PACK OF 4',
    subtitle: 'Homegrown Saffron • 100% Pure and Authentic • Freshness Sealed',
    description: `Maa Kesar – 1g Pack of 4 provides four individual 1g blister packs of Grade-1 Kashmiri Saffron. Ideal for households and regular saffron consumers looking for value and freshness preservation.

Key Features:
* Premium Grade: Handpicked Grade 1 Kashmir Saffron.
* Pack of 4: Sealed 1g individual portions for long freshness.
* Direct from Pampore: 100% natural without artificial coloring.`,
    categoryId: 'cat-bestsellers',
    categoryName: 'Bestsellers',
    basePrice: 1480,
    compareAtPrice: 1960,
    isBestSeller: true,
    isActive: true,
    createdAt: '2026-01-14T10:00:00Z',
    rating: 5.0,
    reviewCount: 0,
    weightGrams: 4,
    images: [
      {
        id: 'img-1g-pack-4',
        productId: 'prod-1g-pack-4',
        url: '/assets/4packwala.webp',
        alt: 'MAA KESAR - 1G PACK OF 4',
        position: 0,
      },
    ],
    variants: [
      { id: 'var-1g-4-pack', productId: 'prod-1g-pack-4', label: '1g Pack of 4', sku: 'MK-1G-4P-PACK', price: 1480, compareAtPrice: 1960, stock: 120 },
    ],
  },
  {
    id: 'prod-1g-pack-6',
    slug: 'maa-kesar-1g-pack-of-6',
    title: 'MAA KESAR - 1G PACK OF 6',
    subtitle: 'Homegrown Saffron • 100% Pure and Authentic • Freshness Sealed',
    description: `Maa Kesar – 1g Pack of 6 offers six individually sealed 1g packs of pure Kashmiri Saffron. Perfect for family consumption, festive cooking, or gifting.

Key Features:
* 6 Individual 1g Blister Packs.
* 100% Pure Grade-1 Kashmiri Saffron.
* Excellent savings over single pack purchases.`,
    categoryId: 'cat-bestsellers',
    categoryName: 'Bestsellers',
    basePrice: 2100,
    compareAtPrice: 2940,
    isBestSeller: true,
    isActive: true,
    createdAt: '2026-01-16T10:00:00Z',
    rating: 5.0,
    reviewCount: 0,
    weightGrams: 6,
    images: [
      {
        id: 'img-1g-pack-6',
        productId: 'prod-1g-pack-6',
        url: '/assets/6packwala.webp',
        alt: 'MAA KESAR - 1G PACK OF 6',
        position: 0,
      },
    ],
    variants: [
      { id: 'var-1g-6-pack', productId: 'prod-1g-pack-6', label: '1g Pack of 6', sku: 'MK-1G-6P-PACK', price: 2100, compareAtPrice: 2940, stock: 95 },
    ],
  },
  {
    id: 'prod-1g-pack-10',
    slug: 'maa-kesar-1g-pack-of-10',
    title: 'MAA KESAR - 1G PACK OF 10',
    subtitle: 'Homegrown Saffron • 100% Pure and Authentic • Freshness Sealed',
    description: `Maa Kesar – 1g Pack of 10 contains ten individually sealed 1g blister packs of Grade-1 Kashmiri Saffron. Great value for daily culinary and health rituals.

Key Features:
* 10 Individual 1g Packs.
* High crocin and safranal potency.
* Save 32% compared to single pack purchases.`,
    categoryId: 'cat-bestsellers',
    categoryName: 'Bestsellers',
    basePrice: 3300,
    compareAtPrice: 4900,
    isBestSeller: true,
    isActive: true,
    createdAt: '2026-01-18T10:00:00Z',
    rating: 5.0,
    reviewCount: 0,
    weightGrams: 10,
    images: [
      {
        id: 'img-1g-pack-10',
        productId: 'prod-1g-pack-10',
        url: '/assets/1gof10.webp',
        alt: 'MAA KESAR - 1G PACK OF 10',
        position: 0,
      },
    ],
    variants: [
      { id: 'var-1g-10-pack', productId: 'prod-1g-pack-10', label: '1g Pack of 10', sku: 'MK-1G-10P-PACK', price: 3300, compareAtPrice: 4900, stock: 50 },
    ],
  },
  {
    id: 'prod-1g-pack-20',
    slug: 'maa-kesar-1g-pack-of-20',
    title: 'MAA KESAR 1G PACK OF 20',
    subtitle: 'Homegrown Saffron • 100% Pure and Authentic • Freshness Sealed',
    description: `Maa Kesar – 1g Pack of 20 is our ultimate bulk value set featuring twenty 1g sealed packs. Ideal for large families, caterers, or festive distribution. Whether you're enhancing a dish or embracing wellness, Maa Kesar adds a luxurious touch to every use.

Key Features:
Premium Grade: Carefully selected saffron threads for superior quality.
Pure & Natural: Free from additives, preservatives, and artificial color.
Perfect Portions: 1g x 20 individual sealed blister packs ideal for long term usage & maximum savings (38% Off).
Aroma & Flavor: Enhances food and drink with authentic saffron fragrance and taste.
Secure Packaging: Airtight and tamper-proof for lasting freshness.

Uses:
Food & Beverage: Ideal for biryanis, sweets, milk, and tea.
Health & Wellness: Known for antioxidant and mood-enhancing properties.
Beauty Rituals: Can be used in face masks or homemade skincare blends.
Gifting: A thoughtful, elegant gift for festive occasions and rituals.`,
    categoryId: 'cat-bestsellers',
    categoryName: 'Bestsellers',
    basePrice: 6000,
    compareAtPrice: 9800,
    isBestSeller: true,
    isActive: true,
    createdAt: '2026-01-20T10:00:00Z',
    rating: 5.0,
    reviewCount: 0,
    weightGrams: 20,
    images: [
      {
        id: 'img-1g-pack-20',
        productId: 'prod-1g-pack-20',
        url: '/assets/20wala.webp',
        alt: 'MAA KESAR 1G PACK OF 20',
        position: 0,
      },
    ],
    variants: [
      { id: 'var-1g-20-pack', productId: 'prod-1g-pack-20', label: '1g Pack of 20', sku: 'MK-1G-20P-PACK', price: 6000, compareAtPrice: 9800, stock: 30 },
    ],
  },
  {
    id: 'prod-mothers-day-hamper',
    slug: 'mothers-day-hamper',
    title: 'Maa kesar Gift Hamper',
    subtitle: 'Homegrown Saffron • 100% Pure and Authentic • Freshness Sealed',
    description: `🌸 Maa Kesar Gift Hamper

The Maa Kesar Gift Hamper is a thoughtfully curated box of care, warmth, and everyday indulgence — designed to make her feel loved and appreciated. 💛

🎁 What's Inside:
🌿 Maa Kesar Homegrown Kashmiri Saffron
Pure, aromatic saffron to add richness to her daily rituals.
☕ Maa Kesar Ceramic Mug
For her peaceful tea or milk moments, every single day.
🧴 Saffron Moisturising Cream
Keeps skin soft, hydrated, and non-sticky — perfect for daily self-care.
Note :
Box is just used for representation purpose.

✨ Why Choose This Hamper?
A perfect mix of tradition + thoughtful gifting
Practical products she'll actually use
Elegant packaging for a premium feel
A meaningful gift that shows care, not just says it.`,
    categoryId: 'cat-retail',
    categoryName: 'Retail Packs',
    basePrice: 1200,
    compareAtPrice: 3000,
    isBestSeller: true,
    isActive: true,
    createdAt: '2026-01-22T10:00:00Z',
    rating: 5.0,
    reviewCount: 0,
    weightGrams: 500,
    images: [
      {
        id: 'img-hamper',
        productId: 'prod-mothers-day-hamper',
        url: '/assets/gifthamper.webp',
        alt: 'Maa kesar Gift Hamper',
        position: 0,
      },
    ],
    variants: [
      { id: 'var-hamper', productId: 'prod-mothers-day-hamper', label: 'Gift Hamper', sku: 'MK-GIFT-HAMPER', price: 1200, compareAtPrice: 3000, stock: 93 },
    ],
  },
  {
    id: 'prod-maa-kesar-5g',
    slug: 'maa-kesar-5g',
    title: 'Maa Kesar - 5g',
    subtitle: 'Homegrown Saffron • 100% Pure and Authentic • Freshness Sealed',
    description: `Maa Kesar - 5g brings you the essence of pure, high-grade saffron in a single convenient pack. Carefully handpicked from trusted farms, each strand is rich in natural color, intense aroma, and unmatched flavor. Ideal for personal use, daily wellness, or enhancing your favorite recipes, this 5g pack is your go-to for authenticity and quality.

Key Features:
100% Pure Saffron: No additives, artificial colors, or preservatives.
Rich Aroma & Color: Long, deep-red strands packed with natural strength.
Single Use Convenience: Perfect for individual or short-term use.
Secure Packaging: Airtight seal preserves freshness and potency.
Authentically Sourced: Harvested using traditional, ethical methods.

Uses:
Culinary: Adds richness to milk, biryanis, desserts, and beverages.
Wellness: Traditionally used for immunity, mood enhancement, and digestion.
Skincare: Great for face masks and DIY glow remedies.
Gifting: A small but luxurious token for any occasion.`,
    categoryId: 'cat-retail',
    categoryName: 'Retail Packs',
    basePrice: 1859,
    compareAtPrice: 2100,
    isBestSeller: true,
    isActive: true,
    createdAt: '2026-01-25T10:00:00Z',
    rating: 5.0,
    reviewCount: 1,
    weightGrams: 5,
    images: [
      {
        id: 'img-5g-wala',
        productId: 'prod-maa-kesar-5g',
        url: '/assets/5gwala.webp',
        alt: 'Maa Kesar - 5g',
        position: 0,
      },
      {
        id: 'img-5g-2',
        productId: 'prod-maa-kesar-5g',
        url: '/assets/5_2.webp',
        alt: 'Maa Kesar - 5g Details',
        position: 1,
      },
    ],
    variants: [
      { id: 'var-5g', productId: 'prod-maa-kesar-5g', label: '5g Pack', sku: 'MK-5G', price: 1859, compareAtPrice: 2100, stock: 2221 },
    ],
  },
];

export const INITIAL_REVIEWS: Review[] = [];

export const INITIAL_COUPONS: Coupon[] = [];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-4',
    slug: 'the-soul-of-the-himalayas-in-every-strand-discover-maa-kesars-pure-saffron',
    title: 'The Soul of the Himalayas in Every Strand: Discover Maa Kesar’s Pure Saffron',
    excerpt: 'When you think of saffron, images of luxury and wellness come to mind. But when you think of Himalayan saffron, you enter a world where purity, potency, and heritage converge.',
    category: 'blogs',
    publishedAt: '2026-02-15',
    readTime: '5 min read',
    author: 'Maa Kesar Editorial',
    coverImage: '/assets/saffron-spice-still-life-composition_a15d1d9d-378b-4929-b5d5-90bc7304f4d0_540x.webp',
    content: `When you think of saffron, images of luxury, wellness, and centuries-old traditions often come to mind. But when you think of Himalayan saffron, you enter a world apart — a world where purity, potency, and heritage converge in every delicate thread. At Maa Kesar, we don’t just offer saffron; we offer the pure essence born in the Himalayas, carefully hand-harvested and homegrown with deep devotion and respect for nature.

### What Makes Himalayan Saffron Truly Exceptional?

Saffron cultivated in the Himalayan region is unlike any other saffron found around the world. Nestled at high altitudes, surrounded by the majestic mountain peaks, the Himalayan environment provides the ideal conditions for growing *Crocus sativus* — the saffron crocus flower. The clean, crisp mountain air, mineral-rich soil, and cool climate create a perfect symbiosis that nurtures flowers bursting with vibrant crimson threads, rich aroma, and potent natural compounds.

This saffron is not mass-produced or rushed. It is a seasonal gift from the mountains, harvested with patience and respect. The saffron strands harvested from these heights carry a depth of flavor, color intensity, and therapeutic benefits that make Himalayan saffron a rare and precious commodity — truly nature’s liquid gold.

### Maa Kesar – Pure Saffron, Born in the Himalayas

At Maa Kesar, we stand apart because we are not just suppliers — we are the caretakers and cultivators of this precious spice. Our saffron is grown exclusively on our own farms nestled in the Himalayan foothills. Every step, from sowing the tiny saffron bulbs to the delicate handpicking of flowers during harvest, to the gentle sun-drying process, is performed with care, precision, and dedication.

This hands-on, family-driven approach ensures that the saffron you receive is the purest form possible — untouched by chemicals, free from adulteration, and full of the natural potency that only true Himalayan saffron can provide.

### What Sets Maa Kesar Apart?

* **Authenticity:** We refuse to compromise. No blending with cheaper saffron, no sourcing from unknown suppliers. Every strand of saffron in Maa Kesar packaging comes directly from our own farms, guaranteeing 100% purity.
* **Transparency:** Our commitment to honesty means that the journey of Maa Kesar saffron is clear and traceable — from farm to your hand. You know exactly where your saffron comes from, how it was grown, and the care it received.
* **Purity & Potency:** Packed with high levels of crocin, safranal, and picrocrocin, our saffron delivers unparalleled color, aroma, and healing properties. This makes it not only a culinary treasure but also a powerful ingredient in wellness and skincare rituals.

### The Power of Choosing Maa Kesar

In today’s saffron market, rife with adulterated products and false claims, Maa Kesar is a beacon of trust and purity. Our saffron offers more than just flavor or color—it brings a connection to the sacred Himalayan land where it is grown, the generations of farmers who nurture it, and the natural energy embedded in every strand.

Whether you are using saffron to enrich your cooking, to elevate your beauty rituals, or to harness its ancient spiritual benefits, Maa Kesar connects you directly to the heart of the Himalayas — a timeless source of purity, strength, and wellness.

When you hold a packet of Maa Kesar saffron, you’re holding a piece of Himalayan heritage, cultivated with love, carried with respect, and delivered with pride.

**Maa Kesar – Pure Saffron, Born in the Himalayas.**
*Experience the untouched purity of nature’s finest gift, in every golden strand.*`,
  },
  {
    id: 'recipe-shrikhand',
    slug: 'shrikhand-with-maa-kesar',
    title: 'Shrikhand with Maa Kesar',
    excerpt: 'Ingredients: 2 cups thick yogurt (hung curd/Greek yogurt), A pinch of Maa Kesar saffron strands, 2 tablespoons warm milk, 1/2 cup powdered sugar, 1/4 teaspoon cardamom powder, 1 tablespoon chopped pistachios and almonds, 1 teaspoon rose water (optional).',
    category: 'recipes',
    publishedAt: '2025-05-28',
    readTime: '5 min read',
    author: 'Chef Saira Bhat',
    coverImage: '/assets/KESAR_SHRIKHAND.webp',
    content: `Shrikhand with Maa Kesar is a smooth, creamy, and fragrant traditional Indian dessert infused with pure Kashmiri Mongra saffron.

### Ingredients:
* 2 cups thick yogurt (hung curd/Greek yogurt)
* A pinch of **Maa Kesar** saffron strands
* 2 tablespoons warm milk
* 1/2 cup powdered sugar (adjust to taste)
* 1/4 teaspoon cardamom powder
* 1 tablespoon chopped pistachios and almonds (for garnish)
* 1 teaspoon rose water (optional)

### Instructions:
1. **Soak Saffron:** Soak the saffron strands in warm milk for about 10 minutes to extract the color and flavor.
2. **Whisk Yogurt:** In a bowl, whisk the hung curd until smooth and creamy.
3. **Mix Flavoring:** Add powdered sugar, cardamom powder, and saffron-infused milk to the yogurt. Mix well until all ingredients are fully incorporated and the shrikhand turns a beautiful golden-yellow hue.
4. **Add Rose Water (Optional):** Optionally, add rose water for a subtle floral aroma and stir gently.
5. **Chill:** Chill the mixture in the refrigerator for at least 1-2 hours before serving.
6. **Garnish & Serve:** Garnish with chopped pistachios and almonds just before serving.

### Serving Suggestion:
Serve saffron shrikhand chilled as a dessert or a refreshing side to puris, poori, or parathas. The creamy texture combined with the delicate saffron aroma makes it a perfect festive treat.`,
  },
  {
    id: 'recipe-aamras',
    slug: 'maa-kesar-enriched-aamras',
    title: 'Maa Kesar enriched Aamras',
    excerpt: 'Ingredients: 2 ripe mangoes (peeled and chopped), A pinch of Maa Kesar saffron strands, 2 tablespoons warm milk, 1 to 1½ cups cold water or chilled milk, 1-2 tablespoons sugar or honey.',
    category: 'recipes',
    publishedAt: '2025-05-28',
    readTime: '5 min read',
    author: 'SAYALI IMPEX',
    coverImage: '/assets/ENRICHED_AAMRAS.webp',
    content: `Recipes
Maa Kesar enriched Aamras
By SAYALI IMPEX on May 28, 2025

### Ingredients:
* 2 ripe mangoes, peeled and chopped
* A pinch of Maa Kesar saffron strands
* 2 tablespoons warm milk (to soak saffron)
* 1 to 1½ cups cold water or chilled milk (adjust for consistency)
* 1-2 tablespoons sugar or honey (optional, adjust to taste)
* Ice cubes (optional)
* A few crushed cardamom seeds or a pinch of cardamom powder (optional)

### Instructions:
1. Soak the saffron strands in warm milk for about 10 minutes to extract their rich color and aroma.
2. In a blender, add the chopped mangoes, saffron-infused milk, and sugar or honey (if using).
3. Add cold water or chilled milk depending on how creamy or light you want the juice to be.
4. Blend everything until smooth and creamy.
5. Add a pinch of crushed cardamom or cardamom powder for an extra layer of flavor, if desired, and blend briefly.
6. Serve chilled over ice cubes for a refreshing drink.

### Serving Suggestion:
This saffron mango juice is a perfect summer cooler or a luxurious treat to celebrate the sweetness of mangoes enhanced by the exotic aroma of Maa Kesar saffron.`,
  },
  {
    id: 'recipe-baked-yogurt',
    slug: 'maa-kesar-cardamom-baked-yogurt',
    title: 'Maa Kesar Cardamom Baked Yogurt',
    excerpt: 'Ingredients: 2 cups full-fat yogurt (Greek yogurt or thick plain yogurt), 1 cup condensed milk, 1/2 cup fresh cream, A pinch of Maa Kesar saffron strands (bloomed in 2 tbsp warm milk), 1/2 tsp cardamom powder.',
    category: 'recipes',
    publishedAt: '2025-05-28',
    readTime: '6 min read',
    author: 'Maa Kesar Kitchen',
    coverImage: '/assets/BAKED_YOGURT.webp',
    content: `Maa Kesar Cardamom Baked Yogurt is a melt-in-your-mouth baked dessert featuring rich condensed milk, cream, and pure Kashmir Mongra saffron.

### Ingredients:
* 2 cups full-fat yogurt (Greek yogurt or thick plain yogurt)
* 1 cup condensed milk
* 1/2 cup fresh cream
* A pinch of **Maa Kesar** saffron strands (bloomed in 2 tbsp warm milk)
* 1/2 tsp cardamom powder
* Rose petals & slivered nuts for garnish

### Instructions:
1. **Prepare Saffron & Oven:** Pre-heat oven to 160°C (320°F). Steep Maa Kesar strands in warm milk for 15 minutes.
2. **Whisk Batter:** Whisk together thick yogurt, condensed milk, fresh cream, bloomed saffron milk, and cardamom powder until combined without over-beating.
3. **Bake:** Pour mixture into ramekins. Place in a baking tray filled halfway with hot water (water bath). Bake for 15-20 minutes until set with a slight wobble in the center.
4. **Chill:** Allow to cool to room temperature, then refrigerate for 2 hours. Garnish with rose petals, pistachios, and saffron threads.`,
  },
  {
    id: 'blog-2',
    slug: '5-proven-health-benefits-of-kashmiri-saffron',
    title: '5 Proven Health & Skin Benefits of Pure Kashmiri Saffron',
    excerpt: 'Discover why Ayurvedic doctors and modern nutritionists consider Kashmiri Mongra saffron nature’s ultimate golden elixir.',
    category: 'blogs',
    publishedAt: '2026-02-02',
    readTime: '6 min read',
    author: 'Dr. Sunita Kulkarni',
    coverImage: '/assets/6.webp',
    content: `For over 3,000 years, Saffron (*Crocus sativus*) has been revered in Ayurveda and traditional medicine for its extraordinary health benefits.

### 1. Pregnancy Wellness & Comfort
Warm saffron milk during pregnancy helps soothe digestion, reduces mood swings, and provides essential antioxidant support.

### 2. Radiant Glowing Skin & Anti-Pigmentation
Saffron contains crocin and safranal which reduce dark spots and enhance natural skin radiance when used in face masks or consumed daily.

### 3. Natural Mood Booster & Stress Relief
Studies show saffron acts as a natural antidepressant by modulating serotonin levels in the brain, helping promote restful sleep.

### 4. Immune System & Respiratory Health
High concentration of Vitamin C and carotenoids strengthens cellular immunity against seasonal chills and coughs.

### 5. Eye Health & Memory Protection
Carotenoids protect retinal cells against macular degeneration and boost cognitive function.`,
  },
  {
    id: 'blog-3',
    slug: 'how-to-spot-genuine-kashmir-saffron-vs-fake',
    title: 'How to Spot Genuine Kashmiri Grade-1 Saffron (Water Test)',
    excerpt: 'Protect yourself from artificial dyes and corn silk substitutes with these 4 simple purity tests you can perform at home.',
    category: 'blogs',
    publishedAt: '2026-02-10',
    readTime: '4 min read',
    author: 'Maa Kesar Quality Team',
    coverImage: '/assets/5_2.webp',
    content: `Adulterated saffron is unfortunately common in the market. Here is how you can verify Maa Kesar’s 100% purity:

1. **The Water Test:** Place 2-3 strands in lukewarm water. Genuine saffron releases color slowly (turning water golden yellow over 10-15 minutes). Fake saffron turns water deep red immediately due to synthetic chemical dyes.
2. **Strand Texture:** Real saffron strands expand slightly in water without losing their shape or dissolving.
3. **Aroma vs Taste:** Pure saffron smells sweet, honey-like, and floral, but tastes slightly bitter on the tongue.
4. **Baking Soda Test:** Mix saffron-infused water with a pinch of baking soda. Pure saffron solution turns clear bright yellow, while artificial dye turns cloudy red.`,
  }
];

export const INITIAL_CMS_PAGES: CmsPage[] = [
  {
    id: 'cms-benefits',
    slug: 'benefits-of-saffron',
    title: 'Benefits of Saffron',
    content: `
# The Nurturing Blessing of Pure Kashmir Saffron

At **Maa Kesar**, we celebrate the timeless purity of Kashmiri Saffron. Grown in the nutrient-dense purple fields of Pampore, Kashmir, our Grade 1 Mongra Saffron is packed with active bio-compounds including Crocin, Picrocrocin, and Safranal.

---

### Key Health & Lifestyle Benefits

* **Pregnancy Care:** Traditional wisdom recommends 2-3 strands in warm milk to promote digestion, muscle relaxation, and positive mood.
* **Gourmet Delicacy:** Enhances royal dishes like Biryani, Zafrani Kheer, Kahwa, Shahi Tukda, and Risotto with unmistakable golden hue and floral fragrance.
* **Skincare & Radiance:** Natural antioxidant properties reduce hyperpigmentation, brighten skin tone, and combat oxidative stress.
* **Mind & Sleep:** Safranal compound helps regulate circadian rhythms and calms anxiety.

---

### The Maa Kesar Guarantee
Every jar of Maa Kesar undergoes ISO 3632 Grade-1 testing to ensure zero artificial colors, zero added moisture, and zero yellow styles.
    `,
    updatedAt: '2026-02-01',
  },
  {
    id: 'cms-about',
    slug: 'about-us',
    title: 'About Maa Kesar',
    content: `
# One Land. One Legacy. One Saffron.

### Our Story
Rooted in the pristine valleys of Pampore, Kashmir, **Maa Kesar** began over 50 years ago as a humble family saffron farm. Handed down across three generations, our philosophy remains unchanged: **"Maa" (Mother) represents uncompromised purity and nurturing, while "Kesar" (Saffron) represents nature's golden treasure.**

Unlike commercial vendors who blend inferior imported saffron or middleman layers, Maa Kesar controls every step of the journey:
1. **Soil & Care:** Nurtured in Pampore’s unique alluvial soil.
2. **Hand Harvesting:** Carefully picked at dawn during the autumn bloom.
3. **Traditional Drying:** Sun-dried and separated into All-Red Mongra threads.
4. **Direct Delivery:** Vacuum-packed and delivered fresh from Kashmir to your doorstep.

Thank you for bringing Maa Kesar into your family kitchen and daily wellness ritual.
    `,
    updatedAt: '2026-02-01',
  },
  {
    id: 'cms-contact',
    slug: 'contact-us',
    title: 'Contact Us',
    content: `
# Get in Touch with Maa Kesar

Have a question about your order, bulk corporate gifting, or wholesale inquiries? Our team in Kashmir & Delhi is ready to assist you.

* **Email:** support@maakesar.com / sales@maakesar.com
* **WhatsApp / Phone:** +91 98765 43210
* **Farm & Packing Office:** Pampore Saffron Belt, Pulwama District, Jammu & Kashmir - 192121, India.
* **Corporate Office:** Connaught Place, New Delhi - 110001, India.
* **Working Hours:** Monday to Saturday, 9:00 AM – 7:00 PM IST
    `,
    updatedAt: '2026-02-01',
  },
  {
    id: 'cms-privacy',
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    content: `Thank you for visiting our website. This website is operated by Maa Kesar by accessing and/or using this website and related services, you agree to these Terms and Conditions, which include our Privacy Policy (Terms). You should review our Privacy Policy and these Terms carefully and immediately cease using our website if you do not agree to these Terms.

In these Terms, ‘us’, ‘we’ and ‘our’ means Maa Kesar and our related Affiliates.

These Terms may be updated from time to time. We will notify you by prominently posting a notice on our service.

If you are shopping through our online store, our Terms of Purchase will also apply to you.

### What information do we collect?

We collect information from you when you register on our site, place an order, subscribe to our newsletter, respond to a survey or fill out a form. When ordering or registering on our site, as appropriate, you may be asked to enter your: name, e-mail address, mailing address, phone number or credit card information. You may, however, visit our site anonymously.

### What do we use your information for?

Any of the information we collect from you may be used in one of the following ways:

- **To personalize your experience:** (Your information helps us to better respond to your individual needs)
- **To improve customer service:** (Your information helps us to more effectively respond to your customer service requests and support needs)
- **To process transactions:** (Your information, whether public or private, will not be sold, exchanged, transferred, or given to any other company for any reason whatsoever, without your consent, other than for the express purpose of delivering the purchased product or service requested.)
- **To administer a contest, promotion, survey or other site feature**
- **To send periodic emails:** The email address you provide for order processing, may be used to send you information and updates pertaining to your order, in addition to receiving occasional company news, updates, related product or service information, etc. Note: If at any time you would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email.

Name, contact information including email address, demographic information such as postcode, preferences and interests, and other information relevant to customer surveys and/or offers.

### What we do with the information we gather?

We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:

- Internal record keeping
- We may use the information to improve our products and services.
- We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.
- From time to time, we may also use your information to contact you for market research purposes.
- We may contact you by email, phone, fax or mail. We may use the information to customise the website according to your interests.

### How do we protect your information?

We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.

We offer the use of a secure server. All supplied sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our Payment gateway providers database only to be accessible by those authorized with special access rights to such systems, and are required to keep the information confidential.

After a transaction, your private information (credit cards, social security numbers, financials, etc.) will not be stored on our servers.

### Do we use cookies?

Yes (Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the sites or service providers systems to recognize your browser and capture and remember certain information.)

We use cookies to help us remember and process the items in your shopping cart, understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future. We may contract with third-party service providers to assist us in better understanding our site visitors. These service providers are not permitted to use the information collected on our behalf except to help us conduct and improve our business.

### Do we disclose any information to outside parties?

We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential and agree to provide same or equal protection of your data as stated in this Privacy Policy.

We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others rights, property, or safety. However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.

### Third party links

Occasionally, at our discretion, we may include or offer third party products or services on our website. These third party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites.

### California Online Privacy Protection Act Compliance

Although we value your privacy we have taken the necessary precautions to be in compliance with the California Online Privacy Protection Act. We therefore will not distribute your personal information to outside parties without your consent.

All users of our site may make any changes to their information at any time by logging into their control panel and going to the 'Edit Profile' page.

### Children's Online Privacy Protection Act Compliance

We are in compliance with the requirements of COPPA (Children's Online Privacy Protection Act), we do not collect any information from anyone under 13 years of age. Our website, products and services are all directed to people who are at least 13 years old or older.

### Online Privacy Policy Only

This online privacy policy applies only to information collected through our website and not to information collected offline.

### Terms and Conditions

Please also visit our Terms and Conditions section establishing the use, disclaimers, and limitations of liability governing the use of our website.

### Your Consent

By using our site, you consent to our online privacy policy. Changes to our Privacy Policy If we decide to change our privacy policy, we will update the Privacy Policy modification date below.

This policy was last modified on 25-04-2022.

### Contact us

If there are any queries regarding this privacy policy you may contact us using the information below:

www.maakesar.com  
No. 5, 2nd Floor, MGF Metropolis Mall  
Gurgaon, Haryana 122002  
India  

orders@maakesar.com`,
    updatedAt: '2022-04-25',
  },
  {
    id: 'cms-shipping',
    slug: 'shipping-policy',
    title: 'Shipping & Delivery Policy',
    content: `
# Shipping & Delivery Policy

### Express Shipping Across India
* **Free Delivery:** Standard shipping is free on all orders above ₹499 across India.
* **Standard Shipping Fee:** ₹50 flat rate for orders below ₹499.
* **Dispatch Time:** Orders are dispatched from our warehouse within 24–48 hours of payment confirmation.
* **Estimated Delivery Time:**
  * Metro Cities (Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata): 2–4 business days.
  * Rest of India: 4–7 business days.
* **Shipment Tracking:** Once dispatched, you will receive an SMS/Email with your courier tracking link (BlueDart, Delhivery, India Post).
    `,
    updatedAt: '2026-02-01',
  },
  {
    id: 'cms-refund',
    slug: 'refund-policy',
    title: 'Refund & Return Policy',
    content: `
# Refund & Return Policy

Due to the perishable and consumable nature of food and saffron products, we accept returns under specific circumstances to ensure customer satisfaction.

### Eligibility for Returns & Replacements:
* Received damaged, broken glass jar, or wrong item delivered.
* Package tampered during transit.

### How to Request a Return:
1. Contact us at **support@maakesar.com** or WhatsApp (+91 98765 43210) within 48 hours of delivery.
2. Provide your Order ID along with photo/video proof of the unboxing or damaged package.
3. Once approved, we will arrange a free reverse pickup and issue a full refund or immediate replacement.
    `,
    updatedAt: '2026-02-01',
  },
  {
    id: 'cms-terms',
    slug: 'terms-of-service',
    title: 'Terms of Service',
    content: `
# Terms of Service

Welcome to Maa Kesar. By accessing or using our website, you agree to be bound by these Terms of Service.

### 1. Store Terms
By agreeing to these Terms, you represent that you are at least the age of majority in your state or province of residence.

### 2. Pricing & Product Availability
Prices for our products are subject to change without notice. We reserve the right to limit quantities of any product offered.

### 3. Accuracy of Billing
You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.
    `,
    updatedAt: '2026-02-01',
  },
  {
    id: 'cms-cancellation',
    slug: 'cancellation-policies',
    title: 'Cancellation Policy',
    content: `
# Cancellation Policy

### Order Cancellation Rules
* You can cancel your order free of charge before it has been dispatched from our Kashmir facility (typically within 12 hours of placing the order).
* To cancel, go to **My Account > Orders > Cancel Order** or email support@maakesar.com with your Order ID.
* Once dispatched, orders cannot be cancelled directly, but you may refuse delivery or request a return upon arrival if damaged.
* Cancelled order refunds are processed back to the original payment method within 3–5 business days.
    `,
    updatedAt: '2026-02-01',
  },
];

export const INITIAL_ORDERS: Order[] = [];

export const DEMO_USERS: User[] = [
  {
    id: 'usr-demo-1',
    name: 'Priya Sharma',
    email: 'user@maakesar.com',
    role: 'CUSTOMER',
    createdAt: '2026-01-01',
    addresses: [
      {
        id: 'addr-1',
        userId: 'usr-demo-1',
        name: 'Priya Sharma',
        line1: 'Flat 402, Sunshine Apartments, Indiranagar',
        line2: '10th Main Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
        country: 'India',
        phone: '+91 98765 12345',
        isDefault: true,
      }
    ]
  },
  {
    id: 'usr-admin-1',
    name: 'Maa Kesar Admin',
    email: 'admin@maakesar.com',
    role: 'ADMIN',
    createdAt: '2026-01-01',
  }
];
