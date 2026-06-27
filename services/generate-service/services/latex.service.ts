import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { v4 as uuid } from "uuid";
import { minioClient, GENERATED_BUCKET } from "../config/storage.js";

const execAsync = promisify(exec);

const MIKTEX_PATH = "C:\\Program Files\\MiKTeX\\miktex\\bin\\x64";

export const compileAndUploadPDF = async (
    latexSource: string,
    userId: string
): Promise<string> => {
    const workDir = path.join(os.tmpdir(), `resume-${uuid()}`);
    await fs.mkdir(workDir, { recursive: true });

    const texFile = path.join(workDir, "resume.tex");
    const pdfFile = path.join(workDir, "resume.pdf");

    
    const patchedLatex = patchLatex(latexSource);

    console.log("=== GENERATED LATEX START ===");
    console.log(patchedLatex);
    console.log("=== GENERATED LATEX END ===");

    try {
        await fs.writeFile(texFile, patchedLatex, "utf-8");

        const cmd = `pdflatex -interaction=nonstopmode -output-directory="${workDir}" "${texFile}"`;

        const env = {
            ...process.env,
            PATH: `${MIKTEX_PATH};${process.env.PATH}`,
            MIKTEX_ENABLE_INSTALLER: "1",
        };

        await execAsync(cmd, { env, timeout: 120000 });
        await execAsync(cmd, { env, timeout: 120000 }); 

        const pdfBuffer = await fs.readFile(pdfFile);

        const s3Key = `${userId}/${uuid()}-tailored-resume.pdf`;
        await minioClient.putObject(
            GENERATED_BUCKET,
            s3Key,
            pdfBuffer,
            pdfBuffer.length,
            { "Content-Type": "application/pdf" }
        );

        return s3Key;
    } catch (err: any) {
        console.log("=== PDFLATEX FULL ERROR ===");
        console.log(err.stdout);
        console.log("=== PDFLATEX STDERR ===");
        console.log(err.stderr);
        throw err;
    } finally {
        await fs.rm(workDir, { recursive: true, force: true });
    }
};


function patchLatex(source: string): string {
    let patched = source.replace(
        /\\PassOptionsToPackage\{[^}]*\}\{microtype\}\s*\n?/g,
        ""
    );
    patched = patched.replace(
        /\\usepackage(\[[^\]]*\])?\{microtype\}\s*\n?/g,
        ""
    );
    return patched;
}