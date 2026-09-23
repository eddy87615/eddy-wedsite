export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mt-20 md:mt-[calc(var(--header-height)+var(--universal-padding))]">
      {children}
    </section>
  );
}
