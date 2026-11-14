// Раскладки прежних версий сцен для переноса старых сохранений (src/story/progress.ts): до 15 ноября
// 2026 года прохождение хранилось по номерам узлов, и вставка узла сдвигала номера. Скрипт проходит
// по версиям сцен в git и пишет src/story/scene-layouts.json: для каждой сцены — раскладки,
// которые отличаются от текущей. Запускать вручную: node scripts/scene-layouts.mjs.
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const OUT = path.join(root, "src/story/scene-layouts.json");

if (process.argv[2] === "--dump") {
  // Дочерний процесс: раскладки сцен одной версии исходников.
  const dir = process.argv[3];
  // Ранние версии: одна глава в scenes/01.ts без общего index.ts.
  const entry = ["src/story/scenes/index.ts", "src/story/scenes/01.ts"].map((f) => path.join(dir, f)).find(existsSync);
  const mod = await import(entry);
  const chapters = mod.sceneChapters ?? (mod.sceneChapter1 ? [mod.sceneChapter1] : []);
  const { layoutOf } = await import(path.join(root, "src/story/progress.ts"));
  const out = {};
  for (const c of chapters) for (const b of c.beats) if (b.challenge.kind === "play") out[b.id] = layoutOf(b.challenge.nodes);
  console.log(JSON.stringify(out));
  process.exit(0);
}

const commits = execFileSync("git", ["log", "--format=%H", "--", "src/story/scenes", "src/story/scenes.ts"], { cwd: root, encoding: "utf8" }).trim().split("\n");
const { sceneChapters } = await import(path.join(root, "src/story/scenes/index.ts"));
const { layoutOf } = await import(path.join(root, "src/story/progress.ts"));
const current = Object.fromEntries(sceneChapters.flatMap((c) => c.beats).filter((b) => b.challenge.kind === "play").map((b) => [b.id, JSON.stringify(layoutOf(b.challenge.nodes))]));
const layouts = {};
let read = 0;
for (const sha of commits) {
  const dir = mkdtempSync(path.join(tmpdir(), "layouts-"));
  try {
    execFileSync("sh", ["-c", `git archive ${sha} src | tar -x -C "${dir}"`], { cwd: root });
    const dump = JSON.parse(execFileSync(process.execPath, ["--experimental-strip-types", "--no-warnings", fileURLToPath(import.meta.url), "--dump", dir], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }));
    read++;
    for (const [id, layout] of Object.entries(dump)) {
      const text = JSON.stringify(layout);
      if (text === current[id]) continue;
      layouts[id] ??= [];
      if (!layouts[id].some((l) => JSON.stringify(l) === text)) layouts[id].push(layout);
    }
  } catch {
    // Версия, которую уже не собрать (другая структура модулей), пропускается.
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
writeFileSync(OUT, `${JSON.stringify(layouts)}\n`);
console.log(`версий прочитано ${read} из ${commits.length}; сцен с прежними раскладками ${Object.keys(layouts).length}, раскладок ${Object.values(layouts).flat().length}`);
