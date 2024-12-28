import axios from 'axios';
import expectedObjectScenario from './fixtures/get-pokemon-shapes-list/happy-flow/scenario';

describe('GET /api/pokemons/shapes', () => {
  describe('happy flow scenario', () => {
    it('should return expected result', async () => {
      // Given
      const expectedResponse = expectedObjectScenario;

      // When
      const res = await axios.get(`/api/pokemons/shapes`);

      // Then
      expect(res.status).toBe(200);

      expect(res.data).toMatchObject(expectedResponse);
    });
  });
});
