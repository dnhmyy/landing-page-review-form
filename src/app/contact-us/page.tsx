"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Send, Loader2, MessageCircle, Mail, Instagram, Heart, Sparkles, BadgeCheck, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactUsPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("Pertanyaan Umum");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const mailtoEmail = "akhdan@bakerysolution.co.id";
            const mailtoSubject = encodeURIComponent(`Contact Form - ${subject}`);
            const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`);

            window.open(`mailto:${mailtoEmail}?subject=${mailtoSubject}&body=${mailtoBody}`, "_blank");
        } finally {
            setSubmitting(false);
        }
    };

    const contactMethods = [
        {
            icon: MessageCircle,
            title: "WhatsApp",
            value: "+62 899-8730-771",
            label: "Chat Now",
            href: "https://wa.me/628998730771",
            color: "bg-green-50 text-green-600"
        },
        {
            icon: Mail,
            title: "Email",
            value: "akhdan@bakerysolution.co.id",
            label: "Send Email",
            href: "mailto:akhdan@bakerysolution.co.id",
            color: "bg-blue-50 text-blue-600"
        },
        {
            icon: Instagram,
            title: "Instagram",
            value: "@rotikebanggaanofficial",
            label: "Send DM",
            href: "https://instagram.com/direct/new/?username=rotikebanggaanofficial",
            color: "bg-pink-50 text-pink-600",
            isVerified: true
        }
    ];

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 pb-12 px-6 bg-primary text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                <div className="max-w-7xl mx-auto relative">
                    <div className="flex items-center gap-2 text-white/40 text-xs font-semibold mb-6 tracking-wide uppercase">
                        <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-white/70">Contact Us</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                        Hubungi Kami
                    </h1>
                    <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
                        Kami menghargai setiap suara Anda. Sampaikan masukan langsung ke manajemen atau diskusikan kebutuhan pesanan spesial Anda bersama kami.
                    </p>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                        {/* Info Column */}
                        <div className="lg:col-span-5 flex flex-col">
                            <div className="space-y-8 mb-12">
                                <div>
                                    <h2 className="text-2xl font-black text-foreground mb-4">Informasi Kontak</h2>
                                    <p className="text-foreground/50 leading-relaxed">
                                        Pilih cara ternyaman bagi Anda untuk menghubungi tim kami. Kami berusaha merespon setiap pesan secepat mungkin.
                                    </p>
                                </div>

                                <div className="grid gap-4">
                                    {contactMethods.map((method, i) => (
                                        <motion.a
                                            key={method.title}
                                            href={method.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-primary/5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group no-underline hover:no-underline"
                                        >
                                            <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center shrink-0`}>
                                                <method.icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-bold text-foreground/40 uppercase tracking-wider">{method.title}</p>
                                                <div className="flex items-center gap-1.5">
                                                    <p className="font-bold text-foreground">{method.value}</p>
                                                    {method.isVerified && (
                                                        <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-xs font-black text-primary uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                                {method.label}
                                            </span>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-auto p-8 bg-primary/5 rounded-[32px] border border-primary/10">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                                        <Heart className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground">Hubungi Manajemen</h4>
                                        <p className="text-sm text-foreground/60 leading-relaxed mt-1">
                                            Saluran khusus untuk menyampaikan pesan langsung kepada tim manajemen kami terkait apresiasi, ataupun masukan mendalam.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-8 flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-accent text-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/5">
                                        <Sparkles className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground">Pesanan Spesial</h4>
                                        <p className="text-sm text-foreground/60 leading-relaxed mt-1">
                                            Butuh pesanan untuk acara spesial atau dalam jumlah besar? Jangan ragu untuk mendiskusikan kebutuhan Anda dengan kami.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[32px] p-8 md:p-10 shadow-xl shadow-primary/5 border border-primary/10"
                            >
                                <h2 className="text-2xl font-black text-foreground mb-8 text-center lg:text-left">Kirim Pesan</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-foreground/70 ml-1">Nama Lengkap</label>
                                            <input
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Masukkan Nama Anda"
                                                className="w-full px-5 py-4 rounded-2xl bg-muted/30 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-foreground font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-foreground/70 ml-1">Nomor WhatsApp</label>
                                            <input
                                                type="tel"
                                                required
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="089812345678"
                                                className="w-full px-5 py-4 rounded-2xl bg-muted/30 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-foreground font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-foreground/70 ml-1">Alamat Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="alamat@email.com"
                                            className="w-full px-5 py-4 rounded-2xl bg-muted/30 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-foreground font-medium"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-foreground/70 ml-1">Subjek Pesan</label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                                className="w-full px-5 py-4 rounded-2xl bg-muted/30 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-foreground font-medium appearance-none select-custom"
                                            >
                                                <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                                                <option value="Pesanan Besar / Event">Pesanan Besar / Event</option>
                                            </select>
                                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-foreground/30 w-5 h-5 pointer-events-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-foreground/70 ml-1">Pesan Anda</label>
                                        <textarea
                                            required
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Tuliskan detail pertanyaan atau masukan Anda di sini"
                                            rows={5}
                                            className="w-full px-5 py-4 rounded-2xl bg-muted/30 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-foreground font-medium resize-none shadow-inner"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full h-16 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 group"
                                    >
                                        {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                        Kirim Sekarang
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
