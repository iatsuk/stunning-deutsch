import assert from "node:assert/strict";
import test from "node:test";

const tick = () => new Promise((resolve) => setTimeout(resolve));

// Две вкладки делят одно хранилище; событие storage приходит только другой вкладке.
const data = new Map();
const handlers = [];
globalThis.window = {
  localStorage: {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
  },
  addEventListener: (type, handler) => type === "storage" && handlers.push(handler),
};

/** Плеер как в браузере: пауза отклоняет незавершённый запуск уже после текущего кода. */
const created = [];
globalThis.Audio = class {
  paused = true;
  constructor() {
    created.push(this);
  }
  addEventListener() {}
  play() {
    this.paused = false;
    return new Promise((resolve, reject) => {
      this.reject = reject;
    });
  }
  pause() {
    this.paused = true;
    const reject = this.reject;
    this.reject = undefined;
    if (reject) setTimeout(() => reject(new DOMException("прервано", "AbortError")));
  }
};

const { createStore } = await import("../src/lib/store.ts");
const { play, stopAudio } = await import("../src/hooks.ts");

test("запись в одной вкладке не стирает результаты другой", () => {
  const first = createStore("tabs", {});
  const second = createStore("tabs", {});
  second.update((all) => ({ ...all, zahlen: 1 }));
  first.update((all) => ({ ...all, wohnen: 1 }));
  assert.deepEqual(JSON.parse(data.get("tabs")), { zahlen: 1, wohnen: 1 });
});

test("вкладка показывает то, что сохранила другая", () => {
  const first = createStore("live", {});
  let notified = 0;
  first.subscribe(() => notified++);
  data.set("live", JSON.stringify({ zahlen: 1 }));
  handlers.forEach((handler) => handler({ key: "live" }));
  assert.deepEqual(first.get(), { zahlen: 1 });
  assert.ok(notified > 0);
  handlers.forEach((handler) => handler({ key: "другой-ключ" }));
  assert.equal(notified, 1);
});

test("испорченное значение заменяется значением по умолчанию", () => {
  data.set("broken", "null");
  assert.deepEqual(createStore("broken", {}).get(), {});
});

test("быстрое переключение фраз не останавливает новую запись", async () => {
  play("audio/one.m4a");
  play("audio/two.m4a");
  await tick();
  await tick();
  const [one, two] = created.slice(-2);
  assert.equal(one.paused, true);
  assert.equal(two.paused, false);
  stopAudio();
  assert.equal(two.paused, true);
});
