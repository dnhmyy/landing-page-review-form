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
                            Dipanggang segar setiap pagi — bahan premium, teknik tradisional,
                            cita rasa tak tergantikan.
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
                <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
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
                            className="group bg-white rounded-[16px] md:rounded-[32px] overflow-hidden border border-primary/5 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full"
                        >
                            <div className="relative h-24 md:h-64 overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-2 right-2 md:top-6 md:right-6">
                                    <span className="bg-white/90 backdrop-blur-md text-primary font-black text-[7px] md:text-[10px] uppercase tracking-widest px-1.5 py-0.5 md:px-4 md:py-2 rounded-full shadow-sm">
                                        {product.tag}
                                    </span>
                                </div>
                            </div>
                            <div className="p-2 md:p-8 flex flex-col h-full">
                                <h3 className="text-[10px] md:text-2xl font-black text-foreground mb-0.5 md:mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                    {product.name}
                                </h3>
                                <p className="hidden md:block text-foreground/50 text-sm leading-relaxed mb-6 italic">
                                    {product.desc}
                                </p>
                                <div className="flex items-center justify-between mt-auto pt-1.5 md:pt-6 border-t border-muted">
                                    <span className="text-primary font-black text-[9px] md:text-2xl">
                                        {product.price}
                                    </span>
                                    <button className="hidden sm:flex items-center gap-2 text-sm font-bold text-foreground/40 group-hover:text-primary transition-colors">
                                        Order <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
