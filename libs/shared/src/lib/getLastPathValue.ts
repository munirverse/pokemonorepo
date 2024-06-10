/**
 * Get last value from url path
 * @param url
 * @returns {string|null}
 */
export default function getLastPathValue(url: string): string | null {
  try {
    // Create a new URL object from the provided string
    const parsedUrl = new URL(url);

    // Get the last segment of the pathname
    const pathSegments = parsedUrl.pathname
      .split('/')
      .filter((segment) => segment.length > 0);
    const lastPathSegment =
      pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : '';

    // Include the query and fragment if they exist
    const query = parsedUrl.search;
    const fragment = parsedUrl.hash;

    return lastPathSegment + query + fragment || null;
  } catch (_) {
    throw new Error('Invalid url');
  }
}
