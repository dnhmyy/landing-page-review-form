"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, Loader2, ChevronDown } from "lucide-react";

interface Review {
    id: string;
    name: string;
    rating: number;
    comment: string;
    createdAt: string;
}

interface ReviewsData {
    reviews: Review[];
    totalReviews: number;
    averageRating: number;
}

function StarDisplay({ rating, size = 18 }: { rating: number; size?: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    size={size}
                    className={
                        i <= rating
                            ? "fill-accent text-accent"
                            : "fill-muted text-muted-foreground/30"
                    }
                />
            ))}
        </div>
    );
}

function StarInput({
    value,
    onChange,
}: {
    value: number;
    onChange: (v: number) => void;
}) {
    const [hover, setHover] = useState(0);
    return (
        <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <button
                    key={i}
                    type="button"
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => onChange(i)}
                    className="transition-transform hover:scale-125 focus:outline-none"
                    aria-label={`Rate ${i} stars`}
                >
                    <Star
                        size={30}
                        className={
                            i <= (hover || value)
                                ? "fill-accent text-accent transition-colors"
                                : "fill-muted text-muted-foreground/30 transition-colors"
                        }
                    />
                </button>
            ))}
        </div>
    );
}

export function Reviews() {
    const [data, setData] = useState<ReviewsData | null>(null);
    const [sort, setSort] = useState<"latest" | "highest">("latest");
    const [loading, setLoading] = useState(true);

    // Form state
    const [name, setName] = useState("");
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitMsg, setSubmitMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const fetchReviews = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/reviews?sort=${sort}`);
            if (!res.ok) throw new Error("Failed");
            const json = await res.json();
            setData(json);
        } catch {
            // suppress — retry handled by user
        } finally {
            setLoading(false);
        }
    }, [sort]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitMsg(null);

        // Client validation
        if (!name.trim() || name.trim().length < 2) {
            setSubmitMsg({ type: "error", text: "Nama minimal 2 karakter." });
            return;
        }
        if (rating === 0) {
            setSubmitMsg({ type: "error", text: "Pilih rating terlebih dahulu." });
            return;
        }
        if (comment.trim().length < 10) {
            setSubmitMsg({ type: "error", text: "Komentar minimal 10 karakter." });
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name.trim(), rating, comment: comment.trim() }),
            });

            if (res.status === 429) {
                setSubmitMsg({ type: "error", text: "Terlalu banyak review. Silakan coba lagi nanti." });
                return;
            }
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.message || "Failed");
            }

            setSubmitMsg({ type: "success", text: "Terima kasih! Review Anda telah dikirim. 🎉" });
            setName("");
            setRating(0);
            setComment("");
            fetchReviews();
        } catch {
            setSubmitMsg({ type: "error", text: "Gagal mengirim review. Silakan coba lagi." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="reviews" className="py-28 px-6 bg-background">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-black text-sm uppercase tracking-[0.25em] mb-4"
                    >
                        Customer Stories
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl font-black text-foreground"
                    >
                        Apa Kata Mereka?
                    </motion.h2>
                </div>

                {/* Rating Summary */}
                {data && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass rounded-3xl p-8 mb-10 flex flex-col sm:flex-row items-center gap-6 border border-primary/10"
                    >
                        <div className="text-center">
                            <div className="text-7xl font-black text-primary leading-none mb-2">
                                {data.averageRating.toFixed(1)}
                            </div>
                            <StarDisplay rating={Math.round(data.averageRating)} size={22} />
                            <div className="text-foreground/45 text-sm font-semibold mt-2">
                                {data.totalReviews} reviews
                            </div>
                        </div>
                        <div className="flex-1 space-y-3 w-full sm:max-w-xs">
                            {[5, 4, 3, 2, 1].map((star) => {
                                const count = data.reviews.filter((r) => r.rating === star).length;
                                const pct = data.totalReviews > 0 ? (count / data.totalReviews) * 100 : 0;
                                return (
                                    <div key={star} className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-foreground/50 w-4">{star}</span>
                                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${pct}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, delay: (5 - star) * 0.08 }}
                                                className="h-full bg-accent rounded-full"
                                            />
                                        </div>
                                        <span className="text-xs text-foreground/40 w-4">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {/* Sort + Review List */}
                <div className="mb-8 flex items-center justify-between">
                    <h3 className="font-black text-foreground text-lg">
                        {data?.totalReviews ?? "—"} Reviews
                    </h3>
                    <div className="relative">
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as "latest" | "highest")}
                            className="appearance-none pl-4 pr-9 py-2.5 rounded-xl border border-primary/10 bg-white text-sm font-semibold text-foreground focus:outline-none focus:border-primary transition-colors"
                        >
                            <option value="latest">Terbaru</option>
                            <option value="highest">Rating Tertinggi</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none" />
                    </div>
                </div>

                <div className="space-y-5 mb-16">
                    {loading ? (
                        <div className="py-20 flex justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-primary/30" />
                        </div>
                    ) : data?.reviews.length === 0 ? (
                        <div className="py-20 text-center text-foreground/40 font-semibold">
                            Belum ada review. Jadilah yang pertama!
                        </div>
                    ) : (
                        data?.reviews.map((review, i) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }}
                                className="bg-white rounded-2xl p-6 border border-primary/10 shadow-sm hover:shadow-md hover:shadow-primary/5 transition-shadow"
                            >
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                                            {review.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-black text-foreground">{review.name}</div>
                                            <div className="text-foreground/40 text-xs font-semibold">
                                                {new Date(review.createdAt).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <StarDisplay rating={review.rating} size={16} />
                                </div>
                                <p className="text-foreground/75 leading-relaxed italic">
                                    &quot;{review.comment}&quot;
                                </p>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Submit Form */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.7 }}
                    className="bg-white rounded-[32px] p-10 border border-primary/10 shadow-sm"
                >
                    <h3 className="text-2xl font-black text-foreground mb-2">
                        Bagikan Pengalaman Anda
                    </h3>
                    <p className="text-foreground/50 text-sm mb-8">
                        Share your experience — komentar Anda sangat berarti bagi kami!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-foreground/70 mb-2">
                                Nama Anda
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Masukkan nama Anda..."
                                className="w-full px-5 py-3.5 rounded-xl bg-background border border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-foreground placeholder:text-foreground/30 font-medium"
                                maxLength={80}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-foreground/70 mb-3">
                                Rating
                            </label>
                            <StarInput value={rating} onChange={setRating} />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-foreground/70 mb-2">
                                Komentar
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Ceritakan pengalaman Anda dengan Roti Kebanggaan..."
                                rows={4}
                                className="w-full px-5 py-4 rounded-xl bg-background border border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-foreground placeholder:text-foreground/30 font-medium resize-none"
                                maxLength={600}
                            />
                            <div className="text-right text-xs text-foreground/30 mt-1">
                                {comment.length}/600
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {submitMsg && (
                                <motion.div
                                    key={submitMsg.type}
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    className={`text-sm font-semibold px-5 py-3 rounded-xl ${submitMsg.type === "success"
                                            ? "bg-green-50 text-green-700 border border-green-100"
                                            : "bg-red-50 text-red-700 border border-red-100"
                                        }`}
                                >
                                    {submitMsg.text}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex items-center gap-2 h-13 px-8 rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/15 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {submitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Send className="w-5 h-5" />
                            )}
                            {submitting ? "Mengirim..." : "Kirim Review"}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
