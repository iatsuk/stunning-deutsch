import { sceneChapter1 } from "./01.ts";
import { sceneChapter2 } from "./02.ts";
import { sceneChapter3 } from "./03.ts";
import { sceneChapter4 } from "./04.ts";
import { sceneChapter5 } from "./05.ts";
import { sceneChapter6 } from "./06.ts";
import { sceneChapter7 } from "./07.ts";
import { sceneChapter8 } from "./08.ts";
import { sceneChapter9 } from "./09.ts";
import { sceneChapter10 } from "./10.ts";
import { sceneChapter11 } from "./11.ts";
import type { Episode } from "../types.ts";

// Главы в формате сцен по порядку: прототип показывает их подряд, сборка их озвучивает.
// Цель доли немецкого в рассказе по главам — A1-PLOT.md, «Немецкий в рассказе».
export const sceneChapters: Episode[] = [sceneChapter1, sceneChapter2, sceneChapter3, sceneChapter4, sceneChapter5, sceneChapter6, sceneChapter7, sceneChapter8, sceneChapter9, sceneChapter10, sceneChapter11];
export const GERMAN_TARGET: Record<string, number> = { "moin-neu": 10, "moin-neu-2": 15, "moin-neu-3": 20, "moin-neu-4": 25, "moin-neu-5": 30, "moin-neu-6": 35, "moin-neu-7": 40, "moin-neu-8": 45, "moin-neu-9": 50, "moin-neu-10": 55, "moin-neu-11": 60 };
