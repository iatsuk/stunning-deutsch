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
| Все обязательные слова (970) | 897 | 73 | 0 | 0 | 0 |
| из них словарь экзамена | 728 | 55 | 0 | 0 | 0 |
| из них слова уроков | 427 | 29 | 0 | 0 | 0 |
| Грамматика (66) | 66 | 0 | 0 | 0 | 0 |

«Закрепит A2» — слова, которые игрок впервые встречает в главе 11 или позже: в A1 за ними идут одна-две главы, и до порога их доводит сезон A2.

В очереди повторения новой версии 754 обязательных слов, из них ниже порога 58. Повторение в порог не входит; в таблицах такие слова помечены ↻.

| Часть речи | закреплено | закрепит A2 | слабо | один раз | нет |
|---|---|---|---|---|---|
| Существительные | 406 | 35 | 0 | 0 | 0 |
| Глаголы | 149 | 13 | 0 | 0 | 0 |
| Прилагательные и наречия | 108 | 8 | 0 | 0 | 0 |
| Служебные слова | 82 | 0 | 0 | 0 | 0 |
| Выражения | 56 | 7 | 0 | 0 | 0 |
| Числа, время, цвета и другие группы | 96 | 10 | 0 | 0 | 0 |

## Грамматика

### Глагол

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Präsens, окончания по лицам | закреплено | 648 · 13 · 485 · 351 | есть | [01-s1](src/story/scenes/01.ts#L54) [01-s2](src/story/scenes/01.ts#L168) [01-s3](src/story/scenes/01.ts#L223) [01-i1](src/story/scenes/01.ts#L387) [01-s4](src/story/scenes/01.ts#L424) [01-s5](src/story/scenes/01.ts#L544) |
| Präsens со сменой корня (e → i, a → ä) | закреплено | 143 · 12 · 52 · 66 | есть | [01-s3](src/story/scenes/01.ts#L223) [01-s4](src/story/scenes/01.ts#L425) [01-s5](src/story/scenes/01.ts#L540) [02-s4](src/story/scenes/02.ts#L529) [04-s2](src/story/scenes/04.ts#L281) [04-s3](src/story/scenes/04.ts#L432) |
| sein | закреплено | 712 · 13 · 310 · 375 | есть | [01-s1](src/story/scenes/01.ts#L35) [01-s2](src/story/scenes/01.ts#L156) |
| haben | закреплено | 289 · 12 · 145 · 157 | есть | [02-s1](src/story/scenes/02.ts#L56) [02-s2](src/story/scenes/02.ts#L151) [02-s3](src/story/scenes/02.ts#L291) [02-i1](src/story/scenes/02.ts#L460) |
| Отделяемые приставки и рамка предложения | закреплено | 75 · 10 · 40 · 37 | есть | [01-s3](src/story/scenes/01.ts#L223) [05-s3](src/story/scenes/05.ts#L320) [05-s4](src/story/scenes/05.ts#L527) [06-s1](src/story/scenes/06.ts#L116) [06-s2](src/story/scenes/06.ts#L245) [06-s3](src/story/scenes/06.ts#L314) |
| Perfekt с haben | закреплено | 87 · 5 · 52 · 43 | есть | [10-s1](src/story/scenes/10.ts#L61) [11-s1](src/story/scenes/11.ts#L48) [11-i1](src/story/scenes/11.ts#L186) [11-s2](src/story/scenes/11.ts#L31) |
| Perfekt с sein | закреплено | 28 · 4 · 22 · 10 | есть | [09-s4](src/story/scenes/09.ts#L607) [11-s2](src/story/scenes/11.ts#L313) [12-s1](src/story/scenes/12.ts#L37) [12-s2](src/story/scenes/12.ts#L231) [12-s3](src/story/scenes/12.ts#L35) |
| Präteritum war и hatte | закреплено | 28 · 5 · 16 · 12 | есть | [09-s1](src/story/scenes/09.ts#L68) [09-i1](src/story/scenes/09.ts#L335) [10-s5](src/story/scenes/10.ts#L566) [11-i1](src/story/scenes/11.ts#L186) [11-s3](src/story/scenes/11.ts#L399) [11-s4](src/story/scenes/11.ts#L38) |
| möchten | закреплено | 22 · 5 · 15 · 13 | есть | [04-s1](src/story/scenes/04.ts#L54) [04-s2](src/story/scenes/04.ts#L185) [04-s5](src/story/scenes/04.ts#L612) [04-s6](src/story/scenes/04.ts#L758) [04-c1](src/story/scenes/04.ts#L954) [08-s1](src/story/scenes/08.ts#L106) |
| Ich hätte gern …, Ich würde gern … как готовые выражения | закреплено | 8 · 4 · 5 · 3 | есть | [04-s4](src/story/scenes/04.ts#L504) [07-s5](src/story/scenes/07.ts#L705) [12-s3](src/story/scenes/12.ts#L354) [13-s4](src/story/scenes/13.ts#L485) |
| können | закреплено | 41 · 5 · 26 · 19 | есть | [07-s1](src/story/scenes/07.ts#L42) [07-s2](src/story/scenes/07.ts#L211) |
| wollen | закреплено | 31 · 5 · 16 · 11 | есть | [07-s1](src/story/scenes/07.ts#L47) [07-s2](src/story/scenes/07.ts#L225) [07-s3](src/story/scenes/07.ts#L360) |
| müssen | закреплено | 16 · 4 · 8 · 3 | есть | [08-s4](src/story/scenes/08.ts#L591) [10-s1](src/story/scenes/10.ts#L86) [10-s3](src/story/scenes/10.ts#L305) [10-s4](src/story/scenes/10.ts#L501) [10-s5](src/story/scenes/10.ts#L601) [10-s6](src/story/scenes/10.ts#L747) |
| dürfen | закреплено | 30 · 5 · 17 · 7 | есть | [09-s2](src/story/scenes/09.ts#L281) [10-s1](src/story/scenes/10.ts#L86) [10-s2](src/story/scenes/10.ts#L201) [10-s3](src/story/scenes/10.ts#L285) [10-s4](src/story/scenes/10.ts#L31) |
| sollen | закреплено | 23 · 4 · 16 · 13 | есть | [10-s4](src/story/scenes/10.ts#L32) [10-s5](src/story/scenes/10.ts#L567) [10-s6](src/story/scenes/10.ts#L33) [11-s2](src/story/scenes/11.ts#L354) |
| mögen | закреплено | 12 · 4 · 4 · 5 | есть | [07-s3](src/story/scenes/07.ts#L471) [07-s4](src/story/scenes/07.ts#L554) [08-s1](src/story/scenes/08.ts#L106) [12-s3](src/story/scenes/12.ts#L403) [12-s6](src/story/scenes/12.ts#L875) [13-s5](src/story/scenes/13.ts#L613) |
| Модальный глагол и инфинитив в конце | закреплено | 81 · 8 · 46 · 33 | есть | [04-s6](src/story/scenes/04.ts#L758) [07-s1](src/story/scenes/07.ts#L47) [07-s2](src/story/scenes/07.ts#L225) [07-s3](src/story/scenes/07.ts#L360) [07-s4](src/story/scenes/07.ts#L568) [07-s5](src/story/scenes/07.ts#L705) |
| Повелительное наклонение на Sie | закреплено | 405 · 12 · 389 · 218 | есть | [02-s1](src/story/scenes/02.ts#L33) [02-s2](src/story/scenes/02.ts#L147) [02-s3](src/story/scenes/02.ts#L302) |
| Повелительное наклонение на du | закреплено | 67 · 11 · 30 · 46 | есть | [02-s3](src/story/scenes/02.ts#L437) [02-s4](src/story/scenes/02.ts#L556) [03-s6](src/story/scenes/03.ts#L813) [05-s1](src/story/scenes/05.ts#L90) [05-s3](src/story/scenes/05.ts#L320) [05-s6](src/story/scenes/05.ts#L781) |
| Повелительное наклонение на ihr | закреплено | 17 · 6 · 9 · 9 | есть | [06-s1](src/story/scenes/06.ts#L38) [07-s1](src/story/scenes/07.ts#L132) [07-s4](src/story/scenes/07.ts#L544) [08-s1](src/story/scenes/08.ts#L88) [09-s2](src/story/scenes/09.ts#L253) [09-s3](src/story/scenes/09.ts#L404) |

### Предложение

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Глагол на втором месте, время на первом | закреплено | 112 · 13 · 58 · 62 | есть | [01-s1](src/story/scenes/01.ts#L127) [01-s3](src/story/scenes/01.ts#L240) [01-s4](src/story/scenes/01.ts#L468) [01-s6](src/story/scenes/01.ts#L709) [02-s2](src/story/scenes/02.ts#L204) [02-s3](src/story/scenes/02.ts#L291) |
| Вопрос с W-словом | закреплено | 258 · 13 · 177 · 115 | есть | [01-s1](src/story/scenes/01.ts#L45) [01-s2](src/story/scenes/01.ts#L156) [01-s3](src/story/scenes/01.ts#L223) |
| Вопрос да/нет и ответ ja / nein / doch | закреплено | 86 · 13 · 63 · 29 | есть | [01-s6](src/story/scenes/01.ts#L709) [02-s1](src/story/scenes/02.ts#L52) [02-s3](src/story/scenes/02.ts#L287) [02-i1](src/story/scenes/02.ts#L476) [02-s4](src/story/scenes/02.ts#L496) [02-s5](src/story/scenes/02.ts#L660) |
| nicht и kein | закреплено | 331 · 13 · 152 · 147 | есть | [01-s1](src/story/scenes/01.ts#L148) [01-s3](src/story/scenes/01.ts#L223) [01-s5](src/story/scenes/01.ts#L577) [02-s2](src/story/scenes/02.ts#L263) [02-s4](src/story/scenes/02.ts#L582) [02-s5](src/story/scenes/02.ts#L660) |
| und, oder, aber | закреплено | 535 · 13 · 369 · 344 | есть | [01-s3](src/story/scenes/01.ts#L223) [01-i1](src/story/scenes/01.ts#L391) [01-s4](src/story/scenes/01.ts#L418) [01-s6](src/story/scenes/01.ts#L659) [02-s1](src/story/scenes/02.ts#L33) [02-s2](src/story/scenes/02.ts#L147) |
| denn как союз причины | закреплено | 11 · 6 · 5 · 7 | есть | [07-s1](src/story/scenes/07.ts#L66) [07-s2](src/story/scenes/07.ts#L225) [08-s6](src/story/scenes/08.ts#L766) [09-s2](src/story/scenes/09.ts#L235) [10-s4](src/story/scenes/10.ts#L447) [12-s4](src/story/scenes/12.ts#L663) |
| dann | закреплено | 41 · 8 · 13 · 24 | есть | [06-s3](src/story/scenes/06.ts#L303) [06-s5](src/story/scenes/06.ts#L718) [06-s6](src/story/scenes/06.ts#L844) [07-s2](src/story/scenes/07.ts#L335) [07-s4](src/story/scenes/07.ts#L664) [08-s1](src/story/scenes/08.ts#L128) |
| wenn (понимание) | закреплено | 6 · 4 · 2 · 4 | есть | [10-s4](src/story/scenes/10.ts#L511) [11-s5](src/story/scenes/11.ts#L758) [12-s2](src/story/scenes/12.ts#L236) [13-s6](src/story/scenes/13.ts#L755) |
| es gibt | закреплено | 13 · 6 · 4 · 8 | есть | [05-s2](src/story/scenes/05.ts#L212) [07-s1](src/story/scenes/07.ts#L41) [07-s3](src/story/scenes/07.ts#L372) [07-s4](src/story/scenes/07.ts#L592) [08-s1](src/story/scenes/08.ts#L91) [09-s1](src/story/scenes/09.ts#L90) |

### Существительное и артикль

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Множественное число | закреплено | 249 · 13 · 107 · 118 | есть | [01-s3](src/story/scenes/01.ts#L223) [01-s6](src/story/scenes/01.ts#L659) [02-s1](src/story/scenes/02.ts#L120) [02-s2](src/story/scenes/02.ts#L210) [02-s3](src/story/scenes/02.ts#L287) [02-i1](src/story/scenes/02.ts#L471) |
| Винительный падеж | закреплено | 315 · 12 · 234 · 147 | есть | [02-s1](src/story/scenes/02.ts#L66) [02-s2](src/story/scenes/02.ts#L204) [02-s3](src/story/scenes/02.ts#L311) [02-s4](src/story/scenes/02.ts#L513) [02-s5](src/story/scenes/02.ts#L646) [03-s1](src/story/scenes/03.ts#L50) |
| Дательный на вопрос «где?» (in, auf, an) | закреплено | 269 · 13 · 106 · 88 | есть | [01-s6](src/story/scenes/01.ts#L709) [02-s2](src/story/scenes/02.ts#L210) [03-s4](src/story/scenes/03.ts#L490) [03-s5](src/story/scenes/03.ts#L654) [03-s6](src/story/scenes/03.ts#L862) [04-s1](src/story/scenes/04.ts#L151) |
| Предлоги с дательным (mit, zu, bei, von, aus, nach) | закреплено | 180 · 13 · 86 · 74 | есть | [01-s1](src/story/scenes/01.ts#L20) [01-s3](src/story/scenes/01.ts#L223) [01-s5](src/story/scenes/01.ts#L627) [01-s6](src/story/scenes/01.ts#L691) [02-s3](src/story/scenes/02.ts#L302) [03-s2](src/story/scenes/03.ts#L223) |
| Чей? Имя + s (Annas Bruder) | закреплено | 25 · 10 · 14 · 10 | есть | [01-s2](src/story/scenes/01.ts#L189) [01-s5](src/story/scenes/01.ts#L539) [02-s1](src/story/scenes/02.ts#L120) [03-s1](src/story/scenes/03.ts#L66) [03-s3](src/story/scenes/03.ts#L299) [03-s4](src/story/scenes/03.ts#L501) |
| Сложные слова: род по последней части | закреплено | 260 · 13 · 153 · 115 | есть | [01-s1](src/story/scenes/01.ts#L83) [02-s1](src/story/scenes/02.ts#L84) [02-s2](src/story/scenes/02.ts#L137) [02-s3](src/story/scenes/02.ts#L302) [02-s6](src/story/scenes/02.ts#L742) [03-s3](src/story/scenes/03.ts#L281) |
| Женский род на -in | закреплено | 54 · 8 · 36 · 33 | есть | [03-s3](src/story/scenes/03.ts#L413) [03-s4](src/story/scenes/03.ts#L476) [03-s5](src/story/scenes/03.ts#L634) [04-s6](src/story/scenes/04.ts#L1072) [06-s2](src/story/scenes/06.ts#L570) |
| dieser, diese, dieses | закреплено | 8 · 6 · 4 · 5 | есть | [05-i1](src/story/scenes/05.ts#L480) [08-s3](src/story/scenes/08.ts#L501) [09-s2](src/story/scenes/09.ts#L183) [10-s2](src/story/scenes/10.ts#L201) [11-s2](src/story/scenes/11.ts#L313) [13-s5](src/story/scenes/13.ts#L613) |
| Притяжательные mein, dein, sein, ihr, unser, euer, Ihr | закреплено | 136 · 13 · 72 · 86 | есть | [01-s1](src/story/scenes/01.ts#L123) [01-i1](src/story/scenes/01.ts#L386) [02-s2](src/story/scenes/02.ts#L210) [02-s3](src/story/scenes/02.ts#L437) [02-s6](src/story/scenes/02.ts#L742) [03-s1](src/story/scenes/03.ts#L45) |
| welcher, welche, welches | закреплено | 38 · 13 · 32 · 17 | есть | [01-s3](src/story/scenes/01.ts#L223) [02-s2](src/story/scenes/02.ts#L210) [02-s3](src/story/scenes/02.ts#L298) [02-s6](src/story/scenes/02.ts#L765) [03-s4](src/story/scenes/03.ts#L541) [04-s4](src/story/scenes/04.ts#L571) |

### Местоимения

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Местоимения в винительном (mich, dich, ihn …) | закреплено | 41 · 9 · 18 · 25 | есть | [02-s4](src/story/scenes/02.ts#L513) [05-s2](src/story/scenes/05.ts#L187) [05-s4](src/story/scenes/05.ts#L608) [05-s5](src/story/scenes/05.ts#L630) [05-s6](src/story/scenes/05.ts#L856) [06-s1](src/story/scenes/06.ts#L172) |
| Местоимения в дательном (mir, dir, ihm, Ihnen) | закреплено | 31 · 9 · 15 · 16 | есть | [01-s1](src/story/scenes/01.ts#L76) [01-s3](src/story/scenes/01.ts#L223) [06-i1](src/story/scenes/06.ts#L523) [06-s5](src/story/scenes/06.ts#L737) [06-s6](src/story/scenes/06.ts#L844) [07-s3](src/story/scenes/07.ts#L485) |
| Глаголы с дательным (gehören, gefallen, helfen, danken, geben) | закреплено | 26 · 9 · 12 · 16 | есть | [04-i1](src/story/scenes/04.ts#L454) [06-i1](src/story/scenes/06.ts#L530) [06-s5](src/story/scenes/06.ts#L1059) [06-s6](src/story/scenes/06.ts#L876) [07-s3](src/story/scenes/07.ts#L484) [07-s5](src/story/scenes/07.ts#L735) |
| sich, uns (Wir sehen uns) | закреплено | 28 · 13 · 22 · 24 | есть | [01-s6](src/story/scenes/01.ts#L668) [02-s6](src/story/scenes/02.ts#L742) [03-s6](src/story/scenes/03.ts#L844) [04-s6](src/story/scenes/04.ts#L832) [04-c1](src/story/scenes/04.ts#L954) [05-s6](src/story/scenes/05.ts#L826) |
| Вопросы wen? и wem? | закреплено | 8 · 5 · 3 · 5 | есть | [08-s2](src/story/scenes/08.ts#L187) [09-s6](src/story/scenes/09.ts#L880) [10-s3](src/story/scenes/10.ts#L281) [12-s3](src/story/scenes/12.ts#L342) [13-s6](src/story/scenes/13.ts#L737) |
| man | закреплено | 15 · 5 · 5 · 6 | есть | [07-s1](src/story/scenes/07.ts#L42) [09-s2](src/story/scenes/09.ts#L176) [10-s2](src/story/scenes/10.ts#L201) [12-s2](src/story/scenes/12.ts#L237) [12-s3](src/story/scenes/12.ts#L329) [12-s6](src/story/scenes/12.ts#L1046) |
| etwas, nichts, alles, mehr | закреплено | 93 · 12 · 34 · 51 | есть | [01-s2](src/story/scenes/01.ts#L168) [03-s3](src/story/scenes/03.ts#L281) [04-s2](src/story/scenes/04.ts#L258) [04-s3](src/story/scenes/04.ts#L340) [04-s4](src/story/scenes/04.ts#L547) [04-s5](src/story/scenes/04.ts#L616) |

### Прилагательное и числа

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Прилагательное после sein (zu groß) | закреплено | 118 · 13 · 46 · 63 | есть | [01-s2](src/story/scenes/01.ts#L168) [01-s4](src/story/scenes/01.ts#L439) [02-s5](src/story/scenes/02.ts#L622) [03-s2](src/story/scenes/03.ts#L247) [03-s4](src/story/scenes/03.ts#L541) [04-s2](src/story/scenes/04.ts#L270) |
| gern, lieber, am liebsten | закреплено | 30 · 8 · 20 · 15 | есть | [04-s3](src/story/scenes/04.ts#L340) [04-s4](src/story/scenes/04.ts#L504) [04-s6](src/story/scenes/04.ts#L832) [07-s1](src/story/scenes/07.ts#L128) [07-s3](src/story/scenes/07.ts#L467) [07-s4](src/story/scenes/07.ts#L531) |
| Сравнение (besser, mehr, als) | закреплено | 19 · 9 · 12 · 10 | есть | [04-s1](src/story/scenes/04.ts#L64) [06-s3](src/story/scenes/06.ts#L1031) [07-s3](src/story/scenes/07.ts#L372) [07-s6](src/story/scenes/07.ts#L988) [08-s3](src/story/scenes/08.ts#L432) [10-s3](src/story/scenes/10.ts#L285) |
| Цены и количества | закреплено | 100 · 11 · 56 · 40 | есть | [02-s6](src/story/scenes/02.ts#L775) [03-s2](src/story/scenes/03.ts#L227) [03-i1](src/story/scenes/03.ts#L227) [03-s6](src/story/scenes/03.ts#L774) [04-s3](src/story/scenes/04.ts#L340) [04-s4](src/story/scenes/04.ts#L534) |
| Время на часах | закреплено | 194 · 10 · 97 · 79 | есть | [02-s5](src/story/scenes/02.ts#L646) [04-s2](src/story/scenes/04.ts#L184) [04-s3](src/story/scenes/04.ts#L336) [04-s4](src/story/scenes/04.ts#L499) [04-c1](src/story/scenes/04.ts#L892) [06-s1](src/story/scenes/06.ts#L39) |
| Порядковые числа и дата | закреплено | 49 · 11 · 27 · 21 | есть | [03-s5](src/story/scenes/03.ts#L680) [04-s1](src/story/scenes/04.ts#L37) [06-s6](src/story/scenes/06.ts#L1068) [07-s6](src/story/scenes/07.ts#L988) [08-s2](src/story/scenes/08.ts#L267) [08-i1](src/story/scenes/08.ts#L316) |

### Предлоги

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| um, am, im, von … bis во времени | закреплено | 186 · 10 · 94 · 80 | есть | [04-c1](src/story/scenes/04.ts#L892) [05-s6](src/story/scenes/05.ts#L856) [06-s1](src/story/scenes/06.ts#L39) [06-s2](src/story/scenes/06.ts#L199) |
| ab и für во времени (ab Montag, für zwei Wochen) | закреплено | 13 · 5 · 8 · 3 | есть | [08-s3](src/story/scenes/08.ts#L432) [09-s2](src/story/scenes/09.ts#L179) [10-s3](src/story/scenes/10.ts#L282) [10-s4](src/story/scenes/10.ts#L522) [12-s3](src/story/scenes/12.ts#L339) [12-s5](src/story/scenes/12.ts#L765) |
| nach и vor во времени (nach dem Essen) | закреплено | 12 · 5 · 7 · 6 | есть | [08-s6](src/story/scenes/08.ts#L746) [09-s2](src/story/scenes/09.ts#L179) [10-s3](src/story/scenes/10.ts#L282) [10-s4](src/story/scenes/10.ts#L522) [12-s4](src/story/scenes/12.ts#L637) [12-s6](src/story/scenes/12.ts#L910) |
| über (über zwanzig Minuten) | закреплено | 8 · 4 · 5 · 4 | есть | [09-s2](src/story/scenes/09.ts#L179) [10-s3](src/story/scenes/10.ts#L281) [10-s4](src/story/scenes/10.ts#L523) [12-s3](src/story/scenes/12.ts#L403) [13-s2](src/story/scenes/13.ts#L210) |
| nach Hause / zu Hause | закреплено | 20 · 5 · 12 · 6 | есть | [07-s2](src/story/scenes/07.ts#L189) [09-s5](src/story/scenes/09.ts#L794) [09-s6](src/story/scenes/09.ts#L879) [10-s4](src/story/scenes/10.ts#L32) [12-s1](src/story/scenes/12.ts#L157) |
| in, an, auf + винительный для направления (in die Stadt) | закреплено | 53 · 10 · 25 · 21 | есть | [03-s4](src/story/scenes/03.ts#L529) [04-s2](src/story/scenes/04.ts#L290) [04-s5](src/story/scenes/04.ts#L626) [06-s2](src/story/scenes/06.ts#L241) [06-s5](src/story/scenes/06.ts#L741) [06-s6](src/story/scenes/06.ts#L960) |
| unter | закреплено | 11 · 4 · 6 · 5 | есть | [04-s3](src/story/scenes/04.ts#L340) [04-s6](src/story/scenes/04.ts#L803) [04-c1](src/story/scenes/04.ts#L954) [08-s2](src/story/scenes/08.ts#L209) [09-s2](src/story/scenes/09.ts#L293) [13-s6](src/story/scenes/13.ts#L713) |
| ohne и für (ohne dich, für meinen Freund) | закреплено | 80 · 13 · 33 · 28 | есть | [01-s1](src/story/scenes/01.ts#L148) [02-s2](src/story/scenes/02.ts#L263) [02-s4](src/story/scenes/02.ts#L513) [03-s4](src/story/scenes/03.ts#L489) [03-s5](src/story/scenes/03.ts#L729) [04-s1](src/story/scenes/04.ts#L176) |

### Словообразование

| Правило | Статус | Числа | Объяснение | Где |
|---|---|---|---|---|
| Существительные на -ung | закреплено | 161 · 12 · 86 · 72 | есть | [02-s2](src/story/scenes/02.ts#L137) [02-s3](src/story/scenes/02.ts#L302) [02-s5](src/story/scenes/02.ts#L724) [04-s2](src/story/scenes/04.ts#L237) [04-s3](src/story/scenes/04.ts#L340) [04-s4](src/story/scenes/04.ts#L550) |
| Прилагательные с un-, -los, -bar | закреплено | 8 · 5 · 5 · 6 | есть | [08-s6](src/story/scenes/08.ts#L1082) [09-s2](src/story/scenes/09.ts#L1024) [09-s4](src/story/scenes/09.ts#L607) [11-s1](src/story/scenes/11.ts#L84) [12-s4](src/story/scenes/12.ts#L664) [13-s6](src/story/scenes/13.ts#L713) |
| hellblau, dunkelblau | закреплено | 38 · 7 · 15 · 3 | есть | [05-s2](src/story/scenes/05.ts#L268) [05-s3](src/story/scenes/05.ts#L320) [05-s5](src/story/scenes/05.ts#L639) [05-s6](src/story/scenes/05.ts#L775) [06-s2](src/story/scenes/06.ts#L229) [06-i1](src/story/scenes/06.ts#L519) |
| Причастие как прилагательное (geöffnet, geschlossen) | закреплено | 9 · 6 · 6 · 5 | есть | [06-s3](src/story/scenes/06.ts#L314) [08-s4](src/story/scenes/08.ts#L591) [10-s5](src/story/scenes/10.ts#L587) [12-s3](src/story/scenes/12.ts#L403) [09-разминка](src/story/scenes/warmups.ts#L119) [11-разминка](src/story/scenes/warmups.ts#L87) |
| Погода с es (Es regnet) | закреплено | 31 · 7 · 11 · 8 | есть | [05-s1](src/story/scenes/05.ts#L40) [06-i1](src/story/scenes/06.ts#L507) [06-s6](src/story/scenes/06.ts#L864) [08-s6](src/story/scenes/08.ts#L780) [09-s1](src/story/scenes/09.ts#L45) [09-i1](src/story/scenes/09.ts#L349) |
| Ich habe …schmerzen, … tut weh | закреплено | 18 · 4 · 10 · 12 | есть | [10-s1](src/story/scenes/10.ts#L42) [10-s2](src/story/scenes/10.ts#L151) [10-s3](src/story/scenes/10.ts#L381) [10-s6](src/story/scenes/10.ts#L753) [11-s3](src/story/scenes/11.ts#L399) [12-s3](src/story/scenes/12.ts#L403) |

## Слова: нет

0 слов.

## Слова: один раз

0 слов.

## Слова: слабо

0 слов.

## Слова: закрепит A2

73 слов.

### Существительные (35)

| Слово | Откуда | Числа | Где в новой версии | Уроки |
|---|---|---|---|---|
| der Abflug (от fliegen) ↻ | экз. | 2 · 2 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L268) [13-s2](src/story/scenes/13.ts#L790) | — |
| die Abreise | 12 | 2 · 1 · 1 · 1 | [12-s3](src/story/scenes/12.ts#L403) | [12](content/a1/12-reisen.yaml#L112) |
| die Anreise ↻ | 12 | 4 · 2 · 3 · 3 | [12-s3](src/story/scenes/12.ts#L403) [12-s6](src/story/scenes/12.ts#L1066) [13-s6](src/story/scenes/13.ts#L836) | [12](content/a1/12-reisen.yaml#L111) |
| der Anschluss ↻ | экз. | 3 · 2 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L403) [13-s6](src/story/scenes/13.ts#L836) | — |
| der Arbeitsplatz ↻ | экз. | 3 · 3 · 2 · 2 | [11-s1](src/story/scenes/11.ts#L155) [12-s6](src/story/scenes/12.ts#L1192) [13-s2](src/story/scenes/13.ts#L790) | — |
| der Bogen ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L769) [12-s2](src/story/scenes/12.ts#L1156) [13-s5](src/story/scenes/13.ts#L827) | — |
| das Datum ↻ | 12, экз. | 3 · 2 · 3 · 1 | [12-s3](src/story/scenes/12.ts#L403) [13-s6](src/story/scenes/13.ts#L836) | [12](content/a1/12-reisen.yaml#L130) |
| das Doppelzimmer ↻ | 12, экз. | 3 · 2 · 3 · 1 | [12-s3](src/story/scenes/12.ts#L403) [13-s6](src/story/scenes/13.ts#L836) | [12](content/a1/12-reisen.yaml#L106) |
| der Drucker (от drucken) ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L811) [12-s2](src/story/scenes/12.ts#L1156) [13-s5](src/story/scenes/13.ts#L827) | — |
| das Einzelzimmer ↻ | 12, экз. | 11 · 2 · 8 · 4 | [12-s1](src/story/scenes/12.ts#L193) [12-s3](src/story/scenes/12.ts#L354) [13-s3](src/story/scenes/13.ts#L334) [13-s4](src/story/scenes/13.ts#L469) | [12](content/a1/12-reisen.yaml#L36) |
| die Ferien ↻ | 12 | 2 · 2 · 2 · 2 | [12-s6](src/story/scenes/12.ts#L1014) [13-s3](src/story/scenes/13.ts#L799) | [12](content/a1/12-reisen.yaml#L148) |
| der Flughafen ↻ | 12, экз. | 3 · 2 · 3 · 3 | [12-s1](src/story/scenes/12.ts#L193) [12-s2](src/story/scenes/12.ts#L315) [13-s6](src/story/scenes/13.ts#L836) | [12](content/a1/12-reisen.yaml#L94) |
| der Friseur ↻ | 11 | 3 · 3 · 3 · 3 | [11-s1](src/story/scenes/11.ts#L158) [12-s2](src/story/scenes/12.ts#L1156) [13-s5](src/story/scenes/13.ts#L827) | [11](content/a1/11-arbeit.yaml#L101) |
| das Gepäck ↻ | экз. | 3 · 2 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L403) [13-s6](src/story/scenes/13.ts#L836) | — |
| die Halbpension ↻ | экз. | 3 · 2 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L403) [13-s6](src/story/scenes/13.ts#L836) | — |
| das Hotel ↻ | 12, экз. | 22 · 2 · 13 · 6 | [12-s1](src/story/scenes/12.ts#L34) [12-s2](src/story/scenes/12.ts#L285) [12-s3](src/story/scenes/12.ts#L329) | [12](content/a1/12-reisen.yaml#L26) |
| der Informatiker ↻ | 11 | 3 · 3 · 3 · 3 | [11-s1](src/story/scenes/11.ts#L158) [12-s2](src/story/scenes/12.ts#L1156) [13-s5](src/story/scenes/13.ts#L827) | [11](content/a1/11-arbeit.yaml#L103) |
| der Ingenieur ↻ | 11 | 3 · 3 · 3 · 3 | [11-s1](src/story/scenes/11.ts#L158) [12-s2](src/story/scenes/12.ts#L1156) [13-s5](src/story/scenes/13.ts#L827) | [11](content/a1/11-arbeit.yaml#L100) |
| die Jahreszeit ↻ | 12 | 2 · 2 · 2 · 2 | [12-s2](src/story/scenes/12.ts#L315) [13-s2](src/story/scenes/13.ts#L790) | [12](content/a1/12-reisen.yaml#L130) |
| der Job ↻ | экз. | 3 · 3 · 2 · 2 | [11-s1](src/story/scenes/11.ts#L86) [12-s2](src/story/scenes/12.ts#L1156) [13-s5](src/story/scenes/13.ts#L827) | — |
| der Koffer ↻ | 12, экз. | 8 · 2 · 6 · 5 | [12-s1](src/story/scenes/12.ts#L112) [12-s2](src/story/scenes/12.ts#L315) [12-s3](src/story/scenes/12.ts#L329) [12-s6](src/story/scenes/12.ts#L1014) [13-s2](src/story/scenes/13.ts#L790) | [12](content/a1/12-reisen.yaml#L99) |
| der Kugelschreiber ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L811) [12-s2](src/story/scenes/12.ts#L1156) [13-s5](src/story/scenes/13.ts#L827) | — |
| das Lied | экз. | 11 · 2 · 5 · 4 | [11-s3](src/story/scenes/11.ts#L399) [11-s5](src/story/scenes/11.ts#L797) [13-s1](src/story/scenes/13.ts#L38) [13-s6](src/story/scenes/13.ts#L724) | — |
| die Papiere ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L770) [12-s3](src/story/scenes/12.ts#L1165) [13-s6](src/story/scenes/13.ts#L836) | — |
| das Praktikum ↻ | экз. | 2 · 2 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L86) [12-s5](src/story/scenes/12.ts#L1183) | — |
| der Regenschirm ↻ | 12 | 7 · 2 · 7 · 4 | [12-s1](src/story/scenes/12.ts#L54) [12-s5](src/story/scenes/12.ts#L723) [12-s6](src/story/scenes/12.ts#L1066) [13-s2](src/story/scenes/13.ts#L790) | [12](content/a1/12-reisen.yaml#L70) |
| die Reise (от reisen) ↻ | 12, экз. | 7 · 2 · 4 · 5 | [12-s2](src/story/scenes/12.ts#L315) [12-s6](src/story/scenes/12.ts#L1014) [13-s6](src/story/scenes/13.ts#L737) | [12](content/a1/12-reisen.yaml#L1) |
| das Reisebüro (от reisen) ↻ | экз. | 2 · 2 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L247) [13-s2](src/story/scenes/13.ts#L790) | — |
| der Reiseführer (от reisen) ↻ | экз. | 2 · 2 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L247) [13-s5](src/story/scenes/13.ts#L827) | — |
| die Rezeption | экз. | 1 · 1 · 0 · 0 | [12-s3](src/story/scenes/12.ts#L329) | — |
| das Studium ↻ | экз. | 2 · 2 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L86) [12-s5](src/story/scenes/12.ts#L1183) | — |
| die Verspätung ↻ | 12 | 12 · 2 · 6 · 7 | [12-s2](src/story/scenes/12.ts#L248) [12-s3](src/story/scenes/12.ts#L35) [12-s6](src/story/scenes/12.ts#L1066) [13-s2](src/story/scenes/13.ts#L27) | [09](content/a1/09-stadt.yaml#L215) [12](content/a1/12-reisen.yaml#L48) |
| die Welt ↻ | экз. | 2 · 2 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L247) [13-s5](src/story/scenes/13.ts#L827) | — |
| der Wind | экз. | 4 · 1 · 2 · 3 | [12-s1](src/story/scenes/12.ts#L84) [12-s2](src/story/scenes/12.ts#L237) [12-s5](src/story/scenes/12.ts#L723) | [12](content/a1/12-reisen.yaml#L338) |
| der Zoll ↻ | экз. | 2 · 2 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L1046) [13-s2](src/story/scenes/13.ts#L167) | — |

### Глаголы (13)

| Слово | Откуда | Числа | Где в новой версии | Уроки |
|---|---|---|---|---|
| abgeben ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L770) [12-s6](src/story/scenes/12.ts#L1192) [13-s2](src/story/scenes/13.ts#L790) | — |
| anklicken ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L811) [12-s6](src/story/scenes/12.ts#L1192) [13-s2](src/story/scenes/13.ts#L790) | — |
| ankommen | экз. | 2 · 1 · 1 · 1 | [12-s2](src/story/scenes/12.ts#L303) | [12](content/a1/12-reisen.yaml#L48) |
| bedeuten ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L813) [12-s6](src/story/scenes/12.ts#L1192) [13-s2](src/story/scenes/13.ts#L790) | [08](content/a1/08-wohnen.yaml#L42) |
| benutzen ↻ | экз. | 3 · 3 · 2 · 2 | [11-s2](src/story/scenes/11.ts#L215) [12-s6](src/story/scenes/12.ts#L1192) [13-s2](src/story/scenes/13.ts#L790) | [09](content/a1/09-stadt.yaml#L236) |
| besuchen | экз. | 1 · 1 · 1 · 0 | [11-s2](src/story/scenes/11.ts#L313) | [07](content/a1/07-freizeit.yaml#L64) |
| drucken ↻ | экз. | 3 · 3 · 2 · 2 | [11-s5](src/story/scenes/11.ts#L811) [12-s2](src/story/scenes/12.ts#L1156) [13-s5](src/story/scenes/13.ts#L827) | — |
| freuen | экз. | 2 · 1 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L876) | — |
| reisen | экз. | 7 · 2 · 4 · 5 | [12-s2](src/story/scenes/12.ts#L315) [12-s6](src/story/scenes/12.ts#L1014) [13-s6](src/story/scenes/13.ts#L737) | [12](content/a1/12-reisen.yaml#L1) |
| reservieren | 12 | 6 · 2 · 3 · 1 | [11-s5](src/story/scenes/11.ts#L797) [12-s3](src/story/scenes/12.ts#L340) | [02](content/a1/02-zahlen.yaml#L770) [12](content/a1/12-reisen.yaml#L113) |
| scheinen | экз. | 4 · 2 · 1 · 0 | [12-s5](src/story/scenes/12.ts#L745) [13-s1](src/story/scenes/13.ts#L37) | [12](content/a1/12-reisen.yaml#L68) |
| übernachten ↻ | экз. | 3 · 2 · 2 · 1 | [12-s3](src/story/scenes/12.ts#L403) [13-s3](src/story/scenes/13.ts#L799) | — |
| verdienen ↻ | экз. | 2 · 2 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L86) [12-s5](src/story/scenes/12.ts#L1183) | — |

### Прилагательные и наречия (8)

| Слово | Откуда | Числа | Где в новой версии | Уроки |
|---|---|---|---|---|
| arbeitslos | экз. | 1 · 1 · 0 · 1 | [11-s1](src/story/scenes/11.ts#L84) | — |
| ausländisch (от das Ausland) ↻ | экз. | 2 · 2 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L891) [13-s3](src/story/scenes/13.ts#L799) | — |
| fremd ↻ | экз. | 2 · 2 · 1 · 1 | [12-s5](src/story/scenes/12.ts#L833) [13-s6](src/story/scenes/13.ts#L836) | — |
| kalt ↻ | 12 | 4 · 2 · 3 · 3 | [12-s1](src/story/scenes/12.ts#L50) [12-s4](src/story/scenes/12.ts#L632) [13-s3](src/story/scenes/13.ts#L799) | [08](content/a1/08-wohnen.yaml#L40) [12](content/a1/12-reisen.yaml#L66) |
| kulturell ↻ | экз. | 2 · 2 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L891) [13-s6](src/story/scenes/13.ts#L836) | — |
| männlich (от der Mann) ↻ | экз. | 2 · 2 · 1 · 1 | [11-s5](src/story/scenes/11.ts#L769) [12-s5](src/story/scenes/12.ts#L1183) | — |
| selbstständig ↻ | экз. | 2 · 2 · 1 · 1 | [11-s1](src/story/scenes/11.ts#L155) [12-s5](src/story/scenes/12.ts#L1183) | — |
| weiblich ↻ | экз. | 2 · 2 · 1 · 1 | [11-s5](src/story/scenes/11.ts#L769) [12-s5](src/story/scenes/12.ts#L1183) | [11](content/a1/11-arbeit.yaml#L345) |

### Выражения (7)

| Слово | Откуда | Числа | Где в новой версии | Уроки |
|---|---|---|---|---|
| arbeiten als | 11 | 1 · 1 · 1 · 0 | [11-s6](src/story/scenes/11.ts#L865) | [11](content/a1/11-arbeit.yaml#L129) |
| Die Sonne scheint. | 12 | 3 · 2 · 0 · 0 | [12-s5](src/story/scenes/12.ts#L745) [13-s1](src/story/scenes/13.ts#L37) | [12](content/a1/12-reisen.yaml#L68) |
| Es schneit. ↻ | 12 | 2 · 2 · 2 · 2 | [12-s6](src/story/scenes/12.ts#L1014) [13-s3](src/story/scenes/13.ts#L799) | [12](content/a1/12-reisen.yaml#L121) |
| Es sind 20 Grad. ↻ | 12 | 2 · 2 · 2 · 2 | [12-s6](src/story/scenes/12.ts#L1014) [13-s3](src/story/scenes/13.ts#L799) | [12](content/a1/12-reisen.yaml#L127) |
| gestern Abend ↻ | 11 | 3 · 3 · 3 · 3 | [11-s6](src/story/scenes/11.ts#L883) [12-s2](src/story/scenes/12.ts#L1156) [13-s5](src/story/scenes/13.ts#L827) | [11](content/a1/11-arbeit.yaml#L48) |
| letztes Jahr ↻ | 11 | 2 · 2 · 2 · 2 | [11-s6](src/story/scenes/11.ts#L883) [12-s5](src/story/scenes/12.ts#L1183) | [11](content/a1/11-arbeit.yaml#L139) |
| noch nicht | 11 | 2 · 1 · 1 · 2 | [12-s1](src/story/scenes/12.ts#L82) | [11](content/a1/11-arbeit.yaml#L44) |

### Числа, время, цвета и другие группы (10)

| Слово | Откуда | Числа | Где в новой версии | Уроки |
|---|---|---|---|---|
| der Deutsche ↻ | экз. | 2 · 2 · 1 · 1 | [12-s5](src/story/scenes/12.ts#L833) [13-s2](src/story/scenes/13.ts#L790) | — |
| der Europäer ↻ | экз. | 2 · 2 · 1 · 1 | [12-s5](src/story/scenes/12.ts#L833) [13-s2](src/story/scenes/13.ts#L790) | — |
| europäisch ↻ | экз. | 2 · 2 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L891) [13-s3](src/story/scenes/13.ts#L799) | — |
| der Frühling ↻ | 12, экз. | 2 · 2 · 2 · 2 | [12-s2](src/story/scenes/12.ts#L315) [13-s2](src/story/scenes/13.ts#L790) | [12](content/a1/12-reisen.yaml#L135) |
| das Grad | экз. | 6 · 2 · 4 · 5 | [12-s1](src/story/scenes/12.ts#L84) [12-s3](src/story/scenes/12.ts#L403) [12-s4](src/story/scenes/12.ts#L632) [12-s6](src/story/scenes/12.ts#L1014) [13-s3](src/story/scenes/13.ts#L799) | [12](content/a1/12-reisen.yaml#L68) |
| der Herbst ↻ | 12, экз. | 12 · 2 · 6 · 7 | [12-s1](src/story/scenes/12.ts#L50) [12-s4](src/story/scenes/12.ts#L612) [12-s6](src/story/scenes/12.ts#L1066) [13-s6](src/story/scenes/13.ts#L836) | [12](content/a1/12-reisen.yaml#L137) |
| die Milliarde ↻ | экз. | 2 · 2 · 1 · 1 | [12-s6](src/story/scenes/12.ts#L1065) [13-s2](src/story/scenes/13.ts#L790) | — |
| der Monat ↻ | 12, экз. | 2 · 2 · 2 · 2 | [12-s2](src/story/scenes/12.ts#L315) [13-s2](src/story/scenes/13.ts#L790) | [03](content/a1/03-familie.yaml#L229) [12](content/a1/12-reisen.yaml#L139) |
| der Winter ↻ | 12, экз. | 4 · 2 · 4 · 3 | [12-s1](src/story/scenes/12.ts#L112) [12-s4](src/story/scenes/12.ts#L638) [12-s6](src/story/scenes/12.ts#L1014) [13-s2](src/story/scenes/13.ts#L790) | [05](content/a1/05-einkaufen.yaml#L224) [12](content/a1/12-reisen.yaml#L138) |
| der Zentimeter ↻ | экз. | 2 · 2 · 1 · 1 | [11-s2](src/story/scenes/11.ts#L213) [12-s5](src/story/scenes/12.ts#L1183) | — |

## Слова: закреплено

897 слов.

### Существительные (406)

das Abendessen, die Abfahrt, der Absender, die Adresse, das Alter, die Ampel, der Anfang, das Angebot, die Ankunft, die Anmeldung, die Anrede, der Anruf, der Anrufbeantworter, die Ansage, die Antwort, die Anzeige, das Apartment, der Apfel, die Apotheke, der Appetit, die Arbeit, Argentinien, der Arm, der Arzt, die Ärztin, die Aufgabe, der Aufzug, das Auge, der Ausflug, der Ausgang, die Auskunft, das Ausland, der Ausländer, die Aussage, der Ausweis, das Auto, die Autobahn, der Automat, das Baby, die Bäckerei, das Bad, die Bahn, der Bahnhof, der Bahnsteig, der Balkon, die Banane, die Bank, der Bauch, der Baum, der Beamte, das Bein, das Beispiel, der Bekannte, der Beruf, das Bett, das Bier, das Bild, die Birne, der Bleistift, der Blick, die Blume, das Boot, der Brief, die Briefmarke, das Brot, das Brötchen, der Bruder, das Buch, der Buchstabe, das Bürgeramt, der Bus, die Butter, das Café, der Chef, die Cola, der Computer, der Cousin, die Cousine, die Dame, Dänemark, der Dank, die Disco, der Doktor, der Döner, das Dorf, die Dose, die Durchsage, der Durst, die Dusche, die E-Mail, die Ecke, die Ehefrau, der Ehemann, das Ei, der Eingang, die Einladung, der Eintritt, die Eltern, der Empfänger, das Ende, der Enkel, die Enkelin, die Entschuldigung, die Erdbeere, das Erdgeschoss, das Ergebnis, die Erkältung, der Erwachsene, der Fahrer, die Fahrkarte, das Fahrrad, die Familie, der Familienname, der Familienstand, die Farbe, der Fehler, der Feierabend, der Feiertag, das Feuer, das Fieber, der Film, die Firma, der Fisch, das Fischbrötchen, die Flasche, das Fleisch, das Flugzeug, der Flur, das Formular, das Foto, die Frage, die Frau, die Freizeit, der Freund, die Freundin, das Frühstück, die Führung, der Fuß, der Fußball, der Garten, der Gast, das Geburtsjahr, der Geburtsort, der Geburtstag, das Geld, das Gemüse, das Geschäft, das Geschenk, die Geschwister, das Gespräch, das Getränk, das Gewicht, das Glas, das Gleis, das Glück, der Glückwunsch, die Größe, die Großeltern, die Großmutter, der Großvater, die Gruppe, der Gruß, die Gurke, das Haar, der Hafen, das Hähnchen, die Halle, der Hals, die Haltestelle, die Hand, das Handy, die Handynummer, das Haus, die Hausaufgabe, die Hausfrau, der Hausmann, die Hausnummer, die Heimat, die Heizung, das Hemd, der Herd, der Herr, die Hilfe, das Hobby, die Hochzeit, die Hose, der Hund, der Hunger, der Husten, die Idee, die Information, das Internet, die Jacke, der Jugendliche, der Junge, der Kaffee, die Kaltmiete, die Karte, die Kartoffel, Kasachstan, der Käse, die Kasse, die Katze, der Keller, der Kellner, die Kellnerin, das Kind, der Kindergarten, das Kino, der Kiosk, die Klasse, das Kleid, der Kleiderschrank, die Kleidung, der Koch, die Köchin, der Kollege, das Konto, das Konzert, der Kopf, das Krankenhaus, der Krankenpfleger, die Kreditkarte, die Küche, der Kuchen, der Kühlschrank, der Kunde, der Kurs, der Laden, die Lampe, das Land, die Lebensmittel, der Lehrer, die Lehrerin, die Leute, das Licht, Lieblings-, der Liegeplatz, die Linie, der Lkw, das Lokal, die Lösung, das Mädchen, der Mann, der Mantel, die Maschine, der Mechaniker, das Medikament, das Meer, der Mensch, die Miete, die Milch, das Mittagessen, die Mitte, die Möbel, der Moment, der Mund, die Mutter, der Name, die Nase, die Nebenkosten, die Nummer, das Obst, das Ohr, das Öl, die Oma, der Onkel, der Opa, die Orange, die Ordnung, der Ort, die Packung, das Papier, der Park, der Partner, die Partnerin, die Party, der Pass, die Pasta, die Pause, die Person, der Plan, der Platz, die Polizei, die Post, die Postleitzahl, die Praxis, der Preis, das Problem, der Prospekt, die Prüfung, der Pullover, das Rathaus, der Raum, die Rechnung, der Regen, der Reis, die Reparatur, das Restaurant, das Rezept, der Rock, der Rücken, der Rucksack, Russland, die S-Bahn, der Saft, der Salat, das Salz, Satz, der Schalter, das Schild, der Schinken, das Schlafzimmer, der Schluss, der Schlüssel, der Schmerz, der Schnupfen, der Schrank, der Schreibtisch, der Schuh, die Schule, der Schüler, die Schweiz, die Schwester, das Schwimmbad, der See, die Sehenswürdigkeit, das Sofa, der Sohn, die Sonne, die Speisekarte, der Sport, die Sprache, die Stadt, die Stelle, der Stock, der Strand, die Straße, die Straßenbahn, das Stück, der Student, der Stuhl, der Supermarkt, die Suppe, das T-Shirt, die Tablette, die Tante, die Tasche, die Tasse, das Taxi, der Tee, der Teil, das Telefon, die Telefonnummer, der Termin, der Test, der Text, das Thema, das Ticket, der Tisch, die Tochter, die Toilette, die Tomate, die Treppe, das Treppenhaus, die Türkei, die Tüte, die U-Bahn, die Uhr, die Ukraine, der Unterricht, die Unterschrift, der Urlaub, die USA, der Vater, der Verein, der Verkäufer, die Verkäuferin, der Vermieter, die Versichertenkarte, der Verwandte, der Vorname, die Vorsicht, das Vorstellungsgespräch, die Vorwahl, die Warmmiete, das Wartezimmer, die Waschmaschine, das Wasser, der Wein, das Wetter, das Wiederhören, das Wiedersehen, das Wohnheim, die Wohnung, das Wohnzimmer, das Wort, die Wurst, die Zahl, der Zahn, die Zeit, die Zeitung, die Zigarette, das Zimmer, der Zug, die Zwiebel

### Глаголы (149)

abfahren, abfliegen, abholen, anbieten, anfangen, ankreuzen, anmachen, anmelden, anrufen, antworten, anziehen, arbeiten, aufhören, aufräumen, aufstehen, ausfüllen, ausmachen, aussehen, aussteigen, ausziehen, baden, beginnen, bekommen, besichtigen, bestellen, bezahlen, bitten, bleiben, brauchen, bringen, buchstabieren, danken, dauern, drücken, dürfen, duschen, einkaufen, einladen, einsteigen, empfehlen, enden, entschuldigen, erklären, erlauben, erzählen, essen, fahren, fehlen, feiern, fernsehen, finden, fliegen, formulieren, fotografieren, fragen, frühstücken, geben, gefallen, gehen, gehören, gewinnen, glauben, gratulieren, grillen, haben, halten, heiraten, heißen, helfen, holen, hören, kaufen, kennen, kennenlernen, kochen, kommen, können, kosten, kriegen, lachen, laufen, leben, legen, lernen, lesen, lieben, liegen, machen, mieten, mitbringen, mitkommen, mitmachen, mitnehmen, möchten, mögen, müssen, nehmen, nennen, öffnen, passen, rauchen, reagieren, regnen, reparieren, riechen, sagen, schicken, schlafen, schließen, schmecken, schreiben, schwimmen, segeln, sehen, sein, sitzen, sollen, sondern, spielen, sprechen, stehen, stellen, studieren, suchen, tanzen, telefonieren, treffen, trinken, tun, überweisen, umsteigen, umziehen, unterschreiben, verkaufen, vermieten, verstehen, vorstellen, wählen, wandern, warten, waschen, wehtun, werden, wiederholen, willkommen, wissen, wohnen, wollen, zahlen

### Прилагательные и наречия (108)

allein, alt, automatisch, bald, bar, beide, bekannt, besetzt, besser, bewölkt, billig, bisschen, bitter, böse, breit, circa, daneben, draußen, dunkel, eilig, einfach, einmal, erst, etwa, falsch, fertig, frei, früh, früher, geboren, geöffnet, gerade, geradeaus, gern, geschieden, geschlossen, gestern, gestorben, gesund, gleich, glücklich, groß, gültig, günstig, gut, hell, herzlich, heute, hinten, hoch, immer, international, jetzt, jung, kaputt, klar, klein, krank, kurz, lang, lange, langsam, laut, ledig, leicht, leider, leise, lieber, links, lustig, manchmal, möbliert, modern, möglich, müde, neu, nie, normal, oben, oft, pünktlich, rechts, richtig, ruhig, schlecht, schnell, schön, schwer, sofort, sonnig, spät, später, teuer, tot, unten, verboten, verheiratet, vielleicht, warm, weit, weiter, wichtig, windig, wunderbar, zufrieden, zurück, zurzeit, zusammen

### Служебные слова (82)

ab, aber, all-, also, an, ander-, auch, auf, aus, bei, best-, bis, bitte, da, danke, dann, dein-, denn, der, dich, dies-, dir, dort, durch, ein-, er, es, euer, für, gegen, hier, ich, ihm, ihn, in, ja, jed-, kein, letzt-, lieb-, man, mehr, mein, meist-, mit, nach, nächst-, nein, nicht, nichts, noch, nur, oder, ohne, schon, sehr, seit, sich, sie, so, über, um, und, unser-, unter, viel, von, vor, wann, warum, was, welch-, Welche?, wenig, wer, wie, wir, wo, woher, wohin, zu, zwischen

### Выражения (56)

100 Gramm, Achtung, Alles Gute!, am liebsten, an sein, auf sein, Auf Wiederhören!, Auf Wiedersehen!, aus sein, Danke, gut!, Durst haben, ein Kilo, ein Liter, ein Pfund, Es regnet., Fahrrad fahren, Freunde treffen, Fußball spielen, Gitarre spielen, Gute Besserung!, Gute Nacht!, Guten Abend!, Guten Appetit!, Guten Morgen!, Guten Tag!, hallo, Hunger haben, in der Nähe, ins Kino gehen, kommen aus, Langsam, bitte., letzte Woche, Moin!, Musik hören, nicht gern, Noch einmal, bitte., die Pommes frites, Rad fahren, Schade!, sich kümmern, Tennis spielen, tschüss, was für ein, weg sein, Wie bitte?, Wie geht's?, Wie komme ich zum …?, Wie spät ist es?, wie viel, Wie viel Uhr ist es?, wohnen in, Zeit haben, zu Fuß, zu sein, zum Beispiel, Zusammen oder getrennt?

### Числа, время, цвета и другие группы (96)

der Abend, acht, achtzehn, achtzig, der April, der August, blau, braun, der Cent, deutsch, Deutschland, der Dezember, der Dienstag, der Donnerstag, drei, dreißig, dreizehn, dritte, eins, elf, erste, der Euro, Europa, der Februar, der Freitag, fünf, fünfzehn, fünfzig, gelb, das Gramm, grau, grün, halb, hundert, das Jahr, der Januar, der Juli, der Juni, das Kilo, der Kilometer, der Liter, der Mai, der März, der Meter, die Million, die Minute, der Mittag, der Mittwoch, der Montag, morgen, der Nachmittag, die Nacht, neun, neunzehn, neunzig, der Norden, der November, null, der Oktober, der Osten, das Pfund, das Prozent, der Quadratmeter, rot, der Samstag, schwarz, sechs, sechzehn, sechzig, die Sekunde, der September, sieben, siebzehn, siebzig, der Sommer, der Sonntag, die Stunde, der Süden, der Tag, tausend, vier, vierte, das Viertel, vierzehn, vierzig, der Vormittag, weiß, der Westen, die Woche, das Wochenende, der Wochentag, zehn, zwanzig, zwei, zweite, zwölf
