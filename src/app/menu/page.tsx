"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChevronRight, Filter } from "lucide-react";
import Link from "next/link";

import { products, categories } from "@/lib/products";

export default function MenuPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Header */}
            <section className="pt-24 pb-16 px-6 bg-primary text-primary-foreground relative overflow-hidden">
                {/* Subtle decorative pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                <div className="max-w-7xl mx-auto relative">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-white/40 text-xs font-semibold mb-6 tracking-wide uppercase">
                        <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-white/70">Menu</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <h1 className="text-4xl font-black tracking-tight mb-3">
                                Menu Andalan Kami
                            </h1>
                            <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
                                Jelajahi koleksi artisan bakery kami. Setiap produk dibuat dengan penuh kebanggaan, dedikasi, dan bahan premium terbaik.
                            </p>
                            {/* Accent line */}
                            <div className="mt-6 w-16 h-1 rounded-full bg-accent/60" />
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
                        key={selectedCategory}
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.04
                                }
                            }
                        }}
                        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6"
                    >
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                variants={{
                                    hidden: { opacity: 0, y: 15 },
                                    show: { opacity: 1, y: 0 }
                                }}
                                transition={{
                                    duration: 0.4,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                className="group flex flex-col h-full bg-white rounded-[16px] md:rounded-[24px] overflow-hidden border border-primary/5 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                            >
                                <div className="relative shrink-0 aspect-[4/3] w-full overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-2 right-2 md:top-4 md:right-4">
                                        <span className="bg-white/90 backdrop-blur-md text-primary font-black text-[7px] md:text-[10px] uppercase tracking-widest px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-full shadow-sm">
                                            {product.tag}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3 md:p-5 flex flex-col flex-1">
                                    <h3 className="text-sm md:text-xl font-black text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2 md:line-clamp-1">
                                        {product.name}
                                    </h3>
                                    <p className="hidden md:block text-foreground/50 text-xs leading-relaxed mb-2 line-clamp-2 italic flex-1">
                                        {product.desc}
                                    </p>
                                    <div className="mt-auto pt-2 md:pt-3 border-t border-muted/30">
                                        <div className="flex items-center justify-between">
                                            <span className="text-primary font-black text-sm md:text-lg">
                                                {product.price}
                                            </span>
                                            <Link href={`/order?item=${product.id}`} className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm font-bold text-foreground/40 group-hover:text-primary transition-colors">
                                                Order <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
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
