// news-image-20261126 — copies the finished 26 November 2026 news image
// into the directory make.fun collects output from.
//
// Usage:  MAKEFUN_OUTPUT_DIR=out node main.ts
// If MAKEFUN_OUTPUT_DIR is unset it falls back to /output.
// The script does no network access and writes exactly one file.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");

const targetDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const targetPath = join(targetDir, "entry.png");

const payload = readFileSync(sourcePath);
mkdirSync(targetDir, { recursive: true });
writeFileSync(targetPath, payload);

const writtenBack = readFileSync(targetPath);
if (!payload.equals(writtenBack)) {
  throw new Error(
    `Verification failed: ${targetPath} differs from ${sourcePath} after copying.`,
  );
}

console.log(`Wrote ${payload.length} bytes to ${targetPath} (verified identical).`);
