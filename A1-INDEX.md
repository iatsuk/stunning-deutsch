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
| Все обязательные слова (964) | 452 | 187 | 124 | 201 |
| из них словарь экзамена | 381 | 127 | 97 | 178 |
| из них слова уроков | 263 | 109 | 50 | 34 |
| Грамматика (66) | 51 | 15 | 0 | 0 |

В очереди повторения новой версии 486 обязательных слов, из них ниже порога 191. Повторение в порог не входит; в таблицах такие слова помечены ↻.

| Часть речи | закреплено | слабо | один раз | нет |
|---|---|---|---|---|
| Существительные | 187 | 92 | 66 | 96 |
| Глаголы | 65 | 33 | 24 | 35 |
| Прилагательные и наречия | 45 | 16 | 16 | 37 |
| Служебные слова | 66 | 8 | 0 | 8 |
| Выражения | 27 | 18 | 7 | 12 |
| Числа, время, цвета и другие группы | 62 | 20 | 11 | 13 |

## Грамматика

### Глагол

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Präsens, окончания по лицам | закреплено | 229 · 12 · 106 · 136 | есть | [01-s1](src/story/scenes/01.ts#L52) [01-s2](src/story/scenes/01.ts#L165) [01-s3](src/story/scenes/01.ts#L220) [01-i1](src/story/scenes/01.ts#L384) [01-s4](src/story/scenes/01.ts#L421) [01-s5](src/story/scenes/01.ts#L506) |
| Präsens со сменой корня (e → i, a → ä) | закреплено | 103 · 10 · 42 · 49 | есть | [01-s3](src/story/scenes/01.ts#L220) [01-s4](src/story/scenes/01.ts#L422) [01-s5](src/story/scenes/01.ts#L502) [02-s4](src/story/scenes/02.ts#L470) [04-s2](src/story/scenes/04.ts#L239) [04-s3](src/story/scenes/04.ts#L390) |
| sein | закреплено | 574 · 12 · 255 · 291 | есть | [01-s1](src/story/scenes/01.ts#L34) [01-s2](src/story/scenes/01.ts#L153) |
| haben | закреплено | 232 · 11 · 117 · 128 | есть | [02-s1](src/story/scenes/02.ts#L55) [02-s2](src/story/scenes/02.ts#L150) [02-s3](src/story/scenes/02.ts#L233) [02-i1](src/story/scenes/02.ts#L401) |
| Отделяемые приставки и рамка предложения | закреплено | 58 · 8 · 33 · 26 | есть | [01-s3](src/story/scenes/01.ts#L220) [05-s3](src/story/scenes/05.ts#L311) [05-s4](src/story/scenes/05.ts#L495) [06-s2](src/story/scenes/06.ts#L222) [06-s3](src/story/scenes/06.ts#L294) |
| Perfekt с haben | слабо | 68 · 3 · 40 · 33 | есть | [10-s1](src/story/scenes/10.ts#L58) [11-s1](src/story/scenes/11.ts#L37) [11-i1](src/story/scenes/11.ts#L159) [11-s2](src/story/scenes/11.ts#L195) |
| Perfekt с sein | слабо | 20 · 2 · 16 · 8 | есть | [11-s2](src/story/scenes/11.ts#L214) [12-s1](src/story/scenes/12.ts#L150) [12-s2](src/story/scenes/12.ts#L173) [12-s3](src/story/scenes/12.ts#L27) [12-s5](src/story/scenes/12.ts#L546) |
| Präteritum war и hatte | закреплено | 25 · 4 · 13 · 10 | есть | [09-s1](src/story/scenes/09.ts#L62) [09-i1](src/story/scenes/09.ts#L259) [10-s1](src/story/scenes/10.ts#L57) [11-i1](src/story/scenes/11.ts#L159) [11-s2](src/story/scenes/11.ts#L214) [11-s3](src/story/scenes/11.ts#L296) |
| möchten | закреплено | 14 · 4 · 8 · 9 | есть | [04-s1](src/story/scenes/04.ts#L52) [04-s2](src/story/scenes/04.ts#L167) [04-s5](src/story/scenes/04.ts#L568) [04-s6](src/story/scenes/04.ts#L692) [08-s1](src/story/scenes/08.ts#L100) [10-s6](src/story/scenes/10.ts#L661) |
| Ich hätte gern …, Ich würde gern … как готовые выражения | слабо | 4 · 2 · 2 · 2 | есть | [04-s4](src/story/scenes/04.ts#L461) [07-s5](src/story/scenes/07.ts#L535) |
| können | слабо | 32 · 3 · 23 · 12 | есть | [07-s1](src/story/scenes/07.ts#L38) [07-s2](src/story/scenes/07.ts#L166) [07-s3](src/story/scenes/07.ts#L295) |
| wollen | закреплено | 22 · 4 · 15 · 10 | есть | [07-s1](src/story/scenes/07.ts#L43) [07-s2](src/story/scenes/07.ts#L178) [07-s3](src/story/scenes/07.ts#L283) [07-s4](src/story/scenes/07.ts#L492) [07-s5](src/story/scenes/07.ts#L534) |
| müssen | закреплено | 12 · 4 · 8 · 4 | есть | [08-s4](src/story/scenes/08.ts#L547) [10-s1](src/story/scenes/10.ts#L81) [10-s3](src/story/scenes/10.ts#L270) [10-s4](src/story/scenes/10.ts#L446) [10-s5](src/story/scenes/10.ts#L539) [10-s6](src/story/scenes/10.ts#L661) |
| dürfen | закреплено | 27 · 4 · 16 · 6 | есть | [09-s2](src/story/scenes/09.ts#L208) [10-s1](src/story/scenes/10.ts#L81) [10-s2](src/story/scenes/10.ts#L169) [10-s3](src/story/scenes/10.ts#L250) [10-s4](src/story/scenes/10.ts#L28) |
| sollen | слабо | 18 · 3 · 13 · 10 | есть | [10-s4](src/story/scenes/10.ts#L29) [10-s5](src/story/scenes/10.ts#L574) [10-s6](src/story/scenes/10.ts#L30) [11-s5](src/story/scenes/11.ts#L28) |
| mögen | слабо | 9 · 3 · 3 · 4 | есть | [07-s3](src/story/scenes/07.ts#L394) [07-s4](src/story/scenes/07.ts#L478) [08-s1](src/story/scenes/08.ts#L100) [12-s6](src/story/scenes/12.ts#L619) |
| Модальный глагол и инфинитив в конце | закреплено | 57 · 7 · 36 · 22 | есть | [04-s6](src/story/scenes/04.ts#L692) [07-s1](src/story/scenes/07.ts#L43) [07-s2](src/story/scenes/07.ts#L178) [07-s3](src/story/scenes/07.ts#L283) [07-s4](src/story/scenes/07.ts#L492) [07-s5](src/story/scenes/07.ts#L535) |
| Повелительное наклонение на Sie | закреплено | 28 · 5 · 17 · 14 | есть | [02-s3](src/story/scenes/02.ts#L244) [09-s2](src/story/scenes/09.ts#L28) [09-i1](src/story/scenes/09.ts#L284) [09-s3](src/story/scenes/09.ts#L324) [09-s4](src/story/scenes/09.ts#L472) |
| Повелительное наклонение на du | закреплено | 57 · 10 · 24 · 37 | есть | [02-s3](src/story/scenes/02.ts#L379) [02-s4](src/story/scenes/02.ts#L497) [03-s6](src/story/scenes/03.ts#L775) [05-s1](src/story/scenes/05.ts#L89) [05-s3](src/story/scenes/05.ts#L311) [05-s6](src/story/scenes/05.ts#L735) |
| Повелительное наклонение на ihr | закреплено | 11 · 5 · 5 · 6 | есть | [06-s1](src/story/scenes/06.ts#L34) [07-s4](src/story/scenes/07.ts#L458) [08-s1](src/story/scenes/08.ts#L83) [09-s2](src/story/scenes/09.ts#L183) [09-s3](src/story/scenes/09.ts#L324) [09-s4](src/story/scenes/09.ts#L542) |

### Предложение

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Глагол на втором месте, время на первом | закреплено | 64 · 12 · 33 · 31 | есть | [01-s1](src/story/scenes/01.ts#L124) [01-s3](src/story/scenes/01.ts#L237) [02-s2](src/story/scenes/02.ts#L201) [02-s3](src/story/scenes/02.ts#L233) [03-s3](src/story/scenes/03.ts#L278) [03-s6](src/story/scenes/03.ts#L818) |
| Вопрос с W-словом | закреплено | 143 · 12 · 81 · 72 | есть | [01-s1](src/story/scenes/01.ts#L44) [01-s2](src/story/scenes/01.ts#L153) [01-s3](src/story/scenes/01.ts#L220) |
| Вопрос да/нет и ответ ja / nein / doch | закреплено | 44 · 11 · 29 · 22 | есть | [02-s1](src/story/scenes/02.ts#L51) [02-s3](src/story/scenes/02.ts#L229) [02-i1](src/story/scenes/02.ts#L417) [02-s4](src/story/scenes/02.ts#L437) [02-s5](src/story/scenes/02.ts#L595) [02-s6](src/story/scenes/02.ts#L677) |
| nicht и kein | закреплено | 237 · 12 · 101 · 112 | есть | [01-s1](src/story/scenes/01.ts#L145) [01-s3](src/story/scenes/01.ts#L220) [01-s5](src/story/scenes/01.ts#L539) [02-s2](src/story/scenes/02.ts#L205) [02-s4](src/story/scenes/02.ts#L523) [02-s5](src/story/scenes/02.ts#L613) |
| und, oder, aber | закреплено | 198 · 12 · 71 · 85 | есть | [01-s3](src/story/scenes/01.ts#L220) [01-i1](src/story/scenes/01.ts#L388) [01-s4](src/story/scenes/01.ts#L415) [01-s6](src/story/scenes/01.ts#L599) [02-s2](src/story/scenes/02.ts#L152) [02-s3](src/story/scenes/02.ts#L244) |
| denn как союз причины | слабо | 3 · 2 · 3 · 1 | есть | [07-s1](src/story/scenes/07.ts#L65) [07-s2](src/story/scenes/07.ts#L178) [08-s6](src/story/scenes/08.ts#L737) |
| dann | закреплено | 21 · 7 · 6 · 8 | есть | [06-s5](src/story/scenes/06.ts#L610) [06-s6](src/story/scenes/06.ts#L764) [07-s2](src/story/scenes/07.ts#L258) [08-s6](src/story/scenes/08.ts#L737) [09-s2](src/story/scenes/09.ts#L220) [09-i1](src/story/scenes/09.ts#L270) |
| wenn (понимание) | слабо | 5 · 3 · 2 · 3 | есть | [10-s4](src/story/scenes/10.ts#L456) [11-s5](src/story/scenes/11.ts#L554) [12-s2](src/story/scenes/12.ts#L178) |
| es gibt | закреплено | 7 · 4 · 2 · 5 | есть | [05-s2](src/story/scenes/05.ts#L205) [07-s1](src/story/scenes/07.ts#L37) [07-s3](src/story/scenes/07.ts#L295) [08-s1](src/story/scenes/08.ts#L86) [09-s1](src/story/scenes/09.ts#L84) |

### Существительное и артикль

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Множественное число | закреплено | 186 · 12 · 67 · 79 | есть | [01-s3](src/story/scenes/01.ts#L220) [01-s6](src/story/scenes/01.ts#L599) [02-s1](src/story/scenes/02.ts#L119) [02-s2](src/story/scenes/02.ts#L206) [02-s3](src/story/scenes/02.ts#L229) [02-i1](src/story/scenes/02.ts#L412) |
| Винительный падеж | закреплено | 144 · 10 · 83 · 62 | есть | [03-s4](src/story/scenes/03.ts#L572) [04-s1](src/story/scenes/04.ts#L52) [04-s2](src/story/scenes/04.ts#L170) [04-s3](src/story/scenes/04.ts#L292) |
| Дательный на вопрос «где?» (in, auf, an) | закреплено | 59 · 9 · 25 · 13 | есть | [04-s2](src/story/scenes/04.ts#L166) [05-s1](src/story/scenes/05.ts#L88) [05-s2](src/story/scenes/05.ts#L146) [05-s3](src/story/scenes/05.ts#L297) [06-s2](src/story/scenes/06.ts#L163) [06-s3](src/story/scenes/06.ts#L428) |
| Предлоги с дательным (mit, zu, bei, von, aus, nach) | закреплено | 119 · 11 · 62 · 44 | есть | [01-s1](src/story/scenes/01.ts#L19) [01-s3](src/story/scenes/01.ts#L220) [01-s5](src/story/scenes/01.ts#L567) [01-s6](src/story/scenes/01.ts#L631) [02-s3](src/story/scenes/02.ts#L244) [03-s2](src/story/scenes/03.ts#L220) |
| Чей? Имя + s (Annas Bruder) | слабо | 10 · 2 · 10 · 1 | есть | [03-s1](src/story/scenes/03.ts#L64) [03-s3](src/story/scenes/03.ts#L295) [03-s4](src/story/scenes/03.ts#L496) [03-s5](src/story/scenes/03.ts#L643) [04-s3](src/story/scenes/04.ts#L295) |
| Сложные слова: род по последней части | закреплено | 192 · 12 · 103 · 80 | есть | [01-s1](src/story/scenes/01.ts#L81) [02-s1](src/story/scenes/02.ts#L83) [02-s2](src/story/scenes/02.ts#L136) [02-s3](src/story/scenes/02.ts#L244) [02-s6](src/story/scenes/02.ts#L677) [03-s3](src/story/scenes/03.ts#L278) |
| Женский род на -in | закреплено | 45 · 6 · 28 · 25 | есть | [03-s3](src/story/scenes/03.ts#L409) [03-s4](src/story/scenes/03.ts#L472) [03-s5](src/story/scenes/03.ts#L619) [09-i1](src/story/scenes/09.ts#L273) [09-s4](src/story/scenes/09.ts#L31) |
| dieser, diese, dieses | слабо | 4 · 4 · 1 · 3 | есть | [05-i1](src/story/scenes/05.ts#L448) [08-s3](src/story/scenes/08.ts#L435) [09-s2](src/story/scenes/09.ts#L183) [10-s2](src/story/scenes/10.ts#L169) |
| Притяжательные mein, dein, sein, ihr, unser, euer, Ihr | закреплено | 91 · 12 · 46 · 51 | есть | [01-s1](src/story/scenes/01.ts#L120) [01-i1](src/story/scenes/01.ts#L383) [02-s3](src/story/scenes/02.ts#L379) [03-s1](src/story/scenes/03.ts#L43) [03-s2](src/story/scenes/03.ts#L155) |
| welcher, welche, welches | закреплено | 15 · 4 · 9 · 8 | есть | [01-s3](src/story/scenes/01.ts#L220) [02-s3](src/story/scenes/02.ts#L240) [05-s2](src/story/scenes/05.ts#L159) [05-s3](src/story/scenes/05.ts#L311) [05-i1](src/story/scenes/05.ts#L442) [05-s5](src/story/scenes/05.ts#L649) |

### Местоимения

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Местоимения в винительном (mich, dich, ihn …) | закреплено | 30 · 8 · 15 · 17 | есть | [02-s4](src/story/scenes/02.ts#L454) [05-s2](src/story/scenes/05.ts#L180) [05-s4](src/story/scenes/05.ts#L576) [05-s5](src/story/scenes/05.ts#L598) [05-s6](src/story/scenes/05.ts#L814) [06-s1](src/story/scenes/06.ts#L151) |
| Местоимения в дательном (mir, dir, ihm, Ihnen) | закреплено | 19 · 8 · 9 · 9 | есть | [01-s1](src/story/scenes/01.ts#L74) [01-s3](src/story/scenes/01.ts#L220) [06-s5](src/story/scenes/06.ts#L629) [07-s5](src/story/scenes/07.ts#L534) [07-i1](src/story/scenes/07.ts#L656) [08-s2](src/story/scenes/08.ts#L178) |
| Глаголы с дательным (gehören, gefallen, helfen, danken, geben) | закреплено | 15 · 7 · 8 · 8 | есть | [04-i1](src/story/scenes/04.ts#L411) [06-s6](src/story/scenes/06.ts#L742) [07-s5](src/story/scenes/07.ts#L565) [08-s2](src/story/scenes/08.ts#L178) [08-s5](src/story/scenes/08.ts#L647) [09-s6](src/story/scenes/09.ts#L717) |
| sich, uns (Wir sehen uns) | закреплено | 7 · 5 · 2 · 4 | есть | [01-s6](src/story/scenes/01.ts#L608) [06-s1](src/story/scenes/06.ts#L150) [07-s2](src/story/scenes/07.ts#L229) [09-s6](src/story/scenes/09.ts#L761) [12-s6](src/story/scenes/12.ts#L620) |
| Вопросы wen? и wem? | закреплено | 7 · 4 · 3 · 4 | есть | [08-s2](src/story/scenes/08.ts#L178) [09-s6](src/story/scenes/09.ts#L717) [10-s3](src/story/scenes/10.ts#L246) [12-s3](src/story/scenes/12.ts#L288) |
| man | слабо | 6 · 3 · 2 · 4 | есть | [07-s1](src/story/scenes/07.ts#L38) [09-s2](src/story/scenes/09.ts#L165) [10-s2](src/story/scenes/10.ts#L169) |
| etwas, nichts, alles, mehr | закреплено | 83 · 11 · 30 · 41 | есть | [01-s2](src/story/scenes/01.ts#L165) [03-s3](src/story/scenes/03.ts#L278) [04-s2](src/story/scenes/04.ts#L217) [04-s3](src/story/scenes/04.ts#L298) [04-s4](src/story/scenes/04.ts#L503) [04-s5](src/story/scenes/04.ts#L572) |

### Прилагательное и числа

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Прилагательное после sein (zu groß) | закреплено | 90 · 12 · 33 · 47 | есть | [01-s2](src/story/scenes/01.ts#L165) [01-s4](src/story/scenes/01.ts#L436) [02-s5](src/story/scenes/02.ts#L557) [03-s2](src/story/scenes/03.ts#L244) [04-s2](src/story/scenes/04.ts#L228) [04-s3](src/story/scenes/04.ts#L298) |
| gern, lieber, am liebsten | закреплено | 16 · 4 · 11 · 7 | есть | [04-s3](src/story/scenes/04.ts#L298) [04-s4](src/story/scenes/04.ts#L461) [04-s6](src/story/scenes/04.ts#L765) [07-s1](src/story/scenes/07.ts#L87) [07-s3](src/story/scenes/07.ts#L390) [07-s5](src/story/scenes/07.ts#L535) |
| Сравнение (besser, mehr, als) | закреплено | 11 · 4 · 6 · 5 | есть | [07-s3](src/story/scenes/07.ts#L295) [08-s3](src/story/scenes/08.ts#L381) [10-s3](src/story/scenes/10.ts#L250) [10-s5](src/story/scenes/10.ts#L551) [12-s1](src/story/scenes/12.ts#L48) |
| Цены и количества | закреплено | 83 · 10 · 43 · 27 | есть | [02-s6](src/story/scenes/02.ts#L710) [03-s2](src/story/scenes/03.ts#L224) [03-i1](src/story/scenes/03.ts#L224) [03-s6](src/story/scenes/03.ts#L736) [04-s3](src/story/scenes/04.ts#L298) [04-s4](src/story/scenes/04.ts#L490) |
| Время на часах | закреплено | 163 · 9 · 79 · 65 | есть | [02-s5](src/story/scenes/02.ts#L581) [04-s2](src/story/scenes/04.ts#L166) [04-s3](src/story/scenes/04.ts#L294) [04-s4](src/story/scenes/04.ts#L456) [06-s1](src/story/scenes/06.ts#L35) |
| Порядковые числа и дата | закреплено | 37 · 5 · 21 · 12 | есть | [08-s2](src/story/scenes/08.ts#L227) [08-i1](src/story/scenes/08.ts#L275) [08-s3](src/story/scenes/08.ts#L330) [08-s5](src/story/scenes/08.ts#L651) [08-s6](src/story/scenes/08.ts#L746) [09-s2](src/story/scenes/09.ts#L220) |

### Предлоги

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| um, am, im, von … bis во времени | закреплено | 135 · 7 · 69 · 55 | есть | [06-s1](src/story/scenes/06.ts#L35) [06-s2](src/story/scenes/06.ts#L177) |
| ab и für во времени (ab Montag, für zwei Wochen) | закреплено | 8 · 5 · 5 · 2 | есть | [08-s3](src/story/scenes/08.ts#L381) [09-s2](src/story/scenes/09.ts#L164) [10-s3](src/story/scenes/10.ts#L247) [10-s4](src/story/scenes/10.ts#L467) [11-s5](src/story/scenes/11.ts#L543) [12-s3](src/story/scenes/12.ts#L285) |
| nach и vor во времени (nach dem Essen) | закреплено | 9 · 4 · 5 · 5 | есть | [08-s6](src/story/scenes/08.ts#L713) [09-s2](src/story/scenes/09.ts#L164) [10-s3](src/story/scenes/10.ts#L247) [10-s4](src/story/scenes/10.ts#L467) [12-s4](src/story/scenes/12.ts#L441) |
| über (über zwanzig Minuten) | слабо | 4 · 2 · 3 · 1 | есть | [09-s2](src/story/scenes/09.ts#L164) [10-s3](src/story/scenes/10.ts#L246) [10-s4](src/story/scenes/10.ts#L468) |
| nach Hause / zu Hause | закреплено | 16 · 4 · 10 · 6 | есть | [07-s2](src/story/scenes/07.ts#L144) [09-s5](src/story/scenes/09.ts#L661) [09-s6](src/story/scenes/09.ts#L716) [10-s4](src/story/scenes/10.ts#L29) [12-s1](src/story/scenes/12.ts#L121) |
| in, an, auf + винительный для направления (in die Stadt) | закреплено | 41 · 8 · 19 · 13 | есть | [04-s2](src/story/scenes/04.ts#L248) [04-s5](src/story/scenes/04.ts#L581) [06-s2](src/story/scenes/06.ts#L218) [06-s5](src/story/scenes/06.ts#L633) [06-s6](src/story/scenes/06.ts#L786) [07-s1](src/story/scenes/07.ts#L43) |
| unter | слабо | 5 · 3 · 2 · 3 | есть | [08-s2](src/story/scenes/08.ts#L209) [09-s2](src/story/scenes/09.ts#L218) [11-s2](src/story/scenes/11.ts#L214) |
| ohne и für (ohne dich, für meinen Freund) | закреплено | 40 · 11 · 22 · 11 | есть | [01-s1](src/story/scenes/01.ts#L145) [02-s2](src/story/scenes/02.ts#L205) [02-s4](src/story/scenes/02.ts#L454) [03-s5](src/story/scenes/03.ts#L691) [04-s1](src/story/scenes/04.ts#L158) [04-s2](src/story/scenes/04.ts#L176) |

### Словообразование

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Существительные на -ung | закреплено | 103 · 10 · 58 · 38 | есть | [02-s2](src/story/scenes/02.ts#L136) [02-s3](src/story/scenes/02.ts#L244) [02-s5](src/story/scenes/02.ts#L659) [04-s2](src/story/scenes/04.ts#L232) [04-s3](src/story/scenes/04.ts#L298) [04-s4](src/story/scenes/04.ts#L506) |
| Прилагательные с un-, -los, -bar | слабо | 3 · 2 · 2 · 1 | есть | [11-s1](src/story/scenes/11.ts#L73) [12-s4](src/story/scenes/12.ts#L455) |
| hellblau, dunkelblau | закреплено | 28 · 6 · 11 · 3 | есть | [05-s2](src/story/scenes/05.ts#L259) [05-s3](src/story/scenes/05.ts#L311) [05-s5](src/story/scenes/05.ts#L607) [05-s6](src/story/scenes/05.ts#L729) [06-s2](src/story/scenes/06.ts#L207) [06-i1](src/story/scenes/06.ts#L464) |
| Причастие как прилагательное (geöffnet, geschlossen) | закреплено | 7 · 4 · 4 · 3 | есть | [06-s3](src/story/scenes/06.ts#L294) [08-s4](src/story/scenes/08.ts#L547) [10-s5](src/story/scenes/10.ts#L525) [12-s3](src/story/scenes/12.ts#L300) |
| Погода с es (Es regnet) | закреплено | 26 · 5 · 5 · 5 | есть | [05-s1](src/story/scenes/05.ts#L39) [06-s6](src/story/scenes/06.ts#L730) [09-s1](src/story/scenes/09.ts#L40) [09-i1](src/story/scenes/09.ts#L272) [09-s3](src/story/scenes/09.ts#L311) [11-s1](src/story/scenes/11.ts#L139) |
| Ich habe …schmerzen, … tut weh | слабо | 13 · 2 · 7 · 9 | есть | [10-s1](src/story/scenes/10.ts#L39) [10-s2](src/story/scenes/10.ts#L120) [10-s6](src/story/scenes/10.ts#L667) [11-s3](src/story/scenes/11.ts#L296) |

## Слова: нет

201 слов.

### Существительные (96)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| der Abflug (от fliegen) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Absender | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Ankunft | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Anrede | экз. | 0 · 0 · 0 · 0 | — | [07](content/a1/07-freizeit.yaml#L240) [10](content/a1/10-gesundheit.yaml#L201) [12](content/a1/12-reisen.yaml#L200) | — |
| die Ansage | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Anschluss | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Apartment | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Arbeitsplatz | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Aufgabe | экз. | 0 · 0 · 0 · 0 | — | [10](content/a1/10-gesundheit.yaml#L211) | — |
| der Aufzug | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Ausflug | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Ausgang | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Auskunft | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Aussage | экз. | 0 · 0 · 0 · 0 | — | [03](content/a1/03-familie.yaml#L223) [05](content/a1/05-einkaufen.yaml#L212) [07](content/a1/07-freizeit.yaml#L221) [11](content/a1/11-arbeit.yaml#L191) [12](content/a1/12-reisen.yaml#L242) | — |
| die Autobahn | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Bahnsteig | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Bauch | 10, экз. | 0 · 0 · 0 · 0 | — | [10](content/a1/10-gesundheit.yaml#L90) | гл. 10 |
| der Baum | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Beamte | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Bekannte | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Bild | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Bleistift | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Blick | экз. | 0 · 0 · 0 · 0 | — | [11](content/a1/11-arbeit.yaml#L6) | гл. 3 |
| die Blume | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Bogen | экз. | 0 · 0 · 0 · 0 | — | — | гл. 2 |
| die Briefmarke | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Bürgeramt | 9 | 0 · 0 · 0 · 0 | — | [09](content/a1/09-stadt.yaml#L110) | гл. 9 |
| der Chef | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Dame | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Datum | 12, экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L130) | гл. 12 |
| die Disco | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Doppelzimmer | 12, экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L106) | гл. 12 |
| das Dorf | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Drucker (от drucken) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Eingang | экз. | 0 · 0 · 0 · 0 | — | [09](content/a1/09-stadt.yaml#L236) | — |
| der Eintritt | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Empfänger | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Ergebnis | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Fahrer (от fahren) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Fehler | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Ferien | 12 | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L148) | гл. 12 |
| das Feuer | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Friseur | 11 | 0 · 0 · 0 · 0 | — | [11](content/a1/11-arbeit.yaml#L101) | гл. 11 |
| die Führung | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Garten | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Gepäck | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Gruppe | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Haar | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Halbpension | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Halle | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Hausaufgabe | экз. | 0 · 0 · 0 · 0 | — | [10](content/a1/10-gesundheit.yaml#L211) | — |
| die Hausfrau | экз. | 0 · 0 · 0 · 0 | — | [11](content/a1/11-arbeit.yaml#L116) | — |
| die Heizung | 8 | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L44) | гл. 8 |
| der Informatiker | 11 | 0 · 0 · 0 · 0 | — | [11](content/a1/11-arbeit.yaml#L103) | гл. 11 |
| die Information | экз. | 0 · 0 · 0 · 0 | — | [06](content/a1/06-tagesablauf.yaml#L197) [09](content/a1/09-stadt.yaml#L236) | — |
| der Ingenieur | 11 | 0 · 0 · 0 · 0 | — | [11](content/a1/11-arbeit.yaml#L100) | гл. 11 |
| die Jahreszeit | 12 | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L130) | гл. 12 |
| der Job | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Kindergarten | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Klasse | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Kleiderschrank | 8 | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L76) | гл. 8 |
| das Konto | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Kugelschreiber | экз. | 0 · 0 · 0 · 0 | — | — | — |
| Lieblings- | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Lkw | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Lösung | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Mitte | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Möbel | 8, экз. | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L104) | гл. 8 |
| der Mund | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Ordnung | экз. | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L274) [09](content/a1/09-stadt.yaml#L158) | — |
| der Ort | экз. | 0 · 0 · 0 · 0 | — | [07](content/a1/07-freizeit.yaml#L361) [09](content/a1/09-stadt.yaml#L97) | — |
| die Papiere | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Praktikum | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Prospekt | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Reisebüro (от reisen) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Reiseführer (от reisen) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Reparatur (от reparieren) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| Satz | экз. | 0 · 0 · 0 · 0 | — | [07](content/a1/07-freizeit.yaml#L239) [08](content/a1/08-wohnen.yaml#L485) [10](content/a1/10-gesundheit.yaml#L200) [12](content/a1/12-reisen.yaml#L199) | — |
| der Schalter | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Schule | экз. | 0 · 0 · 0 · 0 | — | [01](content/a1/01-kennenlernen.yaml#L29) [02](content/a1/02-zahlen.yaml#L29) [06](content/a1/06-tagesablauf.yaml#L27) [07](content/a1/07-freizeit.yaml#L26) [11](content/a1/11-arbeit.yaml#L27) | гл. 11 |
| der Schüler (от die Schule) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der See | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Sehenswürdigkeit | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Studium | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Supermarkt | 9 | 0 · 0 · 0 · 0 | — | [09](content/a1/09-stadt.yaml#L108) | гл. 9 |
| der Teil | экз. | 0 · 0 · 0 · 0 | — | [01](content/a1/01-kennenlernen.yaml#L216) [02](content/a1/02-zahlen.yaml#L245) [03](content/a1/03-familie.yaml#L212) [04](content/a1/04-essen.yaml#L276) [05](content/a1/05-einkaufen.yaml#L211) [06](content/a1/06-tagesablauf.yaml#L193) [07](content/a1/07-freizeit.yaml#L220) [09](content/a1/09-stadt.yaml#L221) [10](content/a1/10-gesundheit.yaml#L180) [11](content/a1/11-arbeit.yaml#L207) [12](content/a1/12-reisen.yaml#L196) | — |
| das Ticket | экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L747) | — |
| die Toilette | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Unterricht | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Verein | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Verwandte | экз. | 0 · 0 · 0 · 0 | — | [03](content/a1/03-familie.yaml#L106) | — |
| die Vorsicht | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Welt | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Wohnzimmer | 8 | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L60) | гл. 8 |
| die Zigarette | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Zoll | экз. | 0 · 0 · 0 · 0 | — | — | — |

### Глаголы (35)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| abfliegen (от fliegen) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| abgeben | экз. | 0 · 0 · 0 · 0 | — | — | — |
| abholen | экз. | 0 · 0 · 0 · 0 | — | — | гл. 10 |
| anbieten | экз. | 0 · 0 · 0 · 0 | — | — | — |
| anklicken | экз. | 0 · 0 · 0 · 0 | — | — | — |
| ankreuzen | экз. | 0 · 0 · 0 · 0 | — | [04](content/a1/04-essen.yaml#L299) [09](content/a1/09-stadt.yaml#L222) | — |
| aussehen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| baden | экз. | 0 · 0 · 0 · 0 | — | — | — |
| bedeuten | экз. | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L42) | — |
| benutzen | экз. | 0 · 0 · 0 · 0 | — | [09](content/a1/09-stadt.yaml#L236) | — |
| besichtigen | экз. | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L202) | — |
| drucken | экз. | 0 · 0 · 0 · 0 | — | — | — |
| drücken | экз. | 0 · 0 · 0 · 0 | — | — | — |
| empfehlen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| entschuldigen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| erlauben | экз. | 0 · 0 · 0 · 0 | — | — | — |
| fehlen | экз. | 0 · 0 · 0 · 0 | — | — | гл. 10 |
| fliegen | экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L158) | — |
| gefallen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| gewinnen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| grillen | 7, экз. | 0 · 0 · 0 · 0 | — | [07](content/a1/07-freizeit.yaml#L62) | гл. 7 |
| kriegen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| laufen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| legen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| mitmachen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| rauchen | 10, экз. | 0 · 0 · 0 · 0 | — | [10](content/a1/10-gesundheit.yaml#L130) | гл. 10 |
| studieren | экз. | 0 · 0 · 0 · 0 | — | — | — |
| übernachten | экз. | 0 · 0 · 0 · 0 | — | — | — |
| überweisen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| umziehen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| verdienen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| vermieten | экз. | 0 · 0 · 0 · 0 | — | — | — |
| wandern | экз. | 0 · 0 · 0 · 0 | — | — | — |
| waschen | экз. | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L125) | — |
| wehtun | 10 | 0 · 0 · 0 · 0 | — | [10](content/a1/10-gesundheit.yaml#L105) | гл. 10 |

### Прилагательные и наречия (37)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| ausländisch (от das Ausland) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| automatisch | экз. | 0 · 0 · 0 · 0 | — | — | — |
| beide | экз. | 0 · 0 · 0 · 0 | — | — | гл. 5, 11 |
| bekannt | экз. | 0 · 0 · 0 · 0 | — | — | — |
| besetzt | экз. | 0 · 0 · 0 · 0 | — | — | — |
| bewölkt | 12 | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L123) | гл. 12 |
| böse | экз. | 0 · 0 · 0 · 0 | — | — | — |
| breit | экз. | 0 · 0 · 0 · 0 | — | — | — |
| circa | экз. | 0 · 0 · 0 · 0 | — | [07](content/a1/07-freizeit.yaml#L239) [12](content/a1/12-reisen.yaml#L200) | — |
| daneben | экз. | 0 · 0 · 0 · 0 | — | — | — |
| draußen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| fremd | экз. | 0 · 0 · 0 · 0 | — | — | — |
| gestorben | экз. | 0 · 0 · 0 · 0 | — | — | — |
| glücklich | экз. | 0 · 0 · 0 · 0 | — | — | — |
| gültig | экз. | 0 · 0 · 0 · 0 | — | — | — |
| günstig | 8, экз. | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L143) | гл. 8 |
| hoch | экз. | 0 · 0 · 0 · 0 | — | — | — |
| kulturell | экз. | 0 · 0 · 0 · 0 | — | — | — |
| leicht | экз. | 0 · 0 · 0 · 0 | — | — | — |
| lustig | экз. | 0 · 0 · 0 · 0 | — | — | — |
| männlich (от der Mann) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| möbliert | 8 | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L150) | гл. 8 |
| modern | 8 | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L72) | гл. 8 |
| möglich | экз. | 0 · 0 · 0 · 0 | — | — | — |
| normal | экз. | 0 · 0 · 0 · 0 | — | — | — |
| oben | экз. | 0 · 0 · 0 · 0 | — | — | — |
| schlecht | экз. | 0 · 0 · 0 · 0 | — | — | гл. 12 |
| selbstständig | экз. | 0 · 0 · 0 · 0 | — | — | — |
| sonnig | 12 | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L122) | гл. 12 |
| tot | экз. | 0 · 0 · 0 · 0 | — | — | — |
| unten | экз. | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L723) | — |
| verboten | экз. | 0 · 0 · 0 · 0 | — | — | — |
| weiblich | экз. | 0 · 0 · 0 · 0 | — | [11](content/a1/11-arbeit.yaml#L345) | — |
| weit | 9, экз. | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L48) [09](content/a1/09-stadt.yaml#L34) [12](content/a1/12-reisen.yaml#L580) | гл. 9 |
| weiter | экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L580) | — |
| wichtig | экз. | 0 · 0 · 0 · 0 | — | — | — |
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

### Выражения (12)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| an sein | экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L160) | — |
| Es schneit. | 12 | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L121) | гл. 12 |
| Es sind 20 Grad. | 12 | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L127) | гл. 12 |
| Freunde treffen | 7 | 0 · 0 · 0 · 0 | — | [06](content/a1/06-tagesablauf.yaml#L610) [07](content/a1/07-freizeit.yaml#L128) | гл. 7 |
| gestern Abend | 11 | 0 · 0 · 0 · 0 | — | [11](content/a1/11-arbeit.yaml#L48) | гл. 11 |
| Gitarre spielen | 7 | 0 · 0 · 0 · 0 | — | [07](content/a1/07-freizeit.yaml#L119) | гл. 7 |
| letztes Jahr | 11 | 0 · 0 · 0 · 0 | — | [11](content/a1/11-arbeit.yaml#L139) | гл. 11 |
| nicht gern | 7 | 0 · 0 · 0 · 0 | — | [04](content/a1/04-essen.yaml#L70) [07](content/a1/07-freizeit.yaml#L158) [12](content/a1/12-reisen.yaml#L227) | гл. 7 |
| die Pommes frites | экз. | 0 · 0 · 0 · 0 | — | — | — |
| Rad fahren | экз. | 0 · 0 · 0 · 0 | — | — | — |
| sich kümmern | экз. | 0 · 0 · 0 · 0 | — | — | — |
| Tennis spielen | 7 | 0 · 0 · 0 · 0 | — | [07](content/a1/07-freizeit.yaml#L39) | гл. 7 |

### Числа, время, цвета и другие группы (13)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| der Deutsche | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Europäer | экз. | 0 · 0 · 0 · 0 | — | — | — |
| europäisch | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Frühling | 12, экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L135) | гл. 12 |
| der Kilometer | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Milliarde | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Monat | 12, экз. | 0 · 0 · 0 · 0 | — | [03](content/a1/03-familie.yaml#L229) [12](content/a1/12-reisen.yaml#L139) | гл. 12 |
| der Norden | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Quadratmeter | 8, экз. | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L164) | гл. 8 |
| der Süden | экз. | 0 · 0 · 0 · 0 | — | — | — |
| vierte | экз. | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L464) [12](content/a1/12-reisen.yaml#L40) | — |
| der Westen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Zentimeter | экз. | 0 · 0 · 0 · 0 | — | — | — |

## Слова: один раз

124 слов.

### Существительные (66)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| die Abfahrt (от abfahren) | экз. | 1 · 1 · 1 · 0 | [09-s2](src/story/scenes/09.ts#L159) | [09](content/a1/09-stadt.yaml#L214) [12](content/a1/12-reisen.yaml#L246) | — |
| das Angebot (от anbieten) ↻ | экз. | 1 · 1 · 0 · 0 | [05-s2](src/story/scenes/05.ts#L228) | [05](content/a1/05-einkaufen.yaml#L215) | — |
| der Anrufbeantworter (от der Anruf) ↻ | экз. | 1 · 1 · 0 · 0 | [02-s3](src/story/scenes/02.ts#L382) | [02](content/a1/02-zahlen.yaml#L256) [06](content/a1/06-tagesablauf.yaml#L194) [10](content/a1/10-gesundheit.yaml#L181) | — |
| das Baby ↻ | 3, экз. | 1 · 1 · 1 · 1 | [03-s1](src/story/scenes/03.ts#L67) | [03](content/a1/03-familie.yaml#L47) | гл. 3 |
| die Bäckerei ↻ | экз. | 1 · 1 · 0 · 0 | [04-s1](src/story/scenes/04.ts#L47) | — | — |
| die Banane ↻ | 5, экз. | 1 · 1 · 1 · 1 | [05-s3](src/story/scenes/05.ts#L428) | [05](content/a1/05-einkaufen.yaml#L118) | гл. 5 |
| die Bank ↻ | 9, экз. | 1 · 1 · 1 · 1 | [09-s1](src/story/scenes/09.ts#L115) | [09](content/a1/09-stadt.yaml#L106) | гл. 9 |
| der Computer ↻ | экз. | 1 · 1 · 0 · 0 | [02-s4](src/story/scenes/02.ts#L471) | — | — |
| die Durchsage | 12, экз. | 1 · 1 · 0 · 0 | [12-s2](src/story/scenes/12.ts#L179) | [05](content/a1/05-einkaufen.yaml#L208) [09](content/a1/09-stadt.yaml#L207) [12](content/a1/12-reisen.yaml#L98) | гл. 12 |
| der Durst | экз. | 1 · 1 · 1 · 0 | [04-s5](src/story/scenes/04.ts#L641) | [04](content/a1/04-essen.yaml#L207) | гл. 4 |
| die E-Mail ↻ | экз. | 1 · 1 · 0 · 0 | [02-s4](src/story/scenes/02.ts#L471) | [03](content/a1/03-familie.yaml#L223) [07](content/a1/07-freizeit.yaml#L221) [10](content/a1/10-gesundheit.yaml#L199) [11](content/a1/11-arbeit.yaml#L46) | — |
| die Erdbeere ↻ | 5 | 1 · 1 · 1 · 1 | [05-s3](src/story/scenes/05.ts#L428) | [05](content/a1/05-einkaufen.yaml#L120) | гл. 5 |
| der Erwachsene ↻ | экз. | 1 · 1 · 0 · 0 | [03-s4](src/story/scenes/03.ts#L589) | — | — |
| der Feiertag ↻ | экз. | 1 · 1 · 0 · 0 | [06-s2](src/story/scenes/06.ts#L259) | — | — |
| die Flasche ↻ | 5, экз. | 1 · 1 · 1 · 1 | [05-s6](src/story/scenes/05.ts#L810) | [05](content/a1/05-einkaufen.yaml#L109) | гл. 4, 5 |
| der Flughafen | 12, экз. | 1 · 1 · 1 · 1 | [12-s1](src/story/scenes/12.ts#L135) | [12](content/a1/12-reisen.yaml#L94) | гл. 12 |
| das Flugzeug ↻ | 12, экз. | 1 · 1 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L261) | [12](content/a1/12-reisen.yaml#L93) | гл. 12 |
| das Geschäft ↻ | экз. | 1 · 1 · 0 · 0 | [05-s2](src/story/scenes/05.ts#L147) | [05](content/a1/05-einkaufen.yaml#L224) | — |
| das Gewicht ↻ | экз. | 1 · 1 · 0 · 0 | [05-s3](src/story/scenes/05.ts#L298) | — | — |
| das Gleis ↻ | 9, 12, экз. | 1 · 1 · 1 · 0 | [09-s2](src/story/scenes/09.ts#L150) | [09](content/a1/09-stadt.yaml#L127) [12](content/a1/12-reisen.yaml#L96) | гл. 9 |
| das Glück | экз. | 1 · 1 · 0 · 1 | [09-s4](src/story/scenes/09.ts#L567) | [11](content/a1/11-arbeit.yaml#L50) | — |
| der Hausmann (от die Hausfrau) | 11, экз. | 1 · 1 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L98) | [11](content/a1/11-arbeit.yaml#L116) | гл. 11 |
| der Husten ↻ | 10 | 1 · 1 · 1 · 0 | [10-s3](src/story/scenes/10.ts#L356) | [10](content/a1/10-gesundheit.yaml#L102) | гл. 10 |
| das Internet ↻ | экз. | 1 · 1 · 0 · 0 | [02-s4](src/story/scenes/02.ts#L471) | [12](content/a1/12-reisen.yaml#L228) | — |
| der Jugendliche ↻ | экз. | 1 · 1 · 0 · 0 | [03-s4](src/story/scenes/03.ts#L589) | — | — |
| die Kartoffel ↻ | 5, экз. | 1 · 1 · 1 · 1 | [05-s3](src/story/scenes/05.ts#L428) | [05](content/a1/05-einkaufen.yaml#L122) | гл. 5 |
| die Kleidung ↻ | экз. | 1 · 1 · 0 · 0 | [05-s1](src/story/scenes/05.ts#L100) | [05](content/a1/05-einkaufen.yaml#L125) | — |
| der Kollege ↻ | 11, экз. | 1 · 1 · 1 · 1 | [11-s6](src/story/scenes/11.ts#L708) | [11](content/a1/11-arbeit.yaml#L126) | гл. 11 |
| der Krankenpfleger | 11 | 1 · 1 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L98) | [11](content/a1/11-arbeit.yaml#L111) | гл. 11 |
| die Kreditkarte (от die Karte) ↻ | экз. | 1 · 1 · 0 · 0 | [05-i1](src/story/scenes/05.ts#L457) | — | — |
| die Lebensmittel (от leben) ↻ | экз. | 1 · 1 · 0 · 0 | [05-s3](src/story/scenes/05.ts#L298) | — | — |
| die Lehrerin | 11 | 1 · 1 · 1 · 0 | [11-s6](src/story/scenes/11.ts#L678) | [11](content/a1/11-arbeit.yaml#L87) | гл. 11 |
| der Liegeplatz ↻ | 2 | 1 · 1 · 1 · 0 | [02-s2](src/story/scenes/02.ts#L136) | [02](content/a1/02-zahlen.yaml#L93) [12](content/a1/12-reisen.yaml#L889) | гл. 2 |
| das Lokal ↻ | экз. | 1 · 1 · 0 · 0 | [04-s1](src/story/scenes/04.ts#L121) | [04](content/a1/04-essen.yaml#L181) | — |
| die Maschine | экз. | 1 · 1 · 1 · 1 | [08-s6](src/story/scenes/08.ts#L809) | [08](content/a1/08-wohnen.yaml#L70) | гл. 8 |
| das Meer | экз. | 1 · 1 · 1 · 0 | [11-s1](src/story/scenes/11.ts#L78) | — | — |
| der Mensch ↻ | экз. | 1 · 1 · 0 · 0 | [01-s6](src/story/scenes/01.ts#L607) | — | — |
| das Mittagessen | 4 | 1 · 1 · 1 · 1 | [04-s1](src/story/scenes/04.ts#L109) | [04](content/a1/04-essen.yaml#L193) | гл. 4 |
| das Öl ↻ | экз. | 1 · 1 · 0 · 0 | [04-s1](src/story/scenes/04.ts#L121) | — | — |
| die Orange ↻ | 5 | 1 · 1 · 1 · 1 | [05-s3](src/story/scenes/05.ts#L428) | [05](content/a1/05-einkaufen.yaml#L119) | гл. 5 |
| das Papier | экз. | 1 · 1 · 0 · 1 | [04-s2](src/story/scenes/04.ts#L226) | — | — |
| der Partner ↻ | 3, экз. | 1 · 1 · 1 · 1 | [03-s3](src/story/scenes/03.ts#L409) | [03](content/a1/03-familie.yaml#L139) [04](content/a1/04-essen.yaml#L277) [05](content/a1/05-einkaufen.yaml#L245) [07](content/a1/07-freizeit.yaml#L265) | гл. 3 |
| die Partnerin ↻ | 3, экз. | 1 · 1 · 1 · 1 | [03-s3](src/story/scenes/03.ts#L409) | [03](content/a1/03-familie.yaml#L140) | гл. 3 |
| die Pasta ↻ | 4 | 1 · 1 · 1 · 1 | [04-s1](src/story/scenes/04.ts#L103) | [04](content/a1/04-essen.yaml#L60) [11](content/a1/11-arbeit.yaml#L40) | гл. 4 |
| die Person | 12 | 1 · 1 · 1 · 1 | [01-s6](src/story/scenes/01.ts#L599) | [01](content/a1/01-kennenlernen.yaml#L114) [02](content/a1/02-zahlen.yaml#L203) [03](content/a1/03-familie.yaml#L166) [04](content/a1/04-essen.yaml#L227) [07](content/a1/07-freizeit.yaml#L183) [10](content/a1/10-gesundheit.yaml#L152) [11](content/a1/11-arbeit.yaml#L176) [12](content/a1/12-reisen.yaml#L107) | гл. 1, 12 |
| das Rathaus ↻ | 9 | 1 · 1 · 1 · 1 | [09-s1](src/story/scenes/09.ts#L115) | [09](content/a1/09-stadt.yaml#L109) | гл. 9 |
| das Restaurant ↻ | экз. | 1 · 1 · 0 · 0 | [04-s1](src/story/scenes/04.ts#L121) | [04](content/a1/04-essen.yaml#L77) [06](content/a1/06-tagesablauf.yaml#L62) [11](content/a1/11-arbeit.yaml#L44) | — |
| die Rezeption | экз. | 1 · 1 · 0 · 0 | [12-s3](src/story/scenes/12.ts#L275) | — | — |
| die S-Bahn ↻ | 9, экз. | 1 · 1 · 1 · 1 | [09-s1](src/story/scenes/09.ts#L111) | [09](content/a1/09-stadt.yaml#L119) | гл. 9 |
| das Salz ↻ | экз. | 1 · 1 · 0 · 0 | [04-s1](src/story/scenes/04.ts#L121) | — | — |
| der Schinken ↻ | экз. | 1 · 1 · 0 · 0 | [04-s1](src/story/scenes/04.ts#L100) | — | — |
| das Schlafzimmer ↻ | 8 | 1 · 1 · 1 · 1 | [08-s6](src/story/scenes/08.ts#L809) | [08](content/a1/08-wohnen.yaml#L74) | гл. 8 |
| der Schluss ↻ | экз. | 1 · 1 · 0 · 0 | [06-s4](src/story/scenes/06.ts#L546) | — | — |
| der Schnupfen ↻ | 10 | 1 · 1 · 1 · 0 | [10-s3](src/story/scenes/10.ts#L356) | [10](content/a1/10-gesundheit.yaml#L103) | гл. 10 |
| der Schreibtisch | 8 | 1 · 1 · 1 · 1 | [08-s1](src/story/scenes/08.ts#L130) | [08](content/a1/08-wohnen.yaml#L128) | гл. 8 |
| die Schweiz ↻ | 1 | 1 · 1 · 1 · 1 | [01-s2](src/story/scenes/01.ts#L210) | [01](content/a1/01-kennenlernen.yaml#L139) [09](content/a1/09-stadt.yaml#L362) | гл. 1 |
| die Tante ↻ | 3 | 1 · 1 · 1 · 0 | [03-s4](src/story/scenes/03.ts#L593) | [03](content/a1/03-familie.yaml#L114) | гл. 3 |
| der Text | экз. | 1 · 1 · 0 · 1 | [09-s3](src/story/scenes/09.ts#L433) | [02](content/a1/02-zahlen.yaml#L258) [03](content/a1/03-familie.yaml#L227) [04](content/a1/04-essen.yaml#L299) [05](content/a1/05-einkaufen.yaml#L212) [06](content/a1/06-tagesablauf.yaml#L196) [07](content/a1/07-freizeit.yaml#L225) [08](content/a1/08-wohnen.yaml#L261) [09](content/a1/09-stadt.yaml#L211) [10](content/a1/10-gesundheit.yaml#L181) [11](content/a1/11-arbeit.yaml#L195) [12](content/a1/12-reisen.yaml#L204) | — |
| die Treppe | экз. | 1 · 1 · 1 · 1 | [08-s1](src/story/scenes/08.ts#L130) | [08](content/a1/08-wohnen.yaml#L100) | — |
| die U-Bahn ↻ | 9 | 1 · 1 · 1 · 1 | [09-s1](src/story/scenes/09.ts#L111) | [09](content/a1/09-stadt.yaml#L120) | гл. 9 |
| der Urlaub ↻ | 12, экз. | 1 · 1 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L261) | [12](content/a1/12-reisen.yaml#L91) | гл. 12 |
| die USA ↻ | 1 | 1 · 1 · 1 · 1 | [01-s2](src/story/scenes/01.ts#L210) | [01](content/a1/01-kennenlernen.yaml#L140) [02](content/a1/02-zahlen.yaml#L238) | гл. 1 |
| die Vorwahl ↻ | экз. | 1 · 1 · 0 · 0 | [02-s3](src/story/scenes/02.ts#L374) | — | — |
| die Waschmaschine ↻ | 8 | 1 · 1 · 1 · 1 | [08-s6](src/story/scenes/08.ts#L809) | [08](content/a1/08-wohnen.yaml#L70) | гл. 8 |
| der Wein ↻ | 4, экз. | 1 · 1 · 1 · 1 | [04-s3](src/story/scenes/04.ts#L386) | [04](content/a1/04-essen.yaml#L72) | гл. 4 |
| die Zeitung | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L75) | — | — |

### Глаголы (24)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| abfahren | экз. | 1 · 1 · 1 · 0 | [09-s2](src/story/scenes/09.ts#L159) | [09](content/a1/09-stadt.yaml#L214) [12](content/a1/12-reisen.yaml#L246) | — |
| anfangen | 6, экз. | 1 · 1 · 1 · 0 | [06-s4](src/story/scenes/06.ts#L537) | [06](content/a1/06-tagesablauf.yaml#L36) [09](content/a1/09-stadt.yaml#L91) | гл. 6 |
| anmelden | экз. | 1 · 1 · 0 · 1 | [10-s2](src/story/scenes/10.ts#L147) | — | — |
| antworten ↻ | экз. | 1 · 1 · 0 · 0 | [02-s4](src/story/scenes/02.ts#L449) | [03](content/a1/03-familie.yaml#L213) [04](content/a1/04-essen.yaml#L277) [07](content/a1/07-freizeit.yaml#L238) [12](content/a1/12-reisen.yaml#L199) | гл. 5 |
| anziehen ↻ | экз. | 1 · 1 · 0 · 0 | [05-s1](src/story/scenes/05.ts#L100) | — | — |
| aufräumen ↻ | 6 | 1 · 1 · 1 · 0 | [06-s6](src/story/scenes/06.ts#L779) | [06](content/a1/06-tagesablauf.yaml#L154) | гл. 6 |
| ausfüllen | экз. | 1 · 1 · 0 · 1 | [10-s2](src/story/scenes/10.ts#L169) | — | — |
| ausziehen ↻ | экз. | 1 · 1 · 0 · 0 | [05-s1](src/story/scenes/05.ts#L100) | — | — |
| beginnen ↻ | экз. | 1 · 1 · 0 · 0 | [06-s4](src/story/scenes/06.ts#L546) | [06](content/a1/06-tagesablauf.yaml#L200) [11](content/a1/11-arbeit.yaml#L785) | — |
| bekommen | экз. | 1 · 1 · 0 · 1 | [10-s5](src/story/scenes/10.ts#L582) | — | гл. 11 |
| besuchen | экз. | 1 · 1 · 1 · 0 | [11-s2](src/story/scenes/11.ts#L241) | [07](content/a1/07-freizeit.yaml#L64) | — |
| enden ↻ | экз. | 1 · 1 · 0 · 0 | [06-s4](src/story/scenes/06.ts#L546) | [07](content/a1/07-freizeit.yaml#L422) [12](content/a1/12-reisen.yaml#L198) | — |
| feiern | экз. | 1 · 1 · 0 · 1 | [08-s1](src/story/scenes/08.ts#L98) | — | — |
| fernsehen ↻ | 6, экз. | 1 · 1 · 1 · 0 | [06-s6](src/story/scenes/06.ts#L779) | [06](content/a1/06-tagesablauf.yaml#L70) | гл. 6 |
| gratulieren ↻ | экз. | 1 · 1 · 0 · 0 | [03-s6](src/story/scenes/03.ts#L739) | — | — |
| heiraten ↻ | экз. | 1 · 1 · 0 · 0 | [03-s6](src/story/scenes/03.ts#L738) | — | — |
| kennenlernen (от kennen) ↻ | экз. | 1 · 1 · 0 · 0 | [01-s6](src/story/scenes/01.ts#L608) | [01](content/a1/01-kennenlernen.yaml#L1) [11](content/a1/11-arbeit.yaml#L199) | — |
| lachen | экз. | 1 · 1 · 0 · 1 | [09-i1](src/story/scenes/09.ts#L259) | — | — |
| leben ↻ | экз. | 1 · 1 · 0 · 0 | [03-s6](src/story/scenes/03.ts#L738) | — | — |
| unterschreiben ↻ | экз. | 1 · 1 · 0 · 0 | [01-s4](src/story/scenes/01.ts#L463) | — | — |
| verkaufen ↻ | экз. | 1 · 1 · 0 · 0 | [05-s2](src/story/scenes/05.ts#L147) | — | — |
| verstehen | экз. | 1 · 1 · 1 · 0 | [07-s6](src/story/scenes/07.ts#L743) | — | — |
| vorstellen | экз. | 1 · 1 · 0 · 0 | [01-s6](src/story/scenes/01.ts#L608) | [01](content/a1/01-kennenlernen.yaml#L213) [11](content/a1/11-arbeit.yaml#L204) | — |
| zahlen | экз. | 1 · 1 · 1 · 1 | [02-s6](src/story/scenes/02.ts#L677) | [02](content/a1/02-zahlen.yaml#L1) [04](content/a1/04-essen.yaml#L42) | — |

### Прилагательные и наречия (16)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| arbeitslos | экз. | 1 · 1 · 0 · 1 | [11-s1](src/story/scenes/11.ts#L73) | — | — |
| bald ↻ | экз. | 1 · 1 · 0 · 0 | [06-s1](src/story/scenes/06.ts#L139) | [12](content/a1/12-reisen.yaml#L198) | — |
| eilig ↻ | экз. | 1 · 1 · 0 · 0 | [06-s1](src/story/scenes/06.ts#L139) | — | — |
| einfach | экз. | 1 · 1 · 0 · 1 | [09-i1](src/story/scenes/09.ts#L284) | — | — |
| gerade ↻ | экз. | 1 · 1 · 0 · 0 | [06-s3](src/story/scenes/06.ts#L442) | — | — |
| gleich ↻ | экз. | 1 · 1 · 0 · 0 | [06-s1](src/story/scenes/06.ts#L139) | [08](content/a1/08-wohnen.yaml#L50) | — |
| hell | 8, экз. | 1 · 1 · 0 · 0 | [08-s4](src/story/scenes/08.ts#L479) | [08](content/a1/08-wohnen.yaml#L62) | гл. 8 |
| international ↻ | экз. | 1 · 1 · 0 · 0 | [01-s6](src/story/scenes/01.ts#L607) | — | — |
| kurz ↻ | 5, экз. | 1 · 1 · 1 · 0 | [05-s1](src/story/scenes/05.ts#L106) | [05](content/a1/05-einkaufen.yaml#L155) [08](content/a1/08-wohnen.yaml#L196) [09](content/a1/09-stadt.yaml#L184) [10](content/a1/10-gesundheit.yaml#L186) | гл. 5 |
| laut | 8, экз. | 1 · 1 · 1 · 0 | [07-i1](src/story/scenes/07.ts#L658) | [08](content/a1/08-wohnen.yaml#L140) | гл. 8 |
| manchmal ↻ | 7 | 1 · 1 · 1 · 0 | [07-s2](src/story/scenes/07.ts#L262) | [07](content/a1/07-freizeit.yaml#L161) | гл. 7 |
| oft ↻ | 7, экз. | 1 · 1 · 1 · 0 | [07-s2](src/story/scenes/07.ts#L262) | [04](content/a1/04-essen.yaml#L66) [07](content/a1/07-freizeit.yaml#L152) [12](content/a1/12-reisen.yaml#L216) | гл. 7 |
| pünktlich ↻ | экз. | 1 · 1 · 0 · 0 | [06-s1](src/story/scenes/06.ts#L67) | [09](content/a1/09-stadt.yaml#L436) | — |
| windig | 12 | 1 · 1 · 0 · 0 | [12-s1](src/story/scenes/12.ts#L37) | [12](content/a1/12-reisen.yaml#L66) | гл. 12 |
| wunderbar | экз. | 1 · 1 · 0 · 1 | [07-s2](src/story/scenes/07.ts#L229) | — | — |
| zurzeit (от die Zeit) ↻ | экз. | 1 · 1 · 0 · 0 | [06-s3](src/story/scenes/06.ts#L442) | — | — |

### Выражения (7)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| 100 Gramm ↻ | 5 | 1 · 1 · 1 · 0 | [05-s1](src/story/scenes/05.ts#L106) | [05](content/a1/05-einkaufen.yaml#L107) | гл. 5 |
| arbeiten als | 11 | 1 · 1 · 1 · 0 | [11-s6](src/story/scenes/11.ts#L678) | [11](content/a1/11-arbeit.yaml#L129) | гл. 11 |
| Durst haben | 4 | 1 · 1 · 1 · 0 | [04-s5](src/story/scenes/04.ts#L641) | [04](content/a1/04-essen.yaml#L207) | гл. 4 |
| in der Nähe | 9 | 1 · 1 · 1 · 0 | [09-s6](src/story/scenes/09.ts#L787) | [09](content/a1/09-stadt.yaml#L141) | гл. 9 |
| Musik hören ↻ | 7 | 1 · 1 · 1 · 1 | [07-s6](src/story/scenes/07.ts#L760) | [07](content/a1/07-freizeit.yaml#L124) | гл. 7 |
| was für ein | экз. | 1 · 1 · 0 · 1 | [10-s6](src/story/scenes/10.ts#L656) | — | — |
| Wie viel Uhr ist es? ↻ | 6 | 1 · 1 · 1 · 0 | [06-s4](src/story/scenes/06.ts#L533) | [06](content/a1/06-tagesablauf.yaml#L106) | гл. 6 |

### Числа, время, цвета и другие группы (11)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| achtzig ↻ | экз. | 1 · 1 · 0 · 0 | [02-s1](src/story/scenes/02.ts#L39) | [02](content/a1/02-zahlen.yaml#L419) [05](content/a1/05-einkaufen.yaml#L46) | гл. 5 |
| der August ↻ | экз. | 1 · 1 · 0 · 0 | [06-s2](src/story/scenes/06.ts#L257) | [12](content/a1/12-reisen.yaml#L174) | — |
| braun ↻ | экз. | 1 · 1 · 0 · 0 | [05-s2](src/story/scenes/05.ts#L215) | — | — |
| der Cent ↻ | экз. | 1 · 1 · 0 · 0 | [05-s2](src/story/scenes/05.ts#L252) | [05](content/a1/05-einkaufen.yaml#L165) | — |
| grün ↻ | экз. | 1 · 1 · 0 · 0 | [05-s3](src/story/scenes/05.ts#L297) | — | — |
| die Million ↻ | экз. | 1 · 1 · 0 · 0 | [02-s1](src/story/scenes/02.ts#L40) | — | — |
| der Mittwoch | 6, экз. | 1 · 1 · 0 · 0 | [10-s1](src/story/scenes/10.ts#L38) | [06](content/a1/06-tagesablauf.yaml#L133) | гл. 6, 10 |
| der November ↻ | экз. | 1 · 1 · 0 · 0 | [06-s2](src/story/scenes/06.ts#L257) | [12](content/a1/12-reisen.yaml#L174) | — |
| der Oktober ↻ | экз. | 1 · 1 · 0 · 0 | [06-s2](src/story/scenes/06.ts#L257) | [12](content/a1/12-reisen.yaml#L173) | — |
| das Prozent ↻ | экз. | 1 · 1 · 0 · 0 | [05-s2](src/story/scenes/05.ts#L228) | — | — |
| der Wochentag ↻ | экз. | 1 · 1 · 0 · 0 | [06-s2](src/story/scenes/06.ts#L259) | — | — |

## Слова: слабо

187 слов.

### Существительные (92)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| das Abendessen | 4 | 2 · 1 · 1 · 1 | [04-s1](src/story/scenes/04.ts#L109) [04-s6](src/story/scenes/04.ts#L691) | [04](content/a1/04-essen.yaml#L194) | гл. 4 |
| die Abreise | 12 | 2 · 1 · 1 · 1 | [12-s3](src/story/scenes/12.ts#L300) | [12](content/a1/12-reisen.yaml#L112) | гл. 12 |
| die Adresse ↻ | 2, экз. | 3 · 1 · 2 · 0 | [08-s4](src/story/scenes/08.ts#L516) [08-s6](src/story/scenes/08.ts#L808) | [02](content/a1/02-zahlen.yaml#L133) | гл. 2 |
| die Ampel ↻ | 9 | 20 · 1 · 11 · 5 | [09-s1](src/story/scenes/09.ts#L115) [09-s2](src/story/scenes/09.ts#L220) [09-s3](src/story/scenes/09.ts#L311) | [09](content/a1/09-stadt.yaml#L34) | гл. 9 |
| der Anfang (от anfangen) ↻ | экз. | 2 · 1 · 1 · 0 | [06-s4](src/story/scenes/06.ts#L537) | [06](content/a1/06-tagesablauf.yaml#L149) | гл. 6 |
| die Anmeldung (от anmelden) ↻ | экз. | 5 · 1 · 2 · 1 | [10-s2](src/story/scenes/10.ts#L137) [10-s6](src/story/scenes/10.ts#L685) | [01](content/a1/01-kennenlernen.yaml#L227) [02](content/a1/02-zahlen.yaml#L27) [11](content/a1/11-arbeit.yaml#L236) | — |
| die Anreise ↻ | 12 | 3 · 1 · 2 · 2 | [12-s3](src/story/scenes/12.ts#L300) [12-s6](src/story/scenes/12.ts#L686) | [12](content/a1/12-reisen.yaml#L111) | гл. 12 |
| Argentinien | 1 | 8 · 1 · 7 · 3 | [01-s3](src/story/scenes/01.ts#L220) [01-s5](src/story/scenes/01.ts#L506) [01-s6](src/story/scenes/01.ts#L599) | [01](content/a1/01-kennenlernen.yaml#L40) [11](content/a1/11-arbeit.yaml#L213) | гл. 1, 3 |
| der Arm ↻ | 10, экз. | 3 · 1 · 3 · 2 | [10-s1](src/story/scenes/10.ts#L53) [10-s3](src/story/scenes/10.ts#L356) | [10](content/a1/10-gesundheit.yaml#L66) | гл. 10 |
| das Auge ↻ | 10, экз. | 3 · 1 · 2 · 3 | [10-s1](src/story/scenes/10.ts#L53) | [10](content/a1/10-gesundheit.yaml#L83) | гл. 10 |
| das Ausland ↻ | экз. | 3 · 3 · 2 · 2 | [01-s1](src/story/scenes/01.ts#L56) [02-разминка](src/story/scenes/warmups.ts#L8) [03-разминка](src/story/scenes/warmups.ts#L14) | — | — |
| der Ausländer (от das Ausland) ↻ | экз. | 2 · 2 · 1 · 1 | [01-s1](src/story/scenes/01.ts#L56) [02-разминка](src/story/scenes/warmups.ts#L8) | — | — |
| das Auto ↻ | 9, экз. | 17 · 1 · 7 · 9 | [09-s1](src/story/scenes/09.ts#L58) [09-i1](src/story/scenes/09.ts#L258) [09-s3](src/story/scenes/09.ts#L324) [09-s6](src/story/scenes/09.ts#L787) | [09](content/a1/09-stadt.yaml#L122) | гл. 9 |
| der Automat ↻ | экз. | 3 · 1 · 1 · 1 | [09-s2](src/story/scenes/09.ts#L167) [09-s6](src/story/scenes/09.ts#L802) | [09](content/a1/09-stadt.yaml#L235) | — |
| das Bad ↻ | 8, экз. | 5 · 1 · 4 · 4 | [08-s1](src/story/scenes/08.ts#L124) [08-s3](src/story/scenes/08.ts#L381) [08-s6](src/story/scenes/08.ts#L809) | [08](content/a1/08-wohnen.yaml#L3) | гл. 8 |
| die Bahn | экз. | 5 · 1 · 4 · 3 | [09-s1](src/story/scenes/09.ts#L77) [09-s6](src/story/scenes/09.ts#L815) | [09](content/a1/09-stadt.yaml#L118) | гл. 9 |
| der Bahnhof ↻ | 9, экз. | 4 · 1 · 3 · 2 | [09-s1](src/story/scenes/09.ts#L77) [09-s2](src/story/scenes/09.ts#L137) [09-s6](src/story/scenes/09.ts#L775) | [09](content/a1/09-stadt.yaml#L3) [12](content/a1/12-reisen.yaml#L242) | гл. 9 |
| das Bein ↻ | 10, экз. | 2 · 1 · 2 · 1 | [10-s1](src/story/scenes/10.ts#L53) [10-s3](src/story/scenes/10.ts#L356) | [10](content/a1/10-gesundheit.yaml#L92) | гл. 10 |
| der Beruf ↻ | 11, экз. | 5 · 1 · 5 · 3 | [11-s5](src/story/scenes/11.ts#L626) [11-s6](src/story/scenes/11.ts#L667) | [01](content/a1/01-kennenlernen.yaml#L218) [11](content/a1/11-arbeit.yaml#L3) | гл. 11 |
| der Doktor | экз. | 12 · 1 · 2 · 6 | [10-s1](src/story/scenes/10.ts#L85) [10-s2](src/story/scenes/10.ts#L119) [10-s3](src/story/scenes/10.ts#L333) [10-s4](src/story/scenes/10.ts#L384) [10-s6](src/story/scenes/10.ts#L621) | [11](content/a1/11-arbeit.yaml#L36) | — |
| die Dusche (от duschen) ↻ | экз. | 4 · 1 · 2 · 2 | [06-s6](src/story/scenes/06.ts#L763) | [06](content/a1/06-tagesablauf.yaml#L148) | гл. 6 |
| die Einladung (от einladen) ↻ | 7, экз. | 3 · 1 · 3 · 3 | [07-s2](src/story/scenes/07.ts#L259) [07-s6](src/story/scenes/07.ts#L748) | [07](content/a1/07-freizeit.yaml#L177) | гл. 7 |
| das Einzelzimmer ↻ | 12, экз. | 4 · 1 · 3 · 2 | [12-s1](src/story/scenes/12.ts#L135) [12-s3](src/story/scenes/12.ts#L300) | [12](content/a1/12-reisen.yaml#L36) | гл. 12 |
| die Erkältung ↻ | 10 | 5 · 1 · 3 · 2 | [10-s1](src/story/scenes/10.ts#L39) [10-s3](src/story/scenes/10.ts#L356) [10-s6](src/story/scenes/10.ts#L695) | [10](content/a1/10-gesundheit.yaml#L100) | гл. 10 |
| der Feierabend ↻ | 6 | 13 · 1 · 9 · 7 | [06-s1](src/story/scenes/06.ts#L118) [06-s3](src/story/scenes/06.ts#L294) [06-s4](src/story/scenes/06.ts#L533) [06-s5](src/story/scenes/06.ts#L689) [06-s6](src/story/scenes/06.ts#L722) | [06](content/a1/06-tagesablauf.yaml#L68) | гл. 6 |
| das Fieber ↻ | 10, экз. | 6 · 1 · 4 · 3 | [10-s1](src/story/scenes/10.ts#L27) [10-s3](src/story/scenes/10.ts#L356) [10-s6](src/story/scenes/10.ts#L695) | [10](content/a1/10-gesundheit.yaml#L38) | гл. 10 |
| die Firma ↻ | 11, экз. | 9 · 1 · 7 · 5 | [11-s1](src/story/scenes/11.ts#L98) [11-s2](src/story/scenes/11.ts#L271) [11-s3](src/story/scenes/11.ts#L296) [11-s5](src/story/scenes/11.ts#L626) [11-s6](src/story/scenes/11.ts#L696) | [11](content/a1/11-arbeit.yaml#L124) | гл. 11 |
| der Flur ↻ | 8 | 5 · 1 · 2 · 2 | [08-s1](src/story/scenes/08.ts#L124) [08-s5](src/story/scenes/08.ts#L587) [08-s6](src/story/scenes/08.ts#L782) | [08](content/a1/08-wohnen.yaml#L60) | гл. 8 |
| die Freizeit ↻ | 7, экз. | 3 · 1 · 3 · 3 | [07-s2](src/story/scenes/07.ts#L259) [07-s3](src/story/scenes/07.ts#L413) [07-s6](src/story/scenes/07.ts#L711) | [07](content/a1/07-freizeit.yaml#L1) | гл. 7 |
| der Fußball | экз. | 4 · 1 · 3 · 3 | [07-s3](src/story/scenes/07.ts#L390) [07-s6](src/story/scenes/07.ts#L738) | [07](content/a1/07-freizeit.yaml#L115) | гл. 7 |
| das Gespräch | экз. | 4 · 1 · 2 · 4 | [11-s1](src/story/scenes/11.ts#L98) [11-s4](src/story/scenes/11.ts#L27) | [09](content/a1/09-stadt.yaml#L222) [11](content/a1/11-arbeit.yaml#L48) | гл. 11 |
| die Größe (от groß) ↻ | 5, экз. | 17 · 2 · 9 · 8 | [05-s1](src/story/scenes/05.ts#L54) [05-s2](src/story/scenes/05.ts#L147) [05-s3](src/story/scenes/05.ts#L424) [05-s4](src/story/scenes/05.ts#L481) [05-s5](src/story/scenes/05.ts#L649) [05-s6](src/story/scenes/05.ts#L713) | [05](content/a1/05-einkaufen.yaml#L63) | гл. 5 |
| der Gruß | экз. | 12 · 12 · 12 · 0 | [01-s5](src/story/scenes/01.ts#L567) [02-s5](src/story/scenes/02.ts#L595) [03-s5](src/story/scenes/03.ts#L691) [04-s5](src/story/scenes/04.ts#L641) [05-s5](src/story/scenes/05.ts#L649) [06-s5](src/story/scenes/06.ts#L633) [07-s5](src/story/scenes/07.ts#L609) [08-s5](src/story/scenes/08.ts#L679) | [03](content/a1/03-familie.yaml#L230) [07](content/a1/07-freizeit.yaml#L229) [10](content/a1/10-gesundheit.yaml#L201) [12](content/a1/12-reisen.yaml#L80) | гл. 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 |
| die Gurke ↻ | 5 | 4 · 2 · 4 · 2 | [05-s3](src/story/scenes/05.ts#L311) [12-разминка](src/story/scenes/warmups.ts#L59) | [05](content/a1/05-einkaufen.yaml#L124) | гл. 5 |
| der Hals ↻ | 10 | 10 · 1 · 5 · 6 | [10-s1](src/story/scenes/10.ts#L39) [10-s3](src/story/scenes/10.ts#L250) [10-s4](src/story/scenes/10.ts#L28) [10-s6](src/story/scenes/10.ts#L695) | [10](content/a1/10-gesundheit.yaml#L60) | гл. 10 |
| die Hausnummer | 2 | 3 · 1 · 2 · 1 | [02-s3](src/story/scenes/02.ts#L244) | [02](content/a1/02-zahlen.yaml#L134) | гл. 2 |
| die Heimat ↻ | экз. | 2 · 2 · 1 · 1 | [01-s6](src/story/scenes/01.ts#L607) [02-разминка](src/story/scenes/warmups.ts#L8) | — | — |
| das Hemd ↻ | 5 | 13 · 1 · 7 · 7 | [05-s1](src/story/scenes/05.ts#L54) [05-s2](src/story/scenes/05.ts#L180) [05-s4](src/story/scenes/05.ts#L562) [05-s6](src/story/scenes/05.ts#L715) | [05](content/a1/05-einkaufen.yaml#L133) | гл. 5 |
| der Herd ↻ | 8, экз. | 3 · 1 · 3 · 1 | [08-s2](src/story/scenes/08.ts#L164) [08-s4](src/story/scenes/08.ts#L560) | [08](content/a1/08-wohnen.yaml#L68) | гл. 8 |
| die Hose ↻ | 5 | 30 · 1 · 18 · 17 | [05-s1](src/story/scenes/05.ts#L41) [05-s2](src/story/scenes/05.ts#L152) | [05](content/a1/05-einkaufen.yaml#L130) | гл. 5 |
| das Hotel ↻ | 12, экз. | 18 · 1 · 10 · 6 | [12-s1](src/story/scenes/12.ts#L26) [12-s2](src/story/scenes/12.ts#L224) [12-s3](src/story/scenes/12.ts#L275) [12-s5](src/story/scenes/12.ts#L499) | [12](content/a1/12-reisen.yaml#L26) | гл. 12 |
| die Idee ↻ | 7 | 8 · 1 · 3 · 5 | [07-s1](src/story/scenes/07.ts#L38) [07-s3](src/story/scenes/07.ts#L413) [07-s4](src/story/scenes/07.ts#L446) [07-s5](src/story/scenes/07.ts#L534) | [07](content/a1/07-freizeit.yaml#L70) | гл. 7 |
| die Kaltmiete ↻ | 8 | 3 · 1 · 3 · 0 | [08-s2](src/story/scenes/08.ts#L253) [08-s3](src/story/scenes/08.ts#L381) | [08](content/a1/08-wohnen.yaml#L44) | гл. 8 |
| die Kasse ↻ | экз. | 3 · 1 · 2 · 2 | [05-s2](src/story/scenes/05.ts#L252) [05-s5](src/story/scenes/05.ts#L620) [05-s6](src/story/scenes/05.ts#L810) | — | — |
| die Kellnerin ↻ | 11 | 2 · 1 · 2 · 1 | [11-s1](src/story/scenes/11.ts#L131) [11-s2](src/story/scenes/11.ts#L271) | [04](content/a1/04-essen.yaml#L187) [11](content/a1/11-arbeit.yaml#L95) | гл. 11 |
| das Kino ↻ | 7, экз. | 17 · 1 · 11 · 8 | [07-s1](src/story/scenes/07.ts#L38) [07-s2](src/story/scenes/07.ts#L178) [07-s4](src/story/scenes/07.ts#L516) [07-s5](src/story/scenes/07.ts#L550) [07-i1](src/story/scenes/07.ts#L657) [07-s6](src/story/scenes/07.ts#L711) | [07](content/a1/07-freizeit.yaml#L131) [08](content/a1/08-wohnen.yaml#L694) [09](content/a1/09-stadt.yaml#L87) | гл. 7 |
| der Kiosk | экз. | 12 · 3 · 7 · 0 | [06-s2](src/story/scenes/06.ts#L163) [06-s3](src/story/scenes/06.ts#L428) [06-s5](src/story/scenes/06.ts#L633) [06-s6](src/story/scenes/06.ts#L730) [07-s3](src/story/scenes/07.ts#L295) [08-i1](src/story/scenes/08.ts#L274) [08-s6](src/story/scenes/08.ts#L793) | [01](content/a1/01-kennenlernen.yaml#L598) | — |
| das Kleid ↻ | 5 | 3 · 1 · 3 · 2 | [05-s1](src/story/scenes/05.ts#L99) [05-s4](src/story/scenes/05.ts#L563) [05-s6](src/story/scenes/05.ts#L814) | [05](content/a1/05-einkaufen.yaml#L50) [08](content/a1/08-wohnen.yaml#L117) | гл. 5 |
| die Köchin ↻ | 11 | 5 · 1 · 5 · 3 | [11-s1](src/story/scenes/11.ts#L131) [11-s2](src/story/scenes/11.ts#L271) [11-s4](src/story/scenes/11.ts#L443) [11-s6](src/story/scenes/11.ts#L708) | [11](content/a1/11-arbeit.yaml#L91) | гл. 11 |
| der Koffer ↻ | 12, экз. | 5 · 1 · 4 · 4 | [12-s1](src/story/scenes/12.ts#L77) [12-s2](src/story/scenes/12.ts#L261) [12-s3](src/story/scenes/12.ts#L275) [12-s6](src/story/scenes/12.ts#L686) | [12](content/a1/12-reisen.yaml#L99) | гл. 12 |
| das Konzert ↻ | 7 | 3 · 1 · 3 · 2 | [07-s2](src/story/scenes/07.ts#L262) [07-s6](src/story/scenes/07.ts#L748) | [07](content/a1/07-freizeit.yaml#L146) | гл. 7 |
| der Kopf ↻ | 10, экз. | 11 · 1 · 9 · 6 | [10-s1](src/story/scenes/10.ts#L39) [10-s2](src/story/scenes/10.ts#L227) [10-s3](src/story/scenes/10.ts#L250) [10-s6](src/story/scenes/10.ts#L680) | [10](content/a1/10-gesundheit.yaml#L82) | гл. 10 |
| der Kunde ↻ | экз. | 2 · 2 · 1 · 0 | [05-s2](src/story/scenes/05.ts#L255) [09-s5](src/story/scenes/09.ts#L673) | [05](content/a1/05-einkaufen.yaml#L215) | — |
| der Kurs | экз. | 2 · 1 · 0 · 0 | [03-s4](src/story/scenes/03.ts#L474) | [01](content/a1/01-kennenlernen.yaml#L26) [02](content/a1/02-zahlen.yaml#L141) [06](content/a1/06-tagesablauf.yaml#L36) [07](content/a1/07-freizeit.yaml#L223) [10](content/a1/10-gesundheit.yaml#L58) [11](content/a1/11-arbeit.yaml#L74) [12](content/a1/12-reisen.yaml#L198) | гл. 6 |
| der Lehrer ↻ | 11, экз. | 4 · 1 · 4 · 1 | [11-s1](src/story/scenes/11.ts#L78) [11-s2](src/story/scenes/11.ts#L271) [11-s6](src/story/scenes/11.ts#L678) | [11](content/a1/11-arbeit.yaml#L86) | гл. 11 |
| das Lied | экз. | 3 · 1 · 2 · 1 | [11-s3](src/story/scenes/11.ts#L296) [11-s5](src/story/scenes/11.ts#L612) | — | — |
| der Mantel ↻ | 5 | 3 · 1 · 3 · 1 | [05-s2](src/story/scenes/05.ts#L259) [05-s4](src/story/scenes/05.ts#L563) [05-s6](src/story/scenes/05.ts#L814) | [05](content/a1/05-einkaufen.yaml#L132) | гл. 5 |
| das Medikament ↻ | 10 | 7 · 1 · 4 · 4 | [10-s1](src/story/scenes/10.ts#L57) [10-s5](src/story/scenes/10.ts#L518) | [10](content/a1/10-gesundheit.yaml#L119) | гл. 10 |
| die Miete (от mieten) ↻ | 8, экз. | 4 · 1 · 4 · 0 | [08-s2](src/story/scenes/08.ts#L253) [08-s3](src/story/scenes/08.ts#L381) [08-s4](src/story/scenes/08.ts#L560) | [08](content/a1/08-wohnen.yaml#L44) | гл. 8 |
| die Nase ↻ | 10 | 5 · 1 · 4 · 3 | [10-s1](src/story/scenes/10.ts#L38) [10-s3](src/story/scenes/10.ts#L356) [10-s6](src/story/scenes/10.ts#L695) | [10](content/a1/10-gesundheit.yaml#L85) | гл. 10 |
| die Nebenkosten | 8 | 2 · 1 · 2 · 0 | [08-s3](src/story/scenes/08.ts#L381) | [08](content/a1/08-wohnen.yaml#L40) | гл. 8 |
| das Ohr ↻ | 10 | 3 · 1 · 2 · 3 | [10-s1](src/story/scenes/10.ts#L53) | [10](content/a1/10-gesundheit.yaml#L84) | гл. 10 |
| der Park ↻ | 7 | 3 · 1 · 3 · 2 | [07-s3](src/story/scenes/07.ts#L413) [07-s4](src/story/scenes/07.ts#L516) [07-s6](src/story/scenes/07.ts#L748) | [07](content/a1/07-freizeit.yaml#L148) | гл. 7 |
| der Preis ↻ | экз. | 2 · 1 · 1 · 1 | [05-s2](src/story/scenes/05.ts#L228) [05-s6](src/story/scenes/05.ts#L810) | [05](content/a1/05-einkaufen.yaml#L160) | гл. 5 |
| der Pullover ↻ | 5 | 4 · 1 · 4 · 2 | [05-s2](src/story/scenes/05.ts#L180) [05-s4](src/story/scenes/05.ts#L563) [05-s6](src/story/scenes/05.ts#L814) | [05](content/a1/05-einkaufen.yaml#L51) | гл. 4, 5 |
| der Regenschirm ↻ | 12 | 4 · 1 · 4 · 2 | [12-s1](src/story/scenes/12.ts#L40) [12-s6](src/story/scenes/12.ts#L686) | [12](content/a1/12-reisen.yaml#L70) | гл. 12 |
| die Reise (от reisen) ↻ | 12, экз. | 3 · 1 · 3 · 3 | [12-s2](src/story/scenes/12.ts#L261) [12-s6](src/story/scenes/12.ts#L686) | [12](content/a1/12-reisen.yaml#L1) | гл. 12 |
| der Rock ↻ | 5 | 2 · 1 · 1 · 2 | [05-s1](src/story/scenes/05.ts#L101) [05-s4](src/story/scenes/05.ts#L563) | [05](content/a1/05-einkaufen.yaml#L136) | гл. 5 |
| der Schmerz | 10 | 9 · 1 · 5 · 7 | [10-s1](src/story/scenes/10.ts#L85) [10-s2](src/story/scenes/10.ts#L120) [10-s6](src/story/scenes/10.ts#L667) | [10](content/a1/10-gesundheit.yaml#L18) | гл. 10 |
| der Schuh ↻ | 5, экз. | 4 · 1 · 3 · 2 | [05-s1](src/story/scenes/05.ts#L98) [05-s4](src/story/scenes/05.ts#L563) [05-s6](src/story/scenes/05.ts#L814) | [05](content/a1/05-einkaufen.yaml#L97) | гл. 5 |
| das Schwimmbad (от schwimmen) ↻ | 7, экз. | 2 · 1 · 2 · 2 | [07-s3](src/story/scenes/07.ts#L413) [07-s6](src/story/scenes/07.ts#L748) | [07](content/a1/07-freizeit.yaml#L147) | гл. 7 |
| die Sonne | экз. | 7 · 2 · 3 · 4 | [11-s1](src/story/scenes/11.ts#L25) [12-s1](src/story/scenes/12.ts#L135) [12-s5](src/story/scenes/12.ts#L511) | [08](content/a1/08-wohnen.yaml#L64) [12](content/a1/12-reisen.yaml#L68) | гл. 12 |
| der Sport ↻ | 7, экз. | 2 · 1 · 2 · 2 | [07-s3](src/story/scenes/07.ts#L413) [07-s4](src/story/scenes/07.ts#L513) | [07](content/a1/07-freizeit.yaml#L143) [10](content/a1/10-gesundheit.yaml#L64) | гл. 7 |
| die Straßenbahn ↻ | 9, экз. | 5 · 1 · 4 · 3 | [09-s1](src/story/scenes/09.ts#L77) [09-s6](src/story/scenes/09.ts#L815) | [09](content/a1/09-stadt.yaml#L118) | гл. 9 |
| der Student (от das Studium) ↻ | 11, экз. | 7 · 1 · 4 · 5 | [11-s1](src/story/scenes/11.ts#L63) [11-s2](src/story/scenes/11.ts#L271) [11-s4](src/story/scenes/11.ts#L442) [11-s6](src/story/scenes/11.ts#L708) | [01](content/a1/01-kennenlernen.yaml#L600) [11](content/a1/11-arbeit.yaml#L109) | гл. 11 |
| die Tablette ↻ | 10 | 12 · 1 · 8 · 8 | [10-s2](src/story/scenes/10.ts#L140) [10-s4](src/story/scenes/10.ts#L434) [10-s5](src/story/scenes/10.ts#L548) [10-s6](src/story/scenes/10.ts#L621) | [10](content/a1/10-gesundheit.yaml#L118) | гл. 10 |
| der Termin ↻ | 10, экз. | 18 · 1 · 10 · 9 | [10-s1](src/story/scenes/10.ts#L85) [10-s2](src/story/scenes/10.ts#L151) [10-s3](src/story/scenes/10.ts#L250) [10-s5](src/story/scenes/10.ts#L548) | [07](content/a1/07-freizeit.yaml#L251) [10](content/a1/10-gesundheit.yaml#L25) | гл. 10 |
| der Test | экз. | 3 · 2 · 2 · 2 | [04-s1](src/story/scenes/04.ts#L52) [04-s5](src/story/scenes/04.ts#L572) [06-s5](src/story/scenes/06.ts#L697) | [04](content/a1/04-essen.yaml#L230) [06](content/a1/06-tagesablauf.yaml#L151) [11](content/a1/11-arbeit.yaml#L198) | гл. 4, 6 |
| das Treppenhaus ↻ | 8 | 10 · 1 · 6 · 4 | [08-s1](src/story/scenes/08.ts#L84) [08-s3](src/story/scenes/08.ts#L330) [08-s6](src/story/scenes/08.ts#L782) | [08](content/a1/08-wohnen.yaml#L97) | гл. 8 |
| der Verkäufer (от verkaufen) | 11, экз. | 2 · 1 · 2 · 1 | [11-s1](src/story/scenes/11.ts#L78) | [05](content/a1/05-einkaufen.yaml#L27) [11](content/a1/11-arbeit.yaml#L92) | гл. 11 |
| die Verkäuferin ↻ | 11 | 2 · 1 · 2 · 1 | [11-s1](src/story/scenes/11.ts#L78) | [05](content/a1/05-einkaufen.yaml#L27) [11](content/a1/11-arbeit.yaml#L93) | гл. 11 |
| der Vermieter (от vermieten) ↻ | 8, экз. | 4 · 1 · 3 · 1 | [08-i1](src/story/scenes/08.ts#L282) [08-s3](src/story/scenes/08.ts#L333) | [08](content/a1/08-wohnen.yaml#L158) | гл. 8 |
| die Verspätung ↻ | 12 | 9 · 1 · 5 · 5 | [12-s2](src/story/scenes/12.ts#L189) [12-s3](src/story/scenes/12.ts#L27) [12-s6](src/story/scenes/12.ts#L686) | [09](content/a1/09-stadt.yaml#L215) [12](content/a1/12-reisen.yaml#L48) | гл. 12 |
| das Vorstellungsgespräch ↻ | 11 | 4 · 1 · 2 · 4 | [11-s1](src/story/scenes/11.ts#L98) [11-s4](src/story/scenes/11.ts#L27) | [11](content/a1/11-arbeit.yaml#L48) | гл. 11 |
| die Warmmiete ↻ | 8 | 3 · 1 · 3 · 0 | [08-s2](src/story/scenes/08.ts#L253) [08-s3](src/story/scenes/08.ts#L381) | [08](content/a1/08-wohnen.yaml#L162) | гл. 8 |
| das Wartezimmer ↻ | 10 | 10 · 1 · 5 · 5 | [10-s2](src/story/scenes/10.ts#L140) [10-s3](src/story/scenes/10.ts#L244) [10-s5](src/story/scenes/10.ts#L601) | [10](content/a1/10-gesundheit.yaml#L113) | гл. 10 |
| das Wetter ↻ | 12, экз. | 4 · 1 · 3 · 3 | [12-s1](src/story/scenes/12.ts#L37) [12-s6](src/story/scenes/12.ts#L686) | [12](content/a1/12-reisen.yaml#L66) | гл. 12 |
| das Wiederhören | экз. | 6 · 2 · 4 · 2 | [02-s1](src/story/scenes/02.ts#L103) [02-s3](src/story/scenes/02.ts#L360) [02-s6](src/story/scenes/02.ts#L690) [03-s6](src/story/scenes/03.ts#L775) | [02](content/a1/02-zahlen.yaml#L50) [06](content/a1/06-tagesablauf.yaml#L199) [10](content/a1/10-gesundheit.yaml#L187) | гл. 2 |
| das Wiedersehen | экз. | 9 · 3 · 8 · 0 | [01-s1](src/story/scenes/01.ts#L62) [01-s3](src/story/scenes/01.ts#L220) [02-s1](src/story/scenes/02.ts#L120) [02-s6](src/story/scenes/02.ts#L744) [05-s1](src/story/scenes/05.ts#L127) | [01](content/a1/01-kennenlernen.yaml#L70) [02](content/a1/02-zahlen.yaml#L303) | гл. 1 |
| der Wind | экз. | 3 · 1 · 1 · 2 | [12-s1](src/story/scenes/12.ts#L49) [12-s2](src/story/scenes/12.ts#L179) | [12](content/a1/12-reisen.yaml#L338) | гл. 12 |
| das Wohnheim ↻ | 8 | 4 · 1 · 1 · 2 | [08-s3](src/story/scenes/08.ts#L381) | [08](content/a1/08-wohnen.yaml#L102) | гл. 8 |
| der Zahn ↻ | 10 | 4 · 1 · 4 · 2 | [10-s1](src/story/scenes/10.ts#L53) [10-s2](src/story/scenes/10.ts#L124) | [10](content/a1/10-gesundheit.yaml#L86) | гл. 10 |

### Глаголы (33)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| ankommen | экз. | 3 · 1 · 2 · 1 | [12-s2](src/story/scenes/12.ts#L242) | [12](content/a1/12-reisen.yaml#L48) | гл. 12 |
| anmachen ↻ | экз. | 2 · 2 · 0 · 0 | [06-s6](src/story/scenes/06.ts#L799) [08-s2](src/story/scenes/08.ts#L162) | — | гл. 8 |
| aufhören ↻ | 6, экз. | 5 · 1 · 4 · 2 | [06-s3](src/story/scenes/06.ts#L294) [06-s5](src/story/scenes/06.ts#L132) | [06](content/a1/06-tagesablauf.yaml#L150) [07](content/a1/07-freizeit.yaml#L227) | гл. 6 |
| ausmachen ↻ | экз. | 2 · 1 · 0 · 1 | [06-s6](src/story/scenes/06.ts#L798) | — | — |
| aussteigen ↻ | 9, экз. | 7 · 1 · 3 · 2 | [09-s2](src/story/scenes/09.ts#L187) [09-s3](src/story/scenes/09.ts#L311) [09-s6](src/story/scenes/09.ts#L815) | [09](content/a1/09-stadt.yaml#L143) | гл. 9 |
| dauern | 6, экз. | 3 · 2 · 2 · 3 | [06-s5](src/story/scenes/06.ts#L596) [09-s5](src/story/scenes/09.ts#L688) | [06](content/a1/06-tagesablauf.yaml#L116) | гл. 6 |
| duschen ↻ | 6, экз. | 4 · 1 · 2 · 2 | [06-s6](src/story/scenes/06.ts#L763) | [06](content/a1/06-tagesablauf.yaml#L148) | гл. 6 |
| einladen ↻ | 7, экз. | 2 · 1 · 0 · 1 | [07-s1](src/story/scenes/07.ts#L37) [07-s3](src/story/scenes/07.ts#L417) | [07](content/a1/07-freizeit.yaml#L171) | гл. 7 |
| einsteigen ↻ | 9, экз. | 4 · 1 · 2 · 3 | [09-s2](src/story/scenes/09.ts#L184) [09-s6](src/story/scenes/09.ts#L725) | [09](content/a1/09-stadt.yaml#L142) | гл. 9 |
| erzählen | экз. | 2 · 1 · 1 · 2 | [10-s5](src/story/scenes/10.ts#L562) | — | — |
| fotografieren ↻ | 7 | 4 · 1 · 4 · 1 | [07-s4](src/story/scenes/07.ts#L430) | [02](content/a1/02-zahlen.yaml#L914) [07](content/a1/07-freizeit.yaml#L91) | гл. 7 |
| freuen | экз. | 2 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L620) | — | — |
| frühstücken ↻ | 6, экз. | 4 · 2 · 3 · 3 | [06-s6](src/story/scenes/06.ts#L764) [07-разминка](src/story/scenes/warmups.ts#L33) | [04](content/a1/04-essen.yaml#L192) [06](content/a1/06-tagesablauf.yaml#L44) [07](content/a1/07-freizeit.yaml#L257) [12](content/a1/12-reisen.yaml#L109) | гл. 6 |
| glauben | экз. | 3 · 2 · 1 · 3 | [06-s2](src/story/scenes/06.ts#L164) [09-s5](src/story/scenes/09.ts#L688) | — | — |
| holen | экз. | 5 · 2 · 2 · 4 | [07-s2](src/story/scenes/07.ts#L147) [07-s4](src/story/scenes/07.ts#L447) [11-i1](src/story/scenes/11.ts#L148) | — | гл. 11 |
| kennen | экз. | 3 · 3 · 0 · 3 | [04-s3](src/story/scenes/04.ts#L384) [09-i1](src/story/scenes/09.ts#L285) [10-s1](src/story/scenes/10.ts#L94) | [11](content/a1/11-arbeit.yaml#L199) | — |
| lernen | экз. | 2 · 2 · 2 · 0 | [11-s1](src/story/scenes/11.ts#L56) [12-s6](src/story/scenes/12.ts#L692) | [11](content/a1/11-arbeit.yaml#L165) | гл. 11 |
| lesen ↻ | 7, экз. | 3 · 1 · 3 · 3 | [07-s1](src/story/scenes/07.ts#L88) [07-s6](src/story/scenes/07.ts#L751) | [03](content/a1/03-familie.yaml#L19) [05](content/a1/05-einkaufen.yaml#L19) [06](content/a1/06-tagesablauf.yaml#L21) [07](content/a1/07-freizeit.yaml#L20) [08](content/a1/08-wohnen.yaml#L23) [09](content/a1/09-stadt.yaml#L21) [10](content/a1/10-gesundheit.yaml#L222) [11](content/a1/11-arbeit.yaml#L21) [12](content/a1/12-reisen.yaml#L253) | гл. 7 |
| mieten | 8, экз. | 4 · 1 · 4 · 0 | [08-s2](src/story/scenes/08.ts#L253) [08-s3](src/story/scenes/08.ts#L381) [08-s4](src/story/scenes/08.ts#L560) | [08](content/a1/08-wohnen.yaml#L44) | гл. 8 |
| mitbringen | экз. | 7 · 2 · 5 · 6 | [10-s6](src/story/scenes/10.ts#L30) [12-s6](src/story/scenes/12.ts#L610) | [07](content/a1/07-freizeit.yaml#L228) [10](content/a1/10-gesundheit.yaml#L42) | гл. 12 |
| mitnehmen | экз. | 5 · 2 · 3 · 3 | [08-i1](src/story/scenes/08.ts#L29) [08-s3](src/story/scenes/08.ts#L381) [12-s1](src/story/scenes/12.ts#L121) | [10](content/a1/10-gesundheit.yaml#L272) | — |
| öffnen | экз. | 3 · 2 · 1 · 2 | [10-s5](src/story/scenes/10.ts#L525) [12-s3](src/story/scenes/12.ts#L300) | [06](content/a1/06-tagesablauf.yaml#L214) [09](content/a1/09-stadt.yaml#L553) | гл. 7 |
| reisen | экз. | 3 · 1 · 3 · 3 | [12-s2](src/story/scenes/12.ts#L261) [12-s6](src/story/scenes/12.ts#L686) | [12](content/a1/12-reisen.yaml#L1) | гл. 12 |
| reparieren | экз. | 2 · 2 · 0 · 2 | [06-s6](src/story/scenes/06.ts#L761) [11-s6](src/story/scenes/11.ts#L664) | — | — |
| reservieren | 12 | 5 · 1 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L286) | [02](content/a1/02-zahlen.yaml#L914) [12](content/a1/12-reisen.yaml#L113) | гл. 12 |
| scheinen | экз. | 3 · 1 · 1 · 0 | [12-s5](src/story/scenes/12.ts#L511) | [12](content/a1/12-reisen.yaml#L68) | гл. 12 |
| schicken | экз. | 2 · 2 · 0 · 2 | [05-s6](src/story/scenes/05.ts#L789) [06-s1](src/story/scenes/06.ts#L92) | — | — |
| schwimmen ↻ | 7, экз. | 11 · 1 · 9 · 8 | [07-s1](src/story/scenes/07.ts#L88) [07-s4](src/story/scenes/07.ts#L446) [07-s5](src/story/scenes/07.ts#L560) [07-s6](src/story/scenes/07.ts#L711) | [07](content/a1/07-freizeit.yaml#L35) | гл. 7 |
| spielen | экз. | 4 · 1 · 3 · 3 | [07-s3](src/story/scenes/07.ts#L390) [07-s6](src/story/scenes/07.ts#L738) | [07](content/a1/07-freizeit.yaml#L39) [11](content/a1/11-arbeit.yaml#L402) | гл. 7 |
| treffen | экз. | 3 · 2 · 1 · 2 | [06-s1](src/story/scenes/06.ts#L150) [09-s6](src/story/scenes/09.ts#L761) | [01](content/a1/01-kennenlernen.yaml#L246) [06](content/a1/06-tagesablauf.yaml#L77) [07](content/a1/07-freizeit.yaml#L128) [09](content/a1/09-stadt.yaml#L75) | гл. 5, 6, 7, 9, 12 |
| tun | экз. | 7 · 2 · 5 · 2 | [10-s1](src/story/scenes/10.ts#L39) [10-s2](src/story/scenes/10.ts#L227) [10-s3](src/story/scenes/10.ts#L349) [10-s6](src/story/scenes/10.ts#L680) [11-s3](src/story/scenes/11.ts#L296) | [10](content/a1/10-gesundheit.yaml#L60) [12](content/a1/12-reisen.yaml#L50) | гл. 10, 11 |
| umsteigen ↻ | 9 | 2 · 1 · 2 · 1 | [09-s2](src/story/scenes/09.ts#L217) [09-s6](src/story/scenes/09.ts#L815) | [09](content/a1/09-stadt.yaml#L144) | гл. 9 |
| willkommen | экз. | 3 · 2 · 1 · 3 | [09-s6](src/story/scenes/09.ts#L783) [12-s5](src/story/scenes/12.ts#L28) | [12](content/a1/12-reisen.yaml#L34) | — |

### Прилагательные и наречия (16)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| bar ↻ | экз. | 3 · 3 · 2 · 1 | [05-i1](src/story/scenes/05.ts#L457) [11-s1](src/story/scenes/11.ts#L74) [12-разминка](src/story/scenes/warmups.ts#L59) | — | — |
| besser | экз. | 4 · 1 · 2 · 2 | [10-s3](src/story/scenes/10.ts#L250) [10-s5](src/story/scenes/10.ts#L551) | — | — |
| bisschen | экз. | 4 · 1 · 2 · 1 | [01-s3](src/story/scenes/01.ts#L220) [01-s4](src/story/scenes/01.ts#L415) | [01](content/a1/01-kennenlernen.yaml#L46) [03](content/a1/03-familie.yaml#L229) [06](content/a1/06-tagesablauf.yaml#L70) [11](content/a1/11-arbeit.yaml#L214) | — |
| dunkel | 8 | 4 · 1 · 1 · 0 | [08-s1](src/story/scenes/08.ts#L84) [08-s2](src/story/scenes/08.ts#L162) [08-s3](src/story/scenes/08.ts#L433) | [08](content/a1/08-wohnen.yaml#L139) | гл. 8 |
| fertig | экз. | 2 · 1 · 1 · 1 | [07-s3](src/story/scenes/07.ts#L295) | — | — |
| geöffnet (от öffnen) | экз. | 3 · 2 · 1 · 2 | [10-s5](src/story/scenes/10.ts#L525) [12-s3](src/story/scenes/12.ts#L300) | [06](content/a1/06-tagesablauf.yaml#L214) [09](content/a1/09-stadt.yaml#L553) | — |
| geschlossen (от schließen) | экз. | 4 · 2 · 3 · 1 | [06-s3](src/story/scenes/06.ts#L294) [08-s4](src/story/scenes/08.ts#L547) | [06](content/a1/06-tagesablauf.yaml#L213) [09](content/a1/09-stadt.yaml#L234) | гл. 9, 11 |
| gesund | 10 | 5 · 2 · 1 · 2 | [10-s1](src/story/scenes/10.ts#L57) [11-s1](src/story/scenes/11.ts#L36) | [10](content/a1/10-gesundheit.yaml#L99) | гл. 10 |
| herzlich | экз. | 14 · 12 · 14 · 0 | [01-s5](src/story/scenes/01.ts#L567) [02-s5](src/story/scenes/02.ts#L595) [03-s5](src/story/scenes/03.ts#L691) [03-s6](src/story/scenes/03.ts#L742) [04-s5](src/story/scenes/04.ts#L641) [05-s5](src/story/scenes/05.ts#L649) [06-s5](src/story/scenes/06.ts#L633) [07-s5](src/story/scenes/07.ts#L609) | [12](content/a1/12-reisen.yaml#L207) | гл. 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 |
| kalt ↻ | 12 | 2 · 1 · 1 · 1 | [12-s1](src/story/scenes/12.ts#L37) | [08](content/a1/08-wohnen.yaml#L40) [12](content/a1/12-reisen.yaml#L66) | гл. 12 |
| leise | экз. | 2 · 1 · 1 · 2 | [10-s2](src/story/scenes/10.ts#L192) | — | — |
| müde ↻ | экз. | 2 · 1 · 0 · 1 | [06-s6](src/story/scenes/06.ts#L763) | — | — |
| ruhig | 8, экз. | 7 · 3 · 3 · 0 | [08-s1](src/story/scenes/08.ts#L37) [08-s3](src/story/scenes/08.ts#L337) [08-s4](src/story/scenes/08.ts#L508) [10-s2](src/story/scenes/10.ts#L137) [12-s6](src/story/scenes/12.ts#L641) | [08](content/a1/08-wohnen.yaml#L74) | гл. 8 |
| schnell | экз. | 6 · 2 · 3 · 3 | [09-s2](src/story/scenes/09.ts#L183) [09-s3](src/story/scenes/09.ts#L324) [12-s4](src/story/scenes/12.ts#L454) | [06](content/a1/06-tagesablauf.yaml#L46) | — |
| vielleicht | экз. | 3 · 2 · 2 · 3 | [06-s5](src/story/scenes/06.ts#L655) [08-s3](src/story/scenes/08.ts#L360) | [04](content/a1/04-essen.yaml#L87) | — |
| warm | 12 | 10 · 2 · 3 · 6 | [08-s3](src/story/scenes/08.ts#L381) [08-s6](src/story/scenes/08.ts#L733) [12-s1](src/story/scenes/12.ts#L26) [12-s3](src/story/scenes/12.ts#L300) | [04](content/a1/04-essen.yaml#L245) [08](content/a1/08-wohnen.yaml#L258) [12](content/a1/12-reisen.yaml#L125) | гл. 12 |

### Служебные слова (8)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| dir | экз. | 3 · 1 · 3 · 0 | [01-s1](src/story/scenes/01.ts#L74) [01-s3](src/story/scenes/01.ts#L220) | [06](content/a1/06-tagesablauf.yaml#L469) [09](content/a1/09-stadt.yaml#L66) | — |
| durch | экз. | 4 · 1 · 2 · 3 | [09-i1](src/story/scenes/09.ts#L284) [09-s4](src/story/scenes/09.ts#L31) | — | — |
| euer | экз. | 3 · 1 · 3 · 1 | [03-s1](src/story/scenes/03.ts#L94) [03-s5](src/story/scenes/03.ts#L651) | [03](content/a1/03-familie.yaml#L42) | — |
| ihm (от er) | экз. | 3 · 3 · 0 · 2 | [06-s5](src/story/scenes/06.ts#L629) [07-s5](src/story/scenes/07.ts#L534) [10-s3](src/story/scenes/10.ts#L244) | [11](content/a1/11-arbeit.yaml#L238) [12](content/a1/12-reisen.yaml#L228) | — |
| letzt- | экз. | 3 · 1 · 2 · 1 | [11-s2](src/story/scenes/11.ts#L241) [11-s6](src/story/scenes/11.ts#L698) | [11](content/a1/11-arbeit.yaml#L138) [12](content/a1/12-reisen.yaml#L824) | гл. 11 |
| seit | экз. | 2 · 2 · 0 · 2 | [06-s5](src/story/scenes/06.ts#L618) [10-s4](src/story/scenes/10.ts#L423) | — | — |
| so | экз. | 5 · 4 · 0 · 4 | [06-s1](src/story/scenes/06.ts#L44) [07-s2](src/story/scenes/07.ts#L249) [09-s1](src/story/scenes/09.ts#L85) [11-s1](src/story/scenes/11.ts#L110) [11-s2](src/story/scenes/11.ts#L194) | [02](content/a1/02-zahlen.yaml#L69) [05](content/a1/05-einkaufen.yaml#L163) [06](content/a1/06-tagesablauf.yaml#L42) [07](content/a1/07-freizeit.yaml#L746) [09](content/a1/09-stadt.yaml#L87) [11](content/a1/11-arbeit.yaml#L36) [12](content/a1/12-reisen.yaml#L66) | — |
| wohin | 9, экз. | 3 · 2 · 3 · 0 | [09-s5](src/story/scenes/09.ts#L650) [09-s6](src/story/scenes/09.ts#L730) [12-s1](src/story/scenes/12.ts#L108) | [09](content/a1/09-stadt.yaml#L135) [12](content/a1/12-reisen.yaml#L210) | гл. 9, 12 |

### Выражения (18)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| Achtung | экз. | 4 · 2 · 2 · 4 | [09-s2](src/story/scenes/09.ts#L28) [12-s2](src/story/scenes/12.ts#L189) | [09](content/a1/09-stadt.yaml#L214) [12](content/a1/12-reisen.yaml#L246) | — |
| am liebsten ↻ | 7 | 3 · 1 · 3 · 1 | [07-s1](src/story/scenes/07.ts#L100) [07-s3](src/story/scenes/07.ts#L390) [07-s6](src/story/scenes/07.ts#L711) | [07](content/a1/07-freizeit.yaml#L18) | гл. 7 |
| Auf Wiederhören! | 2 | 5 · 2 · 3 · 2 | [02-s1](src/story/scenes/02.ts#L103) [02-s3](src/story/scenes/02.ts#L360) [02-s6](src/story/scenes/02.ts#L690) [03-s6](src/story/scenes/03.ts#L775) | [02](content/a1/02-zahlen.yaml#L50) [06](content/a1/06-tagesablauf.yaml#L199) [10](content/a1/10-gesundheit.yaml#L187) | гл. 2 |
| Auf Wiedersehen! | 1 | 8 · 3 · 7 · 0 | [01-s1](src/story/scenes/01.ts#L62) [01-s3](src/story/scenes/01.ts#L220) [02-s1](src/story/scenes/02.ts#L120) [02-s6](src/story/scenes/02.ts#L744) [05-s1](src/story/scenes/05.ts#L127) | [01](content/a1/01-kennenlernen.yaml#L70) [02](content/a1/02-zahlen.yaml#L303) | гл. 1 |
| Die Sonne scheint. | 12 | 2 · 1 · 0 · 0 | [12-s5](src/story/scenes/12.ts#L511) | [12](content/a1/12-reisen.yaml#L68) | гл. 12 |
| ein Pfund ↻ | 5 | 5 · 2 · 4 · 1 | [05-s1](src/story/scenes/05.ts#L106) [05-s3](src/story/scenes/05.ts#L311) [05-s5](src/story/scenes/05.ts#L690) [12-разминка](src/story/scenes/warmups.ts#L59) | [05](content/a1/05-einkaufen.yaml#L40) | гл. 5 |
| Fahrrad fahren ↻ | 7 | 2 · 2 · 2 · 1 | [07-s1](src/story/scenes/07.ts#L88) [09-i1](src/story/scenes/09.ts#L271) | [07](content/a1/07-freizeit.yaml#L121) | гл. 7 |
| Fußball spielen ↻ | 7 | 3 · 1 · 2 · 3 | [07-s6](src/story/scenes/07.ts#L738) | [07](content/a1/07-freizeit.yaml#L115) | гл. 7 |
| Gute Besserung! | 10 | 4 · 2 · 3 · 0 | [10-s1](src/story/scenes/10.ts#L71) [10-s5](src/story/scenes/10.ts#L535) [11-s4](src/story/scenes/11.ts#L468) | [10](content/a1/10-gesundheit.yaml#L3) | гл. 10 |
| ins Kino gehen | 7 | 4 · 1 · 4 · 2 | [07-s1](src/story/scenes/07.ts#L43) [07-s2](src/story/scenes/07.ts#L178) [07-s5](src/story/scenes/07.ts#L550) | [07](content/a1/07-freizeit.yaml#L131) | гл. 7 |
| letzte Woche ↻ | 11 | 2 · 1 · 2 · 0 | [11-s2](src/story/scenes/11.ts#L241) | [11](content/a1/11-arbeit.yaml#L138) | гл. 11 |
| noch nicht | 11 | 5 · 2 · 1 · 3 | [11-s5](src/story/scenes/11.ts#L554) [12-s1](src/story/scenes/12.ts#L47) | [09](content/a1/09-stadt.yaml#L825) [11](content/a1/11-arbeit.yaml#L44) | гл. 11 |
| Schade! ↻ | 7 | 2 · 2 · 1 · 1 | [06-s4](src/story/scenes/06.ts#L532) [07-s5](src/story/scenes/07.ts#L637) | [07](content/a1/07-freizeit.yaml#L66) | гл. 7 |
| weh tun | экз. | 5 · 2 · 3 · 2 | [10-s1](src/story/scenes/10.ts#L39) [10-s2](src/story/scenes/10.ts#L227) [10-s6](src/story/scenes/10.ts#L680) [11-s3](src/story/scenes/11.ts#L296) | [10](content/a1/10-gesundheit.yaml#L60) | гл. 10 |
| Wie komme ich zum …? | 9 | 2 · 1 · 2 · 1 | [09-i1](src/story/scenes/09.ts#L277) [09-s6](src/story/scenes/09.ts#L775) | [09](content/a1/09-stadt.yaml#L3) | гл. 9 |
| Wie spät ist es? ↻ | 6 | 2 · 1 · 2 · 1 | [06-s4](src/story/scenes/06.ts#L533) [06-s6](src/story/scenes/06.ts#L767) | [06](content/a1/06-tagesablauf.yaml#L32) | гл. 6 |
| wie viel | экз. | 2 · 2 · 2 · 1 | [06-s4](src/story/scenes/06.ts#L533) [08-s6](src/story/scenes/08.ts#L746) | [05](content/a1/05-einkaufen.yaml#L102) [06](content/a1/06-tagesablauf.yaml#L106) [07](content/a1/07-freizeit.yaml#L70) [12](content/a1/12-reisen.yaml#L38) | гл. 6, 8 |
| zu Fuß | 9 | 5 · 2 · 4 · 2 | [09-s6](src/story/scenes/09.ts#L787) [12-s3](src/story/scenes/12.ts#L300) | [09](content/a1/09-stadt.yaml#L42) | гл. 9 |

### Числа, время, цвета и другие группы (20)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| der April ↻ | экз. | 2 · 1 · 1 · 1 | [06-s2](src/story/scenes/06.ts#L256) | [12](content/a1/12-reisen.yaml#L173) | — |
| der Dezember ↻ | экз. | 2 · 1 · 1 · 1 | [06-s2](src/story/scenes/06.ts#L257) | [12](content/a1/12-reisen.yaml#L172) | — |
| der Dienstag | 6, экз. | 8 · 2 · 6 · 3 | [07-s2](src/story/scenes/07.ts#L166) [09-s1](src/story/scenes/09.ts#L40) [09-s3](src/story/scenes/09.ts#L324) | [06](content/a1/06-tagesablauf.yaml#L132) [11](content/a1/11-arbeit.yaml#L198) | гл. 6 |
| der Donnerstag | 6, экз. | 2 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L36) | [06](content/a1/06-tagesablauf.yaml#L134) [10](content/a1/10-gesundheit.yaml#L216) | гл. 6 |
| Europa ↻ | экз. | 2 · 2 · 1 · 1 | [01-s6](src/story/scenes/01.ts#L608) [02-разминка](src/story/scenes/warmups.ts#L8) | — | — |
| der Februar ↻ | экз. | 2 · 1 · 1 · 1 | [06-s2](src/story/scenes/06.ts#L256) | [12](content/a1/12-reisen.yaml#L174) | — |
| der Freitag | 6, экз. | 6 · 3 · 6 · 0 | [06-s3](src/story/scenes/06.ts#L294) [06-i1](src/story/scenes/06.ts#L476) [09-s3](src/story/scenes/09.ts#L324) [11-s1](src/story/scenes/11.ts#L78) | [06](content/a1/06-tagesablauf.yaml#L135) [07](content/a1/07-freizeit.yaml#L213) [10](content/a1/10-gesundheit.yaml#L184) [12](content/a1/12-reisen.yaml#L375) | гл. 6, 7 |
| das Grad | экз. | 3 · 1 · 1 · 2 | [12-s1](src/story/scenes/12.ts#L49) [12-s3](src/story/scenes/12.ts#L300) | [12](content/a1/12-reisen.yaml#L68) | гл. 12 |
| das Gramm ↻ | экз. | 3 · 2 · 2 · 1 | [05-s1](src/story/scenes/05.ts#L106) [05-s3](src/story/scenes/05.ts#L298) [12-разминка](src/story/scenes/warmups.ts#L59) | [05](content/a1/05-einkaufen.yaml#L106) | гл. 5 |
| der Herbst ↻ | 12, экз. | 11 · 1 · 5 · 6 | [12-s1](src/story/scenes/12.ts#L37) [12-s4](src/story/scenes/12.ts#L419) [12-s6](src/story/scenes/12.ts#L686) | [12](content/a1/12-reisen.yaml#L137) | гл. 12 |
| der Januar ↻ | экз. | 2 · 1 · 1 · 1 | [06-s2](src/story/scenes/06.ts#L256) | [12](content/a1/12-reisen.yaml#L173) | — |
| der März ↻ | экз. | 2 · 1 · 1 · 1 | [06-s2](src/story/scenes/06.ts#L256) | [12](content/a1/12-reisen.yaml#L172) | — |
| der Meter | экз. | 6 · 1 · 3 · 1 | [12-s4](src/story/scenes/12.ts#L409) [12-s6](src/story/scenes/12.ts#L685) | [08](content/a1/08-wohnen.yaml#L164) | гл. 8 |
| der Osten | экз. | 2 · 1 · 2 · 0 | [08-s3](src/story/scenes/08.ts#L381) | [08](content/a1/08-wohnen.yaml#L40) | гл. 8 |
| das Pfund | экз. | 5 · 2 · 4 · 1 | [05-s1](src/story/scenes/05.ts#L106) [05-s3](src/story/scenes/05.ts#L311) [05-s5](src/story/scenes/05.ts#L690) [12-разминка](src/story/scenes/warmups.ts#L59) | [05](content/a1/05-einkaufen.yaml#L40) | гл. 5 |
| schwarz ↻ | экз. | 2 · 1 · 1 · 0 | [05-s1](src/story/scenes/05.ts#L54) [05-s6](src/story/scenes/05.ts#L814) | — | — |
| die Sekunde ↻ | экз. | 2 · 2 · 0 · 1 | [05-s6](src/story/scenes/05.ts#L790) [06-s1](src/story/scenes/06.ts#L67) | — | — |
| der September ↻ | экз. | 2 · 1 · 1 · 1 | [06-s2](src/story/scenes/06.ts#L257) | [12](content/a1/12-reisen.yaml#L172) | — |
| der Sommer ↻ | 12, экз. | 16 · 2 · 6 · 9 | [10-s1](src/story/scenes/10.ts#L85) [10-s2](src/story/scenes/10.ts#L119) [10-s3](src/story/scenes/10.ts#L333) [10-s4](src/story/scenes/10.ts#L384) [12-s4](src/story/scenes/12.ts#L419) [12-s6](src/story/scenes/12.ts#L686) | [05](content/a1/05-einkaufen.yaml#L227) [12](content/a1/12-reisen.yaml#L136) | гл. 12 |
| der Winter ↻ | 12, экз. | 3 · 1 · 3 · 2 | [12-s1](src/story/scenes/12.ts#L77) [12-s4](src/story/scenes/12.ts#L442) [12-s6](src/story/scenes/12.ts#L687) | [05](content/a1/05-einkaufen.yaml#L224) [12](content/a1/12-reisen.yaml#L138) | гл. 12 |

## Слова: закреплено

452 слов.

### Существительные (187)

das Alter, der Anruf, die Antwort, die Anzeige, der Apfel, die Apotheke, der Appetit, die Arbeit, der Arzt, die Ärztin, der Ausweis, der Balkon, das Beispiel, das Bett, das Bier, die Birne, das Boot, der Brief, das Brot, das Brötchen, der Bruder, das Buch, der Buchstabe, der Bus, die Butter, das Café, die Cola, der Cousin, die Cousine, Dänemark, der Dank, der Döner, die Dose, die Ecke, die Ehefrau, der Ehemann, das Ei, die Eltern, das Ende, der Enkel, die Enkelin, die Entschuldigung, das Erdgeschoss, die Fahrkarte, das Fahrrad, die Familie, der Familienname, der Familienstand, die Farbe, der Film, der Fisch, das Fischbrötchen, das Fleisch, das Formular, das Foto, die Frage, die Frau, der Freund, die Freundin, das Frühstück, der Fuß, der Gast, das Geburtsjahr, der Geburtsort, der Geburtstag, das Geld, das Gemüse, das Geschenk, die Geschwister, das Getränk, das Glas, der Glückwunsch, die Großeltern, die Großmutter, der Großvater, der Hafen, das Hähnchen, die Haltestelle, die Hand, das Handy, die Handynummer, das Haus, der Herr, die Hilfe, das Hobby, die Hochzeit, der Hund, der Hunger, die Jacke, der Junge, der Kaffee, die Karte, Kasachstan, der Käse, die Katze, der Keller, der Kellner, das Kind, der Koch, das Krankenhaus, die Küche, der Kuchen, der Kühlschrank, der Laden, die Lampe, das Land, die Leute, das Licht, die Linie, das Mädchen, der Mann, der Mechaniker, die Milch, der Moment, die Mutter, der Name, die Nummer, das Obst, die Oma, der Onkel, der Opa, die Packung, die Party, der Pass, die Pause, der Plan, der Platz, die Polizei, die Post, die Postleitzahl, die Praxis, das Problem, die Prüfung, der Raum, die Rechnung, der Regen, der Reis, das Rezept, der Rücken, der Rucksack, Russland, der Saft, der Salat, das Schild, der Schlüssel, der Schrank, die Schwester, das Sofa, der Sohn, die Speisekarte, die Sprache, die Stadt, die Stelle, der Stock, der Strand, die Straße, das Stück, der Stuhl, die Suppe, das T-Shirt, die Tasche, die Tasse, das Taxi, der Tee, das Telefon, die Telefonnummer, das Thema, der Tisch, die Tochter, die Tomate, die Türkei, die Tüte, die Uhr, die Ukraine, die Unterschrift, der Vater, die Versichertenkarte, der Vorname, das Wasser, die Wohnung, das Wort, die Wurst, die Zahl, die Zeit, das Zimmer, der Zug, die Zwiebel

### Глаголы (65)

anrufen, arbeiten, aufstehen, bestellen, bezahlen, bitten, bleiben, brauchen, bringen, buchstabieren, danken, dürfen, einkaufen, erklären, essen, fahren, finden, fragen, geben, gehen, gehören, haben, halten, heißen, helfen, hören, kaufen, kochen, kommen, können, kosten, lieben, liegen, machen, mitkommen, möchten, mögen, müssen, nehmen, passen, regnen, riechen, sagen, schlafen, schließen, schmecken, schreiben, segeln, sehen, sein, sitzen, sollen, sprechen, stehen, stellen, suchen, tanzen, telefonieren, trinken, warten, werden, wiederholen, wissen, wohnen, wollen

### Прилагательные и наречия (45)

allein, alt, billig, bitter, einmal, falsch, frei, früh, früher, geboren, geradeaus, gern, geschieden, gestern, groß, gut, heute, hinten, immer, jetzt, jung, kaputt, klar, klein, krank, lang, lange, langsam, ledig, leider, lieber, links, neu, nie, rechts, richtig, schön, schwer, sofort, spät, später, teuer, verheiratet, zurück, zusammen

### Служебные слова (66)

ab, aber, all-, also, an, auch, auf, aus, bei, bis, bitte, da, danke, dann, dein-, denn, der, dich, dies-, ein-, er, es, für, hier, ich, ihn, in, ja, jed-, kein, lieb-, man, mehr, mein, mit, nach, nein, nicht, nichts, noch, nur, oder, ohne, schon, sehr, sich, sie, über, um, und, unser-, unter, viel, von, vor, wann, warum, was, welch-, Welche?, wer, wie, wir, wo, woher, zu

### Выражения (27)

Alles Gute!, auf sein, aus sein, Danke, gut!, ein Kilo, ein Liter, Es regnet., Gute Nacht!, Guten Abend!, Guten Appetit!, Guten Morgen!, Guten Tag!, hallo, Hunger haben, kommen aus, Langsam, bitte., Moin!, Noch einmal, bitte., tschüss, weg sein, Wie bitte?, Wie geht's?, wohnen in, Zeit haben, zu sein, zum Beispiel, Zusammen oder getrennt?

### Числа, время, цвета и другие группы (62)

der Abend, acht, achtzehn, blau, deutsch, Deutschland, drei, dreißig, dreizehn, dritte, eins, elf, erste, der Euro, fünf, fünfzehn, fünfzig, gelb, grau, halb, hundert, das Jahr, der Juli, der Juni, das Kilo, der Liter, der Mai, die Minute, der Mittag, der Montag, morgen, der Nachmittag, die Nacht, neun, neunzehn, neunzig, null, rot, der Samstag, sechs, sechzehn, sechzig, sieben, siebzehn, siebzig, der Sonntag, die Stunde, der Tag, tausend, vier, das Viertel, vierzehn, vierzig, der Vormittag, weiß, die Woche, das Wochenende, zehn, zwanzig, zwei, zweite, zwölf
