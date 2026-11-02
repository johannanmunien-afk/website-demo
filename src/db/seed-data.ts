const px = (id: number, w = 1200, h = 1500) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

export const seedCategories = [
  {
    slug: "skincare",
    name: "Skincare",
    tagline: "Serums, oils and rituals for radiant skin",
    image: px(28752006),
  },
  {
    slug: "bath-body",
    name: "Bath & Body",
    tagline: "Soaps, scrubs and everyday indulgence",
    image: px(4888822),
  },
  {
    slug: "grooming",
    name: "Grooming",
    tagline: "Beard care, colognes and sharp essentials",
    image: px(9379078),
  },
  {
    slug: "home-fragrance",
    name: "Home Fragrance",
    tagline: "Candles, incense and atmosphere",
    image: px(19599184),
  },
  {
    slug: "kitchen",
    name: "Kitchen",
    tagline: "Cookware and tools built to last",
    image: px(12156176),
  },
  {
    slug: "living",
    name: "Living & Decor",
    tagline: "Ceramics, textiles and finishing touches",
    image: px(27975928),
  },
];

type SeedProduct = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  audience: "women" | "men" | "everyone";
  shortDescription: string;
  description: string;
  price: string;
  compareAtPrice?: string;
  images: string[];
  highlights: string[];
  tags: string[];
  stock: number;
  featured?: boolean;
  isNew?: boolean;
  reviews: { author: string; rating: number; title: string; body: string }[];
};

