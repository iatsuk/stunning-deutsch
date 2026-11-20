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
| Все обязательные слова (970) | 892 | 78 | 0 | 0 | 0 |
| из них словарь экзамена | 726 | 57 | 0 | 0 | 0 |
| из них слова уроков | 423 | 33 | 0 | 0 | 0 |
| Грамматика (66) | 66 | 0 | 0 | 0 | 0 |

«Закрепит A2» — слова, которые игрок впервые встречает в главе 11 или позже: в A1 за ними идут одна-две главы, и до порога их доводит сезон A2.

В очереди повторения новой версии 753 обязательных слов, из них ниже порога 63. Повторение в порог не входит; в таблицах такие слова помечены ↻.

| Часть речи | закреплено | закрепит A2 | слабо | один раз | нет |
|---|---|---|---|---|---|
| Существительные | 404 | 37 | 0 | 0 | 0 |
| Глаголы | 149 | 13 | 0 | 0 | 0 |
| Прилагательные и наречия | 105 | 11 | 0 | 0 | 0 |
| Служебные слова | 82 | 0 | 0 | 0 | 0 |
| Выражения | 56 | 7 | 0 | 0 | 0 |
| Числа, время, цвета и другие группы | 96 | 10 | 0 | 0 | 0 |

## Грамматика

