export function decodeBase64(content: string) {
  if (!content) return "";

  const cleaned = content.replace(/\n/g, "");

  try {
    const decoded = decodeURIComponent(
      Array.prototype.map
        .call(
          atob(cleaned),
          (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2),
        )
        .join(""),
    );
    return decoded;
  } catch (e) {
    console.error("Decoding Error GitHub Base64:", e);
    return "";
  }
}
