import axios from 'axios';
import expectedObjectScenario from './fixtures/get-pokemon-types-list/happy-flow/scenario';

describe('GET /api/pokemons/types', () => {
  describe('happy flow scenario', () => {
    it('should return expected result', async () => {
      // Given
      const expectedResponse = expectedObjectScenario;

      // When
      const res = await axios.get(`/api/pokemons/types`);

      // Then
      expect(res.status).toBe(200);

      expect(res.data).toMatchObject(expectedResponse);
    });
  });
});
