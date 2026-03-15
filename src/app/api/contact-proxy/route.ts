import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        // Forward the request to Formspree from the server
        const response = await fetch("https://formspree.io/f/mlgpwjqd", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok) {
            return NextResponse.json(data);
        } else {
            return NextResponse.json(data, { status: response.status });
        }
    } catch (error) {
        console.error("[CONTACT_PROXY_ERROR]", error);
        return NextResponse.json(
            { error: "Terjadi kesalahan koneksi ke server pengirim pesan." },
            { status: 500 }
        );
    }
}
