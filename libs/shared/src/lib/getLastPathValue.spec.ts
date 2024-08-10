import getLastPathValue from './getLastPathValue';

describe('getLastPathValue unit test', () => {
  it('should return the last segment even if there are trailing slashes or not', () => {
    // Given
    const url1 = 'https://example.com/path/to/resource';
    const url2 = 'https://example.com/path/to/resource/';

    // When
    const result1 = getLastPathValue(url1);
    const result2 = getLastPathValue(url2);

    // Then
    expect(result1).toBe('resource');
    expect(result2).toBe('resource');
  });
  it('should return the last segment of a valid URL path with query and fragment', () => {
    // Given
    const url1 = 'https://example.com/path/to/resource?query=param#fragment';
    const url2 = 'https://example.com/path/to/resource?query=param';
    const url3 = 'https://example.com/path/to/resource#fragment';

    // When
    const result1 = getLastPathValue(url1);
    const result2 = getLastPathValue(url2);
    const result3 = getLastPathValue(url3);

    // Then
    expect(result1).toBe('resource?query=param#fragment');
    expect(result2).toBe('resource?query=param');
    expect(result3).toBe('resource#fragment');
  });

  it('should return null for an empty path or a URL with no path segments', () => {
    // Given
    const url1 = 'https://example.com/';
    const url2 = 'https://example.com';

    // When
    const result1 = getLastPathValue(url1);
    const result2 = getLastPathValue(url2);

    // Then
    expect(result1).toBeNull();
    expect(result2).toBeNull();
  });

  it('should throw error for an invalid URL', () => {
    // Given
    const url = 'invalid_url';

    // When & Then
    expect(() => {
      getLastPathValue(url);
    }).toThrow('Invalid url');
  });
});
