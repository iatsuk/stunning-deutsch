import type { Scene, Topic } from "../content";
import { ClockView } from "./Clock";
import { DialogueView } from "./Dialogue";
import { SentenceView } from "./Sentence";
import { TableView } from "./Table";
import { TaskView } from "./Task";
import { WordsView } from "./Words";

/** Сцена справа от текста: один из шести видов, состояние полностью задано фрагментом. */
export function Stage({ topic, scene }: { topic: Topic; scene: Scene }) {
  // Новый вид или новый объект появляется плавно; внутри одного объекта
  // (реплики диалога, плитки схемы, стрелки часов) анимирует сам вид.
  const key = `${scene.view}:${scene.dialogue ?? scene.words ?? scene.table ?? scene.task ?? ""}`;
  return (
    <div className="board" data-view={scene.view}>
      <div key={key} className="board-view">
        <View topic={topic} scene={scene} />
      </div>
    </div>
  );
}

function View({ topic, scene }: { topic: Topic; scene: Scene }) {
  switch (scene.view) {
    case "dialogue":
      return <DialogueView dialogue={topic.dialogues[scene.dialogue!]} reveal={scene.reveal} focus={scene.focus} />;
    case "words":
      return <WordsView group={topic.words[scene.words!]} reveal={scene.reveal} focus={scene.focus} />;
    case "table":
      return <TableView table={topic.tables[scene.table!]} reveal={scene.reveal} focus={scene.focus} />;
    case "sentence":
      return <SentenceView rows={scene.rows ?? []} focus={scene.focus} />;
    case "task":
      return <TaskView task={topic.tasks[scene.task!]} reveal={scene.reveal} solved={scene.solved} />;
    case "clock":
      return scene.clock ? <ClockView clock={scene.clock} /> : null;
  }
}
