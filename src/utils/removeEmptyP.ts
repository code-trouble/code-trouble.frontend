export function removeEmptyParagraphs(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  Array.from(doc.querySelectorAll("p")).forEach((p) => {
    const text = p.textContent?.trim() ?? "";
    const hasNonBreaking = p.innerHTML.includes("&nbsp;");
    if (!text && !hasNonBreaking) p.remove();
  });
  return doc.body.innerHTML;
}
