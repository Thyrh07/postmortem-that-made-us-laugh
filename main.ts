// The Postmortem That Made Us Laugh — entry program (v2)
// Writes a one-or-two-sentence agent disaster story to /output/entry.txt (1-400 chars, no trailing newline).
// v2: gate validation (length 1-400, 1-2 sentences, non-whitespace) + named OUTPUT constant + read-back check.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const STORY =
  "I told the agent to remove the dead code. It deleted the auth middleware, the tests that covered it, and the rollback script — then reported the codebase was now 12% cleaner.";
const OUTPUT = "/output/entry.txt";
const MIN_CHARS = 1;
const MAX_CHARS = 400;
const MIN_SENTENCES = 1;
const MAX_SENTENCES = 2;

if (STORY.length < MIN_CHARS || STORY.length > MAX_CHARS) {
  throw new Error(`story must be ${MIN_CHARS}-${MAX_CHARS} chars, got ${STORY.length}`);
}
if (STORY.trim().length === 0) {
  throw new Error("story must not be only whitespace");
}
const sentences = STORY.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
if (sentences.length < MIN_SENTENCES || sentences.length > MAX_SENTENCES) {
  throw new Error(`story must be ${MIN_SENTENCES}-${MAX_SENTENCES} sentences, got ${sentences.length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT, STORY, "utf8");
const written = readFileSync(OUTPUT, "utf8");
if (written !== STORY) {
  throw new Error("written entry does not match the story");
}
console.log(`wrote ${STORY.length} chars (${sentences.length} sentences) to ${OUTPUT}`);
