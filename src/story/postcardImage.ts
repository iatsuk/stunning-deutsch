// Открытка, которую можно сохранить на устройство: светлая карточка с иллюстрацией, немецким словом,
// заметкой и подписью сайта. Рисуется на холсте в браузере; перенос строк и высота — чистые функции.
import { postcardPictures, type Postcard } from "./postcards.ts";

const WIDTH = 1200;
const PAD = 64;
const INNER = WIDTH - PAD * 2;
/** Иллюстрации нарисованы в пропорции 3:2. */
const IMAGE_HEIGHT = Math.round((INNER * 2) / 3);
const TITLE_GAP = 76;
const WORD_GAP = 58;
const BODY_GAP = 62;
const LINE = 46;
const FOOTER = 104;
const SITE = "stunning-deutsch.deelstuff.com";

const SERIF = '"Literata Variable", Georgia, serif';
const SANS = '"Golos Text Variable", system-ui, sans-serif';
const MONO = '"JetBrains Mono Variable", ui-monospace, monospace';
const FONTS = {
  title: `600 52px ${SERIF}`,
  word: `600 38px ${SANS}`,
  ru: `400 34px ${SANS}`,
  body: `400 32px ${SANS}`,
  brand: `600 28px ${SANS}`,
  site: `400 22px ${MONO}`,
};

/** Строки текста не шире maxWidth; слово не разрывается, даже если оно одно длиннее строки. */
export function wrapLines(text: string, maxWidth: number, measure: (s: string) => number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const next = line ? `${line} ${word}` : word;
    if (line && measure(next) > maxWidth) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

/** Высота открытки по числу строк заметки: картинка не растягивается, растёт только текст. */
export const cardHeight = (lines: number) =>
  PAD + IMAGE_HEIGHT + TITLE_GAP + WORD_GAP + BODY_GAP + Math.max(lines - 1, 0) * LINE + FOOTER + PAD;

/** Нарисовать открытку и отдать файл JPEG: PNG иллюстрации весил бы в разы больше. */
export async function postcardFile(card: Postcard, ru: string, base: string): Promise<File> {
  // Шрифты сайта разбиты по алфавитам: без образца текста браузер подгрузил бы только латиницу,
  // и кириллица на холсте ушла бы в запасной шрифт.
  await Promise.all([
    document.fonts.load(FONTS.title, card.title),
    document.fonts.load(FONTS.word, card.de),
    document.fonts.load(FONTS.ru, ru),
    document.fonts.load(FONTS.body, card.text),
    document.fonts.load(FONTS.brand, "stunning deutsch"),
    document.fonts.load(FONTS.site, SITE),
  ]);
  const picture = new Image();
  picture.src = `${base}${postcardPictures(card.id).full}`;
  await picture.decode();

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  ctx.font = FONTS.body;
  const lines = wrapLines(card.text, INNER, (s) => ctx.measureText(s).width);
  // Новый размер холста сбрасывает состояние контекста, поэтому шрифты задаются уже после него.
  canvas.width = WIDTH;
  canvas.height = cardHeight(lines.length);

  ctx.fillStyle = "#f5efe3";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#d9ccb2";
  ctx.lineWidth = 2;
  ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(PAD, PAD, INNER, IMAGE_HEIGHT, 12);
  ctx.clip();
  ctx.drawImage(picture, PAD, PAD, INNER, IMAGE_HEIGHT);
  ctx.restore();

  let y = PAD + IMAGE_HEIGHT + TITLE_GAP;
  ctx.fillStyle = "#1f2326";
  ctx.font = FONTS.title;
  ctx.fillText(card.title, PAD, y);

  y += WORD_GAP;
  ctx.fillStyle = "#1d3a5f";
  ctx.font = FONTS.word;
  ctx.fillText(card.de, PAD, y);
  const after = PAD + ctx.measureText(card.de).width;
  ctx.fillStyle = "#4b5154";
  ctx.font = FONTS.ru;
  ctx.fillText(` — ${ru}`, after, y);

  y += BODY_GAP;
  ctx.fillStyle = "#2b3033";
  ctx.font = FONTS.body;
  for (const line of lines) {
    ctx.fillText(line, PAD, y);
    y += LINE;
  }

  const footer = canvas.height - PAD;
  ctx.strokeStyle = "#d9ccb2";
  ctx.beginPath();
  ctx.moveTo(PAD, footer - 52);
  ctx.lineTo(WIDTH - PAD, footer - 52);
  ctx.stroke();
  ctx.fillStyle = "#f2c14e";
  ctx.fillRect(PAD, footer - 16, 30, 6);
  ctx.fillStyle = "#1f2326";
  ctx.font = FONTS.brand;
  ctx.fillText("stunning deutsch", PAD + 44, footer - 4);
  ctx.fillStyle = "#6b7075";
  ctx.font = FONTS.site;
  ctx.textAlign = "right";
  ctx.fillText(SITE, WIDTH - PAD, footer - 6);

  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Холст не отдал картинку"))), "image/jpeg", 0.9),
  );
  return new File([blob], `stunning-deutsch-${card.id}.jpg`, { type: "image/jpeg" });
}

/**
 * Сохранить готовую открытку. На телефоне и планшете — меню «Поделиться» с «Сохранить изображение»; на
 * компьютере ждут обычного скачивания, даже если браузер тоже умеет делиться файлами. Меню вызывается прямо
 * из нажатия: Safari на iPhone отказывает, если между нажатием и вызовом шло ожидание, поэтому файл готов
 * заранее. Закрытое меню — не ошибка.
 */
export async function savePostcard(file: File) {
  if (matchMedia("(pointer: coarse)").matches && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file] });
      return;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
  }
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
