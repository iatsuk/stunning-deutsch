// Данные для Impressum и Datenschutzerklärung. В репозитории их нет: они подставляются при сборке
// из переменных окружения VITE_LEGAL_*.
// - GitHub Pages: Settings → Secrets and variables → Actions → Variables
//   (LEGAL_NAME, LEGAL_STREET, LEGAL_CITY, LEGAL_EMAIL), см. .github/workflows/pages.yml.
// - Локально: файл .env.local с VITE_LEGAL_NAME=… и т. д. (он в .gitignore).
// Пока поле не задано, на странице стоит метка ЗАПОЛНИТЬ, и workflow не публикует сайт.
// Адрес должен годиться для вручения документов (ladungsfähige Anschrift): улица и дом
// или адрес c/o-сервиса; абонентский ящик не подходит.

const env = import.meta.env;

function field(value: string | undefined, label: string) {
  return value?.trim() || `ЗАПОЛНИТЬ: ${label}`;
}

export const LEGAL = {
  name: field(env.VITE_LEGAL_NAME, "имя"),
  street: field(env.VITE_LEGAL_STREET, "улица и номер дома"),
  city: field(env.VITE_LEGAL_CITY, "индекс и город"),
  country: "Deutschland",
  email: field(env.VITE_LEGAL_EMAIL, "email"),
  updated: "Oktober 2026",
};
