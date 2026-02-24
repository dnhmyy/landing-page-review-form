export interface Product {
    id: number;
    name: string;
    category: string;
    desc: string;
    price: string;
    image: string;
    tag?: string;
}

export const categories = ["All", "Sourdough", "Croissants", "Signature", "Sweet", "Savory"];

export const products: Product[] = [
    {
        id: 1,
        name: "Sourdough Classic",
        category: "Sourdough",
        tag: "Bestseller",
        desc: "Fermented for 36 hours, crispy crust, tangy crumb. Our bestseller.",
        price: "Rp 85.000",
        image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        name: "Croissant au Beurre",
        category: "Croissants",
        tag: "Premium",
        desc: "Laminated with premium French butter. Flaky, golden, extraordinary.",
        price: "Rp 45.000",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        name: "Whole Wheat Batard",
        category: "Sourdough",
        tag: "Healthy",
        desc: "Packed with nutrients, perfect mild nutty flavor for everyday.",
        price: "Rp 70.000",
        image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 4,
        name: "Pain au Chocolat",
        category: "Croissants",
        tag: "Signature",
        desc: "Dark 70% cacao wrapped in our signature laminated dough.",
        price: "Rp 55.000",
        image: "https://images.unsplash.com/photo-1612977234362-85dddf1e8c8a?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 5,
        name: "Focaccia Rosemary",
        category: "Savory",
        tag: "Daily",
        desc: "Olive oil-drizzled, herb-laden. Perfect with olive tapenade.",
        price: "Rp 60.000",
        image: "https://images.unsplash.com/photo-1586444248711-c27c4ec9dab0?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 6,
        name: "Cinnamon Roll",
        category: "Sweet",
        tag: "Fan Favorite",
        desc: "Pillowy soft, cream cheese frosted. Morning indulgence perfected.",
        price: "Rp 50.000",
        image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 7,
        name: "Bagel Sesame",
        category: "Signature",
        tag: "Classic",
        desc: "Chewy, boiled then baked. Classic NYC style with toasted sesame.",
        price: "Rp 35.000",
        image: "https://images.unsplash.com/photo-1533470192478-9997ec266851?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 8,
        name: "Rye Bread",
        category: "Sourdough",
        tag: "Traditional",
        desc: "Dense, earthy, and aromatic. Perfect for hearty sandwiches.",
        price: "Rp 75.000",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 9,
        name: "Almond Croissant",
        category: "Croissants",
        tag: "New",
        desc: "Twice-baked with almond cream and topped with sliced almonds.",
        price: "Rp 52.000",
        image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 10,
        name: "Cheese Danish",
        category: "Sweet",
        tag: "Sweet",
        desc: "Flaky pastry with a sweet cream cheese center and apricot glaze.",
        price: "Rp 42.000",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 11,
        name: "Olive Loaf",
        category: "Sourdough",
        tag: "Artisan",
        desc: "Crusty sourdough filled with Kalamata and green olives.",
        price: "Rp 90.000",
        image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800",
    }
];
