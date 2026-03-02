// Fullwidth period used to replace ASCII periods in flat message keys,
// so next-intl doesn't treat them as namespace separators.
const SAFE_DOT = '\uff0e';

/**
 * Replace '.' with a fullwidth period in all top-level keys
 * so next-intl's IntlProvider won't reject them.
 */
export function sanitizeKeys(
  messages: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(messages)) {
    out[key.replaceAll('.', SAFE_DOT)] = value;
  }
  return out;
}

/**
 * Create a translation function that does flat key lookup on
 * the sanitized message map (keys have '.' replaced with SAFE_DOT).
 */
export function createRawT(messages: Record<string, unknown>) {
  return (key: string): string => {
    const sanitized = key.replaceAll('.', SAFE_DOT);
    if (sanitized in messages && typeof messages[sanitized] === 'string') {
      return messages[sanitized] as string;
    }
    // Fallback: try the key as-is (covers keys without periods)
    if (key in messages && typeof messages[key] === 'string') {
      return messages[key] as string;
    }
    return key;
  };
}
