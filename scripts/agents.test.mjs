import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, posix, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

// Инструкции агентов: корневой AGENTS.md — индекс, правила области лежат в AGENTS.md её каталога,
// рядом CLAUDE.md с импортом. Код области в другом каталоге получает только CLAUDE.md с импортом.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => readFileSync(join(root, file), "utf8");
const exists = (file) => existsSync(join(root, file));
const ROOT_MAX_LINES = 60;

/** Файлы с этим именем; служебные каталоги (.git, .claude с чужими worktree), node_modules и dist пропускаем. */
function find(name, dir = "") {
  return readdirSync(join(root, dir || "."), { withFileTypes: true }).flatMap((entry) => {
    const path = dir ? `${dir}/${entry.name}` : entry.name;
    if (entry.isDirectory())
      return entry.name.startsWith(".") || entry.name === "node_modules" || entry.name === "dist" ? [] : find(name, path);
    return entry.name === name ? [path] : [];
  });
}

const areas = find("AGENTS.md").filter((file) => file !== "AGENTS.md");
const links = find("CLAUDE.md").filter((file) => file !== "CLAUDE.md");

/** Пути в `коде`: со слешем, с расширением файла или от существующего каталога; абсолютные и шаблоны пропускаем. */
function paths(markdown) {
  return markdown
    .split("`")
    .filter((_, i) => i % 2)
    .filter((span) => /^[\w.-]+(\/[\w.-]*)*$/.test(span))
    .filter((span) => span.endsWith("/") || /\.[a-z]{2,4}$/.test(span) || (span.includes("/") && exists(span.split("/")[0])));
}

/** Строки импорта CLAUDE.md, разрешённые от его каталога. */
function imports(file) {
  const lines = read(file).split("\n").map((line) => line.trim()).filter(Boolean);
  return lines.filter((line) => line.startsWith("@")).map((line) => posix.join(posix.dirname(file), line.slice(1)));
}

test("the root instructions stay a short index", () => {
  const lines = read("AGENTS.md").trimEnd().split("\n").length;
  assert.ok(lines <= ROOT_MAX_LINES, `корневой AGENTS.md: ${lines} строк, допустимо ${ROOT_MAX_LINES}`);
  assert.deepEqual(imports("CLAUDE.md"), ["AGENTS.md"]);
});

test("the root index points only to files that exist and names every area", () => {
  const index = read("AGENTS.md");
  const named = paths(index);
  assert.ok(named.length > 20, "в индексе почти нет путей: проверка путей сломалась");
  for (const path of named) assert.ok(exists(path), `корневой AGENTS.md ссылается на несуществующий ${path}`);
  assert.ok(areas.length >= 4, `нашлось только ${areas.length} файлов областей`);
  for (const area of areas) assert.ok(named.includes(area), `${area} не назван в таблице корневого AGENTS.md`);
});

test("every area file has a sibling CLAUDE.md that imports it", () => {
  for (const area of areas) {
    const sibling = posix.join(posix.dirname(area), "CLAUDE.md");
    assert.ok(exists(sibling), `нет ${sibling} рядом с ${area}`);
    assert.ok(imports(sibling).includes(area), `${sibling} не импортирует @AGENTS.md`);
  }
});

test("a nested CLAUDE.md only imports area files", () => {
  for (const file of links) {
    const lines = read(file).split("\n").map((line) => line.trim()).filter(Boolean);
    assert.ok(lines.length > 0, `${file} пуст`);
    for (const line of lines) assert.ok(line.startsWith("@"), `${file}: правила пишутся в AGENTS.md, здесь только импорт, а не «${line}»`);
    for (const target of imports(file)) assert.ok(areas.includes(target), `${file} импортирует ${target}, а это не файл области`);
  }
});

test("area files point to files that exist", () => {
  for (const area of areas) {
    const dir = posix.dirname(area);
    for (const path of paths(read(area)))
      assert.ok(exists(path) || exists(posix.join(dir, path)), `${area} ссылается на несуществующий ${path}`);
  }
});

test("a rule sentence lives in one instruction file", () => {
  // Строка «Область: …» и таблица — навигация, они могут называть одни и те же каталоги.
  const seen = new Map();
  for (const file of ["AGENTS.md", ...areas]) {
    const sentences = read(file)
      .split("\n")
      .map((line) => line.trim().replace(/^- /, ""))
      .filter((line) => line && !line.startsWith("#") && !line.startsWith("|") && !line.startsWith("Область:"))
      .flatMap((line) => line.split(/(?<=[.!?])\s+(?=[A-ZА-ЯЁ«`*\d])/u))
      .filter((sentence) => sentence.length >= 25);
    for (const sentence of new Set(sentences)) {
      assert.ok(!seen.has(sentence), `правило записано и в ${seen.get(sentence)}, и в ${file}: «${sentence}»`);
      seen.set(sentence, file);
    }
  }
});
