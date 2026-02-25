"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Send, Loader2 } from "lucide-react";

export default function ContactUsPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const mailtoEmail = "contact@rotikebanggaan.com";
            const mailtoSubject = encodeURIComponent(`Contact Form - ${subject}`);
            const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`);

            window.open(`mailto:${mailtoEmail}?subject=${mailtoSubject}&body=${mailtoBody}`, "_blank");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-6 bg-primary text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                <div className="max-w-7xl mx-auto relative">
                    <div className="flex items-center gap-2 text-white/40 text-xs font-semibold mb-6 tracking-wide uppercase">
                        <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-white/70">Contact Us</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <h1 className="text-4xl font-black tracking-tight mb-3">
                                Contact Us
                            </h1>
                            <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
                                Get in touch with us
                            </p>
                            <div className="mt-6 w-16 h-1 rounded-full bg-accent/60" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 px-4">
                <div className="max-w-lg flex flex-col mx-auto">
                    <div className="bg-white rounded-[28px] p-8 shadow-sm border border-primary/8">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-bold text-foreground/70 mb-1.5">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nama lengkap Anda..."
                                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-foreground placeholder:text-foreground/25 font-medium"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-bold text-foreground/70 mb-1.5">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="alamat@email.com"
                                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-foreground placeholder:text-foreground/25 font-medium"
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-bold text-foreground/70 mb-1.5">Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="081234567890"
                                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-foreground placeholder:text-foreground/25 font-medium"
                                />
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block text-sm font-bold text-foreground/70 mb-1.5">Subject</label>
                                <input
                                    type="text"
                                    required
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Tujuan pesan Anda..."
                                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-foreground placeholder:text-foreground/25 font-medium"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-bold text-foreground/70 mb-1.5">Message</label>
                                <textarea
                                    required
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Tuliskan pesan Anda di sini..."
                                    rows={4}
                                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-foreground placeholder:text-foreground/25 font-medium resize-none"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full h-14 rounded-xl bg-primary text-white font-bold text-base shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                Kirim Pesan
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
