import { NextResponse } from "next/server";
import { products } from "@/lib/products";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
    try {
        return NextResponse.json(products);
    } catch (error) {
        console.error("[PRODUCTS_GET]", error);
        return NextResponse.json(
            { error: "Gagal memuat data produk" },
            { status: 500 }
        );
    }
}
