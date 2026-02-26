"use client";

import { useState, useRef, useEffect } from "react";
import { Star, Send, Loader2, ImagePlus, X, ChevronDown, MapPin, Heart, MessageSquare, Award, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// ─── Branches ─────────────────────────────────────────────────────────────
import { branches } from "@/lib/branches";
const branchNames = branches.map(b => b.name);

// ─── Star Input ──────────────────────────────────────────────────────────────
function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
    const [hover, setHover] = useState(0);
    const labels = ["", "Sangat Tidak Puas", "Tidak Puas", "Cukup Puas", "Puas", "Sangat Puas"];

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                    <button
                        key={i}
                        type="button"
                        onMouseEnter={() => setHover(i)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => onChange(i)}
                        className="relative transition-all hover:scale-125 focus:outline-none"
                    >
                        <Star
                            size={42}
                            strokeWidth={0.7}
                            className={
                                i <= (hover || value)
                                    ? "fill-amber-500 text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                                    : "fill-slate-50 text-slate-400"
                            }
                        />
                        {i <= (hover || value) && (
                            <motion.div
                                layoutId="star-glow"
                                className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full -z-10"
                            />
                        )}
                    </button>
                ))}
            </div>
            <AnimatePresence mode="wait">
                {(hover || value) > 0 && (
                    <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-sm font-bold text-primary italic"
                    >
                        {labels[hover || value]}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function ReviewSubmitPage() {
    const [name, setName] = useState("");
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [branch, setBranch] = useState(branchNames[0]);
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState("");
    const [stats, setStats] = useState({ total: 0, average: 0 });
    const fileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch("/api/reviews")
            .then(res => res.json())
            .then(data => {
                setStats({
                    total: data.totalReviews || 0,
                    average: data.averageRating || 0
                });
            })
            .catch(() => { });
    }, []);

    const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            setError("Hanya JPG, PNG, atau WebP yang diizinkan.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError("Ukuran foto maksimal 5MB.");
            return;
        }
        setError("");
        setPhoto(file);
        setPhotoPreview(URL.createObjectURL(file));
    };

    const removePhoto = () => {
        setPhoto(null);
        setPhotoPreview(null);
        if (fileRef.current) fileRef.current.value = "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name.trim() || name.trim().length < 2) { setError("Nama minimal 2 karakter."); return; }
        if (rating === 0) { setError("Pilih rating terlebih dahulu."); return; }
        if (comment.trim().length < 10) { setError("Komentar minimal 10 karakter."); return; }

        setSubmitting(true);
        try {
            let photoUrl: string | undefined;
            if (photo) {
                const fd = new FormData();
                fd.append("photo", photo);
                const upRes = await fetch("/api/upload", { method: "POST", body: fd });
                if (upRes.ok) {
                    const upData = await upRes.json();
                    photoUrl = upData.url;
                }
            }

            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    rating,
                    comment: comment.trim(),
                    branch,
                    photoUrl,
                }),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                setError(err.error || "Gagal mengirim review.");
                return;
            }

            setDone(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err: any) {
            setError("Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setSubmitting(false);
        }
    };

    if (done) {
        return (
            <main className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-40 pb-20 px-6 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center max-w-sm"
                    >
                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 relative">
                            <Star className="w-12 h-12 text-primary fill-primary" />
                            <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-primary/20 rounded-full"
                            />
                        </div>
                        <h1 className="text-4xl font-black text-foreground mb-4 leading-tight">Terima Kasih Banyak! 🎉</h1>
                        <p className="text-foreground/60 text-lg leading-relaxed">
                            Review Kamu sangat berarti bagi kami untuk terus memberikan kualitas terbaik.
                        </p>
                        <div className="mt-10 flex flex-col gap-3">
                            <button
                                onClick={() => setDone(false)}
                                className="px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                Kirim Review Lagi
                            </button>
                            <Link
                                href="/"
                                className="px-8 py-4 bg-background text-foreground/40 font-bold hover:text-primary transition-colors"
                            >
                                Kembali ke Beranda
                            </Link>
                        </div>
                    </motion.div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Header */}
            <section className="pt-24 pb-12 px-6 bg-primary text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                <div className="max-w-7xl mx-auto relative">
                    <div className="flex items-center gap-2 text-white/40 text-xs font-semibold mb-6 tracking-wide uppercase">
                        <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-white/70">Review</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                                Suara Pelanggan
                            </h1>
                            <p className="text-white/60 text-lg max-w-xl leading-relaxed">
                                Kepuasan Anda adalah prioritas kami. Bantu kami menjadi lebih baik dengan ulasan jujur Anda.
                            </p>
                        </div>

                        {/* Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-3xl flex items-center gap-6"
                        >
                            <div className="text-center">
                                <div className="text-3xl font-black text-white">{stats.average > 0 ? stats.average.toFixed(1) : "5.0"}</div>
                                <div className="flex gap-0.5 mt-1">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} className="fill-amber-400 text-amber-400" />)}
                                </div>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div>
                                <div className="text-3xl font-black text-white">{stats.total}+</div>
                                <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1 text-center">Reviews</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                        {/* Info Column */}
                        <div className="lg:col-span-5 space-y-8">
                            <div>
                                <h2 className="text-2xl font-black text-foreground mb-4">Kenapa Review Sangat Penting?</h2>
                                <p className="text-foreground/50 leading-relaxed">
                                    Setiap ulasan, saran, ataupun kritik yang Anda berikan kami diskusikan secara internal tim untuk memastikan kualitas Roti Kebanggaan tetap yang terbaik.
                                </p>
                            </div>

                            <div className="grid gap-4">
                                {[
                                    { icon: Heart, title: "Membantu Kami Berkembang", desc: "Masukan Anda menjadi bahan evaluasi langsung bagi tim produksi & pelayanan kami.", color: "bg-red-50 text-red-500" },
                                    { icon: Award, title: "Apresiasi Tim", desc: "Rating bintang 5 adalah penyemangat luar biasa bagi para chef dan staff outlet kami.", color: "bg-amber-50 text-amber-500" },
                                    { icon: Sparkles, title: "Kualitas Terjaga", desc: "Dengan review Anda, kami belajar untuk terus menghadirkan roti terbaik setiap hari.", color: "bg-blue-50 text-blue-500" }
                                ].map((item, i) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex gap-4 p-5 bg-white rounded-2xl border border-primary/5 shadow-sm"
                                    >
                                        <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                                            <p className="text-sm text-foreground/50 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-1" /> {/* Spacer */}

                        <div className="lg:col-span-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[40px] p-8 md:p-10 shadow-2xl shadow-primary/5 border border-primary/5"
                            >
                                <div className="flex items-center gap-3 mb-10">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-black text-foreground">Tulis Review</h2>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-foreground/70 ml-1">Rating Anda</label>
                                        <StarInput value={rating} onChange={setRating} />
                                    </div>

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
                                            <label className="text-sm font-bold text-foreground/70 ml-1">Cabang</label>
                                            <div className="relative">
                                                <select
                                                    value={branch}
                                                    onChange={(e) => setBranch(e.target.value)}
                                                    className="w-full px-5 py-4 rounded-2xl bg-muted/30 border border-transparent focus:bg-white focus:border-primary appearance-none outline-none font-medium text-foreground"
                                                >
                                                    {branchNames.map(b => <option key={b} value={b}>{b}</option>)}
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/30 w-4 h-4 pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-foreground/70 ml-1 flex justify-between">
                                            <span>Komentar & Pengalaman</span>
                                            <span className="font-normal text-xs text-foreground/30">{comment.length}/600</span>
                                        </label>
                                        <textarea
                                            required
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Ceritakan pengalaman Anda, bagaimana rasa rotinya, atau pelayanan kami..."
                                            rows={5}
                                            className="w-full px-5 py-4 rounded-2xl bg-muted/30 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-foreground font-medium resize-none"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-foreground/70 ml-1">
                                            Lampirkan Foto <span className="font-normal text-foreground/40">(Opsional)</span>
                                        </label>

                                        {photoPreview ? (
                                            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-primary/10 shadow-inner bg-muted/20">
                                                <Image src={photoPreview} alt="Preview" fill className="object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={removePhoto}
                                                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
                                                >
                                                    <X className="w-4 h-4 text-red-500" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => fileRef.current?.click()}
                                                className="w-full h-32 rounded-3xl border-2 border-dashed border-primary/10 hover:border-primary/40 bg-muted/10 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 group"
                                            >
                                                <ImagePlus className="w-8 h-8 text-primary/30 group-hover:text-primary group-hover:scale-110 transition-all" />
                                                <span className="text-xs font-bold text-foreground/40 group-hover:text-primary transition-colors">Tambah Foto (Maks 5MB)</span>
                                            </button>
                                        )}
                                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                                    </div>

                                    {error && (
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-bold text-red-500 text-center bg-red-50 p-3 rounded-xl">
                                            {error}
                                        </motion.p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full h-16 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 group"
                                    >
                                        {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                        {submitting ? "Mengirim..." : "Kirim Review"}
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
