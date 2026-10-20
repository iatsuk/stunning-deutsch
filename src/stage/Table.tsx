import { isDimmed, type Table } from "../content";
import { De, Text } from "../markup";

export function TableView({ table, reveal, focus, fresh }: { table: Table; reveal?: number; focus?: number[]; fresh?: number[] }) {
  const shown = reveal ?? table.rows.length;
  const cell = (text: string, column: number) => (table.ruCols.includes(column) ? <Text text={text} /> : <De text={text} />);
  return (
    <div className="gtable-view">
      <header className="view-head">
        <div>
          <De className="view-title" text={table.title} />
          <div className="view-sub">{table.ru}</div>
        </div>
      </header>
      <div className="gtable-wrap">
        <table className="gtable">
          <thead>
            <tr>
              {table.head.map((head, j) => (
                <th key={j}>{cell(head, j)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr
                key={i}
                data-hidden={i >= shown || undefined}
                data-focus={focus?.includes(i) || undefined}
                data-dim={isDimmed(i, focus, fresh) || undefined}
              >
                {row.map((text, j) => (
                  <td key={j} data-ru={table.ruCols.includes(j) || undefined}>
                    {cell(text, j)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note && (
        <p className="view-note">
          <Text text={table.note} />
        </p>
      )}
    </div>
  );
}
