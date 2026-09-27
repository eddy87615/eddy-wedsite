import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import type { Experience } from "@/sanity/queries";

export type IntroductionType = "introduction" | "experiences";

// 用 type 當判斷依據:introduction 收一段 PortableText,
// experiences 收好幾筆經歷,TypeScript 會依 type 檢查該傳哪個 prop
type IntroductionProps =
  | { title: string; type?: "introduction"; content: PortableTextBlock[] }
  | { title: string; type: "experiences"; experiences: Experience[] };

export default function Introduction(props: IntroductionProps) {
  return (
    <section className="mx-auto grid max-w-(--max-section-width) grid-cols-1 gap-20 md:grid-cols-[1fr_2fr]">
      <header>
        <h2 className="sticky top-25 uppercase">{props.title}</h2>
      </header>
      {props.type === "experiences" ? (
        <div className="flex flex-col gap-20">
          {props.experiences.map((experience) => (
            <article key={experience.id}>
              <p className="mb-5 text-2xl uppercase">{experience.period}</p>
              <p className="text-xl uppercase">{experience.position}</p>
              <p className="mb-5 text-eddy-text-30">{experience.company}</p>
              <PortableText value={experience.description} />
            </article>
          ))}
        </div>
      ) : (
        <div>
          <PortableText value={props.content} />
        </div>
      )}
    </section>
  );
}
