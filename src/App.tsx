import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { assessmentCatalog, levelById } from "./content";
import { ErrorBoundary } from "./ErrorBoundary";
import { AssessmentPage } from "./pages/Assessment";
import { scrollToSection, stopAudio, useRoute } from "./hooks";
import { Home } from "./pages/Home";
import { DatenschutzPage, ImpressumPage } from "./pages/Legal";
import { LevelPage } from "./pages/Level";
import { TopicPage } from "./pages/Topic";

const ScenePreview = lazy(() => import("./story/ScenePreview").then(m => ({ default: m.ScenePreview })));

export function App() {
  const route = useRoute();
  const path = route.join("/");
  useEffect(() => {
    window.scrollTo(0, 0);
    stopAudio();
  }, [path]);

  return (
    <ErrorBoundary key={path}>
      <Page route={route} />
    </ErrorBoundary>
  );
}

function Page({ route }: { route: string[] }) {
  const [levelId, topicId] = route;
  // moin-neu — второй адрес той же страницы: на него ведут сохранённые закладки.
  if (levelId === "a1" && (topicId === "moin" || topicId === "moin-neu")) return <Suspense fallback={<p className="hero">Открываем дело…</p>}><ScenePreview /></Suspense>;
  if (levelId === "impressum") return <ImpressumPage />;
  if (levelId === "datenschutz") return <DatenschutzPage />;
  // У скрытого уровня нет доступных страниц: ни уроков, ни проверок.
  const level = levelId ? levelById(levelId) : undefined;
  if (level?.status !== "open") return <Home />;
  if (topicId && assessmentCatalog.some(a => a.id === topicId && a.level === level.id)) return <AssessmentPage key={topicId} level={level} id={topicId} />;
  if (topicId) return <TopicPage key={topicId} level={level} topicId={topicId} />;
  return <LevelPage level={level} />;
}

export type Crumb = { label: string; href?: string };

export function Topbar({ crumbs = [], nav = [] }: { crumbs?: Crumb[]; nav?: [id: string, label: string][] }) {
  const [active, setActive] = useState("");
  const navKey = nav.map(([id]) => id).join("|");
  useEffect(() => {
    const ids = navKey.split("|").filter(Boolean);
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = (document.querySelector(".topbar")?.getBoundingClientRect().bottom ?? 56) + 32;
      let current = "";
      for (const id of ids) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [navKey]);
  return (
    <header className={`topbar${nav.length > 3 ? " topbar-lesson" : ""}`}>
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
      <nav aria-label="Разделы страницы">
        {nav.map(([id, label]) => (
          <button key={id} type="button" aria-current={active === id ? "location" : undefined} onClick={() => scrollToSection(id)}>
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
        Озвучка — <a href="https://huggingface.co/k2-fsa/OmniVoice">OmniVoice</a> (модель CC-BY-NC).
        {" "}Задания и записи авторские. Экзаменационная практика ориентирована на Start Deutsch 1 (A1).
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
