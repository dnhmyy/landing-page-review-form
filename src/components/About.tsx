"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const milestones = [
    { year: "2010", label: "Founded in Gading Serpong" },
    { year: "2015", label: "Opened 3rd branch" },
    { year: "2019", label: "Best Artisan Bakery award" },
    { year: "2024", label: "7 branches across Jakarta" },
];

export function About() {
    return (
        <section id="about" className="py-28 px-6 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* ── Image side ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        <div className="aspect-[3/4] rounded-[80px] overflow-hidden shadow-2xl shadow-primary/10 border-[10px] border-white ring-1 ring-primary/10">
                            <Image
                                src="/images/gambar2.png"
                                alt="Roti Kebanggaan bakery kitchen"
                                fill
                                className="object-cover"
                                loading="lazy"
                                decoding="async"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        {/* Accent card */}
                        <div className="absolute -right-8 top-20 bg-primary rounded-3xl p-6 text-white shadow-xl max-w-[180px]">
                            <div className="text-4xl font-black mb-1">15+</div>
                            <div className="text-white/80 text-sm font-semibold leading-tight">
                                Years of Artisan Baking
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Content side ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="text-primary font-black text-sm uppercase tracking-[0.25em] mb-6">
                            Our Story
                        </p>
                        <h2 className="text-5xl font-black text-foreground mb-8 leading-tight">
                            Kualitas terbaik <br />
                            <span className="text-primary italic">untuk momen spesial.</span>
                        </h2>
                        <p className="text-lg text-foreground/65 leading-relaxed mb-6">
                            Roti Kebanggaan dimulai dari dapur kecil di Gading Serpong pada
                            tahun 2010. Dipimpin oleh keluarga penggemar roti yang percaya
                            bahwa roti yang baik adalah cerminan dari kehangatan dan dedikasi.
                        </p>
                        <p className="text-lg text-foreground/65 leading-relaxed mb-12">
                            We source only the finest local ingredients, combine traditional
                            techniques with modern craft, and bake fresh every morning —
                            because you deserve nothing but the best.
                        </p>

                        {/* Timeline */}
                        <div className="space-y-5">
                            {milestones.map((m, i) => (
                                <motion.div
                                    key={m.year}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                                    className="flex items-center gap-5"
                                >
                                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <span className="text-primary font-black text-sm">{m.year}</span>
                                    </div>
                                    <div className="text-foreground/70 font-semibold">{m.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
