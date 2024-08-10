import fetch, { extractUrlComponents } from './fetch';

describe('extractUrlComppents unit test', () => {
  it('should return value with given url format', () => {
    // Given
    const url = 'https://socials.com/users?me=hello#section1';
    const expectedHostName = 'socials.com';
    const expectedPort = 443;
    const expectedPath = '/users?me=hello#section1';
    const invalidUrl = 'hello world!';

    // When
    const extractUrl = extractUrlComponents(url);

    // Then
    expect(extractUrl.hostname).toBe(expectedHostName);
    expect(extractUrl.port).toBe(expectedPort);
    expect(extractUrl.path).toBe(expectedPath);
    expect(() => {
      extractUrlComponents(invalidUrl);
    }).toThrow('Invalid url');
  });
});

describe('fetch unit test', () => {
  it('should throw error when get invalid url format', async () => {
    // Given
    const undefinedUrl = undefined;
    const emptyUrl = '';
    const invalidUrl = 'hello world!';

    // When & Then
    await expect(fetch(undefinedUrl)).rejects.toThrow('Url must exists');
    await expect(fetch(emptyUrl)).rejects.toThrow('Url must exists');
    await expect(fetch(invalidUrl)).rejects.toThrow('Invalid url');
  });

  it('should fetch correct response', async () => {
    // Given
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1';
    const expectedResponse = {
      count: 1302,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=1&limit=1',
      previous: null,
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
      ],
    };

    // When
    const getPokemon = await fetch(apiUrl);

    // Then
    expect(getPokemon).toStrictEqual(expectedResponse);
  });
});
