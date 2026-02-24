import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const reviewSchema = z.object({
    name: z.string().min(2).max(80),
    rating: z.number().int().min(1).max(5),
    comment: z.string().min(10).max(600),
    branch: z.string().optional(),
    photoUrl: z.string().optional(),
});

/**
 * GET /api/admin/reviews
 * Internal review list with filtering and sorting.
 */
export async function GET(req: NextRequest) {
    if (process.env.NEXT_PHASE === "phase-production-build") {
        return NextResponse.json([]);
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

/**
 * POST /api/admin/reviews
 * Add a new review from the internal dashboard.
 */
export async function POST(req: NextRequest) {
    if (process.env.NEXT_PHASE === "phase-production-build") {
        return NextResponse.json({ message: "Build phase skip" });
    }

    try {
        const body = await req.json();
        const validated = reviewSchema.safeParse(body);

        if (!validated.success) {
            return NextResponse.json(
                { error: "Validation failed", issues: validated.error.issues },
                { status: 400 }
            );
        }

        const review = await prisma.review.create({
            data: {
                name: validated.data.name,
                rating: validated.data.rating,
                comment: validated.data.comment,
                branch: validated.data.branch,
                photoUrl: validated.data.photoUrl,
                isApproved: true,
            },
        });

        return NextResponse.json(review, { status: 201 });
    } catch (error) {
        console.error("[ADMIN_REVIEWS_POST]", error);
        return NextResponse.json({ error: "Failed to save review" }, { status: 500 });
    }
}
