"use client";
import { useTranslation } from "@/i18n/useTranslation";
import { useClock, getTimeParts } from "./LocalTime";

export default function Footer() {
  const t = useTranslation();
  const now = useClock();

  return (
    <footer className="h-(--footer-height) border-t pt-5 flex flex-col justify-between">
      <div className="grid md:grid-cols-3 grid-cols-2">
        <div className="uppercase flex flex-col">
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
        <div className="col-span-1 md:col-span-2 flex flex-col md:grid md:grid-cols-2">
          <p className="flex uppercase h-(--footer-link-height)">
            <small>
              {t.footer["footer-location"]}:{t.footer["footer-location-spot"]}
            </small>
          </p>
          <p className="flex min-md:justify-end uppercase h-(--footer-link-height)">
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
