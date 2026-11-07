import { sceneChapter1 } from "./01.ts";
import { sceneChapter2 } from "./02.ts";
import { sceneChapter3 } from "./03.ts";
import { sceneChapter4 } from "./04.ts";
import { sceneChapter5 } from "./05.ts";
import type { Episode } from "../types.ts";

// Главы в формате сцен по порядку: прототип показывает их подряд, сборка их озвучивает.
// Цель доли немецкого в рассказе по главам — A1-PLOT.md, «Немецкий в рассказе».
export const sceneChapters: Episode[] = [sceneChapter1, sceneChapter2, sceneChapter3, sceneChapter4, sceneChapter5];
export const GERMAN_TARGET: Record<string, number> = { "moin-neu": 10, "moin-neu-2": 15, "moin-neu-3": 20, "moin-neu-4": 25, "moin-neu-5": 30 };
