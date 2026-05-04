const LEADING_ARTIFACT_PATTERN = /^\s*0(?=\s*<)/;
const BLOCKED_BLOCK_PATTERN =
  /<(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi;
const BLOCKED_SINGLE_TAG_PATTERN = /<(link|meta)[^>]*\/?>/gi;
const EVENT_HANDLER_ATTR_PATTERN =
  /\s+on[a-z]+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi;
const JAVASCRIPT_URL_ATTR_PATTERN =
  /\s+(href|src)\s*=\s*("javascript:[^"]*"|'javascript:[^']*')/gi;
const EMPTY_PARAGRAPH_PATTERN =
  /<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi;

const decodeHtmlEntities = (value: string) =>
  value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");

export const sanitizeRichTextHtml = (value: string) => {
  if (!value) {
    return "";
  }

  return value
    .replace(LEADING_ARTIFACT_PATTERN, "")
    .replace(BLOCKED_BLOCK_PATTERN, "")
    .replace(BLOCKED_SINGLE_TAG_PATTERN, "")
    .replace(EVENT_HANDLER_ATTR_PATTERN, "")
    .replace(JAVASCRIPT_URL_ATTR_PATTERN, "")
    .replace(/&nbsp;/gi, " ")
    .trim();
};

export const normalizeRichTextHtml = (value: string) => {
  const sanitized = sanitizeRichTextHtml(value);

  if (!sanitized) {
    return "";
  }

  const withoutEdgeFillers = sanitized
    .replace(new RegExp(`^(?:${EMPTY_PARAGRAPH_PATTERN.source})+`, "i"), "")
    .replace(new RegExp(`(?:${EMPTY_PARAGRAPH_PATTERN.source})+$`, "i"), "")
    .trim();

  return withoutEdgeFillers || sanitized;
};

export const extractPlainTextFromRichText = (value: string) => {
  const normalized = normalizeRichTextHtml(value);

  if (!normalized) {
    return "";
  }

  return decodeHtmlEntities(
    normalized
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|li|blockquote|h1|h2|h3|h4|h5|h6)>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
};
