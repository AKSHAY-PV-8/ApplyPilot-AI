import { minioClient, RESUMES_BUCKET } from "../config/storage.js";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const extractTextFromResume = async (s3Key: string): Promise<string> => {
    const stream = await minioClient.getObject(RESUMES_BUCKET, s3Key);

    const chunks: Buffer[] = [];
    await new Promise<void>((resolve, reject) => {
        stream.on("data", (chunk: Buffer) => chunks.push(chunk));
        stream.on("end", resolve);
        stream.on("error", reject);
    });

    const buffer = Buffer.concat(chunks);
    const ext = s3Key.split(".").pop()?.toLowerCase();

    if (ext === "pdf") {
        return await extractPdfText(buffer);
    }

    return buffer.toString("utf-8");
};

const extractPdfText = async (buffer: Buffer): Promise<string> => {
    const uint8Array = new Uint8Array(buffer);

    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdf = await loadingTask.promise;

    const textPages: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
            .map((item: any) => ("str" in item ? item.str : ""))
            .join(" ");
        textPages.push(pageText);
    }

    return textPages.join("\n");
};