import { NextRequest, NextResponse } from "next/server";

// Brute-force protection: max 5 attempts per IP per 15 minutes
const loginRateLimit = new Map<string, { count: number; resetAt: number }>();

function checkLoginRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = loginRateLimit.get(ip);

    if (!entry || now > entry.resetAt) {
        loginRateLimit.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
        return true;
    }

    if (entry.count >= 5) return false;

    entry.count++;
    return true;
}

export async function POST(req: NextRequest) {
    try {
        const ip = (req.headers.get("x-forwarded-for") ?? "anonymous").split(",")[0].trim();

        if (!checkLoginRateLimit(ip)) {
            return NextResponse.json(
                { error: "Terlalu banyak percobaan login. Coba lagi dalam 15 menit." },
                { status: 429 }
            );
        }

        const secret = process.env.ADMIN_SECRET;
        if (!secret) {
            console.error("[ADMIN_LOGIN] ADMIN_SECRET is not configured");
            return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
        }

        const { passcode } = await req.json();

        if (passcode === secret) {
            const response = NextResponse.json({ success: true });

            // Set session cookie
            response.cookies.set("rk_admin_session", "authorized", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 24 hours
                path: "/",
            });

            return response;
        }

        return NextResponse.json({ error: "Invalid passcode" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const session = req.cookies.get("rk_admin_session");
    if (session?.value === "authorized") {
        return NextResponse.json({ authenticated: true });
    }
    return NextResponse.json({ authenticated: false });
}
