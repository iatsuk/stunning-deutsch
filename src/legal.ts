// Данные для Impressum и Datenschutzerklärung. В отслеживаемых файлах их нет: они подставляются
// при сборке из трёх переменных, как в deelstuff.
// - GitHub Pages: Settings → Secrets and variables → Actions → Variables
//   (LEGAL_NAME, LEGAL_ADDRESS, LEGAL_EMAIL), см. .github/workflows/pages.yml. В LEGAL_ADDRESS —
//   настоящие переводы строк.
// - Локально: .env.local с правами 0600 (он в .gitignore), образец — .env.example. Там адрес
//   записывается в двойных кавычках с \n между строками.
// Пока поле не задано, на странице стоит метка ЗАПОЛНИТЬ, и workflow не публикует сайт.
// Адрес должен годиться для вручения документов (ladungsfähige Anschrift): улица и дом
// или адрес c/o-сервиса; абонентский ящик не подходит.

const env = import.meta.env;

function field(value: string | undefined, label: string) {
  return value?.trim() || `ЗАПОЛНИТЬ: ${label}`;
}

const address = (env.LEGAL_ADDRESS as string | undefined)
  ?.split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

export const LEGAL = {
  name: field(env.LEGAL_NAME, "имя"),
  /** Строки адреса; при c/o-адресе первая строка — «c/o …». */
  address: address?.length ? address : ["ЗАПОЛНИТЬ: адрес"],
  email: field(env.LEGAL_EMAIL, "email"),
  updated: "November 2026",
};

/** Адрес c/o-сервиса: письма принимает почтовый сервис, а не владелец лично. */
export const careOfAddress = LEGAL.address.some((line) => /^c\/o\b/i.test(line));
