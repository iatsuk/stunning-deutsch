// Сколько места в истории git занимают записи, которых больше нет в текущей ветке: отдельно
// уже отправленные на GitHub (origin) и лежащие только в локальных коммитах. По этим числам
// работает правило «Записи в истории git» в AGENTS.md.
//   node scripts/audio-history.mjs
import { execFileSync } from "node:child_process";

const git = (...args) => execFileSync("git", args, { encoding: "utf8", maxBuffer: 1 << 28 });
const PATHS = ["public/audio", "public/story-audio"];

/** Записи (blob → размер), достижимые из коммитов. */
function blobs(...revs) {
  const ids = git("rev-list", "--objects", ...revs, "--", ...PATHS)
    .split("\n")
    .filter((line) => line.includes(" "))
    .map((line) => line.split(" ")[0]);
  const sizes = new Map();
  const out = execFileSync("git", ["cat-file", "--batch-check=%(objecttype) %(objectname) %(objectsize)"], {
    input: ids.join("\n"),
    encoding: "utf8",
    maxBuffer: 1 << 28,
  });
  for (const line of out.split("\n")) {
    const [type, id, size] = line.split(" ");
    if (type === "blob") sizes.set(id, Number(size));
  }
  return sizes;
}

const live = new Set(git("ls-tree", "-r", "HEAD", "--", ...PATHS).split("\n").filter(Boolean).map((line) => line.split(/\s+/)[2]));
const pushed = blobs("--remotes=origin");
const local = blobs("--branches");
const dead = (map, skip) => [...map].filter(([id]) => !live.has(id) && !skip?.has(id));
const report = (label, list) =>
  console.log(`${label} — файлов: ${list.length}, ${(list.reduce((sum, [, size]) => sum + size, 0) / 2 ** 20).toFixed(1)} МБ`);
report("Уже на GitHub, в текущей ветке не нужны", dead(pushed));
report("Только в локальных коммитах, в текущей ветке не нужны", dead(local, pushed));
