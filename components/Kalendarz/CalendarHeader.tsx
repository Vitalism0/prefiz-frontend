type Props = {
  monthLabel: string;
  onPrev: () => void;
  onNext: () => void;
};

export default function CalendarHeader({ monthLabel, onPrev, onNext }: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <button onClick={onPrev} type="button">
        ←
      </button>
      <h1 style={{ margin: 0, fontSize: 22 }}>{monthLabel}</h1>
      <button onClick={onNext} type="button">
        →
      </button>
    </div>
  );
}
