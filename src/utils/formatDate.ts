// src/utils/formatDate.ts
export function formatDate(input: string | Date): string {
  const date = typeof input === "string" ? new Date(input) : input;
  if (isNaN(date.getTime())) {
    return "";
  }
  const formatted = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
  const parts = formatted.split(" ");
  const day = parts[0];
  const monthRaw = parts[2];
  const year = parts[4];
  const monthClean =
    monthRaw.charAt(monthRaw.length - 1) === "."
      ? monthRaw.slice(0, -1)
      : monthRaw;
  const month =
    monthClean.charAt(0).toUpperCase() + monthClean.slice(1);
  return `${day} ${month}, ${year}`;
}
