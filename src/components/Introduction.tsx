import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";

export default function Introduction({
  title,
  content,
}: {
  title: string;
  content: PortableTextBlock[];
}) {
  return (
    <section className="mx-auto my-50 grid max-w-(--max-section-width) grid-cols-1 gap-20 md:grid-cols-[1fr_2fr]">
      <header>
        <h2 className="uppercase">{title}</h2>
      </header>
      <div>
        <PortableText value={content} />
      </div>
    </section>
  );
}
