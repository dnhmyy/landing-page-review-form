"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { products } from "@/lib/products";

const featuredProducts = products.slice(0, 6);

const tagColors: Record<string, string> = {
    Bestseller: "bg-accent/10 text-accent",
    Premium: "bg-primary/10 text-primary",
    Healthy: "bg-green-50 text-green-700",
    Signature: "bg-purple-50 text-purple-700",
    Daily: "bg-orange-50 text-orange-700",
    "Fan Favorite": "bg-pink-50 text-pink-700",
};

export function FeaturedProducts() {
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
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    quality={90}
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
            </div>
        </section>
    );
}
