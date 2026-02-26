"use client";

import { useState, useEffect, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { products } from "@/lib/products";
import Image from "next/image";
import { Check, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { branches } from "@/lib/branches";

function OrderForm() {
    const searchParams = useSearchParams();
    const [selectedItems, setSelectedItems] = useState<Record<number, number>>({});
    const [selectedBranch, setSelectedBranch] = useState<string>("");
    const [customerName, setCustomerName] = useState<string>("");

    useEffect(() => {
        const itemParam = searchParams.get("item");
        if (itemParam) {
            const itemId = parseInt(itemParam);
            if (!isNaN(itemId)) {
                setSelectedItems({ [itemId]: 1 });
            }
        }
    }, [searchParams]);

    const handleToggleItem = (id: number) => {
        setSelectedItems(prev => {
            const next = { ...prev };
            if (next[id]) {
                delete next[id];
            } else {
                next[id] = 1;
            }
            return next;
        });
    };

    const handleUpdateQty = (id: number, delta: number) => {
        setSelectedItems(prev => {
            const current = prev[id] || 0;
            const nextQty = current + delta;
            const next = { ...prev };
            if (nextQty <= 0) {
                delete next[id];
            } else {
                next[id] = nextQty;
            }
            return next;
        });
    };

    const parsePrice = (priceStr: string) => {
        const digits = priceStr.replace(/\D/g, "");
        return parseInt(digits) || 0;
    };

    const calculateTotals = () => {
        let totalPrice = 0;
        let totalQty = 0;
        Object.entries(selectedItems).forEach(([idStr, qty]) => {
            const product = products.find(p => p.id === parseInt(idStr));
            if (product) {
                totalPrice += parsePrice(product.price) * qty;
                totalQty += qty;
            }
        });
        return { totalPrice, totalQty };
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
    };

    const handleOrder = () => {
        if (!customerName.trim()) {
            alert("Silakan masukkan nama Anda terlebih dahulu.");
            return;
        }
        if (Object.keys(selectedItems).length === 0) {
            alert("Pilih minimal 1 roti untuk dipesan.");
            return;
        }
        if (!selectedBranch) {
            alert("Silakan pilih cabang pengambilan.");
            return;
        }

        const selectedProductText = Object.entries(selectedItems)
            .map(([idStr, qty]) => {
                const product = products.find(p => p.id === parseInt(idStr));
                if (product) {
                    return `- ${product.name} (x${qty}) = ${formatCurrency(parsePrice(product.price) * qty)}`;
                }
                return null;
            })
            .filter(Boolean);

        const selectedBranchData = branches.find(b => b.name === selectedBranch);
        const adminWa = selectedBranchData ? selectedBranchData.wa : "6281234567890";
        const { totalPrice, totalQty } = calculateTotals();
        const totalAmountStr = formatCurrency(totalPrice);

        const textLines = [
            `Halo Admin, saya *${customerName.trim()}* mau order roti berikut:`,
            "",
            ...selectedProductText,
            "",
            `Total Roti: *${totalQty} pcs*`,
            `Total Belanja: *${totalAmountStr}*`,
            "",
            `Saya ingin ambil di Cabang: *${selectedBranch}*`,
            "",
            "Mohon info ketersediaannya ya. Terima kasih."
        ];

        const text = encodeURIComponent(textLines.join("\n"));
        const waUrl = `https://wa.me/${adminWa}?text=${text}`;
        window.open(waUrl, "_blank");
    };

    const { totalPrice, totalQty } = calculateTotals();

    return (
        <div className="pt-24 pb-12 px-6 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-black mb-8 text-foreground">Formulir Pesanan</h1>

            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">1. Nama Anda:</h2>
                <input
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    className="w-full p-4 border border-muted rounded-xl bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium text-lg placeholder:font-normal"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                />
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-bold mb-4">2. Pilih Roti:</h2>
                <div className="space-y-4 max-h-[50vh] overflow-y-auto p-4 border border-muted rounded-xl bg-white shadow-inner">
                    {products.map((product) => {
                        const isSelected = !!selectedItems[product.id];
                        const qty = selectedItems[product.id] || 0;
                        return (
                            <div key={product.id} className={`flex items-center gap-4 p-3 rounded-lg transition-colors border ${isSelected ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/30'} bg-white`}>
                                <label className="flex items-center gap-4 flex-1 cursor-pointer">
                                    <div className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 ${isSelected ? 'bg-primary border-primary text-white' : 'border-muted-foreground/30'}`}>
                                        {isSelected && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <div className="relative w-12 h-12 rounded overflow-hidden shrink-0">
                                        <Image src={product.image} alt={product.name} fill className="object-cover" quality={90} sizes="80px" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-foreground line-clamp-1">{product.name}</div>
                                        <div className="text-sm text-primary font-semibold">{product.price}</div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={isSelected}
                                        onChange={() => handleToggleItem(product.id)}
                                    />
                                </label>

                                {isSelected && (
                                    <div className="flex items-center gap-3 bg-white border border-muted rounded-lg px-2 py-1 shrink-0">
                                        <button onClick={() => handleUpdateQty(product.id, -1)} className="w-6 h-6 flex items-center justify-center text-primary font-bold hover:bg-muted rounded">-</button>
                                        <span className="w-4 text-center font-bold text-sm">{qty}</span>
                                        <button onClick={() => handleUpdateQty(product.id, 1)} className="w-6 h-6 flex items-center justify-center text-primary font-bold hover:bg-muted rounded">+</button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                {totalQty > 0 && (
                    <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="font-bold text-foreground/70">Total Sementara:</span>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-right sm:text-left">
                            <span className="font-semibold text-foreground/80">{totalQty} roti</span>
                            <span className="text-xl font-black text-primary">{formatCurrency(totalPrice)}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-bold mb-4">3. Pilih Cabang Pengambilan:</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {branches.map(branch => (
                        <label key={branch.name} className={`flex items-center justify-center text-center p-4 rounded-xl border cursor-pointer font-bold transition-all text-sm md:text-base ${selectedBranch === branch.name ? 'border-primary bg-primary/10 text-primary scale-[1.02] shadow-sm' : 'border-muted hover:border-primary/30 text-foreground/70 bg-white'}`}>
                            <input
                                type="radio"
                                name="branch"
                                className="hidden"
                                checked={selectedBranch === branch.name}
                                onChange={() => setSelectedBranch(branch.name)}
                            />
                            {branch.name}
                        </label>
                    ))}
                </div>
            </div>

            <button
                onClick={handleOrder}
                className="w-full py-4 bg-primary text-white text-xl font-black rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]"
            >
                Kirim Pesanan (WhatsApp) <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    );
}

export default function OrderPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
                <OrderForm />
            </Suspense>
            <Footer />
        </main>
    );
}
