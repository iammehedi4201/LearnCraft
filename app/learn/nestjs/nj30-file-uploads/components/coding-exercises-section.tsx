"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON FILE UPLOADS)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: S3 Keys &amp; File Validation">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your storage and file validation logic to the test! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: S3 Key Sanitizer ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Collision-Free S3 Key Sanitizer</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "uploads-ex-01",
              title: "1. Build Safe S3 Storage Key Generator",
              instructions: `Implement 'generateS3Key(folder: string, originalName: string, uuid: string)':
1. Extracts the lowercase extension (e.g. '.png' from 'Photo.PNG').
2. Replaces spaces/special chars in folder with clean slashes.
3. Returns '\${folder}/\${uuid}\${ext}'.`,
              starterCode: `function generateS3Key(folder: string, originalName: string, uuid: string): string {
  // Your code here:
}

console.log(generateS3Key("avatars/user-42", "My Profile Pic.PNG", "a1b2c3d4"));`,
              solutionCode: `function generateS3Key(folder: string, originalName: string, uuid: string): string {
  const dotIdx = originalName.lastIndexOf('.');
  const ext = dotIdx !== -1 ? originalName.slice(dotIdx).toLowerCase() : '';
  const cleanFolder = folder.replace(/^\\/+/, '').replace(/\\/+$/, '');
  return \`\${cleanFolder}/\${uuid}\${ext}\`;
}

console.log(generateS3Key("avatars/user-42", "My Profile Pic.PNG", "a1b2c3d4"));`,
              hints: [
                "Find last index of '.' to extract extension and call toLowerCase().",
              ],
              tests: [
                {
                  name: "Constructs clean lowercase extension S3 key",
                  code: `const k = generateS3Key("docs", "REPORT.PDF", "xyz-123"); if (k !== "docs/xyz-123.pdf") throw new Error("Key generation failed");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: MIME Type Validator ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Extension &amp; MIME Validator</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "uploads-ex-02",
              title: "2. Build Strict File Type Validator",
              instructions: `Implement 'validateFile(filename: string, mimeType: string, allowedExtensions: string[])':
Returns true if filename's extension (lowercase, including '.') is in allowedExtensions AND matches image/ or application/pdf MIME type. Otherwise false.`,
              starterCode: `function validateFile(filename: string, mimeType: string, allowedExtensions: string[]): boolean {
  // Your code here:
}

console.log("Valid PNG:", validateFile("avatar.png", "image/png", [".png", ".jpg"]));
console.log("Invalid EXE:", validateFile("hack.exe", "application/x-msdownload", [".png", ".jpg"]));`,
              solutionCode: `function validateFile(filename: string, mimeType: string, allowedExtensions: string[]): boolean {
  const dotIdx = filename.lastIndexOf('.');
  if (dotIdx === -1) return false;
  const ext = filename.slice(dotIdx).toLowerCase();

  if (!allowedExtensions.includes(ext)) return false;
  return mimeType.startsWith('image/') || mimeType === 'application/pdf';
}

console.log("Valid PNG:", validateFile("avatar.png", "image/png", [".png", ".jpg"]));
console.log("Invalid EXE:", validateFile("hack.exe", "application/x-msdownload", [".png", ".jpg"]));`,
              hints: [
                "Extract extension, check allowedExtensions.includes(ext), then check mimeType.",
              ],
              tests: [
                {
                  name: "Validates allowed image types and blocks executables",
                  code: `if (!validateFile("pic.png", "image/png", [".png"])) throw new Error("Valid file rejected"); if (validateFile("pic.exe", "application/exe", [".png"])) throw new Error("Malicious file accepted");`,
                },
              ],
              difficulty: "intermediate",
            }}
          />
        </div>
      </div>
    </SectionContainer>
  );
}
