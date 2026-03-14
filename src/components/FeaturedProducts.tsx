"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";

import { Product } from "@/lib/products";

export function FeaturedProducts() {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                setFeaturedProducts(data.slice(0, 6));
            } catch (error) {
                console.error("Error fetching featured products:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFeatured();
    }, []);
    return (
        <section id="menu" className="py-20 px-6 bg-muted/30">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                    <div className="max-w-xl">
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-primary font-black text-sm uppercase tracking-[0.25em] mb-4"
                        >
                            Fresh From The Oven
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl font-black text-foreground mb-4"
                        >
                            Menu Andalan Kami
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-foreground/55 text-lg leading-relaxed"
                        >
                            Dipanggang fresh from the oven setiap pagi — made with premium ingredients,
                            no preservatives added, dengan cita rasa tak tergantikan.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Link
                            href="/menu"
                            className="inline-flex items-center gap-2 group text-primary font-black uppercase tracking-[0.2em] text-sm"
                        >
                            Lihat Selengkapnya
                            <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </Link>
                    </motion.div>
                </div>

                {/* Grid */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 w-full col-span-full">
                        <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                        <p className="text-foreground/30 font-black italic">Mencari roti terbaik...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                        {featuredProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{
                                    duration: 0.55,
                                    delay: i * 0.08,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="group flex flex-col h-full bg-white rounded-[16px] md:rounded-[32px] overflow-hidden border border-primary/5 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                            >
                                <div className="relative shrink-0 aspect-[4/3] w-full overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 500px"
                                        quality={85}
                                    />
                                    <div className="absolute top-2 right-2 md:top-6 md:right-6">
                                        {product.tag === "Best Seller" ? (
                                            <span className="bg-amber-400 text-amber-950 font-black text-[9px] md:text-[11px] uppercase tracking-[0.15em] px-2.5 py-1 md:px-5 md:py-2.5 rounded-full shadow-lg shadow-amber-500/20 border border-amber-300/50 flex items-center gap-1.5">
                                                <span className="w-1 h-1 rounded-full bg-amber-950 animate-pulse" />
                                                {product.tag}
                                            </span>
                                        ) : (
                                            <span className="bg-white/80 backdrop-blur-md text-primary/80 font-black text-[9px] md:text-[10px] uppercase tracking-widest px-2 py-0.5 md:px-4 md:py-2 rounded-full border border-white/20 shadow-sm">
                                                {product.tag}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="p-3 md:p-8 flex flex-col flex-1">
                                    <h3 className="text-sm md:text-2xl font-black text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors line-clamp-2 md:line-clamp-1">
                                        {product.name}
                                    </h3>
                                    <p className="hidden md:block text-foreground/50 text-sm leading-relaxed mb-4 italic flex-1">
                                        {product.desc}
                                    </p>
                                    <div className="mt-auto pt-2 md:pt-6 border-t border-muted/30">
                                        <div className="flex items-center justify-between">
                                            <span className="text-primary font-black text-sm md:text-2xl">
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
                    </div>
                )}
            </div>
        </section>
    );
}
