import ScrollDown from "@/components/ScrollDown";

export default function PageHeader({
  title,
  verticalText,
  subText,
}: {
  title: string;
  verticalText?: string;
  subText?: string | null;
}) {
  return (
    <header className="relative min-h-[50svh]">
      <ScrollDown />
      <div className="mb-20 flex min-h-[15vh] justify-between">
        <p className="text-sm uppercase">{title}</p>
        <div className="flex flex-col items-end justify-between">
          {verticalText && (
            <p className="[writing-mode:vertical-rl]">
              <small className="tracking-[10px]">{verticalText}</small>
            </p>
          )}
          {subText && (
            <p>
              <small>{subText}</small>
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
