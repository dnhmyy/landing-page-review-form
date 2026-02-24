import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * GET /api/admin/reviews
 * Internal review list with filtering and sorting.
 */
export async function GET(req: NextRequest) {
    if (process.env.NEXT_PHASE === "phase-production-build") {
        return NextResponse.json([]);
    }

    // Auth check
    const session = req.cookies.get("rk_admin_session");
    if (session?.value !== "authorized") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const sort = req.nextUrl.searchParams.get("sort") ?? "newest";
        const branch = req.nextUrl.searchParams.get("branch");
        const rating = req.nextUrl.searchParams.get("rating");
        const query = req.nextUrl.searchParams.get("query");

        const where: Record<string, unknown> = {};

        if (branch && branch !== "all") {
            where.branch = { contains: branch, mode: "insensitive" };
        }
        if (rating && rating !== "all") {
            where.rating = parseInt(rating, 10);
        }
        if (query) {
            where.OR = [
                { name: { contains: query, mode: "insensitive" } },
                { comment: { contains: query, mode: "insensitive" } },
            ];
        }

        const orderBy: Record<string, string> =
            sort === "highest"
                ? { rating: "desc" }
                : sort === "lowest"
                    ? { rating: "asc" }
                    : { createdAt: "desc" };

        const reviews = await prisma.review.findMany({ where, orderBy });
        return NextResponse.json(reviews);
    } catch (error) {
        console.error("[ADMIN_REVIEWS_GET]", error);
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}
