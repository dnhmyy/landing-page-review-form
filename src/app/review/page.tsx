"use client";

import { useState, useRef } from "react";
import { Star, Send, Loader2, ImagePlus, X, ChevronDown, MapPin } from "lucide-react";
import Image from "next/image";

// ─── Branches (Gading Serpong removed) ──────────────────────────────────────
const branches = [
    "Roti Kebanggaan Sorrento",
    "Roti Kebanggaan Beryl",
    "Roti Kebanggaan Downtown",
    "Roti Kebanggaan Greenlake",
    "Roti Kebanggaan Kelapa Gading",
    "Roti Kebanggaan Grand Indonesia",
];

// ─── Star Input ──────────────────────────────────────────────────────────────
function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
    const [hover, setHover] = useState(0);
    const labels = ["", "Sangat Buruk", "Buruk", "Cukup", "Bagus", "Sangat Bagus!"];
    return (
        <div>
            <div className="flex gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                    <button
                        key={i}
                        type="button"
                        onMouseEnter={() => setHover(i)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => onChange(i)}
                        className="transition-transform hover:scale-125 focus:outline-none"
                        aria-label={`${i} bintang`}
                    >
                        <Star
                            size={36}
                            className={
                                i <= (hover || value)
                                    ? "fill-yellow-400 text-yellow-400 transition-colors"
                                    : "fill-gray-100 text-gray-200 transition-colors"
                            }
                        />
                    </button>
                ))}
            </div>
            {(hover || value) > 0 && (
                <p className="text-sm font-semibold text-primary/70">{labels[hover || value]}</p>
            )}
        </div>
    );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function ReviewSubmitPage() {
    const [name, setName] = useState("");
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [branch, setBranch] = useState(branches[0]);
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);

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
            // 1. Upload photo if present
            let photoUrl: string | undefined;
            if (photo) {
                const fd = new FormData();
                fd.append("photo", photo);
                const upRes = await fetch("/api/upload", { method: "POST", body: fd });
                if (!upRes.ok) {
                    const err = await upRes.json();
                    setError(err.error || "Gagal mengupload foto.");
                    setSubmitting(false);
                    return;
                }
                const upData = await upRes.json();
                photoUrl = upData.url;
            }

            // 2. Submit review
            const res = await fetch("/api/admin/reviews", {
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
                const err = await res.json();
                setError(err.error || "Gagal mengirim review.");
                return;
            }

            setDone(true);
        } catch {
            setError("Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setSubmitting(false);
        }
    };

    // ── Thank you screen ──
    if (done) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="text-center max-w-sm">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <Star className="w-10 h-10 text-primary fill-primary" />
                    </div>
                    <h1 className="text-3xl font-black text-foreground mb-3">Terima Kasih! 🎉</h1>
                    <p className="text-foreground/60 leading-relaxed">
                        Review kamu sudah kami terima. Kami sangat menghargai pendapat dan waktu Anda.
                    </p>
                    <p className="text-primary font-bold mt-6 text-sm">— Roti Kebanggaan Team</p>
                </div>
            </main>
        );
    }

    // ── Form ──
    return (
        <main className="min-h-screen bg-background py-16 px-4">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-5">
                        <span className="text-white font-black text-2xl">R</span>
                    </div>
                    <h1 className="text-3xl font-black text-foreground tracking-tight">Bagikan Pengalaman Anda</h1>
                    <p className="text-foreground/50 mt-2 text-sm leading-relaxed">
                        Komentar Anda sangat berarti bagi kami.<br />
                        Terima kasih telah memilih Roti Kebanggaan!
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-[28px] p-8 shadow-sm border border-primary/8">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-bold text-foreground/70 mb-1.5">Nama Anda</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nama lengkap Anda..."
                                maxLength={80}
                                className="w-full px-4 py-3.5 rounded-xl bg-background border border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-foreground placeholder:text-foreground/25 font-medium"
                            />
                        </div>

                        {/* Branch */}
                        <div>
                            <label className="block text-sm font-bold text-foreground/70 mb-1.5">Cabang yang Dikunjungi</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 w-4 h-4" />
                                <select
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                    className="w-full pl-11 pr-8 py-3.5 rounded-xl bg-background border border-primary/10 focus:border-primary appearance-none outline-none font-medium text-foreground"
                                >
                                    {branches.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground/30 w-4 h-4 pointer-events-none" />
                            </div>
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block text-sm font-bold text-foreground/70 mb-2">Rating</label>
                            <StarInput value={rating} onChange={setRating} />
                        </div>

                        {/* Comment */}
                        <div>
                            <label className="block text-sm font-bold text-foreground/70 mb-1.5">Komentar</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Ceritakan pengalaman Anda bersama Roti Kebanggaan..."
                                rows={4}
                                maxLength={600}
                                className="w-full px-4 py-3.5 rounded-xl bg-background border border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-foreground placeholder:text-foreground/25 font-medium resize-none"
                            />
                            <div className="text-right text-xs text-foreground/25 mt-1">{comment.length}/600</div>
                        </div>

                        {/* Photo Upload */}
                        <div>
                            <label className="block text-sm font-bold text-foreground/70 mb-2">
                                Foto <span className="font-normal text-foreground/40">(opsional, maks. 5MB)</span>
                            </label>

                            {photoPreview ? (
                                <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-primary/10">
                                    <Image src={photoPreview} alt="Preview" fill className="object-cover" />
                                    <button
                                        type="button"
                                        onClick={removePhoto}
                                        className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur rounded-full shadow-md hover:bg-white transition-colors"
                                    >
                                        <X className="w-4 h-4 text-foreground" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => fileRef.current?.click()}
                                    className="w-full h-36 rounded-2xl border-2 border-dashed border-primary/15 hover:border-primary/40 bg-background hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 group"
                                >
                                    <ImagePlus className="w-8 h-8 text-primary/30 group-hover:text-primary/60 transition-colors" />
                                    <span className="text-sm font-semibold text-foreground/35 group-hover:text-foreground/60 transition-colors">
                                        Klik untuk upload foto
                                    </span>
                                    <span className="text-xs text-foreground/25">JPG, PNG, WebP</span>
                                </button>
                            )}
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                className="hidden"
                                onChange={handlePhoto}
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-sm font-semibold text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
                                {error}
                            </p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full h-14 rounded-xl bg-primary text-white font-bold text-base shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            {submitting ? "Mengirim..." : "Kirim Review"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-foreground/25 text-xs mt-6">
                    © Roti Kebanggaan — Review Form
                </p>
            </div>
        </main>
    );
}
