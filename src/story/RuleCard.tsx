import type { Row, Table } from "../content";
import rules from "../generated/story-rules.json";
import { Text } from "../markup";
import { SentenceView } from "../stage/Sentence";
import { TableView } from "../stage/Table";

type Rule = {
  point: string;
  read: string;
  table?: Table;
  rows?: Row[];
  focus?: number[];
};
const all = rules as unknown as Record<string, Rule>;

/**
 * Фрагмент разбора урока: тезис виден всегда, объяснение и схема — внутри.
 * В уроке внимание ведёт разбор, а здесь это справочник: нужная строка выделена,
 * но остальные не затемняются (`fresh` со всеми строками отключает затемнение).
 */
export function RuleCard({ id, open }: { id: string; open: boolean }) {
  const rule = all[id];
  return (
    <details className="moin-rule-card" open={open}>
      <summary>
        <span className="kicker">Правило</span>
        <span className="moin-rule-point">
          <Text text={rule.point} />
        </span>
      </summary>
      <p>
        <Text text={rule.read} />
      </p>
      {rule.table && (
        <TableView
          table={rule.table}
          focus={rule.focus}
          fresh={rule.table.rows.map((_, i) => i)}
        />
      )}
      {rule.rows && (
        <SentenceView
          rows={rule.rows}
          focus={rule.focus}
          fresh={rule.rows.map((_, i) => i)}
        />
      )}
    </details>
  );
}
