import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { mapPins, PLACES } from "../src/pages/kielMap.ts";

// Карта Киля на главной: каждое открытое место ведёт на существующую страницу, будущие уровни закрыты до открытия.
const catalog = JSON.parse(readFileSync(new URL("../src/generated/catalog.json", import.meta.url), "utf8"));
const app = readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");

test("map places are distinct and sit on the picture", () => {
  for (const key of ["id", "de", "ru"]) assert.equal(new Set(PLACES.map((p) => p[key])).size, PLACES.length, key);
  for (const p of PLACES) assert.ok([p.x, p.y].every((v) => v >= 0 && v <= 100), p.id);
});

test("open map places lead to pages the router knows", () => {
  for (const pin of mapPins(catalog.levels).filter((p) => "href" in p)) {
    const [level, topic, part] = pin.href.replace(/^#\//, "").split("/");
    assert.equal(catalog.levels.find((l) => l.id === level)?.status, "open", pin.href);
    if (topic) {
      const known = catalog.assessments.some((a) => a.id === topic && a.level === level) || app.includes(`topicId === "${topic}"`);
      assert.ok(known, pin.href);
    }
    if (part) assert.ok(app.includes(`route[2] === "${part}"`), pin.href);
  }
});

test("places of hidden levels stay closed until the level opens", () => {
  const levels = (a2) => [{ id: "a1", status: "open" }, { id: "a2", status: a2 }, { id: "b1", status: "soon" }];
  assert.deepEqual(mapPins(levels("soon")).filter((p) => "soon" in p).map((p) => p.id), ["anleger", "uni"]);
  const opened = mapPins(levels("open"));
  assert.equal(opened.find((p) => p.id === "anleger").href, "#/a2");
  assert.ok("soon" in opened.find((p) => p.id === "uni"));
});
