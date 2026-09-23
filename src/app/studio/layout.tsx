// /studio 跟網站主體(app/[lang])完全獨立,不需要 i18n、字型或全站樣式,
// 所以它自己就是一個獨立的 root layout(必須自己包含 <html> 和 <body>)。
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
