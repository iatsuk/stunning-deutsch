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
| Все обязательные слова (963) | 873 | 90 | 0 | 0 | 0 |
| из них словарь экзамена | 714 | 69 | 0 | 0 | 0 |
| из них слова уроков | 419 | 37 | 0 | 0 | 0 |
| Грамматика (66) | 66 | 0 | 0 | 0 | 0 |

«Закрепит A2» — слова, которые игрок впервые встречает в главе 11 или позже: в A1 за ними идут одна-две главы, и до порога их доводит сезон A2.

В очереди повторения новой версии 748 обязательных слов, из них ниже порога 72. Повторение в порог не входит; в таблицах такие слова помечены ↻.

| Часть речи | закреплено | закрепит A2 | слабо | один раз | нет |
|---|---|---|---|---|---|
| Существительные | 396 | 45 | 0 | 0 | 0 |
| Глаголы | 141 | 16 | 0 | 0 | 0 |
| Прилагательные и наречия | 103 | 11 | 0 | 0 | 0 |
| Служебные слова | 82 | 0 | 0 | 0 | 0 |
| Выражения | 56 | 7 | 0 | 0 | 0 |
| Числа, время, цвета и другие группы | 95 | 11 | 0 | 0 | 0 |

## Грамматика

### Глагол

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Präsens, окончания по лицам | закреплено | 269 · 13 · 121 · 156 | есть | [01-s1](src/story/scenes/01.ts#L53) [01-s2](src/story/scenes/01.ts#L167) [01-s3](src/story/scenes/01.ts#L222) [01-i1](src/story/scenes/01.ts#L386) [01-s4](src/story/scenes/01.ts#L423) [01-s5](src/story/scenes/01.ts#L508) |
| Präsens со сменой корня (e → i, a → ä) | закреплено | 122 · 12 · 45 · 56 | есть | [01-s3](src/story/scenes/01.ts#L222) [01-s4](src/story/scenes/01.ts#L424) [01-s5](src/story/scenes/01.ts#L504) [02-s4](src/story/scenes/02.ts#L474) [04-s2](src/story/scenes/04.ts#L242) [04-s3](src/story/scenes/04.ts#L393) |
| sein | закреплено | 638 · 13 · 272 · 324 | есть | [01-s1](src/story/scenes/01.ts#L34) [01-s2](src/story/scenes/01.ts#L155) |
| haben | закреплено | 259 · 12 · 125 · 140 | есть | [02-s1](src/story/scenes/02.ts#L56) [02-s2](src/story/scenes/02.ts#L151) [02-s3](src/story/scenes/02.ts#L236) [02-i1](src/story/scenes/02.ts#L405) |
| Отделяемые приставки и рамка предложения | закреплено | 65 · 10 · 36 · 30 | есть | [01-s3](src/story/scenes/01.ts#L222) [05-s3](src/story/scenes/05.ts#L314) [05-s4](src/story/scenes/05.ts#L498) [06-s2](src/story/scenes/06.ts#L225) [06-s3](src/story/scenes/06.ts#L298) |
| Perfekt с haben | закреплено | 76 · 4 · 43 · 37 | есть | [10-s1](src/story/scenes/10.ts#L59) [11-s1](src/story/scenes/11.ts#L38) [11-i1](src/story/scenes/11.ts#L162) [11-s2](src/story/scenes/11.ts#L199) |
| Perfekt с sein | закреплено | 23 · 4 · 17 · 9 | есть | [09-s4](src/story/scenes/09.ts#L502) [11-s2](src/story/scenes/11.ts#L219) [12-s1](src/story/scenes/12.ts#L151) [12-s2](src/story/scenes/12.ts#L174) [12-s3](src/story/scenes/12.ts#L28) [12-s5](src/story/scenes/12.ts#L562) |
| Präteritum war и hatte | закреплено | 30 · 5 · 15 · 10 | есть | [09-s1](src/story/scenes/09.ts#L64) [09-i1](src/story/scenes/09.ts#L274) [10-s1](src/story/scenes/10.ts#L58) [11-i1](src/story/scenes/11.ts#L162) [11-s2](src/story/scenes/11.ts#L219) [11-s3](src/story/scenes/11.ts#L301) |
| möchten | закреплено | 18 · 5 · 11 · 11 | есть | [04-s1](src/story/scenes/04.ts#L53) [04-s2](src/story/scenes/04.ts#L169) [04-s5](src/story/scenes/04.ts#L573) [04-s6](src/story/scenes/04.ts#L698) [08-s1](src/story/scenes/08.ts#L103) [10-s6](src/story/scenes/10.ts#L673) |
| Ich hätte gern …, Ich würde gern … как готовые выражения | закреплено | 7 · 4 · 4 · 3 | есть | [04-s4](src/story/scenes/04.ts#L465) [07-s5](src/story/scenes/07.ts#L548) [12-s3](src/story/scenes/12.ts#L303) [13-s4](src/story/scenes/13.ts#L425) |
| können | закреплено | 36 · 5 · 24 · 15 | есть | [07-s1](src/story/scenes/07.ts#L39) [07-s2](src/story/scenes/07.ts#L171) [07-s3](src/story/scenes/07.ts#L301) |
| wollen | закреплено | 29 · 5 · 14 · 10 | есть | [07-s1](src/story/scenes/07.ts#L44) [07-s2](src/story/scenes/07.ts#L184) [07-s3](src/story/scenes/07.ts#L289) [07-s4](src/story/scenes/07.ts#L504) [07-s5](src/story/scenes/07.ts#L547) |
| müssen | закреплено | 17 · 5 · 8 · 4 | есть | [08-s4](src/story/scenes/08.ts#L570) [10-s1](src/story/scenes/10.ts#L84) [10-s3](src/story/scenes/10.ts#L277) [10-s4](src/story/scenes/10.ts#L455) [10-s5](src/story/scenes/10.ts#L551) [10-s6](src/story/scenes/10.ts#L673) |
| dürfen | закреплено | 29 · 5 · 16 · 6 | есть | [09-s2](src/story/scenes/09.ts#L220) [10-s1](src/story/scenes/10.ts#L84) [10-s2](src/story/scenes/10.ts#L174) [10-s3](src/story/scenes/10.ts#L257) [10-s4](src/story/scenes/10.ts#L29) |
| sollen | закреплено | 19 · 4 · 13 · 11 | есть | [10-s4](src/story/scenes/10.ts#L30) [10-s5](src/story/scenes/10.ts#L586) [10-s6](src/story/scenes/10.ts#L31) [11-s5](src/story/scenes/11.ts#L29) |
| mögen | закреплено | 12 · 4 · 4 · 5 | есть | [07-s3](src/story/scenes/07.ts#L400) [07-s4](src/story/scenes/07.ts#L490) [08-s1](src/story/scenes/08.ts#L103) [12-s3](src/story/scenes/12.ts#L303) [12-s6](src/story/scenes/12.ts#L636) [13-s5](src/story/scenes/13.ts#L489) |
| Модальный глагол и инфинитив в конце | закреплено | 73 · 8 · 40 · 28 | есть | [04-s6](src/story/scenes/04.ts#L698) [07-s1](src/story/scenes/07.ts#L44) [07-s2](src/story/scenes/07.ts#L184) [07-s3](src/story/scenes/07.ts#L289) [07-s4](src/story/scenes/07.ts#L504) [07-s5](src/story/scenes/07.ts#L548) |
| Повелительное наклонение на Sie | закреплено | 33 · 6 · 20 · 15 | есть | [02-s3](src/story/scenes/02.ts#L247) [09-s2](src/story/scenes/09.ts#L29) [09-i1](src/story/scenes/09.ts#L301) [09-s3](src/story/scenes/09.ts#L343) [09-s4](src/story/scenes/09.ts#L491) |
| Повелительное наклонение на du | закреплено | 66 · 11 · 27 · 42 | есть | [02-s3](src/story/scenes/02.ts#L382) [02-s4](src/story/scenes/02.ts#L501) [03-s6](src/story/scenes/03.ts#L780) [05-s1](src/story/scenes/05.ts#L90) [05-s3](src/story/scenes/05.ts#L314) [05-s6](src/story/scenes/05.ts#L738) |
| Повелительное наклонение на ihr | закреплено | 15 · 6 · 8 · 7 | есть | [06-s1](src/story/scenes/06.ts#L35) [07-s4](src/story/scenes/07.ts#L470) [08-s1](src/story/scenes/08.ts#L85) [09-s2](src/story/scenes/09.ts#L193) [09-s3](src/story/scenes/09.ts#L343) [09-s4](src/story/scenes/09.ts#L564) |

### Предложение

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Глагол на втором месте, время на первом | закреплено | 85 · 13 · 41 · 42 | есть | [01-s1](src/story/scenes/01.ts#L126) [01-s3](src/story/scenes/01.ts#L239) [02-s2](src/story/scenes/02.ts#L204) [02-s3](src/story/scenes/02.ts#L236) [03-s3](src/story/scenes/03.ts#L280) [03-s6](src/story/scenes/03.ts#L823) |
| Вопрос с W-словом | закреплено | 163 · 13 · 94 · 87 | есть | [01-s1](src/story/scenes/01.ts#L44) [01-s2](src/story/scenes/01.ts#L155) [01-s3](src/story/scenes/01.ts#L222) |
| Вопрос да/нет и ответ ja / nein / doch | закреплено | 52 · 12 · 33 · 26 | есть | [02-s1](src/story/scenes/02.ts#L52) [02-s3](src/story/scenes/02.ts#L232) [02-i1](src/story/scenes/02.ts#L421) [02-s4](src/story/scenes/02.ts#L441) [02-s5](src/story/scenes/02.ts#L599) [02-s6](src/story/scenes/02.ts#L681) |
| nicht и kein | закреплено | 265 · 13 · 107 · 122 | есть | [01-s1](src/story/scenes/01.ts#L147) [01-s3](src/story/scenes/01.ts#L222) [01-s5](src/story/scenes/01.ts#L541) [02-s2](src/story/scenes/02.ts#L208) [02-s4](src/story/scenes/02.ts#L527) [02-s5](src/story/scenes/02.ts#L617) |
| und, oder, aber | закреплено | 226 · 13 · 76 · 95 | есть | [01-s3](src/story/scenes/01.ts#L222) [01-i1](src/story/scenes/01.ts#L390) [01-s4](src/story/scenes/01.ts#L417) [01-s6](src/story/scenes/01.ts#L602) [02-s2](src/story/scenes/02.ts#L154) [02-s3](src/story/scenes/02.ts#L247) |
| denn как союз причины | закреплено | 9 · 6 · 3 · 7 | есть | [07-s1](src/story/scenes/07.ts#L63) [07-s2](src/story/scenes/07.ts#L184) [08-s6](src/story/scenes/08.ts#L757) [09-s2](src/story/scenes/09.ts#L175) [10-s4](src/story/scenes/10.ts#L401) [12-s4](src/story/scenes/12.ts#L470) |
| dann | закреплено | 27 · 8 · 7 · 12 | есть | [06-s5](src/story/scenes/06.ts#L616) [06-s6](src/story/scenes/06.ts#L771) [07-s2](src/story/scenes/07.ts#L264) [08-s6](src/story/scenes/08.ts#L761) [09-s1](src/story/scenes/09.ts#L59) [09-s2](src/story/scenes/09.ts#L234) |
| wenn (понимание) | закреплено | 6 · 4 · 2 · 4 | есть | [10-s4](src/story/scenes/10.ts#L465) [11-s5](src/story/scenes/11.ts#L563) [12-s2](src/story/scenes/12.ts#L179) [13-s6](src/story/scenes/13.ts#L625) |
| es gibt | закреплено | 12 · 6 · 3 · 7 | есть | [05-s2](src/story/scenes/05.ts#L206) [07-s1](src/story/scenes/07.ts#L38) [07-s3](src/story/scenes/07.ts#L301) [08-s1](src/story/scenes/08.ts#L88) [09-s1](src/story/scenes/09.ts#L86) [12-s6](src/story/scenes/12.ts#L686) |

### Существительное и артикль

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Множественное число | закреплено | 222 · 13 · 79 · 97 | есть | [01-s3](src/story/scenes/01.ts#L222) [01-s6](src/story/scenes/01.ts#L602) [02-s1](src/story/scenes/02.ts#L120) [02-s2](src/story/scenes/02.ts#L209) [02-s3](src/story/scenes/02.ts#L232) [02-i1](src/story/scenes/02.ts#L416) |
| Винительный падеж | закреплено | 159 · 11 · 89 · 67 | есть | [03-s4](src/story/scenes/03.ts#L577) [04-s1](src/story/scenes/04.ts#L53) [04-s2](src/story/scenes/04.ts#L172) [04-s3](src/story/scenes/04.ts#L295) |
| Дательный на вопрос «где?» (in, auf, an) | закреплено | 235 · 11 · 84 · 71 | есть | [03-s4](src/story/scenes/03.ts#L488) [03-s5](src/story/scenes/03.ts#L644) [03-s6](src/story/scenes/03.ts#L829) [04-s1](src/story/scenes/04.ts#L135) [04-s2](src/story/scenes/04.ts#L168) [04-s3](src/story/scenes/04.ts#L296) |
| Предлоги с дательным (mit, zu, bei, von, aus, nach) | закреплено | 141 · 12 · 68 · 54 | есть | [01-s1](src/story/scenes/01.ts#L19) [01-s3](src/story/scenes/01.ts#L222) [01-s5](src/story/scenes/01.ts#L570) [01-s6](src/story/scenes/01.ts#L634) [02-s3](src/story/scenes/02.ts#L247) [03-s2](src/story/scenes/03.ts#L222) |
| Чей? Имя + s (Annas Bruder) | закреплено | 24 · 10 · 14 · 9 | есть | [01-s2](src/story/scenes/01.ts#L188) [01-s5](src/story/scenes/01.ts#L503) [02-s1](src/story/scenes/02.ts#L120) [03-s1](src/story/scenes/03.ts#L65) [03-s3](src/story/scenes/03.ts#L298) [03-s4](src/story/scenes/03.ts#L499) |
| Сложные слова: род по последней части | закреплено | 247 · 13 · 141 · 109 | есть | [01-s1](src/story/scenes/01.ts#L82) [02-s1](src/story/scenes/02.ts#L84) [02-s2](src/story/scenes/02.ts#L137) [02-s3](src/story/scenes/02.ts#L247) [02-s6](src/story/scenes/02.ts#L681) [03-s3](src/story/scenes/03.ts#L280) |
| Женский род на -in | закреплено | 53 · 8 · 35 · 32 | есть | [03-s3](src/story/scenes/03.ts#L412) [03-s4](src/story/scenes/03.ts#L475) [03-s5](src/story/scenes/03.ts#L624) [04-s2](src/story/scenes/04.ts#L830) [04-s3](src/story/scenes/04.ts#L839) [06-s2](src/story/scenes/06.ts#L499) |
| dieser, diese, dieses | закреплено | 6 · 5 · 2 · 4 | есть | [05-i1](src/story/scenes/05.ts#L451) [08-s3](src/story/scenes/08.ts#L457) [09-s2](src/story/scenes/09.ts#L193) [10-s2](src/story/scenes/10.ts#L174) [13-s5](src/story/scenes/13.ts#L489) |
| Притяжательные mein, dein, sein, ihr, unser, euer, Ihr | закреплено | 101 · 13 · 49 · 58 | есть | [01-s1](src/story/scenes/01.ts#L122) [01-i1](src/story/scenes/01.ts#L385) [02-s3](src/story/scenes/02.ts#L382) [03-s1](src/story/scenes/03.ts#L44) [03-s2](src/story/scenes/03.ts#L157) |
| welcher, welche, welches | закреплено | 15 · 4 · 9 · 8 | есть | [01-s3](src/story/scenes/01.ts#L222) [02-s3](src/story/scenes/02.ts#L243) [05-s2](src/story/scenes/05.ts#L160) [05-s3](src/story/scenes/05.ts#L314) [05-i1](src/story/scenes/05.ts#L445) [05-s5](src/story/scenes/05.ts#L652) |

### Местоимения

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Местоимения в винительном (mich, dich, ihn …) | закреплено | 37 · 9 · 16 · 22 | есть | [02-s4](src/story/scenes/02.ts#L458) [05-s2](src/story/scenes/05.ts#L181) [05-s4](src/story/scenes/05.ts#L579) [05-s5](src/story/scenes/05.ts#L601) [05-s6](src/story/scenes/05.ts#L813) [06-s1](src/story/scenes/06.ts#L152) |
| Местоимения в дательном (mir, dir, ihm, Ihnen) | закреплено | 25 · 9 · 12 · 13 | есть | [01-s1](src/story/scenes/01.ts#L75) [01-s3](src/story/scenes/01.ts#L222) [06-s5](src/story/scenes/06.ts#L635) [07-s3](src/story/scenes/07.ts#L414) [07-s5](src/story/scenes/07.ts#L547) [07-i1](src/story/scenes/07.ts#L669) |
| Глаголы с дательным (gehören, gefallen, helfen, danken, geben) | закреплено | 20 · 9 · 10 · 11 | есть | [04-i1](src/story/scenes/04.ts#L415) [06-s6](src/story/scenes/06.ts#L748) [07-s3](src/story/scenes/07.ts#L413) [07-s5](src/story/scenes/07.ts#L578) [08-s2](src/story/scenes/08.ts#L183) [08-s5](src/story/scenes/08.ts#L671) |
| sich, uns (Wir sehen uns) | закреплено | 14 · 8 · 8 · 10 | есть | [01-s6](src/story/scenes/01.ts#L611) [04-s3](src/story/scenes/04.ts#L839) [06-s1](src/story/scenes/06.ts#L151) [06-s2](src/story/scenes/06.ts#L862) [07-s2](src/story/scenes/07.ts#L235) [08-s5](src/story/scenes/08.ts#L901) |
| Вопросы wen? и wem? | закреплено | 8 · 5 · 3 · 5 | есть | [08-s2](src/story/scenes/08.ts#L183) [09-s6](src/story/scenes/09.ts#L740) [10-s3](src/story/scenes/10.ts#L253) [12-s3](src/story/scenes/12.ts#L291) [13-s6](src/story/scenes/13.ts#L607) |
| man | закреплено | 12 · 5 · 3 · 4 | есть | [07-s1](src/story/scenes/07.ts#L39) [09-s2](src/story/scenes/09.ts#L174) [10-s2](src/story/scenes/10.ts#L174) [12-s2](src/story/scenes/12.ts#L180) [12-s3](src/story/scenes/12.ts#L278) [12-s6](src/story/scenes/12.ts#L686) |
| etwas, nichts, alles, mehr | закреплено | 91 · 12 · 31 · 45 | есть | [01-s2](src/story/scenes/01.ts#L167) [03-s3](src/story/scenes/03.ts#L280) [04-s2](src/story/scenes/04.ts#L219) [04-s3](src/story/scenes/04.ts#L301) [04-s4](src/story/scenes/04.ts#L508) [04-s5](src/story/scenes/04.ts#L577) |

### Прилагательное и числа

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Прилагательное после sein (zu groß) | закреплено | 101 · 13 · 34 · 52 | есть | [01-s2](src/story/scenes/01.ts#L167) [01-s4](src/story/scenes/01.ts#L438) [02-s5](src/story/scenes/02.ts#L561) [03-s2](src/story/scenes/03.ts#L246) [04-s2](src/story/scenes/04.ts#L231) [04-s3](src/story/scenes/04.ts#L301) |
| gern, lieber, am liebsten | закреплено | 27 · 8 · 17 · 13 | есть | [04-s3](src/story/scenes/04.ts#L301) [04-s4](src/story/scenes/04.ts#L465) [04-s6](src/story/scenes/04.ts#L772) [07-s1](src/story/scenes/07.ts#L89) [07-s3](src/story/scenes/07.ts#L396) [07-s4](src/story/scenes/07.ts#L457) |
| Сравнение (besser, mehr, als) | закреплено | 19 · 8 · 12 · 10 | есть | [04-s1](src/story/scenes/04.ts#L63) [05-s3](src/story/scenes/05.ts#L878) [06-s2](src/story/scenes/06.ts#L862) [07-s3](src/story/scenes/07.ts#L301) [07-s6](src/story/scenes/07.ts#L849) [08-s3](src/story/scenes/08.ts#L388) |
| Цены и количества | закреплено | 93 · 10 · 51 · 37 | есть | [02-s6](src/story/scenes/02.ts#L714) [03-s2](src/story/scenes/03.ts#L226) [03-i1](src/story/scenes/03.ts#L226) [03-s6](src/story/scenes/03.ts#L741) [04-s3](src/story/scenes/04.ts#L301) [04-s4](src/story/scenes/04.ts#L495) |
| Время на часах | закреплено | 181 · 10 · 87 · 71 | есть | [02-s5](src/story/scenes/02.ts#L585) [04-s2](src/story/scenes/04.ts#L168) [04-s3](src/story/scenes/04.ts#L297) [04-s4](src/story/scenes/04.ts#L460) [06-s1](src/story/scenes/06.ts#L36) |
| Порядковые числа и дата | закреплено | 44 · 10 · 24 · 16 | есть | [04-s1](src/story/scenes/04.ts#L36) [05-s6](src/story/scenes/05.ts#L915) [06-s2](src/story/scenes/06.ts#L862) [07-s6](src/story/scenes/07.ts#L849) [08-s2](src/story/scenes/08.ts#L233) [08-i1](src/story/scenes/08.ts#L281) |

### Предлоги

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| um, am, im, von … bis во времени | закреплено | 149 · 9 · 74 · 61 | есть | [05-s6](src/story/scenes/05.ts#L813) [06-s1](src/story/scenes/06.ts#L36) [06-s2](src/story/scenes/06.ts#L179) |
| ab и für во времени (ab Montag, für zwei Wochen) | закреплено | 13 · 6 · 7 · 2 | есть | [08-s3](src/story/scenes/08.ts#L388) [09-s2](src/story/scenes/09.ts#L173) [10-s3](src/story/scenes/10.ts#L254) [10-s4](src/story/scenes/10.ts#L476) [11-s5](src/story/scenes/11.ts#L552) [12-s3](src/story/scenes/12.ts#L288) |
| nach и vor во времени (nach dem Essen) | закреплено | 10 · 5 · 5 · 5 | есть | [08-s6](src/story/scenes/08.ts#L737) [09-s2](src/story/scenes/09.ts#L173) [10-s3](src/story/scenes/10.ts#L254) [10-s4](src/story/scenes/10.ts#L476) [12-s4](src/story/scenes/12.ts#L457) [13-s5](src/story/scenes/13.ts#L479) |
| über (über zwanzig Minuten) | закреплено | 7 · 4 · 4 · 3 | есть | [09-s2](src/story/scenes/09.ts#L173) [10-s3](src/story/scenes/10.ts#L253) [10-s4](src/story/scenes/10.ts#L477) [12-s3](src/story/scenes/12.ts#L303) [13-s2](src/story/scenes/13.ts#L209) |
| nach Hause / zu Hause | закреплено | 19 · 5 · 11 · 6 | есть | [07-s2](src/story/scenes/07.ts#L149) [09-s5](src/story/scenes/09.ts#L684) [09-s6](src/story/scenes/09.ts#L739) [10-s4](src/story/scenes/10.ts#L30) [12-s1](src/story/scenes/12.ts#L122) |
| in, an, auf + винительный для направления (in die Stadt) | закреплено | 49 · 10 · 23 · 17 | есть | [03-s4](src/story/scenes/03.ts#L527) [04-s2](src/story/scenes/04.ts#L251) [04-s5](src/story/scenes/04.ts#L587) [06-s2](src/story/scenes/06.ts#L221) [06-s5](src/story/scenes/06.ts#L639) [06-s6](src/story/scenes/06.ts#L793) |
| unter | закреплено | 10 · 5 · 4 · 5 | есть | [04-s3](src/story/scenes/04.ts#L301) [04-s6](src/story/scenes/04.ts#L743) [08-s2](src/story/scenes/08.ts#L214) [09-s2](src/story/scenes/09.ts#L232) [11-s2](src/story/scenes/11.ts#L219) [13-s6](src/story/scenes/13.ts#L585) |
| ohne и für (ohne dich, für meinen Freund) | закреплено | 55 · 13 · 26 · 15 | есть | [01-s1](src/story/scenes/01.ts#L147) [02-s2](src/story/scenes/02.ts#L208) [02-s4](src/story/scenes/02.ts#L458) [03-s4](src/story/scenes/03.ts#L487) [03-s5](src/story/scenes/03.ts#L696) [04-s1](src/story/scenes/04.ts#L160) |

### Словообразование

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Существительные на -ung | закреплено | 143 · 12 · 80 · 66 | есть | [02-s2](src/story/scenes/02.ts#L137) [02-s3](src/story/scenes/02.ts#L247) [02-s5](src/story/scenes/02.ts#L663) [04-s2](src/story/scenes/04.ts#L235) [04-s3](src/story/scenes/04.ts#L301) [04-s4](src/story/scenes/04.ts#L511) |
| Прилагательные с un-, -los, -bar | закреплено | 8 · 5 · 5 · 6 | есть | [08-s5](src/story/scenes/08.ts#L901) [09-s4](src/story/scenes/09.ts#L502) [09-s5](src/story/scenes/09.ts#L921) [11-s1](src/story/scenes/11.ts#L74) [12-s4](src/story/scenes/12.ts#L471) [13-s6](src/story/scenes/13.ts#L585) |
| hellblau, dunkelblau | закреплено | 28 · 6 · 11 · 3 | есть | [05-s2](src/story/scenes/05.ts#L262) [05-s3](src/story/scenes/05.ts#L314) [05-s5](src/story/scenes/05.ts#L610) [05-s6](src/story/scenes/05.ts#L732) [06-s2](src/story/scenes/06.ts#L209) [06-i1](src/story/scenes/06.ts#L468) |
| Причастие как прилагательное (geöffnet, geschlossen) | закреплено | 9 · 6 · 6 · 4 | есть | [06-s3](src/story/scenes/06.ts#L298) [08-s4](src/story/scenes/08.ts#L570) [09-s2](src/story/scenes/09.ts#L884) [10-s5](src/story/scenes/10.ts#L537) [12-s3](src/story/scenes/12.ts#L303) [11-разминка](src/story/scenes/warmups.ts#L118) |
| Погода с es (Es regnet) | закреплено | 28 · 6 · 6 · 6 | есть | [05-s1](src/story/scenes/05.ts#L40) [06-s6](src/story/scenes/06.ts#L736) [09-s1](src/story/scenes/09.ts#L41) [09-i1](src/story/scenes/09.ts#L288) [09-s3](src/story/scenes/09.ts#L328) [11-s1](src/story/scenes/11.ts#L142) |
| Ich habe …schmerzen, … tut weh | закреплено | 16 · 4 · 8 · 11 | есть | [10-s1](src/story/scenes/10.ts#L40) [10-s2](src/story/scenes/10.ts#L124) [10-s6](src/story/scenes/10.ts#L679) [11-s3](src/story/scenes/11.ts#L301) [12-s3](src/story/scenes/12.ts#L303) [13-s2](src/story/scenes/13.ts#L209) |

## Слова: нет

0 слов.

## Слова: один раз

0 слов.

## Слова: слабо

0 слов.

## Слова: закрепит A2

90 слов.

### Существительные (45)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| der Abflug (от fliegen) ↻ | экз. | 1 · 1 · 0 · 0 | [12-s2](src/story/scenes/12.ts#L210) | — | — |
| die Abreise | 12 | 2 · 1 · 1 · 1 | [12-s3](src/story/scenes/12.ts#L303) | [12](content/a1/12-reisen.yaml#L112) | гл. 12 |
| die Anrede ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L574) [12-s5](src/story/scenes/12.ts#L791) [13-s5](src/story/scenes/13.ts#L697) | [07](content/a1/07-freizeit.yaml#L240) [10](content/a1/10-gesundheit.yaml#L201) [12](content/a1/12-reisen.yaml#L200) | — |
| die Anreise ↻ | 12 | 4 · 2 · 3 · 3 | [12-s3](src/story/scenes/12.ts#L303) [12-s6](src/story/scenes/12.ts#L706) [13-s5](src/story/scenes/13.ts#L697) | [12](content/a1/12-reisen.yaml#L111) | гл. 12 |
| der Anschluss ↻ | экз. | 3 · 2 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L303) [13-s5](src/story/scenes/13.ts#L697) | — | — |
| der Arbeitsplatz ↻ | экз. | 3 · 3 · 2 · 2 | [11-s1](src/story/scenes/11.ts#L131) [12-s5](src/story/scenes/12.ts#L791) [13-s5](src/story/scenes/13.ts#L697) | — | — |
| die Aussage ↻ | экз. | 3 · 3 · 2 · 2 | [11-s3](src/story/scenes/11.ts#L406) [12-s5](src/story/scenes/12.ts#L791) [13-s5](src/story/scenes/13.ts#L697) | [03](content/a1/03-familie.yaml#L223) [05](content/a1/05-einkaufen.yaml#L212) [07](content/a1/07-freizeit.yaml#L221) [11](content/a1/11-arbeit.yaml#L191) [12](content/a1/12-reisen.yaml#L242) | — |
| der Bogen ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L574) [12-s5](src/story/scenes/12.ts#L791) [13-s5](src/story/scenes/13.ts#L697) | — | гл. 2 |
| der Chef ↻ | экз. | 3 · 3 · 2 · 2 | [11-s1](src/story/scenes/11.ts#L131) [12-s5](src/story/scenes/12.ts#L791) [13-s5](src/story/scenes/13.ts#L697) | — | — |
| das Datum ↻ | 12, экз. | 3 · 2 · 3 · 1 | [12-s3](src/story/scenes/12.ts#L303) [13-s5](src/story/scenes/13.ts#L697) | [12](content/a1/12-reisen.yaml#L130) | гл. 12 |
| das Doppelzimmer ↻ | 12, экз. | 3 · 2 · 3 · 1 | [12-s3](src/story/scenes/12.ts#L303) [13-s5](src/story/scenes/13.ts#L697) | [12](content/a1/12-reisen.yaml#L106) | гл. 12 |
| der Drucker (от drucken) ↻ | экз. | 1 · 1 · 0 · 0 | [11-s5](src/story/scenes/11.ts#L637) | — | — |
| die Durchsage ↻ | 12, экз. | 3 · 2 · 2 · 1 | [12-s2](src/story/scenes/12.ts#L180) [13-s2](src/story/scenes/13.ts#L156) | [05](content/a1/05-einkaufen.yaml#L208) [09](content/a1/09-stadt.yaml#L207) [12](content/a1/12-reisen.yaml#L98) | гл. 12 |
| das Einzelzimmer ↻ | 12, экз. | 10 · 2 · 7 · 4 | [12-s1](src/story/scenes/12.ts#L136) [12-s3](src/story/scenes/12.ts#L303) [13-s3](src/story/scenes/13.ts#L290) [13-s4](src/story/scenes/13.ts#L409) | [12](content/a1/12-reisen.yaml#L36) | гл. 12 |
| der Fehler ↻ | экз. | 1 · 1 · 0 · 0 | [11-s2](src/story/scenes/11.ts#L211) | — | — |
| die Ferien ↻ | 12 | 1 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L707) | [12](content/a1/12-reisen.yaml#L148) | гл. 12 |
| der Flughafen ↻ | 12, экз. | 3 · 2 · 3 · 3 | [12-s1](src/story/scenes/12.ts#L136) [12-s2](src/story/scenes/12.ts#L264) [13-s5](src/story/scenes/13.ts#L697) | [12](content/a1/12-reisen.yaml#L94) | гл. 12 |
| das Flugzeug ↻ | 12, экз. | 3 · 2 · 2 · 2 | [12-s2](src/story/scenes/12.ts#L210) [13-s5](src/story/scenes/13.ts#L697) | [12](content/a1/12-reisen.yaml#L93) | гл. 12 |
| der Friseur ↻ | 11 | 1 · 1 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L134) | [11](content/a1/11-arbeit.yaml#L101) | гл. 11 |
| das Gepäck ↻ | экз. | 3 · 2 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L303) [13-s5](src/story/scenes/13.ts#L697) | — | — |
| die Halbpension ↻ | экз. | 3 · 2 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L303) [13-s5](src/story/scenes/13.ts#L697) | — | — |
| das Hotel ↻ | 12, экз. | 21 · 2 · 12 · 6 | [12-s1](src/story/scenes/12.ts#L27) [12-s2](src/story/scenes/12.ts#L227) [12-s3](src/story/scenes/12.ts#L278) [12-s5](src/story/scenes/12.ts#L515) | [12](content/a1/12-reisen.yaml#L26) | гл. 12 |
| der Informatiker ↻ | 11 | 1 · 1 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L134) | [11](content/a1/11-arbeit.yaml#L103) | гл. 11 |
| der Ingenieur ↻ | 11 | 1 · 1 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L134) | [11](content/a1/11-arbeit.yaml#L100) | гл. 11 |
| die Jahreszeit ↻ | 12 | 1 · 1 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L264) | [12](content/a1/12-reisen.yaml#L130) | гл. 12 |
| der Job ↻ | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L76) | — | — |
| der Koffer ↻ | 12, экз. | 8 · 2 · 6 · 5 | [12-s1](src/story/scenes/12.ts#L78) [12-s2](src/story/scenes/12.ts#L264) [12-s3](src/story/scenes/12.ts#L278) [12-s6](src/story/scenes/12.ts#L706) [13-s2](src/story/scenes/13.ts#L660) | [12](content/a1/12-reisen.yaml#L99) | гл. 12 |
| der Kugelschreiber ↻ | экз. | 1 · 1 · 0 · 0 | [11-s5](src/story/scenes/11.ts#L637) | — | — |
| das Lied | экз. | 11 · 2 · 5 · 4 | [11-s3](src/story/scenes/11.ts#L301) [11-s5](src/story/scenes/11.ts#L623) [13-s1](src/story/scenes/13.ts#L38) [13-s6](src/story/scenes/13.ts#L594) | — | — |
| die Papiere ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L575) [12-s5](src/story/scenes/12.ts#L791) [13-s2](src/story/scenes/13.ts#L660) | — | — |
| das Praktikum ↻ | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L76) | — | — |
| der Regenschirm ↻ | 12 | 5 · 2 · 5 · 3 | [12-s1](src/story/scenes/12.ts#L41) [12-s6](src/story/scenes/12.ts#L706) [13-s2](src/story/scenes/13.ts#L660) | [12](content/a1/12-reisen.yaml#L70) | гл. 12 |
| die Reise (от reisen) ↻ | 12, экз. | 7 · 2 · 4 · 5 | [12-s2](src/story/scenes/12.ts#L264) [12-s6](src/story/scenes/12.ts#L706) [13-s6](src/story/scenes/13.ts#L607) | [12](content/a1/12-reisen.yaml#L1) | гл. 12 |
| das Reisebüro (от reisen) ↻ | экз. | 1 · 1 · 0 · 0 | [12-s2](src/story/scenes/12.ts#L190) | — | — |
| der Reiseführer (от reisen) ↻ | экз. | 1 · 1 · 0 · 0 | [12-s2](src/story/scenes/12.ts#L190) | — | — |
| die Rezeption | экз. | 1 · 1 · 0 · 0 | [12-s3](src/story/scenes/12.ts#L278) | — | — |
| Satz | экз. | 1 · 1 · 0 · 0 | [11-s5](src/story/scenes/11.ts#L639) | [07](content/a1/07-freizeit.yaml#L239) [08](content/a1/08-wohnen.yaml#L485) [10](content/a1/10-gesundheit.yaml#L200) [12](content/a1/12-reisen.yaml#L199) | — |
| das Studium ↻ | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L76) | — | — |
| der Urlaub ↻ | 12, экз. | 1 · 1 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L264) | [12](content/a1/12-reisen.yaml#L91) | гл. 12 |
| die Verspätung ↻ | 12 | 12 · 2 · 6 · 7 | [12-s2](src/story/scenes/12.ts#L191) [12-s3](src/story/scenes/12.ts#L28) [12-s6](src/story/scenes/12.ts#L706) [13-s2](src/story/scenes/13.ts#L27) | [09](content/a1/09-stadt.yaml#L215) [12](content/a1/12-reisen.yaml#L48) | гл. 12 |
| die Welt ↻ | экз. | 1 · 1 · 0 · 0 | [12-s2](src/story/scenes/12.ts#L190) | — | — |
| das Wetter ↻ | 12, экз. | 5 · 2 · 4 · 4 | [12-s1](src/story/scenes/12.ts#L38) [12-s6](src/story/scenes/12.ts#L706) [13-s2](src/story/scenes/13.ts#L660) | [12](content/a1/12-reisen.yaml#L66) | гл. 12 |
| der Wind | экз. | 3 · 1 · 1 · 2 | [12-s1](src/story/scenes/12.ts#L50) [12-s2](src/story/scenes/12.ts#L180) | [12](content/a1/12-reisen.yaml#L338) | гл. 12 |
| die Zeitung | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L77) | — | — |
| der Zoll ↻ | экз. | 2 · 2 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L686) [13-s2](src/story/scenes/13.ts#L166) | — | — |

### Глаголы (16)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| abfliegen (от fliegen) ↻ | экз. | 1 · 1 · 0 · 0 | [12-s6](src/story/scenes/12.ts#L686) | — | — |
| abgeben ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L575) [12-s2](src/story/scenes/12.ts#L764) [13-s2](src/story/scenes/13.ts#L660) | — | — |
| anklicken ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L637) [12-s5](src/story/scenes/12.ts#L791) [13-s2](src/story/scenes/13.ts#L660) | — | — |
| ankommen | экз. | 3 · 1 · 2 · 1 | [12-s2](src/story/scenes/12.ts#L245) | [12](content/a1/12-reisen.yaml#L48) | гл. 12 |
| ankreuzen ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L575) [12-s5](src/story/scenes/12.ts#L791) [13-s5](src/story/scenes/13.ts#L697) | [04](content/a1/04-essen.yaml#L299) [09](content/a1/09-stadt.yaml#L222) | — |
| bedeuten ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L639) [12-s5](src/story/scenes/12.ts#L791) [13-s5](src/story/scenes/13.ts#L697) | [08](content/a1/08-wohnen.yaml#L42) | — |
| benutzen ↻ | экз. | 3 · 3 · 2 · 2 | [11-s2](src/story/scenes/11.ts#L211) [12-s5](src/story/scenes/12.ts#L791) [13-s5](src/story/scenes/13.ts#L697) | [09](content/a1/09-stadt.yaml#L236) | — |
| besuchen | экз. | 1 · 1 · 1 · 0 | [11-s2](src/story/scenes/11.ts#L246) | [07](content/a1/07-freizeit.yaml#L64) | — |
| drucken ↻ | экз. | 2 · 2 · 1 · 1 | [11-s5](src/story/scenes/11.ts#L637) [13-s5](src/story/scenes/13.ts#L697) | — | — |
| fliegen ↻ | экз. | 1 · 1 · 0 · 0 | [12-s2](src/story/scenes/12.ts#L210) | [12](content/a1/12-reisen.yaml#L158) | — |
| freuen | экз. | 2 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L637) | — | — |
| reisen | экз. | 7 · 2 · 4 · 5 | [12-s2](src/story/scenes/12.ts#L264) [12-s6](src/story/scenes/12.ts#L706) [13-s6](src/story/scenes/13.ts#L607) | [12](content/a1/12-reisen.yaml#L1) | гл. 12 |
| reservieren | 12 | 5 · 1 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L289) | [02](content/a1/02-zahlen.yaml#L914) [12](content/a1/12-reisen.yaml#L113) | гл. 12 |
| scheinen | экз. | 4 · 2 · 1 · 0 | [12-s5](src/story/scenes/12.ts#L527) [13-s1](src/story/scenes/13.ts#L37) | [12](content/a1/12-reisen.yaml#L68) | гл. 12 |
| übernachten ↻ | экз. | 3 · 2 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L303) [13-s2](src/story/scenes/13.ts#L660) | — | — |
| verdienen ↻ | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L76) | — | — |

### Прилагательные и наречия (11)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| arbeitslos | экз. | 1 · 1 · 0 · 1 | [11-s1](src/story/scenes/11.ts#L74) | — | — |
| ausländisch (от das Ausland) ↻ | экз. | 1 · 1 · 0 · 0 | [12-s6](src/story/scenes/12.ts#L652) | — | — |
| bewölkt ↻ | 12 | 1 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L707) | [12](content/a1/12-reisen.yaml#L123) | гл. 12 |
| fremd ↻ | экз. | 1 · 1 · 0 · 0 | [12-s5](src/story/scenes/12.ts#L594) | — | — |
| kalt ↻ | 12 | 3 · 2 · 2 · 2 | [12-s1](src/story/scenes/12.ts#L38) [13-s2](src/story/scenes/13.ts#L660) | [08](content/a1/08-wohnen.yaml#L40) [12](content/a1/12-reisen.yaml#L66) | гл. 12 |
| kulturell ↻ | экз. | 1 · 1 · 0 · 0 | [12-s6](src/story/scenes/12.ts#L652) | — | — |
| männlich (от der Mann) ↻ | экз. | 1 · 1 · 0 · 0 | [11-s5](src/story/scenes/11.ts#L574) | — | — |
| selbstständig ↻ | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L131) | — | — |
| sonnig ↻ | 12 | 1 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L707) | [12](content/a1/12-reisen.yaml#L122) | гл. 12 |
| weiblich ↻ | экз. | 1 · 1 · 0 · 0 | [11-s5](src/story/scenes/11.ts#L574) | [11](content/a1/11-arbeit.yaml#L345) | — |
| windig ↻ | 12 | 3 · 2 · 2 · 2 | [12-s1](src/story/scenes/12.ts#L38) [12-s6](src/story/scenes/12.ts#L707) [13-s2](src/story/scenes/13.ts#L660) | [12](content/a1/12-reisen.yaml#L66) | гл. 12 |

### Выражения (7)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| arbeiten als | 11 | 1 · 1 · 1 · 0 | [11-s6](src/story/scenes/11.ts#L691) | [11](content/a1/11-arbeit.yaml#L129) | гл. 11 |
| Die Sonne scheint. | 12 | 3 · 2 · 0 · 0 | [12-s5](src/story/scenes/12.ts#L527) [13-s1](src/story/scenes/13.ts#L37) | [12](content/a1/12-reisen.yaml#L68) | гл. 12 |
| Es schneit. ↻ | 12 | 1 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L707) | [12](content/a1/12-reisen.yaml#L121) | гл. 12 |
| Es sind 20 Grad. ↻ | 12 | 1 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L707) | [12](content/a1/12-reisen.yaml#L127) | гл. 12 |
| gestern Abend ↻ | 11 | 1 · 1 · 1 · 1 | [11-s6](src/story/scenes/11.ts#L709) | [11](content/a1/11-arbeit.yaml#L48) | гл. 11 |
| letztes Jahr ↻ | 11 | 1 · 1 · 1 · 1 | [11-s6](src/story/scenes/11.ts#L709) | [11](content/a1/11-arbeit.yaml#L139) | гл. 11 |
| noch nicht | 11 | 5 · 2 · 1 · 3 | [11-s5](src/story/scenes/11.ts#L563) [12-s1](src/story/scenes/12.ts#L48) | [09](content/a1/09-stadt.yaml#L825) [11](content/a1/11-arbeit.yaml#L44) | гл. 11 |

### Числа, время, цвета и другие группы (11)

| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |
|---|---|---|---|---|---|
| der Deutsche ↻ | экз. | 1 · 1 · 0 · 0 | [12-s5](src/story/scenes/12.ts#L594) | — | — |
| der Donnerstag | 6, экз. | 2 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L37) | [06](content/a1/06-tagesablauf.yaml#L134) [10](content/a1/10-gesundheit.yaml#L216) | гл. 6 |
| der Europäer ↻ | экз. | 1 · 1 · 0 · 0 | [12-s5](src/story/scenes/12.ts#L594) | — | — |
| europäisch ↻ | экз. | 1 · 1 · 0 · 0 | [12-s6](src/story/scenes/12.ts#L652) | — | — |
| der Frühling ↻ | 12, экз. | 1 · 1 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L264) | [12](content/a1/12-reisen.yaml#L135) | гл. 12 |
| das Grad | экз. | 4 · 1 · 2 · 3 | [12-s1](src/story/scenes/12.ts#L50) [12-s3](src/story/scenes/12.ts#L303) [12-s6](src/story/scenes/12.ts#L707) | [12](content/a1/12-reisen.yaml#L68) | гл. 12 |
| der Herbst ↻ | 12, экз. | 12 · 2 · 6 · 7 | [12-s1](src/story/scenes/12.ts#L38) [12-s4](src/story/scenes/12.ts#L435) [12-s6](src/story/scenes/12.ts#L706) [13-s6](src/story/scenes/13.ts#L706) | [12](content/a1/12-reisen.yaml#L137) | гл. 12 |
| die Milliarde ↻ | экз. | 1 · 1 · 0 · 0 | [12-s6](src/story/scenes/12.ts#L705) | — | — |
| der Monat ↻ | 12, экз. | 1 · 1 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L264) | [03](content/a1/03-familie.yaml#L229) [12](content/a1/12-reisen.yaml#L139) | гл. 12 |
| der Winter ↻ | 12, экз. | 4 · 2 · 4 · 3 | [12-s1](src/story/scenes/12.ts#L78) [12-s4](src/story/scenes/12.ts#L458) [12-s6](src/story/scenes/12.ts#L707) [13-s2](src/story/scenes/13.ts#L660) | [05](content/a1/05-einkaufen.yaml#L224) [12](content/a1/12-reisen.yaml#L138) | гл. 12 |
| der Zentimeter ↻ | экз. | 1 · 1 · 0 · 0 | [11-s2](src/story/scenes/11.ts#L188) | — | — |

## Слова: закреплено

873 слов.

### Существительные (396)

das Abendessen, die Abfahrt, der Absender, die Adresse, das Alter, die Ampel, der Anfang, das Angebot, die Ankunft, die Anmeldung, der Anruf, der Anrufbeantworter, die Ansage, die Antwort, die Anzeige, das Apartment, der Apfel, die Apotheke, der Appetit, die Arbeit, Argentinien, der Arm, der Arzt, die Ärztin, die Aufgabe, der Aufzug, das Auge, der Ausflug, der Ausgang, die Auskunft, das Ausland, der Ausländer, der Ausweis, das Auto, die Autobahn, der Automat, das Baby, die Bäckerei, das Bad, die Bahn, der Bahnhof, der Bahnsteig, der Balkon, die Banane, die Bank, der Bauch, der Baum, der Beamte, das Bein, das Beispiel, der Bekannte, der Beruf, das Bett, das Bier, das Bild, die Birne, der Bleistift, der Blick, die Blume, das Boot, der Brief, die Briefmarke, das Brot, das Brötchen, der Bruder, das Buch, der Buchstabe, das Bürgeramt, der Bus, die Butter, das Café, die Cola, der Computer, der Cousin, die Cousine, die Dame, Dänemark, der Dank, die Disco, der Doktor, der Döner, das Dorf, die Dose, der Durst, die Dusche, die E-Mail, die Ecke, die Ehefrau, der Ehemann, das Ei, der Eingang, die Einladung, der Eintritt, die Eltern, der Empfänger, das Ende, der Enkel, die Enkelin, die Entschuldigung, die Erdbeere, das Erdgeschoss, das Ergebnis, die Erkältung, der Erwachsene, der Fahrer, die Fahrkarte, das Fahrrad, die Familie, der Familienname, der Familienstand, die Farbe, der Feierabend, der Feiertag, das Feuer, das Fieber, der Film, die Firma, der Fisch, das Fischbrötchen, die Flasche, das Fleisch, der Flur, das Formular, das Foto, die Frage, die Frau, die Freizeit, der Freund, die Freundin, das Frühstück, die Führung, der Fuß, der Fußball, der Garten, der Gast, das Geburtsjahr, der Geburtsort, der Geburtstag, das Geld, das Gemüse, das Geschäft, das Geschenk, die Geschwister, das Gespräch, das Getränk, das Gewicht, das Glas, das Gleis, das Glück, der Glückwunsch, die Größe, die Großeltern, die Großmutter, der Großvater, die Gruppe, der Gruß, die Gurke, das Haar, der Hafen, das Hähnchen, die Halle, der Hals, die Haltestelle, die Hand, das Handy, die Handynummer, das Haus, die Hausaufgabe, die Hausfrau, der Hausmann, die Hausnummer, die Heimat, die Heizung, das Hemd, der Herd, der Herr, die Hilfe, das Hobby, die Hochzeit, die Hose, der Hund, der Hunger, der Husten, die Idee, die Information, das Internet, die Jacke, der Jugendliche, der Junge, der Kaffee, die Kaltmiete, die Karte, die Kartoffel, Kasachstan, der Käse, die Kasse, die Katze, der Keller, der Kellner, die Kellnerin, das Kind, der Kindergarten, das Kino, der Kiosk, die Klasse, das Kleid, der Kleiderschrank, die Kleidung, der Koch, die Köchin, der Kollege, das Konto, das Konzert, der Kopf, das Krankenhaus, der Krankenpfleger, die Kreditkarte, die Küche, der Kuchen, der Kühlschrank, der Kunde, der Kurs, der Laden, die Lampe, das Land, die Lebensmittel, der Lehrer, die Lehrerin, die Leute, das Licht, Lieblings-, der Liegeplatz, die Linie, der Lkw, das Lokal, die Lösung, das Mädchen, der Mann, der Mantel, die Maschine, der Mechaniker, das Medikament, das Meer, der Mensch, die Miete, die Milch, das Mittagessen, die Mitte, die Möbel, der Moment, der Mund, die Mutter, der Name, die Nase, die Nebenkosten, die Nummer, das Obst, das Ohr, das Öl, die Oma, der Onkel, der Opa, die Orange, die Ordnung, der Ort, die Packung, das Papier, der Park, der Partner, die Partnerin, die Party, der Pass, die Pasta, die Pause, die Person, der Plan, der Platz, die Polizei, die Post, die Postleitzahl, die Praxis, der Preis, das Problem, der Prospekt, die Prüfung, der Pullover, das Rathaus, der Raum, die Rechnung, der Regen, der Reis, die Reparatur, das Restaurant, das Rezept, der Rock, der Rücken, der Rucksack, Russland, die S-Bahn, der Saft, der Salat, das Salz, der Schalter, das Schild, der Schinken, das Schlafzimmer, der Schluss, der Schlüssel, der Schmerz, der Schnupfen, der Schrank, der Schreibtisch, der Schuh, die Schule, der Schüler, die Schweiz, die Schwester, das Schwimmbad, der See, die Sehenswürdigkeit, das Sofa, der Sohn, die Sonne, die Speisekarte, der Sport, die Sprache, die Stadt, die Stelle, der Stock, der Strand, die Straße, die Straßenbahn, das Stück, der Student, der Stuhl, der Supermarkt, die Suppe, das T-Shirt, die Tablette, die Tante, die Tasche, die Tasse, das Taxi, der Tee, der Teil, das Telefon, die Telefonnummer, der Termin, der Test, der Text, das Thema, das Ticket, der Tisch, die Tochter, die Toilette, die Tomate, die Treppe, das Treppenhaus, die Türkei, die Tüte, die U-Bahn, die Uhr, die Ukraine, der Unterricht, die Unterschrift, die USA, der Vater, der Verein, der Verkäufer, die Verkäuferin, der Vermieter, die Versichertenkarte, der Verwandte, der Vorname, die Vorsicht, das Vorstellungsgespräch, die Vorwahl, die Warmmiete, das Wartezimmer, die Waschmaschine, das Wasser, der Wein, das Wiederhören, das Wiedersehen, das Wohnheim, die Wohnung, das Wohnzimmer, das Wort, die Wurst, die Zahl, der Zahn, die Zeit, die Zigarette, das Zimmer, der Zug, die Zwiebel

### Глаголы (141)

abfahren, abholen, anbieten, anfangen, anmachen, anmelden, anrufen, antworten, anziehen, arbeiten, aufhören, aufräumen, aufstehen, ausfüllen, ausmachen, aussehen, aussteigen, ausziehen, baden, beginnen, bekommen, besichtigen, bestellen, bezahlen, bitten, bleiben, brauchen, bringen, buchstabieren, danken, dauern, drücken, dürfen, duschen, einkaufen, einladen, einsteigen, empfehlen, enden, entschuldigen, erklären, erlauben, erzählen, essen, fahren, fehlen, feiern, fernsehen, finden, fotografieren, fragen, frühstücken, geben, gefallen, gehen, gehören, gewinnen, glauben, gratulieren, grillen, haben, halten, heiraten, heißen, helfen, holen, hören, kaufen, kennen, kennenlernen, kochen, kommen, können, kosten, kriegen, lachen, laufen, leben, legen, lernen, lesen, lieben, liegen, machen, mieten, mitbringen, mitkommen, mitmachen, mitnehmen, möchten, mögen, müssen, nehmen, öffnen, passen, rauchen, regnen, reparieren, riechen, sagen, schicken, schlafen, schließen, schmecken, schreiben, schwimmen, segeln, sehen, sein, sitzen, sollen, spielen, sprechen, stehen, stellen, studieren, suchen, tanzen, telefonieren, treffen, trinken, tun, überweisen, umsteigen, umziehen, unterschreiben, verkaufen, vermieten, verstehen, vorstellen, wandern, warten, waschen, wehtun, werden, wiederholen, willkommen, wissen, wohnen, wollen, zahlen

### Прилагательные и наречия (103)

allein, alt, automatisch, bald, bar, beide, bekannt, besetzt, besser, billig, bisschen, bitter, böse, breit, circa, daneben, draußen, dunkel, eilig, einfach, einmal, falsch, fertig, frei, früh, früher, geboren, geöffnet, gerade, geradeaus, gern, geschieden, geschlossen, gestern, gestorben, gesund, gleich, glücklich, groß, gültig, günstig, gut, hell, herzlich, heute, hinten, hoch, immer, international, jetzt, jung, kaputt, klar, klein, krank, kurz, lang, lange, langsam, laut, ledig, leicht, leider, leise, lieber, links, lustig, manchmal, möbliert, modern, möglich, müde, neu, nie, normal, oben, oft, pünktlich, rechts, richtig, ruhig, schlecht, schnell, schön, schwer, sofort, spät, später, teuer, tot, unten, verboten, verheiratet, vielleicht, warm, weit, weiter, wichtig, wunderbar, zufrieden, zurück, zurzeit, zusammen

### Служебные слова (82)

ab, aber, all-, also, an, ander-, auch, auf, aus, bei, best-, bis, bitte, da, danke, dann, dein-, denn, der, dich, dies-, dir, dort, durch, ein-, er, es, euer, für, gegen, hier, ich, ihm, ihn, in, ja, jed-, kein, letzt-, lieb-, man, mehr, mein, meist-, mit, nach, nächst-, nein, nicht, nichts, noch, nur, oder, ohne, schon, sehr, seit, sich, sie, so, über, um, und, unser-, unter, viel, von, vor, wann, warum, was, welch-, Welche?, wenig, wer, wie, wir, wo, woher, wohin, zu, zwischen

### Выражения (56)

100 Gramm, Achtung, Alles Gute!, am liebsten, an sein, auf sein, Auf Wiederhören!, Auf Wiedersehen!, aus sein, Danke, gut!, Durst haben, ein Kilo, ein Liter, ein Pfund, Es regnet., Fahrrad fahren, Freunde treffen, Fußball spielen, Gitarre spielen, Gute Besserung!, Gute Nacht!, Guten Abend!, Guten Appetit!, Guten Morgen!, Guten Tag!, hallo, Hunger haben, in der Nähe, ins Kino gehen, kommen aus, Langsam, bitte., letzte Woche, Moin!, Musik hören, nicht gern, Noch einmal, bitte., die Pommes frites, Rad fahren, Schade!, sich kümmern, Tennis spielen, tschüss, was für ein, weg sein, Wie bitte?, Wie geht's?, Wie komme ich zum …?, Wie spät ist es?, wie viel, Wie viel Uhr ist es?, wohnen in, Zeit haben, zu Fuß, zu sein, zum Beispiel, Zusammen oder getrennt?

### Числа, время, цвета и другие группы (95)

der Abend, acht, achtzehn, achtzig, der April, der August, blau, braun, der Cent, deutsch, Deutschland, der Dezember, der Dienstag, drei, dreißig, dreizehn, dritte, eins, elf, erste, der Euro, Europa, der Februar, der Freitag, fünf, fünfzehn, fünfzig, gelb, das Gramm, grau, grün, halb, hundert, das Jahr, der Januar, der Juli, der Juni, das Kilo, der Kilometer, der Liter, der Mai, der März, der Meter, die Million, die Minute, der Mittag, der Mittwoch, der Montag, morgen, der Nachmittag, die Nacht, neun, neunzehn, neunzig, der Norden, der November, null, der Oktober, der Osten, das Pfund, das Prozent, der Quadratmeter, rot, der Samstag, schwarz, sechs, sechzehn, sechzig, die Sekunde, der September, sieben, siebzehn, siebzig, der Sommer, der Sonntag, die Stunde, der Süden, der Tag, tausend, vier, vierte, das Viertel, vierzehn, vierzig, der Vormittag, weiß, der Westen, die Woche, das Wochenende, der Wochentag, zehn, zwanzig, zwei, zweite, zwölf
