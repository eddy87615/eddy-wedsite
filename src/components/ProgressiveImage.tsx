"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const STAGE_INTERVAL = 450; // 每個馬賽克階段之間隔多久(毫秒)才推進到下一階段

export default function ProgressiveImage({
  src,
  alt,
  mosaicStages,
  widthClassName = "w-full",
}: {
  src: string;
  alt: string;
  mosaicStages: string[]; // 由粗到細排列,例如 [8px 版, 24px 版, 64px 版]
  widthClassName?: string; // 只控制寬度,高度交給 aspect-square 自己算,響應式就寫 "w-full sm:w-[500px]" 這種
}) {
  const [stage, setStage] = useState(0); // 目前顯示到第幾階段的馬賽克
  const [imageLoaded, setImageLoaded] = useState(false); // 原圖是否已經下載完成

  // 是不是已經播到最後一階了,直接從 stage 算出來,不用另外存一個 state
  const stagesFinished = stage >= mosaicStages.length - 1;

  // 馬賽克一定會照順序播完,不管原圖多快下載完成都不會被打斷
  useEffect(() => {
    if (stagesFinished) return;

    const id = setTimeout(() => setStage((s) => s + 1), STAGE_INTERVAL);
    return () => clearTimeout(id);
  }, [stage, stagesFinished]);

  // 兩個條件都成立才淡入清晰圖:圖真的載完了,而且馬賽克也演完了
  const revealed = imageLoaded && stagesFinished;

  return (
    <div className={`relative aspect-square overflow-hidden ${widthClassName}`}>
      {/* 只有一個 img,src 隨著 stage 換成下一張,不用疊很多層做淡入淡出 */}
      <img
        src={mosaicStages[stage]}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover [image-rendering:pixelated] ${
          revealed ? "opacity-0" : "opacity-100"
        }`}
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority
        // 圖片可能在 onLoad 監聽器接上去之前就已經載完(快取、preload 都會這樣),
        // 用 ref 在掛載當下直接檢查一次,不要只靠事件
        ref={(img) => {
          if (img?.complete) setImageLoaded(true);
        }}
        onLoad={() => setImageLoaded(true)}
        className={`object-cover ${revealed ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
