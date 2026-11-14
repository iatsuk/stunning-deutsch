# Индекс покрытия A1

Сгенерирован `scripts/a1-index.mjs` при `pnpm content`; не редактируйте вручную. Правила подсчёта и
решения автора — `A1-PLAN.md`, эталон — `content/reference/start-deutsch-1.yaml`.

Закреплено: не меньше 6 встреч в новой версии Moin, не меньше чем в 4 главах, из них 2 в действии
и 2 на слух. Числа в таблицах: встреч · глав · действий · на слух. Столбец «Откуда»: номера уроков A1
и «экз.» для словаря экзамена. Внутри разделов слова сгруппированы по частям речи и идут по алфавиту.

Разделы: [Сводка](#сводка) · [Грамматика](#грамматика) · [Слова: нет](#слова-нет) · [Слова: один раз](#слова-один-раз) · [Слова: слабо](#слова-слабо) · [Слова: закреплено](#слова-закреплено)

## Сводка

| Что | закреплено | слабо | один раз | нет |
|---|---|---|---|---|
| Все обязательные слова (964) | 212 | 353 | 83 | 316 |
| из них словарь экзамена | 193 | 243 | 60 | 287 |
| из них слова уроков | 121 | 243 | 44 | 48 |
| Грамматика (66) | 28 | 19 | 2 | 8 |

Ещё 9 правил встречаются достаточно, но в игре их не объясняет ни один фрагмент правила: статус «без объяснения».

| Часть речи | закреплено | слабо | один раз | нет |
|---|---|---|---|---|
| Существительные | 61 | 188 | 50 | 142 |
| Глаголы | 37 | 47 | 11 | 62 |
| Прилагательные и наречия | 17 | 36 | 7 | 54 |
| Служебные слова | 54 | 19 | 1 | 8 |
| Выражения | 10 | 33 | 6 | 15 |
| Числа, время, цвета и другие группы | 33 | 30 | 8 | 35 |

## Грамматика

### Глагол

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Präsens, окончания по лицам | закреплено | 211 · 12 · 101 · 123 | есть | [01-s1](src/story/scenes/01.ts#L52) [01-s2](src/story/scenes/01.ts#L164) [01-s3](src/story/scenes/01.ts#L219) [01-i1](src/story/scenes/01.ts#L383) [01-s4](src/story/scenes/01.ts#L420) [01-s5](src/story/scenes/01.ts#L486) |
| Präsens со сменой корня (e → i, a → ä) | без объяснения | 96 · 10 · 39 · 45 | нет | [01-s3](src/story/scenes/01.ts#L219) [01-s4](src/story/scenes/01.ts#L421) [01-s5](src/story/scenes/01.ts#L482) [02-s4](src/story/scenes/02.ts#L458) [04-s2](src/story/scenes/04.ts#L234) [04-s3](src/story/scenes/04.ts#L385) |
| sein | закреплено | 554 · 12 · 249 · 277 | есть | [01-s1](src/story/scenes/01.ts#L34) [01-s2](src/story/scenes/01.ts#L152) |
| haben | закреплено | 225 · 11 · 113 · 125 | есть | [02-s1](src/story/scenes/02.ts#L46) [02-s2](src/story/scenes/02.ts#L141) [02-s3](src/story/scenes/02.ts#L224) [02-i1](src/story/scenes/02.ts#L390) |
| Отделяемые приставки и рамка предложения | закреплено | 58 · 8 · 33 · 26 | есть | [01-s3](src/story/scenes/01.ts#L219) [05-s3](src/story/scenes/05.ts#L302) [05-s4](src/story/scenes/05.ts#L477) [06-s2](src/story/scenes/06.ts#L218) [06-s3](src/story/scenes/06.ts#L286) |
| Perfekt с haben | слабо | 68 · 3 · 40 · 33 | есть | [10-s1](src/story/scenes/10.ts#L58) [11-s1](src/story/scenes/11.ts#L37) [11-i1](src/story/scenes/11.ts#L157) [11-s2](src/story/scenes/11.ts#L193) |
| Perfekt с sein | слабо | 19 · 1 · 16 · 7 | есть | [12-s1](src/story/scenes/12.ts#L142) [12-s2](src/story/scenes/12.ts#L165) [12-s3](src/story/scenes/12.ts#L27) [12-s5](src/story/scenes/12.ts#L522) |
| Präteritum war и hatte | закреплено | 24 · 4 · 13 · 9 | есть | [09-s1](src/story/scenes/09.ts#L62) [09-i1](src/story/scenes/09.ts#L237) [10-s1](src/story/scenes/10.ts#L57) [11-i1](src/story/scenes/11.ts#L157) [11-s3](src/story/scenes/11.ts#L292) [11-s4](src/story/scenes/11.ts#L27) |
| möchten | слабо | 13 · 3 · 8 · 8 | есть | [04-s1](src/story/scenes/04.ts#L51) [04-s2](src/story/scenes/04.ts#L163) [04-s5](src/story/scenes/04.ts#L547) [04-s6](src/story/scenes/04.ts#L671) [10-s6](src/story/scenes/10.ts#L632) [12-s3](src/story/scenes/12.ts#L281) |
| Ich hätte gern …, Ich würde gern … как готовые выражения | нет | 0 · 0 · 0 · 0 | нет | — |
| können | слабо | 29 · 3 · 22 · 10 | есть | [07-s1](src/story/scenes/07.ts#L38) [07-s2](src/story/scenes/07.ts#L158) [07-s3](src/story/scenes/07.ts#L286) |
| wollen | слабо | 18 · 2 · 13 · 7 | есть | [07-s1](src/story/scenes/07.ts#L43) [07-s2](src/story/scenes/07.ts#L170) [07-s3](src/story/scenes/07.ts#L274) [07-s4](src/story/scenes/07.ts#L483) [07-s5](src/story/scenes/07.ts#L525) |
| müssen | слабо | 10 · 2 · 8 · 2 | есть | [10-s1](src/story/scenes/10.ts#L81) [10-s3](src/story/scenes/10.ts#L256) [10-s4](src/story/scenes/10.ts#L431) [10-s5](src/story/scenes/10.ts#L510) [10-s6](src/story/scenes/10.ts#L632) [11-s5](src/story/scenes/11.ts#L590) |
| dürfen | слабо | 23 · 3 · 15 · 3 | есть | [10-s1](src/story/scenes/10.ts#L81) [10-s2](src/story/scenes/10.ts#L173) [10-s3](src/story/scenes/10.ts#L236) [10-s4](src/story/scenes/10.ts#L28) [10-s5](src/story/scenes/10.ts#L510) |
| sollen | слабо | 18 · 3 · 13 · 10 | есть | [10-s4](src/story/scenes/10.ts#L29) [10-s5](src/story/scenes/10.ts#L545) [10-s6](src/story/scenes/10.ts#L30) [11-s5](src/story/scenes/11.ts#L28) |
| mögen | слабо | 5 · 1 · 2 · 1 | есть | [07-s3](src/story/scenes/07.ts#L385) [07-s4](src/story/scenes/07.ts#L469) |
| Модальный глагол и инфинитив в конце | закреплено | 50 · 6 · 35 · 16 | есть | [04-s6](src/story/scenes/04.ts#L671) [07-s1](src/story/scenes/07.ts#L43) [07-s2](src/story/scenes/07.ts#L170) [07-s3](src/story/scenes/07.ts#L274) [07-s4](src/story/scenes/07.ts#L483) [07-s5](src/story/scenes/07.ts#L530) |
| Повелительное наклонение на Sie | закреплено | 27 · 5 · 17 · 13 | есть | [02-s3](src/story/scenes/02.ts#L235) [09-s2](src/story/scenes/09.ts#L28) [09-i1](src/story/scenes/09.ts#L262) [09-s3](src/story/scenes/09.ts#L302) [09-s4](src/story/scenes/09.ts#L450) |
| Повелительное наклонение на du | слабо | 7 · 2 · 5 · 2 | есть | [07-s5](src/story/scenes/07.ts#L545) [10-s1](src/story/scenes/10.ts#L105) [10-s5](src/story/scenes/10.ts#L558) [10-s6](src/story/scenes/10.ts#L592) |
| Повелительное наклонение на ihr | слабо | 6 · 3 · 4 · 2 | есть | [07-s4](src/story/scenes/07.ts#L449) [08-s1](src/story/scenes/08.ts#L83) [10-s1](src/story/scenes/10.ts#L106) [10-s5](src/story/scenes/10.ts#L558) [10-s6](src/story/scenes/10.ts#L597) |

### Предложение

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Глагол на втором месте, время на первом | закреплено | 58 · 12 · 32 · 26 | есть | [01-s1](src/story/scenes/01.ts#L123) [01-s3](src/story/scenes/01.ts#L236) [02-s2](src/story/scenes/02.ts#L192) [02-s3](src/story/scenes/02.ts#L224) [03-s3](src/story/scenes/03.ts#L277) [03-s6](src/story/scenes/03.ts#L791) |
| Вопрос с W-словом | закреплено | 137 · 12 · 76 · 67 | есть | [01-s1](src/story/scenes/01.ts#L44) [01-s2](src/story/scenes/01.ts#L152) [01-s3](src/story/scenes/01.ts#L219) |
| Вопрос да/нет и ответ ja / nein / doch | закреплено | 42 · 11 · 29 · 20 | есть | [02-s1](src/story/scenes/02.ts#L42) [02-s3](src/story/scenes/02.ts#L220) [02-i1](src/story/scenes/02.ts#L406) [02-s4](src/story/scenes/02.ts#L426) [02-s5](src/story/scenes/02.ts#L582) [02-s6](src/story/scenes/02.ts#L664) |
| nicht и kein | закреплено | 221 · 12 · 96 · 101 | есть | [01-s1](src/story/scenes/01.ts#L144) [01-s3](src/story/scenes/01.ts#L219) [01-s5](src/story/scenes/01.ts#L519) [02-s2](src/story/scenes/02.ts#L196) [02-s4](src/story/scenes/02.ts#L510) [02-s5](src/story/scenes/02.ts#L600) |
| und, oder, aber | без объяснения | 187 · 12 · 66 · 78 | нет | [01-s3](src/story/scenes/01.ts#L219) [01-i1](src/story/scenes/01.ts#L387) [01-s4](src/story/scenes/01.ts#L414) [01-s6](src/story/scenes/01.ts#L579) [02-s2](src/story/scenes/02.ts#L143) [02-s3](src/story/scenes/02.ts#L235) |
| denn как союз причины | нет | 0 · 0 · 0 · 0 | нет | — |
| dann | без объяснения | 17 · 5 · 4 · 6 | нет | [07-s2](src/story/scenes/07.ts#L249) [09-s2](src/story/scenes/09.ts#L198) [09-i1](src/story/scenes/09.ts#L248) [09-s3](src/story/scenes/09.ts#L424) [09-s4](src/story/scenes/09.ts#L545) [09-s5](src/story/scenes/09.ts#L577) |
| wenn (понимание) | нет | 0 · 0 · 0 · 0 | нет | — |
| es gibt | слабо | 5 · 3 · 1 · 4 | нет | [05-s2](src/story/scenes/05.ts#L200) [07-s1](src/story/scenes/07.ts#L37) [07-s3](src/story/scenes/07.ts#L286) [09-s1](src/story/scenes/09.ts#L84) |

### Существительное и артикль

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Множественное число | закреплено | 176 · 12 · 64 · 72 | есть | [01-s3](src/story/scenes/01.ts#L219) [01-s6](src/story/scenes/01.ts#L579) [02-s1](src/story/scenes/02.ts#L110) [02-s2](src/story/scenes/02.ts#L197) [02-s3](src/story/scenes/02.ts#L220) [02-i1](src/story/scenes/02.ts#L401) |
| Винительный падеж | закреплено | 139 · 10 · 82 · 58 | есть | [03-s4](src/story/scenes/03.ts#L561) [04-s1](src/story/scenes/04.ts#L51) [04-s2](src/story/scenes/04.ts#L166) [04-s3](src/story/scenes/04.ts#L287) |
| Дательный на вопрос «где?» (in, auf, an) | закреплено | 58 · 9 · 25 · 12 | есть | [04-s2](src/story/scenes/04.ts#L162) [05-s1](src/story/scenes/05.ts#L88) [05-s2](src/story/scenes/05.ts#L142) [05-s3](src/story/scenes/05.ts#L289) [06-s2](src/story/scenes/06.ts#L159) [06-s3](src/story/scenes/06.ts#L420) |
| Предлоги с дательным (mit, zu, bei, von, aus, nach) | закреплено | 113 · 9 · 58 · 41 | есть | [01-s1](src/story/scenes/01.ts#L19) [01-s3](src/story/scenes/01.ts#L219) [01-s5](src/story/scenes/01.ts#L547) [01-s6](src/story/scenes/01.ts#L609) [03-s2](src/story/scenes/03.ts#L219) [03-s6](src/story/scenes/03.ts#L751) |
| Чей? Имя + s (Annas Bruder) | слабо | 10 · 2 · 10 · 1 | есть | [03-s1](src/story/scenes/03.ts#L63) [03-s3](src/story/scenes/03.ts#L293) [03-s4](src/story/scenes/03.ts#L485) [03-s5](src/story/scenes/03.ts#L624) [04-s3](src/story/scenes/04.ts#L290) |
| Сложные слова: род по последней части | закреплено | 183 · 12 · 97 · 74 | есть | [01-s1](src/story/scenes/01.ts#L80) [02-s1](src/story/scenes/02.ts#L74) [02-s2](src/story/scenes/02.ts#L127) [02-s3](src/story/scenes/02.ts#L235) [02-s6](src/story/scenes/02.ts#L664) [03-s3](src/story/scenes/03.ts#L277) |
| Женский род на -in | закреплено | 41 · 4 · 24 · 21 | есть | [03-s4](src/story/scenes/03.ts#L461) [03-s5](src/story/scenes/03.ts#L600) [09-i1](src/story/scenes/09.ts#L251) [09-s4](src/story/scenes/09.ts#L31) [09-s5](src/story/scenes/09.ts#L615) |
| dieser, diese, dieses | один раз | 1 · 1 · 0 · 1 | нет | [08-s3](src/story/scenes/08.ts#L429) |
| Притяжательные mein, dein, sein, ihr, unser, euer, Ihr | закреплено | 90 · 12 · 46 · 50 | есть | [01-s1](src/story/scenes/01.ts#L119) [01-i1](src/story/scenes/01.ts#L382) [02-s3](src/story/scenes/02.ts#L369) [03-s1](src/story/scenes/03.ts#L43) [03-s2](src/story/scenes/03.ts#L154) |
| welcher, welche, welches | закреплено | 14 · 4 · 8 · 7 | есть | [01-s3](src/story/scenes/01.ts#L219) [02-s3](src/story/scenes/02.ts#L231) [05-s2](src/story/scenes/05.ts#L154) [05-s3](src/story/scenes/05.ts#L302) [05-i1](src/story/scenes/05.ts#L433) [05-s5](src/story/scenes/05.ts#L631) |

### Местоимения

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Местоимения в винительном (mich, dich, ihn …) | закреплено | 25 · 7 · 12 · 15 | есть | [02-s4](src/story/scenes/02.ts#L442) [05-s2](src/story/scenes/05.ts#L175) [05-s4](src/story/scenes/05.ts#L558) [05-s5](src/story/scenes/05.ts#L580) [05-s6](src/story/scenes/05.ts#L796) [07-s3](src/story/scenes/07.ts#L286) |
| Местоимения в дательном (mir, dir, ihm, Ihnen) | без объяснения | 15 · 8 · 6 · 8 | нет | [01-s1](src/story/scenes/01.ts#L73) [01-s3](src/story/scenes/01.ts#L219) [06-s5](src/story/scenes/06.ts#L611) [07-s5](src/story/scenes/07.ts#L525) [07-i1](src/story/scenes/07.ts#L636) [08-s5](src/story/scenes/08.ts#L609) |
| Глаголы с дательным (gehören, gefallen, helfen, danken, geben) | слабо | 5 · 4 · 3 · 2 | нет | [06-s6](src/story/scenes/06.ts#L724) [07-s5](src/story/scenes/07.ts#L545) [08-s5](src/story/scenes/08.ts#L639) [12-s3](src/story/scenes/12.ts#L276) |
| sich, uns (Wir sehen uns) | нет | 0 · 0 · 0 · 0 | нет | — |
| Вопросы wen? и wem? | нет | 0 · 0 · 0 · 0 | нет | — |
| man | один раз | 1 · 1 · 0 · 1 | нет | [07-s1](src/story/scenes/07.ts#L38) |
| etwas, nichts, alles, mehr | без объяснения | 81 · 11 · 30 · 39 | нет | [01-s2](src/story/scenes/01.ts#L164) [03-s3](src/story/scenes/03.ts#L277) [04-s2](src/story/scenes/04.ts#L243) [04-s3](src/story/scenes/04.ts#L293) [04-s4](src/story/scenes/04.ts#L482) [04-s5](src/story/scenes/04.ts#L551) |

### Прилагательное и числа

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Прилагательное после sein (zu groß) | закреплено | 87 · 11 · 33 · 44 | есть | [01-s2](src/story/scenes/01.ts#L164) [01-s4](src/story/scenes/01.ts#L435) [02-s5](src/story/scenes/02.ts#L544) [03-s2](src/story/scenes/03.ts#L243) [04-s2](src/story/scenes/04.ts#L223) [04-s3](src/story/scenes/04.ts#L293) |
| gern, lieber, am liebsten | закреплено | 12 · 4 · 9 · 5 | есть | [04-s3](src/story/scenes/04.ts#L293) [04-s6](src/story/scenes/04.ts#L744) [07-s1](src/story/scenes/07.ts#L79) [07-s3](src/story/scenes/07.ts#L381) [07-s6](src/story/scenes/07.ts#L691) [09-s4](src/story/scenes/09.ts#L450) |
| Сравнение (besser, mehr, als) | слабо | 7 · 2 · 4 · 3 | нет | [07-s3](src/story/scenes/07.ts#L286) [10-s3](src/story/scenes/10.ts#L236) [10-s5](src/story/scenes/10.ts#L522) |
| Цены и количества | закреплено | 77 · 9 · 40 · 24 | есть | [02-s6](src/story/scenes/02.ts#L697) [03-s2](src/story/scenes/03.ts#L223) [03-i1](src/story/scenes/03.ts#L223) [03-s6](src/story/scenes/03.ts#L717) [04-s3](src/story/scenes/04.ts#L293) [04-s4](src/story/scenes/04.ts#L469) |
| Время на часах | закреплено | 151 · 9 · 76 · 56 | есть | [02-s5](src/story/scenes/02.ts#L568) [04-s2](src/story/scenes/04.ts#L162) [04-s3](src/story/scenes/04.ts#L289) [04-s4](src/story/scenes/04.ts#L447) [06-s1](src/story/scenes/06.ts#L35) |
| Порядковые числа и дата | закреплено | 37 · 5 · 21 · 12 | есть | [08-s2](src/story/scenes/08.ts#L221) [08-i1](src/story/scenes/08.ts#L269) [08-s3](src/story/scenes/08.ts#L324) [08-s5](src/story/scenes/08.ts#L643) [08-s6](src/story/scenes/08.ts#L727) [09-s2](src/story/scenes/09.ts#L198) |

### Предлоги

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| um, am, im, von … bis во времени | закреплено | 128 · 7 · 68 · 49 | есть | [06-s1](src/story/scenes/06.ts#L35) [06-s2](src/story/scenes/06.ts#L173) |
| ab и für во времени (ab Montag, für zwei Wochen) | слабо | 3 · 2 · 2 · 0 | нет | [08-s3](src/story/scenes/08.ts#L375) [11-s5](src/story/scenes/11.ts#L538) |
| nach и vor во времени (nach dem Essen) | слабо | 3 · 2 · 1 · 3 | нет | [08-s6](src/story/scenes/08.ts#L705) [09-s2](src/story/scenes/09.ts#L176) |
| über (über zwanzig Minuten) | нет | 0 · 0 · 0 · 0 | нет | — |
| nach Hause / zu Hause | закреплено | 16 · 4 · 10 · 6 | есть | [07-s2](src/story/scenes/07.ts#L136) [09-s5](src/story/scenes/09.ts#L639) [09-s6](src/story/scenes/09.ts#L694) [10-s4](src/story/scenes/10.ts#L29) [12-s1](src/story/scenes/12.ts#L113) |
| in, an, auf + винительный для направления (in die Stadt) | без объяснения | 39 · 8 · 18 · 12 | нет | [04-s2](src/story/scenes/04.ts#L243) [04-s5](src/story/scenes/04.ts#L560) [06-s2](src/story/scenes/06.ts#L214) [06-s5](src/story/scenes/06.ts#L615) [06-s6](src/story/scenes/06.ts#L755) [07-s1](src/story/scenes/07.ts#L43) |
| unter | нет | 0 · 0 · 0 · 0 | нет | — |
| ohne и für (ohne dich, für meinen Freund) | без объяснения | 36 · 11 · 20 · 9 | нет | [01-s1](src/story/scenes/01.ts#L144) [02-s2](src/story/scenes/02.ts#L196) [02-s4](src/story/scenes/02.ts#L442) [03-s5](src/story/scenes/03.ts#L672) [04-s1](src/story/scenes/04.ts#L154) [04-s2](src/story/scenes/04.ts#L172) |

### Словообразование

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Существительные на -ung | без объяснения | 94 · 9 · 52 · 31 | нет | [02-s2](src/story/scenes/02.ts#L127) [02-s3](src/story/scenes/02.ts#L235) [02-s5](src/story/scenes/02.ts#L646) [04-s2](src/story/scenes/04.ts#L227) [04-s3](src/story/scenes/04.ts#L293) [04-s4](src/story/scenes/04.ts#L485) |
| Прилагательные с un-, -los, -bar | нет | 0 · 0 · 0 · 0 | нет | — |
| hellblau, dunkelblau | без объяснения | 28 · 6 · 11 · 3 | нет | [05-s2](src/story/scenes/05.ts#L251) [05-s3](src/story/scenes/05.ts#L302) [05-s5](src/story/scenes/05.ts#L589) [05-s6](src/story/scenes/05.ts#L711) [06-s2](src/story/scenes/06.ts#L203) [06-i1](src/story/scenes/06.ts#L455) |
| Причастие как прилагательное (geöffnet, geschlossen) | слабо | 2 · 1 · 2 · 0 | нет | [06-s3](src/story/scenes/06.ts#L286) |
| Погода с es (Es regnet) | закреплено | 23 · 5 · 4 · 3 | есть | [05-s1](src/story/scenes/05.ts#L39) [06-s6](src/story/scenes/06.ts#L712) [09-s1](src/story/scenes/09.ts#L40) [09-i1](src/story/scenes/09.ts#L250) [09-s3](src/story/scenes/09.ts#L289) [11-s1](src/story/scenes/11.ts#L137) |
| Ich habe …schmerzen, … tut weh | слабо | 11 · 1 · 6 · 8 | есть | [10-s1](src/story/scenes/10.ts#L39) [10-s2](src/story/scenes/10.ts#L120) [10-s6](src/story/scenes/10.ts#L638) |

## Слова: нет

316 слов.

### Существительные (142)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| der Abflug (от fliegen) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Absender | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Angebot (от anbieten) | экз. | 0 · 0 · 0 · 0 | — | [05](content/a1/05-einkaufen.yaml#L215) | — |
| die Ankunft | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Anrede | экз. | 0 · 0 · 0 · 0 | — | [07](content/a1/07-freizeit.yaml#L240) [10](content/a1/10-gesundheit.yaml#L201) [12](content/a1/12-reisen.yaml#L200) | — |
| der Anrufbeantworter (от der Anruf) | экз. | 0 · 0 · 0 · 0 | — | [02](content/a1/02-zahlen.yaml#L256) [06](content/a1/06-tagesablauf.yaml#L194) [10](content/a1/10-gesundheit.yaml#L181) | — |
| die Ansage | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Anschluss | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Antwort (от antworten) | экз. | 0 · 0 · 0 · 0 | — | [02](content/a1/02-zahlen.yaml#L256) [03](content/a1/03-familie.yaml#L213) [06](content/a1/06-tagesablauf.yaml#L194) [07](content/a1/07-freizeit.yaml#L233) [09](content/a1/09-stadt.yaml#L199) [10](content/a1/10-gesundheit.yaml#L181) [12](content/a1/12-reisen.yaml#L193) | гл. 5 |
| das Apartment | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Arbeitsplatz | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Aufgabe | экз. | 0 · 0 · 0 · 0 | — | [10](content/a1/10-gesundheit.yaml#L211) | — |
| der Aufzug | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Ausflug | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Ausgang | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Auskunft | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Ausland | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Ausländer (от das Ausland) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Aussage | экз. | 0 · 0 · 0 · 0 | — | [03](content/a1/03-familie.yaml#L223) [05](content/a1/05-einkaufen.yaml#L212) [07](content/a1/07-freizeit.yaml#L221) [11](content/a1/11-arbeit.yaml#L191) [12](content/a1/12-reisen.yaml#L242) | — |
| der Ausweis | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Autobahn | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Bäckerei | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Bahnsteig | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Bauch | 10, экз. | 0 · 0 · 0 · 0 | — | [10](content/a1/10-gesundheit.yaml#L90) | гл. 10 |
| der Baum | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Beamte | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Beispiel | экз. | 0 · 0 · 0 · 0 | — | [01](content/a1/01-kennenlernen.yaml#L190) [02](content/a1/02-zahlen.yaml#L203) [04](content/a1/04-essen.yaml#L227) [05](content/a1/05-einkaufen.yaml#L175) [06](content/a1/06-tagesablauf.yaml#L164) [07](content/a1/07-freizeit.yaml#L196) [08](content/a1/08-wohnen.yaml#L199) [09](content/a1/09-stadt.yaml#L171) [11](content/a1/11-arbeit.yaml#L161) | — |
| der Bekannte | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Bild | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Birne | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Bleistift | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Blick | экз. | 0 · 0 · 0 · 0 | — | [11](content/a1/11-arbeit.yaml#L6) | гл. 3 |
| die Blume | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Bogen | экз. | 0 · 0 · 0 · 0 | — | — | гл. 2 |
| die Briefmarke | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Bürgeramt | 9 | 0 · 0 · 0 · 0 | — | [09](content/a1/09-stadt.yaml#L110) | гл. 9 |
| der Chef | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Computer | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Dame | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Datum | 12, экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L130) | гл. 12 |
| die Disco | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Doppelzimmer | 12, экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L106) | гл. 12 |
| das Dorf | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Drucker (от drucken) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Dusche (от duschen) | экз. | 0 · 0 · 0 · 0 | — | [06](content/a1/06-tagesablauf.yaml#L148) | гл. 6 |
| die E-Mail | экз. | 0 · 0 · 0 · 0 | — | [03](content/a1/03-familie.yaml#L223) [07](content/a1/07-freizeit.yaml#L221) [10](content/a1/10-gesundheit.yaml#L199) [11](content/a1/11-arbeit.yaml#L46) | — |
| die Ehefrau | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Ehemann | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Eingang | экз. | 0 · 0 · 0 · 0 | — | [09](content/a1/09-stadt.yaml#L236) | — |
| der Eintritt | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Empfänger | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Ergebnis | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Erwachsene | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Fahrer (от fahren) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Fehler | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Feiertag | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Ferien | 12 | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L148) | гл. 12 |
| das Feuer | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Friseur | 11 | 0 · 0 · 0 · 0 | — | [11](content/a1/11-arbeit.yaml#L101) | гл. 11 |
| die Führung | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Garten | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Geburtsjahr | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Geburtsort | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Geld | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Gepäck | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Geschäft | экз. | 0 · 0 · 0 · 0 | — | [05](content/a1/05-einkaufen.yaml#L224) | — |
| das Getränk | экз. | 0 · 0 · 0 · 0 | — | [04](content/a1/04-essen.yaml#L119) [07](content/a1/07-freizeit.yaml#L228) | — |
| das Gewicht | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Großmutter (от die Großeltern) | экз. | 0 · 0 · 0 · 0 | — | [03](content/a1/03-familie.yaml#L112) | — |
| der Großvater (от die Großeltern) | экз. | 0 · 0 · 0 · 0 | — | [03](content/a1/03-familie.yaml#L111) | — |
| die Gruppe | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Haar | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Hähnchen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Halbpension | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Halle | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Hausaufgabe | экз. | 0 · 0 · 0 · 0 | — | [10](content/a1/10-gesundheit.yaml#L211) | — |
| die Hausfrau | экз. | 0 · 0 · 0 · 0 | — | [11](content/a1/11-arbeit.yaml#L116) | — |
| die Heimat | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Heizung | 8 | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L44) | гл. 8 |
| die Hochzeit | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Informatiker | 11 | 0 · 0 · 0 · 0 | — | [11](content/a1/11-arbeit.yaml#L103) | гл. 11 |
| die Information | экз. | 0 · 0 · 0 · 0 | — | [06](content/a1/06-tagesablauf.yaml#L197) [09](content/a1/09-stadt.yaml#L236) | — |
| der Ingenieur | 11 | 0 · 0 · 0 · 0 | — | [11](content/a1/11-arbeit.yaml#L100) | гл. 11 |
| das Internet | экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L228) | — |
| die Jahreszeit | 12 | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L130) | гл. 12 |
| der Job | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Jugendliche | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Kindergarten | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Klasse | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Kleiderschrank | 8 | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L76) | гл. 8 |
| die Kleidung | экз. | 0 · 0 · 0 · 0 | — | [05](content/a1/05-einkaufen.yaml#L125) | — |
| das Konto | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Kreditkarte (от die Karte) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Kugelschreiber | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Lebensmittel (от leben) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| Lieblings- | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Lkw | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Lokal | экз. | 0 · 0 · 0 · 0 | — | [04](content/a1/04-essen.yaml#L181) | — |
| die Lösung | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Mensch | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Mitte | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Möbel | 8, экз. | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L104) | гл. 8 |
| der Mund | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Öl | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Ordnung | экз. | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L274) [09](content/a1/09-stadt.yaml#L158) | — |
| der Ort | экз. | 0 · 0 · 0 · 0 | — | [07](content/a1/07-freizeit.yaml#L361) [09](content/a1/09-stadt.yaml#L97) | — |
| die Papiere | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Partner | 3, экз. | 0 · 0 · 0 · 0 | — | [03](content/a1/03-familie.yaml#L139) [04](content/a1/04-essen.yaml#L277) [05](content/a1/05-einkaufen.yaml#L245) [07](content/a1/07-freizeit.yaml#L265) | гл. 3 |
| die Partnerin | 3, экз. | 0 · 0 · 0 · 0 | — | [03](content/a1/03-familie.yaml#L140) | гл. 3 |
| die Pasta | 4 | 0 · 0 · 0 · 0 | — | [04](content/a1/04-essen.yaml#L60) [11](content/a1/11-arbeit.yaml#L40) | гл. 4 |
| das Praktikum | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Preis | экз. | 0 · 0 · 0 · 0 | — | [05](content/a1/05-einkaufen.yaml#L160) | гл. 5 |
| der Prospekt | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Reisebüro (от reisen) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Reiseführer (от reisen) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Reparatur (от reparieren) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Restaurant | экз. | 0 · 0 · 0 · 0 | — | [04](content/a1/04-essen.yaml#L77) [06](content/a1/06-tagesablauf.yaml#L62) [11](content/a1/11-arbeit.yaml#L44) | — |
| der Rock | 5 | 0 · 0 · 0 · 0 | — | [05](content/a1/05-einkaufen.yaml#L136) | гл. 5 |
| das Salz | экз. | 0 · 0 · 0 · 0 | — | — | — |
| Satz | экз. | 0 · 0 · 0 · 0 | — | [07](content/a1/07-freizeit.yaml#L239) [08](content/a1/08-wohnen.yaml#L485) [10](content/a1/10-gesundheit.yaml#L200) [12](content/a1/12-reisen.yaml#L199) | — |
| der Schalter | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Schinken | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Schluss | экз. | 0 · 0 · 0 · 0 | — | — | — |
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
| die Unterschrift (от unterschreiben) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Verein | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Verwandte | экз. | 0 · 0 · 0 · 0 | — | [03](content/a1/03-familie.yaml#L106) | — |
| die Vorsicht | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Vorwahl | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Welt | экз. | 0 · 0 · 0 · 0 | — | — | — |
| das Wohnzimmer | 8 | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L60) | гл. 8 |
| die Zigarette | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Zoll | экз. | 0 · 0 · 0 · 0 | — | — | — |

### Глаголы (62)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| abfliegen (от fliegen) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| abgeben | экз. | 0 · 0 · 0 · 0 | — | — | — |
| abholen | экз. | 0 · 0 · 0 · 0 | — | — | гл. 10 |
| anbieten | экз. | 0 · 0 · 0 · 0 | — | — | — |
| anklicken | экз. | 0 · 0 · 0 · 0 | — | — | — |
| ankreuzen | экз. | 0 · 0 · 0 · 0 | — | [04](content/a1/04-essen.yaml#L299) [09](content/a1/09-stadt.yaml#L222) | — |
| anmelden | экз. | 0 · 0 · 0 · 0 | — | — | — |
| antworten | экз. | 0 · 0 · 0 · 0 | — | [03](content/a1/03-familie.yaml#L213) [04](content/a1/04-essen.yaml#L277) [07](content/a1/07-freizeit.yaml#L238) [12](content/a1/12-reisen.yaml#L199) | гл. 5 |
| anziehen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| aufräumen | 6 | 0 · 0 · 0 · 0 | — | [06](content/a1/06-tagesablauf.yaml#L154) | гл. 6 |
| ausfüllen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| aussehen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| ausziehen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| baden | экз. | 0 · 0 · 0 · 0 | — | — | — |
| bedeuten | экз. | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L42) | — |
| beginnen | экз. | 0 · 0 · 0 · 0 | — | [06](content/a1/06-tagesablauf.yaml#L200) [11](content/a1/11-arbeit.yaml#L785) | — |
| benutzen | экз. | 0 · 0 · 0 · 0 | — | [09](content/a1/09-stadt.yaml#L236) | — |
| besichtigen | экз. | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L202) | — |
| bestellen | 4, экз. | 0 · 0 · 0 · 0 | — | [04](content/a1/04-essen.yaml#L203) [10](content/a1/10-gesundheit.yaml#L724) | гл. 4 |
| drucken | экз. | 0 · 0 · 0 · 0 | — | — | — |
| drücken | экз. | 0 · 0 · 0 · 0 | — | — | — |
| duschen | 6, экз. | 0 · 0 · 0 · 0 | — | [06](content/a1/06-tagesablauf.yaml#L148) | гл. 6 |
| empfehlen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| enden | экз. | 0 · 0 · 0 · 0 | — | [07](content/a1/07-freizeit.yaml#L422) [12](content/a1/12-reisen.yaml#L198) | — |
| entschuldigen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| erklären | экз. | 0 · 0 · 0 · 0 | — | [09](content/a1/09-stadt.yaml#L130) | — |
| erlauben | экз. | 0 · 0 · 0 · 0 | — | — | — |
| fehlen | экз. | 0 · 0 · 0 · 0 | — | — | гл. 10 |
| fernsehen | 6, экз. | 0 · 0 · 0 · 0 | — | [06](content/a1/06-tagesablauf.yaml#L70) | гл. 6 |
| fliegen | экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L158) | — |
| freuen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| frühstücken | 6, экз. | 0 · 0 · 0 · 0 | — | [04](content/a1/04-essen.yaml#L192) [06](content/a1/06-tagesablauf.yaml#L44) [07](content/a1/07-freizeit.yaml#L257) [12](content/a1/12-reisen.yaml#L109) | гл. 6 |
| gefallen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| gewinnen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| gratulieren | экз. | 0 · 0 · 0 · 0 | — | — | — |
| grillen | 7, экз. | 0 · 0 · 0 · 0 | — | [07](content/a1/07-freizeit.yaml#L62) | гл. 7 |
| heiraten | экз. | 0 · 0 · 0 · 0 | — | — | — |
| kennenlernen (от kennen) | экз. | 0 · 0 · 0 · 0 | — | [01](content/a1/01-kennenlernen.yaml#L1) [11](content/a1/11-arbeit.yaml#L199) | — |
| kriegen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| laufen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| leben | экз. | 0 · 0 · 0 · 0 | — | — | — |
| legen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| mitmachen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| öffnen | экз. | 0 · 0 · 0 · 0 | — | [06](content/a1/06-tagesablauf.yaml#L214) [09](content/a1/09-stadt.yaml#L553) | гл. 7 |
| rauchen | 10, экз. | 0 · 0 · 0 · 0 | — | [10](content/a1/10-gesundheit.yaml#L130) | гл. 10 |
| riechen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| schmecken | экз. | 0 · 0 · 0 · 0 | — | — | — |
| studieren | экз. | 0 · 0 · 0 · 0 | — | — | — |
| telefonieren | экз. | 0 · 0 · 0 · 0 | — | — | — |
| treffen | экз. | 0 · 0 · 0 · 0 | — | [01](content/a1/01-kennenlernen.yaml#L246) [06](content/a1/06-tagesablauf.yaml#L77) [07](content/a1/07-freizeit.yaml#L128) [09](content/a1/09-stadt.yaml#L75) | гл. 5, 6, 7, 9, 12 |
| übernachten | экз. | 0 · 0 · 0 · 0 | — | — | — |
| überweisen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| umziehen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| unterschreiben | экз. | 0 · 0 · 0 · 0 | — | — | — |
| verdienen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| verkaufen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| vermieten | экз. | 0 · 0 · 0 · 0 | — | — | — |
| vorstellen | экз. | 0 · 0 · 0 · 0 | — | [01](content/a1/01-kennenlernen.yaml#L213) [11](content/a1/11-arbeit.yaml#L204) | — |
| wandern | экз. | 0 · 0 · 0 · 0 | — | — | — |
| waschen | экз. | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L125) | — |
| wehtun | 10 | 0 · 0 · 0 · 0 | — | [10](content/a1/10-gesundheit.yaml#L105) | гл. 10 |
| wiederholen | экз. | 0 · 0 · 0 · 0 | — | — | — |

### Прилагательные и наречия (54)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| arbeitslos | экз. | 0 · 0 · 0 · 0 | — | — | — |
| ausländisch (от das Ausland) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| automatisch | экз. | 0 · 0 · 0 · 0 | — | — | — |
| bald | экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L198) | — |
| bar | экз. | 0 · 0 · 0 · 0 | — | — | — |
| beide | экз. | 0 · 0 · 0 · 0 | — | — | гл. 5, 11 |
| bekannt | экз. | 0 · 0 · 0 · 0 | — | — | — |
| besetzt | экз. | 0 · 0 · 0 · 0 | — | — | — |
| bewölkt | 12 | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L123) | гл. 12 |
| bitter | экз. | 0 · 0 · 0 · 0 | — | — | — |
| böse | экз. | 0 · 0 · 0 · 0 | — | — | — |
| breit | экз. | 0 · 0 · 0 · 0 | — | — | — |
| circa | экз. | 0 · 0 · 0 · 0 | — | [07](content/a1/07-freizeit.yaml#L239) [12](content/a1/12-reisen.yaml#L200) | — |
| daneben | экз. | 0 · 0 · 0 · 0 | — | — | — |
| draußen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| eilig | экз. | 0 · 0 · 0 · 0 | — | — | — |
| fremd | экз. | 0 · 0 · 0 · 0 | — | — | — |
| geboren | экз. | 0 · 0 · 0 · 0 | — | — | — |
| geöffnet (от öffnen) | экз. | 0 · 0 · 0 · 0 | — | [06](content/a1/06-tagesablauf.yaml#L214) [09](content/a1/09-stadt.yaml#L553) | — |
| gerade | экз. | 0 · 0 · 0 · 0 | — | — | — |
| geschieden | 3 | 0 · 0 · 0 · 0 | — | [03](content/a1/03-familie.yaml#L138) | гл. 3 |
| gestorben | экз. | 0 · 0 · 0 · 0 | — | — | — |
| gleich | экз. | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L50) | — |
| glücklich | экз. | 0 · 0 · 0 · 0 | — | — | — |
| gültig | экз. | 0 · 0 · 0 · 0 | — | — | — |
| günstig | 8, экз. | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L143) | гл. 8 |
| hoch | экз. | 0 · 0 · 0 · 0 | — | — | — |
| international | экз. | 0 · 0 · 0 · 0 | — | — | — |
| kulturell | экз. | 0 · 0 · 0 · 0 | — | — | — |
| kurz | 5, экз. | 0 · 0 · 0 · 0 | — | [05](content/a1/05-einkaufen.yaml#L155) [08](content/a1/08-wohnen.yaml#L196) [09](content/a1/09-stadt.yaml#L184) [10](content/a1/10-gesundheit.yaml#L186) | гл. 5 |
| ledig | 3, экз. | 0 · 0 · 0 · 0 | — | [03](content/a1/03-familie.yaml#L137) | гл. 3 |
| leicht | экз. | 0 · 0 · 0 · 0 | — | — | — |
| lustig | экз. | 0 · 0 · 0 · 0 | — | — | — |
| männlich (от der Mann) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| möbliert | 8 | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L150) | гл. 8 |
| modern | 8 | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L72) | гл. 8 |
| möglich | экз. | 0 · 0 · 0 · 0 | — | — | — |
| müde | экз. | 0 · 0 · 0 · 0 | — | — | — |
| normal | экз. | 0 · 0 · 0 · 0 | — | — | — |
| oben | экз. | 0 · 0 · 0 · 0 | — | — | — |
| pünktlich | экз. | 0 · 0 · 0 · 0 | — | [09](content/a1/09-stadt.yaml#L436) | — |
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
| wunderbar | экз. | 0 · 0 · 0 · 0 | — | — | — |
| zufrieden | экз. | 0 · 0 · 0 · 0 | — | — | — |
| zurzeit (от die Zeit) | экз. | 0 · 0 · 0 · 0 | — | — | — |

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

### Выражения (15)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| 100 Gramm | 5 | 0 · 0 · 0 · 0 | — | [05](content/a1/05-einkaufen.yaml#L107) | гл. 5 |
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
| Wie viel Uhr ist es? | 6 | 0 · 0 · 0 · 0 | — | [06](content/a1/06-tagesablauf.yaml#L106) | гл. 6 |
| zum Beispiel (от das Beispiel) | экз. | 0 · 0 · 0 · 0 | — | — | — |

### Числа, время, цвета и другие группы (35)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| achtzig | экз. | 0 · 0 · 0 · 0 | — | [02](content/a1/02-zahlen.yaml#L419) [05](content/a1/05-einkaufen.yaml#L46) | гл. 5 |
| der April | экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L173) | — |
| der August | экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L174) | — |
| der Cent | экз. | 0 · 0 · 0 · 0 | — | [05](content/a1/05-einkaufen.yaml#L165) | — |
| der Deutsche | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Dezember | экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L172) | — |
| dreizehn | экз. | 0 · 0 · 0 · 0 | — | [02](content/a1/02-zahlen.yaml#L418) | — |
| Europa | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Europäer | экз. | 0 · 0 · 0 · 0 | — | — | — |
| europäisch | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Februar | экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L174) | — |
| der Frühling | 12, экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L135) | гл. 12 |
| das Gramm | экз. | 0 · 0 · 0 · 0 | — | [05](content/a1/05-einkaufen.yaml#L106) | гл. 5 |
| der Januar | экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L173) | — |
| der Kilometer | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der März | экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L172) | — |
| die Milliarde | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Million | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Monat | 12, экз. | 0 · 0 · 0 · 0 | — | [03](content/a1/03-familie.yaml#L229) [12](content/a1/12-reisen.yaml#L139) | гл. 12 |
| der Norden | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der November | экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L174) | — |
| der Oktober | экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L173) | — |
| das Prozent | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Quadratmeter | 8, экз. | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L164) | гл. 8 |
| sechzehn | экз. | 0 · 0 · 0 · 0 | — | [02](content/a1/02-zahlen.yaml#L420) | гл. 7 |
| sechzig | экз. | 0 · 0 · 0 · 0 | — | [02](content/a1/02-zahlen.yaml#L194) | — |
| der September | экз. | 0 · 0 · 0 · 0 | — | [12](content/a1/12-reisen.yaml#L172) | — |
| siebzig | экз. | 0 · 0 · 0 · 0 | — | [02](content/a1/02-zahlen.yaml#L421) | — |
| der Süden | экз. | 0 · 0 · 0 · 0 | — | — | — |
| tausend | экз. | 0 · 0 · 0 · 0 | — | [02](content/a1/02-zahlen.yaml#L198) | — |
| vierte | экз. | 0 · 0 · 0 · 0 | — | [08](content/a1/08-wohnen.yaml#L464) [12](content/a1/12-reisen.yaml#L40) | — |
| vierzehn | экз. | 0 · 0 · 0 · 0 | — | [06](content/a1/06-tagesablauf.yaml#L542) | гл. 2 |
| der Westen | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Wochentag | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Zentimeter | экз. | 0 · 0 · 0 · 0 | — | — | — |

## Слова: один раз

83 слов.

### Существительные (50)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| die Abfahrt (от abfahren) | экз. | 1 · 1 · 1 · 0 | [09-s2](src/story/scenes/09.ts#L159) | [09](content/a1/09-stadt.yaml#L214) [12](content/a1/12-reisen.yaml#L246) | — |
| das Alter | экз. | 1 · 1 · 1 · 1 | [02-s6](src/story/scenes/02.ts#L664) | [01](content/a1/01-kennenlernen.yaml#L218) [11](content/a1/11-arbeit.yaml#L209) | — |
| der Anfang (от anfangen) | экз. | 1 · 1 · 1 · 0 | [06-s4](src/story/scenes/06.ts#L528) | [06](content/a1/06-tagesablauf.yaml#L149) | гл. 6 |
| der Anruf | экз. | 1 · 1 · 1 · 0 | [06-s5](src/story/scenes/06.ts#L131) | [02](content/a1/02-zahlen.yaml#L26) [06](content/a1/06-tagesablauf.yaml#L155) [10](content/a1/10-gesundheit.yaml#L177) [12](content/a1/12-reisen.yaml#L55) | гл. 6 |
| das Baby | 3, экз. | 1 · 1 · 1 · 1 | [03-s1](src/story/scenes/03.ts#L66) | [03](content/a1/03-familie.yaml#L47) | гл. 3 |
| die Banane | 5, экз. | 1 · 1 · 1 · 1 | [05-s3](src/story/scenes/05.ts#L419) | [05](content/a1/05-einkaufen.yaml#L118) | гл. 5 |
| die Bank | 9, экз. | 1 · 1 · 1 · 1 | [09-s1](src/story/scenes/09.ts#L115) | [09](content/a1/09-stadt.yaml#L106) | гл. 9 |
| die Durchsage | 12, экз. | 1 · 1 · 0 · 0 | [12-s2](src/story/scenes/12.ts#L170) | [05](content/a1/05-einkaufen.yaml#L208) [09](content/a1/09-stadt.yaml#L207) [12](content/a1/12-reisen.yaml#L98) | гл. 12 |
| der Durst | экз. | 1 · 1 · 1 · 0 | [04-s5](src/story/scenes/04.ts#L620) | [04](content/a1/04-essen.yaml#L207) | гл. 4 |
| die Ecke | экз. | 1 · 1 · 0 · 1 | [08-s5](src/story/scenes/08.ts#L609) | — | — |
| die Erdbeere | 5 | 1 · 1 · 1 · 1 | [05-s3](src/story/scenes/05.ts#L419) | [05](content/a1/05-einkaufen.yaml#L120) | гл. 5 |
| die Flasche | 5, экз. | 1 · 1 · 1 · 1 | [05-s6](src/story/scenes/05.ts#L792) | [05](content/a1/05-einkaufen.yaml#L109) | гл. 4, 5 |
| der Flughafen | 12, экз. | 1 · 1 · 1 · 1 | [12-s1](src/story/scenes/12.ts#L127) | [12](content/a1/12-reisen.yaml#L94) | гл. 12 |
| das Flugzeug | 12, экз. | 1 · 1 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L252) | [12](content/a1/12-reisen.yaml#L93) | гл. 12 |
| das Frühstück (от frühstücken) | 4, 12, экз. | 1 · 1 · 0 · 0 | [08-s5](src/story/scenes/08.ts#L619) | [04](content/a1/04-essen.yaml#L192) [06](content/a1/06-tagesablauf.yaml#L44) [07](content/a1/07-freizeit.yaml#L257) [12](content/a1/12-reisen.yaml#L42) | гл. 4, 6 |
| das Gleis | 9, 12, экз. | 1 · 1 · 1 · 0 | [09-s2](src/story/scenes/09.ts#L150) | [09](content/a1/09-stadt.yaml#L127) [12](content/a1/12-reisen.yaml#L96) | гл. 9 |
| das Glück | экз. | 1 · 1 · 0 · 1 | [09-s4](src/story/scenes/09.ts#L545) | [11](content/a1/11-arbeit.yaml#L50) | — |
| der Glückwunsch | экз. | 1 · 1 · 1 · 0 | [11-s4](src/story/scenes/11.ts#L463) | — | — |
| der Hausmann (от die Hausfrau) | 11, экз. | 1 · 1 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L96) | [11](content/a1/11-arbeit.yaml#L116) | гл. 11 |
| der Husten | 10 | 1 · 1 · 1 · 0 | [10-s3](src/story/scenes/10.ts#L342) | [10](content/a1/10-gesundheit.yaml#L102) | гл. 10 |
| die Kartoffel | 5, экз. | 1 · 1 · 1 · 1 | [05-s3](src/story/scenes/05.ts#L419) | [05](content/a1/05-einkaufen.yaml#L122) | гл. 5 |
| die Kasse | экз. | 1 · 1 · 1 · 1 | [05-s5](src/story/scenes/05.ts#L602) | — | — |
| der Kollege | 11, экз. | 1 · 1 · 1 · 1 | [11-s6](src/story/scenes/11.ts#L691) | [11](content/a1/11-arbeit.yaml#L126) | гл. 11 |
| der Krankenpfleger | 11 | 1 · 1 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L96) | [11](content/a1/11-arbeit.yaml#L111) | гл. 11 |
| der Kunde | экз. | 1 · 1 · 1 · 0 | [09-s5](src/story/scenes/09.ts#L651) | [05](content/a1/05-einkaufen.yaml#L215) | — |
| der Kurs | экз. | 1 · 1 · 0 · 0 | [03-s4](src/story/scenes/03.ts#L463) | [01](content/a1/01-kennenlernen.yaml#L26) [02](content/a1/02-zahlen.yaml#L141) [06](content/a1/06-tagesablauf.yaml#L36) [07](content/a1/07-freizeit.yaml#L223) [10](content/a1/10-gesundheit.yaml#L58) [11](content/a1/11-arbeit.yaml#L74) [12](content/a1/12-reisen.yaml#L198) | гл. 6 |
| die Lehrerin | 11 | 1 · 1 · 1 · 0 | [11-s6](src/story/scenes/11.ts#L661) | [11](content/a1/11-arbeit.yaml#L87) | гл. 11 |
| der Liegeplatz | 2 | 1 · 1 · 1 · 0 | [02-s2](src/story/scenes/02.ts#L127) | [02](content/a1/02-zahlen.yaml#L93) [12](content/a1/12-reisen.yaml#L889) | гл. 2 |
| die Maschine | экз. | 1 · 1 · 1 · 1 | [08-s6](src/story/scenes/08.ts#L790) | [08](content/a1/08-wohnen.yaml#L70) | гл. 8 |
| das Meer | экз. | 1 · 1 · 1 · 0 | [11-s1](src/story/scenes/11.ts#L76) | — | — |
| das Mittagessen | 4 | 1 · 1 · 1 · 1 | [04-s1](src/story/scenes/04.ts#L106) | [04](content/a1/04-essen.yaml#L193) | гл. 4 |
| die Orange | 5 | 1 · 1 · 1 · 1 | [05-s3](src/story/scenes/05.ts#L419) | [05](content/a1/05-einkaufen.yaml#L119) | гл. 5 |
| das Papier | экз. | 1 · 1 · 0 · 1 | [04-s2](src/story/scenes/04.ts#L221) | — | — |
| die Person | 12 | 1 · 1 · 1 · 1 | [01-s6](src/story/scenes/01.ts#L579) | [01](content/a1/01-kennenlernen.yaml#L114) [02](content/a1/02-zahlen.yaml#L203) [03](content/a1/03-familie.yaml#L166) [04](content/a1/04-essen.yaml#L227) [07](content/a1/07-freizeit.yaml#L183) [10](content/a1/10-gesundheit.yaml#L152) [11](content/a1/11-arbeit.yaml#L176) [12](content/a1/12-reisen.yaml#L107) | гл. 1, 12 |
| das Rathaus | 9 | 1 · 1 · 1 · 1 | [09-s1](src/story/scenes/09.ts#L115) | [09](content/a1/09-stadt.yaml#L109) | гл. 9 |
| die Rezeption | экз. | 1 · 1 · 0 · 0 | [12-s3](src/story/scenes/12.ts#L266) | — | — |
| die S-Bahn | 9, экз. | 1 · 1 · 1 · 1 | [09-s1](src/story/scenes/09.ts#L111) | [09](content/a1/09-stadt.yaml#L119) | гл. 9 |
| das Schlafzimmer | 8 | 1 · 1 · 1 · 1 | [08-s6](src/story/scenes/08.ts#L790) | [08](content/a1/08-wohnen.yaml#L74) | гл. 8 |
| der Schnupfen | 10 | 1 · 1 · 1 · 0 | [10-s3](src/story/scenes/10.ts#L342) | [10](content/a1/10-gesundheit.yaml#L103) | гл. 10 |
| der Schreibtisch | 8 | 1 · 1 · 1 · 1 | [08-s1](src/story/scenes/08.ts#L127) | [08](content/a1/08-wohnen.yaml#L128) | гл. 8 |
| die Schweiz | 1 | 1 · 1 · 1 · 1 | [01-s2](src/story/scenes/01.ts#L209) | [01](content/a1/01-kennenlernen.yaml#L139) [09](content/a1/09-stadt.yaml#L362) | гл. 1 |
| die Tante | 3 | 1 · 1 · 1 · 0 | [03-s4](src/story/scenes/03.ts#L574) | [03](content/a1/03-familie.yaml#L114) | гл. 3 |
| der Text | экз. | 1 · 1 · 0 · 1 | [09-s3](src/story/scenes/09.ts#L411) | [02](content/a1/02-zahlen.yaml#L258) [03](content/a1/03-familie.yaml#L227) [04](content/a1/04-essen.yaml#L299) [05](content/a1/05-einkaufen.yaml#L212) [06](content/a1/06-tagesablauf.yaml#L196) [07](content/a1/07-freizeit.yaml#L225) [08](content/a1/08-wohnen.yaml#L261) [09](content/a1/09-stadt.yaml#L211) [10](content/a1/10-gesundheit.yaml#L181) [11](content/a1/11-arbeit.yaml#L195) [12](content/a1/12-reisen.yaml#L204) | — |
| die Treppe | экз. | 1 · 1 · 1 · 1 | [08-s1](src/story/scenes/08.ts#L127) | [08](content/a1/08-wohnen.yaml#L100) | — |
| die U-Bahn | 9 | 1 · 1 · 1 · 1 | [09-s1](src/story/scenes/09.ts#L111) | [09](content/a1/09-stadt.yaml#L120) | гл. 9 |
| der Urlaub | 12, экз. | 1 · 1 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L252) | [12](content/a1/12-reisen.yaml#L91) | гл. 12 |
| die USA | 1 | 1 · 1 · 1 · 1 | [01-s2](src/story/scenes/01.ts#L209) | [01](content/a1/01-kennenlernen.yaml#L140) [02](content/a1/02-zahlen.yaml#L238) | гл. 1 |
| die Waschmaschine | 8 | 1 · 1 · 1 · 1 | [08-s6](src/story/scenes/08.ts#L790) | [08](content/a1/08-wohnen.yaml#L70) | гл. 8 |
| der Wein | 4, экз. | 1 · 1 · 1 · 1 | [04-s3](src/story/scenes/04.ts#L381) | [04](content/a1/04-essen.yaml#L72) | гл. 4 |
| die Zeitung | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L73) | — | — |

### Глаголы (11)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| abfahren | экз. | 1 · 1 · 1 · 0 | [09-s2](src/story/scenes/09.ts#L159) | [09](content/a1/09-stadt.yaml#L214) [12](content/a1/12-reisen.yaml#L246) | — |
| anfangen | 6, экз. | 1 · 1 · 1 · 0 | [06-s4](src/story/scenes/06.ts#L528) | [06](content/a1/06-tagesablauf.yaml#L36) [09](content/a1/09-stadt.yaml#L91) | гл. 6 |
| anmachen | экз. | 1 · 1 · 0 · 0 | [08-s2](src/story/scenes/08.ts#L159) | — | гл. 8 |
| ausmachen | экз. | 1 · 1 · 0 · 1 | [06-s6](src/story/scenes/06.ts#L767) | — | — |
| bekommen | экз. | 1 · 1 · 0 · 1 | [10-s5](src/story/scenes/10.ts#L553) | — | гл. 11 |
| besuchen | экз. | 1 · 1 · 1 · 0 | [11-s2](src/story/scenes/11.ts#L237) | [07](content/a1/07-freizeit.yaml#L64) | — |
| feiern | экз. | 1 · 1 · 0 · 1 | [08-s1](src/story/scenes/08.ts#L96) | — | — |
| gehören | экз. | 1 · 1 · 0 · 1 | [12-s3](src/story/scenes/12.ts#L276) | — | — |
| lachen | экз. | 1 · 1 · 0 · 1 | [09-i1](src/story/scenes/09.ts#L237) | — | — |
| verstehen | экз. | 1 · 1 · 1 · 0 | [07-s6](src/story/scenes/07.ts#L723) | — | — |
| zahlen | экз. | 1 · 1 · 1 · 1 | [02-s6](src/story/scenes/02.ts#L664) | [02](content/a1/02-zahlen.yaml#L1) [04](content/a1/04-essen.yaml#L42) | — |

### Прилагательные и наречия (7)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| billig | 5, экз. | 1 · 1 · 1 · 0 | [05-s1](src/story/scenes/05.ts#L104) | [05](content/a1/05-einkaufen.yaml#L150) [08](content/a1/08-wohnen.yaml#L145) | гл. 5 |
| einfach | экз. | 1 · 1 · 0 · 1 | [09-i1](src/story/scenes/09.ts#L262) | — | — |
| hell | 8, экз. | 1 · 1 · 0 · 0 | [08-s4](src/story/scenes/08.ts#L473) | [08](content/a1/08-wohnen.yaml#L62) | гл. 8 |
| laut | 8, экз. | 1 · 1 · 1 · 0 | [07-i1](src/story/scenes/07.ts#L638) | [08](content/a1/08-wohnen.yaml#L140) | гл. 8 |
| manchmal | 7 | 1 · 1 · 1 · 0 | [07-s2](src/story/scenes/07.ts#L253) | [07](content/a1/07-freizeit.yaml#L161) | гл. 7 |
| oft | 7, экз. | 1 · 1 · 1 · 0 | [07-s2](src/story/scenes/07.ts#L253) | [04](content/a1/04-essen.yaml#L66) [07](content/a1/07-freizeit.yaml#L152) [12](content/a1/12-reisen.yaml#L216) | гл. 7 |
| windig | 12 | 1 · 1 · 0 · 0 | [12-s1](src/story/scenes/12.ts#L37) | [12](content/a1/12-reisen.yaml#L66) | гл. 12 |

### Служебные слова (1)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| man | экз. | 1 · 1 · 0 · 1 | [07-s1](src/story/scenes/07.ts#L38) | [02](content/a1/02-zahlen.yaml#L3) [05](content/a1/05-einkaufen.yaml#L163) | — |

### Выражения (6)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| arbeiten als | 11 | 1 · 1 · 1 · 0 | [11-s6](src/story/scenes/11.ts#L661) | [11](content/a1/11-arbeit.yaml#L129) | гл. 11 |
| Durst haben | 4 | 1 · 1 · 1 · 0 | [04-s5](src/story/scenes/04.ts#L620) | [04](content/a1/04-essen.yaml#L207) | гл. 4 |
| in der Nähe | 9 | 1 · 1 · 1 · 0 | [09-s6](src/story/scenes/09.ts#L753) | [09](content/a1/09-stadt.yaml#L141) | гл. 9 |
| Musik hören | 7 | 1 · 1 · 1 · 1 | [07-s6](src/story/scenes/07.ts#L740) | [07](content/a1/07-freizeit.yaml#L124) | гл. 7 |
| was für ein | экз. | 1 · 1 · 0 · 1 | [10-s6](src/story/scenes/10.ts#L627) | — | — |
| wie viel | экз. | 1 · 1 · 1 · 1 | [08-s6](src/story/scenes/08.ts#L727) | [05](content/a1/05-einkaufen.yaml#L102) [06](content/a1/06-tagesablauf.yaml#L106) [07](content/a1/07-freizeit.yaml#L70) [12](content/a1/12-reisen.yaml#L38) | гл. 6, 8 |

### Числа, время, цвета и другие группы (8)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| braun | экз. | 1 · 1 · 0 · 0 | [05-s2](src/story/scenes/05.ts#L210) | — | — |
| fünfzehn | экз. | 1 · 1 · 1 · 0 | [02-s5](src/story/scenes/02.ts#L582) | [06](content/a1/06-tagesablauf.yaml#L542) [09](content/a1/09-stadt.yaml#L214) | гл. 5 |
| das Grad | экз. | 1 · 1 · 0 · 1 | [12-s1](src/story/scenes/12.ts#L48) | [12](content/a1/12-reisen.yaml#L68) | гл. 12 |
| grün | экз. | 1 · 1 · 0 · 0 | [05-s3](src/story/scenes/05.ts#L289) | — | — |
| der Mai | экз. | 1 · 1 · 1 · 0 | [12-s4](src/story/scenes/12.ts#L445) | [12](content/a1/12-reisen.yaml#L13) | гл. 12 |
| der Mittwoch | 6, экз. | 1 · 1 · 0 · 0 | [10-s1](src/story/scenes/10.ts#L38) | [06](content/a1/06-tagesablauf.yaml#L133) | гл. 6, 10 |
| die Sekunde | экз. | 1 · 1 · 0 · 1 | [05-s6](src/story/scenes/05.ts#L772) | — | — |
| siebzehn | экз. | 1 · 1 · 1 · 0 | [06-s2](src/story/scenes/06.ts#L210) | [02](content/a1/02-zahlen.yaml#L420) [06](content/a1/06-tagesablauf.yaml#L62) | гл. 7, 12 |

## Слова: слабо

353 слов.

### Существительные (188)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| das Abendessen | 4 | 2 · 1 · 1 · 1 | [04-s1](src/story/scenes/04.ts#L106) [04-s6](src/story/scenes/04.ts#L670) | [04](content/a1/04-essen.yaml#L194) | гл. 4 |
| die Abreise | 12 | 2 · 1 · 1 · 1 | [12-s3](src/story/scenes/12.ts#L281) | [12](content/a1/12-reisen.yaml#L112) | гл. 12 |
| die Adresse | 2, экз. | 3 · 1 · 2 · 0 | [08-s4](src/story/scenes/08.ts#L510) [08-s6](src/story/scenes/08.ts#L789) | [02](content/a1/02-zahlen.yaml#L133) | гл. 2 |
| die Ampel | 9 | 20 · 1 · 11 · 5 | [09-s1](src/story/scenes/09.ts#L115) [09-s2](src/story/scenes/09.ts#L198) [09-s3](src/story/scenes/09.ts#L289) | [09](content/a1/09-stadt.yaml#L34) | гл. 9 |
| die Anmeldung (от anmelden) | экз. | 3 · 1 · 1 · 0 | [10-s2](src/story/scenes/10.ts#L137) [10-s6](src/story/scenes/10.ts#L656) | [01](content/a1/01-kennenlernen.yaml#L227) [02](content/a1/02-zahlen.yaml#L27) [11](content/a1/11-arbeit.yaml#L236) | — |
| die Anreise | 12 | 3 · 1 · 2 · 2 | [12-s3](src/story/scenes/12.ts#L281) [12-s6](src/story/scenes/12.ts#L657) | [12](content/a1/12-reisen.yaml#L111) | гл. 12 |
| die Anzeige | 8, 11, экз. | 5 · 2 · 3 · 1 | [08-s3](src/story/scenes/08.ts#L375) [11-s1](src/story/scenes/11.ts#L73) | [05](content/a1/05-einkaufen.yaml#L220) [08](content/a1/08-wohnen.yaml#L26) [11](content/a1/11-arbeit.yaml#L44) | гл. 8 |
| der Apfel | 5, экз. | 24 · 1 · 13 · 9 | [05-s1](src/story/scenes/05.ts#L62) [05-s3](src/story/scenes/05.ts#L289) | [05](content/a1/05-einkaufen.yaml#L23) | гл. 5 |
| die Apotheke | 9, 10 | 8 · 2 · 6 · 2 | [09-s1](src/story/scenes/09.ts#L115) [09-s3](src/story/scenes/09.ts#L292) [09-s6](src/story/scenes/09.ts#L781) [10-s2](src/story/scenes/10.ts#L119) [10-s5](src/story/scenes/10.ts#L487) | [09](content/a1/09-stadt.yaml#L107) [10](content/a1/10-gesundheit.yaml#L117) | гл. 9 |
| der Appetit | экз. | 5 · 3 · 4 · 1 | [04-s5](src/story/scenes/04.ts#L652) [04-s6](src/story/scenes/04.ts#L652) [10-s1](src/story/scenes/10.ts#L71) [11-s4](src/story/scenes/11.ts#L463) | [04](content/a1/04-essen.yaml#L209) | гл. 4 |
| Argentinien | 1 | 8 · 1 · 7 · 3 | [01-s3](src/story/scenes/01.ts#L219) [01-s5](src/story/scenes/01.ts#L486) [01-s6](src/story/scenes/01.ts#L579) | [01](content/a1/01-kennenlernen.yaml#L40) [11](content/a1/11-arbeit.yaml#L213) | гл. 1, 3 |
| der Arm | 10, экз. | 3 · 1 · 3 · 2 | [10-s1](src/story/scenes/10.ts#L53) [10-s3](src/story/scenes/10.ts#L342) | [10](content/a1/10-gesundheit.yaml#L66) | гл. 10 |
| die Ärztin | 11 | 14 · 3 · 10 · 7 | [09-s5](src/story/scenes/09.ts#L628) [09-s6](src/story/scenes/09.ts#L719) [10-s3](src/story/scenes/10.ts#L236) [11-s1](src/story/scenes/11.ts#L76) [11-s2](src/story/scenes/11.ts#L267) [11-s3](src/story/scenes/11.ts#L292) | [10](content/a1/10-gesundheit.yaml#L111) [11](content/a1/11-arbeit.yaml#L34) | гл. 11 |
| das Auge | 10, экз. | 3 · 1 · 2 · 3 | [10-s1](src/story/scenes/10.ts#L53) | [10](content/a1/10-gesundheit.yaml#L83) | гл. 10 |
| das Auto | 9, экз. | 17 · 1 · 7 · 9 | [09-s1](src/story/scenes/09.ts#L58) [09-i1](src/story/scenes/09.ts#L236) [09-s3](src/story/scenes/09.ts#L302) [09-s6](src/story/scenes/09.ts#L753) | [09](content/a1/09-stadt.yaml#L122) | гл. 9 |
| der Automat | экз. | 3 · 1 · 1 · 1 | [09-s2](src/story/scenes/09.ts#L163) [09-s6](src/story/scenes/09.ts#L768) | [09](content/a1/09-stadt.yaml#L235) | — |
| das Bad | 8, экз. | 5 · 1 · 4 · 4 | [08-s1](src/story/scenes/08.ts#L121) [08-s3](src/story/scenes/08.ts#L375) [08-s6](src/story/scenes/08.ts#L790) | [08](content/a1/08-wohnen.yaml#L3) | гл. 8 |
| die Bahn | экз. | 5 · 1 · 4 · 3 | [09-s1](src/story/scenes/09.ts#L77) [09-s6](src/story/scenes/09.ts#L781) | [09](content/a1/09-stadt.yaml#L118) | гл. 9 |
| der Bahnhof | 9, экз. | 4 · 1 · 3 · 2 | [09-s1](src/story/scenes/09.ts#L77) [09-s2](src/story/scenes/09.ts#L137) [09-s6](src/story/scenes/09.ts#L741) | [09](content/a1/09-stadt.yaml#L3) [12](content/a1/12-reisen.yaml#L242) | гл. 9 |
| der Balkon | 8, экз. | 8 · 2 · 6 · 4 | [08-s1](src/story/scenes/08.ts#L121) [08-s3](src/story/scenes/08.ts#L375) [08-s6](src/story/scenes/08.ts#L763) [09-s3](src/story/scenes/09.ts#L302) | [08](content/a1/08-wohnen.yaml#L9) | гл. 8 |
| das Bein | 10, экз. | 2 · 1 · 2 · 1 | [10-s1](src/story/scenes/10.ts#L53) [10-s3](src/story/scenes/10.ts#L342) | [10](content/a1/10-gesundheit.yaml#L92) | гл. 10 |
| der Beruf | 11, экз. | 5 · 1 · 5 · 3 | [11-s5](src/story/scenes/11.ts#L609) [11-s6](src/story/scenes/11.ts#L650) | [01](content/a1/01-kennenlernen.yaml#L218) [11](content/a1/11-arbeit.yaml#L3) | гл. 11 |
| das Bett | 8, экз. | 16 · 3 · 13 · 9 | [08-s2](src/story/scenes/08.ts#L161) [08-s4](src/story/scenes/08.ts#L552) [10-s1](src/story/scenes/10.ts#L27) [10-s2](src/story/scenes/10.ts#L200) [10-s5](src/story/scenes/10.ts#L521) [10-s6](src/story/scenes/10.ts#L30) [12-s1](src/story/scenes/12.ts#L127) | [08](content/a1/08-wohnen.yaml#L110) [10](content/a1/10-gesundheit.yaml#L64) | гл. 8, 10 |
| das Bier | 4, экз. | 10 · 3 · 5 · 5 | [02-s3](src/story/scenes/02.ts#L235) [02-s6](src/story/scenes/02.ts#L661) [04-s3](src/story/scenes/04.ts#L293) [06-s3](src/story/scenes/06.ts#L286) | [02](content/a1/02-zahlen.yaml#L136) [04](content/a1/04-essen.yaml#L128) | гл. 2, 4 |
| der Brief | экз. | 7 · 3 · 1 · 3 | [06-s5](src/story/scenes/06.ts#L611) [06-s6](src/story/scenes/06.ts#L765) [09-s1](src/story/scenes/09.ts#L62) [11-s6](src/story/scenes/11.ts#L678) | [03](content/a1/03-familie.yaml#L219) | гл. 11 |
| der Bruder | 3, экз. | 8 · 2 · 7 · 3 | [03-s4](src/story/scenes/03.ts#L489) [03-s5](src/story/scenes/03.ts#L656) [03-s6](src/story/scenes/03.ts#L805) [04-s3](src/story/scenes/04.ts#L288) | [03](content/a1/03-familie.yaml#L34) [07](content/a1/07-freizeit.yaml#L64) | гл. 3, 4 |
| die Butter | экз. | 5 · 2 · 3 · 4 | [03-s3](src/story/scenes/03.ts#L277) [04-i1](src/story/scenes/04.ts#L393) [04-s5](src/story/scenes/04.ts#L634) | — | — |
| die Cola | 4 | 34 · 1 · 19 · 13 | [04-s1](src/story/scenes/04.ts#L63) [04-s2](src/story/scenes/04.ts#L215) [04-s3](src/story/scenes/04.ts#L293) [04-s4](src/story/scenes/04.ts#L448) | [04](content/a1/04-essen.yaml#L112) | гл. 4 |
| der Cousin | 3 | 4 · 1 · 4 · 1 | [03-s4](src/story/scenes/03.ts#L489) | [03](content/a1/03-familie.yaml#L115) | гл. 3 |
| die Cousine | 3 | 4 · 1 · 4 · 1 | [03-s4](src/story/scenes/03.ts#L489) | [03](content/a1/03-familie.yaml#L116) | гл. 3 |
| Dänemark | 1 | 3 · 1 · 2 · 1 | [01-s2](src/story/scenes/01.ts#L209) [01-s5](src/story/scenes/01.ts#L516) [01-s6](src/story/scenes/01.ts#L644) | [01](content/a1/01-kennenlernen.yaml#L133) [09](content/a1/09-stadt.yaml#L368) [12](content/a1/12-reisen.yaml#L651) | гл. 1 |
| der Doktor | экз. | 12 · 1 · 2 · 6 | [10-s1](src/story/scenes/10.ts#L85) [10-s2](src/story/scenes/10.ts#L119) [10-s3](src/story/scenes/10.ts#L319) [10-s4](src/story/scenes/10.ts#L370) [10-s6](src/story/scenes/10.ts#L592) | [11](content/a1/11-arbeit.yaml#L36) | — |
| der Döner | 4 | 11 · 1 · 4 · 6 | [04-s1](src/story/scenes/04.ts#L75) [04-s6](src/story/scenes/04.ts#L672) | [04](content/a1/04-essen.yaml#L112) | гл. 4 |
| die Dose | 5 | 10 · 6 · 4 · 0 | [02-s6](src/story/scenes/02.ts#L697) [03-s2](src/story/scenes/03.ts#L223) [03-i1](src/story/scenes/03.ts#L223) [05-s2](src/story/scenes/05.ts#L213) [05-i1](src/story/scenes/05.ts#L432) [06-i1](src/story/scenes/06.ts#L455) [09-s5](src/story/scenes/09.ts#L591) [11-i1](src/story/scenes/11.ts#L147) | [05](content/a1/05-einkaufen.yaml#L111) | гл. 5 |
| die Einladung (от einladen) | 7, экз. | 3 · 1 · 3 · 3 | [07-s2](src/story/scenes/07.ts#L250) [07-s6](src/story/scenes/07.ts#L728) | [07](content/a1/07-freizeit.yaml#L177) | гл. 7 |
| das Einzelzimmer | 12, экз. | 4 · 1 · 3 · 2 | [12-s1](src/story/scenes/12.ts#L127) [12-s3](src/story/scenes/12.ts#L281) | [12](content/a1/12-reisen.yaml#L36) | гл. 12 |
| die Eltern | 3, экз. | 6 · 1 · 6 · 3 | [03-s3](src/story/scenes/03.ts#L277) [03-s4](src/story/scenes/03.ts#L574) [03-s5](src/story/scenes/03.ts#L656) [03-s6](src/story/scenes/03.ts#L779) | [03](content/a1/03-familie.yaml#L32) | гл. 3 |
| das Ende (от enden) | экз. | 8 · 3 · 5 · 5 | [06-s2](src/story/scenes/06.ts#L252) [06-i1](src/story/scenes/06.ts#L446) [06-s6](src/story/scenes/06.ts#L787) [07-s6](src/story/scenes/07.ts#L691) [11-s1](src/story/scenes/11.ts#L63) | [02](content/a1/02-zahlen.yaml#L597) [06](content/a1/06-tagesablauf.yaml#L72) [07](content/a1/07-freizeit.yaml#L23) [12](content/a1/12-reisen.yaml#L147) | гл. 6, 7 |
| der Enkel | 3 | 10 · 2 · 6 · 7 | [03-s4](src/story/scenes/03.ts#L516) [03-s5](src/story/scenes/03.ts#L600) [11-s3](src/story/scenes/11.ts#L292) | [03](content/a1/03-familie.yaml#L117) | гл. 3 |
| die Enkelin | 3 | 9 · 2 · 5 · 6 | [03-s5](src/story/scenes/03.ts#L600) [11-s3](src/story/scenes/11.ts#L292) | [03](content/a1/03-familie.yaml#L118) | гл. 3 |
| das Erdgeschoss | 8 | 13 · 2 · 8 · 3 | [08-i1](src/story/scenes/08.ts#L272) [08-s3](src/story/scenes/08.ts#L324) [08-s4](src/story/scenes/08.ts#L552) [08-s5](src/story/scenes/08.ts#L667) [08-s6](src/story/scenes/08.ts#L763) [10-s2](src/story/scenes/10.ts#L119) [10-s5](src/story/scenes/10.ts#L487) | [08](content/a1/08-wohnen.yaml#L165) | гл. 8 |
| die Erkältung | 10 | 5 · 1 · 3 · 2 | [10-s1](src/story/scenes/10.ts#L39) [10-s3](src/story/scenes/10.ts#L342) [10-s6](src/story/scenes/10.ts#L666) | [10](content/a1/10-gesundheit.yaml#L100) | гл. 10 |
| die Fahrkarte | 9, 12, экз. | 14 · 3 · 6 · 7 | [08-s5](src/story/scenes/08.ts#L579) [08-s6](src/story/scenes/08.ts#L752) [09-s2](src/story/scenes/09.ts#L163) [09-s6](src/story/scenes/09.ts#L695) [12-s2](src/story/scenes/12.ts#L252) | [09](content/a1/09-stadt.yaml#L126) [12](content/a1/12-reisen.yaml#L95) | гл. 9 |
| die Familie | 3, экз. | 13 · 1 · 6 · 6 | [03-s1](src/story/scenes/03.ts#L30) [03-s2](src/story/scenes/03.ts#L153) [03-s3](src/story/scenes/03.ts#L398) [03-s4](src/story/scenes/03.ts#L473) [03-s5](src/story/scenes/03.ts#L654) [03-s6](src/story/scenes/03.ts#L776) | [03](content/a1/03-familie.yaml#L1) | гл. 3 |
| der Familienname (от die Familie) | 1, экз. | 5 · 2 · 5 · 2 | [01-s4](src/story/scenes/01.ts#L427) [02-s6](src/story/scenes/02.ts#L664) | [01](content/a1/01-kennenlernen.yaml#L120) [02](content/a1/02-zahlen.yaml#L247) [11](content/a1/11-arbeit.yaml#L240) [12](content/a1/12-reisen.yaml#L230) | гл. 1 |
| der Familienstand (от die Familie) | экз. | 3 · 1 · 2 · 0 | [03-s3](src/story/scenes/03.ts#L277) | [03](content/a1/03-familie.yaml#L133) | — |
| der Feierabend | 6 | 13 · 1 · 9 · 7 | [06-s1](src/story/scenes/06.ts#L117) [06-s3](src/story/scenes/06.ts#L286) [06-s4](src/story/scenes/06.ts#L524) [06-s5](src/story/scenes/06.ts#L671) [06-s6](src/story/scenes/06.ts#L704) | [06](content/a1/06-tagesablauf.yaml#L68) | гл. 6 |
| das Fieber | 10, экз. | 6 · 1 · 4 · 3 | [10-s1](src/story/scenes/10.ts#L27) [10-s3](src/story/scenes/10.ts#L342) [10-s6](src/story/scenes/10.ts#L666) | [10](content/a1/10-gesundheit.yaml#L38) | гл. 10 |
| der Film | 7, экз. | 8 · 2 · 3 · 5 | [06-s4](src/story/scenes/06.ts#L523) [07-s1](src/story/scenes/07.ts#L37) [07-i1](src/story/scenes/07.ts#L635) [07-s6](src/story/scenes/07.ts#L728) | [07](content/a1/07-freizeit.yaml#L144) [09](content/a1/09-stadt.yaml#L91) | гл. 7 |
| die Firma | 11, экз. | 9 · 1 · 7 · 5 | [11-s1](src/story/scenes/11.ts#L96) [11-s2](src/story/scenes/11.ts#L267) [11-s3](src/story/scenes/11.ts#L292) [11-s5](src/story/scenes/11.ts#L609) [11-s6](src/story/scenes/11.ts#L679) | [11](content/a1/11-arbeit.yaml#L124) | гл. 11 |
| der Fisch | 4, экз. | 9 · 2 · 6 · 3 | [04-s1](src/story/scenes/04.ts#L106) [04-s3](src/story/scenes/04.ts#L293) [04-s6](src/story/scenes/04.ts#L744) [07-s3](src/story/scenes/07.ts#L286) | [04](content/a1/04-essen.yaml#L153) [11](content/a1/11-arbeit.yaml#L40) | гл. 4 |
| das Fleisch | 4, экз. | 3 · 1 · 2 · 1 | [04-s6](src/story/scenes/04.ts#L673) | [04](content/a1/04-essen.yaml#L62) [11](content/a1/11-arbeit.yaml#L70) | гл. 4 |
| der Flur | 8 | 5 · 1 · 2 · 2 | [08-s1](src/story/scenes/08.ts#L121) [08-s5](src/story/scenes/08.ts#L579) [08-s6](src/story/scenes/08.ts#L763) | [08](content/a1/08-wohnen.yaml#L60) | гл. 8 |
| das Formular | экз. | 13 · 3 · 2 · 6 | [02-s3](src/story/scenes/02.ts#L235) [02-s6](src/story/scenes/02.ts#L660) [07-s2](src/story/scenes/07.ts#L249) [07-s3](src/story/scenes/07.ts#L286) [08-s1](src/story/scenes/08.ts#L97) [08-s6](src/story/scenes/08.ts#L704) | [01](content/a1/01-kennenlernen.yaml#L235) [11](content/a1/11-arbeit.yaml#L233) [12](content/a1/12-reisen.yaml#L228) | — |
| die Freizeit | 7, экз. | 3 · 1 · 3 · 3 | [07-s2](src/story/scenes/07.ts#L250) [07-s3](src/story/scenes/07.ts#L404) [07-s6](src/story/scenes/07.ts#L691) | [07](content/a1/07-freizeit.yaml#L1) | гл. 7 |
| der Freund | 3, экз. | 17 · 2 · 7 · 8 | [03-s2](src/story/scenes/03.ts#L219) [03-s3](src/story/scenes/03.ts#L399) [03-s4](src/story/scenes/03.ts#L461) [03-s6](src/story/scenes/03.ts#L753) | [01](content/a1/01-kennenlernen.yaml#L232) [03](content/a1/03-familie.yaml#L128) [04](content/a1/04-essen.yaml#L96) [05](content/a1/05-einkaufen.yaml#L256) [06](content/a1/06-tagesablauf.yaml#L610) [07](content/a1/07-freizeit.yaml#L128) [09](content/a1/09-stadt.yaml#L156) [12](content/a1/12-reisen.yaml#L225) | гл. 3, 7 |
| die Freundin | 3 | 5 · 1 · 2 · 2 | [03-s4](src/story/scenes/03.ts#L461) | [01](content/a1/01-kennenlernen.yaml#L232) [03](content/a1/03-familie.yaml#L129) [07](content/a1/07-freizeit.yaml#L238) | гл. 3 |
| der Fuß | 10, экз. | 8 · 3 · 7 · 3 | [09-s6](src/story/scenes/09.ts#L753) [10-s1](src/story/scenes/10.ts#L53) [10-s3](src/story/scenes/10.ts#L236) [12-s3](src/story/scenes/12.ts#L281) | [09](content/a1/09-stadt.yaml#L42) [10](content/a1/10-gesundheit.yaml#L93) | гл. 9, 10 |
| der Fußball | экз. | 4 · 1 · 3 · 3 | [07-s3](src/story/scenes/07.ts#L381) [07-s6](src/story/scenes/07.ts#L718) | [07](content/a1/07-freizeit.yaml#L115) | гл. 7 |
| der Gast | 3, экз. | 4 · 2 · 1 · 1 | [01-s3](src/story/scenes/01.ts#L371) [03-i1](src/story/scenes/03.ts#L419) [03-s5](src/story/scenes/03.ts#L646) | [03](content/a1/03-familie.yaml#L142) [08](content/a1/08-wohnen.yaml#L27) [09](content/a1/09-stadt.yaml#L64) [11](content/a1/11-arbeit.yaml#L197) | гл. 3, 9 |
| das Gemüse | 4, экз. | 8 · 2 · 6 · 2 | [04-i1](src/story/scenes/04.ts#L409) [09-s3](src/story/scenes/09.ts#L302) | [04](content/a1/04-essen.yaml#L156) [05](content/a1/05-einkaufen.yaml#L114) | гл. 4 |
| das Geschenk | экз. | 2 · 1 · 0 · 1 | [05-s4](src/story/scenes/05.ts#L462) | — | — |
| die Geschwister | 3, экз. | 9 · 1 · 6 · 5 | [03-s2](src/story/scenes/03.ts#L173) [03-s4](src/story/scenes/03.ts#L516) [03-s6](src/story/scenes/03.ts#L779) | [03](content/a1/03-familie.yaml#L54) | гл. 3 |
| das Gespräch | экз. | 4 · 1 · 2 · 4 | [11-s1](src/story/scenes/11.ts#L96) [11-s4](src/story/scenes/11.ts#L27) | [09](content/a1/09-stadt.yaml#L222) [11](content/a1/11-arbeit.yaml#L48) | гл. 11 |
| das Glas | 4, экз. | 4 · 1 · 3 · 0 | [04-s2](src/story/scenes/04.ts#L162) [04-s4](src/story/scenes/04.ts#L485) [04-s6](src/story/scenes/04.ts#L705) | [04](content/a1/04-essen.yaml#L72) | гл. 4 |
| die Größe (от groß) | 5, экз. | 15 · 1 · 8 · 7 | [05-s1](src/story/scenes/05.ts#L54) [05-s2](src/story/scenes/05.ts#L154) [05-s3](src/story/scenes/05.ts#L415) [05-s4](src/story/scenes/05.ts#L463) [05-s5](src/story/scenes/05.ts#L631) [05-s6](src/story/scenes/05.ts#L695) | [05](content/a1/05-einkaufen.yaml#L63) | гл. 5 |
| die Großeltern | 3, экз. | 3 · 1 · 3 · 1 | [03-s3](src/story/scenes/03.ts#L277) [03-s4](src/story/scenes/03.ts#L584) | [03](content/a1/03-familie.yaml#L107) | гл. 3 |
| der Gruß | экз. | 12 · 12 · 12 · 0 | [01-s5](src/story/scenes/01.ts#L547) [02-s5](src/story/scenes/02.ts#L582) [03-s5](src/story/scenes/03.ts#L672) [04-s5](src/story/scenes/04.ts#L620) [05-s5](src/story/scenes/05.ts#L631) [06-s5](src/story/scenes/06.ts#L615) [07-s5](src/story/scenes/07.ts#L589) [08-s5](src/story/scenes/08.ts#L671) | [03](content/a1/03-familie.yaml#L230) [07](content/a1/07-freizeit.yaml#L229) [10](content/a1/10-gesundheit.yaml#L201) [12](content/a1/12-reisen.yaml#L80) | гл. 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 |
| die Gurke | 5 | 3 · 1 · 3 · 1 | [05-s3](src/story/scenes/05.ts#L302) | [05](content/a1/05-einkaufen.yaml#L124) | гл. 5 |
| der Hals | 10 | 9 · 1 · 5 · 5 | [10-s1](src/story/scenes/10.ts#L39) [10-s3](src/story/scenes/10.ts#L236) [10-s4](src/story/scenes/10.ts#L28) [10-s6](src/story/scenes/10.ts#L666) | [10](content/a1/10-gesundheit.yaml#L60) | гл. 10 |
| die Haltestelle | 9, экз. | 7 · 2 · 4 · 3 | [09-s1](src/story/scenes/09.ts#L89) [09-s2](src/story/scenes/09.ts#L197) [09-s3](src/story/scenes/09.ts#L289) [09-s6](src/story/scenes/09.ts#L789) [12-s2](src/story/scenes/12.ts#L170) | [09](content/a1/09-stadt.yaml#L68) | гл. 9 |
| die Handynummer | 2 | 4 · 1 · 3 · 1 | [02-s1](src/story/scenes/02.ts#L74) [02-s2](src/story/scenes/02.ts#L156) [02-s6](src/story/scenes/02.ts#L664) | [02](content/a1/02-zahlen.yaml#L132) | гл. 2 |
| die Hausnummer | 2 | 2 · 1 · 2 · 1 | [02-s3](src/story/scenes/02.ts#L235) | [02](content/a1/02-zahlen.yaml#L134) | гл. 2 |
| das Hemd | 5 | 13 · 1 · 7 · 7 | [05-s1](src/story/scenes/05.ts#L54) [05-s2](src/story/scenes/05.ts#L175) [05-s4](src/story/scenes/05.ts#L544) [05-s6](src/story/scenes/05.ts#L697) | [05](content/a1/05-einkaufen.yaml#L133) | гл. 5 |
| der Herd | 8, экз. | 3 · 1 · 3 · 1 | [08-s2](src/story/scenes/08.ts#L161) [08-s4](src/story/scenes/08.ts#L552) | [08](content/a1/08-wohnen.yaml#L68) | гл. 8 |
| die Hilfe | экз. | 5 · 4 · 3 · 3 | [06-s3](src/story/scenes/06.ts#L286) [07-s5](src/story/scenes/07.ts#L589) [08-s3](src/story/scenes/08.ts#L354) [10-s2](src/story/scenes/10.ts#L169) | [01](content/a1/01-kennenlernen.yaml#L234) [10](content/a1/10-gesundheit.yaml#L68) | — |
| das Hobby | 7, экз. | 6 · 2 · 5 · 3 | [03-s3](src/story/scenes/03.ts#L277) [07-s1](src/story/scenes/07.ts#L79) [07-s2](src/story/scenes/07.ts#L250) [07-s3](src/story/scenes/07.ts#L404) [07-s4](src/story/scenes/07.ts#L504) | [01](content/a1/01-kennenlernen.yaml#L218) [07](content/a1/07-freizeit.yaml#L99) [11](content/a1/11-arbeit.yaml#L209) | гл. 7 |
| die Hose | 5 | 29 · 1 · 18 · 16 | [05-s1](src/story/scenes/05.ts#L41) [05-s2](src/story/scenes/05.ts#L147) | [05](content/a1/05-einkaufen.yaml#L130) | гл. 5 |
| das Hotel | 12, экз. | 18 · 1 · 10 · 6 | [12-s1](src/story/scenes/12.ts#L26) [12-s2](src/story/scenes/12.ts#L215) [12-s3](src/story/scenes/12.ts#L266) [12-s5](src/story/scenes/12.ts#L476) | [12](content/a1/12-reisen.yaml#L26) | гл. 12 |
| der Hund | 3, экз. | 12 · 1 · 8 · 5 | [03-s1](src/story/scenes/03.ts#L66) [03-s2](src/story/scenes/03.ts#L195) [03-s3](src/story/scenes/03.ts#L398) [03-s4](src/story/scenes/03.ts#L474) | [03](content/a1/03-familie.yaml#L42) | гл. 3 |
| die Idee | 7 | 8 · 1 · 3 · 5 | [07-s1](src/story/scenes/07.ts#L38) [07-s3](src/story/scenes/07.ts#L404) [07-s4](src/story/scenes/07.ts#L437) [07-s5](src/story/scenes/07.ts#L525) | [07](content/a1/07-freizeit.yaml#L70) | гл. 7 |
| der Junge | 3, экз. | 11 · 2 · 6 · 5 | [03-s1](src/story/scenes/03.ts#L30) [03-i1](src/story/scenes/03.ts#L419) [11-i1](src/story/scenes/11.ts#L147) [11-s3](src/story/scenes/11.ts#L292) | [03](content/a1/03-familie.yaml#L62) | гл. 3 |
| die Kaltmiete | 8 | 3 · 1 · 3 · 0 | [08-s2](src/story/scenes/08.ts#L247) [08-s3](src/story/scenes/08.ts#L375) | [08](content/a1/08-wohnen.yaml#L44) | гл. 8 |
| Kasachstan | 1 | 9 · 1 · 8 · 3 | [01-s1](src/story/scenes/01.ts#L19) [01-s2](src/story/scenes/01.ts#L209) [01-s3](src/story/scenes/01.ts#L219) | [01](content/a1/01-kennenlernen.yaml#L42) [03](content/a1/03-familie.yaml#L30) [07](content/a1/07-freizeit.yaml#L256) [11](content/a1/11-arbeit.yaml#L34) | гл. 1 |
| der Käse | 4 | 2 · 1 · 2 · 1 | [04-s1](src/story/scenes/04.ts#L100) [04-s6](src/story/scenes/04.ts#L705) | [04](content/a1/04-essen.yaml#L64) [05](content/a1/05-einkaufen.yaml#L107) | гл. 4, 5 |
| die Katze | 3 | 2 · 1 · 2 · 0 | [03-s4](src/story/scenes/03.ts#L477) | [03](content/a1/03-familie.yaml#L131) | гл. 3 |
| der Kellner | 4, 11 | 9 · 2 · 5 · 2 | [04-s2](src/story/scenes/04.ts#L162) [04-s4](src/story/scenes/04.ts#L479) [11-s1](src/story/scenes/11.ts#L129) [11-s2](src/story/scenes/11.ts#L267) [11-s4](src/story/scenes/11.ts#L441) | [04](content/a1/04-essen.yaml#L28) [11](content/a1/11-arbeit.yaml#L74) | гл. 4, 11 |
| die Kellnerin | 11 | 2 · 1 · 2 · 1 | [11-s1](src/story/scenes/11.ts#L129) [11-s2](src/story/scenes/11.ts#L267) | [04](content/a1/04-essen.yaml#L187) [11](content/a1/11-arbeit.yaml#L95) | гл. 11 |
| das Kind | 3, экз. | 21 · 3 · 13 · 10 | [03-s1](src/story/scenes/03.ts#L30) [03-s2](src/story/scenes/03.ts#L163) [03-s3](src/story/scenes/03.ts#L398) [03-s4](src/story/scenes/03.ts#L527) [03-s6](src/story/scenes/03.ts#L779) [11-s1](src/story/scenes/11.ts#L76) [11-s6](src/story/scenes/11.ts#L637) | [01](content/a1/01-kennenlernen.yaml#L214) [02](content/a1/02-zahlen.yaml#L243) [03](content/a1/03-familie.yaml#L100) [04](content/a1/04-essen.yaml#L274) [05](content/a1/05-einkaufen.yaml#L209) [06](content/a1/06-tagesablauf.yaml#L191) [07](content/a1/07-freizeit.yaml#L218) [08](content/a1/08-wohnen.yaml#L255) [09](content/a1/09-stadt.yaml#L208) [10](content/a1/10-gesundheit.yaml#L178) [11](content/a1/11-arbeit.yaml#L188) [12](content/a1/12-reisen.yaml#L194) | гл. 3 |
| das Kino | 7, экз. | 17 · 1 · 11 · 8 | [07-s1](src/story/scenes/07.ts#L38) [07-s2](src/story/scenes/07.ts#L170) [07-s4](src/story/scenes/07.ts#L507) [07-s5](src/story/scenes/07.ts#L530) [07-i1](src/story/scenes/07.ts#L637) [07-s6](src/story/scenes/07.ts#L691) | [07](content/a1/07-freizeit.yaml#L131) [08](content/a1/08-wohnen.yaml#L694) [09](content/a1/09-stadt.yaml#L87) | гл. 7 |
| der Kiosk | экз. | 12 · 3 · 7 · 0 | [06-s2](src/story/scenes/06.ts#L159) [06-s3](src/story/scenes/06.ts#L420) [06-s5](src/story/scenes/06.ts#L615) [06-s6](src/story/scenes/06.ts#L712) [07-s3](src/story/scenes/07.ts#L286) [08-i1](src/story/scenes/08.ts#L268) [08-s6](src/story/scenes/08.ts#L774) | [01](content/a1/01-kennenlernen.yaml#L598) | — |
| das Kleid | 5 | 3 · 1 · 3 · 2 | [05-s1](src/story/scenes/05.ts#L99) [05-s4](src/story/scenes/05.ts#L545) [05-s6](src/story/scenes/05.ts#L796) | [05](content/a1/05-einkaufen.yaml#L50) [08](content/a1/08-wohnen.yaml#L117) | гл. 5 |
| die Köchin | 11 | 5 · 1 · 5 · 3 | [11-s1](src/story/scenes/11.ts#L129) [11-s2](src/story/scenes/11.ts#L267) [11-s4](src/story/scenes/11.ts#L438) [11-s6](src/story/scenes/11.ts#L691) | [11](content/a1/11-arbeit.yaml#L91) | гл. 11 |
| der Koffer | 12, экз. | 5 · 1 · 4 · 4 | [12-s1](src/story/scenes/12.ts#L69) [12-s2](src/story/scenes/12.ts#L252) [12-s3](src/story/scenes/12.ts#L266) [12-s6](src/story/scenes/12.ts#L657) | [12](content/a1/12-reisen.yaml#L99) | гл. 12 |
| das Konzert | 7 | 3 · 1 · 3 · 2 | [07-s2](src/story/scenes/07.ts#L253) [07-s6](src/story/scenes/07.ts#L728) | [07](content/a1/07-freizeit.yaml#L146) | гл. 7 |
| der Kopf | 10, экз. | 11 · 1 · 9 · 6 | [10-s1](src/story/scenes/10.ts#L39) [10-s2](src/story/scenes/10.ts#L215) [10-s3](src/story/scenes/10.ts#L236) [10-s6](src/story/scenes/10.ts#L651) | [10](content/a1/10-gesundheit.yaml#L82) | гл. 10 |
| das Krankenhaus | 9, 11 | 14 · 3 · 10 · 6 | [09-s1](src/story/scenes/09.ts#L27) [09-s3](src/story/scenes/09.ts#L302) [09-s5](src/story/scenes/09.ts#L675) [09-s6](src/story/scenes/09.ts#L753) [10-s2](src/story/scenes/10.ts#L200) [11-s1](src/story/scenes/11.ts#L76) | [09](content/a1/09-stadt.yaml#L111) [11](content/a1/11-arbeit.yaml#L34) | гл. 9, 11 |
| der Kühlschrank | 8, экз. | 5 · 2 · 2 · 4 | [08-s1](src/story/scenes/08.ts#L127) [08-s2](src/story/scenes/08.ts#L161) [11-s5](src/story/scenes/11.ts#L589) [11-s6](src/story/scenes/11.ts#L666) | [08](content/a1/08-wohnen.yaml#L68) | гл. 8 |
| die Lampe | 8 | 7 · 3 · 5 · 3 | [01-s6](src/story/scenes/01.ts#L637) [08-s1](src/story/scenes/08.ts#L84) [08-s2](src/story/scenes/08.ts#L161) [08-s6](src/story/scenes/08.ts#L763) [11-s2](src/story/scenes/11.ts#L185) | [08](content/a1/08-wohnen.yaml#L133) | гл. 8 |
| der Lehrer | 11, экз. | 4 · 1 · 4 · 1 | [11-s1](src/story/scenes/11.ts#L76) [11-s2](src/story/scenes/11.ts#L267) [11-s6](src/story/scenes/11.ts#L661) | [11](content/a1/11-arbeit.yaml#L86) | гл. 11 |
| die Leute | экз. | 5 · 4 · 4 · 1 | [06-s5](src/story/scenes/06.ts#L615) [07-s5](src/story/scenes/07.ts#L589) [08-s5](src/story/scenes/08.ts#L671) [09-s3](src/story/scenes/09.ts#L302) | [03](content/a1/03-familie.yaml#L119) | — |
| das Licht | экз. | 3 · 2 · 1 · 2 | [06-s6](src/story/scenes/06.ts#L767) [10-s3](src/story/scenes/10.ts#L236) | — | гл. 8, 9 |
| das Lied | экз. | 3 · 1 · 2 · 1 | [11-s3](src/story/scenes/11.ts#L292) [11-s5](src/story/scenes/11.ts#L595) | — | — |
| das Mädchen | 3, экз. | 5 · 1 · 3 · 2 | [03-s1](src/story/scenes/03.ts#L66) [03-s3](src/story/scenes/03.ts#L398) [03-i1](src/story/scenes/03.ts#L419) [03-s4](src/story/scenes/03.ts#L460) | [03](content/a1/03-familie.yaml#L62) | гл. 3 |
| der Mantel | 5 | 3 · 1 · 3 · 1 | [05-s2](src/story/scenes/05.ts#L251) [05-s4](src/story/scenes/05.ts#L545) [05-s6](src/story/scenes/05.ts#L796) | [05](content/a1/05-einkaufen.yaml#L132) | гл. 5 |
| der Mechaniker | 11 | 10 · 2 · 6 · 5 | [09-s5](src/story/scenes/09.ts#L32) [11-s1](src/story/scenes/11.ts#L129) [11-s2](src/story/scenes/11.ts#L211) [11-s3](src/story/scenes/11.ts#L292) [11-s6](src/story/scenes/11.ts#L691) | [11](content/a1/11-arbeit.yaml#L108) | гл. 11 |
| das Medikament | 10 | 7 · 1 · 4 · 4 | [10-s1](src/story/scenes/10.ts#L57) [10-s5](src/story/scenes/10.ts#L490) | [10](content/a1/10-gesundheit.yaml#L119) | гл. 10 |
| die Miete (от mieten) | 8, экз. | 4 · 1 · 4 · 0 | [08-s2](src/story/scenes/08.ts#L247) [08-s3](src/story/scenes/08.ts#L375) [08-s4](src/story/scenes/08.ts#L552) | [08](content/a1/08-wohnen.yaml#L44) | гл. 8 |
| die Milch | 4, экз. | 7 · 1 · 5 · 5 | [04-s2](src/story/scenes/04.ts#L172) [04-s3](src/story/scenes/04.ts#L381) [04-i1](src/story/scenes/04.ts#L393) [04-s6](src/story/scenes/04.ts#L772) | [04](content/a1/04-essen.yaml#L91) [05](content/a1/05-einkaufen.yaml#L108) | гл. 4 |
| der Moment | экз. | 2 · 2 · 0 · 2 | [03-s2](src/story/scenes/03.ts#L191) [05-s4](src/story/scenes/05.ts#L508) | — | — |
| die Mutter | 3, экз. | 21 · 1 · 12 · 8 | [03-s1](src/story/scenes/03.ts#L66) [03-s2](src/story/scenes/03.ts#L154) [03-s3](src/story/scenes/03.ts#L277) [03-i1](src/story/scenes/03.ts#L419) [03-s4](src/story/scenes/03.ts#L474) | [03](content/a1/03-familie.yaml#L32) | гл. 3 |
| die Nase | 10 | 5 · 1 · 4 · 3 | [10-s1](src/story/scenes/10.ts#L38) [10-s3](src/story/scenes/10.ts#L342) [10-s6](src/story/scenes/10.ts#L666) | [10](content/a1/10-gesundheit.yaml#L85) | гл. 10 |
| die Nebenkosten | 8 | 2 · 1 · 2 · 0 | [08-s3](src/story/scenes/08.ts#L375) | [08](content/a1/08-wohnen.yaml#L40) | гл. 8 |
| das Obst | экз. | 2 · 1 · 2 · 0 | [07-s3](src/story/scenes/07.ts#L286) | [05](content/a1/05-einkaufen.yaml#L114) | — |
| das Ohr | 10 | 3 · 1 · 2 · 3 | [10-s1](src/story/scenes/10.ts#L53) | [10](content/a1/10-gesundheit.yaml#L84) | гл. 10 |
| die Oma | 3, экз. | 34 · 3 · 16 · 13 | [03-s1](src/story/scenes/03.ts#L35) [03-s2](src/story/scenes/03.ts#L219) [03-s3](src/story/scenes/03.ts#L277) | [03](content/a1/03-familie.yaml#L112) | гл. 3 |
| der Onkel | 3 | 3 · 1 · 3 · 1 | [03-s4](src/story/scenes/03.ts#L489) | [03](content/a1/03-familie.yaml#L64) | гл. 3 |
| die Packung | 5 | 20 · 3 · 9 · 2 | [05-s3](src/story/scenes/05.ts#L302) [05-s4](src/story/scenes/05.ts#L464) [05-s5](src/story/scenes/05.ts#L660) [05-s6](src/story/scenes/05.ts#L711) | [05](content/a1/05-einkaufen.yaml#L110) | гл. 5 |
| der Park | 7 | 3 · 1 · 3 · 2 | [07-s3](src/story/scenes/07.ts#L404) [07-s4](src/story/scenes/07.ts#L507) [07-s6](src/story/scenes/07.ts#L728) | [07](content/a1/07-freizeit.yaml#L148) | гл. 7 |
| der Pass | экз. | 3 · 1 · 2 · 1 | [06-s2](src/story/scenes/06.ts#L214) [06-s5](src/story/scenes/06.ts#L615) | [07](content/a1/07-freizeit.yaml#L173) | гл. 7 |
| die Pause | 2, экз. | 10 · 2 · 4 · 4 | [02-s1](src/story/scenes/02.ts#L74) [02-s2](src/story/scenes/02.ts#L145) [02-s3](src/story/scenes/02.ts#L369) [02-s4](src/story/scenes/02.ts#L425) [02-s6](src/story/scenes/02.ts#L749) [03-s6](src/story/scenes/03.ts#L748) | [02](content/a1/02-zahlen.yaml#L75) [11](content/a1/11-arbeit.yaml#L24) | гл. 2 |
| der Plan | экз. | 6 · 2 · 2 · 2 | [09-s1](src/story/scenes/09.ts#L74) [09-s6](src/story/scenes/09.ts#L768) [11-s6](src/story/scenes/11.ts#L681) | [06](content/a1/06-tagesablauf.yaml#L645) [07](content/a1/07-freizeit.yaml#L271) [09](content/a1/09-stadt.yaml#L242) [10](content/a1/10-gesundheit.yaml#L220) [11](content/a1/11-arbeit.yaml#L801) [12](content/a1/12-reisen.yaml#L251) | гл. 6, 12 |
| die Post | 9, экз. | 37 · 2 · 19 · 15 | [02-s3](src/story/scenes/02.ts#L235) [09-s1](src/story/scenes/09.ts#L27) [09-s2](src/story/scenes/09.ts#L198) [09-i1](src/story/scenes/09.ts#L251) | [09](content/a1/09-stadt.yaml#L105) | гл. 9 |
| die Postleitzahl | 2, экз. | 4 · 1 · 2 · 3 | [02-s3](src/story/scenes/02.ts#L235) | [02](content/a1/02-zahlen.yaml#L135) | гл. 2 |
| die Praxis | 10, экз. | 8 · 1 · 6 · 5 | [10-s1](src/story/scenes/10.ts#L85) [10-s2](src/story/scenes/10.ts#L136) [10-s3](src/story/scenes/10.ts#L342) [10-s5](src/story/scenes/10.ts#L519) [10-s6](src/story/scenes/10.ts#L666) | [10](content/a1/10-gesundheit.yaml#L24) | гл. 9, 10 |
| die Prüfung | 2, экз. | 2 · 1 · 2 · 1 | [02-s2](src/story/scenes/02.ts#L127) [02-s5](src/story/scenes/02.ts#L646) | [02](content/a1/02-zahlen.yaml#L36) | гл. 2 |
| der Pullover | 5 | 4 · 1 · 4 · 2 | [05-s2](src/story/scenes/05.ts#L175) [05-s4](src/story/scenes/05.ts#L545) [05-s6](src/story/scenes/05.ts#L796) | [05](content/a1/05-einkaufen.yaml#L51) | гл. 4, 5 |
| der Raum | 2, экз. | 19 · 2 · 8 · 10 | [02-s5](src/story/scenes/02.ts#L544) [12-s1](src/story/scenes/12.ts#L107) [12-s3](src/story/scenes/12.ts#L278) | [02](content/a1/02-zahlen.yaml#L57) [06](content/a1/06-tagesablauf.yaml#L154) | гл. 2 |
| die Rechnung | 4, экз. | 8 · 1 · 5 · 0 | [04-s2](src/story/scenes/04.ts#L227) [04-s3](src/story/scenes/04.ts#L293) [04-s4](src/story/scenes/04.ts#L485) [04-s5](src/story/scenes/04.ts#L546) [04-s6](src/story/scenes/04.ts#L773) | [04](content/a1/04-essen.yaml#L191) | гл. 4, 5 |
| der Regenschirm | 12 | 4 · 1 · 4 · 2 | [12-s1](src/story/scenes/12.ts#L40) [12-s6](src/story/scenes/12.ts#L657) | [12](content/a1/12-reisen.yaml#L70) | гл. 12 |
| der Reis | экз. | 3 · 1 · 3 · 3 | [12-s2](src/story/scenes/12.ts#L252) [12-s6](src/story/scenes/12.ts#L657) | [05](content/a1/05-einkaufen.yaml#L110) [12](content/a1/12-reisen.yaml#L1) | гл. 12 |
| die Reise (от reisen) | 12, экз. | 3 · 1 · 3 · 3 | [12-s2](src/story/scenes/12.ts#L252) [12-s6](src/story/scenes/12.ts#L657) | [12](content/a1/12-reisen.yaml#L1) | гл. 12 |
| das Rezept | 10 | 16 · 2 · 8 · 7 | [03-s1](src/story/scenes/03.ts#L80) [03-s3](src/story/scenes/03.ts#L274) [03-s5](src/story/scenes/03.ts#L704) [10-s2](src/story/scenes/10.ts#L124) [10-s4](src/story/scenes/10.ts#L419) [10-s5](src/story/scenes/10.ts#L487) | [10](content/a1/10-gesundheit.yaml#L116) | гл. 10 |
| der Rücken | 10 | 9 · 2 · 4 · 2 | [10-s3](src/story/scenes/10.ts#L236) [10-s4](src/story/scenes/10.ts#L457) [10-s5](src/story/scenes/10.ts#L522) [11-s3](src/story/scenes/11.ts#L292) | [10](content/a1/10-gesundheit.yaml#L91) | гл. 10 |
| der Rucksack | 3 | 5 · 2 · 3 · 0 | [03-s3](src/story/scenes/03.ts#L277) [05-s1](src/story/scenes/05.ts#L98) [05-s3](src/story/scenes/05.ts#L302) | [03](content/a1/03-familie.yaml#L82) | гл. 3 |
| Russland | 1 | 6 · 1 · 6 · 1 | [01-s1](src/story/scenes/01.ts#L19) [01-s2](src/story/scenes/01.ts#L209) [01-s3](src/story/scenes/01.ts#L219) [01-s6](src/story/scenes/01.ts#L609) | [01](content/a1/01-kennenlernen.yaml#L135) | гл. 1 |
| der Saft | 4, экз. | 9 · 2 · 8 · 4 | [04-s1](src/story/scenes/04.ts#L63) [04-s3](src/story/scenes/04.ts#L381) [04-s6](src/story/scenes/04.ts#L675) [07-s3](src/story/scenes/07.ts#L286) | [04](content/a1/04-essen.yaml#L114) | гл. 4 |
| der Salat | 4, экз. | 3 · 1 · 2 · 2 | [04-s1](src/story/scenes/04.ts#L97) | [04](content/a1/04-essen.yaml#L160) [07](content/a1/07-freizeit.yaml#L228) | гл. 4 |
| der Schmerz | 10 | 9 · 1 · 5 · 7 | [10-s1](src/story/scenes/10.ts#L85) [10-s2](src/story/scenes/10.ts#L120) [10-s6](src/story/scenes/10.ts#L638) | [10](content/a1/10-gesundheit.yaml#L18) | гл. 10 |
| der Schrank | 8, экз. | 15 · 3 · 8 · 7 | [01-s5](src/story/scenes/01.ts#L481) [08-s1](src/story/scenes/08.ts#L127) [08-s2](src/story/scenes/08.ts#L159) [08-s4](src/story/scenes/08.ts#L473) [08-s6](src/story/scenes/08.ts#L707) [11-i1](src/story/scenes/11.ts#L146) [11-s5](src/story/scenes/11.ts#L589) [11-s6](src/story/scenes/11.ts#L666) | [08](content/a1/08-wohnen.yaml#L68) | гл. 8 |
| der Schuh | 5, экз. | 4 · 1 · 3 · 2 | [05-s1](src/story/scenes/05.ts#L98) [05-s4](src/story/scenes/05.ts#L545) [05-s6](src/story/scenes/05.ts#L796) | [05](content/a1/05-einkaufen.yaml#L97) | гл. 5 |
| die Schwester | 3, экз. | 9 · 1 · 8 · 5 | [03-s1](src/story/scenes/03.ts#L51) [03-i1](src/story/scenes/03.ts#L435) [03-s4](src/story/scenes/03.ts#L516) [03-s5](src/story/scenes/03.ts#L672) [03-s6](src/story/scenes/03.ts#L779) | [03](content/a1/03-familie.yaml#L38) [08](content/a1/08-wohnen.yaml#L673) | гл. 3 |
| das Schwimmbad (от schwimmen) | 7, экз. | 2 · 1 · 2 · 2 | [07-s3](src/story/scenes/07.ts#L404) [07-s6](src/story/scenes/07.ts#L728) | [07](content/a1/07-freizeit.yaml#L147) | гл. 7 |
| das Sofa | 8, экз. | 4 · 2 · 2 · 2 | [08-s2](src/story/scenes/08.ts#L161) [10-s1](src/story/scenes/10.ts#L38) [10-s6](src/story/scenes/10.ts#L591) | [08](content/a1/08-wohnen.yaml#L111) | гл. 8 |
| der Sohn | 3, экз. | 9 · 1 · 6 · 5 | [03-s3](src/story/scenes/03.ts#L277) [03-i1](src/story/scenes/03.ts#L431) [03-s5](src/story/scenes/03.ts#L656) [03-s6](src/story/scenes/03.ts#L805) | [03](content/a1/03-familie.yaml#L101) | гл. 3 |
| die Sonne | экз. | 7 · 2 · 3 · 4 | [11-s1](src/story/scenes/11.ts#L25) [12-s1](src/story/scenes/12.ts#L127) [12-s5](src/story/scenes/12.ts#L488) | [08](content/a1/08-wohnen.yaml#L64) [12](content/a1/12-reisen.yaml#L68) | гл. 12 |
| die Speisekarte | 4, экз. | 7 · 2 · 4 · 1 | [04-s1](src/story/scenes/04.ts#L97) [04-s2](src/story/scenes/04.ts#L215) [04-s5](src/story/scenes/04.ts#L652) [09-s4](src/story/scenes/09.ts#L461) | [04](content/a1/04-essen.yaml#L186) | гл. 4 |
| der Sport | 7, экз. | 2 · 1 · 2 · 2 | [07-s3](src/story/scenes/07.ts#L404) [07-s4](src/story/scenes/07.ts#L504) | [07](content/a1/07-freizeit.yaml#L143) [10](content/a1/10-gesundheit.yaml#L64) | гл. 7 |
| die Sprache | 1, экз. | 9 · 2 · 7 · 6 | [01-s2](src/story/scenes/01.ts#L188) [01-s3](src/story/scenes/01.ts#L219) [01-s4](src/story/scenes/01.ts#L460) [01-s6](src/story/scenes/01.ts#L579) [09-s3](src/story/scenes/09.ts#L411) | [01](content/a1/01-kennenlernen.yaml#L44) [11](content/a1/11-arbeit.yaml#L128) | гл. 1 |
| die Stadt | 1, экз. | 8 · 3 · 7 · 6 | [01-s2](src/story/scenes/01.ts#L188) [01-s3](src/story/scenes/01.ts#L332) [01-s4](src/story/scenes/01.ts#L460) [01-s6](src/story/scenes/01.ts#L628) [08-s1](src/story/scenes/08.ts#L54) [09-s6](src/story/scenes/09.ts#L741) | [01](content/a1/01-kennenlernen.yaml#L122) [09](content/a1/09-stadt.yaml#L1) | гл. 1, 9 |
| die Stelle | 11, экз. | 17 · 3 · 11 · 9 | [09-s1](src/story/scenes/09.ts#L89) [09-s2](src/story/scenes/09.ts#L197) [09-s3](src/story/scenes/09.ts#L289) [09-s6](src/story/scenes/09.ts#L789) [11-s1](src/story/scenes/11.ts#L63) [11-s2](src/story/scenes/11.ts#L267) [11-s4](src/story/scenes/11.ts#L27) [11-s6](src/story/scenes/11.ts#L679) | [01](content/a1/01-kennenlernen.yaml#L217) [04](content/a1/04-essen.yaml#L277) [09](content/a1/09-stadt.yaml#L68) [11](content/a1/11-arbeit.yaml#L42) | гл. 9, 11 |
| der Strand | 1 | 23 · 2 · 12 · 3 | [01-s1](src/story/scenes/01.ts#L131) [01-s2](src/story/scenes/01.ts#L188) [01-s4](src/story/scenes/01.ts#L468) [07-s1](src/story/scenes/07.ts#L121) [07-s2](src/story/scenes/07.ts#L220) [07-s3](src/story/scenes/07.ts#L273) | [01](content/a1/01-kennenlernen.yaml#L149) [12](content/a1/12-reisen.yaml#L217) | гл. 1, 7 |
| die Straße | 9, экз. | 6 · 2 · 3 · 2 | [09-s1](src/story/scenes/09.ts#L89) [09-s3](src/story/scenes/09.ts#L289) [12-s2](src/story/scenes/12.ts#L215) | [01](content/a1/01-kennenlernen.yaml#L68) [02](content/a1/02-zahlen.yaml#L810) [05](content/a1/05-einkaufen.yaml#L7) [08](content/a1/08-wohnen.yaml#L7) [09](content/a1/09-stadt.yaml#L104) [12](content/a1/12-reisen.yaml#L468) | гл. 9 |
| die Straßenbahn | 9, экз. | 5 · 1 · 4 · 3 | [09-s1](src/story/scenes/09.ts#L77) [09-s6](src/story/scenes/09.ts#L781) | [09](content/a1/09-stadt.yaml#L118) | гл. 9 |
| der Student (от das Studium) | 11, экз. | 6 · 1 · 4 · 4 | [11-s1](src/story/scenes/11.ts#L63) [11-s2](src/story/scenes/11.ts#L267) [11-s4](src/story/scenes/11.ts#L437) [11-s6](src/story/scenes/11.ts#L691) | [01](content/a1/01-kennenlernen.yaml#L600) [11](content/a1/11-arbeit.yaml#L109) | гл. 11 |
| der Stuhl | 8 | 14 · 2 · 8 · 5 | [04-s2](src/story/scenes/04.ts#L246) [08-s1](src/story/scenes/08.ts#L38) [08-s2](src/story/scenes/08.ts#L161) [08-s4](src/story/scenes/08.ts#L473) [08-s6](src/story/scenes/08.ts#L703) | [08](content/a1/08-wohnen.yaml#L109) | гл. 8 |
| das T-Shirt | 5 | 8 · 2 · 6 · 4 | [05-s1](src/story/scenes/05.ts#L98) [05-s4](src/story/scenes/05.ts#L545) [05-s6](src/story/scenes/05.ts#L796) [12-s1](src/story/scenes/12.ts#L113) | [05](content/a1/05-einkaufen.yaml#L95) | гл. 5 |
| die Tablette | 10 | 9 · 1 · 7 · 6 | [10-s2](src/story/scenes/10.ts#L140) [10-s4](src/story/scenes/10.ts#L419) [10-s5](src/story/scenes/10.ts#L519) [10-s6](src/story/scenes/10.ts#L592) | [10](content/a1/10-gesundheit.yaml#L118) | гл. 10 |
| das Taxi | 9, экз. | 6 · 2 · 5 · 2 | [09-s1](src/story/scenes/09.ts#L111) [09-s2](src/story/scenes/09.ts#L137) [09-s6](src/story/scenes/09.ts#L781) [12-s2](src/story/scenes/12.ts#L173) | [09](content/a1/09-stadt.yaml#L124) | гл. 9 |
| die Telefonnummer | 2 | 6 · 3 · 4 · 2 | [02-s3](src/story/scenes/02.ts#L235) [02-s6](src/story/scenes/02.ts#L687) [05-s4](src/story/scenes/05.ts#L478) [05-s5](src/story/scenes/05.ts#L602) [08-s4](src/story/scenes/08.ts#L509) | [02](content/a1/02-zahlen.yaml#L42) | гл. 2 |
| der Termin | 10, экз. | 17 · 1 · 9 · 9 | [10-s1](src/story/scenes/10.ts#L85) [10-s2](src/story/scenes/10.ts#L147) [10-s3](src/story/scenes/10.ts#L236) [10-s5](src/story/scenes/10.ts#L519) | [07](content/a1/07-freizeit.yaml#L251) [10](content/a1/10-gesundheit.yaml#L25) | гл. 10 |
| der Test | экз. | 3 · 2 · 2 · 2 | [04-s1](src/story/scenes/04.ts#L51) [04-s5](src/story/scenes/04.ts#L551) [06-s5](src/story/scenes/06.ts#L679) | [04](content/a1/04-essen.yaml#L230) [06](content/a1/06-tagesablauf.yaml#L151) [11](content/a1/11-arbeit.yaml#L198) | гл. 4, 6 |
| die Tochter | 3, экз. | 11 · 1 · 9 · 4 | [03-s3](src/story/scenes/03.ts#L277) [03-i1](src/story/scenes/03.ts#L431) [03-s4](src/story/scenes/03.ts#L466) [03-s5](src/story/scenes/03.ts#L656) [03-s6](src/story/scenes/03.ts#L805) | [03](content/a1/03-familie.yaml#L102) | гл. 3 |
| die Tomate | 4, 5, экз. | 17 · 3 · 8 · 9 | [04-s1](src/story/scenes/04.ts#L100) [04-i1](src/story/scenes/04.ts#L409) [04-s6](src/story/scenes/04.ts#L705) [05-s2](src/story/scenes/05.ts#L161) [05-s3](src/story/scenes/05.ts#L290) [05-s6](src/story/scenes/05.ts#L695) | [04](content/a1/04-essen.yaml#L64) [05](content/a1/05-einkaufen.yaml#L40) | гл. 4 |
| das Treppenhaus | 8 | 10 · 1 · 6 · 4 | [08-s1](src/story/scenes/08.ts#L84) [08-s3](src/story/scenes/08.ts#L324) [08-s6](src/story/scenes/08.ts#L763) | [08](content/a1/08-wohnen.yaml#L97) | гл. 8 |
| die Türkei | 1 | 7 · 1 · 6 · 3 | [01-s2](src/story/scenes/01.ts#L209) [01-s3](src/story/scenes/01.ts#L219) [01-s5](src/story/scenes/01.ts#L547) | [01](content/a1/01-kennenlernen.yaml#L64) | гл. 1 |
| die Ukraine | 1 | 4 · 1 · 4 · 1 | [01-s1](src/story/scenes/01.ts#L19) [01-s2](src/story/scenes/01.ts#L209) [01-s3](src/story/scenes/01.ts#L219) | [01](content/a1/01-kennenlernen.yaml#L138) [09](content/a1/09-stadt.yaml#L611) | гл. 1 |
| der Vater | 3, экз. | 17 · 1 · 11 · 8 | [03-s1](src/story/scenes/03.ts#L42) [03-s2](src/story/scenes/03.ts#L154) [03-i1](src/story/scenes/03.ts#L419) [03-s4](src/story/scenes/03.ts#L574) [03-s5](src/story/scenes/03.ts#L610) [03-s6](src/story/scenes/03.ts#L779) | [03](content/a1/03-familie.yaml#L32) | гл. 3 |
| der Verkäufer (от verkaufen) | 11, экз. | 2 · 1 · 2 · 1 | [11-s1](src/story/scenes/11.ts#L76) | [05](content/a1/05-einkaufen.yaml#L27) [11](content/a1/11-arbeit.yaml#L92) | гл. 11 |
| die Verkäuferin | 11 | 2 · 1 · 2 · 1 | [11-s1](src/story/scenes/11.ts#L76) | [05](content/a1/05-einkaufen.yaml#L27) [11](content/a1/11-arbeit.yaml#L93) | гл. 11 |
| der Vermieter (от vermieten) | 8, экз. | 4 · 1 · 3 · 1 | [08-i1](src/story/scenes/08.ts#L276) [08-s3](src/story/scenes/08.ts#L327) | [08](content/a1/08-wohnen.yaml#L158) | гл. 8 |
| die Versichertenkarte | 10 | 8 · 2 · 4 · 4 | [10-s2](src/story/scenes/10.ts#L140) [10-s5](src/story/scenes/10.ts#L487) [11-s2](src/story/scenes/11.ts#L237) | [10](content/a1/10-gesundheit.yaml#L44) | гл. 10 |
| die Verspätung | 12 | 9 · 1 · 5 · 5 | [12-s2](src/story/scenes/12.ts#L180) [12-s3](src/story/scenes/12.ts#L27) [12-s6](src/story/scenes/12.ts#L657) | [09](content/a1/09-stadt.yaml#L215) [12](content/a1/12-reisen.yaml#L48) | гл. 12 |
| der Vorname | 1, экз. | 5 · 1 · 5 · 2 | [01-s4](src/story/scenes/01.ts#L427) [01-s6](src/story/scenes/01.ts#L628) | [01](content/a1/01-kennenlernen.yaml#L119) [11](content/a1/11-arbeit.yaml#L243) [12](content/a1/12-reisen.yaml#L231) | гл. 1 |
| das Vorstellungsgespräch | 11 | 4 · 1 · 2 · 4 | [11-s1](src/story/scenes/11.ts#L96) [11-s4](src/story/scenes/11.ts#L27) | [11](content/a1/11-arbeit.yaml#L48) | гл. 11 |
| die Warmmiete | 8 | 3 · 1 · 3 · 0 | [08-s2](src/story/scenes/08.ts#L247) [08-s3](src/story/scenes/08.ts#L375) | [08](content/a1/08-wohnen.yaml#L162) | гл. 8 |
| das Wartezimmer | 10 | 9 · 1 · 4 · 5 | [10-s2](src/story/scenes/10.ts#L140) [10-s3](src/story/scenes/10.ts#L232) [10-s5](src/story/scenes/10.ts#L572) | [10](content/a1/10-gesundheit.yaml#L113) | гл. 10 |
| das Wetter | 12, экз. | 4 · 1 · 3 · 3 | [12-s1](src/story/scenes/12.ts#L37) [12-s6](src/story/scenes/12.ts#L657) | [12](content/a1/12-reisen.yaml#L66) | гл. 12 |
| das Wiederhören | экз. | 6 · 2 · 4 · 2 | [02-s1](src/story/scenes/02.ts#L94) [02-s3](src/story/scenes/02.ts#L350) [02-s6](src/story/scenes/02.ts#L677) [03-s6](src/story/scenes/03.ts#L748) | [02](content/a1/02-zahlen.yaml#L50) [06](content/a1/06-tagesablauf.yaml#L199) [10](content/a1/10-gesundheit.yaml#L187) | гл. 2 |
| das Wiedersehen | экз. | 9 · 3 · 8 · 0 | [01-s1](src/story/scenes/01.ts#L61) [01-s3](src/story/scenes/01.ts#L219) [02-s1](src/story/scenes/02.ts#L111) [02-s6](src/story/scenes/02.ts#L731) [05-s1](src/story/scenes/05.ts#L123) | [01](content/a1/01-kennenlernen.yaml#L70) [02](content/a1/02-zahlen.yaml#L303) | гл. 1 |
| der Wind | экз. | 3 · 1 · 1 · 2 | [12-s1](src/story/scenes/12.ts#L48) [12-s2](src/story/scenes/12.ts#L170) | [12](content/a1/12-reisen.yaml#L338) | гл. 12 |
| das Wohnheim | 8 | 4 · 1 · 1 · 2 | [08-s3](src/story/scenes/08.ts#L375) | [08](content/a1/08-wohnen.yaml#L102) | гл. 8 |
| die Wohnung (от wohnen) | 8, экз. | 9 · 1 · 7 · 6 | [08-s1](src/story/scenes/08.ts#L121) [08-i1](src/story/scenes/08.ts#L276) [08-s3](src/story/scenes/08.ts#L331) [08-s6](src/story/scenes/08.ts#L727) | [08](content/a1/08-wohnen.yaml#L27) | гл. 8 |
| die Wurst | 4 | 2 · 1 · 2 · 2 | [04-s1](src/story/scenes/04.ts#L100) | [04](content/a1/04-essen.yaml#L144) | гл. 4 |
| die Zahl | 2 | 6 · 1 · 4 · 5 | [02-s3](src/story/scenes/02.ts#L235) [02-s5](src/story/scenes/02.ts#L646) [02-s6](src/story/scenes/02.ts#L664) | [02](content/a1/02-zahlen.yaml#L1) [04](content/a1/04-essen.yaml#L42) [08](content/a1/08-wohnen.yaml#L239) [12](content/a1/12-reisen.yaml#L177) | гл. 2 |
| der Zahn | 10 | 4 · 1 · 4 · 2 | [10-s1](src/story/scenes/10.ts#L53) [10-s2](src/story/scenes/10.ts#L124) | [10](content/a1/10-gesundheit.yaml#L86) | гл. 10 |
| der Zug | 9, 12, экз. | 13 · 2 · 9 · 8 | [09-s1](src/story/scenes/09.ts#L111) [09-s2](src/story/scenes/09.ts#L137) [09-s6](src/story/scenes/09.ts#L781) [12-s2](src/story/scenes/12.ts#L252) [12-s3](src/story/scenes/12.ts#L27) [12-s5](src/story/scenes/12.ts#L558) | [09](content/a1/09-stadt.yaml#L62) [12](content/a1/12-reisen.yaml#L46) | гл. 9 |
| die Zwiebel | 5 | 20 · 2 · 11 · 8 | [04-i1](src/story/scenes/04.ts#L417) [05-s1](src/story/scenes/05.ts#L62) [05-s3](src/story/scenes/05.ts#L290) | [05](content/a1/05-einkaufen.yaml#L123) | гл. 5 |

### Глаголы (47)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| ankommen | экз. | 3 · 1 · 2 · 1 | [12-s2](src/story/scenes/12.ts#L233) | [12](content/a1/12-reisen.yaml#L48) | гл. 12 |
| anrufen | 6, экз. | 6 · 3 · 3 · 4 | [05-s4](src/story/scenes/05.ts#L477) [06-s5](src/story/scenes/06.ts#L615) [08-s4](src/story/scenes/08.ts#L517) | [06](content/a1/06-tagesablauf.yaml#L97) [08](content/a1/08-wohnen.yaml#L50) [10](content/a1/10-gesundheit.yaml#L186) | гл. 6, 11 |
| aufhören | 6, экз. | 5 · 1 · 4 · 2 | [06-s3](src/story/scenes/06.ts#L286) [06-s5](src/story/scenes/06.ts#L131) | [06](content/a1/06-tagesablauf.yaml#L150) [07](content/a1/07-freizeit.yaml#L227) | гл. 6 |
| aufstehen | 6, экз. | 4 · 3 · 2 · 2 | [06-s5](src/story/scenes/06.ts#L131) [06-s6](src/story/scenes/06.ts#L747) [07-s6](src/story/scenes/07.ts#L733) [12-s5](src/story/scenes/12.ts#L526) | [06](content/a1/06-tagesablauf.yaml#L3) [07](content/a1/07-freizeit.yaml#L442) [12](content/a1/12-reisen.yaml#L161) | гл. 6 |
| aussteigen | 9, экз. | 7 · 1 · 3 · 2 | [09-s2](src/story/scenes/09.ts#L175) [09-s3](src/story/scenes/09.ts#L289) [09-s6](src/story/scenes/09.ts#L781) | [09](content/a1/09-stadt.yaml#L143) | гл. 9 |
| bezahlen | 4, экз. | 9 · 2 · 3 · 3 | [04-s2](src/story/scenes/04.ts#L221) [04-s4](src/story/scenes/04.ts#L482) [04-s5](src/story/scenes/04.ts#L551) [05-s2](src/story/scenes/05.ts#L280) [05-s3](src/story/scenes/05.ts#L302) [05-i1](src/story/scenes/05.ts#L438) | [04](content/a1/04-essen.yaml#L204) [08](content/a1/08-wohnen.yaml#L258) | гл. 4 |
| buchstabieren | 2, экз. | 5 · 1 · 2 · 4 | [02-s3](src/story/scenes/02.ts#L235) [02-s6](src/story/scenes/02.ts#L661) | [02](content/a1/02-zahlen.yaml#L136) | гл. 2 |
| dauern | 6, экз. | 3 · 2 · 2 · 3 | [06-s5](src/story/scenes/06.ts#L586) [09-s5](src/story/scenes/09.ts#L666) | [06](content/a1/06-tagesablauf.yaml#L116) | гл. 6 |
| dürfen | 10, экз. | 20 · 3 · 12 · 3 | [10-s2](src/story/scenes/10.ts#L173) [10-s3](src/story/scenes/10.ts#L236) [10-s4](src/story/scenes/10.ts#L28) [10-s5](src/story/scenes/10.ts#L510) [10-s6](src/story/scenes/10.ts#L632) [11-i1](src/story/scenes/11.ts#L145) | [10](content/a1/10-gesundheit.yaml#L13) | гл. 10 |
| einkaufen | 6, экз. | 2 · 1 · 1 · 1 | [05-s6](src/story/scenes/05.ts#L762) | [05](content/a1/05-einkaufen.yaml#L1) [06](content/a1/06-tagesablauf.yaml#L66) [07](content/a1/07-freizeit.yaml#L512) | гл. 4, 5, 6 |
| einladen | 7, экз. | 2 · 1 · 0 · 1 | [07-s1](src/story/scenes/07.ts#L37) [07-s3](src/story/scenes/07.ts#L408) | [07](content/a1/07-freizeit.yaml#L171) | гл. 7 |
| einsteigen | 9, экз. | 4 · 1 · 2 · 3 | [09-s2](src/story/scenes/09.ts#L172) [09-s6](src/story/scenes/09.ts#L695) | [09](content/a1/09-stadt.yaml#L142) | гл. 9 |
| erzählen | экз. | 2 · 1 · 1 · 2 | [10-s5](src/story/scenes/10.ts#L533) | — | — |
| fotografieren | 7 | 4 · 1 · 4 · 1 | [07-s4](src/story/scenes/07.ts#L421) | [02](content/a1/02-zahlen.yaml#L914) [07](content/a1/07-freizeit.yaml#L91) | гл. 7 |
| glauben | экз. | 3 · 2 · 1 · 3 | [06-s2](src/story/scenes/06.ts#L160) [09-s5](src/story/scenes/09.ts#L666) | — | — |
| halten | экз. | 4 · 3 · 3 · 3 | [09-s1](src/story/scenes/09.ts#L89) [11-s2](src/story/scenes/11.ts#L237) [12-s5](src/story/scenes/12.ts#L28) | — | — |
| helfen | экз. | 4 · 3 · 3 · 1 | [06-s6](src/story/scenes/06.ts#L724) [07-s5](src/story/scenes/07.ts#L545) [08-s5](src/story/scenes/08.ts#L639) | [06](content/a1/06-tagesablauf.yaml#L342) [10](content/a1/10-gesundheit.yaml#L121) [11](content/a1/11-arbeit.yaml#L238) [12](content/a1/12-reisen.yaml#L228) | гл. 6, 12 |
| holen | экз. | 5 · 2 · 2 · 4 | [07-s2](src/story/scenes/07.ts#L139) [07-s4](src/story/scenes/07.ts#L438) [11-i1](src/story/scenes/11.ts#L146) | — | гл. 11 |
| kennen | экз. | 3 · 3 · 0 · 3 | [04-s3](src/story/scenes/04.ts#L379) [09-i1](src/story/scenes/09.ts#L263) [10-s1](src/story/scenes/10.ts#L94) | [11](content/a1/11-arbeit.yaml#L199) | — |
| können | 7, экз. | 31 · 3 · 23 · 11 | [07-s1](src/story/scenes/07.ts#L38) [07-s2](src/story/scenes/07.ts#L158) [07-s3](src/story/scenes/07.ts#L286) [07-s4](src/story/scenes/07.ts#L483) | [04](content/a1/04-essen.yaml#L506) [07](content/a1/07-freizeit.yaml#L16) [08](content/a1/08-wohnen.yaml#L285) [09](content/a1/09-stadt.yaml#L40) [10](content/a1/10-gesundheit.yaml#L40) [11](content/a1/11-arbeit.yaml#L76) | гл. 7, 8, 10, 11, 12 |
| kosten | 5, экз. | 8 · 2 · 5 · 6 | [05-s2](src/story/scenes/05.ts#L175) [05-s5](src/story/scenes/05.ts#L580) [05-s6](src/story/scenes/05.ts#L699) [09-s2](src/story/scenes/09.ts#L164) | [05](content/a1/05-einkaufen.yaml#L3) [08](content/a1/08-wohnen.yaml#L38) [12](content/a1/12-reisen.yaml#L42) | гл. 5 |
| lernen | экз. | 2 · 2 · 2 · 0 | [11-s1](src/story/scenes/11.ts#L56) [12-s6](src/story/scenes/12.ts#L663) | [11](content/a1/11-arbeit.yaml#L165) | гл. 11 |
| lesen | 7, экз. | 3 · 1 · 3 · 3 | [07-s1](src/story/scenes/07.ts#L80) [07-s6](src/story/scenes/07.ts#L731) | [03](content/a1/03-familie.yaml#L19) [05](content/a1/05-einkaufen.yaml#L19) [06](content/a1/06-tagesablauf.yaml#L21) [07](content/a1/07-freizeit.yaml#L20) [08](content/a1/08-wohnen.yaml#L23) [09](content/a1/09-stadt.yaml#L21) [10](content/a1/10-gesundheit.yaml#L222) [11](content/a1/11-arbeit.yaml#L21) [12](content/a1/12-reisen.yaml#L253) | гл. 7 |
| lieben (от lieb-) | экз. | 13 · 12 · 12 · 0 | [01-s5](src/story/scenes/01.ts#L547) [02-s5](src/story/scenes/02.ts#L582) [03-s5](src/story/scenes/03.ts#L672) [04-s5](src/story/scenes/04.ts#L620) [05-s5](src/story/scenes/05.ts#L631) [06-s1](src/story/scenes/06.ts#L90) [06-s5](src/story/scenes/06.ts#L615) [07-s5](src/story/scenes/07.ts#L589) | [03](content/a1/03-familie.yaml#L228) [04](content/a1/04-essen.yaml#L520) [05](content/a1/05-einkaufen.yaml#L215) [07](content/a1/07-freizeit.yaml#L226) [10](content/a1/10-gesundheit.yaml#L205) [12](content/a1/12-reisen.yaml#L205) | гл. 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 |
| liegen | экз. | 5 · 4 · 1 · 0 | [07-s6](src/story/scenes/07.ts#L727) [08-s2](src/story/scenes/08.ts#L207) [09-s1](src/story/scenes/09.ts#L74) [10-s1](src/story/scenes/10.ts#L38) [10-s6](src/story/scenes/10.ts#L591) | [02](content/a1/02-zahlen.yaml#L669) | гл. 8, 11 |
| mieten | 8, экз. | 4 · 1 · 4 · 0 | [08-s2](src/story/scenes/08.ts#L247) [08-s3](src/story/scenes/08.ts#L375) [08-s4](src/story/scenes/08.ts#L552) | [08](content/a1/08-wohnen.yaml#L44) | гл. 8 |
| mitbringen | экз. | 7 · 2 · 5 · 6 | [10-s6](src/story/scenes/10.ts#L30) [12-s6](src/story/scenes/12.ts#L586) | [07](content/a1/07-freizeit.yaml#L228) [10](content/a1/10-gesundheit.yaml#L42) | гл. 12 |
| mitkommen | 7, экз. | 8 · 3 · 4 · 5 | [07-s3](src/story/scenes/07.ts#L286) [07-s6](src/story/scenes/07.ts#L732) [09-s6](src/story/scenes/09.ts#L719) [10-s1](src/story/scenes/10.ts#L94) | [07](content/a1/07-freizeit.yaml#L35) | гл. 7 |
| mitnehmen | экз. | 5 · 2 · 3 · 3 | [08-i1](src/story/scenes/08.ts#L29) [08-s3](src/story/scenes/08.ts#L375) [12-s1](src/story/scenes/12.ts#L113) | [10](content/a1/10-gesundheit.yaml#L272) | — |
| müssen | 10, экз. | 7 · 2 · 5 · 2 | [10-s1](src/story/scenes/10.ts#L81) [10-s5](src/story/scenes/10.ts#L510) [10-s6](src/story/scenes/10.ts#L632) [11-s5](src/story/scenes/11.ts#L590) | [10](content/a1/10-gesundheit.yaml#L13) [11](content/a1/11-arbeit.yaml#L202) | гл. 10 |
| reisen | экз. | 3 · 1 · 3 · 3 | [12-s2](src/story/scenes/12.ts#L252) [12-s6](src/story/scenes/12.ts#L657) | [12](content/a1/12-reisen.yaml#L1) | гл. 12 |
| reparieren | экз. | 2 · 2 · 0 · 2 | [06-s6](src/story/scenes/06.ts#L743) [11-s6](src/story/scenes/11.ts#L647) | — | — |
| reservieren | 12 | 5 · 1 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L276) | [02](content/a1/02-zahlen.yaml#L914) [12](content/a1/12-reisen.yaml#L113) | гл. 12 |
| scheinen | экз. | 3 · 1 · 1 · 0 | [12-s5](src/story/scenes/12.ts#L488) | [12](content/a1/12-reisen.yaml#L68) | гл. 12 |
| schicken | экз. | 2 · 2 · 0 · 2 | [05-s6](src/story/scenes/05.ts#L771) [06-s1](src/story/scenes/06.ts#L91) | — | — |
| schließen | экз. | 4 · 3 · 2 · 2 | [01-s5](src/story/scenes/01.ts#L482) [06-s3](src/story/scenes/06.ts#L286) [08-s1](src/story/scenes/08.ts#L85) | [06](content/a1/06-tagesablauf.yaml#L213) [09](content/a1/09-stadt.yaml#L234) | гл. 9, 11 |
| schwimmen | 7, экз. | 11 · 1 · 9 · 8 | [07-s1](src/story/scenes/07.ts#L80) [07-s4](src/story/scenes/07.ts#L437) [07-s5](src/story/scenes/07.ts#L540) [07-s6](src/story/scenes/07.ts#L691) | [07](content/a1/07-freizeit.yaml#L35) | гл. 7 |
| sollen | экз. | 18 · 3 · 13 · 10 | [10-s4](src/story/scenes/10.ts#L29) [10-s5](src/story/scenes/10.ts#L545) [10-s6](src/story/scenes/10.ts#L30) [11-s5](src/story/scenes/11.ts#L28) | — | — |
| spielen | экз. | 4 · 1 · 3 · 3 | [07-s3](src/story/scenes/07.ts#L381) [07-s6](src/story/scenes/07.ts#L718) | [07](content/a1/07-freizeit.yaml#L39) [11](content/a1/11-arbeit.yaml#L402) | гл. 7 |
| stellen | экз. | 11 · 2 · 8 · 7 | [09-s1](src/story/scenes/09.ts#L89) [11-s1](src/story/scenes/11.ts#L63) [11-s2](src/story/scenes/11.ts#L267) [11-s4](src/story/scenes/11.ts#L27) [11-s6](src/story/scenes/11.ts#L679) | [01](content/a1/01-kennenlernen.yaml#L217) [04](content/a1/04-essen.yaml#L277) [11](content/a1/11-arbeit.yaml#L42) | гл. 11 |
| tanzen | 7, экз. | 6 · 2 · 5 · 4 | [07-s1](src/story/scenes/07.ts#L80) [07-s4](src/story/scenes/07.ts#L437) [07-s6](src/story/scenes/07.ts#L731) [08-s5](src/story/scenes/08.ts#L589) | [01](content/a1/01-kennenlernen.yaml#L515) [07](content/a1/07-freizeit.yaml#L105) | гл. 7 |
| tun | экз. | 5 · 1 · 4 · 1 | [10-s1](src/story/scenes/10.ts#L39) [10-s2](src/story/scenes/10.ts#L215) [10-s3](src/story/scenes/10.ts#L335) [10-s6](src/story/scenes/10.ts#L651) | [10](content/a1/10-gesundheit.yaml#L60) [12](content/a1/12-reisen.yaml#L50) | гл. 10, 11 |
| umsteigen | 9 | 2 · 1 · 2 · 1 | [09-s2](src/story/scenes/09.ts#L197) [09-s6](src/story/scenes/09.ts#L781) | [09](content/a1/09-stadt.yaml#L144) | гл. 9 |
| werden | экз. | 5 · 2 · 2 · 5 | [10-s1](src/story/scenes/10.ts#L58) [10-s5](src/story/scenes/10.ts#L520) [10-s6](src/story/scenes/10.ts#L647) [12-s5](src/story/scenes/12.ts#L558) | — | — |
| willkommen | экз. | 3 · 2 · 1 · 3 | [09-s6](src/story/scenes/09.ts#L749) [12-s5](src/story/scenes/12.ts#L28) | [12](content/a1/12-reisen.yaml#L34) | — |
| wohnen | экз. | 27 · 2 · 18 · 13 | [01-s1](src/story/scenes/01.ts#L19) [01-s3](src/story/scenes/01.ts#L219) [01-i1](src/story/scenes/01.ts#L382) [01-s4](src/story/scenes/01.ts#L420) [01-s5](src/story/scenes/01.ts#L486) | [01](content/a1/01-kennenlernen.yaml#L42) [02](content/a1/02-zahlen.yaml#L495) [03](content/a1/03-familie.yaml#L66) [08](content/a1/08-wohnen.yaml#L1) [11](content/a1/11-arbeit.yaml#L213) | гл. 1, 2, 3, 4, 8 |
| wollen | 7, экз. | 18 · 2 · 12 · 9 | [07-s1](src/story/scenes/07.ts#L43) [07-s2](src/story/scenes/07.ts#L170) [07-s3](src/story/scenes/07.ts#L274) [07-s5](src/story/scenes/07.ts#L525) [07-i1](src/story/scenes/07.ts#L668) [11-s3](src/story/scenes/11.ts#L292) | [04](content/a1/04-essen.yaml#L495) [07](content/a1/07-freizeit.yaml#L16) [10](content/a1/10-gesundheit.yaml#L357) | гл. 7, 8 |

### Прилагательные и наречия (36)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| allein | экз. | 15 · 3 · 2 · 3 | [05-i1](src/story/scenes/05.ts#L430) [06-s2](src/story/scenes/06.ts#L189) [06-s4](src/story/scenes/06.ts#L537) [07-s1](src/story/scenes/07.ts#L81) [07-s2](src/story/scenes/07.ts#L263) [07-s4](src/story/scenes/07.ts#L517) [07-s5](src/story/scenes/07.ts#L565) [07-i1](src/story/scenes/07.ts#L635) | — | — |
| besser | экз. | 4 · 1 · 2 · 2 | [10-s3](src/story/scenes/10.ts#L236) [10-s5](src/story/scenes/10.ts#L522) | — | — |
| bisschen | экз. | 4 · 1 · 2 · 1 | [01-s3](src/story/scenes/01.ts#L219) [01-s4](src/story/scenes/01.ts#L414) | [01](content/a1/01-kennenlernen.yaml#L46) [03](content/a1/03-familie.yaml#L229) [06](content/a1/06-tagesablauf.yaml#L70) [11](content/a1/11-arbeit.yaml#L214) | — |
| dunkel | 8 | 4 · 1 · 1 · 0 | [08-s1](src/story/scenes/08.ts#L84) [08-s2](src/story/scenes/08.ts#L159) [08-s3](src/story/scenes/08.ts#L427) | [08](content/a1/08-wohnen.yaml#L139) | гл. 8 |
| einmal | экз. | 9 · 3 · 6 · 1 | [02-s1](src/story/scenes/02.ts#L94) [02-s3](src/story/scenes/02.ts#L350) [02-s4](src/story/scenes/02.ts#L531) [02-s6](src/story/scenes/02.ts#L687) [08-i1](src/story/scenes/08.ts#L285) [09-s3](src/story/scenes/09.ts#L302) | [02](content/a1/02-zahlen.yaml#L138) [05](content/a1/05-einkaufen.yaml#L212) [09](content/a1/09-stadt.yaml#L211) [12](content/a1/12-reisen.yaml#L243) | гл. 2 |
| fertig | экз. | 2 · 1 · 1 · 1 | [07-s3](src/story/scenes/07.ts#L286) | — | — |
| früher | 11, экз. | 5 · 3 · 4 · 1 | [07-s6](src/story/scenes/07.ts#L682) [11-s2](src/story/scenes/11.ts#L237) [11-s6](src/story/scenes/11.ts#L679) [12-s1](src/story/scenes/12.ts#L107) | [11](content/a1/11-arbeit.yaml#L132) | гл. 11 |
| geradeaus | 9, экз. | 12 · 2 · 8 · 2 | [09-s2](src/story/scenes/09.ts#L198) [09-s3](src/story/scenes/09.ts#L302) [09-s4](src/story/scenes/09.ts#L525) [09-s6](src/story/scenes/09.ts#L781) [12-s2](src/story/scenes/12.ts#L220) | [09](content/a1/09-stadt.yaml#L34) | гл. 9 |
| gern | 4, 7, экз. | 9 · 3 · 7 · 2 | [04-s3](src/story/scenes/04.ts#L293) [04-s6](src/story/scenes/04.ts#L744) [07-s1](src/story/scenes/07.ts#L79) [07-s3](src/story/scenes/07.ts#L381) [11-s1](src/story/scenes/11.ts#L76) | [01](content/a1/01-kennenlernen.yaml#L88) [02](content/a1/02-zahlen.yaml#L38) [04](content/a1/04-essen.yaml#L18) [05](content/a1/05-einkaufen.yaml#L38) [07](content/a1/07-freizeit.yaml#L18) [09](content/a1/09-stadt.yaml#L46) [10](content/a1/10-gesundheit.yaml#L523) [11](content/a1/11-arbeit.yaml#L78) [12](content/a1/12-reisen.yaml#L227) | гл. 4, 7 |
| geschlossen (от schließen) | экз. | 2 · 1 · 2 · 0 | [06-s3](src/story/scenes/06.ts#L286) | [06](content/a1/06-tagesablauf.yaml#L213) [09](content/a1/09-stadt.yaml#L234) | гл. 9, 11 |
| gesund | 10 | 5 · 2 · 1 · 2 | [10-s1](src/story/scenes/10.ts#L57) [11-s1](src/story/scenes/11.ts#L36) | [10](content/a1/10-gesundheit.yaml#L99) | гл. 10 |
| herzlich | экз. | 13 · 12 · 13 · 0 | [01-s5](src/story/scenes/01.ts#L547) [02-s5](src/story/scenes/02.ts#L582) [03-s5](src/story/scenes/03.ts#L672) [04-s5](src/story/scenes/04.ts#L620) [05-s5](src/story/scenes/05.ts#L631) [06-s5](src/story/scenes/06.ts#L615) [07-s5](src/story/scenes/07.ts#L589) [08-s5](src/story/scenes/08.ts#L671) | [12](content/a1/12-reisen.yaml#L207) | гл. 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 |
| hinten | экз. | 18 · 3 · 5 · 3 | [04-s4](src/story/scenes/04.ts#L539) [06-s2](src/story/scenes/06.ts#L180) [06-s3](src/story/scenes/06.ts#L282) [06-s4](src/story/scenes/06.ts#L487) [06-s5](src/story/scenes/06.ts#L596) | — | — |
| jung | экз. | 12 · 2 · 6 · 5 | [03-s1](src/story/scenes/03.ts#L30) [03-i1](src/story/scenes/03.ts#L419) [11-i1](src/story/scenes/11.ts#L146) [11-s3](src/story/scenes/11.ts#L292) | [03](content/a1/03-familie.yaml#L62) | гл. 3 |
| kalt | 12 | 2 · 1 · 1 · 1 | [12-s1](src/story/scenes/12.ts#L37) | [08](content/a1/08-wohnen.yaml#L40) [12](content/a1/12-reisen.yaml#L66) | гл. 12 |
| kaputt | 8, экз. | 8 · 3 · 2 · 3 | [06-s6](src/story/scenes/06.ts#L743) [08-s1](src/story/scenes/08.ts#L66) [12-s4](src/story/scenes/12.ts#L389) | [08](content/a1/08-wohnen.yaml#L151) | гл. 8 |
| klar | экз. | 6 · 3 · 2 · 6 | [02-s4](src/story/scenes/02.ts#L512) [03-s5](src/story/scenes/03.ts#L633) [04-s1](src/story/scenes/04.ts#L130) [04-s3](src/story/scenes/04.ts#L288) | [02](content/a1/02-zahlen.yaml#L75) [10](content/a1/10-gesundheit.yaml#L74) | — |
| krank | 10, экз. | 11 · 3 · 6 · 11 | [09-s1](src/story/scenes/09.ts#L89) [10-s1](src/story/scenes/10.ts#L58) [10-s2](src/story/scenes/10.ts#L200) [10-s4](src/story/scenes/10.ts#L28) [10-s5](src/story/scenes/10.ts#L519) [10-s6](src/story/scenes/10.ts#L647) [11-s1](src/story/scenes/11.ts#L96) | [09](content/a1/09-stadt.yaml#L111) [10](content/a1/10-gesundheit.yaml#L58) | гл. 10 |
| lange | экз. | 6 · 3 · 2 · 3 | [09-s1](src/story/scenes/09.ts#L85) [09-s5](src/story/scenes/09.ts#L666) [10-s3](src/story/scenes/10.ts#L236) [12-s5](src/story/scenes/12.ts#L508) | [06](content/a1/06-tagesablauf.yaml#L74) | — |
| langsam | экз. | 7 · 3 · 5 · 2 | [02-s1](src/story/scenes/02.ts#L94) [02-s4](src/story/scenes/02.ts#L531) [02-s6](src/story/scenes/02.ts#L687) [09-s3](src/story/scenes/09.ts#L302) [10-s2](src/story/scenes/10.ts#L120) | [02](content/a1/02-zahlen.yaml#L139) | гл. 2 |
| leider | 7, экз. | 8 · 2 · 6 · 5 | [07-s1](src/story/scenes/07.ts#L92) [07-s2](src/story/scenes/07.ts#L170) [07-s4](src/story/scenes/07.ts#L437) [07-s5](src/story/scenes/07.ts#L617) [07-s6](src/story/scenes/07.ts#L731) [08-s3](src/story/scenes/08.ts#L28) | [04](content/a1/04-essen.yaml#L294) [05](content/a1/05-einkaufen.yaml#L252) [07](content/a1/07-freizeit.yaml#L64) [10](content/a1/10-gesundheit.yaml#L60) [12](content/a1/12-reisen.yaml#L216) | гл. 7 |
| leise | экз. | 2 · 1 · 1 · 2 | [10-s2](src/story/scenes/10.ts#L180) | — | — |
| links | 9, экз. | 18 · 2 · 7 · 3 | [09-s2](src/story/scenes/09.ts#L198) [09-s3](src/story/scenes/09.ts#L302) [09-s4](src/story/scenes/09.ts#L483) | [08](content/a1/08-wohnen.yaml#L60) [09](content/a1/09-stadt.yaml#L38) [12](content/a1/12-reisen.yaml#L468) | гл. 8, 9 |
| rechts | 9, экз. | 16 · 2 · 8 · 4 | [09-s3](src/story/scenes/09.ts#L302) [09-s4](src/story/scenes/09.ts#L483) [09-s6](src/story/scenes/09.ts#L781) [12-s2](src/story/scenes/12.ts#L216) | [08](content/a1/08-wohnen.yaml#L68) [09](content/a1/09-stadt.yaml#L138) | гл. 9 |
| richtig | экз. | 20 · 10 · 19 · 1 | [02-s3](src/story/scenes/02.ts#L374) [03-i1](src/story/scenes/03.ts#L445) [03-s5](src/story/scenes/03.ts#L445) [04-s1](src/story/scenes/04.ts#L143) [04-i1](src/story/scenes/04.ts#L434) [04-s4](src/story/scenes/04.ts#L521) [06-s1](src/story/scenes/06.ts#L101) [06-s4](src/story/scenes/06.ts#L541) | [03](content/a1/03-familie.yaml#L223) [04](content/a1/04-essen.yaml#L299) [05](content/a1/05-einkaufen.yaml#L212) [06](content/a1/06-tagesablauf.yaml#L509) [07](content/a1/07-freizeit.yaml#L221) [08](content/a1/08-wohnen.yaml#L617) [09](content/a1/09-stadt.yaml#L222) [11](content/a1/11-arbeit.yaml#L191) [12](content/a1/12-reisen.yaml#L242) | гл. 11 |
| ruhig | 8, экз. | 7 · 3 · 3 · 0 | [08-s1](src/story/scenes/08.ts#L37) [08-s3](src/story/scenes/08.ts#L331) [08-s4](src/story/scenes/08.ts#L502) [10-s2](src/story/scenes/10.ts#L137) [12-s6](src/story/scenes/12.ts#L612) | [08](content/a1/08-wohnen.yaml#L74) | гл. 8 |
| schnell | экз. | 4 · 1 · 3 · 1 | [09-s2](src/story/scenes/09.ts#L172) [09-s3](src/story/scenes/09.ts#L302) | [06](content/a1/06-tagesablauf.yaml#L46) | — |
| schön | 5, 8, экз. | 6 · 3 · 3 · 2 | [05-s4](src/story/scenes/05.ts#L558) [09-s4](src/story/scenes/09.ts#L548) [11-s2](src/story/scenes/11.ts#L192) [11-s3](src/story/scenes/11.ts#L292) [11-s6](src/story/scenes/11.ts#L704) | [01](content/a1/01-kennenlernen.yaml#L70) [05](content/a1/05-einkaufen.yaml#L30) [08](content/a1/08-wohnen.yaml#L147) | гл. 5, 8, 12 |
| sofort | экз. | 2 · 1 · 2 · 0 | [08-s3](src/story/scenes/08.ts#L375) | [08](content/a1/08-wohnen.yaml#L149) | — |
| später | экз. | 9 · 3 · 4 · 3 | [06-s5](src/story/scenes/06.ts#L636) [07-s3](src/story/scenes/07.ts#L272) [07-s4](src/story/scenes/07.ts#L471) [07-s6](src/story/scenes/07.ts#L682) [10-s3](src/story/scenes/10.ts#L236) | [10](content/a1/10-gesundheit.yaml#L48) | — |
| teuer | 5, 8, экз. | 9 · 2 · 8 · 2 | [05-s1](src/story/scenes/05.ts#L57) [05-s3](src/story/scenes/05.ts#L302) [05-s5](src/story/scenes/05.ts#L672) [05-s6](src/story/scenes/05.ts#L699) [07-s3](src/story/scenes/07.ts#L286) | [05](content/a1/05-einkaufen.yaml#L75) [08](content/a1/08-wohnen.yaml#L143) | гл. 5, 6, 8 |
| verheiratet | 3, экз. | 5 · 1 · 3 · 1 | [03-s3](src/story/scenes/03.ts#L277) | [03](content/a1/03-familie.yaml#L136) | гл. 3 |
| vielleicht | экз. | 3 · 2 · 2 · 3 | [06-s5](src/story/scenes/06.ts#L637) [08-s3](src/story/scenes/08.ts#L354) | [04](content/a1/04-essen.yaml#L87) | — |
| warm | 12 | 8 · 2 · 3 · 4 | [08-s3](src/story/scenes/08.ts#L375) [12-s1](src/story/scenes/12.ts#L26) [12-s3](src/story/scenes/12.ts#L281) | [04](content/a1/04-essen.yaml#L245) [08](content/a1/08-wohnen.yaml#L258) [12](content/a1/12-reisen.yaml#L125) | гл. 12 |
| zurück | экз. | 10 · 3 · 5 · 3 | [05-s3](src/story/scenes/05.ts#L302) [09-s4](src/story/scenes/09.ts#L498) [09-s5](src/story/scenes/09.ts#L567) [12-s6](src/story/scenes/12.ts#L597) | [12](content/a1/12-reisen.yaml#L226) | — |
| zusammen | 7, экз. | 11 · 3 · 9 · 5 | [04-s4](src/story/scenes/04.ts#L459) [04-s5](src/story/scenes/04.ts#L652) [07-s1](src/story/scenes/07.ts#L111) [07-s4](src/story/scenes/07.ts#L437) [07-s5](src/story/scenes/07.ts#L530) [08-s3](src/story/scenes/08.ts#L375) | [04](content/a1/04-essen.yaml#L44) [07](content/a1/07-freizeit.yaml#L68) [08](content/a1/08-wohnen.yaml#L888) | гл. 4, 7, 8 |

### Служебные слова (19)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| denn | экз. | 2 · 1 · 1 · 1 | [12-s3](src/story/scenes/12.ts#L281) | [10](content/a1/10-gesundheit.yaml#L36) | — |
| dich | экз. | 5 · 3 · 2 · 2 | [02-s4](src/story/scenes/02.ts#L442) [09-i1](src/story/scenes/09.ts#L29) [12-s1](src/story/scenes/12.ts#L123) | [06](content/a1/06-tagesablauf.yaml#L155) [11](content/a1/11-arbeit.yaml#L197) | гл. 6, 10 |
| dies- | экз. | 3 · 1 · 1 · 3 | [08-s2](src/story/scenes/08.ts#L226) [08-s3](src/story/scenes/08.ts#L429) | — | — |
| dir | экз. | 3 · 1 · 3 · 0 | [01-s1](src/story/scenes/01.ts#L73) [01-s3](src/story/scenes/01.ts#L219) | [06](content/a1/06-tagesablauf.yaml#L469) [09](content/a1/09-stadt.yaml#L66) | — |
| durch | экз. | 4 · 1 · 2 · 3 | [09-i1](src/story/scenes/09.ts#L262) [09-s4](src/story/scenes/09.ts#L31) | — | — |
| euer | экз. | 3 · 1 · 3 · 1 | [03-s1](src/story/scenes/03.ts#L93) [03-s5](src/story/scenes/03.ts#L632) | [03](content/a1/03-familie.yaml#L42) | — |
| ihm (от er) | экз. | 3 · 3 · 0 · 2 | [06-s5](src/story/scenes/06.ts#L611) [07-s5](src/story/scenes/07.ts#L525) [10-s3](src/story/scenes/10.ts#L232) | [11](content/a1/11-arbeit.yaml#L238) [12](content/a1/12-reisen.yaml#L228) | — |
| jed- | экз. | 9 · 3 · 4 · 8 | [06-s2](src/story/scenes/06.ts#L161) [06-s6](src/story/scenes/06.ts#L713) [07-s1](src/story/scenes/07.ts#L81) [07-s2](src/story/scenes/07.ts#L170) [09-i1](src/story/scenes/09.ts#L263) | [04](content/a1/04-essen.yaml#L299) [07](content/a1/07-freizeit.yaml#L239) [10](content/a1/10-gesundheit.yaml#L200) [12](content/a1/12-reisen.yaml#L199) | — |
| letzt- | экз. | 3 · 1 · 2 · 1 | [11-s2](src/story/scenes/11.ts#L237) [11-s6](src/story/scenes/11.ts#L681) | [11](content/a1/11-arbeit.yaml#L138) [12](content/a1/12-reisen.yaml#L824) | гл. 11 |
| seit | экз. | 2 · 2 · 0 · 2 | [06-s5](src/story/scenes/06.ts#L600) [10-s4](src/story/scenes/10.ts#L408) | — | — |
| sich | экз. | 3 · 1 · 1 · 1 | [09-s3](src/story/scenes/09.ts#L302) | [01](content/a1/01-kennenlernen.yaml#L217) [06](content/a1/06-tagesablauf.yaml#L610) [09](content/a1/09-stadt.yaml#L224) [11](content/a1/11-arbeit.yaml#L208) | — |
| so | экз. | 5 · 4 · 0 · 4 | [06-s1](src/story/scenes/06.ts#L44) [07-s2](src/story/scenes/07.ts#L240) [09-s1](src/story/scenes/09.ts#L85) [11-s1](src/story/scenes/11.ts#L108) [11-s2](src/story/scenes/11.ts#L192) | [02](content/a1/02-zahlen.yaml#L69) [05](content/a1/05-einkaufen.yaml#L163) [06](content/a1/06-tagesablauf.yaml#L42) [07](content/a1/07-freizeit.yaml#L746) [09](content/a1/09-stadt.yaml#L87) [11](content/a1/11-arbeit.yaml#L36) [12](content/a1/12-reisen.yaml#L66) | — |
| über | экз. | 2 · 1 · 0 · 0 | [12-s6](src/story/scenes/12.ts#L612) | — | — |
| unter | экз. | 4 · 1 · 2 · 1 | [04-s3](src/story/scenes/04.ts#L293) [04-s6](src/story/scenes/04.ts#L715) | — | — |
| wann | экз. | 6 · 3 · 5 · 2 | [06-s3](src/story/scenes/06.ts#L286) [06-s4](src/story/scenes/06.ts#L528) [06-s6](src/story/scenes/06.ts#L747) [07-s2](src/story/scenes/07.ts#L157) [12-s6](src/story/scenes/12.ts#L629) | [06](content/a1/06-tagesablauf.yaml#L3) [09](content/a1/09-stadt.yaml#L60) [10](content/a1/10-gesundheit.yaml#L188) [12](content/a1/12-reisen.yaml#L179) | гл. 6, 10 |
| warum | экз. | 5 · 4 · 1 · 4 | [06-s1](src/story/scenes/06.ts#L91) [06-s5](src/story/scenes/06.ts#L675) [08-s5](src/story/scenes/08.ts#L639) [09-s6](src/story/scenes/09.ts#L729) [10-s3](src/story/scenes/10.ts#L330) | [07](content/a1/07-freizeit.yaml#L60) [10](content/a1/10-gesundheit.yaml#L209) | — |
| Welche? | 1 | 12 · 2 · 8 · 5 | [01-s3](src/story/scenes/01.ts#L219) [05-s2](src/story/scenes/05.ts#L154) [05-s3](src/story/scenes/05.ts#L302) [05-i1](src/story/scenes/05.ts#L433) [05-s5](src/story/scenes/05.ts#L631) [05-s6](src/story/scenes/05.ts#L698) | [01](content/a1/01-kennenlernen.yaml#L44) [02](content/a1/02-zahlen.yaml#L84) [05](content/a1/05-einkaufen.yaml#L17) [09](content/a1/09-stadt.yaml#L161) [10](content/a1/10-gesundheit.yaml#L217) [12](content/a1/12-reisen.yaml#L140) | гл. 1, 5 |
| woher | 1, экз. | 14 · 3 · 8 · 9 | [01-s1](src/story/scenes/01.ts#L46) [01-s3](src/story/scenes/01.ts#L219) [01-s4](src/story/scenes/01.ts#L451) [01-s5](src/story/scenes/01.ts#L486) [01-s6](src/story/scenes/01.ts#L579) [02-s5](src/story/scenes/02.ts#L557) [04-s3](src/story/scenes/04.ts#L379) | [01](content/a1/01-kennenlernen.yaml#L38) [09](content/a1/09-stadt.yaml#L204) | гл. 1 |
| wohin | 9, экз. | 3 · 2 · 3 · 0 | [09-s5](src/story/scenes/09.ts#L628) [09-s6](src/story/scenes/09.ts#L700) [12-s1](src/story/scenes/12.ts#L100) | [09](content/a1/09-stadt.yaml#L135) [12](content/a1/12-reisen.yaml#L210) | гл. 9, 12 |

### Выражения (33)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| Achtung | экз. | 4 · 2 · 2 · 4 | [09-s2](src/story/scenes/09.ts#L28) [12-s2](src/story/scenes/12.ts#L180) | [09](content/a1/09-stadt.yaml#L214) [12](content/a1/12-reisen.yaml#L246) | — |
| Alles Gute! | 2 | 7 · 2 · 5 · 2 | [02-s3](src/story/scenes/02.ts#L235) [02-s6](src/story/scenes/02.ts#L687) [03-s6](src/story/scenes/03.ts#L718) | [02](content/a1/02-zahlen.yaml#L55) | гл. 2 |
| am liebsten | 7 | 3 · 1 · 3 · 1 | [07-s1](src/story/scenes/07.ts#L92) [07-s3](src/story/scenes/07.ts#L381) [07-s6](src/story/scenes/07.ts#L691) | [07](content/a1/07-freizeit.yaml#L18) | гл. 7 |
| Auf Wiederhören! | 2 | 5 · 2 · 3 · 2 | [02-s1](src/story/scenes/02.ts#L94) [02-s3](src/story/scenes/02.ts#L350) [02-s6](src/story/scenes/02.ts#L677) [03-s6](src/story/scenes/03.ts#L748) | [02](content/a1/02-zahlen.yaml#L50) [06](content/a1/06-tagesablauf.yaml#L199) [10](content/a1/10-gesundheit.yaml#L187) | гл. 2 |
| Auf Wiedersehen! | 1 | 8 · 3 · 7 · 0 | [01-s1](src/story/scenes/01.ts#L61) [01-s3](src/story/scenes/01.ts#L219) [02-s1](src/story/scenes/02.ts#L111) [02-s6](src/story/scenes/02.ts#L731) [05-s1](src/story/scenes/05.ts#L123) | [01](content/a1/01-kennenlernen.yaml#L70) [02](content/a1/02-zahlen.yaml#L303) | гл. 1 |
| aus sein | экз. | 5 · 4 · 1 · 4 | [02-s3](src/story/scenes/02.ts#L369) [03-s6](src/story/scenes/03.ts#L748) [07-i1](src/story/scenes/07.ts#L637) [12-s3](src/story/scenes/12.ts#L27) | [01](content/a1/01-kennenlernen.yaml#L196) [03](content/a1/03-familie.yaml#L30) [04](content/a1/04-essen.yaml#L487) | — |
| Danke, gut! | 1 | 5 · 2 · 5 · 1 | [01-s1](src/story/scenes/01.ts#L73) [01-s3](src/story/scenes/01.ts#L219) [01-s4](src/story/scenes/01.ts#L411) [04-s6](src/story/scenes/04.ts#L694) | [01](content/a1/01-kennenlernen.yaml#L111) | гл. 1 |
| Die Sonne scheint. | 12 | 2 · 1 · 0 · 0 | [12-s5](src/story/scenes/12.ts#L488) | [12](content/a1/12-reisen.yaml#L68) | гл. 12 |
| ein Kilo | 5 | 11 · 2 · 4 · 5 | [05-s1](src/story/scenes/05.ts#L104) [05-s3](src/story/scenes/05.ts#L290) [08-s2](src/story/scenes/08.ts#L176) | [05](content/a1/05-einkaufen.yaml#L105) | гл. 5 |
| ein Liter | 5 | 13 · 2 · 10 · 4 | [05-s1](src/story/scenes/05.ts#L62) [05-s2](src/story/scenes/05.ts#L221) [05-i1](src/story/scenes/05.ts#L433) [05-s5](src/story/scenes/05.ts#L580) [12-s6](src/story/scenes/12.ts#L597) | [05](content/a1/05-einkaufen.yaml#L108) | гл. 5 |
| ein Pfund | 5 | 4 · 1 · 3 · 0 | [05-s1](src/story/scenes/05.ts#L104) [05-s3](src/story/scenes/05.ts#L302) [05-s5](src/story/scenes/05.ts#L672) | [05](content/a1/05-einkaufen.yaml#L40) | гл. 5 |
| Es regnet. | 12 | 18 · 5 · 1 · 3 | [05-s1](src/story/scenes/05.ts#L39) [06-s6](src/story/scenes/06.ts#L712) [09-s1](src/story/scenes/09.ts#L40) [09-i1](src/story/scenes/09.ts#L250) [09-s3](src/story/scenes/09.ts#L289) [11-s1](src/story/scenes/11.ts#L137) [11-s5](src/story/scenes/11.ts#L564) [11-s6](src/story/scenes/11.ts#L700) | [12](content/a1/12-reisen.yaml#L120) | гл. 12 |
| Fahrrad fahren | 7 | 2 · 2 · 2 · 1 | [07-s1](src/story/scenes/07.ts#L80) [09-i1](src/story/scenes/09.ts#L249) | [07](content/a1/07-freizeit.yaml#L121) | гл. 7 |
| Fußball spielen | 7 | 3 · 1 · 2 · 3 | [07-s6](src/story/scenes/07.ts#L718) | [07](content/a1/07-freizeit.yaml#L115) | гл. 7 |
| Gute Besserung! | 10 | 4 · 2 · 3 · 0 | [10-s1](src/story/scenes/10.ts#L71) [10-s5](src/story/scenes/10.ts#L506) [11-s4](src/story/scenes/11.ts#L463) | [10](content/a1/10-gesundheit.yaml#L3) | гл. 10 |
| Guten Abend! | 1 | 6 · 1 · 5 · 3 | [01-s1](src/story/scenes/01.ts#L61) [01-s4](src/story/scenes/01.ts#L411) | [01](content/a1/01-kennenlernen.yaml#L108) [06](content/a1/06-tagesablauf.yaml#L302) [12](content/a1/12-reisen.yaml#L34) | гл. 1 |
| Guten Appetit! | 4 | 5 · 3 · 4 · 1 | [04-s5](src/story/scenes/04.ts#L652) [04-s6](src/story/scenes/04.ts#L652) [10-s1](src/story/scenes/10.ts#L71) [11-s4](src/story/scenes/11.ts#L463) | [04](content/a1/04-essen.yaml#L209) | гл. 4 |
| Guten Tag! | 1 | 8 · 2 · 7 · 3 | [01-s1](src/story/scenes/01.ts#L80) [01-s4](src/story/scenes/01.ts#L411) [01-s5](src/story/scenes/01.ts#L533) [05-s2](src/story/scenes/05.ts#L251) | [01](content/a1/01-kennenlernen.yaml#L107) [04](content/a1/04-essen.yaml#L32) [05](content/a1/05-einkaufen.yaml#L59) [06](content/a1/06-tagesablauf.yaml#L197) [08](content/a1/08-wohnen.yaml#L60) [10](content/a1/10-gesundheit.yaml#L184) [11](content/a1/11-arbeit.yaml#L60) | гл. 1 |
| ins Kino gehen | 7 | 4 · 1 · 4 · 2 | [07-s1](src/story/scenes/07.ts#L43) [07-s2](src/story/scenes/07.ts#L170) [07-s5](src/story/scenes/07.ts#L530) | [07](content/a1/07-freizeit.yaml#L131) | гл. 7 |
| Langsam, bitte. | 2 | 7 · 3 · 5 · 2 | [02-s1](src/story/scenes/02.ts#L94) [02-s4](src/story/scenes/02.ts#L531) [02-s6](src/story/scenes/02.ts#L687) [09-s3](src/story/scenes/09.ts#L302) [10-s2](src/story/scenes/10.ts#L120) | [02](content/a1/02-zahlen.yaml#L139) | гл. 2 |
| letzte Woche | 11 | 2 · 1 · 2 · 0 | [11-s2](src/story/scenes/11.ts#L237) | [11](content/a1/11-arbeit.yaml#L138) | гл. 11 |
| Noch einmal, bitte. | 2 | 5 · 1 · 4 · 1 | [02-s1](src/story/scenes/02.ts#L94) [02-s3](src/story/scenes/02.ts#L350) [02-s4](src/story/scenes/02.ts#L531) [02-s6](src/story/scenes/02.ts#L687) | [02](content/a1/02-zahlen.yaml#L138) | гл. 2 |
| noch nicht | 11 | 4 · 2 · 1 · 2 | [11-s5](src/story/scenes/11.ts#L564) [12-s1](src/story/scenes/12.ts#L47) | [09](content/a1/09-stadt.yaml#L825) [11](content/a1/11-arbeit.yaml#L44) | гл. 11 |
| Schade! | 7 | 2 · 2 · 1 · 1 | [06-s4](src/story/scenes/06.ts#L523) [07-s5](src/story/scenes/07.ts#L617) | [07](content/a1/07-freizeit.yaml#L66) | гл. 7 |
| weg sein (от sein) | экз. | 11 · 6 · 1 · 5 | [02-s2](src/story/scenes/02.ts#L197) [03-s3](src/story/scenes/03.ts#L277) [06-s1](src/story/scenes/06.ts#L72) [08-s4](src/story/scenes/08.ts#L486) [08-s6](src/story/scenes/08.ts#L795) [10-s5](src/story/scenes/10.ts#L518) [12-s2](src/story/scenes/12.ts#L199) [12-s6](src/story/scenes/12.ts#L685) | [01](content/a1/01-kennenlernen.yaml#L607) | — |
| weh tun | экз. | 3 · 1 · 2 · 1 | [10-s1](src/story/scenes/10.ts#L39) [10-s2](src/story/scenes/10.ts#L215) [10-s6](src/story/scenes/10.ts#L651) | [10](content/a1/10-gesundheit.yaml#L60) | гл. 10 |
| Wie bitte? | 2 | 4 · 2 · 4 · 1 | [02-s2](src/story/scenes/02.ts#L172) [02-s4](src/story/scenes/02.ts#L532) [02-s6](src/story/scenes/02.ts#L687) [06-s6](src/story/scenes/06.ts#L747) | [01](content/a1/01-kennenlernen.yaml#L58) [02](content/a1/02-zahlen.yaml#L137) | гл. 2, 6 |
| Wie geht's? | 1 | 8 · 1 · 6 · 3 | [01-s1](src/story/scenes/01.ts#L69) [01-s3](src/story/scenes/01.ts#L219) [01-s4](src/story/scenes/01.ts#L407) [01-s5](src/story/scenes/01.ts#L533) | [01](content/a1/01-kennenlernen.yaml#L110) | гл. 1 |
| Wie komme ich zum …? | 9 | 2 · 1 · 2 · 1 | [09-i1](src/story/scenes/09.ts#L255) [09-s6](src/story/scenes/09.ts#L741) | [09](content/a1/09-stadt.yaml#L3) | гл. 9 |
| Wie spät ist es? | 6 | 2 · 1 · 2 · 1 | [06-s4](src/story/scenes/06.ts#L524) [06-s6](src/story/scenes/06.ts#L747) | [06](content/a1/06-tagesablauf.yaml#L32) | гл. 6 |
| wohnen in | 1 | 15 · 2 · 10 · 9 | [01-s1](src/story/scenes/01.ts#L19) [01-s3](src/story/scenes/01.ts#L219) [01-s5](src/story/scenes/01.ts#L547) [01-s6](src/story/scenes/01.ts#L579) [08-s5](src/story/scenes/08.ts#L609) [08-s6](src/story/scenes/08.ts#L727) | [01](content/a1/01-kennenlernen.yaml#L42) [02](content/a1/02-zahlen.yaml#L810) [03](content/a1/03-familie.yaml#L66) [08](content/a1/08-wohnen.yaml#L668) [11](content/a1/11-arbeit.yaml#L213) | гл. 1, 2, 3, 4 |
| zu Fuß | 9 | 5 · 2 · 4 · 2 | [09-s6](src/story/scenes/09.ts#L753) [12-s3](src/story/scenes/12.ts#L281) | [09](content/a1/09-stadt.yaml#L42) | гл. 9 |
| Zusammen oder getrennt? | 4 | 3 · 1 · 2 · 1 | [04-s4](src/story/scenes/04.ts#L459) [04-s5](src/story/scenes/04.ts#L652) | [04](content/a1/04-essen.yaml#L44) | гл. 4 |

### Числа, время, цвета и другие группы (30)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| achtzehn | экз. | 3 · 1 · 2 · 2 | [04-s4](src/story/scenes/04.ts#L469) | — | гл. 5 |
| blau | экз. | 3 · 2 · 2 · 1 | [05-s2](src/story/scenes/05.ts#L210) [08-s3](src/story/scenes/08.ts#L354) [08-s5](src/story/scenes/08.ts#L602) | — | гл. 3, 5 |
| Deutschland | 1, экз. | 7 · 1 · 5 · 5 | [01-s2](src/story/scenes/01.ts#L209) [01-s6](src/story/scenes/01.ts#L579) | [01](content/a1/01-kennenlernen.yaml#L132) [11](content/a1/11-arbeit.yaml#L72) | гл. 1 |
| der Dienstag | 6, экз. | 8 · 2 · 6 · 3 | [07-s2](src/story/scenes/07.ts#L158) [09-s1](src/story/scenes/09.ts#L40) [09-s3](src/story/scenes/09.ts#L302) | [06](content/a1/06-tagesablauf.yaml#L132) [11](content/a1/11-arbeit.yaml#L198) | гл. 6 |
| der Donnerstag | 6, экз. | 2 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L36) | [06](content/a1/06-tagesablauf.yaml#L134) [10](content/a1/10-gesundheit.yaml#L216) | гл. 6 |
| dritte | экз. | 9 · 3 · 5 · 1 | [08-s2](src/story/scenes/08.ts#L221) [09-s3](src/story/scenes/09.ts#L302) [10-s2](src/story/scenes/10.ts#L119) | [08](content/a1/08-wohnen.yaml#L224) [09](content/a1/09-stadt.yaml#L636) [12](content/a1/12-reisen.yaml#L469) | — |
| erste | экз. | 14 · 3 · 8 · 6 | [08-s2](src/story/scenes/08.ts#L221) [08-i1](src/story/scenes/08.ts#L269) [08-s3](src/story/scenes/08.ts#L324) [08-s5](src/story/scenes/08.ts#L643) [08-s6](src/story/scenes/08.ts#L727) [10-s2](src/story/scenes/10.ts#L124) [10-s4](src/story/scenes/10.ts#L431) [12-s6](src/story/scenes/12.ts#L659) | [01](content/a1/01-kennenlernen.yaml#L27) [08](content/a1/08-wohnen.yaml#L15) [09](content/a1/09-stadt.yaml#L159) [11](content/a1/11-arbeit.yaml#L190) [12](content/a1/12-reisen.yaml#L13) | гл. 12 |
| der Freitag | 6, экз. | 6 · 3 · 6 · 0 | [06-s3](src/story/scenes/06.ts#L286) [06-i1](src/story/scenes/06.ts#L467) [09-s3](src/story/scenes/09.ts#L302) [11-s1](src/story/scenes/11.ts#L76) | [06](content/a1/06-tagesablauf.yaml#L135) [07](content/a1/07-freizeit.yaml#L213) [10](content/a1/10-gesundheit.yaml#L184) [12](content/a1/12-reisen.yaml#L375) | гл. 6, 7 |
| gelb | экз. | 7 · 2 · 3 · 1 | [05-s1](src/story/scenes/05.ts#L54) [05-s2](src/story/scenes/05.ts#L200) [05-s5](src/story/scenes/05.ts#L599) [05-s6](src/story/scenes/05.ts#L796) [09-s2](src/story/scenes/09.ts#L164) [09-i1](src/story/scenes/09.ts#L251) | — | — |
| grau | экз. | 3 · 2 · 1 · 0 | [05-s2](src/story/scenes/05.ts#L210) [11-s6](src/story/scenes/11.ts#L636) | — | — |
| der Herbst | 12, экз. | 9 · 1 · 4 · 5 | [12-s1](src/story/scenes/12.ts#L37) [12-s4](src/story/scenes/12.ts#L399) [12-s6](src/story/scenes/12.ts#L657) | [12](content/a1/12-reisen.yaml#L137) | гл. 12 |
| der Juli | экз. | 2 · 2 · 2 · 0 | [11-s1](src/story/scenes/11.ts#L76) [12-s4](src/story/scenes/12.ts#L445) | [12](content/a1/12-reisen.yaml#L173) | гл. 12 |
| der Juni | экз. | 5 · 1 · 2 · 1 | [12-s1](src/story/scenes/12.ts#L37) [12-s4](src/story/scenes/12.ts#L445) | [08](content/a1/08-wohnen.yaml#L472) [12](content/a1/12-reisen.yaml#L40) | гл. 12 |
| das Kilo | экз. | 17 · 2 · 9 · 6 | [05-s1](src/story/scenes/05.ts#L80) [05-s3](src/story/scenes/05.ts#L290) [05-s4](src/story/scenes/05.ts#L475) [05-s5](src/story/scenes/05.ts#L660) [08-s2](src/story/scenes/08.ts#L176) | [05](content/a1/05-einkaufen.yaml#L34) | гл. 5 |
| der Liter | экз. | 20 · 2 · 15 · 5 | [05-s1](src/story/scenes/05.ts#L62) [05-s2](src/story/scenes/05.ts#L221) [05-s3](src/story/scenes/05.ts#L302) [05-i1](src/story/scenes/05.ts#L433) [05-s5](src/story/scenes/05.ts#L580) | [05](content/a1/05-einkaufen.yaml#L108) | гл. 5 |
| der Meter | экз. | 6 · 1 · 3 · 1 | [12-s4](src/story/scenes/12.ts#L389) [12-s6](src/story/scenes/12.ts#L656) | [08](content/a1/08-wohnen.yaml#L164) | гл. 8 |
| der Nachmittag | 6, экз. | 4 · 2 · 4 · 1 | [06-s1](src/story/scenes/06.ts#L117) [06-s2](src/story/scenes/06.ts#L192) [07-s2](src/story/scenes/07.ts#L197) | [06](content/a1/06-tagesablauf.yaml#L93) [08](content/a1/08-wohnen.yaml#L64) | гл. 6 |
| neunzehn | экз. | 6 · 3 · 3 · 5 | [02-s3](src/story/scenes/02.ts#L347) [03-s6](src/story/scenes/03.ts#L717) [05-s2](src/story/scenes/05.ts#L175) [05-s6](src/story/scenes/05.ts#L699) | [08](content/a1/08-wohnen.yaml#L248) [12](content/a1/12-reisen.yaml#L187) | — |
| neunzig | экз. | 7 · 2 · 5 · 1 | [03-s1](src/story/scenes/03.ts#L47) [03-s6](src/story/scenes/03.ts#L715) [04-s3](src/story/scenes/04.ts#L293) | [02](content/a1/02-zahlen.yaml#L835) [05](content/a1/05-einkaufen.yaml#L75) | — |
| null | 2, экз. | 13 · 3 · 6 · 11 | [02-s1](src/story/scenes/02.ts#L32) [02-s3](src/story/scenes/02.ts#L235) [02-i1](src/story/scenes/02.ts#L390) [02-s5](src/story/scenes/02.ts#L582) [02-s6](src/story/scenes/02.ts#L664) [03-s2](src/story/scenes/03.ts#L152) [08-s4](src/story/scenes/08.ts#L517) | [01](content/a1/01-kennenlernen.yaml#L623) [02](content/a1/02-zahlen.yaml#L44) [03](content/a1/03-familie.yaml#L713) [04](content/a1/04-essen.yaml#L951) [05](content/a1/05-einkaufen.yaml#L863) [06](content/a1/06-tagesablauf.yaml#L759) [07](content/a1/07-freizeit.yaml#L853) [08](content/a1/08-wohnen.yaml#L899) [09](content/a1/09-stadt.yaml#L791) [10](content/a1/10-gesundheit.yaml#L755) [11](content/a1/11-arbeit.yaml#L766) [12](content/a1/12-reisen.yaml#L852) | гл. 2 |
| der Osten | экз. | 2 · 1 · 2 · 0 | [08-s3](src/story/scenes/08.ts#L375) | [08](content/a1/08-wohnen.yaml#L40) | гл. 8 |
| das Pfund | экз. | 4 · 1 · 3 · 0 | [05-s1](src/story/scenes/05.ts#L104) [05-s3](src/story/scenes/05.ts#L302) [05-s5](src/story/scenes/05.ts#L672) | [05](content/a1/05-einkaufen.yaml#L40) | гл. 5 |
| schwarz | экз. | 2 · 1 · 1 · 0 | [05-s1](src/story/scenes/05.ts#L54) [05-s6](src/story/scenes/05.ts#L796) | — | — |
| der Sommer | 12, экз. | 16 · 2 · 6 · 9 | [10-s1](src/story/scenes/10.ts#L85) [10-s2](src/story/scenes/10.ts#L119) [10-s3](src/story/scenes/10.ts#L319) [10-s4](src/story/scenes/10.ts#L370) [12-s4](src/story/scenes/12.ts#L399) [12-s6](src/story/scenes/12.ts#L657) | [05](content/a1/05-einkaufen.yaml#L227) [12](content/a1/12-reisen.yaml#L136) | гл. 12 |
| die Stunde | 6, экз. | 14 · 2 · 10 · 10 | [06-s1](src/story/scenes/06.ts#L69) [06-s2](src/story/scenes/06.ts#L161) [06-s4](src/story/scenes/06.ts#L502) [06-s5](src/story/scenes/06.ts#L586) [06-s6](src/story/scenes/06.ts#L786) [12-s3](src/story/scenes/12.ts#L281) [12-s4](src/story/scenes/12.ts#L432) | [06](content/a1/06-tagesablauf.yaml#L108) [12](content/a1/12-reisen.yaml#L48) | гл. 6 |
| vierzig | экз. | 5 · 3 · 0 · 1 | [07-s4](src/story/scenes/07.ts#L416) [09-s2](src/story/scenes/09.ts#L163) [10-s5](src/story/scenes/10.ts#L506) | [02](content/a1/02-zahlen.yaml#L193) | — |
| der Vormittag | 6, экз. | 7 · 2 · 5 · 2 | [06-s1](src/story/scenes/06.ts#L117) [06-s2](src/story/scenes/06.ts#L159) [06-s5](src/story/scenes/06.ts#L615) [07-s2](src/story/scenes/07.ts#L197) | [06](content/a1/06-tagesablauf.yaml#L64) [11](content/a1/11-arbeit.yaml#L74) | гл. 6 |
| der Winter | 12, экз. | 3 · 1 · 3 · 2 | [12-s1](src/story/scenes/12.ts#L69) [12-s4](src/story/scenes/12.ts#L421) [12-s6](src/story/scenes/12.ts#L658) | [05](content/a1/05-einkaufen.yaml#L224) [12](content/a1/12-reisen.yaml#L138) | гл. 12 |
| das Wochenende | 6, 12, экз. | 8 · 3 · 5 · 5 | [06-s2](src/story/scenes/06.ts#L252) [06-i1](src/story/scenes/06.ts#L446) [06-s6](src/story/scenes/06.ts#L787) [07-s6](src/story/scenes/07.ts#L691) [11-s1](src/story/scenes/11.ts#L63) | [06](content/a1/06-tagesablauf.yaml#L72) [07](content/a1/07-freizeit.yaml#L23) [12](content/a1/12-reisen.yaml#L147) | гл. 6, 7 |
| zweite | экз. | 23 · 3 · 13 · 6 | [08-i1](src/story/scenes/08.ts#L276) [08-s3](src/story/scenes/08.ts#L324) [09-s2](src/story/scenes/09.ts#L198) [09-s3](src/story/scenes/09.ts#L302) | [08](content/a1/08-wohnen.yaml#L48) [09](content/a1/09-stadt.yaml#L34) [12](content/a1/12-reisen.yaml#L40) | гл. 12 |

## Слова: закреплено

212 слов.

### Существительные (61)

die Arbeit, der Arzt, das Boot, das Brot, das Brötchen, das Buch, der Buchstabe, der Bus, das Café, der Dank, das Ei, die Entschuldigung, das Fahrrad, die Farbe, das Fischbrötchen, das Foto, die Frage, die Frau, der Geburtstag, der Hafen, die Hand, das Handy, das Haus, der Herr, der Hunger, die Jacke, der Kaffee, die Karte, der Keller, der Koch, die Küche, der Kuchen, der Laden, das Land, die Linie, der Mann, der Name, die Nummer, der Opa, die Party, der Platz, die Polizei, das Problem, der Regen, das Schild, der Schlüssel, der Stock, das Stück, die Suppe, die Tasche, die Tasse, der Tee, das Telefon, das Thema, der Tisch, die Tüte, die Uhr, das Wasser, das Wort, die Zeit, das Zimmer

### Глаголы (37)

arbeiten, bitten, bleiben, brauchen, bringen, danken, essen, fahren, finden, fragen, geben, gehen, haben, heißen, hören, kaufen, kochen, kommen, machen, möchten, mögen, nehmen, passen, regnen, sagen, schlafen, schreiben, segeln, sehen, sein, sitzen, sprechen, stehen, suchen, trinken, warten, wissen

### Прилагательные и наречия (17)

alt, falsch, frei, früh, gestern, groß, gut, heute, immer, jetzt, klein, lang, lieber, neu, nie, schwer, spät

### Служебные слова (54)

ab, aber, all-, also, an, auch, auf, aus, bei, bis, bitte, da, danke, dann, dein-, der, ein-, er, es, für, hier, ich, ihn, in, ja, kein, lieb-, mehr, mein, mit, nach, nein, nicht, nichts, noch, nur, oder, ohne, schon, sehr, sie, um, und, unser-, viel, von, vor, was, welch-, wer, wie, wir, wo, zu

### Выражения (10)

auf sein, Gute Nacht!, Guten Morgen!, hallo, Hunger haben, kommen aus, Moin!, tschüss, Zeit haben, zu sein

### Числа, время, цвета и другие группы (33)

der Abend, acht, deutsch, drei, dreißig, eins, elf, der Euro, fünf, fünfzig, halb, hundert, das Jahr, die Minute, der Mittag, der Montag, morgen, die Nacht, neun, rot, der Samstag, sechs, sieben, der Sonntag, der Tag, vier, das Viertel, weiß, die Woche, zehn, zwanzig, zwei, zwölf
