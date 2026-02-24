import KalendarzClient from "./KalendarzClient";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ month?: string }>;
};

export default async function CalendarPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = (await searchParams) ?? {};

  return <KalendarzClient locale={locale} initialMonth={sp.month} />;
}
