import { Component, type ReactNode } from "react";

/** Страница не загрузилась или упала: нет сети, после обновления сайта пропал старый файл. */
export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="missing">
        <h1>Страница не открылась</h1>
        <p>Проверьте соединение и обновите страницу. Сохранённый прогресс не потерян.</p>
        <button type="button" className="primary" onClick={() => window.location.reload()}>
          Обновить страницу
        </button>
      </main>
    );
  }
}
