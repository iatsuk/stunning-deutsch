# Индекс покрытия A1

Сгенерирован `scripts/a1-index.mjs` при `pnpm content`; не редактируйте вручную. Правила подсчёта и
решения автора — `A1-PLAN.md`, эталон — `content/reference/start-deutsch-1.yaml`.

Слово закреплено: не меньше 4 встреч в новой версии Moin, не меньше чем в 3 главах, из них 1 в
действии и 1 на слух. Правило — 6 встреч в 4 главах, 2 в действии, 2 на слух. Числа в
таблицах: встреч · глав · действий · на слух. Раунд перед главой — часть главы. Столбец «Откуда»: номера уроков A1
и «экз.» для словаря экзамена. Внутри разделов слова сгруппированы по частям речи и идут по алфавиту.

Разделы: [Сводка](#сводка) · [Грамматика](#грамматика) · [Слова: нет](#слова-нет) · [Слова: один раз](#слова-один-раз) · [Слова: слабо](#слова-слабо) · [Слова: закреплено](#слова-закреплено)

## Сводка

| Что | закреплено | слабо | один раз | нет |
|---|---|---|---|---|
| Все обязательные слова (963) | 494 | 220 | 209 | 40 |
| из них словарь экзамена | 412 | 155 | 176 | 40 |
| из них слова уроков | 283 | 118 | 55 | 0 |
| Грамматика (66) | 53 | 13 | 0 | 0 |

В очереди повторения новой версии 657 обязательных слов, из них ниже порога 324. Повторение в порог не входит; в таблицах такие слова помечены ↻.

| Часть речи | закреплено | слабо | один раз | нет |
|---|---|---|---|---|
| Существительные | 205 | 129 | 96 | 11 |
| Глаголы | 72 | 36 | 41 | 8 |
| Прилагательные и наречия | 48 | 22 | 35 | 9 |
| Служебные слова | 66 | 8 | 0 | 8 |
| Выражения | 29 | 16 | 15 | 3 |
| Числа, время, цвета и другие группы | 74 | 9 | 22 | 1 |

## Грамматика

### Глагол

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Präsens, окончания по лицам | закреплено | 229 · 12 · 106 · 136 | есть | [01-s1](src/story/scenes/01.ts#L52) [01-s2](src/story/scenes/01.ts#L165) [01-s3](src/story/scenes/01.ts#L220) [01-i1](src/story/scenes/01.ts#L384) [01-s4](src/story/scenes/01.ts#L421) [01-s5](src/story/scenes/01.ts#L506) |
| Präsens со сменой корня (e → i, a → ä) | закреплено | 105 · 11 · 42 · 49 | есть | [01-s3](src/story/scenes/01.ts#L220) [01-s4](src/story/scenes/01.ts#L422) [01-s5](src/story/scenes/01.ts#L502) [02-s4](src/story/scenes/02.ts#L470) [04-s2](src/story/scenes/04.ts#L239) [04-s3](src/story/scenes/04.ts#L390) |
| sein | закреплено | 585 · 12 · 258 · 293 | есть | [01-s1](src/story/scenes/01.ts#L34) [01-s2](src/story/scenes/01.ts#L153) |
| haben | закреплено | 234 · 11 · 118 · 128 | есть | [02-s1](src/story/scenes/02.ts#L55) [02-s2](src/story/scenes/02.ts#L150) [02-s3](src/story/scenes/02.ts#L233) [02-i1](src/story/scenes/02.ts#L401) |
| Отделяемые приставки и рамка предложения | закреплено | 59 · 9 · 33 · 26 | есть | [01-s3](src/story/scenes/01.ts#L220) [05-s3](src/story/scenes/05.ts#L311) [05-s4](src/story/scenes/05.ts#L495) [06-s2](src/story/scenes/06.ts#L222) [06-s3](src/story/scenes/06.ts#L294) |
| Perfekt с haben | слабо | 68 · 3 · 40 · 33 | есть | [10-s1](src/story/scenes/10.ts#L58) [11-s1](src/story/scenes/11.ts#L37) [11-i1](src/story/scenes/11.ts#L161) [11-s2](src/story/scenes/11.ts#L198) |
| Perfekt с sein | слабо | 20 · 2 · 16 · 8 | есть | [11-s2](src/story/scenes/11.ts#L218) [12-s1](src/story/scenes/12.ts#L150) [12-s2](src/story/scenes/12.ts#L173) [12-s3](src/story/scenes/12.ts#L27) [12-s5](src/story/scenes/12.ts#L559) |
| Präteritum war и hatte | закреплено | 27 · 4 · 14 · 10 | есть | [09-s1](src/story/scenes/09.ts#L62) [09-i1](src/story/scenes/09.ts#L267) [10-s1](src/story/scenes/10.ts#L57) [11-i1](src/story/scenes/11.ts#L161) [11-s2](src/story/scenes/11.ts#L218) [11-s3](src/story/scenes/11.ts#L300) |
| möchten | закреплено | 14 · 4 · 8 · 9 | есть | [04-s1](src/story/scenes/04.ts#L52) [04-s2](src/story/scenes/04.ts#L167) [04-s5](src/story/scenes/04.ts#L568) [04-s6](src/story/scenes/04.ts#L692) [08-s1](src/story/scenes/08.ts#L102) [10-s6](src/story/scenes/10.ts#L667) |
| Ich hätte gern …, Ich würde gern … как готовые выражения | слабо | 4 · 2 · 2 · 2 | есть | [04-s4](src/story/scenes/04.ts#L461) [07-s5](src/story/scenes/07.ts#L544) |
| können | закреплено | 33 · 4 · 23 · 12 | есть | [07-s1](src/story/scenes/07.ts#L38) [07-s2](src/story/scenes/07.ts#L168) [07-s3](src/story/scenes/07.ts#L297) |
| wollen | закреплено | 25 · 4 · 15 · 10 | есть | [07-s1](src/story/scenes/07.ts#L43) [07-s2](src/story/scenes/07.ts#L180) [07-s3](src/story/scenes/07.ts#L285) [07-s4](src/story/scenes/07.ts#L500) [07-s5](src/story/scenes/07.ts#L543) |
| müssen | закреплено | 13 · 4 · 8 · 4 | есть | [08-s4](src/story/scenes/08.ts#L564) [10-s1](src/story/scenes/10.ts#L82) [10-s3](src/story/scenes/10.ts#L273) [10-s4](src/story/scenes/10.ts#L451) [10-s5](src/story/scenes/10.ts#L545) [10-s6](src/story/scenes/10.ts#L667) |
| dürfen | закреплено | 27 · 4 · 16 · 6 | есть | [09-s2](src/story/scenes/09.ts#L214) [10-s1](src/story/scenes/10.ts#L82) [10-s2](src/story/scenes/10.ts#L171) [10-s3](src/story/scenes/10.ts#L253) [10-s4](src/story/scenes/10.ts#L28) |
| sollen | слабо | 18 · 3 · 13 · 10 | есть | [10-s4](src/story/scenes/10.ts#L29) [10-s5](src/story/scenes/10.ts#L580) [10-s6](src/story/scenes/10.ts#L30) [11-s5](src/story/scenes/11.ts#L28) |
| mögen | слабо | 11 · 3 · 4 · 4 | есть | [07-s3](src/story/scenes/07.ts#L396) [07-s4](src/story/scenes/07.ts#L486) [08-s1](src/story/scenes/08.ts#L102) [12-s3](src/story/scenes/12.ts#L302) [12-s6](src/story/scenes/12.ts#L633) |
| Модальный глагол и инфинитив в конце | закреплено | 58 · 7 · 36 · 22 | есть | [04-s6](src/story/scenes/04.ts#L692) [07-s1](src/story/scenes/07.ts#L43) [07-s2](src/story/scenes/07.ts#L180) [07-s3](src/story/scenes/07.ts#L285) [07-s4](src/story/scenes/07.ts#L500) [07-s5](src/story/scenes/07.ts#L544) |
| Повелительное наклонение на Sie | закреплено | 28 · 5 · 17 · 14 | есть | [02-s3](src/story/scenes/02.ts#L244) [09-s2](src/story/scenes/09.ts#L28) [09-i1](src/story/scenes/09.ts#L293) [09-s3](src/story/scenes/09.ts#L335) [09-s4](src/story/scenes/09.ts#L483) |
| Повелительное наклонение на du | закреплено | 57 · 10 · 24 · 37 | есть | [02-s3](src/story/scenes/02.ts#L379) [02-s4](src/story/scenes/02.ts#L497) [03-s6](src/story/scenes/03.ts#L775) [05-s1](src/story/scenes/05.ts#L89) [05-s3](src/story/scenes/05.ts#L311) [05-s6](src/story/scenes/05.ts#L735) |
| Повелительное наклонение на ihr | закреплено | 11 · 5 · 5 · 6 | есть | [06-s1](src/story/scenes/06.ts#L34) [07-s4](src/story/scenes/07.ts#L466) [08-s1](src/story/scenes/08.ts#L84) [09-s2](src/story/scenes/09.ts#L188) [09-s3](src/story/scenes/09.ts#L335) [09-s4](src/story/scenes/09.ts#L555) |

### Предложение

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Глагол на втором месте, время на первом | закреплено | 64 · 12 · 33 · 31 | есть | [01-s1](src/story/scenes/01.ts#L124) [01-s3](src/story/scenes/01.ts#L237) [02-s2](src/story/scenes/02.ts#L201) [02-s3](src/story/scenes/02.ts#L233) [03-s3](src/story/scenes/03.ts#L278) [03-s6](src/story/scenes/03.ts#L818) |
| Вопрос с W-словом | закреплено | 147 · 12 · 83 · 73 | есть | [01-s1](src/story/scenes/01.ts#L44) [01-s2](src/story/scenes/01.ts#L153) [01-s3](src/story/scenes/01.ts#L220) |
| Вопрос да/нет и ответ ja / nein / doch | закреплено | 44 · 11 · 29 · 22 | есть | [02-s1](src/story/scenes/02.ts#L51) [02-s3](src/story/scenes/02.ts#L229) [02-i1](src/story/scenes/02.ts#L417) [02-s4](src/story/scenes/02.ts#L437) [02-s5](src/story/scenes/02.ts#L595) [02-s6](src/story/scenes/02.ts#L677) |
| nicht и kein | закреплено | 242 · 12 · 102 · 113 | есть | [01-s1](src/story/scenes/01.ts#L145) [01-s3](src/story/scenes/01.ts#L220) [01-s5](src/story/scenes/01.ts#L539) [02-s2](src/story/scenes/02.ts#L205) [02-s4](src/story/scenes/02.ts#L523) [02-s5](src/story/scenes/02.ts#L613) |
| und, oder, aber | закреплено | 204 · 12 · 71 · 86 | есть | [01-s3](src/story/scenes/01.ts#L220) [01-i1](src/story/scenes/01.ts#L388) [01-s4](src/story/scenes/01.ts#L415) [01-s6](src/story/scenes/01.ts#L599) [02-s2](src/story/scenes/02.ts#L152) [02-s3](src/story/scenes/02.ts#L244) |
| denn как союз причины | слабо | 3 · 2 · 3 · 1 | есть | [07-s1](src/story/scenes/07.ts#L65) [07-s2](src/story/scenes/07.ts#L180) [08-s6](src/story/scenes/08.ts#L755) |
| dann | закреплено | 21 · 7 · 6 · 8 | есть | [06-s5](src/story/scenes/06.ts#L610) [06-s6](src/story/scenes/06.ts#L764) [07-s2](src/story/scenes/07.ts#L260) [08-s6](src/story/scenes/08.ts#L755) [09-s2](src/story/scenes/09.ts#L227) [09-i1](src/story/scenes/09.ts#L278) |
| wenn (понимание) | слабо | 5 · 3 · 2 · 3 | есть | [10-s4](src/story/scenes/10.ts#L461) [11-s5](src/story/scenes/11.ts#L562) [12-s2](src/story/scenes/12.ts#L178) |
| es gibt | закреплено | 8 · 5 · 2 · 5 | есть | [05-s2](src/story/scenes/05.ts#L205) [07-s1](src/story/scenes/07.ts#L37) [07-s3](src/story/scenes/07.ts#L297) [08-s1](src/story/scenes/08.ts#L87) [09-s1](src/story/scenes/09.ts#L84) [12-s6](src/story/scenes/12.ts#L683) |

### Существительное и артикль

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Множественное число | закреплено | 189 · 12 · 68 · 80 | есть | [01-s3](src/story/scenes/01.ts#L220) [01-s6](src/story/scenes/01.ts#L599) [02-s1](src/story/scenes/02.ts#L119) [02-s2](src/story/scenes/02.ts#L206) [02-s3](src/story/scenes/02.ts#L229) [02-i1](src/story/scenes/02.ts#L412) |
| Винительный падеж | закреплено | 144 · 10 · 83 · 62 | есть | [03-s4](src/story/scenes/03.ts#L572) [04-s1](src/story/scenes/04.ts#L52) [04-s2](src/story/scenes/04.ts#L170) [04-s3](src/story/scenes/04.ts#L292) |
| Дательный на вопрос «где?» (in, auf, an) | закреплено | 60 · 9 · 25 · 13 | есть | [04-s2](src/story/scenes/04.ts#L166) [05-s1](src/story/scenes/05.ts#L88) [05-s2](src/story/scenes/05.ts#L146) [05-s3](src/story/scenes/05.ts#L297) [06-s2](src/story/scenes/06.ts#L163) [06-s3](src/story/scenes/06.ts#L428) |
| Предлоги с дательным (mit, zu, bei, von, aus, nach) | закреплено | 120 · 11 · 62 · 44 | есть | [01-s1](src/story/scenes/01.ts#L19) [01-s3](src/story/scenes/01.ts#L220) [01-s5](src/story/scenes/01.ts#L567) [01-s6](src/story/scenes/01.ts#L631) [02-s3](src/story/scenes/02.ts#L244) [03-s2](src/story/scenes/03.ts#L220) |
| Чей? Имя + s (Annas Bruder) | слабо | 10 · 2 · 10 · 1 | есть | [03-s1](src/story/scenes/03.ts#L64) [03-s3](src/story/scenes/03.ts#L295) [03-s4](src/story/scenes/03.ts#L496) [03-s5](src/story/scenes/03.ts#L643) [04-s3](src/story/scenes/04.ts#L295) |
| Сложные слова: род по последней части | закреплено | 201 · 12 · 108 · 82 | есть | [01-s1](src/story/scenes/01.ts#L81) [02-s1](src/story/scenes/02.ts#L83) [02-s2](src/story/scenes/02.ts#L136) [02-s3](src/story/scenes/02.ts#L244) [02-s6](src/story/scenes/02.ts#L677) [03-s3](src/story/scenes/03.ts#L278) |
| Женский род на -in | закреплено | 46 · 6 · 28 · 24 | есть | [03-s3](src/story/scenes/03.ts#L409) [03-s4](src/story/scenes/03.ts#L472) [03-s5](src/story/scenes/03.ts#L619) [09-i1](src/story/scenes/09.ts#L282) [09-s4](src/story/scenes/09.ts#L31) |
| dieser, diese, dieses | слабо | 4 · 4 · 1 · 3 | есть | [05-i1](src/story/scenes/05.ts#L448) [08-s3](src/story/scenes/08.ts#L452) [09-s2](src/story/scenes/09.ts#L188) [10-s2](src/story/scenes/10.ts#L171) |
| Притяжательные mein, dein, sein, ihr, unser, euer, Ihr | закреплено | 92 · 12 · 46 · 51 | есть | [01-s1](src/story/scenes/01.ts#L120) [01-i1](src/story/scenes/01.ts#L383) [02-s3](src/story/scenes/02.ts#L379) [03-s1](src/story/scenes/03.ts#L43) [03-s2](src/story/scenes/03.ts#L155) |
| welcher, welche, welches | закреплено | 15 · 4 · 9 · 8 | есть | [01-s3](src/story/scenes/01.ts#L220) [02-s3](src/story/scenes/02.ts#L240) [05-s2](src/story/scenes/05.ts#L159) [05-s3](src/story/scenes/05.ts#L311) [05-i1](src/story/scenes/05.ts#L442) [05-s5](src/story/scenes/05.ts#L649) |

### Местоимения

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Местоимения в винительном (mich, dich, ihn …) | закреплено | 30 · 8 · 15 · 17 | есть | [02-s4](src/story/scenes/02.ts#L454) [05-s2](src/story/scenes/05.ts#L180) [05-s4](src/story/scenes/05.ts#L576) [05-s5](src/story/scenes/05.ts#L598) [05-s6](src/story/scenes/05.ts#L814) [06-s1](src/story/scenes/06.ts#L151) |
| Местоимения в дательном (mir, dir, ihm, Ihnen) | закреплено | 20 · 8 · 9 · 10 | есть | [01-s1](src/story/scenes/01.ts#L74) [01-s3](src/story/scenes/01.ts#L220) [06-s5](src/story/scenes/06.ts#L629) [07-s3](src/story/scenes/07.ts#L410) [07-s5](src/story/scenes/07.ts#L543) [07-i1](src/story/scenes/07.ts#L665) |
| Глаголы с дательным (gehören, gefallen, helfen, danken, geben) | закреплено | 17 · 7 · 8 · 9 | есть | [04-i1](src/story/scenes/04.ts#L411) [06-s6](src/story/scenes/06.ts#L742) [07-s3](src/story/scenes/07.ts#L409) [07-s5](src/story/scenes/07.ts#L574) [08-s2](src/story/scenes/08.ts#L181) [08-s5](src/story/scenes/08.ts#L665) |
| sich, uns (Wir sehen uns) | закреплено | 8 · 6 · 3 · 5 | есть | [01-s6](src/story/scenes/01.ts#L608) [06-s1](src/story/scenes/06.ts#L150) [07-s2](src/story/scenes/07.ts#L231) [09-s6](src/story/scenes/09.ts#L775) [12-s6](src/story/scenes/12.ts#L634) [02-разминка](src/story/scenes/warmups.ts#L8) |
| Вопросы wen? и wem? | закреплено | 7 · 4 · 3 · 4 | есть | [08-s2](src/story/scenes/08.ts#L181) [09-s6](src/story/scenes/09.ts#L731) [10-s3](src/story/scenes/10.ts#L249) [12-s3](src/story/scenes/12.ts#L290) |
| man | закреплено | 7 · 4 · 2 · 4 | есть | [07-s1](src/story/scenes/07.ts#L38) [09-s2](src/story/scenes/09.ts#L169) [10-s2](src/story/scenes/10.ts#L171) [12-s6](src/story/scenes/12.ts#L683) |
| etwas, nichts, alles, mehr | закреплено | 83 · 11 · 30 · 41 | есть | [01-s2](src/story/scenes/01.ts#L165) [03-s3](src/story/scenes/03.ts#L278) [04-s2](src/story/scenes/04.ts#L217) [04-s3](src/story/scenes/04.ts#L298) [04-s4](src/story/scenes/04.ts#L503) [04-s5](src/story/scenes/04.ts#L572) |

### Прилагательное и числа

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Прилагательное после sein (zu groß) | закреплено | 91 · 12 · 33 · 47 | есть | [01-s2](src/story/scenes/01.ts#L165) [01-s4](src/story/scenes/01.ts#L436) [02-s5](src/story/scenes/02.ts#L557) [03-s2](src/story/scenes/03.ts#L244) [04-s2](src/story/scenes/04.ts#L228) [04-s3](src/story/scenes/04.ts#L298) |
| gern, lieber, am liebsten | закреплено | 19 · 5 · 13 · 9 | есть | [04-s3](src/story/scenes/04.ts#L298) [04-s4](src/story/scenes/04.ts#L461) [04-s6](src/story/scenes/04.ts#L765) [07-s1](src/story/scenes/07.ts#L87) [07-s3](src/story/scenes/07.ts#L392) [07-s4](src/story/scenes/07.ts#L453) |
| Сравнение (besser, mehr, als) | закреплено | 13 · 4 · 7 · 5 | есть | [07-s3](src/story/scenes/07.ts#L297) [08-s3](src/story/scenes/08.ts#L386) [10-s3](src/story/scenes/10.ts#L253) [10-s5](src/story/scenes/10.ts#L557) [12-s1](src/story/scenes/12.ts#L48) [12-s3](src/story/scenes/12.ts#L302) |
| Цены и количества | закреплено | 84 · 10 · 44 · 28 | есть | [02-s6](src/story/scenes/02.ts#L710) [03-s2](src/story/scenes/03.ts#L224) [03-i1](src/story/scenes/03.ts#L224) [03-s6](src/story/scenes/03.ts#L736) [04-s3](src/story/scenes/04.ts#L298) [04-s4](src/story/scenes/04.ts#L490) |
| Время на часах | закреплено | 164 · 9 · 79 · 65 | есть | [02-s5](src/story/scenes/02.ts#L581) [04-s2](src/story/scenes/04.ts#L166) [04-s3](src/story/scenes/04.ts#L294) [04-s4](src/story/scenes/04.ts#L456) [06-s1](src/story/scenes/06.ts#L35) |
| Порядковые числа и дата | закреплено | 37 · 5 · 21 · 12 | есть | [08-s2](src/story/scenes/08.ts#L231) [08-i1](src/story/scenes/08.ts#L279) [08-s3](src/story/scenes/08.ts#L334) [08-s5](src/story/scenes/08.ts#L669) [08-s6](src/story/scenes/08.ts#L764) [09-s2](src/story/scenes/09.ts#L227) |

### Предлоги

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| um, am, im, von … bis во времени | закреплено | 136 · 7 · 69 · 55 | есть | [06-s1](src/story/scenes/06.ts#L35) [06-s2](src/story/scenes/06.ts#L177) |
| ab и für во времени (ab Montag, für zwei Wochen) | закреплено | 8 · 5 · 5 · 2 | есть | [08-s3](src/story/scenes/08.ts#L386) [09-s2](src/story/scenes/09.ts#L168) [10-s3](src/story/scenes/10.ts#L250) [10-s4](src/story/scenes/10.ts#L472) [11-s5](src/story/scenes/11.ts#L551) [12-s3](src/story/scenes/12.ts#L287) |
| nach и vor во времени (nach dem Essen) | закреплено | 9 · 4 · 5 · 5 | есть | [08-s6](src/story/scenes/08.ts#L731) [09-s2](src/story/scenes/09.ts#L168) [10-s3](src/story/scenes/10.ts#L250) [10-s4](src/story/scenes/10.ts#L472) [12-s4](src/story/scenes/12.ts#L454) |
| über (über zwanzig Minuten) | слабо | 4 · 2 · 3 · 1 | есть | [09-s2](src/story/scenes/09.ts#L168) [10-s3](src/story/scenes/10.ts#L249) [10-s4](src/story/scenes/10.ts#L473) |
| nach Hause / zu Hause | закреплено | 16 · 4 · 10 · 6 | есть | [07-s2](src/story/scenes/07.ts#L146) [09-s5](src/story/scenes/09.ts#L675) [09-s6](src/story/scenes/09.ts#L730) [10-s4](src/story/scenes/10.ts#L29) [12-s1](src/story/scenes/12.ts#L121) |
| in, an, auf + винительный для направления (in die Stadt) | закреплено | 42 · 8 · 19 · 13 | есть | [04-s2](src/story/scenes/04.ts#L248) [04-s5](src/story/scenes/04.ts#L581) [06-s2](src/story/scenes/06.ts#L218) [06-s5](src/story/scenes/06.ts#L633) [06-s6](src/story/scenes/06.ts#L786) [07-s1](src/story/scenes/07.ts#L43) |
| unter | слабо | 5 · 3 · 2 · 3 | есть | [08-s2](src/story/scenes/08.ts#L212) [09-s2](src/story/scenes/09.ts#L225) [11-s2](src/story/scenes/11.ts#L218) |
| ohne и für (ohne dich, für meinen Freund) | закреплено | 41 · 11 · 22 · 11 | есть | [01-s1](src/story/scenes/01.ts#L145) [02-s2](src/story/scenes/02.ts#L205) [02-s4](src/story/scenes/02.ts#L454) [03-s5](src/story/scenes/03.ts#L691) [04-s1](src/story/scenes/04.ts#L158) [04-s2](src/story/scenes/04.ts#L176) |

### Словообразование

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Существительные на -ung | закреплено | 111 · 10 · 61 · 40 | есть | [02-s2](src/story/scenes/02.ts#L136) [02-s3](src/story/scenes/02.ts#L244) [02-s5](src/story/scenes/02.ts#L659) [04-s2](src/story/scenes/04.ts#L232) [04-s3](src/story/scenes/04.ts#L298) [04-s4](src/story/scenes/04.ts#L506) |
| Прилагательные с un-, -los, -bar | слабо | 3 · 2 · 2 · 1 | есть | [11-s1](src/story/scenes/11.ts#L73) [12-s4](src/story/scenes/12.ts#L468) |
| hellblau, dunkelblau | закреплено | 28 · 6 · 11 · 3 | есть | [05-s2](src/story/scenes/05.ts#L259) [05-s3](src/story/scenes/05.ts#L311) [05-s5](src/story/scenes/05.ts#L607) [05-s6](src/story/scenes/05.ts#L729) [06-s2](src/story/scenes/06.ts#L207) [06-i1](src/story/scenes/06.ts#L464) |
| Причастие как прилагательное (geöffnet, geschlossen) | закреплено | 7 · 4 · 4 · 3 | есть | [06-s3](src/story/scenes/06.ts#L294) [08-s4](src/story/scenes/08.ts#L564) [10-s5](src/story/scenes/10.ts#L531) [12-s3](src/story/scenes/12.ts#L302) |
| Погода с es (Es regnet) | закреплено | 27 · 5 · 6 · 6 | есть | [05-s1](src/story/scenes/05.ts#L39) [06-s6](src/story/scenes/06.ts#L730) [09-s1](src/story/scenes/09.ts#L40) [09-i1](src/story/scenes/09.ts#L281) [09-s3](src/story/scenes/09.ts#L320) [11-s1](src/story/scenes/11.ts#L141) |
| Ich habe …schmerzen, … tut weh | слабо | 13 · 2 · 7 · 9 | есть | [10-s1](src/story/scenes/10.ts#L39) [10-s2](src/story/scenes/10.ts#L122) [10-s6](src/story/scenes/10.ts#L673) [11-s3](src/story/scenes/11.ts#L300) |

## Слова: нет

40 слов.

### Существительные (11)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| der Beamte | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Bekannte | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Blick | экз. | 0 · 0 · 0 · 0 | — | [11](content/a1/11-arbeit.yaml#L6) | гл. 3 |
| die Dame | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Halle | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Hausfrau | экз. | 0 · 0 · 0 · 0 | — | [11](content/a1/11-arbeit.yaml#L116) | — |
| die Information | экз. | 0 · 0 · 0 · 0 | — | [06](content/a1/06-tagesablauf.yaml#L197) [09](content/a1/09-stadt.yaml#L236) | — |
| der Kindergarten | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Reparatur (от reparieren) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Schule | экз. | 0 · 0 · 0 · 0 | — | [01](content/a1/01-kennenlernen.yaml#L29) [02](content/a1/02-zahlen.yaml#L29) [06](content/a1/06-tagesablauf.yaml#L27) [07](content/a1/07-freizeit.yaml#L26) [11](content/a1/11-arbeit.yaml#L27) | гл. 11 |
| der Verwandte | экз. | 0 · 0 · 0 · 0 | — | [03](content/a1/03-familie.yaml#L106) | — |

### Глаголы (8)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| abholen | экз. | 0 · 0 · 0 · 0 | — | — | гл. 10 |
| anbieten | экз. | 0 · 0 · 0 · 0 | — | — | — |
| drücken | экз. | 0 · 0 · 0 · 0 | — | — | — |
| entschuldigen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| erlauben | экз. | 0 · 0 · 0 · 0 | — | — | — |
| fehlen | экз. | 0 · 0 · 0 · 0 | — | — | гл. 10 |
| kriegen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| studieren | экз. | 0 · 0 · 0 · 0 | — | — | — |

### Прилагательные и наречия (9)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| automatisch | экз. | 0 · 0 · 0 · 0 | — | — | — |
| beide | экз. | 0 · 0 · 0 · 0 | — | — | гл. 5, 11 |
| bekannt | экз. | 0 · 0 · 0 · 0 | — | — | — |
| circa | экз. | 0 · 0 · 0 · 0 | — | [07](content/a1/07-freizeit.yaml#L239) [12](content/a1/12-reisen.yaml#L200) | — |
| gestorben | экз. | 0 · 0 · 0 · 0 | — | — | — |
| leicht | экз. | 0 · 0 · 0 · 0 | — | — | — |
| tot | экз. | 0 · 0 · 0 · 0 | — | — | — |
| weiter | экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L580) | — |
| zufrieden | экз. | 0 · 0 · 0 · 0 | — | — | — |

### Служебные слова (8)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| ander- | экз. | 0 · 0 · 0 · 0 | — | — | гл. 8, 11, 12 |
| best- | экз. | 0 · 0 · 0 · 0 | — | — | — |
| dort | экз. | 0 · 0 · 0 · 0 | — | [11](content/a1/11-arbeit.yaml#L66) | — |
| gegen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| meist- | экз. | 0 · 0 · 0 · 0 | — | — | — |
| nächst- | экз. | 0 · 0 · 0 · 0 | — | — | — |
| wenig | экз. | 0 · 0 · 0 · 0 | — | — | — |
| zwischen | экз. | 0 · 0 · 0 · 0 | — | — | — |

### Выражения (3)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| an sein | экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L160) | — |
| die Pommes frites | экз. | 0 · 0 · 0 · 0 | — | — | — |
| sich kümmern | экз. | 0 · 0 · 0 · 0 | — | — | — |

### Числа, время, цвета и другие группы (1)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| vierte | экз. | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L464) [12](content/a1/12-reisen.yaml#L40) | — |

## Слова: один раз

209 слов.

### Существительные (96)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| der Abflug (от fliegen) ↻ | экз. | 1 · 1 · 0 · 0 | [12-s2](src/story/scenes/12.ts#L209) | — | — |
| der Absender ↻ | экз. | 1 · 1 · 0 · 0 | [09-s3](src/story/scenes/09.ts#L321) | — | — |
| das Angebot (от anbieten) ↻ | экз. | 1 · 1 · 0 · 0 | [05-s2](src/story/scenes/05.ts#L228) | [05](content/a1/05-einkaufen.yaml#L215) | — |
| die Anrede ↻ | экз. | 1 · 1 · 0 · 0 | [11-s5](src/story/scenes/11.ts#L573) | [07](content/a1/07-freizeit.yaml#L240) [10](content/a1/10-gesundheit.yaml#L201) [12](content/a1/12-reisen.yaml#L200) | — |
| der Anrufbeantworter (от der Anruf) ↻ | экз. | 1 · 1 · 0 · 0 | [02-s3](src/story/scenes/02.ts#L382) | [02](content/a1/02-zahlen.yaml#L256) [06](content/a1/06-tagesablauf.yaml#L194) [10](content/a1/10-gesundheit.yaml#L181) | — |
| die Ansage ↻ | экз. | 1 · 1 · 0 · 0 | [09-s2](src/story/scenes/09.ts#L148) | — | — |
| der Arbeitsplatz ↻ | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L130) | — | — |
| die Aussage ↻ | экз. | 1 · 1 · 0 · 0 | [11-s3](src/story/scenes/11.ts#L405) | [03](content/a1/03-familie.yaml#L223) [05](content/a1/05-einkaufen.yaml#L212) [07](content/a1/07-freizeit.yaml#L221) [11](content/a1/11-arbeit.yaml#L191) [12](content/a1/12-reisen.yaml#L242) | — |
| die Autobahn ↻ | экз. | 1 · 1 · 0 · 0 | [09-i1](src/story/scenes/09.ts#L279) | — | — |
| das Baby ↻ | 3, экз. | 1 · 1 · 1 · 1 | [03-s1](src/story/scenes/03.ts#L67) | [03](content/a1/03-familie.yaml#L47) | гл. 3 |
| die Bäckerei ↻ | экз. | 1 · 1 · 0 · 0 | [04-s1](src/story/scenes/04.ts#L47) | — | — |
| die Banane ↻ | 5, экз. | 1 · 1 · 1 · 1 | [05-s3](src/story/scenes/05.ts#L428) | [05](content/a1/05-einkaufen.yaml#L118) | гл. 5 |
| die Bank ↻ | 9, экз. | 1 · 1 · 1 · 1 | [09-s1](src/story/scenes/09.ts#L116) | [09](content/a1/09-stadt.yaml#L106) | гл. 9 |
| der Bauch ↻ | 10, экз. | 1 · 1 · 1 · 1 | [10-s1](src/story/scenes/10.ts#L106) | [10](content/a1/10-gesundheit.yaml#L90) | гл. 10 |
| der Bogen ↻ | экз. | 1 · 1 · 0 · 0 | [11-s5](src/story/scenes/11.ts#L573) | — | гл. 2 |
| die Briefmarke ↻ | экз. | 1 · 1 · 0 · 0 | [09-s3](src/story/scenes/09.ts#L321) | — | — |
| das Bürgeramt ↻ | 9 | 1 · 1 · 1 · 1 | [09-s1](src/story/scenes/09.ts#L116) | [09](content/a1/09-stadt.yaml#L110) | гл. 9 |
| der Chef ↻ | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L130) | — | — |
| der Computer ↻ | экз. | 1 · 1 · 0 · 0 | [02-s4](src/story/scenes/02.ts#L471) | — | — |
| das Dorf ↻ | экз. | 1 · 1 · 0 · 0 | [09-s5](src/story/scenes/09.ts#L603) | — | — |
| der Drucker (от drucken) ↻ | экз. | 1 · 1 · 0 · 0 | [11-s5](src/story/scenes/11.ts#L636) | — | — |
| der Durst | экз. | 1 · 1 · 1 · 0 | [04-s5](src/story/scenes/04.ts#L641) | [04](content/a1/04-essen.yaml#L207) | гл. 4 |
| die E-Mail ↻ | экз. | 1 · 1 · 0 · 0 | [02-s4](src/story/scenes/02.ts#L471) | [03](content/a1/03-familie.yaml#L223) [07](content/a1/07-freizeit.yaml#L221) [10](content/a1/10-gesundheit.yaml#L199) [11](content/a1/11-arbeit.yaml#L46) | — |
| der Eintritt ↻ | экз. | 1 · 1 · 0 · 0 | [07-s1](src/story/scenes/07.ts#L117) | — | — |
| der Empfänger ↻ | экз. | 1 · 1 · 0 · 0 | [09-s3](src/story/scenes/09.ts#L321) | — | — |
| die Erdbeere ↻ | 5 | 1 · 1 · 1 · 1 | [05-s3](src/story/scenes/05.ts#L428) | [05](content/a1/05-einkaufen.yaml#L120) | гл. 5 |
| der Erwachsene ↻ | экз. | 1 · 1 · 0 · 0 | [03-s4](src/story/scenes/03.ts#L589) | — | — |
| der Fahrer (от fahren) ↻ | экз. | 1 · 1 · 0 · 0 | [09-s2](src/story/scenes/09.ts#L204) | — | — |
| der Fehler ↻ | экз. | 1 · 1 · 0 · 0 | [11-s2](src/story/scenes/11.ts#L210) | — | — |
| der Feiertag ↻ | экз. | 1 · 1 · 0 · 0 | [06-s2](src/story/scenes/06.ts#L259) | — | — |
| die Ferien ↻ | 12 | 1 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L704) | [12](content/a1/12-reisen.yaml#L148) | гл. 12 |
| die Flasche ↻ | 5, экз. | 1 · 1 · 1 · 1 | [05-s6](src/story/scenes/05.ts#L810) | [05](content/a1/05-einkaufen.yaml#L109) | гл. 4, 5 |
| der Friseur ↻ | 11 | 1 · 1 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L133) | [11](content/a1/11-arbeit.yaml#L101) | гл. 11 |
| die Führung ↻ | экз. | 1 · 1 · 0 · 0 | [09-s4](src/story/scenes/09.ts#L493) | — | — |
| das Geschäft ↻ | экз. | 1 · 1 · 0 · 0 | [05-s2](src/story/scenes/05.ts#L147) | [05](content/a1/05-einkaufen.yaml#L224) | — |
| das Gewicht ↻ | экз. | 1 · 1 · 0 · 0 | [05-s3](src/story/scenes/05.ts#L298) | — | — |
| das Gleis ↻ | 9, 12, экз. | 1 · 1 · 1 · 0 | [09-s2](src/story/scenes/09.ts#L152) | [09](content/a1/09-stadt.yaml#L127) [12](content/a1/12-reisen.yaml#L96) | гл. 9 |
| der Informatiker ↻ | 11 | 1 · 1 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L133) | [11](content/a1/11-arbeit.yaml#L103) | гл. 11 |
| der Ingenieur ↻ | 11 | 1 · 1 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L133) | [11](content/a1/11-arbeit.yaml#L100) | гл. 11 |
| das Internet ↻ | экз. | 1 · 1 · 0 · 0 | [02-s4](src/story/scenes/02.ts#L471) | [12](content/a1/12-reisen.yaml#L228) | — |
| die Jahreszeit ↻ | 12 | 1 · 1 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L263) | [12](content/a1/12-reisen.yaml#L130) | гл. 12 |
| der Job ↻ | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L75) | — | — |
| der Jugendliche ↻ | экз. | 1 · 1 · 0 · 0 | [03-s4](src/story/scenes/03.ts#L589) | — | — |
| die Kartoffel ↻ | 5, экз. | 1 · 1 · 1 · 1 | [05-s3](src/story/scenes/05.ts#L428) | [05](content/a1/05-einkaufen.yaml#L122) | гл. 5 |
| der Kleiderschrank ↻ | 8 | 1 · 1 · 1 · 1 | [08-s2](src/story/scenes/08.ts#L166) | [08](content/a1/08-wohnen.yaml#L76) | гл. 8 |
| die Kleidung ↻ | экз. | 1 · 1 · 0 · 0 | [05-s1](src/story/scenes/05.ts#L100) | [05](content/a1/05-einkaufen.yaml#L125) | — |
| das Konto ↻ | экз. | 1 · 1 · 0 · 0 | [09-s3](src/story/scenes/09.ts#L331) | — | — |
| die Kreditkarte (от die Karte) ↻ | экз. | 1 · 1 · 0 · 0 | [05-i1](src/story/scenes/05.ts#L457) | — | — |
| der Kugelschreiber ↻ | экз. | 1 · 1 · 0 · 0 | [11-s5](src/story/scenes/11.ts#L636) | — | — |
| die Lebensmittel (от leben) ↻ | экз. | 1 · 1 · 0 · 0 | [05-s3](src/story/scenes/05.ts#L298) | — | — |
| Lieblings- | экз. | 1 · 1 · 0 · 0 | [07-s3](src/story/scenes/07.ts#L409) | — | — |
| der Liegeplatz ↻ | 2 | 1 · 1 · 1 · 0 | [02-s2](src/story/scenes/02.ts#L136) | [02](content/a1/02-zahlen.yaml#L93) [12](content/a1/12-reisen.yaml#L889) | гл. 2 |
| der Lkw ↻ | экз. | 1 · 1 · 0 · 0 | [09-i1](src/story/scenes/09.ts#L279) | — | — |
| das Lokal ↻ | экз. | 1 · 1 · 0 · 0 | [04-s1](src/story/scenes/04.ts#L121) | [04](content/a1/04-essen.yaml#L181) | — |
| die Maschine | экз. | 1 · 1 · 1 · 1 | [08-s6](src/story/scenes/08.ts#L828) | [08](content/a1/08-wohnen.yaml#L70) | гл. 8 |
| das Mittagessen | 4 | 1 · 1 · 1 · 1 | [04-s1](src/story/scenes/04.ts#L109) | [04](content/a1/04-essen.yaml#L193) | гл. 4 |
| die Mitte ↻ | экз. | 1 · 1 · 0 · 0 | [08-s2](src/story/scenes/08.ts#L167) | — | — |
| die Möbel ↻ | 8, экз. | 1 · 1 · 1 · 0 | [08-s4](src/story/scenes/08.ts#L577) | [08](content/a1/08-wohnen.yaml#L104) | гл. 8 |
| das Öl ↻ | экз. | 1 · 1 · 0 · 0 | [04-s1](src/story/scenes/04.ts#L121) | — | — |
| die Orange ↻ | 5 | 1 · 1 · 1 · 1 | [05-s3](src/story/scenes/05.ts#L428) | [05](content/a1/05-einkaufen.yaml#L119) | гл. 5 |
| der Ort ↻ | экз. | 1 · 1 · 0 · 0 | [09-s5](src/story/scenes/09.ts#L603) | [07](content/a1/07-freizeit.yaml#L361) [09](content/a1/09-stadt.yaml#L97) | — |
| die Papiere ↻ | экз. | 1 · 1 · 0 · 0 | [11-s5](src/story/scenes/11.ts#L574) | — | — |
| der Partner ↻ | 3, экз. | 1 · 1 · 1 · 1 | [03-s3](src/story/scenes/03.ts#L409) | [03](content/a1/03-familie.yaml#L139) [04](content/a1/04-essen.yaml#L277) [05](content/a1/05-einkaufen.yaml#L245) [07](content/a1/07-freizeit.yaml#L265) | гл. 3 |
| die Partnerin ↻ | 3, экз. | 1 · 1 · 1 · 1 | [03-s3](src/story/scenes/03.ts#L409) | [03](content/a1/03-familie.yaml#L140) | гл. 3 |
| die Pasta ↻ | 4 | 1 · 1 · 1 · 1 | [04-s1](src/story/scenes/04.ts#L103) | [04](content/a1/04-essen.yaml#L60) [11](content/a1/11-arbeit.yaml#L40) | гл. 4 |
| das Praktikum ↻ | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L75) | — | — |
| der Prospekt ↻ | экз. | 1 · 1 · 0 · 0 | [09-s4](src/story/scenes/09.ts#L492) | — | — |
| das Rathaus ↻ | 9 | 1 · 1 · 1 · 1 | [09-s1](src/story/scenes/09.ts#L116) | [09](content/a1/09-stadt.yaml#L109) | гл. 9 |
| das Reisebüro (от reisen) ↻ | экз. | 1 · 1 · 0 · 0 | [12-s2](src/story/scenes/12.ts#L189) | — | — |
| der Reiseführer (от reisen) ↻ | экз. | 1 · 1 · 0 · 0 | [12-s2](src/story/scenes/12.ts#L189) | — | — |
| das Restaurant ↻ | экз. | 1 · 1 · 0 · 0 | [04-s1](src/story/scenes/04.ts#L121) | [04](content/a1/04-essen.yaml#L77) [06](content/a1/06-tagesablauf.yaml#L62) [11](content/a1/11-arbeit.yaml#L44) | — |
| die Rezeption | экз. | 1 · 1 · 0 · 0 | [12-s3](src/story/scenes/12.ts#L277) | — | — |
| die S-Bahn ↻ | 9, экз. | 1 · 1 · 1 · 1 | [09-s1](src/story/scenes/09.ts#L112) | [09](content/a1/09-stadt.yaml#L119) | гл. 9 |
| das Salz ↻ | экз. | 1 · 1 · 0 · 0 | [04-s1](src/story/scenes/04.ts#L121) | — | — |
| Satz | экз. | 1 · 1 · 0 · 0 | [11-s5](src/story/scenes/11.ts#L638) | [07](content/a1/07-freizeit.yaml#L239) [08](content/a1/08-wohnen.yaml#L485) [10](content/a1/10-gesundheit.yaml#L200) [12](content/a1/12-reisen.yaml#L199) | — |
| der Schinken ↻ | экз. | 1 · 1 · 0 · 0 | [04-s1](src/story/scenes/04.ts#L100) | — | — |
| der Schluss ↻ | экз. | 1 · 1 · 0 · 0 | [06-s4](src/story/scenes/06.ts#L546) | — | — |
| der See ↻ | экз. | 1 · 1 · 0 · 0 | [07-s4](src/story/scenes/07.ts#L531) | — | — |
| die Sehenswürdigkeit ↻ | экз. | 1 · 1 · 0 · 0 | [09-s4](src/story/scenes/09.ts#L492) | — | — |
| das Studium ↻ | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L75) | — | — |
| der Supermarkt ↻ | 9 | 1 · 1 · 1 · 1 | [09-s1](src/story/scenes/09.ts#L116) | [09](content/a1/09-stadt.yaml#L108) | гл. 9 |
| die Tante ↻ | 3 | 1 · 1 · 1 · 0 | [03-s4](src/story/scenes/03.ts#L593) | [03](content/a1/03-familie.yaml#L114) | гл. 3 |
| der Teil ↻ | экз. | 1 · 1 · 0 · 0 | [11-s2](src/story/scenes/11.ts#L187) | [01](content/a1/01-kennenlernen.yaml#L216) [02](content/a1/02-zahlen.yaml#L245) [03](content/a1/03-familie.yaml#L212) [04](content/a1/04-essen.yaml#L276) [05](content/a1/05-einkaufen.yaml#L211) [06](content/a1/06-tagesablauf.yaml#L193) [07](content/a1/07-freizeit.yaml#L220) [09](content/a1/09-stadt.yaml#L221) [10](content/a1/10-gesundheit.yaml#L180) [11](content/a1/11-arbeit.yaml#L207) [12](content/a1/12-reisen.yaml#L196) | — |
| der Text | экз. | 1 · 1 · 0 · 1 | [09-s3](src/story/scenes/09.ts#L444) | [02](content/a1/02-zahlen.yaml#L258) [03](content/a1/03-familie.yaml#L227) [04](content/a1/04-essen.yaml#L299) [05](content/a1/05-einkaufen.yaml#L212) [06](content/a1/06-tagesablauf.yaml#L196) [07](content/a1/07-freizeit.yaml#L225) [08](content/a1/08-wohnen.yaml#L261) [09](content/a1/09-stadt.yaml#L211) [10](content/a1/10-gesundheit.yaml#L181) [11](content/a1/11-arbeit.yaml#L195) [12](content/a1/12-reisen.yaml#L204) | — |
| die Toilette ↻ | экз. | 1 · 1 · 0 · 0 | [08-s6](src/story/scenes/08.ts#L772) | — | — |
| die U-Bahn ↻ | 9 | 1 · 1 · 1 · 1 | [09-s1](src/story/scenes/09.ts#L112) | [09](content/a1/09-stadt.yaml#L120) | гл. 9 |
| der Urlaub ↻ | 12, экз. | 1 · 1 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L263) | [12](content/a1/12-reisen.yaml#L91) | гл. 12 |
| der Verein ↻ | экз. | 1 · 1 · 0 · 0 | [07-s1](src/story/scenes/07.ts#L117) | — | — |
| die Vorsicht ↻ | экз. | 1 · 1 · 0 · 0 | [09-s2](src/story/scenes/09.ts#L222) | — | — |
| die Vorwahl ↻ | экз. | 1 · 1 · 0 · 0 | [02-s3](src/story/scenes/02.ts#L374) | — | — |
| die Waschmaschine ↻ | 8 | 1 · 1 · 1 · 1 | [08-s6](src/story/scenes/08.ts#L828) | [08](content/a1/08-wohnen.yaml#L70) | гл. 8 |
| der Wein ↻ | 4, экз. | 1 · 1 · 1 · 1 | [04-s3](src/story/scenes/04.ts#L386) | [04](content/a1/04-essen.yaml#L72) | гл. 4 |
| die Welt ↻ | экз. | 1 · 1 · 0 · 0 | [12-s2](src/story/scenes/12.ts#L189) | — | — |
| die Zeitung | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L76) | — | — |
| die Zigarette ↻ | экз. | 1 · 1 · 0 · 0 | [10-s2](src/story/scenes/10.ts#L212) | — | — |
| der Zoll ↻ | экз. | 1 · 1 · 0 · 0 | [12-s6](src/story/scenes/12.ts#L683) | — | — |

### Глаголы (41)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| abfliegen (от fliegen) ↻ | экз. | 1 · 1 · 0 · 0 | [12-s6](src/story/scenes/12.ts#L683) | — | — |
| abgeben ↻ | экз. | 1 · 1 · 0 · 0 | [11-s5](src/story/scenes/11.ts#L574) | — | — |
| anfangen | 6, экз. | 1 · 1 · 1 · 0 | [06-s4](src/story/scenes/06.ts#L537) | [06](content/a1/06-tagesablauf.yaml#L36) [09](content/a1/09-stadt.yaml#L91) | гл. 6 |
| anklicken ↻ | экз. | 1 · 1 · 0 · 0 | [11-s5](src/story/scenes/11.ts#L636) | — | — |
| ankreuzen ↻ | экз. | 1 · 1 · 0 · 0 | [11-s5](src/story/scenes/11.ts#L574) | [04](content/a1/04-essen.yaml#L299) [09](content/a1/09-stadt.yaml#L222) | — |
| anmelden | экз. | 1 · 1 · 0 · 1 | [10-s2](src/story/scenes/10.ts#L149) | — | — |
| antworten ↻ | экз. | 1 · 1 · 0 · 0 | [02-s4](src/story/scenes/02.ts#L449) | [03](content/a1/03-familie.yaml#L213) [04](content/a1/04-essen.yaml#L277) [07](content/a1/07-freizeit.yaml#L238) [12](content/a1/12-reisen.yaml#L199) | гл. 5 |
| anziehen ↻ | экз. | 1 · 1 · 0 · 0 | [05-s1](src/story/scenes/05.ts#L100) | — | — |
| aufräumen ↻ | 6 | 1 · 1 · 1 · 0 | [06-s6](src/story/scenes/06.ts#L779) | [06](content/a1/06-tagesablauf.yaml#L154) | гл. 6 |
| ausfüllen | экз. | 1 · 1 · 0 · 1 | [10-s2](src/story/scenes/10.ts#L171) | — | — |
| aussehen ↻ | экз. | 1 · 1 · 0 · 0 | [10-s1](src/story/scenes/10.ts#L78) | — | — |
| ausziehen ↻ | экз. | 1 · 1 · 0 · 0 | [05-s1](src/story/scenes/05.ts#L100) | — | — |
| baden ↻ | экз. | 1 · 1 · 0 · 0 | [07-s1](src/story/scenes/07.ts#L88) | — | — |
| bedeuten ↻ | экз. | 1 · 1 · 0 · 0 | [11-s5](src/story/scenes/11.ts#L638) | [08](content/a1/08-wohnen.yaml#L42) | — |
| beginnen ↻ | экз. | 1 · 1 · 0 · 0 | [06-s4](src/story/scenes/06.ts#L546) | [06](content/a1/06-tagesablauf.yaml#L200) [11](content/a1/11-arbeit.yaml#L785) | — |
| bekommen | экз. | 1 · 1 · 0 · 1 | [10-s5](src/story/scenes/10.ts#L588) | — | гл. 11 |
| benutzen ↻ | экз. | 1 · 1 · 0 · 0 | [11-s2](src/story/scenes/11.ts#L210) | [09](content/a1/09-stadt.yaml#L236) | — |
| besichtigen ↻ | экз. | 1 · 1 · 0 · 0 | [09-s4](src/story/scenes/09.ts#L493) | [08](content/a1/08-wohnen.yaml#L202) | — |
| besuchen | экз. | 1 · 1 · 1 · 0 | [11-s2](src/story/scenes/11.ts#L245) | [07](content/a1/07-freizeit.yaml#L64) | — |
| drucken ↻ | экз. | 1 · 1 · 0 · 0 | [11-s5](src/story/scenes/11.ts#L636) | — | — |
| empfehlen ↻ | экз. | 1 · 1 · 0 · 0 | [10-s4](src/story/scenes/10.ts#L427) | — | — |
| enden ↻ | экз. | 1 · 1 · 0 · 0 | [06-s4](src/story/scenes/06.ts#L546) | [07](content/a1/07-freizeit.yaml#L422) [12](content/a1/12-reisen.yaml#L198) | — |
| feiern | экз. | 1 · 1 · 0 · 1 | [08-s1](src/story/scenes/08.ts#L100) | — | — |
| fernsehen ↻ | 6, экз. | 1 · 1 · 1 · 0 | [06-s6](src/story/scenes/06.ts#L779) | [06](content/a1/06-tagesablauf.yaml#L70) | гл. 6 |
| fliegen ↻ | экз. | 1 · 1 · 0 · 0 | [12-s2](src/story/scenes/12.ts#L209) | [12](content/a1/12-reisen.yaml#L158) | — |
| gewinnen ↻ | экз. | 1 · 1 · 0 · 0 | [07-s3](src/story/scenes/07.ts#L418) | — | — |
| gratulieren ↻ | экз. | 1 · 1 · 0 · 0 | [03-s6](src/story/scenes/03.ts#L739) | — | — |
| grillen ↻ | 7, экз. | 1 · 1 · 1 · 1 | [07-s1](src/story/scenes/07.ts#L89) | [07](content/a1/07-freizeit.yaml#L62) | гл. 7 |
| heiraten ↻ | экз. | 1 · 1 · 0 · 0 | [03-s6](src/story/scenes/03.ts#L738) | — | — |
| lachen | экз. | 1 · 1 · 0 · 1 | [09-i1](src/story/scenes/09.ts#L267) | — | — |
| leben ↻ | экз. | 1 · 1 · 0 · 0 | [03-s6](src/story/scenes/03.ts#L738) | — | — |
| legen ↻ | экз. | 1 · 1 · 0 · 0 | [08-s2](src/story/scenes/08.ts#L227) | — | — |
| mitmachen ↻ | экз. | 1 · 1 · 0 · 0 | [07-s3](src/story/scenes/07.ts#L418) | — | — |
| überweisen ↻ | экз. | 1 · 1 · 0 · 0 | [09-s3](src/story/scenes/09.ts#L331) | — | — |
| umziehen ↻ | экз. | 1 · 1 · 0 · 0 | [08-s3](src/story/scenes/08.ts#L362) | — | — |
| verdienen ↻ | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L75) | — | — |
| verkaufen ↻ | экз. | 1 · 1 · 0 · 0 | [05-s2](src/story/scenes/05.ts#L147) | — | — |
| vermieten ↻ | экз. | 1 · 1 · 0 · 0 | [08-s3](src/story/scenes/08.ts#L362) | — | — |
| verstehen | экз. | 1 · 1 · 1 · 0 | [07-s6](src/story/scenes/07.ts#L752) | — | — |
| waschen ↻ | экз. | 1 · 1 · 0 · 0 | [08-s2](src/story/scenes/08.ts#L227) | [08](content/a1/08-wohnen.yaml#L125) | — |
| zahlen | экз. | 1 · 1 · 1 · 1 | [02-s6](src/story/scenes/02.ts#L677) | [02](content/a1/02-zahlen.yaml#L1) [04](content/a1/04-essen.yaml#L42) | — |

### Прилагательные и наречия (35)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| arbeitslos | экз. | 1 · 1 · 0 · 1 | [11-s1](src/story/scenes/11.ts#L73) | — | — |
| ausländisch (от das Ausland) ↻ | экз. | 1 · 1 · 0 · 0 | [12-s6](src/story/scenes/12.ts#L649) | — | — |
| bald ↻ | экз. | 1 · 1 · 0 · 0 | [06-s1](src/story/scenes/06.ts#L139) | [12](content/a1/12-reisen.yaml#L198) | — |
| besetzt ↻ | экз. | 1 · 1 · 0 · 0 | [08-s6](src/story/scenes/08.ts#L772) | — | — |
| bewölkt ↻ | 12 | 1 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L704) | [12](content/a1/12-reisen.yaml#L123) | гл. 12 |
| böse ↻ | экз. | 1 · 1 · 0 · 0 | [10-s4](src/story/scenes/10.ts#L427) | — | — |
| breit ↻ | экз. | 1 · 1 · 0 · 0 | [08-s2](src/story/scenes/08.ts#L167) | — | — |
| daneben ↻ | экз. | 1 · 1 · 0 · 0 | [08-s2](src/story/scenes/08.ts#L167) | — | — |
| draußen ↻ | экз. | 1 · 1 · 0 · 0 | [08-s1](src/story/scenes/08.ts#L54) | — | — |
| eilig ↻ | экз. | 1 · 1 · 0 · 0 | [06-s1](src/story/scenes/06.ts#L139) | — | — |
| einfach | экз. | 1 · 1 · 0 · 1 | [09-i1](src/story/scenes/09.ts#L293) | — | — |
| fremd ↻ | экз. | 1 · 1 · 0 · 0 | [12-s5](src/story/scenes/12.ts#L591) | — | — |
| gerade ↻ | экз. | 1 · 1 · 0 · 0 | [06-s3](src/story/scenes/06.ts#L442) | — | — |
| gleich ↻ | экз. | 1 · 1 · 0 · 0 | [06-s1](src/story/scenes/06.ts#L139) | [08](content/a1/08-wohnen.yaml#L50) | — |
| glücklich ↻ | экз. | 1 · 1 · 0 · 0 | [10-s4](src/story/scenes/10.ts#L408) | — | — |
| gültig ↻ | экз. | 1 · 1 · 0 · 0 | [09-s2](src/story/scenes/09.ts#L180) | — | — |
| günstig | 8, экз. | 1 · 1 · 1 · 0 | [08-s4](src/story/scenes/08.ts#L577) | [08](content/a1/08-wohnen.yaml#L143) | гл. 8 |
| hoch ↻ | экз. | 1 · 1 · 0 · 0 | [08-s2](src/story/scenes/08.ts#L167) | — | — |
| kulturell ↻ | экз. | 1 · 1 · 0 · 0 | [12-s6](src/story/scenes/12.ts#L649) | — | — |
| kurz ↻ | 5, экз. | 1 · 1 · 1 · 0 | [05-s1](src/story/scenes/05.ts#L106) | [05](content/a1/05-einkaufen.yaml#L155) [08](content/a1/08-wohnen.yaml#L196) [09](content/a1/09-stadt.yaml#L184) [10](content/a1/10-gesundheit.yaml#L186) | гл. 5 |
| lustig ↻ | экз. | 1 · 1 · 0 · 0 | [07-s3](src/story/scenes/07.ts#L418) | — | — |
| männlich (от der Mann) ↻ | экз. | 1 · 1 · 0 · 0 | [11-s5](src/story/scenes/11.ts#L573) | — | — |
| möglich ↻ | экз. | 1 · 1 · 0 · 0 | [10-s4](src/story/scenes/10.ts#L507) | — | — |
| normal ↻ | экз. | 1 · 1 · 0 · 0 | [10-s4](src/story/scenes/10.ts#L408) | — | — |
| oben ↻ | экз. | 1 · 1 · 0 · 0 | [08-s1](src/story/scenes/08.ts#L89) | — | — |
| pünktlich ↻ | экз. | 1 · 1 · 0 · 0 | [06-s1](src/story/scenes/06.ts#L67) | [09](content/a1/09-stadt.yaml#L436) | — |
| schlecht ↻ | экз. | 1 · 1 · 0 · 0 | [10-s1](src/story/scenes/10.ts#L78) | — | гл. 12 |
| selbstständig ↻ | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L130) | — | — |
| sonnig ↻ | 12 | 1 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L704) | [12](content/a1/12-reisen.yaml#L122) | гл. 12 |
| unten ↻ | экз. | 1 · 1 · 0 · 0 | [08-s1](src/story/scenes/08.ts#L89) | [08](content/a1/08-wohnen.yaml#L723) | — |
| weiblich ↻ | экз. | 1 · 1 · 0 · 0 | [11-s5](src/story/scenes/11.ts#L573) | [11](content/a1/11-arbeit.yaml#L345) | — |
| weit ↻ | 9, экз. | 1 · 1 · 1 · 1 | [09-s2](src/story/scenes/09.ts#L224) | [08](content/a1/08-wohnen.yaml#L48) [09](content/a1/09-stadt.yaml#L34) [12](content/a1/12-reisen.yaml#L580) | гл. 9 |
| wichtig ↻ | экз. | 1 · 1 · 0 · 0 | [10-s4](src/story/scenes/10.ts#L507) | — | — |
| wunderbar | экз. | 1 · 1 · 0 · 1 | [07-s2](src/story/scenes/07.ts#L231) | — | — |
| zurzeit (от die Zeit) ↻ | экз. | 1 · 1 · 0 · 0 | [06-s3](src/story/scenes/06.ts#L442) | — | — |

### Выражения (15)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| 100 Gramm ↻ | 5 | 1 · 1 · 1 · 0 | [05-s1](src/story/scenes/05.ts#L106) | [05](content/a1/05-einkaufen.yaml#L107) | гл. 5 |
| arbeiten als | 11 | 1 · 1 · 1 · 0 | [11-s6](src/story/scenes/11.ts#L690) | [11](content/a1/11-arbeit.yaml#L129) | гл. 11 |
| Durst haben | 4 | 1 · 1 · 1 · 0 | [04-s5](src/story/scenes/04.ts#L641) | [04](content/a1/04-essen.yaml#L207) | гл. 4 |
| Es schneit. ↻ | 12 | 1 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L704) | [12](content/a1/12-reisen.yaml#L121) | гл. 12 |
| Es sind 20 Grad. ↻ | 12 | 1 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L704) | [12](content/a1/12-reisen.yaml#L127) | гл. 12 |
| Freunde treffen ↻ | 7 | 1 · 1 · 1 · 1 | [07-s6](src/story/scenes/07.ts#L769) | [06](content/a1/06-tagesablauf.yaml#L610) [07](content/a1/07-freizeit.yaml#L128) | гл. 7 |
| gestern Abend ↻ | 11 | 1 · 1 · 1 · 1 | [11-s6](src/story/scenes/11.ts#L708) | [11](content/a1/11-arbeit.yaml#L48) | гл. 11 |
| Gitarre spielen ↻ | 7 | 1 · 1 · 1 · 1 | [07-s1](src/story/scenes/07.ts#L89) | [07](content/a1/07-freizeit.yaml#L119) | гл. 7 |
| letztes Jahr ↻ | 11 | 1 · 1 · 1 · 1 | [11-s6](src/story/scenes/11.ts#L708) | [11](content/a1/11-arbeit.yaml#L139) | гл. 11 |
| Musik hören ↻ | 7 | 1 · 1 · 1 · 1 | [07-s6](src/story/scenes/07.ts#L769) | [07](content/a1/07-freizeit.yaml#L124) | гл. 7 |
| nicht gern ↻ | 7 | 1 · 1 · 1 · 1 | [07-s4](src/story/scenes/07.ts#L453) | [04](content/a1/04-essen.yaml#L70) [07](content/a1/07-freizeit.yaml#L158) [12](content/a1/12-reisen.yaml#L227) | гл. 7 |
| Rad fahren ↻ | экз. | 1 · 1 · 0 · 0 | [07-s1](src/story/scenes/07.ts#L88) | — | — |
| Tennis spielen ↻ | 7 | 1 · 1 · 1 · 1 | [07-s1](src/story/scenes/07.ts#L89) | [07](content/a1/07-freizeit.yaml#L39) | гл. 7 |
| was für ein | экз. | 1 · 1 · 0 · 1 | [10-s6](src/story/scenes/10.ts#L662) | — | — |
| Wie viel Uhr ist es? ↻ | 6 | 1 · 1 · 1 · 0 | [06-s4](src/story/scenes/06.ts#L533) | [06](content/a1/06-tagesablauf.yaml#L106) | гл. 6 |

### Числа, время, цвета и другие группы (22)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| achtzig ↻ | экз. | 1 · 1 · 0 · 0 | [02-s1](src/story/scenes/02.ts#L39) | [02](content/a1/02-zahlen.yaml#L419) [05](content/a1/05-einkaufen.yaml#L46) | гл. 5 |
| der August ↻ | экз. | 1 · 1 · 0 · 0 | [06-s2](src/story/scenes/06.ts#L257) | [12](content/a1/12-reisen.yaml#L174) | — |
| braun ↻ | экз. | 1 · 1 · 0 · 0 | [05-s2](src/story/scenes/05.ts#L215) | — | — |
| der Cent ↻ | экз. | 1 · 1 · 0 · 0 | [05-s2](src/story/scenes/05.ts#L252) | [05](content/a1/05-einkaufen.yaml#L165) | — |
| der Deutsche ↻ | экз. | 1 · 1 · 0 · 0 | [12-s5](src/story/scenes/12.ts#L591) | — | — |
| der Europäer ↻ | экз. | 1 · 1 · 0 · 0 | [12-s5](src/story/scenes/12.ts#L591) | — | — |
| europäisch ↻ | экз. | 1 · 1 · 0 · 0 | [12-s6](src/story/scenes/12.ts#L649) | — | — |
| der Frühling ↻ | 12, экз. | 1 · 1 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L263) | [12](content/a1/12-reisen.yaml#L135) | гл. 12 |
| grün ↻ | экз. | 1 · 1 · 0 · 0 | [05-s3](src/story/scenes/05.ts#L297) | — | — |
| der Kilometer ↻ | экз. | 1 · 1 · 0 · 0 | [09-i1](src/story/scenes/09.ts#L279) | — | — |
| die Milliarde ↻ | экз. | 1 · 1 · 0 · 0 | [12-s6](src/story/scenes/12.ts#L702) | — | — |
| die Million ↻ | экз. | 1 · 1 · 0 · 0 | [02-s1](src/story/scenes/02.ts#L40) | — | — |
| der Mittwoch | 6, экз. | 1 · 1 · 0 · 0 | [10-s1](src/story/scenes/10.ts#L38) | [06](content/a1/06-tagesablauf.yaml#L133) | гл. 6, 10 |
| der Monat ↻ | 12, экз. | 1 · 1 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L263) | [03](content/a1/03-familie.yaml#L229) [12](content/a1/12-reisen.yaml#L139) | гл. 12 |
| der Norden ↻ | экз. | 1 · 1 · 0 · 0 | [09-s1](src/story/scenes/09.ts#L87) | — | — |
| der November ↻ | экз. | 1 · 1 · 0 · 0 | [06-s2](src/story/scenes/06.ts#L257) | [12](content/a1/12-reisen.yaml#L174) | — |
| der Oktober ↻ | экз. | 1 · 1 · 0 · 0 | [06-s2](src/story/scenes/06.ts#L257) | [12](content/a1/12-reisen.yaml#L173) | — |
| das Prozent ↻ | экз. | 1 · 1 · 0 · 0 | [05-s2](src/story/scenes/05.ts#L228) | — | — |
| der Süden ↻ | экз. | 1 · 1 · 0 · 0 | [09-s1](src/story/scenes/09.ts#L87) | — | — |
| der Westen ↻ | экз. | 1 · 1 · 0 · 0 | [09-s1](src/story/scenes/09.ts#L87) | — | — |
| der Wochentag ↻ | экз. | 1 · 1 · 0 · 0 | [06-s2](src/story/scenes/06.ts#L259) | — | — |
| der Zentimeter ↻ | экз. | 1 · 1 · 0 · 0 | [11-s2](src/story/scenes/11.ts#L187) | — | — |

## Слова: слабо

220 слов.

### Существительные (129)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| das Abendessen | 4 | 4 · 2 · 2 · 1 | [04-s1](src/story/scenes/04.ts#L109) [04-s6](src/story/scenes/04.ts#L691) [12-s3](src/story/scenes/12.ts#L302) | [04](content/a1/04-essen.yaml#L194) | гл. 4 |
| die Abfahrt (от abfahren) ↻ | экз. | 3 · 1 · 2 · 1 | [09-s2](src/story/scenes/09.ts#L162) | [09](content/a1/09-stadt.yaml#L214) [12](content/a1/12-reisen.yaml#L246) | — |
| die Abreise | 12 | 2 · 1 · 1 · 1 | [12-s3](src/story/scenes/12.ts#L302) | [12](content/a1/12-reisen.yaml#L112) | гл. 12 |
| die Adresse ↻ | 2, экз. | 3 · 1 · 2 · 0 | [08-s4](src/story/scenes/08.ts#L533) [08-s6](src/story/scenes/08.ts#L827) | [02](content/a1/02-zahlen.yaml#L133) | гл. 2 |
| die Ampel ↻ | 9 | 20 · 1 · 11 · 5 | [09-s1](src/story/scenes/09.ts#L116) [09-s2](src/story/scenes/09.ts#L227) [09-s3](src/story/scenes/09.ts#L320) | [09](content/a1/09-stadt.yaml#L34) | гл. 9 |
| die Ankunft ↻ | экз. | 2 · 1 · 1 · 1 | [09-s2](src/story/scenes/09.ts#L166) | — | — |
| die Anmeldung (от anmelden) ↻ | экз. | 5 · 1 · 2 · 1 | [10-s2](src/story/scenes/10.ts#L139) [10-s6](src/story/scenes/10.ts#L691) | [01](content/a1/01-kennenlernen.yaml#L227) [02](content/a1/02-zahlen.yaml#L27) [11](content/a1/11-arbeit.yaml#L236) | — |
| die Anreise ↻ | 12 | 3 · 1 · 2 · 2 | [12-s3](src/story/scenes/12.ts#L302) [12-s6](src/story/scenes/12.ts#L703) | [12](content/a1/12-reisen.yaml#L111) | гл. 12 |
| der Anschluss ↻ | экз. | 2 · 1 · 1 · 0 | [12-s3](src/story/scenes/12.ts#L302) | — | — |
| das Apartment ↻ | экз. | 2 · 1 · 1 · 0 | [08-s3](src/story/scenes/08.ts#L386) | — | — |
| Argentinien | 1 | 8 · 1 · 7 · 3 | [01-s3](src/story/scenes/01.ts#L220) [01-s5](src/story/scenes/01.ts#L506) [01-s6](src/story/scenes/01.ts#L599) | [01](content/a1/01-kennenlernen.yaml#L40) [11](content/a1/11-arbeit.yaml#L213) | гл. 1, 3 |
| der Arm ↻ | 10, экз. | 3 · 1 · 3 · 2 | [10-s1](src/story/scenes/10.ts#L53) [10-s3](src/story/scenes/10.ts#L359) | [10](content/a1/10-gesundheit.yaml#L66) | гл. 10 |
| die Aufgabe ↻ | экз. | 2 · 1 · 1 · 1 | [11-s4](src/story/scenes/11.ts#L437) | [10](content/a1/10-gesundheit.yaml#L211) | — |
| der Aufzug ↻ | экз. | 2 · 1 · 1 · 1 | [08-s1](src/story/scenes/08.ts#L89) [08-s3](src/story/scenes/08.ts#L484) | — | — |
| das Auge ↻ | 10, экз. | 3 · 1 · 2 · 3 | [10-s1](src/story/scenes/10.ts#L53) | [10](content/a1/10-gesundheit.yaml#L83) | гл. 10 |
| der Ausflug ↻ | экз. | 3 · 2 · 2 · 2 | [07-s1](src/story/scenes/07.ts#L117) [07-s3](src/story/scenes/07.ts#L419) [12-разминка](src/story/scenes/warmups.ts#L59) | — | — |
| der Ausgang ↻ | экз. | 2 · 1 · 1 · 1 | [09-s2](src/story/scenes/09.ts#L159) | — | — |
| die Auskunft ↻ | экз. | 2 · 1 · 1 · 1 | [09-s2](src/story/scenes/09.ts#L159) | — | — |
| das Ausland ↻ | экз. | 3 · 3 · 2 · 2 | [01-s1](src/story/scenes/01.ts#L56) [02-разминка](src/story/scenes/warmups.ts#L9) [03-разминка](src/story/scenes/warmups.ts#L14) | — | — |
| der Ausländer (от das Ausland) ↻ | экз. | 3 · 3 · 2 · 2 | [01-s1](src/story/scenes/01.ts#L56) [02-разминка](src/story/scenes/warmups.ts#L9) [03-разминка](src/story/scenes/warmups.ts#L14) | — | — |
| das Auto ↻ | 9, экз. | 18 · 1 · 7 · 9 | [09-s1](src/story/scenes/09.ts#L58) [09-i1](src/story/scenes/09.ts#L266) [09-s3](src/story/scenes/09.ts#L335) [09-s6](src/story/scenes/09.ts#L801) | [09](content/a1/09-stadt.yaml#L122) | гл. 9 |
| der Automat ↻ | экз. | 3 · 1 · 1 · 1 | [09-s2](src/story/scenes/09.ts#L171) [09-s6](src/story/scenes/09.ts#L816) | [09](content/a1/09-stadt.yaml#L235) | — |
| die Bahn | экз. | 6 · 1 · 4 · 3 | [09-s1](src/story/scenes/09.ts#L77) [09-i1](src/story/scenes/09.ts#L279) [09-s6](src/story/scenes/09.ts#L829) | [09](content/a1/09-stadt.yaml#L118) | гл. 9 |
| der Bahnhof ↻ | 9, экз. | 4 · 1 · 3 · 2 | [09-s1](src/story/scenes/09.ts#L77) [09-s2](src/story/scenes/09.ts#L138) [09-s6](src/story/scenes/09.ts#L789) | [09](content/a1/09-stadt.yaml#L3) [12](content/a1/12-reisen.yaml#L242) | гл. 9 |
| der Bahnsteig ↻ | экз. | 2 · 1 · 1 · 1 | [09-s2](src/story/scenes/09.ts#L166) | — | — |
| der Baum ↻ | экз. | 3 · 2 · 2 · 2 | [07-s4](src/story/scenes/07.ts#L444) [07-s6](src/story/scenes/07.ts#L757) [12-разминка](src/story/scenes/warmups.ts#L59) | — | — |
| das Bein ↻ | 10, экз. | 2 · 1 · 2 · 1 | [10-s1](src/story/scenes/10.ts#L53) [10-s3](src/story/scenes/10.ts#L359) | [10](content/a1/10-gesundheit.yaml#L92) | гл. 10 |
| der Beruf ↻ | 11, экз. | 5 · 1 · 5 · 3 | [11-s5](src/story/scenes/11.ts#L637) [11-s6](src/story/scenes/11.ts#L679) | [01](content/a1/01-kennenlernen.yaml#L218) [11](content/a1/11-arbeit.yaml#L3) | гл. 11 |
| das Bild ↻ | экз. | 3 · 2 · 2 · 2 | [07-s4](src/story/scenes/07.ts#L464) [07-s6](src/story/scenes/07.ts#L757) [12-разминка](src/story/scenes/warmups.ts#L59) | — | — |
| der Bleistift ↻ | экз. | 3 · 1 · 1 · 1 | [11-s2](src/story/scenes/11.ts#L187) [11-s4](src/story/scenes/11.ts#L437) | — | — |
| die Blume ↻ | экз. | 3 · 2 · 2 · 2 | [07-s4](src/story/scenes/07.ts#L444) [07-s6](src/story/scenes/07.ts#L757) [12-разминка](src/story/scenes/warmups.ts#L59) | — | — |
| das Datum ↻ | 12, экз. | 2 · 1 · 2 · 0 | [12-s3](src/story/scenes/12.ts#L302) | [12](content/a1/12-reisen.yaml#L130) | гл. 12 |
| die Disco ↻ | экз. | 3 · 2 · 2 · 2 | [07-s3](src/story/scenes/07.ts#L417) [12-разминка](src/story/scenes/warmups.ts#L59) | — | — |
| der Doktor | экз. | 12 · 1 · 2 · 6 | [10-s1](src/story/scenes/10.ts#L86) [10-s2](src/story/scenes/10.ts#L121) [10-s3](src/story/scenes/10.ts#L336) [10-s4](src/story/scenes/10.ts#L387) [10-s6](src/story/scenes/10.ts#L627) | [11](content/a1/11-arbeit.yaml#L36) | — |
| das Doppelzimmer ↻ | 12, экз. | 2 · 1 · 2 · 0 | [12-s3](src/story/scenes/12.ts#L302) | [12](content/a1/12-reisen.yaml#L106) | гл. 12 |
| die Durchsage ↻ | 12, экз. | 2 · 1 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L179) | [05](content/a1/05-einkaufen.yaml#L208) [09](content/a1/09-stadt.yaml#L207) [12](content/a1/12-reisen.yaml#L98) | гл. 12 |
| der Eingang ↻ | экз. | 2 · 1 · 1 · 1 | [09-s2](src/story/scenes/09.ts#L159) | [09](content/a1/09-stadt.yaml#L236) | — |
| das Einzelzimmer ↻ | 12, экз. | 4 · 1 · 3 · 2 | [12-s1](src/story/scenes/12.ts#L135) [12-s3](src/story/scenes/12.ts#L302) | [12](content/a1/12-reisen.yaml#L36) | гл. 12 |
| das Ergebnis ↻ | экз. | 2 · 1 · 1 · 1 | [11-s4](src/story/scenes/11.ts#L450) | — | — |
| die Erkältung ↻ | 10 | 5 · 1 · 3 · 2 | [10-s1](src/story/scenes/10.ts#L39) [10-s3](src/story/scenes/10.ts#L359) [10-s6](src/story/scenes/10.ts#L701) | [10](content/a1/10-gesundheit.yaml#L100) | гл. 10 |
| das Feuer ↻ | экз. | 3 · 2 · 2 · 2 | [07-s3](src/story/scenes/07.ts#L417) [12-разминка](src/story/scenes/warmups.ts#L59) | — | — |
| das Fieber ↻ | 10, экз. | 6 · 1 · 4 · 3 | [10-s1](src/story/scenes/10.ts#L27) [10-s3](src/story/scenes/10.ts#L359) [10-s6](src/story/scenes/10.ts#L701) | [10](content/a1/10-gesundheit.yaml#L38) | гл. 10 |
| die Firma ↻ | 11, экз. | 9 · 1 · 7 · 5 | [11-s1](src/story/scenes/11.ts#L99) [11-s2](src/story/scenes/11.ts#L275) [11-s3](src/story/scenes/11.ts#L300) [11-s5](src/story/scenes/11.ts#L637) [11-s6](src/story/scenes/11.ts#L708) | [11](content/a1/11-arbeit.yaml#L124) | гл. 11 |
| der Flughafen ↻ | 12, экз. | 2 · 1 · 2 · 2 | [12-s1](src/story/scenes/12.ts#L135) [12-s2](src/story/scenes/12.ts#L263) | [12](content/a1/12-reisen.yaml#L94) | гл. 12 |
| das Flugzeug ↻ | 12, экз. | 2 · 1 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L209) | [12](content/a1/12-reisen.yaml#L93) | гл. 12 |
| der Flur ↻ | 8 | 5 · 1 · 2 · 2 | [08-s1](src/story/scenes/08.ts#L126) [08-s5](src/story/scenes/08.ts#L605) [08-s6](src/story/scenes/08.ts#L801) | [08](content/a1/08-wohnen.yaml#L60) | гл. 8 |
| die Freizeit ↻ | 7, экз. | 4 · 2 · 4 · 4 | [07-s2](src/story/scenes/07.ts#L261) [07-s3](src/story/scenes/07.ts#L419) [07-s6](src/story/scenes/07.ts#L720) [12-разминка](src/story/scenes/warmups.ts#L59) | [07](content/a1/07-freizeit.yaml#L1) | гл. 7 |
| der Fußball | экз. | 5 · 2 · 4 · 4 | [07-s3](src/story/scenes/07.ts#L392) [07-s6](src/story/scenes/07.ts#L747) [12-разминка](src/story/scenes/warmups.ts#L59) | [07](content/a1/07-freizeit.yaml#L115) | гл. 7 |
| der Garten ↻ | экз. | 3 · 2 · 2 · 2 | [07-s4](src/story/scenes/07.ts#L444) [07-s6](src/story/scenes/07.ts#L757) [12-разминка](src/story/scenes/warmups.ts#L59) | — | — |
| das Gepäck ↻ | экз. | 2 · 1 · 1 · 0 | [12-s3](src/story/scenes/12.ts#L302) | — | — |
| das Gespräch | экз. | 4 · 1 · 2 · 4 | [11-s1](src/story/scenes/11.ts#L99) [11-s4](src/story/scenes/11.ts#L27) | [09](content/a1/09-stadt.yaml#L222) [11](content/a1/11-arbeit.yaml#L48) | гл. 11 |
| das Glück ↻ | экз. | 2 · 2 · 0 · 1 | [09-s4](src/story/scenes/09.ts#L580) [10-s1](src/story/scenes/10.ts#L78) | [11](content/a1/11-arbeit.yaml#L50) | — |
| die Gruppe ↻ | экз. | 2 · 1 · 1 · 1 | [07-s3](src/story/scenes/07.ts#L417) | — | — |
| der Gruß | экз. | 12 · 12 · 12 · 0 | [01-s5](src/story/scenes/01.ts#L567) [02-s5](src/story/scenes/02.ts#L595) [03-s5](src/story/scenes/03.ts#L691) [04-s5](src/story/scenes/04.ts#L641) [05-s5](src/story/scenes/05.ts#L649) [06-s5](src/story/scenes/06.ts#L633) [07-s5](src/story/scenes/07.ts#L618) [08-s5](src/story/scenes/08.ts#L697) | [03](content/a1/03-familie.yaml#L230) [07](content/a1/07-freizeit.yaml#L229) [10](content/a1/10-gesundheit.yaml#L201) [12](content/a1/12-reisen.yaml#L80) | гл. 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 |
| das Haar ↻ | экз. | 2 · 1 · 1 · 1 | [10-s1](src/story/scenes/10.ts#L105) | — | — |
| die Halbpension ↻ | экз. | 2 · 1 · 1 · 0 | [12-s3](src/story/scenes/12.ts#L302) | — | — |
| der Hals ↻ | 10 | 10 · 1 · 5 · 6 | [10-s1](src/story/scenes/10.ts#L39) [10-s3](src/story/scenes/10.ts#L253) [10-s4](src/story/scenes/10.ts#L28) [10-s6](src/story/scenes/10.ts#L701) | [10](content/a1/10-gesundheit.yaml#L60) | гл. 10 |
| die Hausaufgabe ↻ | экз. | 2 · 1 · 1 · 1 | [11-s4](src/story/scenes/11.ts#L437) | [10](content/a1/10-gesundheit.yaml#L211) | — |
| der Hausmann (от die Hausfrau) ↻ | 11, экз. | 2 · 1 · 2 · 2 | [11-s1](src/story/scenes/11.ts#L99) [11-s6](src/story/scenes/11.ts#L708) | [11](content/a1/11-arbeit.yaml#L116) | гл. 11 |
| die Hausnummer | 2 | 3 · 1 · 2 · 1 | [02-s3](src/story/scenes/02.ts#L244) | [02](content/a1/02-zahlen.yaml#L134) | гл. 2 |
| die Heimat ↻ | экз. | 3 · 3 · 2 · 2 | [01-s6](src/story/scenes/01.ts#L607) [02-разминка](src/story/scenes/warmups.ts#L8) [03-разминка](src/story/scenes/warmups.ts#L14) | — | — |
| die Heizung ↻ | 8 | 2 · 1 · 2 · 0 | [08-s3](src/story/scenes/08.ts#L386) | [08](content/a1/08-wohnen.yaml#L44) | гл. 8 |
| der Herd ↻ | 8, экз. | 3 · 1 · 3 · 1 | [08-s2](src/story/scenes/08.ts#L166) [08-s4](src/story/scenes/08.ts#L577) | [08](content/a1/08-wohnen.yaml#L68) | гл. 8 |
| das Hotel ↻ | 12, экз. | 18 · 1 · 10 · 6 | [12-s1](src/story/scenes/12.ts#L26) [12-s2](src/story/scenes/12.ts#L226) [12-s3](src/story/scenes/12.ts#L277) [12-s5](src/story/scenes/12.ts#L512) | [12](content/a1/12-reisen.yaml#L26) | гл. 12 |
| der Husten ↻ | 10 | 2 · 1 · 2 · 1 | [10-s3](src/story/scenes/10.ts#L359) [10-s5](src/story/scenes/10.ts#L554) | [10](content/a1/10-gesundheit.yaml#L102) | гл. 10 |
| die Idee ↻ | 7 | 9 · 1 · 3 · 6 | [07-s1](src/story/scenes/07.ts#L38) [07-s3](src/story/scenes/07.ts#L410) [07-s4](src/story/scenes/07.ts#L453) [07-s5](src/story/scenes/07.ts#L543) | [07](content/a1/07-freizeit.yaml#L70) | гл. 7 |
| die Kaltmiete ↻ | 8 | 3 · 1 · 3 · 0 | [08-s2](src/story/scenes/08.ts#L257) [08-s3](src/story/scenes/08.ts#L386) | [08](content/a1/08-wohnen.yaml#L44) | гл. 8 |
| die Kellnerin ↻ | 11 | 2 · 1 · 2 · 1 | [11-s1](src/story/scenes/11.ts#L133) [11-s2](src/story/scenes/11.ts#L275) | [04](content/a1/04-essen.yaml#L187) [11](content/a1/11-arbeit.yaml#L95) | гл. 11 |
| das Kino ↻ | 7, экз. | 17 · 1 · 11 · 8 | [07-s1](src/story/scenes/07.ts#L38) [07-s2](src/story/scenes/07.ts#L180) [07-s4](src/story/scenes/07.ts#L524) [07-s5](src/story/scenes/07.ts#L559) [07-i1](src/story/scenes/07.ts#L666) [07-s6](src/story/scenes/07.ts#L720) | [07](content/a1/07-freizeit.yaml#L131) [08](content/a1/08-wohnen.yaml#L694) [09](content/a1/09-stadt.yaml#L87) | гл. 7 |
| der Kiosk | экз. | 12 · 3 · 7 · 0 | [06-s2](src/story/scenes/06.ts#L163) [06-s3](src/story/scenes/06.ts#L428) [06-s5](src/story/scenes/06.ts#L633) [06-s6](src/story/scenes/06.ts#L730) [07-s3](src/story/scenes/07.ts#L297) [08-i1](src/story/scenes/08.ts#L278) [08-s6](src/story/scenes/08.ts#L812) | [01](content/a1/01-kennenlernen.yaml#L598) | — |
| die Klasse ↻ | экз. | 2 · 1 · 1 · 1 | [11-s4](src/story/scenes/11.ts#L450) | — | — |
| die Köchin ↻ | 11 | 5 · 1 · 5 · 3 | [11-s1](src/story/scenes/11.ts#L133) [11-s2](src/story/scenes/11.ts#L275) [11-s4](src/story/scenes/11.ts#L449) [11-s6](src/story/scenes/11.ts#L720) | [11](content/a1/11-arbeit.yaml#L91) | гл. 11 |
| der Koffer ↻ | 12, экз. | 7 · 1 · 5 · 4 | [12-s1](src/story/scenes/12.ts#L77) [12-s2](src/story/scenes/12.ts#L263) [12-s3](src/story/scenes/12.ts#L277) [12-s6](src/story/scenes/12.ts#L703) | [12](content/a1/12-reisen.yaml#L99) | гл. 12 |
| der Kollege ↻ | 11, экз. | 2 · 1 · 2 · 2 | [11-s6](src/story/scenes/11.ts#L708) | [11](content/a1/11-arbeit.yaml#L126) | гл. 11 |
| das Konzert ↻ | 7 | 3 · 1 · 3 · 2 | [07-s2](src/story/scenes/07.ts#L264) [07-s6](src/story/scenes/07.ts#L757) | [07](content/a1/07-freizeit.yaml#L146) | гл. 7 |
| der Kopf ↻ | 10, экз. | 11 · 1 · 9 · 6 | [10-s1](src/story/scenes/10.ts#L39) [10-s2](src/story/scenes/10.ts#L230) [10-s3](src/story/scenes/10.ts#L253) [10-s6](src/story/scenes/10.ts#L686) | [10](content/a1/10-gesundheit.yaml#L82) | гл. 10 |
| der Krankenpfleger ↻ | 11 | 2 · 1 · 2 · 2 | [11-s1](src/story/scenes/11.ts#L99) | [11](content/a1/11-arbeit.yaml#L111) | гл. 11 |
| der Kurs | экз. | 2 · 1 · 0 · 0 | [03-s4](src/story/scenes/03.ts#L474) | [01](content/a1/01-kennenlernen.yaml#L26) [02](content/a1/02-zahlen.yaml#L141) [06](content/a1/06-tagesablauf.yaml#L36) [07](content/a1/07-freizeit.yaml#L223) [10](content/a1/10-gesundheit.yaml#L58) [11](content/a1/11-arbeit.yaml#L74) [12](content/a1/12-reisen.yaml#L198) | гл. 6 |
| der Lehrer ↻ | 11, экз. | 5 · 1 · 4 · 1 | [11-s1](src/story/scenes/11.ts#L79) [11-s2](src/story/scenes/11.ts#L275) [11-s4](src/story/scenes/11.ts#L450) [11-s6](src/story/scenes/11.ts#L690) | [11](content/a1/11-arbeit.yaml#L86) | гл. 11 |
| die Lehrerin ↻ | 11 | 3 · 1 · 2 · 1 | [11-s1](src/story/scenes/11.ts#L133) [11-s4](src/story/scenes/11.ts#L450) [11-s6](src/story/scenes/11.ts#L690) | [11](content/a1/11-arbeit.yaml#L87) | гл. 11 |
| das Lied | экз. | 3 · 1 · 2 · 1 | [11-s3](src/story/scenes/11.ts#L300) [11-s5](src/story/scenes/11.ts#L622) | — | — |
| die Lösung ↻ | экз. | 2 · 1 · 1 · 1 | [11-s4](src/story/scenes/11.ts#L437) | — | — |
| das Medikament ↻ | 10 | 7 · 1 · 4 · 4 | [10-s1](src/story/scenes/10.ts#L57) [10-s5](src/story/scenes/10.ts#L524) | [10](content/a1/10-gesundheit.yaml#L119) | гл. 10 |
| das Meer ↻ | экз. | 2 · 2 · 1 · 0 | [11-s1](src/story/scenes/11.ts#L79) [12-s2](src/story/scenes/12.ts#L189) | — | — |
| der Mensch ↻ | экз. | 3 · 3 · 2 · 2 | [01-s6](src/story/scenes/01.ts#L607) [02-разминка](src/story/scenes/warmups.ts#L8) [03-разминка](src/story/scenes/warmups.ts#L14) | — | — |
| die Miete (от mieten) ↻ | 8, экз. | 4 · 1 · 4 · 0 | [08-s2](src/story/scenes/08.ts#L257) [08-s3](src/story/scenes/08.ts#L386) [08-s4](src/story/scenes/08.ts#L577) | [08](content/a1/08-wohnen.yaml#L44) | гл. 8 |
| der Mund ↻ | экз. | 2 · 1 · 1 · 1 | [10-s1](src/story/scenes/10.ts#L105) | — | — |
| die Nase ↻ | 10 | 5 · 1 · 4 · 3 | [10-s1](src/story/scenes/10.ts#L38) [10-s3](src/story/scenes/10.ts#L359) [10-s6](src/story/scenes/10.ts#L701) | [10](content/a1/10-gesundheit.yaml#L85) | гл. 10 |
| die Nebenkosten | 8 | 2 · 1 · 2 · 0 | [08-s3](src/story/scenes/08.ts#L386) | [08](content/a1/08-wohnen.yaml#L40) | гл. 8 |
| das Ohr ↻ | 10 | 3 · 1 · 2 · 3 | [10-s1](src/story/scenes/10.ts#L53) | [10](content/a1/10-gesundheit.yaml#L84) | гл. 10 |
| die Ordnung ↻ | экз. | 2 · 2 · 0 · 0 | [08-s2](src/story/scenes/08.ts#L227) [11-s5](src/story/scenes/11.ts#L574) | [08](content/a1/08-wohnen.yaml#L274) [09](content/a1/09-stadt.yaml#L158) | — |
| das Papier | экз. | 2 · 2 · 0 · 1 | [04-s2](src/story/scenes/04.ts#L226) [11-s5](src/story/scenes/11.ts#L574) | — | — |
| der Park ↻ | 7 | 3 · 1 · 3 · 2 | [07-s3](src/story/scenes/07.ts#L419) [07-s4](src/story/scenes/07.ts#L524) [07-s6](src/story/scenes/07.ts#L757) | [07](content/a1/07-freizeit.yaml#L148) | гл. 7 |
| die Person ↻ | 12 | 3 · 2 · 3 · 1 | [01-s6](src/story/scenes/01.ts#L599) [12-s3](src/story/scenes/12.ts#L302) | [01](content/a1/01-kennenlernen.yaml#L114) [02](content/a1/02-zahlen.yaml#L203) [03](content/a1/03-familie.yaml#L166) [04](content/a1/04-essen.yaml#L227) [07](content/a1/07-freizeit.yaml#L183) [10](content/a1/10-gesundheit.yaml#L152) [11](content/a1/11-arbeit.yaml#L176) [12](content/a1/12-reisen.yaml#L107) | гл. 1, 12 |
| der Regenschirm ↻ | 12 | 4 · 1 · 4 · 2 | [12-s1](src/story/scenes/12.ts#L40) [12-s6](src/story/scenes/12.ts#L703) | [12](content/a1/12-reisen.yaml#L70) | гл. 12 |
| die Reise (от reisen) ↻ | 12, экз. | 3 · 1 · 3 · 3 | [12-s2](src/story/scenes/12.ts#L263) [12-s6](src/story/scenes/12.ts#L703) | [12](content/a1/12-reisen.yaml#L1) | гл. 12 |
| der Schalter ↻ | экз. | 2 · 1 · 1 · 1 | [09-s2](src/story/scenes/09.ts#L159) | — | — |
| das Schlafzimmer ↻ | 8 | 2 · 1 · 2 · 2 | [08-s1](src/story/scenes/08.ts#L126) [08-s6](src/story/scenes/08.ts#L828) | [08](content/a1/08-wohnen.yaml#L74) | гл. 8 |
| der Schmerz | 10 | 9 · 1 · 5 · 7 | [10-s1](src/story/scenes/10.ts#L86) [10-s2](src/story/scenes/10.ts#L122) [10-s6](src/story/scenes/10.ts#L673) | [10](content/a1/10-gesundheit.yaml#L18) | гл. 10 |
| der Schnupfen ↻ | 10 | 2 · 1 · 2 · 1 | [10-s3](src/story/scenes/10.ts#L359) [10-s5](src/story/scenes/10.ts#L554) | [10](content/a1/10-gesundheit.yaml#L103) | гл. 10 |
| der Schreibtisch ↻ | 8 | 2 · 1 · 2 · 2 | [08-s1](src/story/scenes/08.ts#L132) [08-s2](src/story/scenes/08.ts#L166) | [08](content/a1/08-wohnen.yaml#L128) | гл. 8 |
| der Schüler (от die Schule) ↻ | экз. | 2 · 1 · 1 · 1 | [11-s4](src/story/scenes/11.ts#L450) | — | — |
| die Schweiz ↻ | 1 | 3 · 3 · 3 · 3 | [01-s2](src/story/scenes/01.ts#L210) [02-разминка](src/story/scenes/warmups.ts#L8) [03-разминка](src/story/scenes/warmups.ts#L14) | [01](content/a1/01-kennenlernen.yaml#L139) [09](content/a1/09-stadt.yaml#L362) | гл. 1 |
| das Schwimmbad (от schwimmen) ↻ | 7, экз. | 2 · 1 · 2 · 2 | [07-s3](src/story/scenes/07.ts#L419) [07-s6](src/story/scenes/07.ts#L757) | [07](content/a1/07-freizeit.yaml#L147) | гл. 7 |
| die Sonne | экз. | 8 · 2 · 3 · 4 | [11-s1](src/story/scenes/11.ts#L25) [12-s1](src/story/scenes/12.ts#L135) [12-s2](src/story/scenes/12.ts#L189) [12-s5](src/story/scenes/12.ts#L524) | [08](content/a1/08-wohnen.yaml#L64) [12](content/a1/12-reisen.yaml#L68) | гл. 12 |
| der Sport ↻ | 7, экз. | 2 · 1 · 2 · 2 | [07-s3](src/story/scenes/07.ts#L419) [07-s4](src/story/scenes/07.ts#L521) | [07](content/a1/07-freizeit.yaml#L143) [10](content/a1/10-gesundheit.yaml#L64) | гл. 7 |
| die Straßenbahn ↻ | 9, экз. | 5 · 1 · 4 · 3 | [09-s1](src/story/scenes/09.ts#L77) [09-s6](src/story/scenes/09.ts#L829) | [09](content/a1/09-stadt.yaml#L118) | гл. 9 |
| der Student (от das Studium) ↻ | 11, экз. | 7 · 1 · 4 · 5 | [11-s1](src/story/scenes/11.ts#L63) [11-s2](src/story/scenes/11.ts#L275) [11-s4](src/story/scenes/11.ts#L448) [11-s6](src/story/scenes/11.ts#L720) | [01](content/a1/01-kennenlernen.yaml#L600) [11](content/a1/11-arbeit.yaml#L109) | гл. 11 |
| die Tablette ↻ | 10 | 12 · 1 · 8 · 8 | [10-s2](src/story/scenes/10.ts#L142) [10-s4](src/story/scenes/10.ts#L439) [10-s5](src/story/scenes/10.ts#L554) [10-s6](src/story/scenes/10.ts#L627) | [10](content/a1/10-gesundheit.yaml#L118) | гл. 10 |
| der Termin ↻ | 10, экз. | 18 · 1 · 10 · 9 | [10-s1](src/story/scenes/10.ts#L86) [10-s2](src/story/scenes/10.ts#L153) [10-s3](src/story/scenes/10.ts#L253) [10-s5](src/story/scenes/10.ts#L554) | [07](content/a1/07-freizeit.yaml#L251) [10](content/a1/10-gesundheit.yaml#L25) | гл. 10 |
| der Test | экз. | 3 · 2 · 2 · 2 | [04-s1](src/story/scenes/04.ts#L52) [04-s5](src/story/scenes/04.ts#L572) [06-s5](src/story/scenes/06.ts#L697) | [04](content/a1/04-essen.yaml#L230) [06](content/a1/06-tagesablauf.yaml#L151) [11](content/a1/11-arbeit.yaml#L198) | гл. 4, 6 |
| das Ticket ↻ | экз. | 2 · 1 · 1 · 1 | [09-s2](src/story/scenes/09.ts#L180) | [12](content/a1/12-reisen.yaml#L747) | — |
| die Treppe ↻ | экз. | 3 · 1 · 2 · 2 | [08-s1](src/story/scenes/08.ts#L89) [08-s3](src/story/scenes/08.ts#L484) | [08](content/a1/08-wohnen.yaml#L100) | — |
| das Treppenhaus ↻ | 8 | 10 · 1 · 6 · 4 | [08-s1](src/story/scenes/08.ts#L85) [08-s3](src/story/scenes/08.ts#L334) [08-s6](src/story/scenes/08.ts#L801) | [08](content/a1/08-wohnen.yaml#L97) | гл. 8 |
| der Unterricht ↻ | экз. | 2 · 1 · 1 · 1 | [11-s4](src/story/scenes/11.ts#L450) | — | — |
| der Verkäufer (от verkaufen) | 11, экз. | 2 · 1 · 2 · 1 | [11-s1](src/story/scenes/11.ts#L79) | [05](content/a1/05-einkaufen.yaml#L27) [11](content/a1/11-arbeit.yaml#L92) | гл. 11 |
| die Verkäuferin ↻ | 11 | 2 · 1 · 2 · 1 | [11-s1](src/story/scenes/11.ts#L79) | [05](content/a1/05-einkaufen.yaml#L27) [11](content/a1/11-arbeit.yaml#L93) | гл. 11 |
| der Vermieter (от vermieten) ↻ | 8, экз. | 4 · 1 · 3 · 1 | [08-i1](src/story/scenes/08.ts#L286) [08-s3](src/story/scenes/08.ts#L337) | [08](content/a1/08-wohnen.yaml#L158) | гл. 8 |
| die Verspätung ↻ | 12 | 9 · 1 · 5 · 5 | [12-s2](src/story/scenes/12.ts#L190) [12-s3](src/story/scenes/12.ts#L27) [12-s6](src/story/scenes/12.ts#L703) | [09](content/a1/09-stadt.yaml#L215) [12](content/a1/12-reisen.yaml#L48) | гл. 12 |
| das Vorstellungsgespräch ↻ | 11 | 4 · 1 · 2 · 4 | [11-s1](src/story/scenes/11.ts#L99) [11-s4](src/story/scenes/11.ts#L27) | [11](content/a1/11-arbeit.yaml#L48) | гл. 11 |
| die Warmmiete ↻ | 8 | 3 · 1 · 3 · 0 | [08-s2](src/story/scenes/08.ts#L257) [08-s3](src/story/scenes/08.ts#L386) | [08](content/a1/08-wohnen.yaml#L162) | гл. 8 |
| das Wartezimmer ↻ | 10 | 11 · 1 · 5 · 5 | [10-s2](src/story/scenes/10.ts#L142) [10-s3](src/story/scenes/10.ts#L247) [10-s5](src/story/scenes/10.ts#L607) | [10](content/a1/10-gesundheit.yaml#L113) | гл. 10 |
| das Wetter ↻ | 12, экз. | 4 · 1 · 3 · 3 | [12-s1](src/story/scenes/12.ts#L37) [12-s6](src/story/scenes/12.ts#L703) | [12](content/a1/12-reisen.yaml#L66) | гл. 12 |
| das Wiederhören | экз. | 6 · 2 · 4 · 2 | [02-s1](src/story/scenes/02.ts#L103) [02-s3](src/story/scenes/02.ts#L360) [02-s6](src/story/scenes/02.ts#L690) [03-s6](src/story/scenes/03.ts#L775) | [02](content/a1/02-zahlen.yaml#L50) [06](content/a1/06-tagesablauf.yaml#L199) [10](content/a1/10-gesundheit.yaml#L187) | гл. 2 |
| das Wiedersehen | экз. | 9 · 3 · 8 · 0 | [01-s1](src/story/scenes/01.ts#L62) [01-s3](src/story/scenes/01.ts#L220) [02-s1](src/story/scenes/02.ts#L120) [02-s6](src/story/scenes/02.ts#L744) [05-s1](src/story/scenes/05.ts#L127) | [01](content/a1/01-kennenlernen.yaml#L70) [02](content/a1/02-zahlen.yaml#L303) | гл. 1 |
| der Wind | экз. | 3 · 1 · 1 · 2 | [12-s1](src/story/scenes/12.ts#L49) [12-s2](src/story/scenes/12.ts#L179) | [12](content/a1/12-reisen.yaml#L338) | гл. 12 |
| das Wohnheim ↻ | 8 | 4 · 1 · 1 · 2 | [08-s3](src/story/scenes/08.ts#L386) | [08](content/a1/08-wohnen.yaml#L102) | гл. 8 |
| das Wohnzimmer ↻ | 8 | 3 · 1 · 3 · 1 | [08-s1](src/story/scenes/08.ts#L126) [08-s3](src/story/scenes/08.ts#L386) | [08](content/a1/08-wohnen.yaml#L60) | гл. 8 |
| der Zahn ↻ | 10 | 4 · 1 · 4 · 2 | [10-s1](src/story/scenes/10.ts#L53) [10-s2](src/story/scenes/10.ts#L126) | [10](content/a1/10-gesundheit.yaml#L86) | гл. 10 |

### Глаголы (36)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| abfahren | экз. | 3 · 1 · 2 · 1 | [09-s2](src/story/scenes/09.ts#L162) | [09](content/a1/09-stadt.yaml#L214) [12](content/a1/12-reisen.yaml#L246) | — |
| ankommen | экз. | 3 · 1 · 2 · 1 | [12-s2](src/story/scenes/12.ts#L244) | [12](content/a1/12-reisen.yaml#L48) | гл. 12 |
| aussteigen ↻ | 9, экз. | 7 · 1 · 3 · 2 | [09-s2](src/story/scenes/09.ts#L192) [09-s3](src/story/scenes/09.ts#L320) [09-s6](src/story/scenes/09.ts#L829) | [09](content/a1/09-stadt.yaml#L143) | гл. 9 |
| dauern | 6, экз. | 3 · 2 · 2 · 3 | [06-s5](src/story/scenes/06.ts#L596) [09-s5](src/story/scenes/09.ts#L702) | [06](content/a1/06-tagesablauf.yaml#L116) | гл. 6 |
| einladen ↻ | 7, экз. | 3 · 2 · 1 · 2 | [07-s1](src/story/scenes/07.ts#L37) [07-s3](src/story/scenes/07.ts#L423) [12-разминка](src/story/scenes/warmups.ts#L59) | [07](content/a1/07-freizeit.yaml#L171) | гл. 7 |
| einsteigen ↻ | 9, экз. | 4 · 1 · 2 · 3 | [09-s2](src/story/scenes/09.ts#L189) [09-s6](src/story/scenes/09.ts#L739) | [09](content/a1/09-stadt.yaml#L142) | гл. 9 |
| erzählen | экз. | 2 · 1 · 1 · 2 | [10-s5](src/story/scenes/10.ts#L568) | — | — |
| fotografieren ↻ | 7 | 5 · 2 · 5 · 2 | [07-s4](src/story/scenes/07.ts#L436) [12-разминка](src/story/scenes/warmups.ts#L59) | [02](content/a1/02-zahlen.yaml#L914) [07](content/a1/07-freizeit.yaml#L91) | гл. 7 |
| freuen | экз. | 2 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L634) | — | — |
| gefallen ↻ | экз. | 2 · 1 · 0 · 1 | [07-s3](src/story/scenes/07.ts#L409) | — | — |
| glauben | экз. | 3 · 2 · 1 · 3 | [06-s2](src/story/scenes/06.ts#L164) [09-s5](src/story/scenes/09.ts#L702) | — | — |
| holen | экз. | 5 · 2 · 2 · 4 | [07-s2](src/story/scenes/07.ts#L149) [07-s4](src/story/scenes/07.ts#L454) [11-i1](src/story/scenes/11.ts#L150) | — | гл. 11 |
| kennen | экз. | 3 · 3 · 0 · 3 | [04-s3](src/story/scenes/04.ts#L384) [09-i1](src/story/scenes/09.ts#L294) [10-s1](src/story/scenes/10.ts#L95) | [11](content/a1/11-arbeit.yaml#L199) | — |
| kennenlernen (от kennen) ↻ | экз. | 2 · 2 · 1 · 1 | [01-s6](src/story/scenes/01.ts#L608) [02-разминка](src/story/scenes/warmups.ts#L8) | [01](content/a1/01-kennenlernen.yaml#L1) [11](content/a1/11-arbeit.yaml#L199) | — |
| laufen ↻ | экз. | 2 · 1 · 1 · 1 | [07-s1](src/story/scenes/07.ts#L88) [07-s6](src/story/scenes/07.ts#L769) | — | — |
| lernen | экз. | 2 · 2 · 2 · 0 | [11-s1](src/story/scenes/11.ts#L56) [12-s6](src/story/scenes/12.ts#L709) | [11](content/a1/11-arbeit.yaml#L165) | гл. 11 |
| lesen ↻ | 7, экз. | 3 · 1 · 3 · 3 | [07-s1](src/story/scenes/07.ts#L89) [07-s6](src/story/scenes/07.ts#L760) | [03](content/a1/03-familie.yaml#L19) [05](content/a1/05-einkaufen.yaml#L19) [06](content/a1/06-tagesablauf.yaml#L21) [07](content/a1/07-freizeit.yaml#L20) [08](content/a1/08-wohnen.yaml#L23) [09](content/a1/09-stadt.yaml#L21) [10](content/a1/10-gesundheit.yaml#L222) [11](content/a1/11-arbeit.yaml#L21) [12](content/a1/12-reisen.yaml#L253) | гл. 7 |
| mieten | 8, экз. | 4 · 1 · 4 · 0 | [08-s2](src/story/scenes/08.ts#L257) [08-s3](src/story/scenes/08.ts#L386) [08-s4](src/story/scenes/08.ts#L577) | [08](content/a1/08-wohnen.yaml#L44) | гл. 8 |
| mitbringen | экз. | 7 · 2 · 5 · 6 | [10-s6](src/story/scenes/10.ts#L30) [12-s6](src/story/scenes/12.ts#L624) | [07](content/a1/07-freizeit.yaml#L228) [10](content/a1/10-gesundheit.yaml#L42) | гл. 12 |
| mitnehmen | экз. | 5 · 2 · 3 · 3 | [08-i1](src/story/scenes/08.ts#L29) [08-s3](src/story/scenes/08.ts#L386) [12-s1](src/story/scenes/12.ts#L121) | [10](content/a1/10-gesundheit.yaml#L272) | — |
| öffnen | экз. | 3 · 2 · 1 · 2 | [10-s5](src/story/scenes/10.ts#L531) [12-s3](src/story/scenes/12.ts#L302) | [06](content/a1/06-tagesablauf.yaml#L214) [09](content/a1/09-stadt.yaml#L553) | гл. 7 |
| rauchen ↻ | 10, экз. | 2 · 1 · 1 · 1 | [10-s2](src/story/scenes/10.ts#L212) [10-s5](src/story/scenes/10.ts#L554) | [10](content/a1/10-gesundheit.yaml#L130) | гл. 10 |
| reisen | экз. | 3 · 1 · 3 · 3 | [12-s2](src/story/scenes/12.ts#L263) [12-s6](src/story/scenes/12.ts#L703) | [12](content/a1/12-reisen.yaml#L1) | гл. 12 |
| reparieren | экз. | 2 · 2 · 0 · 2 | [06-s6](src/story/scenes/06.ts#L761) [11-s6](src/story/scenes/11.ts#L676) | — | — |
| reservieren | 12 | 5 · 1 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L288) | [02](content/a1/02-zahlen.yaml#L914) [12](content/a1/12-reisen.yaml#L113) | гл. 12 |
| scheinen | экз. | 3 · 1 · 1 · 0 | [12-s5](src/story/scenes/12.ts#L524) | [12](content/a1/12-reisen.yaml#L68) | гл. 12 |
| schicken | экз. | 2 · 2 · 0 · 2 | [05-s6](src/story/scenes/05.ts#L789) [06-s1](src/story/scenes/06.ts#L92) | — | — |
| schwimmen ↻ | 7, экз. | 11 · 1 · 9 · 8 | [07-s1](src/story/scenes/07.ts#L89) [07-s4](src/story/scenes/07.ts#L453) [07-s5](src/story/scenes/07.ts#L569) [07-s6](src/story/scenes/07.ts#L720) | [07](content/a1/07-freizeit.yaml#L35) | гл. 7 |
| spielen | экз. | 6 · 2 · 5 · 5 | [07-s1](src/story/scenes/07.ts#L89) [07-s3](src/story/scenes/07.ts#L392) [07-s6](src/story/scenes/07.ts#L747) [12-разминка](src/story/scenes/warmups.ts#L59) | [07](content/a1/07-freizeit.yaml#L39) [11](content/a1/11-arbeit.yaml#L402) | гл. 7 |
| tun | экз. | 7 · 2 · 5 · 2 | [10-s1](src/story/scenes/10.ts#L39) [10-s2](src/story/scenes/10.ts#L230) [10-s3](src/story/scenes/10.ts#L352) [10-s6](src/story/scenes/10.ts#L686) [11-s3](src/story/scenes/11.ts#L300) | [10](content/a1/10-gesundheit.yaml#L60) [12](content/a1/12-reisen.yaml#L50) | гл. 10, 11 |
| übernachten ↻ | экз. | 2 · 1 · 1 · 0 | [12-s3](src/story/scenes/12.ts#L302) | — | — |
| umsteigen ↻ | 9 | 2 · 1 · 2 · 1 | [09-s2](src/story/scenes/09.ts#L224) [09-s6](src/story/scenes/09.ts#L829) | [09](content/a1/09-stadt.yaml#L144) | гл. 9 |
| unterschreiben ↻ | экз. | 2 · 2 · 1 · 1 | [01-s4](src/story/scenes/01.ts#L463) [02-разминка](src/story/scenes/warmups.ts#L8) | — | — |
| vorstellen | экз. | 2 · 2 · 1 · 1 | [01-s6](src/story/scenes/01.ts#L608) [02-разминка](src/story/scenes/warmups.ts#L8) | [01](content/a1/01-kennenlernen.yaml#L213) [11](content/a1/11-arbeit.yaml#L204) | — |
| wandern ↻ | экз. | 3 · 1 · 2 · 2 | [07-s1](src/story/scenes/07.ts#L88) [07-s6](src/story/scenes/07.ts#L761) | — | — |
| willkommen | экз. | 3 · 2 · 1 · 3 | [09-s6](src/story/scenes/09.ts#L797) [12-s5](src/story/scenes/12.ts#L28) | [12](content/a1/12-reisen.yaml#L34) | — |

### Прилагательные и наречия (22)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| besser | экз. | 4 · 1 · 2 · 2 | [10-s3](src/story/scenes/10.ts#L253) [10-s5](src/story/scenes/10.ts#L557) | — | — |
| bisschen | экз. | 4 · 1 · 2 · 1 | [01-s3](src/story/scenes/01.ts#L220) [01-s4](src/story/scenes/01.ts#L415) | [01](content/a1/01-kennenlernen.yaml#L46) [03](content/a1/03-familie.yaml#L229) [06](content/a1/06-tagesablauf.yaml#L70) [11](content/a1/11-arbeit.yaml#L214) | — |
| dunkel | 8 | 5 · 1 · 2 · 0 | [08-s1](src/story/scenes/08.ts#L85) [08-s2](src/story/scenes/08.ts#L164) [08-s3](src/story/scenes/08.ts#L450) [08-s4](src/story/scenes/08.ts#L577) | [08](content/a1/08-wohnen.yaml#L139) | гл. 8 |
| fertig | экз. | 2 · 1 · 1 · 1 | [07-s3](src/story/scenes/07.ts#L297) | — | — |
| geöffnet (от öffnen) | экз. | 3 · 2 · 1 · 2 | [10-s5](src/story/scenes/10.ts#L531) [12-s3](src/story/scenes/12.ts#L302) | [06](content/a1/06-tagesablauf.yaml#L214) [09](content/a1/09-stadt.yaml#L553) | — |
| geschlossen (от schließen) | экз. | 4 · 2 · 3 · 1 | [06-s3](src/story/scenes/06.ts#L294) [08-s4](src/story/scenes/08.ts#L564) | [06](content/a1/06-tagesablauf.yaml#L213) [09](content/a1/09-stadt.yaml#L234) | гл. 9, 11 |
| gesund | 10 | 5 · 2 · 1 · 2 | [10-s1](src/story/scenes/10.ts#L57) [11-s1](src/story/scenes/11.ts#L36) | [10](content/a1/10-gesundheit.yaml#L99) | гл. 10 |
| hell | 8, экз. | 2 · 1 · 1 · 0 | [08-s4](src/story/scenes/08.ts#L496) | [08](content/a1/08-wohnen.yaml#L62) | гл. 8 |
| herzlich | экз. | 14 · 12 · 14 · 0 | [01-s5](src/story/scenes/01.ts#L567) [02-s5](src/story/scenes/02.ts#L595) [03-s5](src/story/scenes/03.ts#L691) [03-s6](src/story/scenes/03.ts#L742) [04-s5](src/story/scenes/04.ts#L641) [05-s5](src/story/scenes/05.ts#L649) [06-s5](src/story/scenes/06.ts#L633) [07-s5](src/story/scenes/07.ts#L618) | [12](content/a1/12-reisen.yaml#L207) | гл. 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 |
| international ↻ | экз. | 2 · 2 · 1 · 1 | [01-s6](src/story/scenes/01.ts#L607) [02-разминка](src/story/scenes/warmups.ts#L8) | — | — |
| kalt ↻ | 12 | 2 · 1 · 1 · 1 | [12-s1](src/story/scenes/12.ts#L37) | [08](content/a1/08-wohnen.yaml#L40) [12](content/a1/12-reisen.yaml#L66) | гл. 12 |
| laut | 8, экз. | 3 · 3 · 3 · 1 | [07-i1](src/story/scenes/07.ts#L667) [08-s4](src/story/scenes/08.ts#L577) [11-разминка](src/story/scenes/warmups.ts#L53) | [08](content/a1/08-wohnen.yaml#L140) | гл. 8 |
| leise | экз. | 2 · 1 · 1 · 2 | [10-s2](src/story/scenes/10.ts#L194) | — | — |
| manchmal ↻ | 7 | 2 · 1 · 2 · 1 | [07-s2](src/story/scenes/07.ts#L264) [07-s4](src/story/scenes/07.ts#L453) | [07](content/a1/07-freizeit.yaml#L161) | гл. 7 |
| möbliert ↻ | 8 | 2 · 1 · 2 · 0 | [08-s3](src/story/scenes/08.ts#L386) | [08](content/a1/08-wohnen.yaml#L150) | гл. 8 |
| modern ↻ | 8 | 2 · 1 · 2 · 0 | [08-s3](src/story/scenes/08.ts#L386) | [08](content/a1/08-wohnen.yaml#L72) | гл. 8 |
| oft ↻ | 7, экз. | 2 · 1 · 2 · 1 | [07-s2](src/story/scenes/07.ts#L264) [07-s4](src/story/scenes/07.ts#L453) | [04](content/a1/04-essen.yaml#L66) [07](content/a1/07-freizeit.yaml#L152) [12](content/a1/12-reisen.yaml#L216) | гл. 7 |
| schnell | экз. | 6 · 2 · 3 · 3 | [09-s2](src/story/scenes/09.ts#L188) [09-s3](src/story/scenes/09.ts#L335) [12-s4](src/story/scenes/12.ts#L467) | [06](content/a1/06-tagesablauf.yaml#L46) | — |
| verboten ↻ | экз. | 2 · 2 · 0 · 0 | [09-s2](src/story/scenes/09.ts#L222) [10-s2](src/story/scenes/10.ts#L212) | — | — |
| vielleicht | экз. | 3 · 2 · 2 · 3 | [06-s5](src/story/scenes/06.ts#L655) [08-s3](src/story/scenes/08.ts#L365) | [04](content/a1/04-essen.yaml#L87) | — |
| warm | 12 | 10 · 2 · 3 · 6 | [08-s3](src/story/scenes/08.ts#L386) [08-s6](src/story/scenes/08.ts#L751) [12-s1](src/story/scenes/12.ts#L26) [12-s3](src/story/scenes/12.ts#L302) | [04](content/a1/04-essen.yaml#L245) [08](content/a1/08-wohnen.yaml#L258) [12](content/a1/12-reisen.yaml#L125) | гл. 12 |
| windig ↻ | 12 | 2 · 1 · 1 · 1 | [12-s1](src/story/scenes/12.ts#L37) [12-s6](src/story/scenes/12.ts#L704) | [12](content/a1/12-reisen.yaml#L66) | гл. 12 |

### Служебные слова (8)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| dir | экз. | 4 · 2 · 3 · 1 | [01-s1](src/story/scenes/01.ts#L74) [01-s3](src/story/scenes/01.ts#L220) [07-s3](src/story/scenes/07.ts#L410) | [06](content/a1/06-tagesablauf.yaml#L469) [09](content/a1/09-stadt.yaml#L66) | — |
| durch | экз. | 4 · 1 · 2 · 3 | [09-i1](src/story/scenes/09.ts#L293) [09-s4](src/story/scenes/09.ts#L31) | — | — |
| euer | экз. | 3 · 1 · 3 · 1 | [03-s1](src/story/scenes/03.ts#L94) [03-s5](src/story/scenes/03.ts#L651) | [03](content/a1/03-familie.yaml#L42) | — |
| ihm (от er) | экз. | 3 · 3 · 0 · 2 | [06-s5](src/story/scenes/06.ts#L629) [07-s5](src/story/scenes/07.ts#L543) [10-s3](src/story/scenes/10.ts#L247) | [11](content/a1/11-arbeit.yaml#L238) [12](content/a1/12-reisen.yaml#L228) | — |
| letzt- | экз. | 4 · 1 · 3 · 2 | [11-s2](src/story/scenes/11.ts#L245) [11-s6](src/story/scenes/11.ts#L708) | [11](content/a1/11-arbeit.yaml#L138) [12](content/a1/12-reisen.yaml#L824) | гл. 11 |
| seit | экз. | 2 · 2 · 0 · 2 | [06-s5](src/story/scenes/06.ts#L618) [10-s4](src/story/scenes/10.ts#L428) | — | — |
| so | экз. | 5 · 4 · 0 · 4 | [06-s1](src/story/scenes/06.ts#L44) [07-s2](src/story/scenes/07.ts#L251) [09-s1](src/story/scenes/09.ts#L85) [11-s1](src/story/scenes/11.ts#L111) [11-s2](src/story/scenes/11.ts#L197) | [02](content/a1/02-zahlen.yaml#L69) [05](content/a1/05-einkaufen.yaml#L163) [06](content/a1/06-tagesablauf.yaml#L42) [07](content/a1/07-freizeit.yaml#L746) [09](content/a1/09-stadt.yaml#L87) [11](content/a1/11-arbeit.yaml#L36) [12](content/a1/12-reisen.yaml#L66) | — |
| wohin | 9, экз. | 3 · 2 · 3 · 0 | [09-s5](src/story/scenes/09.ts#L664) [09-s6](src/story/scenes/09.ts#L744) [12-s1](src/story/scenes/12.ts#L108) | [09](content/a1/09-stadt.yaml#L135) [12](content/a1/12-reisen.yaml#L210) | гл. 9, 12 |

### Выражения (16)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| Achtung | экз. | 4 · 2 · 2 · 4 | [09-s2](src/story/scenes/09.ts#L28) [12-s2](src/story/scenes/12.ts#L190) | [09](content/a1/09-stadt.yaml#L214) [12](content/a1/12-reisen.yaml#L246) | — |
| am liebsten ↻ | 7 | 4 · 2 · 4 · 2 | [07-s1](src/story/scenes/07.ts#L101) [07-s3](src/story/scenes/07.ts#L392) [07-s6](src/story/scenes/07.ts#L720) [12-разминка](src/story/scenes/warmups.ts#L60) | [07](content/a1/07-freizeit.yaml#L18) | гл. 7 |
| Auf Wiederhören! | 2 | 5 · 2 · 3 · 2 | [02-s1](src/story/scenes/02.ts#L103) [02-s3](src/story/scenes/02.ts#L360) [02-s6](src/story/scenes/02.ts#L690) [03-s6](src/story/scenes/03.ts#L775) | [02](content/a1/02-zahlen.yaml#L50) [06](content/a1/06-tagesablauf.yaml#L199) [10](content/a1/10-gesundheit.yaml#L187) | гл. 2 |
| Auf Wiedersehen! | 1 | 8 · 3 · 7 · 0 | [01-s1](src/story/scenes/01.ts#L62) [01-s3](src/story/scenes/01.ts#L220) [02-s1](src/story/scenes/02.ts#L120) [02-s6](src/story/scenes/02.ts#L744) [05-s1](src/story/scenes/05.ts#L127) | [01](content/a1/01-kennenlernen.yaml#L70) [02](content/a1/02-zahlen.yaml#L303) | гл. 1 |
| Die Sonne scheint. | 12 | 2 · 1 · 0 · 0 | [12-s5](src/story/scenes/12.ts#L524) | [12](content/a1/12-reisen.yaml#L68) | гл. 12 |
| Fahrrad fahren ↻ | 7 | 3 · 3 · 3 · 2 | [07-s1](src/story/scenes/07.ts#L89) [09-i1](src/story/scenes/09.ts#L280) [12-разминка](src/story/scenes/warmups.ts#L59) | [07](content/a1/07-freizeit.yaml#L121) | гл. 7 |
| Fußball spielen ↻ | 7 | 4 · 2 · 3 · 4 | [07-s6](src/story/scenes/07.ts#L747) [12-разминка](src/story/scenes/warmups.ts#L59) | [07](content/a1/07-freizeit.yaml#L115) | гл. 7 |
| Gute Besserung! | 10 | 4 · 2 · 3 · 0 | [10-s1](src/story/scenes/10.ts#L71) [10-s5](src/story/scenes/10.ts#L541) [11-s4](src/story/scenes/11.ts#L475) | [10](content/a1/10-gesundheit.yaml#L3) | гл. 10 |
| in der Nähe ↻ | 9 | 2 · 1 · 2 · 1 | [09-s2](src/story/scenes/09.ts#L224) [09-s6](src/story/scenes/09.ts#L801) | [09](content/a1/09-stadt.yaml#L141) | гл. 9 |
| ins Kino gehen | 7 | 4 · 1 · 4 · 2 | [07-s1](src/story/scenes/07.ts#L43) [07-s2](src/story/scenes/07.ts#L180) [07-s5](src/story/scenes/07.ts#L559) | [07](content/a1/07-freizeit.yaml#L131) | гл. 7 |
| letzte Woche ↻ | 11 | 2 · 1 · 2 · 0 | [11-s2](src/story/scenes/11.ts#L245) | [11](content/a1/11-arbeit.yaml#L138) | гл. 11 |
| noch nicht | 11 | 5 · 2 · 1 · 3 | [11-s5](src/story/scenes/11.ts#L562) [12-s1](src/story/scenes/12.ts#L47) | [09](content/a1/09-stadt.yaml#L825) [11](content/a1/11-arbeit.yaml#L44) | гл. 11 |
| Schade! ↻ | 7 | 2 · 2 · 1 · 1 | [06-s4](src/story/scenes/06.ts#L532) [07-s5](src/story/scenes/07.ts#L646) | [07](content/a1/07-freizeit.yaml#L66) | гл. 7 |
| Wie komme ich zum …? | 9 | 2 · 1 · 2 · 1 | [09-i1](src/story/scenes/09.ts#L286) [09-s6](src/story/scenes/09.ts#L789) | [09](content/a1/09-stadt.yaml#L3) | гл. 9 |
| wie viel | экз. | 3 · 3 · 2 · 1 | [06-s4](src/story/scenes/06.ts#L533) [08-s6](src/story/scenes/08.ts#L764) [12-s6](src/story/scenes/12.ts#L702) | [05](content/a1/05-einkaufen.yaml#L102) [06](content/a1/06-tagesablauf.yaml#L106) [07](content/a1/07-freizeit.yaml#L70) [12](content/a1/12-reisen.yaml#L38) | гл. 6, 8 |
| zu Fuß | 9 | 5 · 2 · 4 · 2 | [09-s6](src/story/scenes/09.ts#L801) [12-s3](src/story/scenes/12.ts#L302) | [09](content/a1/09-stadt.yaml#L42) | гл. 9 |

### Числа, время, цвета и другие группы (9)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| der Dienstag | 6, экз. | 8 · 2 · 6 · 3 | [07-s2](src/story/scenes/07.ts#L168) [09-s1](src/story/scenes/09.ts#L40) [09-s3](src/story/scenes/09.ts#L335) | [06](content/a1/06-tagesablauf.yaml#L132) [11](content/a1/11-arbeit.yaml#L198) | гл. 6 |
| der Donnerstag | 6, экз. | 2 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L36) | [06](content/a1/06-tagesablauf.yaml#L134) [10](content/a1/10-gesundheit.yaml#L216) | гл. 6 |
| der Freitag | 6, экз. | 7 · 3 · 6 · 0 | [06-s3](src/story/scenes/06.ts#L294) [06-i1](src/story/scenes/06.ts#L476) [09-s3](src/story/scenes/09.ts#L335) [11-s1](src/story/scenes/11.ts#L79) [11-s5](src/story/scenes/11.ts#L574) | [06](content/a1/06-tagesablauf.yaml#L135) [07](content/a1/07-freizeit.yaml#L213) [10](content/a1/10-gesundheit.yaml#L184) [12](content/a1/12-reisen.yaml#L375) | гл. 6, 7 |
| das Grad | экз. | 4 · 1 · 2 · 3 | [12-s1](src/story/scenes/12.ts#L49) [12-s3](src/story/scenes/12.ts#L302) [12-s6](src/story/scenes/12.ts#L704) | [12](content/a1/12-reisen.yaml#L68) | гл. 12 |
| der Herbst ↻ | 12, экз. | 11 · 1 · 5 · 6 | [12-s1](src/story/scenes/12.ts#L37) [12-s4](src/story/scenes/12.ts#L432) [12-s6](src/story/scenes/12.ts#L703) | [12](content/a1/12-reisen.yaml#L137) | гл. 12 |
| der Osten | экз. | 2 · 1 · 2 · 0 | [08-s3](src/story/scenes/08.ts#L386) | [08](content/a1/08-wohnen.yaml#L40) | гл. 8 |
| der Quadratmeter ↻ | 8, экз. | 2 · 1 · 2 · 0 | [08-s3](src/story/scenes/08.ts#L386) | [08](content/a1/08-wohnen.yaml#L164) | гл. 8 |
| der Sommer ↻ | 12, экз. | 16 · 2 · 6 · 9 | [10-s1](src/story/scenes/10.ts#L86) [10-s2](src/story/scenes/10.ts#L121) [10-s3](src/story/scenes/10.ts#L336) [10-s4](src/story/scenes/10.ts#L387) [12-s4](src/story/scenes/12.ts#L432) [12-s6](src/story/scenes/12.ts#L703) | [05](content/a1/05-einkaufen.yaml#L227) [12](content/a1/12-reisen.yaml#L136) | гл. 12 |
| der Winter ↻ | 12, экз. | 3 · 1 · 3 · 2 | [12-s1](src/story/scenes/12.ts#L77) [12-s4](src/story/scenes/12.ts#L455) [12-s6](src/story/scenes/12.ts#L704) | [05](content/a1/05-einkaufen.yaml#L224) [12](content/a1/12-reisen.yaml#L138) | гл. 12 |

## Слова: закреплено

494 слов.

### Существительные (205)

das Alter, der Anfang, der Anruf, die Antwort, die Anzeige, der Apfel, die Apotheke, der Appetit, die Arbeit, der Arzt, die Ärztin, der Ausweis, das Bad, der Balkon, das Beispiel, das Bett, das Bier, die Birne, das Boot, der Brief, das Brot, das Brötchen, der Bruder, das Buch, der Buchstabe, der Bus, die Butter, das Café, die Cola, der Cousin, die Cousine, Dänemark, der Dank, der Döner, die Dose, die Dusche, die Ecke, die Ehefrau, der Ehemann, das Ei, die Einladung, die Eltern, das Ende, der Enkel, die Enkelin, die Entschuldigung, das Erdgeschoss, die Fahrkarte, das Fahrrad, die Familie, der Familienname, der Familienstand, die Farbe, der Feierabend, der Film, der Fisch, das Fischbrötchen, das Fleisch, das Formular, das Foto, die Frage, die Frau, der Freund, die Freundin, das Frühstück, der Fuß, der Gast, das Geburtsjahr, der Geburtsort, der Geburtstag, das Geld, das Gemüse, das Geschenk, die Geschwister, das Getränk, das Glas, der Glückwunsch, die Größe, die Großeltern, die Großmutter, der Großvater, die Gurke, der Hafen, das Hähnchen, die Haltestelle, die Hand, das Handy, die Handynummer, das Haus, das Hemd, der Herr, die Hilfe, das Hobby, die Hochzeit, die Hose, der Hund, der Hunger, die Jacke, der Junge, der Kaffee, die Karte, Kasachstan, der Käse, die Kasse, die Katze, der Keller, der Kellner, das Kind, das Kleid, der Koch, das Krankenhaus, die Küche, der Kuchen, der Kühlschrank, der Kunde, der Laden, die Lampe, das Land, die Leute, das Licht, die Linie, das Mädchen, der Mann, der Mantel, der Mechaniker, die Milch, der Moment, die Mutter, der Name, die Nummer, das Obst, die Oma, der Onkel, der Opa, die Packung, die Party, der Pass, die Pause, der Plan, der Platz, die Polizei, die Post, die Postleitzahl, die Praxis, der Preis, das Problem, die Prüfung, der Pullover, der Raum, die Rechnung, der Regen, der Reis, das Rezept, der Rock, der Rücken, der Rucksack, Russland, der Saft, der Salat, das Schild, der Schlüssel, der Schrank, der Schuh, die Schwester, das Sofa, der Sohn, die Speisekarte, die Sprache, die Stadt, die Stelle, der Stock, der Strand, die Straße, das Stück, der Stuhl, die Suppe, das T-Shirt, die Tasche, die Tasse, das Taxi, der Tee, das Telefon, die Telefonnummer, das Thema, der Tisch, die Tochter, die Tomate, die Türkei, die Tüte, die Uhr, die Ukraine, die Unterschrift, die USA, der Vater, die Versichertenkarte, der Vorname, das Wasser, die Wohnung, das Wort, die Wurst, die Zahl, die Zeit, das Zimmer, der Zug, die Zwiebel

### Глаголы (72)

anmachen, anrufen, arbeiten, aufhören, aufstehen, ausmachen, bestellen, bezahlen, bitten, bleiben, brauchen, bringen, buchstabieren, danken, dürfen, duschen, einkaufen, erklären, essen, fahren, finden, fragen, frühstücken, geben, gehen, gehören, haben, halten, heißen, helfen, hören, kaufen, kochen, kommen, können, kosten, lieben, liegen, machen, mitkommen, möchten, mögen, müssen, nehmen, passen, regnen, riechen, sagen, schlafen, schließen, schmecken, schreiben, segeln, sehen, sein, sitzen, sollen, sprechen, stehen, stellen, suchen, tanzen, telefonieren, treffen, trinken, warten, wehtun, werden, wiederholen, wissen, wohnen, wollen

### Прилагательные и наречия (48)

allein, alt, bar, billig, bitter, einmal, falsch, frei, früh, früher, geboren, geradeaus, gern, geschieden, gestern, groß, gut, heute, hinten, immer, jetzt, jung, kaputt, klar, klein, krank, lang, lange, langsam, ledig, leider, lieber, links, müde, neu, nie, rechts, richtig, ruhig, schön, schwer, sofort, spät, später, teuer, verheiratet, zurück, zusammen

### Служебные слова (66)

ab, aber, all-, also, an, auch, auf, aus, bei, bis, bitte, da, danke, dann, dein-, denn, der, dich, dies-, ein-, er, es, für, hier, ich, ihn, in, ja, jed-, kein, lieb-, man, mehr, mein, mit, nach, nein, nicht, nichts, noch, nur, oder, ohne, schon, sehr, sich, sie, über, um, und, unser-, unter, viel, von, vor, wann, warum, was, welch-, Welche?, wer, wie, wir, wo, woher, zu

### Выражения (29)

Alles Gute!, auf sein, aus sein, Danke, gut!, ein Kilo, ein Liter, ein Pfund, Es regnet., Gute Nacht!, Guten Abend!, Guten Appetit!, Guten Morgen!, Guten Tag!, hallo, Hunger haben, kommen aus, Langsam, bitte., Moin!, Noch einmal, bitte., tschüss, weg sein, Wie bitte?, Wie geht's?, Wie spät ist es?, wohnen in, Zeit haben, zu sein, zum Beispiel, Zusammen oder getrennt?

### Числа, время, цвета и другие группы (74)

der Abend, acht, achtzehn, der April, blau, deutsch, Deutschland, der Dezember, drei, dreißig, dreizehn, dritte, eins, elf, erste, der Euro, Europa, der Februar, fünf, fünfzehn, fünfzig, gelb, das Gramm, grau, halb, hundert, das Jahr, der Januar, der Juli, der Juni, das Kilo, der Liter, der Mai, der März, der Meter, die Minute, der Mittag, der Montag, morgen, der Nachmittag, die Nacht, neun, neunzehn, neunzig, null, das Pfund, rot, der Samstag, schwarz, sechs, sechzehn, sechzig, die Sekunde, der September, sieben, siebzehn, siebzig, der Sonntag, die Stunde, der Tag, tausend, vier, das Viertel, vierzehn, vierzig, der Vormittag, weiß, die Woche, das Wochenende, zehn, zwanzig, zwei, zweite, zwölf
