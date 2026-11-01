// Прогресс и настройки в localStorage. Модуль без зависимостей от React.

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? ((JSON.parse(raw) as T) ?? fallback) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    // приватное окно или запрет на хранение — прогресс просто не сохранится
    return false;
  }
}

export function createStore<T>(key: string, fallback: T) {
  let value = read(key, fallback);
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((listener) => listener());
  // Другая вкладка сохранила своё: показываем свежие данные.
  window.addEventListener("storage", (event) => {
    if (event.key !== null && event.key !== key) return;
    value = read(key, fallback);
    emit();
  });
  const commit = (next: T) => {
    value = next;
    const saved = write(key, next);
    emit();
    return saved;
  };
  return {
    get: () => value,
    set: commit,
    /** Изменение поверх сохранённого, а не копии в памяти: иначе запись сотрёт результаты другой вкладки. */
    update: (change: (current: T) => T) => commit(change(read(key, value))),
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
