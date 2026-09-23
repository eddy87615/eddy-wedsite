export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="pt-20 pb-4 sm:pb-5">{children}</main>;
}
