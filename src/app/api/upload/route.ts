import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import sharp from "sharp";

export const dynamic = "force-dynamic";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // Increase to 10MB for raw, we compress later

export async function POST(req: NextRequest) {
    console.log("[UPLOAD_START] Processing new upload request...");
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
                { error: "Ukuran file maksimal 10MB." },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        
        // --- Image Optimization with Sharp ---
        const optimizedBuffer = await sharp(buffer)
            .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
            .jpeg({ quality: 80, progressive: true })
            .toBuffer();

        const filename = `${randomUUID()}.jpg`;

        // Save to public/uploads — served as static files
        const uploadDir = join(process.cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true });
        
        const filePath = join(uploadDir, filename);
        await writeFile(filePath, optimizedBuffer);

        console.log(`[UPLOAD_SUCCESS] File saved to: ${filePath}`);

        return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 });
    } catch (error) {
        console.error("[UPLOAD_POST]", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
