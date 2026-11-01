# Немецкая озвучка

С 26 октября 2026 года по прямому указанию автора **любая новая генерация — только OmniVoice**.
Модель: [k2-fsa/OmniVoice](https://huggingface.co/k2-fsa/OmniVoice),
ревизия `c5fdb5ccb189668d56333f77ba2629f4cd7535f4`, библиотека `omnivoice==0.2.1`.
Настройки закреплены в `config.json`: German, 32 шага, `postprocess_output: false`.
Код OmniVoice — Apache 2.0, предобученная модель — CC-BY-NC. Проект некоммерческий.
Авторство: Han Zhu et al., *OmniVoice: Towards Omnilingual Zero-Shot Text-to-Speech with Diffusion Language Models* (2026).

2300 существующих записей курса A1–B1 созданы ранее Qwen3-TTS 1.7B Base (Apache 2.0).
Массовая замена не требуется. `legacy-qwen-config.json` сохраняет их исходную идентичность:
**не менять этот файл**. Сборка предпочитает готовую OmniVoice-запись, затем готовую прежнюю;
для отсутствующей или новой фразы всегда выбирает OmniVoice. Хэш зависит от текста, голоса и
полной конфигурации выбранной модели. Системные голоса macOS запрещены.

`Anna`, `Reed`, `Eddy`, `Sandy`, `Shelley`, `Rocko`, `Grandpa`, `Flo` — постоянные логические
имена из YAML. Синтетические образцы из `voices/` созданы Qwen VoiceDesign (Apache 2.0),
не принадлежат реальным людям и переиспользуются для стабильного тембра OmniVoice.
Их текст — `voices/profiles.json`, контрольные суммы — `config.json`.

## Обычная сборка

```sh
pnpm check
pnpm content
pnpm build
```

Эти команды не запускают TTS и не требуют GPU. Если нужной записи нет, сборка останавливается.
Готовые M4A: mono, 24 кГц, AAC 96 кбит/с. Три сообщения самостоятельной игры Moin
находятся в `public/story-audio/`; это уже проверенные записи OmniVoice из сравнения,
переиспользованные без повторного синтеза. Происхождение и тексты — в README этого каталога.
Рассказ игры читается, его смешанный русский/немецкий текст не озвучивается системным голосом.

## Новые фразы

Нужны отдельное Python-окружение и PyTorch для выбранного устройства. Пакеты из
`requirements.txt` соответствуют проверенному сравнению; штатная команда использует CUDA.
`--device mps` выбирает Apple Silicon; производительность зависит от машины.

```sh
python3 -m venv .venv
.venv/bin/pip install torch==2.8.0 torchaudio==2.8.0 --index-url https://download.pytorch.org/whl/cu128
.venv/bin/pip install -r scripts/tts/requirements.txt

tts_work=$(mktemp -d)
export HF_HOME="$tts_work/cache/huggingface"
export XDG_CACHE_HOME="$tts_work/cache"
node scripts/build-content.mjs --audio-manifest "$tts_work/manifest.json" --missing
CUDA_VISIBLE_DEVICES=0 .venv/bin/python scripts/tts/generate.py \
  --manifest "$tts_work/manifest.json" --out "$tts_work/wav"
.venv/bin/python scripts/tts/encode.py \
  --manifest "$tts_work/manifest.json" --input "$tts_work/wav" --out "$tts_work/m4a"
AUDIO_IMPORT_DIR="$tts_work/m4a" pnpm content
pnpm build
```

Используйте `--missing`: полный манифест также перечисляет сохранённую старую озвучку,
и генератор намеренно отклоняет такие записи, чтобы не записать новую модель под старым хэшем.
Манифест содержит `{file, text, voice, model, revision}`. Команда экспорта ничего не меняет
в `public/` и `src/generated/`. Возможны `--shard N --shards K` при явном выборе свободных
GPU. Seed привязан к имени файла, поэтому не меняется при перераспределении заданий.
Готовые WAV при перезапуске используются повторно.

К немецкому тексту без финальной пунктуации добавляется точка. Выход OmniVoice — 24 кГц.
`encode.py` сохраняет **полный конец WAV**, не обрезает его по RMS (`trimEnd: false`),
выравнивает громкость, добавляет 60 мс перед записью и 300 мс после неё. Тишина не восстанавливает
уже потерянный синтезом звук: такую запись нужно отдельно перегенерировать.
Перед импортом проверьте произношение, числа, длительности, финальные согласные и гласные;
используйте прослушивание и при необходимости ASR. Импорт проверяет весь набор недостающих
M4A до замены и удаления старых файлов.

Веса моделей не входят в репозиторий. Сведения о частной инфраструктуре, адреса, учётные
записи, рабочие пути и данные доступа в него не включать. После разовой генерации удалите
свои временные WAV, окружение и кэши, не затрагивая чужие данные.
