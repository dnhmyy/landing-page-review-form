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
    Lock,
    KeyRound,
    Loader2,
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

import { branches } from "@/lib/branches";
const branchNames = branches.map(b => b.name);

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

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    // Login state
    const [passcode, setPasscode] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState("");

    // Filters
    const [branchFilter, setBranchFilter] = useState("all");
    const [ratingFilter, setRatingFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sort, setSort] = useState("newest");

    const checkAuthStatus = async () => {
        try {
            const res = await fetch("/api/admin/login");
            const data = await res.json();
            if (data.authenticated) {
                setIsAuthorized(true);
            }
        } catch (e) {
            console.error("Auth check failed", e);
        } finally {
            setCheckingAuth(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const fetchReviews = useCallback(async () => {
        if (!isAuthorized) return;
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
            // silently fail
        } finally {
            setLoading(false);
        }
    }, [branchFilter, ratingFilter, sort, searchQuery, isAuthorized]);

    useEffect(() => {
        if (isAuthorized) {
            fetchReviews();
        }
    }, [branchFilter, ratingFilter, sort, isAuthorized, fetchReviews]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchReviews();
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginLoading(true);
        setLoginError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ passcode }),
            });

            if (res.ok) {
                setIsAuthorized(true);
            } else {
                setLoginError("Passcode salah. Silakan coba lagi.");
            }
        } catch {
            setLoginError("Terjadi kesalahan sistem.");
        } finally {
            setLoginLoading(false);
        }
    };

    if (checkingAuth) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary opacity-20" />
            </div>
        );
    }

    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-white rounded-[32px] p-10 shadow-2xl border border-primary/5 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-black text-foreground mb-2">Admin Access</h1>
                    <p className="text-foreground/45 text-sm font-medium mb-8">
                        Masukkan passcode internal untuk mengakses Dashboard Review.
                    </p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative">
                            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 w-5 h-5" />
                            <input
                                type="password"
                                placeholder="Admin Passcode..."
                                value={passcode}
                                onChange={(e) => setPasscode(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-muted border border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold tracking-widest text-lg"
                                required
                            />
                        </div>

                        {loginError && (
                            <p className="text-red-500 text-sm font-bold bg-red-50 py-2 rounded-lg border border-red-100">
                                {loginError}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loginLoading}
                            className="w-full py-4 rounded-2xl bg-primary text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                        >
                            {loginLoading ? "Memverifikasi..." : "Buka Dashboard"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

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
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 text-green-700 rounded-full text-xs font-black uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Authorized Session
                    </div>
                </div>

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
                                {branchNames.map(b => <option key={b} value={b}>{b}</option>)}
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
                        <p className="text-foreground/30 mt-2 text-sm">Coba ubah filter.</p>
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
