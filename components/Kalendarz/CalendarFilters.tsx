type Filters = {
  type: "all" | "warsztat" | "pokaz" | "kurs_it";
  place: "all" | string;
  ageGroup: "all" | string;
};

type Props = {
  filters: Filters;
  options: { types: string[]; places: string[]; ages: string[] };
  onChange: (next: Filters) => void;
};

export default function CalendarFilters({ filters, options, onChange }: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        justifyContent: "center",
        flexWrap: "wrap",
        padding: "0 16px 16px",
      }}
    >
      <select
        value={filters.type}
        onChange={(e) =>
          onChange({ ...filters, type: e.target.value as Filters["type"] })
        }
      >
        <option value="all">Rodzaj wydarzenia</option>
        {options.types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <select
        value={filters.place}
        onChange={(e) => onChange({ ...filters, place: e.target.value })}
      >
        <option value="all">Miejsce</option>
        {options.places.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <select
        value={filters.ageGroup}
        onChange={(e) => onChange({ ...filters, ageGroup: e.target.value })}
      >
        <option value="all">Wiek</option>
        {options.ages.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
    </div>
  );
}
