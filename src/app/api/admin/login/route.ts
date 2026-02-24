import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { passcode } = await req.json();
        const secret = process.env.ADMIN_SECRET || "rk-admin-dev-secret";

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
