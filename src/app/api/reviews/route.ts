import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const reviewSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(80),
    rating: z.number().int().min(1).max(5),
    comment: z.string().min(10, "Comment must be at least 10 characters").max(600),
    branch: z.string().optional(),
    photoUrl: z.string().optional(),
});

// In-memory rate limiting: 3 reviews per IP per hour
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimit.get(ip);

    if (!entry || now > entry.resetAt) {
        rateLimit.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
        return true;
    }

    if (entry.count >= 3) return false;

    entry.count++;
    return true;
}

export async function GET(req: NextRequest) {
    try {
        const sort = req.nextUrl.searchParams.get("sort");
        const orderBy =
            sort === "highest"
                ? { rating: "desc" as const }
                : { createdAt: "desc" as const };

        const reviews = await prisma.review.findMany({
            where: { isApproved: true },
            orderBy,
            select: {
                id: true,
                name: true,
                rating: true,
                comment: true,
                createdAt: true,
            },
        });

        const averageRating =
            reviews.length > 0
                ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
                : 0;

        return NextResponse.json({
            reviews,
            totalReviews: reviews.length,
            averageRating: parseFloat(averageRating.toFixed(1)),
        });
    } catch (error) {
        console.error("[REVIEWS_GET]", error);
        return NextResponse.json({ error: "Failed to load reviews" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const ip = (req.headers.get("x-forwarded-for") ?? "anonymous").split(",")[0].trim();

        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "Terlalu banyak review. Coba lagi dalam 1 jam." },
                { status: 429 }
            );
        }

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
    } catch (error: any) {
        console.error("[REVIEWS_POST]", error);
        return NextResponse.json({
            error: "Failed to submit review",
            details: error.message
        }, { status: 500 });
    }
}
