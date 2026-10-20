import { useEffect, type ReactNode } from "react";
import { levelById } from "./content";
import { scrollToSection, stopAudio, useRoute } from "./hooks";
import { Home } from "./pages/Home";
import { DatenschutzPage, ImpressumPage } from "./pages/Legal";
import { LevelPage } from "./pages/Level";
import { TopicPage } from "./pages/Topic";

export function App() {
  const route = useRoute();
  const path = route.join("/");
  useEffect(() => {
    window.scrollTo(0, 0);
    stopAudio();
  }, [path]);

  const [levelId, topicId] = route;
  if (levelId === "impressum") return <ImpressumPage />;
  if (levelId === "datenschutz") return <DatenschutzPage />;
  const level = levelId ? levelById(levelId) : undefined;
  if (level && level.status === "open" && topicId) return <TopicPage key={topicId} level={level} topicId={topicId} />;
  if (level && level.status === "open") return <LevelPage level={level} />;
  return <Home />;
}

export type Crumb = { label: string; href?: string };

export function Topbar({ crumbs = [], nav = [] }: { crumbs?: Crumb[]; nav?: [id: string, label: string][] }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <a className="wordmark" href="#/">
          <i aria-hidden="true" />
          stunning deutsch
        </a>
        {crumbs.map((crumb) => (
          <span key={crumb.label} className="crumb">
            {crumb.href ? <a href={crumb.href}>{crumb.label}</a> : crumb.label}
          </span>
        ))}
      </div>
      <nav>
        {nav.map(([id, label]) => (
          <button key={id} type="button" onClick={() => scrollToSection(id)}>
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}

export function Footer({ children }: { children?: ReactNode }) {
  return (
    <footer className="footer">
      {children}
      <p>
        Озвучка — <a href="https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-Base">Qwen3-TTS 1.7B</a> (Apache 2.0).
        {" "}Формат экзамена A1 — по официальному описанию Start Deutsch 1
        (telc Deutsch A1 и Goethe-Zertifikat A1 — один и тот же экзамен).
      </p>
      <p>
        Независимый некоммерческий проект. Не связан с telc gGmbH и Goethe-Institut; telc и Start Deutsch —
        товарные знаки их владельцев.
      </p>
      <p className="footer-links">
        <a href="#/impressum">Impressum</a>
        <a href="#/datenschutz">Datenschutz</a>
      </p>
    </footer>
  );
}

export function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
