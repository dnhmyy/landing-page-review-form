import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { products } from "@/lib/products";

export async function POST(req: NextRequest) {
    try {
        const secret = req.headers.get("x-admin-secret");
        if (secret !== process.env.ADMIN_SECRET) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        console.log("Starting product migration...");

        for (const p of products) {
            await prisma.product.upsert({
                where: { id: p.id },
                update: {
                    name: p.name,
                    category: p.category,
                    desc: p.desc,
                    price: p.price,
                    image: p.image,
                    tag: p.tag || null,
                },
                create: {
                    id: p.id,
                    name: p.name,
                    category: p.category,
                    desc: p.desc,
                    price: p.price,
                    image: p.image,
                    tag: p.tag || null,
                },
            });
        }

        return NextResponse.json({ success: true, count: products.length });
    } catch (error: any) {
        console.error("[MIGRATE_PRODUCTS]", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
