import Groq from "groq-sdk";
import { env } from "../config/env.js";

const client = new Groq({ apiKey: env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are an expert LaTeX resume writer.
Generate a complete, compilable LaTeX resume using the exact template below.

STRICT RULES — violations will break compilation:
1. Output ONLY raw LaTeX code — no markdown, no backticks, no explanation
2. Always start with \\documentclass[a4paper,10pt]{article}
3. Use EXACTLY the preamble packages shown in the template — do not add or remove any
4. Always include \\begin{document} and \\end{document}
5. Do NOT use moderncv, \\cventry, \\cvitem, or any moderncv commands
6. Escape special characters: use \\& not &, use \\% not %, use \\$ not $
7. Use -- for date ranges, never a single dash
8. For the header, always use the \\begin{center} block with name, location, email, phone
9. If LinkedIn/GitHub URLs are not in the resume, omit those \\href lines — never invent them
10. For projects, always include the tech stack in {\\small (...)} on the same line as the bold project name
11. Section headings use \\section*{TITLE} — always uppercase, always with asterisk
12. Experience entries: bold job title with \\hfill date, then \\textit{company} on next line, then itemize
13. Do NOT invent or exaggerate experience — only use what is in the candidate's resume
14. Keep all content within the page margins — do not use \\newpage

EXACT TEMPLATE TO FOLLOW — match this structure precisely:

\\documentclass[a4paper,10pt]{article}

\\usepackage[left=0.50in,right=0.50in,top=0.40in,bottom=0.40in]{geometry}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{titlesec}

\\pagestyle{empty}
\\setlength{\\parindent}{0pt}
\\setlist[itemize]{leftmargin=*,noitemsep,topsep=1pt}

\\titleformat{\\section}
{\\large\\bfseries}
{}{0em}{}
[\\titlerule]

\\titlespacing{\\section}{0pt}{4pt}{3pt}

\\begin{document}

%==================== HEADER ====================%

\\begin{center}
{\\LARGE \\textbf{FULL NAME IN CAPS}}\\\\
City, State \\quad|\\quad
\\href{mailto:email@example.com}{email@example.com}
\\quad|\\quad 1234567890
\\quad|\\quad
\\href{https://linkedin.com/in/username}{LinkedIn}
\\quad|\\quad
\\href{https://github.com/username}{GitHub}
\\end{center}

\\vspace{-6pt}

%==================== PROFILE ====================%

\\section*{PROFILE}

One paragraph summary of experience, skills, and focus areas.

%==================== TECHNICAL SKILLS ====================%

\\section*{TECHNICAL SKILLS}

\\textbf{Languages:} JavaScript, TypeScript, Python

\\textbf{Frontend:} React.js, Next.js, HTML5, CSS3

\\textbf{Backend:} Node.js, Express.js, REST APIs

\\textbf{Databases:} PostgreSQL, MongoDB, MySQL

\\textbf{DevOps \\& Cloud:} Docker, AWS, CI/CD

\\textbf{Tools:} Git, GitHub, Postman

%==================== EDUCATION ====================%

\\section*{EDUCATION}

\\textbf{Degree Name} \\hfill StartYear -- EndYear

Institution Name, City

%==================== EXPERIENCE ====================%

\\section*{EXPERIENCE}

\\textbf{Job Title} \\hfill Start Month Year -- End Month Year

\\textit{Company Name, Location}

\\begin{itemize}
\\item Achievement or responsibility with quantified result.
\\item Another achievement or responsibility.
\\end{itemize}

\\vspace{2pt}

\\textbf{Job Title 2} \\hfill Start Month Year -- End Month Year

\\textit{Company Name 2, Location}

\\begin{itemize}
\\item Achievement or responsibility.
\\end{itemize}

%==================== PROJECTS ====================%

\\section*{PROJECTS}

\\textbf{Project Name One}
{\\small (Tech, Stack, Here)}

\\begin{itemize}
\\item What was built, architected, or achieved with quantified impact.
\\item Another bullet point with metrics if available.
\\end{itemize}

\\textbf{Project Name Two}
{\\small (Tech, Stack, Here)}

\\begin{itemize}
\\item What was built or achieved.
\\end{itemize}

\\end{document}`;

export const tailorResumeWithAI = async (
    resumeText: string,
    jobDescription: string
): Promise<string> => {
    const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        max_tokens: 4096,
        temperature: 0.3,
        messages: [
            {
                role: "system",
                content: SYSTEM_PROMPT,
            },
            {
                role: "user",
                content: `Generate a tailored LaTeX resume using the article template (NOT moderncv).

## Candidate Resume
${resumeText}

## Target Job Description
${jobDescription}

## Instructions
- Tailor the PROFILE section to highlight skills relevant to the job description
- Reorder or emphasize bullet points that match the job requirements
- Keep all real data from the candidate's resume — do not invent anything
- Output ONLY the LaTeX code starting with \\documentclass[a4paper,10pt]{article}`,
            },
        ],
    });

    const text = response.choices[0]?.message?.content;
    if (!text) throw new Error("Groq returned no text content");

    let latex = text
        .replace(/^```latex\n?/i, "")
        .replace(/^```\n?/, "")
        .replace(/\n?```$/, "")
        .trim();

    if (!latex.includes("\\documentclass")) {
        throw new Error("AI output missing \\documentclass — invalid LaTeX");
    }
    if (!latex.includes("\\begin{document}")) {
        throw new Error("AI output missing \\begin{document} — invalid LaTeX");
    }
    if (!latex.includes("\\end{document}")) {
        throw new Error("AI output missing \\end{document} — invalid LaTeX");
    }
    if (latex.includes("\\moderncvstyle") || latex.includes("\\cventry")) {
        throw new Error("AI generated moderncv output instead of article template — retrying not implemented");
    }

    return latex;
};