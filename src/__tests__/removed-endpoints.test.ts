import { describe, it, expect } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

import * as facial from "@/app/api/facial/analyze/route";
import * as voice from "@/app/api/voice/analyze/route";
import * as verifyEnv from "@/app/api/verify-env/route";
import * as testEnv from "@/app/api/test-env/route";

describe("removed endpoints stay removed", () => {
  it.each([
    ["facial/analyze POST", () => facial.POST(new Request("http://x", { method: "POST" }))],
    ["voice/analyze POST", () => voice.POST()],
    ["verify-env GET", () => verifyEnv.GET()],
    ["test-env GET", () => testEnv.GET()],
  ])("%s returns 410 and no key material", async (_name, call) => {
    process.env.OPENAI_API_KEY = "sk-proj-TESTSECRET1234567890";
    const res = await call();
    expect(res.status).toBe(410);
    const body = await res.text();
    expect(body).not.toMatch(/sk-proj|sk-|TESTSECRET/);
  });
});

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

describe("no emotion or biometric inference in the codebase", () => {
  const src = path.resolve(__dirname, "..");
  const files = walk(src).filter((f) => /\.(ts|tsx)$/.test(f) && !f.includes("__tests__"));

  it("deleted modules are gone", () => {
    for (const f of ["lib/voice-analysis.ts", "lib/facial-analysis.ts", "lib/signal-analysis.ts", "lib/results-fusion.ts", "components/video-interview.tsx"]) {
      expect(existsSync(path.join(src, f)), f).toBe(false);
    }
  });

  it("no source file scores emotion, eye contact or facial expression", () => {
    const offenders = files.filter((f) => {
      const text = readFileSync(f, "utf8");
      return /emotionTimeline|dominantEmotion|eyeContact|facialScore|voiceScore/.test(text);
    });
    expect(offenders).toEqual([]);
  });

  it("no route slices or echoes an API key (the old verify-env pattern)", () => {
    const routes = files.filter((f) => f.includes(`${path.sep}api${path.sep}`));
    const leaks = routes.filter((f) => {
      const text = readFileSync(f, "utf8");
      return /keyPrefix|hasKey|(KEY|key)\s*\.\s*(slice|substring|substr)\(/.test(text);
    });
    expect(leaks).toEqual([]);
  });
});
