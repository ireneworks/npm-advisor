import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function calculateDayFromNow(date: string | Date) {
  if (!date) return "";

  return dayjs(String(date)).fromNow();
}
