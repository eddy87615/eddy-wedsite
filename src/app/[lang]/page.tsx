import Home from "@/components/Home";
import { defaultLocale, type Locale } from "@/i18n/translation";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <>
      <Home lang={(lang as Locale) ?? defaultLocale} />
    </>
  );
}
