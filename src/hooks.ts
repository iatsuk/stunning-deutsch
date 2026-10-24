import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

export function useMedia(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);
  return matches;
}

export const useMobile = () => useMedia("(max-width: 860px)");
export const useReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");

/** Адрес вида #/a1/kennenlernen → ["a1", "kennenlernen"]. Хэш нужен, чтобы сайт работал на любом статическом хостинге. */
export function useRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  return hash.replace(/^#\/?/, "").split("/").filter(Boolean);
}

export const scrollToSection = (id: string) => {
  const target = document.getElementById(id);
  if (!target) return;
  // Начало главы попадает на линию активации сцены, чтобы переход не пропускал
  // первый короткий фрагмент под закреплённой сценой на телефоне.
  if (id.startsWith("chapter-")) {
    const anchor = window.matchMedia("(max-width: 860px)").matches ? 0.74 : 0.55;
    window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - window.innerHeight * anchor + 24, behavior: "smooth" });
  } else target.scrollIntoView({ behavior: "smooth", block: "start" });
};

/**
 * Текущий фрагмент по прокрутке: тот, чей верх последним пересёк линию
 * anchor (доля высоты окна). Обратная прокрутка проходит те же состояния.
 */
export function useScrollIndex(items: RefObject<(HTMLElement | null)[]>, anchor: number) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.innerHeight * anchor;
      let current = 0;
      items.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setIndex(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [items, anchor]);
  return index;
}

// ───────────── Озвучка: один плеер на страницу ─────────────

let player: HTMLAudioElement | null = null;
let playing = "";
let queue: string[] = [];
const audioListeners = new Set<() => void>();
const emitAudio = () => audioListeners.forEach((listener) => listener());

function start(src: string) {
  player?.pause();
  player = new Audio(src);
  playing = src;
  emitAudio();
  player.addEventListener("ended", () => {
    const next = queue.shift();
    if (next) start(next);
    else stop();
  });
  player.play().catch(() => stop());
}

function stop() {
  player?.pause();
  player = null;
  playing = "";
  queue = [];
  emitAudio();
}

/** Повторный клик по той же фразе останавливает её. */
export function play(src?: string) {
  if (!src) return;
  if (playing === src) return stop();
  queue = [];
  start(src);
}

export function playAll(sources: (string | undefined)[]) {
  const list = sources.filter((s): s is string => Boolean(s));
  if (!list.length) return;
  queue = list.slice(1);
  start(list[0]);
}

export const stopAudio = stop;

export const usePlaying = () =>
  useSyncExternalStore(
    (listener) => {
      audioListeners.add(listener);
      return () => audioListeners.delete(listener);
    },
    () => playing,
  );

// ───────────── Локальное хранилище: прогресс и настройки ─────────────

function readStore<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStore(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    // приватное окно или запрет на хранение — прогресс просто не сохранится
    return false;
  }
}

function createStore<T>(key: string, fallback: T) {
  let value = readStore(key, fallback);
  const listeners = new Set<() => void>();
  return {
    get: () => value,
    set(next: T) {
      value = next;
      const saved = writeStore(key, next);
      listeners.forEach((listener) => listener());
      return saved;
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

/** Решённые упражнения: { [темa]: { [id упражнения]: 1 } } */
const progressStore = createStore<Record<string, Record<string, 1>>>("sd-progress-v1", {});

export function useProgress() {
  const progress = useSyncExternalStore(progressStore.subscribe, progressStore.get);
  return {
    solved: (topic: string) => Object.keys(progress[topic] ?? {}).length,
    isSolved: (topic: string, exercise: string) => Boolean(progress[topic]?.[exercise]),
    mark(topic: string, exercise: string) {
      if (progress[topic]?.[exercise]) return;
      progressStore.set({ ...progress, [topic]: { ...progress[topic], [exercise]: 1 } });
    },
    reset(topic: string) {
      const { [topic]: _, ...rest } = progress;
      progressStore.set(rest);
    },
  };
}

/** Сколько шагов дела раскрыто: { [тема]: число }. */
const caseStore = createStore<Record<string, number>>("sd-case-v1", {});

export function useCaseProgress(topic: string) {
  const all = useSyncExternalStore(caseStore.subscribe, caseStore.get);
  const solved = all[topic] ?? 0;
  return {
    solved,
    advance(step: number) {
      if (step > solved) caseStore.set({ ...all, [topic]: step });
    },
    reset() {
      const { [topic]: _, ...rest } = all;
      caseStore.set(rest);
    },
  };
}

const translationStore = createStore<boolean>("sd-translation", true);

export type AdventureSave = {
  step: number;
  answers: Record<string, string>;
  won: boolean;
  assisted: boolean;
  seed: number;
};

const adventureStore = createStore<Record<string, AdventureSave>>("sd-adventure-v1", {});

export function useAdventureProgress() {
  const all = useSyncExternalStore(adventureStore.subscribe, adventureStore.get);
  const episode = (id: string): AdventureSave => {
    const raw = all?.[id];
    return {
      step: Number.isInteger(raw?.step) && raw.step >= 0 ? raw.step : 0,
      answers: raw?.answers && typeof raw.answers === "object" ? Object.fromEntries(Object.entries(raw.answers).filter(([, v]) => typeof v === "string")) : {},
      won: raw?.won === true,
      assisted: raw?.assisted === true,
      seed: Number.isInteger(raw?.seed) && raw.seed >= 0 ? raw.seed : 1,
    };
  };
  return {
    episode,
    update(id: string, patch: Partial<AdventureSave>) {
      return adventureStore.set({ ...adventureStore.get(), [id]: { ...episode(id), ...patch } });
    },
  };
}

/** Показывать ли перевод реплик на сцене. */
export function useTranslation() {
  const show = useSyncExternalStore(translationStore.subscribe, translationStore.get);
  return [show, (next: boolean) => translationStore.set(next)] as const;
}
