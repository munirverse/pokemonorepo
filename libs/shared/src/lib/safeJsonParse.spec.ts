import safeJsonParse from './safeJsonParse';
describe('safeJsonParse unit test', () => {
  it('should return expected json when given valid json string format', () => {
    // Given
    const validJsonString =
      '{"name":"alex","gender":"male","visitedPlaces":["US","UK","Canada"]}';

    const expectedJson = {
      name: 'alex',
      gender: 'male',
      visitedPlaces: ['US', 'UK', 'Canada'],
    };

    // When & Then
    expect(safeJsonParse(validJsonString)).toStrictEqual(expectedJson);
  });
  it('should return expected value when given invanlid json string format', () => {
    // Given
    const invalidJsonString = 'hello world!';

    // When & Then
    expect(safeJsonParse(invalidJsonString)).toBe(invalidJsonString);
    expect(() => {
      safeJsonParse(invalidJsonString, { throwError: true });
    }).toThrow('Invalid json string format');
  });
});
