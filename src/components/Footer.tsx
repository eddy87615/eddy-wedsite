"use client";
import { useTranslation } from "@/i18n/useTranslation";
import { useClock, getTimeParts } from "./LocalTime";

export default function Footer() {
  const t = useTranslation();
  const now = useClock();

  return (
    <footer className="flex h-(--footer-height) flex-col justify-between border-t pt-5">
      <div className="grid grid-cols-2 md:grid-cols-3">
        <div className="flex flex-col uppercase">
          <a className="h-(--footer-link-height) w-fit">
            <small>linkedin</small>
          </a>
          <a className="h-(--footer-link-height) w-fit">
            <small>instagram</small>
          </a>
          <a className="h-(--footer-link-height) w-fit">
            <small>github</small>
          </a>
          <a className="h-(--footer-link-height) w-fit">
            <small>e-mail</small>
          </a>
        </div>
        <div className="col-span-1 flex flex-col md:col-span-2 md:grid md:grid-cols-2">
          <p className="flex h-(--footer-link-height) uppercase">
            <small>
              {t.footer["footer-location"]}:{t.footer["footer-location-spot"]}
            </small>
          </p>
          <p className="flex h-(--footer-link-height) uppercase min-md:justify-end">
            <small>
              {t.footer["footer-local-time"]}:
              <time dateTime={now?.toISOString()}>
                {now
                  ? getTimeParts(now).map((part, i) =>
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