### Глагол

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Präsens, окончания по лицам | закреплено | 613 · 13 · 462 · 318 | есть | [01-s1](src/story/scenes/01.ts#L54) [01-s2](src/story/scenes/01.ts#L168) [01-s3](src/story/scenes/01.ts#L223) [01-i1](src/story/scenes/01.ts#L387) [01-s4](src/story/scenes/01.ts#L424) [01-s5](src/story/scenes/01.ts#L544) |
| Präsens со сменой корня (e → i, a → ä) | закреплено | 131 · 12 · 51 · 57 | есть | [01-s3](src/story/scenes/01.ts#L223) [01-s4](src/story/scenes/01.ts#L425) [01-s5](src/story/scenes/01.ts#L540) [02-s4](src/story/scenes/02.ts#L526) [04-s2](src/story/scenes/04.ts#L281) [04-s3](src/story/scenes/04.ts#L432) |
| sein | закреплено | 686 · 13 · 300 · 347 | есть | [01-s1](src/story/scenes/01.ts#L35) [01-s2](src/story/scenes/01.ts#L156) |
| haben | закреплено | 277 · 12 · 140 · 143 | есть | [02-s1](src/story/scenes/02.ts#L56) [02-s2](src/story/scenes/02.ts#L151) [02-s3](src/story/scenes/02.ts#L288) [02-i1](src/story/scenes/02.ts#L457) |
| Отделяемые приставки и рамка предложения | закреплено | 72 · 10 · 41 · 30 | есть | [01-s3](src/story/scenes/01.ts#L223) [05-s3](src/story/scenes/05.ts#L320) [05-s4](src/story/scenes/05.ts#L527) [06-s1](src/story/scenes/06.ts#L113) [06-s2](src/story/scenes/06.ts#L242) [06-s3](src/story/scenes/06.ts#L315) |
| Perfekt с haben | закреплено | 82 · 5 · 49 · 38 | есть | [10-s1](src/story/scenes/10.ts#L59) [11-s1](src/story/scenes/11.ts#L38) [11-i1](src/story/scenes/11.ts#L176) [11-s2](src/story/scenes/11.ts#L213) |
| Perfekt с sein | закреплено | 25 · 4 · 19 · 9 | есть | [09-s4](src/story/scenes/09.ts#L593) [11-s2](src/story/scenes/11.ts#L233) [12-s1](src/story/scenes/12.ts#L173) [12-s2](src/story/scenes/12.ts#L196) [12-s3](src/story/scenes/12.ts#L28) [12-s5](src/story/scenes/12.ts#L714) |
| Präteritum war и hatte | закреплено | 31 · 5 · 16 · 10 | есть | [09-s1](src/story/scenes/09.ts#L64) [09-i1](src/story/scenes/09.ts#L328) [10-s1](src/story/scenes/10.ts#L58) [11-i1](src/story/scenes/11.ts#L176) [11-s2](src/story/scenes/11.ts#L233) [11-s3](src/story/scenes/11.ts#L349) |
| möchten | закреплено | 22 · 5 · 15 · 12 | есть | [04-s1](src/story/scenes/04.ts#L54) [04-s2](src/story/scenes/04.ts#L185) [04-s5](src/story/scenes/04.ts#L612) [04-s6](src/story/scenes/04.ts#L758) [04-c1](src/story/scenes/04.ts#L954) [08-s1](src/story/scenes/08.ts#L103) |
| Ich hätte gern …, Ich würde gern … как готовые выражения | закреплено | 8 · 4 · 5 · 3 | есть | [04-s4](src/story/scenes/04.ts#L504) [07-s5](src/story/scenes/07.ts#L633) [12-s3](src/story/scenes/12.ts#L326) [13-s4](src/story/scenes/13.ts#L484) |
| können | закреплено | 42 · 5 · 27 · 18 | есть | [07-s1](src/story/scenes/07.ts#L40) [07-s2](src/story/scenes/07.ts#L216) |
| wollen | закреплено | 31 · 5 · 16 · 10 | есть | [07-s1](src/story/scenes/07.ts#L45) [07-s2](src/story/scenes/07.ts#L230) [07-s3](src/story/scenes/07.ts#L374) |
| müssen | закреплено | 17 · 5 · 8 · 4 | есть | [08-s4](src/story/scenes/08.ts#L609) [10-s1](src/story/scenes/10.ts#L84) [10-s3](src/story/scenes/10.ts#L278) [10-s4](src/story/scenes/10.ts#L471) [10-s5](src/story/scenes/10.ts#L567) [10-s6](src/story/scenes/10.ts#L704) |
| dürfen | закреплено | 30 · 5 · 17 · 6 | есть | [09-s2](src/story/scenes/09.ts#L274) [10-s1](src/story/scenes/10.ts#L84) [10-s2](src/story/scenes/10.ts#L174) [10-s3](src/story/scenes/10.ts#L258) [10-s4](src/story/scenes/10.ts#L29) |
| sollen | закреплено | 19 · 4 · 13 · 11 | есть | [10-s4](src/story/scenes/10.ts#L30) [10-s5](src/story/scenes/10.ts#L617) [10-s6](src/story/scenes/10.ts#L31) [11-s5](src/story/scenes/11.ts#L29) |
| mögen | закреплено | 12 · 4 · 4 · 5 | есть | [07-s3](src/story/scenes/07.ts#L485) [07-s4](src/story/scenes/07.ts#L575) [08-s1](src/story/scenes/08.ts#L103) [12-s3](src/story/scenes/12.ts#L375) [12-s6](src/story/scenes/12.ts#L788) [13-s5](src/story/scenes/13.ts#L612) |
| Модальный глагол и инфинитив в конце | закреплено | 77 · 8 · 43 · 29 | есть | [04-s6](src/story/scenes/04.ts#L758) [07-s1](src/story/scenes/07.ts#L45) [07-s2](src/story/scenes/07.ts#L230) [07-s3](src/story/scenes/07.ts#L374) [07-s4](src/story/scenes/07.ts#L589) [07-s5](src/story/scenes/07.ts#L633) |
| Повелительное наклонение на Sie | закреплено | 385 · 12 · 372 · 201 | есть | [02-s1](src/story/scenes/02.ts#L33) [02-s2](src/story/scenes/02.ts#L147) [02-s3](src/story/scenes/02.ts#L299) |
| Повелительное наклонение на du | закреплено | 70 · 11 · 30 · 43 | есть | [02-s3](src/story/scenes/02.ts#L434) [02-s4](src/story/scenes/02.ts#L553) [03-s6](src/story/scenes/03.ts#L812) [05-s1](src/story/scenes/05.ts#L90) [05-s3](src/story/scenes/05.ts#L320) [05-s6](src/story/scenes/05.ts#L781) |
| Повелительное наклонение на ihr | закреплено | 17 · 6 · 9 · 8 | есть | [06-s1](src/story/scenes/06.ts#L35) [07-s1](src/story/scenes/07.ts#L130) [07-s4](src/story/scenes/07.ts#L555) [08-s1](src/story/scenes/08.ts#L85) [09-s2](src/story/scenes/09.ts#L246) [09-s3](src/story/scenes/09.ts#L397) |

### Предложение

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Глагол на втором месте, время на первом | закреплено | 101 · 13 · 53 · 48 | есть | [01-s1](src/story/scenes/01.ts#L127) [01-s3](src/story/scenes/01.ts#L240) [01-s4](src/story/scenes/01.ts#L468) [01-s6](src/story/scenes/01.ts#L709) [02-s2](src/story/scenes/02.ts#L204) [02-s3](src/story/scenes/02.ts#L288) |
| Вопрос с W-словом | закреплено | 248 · 13 · 173 · 101 | есть | [01-s1](src/story/scenes/01.ts#L45) [01-s2](src/story/scenes/01.ts#L156) [01-s3](src/story/scenes/01.ts#L223) |
| Вопрос да/нет и ответ ja / nein / doch | закреплено | 86 · 13 · 66 · 26 | есть | [01-s6](src/story/scenes/01.ts#L709) [02-s1](src/story/scenes/02.ts#L52) [02-s3](src/story/scenes/02.ts#L284) [02-i1](src/story/scenes/02.ts#L473) [02-s4](src/story/scenes/02.ts#L493) [02-s5](src/story/scenes/02.ts#L657) |
| nicht и kein | закреплено | 315 · 13 · 147 · 133 | есть | [01-s1](src/story/scenes/01.ts#L148) [01-s3](src/story/scenes/01.ts#L223) [01-s5](src/story/scenes/01.ts#L577) [02-s2](src/story/scenes/02.ts#L260) [02-s4](src/story/scenes/02.ts#L579) [02-s5](src/story/scenes/02.ts#L657) |
| und, oder, aber | закреплено | 513 · 13 · 359 · 325 | есть | [01-s3](src/story/scenes/01.ts#L223) [01-i1](src/story/scenes/01.ts#L391) [01-s4](src/story/scenes/01.ts#L418) [01-s6](src/story/scenes/01.ts#L659) [02-s1](src/story/scenes/02.ts#L33) [02-s2](src/story/scenes/02.ts#L147) |
| denn как союз причины | закреплено | 11 · 6 · 5 · 7 | есть | [07-s1](src/story/scenes/07.ts#L64) [07-s2](src/story/scenes/07.ts#L230) [08-s6](src/story/scenes/08.ts#L802) [09-s2](src/story/scenes/09.ts#L228) [10-s4](src/story/scenes/10.ts#L417) [12-s4](src/story/scenes/12.ts#L622) |
| dann | закреплено | 31 · 8 · 9 · 14 | есть | [06-s5](src/story/scenes/06.ts#L668) [06-s6](src/story/scenes/06.ts#L850) [07-s2](src/story/scenes/07.ts#L349) [08-s6](src/story/scenes/08.ts#L806) [08-c1](src/story/scenes/08.ts#L908) [09-s1](src/story/scenes/09.ts#L59) |
| wenn (понимание) | закреплено | 6 · 4 · 2 · 4 | есть | [10-s4](src/story/scenes/10.ts#L481) [11-s5](src/story/scenes/11.ts#L676) [12-s2](src/story/scenes/12.ts#L201) [13-s6](src/story/scenes/13.ts#L748) |
| es gibt | закреплено | 12 · 6 · 3 · 7 | есть | [05-s2](src/story/scenes/05.ts#L212) [07-s1](src/story/scenes/07.ts#L39) [07-s3](src/story/scenes/07.ts#L386) [08-s1](src/story/scenes/08.ts#L88) [09-s1](src/story/scenes/09.ts#L86) [12-s6](src/story/scenes/12.ts#L894) |

### Существительное и артикль

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Множественное число | закреплено | 244 · 13 · 99 · 109 | есть | [01-s3](src/story/scenes/01.ts#L223) [01-s6](src/story/scenes/01.ts#L659) [02-s1](src/story/scenes/02.ts#L120) [02-s2](src/story/scenes/02.ts#L210) [02-s3](src/story/scenes/02.ts#L284) [02-i1](src/story/scenes/02.ts#L468) |
| Винительный падеж | закреплено | 310 · 12 · 240 · 135 | есть | [02-s1](src/story/scenes/02.ts#L66) [02-s2](src/story/scenes/02.ts#L204) [02-s3](src/story/scenes/02.ts#L308) [02-s4](src/story/scenes/02.ts#L510) [02-s5](src/story/scenes/02.ts#L643) [03-s1](src/story/scenes/03.ts#L50) |
| Дательный на вопрос «где?» (in, auf, an) | закреплено | 261 · 13 · 99 · 78 | есть | [01-s6](src/story/scenes/01.ts#L709) [02-s2](src/story/scenes/02.ts#L210) [03-s4](src/story/scenes/03.ts#L490) [03-s5](src/story/scenes/03.ts#L654) [03-s6](src/story/scenes/03.ts#L861) [04-s1](src/story/scenes/04.ts#L151) |
| Предлоги с дательным (mit, zu, bei, von, aus, nach) | закреплено | 152 · 13 · 75 · 56 | есть | [01-s1](src/story/scenes/01.ts#L20) [01-s3](src/story/scenes/01.ts#L223) [01-s5](src/story/scenes/01.ts#L627) [01-s6](src/story/scenes/01.ts#L691) [02-s3](src/story/scenes/02.ts#L299) [03-s2](src/story/scenes/03.ts#L223) |
| Чей? Имя + s (Annas Bruder) | закреплено | 25 · 10 · 14 · 10 | есть | [01-s2](src/story/scenes/01.ts#L189) [01-s5](src/story/scenes/01.ts#L539) [02-s1](src/story/scenes/02.ts#L120) [03-s1](src/story/scenes/03.ts#L66) [03-s3](src/story/scenes/03.ts#L299) [03-s4](src/story/scenes/03.ts#L501) |
| Сложные слова: род по последней части | закреплено | 266 · 13 · 154 · 112 | есть | [01-s1](src/story/scenes/01.ts#L83) [02-s1](src/story/scenes/02.ts#L84) [02-s2](src/story/scenes/02.ts#L137) [02-s3](src/story/scenes/02.ts#L299) [02-s6](src/story/scenes/02.ts#L739) [03-s3](src/story/scenes/03.ts#L281) |
| Женский род на -in | закреплено | 55 · 8 · 36 · 33 | есть | [03-s3](src/story/scenes/03.ts#L413) [03-s4](src/story/scenes/03.ts#L476) [03-s5](src/story/scenes/03.ts#L634) [04-s6](src/story/scenes/04.ts#L1072) [06-s2](src/story/scenes/06.ts#L516) |
| dieser, diese, dieses | закреплено | 7 · 5 · 3 · 4 | есть | [05-i1](src/story/scenes/05.ts#L480) [08-s3](src/story/scenes/08.ts#L496) [09-s2](src/story/scenes/09.ts#L179) [10-s2](src/story/scenes/10.ts#L174) [13-s5](src/story/scenes/13.ts#L612) |
| Притяжательные mein, dein, sein, ihr, unser, euer, Ihr | закреплено | 121 · 13 · 67 · 72 | есть | [01-s1](src/story/scenes/01.ts#L123) [01-i1](src/story/scenes/01.ts#L386) [02-s2](src/story/scenes/02.ts#L210) [02-s3](src/story/scenes/02.ts#L434) [02-s6](src/story/scenes/02.ts#L739) [03-s1](src/story/scenes/03.ts#L45) |
| welcher, welche, welches | закреплено | 39 · 13 · 33 · 13 | есть | [01-s3](src/story/scenes/01.ts#L223) [02-s2](src/story/scenes/02.ts#L210) [02-s3](src/story/scenes/02.ts#L295) [02-s6](src/story/scenes/02.ts#L762) [03-s4](src/story/scenes/03.ts#L541) [04-s4](src/story/scenes/04.ts#L571) |

### Местоимения

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Местоимения в винительном (mich, dich, ihn …) | закреплено | 40 · 9 · 18 · 23 | есть | [02-s4](src/story/scenes/02.ts#L510) [05-s2](src/story/scenes/05.ts#L187) [05-s4](src/story/scenes/05.ts#L608) [05-s5](src/story/scenes/05.ts#L630) [05-s6](src/story/scenes/05.ts#L856) [06-s1](src/story/scenes/06.ts#L169) |
| Местоимения в дательном (mir, dir, ihm, Ihnen) | закреплено | 25 · 9 · 12 · 13 | есть | [01-s1](src/story/scenes/01.ts#L76) [01-s3](src/story/scenes/01.ts#L223) [06-s5](src/story/scenes/06.ts#L687) [07-s3](src/story/scenes/07.ts#L499) [07-s5](src/story/scenes/07.ts#L632) [07-i1](src/story/scenes/07.ts#L754) |
| Глаголы с дательным (gehören, gefallen, helfen, danken, geben) | закреплено | 20 · 9 · 10 · 11 | есть | [04-i1](src/story/scenes/04.ts#L454) [06-s6](src/story/scenes/06.ts#L827) [07-s3](src/story/scenes/07.ts#L498) [07-s5](src/story/scenes/07.ts#L663) [07-s6](src/story/scenes/07.ts#L934) [08-s2](src/story/scenes/08.ts#L183) |
| sich, uns (Wir sehen uns) | закреплено | 28 · 13 · 22 · 24 | есть | [01-s6](src/story/scenes/01.ts#L668) [02-s6](src/story/scenes/02.ts#L739) [03-s6](src/story/scenes/03.ts#L843) [04-s6](src/story/scenes/04.ts#L832) [04-c1](src/story/scenes/04.ts#L954) [05-s6](src/story/scenes/05.ts#L826) |
| Вопросы wen? и wem? | закреплено | 8 · 5 · 3 · 5 | есть | [08-s2](src/story/scenes/08.ts#L183) [09-s6](src/story/scenes/09.ts#L831) [10-s3](src/story/scenes/10.ts#L254) [12-s3](src/story/scenes/12.ts#L314) [13-s6](src/story/scenes/13.ts#L730) |
| man | закреплено | 15 · 5 · 5 · 5 | есть | [07-s1](src/story/scenes/07.ts#L40) [09-s2](src/story/scenes/09.ts#L172) [10-s2](src/story/scenes/10.ts#L174) [12-s2](src/story/scenes/12.ts#L202) [12-s3](src/story/scenes/12.ts#L301) [12-s6](src/story/scenes/12.ts#L894) |
| etwas, nichts, alles, mehr | закреплено | 96 · 12 · 34 · 47 | есть | [01-s2](src/story/scenes/01.ts#L168) [03-s3](src/story/scenes/03.ts#L281) [04-s2](src/story/scenes/04.ts#L258) [04-s3](src/story/scenes/04.ts#L340) [04-s4](src/story/scenes/04.ts#L547) [04-s5](src/story/scenes/04.ts#L616) |

### Прилагательное и числа

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Прилагательное после sein (zu groß) | закреплено | 113 · 13 · 42 · 61 | есть | [01-s2](src/story/scenes/01.ts#L168) [01-s4](src/story/scenes/01.ts#L439) [02-s5](src/story/scenes/02.ts#L619) [03-s2](src/story/scenes/03.ts#L247) [03-s4](src/story/scenes/03.ts#L541) [04-s2](src/story/scenes/04.ts#L270) |
| gern, lieber, am liebsten | закреплено | 29 · 8 · 19 · 14 | есть | [04-s3](src/story/scenes/04.ts#L340) [04-s4](src/story/scenes/04.ts#L504) [04-s6](src/story/scenes/04.ts#L832) [07-s1](src/story/scenes/07.ts#L126) [07-s3](src/story/scenes/07.ts#L481) [07-s4](src/story/scenes/07.ts#L542) |
| Сравнение (besser, mehr, als) | закреплено | 19 · 9 · 12 · 10 | есть | [04-s1](src/story/scenes/04.ts#L64) [06-s6](src/story/scenes/06.ts#L987) [07-s2](src/story/scenes/07.ts#L888) [07-s3](src/story/scenes/07.ts#L386) [08-s3](src/story/scenes/08.ts#L427) [10-s3](src/story/scenes/10.ts#L258) |
| Цены и количества | закреплено | 96 · 11 · 54 · 35 | есть | [02-s6](src/story/scenes/02.ts#L772) [03-s2](src/story/scenes/03.ts#L227) [03-i1](src/story/scenes/03.ts#L227) [03-s6](src/story/scenes/03.ts#L773) [04-s3](src/story/scenes/04.ts#L340) [04-s4](src/story/scenes/04.ts#L534) |
| Время на часах | закреплено | 193 · 10 · 98 · 72 | есть | [02-s5](src/story/scenes/02.ts#L643) [04-s2](src/story/scenes/04.ts#L184) [04-s3](src/story/scenes/04.ts#L336) [04-s4](src/story/scenes/04.ts#L499) [04-c1](src/story/scenes/04.ts#L892) [06-s1](src/story/scenes/06.ts#L36) |
| Порядковые числа и дата | закреплено | 48 · 11 · 28 · 16 | есть | [03-s5](src/story/scenes/03.ts#L680) [04-s1](src/story/scenes/04.ts#L37) [06-s6](src/story/scenes/06.ts#L987) [07-s2](src/story/scenes/07.ts#L888) [08-s2](src/story/scenes/08.ts#L272) [08-i1](src/story/scenes/08.ts#L320) |

### Предлоги

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| um, am, im, von … bis во времени | закреплено | 164 · 10 · 86 · 65 | есть | [04-c1](src/story/scenes/04.ts#L892) [05-s6](src/story/scenes/05.ts#L856) [06-s1](src/story/scenes/06.ts#L36) [06-s2](src/story/scenes/06.ts#L196) |
| ab и für во времени (ab Montag, für zwei Wochen) | закреплено | 14 · 6 · 8 · 2 | есть | [08-s3](src/story/scenes/08.ts#L427) [09-s2](src/story/scenes/09.ts#L175) [10-s3](src/story/scenes/10.ts#L255) [10-s4](src/story/scenes/10.ts#L492) [11-s5](src/story/scenes/11.ts#L665) [12-s3](src/story/scenes/12.ts#L311) |
| nach и vor во времени (nach dem Essen) | закреплено | 11 · 5 · 6 · 5 | есть | [08-s6](src/story/scenes/08.ts#L782) [09-s2](src/story/scenes/09.ts#L175) [10-s3](src/story/scenes/10.ts#L255) [10-s4](src/story/scenes/10.ts#L492) [12-s4](src/story/scenes/12.ts#L609) [13-s5](src/story/scenes/13.ts#L602) |
| über (über zwanzig Minuten) | закреплено | 8 · 4 · 5 · 3 | есть | [09-s2](src/story/scenes/09.ts#L175) [10-s3](src/story/scenes/10.ts#L254) [10-s4](src/story/scenes/10.ts#L493) [12-s3](src/story/scenes/12.ts#L375) [13-s2](src/story/scenes/13.ts#L210) |
| nach Hause / zu Hause | закреплено | 20 · 5 · 12 · 6 | есть | [07-s2](src/story/scenes/07.ts#L194) [09-s5](src/story/scenes/09.ts#L775) [09-s6](src/story/scenes/09.ts#L830) [10-s4](src/story/scenes/10.ts#L30) [12-s1](src/story/scenes/12.ts#L122) |
| in, an, auf + винительный для направления (in die Stadt) | закреплено | 52 · 10 · 26 · 18 | есть | [03-s4](src/story/scenes/03.ts#L529) [04-s2](src/story/scenes/04.ts#L290) [04-s5](src/story/scenes/04.ts#L626) [06-s2](src/story/scenes/06.ts#L238) [06-s5](src/story/scenes/06.ts#L691) [06-s6](src/story/scenes/06.ts#L872) |
| unter | закреплено | 12 · 5 · 6 · 6 | есть | [04-s3](src/story/scenes/04.ts#L340) [04-s6](src/story/scenes/04.ts#L803) [04-c1](src/story/scenes/04.ts#L954) [08-s2](src/story/scenes/08.ts#L214) [09-s2](src/story/scenes/09.ts#L286) [11-s2](src/story/scenes/11.ts#L233) |
| ohne и für (ohne dich, für meinen Freund) | закреплено | 61 · 13 · 29 · 16 | есть | [01-s1](src/story/scenes/01.ts#L148) [02-s2](src/story/scenes/02.ts#L260) [02-s4](src/story/scenes/02.ts#L510) [03-s4](src/story/scenes/03.ts#L489) [03-s5](src/story/scenes/03.ts#L728) [04-s1](src/story/scenes/04.ts#L176) |

### Словообразование

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Существительные на -ung | закреплено | 156 · 12 · 86 · 70 | есть | [02-s2](src/story/scenes/02.ts#L137) [02-s3](src/story/scenes/02.ts#L299) [02-s5](src/story/scenes/02.ts#L721) [04-s2](src/story/scenes/04.ts#L237) [04-s3](src/story/scenes/04.ts#L340) [04-s4](src/story/scenes/04.ts#L550) |
| Прилагательные с un-, -los, -bar | закреплено | 8 · 5 · 5 · 6 | есть | [08-s6](src/story/scenes/08.ts#L1094) [09-s2](src/story/scenes/09.ts#L975) [09-s4](src/story/scenes/09.ts#L593) [11-s1](src/story/scenes/11.ts#L74) [12-s4](src/story/scenes/12.ts#L623) [13-s6](src/story/scenes/13.ts#L708) |
| hellblau, dunkelblau | закреплено | 31 · 7 · 14 · 3 | есть | [05-s2](src/story/scenes/05.ts#L268) [05-s3](src/story/scenes/05.ts#L320) [05-s5](src/story/scenes/05.ts#L639) [05-s6](src/story/scenes/05.ts#L775) [06-s2](src/story/scenes/06.ts#L226) [06-i1](src/story/scenes/06.ts#L485) |
| Причастие как прилагательное (geöffnet, geschlossen) | закреплено | 9 · 6 · 6 · 5 | есть | [06-s3](src/story/scenes/06.ts#L315) [08-s4](src/story/scenes/08.ts#L609) [10-s5](src/story/scenes/10.ts#L553) [12-s3](src/story/scenes/12.ts#L375) [09-разминка](src/story/scenes/warmups.ts#L109) [11-разминка](src/story/scenes/warmups.ts#L87) |
| Погода с es (Es regnet) | закреплено | 31 · 6 · 9 · 8 | есть | [05-s1](src/story/scenes/05.ts#L40) [06-s6](src/story/scenes/06.ts#L815) [09-s1](src/story/scenes/09.ts#L41) [09-i1](src/story/scenes/09.ts#L342) [09-s3](src/story/scenes/09.ts#L382) [11-s1](src/story/scenes/11.ts#L156) |
| Ich habe …schmerzen, … tut weh | закреплено | 18 · 4 · 10 · 11 | есть | [10-s1](src/story/scenes/10.ts#L40) [10-s2](src/story/scenes/10.ts#L124) [10-s3](src/story/scenes/10.ts#L354) [10-s6](src/story/scenes/10.ts#L710) [11-s3](src/story/scenes/11.ts#L349) [12-s3](src/story/scenes/12.ts#L375) |

## Слова: нет

0 слов.

## Слова: один раз

0 слов.

## Слова: слабо

0 слов.

## Слова: закрепит A2

78 слов.

### Существительные (37)

| Слово | Откуда | Числа | Где в новой версии | Уроки |
|---|---|---|---|---|
| der Abflug (от fliegen) ↻ | экз. | 2 · 2 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L233) [13-s2](src/story/scenes/13.ts#L783) | — |
| die Abreise | 12 | 2 · 1 · 1 · 1 | [12-s3](src/story/scenes/12.ts#L375) | [12](content/a1/12-reisen.yaml#L112) |
| die Anreise ↻ | 12 | 4 · 2 · 3 · 3 | [12-s3](src/story/scenes/12.ts#L375) [12-s6](src/story/scenes/12.ts#L914) [13-s6](src/story/scenes/13.ts#L829) | [12](content/a1/12-reisen.yaml#L111) |
| der Anschluss ↻ | экз. | 3 · 2 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L375) [13-s6](src/story/scenes/13.ts#L829) | — |
| der Arbeitsplatz ↻ | экз. | 3 · 3 · 2 · 2 | [11-s1](src/story/scenes/11.ts#L145) [12-s2](src/story/scenes/12.ts#L972) [13-s2](src/story/scenes/13.ts#L783) | — |
| der Bogen ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L687) [12-s2](src/story/scenes/12.ts#L972) [13-s5](src/story/scenes/13.ts#L820) | — |
| der Chef ↻ | экз. | 3 · 3 · 2 · 2 | [11-s1](src/story/scenes/11.ts#L145) [12-s2](src/story/scenes/12.ts#L972) [13-s5](src/story/scenes/13.ts#L820) | — |
| das Datum ↻ | 12, экз. | 3 · 2 · 3 · 1 | [12-s3](src/story/scenes/12.ts#L375) [13-s6](src/story/scenes/13.ts#L829) | [12](content/a1/12-reisen.yaml#L130) |
| das Doppelzimmer ↻ | 12, экз. | 3 · 2 · 3 · 1 | [12-s3](src/story/scenes/12.ts#L375) [13-s6](src/story/scenes/13.ts#L829) | [12](content/a1/12-reisen.yaml#L106) |
| der Drucker (от drucken) ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L750) [12-s2](src/story/scenes/12.ts#L972) [13-s5](src/story/scenes/13.ts#L820) | — |
| das Einzelzimmer ↻ | 12, экз. | 11 · 2 · 8 · 4 | [12-s1](src/story/scenes/12.ts#L158) [12-s3](src/story/scenes/12.ts#L326) [13-s3](src/story/scenes/13.ts#L334) [13-s4](src/story/scenes/13.ts#L468) | [12](content/a1/12-reisen.yaml#L36) |
| die Ferien ↻ | 12 | 2 · 2 · 2 · 2 | [12-s6](src/story/scenes/12.ts#L915) [13-s3](src/story/scenes/13.ts#L792) | [12](content/a1/12-reisen.yaml#L148) |
| der Flughafen ↻ | 12, экз. | 3 · 2 · 3 · 3 | [12-s1](src/story/scenes/12.ts#L158) [12-s2](src/story/scenes/12.ts#L287) [13-s6](src/story/scenes/13.ts#L829) | [12](content/a1/12-reisen.yaml#L94) |
| der Friseur ↻ | 11 | 3 · 3 · 3 · 3 | [11-s1](src/story/scenes/11.ts#L148) [12-s5](src/story/scenes/12.ts#L999) [13-s5](src/story/scenes/13.ts#L820) | [11](content/a1/11-arbeit.yaml#L101) |
| das Gepäck ↻ | экз. | 3 · 2 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L375) [13-s6](src/story/scenes/13.ts#L829) | — |
| die Halbpension ↻ | экз. | 3 · 2 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L375) [13-s6](src/story/scenes/13.ts#L829) | — |
| das Hotel ↻ | 12, экз. | 22 · 2 · 13 · 6 | [12-s1](src/story/scenes/12.ts#L27) [12-s2](src/story/scenes/12.ts#L250) [12-s3](src/story/scenes/12.ts#L301) | [12](content/a1/12-reisen.yaml#L26) |
| der Informatiker ↻ | 11 | 3 · 3 · 3 · 3 | [11-s1](src/story/scenes/11.ts#L148) [12-s5](src/story/scenes/12.ts#L999) [13-s5](src/story/scenes/13.ts#L820) | [11](content/a1/11-arbeit.yaml#L103) |
| der Ingenieur ↻ | 11 | 3 · 3 · 3 · 3 | [11-s1](src/story/scenes/11.ts#L148) [12-s5](src/story/scenes/12.ts#L999) [13-s5](src/story/scenes/13.ts#L820) | [11](content/a1/11-arbeit.yaml#L100) |
| die Jahreszeit ↻ | 12 | 2 · 2 · 2 · 2 | [12-s2](src/story/scenes/12.ts#L287) [13-s2](src/story/scenes/13.ts#L783) | [12](content/a1/12-reisen.yaml#L130) |
| der Job ↻ | экз. | 2 · 2 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L76) [12-s5](src/story/scenes/12.ts#L999) | — |
| der Koffer ↻ | 12, экз. | 8 · 2 · 6 · 5 | [12-s1](src/story/scenes/12.ts#L78) [12-s2](src/story/scenes/12.ts#L287) [12-s3](src/story/scenes/12.ts#L301) [12-s6](src/story/scenes/12.ts#L914) [13-s2](src/story/scenes/13.ts#L783) | [12](content/a1/12-reisen.yaml#L99) |
| der Kugelschreiber ↻ | экз. | 2 · 2 · 1 · 1 | [11-s5](src/story/scenes/11.ts#L750) [12-s5](src/story/scenes/12.ts#L999) | — |
| das Lied | экз. | 11 · 2 · 5 · 4 | [11-s3](src/story/scenes/11.ts#L349) [11-s5](src/story/scenes/11.ts#L736) [13-s1](src/story/scenes/13.ts#L38) [13-s6](src/story/scenes/13.ts#L717) | — |
| die Papiere ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L688) [12-s6](src/story/scenes/12.ts#L1008) [13-s6](src/story/scenes/13.ts#L829) | — |
| das Praktikum ↻ | экз. | 2 · 2 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L76) [12-s5](src/story/scenes/12.ts#L999) | — |
| der Regenschirm ↻ | 12 | 6 · 2 · 6 · 3 | [12-s1](src/story/scenes/12.ts#L41) [12-s6](src/story/scenes/12.ts#L914) [13-s2](src/story/scenes/13.ts#L783) | [12](content/a1/12-reisen.yaml#L70) |
| die Reise (от reisen) ↻ | 12, экз. | 7 · 2 · 4 · 5 | [12-s2](src/story/scenes/12.ts#L287) [12-s6](src/story/scenes/12.ts#L914) [13-s6](src/story/scenes/13.ts#L730) | [12](content/a1/12-reisen.yaml#L1) |
| das Reisebüro (от reisen) ↻ | экз. | 2 · 2 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L212) [13-s5](src/story/scenes/13.ts#L820) | — |
| der Reiseführer (от reisen) ↻ | экз. | 2 · 2 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L212) [13-s5](src/story/scenes/13.ts#L820) | — |
| die Rezeption | экз. | 1 · 1 · 0 · 0 | [12-s3](src/story/scenes/12.ts#L301) | — |
| das Studium ↻ | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L76) | — |
| die Verspätung ↻ | 12 | 12 · 2 · 6 · 7 | [12-s2](src/story/scenes/12.ts#L213) [12-s3](src/story/scenes/12.ts#L28) [12-s6](src/story/scenes/12.ts#L914) [13-s2](src/story/scenes/13.ts#L27) | [09](content/a1/09-stadt.yaml#L215) [12](content/a1/12-reisen.yaml#L48) |
| die Welt ↻ | экз. | 2 · 2 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L212) [13-s5](src/story/scenes/13.ts#L820) | — |
| das Wetter ↻ | 12, экз. | 6 · 2 · 5 · 5 | [12-s1](src/story/scenes/12.ts#L38) [12-s4](src/story/scenes/12.ts#L604) [12-s6](src/story/scenes/12.ts#L914) [13-s2](src/story/scenes/13.ts#L783) | [12](content/a1/12-reisen.yaml#L66) |
| der Wind | экз. | 3 · 1 · 1 · 2 | [12-s1](src/story/scenes/12.ts#L50) [12-s2](src/story/scenes/12.ts#L202) | [12](content/a1/12-reisen.yaml#L338) |
| der Zoll ↻ | экз. | 2 · 2 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L894) [13-s2](src/story/scenes/13.ts#L167) | — |

### Глаголы (13)

| Слово | Откуда | Числа | Где в новой версии | Уроки |
|---|---|---|---|---|
| abgeben ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L688) [12-s6](src/story/scenes/12.ts#L1008) [13-s2](src/story/scenes/13.ts#L783) | — |
| anklicken ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L750) [12-s2](src/story/scenes/12.ts#L972) [13-s2](src/story/scenes/13.ts#L783) | — |
| ankommen | экз. | 3 · 1 · 2 · 1 | [12-s2](src/story/scenes/12.ts#L268) | [12](content/a1/12-reisen.yaml#L48) |
| bedeuten ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L752) [12-s2](src/story/scenes/12.ts#L972) [13-s2](src/story/scenes/13.ts#L783) | [08](content/a1/08-wohnen.yaml#L42) |
| benutzen ↻ | экз. | 3 · 3 · 2 · 2 | [11-s2](src/story/scenes/11.ts#L225) [12-s2](src/story/scenes/12.ts#L972) [13-s2](src/story/scenes/13.ts#L783) | [09](content/a1/09-stadt.yaml#L236) |
| besuchen | экз. | 1 · 1 · 1 · 0 | [11-s2](src/story/scenes/11.ts#L294) | [07](content/a1/07-freizeit.yaml#L64) |
| drucken ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L750) [12-s2](src/story/scenes/12.ts#L972) [13-s5](src/story/scenes/13.ts#L820) | — |
| freuen | экз. | 2 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L789) | — |
| reisen | экз. | 7 · 2 · 4 · 5 | [12-s2](src/story/scenes/12.ts#L287) [12-s6](src/story/scenes/12.ts#L914) [13-s6](src/story/scenes/13.ts#L730) | [12](content/a1/12-reisen.yaml#L1) |
| reservieren | 12 | 5 · 1 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L312) | [02](content/a1/02-zahlen.yaml#L770) [12](content/a1/12-reisen.yaml#L113) |
| scheinen | экз. | 4 · 2 · 1 · 0 | [12-s5](src/story/scenes/12.ts#L679) [13-s1](src/story/scenes/13.ts#L37) | [12](content/a1/12-reisen.yaml#L68) |
| übernachten ↻ | экз. | 3 · 2 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L375) [13-s3](src/story/scenes/13.ts#L792) | — |
| verdienen ↻ | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L76) | — |

### Прилагательные и наречия (11)

| Слово | Откуда | Числа | Где в новой версии | Уроки |
|---|---|---|---|---|
| arbeitslos | экз. | 1 · 1 · 0 · 1 | [11-s1](src/story/scenes/11.ts#L74) | — |
| ausländisch (от das Ausland) ↻ | экз. | 2 · 2 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L804) [13-s3](src/story/scenes/13.ts#L792) | — |
| bewölkt ↻ | 12 | 3 · 2 · 3 · 3 | [12-s4](src/story/scenes/12.ts#L604) [12-s6](src/story/scenes/12.ts#L915) [13-разминка](src/story/scenes/warmups.ts#L85) | [12](content/a1/12-reisen.yaml#L123) |
| fremd ↻ | экз. | 2 · 2 · 1 · 1 | [12-s5](src/story/scenes/12.ts#L746) [13-s6](src/story/scenes/13.ts#L829) | — |
| kalt ↻ | 12 | 4 · 2 · 3 · 3 | [12-s1](src/story/scenes/12.ts#L38) [12-s4](src/story/scenes/12.ts#L604) [13-s3](src/story/scenes/13.ts#L792) | [08](content/a1/08-wohnen.yaml#L40) [12](content/a1/12-reisen.yaml#L66) |
| kulturell ↻ | экз. | 2 · 2 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L804) [13-s6](src/story/scenes/13.ts#L829) | — |
| männlich (от der Mann) ↻ | экз. | 2 · 2 · 1 · 1 | [11-s5](src/story/scenes/11.ts#L687) [12-s5](src/story/scenes/12.ts#L999) | — |
| selbstständig ↻ | экз. | 1 · 1 · 0 · 0 | [11-s1](src/story/scenes/11.ts#L145) | — |
| sonnig ↻ | 12 | 3 · 2 · 3 · 3 | [12-s4](src/story/scenes/12.ts#L604) [12-s6](src/story/scenes/12.ts#L915) [13-s3](src/story/scenes/13.ts#L792) | [12](content/a1/12-reisen.yaml#L122) |
| weiblich ↻ | экз. | 1 · 1 · 0 · 0 | [11-s5](src/story/scenes/11.ts#L687) | [11](content/a1/11-arbeit.yaml#L345) |
| windig ↻ | 12 | 4 · 2 · 3 · 3 | [12-s1](src/story/scenes/12.ts#L38) [12-s4](src/story/scenes/12.ts#L604) [12-s6](src/story/scenes/12.ts#L915) [13-s3](src/story/scenes/13.ts#L792) | [12](content/a1/12-reisen.yaml#L66) |

### Выражения (7)

| Слово | Откуда | Числа | Где в новой версии | Уроки |
|---|---|---|---|---|
| arbeiten als | 11 | 1 · 1 · 1 · 0 | [11-s6](src/story/scenes/11.ts#L804) | [11](content/a1/11-arbeit.yaml#L129) |
| Die Sonne scheint. | 12 | 3 · 2 · 0 · 0 | [12-s5](src/story/scenes/12.ts#L679) [13-s1](src/story/scenes/13.ts#L37) | [12](content/a1/12-reisen.yaml#L68) |
| Es schneit. ↻ | 12 | 2 · 2 · 2 · 2 | [12-s6](src/story/scenes/12.ts#L915) [13-s3](src/story/scenes/13.ts#L792) | [12](content/a1/12-reisen.yaml#L121) |
| Es sind 20 Grad. ↻ | 12 | 2 · 2 · 2 · 2 | [12-s6](src/story/scenes/12.ts#L915) [13-s3](src/story/scenes/13.ts#L792) | [12](content/a1/12-reisen.yaml#L127) |
| gestern Abend ↻ | 11 | 3 · 3 · 3 · 3 | [11-s6](src/story/scenes/11.ts#L822) [12-s5](src/story/scenes/12.ts#L999) [13-s5](src/story/scenes/13.ts#L820) | [11](content/a1/11-arbeit.yaml#L48) |
| letztes Jahr ↻ | 11 | 2 · 2 · 2 · 2 | [11-s6](src/story/scenes/11.ts#L822) [12-s5](src/story/scenes/12.ts#L999) | [11](content/a1/11-arbeit.yaml#L139) |
| noch nicht | 11 | 5 · 2 · 1 · 3 | [11-s5](src/story/scenes/11.ts#L676) [12-s1](src/story/scenes/12.ts#L48) | [11](content/a1/11-arbeit.yaml#L44) |

### Числа, время, цвета и другие группы (10)

| Слово | Откуда | Числа | Где в новой версии | Уроки |
|---|---|---|---|---|
| der Deutsche ↻ | экз. | 2 · 2 · 1 · 1 | [12-s5](src/story/scenes/12.ts#L746) [13-s2](src/story/scenes/13.ts#L783) | — |
| der Europäer ↻ | экз. | 2 · 2 · 1 · 1 | [12-s5](src/story/scenes/12.ts#L746) [13-s2](src/story/scenes/13.ts#L783) | — |
| europäisch ↻ | экз. | 2 · 2 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L804) [13-s3](src/story/scenes/13.ts#L792) | — |
| der Frühling ↻ | 12, экз. | 2 · 2 · 2 · 2 | [12-s2](src/story/scenes/12.ts#L287) [13-s2](src/story/scenes/13.ts#L783) | [12](content/a1/12-reisen.yaml#L135) |
| das Grad | экз. | 6 · 2 · 4 · 5 | [12-s1](src/story/scenes/12.ts#L50) [12-s3](src/story/scenes/12.ts#L375) [12-s4](src/story/scenes/12.ts#L604) [12-s6](src/story/scenes/12.ts#L915) [13-s3](src/story/scenes/13.ts#L792) | [12](content/a1/12-reisen.yaml#L68) |
| der Herbst ↻ | 12, экз. | 12 · 2 · 6 · 7 | [12-s1](src/story/scenes/12.ts#L38) [12-s4](src/story/scenes/12.ts#L584) [12-s6](src/story/scenes/12.ts#L914) [13-s2](src/story/scenes/13.ts#L783) | [12](content/a1/12-reisen.yaml#L137) |
| die Milliarde ↻ | экз. | 2 · 2 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L913) [13-s2](src/story/scenes/13.ts#L783) | — |
| der Monat ↻ | 12, экз. | 2 · 2 · 2 · 2 | [12-s2](src/story/scenes/12.ts#L287) [13-s2](src/story/scenes/13.ts#L783) | [03](content/a1/03-familie.yaml#L229) [12](content/a1/12-reisen.yaml#L139) |
| der Winter ↻ | 12, экз. | 4 · 2 · 4 · 3 | [12-s1](src/story/scenes/12.ts#L78) [12-s4](src/story/scenes/12.ts#L610) [12-s6](src/story/scenes/12.ts#L915) [13-s2](src/story/scenes/13.ts#L783) | [05](content/a1/05-einkaufen.yaml#L224) [12](content/a1/12-reisen.yaml#L138) |
| der Zentimeter ↻ | экз. | 1 · 1 · 0 · 0 | [11-s2](src/story/scenes/11.ts#L202) | — |

## Слова: закреплено

892 слов.

### Существительные (404)

das Abendessen, die Abfahrt, der Absender, die Adresse, das Alter, die Ampel, der Anfang, das Angebot, die Ankunft, die Anmeldung, die Anrede, der Anruf, der Anrufbeantworter, die Ansage, die Antwort, die Anzeige, das Apartment, der Apfel, die Apotheke, der Appetit, die Arbeit, Argentinien, der Arm, der Arzt, die Ärztin, die Aufgabe, der Aufzug, das Auge, der Ausflug, der Ausgang, die Auskunft, das Ausland, der Ausländer, die Aussage, der Ausweis, das Auto, die Autobahn, der Automat, das Baby, die Bäckerei, das Bad, die Bahn, der Bahnhof, der Bahnsteig, der Balkon, die Banane, die Bank, der Bauch, der Baum, der Beamte, das Bein, das Beispiel, der Bekannte, der Beruf, das Bett, das Bier, das Bild, die Birne, der Bleistift, der Blick, die Blume, das Boot, der Brief, die Briefmarke, das Brot, das Brötchen, der Bruder, das Buch, der Buchstabe, das Bürgeramt, der Bus, die Butter, das Café, die Cola, der Computer, der Cousin, die Cousine, die Dame, Dänemark, der Dank, die Disco, der Doktor, der Döner, das Dorf, die Dose, die Durchsage, der Durst, die Dusche, die E-Mail, die Ecke, die Ehefrau, der Ehemann, das Ei, der Eingang, die Einladung, der Eintritt, die Eltern, der Empfänger, das Ende, der Enkel, die Enkelin, die Entschuldigung, die Erdbeere, das Erdgeschoss, das Ergebnis, die Erkältung, der Erwachsene, der Fahrer, die Fahrkarte, das Fahrrad, die Familie, der Familienname, der Familienstand, die Farbe, der Fehler, der Feierabend, der Feiertag, das Feuer, das Fieber, der Film, die Firma, der Fisch, das Fischbrötchen, die Flasche, das Fleisch, das Flugzeug, der Flur, das Formular, das Foto, die Frage, die Frau, die Freizeit, der Freund, die Freundin, das Frühstück, die Führung, der Fuß, der Fußball, der Garten, der Gast, das Geburtsjahr, der Geburtsort, der Geburtstag, das Geld, das Gemüse, das Geschäft, das Geschenk, die Geschwister, das Gespräch, das Getränk, das Gewicht, das Glas, das Gleis, das Glück, der Glückwunsch, die Größe, die Großeltern, die Großmutter, der Großvater, die Gruppe, der Gruß, die Gurke, das Haar, der Hafen, das Hähnchen, die Halle, der Hals, die Haltestelle, die Hand, das Handy, die Handynummer, das Haus, die Hausaufgabe, die Hausfrau, der Hausmann, die Hausnummer, die Heimat, die Heizung, das Hemd, der Herd, der Herr, die Hilfe, das Hobby, die Hochzeit, die Hose, der Hund, der Hunger, der Husten, die Idee, die Information, das Internet, die Jacke, der Jugendliche, der Junge, der Kaffee, die Kaltmiete, die Karte, die Kartoffel, Kasachstan, der Käse, die Kasse, die Katze, der Keller, der Kellner, die Kellnerin, das Kind, der Kindergarten, das Kino, der Kiosk, die Klasse, das Kleid, der Kleiderschrank, die Kleidung, der Koch, die Köchin, der Kollege, das Konto, das Konzert, der Kopf, das Krankenhaus, der Krankenpfleger, die Kreditkarte, die Küche, der Kuchen, der Kühlschrank, der Kunde, der Kurs, der Laden, die Lampe, das Land, die Lebensmittel, der Lehrer, die Lehrerin, die Leute, das Licht, Lieblings-, der Liegeplatz, die Linie, der Lkw, das Lokal, die Lösung, das Mädchen, der Mann, der Mantel, die Maschine, der Mechaniker, das Medikament, das Meer, der Mensch, die Miete, die Milch, das Mittagessen, die Mitte, die Möbel, der Moment, der Mund, die Mutter, der Name, die Nase, die Nebenkosten, die Nummer, das Obst, das Ohr, das Öl, die Oma, der Onkel, der Opa, die Orange, die Ordnung, der Ort, die Packung, das Papier, der Park, der Partner, die Partnerin, die Party, der Pass, die Pasta, die Pause, die Person, der Plan, der Platz, die Polizei, die Post, die Postleitzahl, die Praxis, der Preis, das Problem, der Prospekt, die Prüfung, der Pullover, das Rathaus, der Raum, die Rechnung, der Regen, der Reis, die Reparatur, das Restaurant, das Rezept, der Rock, der Rücken, der Rucksack, Russland, die S-Bahn, der Saft, der Salat, das Salz, Satz, der Schalter, das Schild, der Schinken, das Schlafzimmer, der Schluss, der Schlüssel, der Schmerz, der Schnupfen, der Schrank, der Schreibtisch, der Schuh, die Schule, der Schüler, die Schweiz, die Schwester, das Schwimmbad, der See, die Sehenswürdigkeit, das Sofa, der Sohn, die Sonne, die Speisekarte, der Sport, die Sprache, die Stadt, die Stelle, der Stock, der Strand, die Straße, die Straßenbahn, das Stück, der Student, der Stuhl, der Supermarkt, die Suppe, das T-Shirt, die Tablette, die Tante, die Tasche, die Tasse, das Taxi, der Tee, der Teil, das Telefon, die Telefonnummer, der Termin, der Test, der Text, das Thema, das Ticket, der Tisch, die Tochter, die Toilette, die Tomate, die Treppe, das Treppenhaus, die Türkei, die Tüte, die U-Bahn, die Uhr, die Ukraine, der Unterricht, die Unterschrift, der Urlaub, die USA, der Vater, der Verein, der Verkäufer, die Verkäuferin, der Vermieter, die Versichertenkarte, der Verwandte, der Vorname, die Vorsicht, das Vorstellungsgespräch, die Vorwahl, die Warmmiete, das Wartezimmer, die Waschmaschine, das Wasser, der Wein, das Wiederhören, das Wiedersehen, das Wohnheim, die Wohnung, das Wohnzimmer, das Wort, die Wurst, die Zahl, der Zahn, die Zeit, die Zeitung, die Zigarette, das Zimmer, der Zug, die Zwiebel

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
