# Индекс покрытия A1

Сгенерирован `scripts/a1-index.mjs` при `pnpm content`; не редактируйте вручную. Правила подсчёта и
решения автора — `A1-PLAN.md`, эталон — `content/reference/start-deutsch-1.yaml`.

Слово закреплено: не меньше 4 встреч в новой версии Moin, не меньше чем в 3 главах, из них 1 в
действии и 1 на слух. Правило — 6 встреч в 4 главах, 2 в действии, 2 на слух. Числа в
таблицах: встреч · глав · действий · на слух. Раунд перед главой — часть главы. Столбец «Откуда»: номера уроков A1
«экз.» для словаря экзамена и «проб.» для слов пробника вне словаря. Внутри разделов слова сгруппированы по частям речи
и идут по алфавиту.

Разделы: [Сводка](#сводка) · [Грамматика](#грамматика) · [Слова: нет](#слова-нет) · [Слова: один раз](#слова-один-раз) · [Слова: слабо](#слова-слабо) · [Слова: закрепит A2](#слова-закрепит-a2) · [Слова: закреплено](#слова-закреплено)

## Сводка

| Что | закреплено | закрепит A2 | слабо | один раз | нет |
|---|---|---|---|---|---|
| Все обязательные слова (970) | 890 | 80 | 0 | 0 | 0 |
| из них словарь экзамена | 724 | 59 | 0 | 0 | 0 |
| из них слова уроков | 423 | 33 | 0 | 0 | 0 |
| Грамматика (66) | 66 | 0 | 0 | 0 | 0 |

«Закрепит A2» — слова, которые игрок впервые встречает в главе 11 или позже: в A1 за ними идут одна-две главы, и до порога их доводит сезон A2.

В очереди повторения новой версии 752 обязательных слов, из них ниже порога 64. Повторение в порог не входит; в таблицах такие слова помечены ↻.

| Часть речи | закреплено | закрепит A2 | слабо | один раз | нет |
|---|---|---|---|---|---|
| Существительные | 402 | 39 | 0 | 0 | 0 |
| Глаголы | 149 | 13 | 0 | 0 | 0 |
| Прилагательные и наречия | 105 | 11 | 0 | 0 | 0 |
| Служебные слова | 82 | 0 | 0 | 0 | 0 |
| Выражения | 56 | 7 | 0 | 0 | 0 |
| Числа, время, цвета и другие группы | 96 | 10 | 0 | 0 | 0 |

## Грамматика

### Глагол

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Präsens, окончания по лицам | закреплено | 586 · 13 · 437 · 314 | есть | [01-s1](src/story/scenes/01.ts#L54) [01-s2](src/story/scenes/01.ts#L168) [01-s3](src/story/scenes/01.ts#L223) [01-i1](src/story/scenes/01.ts#L387) [01-s4](src/story/scenes/01.ts#L424) [01-s5](src/story/scenes/01.ts#L509) |
| Präsens со сменой корня (e → i, a → ä) | закреплено | 122 · 12 · 45 · 56 | есть | [01-s3](src/story/scenes/01.ts#L223) [01-s4](src/story/scenes/01.ts#L425) [01-s5](src/story/scenes/01.ts#L505) [02-s4](src/story/scenes/02.ts#L474) [04-s2](src/story/scenes/04.ts#L242) [04-s3](src/story/scenes/04.ts#L393) |
| sein | закреплено | 654 · 13 · 282 · 337 | есть | [01-s1](src/story/scenes/01.ts#L35) [01-s2](src/story/scenes/01.ts#L156) |
| haben | закреплено | 259 · 12 · 125 · 140 | есть | [02-s1](src/story/scenes/02.ts#L56) [02-s2](src/story/scenes/02.ts#L151) [02-s3](src/story/scenes/02.ts#L236) [02-i1](src/story/scenes/02.ts#L405) |
| Отделяемые приставки и рамка предложения | закреплено | 66 · 10 · 36 · 30 | есть | [01-s3](src/story/scenes/01.ts#L223) [05-s3](src/story/scenes/05.ts#L314) [05-s4](src/story/scenes/05.ts#L498) [06-s2](src/story/scenes/06.ts#L225) [06-s3](src/story/scenes/06.ts#L298) |
| Perfekt с haben | закреплено | 77 · 5 · 44 · 38 | есть | [10-s1](src/story/scenes/10.ts#L59) [11-s1](src/story/scenes/11.ts#L38) [11-i1](src/story/scenes/11.ts#L162) [11-s2](src/story/scenes/11.ts#L199) |
| Perfekt с sein | закреплено | 23 · 4 · 17 · 9 | есть | [09-s4](src/story/scenes/09.ts#L505) [11-s2](src/story/scenes/11.ts#L219) [12-s1](src/story/scenes/12.ts#L151) [12-s2](src/story/scenes/12.ts#L174) [12-s3](src/story/scenes/12.ts#L28) [12-s5](src/story/scenes/12.ts#L587) |
| Präteritum war и hatte | закреплено | 30 · 5 · 15 · 10 | есть | [09-s1](src/story/scenes/09.ts#L64) [09-i1](src/story/scenes/09.ts#L277) [10-s1](src/story/scenes/10.ts#L58) [11-i1](src/story/scenes/11.ts#L162) [11-s2](src/story/scenes/11.ts#L219) [11-s3](src/story/scenes/11.ts#L301) |
| möchten | закреплено | 18 · 5 · 11 · 11 | есть | [04-s1](src/story/scenes/04.ts#L53) [04-s2](src/story/scenes/04.ts#L169) [04-s5](src/story/scenes/04.ts#L573) [04-s6](src/story/scenes/04.ts#L698) [08-s1](src/story/scenes/08.ts#L103) [10-s6](src/story/scenes/10.ts#L674) |
| Ich hätte gern …, Ich würde gern … как готовые выражения | закреплено | 7 · 4 · 4 · 3 | есть | [04-s4](src/story/scenes/04.ts#L465) [07-s5](src/story/scenes/07.ts#L559) [12-s3](src/story/scenes/12.ts#L304) [13-s4](src/story/scenes/13.ts#L426) |
| können | закреплено | 39 · 5 · 24 · 18 | есть | [07-s1](src/story/scenes/07.ts#L40) [07-s2](src/story/scenes/07.ts#L181) |
| wollen | закреплено | 29 · 5 · 14 · 10 | есть | [07-s1](src/story/scenes/07.ts#L45) [07-s2](src/story/scenes/07.ts#L195) [07-s3](src/story/scenes/07.ts#L300) [07-s4](src/story/scenes/07.ts#L515) [07-s5](src/story/scenes/07.ts#L558) |
| müssen | закреплено | 17 · 5 · 8 · 4 | есть | [08-s4](src/story/scenes/08.ts#L570) [10-s1](src/story/scenes/10.ts#L84) [10-s3](src/story/scenes/10.ts#L278) [10-s4](src/story/scenes/10.ts#L456) [10-s5](src/story/scenes/10.ts#L552) [10-s6](src/story/scenes/10.ts#L674) |
| dürfen | закреплено | 29 · 5 · 16 · 6 | есть | [09-s2](src/story/scenes/09.ts#L223) [10-s1](src/story/scenes/10.ts#L84) [10-s2](src/story/scenes/10.ts#L174) [10-s3](src/story/scenes/10.ts#L258) [10-s4](src/story/scenes/10.ts#L29) |
| sollen | закреплено | 19 · 4 · 13 · 11 | есть | [10-s4](src/story/scenes/10.ts#L30) [10-s5](src/story/scenes/10.ts#L587) [10-s6](src/story/scenes/10.ts#L31) [11-s5](src/story/scenes/11.ts#L29) |
| mögen | закреплено | 12 · 4 · 4 · 5 | есть | [07-s3](src/story/scenes/07.ts#L411) [07-s4](src/story/scenes/07.ts#L501) [08-s1](src/story/scenes/08.ts#L103) [12-s3](src/story/scenes/12.ts#L304) [12-s6](src/story/scenes/12.ts#L661) [13-s5](src/story/scenes/13.ts#L490) |
| Модальный глагол и инфинитив в конце | закреплено | 74 · 8 · 40 · 29 | есть | [04-s6](src/story/scenes/04.ts#L698) [07-s1](src/story/scenes/07.ts#L45) [07-s2](src/story/scenes/07.ts#L195) [07-s3](src/story/scenes/07.ts#L300) [07-s4](src/story/scenes/07.ts#L515) [07-s5](src/story/scenes/07.ts#L559) |
| Повелительное наклонение на Sie | закреплено | 368 · 12 · 355 · 199 | есть | [02-s1](src/story/scenes/02.ts#L33) [02-s2](src/story/scenes/02.ts#L147) [02-s3](src/story/scenes/02.ts#L247) |
| Повелительное наклонение на du | закреплено | 67 · 11 · 27 · 43 | есть | [02-s3](src/story/scenes/02.ts#L382) [02-s4](src/story/scenes/02.ts#L501) [03-s6](src/story/scenes/03.ts#L790) [05-s1](src/story/scenes/05.ts#L90) [05-s3](src/story/scenes/05.ts#L314) [05-s6](src/story/scenes/05.ts#L738) |
| Повелительное наклонение на ihr | закреплено | 16 · 6 · 8 · 8 | есть | [06-s1](src/story/scenes/06.ts#L35) [07-s1](src/story/scenes/07.ts#L95) [07-s4](src/story/scenes/07.ts#L481) [08-s1](src/story/scenes/08.ts#L85) [09-s2](src/story/scenes/09.ts#L195) [09-s3](src/story/scenes/09.ts#L346) |

### Предложение

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Глагол на втором месте, время на первом | закреплено | 89 · 13 · 45 · 43 | есть | [01-s1](src/story/scenes/01.ts#L127) [01-s3](src/story/scenes/01.ts#L240) [01-s6](src/story/scenes/01.ts#L653) [02-s2](src/story/scenes/02.ts#L204) [02-s3](src/story/scenes/02.ts#L236) [03-s3](src/story/scenes/03.ts#L281) |
| Вопрос с W-словом | закреплено | 227 · 13 · 156 · 95 | есть | [01-s1](src/story/scenes/01.ts#L45) [01-s2](src/story/scenes/01.ts#L156) [01-s3](src/story/scenes/01.ts#L223) |
| Вопрос да/нет и ответ ja / nein / doch | закреплено | 81 · 13 · 62 · 26 | есть | [01-s6](src/story/scenes/01.ts#L653) [02-s1](src/story/scenes/02.ts#L52) [02-s3](src/story/scenes/02.ts#L232) [02-i1](src/story/scenes/02.ts#L421) [02-s4](src/story/scenes/02.ts#L441) [02-s5](src/story/scenes/02.ts#L599) |
| nicht и kein | закреплено | 295 · 13 · 134 · 125 | есть | [01-s1](src/story/scenes/01.ts#L148) [01-s3](src/story/scenes/01.ts#L223) [01-s5](src/story/scenes/01.ts#L542) [02-s2](src/story/scenes/02.ts#L208) [02-s4](src/story/scenes/02.ts#L527) [02-s5](src/story/scenes/02.ts#L599) |
| und, oder, aber | закреплено | 491 · 13 · 341 · 318 | есть | [01-s3](src/story/scenes/01.ts#L223) [01-i1](src/story/scenes/01.ts#L391) [01-s4](src/story/scenes/01.ts#L418) [01-s6](src/story/scenes/01.ts#L603) [02-s1](src/story/scenes/02.ts#L33) [02-s2](src/story/scenes/02.ts#L147) |
| denn как союз причины | закреплено | 9 · 6 · 3 · 7 | есть | [07-s1](src/story/scenes/07.ts#L64) [07-s2](src/story/scenes/07.ts#L195) [08-s6](src/story/scenes/08.ts#L757) [09-s2](src/story/scenes/09.ts#L177) [10-s4](src/story/scenes/10.ts#L402) [12-s4](src/story/scenes/12.ts#L495) |
| dann | закреплено | 28 · 8 · 7 · 12 | есть | [06-s5](src/story/scenes/06.ts#L616) [06-s6](src/story/scenes/06.ts#L771) [07-s2](src/story/scenes/07.ts#L275) [08-s6](src/story/scenes/08.ts#L761) [09-s1](src/story/scenes/09.ts#L59) [09-s2](src/story/scenes/09.ts#L237) |
| wenn (понимание) | закреплено | 6 · 4 · 2 · 4 | есть | [10-s4](src/story/scenes/10.ts#L466) [11-s5](src/story/scenes/11.ts#L563) [12-s2](src/story/scenes/12.ts#L179) [13-s6](src/story/scenes/13.ts#L626) |
| es gibt | закреплено | 12 · 6 · 3 · 7 | есть | [05-s2](src/story/scenes/05.ts#L206) [07-s1](src/story/scenes/07.ts#L39) [07-s3](src/story/scenes/07.ts#L312) [08-s1](src/story/scenes/08.ts#L88) [09-s1](src/story/scenes/09.ts#L86) [12-s6](src/story/scenes/12.ts#L711) |

### Существительное и артикль

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Множественное число | закреплено | 234 · 13 · 90 · 106 | есть | [01-s3](src/story/scenes/01.ts#L223) [01-s6](src/story/scenes/01.ts#L603) [02-s1](src/story/scenes/02.ts#L120) [02-s2](src/story/scenes/02.ts#L209) [02-s3](src/story/scenes/02.ts#L232) [02-i1](src/story/scenes/02.ts#L416) |
| Винительный падеж | закреплено | 284 · 12 · 214 · 131 | есть | [02-s1](src/story/scenes/02.ts#L66) [02-s2](src/story/scenes/02.ts#L204) [02-s3](src/story/scenes/02.ts#L256) [02-s4](src/story/scenes/02.ts#L458) [02-s5](src/story/scenes/02.ts#L585) [03-s1](src/story/scenes/03.ts#L50) |
| Дательный на вопрос «где?» (in, auf, an) | закреплено | 237 · 12 · 86 · 71 | есть | [01-s6](src/story/scenes/01.ts#L653) [03-s4](src/story/scenes/03.ts#L490) [03-s5](src/story/scenes/03.ts#L654) [03-s6](src/story/scenes/03.ts#L839) [04-s1](src/story/scenes/04.ts#L135) [04-s2](src/story/scenes/04.ts#L168) |
| Предлоги с дательным (mit, zu, bei, von, aus, nach) | закреплено | 143 · 12 · 69 · 55 | есть | [01-s1](src/story/scenes/01.ts#L20) [01-s3](src/story/scenes/01.ts#L223) [01-s5](src/story/scenes/01.ts#L571) [01-s6](src/story/scenes/01.ts#L635) [02-s3](src/story/scenes/02.ts#L247) [03-s2](src/story/scenes/03.ts#L223) |
| Чей? Имя + s (Annas Bruder) | закреплено | 25 · 10 · 14 · 10 | есть | [01-s2](src/story/scenes/01.ts#L189) [01-s5](src/story/scenes/01.ts#L504) [02-s1](src/story/scenes/02.ts#L120) [03-s1](src/story/scenes/03.ts#L66) [03-s3](src/story/scenes/03.ts#L299) [03-s4](src/story/scenes/03.ts#L501) |
| Сложные слова: род по последней части | закреплено | 247 · 13 · 141 · 108 | есть | [01-s1](src/story/scenes/01.ts#L83) [02-s1](src/story/scenes/02.ts#L84) [02-s2](src/story/scenes/02.ts#L137) [02-s3](src/story/scenes/02.ts#L247) [02-s6](src/story/scenes/02.ts#L681) [03-s3](src/story/scenes/03.ts#L281) |
| Женский род на -in | закреплено | 55 · 9 · 36 · 34 | есть | [03-s3](src/story/scenes/03.ts#L413) [03-s4](src/story/scenes/03.ts#L476) [03-s5](src/story/scenes/03.ts#L634) [04-s6](src/story/scenes/04.ts#L876) [05-s2](src/story/scenes/05.ts#L869) |
| dieser, diese, dieses | закреплено | 6 · 5 · 2 · 4 | есть | [05-i1](src/story/scenes/05.ts#L451) [08-s3](src/story/scenes/08.ts#L457) [09-s2](src/story/scenes/09.ts#L195) [10-s2](src/story/scenes/10.ts#L174) [13-s5](src/story/scenes/13.ts#L490) |
| Притяжательные mein, dein, sein, ihr, unser, euer, Ihr | закреплено | 112 · 13 · 59 · 69 | есть | [01-s1](src/story/scenes/01.ts#L123) [01-i1](src/story/scenes/01.ts#L386) [02-s3](src/story/scenes/02.ts#L382) [02-s6](src/story/scenes/02.ts#L681) [03-s1](src/story/scenes/03.ts#L45) [03-s2](src/story/scenes/03.ts#L158) |
| welcher, welche, welches | закреплено | 36 · 13 · 30 · 13 | есть | [01-s3](src/story/scenes/01.ts#L223) [02-s3](src/story/scenes/02.ts#L243) [02-s6](src/story/scenes/02.ts#L704) [03-s4](src/story/scenes/03.ts#L541) [04-s4](src/story/scenes/04.ts#L532) [04-s6](src/story/scenes/04.ts#L733) |

### Местоимения

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Местоимения в винительном (mich, dich, ihn …) | закреплено | 38 · 9 · 16 · 23 | есть | [02-s4](src/story/scenes/02.ts#L458) [05-s2](src/story/scenes/05.ts#L181) [05-s4](src/story/scenes/05.ts#L579) [05-s5](src/story/scenes/05.ts#L601) [05-s6](src/story/scenes/05.ts#L813) [06-s1](src/story/scenes/06.ts#L152) |
| Местоимения в дательном (mir, dir, ihm, Ihnen) | закреплено | 25 · 9 · 12 · 13 | есть | [01-s1](src/story/scenes/01.ts#L76) [01-s3](src/story/scenes/01.ts#L223) [06-s5](src/story/scenes/06.ts#L635) [07-s3](src/story/scenes/07.ts#L425) [07-s5](src/story/scenes/07.ts#L558) [07-i1](src/story/scenes/07.ts#L680) |
| Глаголы с дательным (gehören, gefallen, helfen, danken, geben) | закреплено | 20 · 9 · 10 · 11 | есть | [04-i1](src/story/scenes/04.ts#L415) [06-s6](src/story/scenes/06.ts#L748) [07-s3](src/story/scenes/07.ts#L424) [07-s5](src/story/scenes/07.ts#L589) [07-s6](src/story/scenes/07.ts#L860) [08-s2](src/story/scenes/08.ts#L183) |
| sich, uns (Wir sehen uns) | закреплено | 26 · 13 · 20 · 22 | есть | [01-s6](src/story/scenes/01.ts#L612) [02-s6](src/story/scenes/02.ts#L681) [03-s6](src/story/scenes/03.ts#L821) [04-s6](src/story/scenes/04.ts#L772) [05-s6](src/story/scenes/05.ts#L783) [06-s1](src/story/scenes/06.ts#L151) |
| Вопросы wen? и wem? | закреплено | 8 · 5 · 3 · 5 | есть | [08-s2](src/story/scenes/08.ts#L183) [09-s6](src/story/scenes/09.ts#L743) [10-s3](src/story/scenes/10.ts#L254) [12-s3](src/story/scenes/12.ts#L292) [13-s6](src/story/scenes/13.ts#L608) |
| man | закреплено | 14 · 5 · 4 · 5 | есть | [07-s1](src/story/scenes/07.ts#L40) [09-s2](src/story/scenes/09.ts#L172) [10-s2](src/story/scenes/10.ts#L174) [12-s2](src/story/scenes/12.ts#L180) [12-s3](src/story/scenes/12.ts#L279) [12-s6](src/story/scenes/12.ts#L711) |
| etwas, nichts, alles, mehr | закреплено | 91 · 12 · 31 · 45 | есть | [01-s2](src/story/scenes/01.ts#L168) [03-s3](src/story/scenes/03.ts#L281) [04-s2](src/story/scenes/04.ts#L219) [04-s3](src/story/scenes/04.ts#L301) [04-s4](src/story/scenes/04.ts#L508) [04-s5](src/story/scenes/04.ts#L577) |

### Прилагательное и числа

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Прилагательное после sein (zu groß) | закреплено | 108 · 13 · 41 · 59 | есть | [01-s2](src/story/scenes/01.ts#L168) [01-s4](src/story/scenes/01.ts#L439) [02-s5](src/story/scenes/02.ts#L561) [03-s2](src/story/scenes/03.ts#L247) [03-s4](src/story/scenes/03.ts#L541) [04-s2](src/story/scenes/04.ts#L231) |
| gern, lieber, am liebsten | закреплено | 28 · 8 · 18 · 14 | есть | [04-s3](src/story/scenes/04.ts#L301) [04-s4](src/story/scenes/04.ts#L465) [04-s6](src/story/scenes/04.ts#L772) [07-s1](src/story/scenes/07.ts#L91) [07-s3](src/story/scenes/07.ts#L407) [07-s4](src/story/scenes/07.ts#L468) |
| Сравнение (besser, mehr, als) | закреплено | 19 · 9 · 12 · 10 | есть | [04-s1](src/story/scenes/04.ts#L63) [06-s6](src/story/scenes/06.ts#L908) [07-s2](src/story/scenes/07.ts#L814) [07-s3](src/story/scenes/07.ts#L312) [08-s3](src/story/scenes/08.ts#L388) [10-s3](src/story/scenes/10.ts#L258) |
| Цены и количества | закреплено | 92 · 11 · 50 · 35 | есть | [02-s6](src/story/scenes/02.ts#L714) [03-s2](src/story/scenes/03.ts#L227) [03-i1](src/story/scenes/03.ts#L227) [03-s6](src/story/scenes/03.ts#L751) [04-s3](src/story/scenes/04.ts#L301) [04-s4](src/story/scenes/04.ts#L495) |
| Время на часах | закреплено | 181 · 10 · 87 · 71 | есть | [02-s5](src/story/scenes/02.ts#L585) [04-s2](src/story/scenes/04.ts#L168) [04-s3](src/story/scenes/04.ts#L297) [04-s4](src/story/scenes/04.ts#L460) [06-s1](src/story/scenes/06.ts#L36) |
| Порядковые числа и дата | закреплено | 44 · 10 · 24 · 16 | есть | [04-s1](src/story/scenes/04.ts#L36) [06-s6](src/story/scenes/06.ts#L908) [07-s2](src/story/scenes/07.ts#L814) [08-s2](src/story/scenes/08.ts#L233) [08-i1](src/story/scenes/08.ts#L281) [08-s3](src/story/scenes/08.ts#L336) |

### Предлоги

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| um, am, im, von … bis во времени | закреплено | 151 · 9 · 75 · 63 | есть | [05-s6](src/story/scenes/05.ts#L813) [06-s1](src/story/scenes/06.ts#L36) [06-s2](src/story/scenes/06.ts#L179) |
| ab и für во времени (ab Montag, für zwei Wochen) | закреплено | 13 · 6 · 7 · 2 | есть | [08-s3](src/story/scenes/08.ts#L388) [09-s2](src/story/scenes/09.ts#L175) [10-s3](src/story/scenes/10.ts#L255) [10-s4](src/story/scenes/10.ts#L477) [11-s5](src/story/scenes/11.ts#L552) [12-s3](src/story/scenes/12.ts#L289) |
| nach и vor во времени (nach dem Essen) | закреплено | 10 · 5 · 5 · 5 | есть | [08-s6](src/story/scenes/08.ts#L737) [09-s2](src/story/scenes/09.ts#L175) [10-s3](src/story/scenes/10.ts#L255) [10-s4](src/story/scenes/10.ts#L477) [12-s4](src/story/scenes/12.ts#L482) [13-s5](src/story/scenes/13.ts#L480) |
| über (über zwanzig Minuten) | закреплено | 7 · 4 · 4 · 3 | есть | [09-s2](src/story/scenes/09.ts#L175) [10-s3](src/story/scenes/10.ts#L254) [10-s4](src/story/scenes/10.ts#L478) [12-s3](src/story/scenes/12.ts#L304) [13-s2](src/story/scenes/13.ts#L210) |
| nach Hause / zu Hause | закреплено | 19 · 5 · 11 · 6 | есть | [07-s2](src/story/scenes/07.ts#L159) [09-s5](src/story/scenes/09.ts#L687) [09-s6](src/story/scenes/09.ts#L742) [10-s4](src/story/scenes/10.ts#L30) [12-s1](src/story/scenes/12.ts#L122) |
| in, an, auf + винительный для направления (in die Stadt) | закреплено | 49 · 10 · 23 · 17 | есть | [03-s4](src/story/scenes/03.ts#L529) [04-s2](src/story/scenes/04.ts#L251) [04-s5](src/story/scenes/04.ts#L587) [06-s2](src/story/scenes/06.ts#L221) [06-s5](src/story/scenes/06.ts#L639) [06-s6](src/story/scenes/06.ts#L793) |
| unter | закреплено | 10 · 5 · 4 · 5 | есть | [04-s3](src/story/scenes/04.ts#L301) [04-s6](src/story/scenes/04.ts#L743) [08-s2](src/story/scenes/08.ts#L214) [09-s2](src/story/scenes/09.ts#L235) [11-s2](src/story/scenes/11.ts#L219) [13-s6](src/story/scenes/13.ts#L586) |
| ohne и für (ohne dich, für meinen Freund) | закреплено | 56 · 13 · 26 · 15 | есть | [01-s1](src/story/scenes/01.ts#L148) [02-s2](src/story/scenes/02.ts#L208) [02-s4](src/story/scenes/02.ts#L458) [03-s4](src/story/scenes/03.ts#L489) [03-s5](src/story/scenes/03.ts#L706) [04-s1](src/story/scenes/04.ts#L160) |

### Словообразование

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Существительные на -ung | закреплено | 141 · 12 · 78 · 64 | есть | [02-s2](src/story/scenes/02.ts#L137) [02-s3](src/story/scenes/02.ts#L247) [02-s5](src/story/scenes/02.ts#L663) [04-s2](src/story/scenes/04.ts#L235) [04-s3](src/story/scenes/04.ts#L301) [04-s4](src/story/scenes/04.ts#L511) |
| Прилагательные с un-, -los, -bar | закреплено | 8 · 5 · 5 · 6 | есть | [08-s6](src/story/scenes/08.ts#L910) [09-s2](src/story/scenes/09.ts#L887) [09-s4](src/story/scenes/09.ts#L505) [11-s1](src/story/scenes/11.ts#L74) [12-s4](src/story/scenes/12.ts#L496) [13-s6](src/story/scenes/13.ts#L586) |
| hellblau, dunkelblau | закреплено | 28 · 6 · 11 · 3 | есть | [05-s2](src/story/scenes/05.ts#L262) [05-s3](src/story/scenes/05.ts#L314) [05-s5](src/story/scenes/05.ts#L610) [05-s6](src/story/scenes/05.ts#L732) [06-s2](src/story/scenes/06.ts#L209) [06-i1](src/story/scenes/06.ts#L468) |
| Причастие как прилагательное (geöffnet, geschlossen) | закреплено | 9 · 6 · 6 · 5 | есть | [06-s3](src/story/scenes/06.ts#L298) [08-s4](src/story/scenes/08.ts#L570) [10-s5](src/story/scenes/10.ts#L538) [12-s3](src/story/scenes/12.ts#L304) [09-разминка](src/story/scenes/warmups.ts#L109) [11-разминка](src/story/scenes/warmups.ts#L87) |
| Погода с es (Es regnet) | закреплено | 30 · 6 · 8 · 8 | есть | [05-s1](src/story/scenes/05.ts#L40) [06-s6](src/story/scenes/06.ts#L736) [09-s1](src/story/scenes/09.ts#L41) [09-i1](src/story/scenes/09.ts#L291) [09-s3](src/story/scenes/09.ts#L331) [11-s1](src/story/scenes/11.ts#L142) |
| Ich habe …schmerzen, … tut weh | закреплено | 16 · 4 · 8 · 11 | есть | [10-s1](src/story/scenes/10.ts#L40) [10-s2](src/story/scenes/10.ts#L124) [10-s6](src/story/scenes/10.ts#L680) [11-s3](src/story/scenes/11.ts#L301) [12-s3](src/story/scenes/12.ts#L304) [13-s2](src/story/scenes/13.ts#L210) |

## Слова: нет

0 слов.

## Слова: один раз

0 слов.

## Слова: слабо

0 слов.

## Слова: закрепит A2

80 слов.

### Существительные (39)

| Слово | Откуда | Числа | Где в новой версии | Уроки |
|---|---|---|---|---|
| der Abflug (от fliegen) ↻ | экз. | 2 · 2 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L211) [13-s2](src/story/scenes/13.ts#L661) | — |
| die Abreise | 12 | 2 · 1 · 1 · 1 | [12-s3](src/story/scenes/12.ts#L304) | [12](content/a1/12-reisen.yaml#L112) |
| die Anreise ↻ | 12 | 4 · 2 · 3 · 3 | [12-s3](src/story/scenes/12.ts#L304) [12-s6](src/story/scenes/12.ts#L731) [13-s6](src/story/scenes/13.ts#L707) | [12](content/a1/12-reisen.yaml#L111) |
| der Anschluss ↻ | экз. | 3 · 2 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L304) [13-s6](src/story/scenes/13.ts#L707) | — |
| der Arbeitsplatz ↻ | экз. | 3 · 3 · 2 · 2 | [11-s1](src/story/scenes/11.ts#L131) [12-s2](src/story/scenes/12.ts#L789) [13-s2](src/story/scenes/13.ts#L661) | — |
| der Bogen ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L574) [12-s2](src/story/scenes/12.ts#L789) [13-s5](src/story/scenes/13.ts#L698) | — |
| der Chef ↻ | экз. | 3 · 3 · 2 · 2 | [11-s1](src/story/scenes/11.ts#L131) [12-s2](src/story/scenes/12.ts#L789) [13-s5](src/story/scenes/13.ts#L698) | — |
| das Datum ↻ | 12, экз. | 3 · 2 · 3 · 1 | [12-s3](src/story/scenes/12.ts#L304) [13-s6](src/story/scenes/13.ts#L707) | [12](content/a1/12-reisen.yaml#L130) |
| das Doppelzimmer ↻ | 12, экз. | 3 · 2 · 3 · 1 | [12-s3](src/story/scenes/12.ts#L304) [13-s6](src/story/scenes/13.ts#L707) | [12](content/a1/12-reisen.yaml#L106) |
| der Drucker (от drucken) ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L637) [12-s2](src/story/scenes/12.ts#L789) [13-s5](src/story/scenes/13.ts#L698) | — |
| das Einzelzimmer ↻ | 12, экз. | 10 · 2 · 7 · 4 | [12-s1](src/story/scenes/12.ts#L136) [12-s3](src/story/scenes/12.ts#L304) [13-s3](src/story/scenes/13.ts#L291) [13-s4](src/story/scenes/13.ts#L410) | [12](content/a1/12-reisen.yaml#L36) |
| der Fehler ↻ | экз. | 3 · 3 · 2 · 2 | [11-s2](src/story/scenes/11.ts#L211) [12-s2](src/story/scenes/12.ts#L789) [13-s5](src/story/scenes/13.ts#L698) | — |
| die Ferien ↻ | 12 | 2 · 2 · 2 · 2 | [12-s6](src/story/scenes/12.ts#L732) [13-s3](src/story/scenes/13.ts#L670) | [12](content/a1/12-reisen.yaml#L148) |
| der Flughafen ↻ | 12, экз. | 3 · 2 · 3 · 3 | [12-s1](src/story/scenes/12.ts#L136) [12-s2](src/story/scenes/12.ts#L265) [13-s6](src/story/scenes/13.ts#L707) | [12](content/a1/12-reisen.yaml#L94) |
| der Friseur ↻ | 11 | 3 · 3 · 3 · 3 | [11-s1](src/story/scenes/11.ts#L134) [12-s5](src/story/scenes/12.ts#L816) [13-s5](src/story/scenes/13.ts#L698) | [11](content/a1/11-arbeit.yaml#L101) |
| das Gepäck ↻ | экз. | 3 · 2 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L304) [13-s6](src/story/scenes/13.ts#L707) | — |
| die Halbpension ↻ | экз. | 3 · 2 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L304) [13-s6](src/story/scenes/13.ts#L707) | — |
| das Hotel ↻ | 12, экз. | 21 · 2 · 12 · 6 | [12-s1](src/story/scenes/12.ts#L27) [12-s2](src/story/scenes/12.ts#L228) [12-s3](src/story/scenes/12.ts#L279) [12-s5](src/story/scenes/12.ts#L540) | [12](content/a1/12-reisen.yaml#L26) |
| der Informatiker ↻ | 11 | 3 · 3 · 3 · 3 | [11-s1](src/story/scenes/11.ts#L134) [12-s5](src/story/scenes/12.ts#L816) [13-s5](src/story/scenes/13.ts#L698) | [11](content/a1/11-arbeit.yaml#L103) |
| der Ingenieur ↻ | 11 | 3 · 3 · 3 · 3 | [11-s1](src/story/scenes/11.ts#L134) [12-s5](src/story/scenes/12.ts#L816) [13-s5](src/story/scenes/13.ts#L698) | [11](content/a1/11-arbeit.yaml#L100) |
| die Jahreszeit ↻ | 12 | 2 · 2 · 2 · 2 | [12-s2](src/story/scenes/12.ts#L265) [13-s2](src/story/scenes/13.ts#L661) | [12](content/a1/12-reisen.yaml#L130) |
| der Job ↻ | экз. | 2 · 2 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L76) [12-s5](src/story/scenes/12.ts#L816) | — |
| der Koffer ↻ | 12, экз. | 8 · 2 · 6 · 5 | [12-s1](src/story/scenes/12.ts#L78) [12-s2](src/story/scenes/12.ts#L265) [12-s3](src/story/scenes/12.ts#L279) [12-s6](src/story/scenes/12.ts#L731) [13-s2](src/story/scenes/13.ts#L661) | [12](content/a1/12-reisen.yaml#L99) |
| der Kugelschreiber ↻ | экз. | 2 · 2 · 1 · 1 | [11-s5](src/story/scenes/11.ts#L637) [12-s5](src/story/scenes/12.ts#L816) | — |
| das Lied | экз. | 11 · 2 · 5 · 4 | [11-s3](src/story/scenes/11.ts#L301) [11-s5](src/story/scenes/11.ts#L623) [13-s1](src/story/scenes/13.ts#L38) [13-s6](src/story/scenes/13.ts#L595) | — |
| die Papiere ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L575) [12-s6](src/story/scenes/12.ts#L825) [13-s6](src/story/scenes/13.ts#L707) | — |
| das Praktikum ↻ | экз. | 2 · 2 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L76) [12-s5](src/story/scenes/12.ts#L816) | — |
| der Regenschirm ↻ | 12 | 5 · 2 · 5 · 3 | [12-s1](src/story/scenes/12.ts#L41) [12-s6](src/story/scenes/12.ts#L731) [13-s2](src/story/scenes/13.ts#L661) | [12](content/a1/12-reisen.yaml#L70) |
| die Reise (от reisen) ↻ | 12, экз. | 7 · 2 · 4 · 5 | [12-s2](src/story/scenes/12.ts#L265) [12-s6](src/story/scenes/12.ts#L731) [13-s6](src/story/scenes/13.ts#L608) | [12](content/a1/12-reisen.yaml#L1) |
| das Reisebüro (от reisen) ↻ | экз. | 2 · 2 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L190) [13-s5](src/story/scenes/13.ts#L698) | — |
| der Reiseführer (от reisen) ↻ | экз. | 2 · 2 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L190) [13-s5](src/story/scenes/13.ts#L698) | — |
| die Rezeption | экз. | 1 · 1 · 0 · 0 | [12-s3](src/story/scenes/12.ts#L279) | — |
| das Studium ↻ | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L76) | — |
| die Verspätung ↻ | 12 | 12 · 2 · 6 · 7 | [12-s2](src/story/scenes/12.ts#L191) [12-s3](src/story/scenes/12.ts#L28) [12-s6](src/story/scenes/12.ts#L731) [13-s2](src/story/scenes/13.ts#L27) | [09](content/a1/09-stadt.yaml#L215) [12](content/a1/12-reisen.yaml#L48) |
| die Welt ↻ | экз. | 2 · 2 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L190) [13-s5](src/story/scenes/13.ts#L698) | — |
| das Wetter ↻ | 12, экз. | 6 · 2 · 5 · 5 | [12-s1](src/story/scenes/12.ts#L38) [12-s4](src/story/scenes/12.ts#L477) [12-s6](src/story/scenes/12.ts#L731) [13-s2](src/story/scenes/13.ts#L661) | [12](content/a1/12-reisen.yaml#L66) |
| der Wind | экз. | 3 · 1 · 1 · 2 | [12-s1](src/story/scenes/12.ts#L50) [12-s2](src/story/scenes/12.ts#L180) | [12](content/a1/12-reisen.yaml#L338) |
| die Zeitung | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L77) | — |
| der Zoll ↻ | экз. | 2 · 2 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L711) [13-s2](src/story/scenes/13.ts#L167) | — |

### Глаголы (13)

| Слово | Откуда | Числа | Где в новой версии | Уроки |
|---|---|---|---|---|
| abgeben ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L575) [12-s6](src/story/scenes/12.ts#L825) [13-s2](src/story/scenes/13.ts#L661) | — |
| anklicken ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L637) [12-s2](src/story/scenes/12.ts#L789) [13-s2](src/story/scenes/13.ts#L661) | — |
| ankommen | экз. | 3 · 1 · 2 · 1 | [12-s2](src/story/scenes/12.ts#L246) | [12](content/a1/12-reisen.yaml#L48) |
| bedeuten ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L639) [12-s2](src/story/scenes/12.ts#L789) [13-s2](src/story/scenes/13.ts#L661) | [08](content/a1/08-wohnen.yaml#L42) |
| benutzen ↻ | экз. | 3 · 3 · 2 · 2 | [11-s2](src/story/scenes/11.ts#L211) [12-s2](src/story/scenes/12.ts#L789) [13-s2](src/story/scenes/13.ts#L661) | [09](content/a1/09-stadt.yaml#L236) |
| besuchen | экз. | 1 · 1 · 1 · 0 | [11-s2](src/story/scenes/11.ts#L246) | [07](content/a1/07-freizeit.yaml#L64) |
| drucken ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L637) [12-s2](src/story/scenes/12.ts#L789) [13-s5](src/story/scenes/13.ts#L698) | — |
| freuen | экз. | 2 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L662) | — |
| reisen | экз. | 7 · 2 · 4 · 5 | [12-s2](src/story/scenes/12.ts#L265) [12-s6](src/story/scenes/12.ts#L731) [13-s6](src/story/scenes/13.ts#L608) | [12](content/a1/12-reisen.yaml#L1) |
| reservieren | 12 | 5 · 1 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L290) | [02](content/a1/02-zahlen.yaml#L914) [12](content/a1/12-reisen.yaml#L113) |
| scheinen | экз. | 4 · 2 · 1 · 0 | [12-s5](src/story/scenes/12.ts#L552) [13-s1](src/story/scenes/13.ts#L37) | [12](content/a1/12-reisen.yaml#L68) |
| übernachten ↻ | экз. | 3 · 2 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L304) [13-s3](src/story/scenes/13.ts#L670) | — |
| verdienen ↻ | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L76) | — |

### Прилагательные и наречия (11)

| Слово | Откуда | Числа | Где в новой версии | Уроки |
|---|---|---|---|---|
| arbeitslos | экз. | 1 · 1 · 0 · 1 | [11-s1](src/story/scenes/11.ts#L74) | — |
| ausländisch (от das Ausland) ↻ | экз. | 2 · 2 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L677) [13-s3](src/story/scenes/13.ts#L670) | — |
| bewölkt ↻ | 12 | 3 · 2 · 3 · 3 | [12-s4](src/story/scenes/12.ts#L477) [12-s6](src/story/scenes/12.ts#L732) [13-разминка](src/story/scenes/warmups.ts#L85) | [12](content/a1/12-reisen.yaml#L123) |
| fremd ↻ | экз. | 2 · 2 · 1 · 1 | [12-s5](src/story/scenes/12.ts#L619) [13-s6](src/story/scenes/13.ts#L707) | — |
| kalt ↻ | 12 | 4 · 2 · 3 · 3 | [12-s1](src/story/scenes/12.ts#L38) [12-s4](src/story/scenes/12.ts#L477) [13-s3](src/story/scenes/13.ts#L670) | [08](content/a1/08-wohnen.yaml#L40) [12](content/a1/12-reisen.yaml#L66) |
| kulturell ↻ | экз. | 2 · 2 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L677) [13-s6](src/story/scenes/13.ts#L707) | — |
| männlich (от der Mann) ↻ | экз. | 2 · 2 · 1 · 1 | [11-s5](src/story/scenes/11.ts#L574) [12-s5](src/story/scenes/12.ts#L816) | — |
| selbstständig ↻ | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L131) | — |
| sonnig ↻ | 12 | 3 · 2 · 3 · 3 | [12-s4](src/story/scenes/12.ts#L477) [12-s6](src/story/scenes/12.ts#L732) [13-s3](src/story/scenes/13.ts#L670) | [12](content/a1/12-reisen.yaml#L122) |
| weiblich ↻ | экз. | 1 · 1 · 0 · 0 | [11-s5](src/story/scenes/11.ts#L574) | [11](content/a1/11-arbeit.yaml#L345) |
| windig ↻ | 12 | 4 · 2 · 3 · 3 | [12-s1](src/story/scenes/12.ts#L38) [12-s4](src/story/scenes/12.ts#L477) [12-s6](src/story/scenes/12.ts#L732) [13-s3](src/story/scenes/13.ts#L670) | [12](content/a1/12-reisen.yaml#L66) |

### Выражения (7)

| Слово | Откуда | Числа | Где в новой версии | Уроки |
|---|---|---|---|---|
| arbeiten als | 11 | 1 · 1 · 1 · 0 | [11-s6](src/story/scenes/11.ts#L691) | [11](content/a1/11-arbeit.yaml#L129) |
| Die Sonne scheint. | 12 | 3 · 2 · 0 · 0 | [12-s5](src/story/scenes/12.ts#L552) [13-s1](src/story/scenes/13.ts#L37) | [12](content/a1/12-reisen.yaml#L68) |
| Es schneit. ↻ | 12 | 2 · 2 · 2 · 2 | [12-s6](src/story/scenes/12.ts#L732) [13-s3](src/story/scenes/13.ts#L670) | [12](content/a1/12-reisen.yaml#L121) |
| Es sind 20 Grad. ↻ | 12 | 2 · 2 · 2 · 2 | [12-s6](src/story/scenes/12.ts#L732) [13-s3](src/story/scenes/13.ts#L670) | [12](content/a1/12-reisen.yaml#L127) |
| gestern Abend ↻ | 11 | 3 · 3 · 3 · 3 | [11-s6](src/story/scenes/11.ts#L709) [12-s5](src/story/scenes/12.ts#L816) [13-s5](src/story/scenes/13.ts#L698) | [11](content/a1/11-arbeit.yaml#L48) |
| letztes Jahr ↻ | 11 | 2 · 2 · 2 · 2 | [11-s6](src/story/scenes/11.ts#L709) [12-s5](src/story/scenes/12.ts#L816) | [11](content/a1/11-arbeit.yaml#L139) |
| noch nicht | 11 | 5 · 2 · 1 · 3 | [11-s5](src/story/scenes/11.ts#L563) [12-s1](src/story/scenes/12.ts#L48) | [09](content/a1/09-stadt.yaml#L825) [11](content/a1/11-arbeit.yaml#L44) |

### Числа, время, цвета и другие группы (10)

| Слово | Откуда | Числа | Где в новой версии | Уроки |
|---|---|---|---|---|
| der Deutsche ↻ | экз. | 2 · 2 · 1 · 1 | [12-s5](src/story/scenes/12.ts#L619) [13-s2](src/story/scenes/13.ts#L661) | — |
| der Europäer ↻ | экз. | 2 · 2 · 1 · 1 | [12-s5](src/story/scenes/12.ts#L619) [13-s2](src/story/scenes/13.ts#L661) | — |
| europäisch ↻ | экз. | 2 · 2 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L677) [13-s3](src/story/scenes/13.ts#L670) | — |
| der Frühling ↻ | 12, экз. | 2 · 2 · 2 · 2 | [12-s2](src/story/scenes/12.ts#L265) [13-s2](src/story/scenes/13.ts#L661) | [12](content/a1/12-reisen.yaml#L135) |
| das Grad | экз. | 6 · 2 · 4 · 5 | [12-s1](src/story/scenes/12.ts#L50) [12-s3](src/story/scenes/12.ts#L304) [12-s4](src/story/scenes/12.ts#L477) [12-s6](src/story/scenes/12.ts#L732) [13-s3](src/story/scenes/13.ts#L670) | [12](content/a1/12-reisen.yaml#L68) |
| der Herbst ↻ | 12, экз. | 12 · 2 · 6 · 7 | [12-s1](src/story/scenes/12.ts#L38) [12-s4](src/story/scenes/12.ts#L457) [12-s6](src/story/scenes/12.ts#L731) [13-s2](src/story/scenes/13.ts#L661) | [12](content/a1/12-reisen.yaml#L137) |
| die Milliarde ↻ | экз. | 2 · 2 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L730) [13-s2](src/story/scenes/13.ts#L661) | — |
| der Monat ↻ | 12, экз. | 2 · 2 · 2 · 2 | [12-s2](src/story/scenes/12.ts#L265) [13-s2](src/story/scenes/13.ts#L661) | [03](content/a1/03-familie.yaml#L229) [12](content/a1/12-reisen.yaml#L139) |
| der Winter ↻ | 12, экз. | 4 · 2 · 4 · 3 | [12-s1](src/story/scenes/12.ts#L78) [12-s4](src/story/scenes/12.ts#L483) [12-s6](src/story/scenes/12.ts#L732) [13-s2](src/story/scenes/13.ts#L661) | [05](content/a1/05-einkaufen.yaml#L224) [12](content/a1/12-reisen.yaml#L138) |
| der Zentimeter ↻ | экз. | 1 · 1 · 0 · 0 | [11-s2](src/story/scenes/11.ts#L188) | — |

## Слова: закреплено

890 слов.

### Существительные (402)

das Abendessen, die Abfahrt, der Absender, die Adresse, das Alter, die Ampel, der Anfang, das Angebot, die Ankunft, die Anmeldung, die Anrede, der Anruf, der Anrufbeantworter, die Ansage, die Antwort, die Anzeige, das Apartment, der Apfel, die Apotheke, der Appetit, die Arbeit, Argentinien, der Arm, der Arzt, die Ärztin, die Aufgabe, der Aufzug, das Auge, der Ausflug, der Ausgang, die Auskunft, das Ausland, der Ausländer, die Aussage, der Ausweis, das Auto, die Autobahn, der Automat, das Baby, die Bäckerei, das Bad, die Bahn, der Bahnhof, der Bahnsteig, der Balkon, die Banane, die Bank, der Bauch, der Baum, der Beamte, das Bein, das Beispiel, der Bekannte, der Beruf, das Bett, das Bier, das Bild, die Birne, der Bleistift, der Blick, die Blume, das Boot, der Brief, die Briefmarke, das Brot, das Brötchen, der Bruder, das Buch, der Buchstabe, das Bürgeramt, der Bus, die Butter, das Café, die Cola, der Computer, der Cousin, die Cousine, die Dame, Dänemark, der Dank, die Disco, der Doktor, der Döner, das Dorf, die Dose, die Durchsage, der Durst, die Dusche, die E-Mail, die Ecke, die Ehefrau, der Ehemann, das Ei, der Eingang, die Einladung, der Eintritt, die Eltern, der Empfänger, das Ende, der Enkel, die Enkelin, die Entschuldigung, die Erdbeere, das Erdgeschoss, das Ergebnis, die Erkältung, der Erwachsene, der Fahrer, die Fahrkarte, das Fahrrad, die Familie, der Familienname, der Familienstand, die Farbe, der Feierabend, der Feiertag, das Feuer, das Fieber, der Film, die Firma, der Fisch, das Fischbrötchen, die Flasche, das Fleisch, das Flugzeug, der Flur, das Formular, das Foto, die Frage, die Frau, die Freizeit, der Freund, die Freundin, das Frühstück, die Führung, der Fuß, der Fußball, der Garten, der Gast, das Geburtsjahr, der Geburtsort, der Geburtstag, das Geld, das Gemüse, das Geschäft, das Geschenk, die Geschwister, das Gespräch, das Getränk, das Gewicht, das Glas, das Gleis, das Glück, der Glückwunsch, die Größe, die Großeltern, die Großmutter, der Großvater, die Gruppe, der Gruß, die Gurke, das Haar, der Hafen, das Hähnchen, die Halle, der Hals, die Haltestelle, die Hand, das Handy, die Handynummer, das Haus, die Hausaufgabe, die Hausfrau, der Hausmann, die Hausnummer, die Heimat, die Heizung, das Hemd, der Herd, der Herr, die Hilfe, das Hobby, die Hochzeit, die Hose, der Hund, der Hunger, der Husten, die Idee, die Information, das Internet, die Jacke, der Jugendliche, der Junge, der Kaffee, die Kaltmiete, die Karte, die Kartoffel, Kasachstan, der Käse, die Kasse, die Katze, der Keller, der Kellner, die Kellnerin, das Kind, der Kindergarten, das Kino, der Kiosk, die Klasse, das Kleid, der Kleiderschrank, die Kleidung, der Koch, die Köchin, der Kollege, das Konto, das Konzert, der Kopf, das Krankenhaus, der Krankenpfleger, die Kreditkarte, die Küche, der Kuchen, der Kühlschrank, der Kunde, der Kurs, der Laden, die Lampe, das Land, die Lebensmittel, der Lehrer, die Lehrerin, die Leute, das Licht, Lieblings-, der Liegeplatz, die Linie, der Lkw, das Lokal, die Lösung, das Mädchen, der Mann, der Mantel, die Maschine, der Mechaniker, das Medikament, das Meer, der Mensch, die Miete, die Milch, das Mittagessen, die Mitte, die Möbel, der Moment, der Mund, die Mutter, der Name, die Nase, die Nebenkosten, die Nummer, das Obst, das Ohr, das Öl, die Oma, der Onkel, der Opa, die Orange, die Ordnung, der Ort, die Packung, das Papier, der Park, der Partner, die Partnerin, die Party, der Pass, die Pasta, die Pause, die Person, der Plan, der Platz, die Polizei, die Post, die Postleitzahl, die Praxis, der Preis, das Problem, der Prospekt, die Prüfung, der Pullover, das Rathaus, der Raum, die Rechnung, der Regen, der Reis, die Reparatur, das Restaurant, das Rezept, der Rock, der Rücken, der Rucksack, Russland, die S-Bahn, der Saft, der Salat, das Salz, Satz, der Schalter, das Schild, der Schinken, das Schlafzimmer, der Schluss, der Schlüssel, der Schmerz, der Schnupfen, der Schrank, der Schreibtisch, der Schuh, die Schule, der Schüler, die Schweiz, die Schwester, das Schwimmbad, der See, die Sehenswürdigkeit, das Sofa, der Sohn, die Sonne, die Speisekarte, der Sport, die Sprache, die Stadt, die Stelle, der Stock, der Strand, die Straße, die Straßenbahn, das Stück, der Student, der Stuhl, der Supermarkt, die Suppe, das T-Shirt, die Tablette, die Tante, die Tasche, die Tasse, das Taxi, der Tee, der Teil, das Telefon, die Telefonnummer, der Termin, der Test, der Text, das Thema, das Ticket, der Tisch, die Tochter, die Toilette, die Tomate, die Treppe, das Treppenhaus, die Türkei, die Tüte, die U-Bahn, die Uhr, die Ukraine, der Unterricht, die Unterschrift, der Urlaub, die USA, der Vater, der Verein, der Verkäufer, die Verkäuferin, der Vermieter, die Versichertenkarte, der Verwandte, der Vorname, die Vorsicht, das Vorstellungsgespräch, die Vorwahl, die Warmmiete, das Wartezimmer, die Waschmaschine, das Wasser, der Wein, das Wiederhören, das Wiedersehen, das Wohnheim, die Wohnung, das Wohnzimmer, das Wort, die Wurst, die Zahl, der Zahn, die Zeit, die Zigarette, das Zimmer, der Zug, die Zwiebel

### Глаголы (149)

abfahren, abfliegen, abholen, anbieten, anfangen, ankreuzen, anmachen, anmelden, anrufen, antworten, anziehen, arbeiten, aufhören, aufräumen, aufstehen, ausfüllen, ausmachen, aussehen, aussteigen, ausziehen, baden, beginnen, bekommen, besichtigen, bestellen, bezahlen, bitten, bleiben, brauchen, bringen, buchstabieren, danken, dauern, drücken, dürfen, duschen, einkaufen, einladen, einsteigen, empfehlen, enden, entschuldigen, erklären, erlauben, erzählen, essen, fahren, fehlen, feiern, fernsehen, finden, fliegen, formulieren, fotografieren, fragen, frühstücken, geben, gefallen, gehen, gehören, gewinnen, glauben, gratulieren, grillen, haben, halten, heiraten, heißen, helfen, holen, hören, kaufen, kennen, kennenlernen, kochen, kommen, können, kosten, kriegen, lachen, laufen, leben, legen, lernen, lesen, lieben, liegen, machen, mieten, mitbringen, mitkommen, mitmachen, mitnehmen, möchten, mögen, müssen, nehmen, nennen, öffnen, passen, rauchen, reagieren, regnen, reparieren, riechen, sagen, schicken, schlafen, schließen, schmecken, schreiben, schwimmen, segeln, sehen, sein, sitzen, sollen, sondern, spielen, sprechen, stehen, stellen, studieren, suchen, tanzen, telefonieren, treffen, trinken, tun, überweisen, umsteigen, umziehen, unterschreiben, verkaufen, vermieten, verstehen, vorstellen, wählen, wandern, warten, waschen, wehtun, werden, wiederholen, willkommen, wissen, wohnen, wollen, zahlen

### Прилагательные и наречия (105)

allein, alt, automatisch, bald, bar, beide, bekannt, besetzt, besser, billig, bisschen, bitter, böse, breit, circa, daneben, draußen, dunkel, eilig, einfach, einmal, erst, etwa, falsch, fertig, frei, früh, früher, geboren, geöffnet, gerade, geradeaus, gern, geschieden, geschlossen, gestern, gestorben, gesund, gleich, glücklich, groß, gültig, günstig, gut, hell, herzlich, heute, hinten, hoch, immer, international, jetzt, jung, kaputt, klar, klein, krank, kurz, lang, lange, langsam, laut, ledig, leicht, leider, leise, lieber, links, lustig, manchmal, möbliert, modern, möglich, müde, neu, nie, normal, oben, oft, pünktlich, rechts, richtig, ruhig, schlecht, schnell, schön, schwer, sofort, spät, später, teuer, tot, unten, verboten, verheiratet, vielleicht, warm, weit, weiter, wichtig, wunderbar, zufrieden, zurück, zurzeit, zusammen

### Служебные слова (82)

ab, aber, all-, also, an, ander-, auch, auf, aus, bei, best-, bis, bitte, da, danke, dann, dein-, denn, der, dich, dies-, dir, dort, durch, ein-, er, es, euer, für, gegen, hier, ich, ihm, ihn, in, ja, jed-, kein, letzt-, lieb-, man, mehr, mein, meist-, mit, nach, nächst-, nein, nicht, nichts, noch, nur, oder, ohne, schon, sehr, seit, sich, sie, so, über, um, und, unser-, unter, viel, von, vor, wann, warum, was, welch-, Welche?, wenig, wer, wie, wir, wo, woher, wohin, zu, zwischen

### Выражения (56)

100 Gramm, Achtung, Alles Gute!, am liebsten, an sein, auf sein, Auf Wiederhören!, Auf Wiedersehen!, aus sein, Danke, gut!, Durst haben, ein Kilo, ein Liter, ein Pfund, Es regnet., Fahrrad fahren, Freunde treffen, Fußball spielen, Gitarre spielen, Gute Besserung!, Gute Nacht!, Guten Abend!, Guten Appetit!, Guten Morgen!, Guten Tag!, hallo, Hunger haben, in der Nähe, ins Kino gehen, kommen aus, Langsam, bitte., letzte Woche, Moin!, Musik hören, nicht gern, Noch einmal, bitte., die Pommes frites, Rad fahren, Schade!, sich kümmern, Tennis spielen, tschüss, was für ein, weg sein, Wie bitte?, Wie geht's?, Wie komme ich zum …?, Wie spät ist es?, wie viel, Wie viel Uhr ist es?, wohnen in, Zeit haben, zu Fuß, zu sein, zum Beispiel, Zusammen oder getrennt?

### Числа, время, цвета и другие группы (96)

der Abend, acht, achtzehn, achtzig, der April, der August, blau, braun, der Cent, deutsch, Deutschland, der Dezember, der Dienstag, der Donnerstag, drei, dreißig, dreizehn, dritte, eins, elf, erste, der Euro, Europa, der Februar, der Freitag, fünf, fünfzehn, fünfzig, gelb, das Gramm, grau, grün, halb, hundert, das Jahr, der Januar, der Juli, der Juni, das Kilo, der Kilometer, der Liter, der Mai, der März, der Meter, die Million, die Minute, der Mittag, der Mittwoch, der Montag, morgen, der Nachmittag, die Nacht, neun, neunzehn, neunzig, der Norden, der November, null, der Oktober, der Osten, das Pfund, das Prozent, der Quadratmeter, rot, der Samstag, schwarz, sechs, sechzehn, sechzig, die Sekunde, der September, sieben, siebzehn, siebzig, der Sommer, der Sonntag, die Stunde, der Süden, der Tag, tausend, vier, vierte, das Viertel, vierzehn, vierzig, der Vormittag, weiß, der Westen, die Woche, das Wochenende, der Wochentag, zehn, zwanzig, zwei, zweite, zwölf
