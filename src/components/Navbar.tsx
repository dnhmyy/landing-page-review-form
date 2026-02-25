"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Menu", href: "/menu" },
    { label: "Location", href: "/location" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact-us" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const isActive = (href: string) => {
        if (href.startsWith("#")) return pathname === "/";
        return pathname === href;
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white backdrop-blur-lg ${scrolled
                ? "shadow-md shadow-primary/[0.06] border-b border-primary/5"
                : "border-b border-transparent"
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-12 h-12 relative group-hover:scale-105 transition-transform">
                        <Image
                            src="/images/logo.png"
                            alt="Logo Roti Kebanggaan"
                            fill
                            className="object-contain"
                            sizes="48px"
                            decoding="async"
                        />
                    </div>
                    <span className="font-black text-xl text-primary tracking-tight">
                        Roti Kebanggaan
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative text-sm font-semibold transition-colors py-1 ${isActive(link.href)
                                ? "text-primary"
                                : "text-foreground/70 hover:text-primary"
                                }`}
                        >
                            {link.label}
                            {isActive(link.href) && (
                                <motion.span
                                    layoutId="nav-underline"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* CTA Desktop */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/review"
                        className="text-sm font-bold px-6 py-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/15 transition-all hover:scale-[1.02]"
                    >
                        Customer Reviews
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`md:hidden p-2.5 rounded-xl transition-all duration-200 ${mobileOpen
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-primary hover:bg-primary/15"
                        }`}
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {mobileOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                <X className="w-6 h-6" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                <Menu className="w-6 h-6" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden bg-white/95 backdrop-blur-lg border-b border-primary/10 overflow-hidden"
                    >
                        <div className="px-6 py-6 flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-base font-semibold py-3 px-4 rounded-xl transition-all ${isActive(link.href)
                                        ? "text-primary bg-primary/5 font-bold"
                                        : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                                        }`}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/review"
                                className="mt-3 text-center font-bold px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                                onClick={() => setMobileOpen(false)}
                            >
                                Customer Reviews
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
