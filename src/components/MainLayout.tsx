export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="md:mt-[calc(var(--header-height)+var(--universal-padding))] mt-20">
      {children}
    </section>
  );
}
