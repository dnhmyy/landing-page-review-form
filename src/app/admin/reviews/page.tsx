"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Star,
    Search,
    MapPin,
    RefreshCw,
    ArrowUpDown,
    CheckCircle2,
    AlertCircle,
    ChevronDown,
    LayoutDashboard,
    PlusCircle,
    Send,
    Loader2,
    X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────────────────
interface Review {
    id: string;
    name: string;
    rating: number;
    comment: string;
    branch?: string;
    photoUrl?: string;
    createdAt: string;
}

// ─── Data ───────────────────────────────────────────────────────────────────
const branches = [
    "Roti Kebanggaan Sorrento",
    "Roti Kebanggaan Beryl",
    "Roti Kebanggaan Downtown",
    "Roti Kebanggaan Greenlake",
    "Roti Kebanggaan Kelapa Gading",
    "Roti Kebanggaan Grand Indonesia",
];

// ─── Star Components ────────────────────────────────────────────────────────
function StarDisplay({ rating }: { rating: number }) {
    return (
        <div className="flex gap-1 bg-primary/5 p-2 rounded-xl">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={20}
                    className={cn(i < rating ? "fill-accent text-accent" : "text-primary/10")}
                />
            ))}
        </div>
    );
}

function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
    const [hover, setHover] = useState(0);
    return (
        <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
                <button
                    key={i}
                    type="button"
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => onChange(i)}
                    className="transition-transform hover:scale-125 focus:outline-none"
                >
                    <Star
                        size={32}
                        className={cn(
                            i <= (hover || value)
                                ? "fill-accent text-accent"
                                : "fill-muted text-muted-foreground/30",
                            "transition-colors"
                        )}
                    />
                </button>
            ))}
        </div>
    );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Filters
    const [branchFilter, setBranchFilter] = useState("all");
    const [ratingFilter, setRatingFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sort, setSort] = useState("newest");

    // Form state
    const [form, setForm] = useState({ name: "", rating: 0, comment: "", branch: branches[0] });
    const [submitting, setSubmitting] = useState(false);
    const [submitMsg, setSubmitMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const fetchReviews = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                branch: branchFilter,
                rating: ratingFilter,
                sort,
                query: searchQuery,
            });
            const res = await fetch(`/api/admin/reviews?${params}`);
            const data = await res.json();
            setReviews(Array.isArray(data) ? data : []);
        } catch {
            // silently fail — error logged in API
        } finally {
            setLoading(false);
        }
    }, [branchFilter, ratingFilter, sort, searchQuery]);

    useEffect(() => {
        fetchReviews();
    }, [branchFilter, ratingFilter, sort]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchReviews();
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitMsg(null);

        if (!form.name.trim() || form.name.trim().length < 2) {
            setSubmitMsg({ type: "error", text: "Nama minimal 2 karakter." });
            return;
        }
        if (form.rating === 0) {
            setSubmitMsg({ type: "error", text: "Pilih rating terlebih dahulu." });
            return;
        }
        if (form.comment.trim().length < 10) {
            setSubmitMsg({ type: "error", text: "Komentar minimal 10 karakter." });
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch("/api/admin/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name.trim(),
                    rating: form.rating,
                    comment: form.comment.trim(),
                    branch: form.branch,
                }),
            });

            if (!res.ok) throw new Error("Failed");

            setSubmitMsg({ type: "success", text: "Review berhasil ditambahkan! ✓" });
            setForm({ name: "", rating: 0, comment: "", branch: branches[0] });
            setTimeout(() => {
                setShowForm(false);
                setSubmitMsg(null);
                fetchReviews();
            }, 1500);
        } catch {
            setSubmitMsg({ type: "error", text: "Gagal menyimpan review. Silakan coba lagi." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-6xl mx-auto">

                {/* ── Header ── */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <LayoutDashboard className="text-primary w-7 h-7" />
                            <h1 className="text-3xl font-black tracking-tight">Review Dashboard</h1>
                        </div>
                        <p className="text-foreground/45 text-sm font-medium">
                            Internal — Roti Kebanggaan Admin
                        </p>
                    </div>
                    <button
                        onClick={() => { setShowForm(true); setSubmitMsg(null); }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/15 hover:bg-primary/90 hover:scale-[1.02] transition-all"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Tambah Review
                    </button>
                </div>

                {/* ── Add Review Modal ── */}
                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                        <div className="bg-white rounded-[28px] p-8 w-full max-w-lg shadow-2xl border border-primary/10">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-black text-foreground">Tambah Review Internal</h2>
                                <button
                                    onClick={() => { setShowForm(false); setSubmitMsg(null); }}
                                    className="p-2 rounded-xl hover:bg-muted transition-colors"
                                >
                                    <X className="w-5 h-5 text-foreground/50" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmitReview} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-foreground/70 mb-1.5">Nama Pelanggan</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                                        placeholder="Nama pelanggan..."
                                        maxLength={80}
                                        className="w-full px-4 py-3 rounded-xl bg-background border border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-foreground placeholder:text-foreground/30 font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-foreground/70 mb-2">Cabang</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/30 w-4 h-4" />
                                        <select
                                            value={form.branch}
                                            onChange={(e) => setForm(f => ({ ...f, branch: e.target.value }))}
                                            className="w-full pl-10 pr-8 py-3 rounded-xl bg-background border border-primary/10 focus:border-primary appearance-none outline-none font-medium text-foreground"
                                        >
                                            {branches.map(b => <option key={b} value={b}>{b}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 w-4 h-4 pointer-events-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-foreground/70 mb-2">Rating</label>
                                    <StarInput value={form.rating} onChange={(v) => setForm(f => ({ ...f, rating: v }))} />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-foreground/70 mb-1.5">Komentar</label>
                                    <textarea
                                        value={form.comment}
                                        onChange={(e) => setForm(f => ({ ...f, comment: e.target.value }))}
                                        placeholder="Isi komentar pelanggan..."
                                        rows={4}
                                        maxLength={600}
                                        className="w-full px-4 py-3 rounded-xl bg-background border border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-foreground placeholder:text-foreground/30 font-medium resize-none"
                                    />
                                    <div className="text-right text-xs text-foreground/30 mt-1">{form.comment.length}/600</div>
                                </div>

                                {submitMsg && (
                                    <div className={cn(
                                        "text-sm font-semibold px-4 py-3 rounded-xl",
                                        submitMsg.type === "success"
                                            ? "bg-green-50 text-green-700 border border-green-100"
                                            : "bg-red-50 text-red-700 border border-red-100"
                                    )}>
                                        {submitMsg.text}
                                    </div>
                                )}

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => { setShowForm(false); setSubmitMsg(null); }}
                                        className="flex-1 py-3 rounded-xl border-2 border-primary/10 text-foreground/60 font-bold text-sm hover:border-primary/30 transition-all"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-md shadow-primary/15 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                        {submitting ? "Menyimpan..." : "Simpan Review"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* ── Filters ── */}
                <div className="glass rounded-2xl p-6 mb-8 border border-primary/5">
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="relative md:col-span-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Cari nama atau komentar..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-primary/10 focus:border-primary outline-none transition-all shadow-sm text-sm"
                            />
                        </div>

                        {/* Branch */}
                        <div className="relative">
                            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/30 w-4 h-4" />
                            <select
                                value={branchFilter}
                                onChange={(e) => setBranchFilter(e.target.value)}
                                className="w-full pl-10 pr-8 py-3 rounded-xl bg-white border border-primary/10 focus:border-primary appearance-none outline-none shadow-sm font-medium text-sm"
                            >
                                <option value="all">Semua Cabang</option>
                                {branches.map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 w-4 h-4 pointer-events-none" />
                        </div>

                        {/* Rating */}
                        <div className="relative">
                            <Star className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/30 w-4 h-4" />
                            <select
                                value={ratingFilter}
                                onChange={(e) => setRatingFilter(e.target.value)}
                                className="w-full pl-10 pr-8 py-3 rounded-xl bg-white border border-primary/10 focus:border-primary appearance-none outline-none shadow-sm font-medium text-sm"
                            >
                                <option value="all">Semua Rating</option>
                                {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Bintang</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 w-4 h-4 pointer-events-none" />
                        </div>

                        {/* Sort */}
                        <div className="relative">
                            <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/30 w-4 h-4" />
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="w-full pl-10 pr-8 py-3 rounded-xl bg-white border border-primary/10 focus:border-primary appearance-none outline-none shadow-sm font-medium text-sm"
                            >
                                <option value="newest">Terbaru</option>
                                <option value="highest">Rating Tertinggi</option>
                                <option value="lowest">Rating Terendah</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 w-4 h-4 pointer-events-none" />
                        </div>
                    </form>
                </div>

                {/* ── Review Count ── */}
                <div className="flex items-center justify-between mb-5">
                    <p className="text-sm font-bold text-foreground/40">
                        {loading ? "Memuat..." : `${reviews.length} review ditemukan`}
                    </p>
                    <button
                        onClick={fetchReviews}
                        className="text-xs font-bold text-primary/60 hover:text-primary flex items-center gap-1.5 transition-colors"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Refresh
                    </button>
                </div>

                {/* ── Review List ── */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <RefreshCw className="animate-spin text-primary w-10 h-10 opacity-20 mb-4" />
                        <p className="text-foreground/25 font-bold text-sm uppercase tracking-widest">Memuat data...</p>
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="glass rounded-3xl py-32 text-center border border-primary/5">
                        <AlertCircle className="w-16 h-16 text-primary/10 mx-auto mb-4" />
                        <h3 className="text-xl font-black text-foreground/50">Tidak ada review</h3>
                        <p className="text-foreground/30 mt-2 text-sm">Coba ubah filter atau tambahkan review baru.</p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="glass rounded-2xl p-6 border border-primary/5 hover:border-primary/15 hover:shadow-lg hover:shadow-primary/5 transition-all group"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                                            {review.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-lg text-foreground tracking-tight">{review.name}</h4>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-foreground/40 text-xs font-semibold mt-0.5">
                                                {review.branch && (
                                                    <span className="flex items-center gap-1">
                                                        <MapPin size={12} />
                                                        {review.branch}
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-1">
                                                    <CheckCircle2 size={12} />
                                                    {new Date(review.createdAt).toLocaleDateString("id-ID", { dateStyle: "long" })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <StarDisplay rating={review.rating} />
                                </div>
                                <div className="pl-16 space-y-3">
                                    <p className="text-foreground/75 leading-relaxed italic">
                                        &quot;{review.comment}&quot;
                                    </p>
                                    {review.photoUrl && (
                                        <a href={review.photoUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
                                            <img
                                                src={review.photoUrl}
                                                alt="Foto review"
                                                className="w-28 h-28 rounded-xl object-cover border border-primary/10 hover:scale-105 transition-transform cursor-zoom-in"
                                            />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
