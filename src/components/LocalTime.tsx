"use client";
import { useSyncExternalStore } from "react";

// 「快照」本身,兩次呼叫 getSnapshot() 之間必須是同一個值,
// 只有計時器真的觸發時才准許它變。
let cachedTimestamp = Date.now();

function subscribe(callback: () => void) {
  const id = setInterval(() => {
    cachedTimestamp = Date.now(); // 這裡才真正更新快照
    callback(); // 通知 React:資料變了,去重新讀一次 getSnapshot()
  }, 1000);
  return () => clearInterval(id);
}

function getSnapshot() {
  return cachedTimestamp; // 沒被上面更新過的話,永遠回傳同一個值
}

function getServerSnapshot() {
  return 0;
}

export function useClock() {
  const timestamp = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  return timestamp === 0 ? null : new Date(timestamp);
}

// 沒指定 timeZone 時,Intl 會自己 fallback 成訪客瀏覽器所在的時區,
// 所以 aboutMe 裡的 timezone 欄位還沒填之前,行為跟原本一樣不會壞掉。
function getTimeFormatter(timeZone?: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone,
  });
}

// 把時間拆成一段一段(時、:、分、:、秒),
// 這樣冒號才能單獨挑出來套動畫,而不是整串黏在一起的文字。
export function getTimeParts(date: Date, timeZone?: string) {
  return getTimeFormatter(timeZone).formatToParts(date);
}
