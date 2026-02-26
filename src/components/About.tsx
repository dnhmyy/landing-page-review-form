"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const milestones = [
    { year: "2018", label: "Founded as Bungsu Bakery" },
    { year: "2020", label: "Rebranded to Roti Kebanggaan" },
    { year: "2022", label: "Gading Serpong Hidden Gem Label" },
    { year: "2024", label: "Expanding across Jakarta" },
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
                        <div className="relative aspect-[3/4] rounded-[80px] overflow-hidden shadow-2xl shadow-primary/10 border-[10px] border-white ring-1 ring-primary/10">
                            <Image
                                src="/images/gambar2.png"
                                alt="Roti Kebanggaan Gading Serpong kitchen"
                                fill
                                className="object-cover"
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 600px, 800px"
                                quality={85}
                            />
                        </div>
                        {/* Accent card */}
                        <div className="absolute -right-8 top-20 bg-primary rounded-3xl p-6 text-white shadow-xl max-w-[180px]">
                            <div className="text-4xl font-black mb-1">20+</div>
                            <div className="text-white/80 text-sm font-semibold leading-tight">
                                Varian Roti Terlembut
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
                            The Legend of Secret Recipe
                        </p>
                        <h2 className="text-5xl font-black text-foreground mb-8 leading-tight">
                            Roti Jadul Terlembut <br />
                            <span className="text-primary italic">di Gading Serpong.</span>
                        </h2>
                        <p className="text-lg text-foreground/65 leading-relaxed mb-6">
                            Berawal dari dapur sederhana di Gading Serpong pada tahun 2018 dengan nama
                            <span className="font-bold text-primary px-2 py-1 rounded-md">Bungsu Bakery</span>,
                            kami bertransformasi menjadi
                            <span className="font-bold text-primary px-2 py-1 rounded-md">
                                Roti Kebanggaan Gading Serpong
                            </span>
                            — sebuah dedikasi untuk menghidupkan kembali cita rasa roti klasik berkualitas tinggi yang dibuat fresh from the oven dengan premium ingredients.
                        </p>
                        <p className="text-lg text-foreground/65 leading-relaxed mb-12">
                            Dikenal sebagai "Hidden Gem" yang selalu diramaikan antrean pelanggan setia, kami hanya menggunakan bahan segar pilihan, tanpa pengawet (no preservatives added) dan <span className="font-bold text-primary px-2 py-1 rounded-md">telah tersertifikasi 100% Halal.</span>
                            Setiap roti dipanggang fresh 3 kali sehari untuk memastikan kelembutan maksimal yang tidak akan Anda temukan di tempat lain.
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
