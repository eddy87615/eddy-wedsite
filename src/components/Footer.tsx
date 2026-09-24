"use client";
import { useTranslation } from "@/i18n/useTranslation";
import { useClock, getTimeParts } from "./LocalTime";

type FooterLink = {
  href: string;
  key: string;
};

const footerLinks: FooterLink[] = [
  { href: "https://www.linkedin.com/in/eddychen87615/", key: "linkedin" },
  { href: "https://www.instagram.com/e.d.c_0615/", key: "instagrem" },
  { href: "https://github.com/eddy87615", key: "github" },
  { href: "mailto:eddychen615@gmail.com", key: "email" },
];

export default function Footer({ timezone }: { timezone?: string | null }) {
  const t = useTranslation();
  const now = useClock();

  return (
    <footer className="flex h-(--footer-height) flex-col justify-between border-t bg-eddy-bg pt-5">
      <div className="grid grid-cols-[1fr_1.5fr] md:grid-cols-3">
        <div className="flex flex-col uppercase">
          {footerLinks.map((link, key) => (
            <a
              key={link.key}
              href={link.href}
              target="_blank"
              className="relative h-(--footer-link-height) w-fit duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-eddy-black after:transition-all after:duration-300 hover:after:w-full"
            >
              <small>{link.key}</small>
            </a>
          ))}
        </div>
        <div className="col-span-1 flex flex-col md:col-span-2 md:grid md:grid-cols-2">
          <p className="flex h-(--footer-link-height) uppercase">
            <small>
              {t.footer["footer-location"]}:{t.footer["footer-location-spot"]}
            </small>
          </p>
          <p className="flex h-(--footer-link-height) uppercase md:justify-end">
            <small>
              {t.footer["footer-local-time"]}:
              <time dateTime={now?.toISOString()}>
                {now
                  ? getTimeParts(now, timezone ?? undefined).map((part, i) =>
                      part.type === "literal" ? (
                        <span key={i} className="clock-colon">
                          {part.value}
                        </span>
                      ) : (
                        <span key={i}>{part.value}</span>
                      ),
                    )
                  : "--:--:--"}
              </time>
            </small>
          </p>
        </div>
      </div>
      <small className="text-center text-[10px]">&copy;EDDY CHEN2026</small>
    </footer>
  );
}
