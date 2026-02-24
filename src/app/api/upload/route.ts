import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("photo") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json(
                { error: "Hanya JPG, PNG, dan WebP yang diizinkan." },
                { status: 400 }
            );
        }

        if (file.size > MAX_SIZE_BYTES) {
            return NextResponse.json(
                { error: "Ukuran file maksimal 5MB." },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const ext = file.type.split("/")[1].replace("jpeg", "jpg");
        const filename = `${randomUUID()}.${ext}`;

        // Save to public/uploads — served as static files
        const uploadDir = join(process.cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true });
        await writeFile(join(uploadDir, filename), buffer);

        return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 });
    } catch (error: any) {
        console.error("[UPLOAD_POST]", error);
        return NextResponse.json({
            error: "Upload failed",
            details: error.message
        }, { status: 500 });
    }
}
