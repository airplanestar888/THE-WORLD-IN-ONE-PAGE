// news-image-20261118 entry (Node 22, standard library only).
// The image beside this file already sums up the world news of
// Wednesday 18 November 2026, so this program's whole job is to
// place an exact copy of it at /output/entry.png for the grader.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output — run it with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
const bytes = readFileSync(source);

// Refuse to hand the grader a broken file: a PNG must start with its
// 8-byte signature, and the gate rejects anything else outright.
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (bytes.length < 8 || !bytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
  throw new Error("entry.png is not a valid PNG file");
}
if (bytes.length > 1048576) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB limit`);
}
writeFileSync(join(outDir, "entry.png"), bytes);
console.log(`wrote entry.png (${bytes.length} bytes) to ${outDir}`);
