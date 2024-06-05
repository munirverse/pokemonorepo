type SafeJsonParseOptions = {
  throwError: boolean;
};

/**
 * Parse json in safe mode
 * @param text {string}
 * @param options {SafeJsonParseOptions}
 * @returns
 */
export default function safeJsonParse(
  text: string,
  options?: SafeJsonParseOptions
) {
  try {
    return JSON.parse(text);
  } catch (_) {
    if (options?.throwError) {
      throw new Error('Invalid json string format');
    }
    return text;
  }
}
