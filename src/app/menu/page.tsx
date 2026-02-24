"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChevronRight, Filter } from "lucide-react";

const categories = ["All", "Sourdough", "Croissants", "Signature", "Sweet", "Savory"];

const products = [
    {
        id: 1,
        name: "Sourdough Classic",
        category: "Sourdough",
        desc: "Fermented for 36 hours, crispy crust, tangy crumb. Our bestseller.",
        price: "Rp 85.000",
        image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        name: "Croissant au Beurre",
        category: "Croissants",
        desc: "Laminated with premium French butter. Flaky, golden, extraordinary.",
        price: "Rp 45.000",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        name: "Whole Wheat Batard",
        category: "Sourdough",
        desc: "Packed with nutrients, perfect mild nutty flavor for everyday.",
        price: "Rp 70.000",
        image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 4,
        name: "Pain au Chocolat",
        category: "Croissants",
        desc: "Dark 70% cacao wrapped in our signature laminated dough.",
        price: "Rp 55.000",
        image: "https://images.unsplash.com/photo-1612977234362-85dddf1e8c8a?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 5,
        name: "Focaccia Rosemary",
        category: "Savory",
        desc: "Olive oil-drizzled, herb-laden. Perfect with olive tapenade.",
        price: "Rp 60.000",
        image: "https://images.unsplash.com/photo-1586444248711-c27c4ec9dab0?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 6,
        name: "Cinnamon Roll",
        category: "Sweet",
        desc: "Pillowy soft, cream cheese frosted. Morning indulgence perfected.",
        price: "Rp 50.000",
        image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 7,
        name: "Bagel Sesame",
        category: "Signature",
        desc: "Chewy, boiled then baked. Classic NYC style with toasted sesame.",
        price: "Rp 35.000",
        image: "https://images.unsplash.com/photo-1533470192478-9997ec266851?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 8,
        name: "Rye Bread",
        category: "Sourdough",
        desc: "Dense, earthy, and aromatic. Perfect for hearty sandwiches.",
        price: "Rp 75.000",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 9,
        name: "Almond Croissant",
        category: "Croissants",
        desc: "Twice-baked with almond cream and topped with sliced almonds.",
        price: "Rp 52.000",
        image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 10,
        name: "Cheese Danish",
        category: "Sweet",
        desc: "Flaky pastry with a sweet cream cheese center and apricot glaze.",
        price: "Rp 42.000",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 11,
        name: "Olive Loaf",
        category: "Sourdough",
        desc: "Crusty sourdough filled with Kalamata and green olives.",
        price: "Rp 90.000",
        image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800",
    }
];

export default function MenuPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Header */}
            <section className="pt-24 pb-12 px-6 bg-primary text-primary-foreground">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <h1 className="text-4xl font-black tracking-tight mb-3">
                                Menu Andalan Kami
                            </h1>
                            <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
                                Jelajahi koleksi artisan bakery kami. Setiap produk dibuat dengan penuh kebanggaan, dedikasi, dan bahan premium terbaik.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 py-2 px-4 bg-white/10 rounded-2xl w-fit">
                            <Filter className="w-5 h-5" />
                            <span className="font-bold text-sm tracking-widest uppercase">Katalog Lengkap</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter & Products */}
            <section className="py-10 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {categories.map((cat, i) => (
                            <motion.button
                                key={cat}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all duration-300 ${selectedCategory === cat
                                    ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                                    : "bg-muted text-foreground/50 hover:bg-muted/80"
                                    }`}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>

                    {/* Product Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((product, i) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.05,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    className="group bg-white rounded-[16px] md:rounded-[24px] overflow-hidden border border-primary/5 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                                >
                                    <div className="relative h-24 md:h-48 overflow-hidden">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-2 right-2 md:top-4 md:right-4">
                                            <span className="bg-white/90 backdrop-blur-md text-primary font-black text-[7px] md:text-[10px] uppercase tracking-widest px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-full shadow-sm">
                                                {product.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-2 md:p-5 flex flex-col h-full">
                                        <h3 className="text-[10px] md:text-xl font-black text-foreground mb-0.5 md:mb-1 group-hover:text-primary transition-colors line-clamp-1">
                                            {product.name}
                                        </h3>
                                        <p className="hidden md:block text-foreground/50 text-xs leading-relaxed mb-4 line-clamp-2 italic">
                                            {product.desc}
                                        </p>
                                        <div className="flex items-center justify-between mt-auto pt-1.5 md:pt-3 border-t border-muted">
                                            <span className="text-primary font-black text-[9px] md:text-lg">
                                                {product.price}
                                            </span>
                                            <button className="hidden sm:flex items-center gap-2 text-sm font-bold text-foreground/40 group-hover:text-primary transition-colors">
                                                Order <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Empty State */}
                    {filteredProducts.length === 0 && (
                        <div className="py-40 text-center">
                            <p className="text-foreground/30 font-black text-2xl">Maaf, kategori ini belum tersedia.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
