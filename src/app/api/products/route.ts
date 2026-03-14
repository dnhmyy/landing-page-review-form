import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { id: "asc" }
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error("[PRODUCTS_GET]", error);
        return NextResponse.json(
            { error: "Gagal memuat data produk" },
            { status: 500 }
        );
    }
}
