/**
 * Prompt Injection Guard
 * Scans LLM responses for potential system prompt leakage or restricted keywords.
 */
export const RESTRICTED_KEYWORDS = [
  "system prompt",
  "ignore all previous instructions",
  "you are an ai",
  "as an ai model",
  "my instructions",
  "the developer",
  "prompt leakage",
];

export function scanForLeaks(text: string): boolean {
  const normalized = text.toLowerCase();
  return RESTRICTED_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

export function sanitizeResponse(text: string): string {
  if (scanForLeaks(text)) {
    console.warn("Prompt injection leak detected in response. Sanitizing...");
    return "Mm, I was just thinking about something else... what were we saying?";
  }
  return text;
}
