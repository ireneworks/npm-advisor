export function decodeBase64(content: string) {
  if (!content) return "";
  const cleaned = content.replace(/\n/g, "");
  return typeof window !== "undefined"
    ? atob(cleaned)
    : Buffer.from(cleaned, "base64").toString("utf-8");
}
