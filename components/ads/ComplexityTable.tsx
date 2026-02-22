import { MathInline } from "@/components/Math";

type ComplexityRow = {
  operation: string;
  averageTime: string;
  extraSpace: string;
};

type ComplexityTableProps = {
  rows: ComplexityRow[];
};

export default function ComplexityTable({ rows }: ComplexityTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate [border-spacing:0_8px] text-left text-sm text-[color:var(--color-muted)]">
        <thead>
          <tr className="text-white/80">
            <th className="py-1 pr-4">Operation</th>
            <th className="py-1 pr-4">Average Time</th>
            <th className="py-1">Extra Space</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.operation}>
              <td className="py-1 pr-4 text-white font-semibold">{row.operation}</td>
              <td className="py-1 pr-4">
                <MathInline tex={row.averageTime} className="math-inline !text-white" />
              </td>
              <td className="py-1">
                <MathInline tex={row.extraSpace} className="math-inline !text-white" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

