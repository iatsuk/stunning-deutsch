# Индекс покрытия A1

Сгенерирован `scripts/a1-index.mjs` при `pnpm content`; не редактируйте вручную. Правила подсчёта и
решения автора — `A1-PLAN.md`, эталон — `content/reference/start-deutsch-1.yaml`.

Слово закреплено: не меньше 4 встреч в новой версии Moin, не меньше чем в 3 главах, из них 1 в
действии и 1 на слух. Правило — 6 встреч в 4 главах, 2 в действии, 2 на слух. Числа в
таблицах: встреч · глав · действий · на слух. Раунд перед главой — часть главы. Столбец «Откуда»: номера уроков A1
и «экз.» для словаря экзамена. Внутри разделов слова сгруппированы по частям речи и идут по алфавиту.

Разделы: [Сводка](#сводка) · [Грамматика](#грамматика) · [Слова: нет](#слова-нет) · [Слова: один раз](#слова-один-раз) · [Слова: слабо](#слова-слабо) · [Слова: закрепит A2](#слова-закрепит-a2) · [Слова: закреплено](#слова-закреплено)

## Сводка

| Что | закреплено | закрепит A2 | слабо | один раз | нет |
|---|---|---|---|---|---|
| Все обязательные слова (963) | 763 | 95 | 57 | 13 | 35 |
| из них словарь экзамена | 621 | 74 | 41 | 12 | 35 |
| из них слова уроков | 397 | 37 | 19 | 3 | 0 |
| Грамматика (66) | 54 | 0 | 12 | 0 | 0 |

«Закрепит A2» — слова, которые игрок впервые встречает в главе 11 или позже: в A1 за ними идут одна-две главы, и до порога их доводит сезон A2.

В очереди повторения новой версии 657 обязательных слов, из них ниже порога 79. Повторение в порог не входит; в таблицах такие слова помечены ↻.

| Часть речи | закреплено | закрепит A2 | слабо | один раз | нет |
|---|---|---|---|---|---|
| Существительные | 369 | 47 | 14 | 2 | 9 |
| Глаголы | 114 | 18 | 12 | 7 | 6 |
| Прилагательные и наречия | 79 | 12 | 13 | 2 | 8 |
| Служебные слова | 68 | 0 | 6 | 0 | 8 |
| Выражения | 43 | 7 | 9 | 1 | 3 |
| Числа, время, цвета и другие группы | 90 | 11 | 3 | 1 | 1 |

## Грамматика

### Глагол

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Präsens, окончания по лицам | закреплено | 261 · 13 · 121 · 149 | есть | [01-s1](src/story/scenes/01.ts#L52) [01-s2](src/story/scenes/01.ts#L165) [01-s3](src/story/scenes/01.ts#L220) [01-i1](src/story/scenes/01.ts#L384) [01-s4](src/story/scenes/01.ts#L421) [01-s5](src/story/scenes/01.ts#L506) |
| Präsens со сменой корня (e → i, a → ä) | закреплено | 119 · 12 · 45 · 53 | есть | [01-s3](src/story/scenes/01.ts#L220) [01-s4](src/story/scenes/01.ts#L422) [01-s5](src/story/scenes/01.ts#L502) [02-s4](src/story/scenes/02.ts#L471) [04-s2](src/story/scenes/04.ts#L240) [04-s3](src/story/scenes/04.ts#L391) |
| sein | закреплено | 626 · 13 · 271 · 317 | есть | [01-s1](src/story/scenes/01.ts#L34) [01-s2](src/story/scenes/01.ts#L153) |
| haben | закреплено | 253 · 12 · 125 · 136 | есть | [02-s1](src/story/scenes/02.ts#L56) [02-s2](src/story/scenes/02.ts#L151) [02-s3](src/story/scenes/02.ts#L234) [02-i1](src/story/scenes/02.ts#L402) |
| Отделяемые приставки и рамка предложения | закреплено | 63 · 10 · 36 · 28 | есть | [01-s3](src/story/scenes/01.ts#L220) [05-s3](src/story/scenes/05.ts#L312) [05-s4](src/story/scenes/05.ts#L496) [06-s2](src/story/scenes/06.ts#L223) [06-s3](src/story/scenes/06.ts#L295) |
| Perfekt с haben | закреплено | 74 · 4 · 43 · 35 | есть | [10-s1](src/story/scenes/10.ts#L59) [11-s1](src/story/scenes/11.ts#L38) [11-i1](src/story/scenes/11.ts#L162) [11-s2](src/story/scenes/11.ts#L199) |
| Perfekt с sein | слабо | 21 · 3 · 17 · 8 | есть | [11-s2](src/story/scenes/11.ts#L219) [12-s1](src/story/scenes/12.ts#L151) [12-s2](src/story/scenes/12.ts#L174) [12-s3](src/story/scenes/12.ts#L28) [12-s5](src/story/scenes/12.ts#L560) |
| Präteritum war и hatte | закреплено | 30 · 5 · 15 · 10 | есть | [09-s1](src/story/scenes/09.ts#L63) [09-i1](src/story/scenes/09.ts#L268) [10-s1](src/story/scenes/10.ts#L58) [11-i1](src/story/scenes/11.ts#L162) [11-s2](src/story/scenes/11.ts#L219) [11-s3](src/story/scenes/11.ts#L301) |
| möchten | закреплено | 18 · 5 · 11 · 11 | есть | [04-s1](src/story/scenes/04.ts#L53) [04-s2](src/story/scenes/04.ts#L168) [04-s5](src/story/scenes/04.ts#L569) [04-s6](src/story/scenes/04.ts#L693) [08-s1](src/story/scenes/08.ts#L103) [10-s6](src/story/scenes/10.ts#L668) |
| Ich hätte gern …, Ich würde gern … как готовые выражения | слабо | 5 · 3 · 3 · 2 | есть | [04-s4](src/story/scenes/04.ts#L462) [07-s5](src/story/scenes/07.ts#L545) [13-s4](src/story/scenes/13.ts#L424) |
| können | закреплено | 35 · 5 · 24 · 14 | есть | [07-s1](src/story/scenes/07.ts#L39) [07-s2](src/story/scenes/07.ts#L169) [07-s3](src/story/scenes/07.ts#L298) |
| wollen | закреплено | 26 · 4 · 14 · 10 | есть | [07-s1](src/story/scenes/07.ts#L44) [07-s2](src/story/scenes/07.ts#L181) [07-s3](src/story/scenes/07.ts#L286) [07-s4](src/story/scenes/07.ts#L501) [07-s5](src/story/scenes/07.ts#L544) |
| müssen | закреплено | 13 · 4 · 8 · 4 | есть | [08-s4](src/story/scenes/08.ts#L565) [10-s1](src/story/scenes/10.ts#L83) [10-s3](src/story/scenes/10.ts#L274) [10-s4](src/story/scenes/10.ts#L452) [10-s5](src/story/scenes/10.ts#L546) [10-s6](src/story/scenes/10.ts#L668) |
| dürfen | закреплено | 27 · 4 · 16 · 6 | есть | [09-s2](src/story/scenes/09.ts#L215) [10-s1](src/story/scenes/10.ts#L83) [10-s2](src/story/scenes/10.ts#L172) [10-s3](src/story/scenes/10.ts#L254) [10-s4](src/story/scenes/10.ts#L29) |
| sollen | слабо | 18 · 3 · 13 · 10 | есть | [10-s4](src/story/scenes/10.ts#L30) [10-s5](src/story/scenes/10.ts#L581) [10-s6](src/story/scenes/10.ts#L31) [11-s5](src/story/scenes/11.ts#L29) |
| mögen | слабо | 11 · 3 · 4 · 4 | есть | [07-s3](src/story/scenes/07.ts#L397) [07-s4](src/story/scenes/07.ts#L487) [08-s1](src/story/scenes/08.ts#L103) [12-s3](src/story/scenes/12.ts#L303) [12-s6](src/story/scenes/12.ts#L634) |
| Модальный глагол и инфинитив в конце | закреплено | 65 · 8 · 40 · 27 | есть | [04-s6](src/story/scenes/04.ts#L693) [07-s1](src/story/scenes/07.ts#L44) [07-s2](src/story/scenes/07.ts#L181) [07-s3](src/story/scenes/07.ts#L286) [07-s4](src/story/scenes/07.ts#L501) [07-s5](src/story/scenes/07.ts#L545) |
| Повелительное наклонение на Sie | закреплено | 32 · 6 · 20 · 15 | есть | [02-s3](src/story/scenes/02.ts#L245) [09-s2](src/story/scenes/09.ts#L29) [09-i1](src/story/scenes/09.ts#L294) [09-s3](src/story/scenes/09.ts#L336) [09-s4](src/story/scenes/09.ts#L484) |
| Повелительное наклонение на du | закреплено | 66 · 11 · 27 · 42 | есть | [02-s3](src/story/scenes/02.ts#L380) [02-s4](src/story/scenes/02.ts#L498) [03-s6](src/story/scenes/03.ts#L776) [05-s1](src/story/scenes/05.ts#L90) [05-s3](src/story/scenes/05.ts#L312) [05-s6](src/story/scenes/05.ts#L736) |
| Повелительное наклонение на ihr | закреплено | 15 · 6 · 8 · 7 | есть | [06-s1](src/story/scenes/06.ts#L35) [07-s4](src/story/scenes/07.ts#L467) [08-s1](src/story/scenes/08.ts#L85) [09-s2](src/story/scenes/09.ts#L189) [09-s3](src/story/scenes/09.ts#L336) [09-s4](src/story/scenes/09.ts#L556) |

### Предложение

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Глагол на втором месте, время на первом | закреплено | 79 · 13 · 41 · 40 | есть | [01-s1](src/story/scenes/01.ts#L124) [01-s3](src/story/scenes/01.ts#L237) [02-s2](src/story/scenes/02.ts#L202) [02-s3](src/story/scenes/02.ts#L234) [03-s3](src/story/scenes/03.ts#L279) [03-s6](src/story/scenes/03.ts#L819) |
| Вопрос с W-словом | закреплено | 158 · 13 · 92 · 82 | есть | [01-s1](src/story/scenes/01.ts#L44) [01-s2](src/story/scenes/01.ts#L153) [01-s3](src/story/scenes/01.ts#L220) |
| Вопрос да/нет и ответ ja / nein / doch | закреплено | 47 · 12 · 32 · 24 | есть | [02-s1](src/story/scenes/02.ts#L52) [02-s3](src/story/scenes/02.ts#L230) [02-i1](src/story/scenes/02.ts#L418) [02-s4](src/story/scenes/02.ts#L438) [02-s5](src/story/scenes/02.ts#L596) [02-s6](src/story/scenes/02.ts#L678) |
| nicht и kein | закреплено | 255 · 13 · 107 · 120 | есть | [01-s1](src/story/scenes/01.ts#L145) [01-s3](src/story/scenes/01.ts#L220) [01-s5](src/story/scenes/01.ts#L539) [02-s2](src/story/scenes/02.ts#L206) [02-s4](src/story/scenes/02.ts#L524) [02-s5](src/story/scenes/02.ts#L614) |
| und, oder, aber | закреплено | 221 · 13 · 76 · 93 | есть | [01-s3](src/story/scenes/01.ts#L220) [01-i1](src/story/scenes/01.ts#L388) [01-s4](src/story/scenes/01.ts#L415) [01-s6](src/story/scenes/01.ts#L599) [02-s2](src/story/scenes/02.ts#L153) [02-s3](src/story/scenes/02.ts#L245) |
| denn как союз причины | слабо | 3 · 2 · 3 · 1 | есть | [07-s1](src/story/scenes/07.ts#L66) [07-s2](src/story/scenes/07.ts#L181) [08-s6](src/story/scenes/08.ts#L756) |
| dann | закреплено | 25 · 8 · 7 · 11 | есть | [06-s5](src/story/scenes/06.ts#L611) [06-s6](src/story/scenes/06.ts#L765) [07-s2](src/story/scenes/07.ts#L261) [08-s6](src/story/scenes/08.ts#L756) [09-s2](src/story/scenes/09.ts#L228) [09-i1](src/story/scenes/09.ts#L279) |
| wenn (понимание) | слабо | 5 · 3 · 2 · 3 | есть | [10-s4](src/story/scenes/10.ts#L462) [11-s5](src/story/scenes/11.ts#L563) [12-s2](src/story/scenes/12.ts#L179) |
| es gibt | закреплено | 12 · 6 · 3 · 7 | есть | [05-s2](src/story/scenes/05.ts#L206) [07-s1](src/story/scenes/07.ts#L38) [07-s3](src/story/scenes/07.ts#L298) [08-s1](src/story/scenes/08.ts#L88) [09-s1](src/story/scenes/09.ts#L85) [12-s6](src/story/scenes/12.ts#L684) |

### Существительное и артикль

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Множественное число | закреплено | 214 · 13 · 78 · 91 | есть | [01-s3](src/story/scenes/01.ts#L220) [01-s6](src/story/scenes/01.ts#L599) [02-s1](src/story/scenes/02.ts#L120) [02-s2](src/story/scenes/02.ts#L207) [02-s3](src/story/scenes/02.ts#L230) [02-i1](src/story/scenes/02.ts#L413) |
| Винительный падеж | закреплено | 158 · 11 · 89 · 66 | есть | [03-s4](src/story/scenes/03.ts#L573) [04-s1](src/story/scenes/04.ts#L53) [04-s2](src/story/scenes/04.ts#L171) [04-s3](src/story/scenes/04.ts#L293) |
| Дательный на вопрос «где?» (in, auf, an) | закреплено | 70 · 10 · 31 · 15 | есть | [04-s2](src/story/scenes/04.ts#L167) [05-s1](src/story/scenes/05.ts#L89) [05-s2](src/story/scenes/05.ts#L147) [05-s3](src/story/scenes/05.ts#L298) [06-s2](src/story/scenes/06.ts#L164) [06-s3](src/story/scenes/06.ts#L429) |
| Предлоги с дательным (mit, zu, bei, von, aus, nach) | закреплено | 138 · 12 · 66 · 51 | есть | [01-s1](src/story/scenes/01.ts#L19) [01-s3](src/story/scenes/01.ts#L220) [01-s5](src/story/scenes/01.ts#L567) [01-s6](src/story/scenes/01.ts#L631) [02-s3](src/story/scenes/02.ts#L245) [03-s2](src/story/scenes/03.ts#L221) |
| Чей? Имя + s (Annas Bruder) | слабо | 10 · 2 · 10 · 1 | есть | [03-s1](src/story/scenes/03.ts#L65) [03-s3](src/story/scenes/03.ts#L296) [03-s4](src/story/scenes/03.ts#L497) [03-s5](src/story/scenes/03.ts#L644) [04-s3](src/story/scenes/04.ts#L296) |
| Сложные слова: род по последней части | закреплено | 241 · 13 · 136 · 104 | есть | [01-s1](src/story/scenes/01.ts#L81) [02-s1](src/story/scenes/02.ts#L84) [02-s2](src/story/scenes/02.ts#L137) [02-s3](src/story/scenes/02.ts#L245) [02-s6](src/story/scenes/02.ts#L678) [03-s3](src/story/scenes/03.ts#L279) |
| Женский род на -in | закреплено | 53 · 8 · 35 · 32 | есть | [03-s3](src/story/scenes/03.ts#L410) [03-s4](src/story/scenes/03.ts#L473) [03-s5](src/story/scenes/03.ts#L620) [04-s2](src/story/scenes/04.ts#L824) [04-s3](src/story/scenes/04.ts#L833) [06-s2](src/story/scenes/06.ts#L496) |
| dieser, diese, dieses | слабо | 4 · 4 · 1 · 3 | есть | [05-i1](src/story/scenes/05.ts#L449) [08-s3](src/story/scenes/08.ts#L453) [09-s2](src/story/scenes/09.ts#L189) [10-s2](src/story/scenes/10.ts#L172) |
| Притяжательные mein, dein, sein, ihr, unser, euer, Ihr | закреплено | 96 · 13 · 46 · 54 | есть | [01-s1](src/story/scenes/01.ts#L120) [01-i1](src/story/scenes/01.ts#L383) [02-s3](src/story/scenes/02.ts#L380) [03-s1](src/story/scenes/03.ts#L44) [03-s2](src/story/scenes/03.ts#L156) |
| welcher, welche, welches | закреплено | 15 · 4 · 9 · 8 | есть | [01-s3](src/story/scenes/01.ts#L220) [02-s3](src/story/scenes/02.ts#L241) [05-s2](src/story/scenes/05.ts#L160) [05-s3](src/story/scenes/05.ts#L312) [05-i1](src/story/scenes/05.ts#L443) [05-s5](src/story/scenes/05.ts#L650) |

### Местоимения

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Местоимения в винительном (mich, dich, ihn …) | закреплено | 31 · 9 · 15 · 18 | есть | [02-s4](src/story/scenes/02.ts#L455) [05-s2](src/story/scenes/05.ts#L181) [05-s4](src/story/scenes/05.ts#L577) [05-s5](src/story/scenes/05.ts#L599) [05-s6](src/story/scenes/05.ts#L815) [06-s1](src/story/scenes/06.ts#L152) |
| Местоимения в дательном (mir, dir, ihm, Ihnen) | закреплено | 23 · 9 · 10 · 11 | есть | [01-s1](src/story/scenes/01.ts#L74) [01-s3](src/story/scenes/01.ts#L220) [06-s5](src/story/scenes/06.ts#L630) [07-s3](src/story/scenes/07.ts#L411) [07-s5](src/story/scenes/07.ts#L544) [07-i1](src/story/scenes/07.ts#L666) |
| Глаголы с дательным (gehören, gefallen, helfen, danken, geben) | закреплено | 20 · 9 · 10 · 11 | есть | [04-i1](src/story/scenes/04.ts#L412) [06-s6](src/story/scenes/06.ts#L743) [07-s3](src/story/scenes/07.ts#L410) [07-s5](src/story/scenes/07.ts#L575) [08-s2](src/story/scenes/08.ts#L182) [08-s5](src/story/scenes/08.ts#L666) |
| sich, uns (Wir sehen uns) | закреплено | 10 · 7 · 5 · 6 | есть | [01-s6](src/story/scenes/01.ts#L608) [06-s1](src/story/scenes/06.ts#L151) [07-s2](src/story/scenes/07.ts#L232) [09-s6](src/story/scenes/09.ts#L776) [12-s6](src/story/scenes/12.ts#L635) [02-разминка](src/story/scenes/warmups.ts#L85) |
| Вопросы wen? и wem? | закреплено | 8 · 5 · 3 · 5 | есть | [08-s2](src/story/scenes/08.ts#L182) [09-s6](src/story/scenes/09.ts#L732) [10-s3](src/story/scenes/10.ts#L250) [12-s3](src/story/scenes/12.ts#L291) [13-s6](src/story/scenes/13.ts#L603) |
| man | закреплено | 9 · 5 · 3 · 4 | есть | [07-s1](src/story/scenes/07.ts#L39) [09-s2](src/story/scenes/09.ts#L170) [10-s2](src/story/scenes/10.ts#L172) [12-s6](src/story/scenes/12.ts#L684) [13-i1](src/story/scenes/13.ts#L351) [13-s5](src/story/scenes/13.ts#L488) |
| etwas, nichts, alles, mehr | закреплено | 88 · 12 · 31 · 43 | есть | [01-s2](src/story/scenes/01.ts#L165) [03-s3](src/story/scenes/03.ts#L279) [04-s2](src/story/scenes/04.ts#L218) [04-s3](src/story/scenes/04.ts#L299) [04-s4](src/story/scenes/04.ts#L504) [04-s5](src/story/scenes/04.ts#L573) |

### Прилагательное и числа

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Прилагательное после sein (zu groß) | закреплено | 99 · 13 · 34 · 51 | есть | [01-s2](src/story/scenes/01.ts#L165) [01-s4](src/story/scenes/01.ts#L436) [02-s5](src/story/scenes/02.ts#L558) [03-s2](src/story/scenes/03.ts#L245) [04-s2](src/story/scenes/04.ts#L229) [04-s3](src/story/scenes/04.ts#L299) |
| gern, lieber, am liebsten | закреплено | 25 · 7 · 16 · 12 | есть | [04-s3](src/story/scenes/04.ts#L299) [04-s4](src/story/scenes/04.ts#L462) [04-s6](src/story/scenes/04.ts#L766) [07-s1](src/story/scenes/07.ts#L88) [07-s3](src/story/scenes/07.ts#L393) [07-s4](src/story/scenes/07.ts#L454) |
| Сравнение (besser, mehr, als) | закреплено | 13 · 4 · 7 · 5 | есть | [07-s3](src/story/scenes/07.ts#L298) [08-s3](src/story/scenes/08.ts#L387) [10-s3](src/story/scenes/10.ts#L254) [10-s5](src/story/scenes/10.ts#L558) [12-s1](src/story/scenes/12.ts#L49) [12-s3](src/story/scenes/12.ts#L303) |
| Цены и количества | закреплено | 91 · 10 · 51 · 35 | есть | [02-s6](src/story/scenes/02.ts#L711) [03-s2](src/story/scenes/03.ts#L225) [03-i1](src/story/scenes/03.ts#L225) [03-s6](src/story/scenes/03.ts#L737) [04-s3](src/story/scenes/04.ts#L299) [04-s4](src/story/scenes/04.ts#L491) |
| Время на часах | закреплено | 179 · 10 · 87 · 70 | есть | [02-s5](src/story/scenes/02.ts#L582) [04-s2](src/story/scenes/04.ts#L167) [04-s3](src/story/scenes/04.ts#L295) [04-s4](src/story/scenes/04.ts#L457) [06-s1](src/story/scenes/06.ts#L36) |
| Порядковые числа и дата | закреплено | 40 · 6 · 21 · 13 | есть | [08-s2](src/story/scenes/08.ts#L232) [08-i1](src/story/scenes/08.ts#L280) [08-s3](src/story/scenes/08.ts#L335) [08-s5](src/story/scenes/08.ts#L670) [08-s6](src/story/scenes/08.ts#L765) [09-s2](src/story/scenes/09.ts#L228) |

### Предлоги

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| um, am, im, von … bis во времени | закреплено | 146 · 8 · 74 · 58 | есть | [06-s1](src/story/scenes/06.ts#L36) [06-s2](src/story/scenes/06.ts#L178) |
| ab и für во времени (ab Montag, für zwei Wochen) | закреплено | 11 · 6 · 7 · 2 | есть | [08-s3](src/story/scenes/08.ts#L387) [09-s2](src/story/scenes/09.ts#L169) [10-s3](src/story/scenes/10.ts#L251) [10-s4](src/story/scenes/10.ts#L473) [11-s5](src/story/scenes/11.ts#L552) [12-s3](src/story/scenes/12.ts#L288) |
| nach и vor во времени (nach dem Essen) | закреплено | 10 · 5 · 5 · 5 | есть | [08-s6](src/story/scenes/08.ts#L732) [09-s2](src/story/scenes/09.ts#L169) [10-s3](src/story/scenes/10.ts#L251) [10-s4](src/story/scenes/10.ts#L473) [12-s4](src/story/scenes/12.ts#L455) [13-s5](src/story/scenes/13.ts#L478) |
| über (über zwanzig Minuten) | слабо | 4 · 2 · 3 · 1 | есть | [09-s2](src/story/scenes/09.ts#L169) [10-s3](src/story/scenes/10.ts#L250) [10-s4](src/story/scenes/10.ts#L474) |
| nach Hause / zu Hause | закреплено | 19 · 5 · 11 · 6 | есть | [07-s2](src/story/scenes/07.ts#L147) [09-s5](src/story/scenes/09.ts#L676) [09-s6](src/story/scenes/09.ts#L731) [10-s4](src/story/scenes/10.ts#L30) [12-s1](src/story/scenes/12.ts#L122) |
| in, an, auf + винительный для направления (in die Stadt) | закреплено | 46 · 9 · 21 · 15 | есть | [04-s2](src/story/scenes/04.ts#L249) [04-s5](src/story/scenes/04.ts#L582) [06-s2](src/story/scenes/06.ts#L219) [06-s5](src/story/scenes/06.ts#L634) [06-s6](src/story/scenes/06.ts#L787) [07-s1](src/story/scenes/07.ts#L44) |
| unter | слабо | 5 · 3 · 2 · 3 | есть | [08-s2](src/story/scenes/08.ts#L213) [09-s2](src/story/scenes/09.ts#L226) [11-s2](src/story/scenes/11.ts#L219) |
| ohne и für (ohne dich, für meinen Freund) | закреплено | 50 · 12 · 25 · 13 | есть | [01-s1](src/story/scenes/01.ts#L145) [02-s2](src/story/scenes/02.ts#L206) [02-s4](src/story/scenes/02.ts#L455) [03-s5](src/story/scenes/03.ts#L692) [04-s1](src/story/scenes/04.ts#L159) [04-s2](src/story/scenes/04.ts#L177) |

### Словообразование

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Существительные на -ung | закреплено | 140 · 12 · 79 · 63 | есть | [02-s2](src/story/scenes/02.ts#L137) [02-s3](src/story/scenes/02.ts#L245) [02-s5](src/story/scenes/02.ts#L660) [04-s2](src/story/scenes/04.ts#L233) [04-s3](src/story/scenes/04.ts#L299) [04-s4](src/story/scenes/04.ts#L507) |
| Прилагательные с un-, -los, -bar | слабо | 3 · 2 · 2 · 1 | есть | [11-s1](src/story/scenes/11.ts#L74) [12-s4](src/story/scenes/12.ts#L469) |
| hellblau, dunkelblau | закреплено | 28 · 6 · 11 · 3 | есть | [05-s2](src/story/scenes/05.ts#L260) [05-s3](src/story/scenes/05.ts#L312) [05-s5](src/story/scenes/05.ts#L608) [05-s6](src/story/scenes/05.ts#L730) [06-s2](src/story/scenes/06.ts#L208) [06-i1](src/story/scenes/06.ts#L465) |
| Причастие как прилагательное (geöffnet, geschlossen) | закреплено | 7 · 4 · 4 · 3 | есть | [06-s3](src/story/scenes/06.ts#L295) [08-s4](src/story/scenes/08.ts#L565) [10-s5](src/story/scenes/10.ts#L532) [12-s3](src/story/scenes/12.ts#L303) |
| Погода с es (Es regnet) | закреплено | 28 · 6 · 6 · 6 | есть | [05-s1](src/story/scenes/05.ts#L40) [06-s6](src/story/scenes/06.ts#L731) [09-s1](src/story/scenes/09.ts#L41) [09-i1](src/story/scenes/09.ts#L282) [09-s3](src/story/scenes/09.ts#L321) [11-s1](src/story/scenes/11.ts#L142) |
| Ich habe …schmerzen, … tut weh | слабо | 13 · 2 · 7 · 9 | есть | [10-s1](src/story/scenes/10.ts#L40) [10-s2](src/story/scenes/10.ts#L123) [10-s6](src/story/scenes/10.ts#L674) [11-s3](src/story/scenes/11.ts#L301) |

## Слова: нет

35 слов.

### Существительные (9)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| der Beamte | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Bekannte | экз. | 0 · 0 · 0 · 0 | — | — | — |
| der Blick | экз. | 0 · 0 · 0 · 0 | — | [11](content/a1/11-arbeit.yaml#L6) | гл. 3 |
| die Halle | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Hausfrau | экз. | 0 · 0 · 0 · 0 | — | [11](content/a1/11-arbeit.yaml#L116) | — |
| der Kindergarten | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Reparatur (от reparieren) | экз. | 0 · 0 · 0 · 0 | — | — | — |
| die Schule | экз. | 0 · 0 · 0 · 0 | — | [01](content/a1/01-kennenlernen.yaml#L29) [02](content/a1/02-zahlen.yaml#L29) [06](content/a1/06-tagesablauf.yaml#L27) [07](content/a1/07-freizeit.yaml#L26) [11](content/a1/11-arbeit.yaml#L27) | гл. 11 |
| der Verwandte | экз. | 0 · 0 · 0 · 0 | — | [03](content/a1/03-familie.yaml#L106) | — |

### Глаголы (6)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| abholen | экз. | 0 · 0 · 0 · 0 | — | — | гл. 10 |
| anbieten | экз. | 0 · 0 · 0 · 0 | — | — | — |
| drücken | экз. | 0 · 0 · 0 · 0 | — | — | — |
| erlauben | экз. | 0 · 0 · 0 · 0 | — | — | — |
| fehlen | экз. | 0 · 0 · 0 · 0 | — | — | гл. 10 |
| kriegen | экз. | 0 · 0 · 0 · 0 | — | — | — |

### Прилагательные и наречия (8)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| automatisch | экз. | 0 · 0 · 0 · 0 | — | — | — |
| beide | экз. | 0 · 0 · 0 · 0 | — | — | гл. 5, 11 |
| bekannt | экз. | 0 · 0 · 0 · 0 | — | — | — |
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

13 слов.

### Существительные (2)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| das Mittagessen | 4 | 1 · 1 · 1 · 1 | [04-s1](src/story/scenes/04.ts#L110) | [04](content/a1/04-essen.yaml#L193) | гл. 4 |
| der Text | экз. | 1 · 1 · 0 · 1 | [09-s3](src/story/scenes/09.ts#L445) | [02](content/a1/02-zahlen.yaml#L258) [03](content/a1/03-familie.yaml#L227) [04](content/a1/04-essen.yaml#L299) [05](content/a1/05-einkaufen.yaml#L212) [06](content/a1/06-tagesablauf.yaml#L196) [07](content/a1/07-freizeit.yaml#L225) [08](content/a1/08-wohnen.yaml#L261) [09](content/a1/09-stadt.yaml#L211) [10](content/a1/10-gesundheit.yaml#L181) [11](content/a1/11-arbeit.yaml#L195) [12](content/a1/12-reisen.yaml#L204) | — |

### Глаголы (7)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| anfangen | 6, экз. | 1 · 1 · 1 · 0 | [06-s4](src/story/scenes/06.ts#L538) | [06](content/a1/06-tagesablauf.yaml#L36) [09](content/a1/09-stadt.yaml#L91) | гл. 6 |
| anmelden | экз. | 1 · 1 · 0 · 1 | [10-s2](src/story/scenes/10.ts#L150) | — | — |
| ausfüllen | экз. | 1 · 1 · 0 · 1 | [10-s2](src/story/scenes/10.ts#L172) | — | — |
| bekommen | экз. | 1 · 1 · 0 · 1 | [10-s5](src/story/scenes/10.ts#L589) | — | гл. 11 |
| feiern | экз. | 1 · 1 · 0 · 1 | [08-s1](src/story/scenes/08.ts#L101) | — | — |
| lachen | экз. | 1 · 1 · 0 · 1 | [09-i1](src/story/scenes/09.ts#L268) | — | — |
| verstehen | экз. | 1 · 1 · 1 · 0 | [07-s6](src/story/scenes/07.ts#L753) | — | — |

### Прилагательные и наречия (2)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| einfach | экз. | 1 · 1 · 0 · 1 | [09-i1](src/story/scenes/09.ts#L294) | — | — |
| wunderbar | экз. | 1 · 1 · 0 · 1 | [07-s2](src/story/scenes/07.ts#L232) | — | — |

### Выражения (1)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| was für ein | экз. | 1 · 1 · 0 · 1 | [10-s6](src/story/scenes/10.ts#L663) | — | — |

### Числа, время, цвета и другие группы (1)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| der Mittwoch | 6, экз. | 1 · 1 · 0 · 0 | [10-s1](src/story/scenes/10.ts#L39) | [06](content/a1/06-tagesablauf.yaml#L133) | гл. 6, 10 |

## Слова: слабо

57 слов.

### Существительные (14)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| das Abendessen | 4 | 4 · 2 · 2 · 1 | [04-s1](src/story/scenes/04.ts#L110) [04-s6](src/story/scenes/04.ts#L692) [12-s3](src/story/scenes/12.ts#L303) | [04](content/a1/04-essen.yaml#L194) | гл. 4 |
| Argentinien | 1 | 8 · 1 · 7 · 3 | [01-s3](src/story/scenes/01.ts#L220) [01-s5](src/story/scenes/01.ts#L506) [01-s6](src/story/scenes/01.ts#L599) | [01](content/a1/01-kennenlernen.yaml#L40) [11](content/a1/11-arbeit.yaml#L213) | гл. 1, 3 |
| der Doktor | экз. | 12 · 1 · 2 · 6 | [10-s1](src/story/scenes/10.ts#L87) [10-s2](src/story/scenes/10.ts#L122) [10-s3](src/story/scenes/10.ts#L337) [10-s4](src/story/scenes/10.ts#L388) [10-s6](src/story/scenes/10.ts#L628) | [11](content/a1/11-arbeit.yaml#L36) | — |
| der Durst | экз. | 2 · 2 · 1 · 0 | [04-s5](src/story/scenes/04.ts#L642) [13-s5](src/story/scenes/13.ts#L488) | [04](content/a1/04-essen.yaml#L207) | гл. 4 |
| der Gruß | экз. | 13 · 13 · 13 · 0 | [01-s5](src/story/scenes/01.ts#L567) [02-s5](src/story/scenes/02.ts#L596) [03-s5](src/story/scenes/03.ts#L692) [04-s5](src/story/scenes/04.ts#L642) [05-s5](src/story/scenes/05.ts#L650) [06-s5](src/story/scenes/06.ts#L634) [07-s5](src/story/scenes/07.ts#L619) [08-s5](src/story/scenes/08.ts#L698) | [03](content/a1/03-familie.yaml#L230) [07](content/a1/07-freizeit.yaml#L229) [10](content/a1/10-gesundheit.yaml#L201) [12](content/a1/12-reisen.yaml#L80) | гл. 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 |
| die Hausnummer | 2 | 3 · 1 · 2 · 1 | [02-s3](src/story/scenes/02.ts#L245) | [02](content/a1/02-zahlen.yaml#L134) | гл. 2 |
| der Kiosk | экз. | 12 · 3 · 7 · 0 | [06-s2](src/story/scenes/06.ts#L164) [06-s3](src/story/scenes/06.ts#L429) [06-s5](src/story/scenes/06.ts#L634) [06-s6](src/story/scenes/06.ts#L731) [07-s3](src/story/scenes/07.ts#L298) [08-i1](src/story/scenes/08.ts#L279) [08-s6](src/story/scenes/08.ts#L813) | [01](content/a1/01-kennenlernen.yaml#L598) | — |
| der Kurs | экз. | 2 · 1 · 0 · 0 | [03-s4](src/story/scenes/03.ts#L475) | [01](content/a1/01-kennenlernen.yaml#L26) [02](content/a1/02-zahlen.yaml#L141) [06](content/a1/06-tagesablauf.yaml#L36) [07](content/a1/07-freizeit.yaml#L223) [10](content/a1/10-gesundheit.yaml#L58) [11](content/a1/11-arbeit.yaml#L74) [12](content/a1/12-reisen.yaml#L198) | гл. 6 |
| die Nebenkosten | 8 | 2 · 1 · 2 · 0 | [08-s3](src/story/scenes/08.ts#L387) | [08](content/a1/08-wohnen.yaml#L40) | гл. 8 |
| der Schmerz | 10 | 9 · 1 · 5 · 7 | [10-s1](src/story/scenes/10.ts#L87) [10-s2](src/story/scenes/10.ts#L123) [10-s6](src/story/scenes/10.ts#L674) | [10](content/a1/10-gesundheit.yaml#L18) | гл. 10 |
| die U-Bahn ↻ | 9 | 2 · 2 · 2 · 2 | [09-s1](src/story/scenes/09.ts#L113) [10-разминка](src/story/scenes/warmups.ts#L86) | [09](content/a1/09-stadt.yaml#L120) | гл. 9 |
| das Wiederhören | экз. | 6 · 2 · 4 · 2 | [02-s1](src/story/scenes/02.ts#L104) [02-s3](src/story/scenes/02.ts#L361) [02-s6](src/story/scenes/02.ts#L691) [03-s6](src/story/scenes/03.ts#L776) | [02](content/a1/02-zahlen.yaml#L50) [06](content/a1/06-tagesablauf.yaml#L199) [10](content/a1/10-gesundheit.yaml#L187) | гл. 2 |
| das Wiedersehen | экз. | 9 · 3 · 8 · 0 | [01-s1](src/story/scenes/01.ts#L62) [01-s3](src/story/scenes/01.ts#L220) [02-s1](src/story/scenes/02.ts#L121) [02-s6](src/story/scenes/02.ts#L745) [05-s1](src/story/scenes/05.ts#L128) | [01](content/a1/01-kennenlernen.yaml#L70) [02](content/a1/02-zahlen.yaml#L303) | гл. 1 |
| die Zigarette ↻ | экз. | 3 · 3 · 2 · 2 | [10-s2](src/story/scenes/10.ts#L213) [12-s6](src/story/scenes/12.ts#L798) [13-s3](src/story/scenes/13.ts#L663) | — | — |

### Глаголы (12)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| dauern | 6, экз. | 3 · 2 · 2 · 3 | [06-s5](src/story/scenes/06.ts#L597) [09-s5](src/story/scenes/09.ts#L703) | [06](content/a1/06-tagesablauf.yaml#L116) | гл. 6 |
| erzählen | экз. | 2 · 1 · 1 · 2 | [10-s5](src/story/scenes/10.ts#L569) | — | — |
| glauben | экз. | 3 · 2 · 1 · 3 | [06-s2](src/story/scenes/06.ts#L165) [09-s5](src/story/scenes/09.ts#L703) | — | — |
| holen | экз. | 5 · 2 · 2 · 4 | [07-s2](src/story/scenes/07.ts#L150) [07-s4](src/story/scenes/07.ts#L455) [11-i1](src/story/scenes/11.ts#L151) | — | гл. 11 |
| kennen | экз. | 3 · 3 · 0 · 3 | [04-s3](src/story/scenes/04.ts#L385) [09-i1](src/story/scenes/09.ts#L295) [10-s1](src/story/scenes/10.ts#L96) | [11](content/a1/11-arbeit.yaml#L199) | — |
| mitnehmen | экз. | 5 · 2 · 3 · 3 | [08-i1](src/story/scenes/08.ts#L30) [08-s3](src/story/scenes/08.ts#L387) [12-s1](src/story/scenes/12.ts#L122) | [10](content/a1/10-gesundheit.yaml#L272) | — |
| öffnen | экз. | 3 · 2 · 1 · 2 | [10-s5](src/story/scenes/10.ts#L532) [12-s3](src/story/scenes/12.ts#L303) | [06](content/a1/06-tagesablauf.yaml#L214) [09](content/a1/09-stadt.yaml#L553) | гл. 7 |
| reparieren | экз. | 2 · 2 · 0 · 2 | [06-s6](src/story/scenes/06.ts#L762) [11-s6](src/story/scenes/11.ts#L677) | — | — |
| schicken | экз. | 2 · 2 · 0 · 2 | [05-s6](src/story/scenes/05.ts#L790) [06-s1](src/story/scenes/06.ts#L93) | — | — |
| tun | экз. | 7 · 2 · 5 · 2 | [10-s1](src/story/scenes/10.ts#L40) [10-s2](src/story/scenes/10.ts#L231) [10-s3](src/story/scenes/10.ts#L353) [10-s6](src/story/scenes/10.ts#L687) [11-s3](src/story/scenes/11.ts#L301) | [10](content/a1/10-gesundheit.yaml#L60) [12](content/a1/12-reisen.yaml#L50) | гл. 10, 11 |
| willkommen | экз. | 3 · 2 · 1 · 3 | [09-s6](src/story/scenes/09.ts#L798) [12-s5](src/story/scenes/12.ts#L29) | [12](content/a1/12-reisen.yaml#L34) | — |
| zahlen | экз. | 2 · 2 · 1 · 1 | [02-s6](src/story/scenes/02.ts#L678) [13-s3](src/story/scenes/13.ts#L273) | [02](content/a1/02-zahlen.yaml#L1) [04](content/a1/04-essen.yaml#L42) | — |

### Прилагательные и наречия (13)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| besser | экз. | 4 · 1 · 2 · 2 | [10-s3](src/story/scenes/10.ts#L254) [10-s5](src/story/scenes/10.ts#L558) | — | — |
| bisschen | экз. | 5 · 2 · 3 · 2 | [01-s3](src/story/scenes/01.ts#L220) [01-s4](src/story/scenes/01.ts#L415) [13-s5](src/story/scenes/13.ts#L505) | [01](content/a1/01-kennenlernen.yaml#L46) [03](content/a1/03-familie.yaml#L229) [06](content/a1/06-tagesablauf.yaml#L70) [11](content/a1/11-arbeit.yaml#L214) | — |
| fertig | экз. | 2 · 1 · 1 · 1 | [07-s3](src/story/scenes/07.ts#L298) | — | — |
| geöffnet (от öffnen) | экз. | 3 · 2 · 1 · 2 | [10-s5](src/story/scenes/10.ts#L532) [12-s3](src/story/scenes/12.ts#L303) | [06](content/a1/06-tagesablauf.yaml#L214) [09](content/a1/09-stadt.yaml#L553) | — |
| geschlossen (от schließen) | экз. | 4 · 2 · 3 · 1 | [06-s3](src/story/scenes/06.ts#L295) [08-s4](src/story/scenes/08.ts#L565) | [06](content/a1/06-tagesablauf.yaml#L213) [09](content/a1/09-stadt.yaml#L234) | гл. 9, 11 |
| gesund | 10 | 5 · 2 · 1 · 2 | [10-s1](src/story/scenes/10.ts#L58) [11-s1](src/story/scenes/11.ts#L37) | [10](content/a1/10-gesundheit.yaml#L99) | гл. 10 |
| glücklich ↻ | экз. | 3 · 3 · 2 · 2 | [10-s4](src/story/scenes/10.ts#L409) [12-s3](src/story/scenes/12.ts#L771) [13-s3](src/story/scenes/13.ts#L663) | — | — |
| herzlich | экз. | 15 · 13 · 15 · 0 | [01-s5](src/story/scenes/01.ts#L567) [02-s5](src/story/scenes/02.ts#L596) [03-s5](src/story/scenes/03.ts#L692) [03-s6](src/story/scenes/03.ts#L743) [04-s5](src/story/scenes/04.ts#L642) [05-s5](src/story/scenes/05.ts#L650) [06-s5](src/story/scenes/06.ts#L634) [07-s5](src/story/scenes/07.ts#L619) | [12](content/a1/12-reisen.yaml#L207) | гл. 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 |
| leise | экз. | 2 · 1 · 1 · 2 | [10-s2](src/story/scenes/10.ts#L195) | — | — |
| möglich ↻ | экз. | 3 · 3 · 2 · 2 | [10-s4](src/story/scenes/10.ts#L508) [12-s6](src/story/scenes/12.ts#L798) [13-s3](src/story/scenes/13.ts#L663) | — | — |
| normal ↻ | экз. | 3 · 3 · 2 · 2 | [10-s4](src/story/scenes/10.ts#L409) [12-s6](src/story/scenes/12.ts#L798) [13-s3](src/story/scenes/13.ts#L663) | — | — |
| schlecht ↻ | экз. | 3 · 3 · 2 · 2 | [10-s1](src/story/scenes/10.ts#L79) [12-s6](src/story/scenes/12.ts#L798) [13-s3](src/story/scenes/13.ts#L663) | — | гл. 12 |
| warm | 12 | 10 · 2 · 3 · 6 | [08-s3](src/story/scenes/08.ts#L387) [08-s6](src/story/scenes/08.ts#L752) [12-s1](src/story/scenes/12.ts#L27) [12-s3](src/story/scenes/12.ts#L303) | [04](content/a1/04-essen.yaml#L245) [08](content/a1/08-wohnen.yaml#L258) [12](content/a1/12-reisen.yaml#L125) | гл. 12 |

### Служебные слова (6)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| dir | экз. | 4 · 2 · 3 · 1 | [01-s1](src/story/scenes/01.ts#L74) [01-s3](src/story/scenes/01.ts#L220) [07-s3](src/story/scenes/07.ts#L411) | [06](content/a1/06-tagesablauf.yaml#L469) [09](content/a1/09-stadt.yaml#L66) | — |
| durch | экз. | 4 · 1 · 2 · 3 | [09-i1](src/story/scenes/09.ts#L294) [09-s4](src/story/scenes/09.ts#L32) | — | — |
| euer | экз. | 3 · 1 · 3 · 1 | [03-s1](src/story/scenes/03.ts#L95) [03-s5](src/story/scenes/03.ts#L652) | [03](content/a1/03-familie.yaml#L42) | — |
| ihm (от er) | экз. | 4 · 4 · 0 · 2 | [06-s5](src/story/scenes/06.ts#L630) [07-s5](src/story/scenes/07.ts#L544) [10-s3](src/story/scenes/10.ts#L248) [13-s5](src/story/scenes/13.ts#L560) | [11](content/a1/11-arbeit.yaml#L238) [12](content/a1/12-reisen.yaml#L228) | — |
| seit | экз. | 3 · 3 · 0 · 3 | [06-s5](src/story/scenes/06.ts#L619) [10-s4](src/story/scenes/10.ts#L429) [13-s2](src/story/scenes/13.ts#L207) | — | — |
| so | экз. | 6 · 5 · 0 · 4 | [06-s1](src/story/scenes/06.ts#L45) [07-s2](src/story/scenes/07.ts#L252) [09-s1](src/story/scenes/09.ts#L86) [11-s1](src/story/scenes/11.ts#L112) [11-s2](src/story/scenes/11.ts#L198) [13-s6](src/story/scenes/13.ts#L604) | [02](content/a1/02-zahlen.yaml#L69) [05](content/a1/05-einkaufen.yaml#L163) [06](content/a1/06-tagesablauf.yaml#L42) [07](content/a1/07-freizeit.yaml#L746) [09](content/a1/09-stadt.yaml#L87) [11](content/a1/11-arbeit.yaml#L36) [12](content/a1/12-reisen.yaml#L66) | — |

### Выражения (9)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| Achtung | экз. | 4 · 2 · 2 · 4 | [09-s2](src/story/scenes/09.ts#L29) [12-s2](src/story/scenes/12.ts#L191) | [09](content/a1/09-stadt.yaml#L214) [12](content/a1/12-reisen.yaml#L246) | — |
| Auf Wiederhören! | 2 | 5 · 2 · 3 · 2 | [02-s1](src/story/scenes/02.ts#L104) [02-s3](src/story/scenes/02.ts#L361) [02-s6](src/story/scenes/02.ts#L691) [03-s6](src/story/scenes/03.ts#L776) | [02](content/a1/02-zahlen.yaml#L50) [06](content/a1/06-tagesablauf.yaml#L199) [10](content/a1/10-gesundheit.yaml#L187) | гл. 2 |
| Auf Wiedersehen! | 1 | 8 · 3 · 7 · 0 | [01-s1](src/story/scenes/01.ts#L62) [01-s3](src/story/scenes/01.ts#L220) [02-s1](src/story/scenes/02.ts#L121) [02-s6](src/story/scenes/02.ts#L745) [05-s1](src/story/scenes/05.ts#L128) | [01](content/a1/01-kennenlernen.yaml#L70) [02](content/a1/02-zahlen.yaml#L303) | гл. 1 |
| Durst haben | 4 | 2 · 2 · 1 · 0 | [04-s5](src/story/scenes/04.ts#L642) [13-s5](src/story/scenes/13.ts#L488) | [04](content/a1/04-essen.yaml#L207) | гл. 4 |
| Gute Besserung! | 10 | 4 · 2 · 3 · 0 | [10-s1](src/story/scenes/10.ts#L72) [10-s5](src/story/scenes/10.ts#L542) [11-s4](src/story/scenes/11.ts#L476) | [10](content/a1/10-gesundheit.yaml#L3) | гл. 10 |
| ins Kino gehen | 7 | 4 · 1 · 4 · 2 | [07-s1](src/story/scenes/07.ts#L44) [07-s2](src/story/scenes/07.ts#L181) [07-s5](src/story/scenes/07.ts#L560) | [07](content/a1/07-freizeit.yaml#L131) | гл. 7 |
| Tennis spielen ↻ | 7 | 3 · 3 · 3 · 3 | [07-s1](src/story/scenes/07.ts#L90) [08-s3](src/story/scenes/08.ts#L878) [10-разминка](src/story/scenes/warmups.ts#L85) | [07](content/a1/07-freizeit.yaml#L39) | гл. 7 |
| Wie komme ich zum …? | 9 | 2 · 1 · 2 · 1 | [09-i1](src/story/scenes/09.ts#L287) [09-s6](src/story/scenes/09.ts#L790) | [09](content/a1/09-stadt.yaml#L3) | гл. 9 |
| zu Fuß | 9 | 5 · 2 · 4 · 2 | [09-s6](src/story/scenes/09.ts#L802) [12-s3](src/story/scenes/12.ts#L303) | [09](content/a1/09-stadt.yaml#L42) | гл. 9 |

### Числа, время, цвета и другие группы (3)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| der Dienstag | 6, экз. | 8 · 2 · 6 · 3 | [07-s2](src/story/scenes/07.ts#L169) [09-s1](src/story/scenes/09.ts#L41) [09-s3](src/story/scenes/09.ts#L336) | [06](content/a1/06-tagesablauf.yaml#L132) [11](content/a1/11-arbeit.yaml#L198) | гл. 6 |
| der Freitag | 6, экз. | 7 · 3 · 6 · 0 | [06-s3](src/story/scenes/06.ts#L295) [06-i1](src/story/scenes/06.ts#L477) [09-s3](src/story/scenes/09.ts#L336) [11-s1](src/story/scenes/11.ts#L80) [11-s5](src/story/scenes/11.ts#L575) | [06](content/a1/06-tagesablauf.yaml#L135) [07](content/a1/07-freizeit.yaml#L213) [10](content/a1/10-gesundheit.yaml#L184) [12](content/a1/12-reisen.yaml#L375) | гл. 6, 7 |
| der Osten | экз. | 2 · 1 · 2 · 0 | [08-s3](src/story/scenes/08.ts#L387) | [08](content/a1/08-wohnen.yaml#L40) | гл. 8 |

## Слова: закрепит A2

95 слов.

### Существительные (47)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| der Abflug (от fliegen) ↻ | экз. | 1 · 1 · 0 · 0 | [12-s2](src/story/scenes/12.ts#L210) | — | — |
| die Abreise | 12 | 2 · 1 · 1 · 1 | [12-s3](src/story/scenes/12.ts#L303) | [12](content/a1/12-reisen.yaml#L112) | гл. 12 |
| die Anrede ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L574) [12-s6](src/story/scenes/12.ts#L798) [13-s6](src/story/scenes/13.ts#L700) | [07](content/a1/07-freizeit.yaml#L240) [10](content/a1/10-gesundheit.yaml#L201) [12](content/a1/12-reisen.yaml#L200) | — |
| die Anreise ↻ | 12 | 4 · 2 · 3 · 3 | [12-s3](src/story/scenes/12.ts#L303) [12-s6](src/story/scenes/12.ts#L704) [13-s2](src/story/scenes/13.ts#L654) | [12](content/a1/12-reisen.yaml#L111) | гл. 12 |
| der Anschluss ↻ | экз. | 3 · 2 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L303) [13-s2](src/story/scenes/13.ts#L654) | — | — |
| der Arbeitsplatz ↻ | экз. | 3 · 3 · 2 · 2 | [11-s1](src/story/scenes/11.ts#L131) [12-s6](src/story/scenes/12.ts#L798) [13-s6](src/story/scenes/13.ts#L700) | — | — |
| die Aussage ↻ | экз. | 3 · 3 · 2 · 2 | [11-s3](src/story/scenes/11.ts#L406) [12-s2](src/story/scenes/12.ts#L762) [13-s6](src/story/scenes/13.ts#L700) | [03](content/a1/03-familie.yaml#L223) [05](content/a1/05-einkaufen.yaml#L212) [07](content/a1/07-freizeit.yaml#L221) [11](content/a1/11-arbeit.yaml#L191) [12](content/a1/12-reisen.yaml#L242) | — |
| der Bogen ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L574) [12-s2](src/story/scenes/12.ts#L762) [13-s6](src/story/scenes/13.ts#L700) | — | гл. 2 |
| der Chef ↻ | экз. | 3 · 3 · 2 · 2 | [11-s1](src/story/scenes/11.ts#L131) [12-s2](src/story/scenes/12.ts#L762) [13-s6](src/story/scenes/13.ts#L700) | — | — |
| die Dame | экз. | 2 · 1 · 1 · 2 | [13-s2](src/story/scenes/13.ts#L27) | — | — |
| das Datum ↻ | 12, экз. | 3 · 2 · 3 · 1 | [12-s3](src/story/scenes/12.ts#L303) [13-s2](src/story/scenes/13.ts#L654) | [12](content/a1/12-reisen.yaml#L130) | гл. 12 |
| das Doppelzimmer ↻ | 12, экз. | 3 · 2 · 3 · 1 | [12-s3](src/story/scenes/12.ts#L303) [13-s2](src/story/scenes/13.ts#L654) | [12](content/a1/12-reisen.yaml#L106) | гл. 12 |
| der Drucker (от drucken) ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L637) [12-s2](src/story/scenes/12.ts#L762) [13-s2](src/story/scenes/13.ts#L654) | — | — |
| die Durchsage ↻ | 12, экз. | 3 · 2 · 2 · 1 | [12-s2](src/story/scenes/12.ts#L180) [13-s2](src/story/scenes/13.ts#L156) | [05](content/a1/05-einkaufen.yaml#L208) [09](content/a1/09-stadt.yaml#L207) [12](content/a1/12-reisen.yaml#L98) | гл. 12 |
| das Einzelzimmer ↻ | 12, экз. | 10 · 2 · 7 · 4 | [12-s1](src/story/scenes/12.ts#L136) [12-s3](src/story/scenes/12.ts#L303) [13-s3](src/story/scenes/13.ts#L289) [13-s4](src/story/scenes/13.ts#L408) | [12](content/a1/12-reisen.yaml#L36) | гл. 12 |
| der Fehler ↻ | экз. | 3 · 3 · 2 · 2 | [11-s2](src/story/scenes/11.ts#L211) [12-s2](src/story/scenes/12.ts#L762) [13-s2](src/story/scenes/13.ts#L654) | — | — |
| die Ferien ↻ | 12 | 1 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L705) | [12](content/a1/12-reisen.yaml#L148) | гл. 12 |
| der Flughafen ↻ | 12, экз. | 3 · 2 · 3 · 3 | [12-s1](src/story/scenes/12.ts#L136) [12-s2](src/story/scenes/12.ts#L264) [13-s2](src/story/scenes/13.ts#L654) | [12](content/a1/12-reisen.yaml#L94) | гл. 12 |
| das Flugzeug ↻ | 12, экз. | 3 · 2 · 2 · 2 | [12-s2](src/story/scenes/12.ts#L210) [13-s5](src/story/scenes/13.ts#L691) | [12](content/a1/12-reisen.yaml#L93) | гл. 12 |
| der Friseur ↻ | 11 | 3 · 3 · 3 · 3 | [11-s1](src/story/scenes/11.ts#L134) [12-s2](src/story/scenes/12.ts#L762) [13-s2](src/story/scenes/13.ts#L654) | [11](content/a1/11-arbeit.yaml#L101) | гл. 11 |
| das Gepäck ↻ | экз. | 3 · 2 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L303) [13-s5](src/story/scenes/13.ts#L691) | — | — |
| die Halbpension ↻ | экз. | 3 · 2 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L303) [13-s5](src/story/scenes/13.ts#L691) | — | — |
| das Hotel ↻ | 12, экз. | 21 · 2 · 12 · 6 | [12-s1](src/story/scenes/12.ts#L27) [12-s2](src/story/scenes/12.ts#L227) [12-s3](src/story/scenes/12.ts#L278) [12-s5](src/story/scenes/12.ts#L513) | [12](content/a1/12-reisen.yaml#L26) | гл. 12 |
| der Informatiker ↻ | 11 | 2 · 2 · 2 · 2 | [11-s1](src/story/scenes/11.ts#L134) [13-s2](src/story/scenes/13.ts#L654) | [11](content/a1/11-arbeit.yaml#L103) | гл. 11 |
| die Information | экз. | 2 · 1 · 1 · 2 | [13-s2](src/story/scenes/13.ts#L27) | [06](content/a1/06-tagesablauf.yaml#L197) [09](content/a1/09-stadt.yaml#L236) | — |
| der Ingenieur ↻ | 11 | 2 · 2 · 2 · 2 | [11-s1](src/story/scenes/11.ts#L134) [13-s2](src/story/scenes/13.ts#L654) | [11](content/a1/11-arbeit.yaml#L100) | гл. 11 |
| die Jahreszeit ↻ | 12 | 1 · 1 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L264) | [12](content/a1/12-reisen.yaml#L130) | гл. 12 |
| der Job ↻ | экз. | 2 · 2 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L76) [13-s2](src/story/scenes/13.ts#L654) | — | — |
| der Koffer ↻ | 12, экз. | 8 · 2 · 6 · 5 | [12-s1](src/story/scenes/12.ts#L78) [12-s2](src/story/scenes/12.ts#L264) [12-s3](src/story/scenes/12.ts#L278) [12-s6](src/story/scenes/12.ts#L704) [13-s5](src/story/scenes/13.ts#L691) | [12](content/a1/12-reisen.yaml#L99) | гл. 12 |
| der Kugelschreiber ↻ | экз. | 2 · 2 · 1 · 1 | [11-s5](src/story/scenes/11.ts#L637) [13-s2](src/story/scenes/13.ts#L654) | — | — |
| das Lied | экз. | 11 · 2 · 5 · 4 | [11-s3](src/story/scenes/11.ts#L301) [11-s5](src/story/scenes/11.ts#L623) [13-s1](src/story/scenes/13.ts#L38) [13-s6](src/story/scenes/13.ts#L590) | — | — |
| die Papiere ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L575) [12-s6](src/story/scenes/12.ts#L798) [13-s2](src/story/scenes/13.ts#L654) | — | — |
| das Praktikum ↻ | экз. | 2 · 2 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L76) [13-s5](src/story/scenes/13.ts#L691) | — | — |
| der Regenschirm ↻ | 12 | 5 · 2 · 5 · 3 | [12-s1](src/story/scenes/12.ts#L41) [12-s6](src/story/scenes/12.ts#L704) [13-s5](src/story/scenes/13.ts#L691) | [12](content/a1/12-reisen.yaml#L70) | гл. 12 |
| die Reise (от reisen) ↻ | 12, экз. | 7 · 2 · 4 · 5 | [12-s2](src/story/scenes/12.ts#L264) [12-s6](src/story/scenes/12.ts#L704) [13-s6](src/story/scenes/13.ts#L603) | [12](content/a1/12-reisen.yaml#L1) | гл. 12 |
| das Reisebüro (от reisen) ↻ | экз. | 1 · 1 · 0 · 0 | [12-s2](src/story/scenes/12.ts#L190) | — | — |
| der Reiseführer (от reisen) ↻ | экз. | 1 · 1 · 0 · 0 | [12-s2](src/story/scenes/12.ts#L190) | — | — |
| die Rezeption | экз. | 1 · 1 · 0 · 0 | [12-s3](src/story/scenes/12.ts#L278) | — | — |
| Satz | экз. | 2 · 2 · 1 · 1 | [11-s5](src/story/scenes/11.ts#L639) [13-s5](src/story/scenes/13.ts#L691) | [07](content/a1/07-freizeit.yaml#L239) [08](content/a1/08-wohnen.yaml#L485) [10](content/a1/10-gesundheit.yaml#L200) [12](content/a1/12-reisen.yaml#L199) | — |
| das Studium ↻ | экз. | 2 · 2 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L76) [13-s5](src/story/scenes/13.ts#L691) | — | — |
| der Urlaub ↻ | 12, экз. | 1 · 1 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L264) | [12](content/a1/12-reisen.yaml#L91) | гл. 12 |
| die Verspätung ↻ | 12 | 12 · 2 · 6 · 7 | [12-s2](src/story/scenes/12.ts#L191) [12-s3](src/story/scenes/12.ts#L28) [12-s6](src/story/scenes/12.ts#L704) [13-s2](src/story/scenes/13.ts#L27) | [09](content/a1/09-stadt.yaml#L215) [12](content/a1/12-reisen.yaml#L48) | гл. 12 |
| die Welt ↻ | экз. | 1 · 1 · 0 · 0 | [12-s2](src/story/scenes/12.ts#L190) | — | — |
| das Wetter ↻ | 12, экз. | 5 · 2 · 4 · 4 | [12-s1](src/story/scenes/12.ts#L38) [12-s6](src/story/scenes/12.ts#L704) [13-s5](src/story/scenes/13.ts#L691) | [12](content/a1/12-reisen.yaml#L66) | гл. 12 |
| der Wind | экз. | 3 · 1 · 1 · 2 | [12-s1](src/story/scenes/12.ts#L50) [12-s2](src/story/scenes/12.ts#L180) | [12](content/a1/12-reisen.yaml#L338) | гл. 12 |
| die Zeitung | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L77) | — | — |
| der Zoll ↻ | экз. | 2 · 2 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L684) [13-s2](src/story/scenes/13.ts#L166) | — | — |

### Глаголы (18)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| abfliegen (от fliegen) ↻ | экз. | 1 · 1 · 0 · 0 | [12-s6](src/story/scenes/12.ts#L684) | — | — |
| abgeben ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L575) [12-s6](src/story/scenes/12.ts#L798) [13-s3](src/story/scenes/13.ts#L663) | — | — |
| anklicken ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L637) [12-s6](src/story/scenes/12.ts#L798) [13-s6](src/story/scenes/13.ts#L700) | — | — |
| ankommen | экз. | 3 · 1 · 2 · 1 | [12-s2](src/story/scenes/12.ts#L245) | [12](content/a1/12-reisen.yaml#L48) | гл. 12 |
| ankreuzen ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L575) [12-s6](src/story/scenes/12.ts#L798) [13-s6](src/story/scenes/13.ts#L700) | [04](content/a1/04-essen.yaml#L299) [09](content/a1/09-stadt.yaml#L222) | — |
| bedeuten ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L639) [12-s2](src/story/scenes/12.ts#L762) [13-s6](src/story/scenes/13.ts#L700) | [08](content/a1/08-wohnen.yaml#L42) | — |
| benutzen ↻ | экз. | 3 · 3 · 2 · 2 | [11-s2](src/story/scenes/11.ts#L211) [12-s2](src/story/scenes/12.ts#L762) [13-s6](src/story/scenes/13.ts#L700) | [09](content/a1/09-stadt.yaml#L236) | — |
| besuchen | экз. | 1 · 1 · 1 · 0 | [11-s2](src/story/scenes/11.ts#L246) | [07](content/a1/07-freizeit.yaml#L64) | — |
| drucken ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L637) [12-s2](src/story/scenes/12.ts#L762) [13-s2](src/story/scenes/13.ts#L654) | — | — |
| entschuldigen | экз. | 2 · 1 · 1 · 2 | [13-s3](src/story/scenes/13.ts#L245) | — | — |
| fliegen ↻ | экз. | 1 · 1 · 0 · 0 | [12-s2](src/story/scenes/12.ts#L210) | [12](content/a1/12-reisen.yaml#L158) | — |
| freuen | экз. | 2 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L635) | — | — |
| reisen | экз. | 7 · 2 · 4 · 5 | [12-s2](src/story/scenes/12.ts#L264) [12-s6](src/story/scenes/12.ts#L704) [13-s6](src/story/scenes/13.ts#L603) | [12](content/a1/12-reisen.yaml#L1) | гл. 12 |
| reservieren | 12 | 5 · 1 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L289) | [02](content/a1/02-zahlen.yaml#L914) [12](content/a1/12-reisen.yaml#L113) | гл. 12 |
| scheinen | экз. | 4 · 2 · 1 · 0 | [12-s5](src/story/scenes/12.ts#L525) [13-s1](src/story/scenes/13.ts#L37) | [12](content/a1/12-reisen.yaml#L68) | гл. 12 |
| studieren | экз. | 2 · 1 · 1 · 1 | [13-s5](src/story/scenes/13.ts#L500) | — | — |
| übernachten ↻ | экз. | 3 · 2 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L303) [13-разминка](src/story/scenes/warmups.ts#L87) | — | — |
| verdienen ↻ | экз. | 2 · 2 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L76) [13-s5](src/story/scenes/13.ts#L691) | — | — |

### Прилагательные и наречия (12)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| arbeitslos | экз. | 1 · 1 · 0 · 1 | [11-s1](src/story/scenes/11.ts#L74) | — | — |
| ausländisch (от das Ausland) ↻ | экз. | 1 · 1 · 0 · 0 | [12-s6](src/story/scenes/12.ts#L650) | — | — |
| bewölkt ↻ | 12 | 1 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L705) | [12](content/a1/12-reisen.yaml#L123) | гл. 12 |
| circa | экз. | 3 · 1 · 2 · 2 | [13-s2](src/story/scenes/13.ts#L27) | [07](content/a1/07-freizeit.yaml#L239) [12](content/a1/12-reisen.yaml#L200) | — |
| fremd ↻ | экз. | 1 · 1 · 0 · 0 | [12-s5](src/story/scenes/12.ts#L592) | — | — |
| kalt ↻ | 12 | 3 · 2 · 2 · 2 | [12-s1](src/story/scenes/12.ts#L38) [13-разминка](src/story/scenes/warmups.ts#L87) | [08](content/a1/08-wohnen.yaml#L40) [12](content/a1/12-reisen.yaml#L66) | гл. 12 |
| kulturell ↻ | экз. | 1 · 1 · 0 · 0 | [12-s6](src/story/scenes/12.ts#L650) | — | — |
| männlich (от der Mann) ↻ | экз. | 2 · 2 · 1 · 1 | [11-s5](src/story/scenes/11.ts#L574) [13-s5](src/story/scenes/13.ts#L691) | — | — |
| selbstständig ↻ | экз. | 2 · 2 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L131) [13-s5](src/story/scenes/13.ts#L691) | — | — |
| sonnig ↻ | 12 | 1 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L705) | [12](content/a1/12-reisen.yaml#L122) | гл. 12 |
| weiblich ↻ | экз. | 2 · 2 · 1 · 1 | [11-s5](src/story/scenes/11.ts#L574) [13-s5](src/story/scenes/13.ts#L691) | [11](content/a1/11-arbeit.yaml#L345) | — |
| windig ↻ | 12 | 3 · 2 · 2 · 2 | [12-s1](src/story/scenes/12.ts#L38) [12-s6](src/story/scenes/12.ts#L705) [13-разминка](src/story/scenes/warmups.ts#L87) | [12](content/a1/12-reisen.yaml#L66) | гл. 12 |

### Выражения (7)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| arbeiten als | 11 | 1 · 1 · 1 · 0 | [11-s6](src/story/scenes/11.ts#L691) | [11](content/a1/11-arbeit.yaml#L129) | гл. 11 |
| Die Sonne scheint. | 12 | 3 · 2 · 0 · 0 | [12-s5](src/story/scenes/12.ts#L525) [13-s1](src/story/scenes/13.ts#L37) | [12](content/a1/12-reisen.yaml#L68) | гл. 12 |
| Es schneit. ↻ | 12 | 1 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L705) | [12](content/a1/12-reisen.yaml#L121) | гл. 12 |
| Es sind 20 Grad. ↻ | 12 | 1 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L705) | [12](content/a1/12-reisen.yaml#L127) | гл. 12 |
| gestern Abend ↻ | 11 | 2 · 2 · 2 · 2 | [11-s6](src/story/scenes/11.ts#L709) [13-s2](src/story/scenes/13.ts#L654) | [11](content/a1/11-arbeit.yaml#L48) | гл. 11 |
| letztes Jahr ↻ | 11 | 2 · 2 · 2 · 2 | [11-s6](src/story/scenes/11.ts#L709) [13-s5](src/story/scenes/13.ts#L691) | [11](content/a1/11-arbeit.yaml#L139) | гл. 11 |
| noch nicht | 11 | 5 · 2 · 1 · 3 | [11-s5](src/story/scenes/11.ts#L563) [12-s1](src/story/scenes/12.ts#L48) | [09](content/a1/09-stadt.yaml#L825) [11](content/a1/11-arbeit.yaml#L44) | гл. 11 |

### Числа, время, цвета и другие группы (11)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| der Deutsche ↻ | экз. | 1 · 1 · 0 · 0 | [12-s5](src/story/scenes/12.ts#L592) | — | — |
| der Donnerstag | 6, экз. | 2 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L37) | [06](content/a1/06-tagesablauf.yaml#L134) [10](content/a1/10-gesundheit.yaml#L216) | гл. 6 |
| der Europäer ↻ | экз. | 1 · 1 · 0 · 0 | [12-s5](src/story/scenes/12.ts#L592) | — | — |
| europäisch ↻ | экз. | 1 · 1 · 0 · 0 | [12-s6](src/story/scenes/12.ts#L650) | — | — |
| der Frühling ↻ | 12, экз. | 1 · 1 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L264) | [12](content/a1/12-reisen.yaml#L135) | гл. 12 |
| das Grad | экз. | 4 · 1 · 2 · 3 | [12-s1](src/story/scenes/12.ts#L50) [12-s3](src/story/scenes/12.ts#L303) [12-s6](src/story/scenes/12.ts#L705) | [12](content/a1/12-reisen.yaml#L68) | гл. 12 |
| der Herbst ↻ | 12, экз. | 12 · 2 · 6 · 7 | [12-s1](src/story/scenes/12.ts#L38) [12-s4](src/story/scenes/12.ts#L433) [12-s6](src/story/scenes/12.ts#L704) [13-s5](src/story/scenes/13.ts#L691) | [12](content/a1/12-reisen.yaml#L137) | гл. 12 |
| die Milliarde ↻ | экз. | 1 · 1 · 0 · 0 | [12-s6](src/story/scenes/12.ts#L703) | — | — |
| der Monat ↻ | 12, экз. | 1 · 1 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L264) | [03](content/a1/03-familie.yaml#L229) [12](content/a1/12-reisen.yaml#L139) | гл. 12 |
| der Winter ↻ | 12, экз. | 4 · 2 · 4 · 3 | [12-s1](src/story/scenes/12.ts#L78) [12-s4](src/story/scenes/12.ts#L456) [12-s6](src/story/scenes/12.ts#L705) [13-s5](src/story/scenes/13.ts#L691) | [05](content/a1/05-einkaufen.yaml#L224) [12](content/a1/12-reisen.yaml#L138) | гл. 12 |
| der Zentimeter ↻ | экз. | 2 · 2 · 1 · 1 | [11-s2](src/story/scenes/11.ts#L188) [13-s5](src/story/scenes/13.ts#L691) | — | — |

## Слова: закреплено

763 слов.

### Существительные (369)

die Abfahrt, der Absender, die Adresse, das Alter, die Ampel, der Anfang, das Angebot, die Ankunft, die Anmeldung, der Anruf, der Anrufbeantworter, die Ansage, die Antwort, die Anzeige, das Apartment, der Apfel, die Apotheke, der Appetit, die Arbeit, der Arm, der Arzt, die Ärztin, die Aufgabe, der Aufzug, das Auge, der Ausflug, der Ausgang, die Auskunft, das Ausland, der Ausländer, der Ausweis, das Auto, die Autobahn, der Automat, das Baby, die Bäckerei, das Bad, die Bahn, der Bahnhof, der Bahnsteig, der Balkon, die Banane, die Bank, der Bauch, der Baum, das Bein, das Beispiel, der Beruf, das Bett, das Bier, das Bild, die Birne, der Bleistift, die Blume, das Boot, der Brief, die Briefmarke, das Brot, das Brötchen, der Bruder, das Buch, der Buchstabe, das Bürgeramt, der Bus, die Butter, das Café, die Cola, der Computer, der Cousin, die Cousine, Dänemark, der Dank, die Disco, der Döner, das Dorf, die Dose, die Dusche, die E-Mail, die Ecke, die Ehefrau, der Ehemann, das Ei, der Eingang, die Einladung, der Eintritt, die Eltern, der Empfänger, das Ende, der Enkel, die Enkelin, die Entschuldigung, die Erdbeere, das Erdgeschoss, das Ergebnis, die Erkältung, der Erwachsene, der Fahrer, die Fahrkarte, das Fahrrad, die Familie, der Familienname, der Familienstand, die Farbe, der Feierabend, der Feiertag, das Feuer, das Fieber, der Film, die Firma, der Fisch, das Fischbrötchen, die Flasche, das Fleisch, der Flur, das Formular, das Foto, die Frage, die Frau, die Freizeit, der Freund, die Freundin, das Frühstück, die Führung, der Fuß, der Fußball, der Garten, der Gast, das Geburtsjahr, der Geburtsort, der Geburtstag, das Geld, das Gemüse, das Geschäft, das Geschenk, die Geschwister, das Gespräch, das Getränk, das Gewicht, das Glas, das Gleis, das Glück, der Glückwunsch, die Größe, die Großeltern, die Großmutter, der Großvater, die Gruppe, die Gurke, das Haar, der Hafen, das Hähnchen, der Hals, die Haltestelle, die Hand, das Handy, die Handynummer, das Haus, die Hausaufgabe, der Hausmann, die Heimat, die Heizung, das Hemd, der Herd, der Herr, die Hilfe, das Hobby, die Hochzeit, die Hose, der Hund, der Hunger, der Husten, die Idee, das Internet, die Jacke, der Jugendliche, der Junge, der Kaffee, die Kaltmiete, die Karte, die Kartoffel, Kasachstan, der Käse, die Kasse, die Katze, der Keller, der Kellner, die Kellnerin, das Kind, das Kino, die Klasse, das Kleid, der Kleiderschrank, die Kleidung, der Koch, die Köchin, der Kollege, das Konto, das Konzert, der Kopf, das Krankenhaus, der Krankenpfleger, die Kreditkarte, die Küche, der Kuchen, der Kühlschrank, der Kunde, der Laden, die Lampe, das Land, die Lebensmittel, der Lehrer, die Lehrerin, die Leute, das Licht, Lieblings-, der Liegeplatz, die Linie, der Lkw, das Lokal, die Lösung, das Mädchen, der Mann, der Mantel, die Maschine, der Mechaniker, das Medikament, das Meer, der Mensch, die Miete, die Milch, die Mitte, die Möbel, der Moment, der Mund, die Mutter, der Name, die Nase, die Nummer, das Obst, das Ohr, das Öl, die Oma, der Onkel, der Opa, die Orange, die Ordnung, der Ort, die Packung, das Papier, der Park, der Partner, die Partnerin, die Party, der Pass, die Pasta, die Pause, die Person, der Plan, der Platz, die Polizei, die Post, die Postleitzahl, die Praxis, der Preis, das Problem, der Prospekt, die Prüfung, der Pullover, das Rathaus, der Raum, die Rechnung, der Regen, der Reis, das Restaurant, das Rezept, der Rock, der Rücken, der Rucksack, Russland, die S-Bahn, der Saft, der Salat, das Salz, der Schalter, das Schild, der Schinken, das Schlafzimmer, der Schluss, der Schlüssel, der Schnupfen, der Schrank, der Schreibtisch, der Schuh, der Schüler, die Schweiz, die Schwester, das Schwimmbad, der See, die Sehenswürdigkeit, das Sofa, der Sohn, die Sonne, die Speisekarte, der Sport, die Sprache, die Stadt, die Stelle, der Stock, der Strand, die Straße, die Straßenbahn, das Stück, der Student, der Stuhl, der Supermarkt, die Suppe, das T-Shirt, die Tablette, die Tante, die Tasche, die Tasse, das Taxi, der Tee, der Teil, das Telefon, die Telefonnummer, der Termin, der Test, das Thema, das Ticket, der Tisch, die Tochter, die Toilette, die Tomate, die Treppe, das Treppenhaus, die Türkei, die Tüte, die Uhr, die Ukraine, der Unterricht, die Unterschrift, die USA, der Vater, der Verein, der Verkäufer, die Verkäuferin, der Vermieter, die Versichertenkarte, der Vorname, die Vorsicht, das Vorstellungsgespräch, die Vorwahl, die Warmmiete, das Wartezimmer, die Waschmaschine, das Wasser, der Wein, das Wohnheim, die Wohnung, das Wohnzimmer, das Wort, die Wurst, die Zahl, der Zahn, die Zeit, das Zimmer, der Zug, die Zwiebel

### Глаголы (114)

abfahren, anmachen, anrufen, antworten, anziehen, arbeiten, aufhören, aufräumen, aufstehen, ausmachen, aussehen, aussteigen, ausziehen, baden, beginnen, besichtigen, bestellen, bezahlen, bitten, bleiben, brauchen, bringen, buchstabieren, danken, dürfen, duschen, einkaufen, einladen, einsteigen, empfehlen, enden, erklären, essen, fahren, fernsehen, finden, fotografieren, fragen, frühstücken, geben, gefallen, gehen, gehören, gewinnen, gratulieren, grillen, haben, halten, heiraten, heißen, helfen, hören, kaufen, kennenlernen, kochen, kommen, können, kosten, laufen, leben, legen, lernen, lesen, lieben, liegen, machen, mieten, mitbringen, mitkommen, mitmachen, möchten, mögen, müssen, nehmen, passen, rauchen, regnen, riechen, sagen, schlafen, schließen, schmecken, schreiben, schwimmen, segeln, sehen, sein, sitzen, sollen, spielen, sprechen, stehen, stellen, suchen, tanzen, telefonieren, treffen, trinken, überweisen, umsteigen, umziehen, unterschreiben, verkaufen, vermieten, vorstellen, wandern, warten, waschen, wehtun, werden, wiederholen, wissen, wohnen, wollen

### Прилагательные и наречия (79)

allein, alt, bald, bar, besetzt, billig, bitter, böse, breit, daneben, draußen, dunkel, eilig, einmal, falsch, frei, früh, früher, geboren, gerade, geradeaus, gern, geschieden, gestern, gleich, groß, gültig, günstig, gut, hell, heute, hinten, hoch, immer, international, jetzt, jung, kaputt, klar, klein, krank, kurz, lang, lange, langsam, laut, ledig, leider, lieber, links, lustig, manchmal, möbliert, modern, müde, neu, nie, oben, oft, pünktlich, rechts, richtig, ruhig, schnell, schön, schwer, sofort, spät, später, teuer, unten, verboten, verheiratet, vielleicht, weit, wichtig, zurück, zurzeit, zusammen

### Служебные слова (68)

ab, aber, all-, also, an, auch, auf, aus, bei, bis, bitte, da, danke, dann, dein-, denn, der, dich, dies-, ein-, er, es, für, hier, ich, ihn, in, ja, jed-, kein, letzt-, lieb-, man, mehr, mein, mit, nach, nein, nicht, nichts, noch, nur, oder, ohne, schon, sehr, sich, sie, über, um, und, unser-, unter, viel, von, vor, wann, warum, was, welch-, Welche?, wer, wie, wir, wo, woher, wohin, zu

### Выражения (43)

100 Gramm, Alles Gute!, am liebsten, auf sein, aus sein, Danke, gut!, ein Kilo, ein Liter, ein Pfund, Es regnet., Fahrrad fahren, Freunde treffen, Fußball spielen, Gitarre spielen, Gute Nacht!, Guten Abend!, Guten Appetit!, Guten Morgen!, Guten Tag!, hallo, Hunger haben, in der Nähe, kommen aus, Langsam, bitte., letzte Woche, Moin!, Musik hören, nicht gern, Noch einmal, bitte., Rad fahren, Schade!, tschüss, weg sein, Wie bitte?, Wie geht's?, Wie spät ist es?, wie viel, Wie viel Uhr ist es?, wohnen in, Zeit haben, zu sein, zum Beispiel, Zusammen oder getrennt?

### Числа, время, цвета и другие группы (90)

der Abend, acht, achtzehn, achtzig, der April, der August, blau, braun, der Cent, deutsch, Deutschland, der Dezember, drei, dreißig, dreizehn, dritte, eins, elf, erste, der Euro, Europa, der Februar, fünf, fünfzehn, fünfzig, gelb, das Gramm, grau, grün, halb, hundert, das Jahr, der Januar, der Juli, der Juni, das Kilo, der Kilometer, der Liter, der Mai, der März, der Meter, die Million, die Minute, der Mittag, der Montag, morgen, der Nachmittag, die Nacht, neun, neunzehn, neunzig, der Norden, der November, null, der Oktober, das Pfund, das Prozent, der Quadratmeter, rot, der Samstag, schwarz, sechs, sechzehn, sechzig, die Sekunde, der September, sieben, siebzehn, siebzig, der Sommer, der Sonntag, die Stunde, der Süden, der Tag, tausend, vier, das Viertel, vierzehn, vierzig, der Vormittag, weiß, der Westen, die Woche, das Wochenende, der Wochentag, zehn, zwanzig, zwei, zweite, zwölf