export const seedProducts: SeedProduct[] = [
  {
    slug: "radiance-renewal-serum",
    name: "Radiance Renewal Serum",
    brand: "Maison Esther",
    category: "skincare",
    audience: "women",
    shortDescription: "Vitamin C + hyaluronic brightening serum, 30ml",
    description:
      "A featherlight daily serum that pairs 15% stabilised vitamin C with triple-weight hyaluronic acid. Skin looks brighter in seven days and visibly firmer in four weeks. Fragrance-free, vegan, and dermatologist tested for all skin types.",
    price: "58.00",
    compareAtPrice: "72.00",
    images: [px(28752006), px(16233812), px(15930068)],
    highlights: ["15% vitamin C", "Fragrance-free", "Vegan & cruelty-free", "Glass dropper bottle"],
    tags: ["bestseller", "vegan"],
    stock: 42,
    featured: true,
    reviews: [
      { author: "Amara O.", rating: 5, title: "My skin is glowing", body: "Two weeks in and my dark spots are already softer. The texture sinks in instantly—no stickiness under SPF." },
      { author: "Priya S.", rating: 5, title: "Worth every penny", body: "I've tried countless vitamin C serums that oxidised within a month. This one has stayed stable and effective." },
      { author: "Hannah L.", rating: 4, title: "Lovely, slightly pricey", body: "Beautiful results and packaging. Would love a larger refill size." },
    ],
  },
  {
    slug: "pore-perfect-niacinamide",
    name: "Pore Perfect Niacinamide 10%",
    brand: "Maison Esther",
    category: "skincare",
    audience: "everyone",
    shortDescription: "Oil-balancing treatment serum, 30ml",
    description:
      "Niacinamide 10% with zinc PCA minimises the look of pores, balances oil and calms redness. A clear, water-light formula that layers beautifully under moisturiser—morning and night.",
    price: "24.00",
    images: [px(32291052), px(8101534)],
    highlights: ["10% niacinamide", "1% zinc PCA", "Non-comedogenic", "Suitable for sensitive skin"],
    tags: ["vegan"],
    stock: 80,
    isNew: true,
    reviews: [
      { author: "Daniel K.", rating: 5, title: "Finally, no midday shine", body: "Been using this for a month. My T-zone is noticeably more matte and breakouts are rarer." },
      { author: "Zoe M.", rating: 4, title: "Simple and effective", body: "Does exactly what it says. No scent, no fuss." },
    ],
  },
  {
    slug: "midnight-recovery-oil",
    name: "Midnight Recovery Facial Oil",
    brand: "Velvet & Vine",
    category: "skincare",
    audience: "women",
    shortDescription: "Overnight replenishing oil with squalane & rosehip, 30ml",
    description:
      "A silky overnight oil blending plant squalane, cold-pressed rosehip and blue tansy. Wake up to skin that feels cushioned, calm and deeply nourished. Three drops is all you need.",
    price: "46.00",
    images: [px(35899861, 1200, 1500), px(15952934)],
    highlights: ["Cold-pressed botanicals", "Amber glass", "Night-time ritual", "Lightly scented with lavender"],
    tags: ["clean beauty"],
    stock: 30,
    featured: true,
    reviews: [
      { author: "Isabelle R.", rating: 5, title: "Dreamy", body: "The scent alone is enough to make me look forward to bedtime. Skin is plump every morning." },
      { author: "Grace T.", rating: 5, title: "Winter saviour", body: "My dry patches vanished within a week of using this at night." },
    ],
  },
  {
    slug: "lumiere-eye-concentrate",
    name: "Lumière Eye Concentrate",
    brand: "Velvet & Vine",
    category: "skincare",
    audience: "women",
    shortDescription: "Peptide & caffeine de-puffing eye serum, 15ml",
    description:
      "A cooling rollerball serum with peptides, caffeine and light-reflecting pearl to brighten tired eyes. Visibly reduces puffiness in minutes and softens fine lines over time.",
    price: "38.00",
    images: [px(31812004), px(16233812)],
    highlights: ["Cooling metal rollerball", "Ophthalmologist tested", "Peptide complex"],
    tags: [],
    stock: 25,
    reviews: [
      { author: "Nadia B.", rating: 4, title: "Great for mornings", body: "The rollerball feels amazing after a late night. Brightens nicely under concealer." },
    ],
  },
  {
    slug: "olive-oat-cleansing-bar-set",
    name: "Olive & Oat Cleansing Bar Set",
    brand: "Hearth Botanicals",
    category: "bath-body",
    audience: "everyone",
    shortDescription: "Three cold-process soaps, 3 × 120g",
    description:
      "Hand-poured cold-process soaps made with olive oil, shea butter and colloidal oatmeal. Rich, creamy lather that respects the skin barrier. The trio includes Eucalyptus Mint, Honey Oat and Charcoal Cedar.",
    price: "28.00",
    images: [px(5420467), px(6690846), px(4888820)],
    highlights: ["Cold-process", "Palm-oil free", "Plastic-free packaging", "Made in small batches"],
    tags: ["bestseller", "gift"],
    stock: 60,
    featured: true,
    reviews: [
      { author: "Tom H.", rating: 5, title: "Best bar soap I've owned", body: "Lasts forever and doesn't dry out my hands. The charcoal cedar is my favourite." },
      { author: "Elena V.", rating: 5, title: "Perfect gift", body: "Bought as a housewarming present and ended up ordering another set for myself." },
      { author: "Marcus W.", rating: 4, title: "Great lather", body: "Smells natural, not overpowering. Wish the set came with a dish." },
    ],
  },
  {
    slug: "marble-bath-ritual-kit",
    name: "Marble Bath Ritual Kit",
    brand: "Hearth Botanicals",
    category: "bath-body",
    audience: "everyone",
    shortDescription: "Body brush, pumice, soap & ceramic dish",
    description:
      "Everything needed to turn a quick shower into a ritual: a natural sisal body brush, lava pumice stone, a 150g botanical soap and a hand-glazed ceramic dish to keep it all tidy.",
    price: "54.00",
    compareAtPrice: "64.00",
    images: [px(4888822), px(7303926), px(7303972)],
    highlights: ["FSC-certified beechwood", "Natural sisal bristles", "Gift-ready box"],
    tags: ["gift"],
    stock: 18,
    reviews: [
      { author: "Sofia D.", rating: 5, title: "Spa at home", body: "The dry brush is excellent quality and the dish is gorgeous on my bathroom shelf." },
    ],
  },
  {
    slug: "neroli-hand-body-wash",
    name: "Neroli & Sea Salt Hand + Body Wash",
    brand: "Hearth Botanicals",
    category: "bath-body",
    audience: "everyone",
    shortDescription: "Refillable glass pump, 500ml",
    description:
      "A gentle sulphate-free wash scented with neroli blossom, bergamot and sea salt. The weighty glass bottle is designed to be refilled, so your counter stays beautiful for years.",
    price: "32.00",
    images: [px(7796738, 1200, 1500), px(7797851)],
    highlights: ["Sulphate-free", "Refillable", "Scent: neroli, bergamot, sea salt"],
    tags: ["clean beauty"],
    stock: 45,
    isNew: true,
    reviews: [
      { author: "Leah C.", rating: 5, title: "Smells like holiday", body: "Fresh and citrusy without being sweet. Guests always ask what it is." },
      { author: "Oliver P.", rating: 4, title: "Good quality wash", body: "Nice lather and the pump is sturdy. Refill pouch availability would be great." },
    ],
  },
  {
    slug: "cedar-tobacco-beard-oil",
    name: "Cedar & Tobacco Beard Oil",
    brand: "Northman Supply",
    category: "grooming",
    audience: "men",
    shortDescription: "Conditioning beard oil, 30ml",
    description:
      "Argan, jojoba and sweet almond oils soften coarse beard hair and soothe the skin underneath. Finished with a warm cedar and tobacco leaf accord that lingers subtly through the day.",
    price: "26.00",
    images: [px(9379076), px(9379078), px(9714438)],
    highlights: ["Non-greasy", "Reduces itch & flakes", "Glass dropper"],
    tags: ["bestseller"],
    stock: 70,
    featured: true,
    reviews: [
      { author: "James R.", rating: 5, title: "Softest my beard has been", body: "Absorbs in seconds and the scent is masculine without being loud. Already on my second bottle." },
      { author: "Kwame A.", rating: 5, title: "Great scent", body: "My partner loves the smell. Bought the balm too." },
      { author: "Chris N.", rating: 4, title: "Solid product", body: "Works well. Dropper could dispense a touch more per squeeze." },
    ],
  },
  {
    slug: "signature-eau-de-parfum",
    name: "Signature Eau de Parfum — Vetiver Noir",
    brand: "Northman Supply",
    category: "grooming",
    audience: "men",
    shortDescription: "Woody aromatic fragrance, 50ml",
    description:
      "An opening of bergamot and pink pepper settles into smoky vetiver, cedarwood and amber. Long-wearing and refined—built for boardrooms and evenings alike.",
    price: "84.00",
    compareAtPrice: "98.00",
    images: [px(40521620), px(17924227)],
    highlights: ["18% fragrance concentration", "8+ hour longevity", "Weighted glass flacon"],
    tags: ["gift"],
    stock: 22,
    featured: true,
    reviews: [
      { author: "Andre M.", rating: 5, title: "Compliments daily", body: "Smoky, elegant and lasts all day on my skin. Genuinely rivals designer bottles twice the price." },
      { author: "Ben F.", rating: 4, title: "Refined", body: "Very grown-up scent. Projection is moderate, which I actually prefer." },
    ],
  },
  {
    slug: "complete-beard-care-kit",
    name: "Complete Beard Care Kit",
    brand: "Northman Supply",
    category: "grooming",
    audience: "men",
    shortDescription: "Oil, balm, wash, comb & scissors",
    description:
      "The full routine in one handsome gift tin: beard oil, styling balm, foaming beard wash, a pearwood comb and precision trimming scissors. Everything a well-kept beard needs.",
    price: "68.00",
    images: [px(14649387), px(9395858), px(30473035)],
    highlights: ["5-piece set", "Reusable gift tin", "Pearwood comb"],
    tags: ["gift", "bestseller"],
    stock: 15,
    reviews: [
      { author: "Luis G.", rating: 5, title: "Perfect Father's Day gift", body: "Dad hasn't stopped talking about the balm. Quality feels premium throughout." },
    ],
  },
  {
    slug: "fig-amber-ceramic-candle",
    name: "Fig & Amber Ceramic Candle",
    brand: "Esther's Hearth",
    category: "home-fragrance",
    audience: "everyone",
    shortDescription: "Hand-poured soy candle in reusable vessel, 280g",
    description:
      "Ripe fig, warm amber and a whisper of sandalwood poured into a hand-thrown stoneware vessel. Fifty-five hours of clean-burning soy wax—then keep the vessel for pens, plants or your next refill.",
    price: "42.00",
    images: [px(19599184), px(7234528), px(7234527)],
    highlights: ["55-hour burn time", "100% soy wax", "Cotton wick", "Reusable stoneware"],
    tags: ["bestseller", "gift"],
    stock: 36,
    featured: true,
    reviews: [
      { author: "Charlotte E.", rating: 5, title: "Fills the whole flat", body: "Strong but sophisticated throw. The vessel is stunning on its own." },
      { author: "Yusuf I.", rating: 5, title: "Cosy perfection", body: "Lit it on a rainy evening and it set the mood instantly." },
      { author: "Megan O.", rating: 4, title: "Beautiful scent", body: "Took a couple of burns to fully open up but now it's lovely." },
    ],
  },
  {
    slug: "sanctuary-incense-set",
    name: "Sanctuary Incense & Holder Set",
    brand: "Esther's Hearth",
    category: "home-fragrance",
    audience: "everyone",
    shortDescription: "40 hand-rolled sticks + ceramic holder",
    description:
      "Forty hand-rolled sticks in Palo Santo, Sandalwood, White Sage and Jasmine, presented with a minimalist glazed ceramic holder. Each stick burns for approximately 45 minutes.",
    price: "29.00",
    images: [px(31390598), px(6954565)],
    highlights: ["Hand-rolled", "Four scents", "Ceramic holder included"],
    tags: ["gift"],
    stock: 50,
    isNew: true,
    reviews: [
      { author: "Rina K.", rating: 5, title: "Calming", body: "The sandalwood is my evening wind-down. Holder catches every bit of ash." },
      { author: "Theo B.", rating: 4, title: "Lovely set", body: "Good variety of scents. Palo Santo is the standout." },
    ],
  },
  {
    slug: "trio-votive-collection",
    name: "Trio Votive Collection",
    brand: "Esther's Hearth",
    category: "home-fragrance",
    audience: "everyone",
    shortDescription: "Three 90g candles: Linen, Oud, Citrus Grove",
    description:
      "Three signature scents in petite votives, ideal for sampling or scattering through the home. Linen is crisp and clean, Oud is deep and smoky, Citrus Grove is bright and uplifting.",
    price: "36.00",
    compareAtPrice: "45.00",
    images: [px(26578443), px(26847863)],
    highlights: ["3 × 20-hour burn", "Soy-coconut blend", "Boxed set"],
    tags: ["gift"],
    stock: 40,
    reviews: [
      { author: "Fatima A.", rating: 5, title: "Great sampler", body: "Loved being able to try three scents. Ordering the full-size Oud next." },
    ],
  },
  {
    slug: "matte-black-cookware-set",
    name: "Matte Black Cookware Set",
    brand: "Kingdom Kitchen",
    category: "kitchen",
    audience: "everyone",
    shortDescription: "5-piece ceramic non-stick set",
    description:
      "A 5-piece set that covers every weeknight: 20cm and 28cm frying pans, 2L and 4L saucepans with lids. Toxin-free ceramic non-stick over heavy-gauge aluminium with stay-cool handles. Induction compatible.",
    price: "189.00",
    compareAtPrice: "240.00",
    images: [px(12156176), px(34005916), px(31467781)],
    highlights: ["PFAS-free ceramic coating", "Induction compatible", "Oven safe to 220°C", "Lifetime warranty"],
    tags: ["bestseller"],
    stock: 12,
    featured: true,
    reviews: [
      { author: "Rebecca J.", rating: 5, title: "Eggs slide right off", body: "Replaced my scratched old pans. These heat evenly and look gorgeous hanging in the kitchen." },
      { author: "Samuel O.", rating: 5, title: "Restaurant quality", body: "Heavy, solid, and the lids fit perfectly. Great value for a full set." },
      { author: "Linda P.", rating: 4, title: "Very happy", body: "Lovely finish. Needs gentle hand-washing to keep it pristine but that's expected." },
    ],
  },
  {
    slug: "acacia-utensil-collection",
    name: "Acacia Wood Utensil Collection",
    brand: "Kingdom Kitchen",
    category: "kitchen",
    audience: "everyone",
    shortDescription: "7 hand-finished tools with crock",
    description:
      "Seven essential utensils—spoons, spatulas, tongs and a ladle—carved from sustainably harvested acacia and finished with food-safe oil. Arrives in a stoneware crock ready for the counter.",
    price: "48.00",
    images: [px(4805486), px(15852126), px(4794904)],
    highlights: ["Sustainably sourced acacia", "Safe for non-stick", "Stoneware crock included"],
    tags: ["gift"],
    stock: 34,
    reviews: [
      { author: "Nora W.", rating: 5, title: "Beautiful craftsmanship", body: "Each piece has a slightly different grain. Feels wonderful in hand." },
      { author: "Peter S.", rating: 4, title: "Great set", body: "Sturdy and attractive. Oil them occasionally and they'll last for years." },
    ],
  },
  {
    slug: "pour-over-coffee-set",
    name: "Morning Pour-Over Coffee Set",
    brand: "Kingdom Kitchen",
    category: "kitchen",
    audience: "everyone",
    shortDescription: "Glass carafe, gooseneck kettle & 2 mugs",
    description:
      "Slow mornings start here. A 600ml borosilicate glass carafe with wood collar, a 1L stainless gooseneck kettle for precise pours, and two hand-glazed stoneware mugs.",
    price: "96.00",
    images: [px(5490925, 1200, 1500), px(15852126)],
    highlights: ["Borosilicate glass", "Precision gooseneck spout", "Two stoneware mugs"],
    tags: ["gift"],
    stock: 20,
    isNew: true,
    reviews: [
      { author: "Alex D.", rating: 5, title: "Ritual upgraded", body: "The kettle pours beautifully and the carafe makes a clean, sweet cup." },
    ],
  },
  {
    slug: "sculpted-stoneware-vases",
    name: "Sculpted Stoneware Vase Trio",
    brand: "Esther's Hearth",
    category: "living",
    audience: "everyone",
    shortDescription: "Three hand-thrown vases in oat, sand & clay",
    description:
      "Three organic, hand-thrown vases in complementary neutral glazes. Group them on a mantel or scatter them through the home—each one holds a single stem as beautifully as a full bouquet.",
    price: "74.00",
    images: [px(27975928, 1200, 1500), px(26847863)],
    highlights: ["Hand-thrown stoneware", "Watertight glaze", "Heights 14 / 18 / 22cm"],
    tags: ["bestseller"],
    stock: 16,
    featured: true,
    reviews: [
      { author: "Camille F.", rating: 5, title: "Gallery-worthy", body: "Textures and tones are even nicer in person. The sand glaze is my favourite." },
      { author: "Harriet M.", rating: 5, title: "Exactly as pictured", body: "Packaged impeccably. They've completely elevated my shelf styling." },
    ],
  },
  {
    slug: "waffle-weave-towel-set",
    name: "Waffle Weave Towel Set",
    brand: "Esther's Hearth",
    category: "living",
    audience: "everyone",
    shortDescription: "2 bath + 2 hand towels, organic cotton",
    description:
      "Lightweight, quick-drying organic cotton in a honeycomb waffle weave that gets softer with every wash. Two bath towels and two hand towels in warm oatmeal.",
    price: "62.00",
    compareAtPrice: "78.00",
    images: [px(4794904), px(7303972)],
    highlights: ["GOTS-certified organic cotton", "Quick drying", "Pre-washed for softness"],
    tags: [],
    stock: 28,
    reviews: [
      { author: "Jess K.", rating: 5, title: "So absorbent", body: "Light but surprisingly absorbent. They dry fast in my small bathroom." },
      { author: "Ryan T.", rating: 4, title: "Nice texture", body: "Softened up a lot after two washes. Colour is a lovely neutral." },
    ],
  },
  {
    slug: "linen-table-runner",
    name: "Stonewashed Linen Table Runner",
    brand: "Esther's Hearth",
    category: "living",
    audience: "everyone",
    shortDescription: "European flax linen, 45 × 180cm",
    description:
      "Stonewashed European flax linen with a relaxed drape and frayed edge. Dresses a dinner table or a console with effortless texture. Machine washable and improves with age.",
    price: "39.00",
    images: [px(4805486, 1200, 1500), px(26578443)],
    highlights: ["100% European flax", "Stonewashed", "Machine washable"],
    tags: ["gift"],
    stock: 33,
    reviews: [
      { author: "Olivia N.", rating: 5, title: "Lovely weight", body: "Not flimsy at all. Looks great rumpled or pressed." },
    ],
  },
  {
    slug: "rose-quartz-face-roller-set",
    name: "Rose Quartz Roller & Gua Sha Set",
    brand: "Velvet & Vine",
    category: "skincare",
    audience: "women",
    shortDescription: "Genuine stone facial tools with linen pouch",
    description:
      "Genuine rose quartz dual-ended roller and sculpting gua sha to de-puff, boost circulation and help serums absorb. Keep them chilled for a cooling morning lift.",
    price: "34.00",
    images: [px(15930068), px(15952934)],
    highlights: ["Genuine rose quartz", "Silent, squeak-free roller", "Linen travel pouch"],
    tags: ["gift"],
    stock: 38,
    reviews: [
      { author: "Maya P.", rating: 5, title: "Morning essential", body: "Keep it in the fridge—instantly wakes up my face. Beautiful stone, no wobble." },
      { author: "Keira L.", rating: 4, title: "Pretty and useful", body: "Lovely quality. The gua sha takes a bit of practice but worth it." },
    ],
  },
];
