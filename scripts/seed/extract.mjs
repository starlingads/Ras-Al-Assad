/**
 * Phase 2 · Step 1 — extract every hardcoded content array from the existing
 * components into `scripts/seed/.extracted.json`.
 *
 * Pure Node, no dependencies: it slices each `const <name> = [...]` literal
 * out of the source text with a balanced-bracket scan, rewrites icon
 * identifiers/JSX to plain strings, and evaluates the literal in an empty VM.
 *
 * Run: node scripts/seed/extract.mjs
 */
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import vm from "node:vm";

const root = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "../..");

/** file (repo-relative) → const names to extract */
const TARGETS = {
  "src/app/(site)/en/projects/ProjectsClient.tsx": ["projects", "categories"],
  "src/app/(site)/en/services/ServicesClient.tsx": ["services"],
  "src/app/(site)/en/team/TeamClient.tsx": ["teamMembers"],
  "src/app/(site)/en/appreciation/AppreciationClient.tsx": ["certificates", "accreditations"],
  "src/app/(site)/en/sustainability/SustainabilityClient.tsx": ["commitmentPoints", "impactStats"],
  "src/components/HighlighterServices.tsx": ["services"],
  "src/components/ExpertiseSlider.tsx": ["cards"],
  "src/components/StatsSection.tsx": ["pipelineSteps", "credentials"],
  "src/components/LatestNews.tsx": ["institutions"],
  "src/components/InteractiveMap.tsx": ["projects"],
  "src/components/Hero.tsx": ["rotatingWords", "floatingImgs"],
  "src/components/Footer.tsx": ["capabilityLinks", "companyLinks", "certificationLinks"],
  "src/components/Navbar.tsx": ["navLinks"],
};

/**
 * Slice `const <name>` literal (array or object) out of source text.
 * Scans with a tiny state machine so brackets inside strings/templates/
 * comments don't break the balance count.
 */
function sliceConst(source, name) {
  const declRe = new RegExp(`const\\s+${name}\\s*(?::[^=]+)?=\\s*`, "g");
  const match = declRe.exec(source);
  if (!match) return null;
  const start = declRe.lastIndex;
  const open = source[start];
  if (open !== "[" && open !== "{") return null;
  const close = open === "[" ? "]" : "}";

  let depth = 0;
  let i = start;
  let mode = "code"; // code | line | block | single | double | template
  for (; i < source.length; i++) {
    const ch = source[i];
    const prev = source[i - 1];
    if (mode === "code") {
      if (ch === "/" && source[i + 1] === "/") mode = "line";
      else if (ch === "/" && source[i + 1] === "*") mode = "block";
      else if (ch === "'") mode = "single";
      else if (ch === '"') mode = "double";
      else if (ch === "`") mode = "template";
      else if (ch === open || (open === "[" && ch === "{") || (open === "{" && ch === "[")) depth++;
      else if (ch === close || (open === "[" && ch === "}") || (open === "{" && ch === "]")) {
        depth--;
        if (depth === 0 && ch === close) return source.slice(start, i + 1);
      }
    } else if (mode === "line" && ch === "\n") mode = "code";
    else if (mode === "block" && prev === "*" && ch === "/") mode = "code";
    else if (mode === "single" && ch === "'" && prev !== "\\") mode = "code";
    else if (mode === "double" && ch === '"' && prev !== "\\") mode = "code";
    else if (mode === "template" && ch === "`" && prev !== "\\") mode = "code";
  }
  return null;
}

/** Make the literal safe for an empty VM: icons/JSX → strings. */
function sanitize(literal) {
  return (
    literal
      // icon: <Zap className="..."/> → icon: "Zap"
      .replace(/icon:\s*<(\w+)[^>]*\/>/g, 'icon: "$1"')
      // icon: Zap → icon: "Zap"  (bare identifier component references)
      .replace(/icon:\s*([A-Z]\w*)\s*([,}\n])/g, 'icon: "$1"$2')
      // Icon: Zap variants
      .replace(/\bIcon:\s*([A-Z]\w*)\s*([,}\n])/g, 'Icon: "$1"$2')
      // `as const` markers
      .replace(/\]\s*as\s+const/g, "]")
      .replace(/\}\s*as\s+const/g, "}")
  );
}

const out = {};
const problems = [];
for (const [file, names] of Object.entries(TARGETS)) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  for (const name of names) {
    const literal = sliceConst(source, name);
    const key = `${file}::${name}`;
    if (!literal) {
      problems.push(`NOT FOUND: ${key}`);
      continue;
    }
    try {
      const value = vm.runInNewContext(`(${sanitize(literal)})`, {}, { timeout: 2000 });
      out[key] = value;
    } catch (err) {
      problems.push(`EVAL FAILED: ${key} → ${err.message}`);
    }
  }
}

const dest = path.join(root, "scripts/seed/.extracted.json");
fs.writeFileSync(dest, JSON.stringify(out, null, 2));

console.log(`Wrote ${dest}`);
for (const [key, value] of Object.entries(out)) {
  const count = Array.isArray(value) ? value.length : `object(${Object.keys(value).length} keys)`;
  console.log(`  ${key} → ${count}`);
}
if (problems.length) {
  console.log("\nPROBLEMS:");
  problems.forEach((p) => console.log("  " + p));
  process.exitCode = 1;
}
