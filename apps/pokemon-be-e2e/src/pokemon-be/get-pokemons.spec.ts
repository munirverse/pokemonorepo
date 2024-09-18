import axios from 'axios';
import expectedObjectScenario1 from './fixtures/get-pokemon/happy-flow/scenario1';
import expectedObjectScenario2 from './fixtures/get-pokemon/happy-flow/scenario2';
import expectedObjectScenario3 from './fixtures/get-pokemon/happy-flow/scenario3';
import expectedObjectScenario4 from './fixtures/get-pokemon/happy-flow/scenario4';

describe('GET /api/pokemons', () => {
  describe('happy flow scenario', () => {
    it('scenario1: should return expected result when no query params init', async () => {
      // Given
      const expectedResponse = expectedObjectScenario1;

      // When
      const res = await axios.get(`/api/pokemons`);

      // Then
      expect(res.status).toBe(200);

      expect(res.data).toMatchObject(expectedResponse);
    });

    it('scenario2: should return expected result when pagination params init', async () => {
      // Given
      const expectedResponse = expectedObjectScenario2;

      // When
      const res = await axios.get(`/api/pokemons?page=2&limit=5`);

      const res2 = await axios.get(
        `/api/pokemons?page=${
          expectedObjectScenario2.pagination.pageTotal + 1
        }&limit=5`
      );

      // Then
      expect(res.status).toBe(200);

      expect(res.data).toMatchObject(expectedResponse);

      expect(res2.status).toBe(200);

      expect(res2.data).toMatchObject({
        pagination: {
          ...expectedResponse.pagination,
          pageSize: 0,
          pageNumber: expectedObjectScenario2.pagination.pageTotal + 1,
        },
        data: [],
      });
    });

    it('scenario3: should return expected result when cursor params init', async () => {
      // Given
      const expectedResponse = expectedObjectScenario3;

      // When
      const res = await axios.get(
        `/api/pokemons?cursor=true&limit=5&lastId=10272`
      );

      const lastId = res.data.data[res.data.data.length - 1].id;

      const res2 = await axios.get(
        `/api/pokemons?cursor=true&limit=5&lastId=${lastId}`
      );

      // Then
      expect(res.status).toBe(200);

      expect(res.data).toMatchObject(expectedResponse);

      expect(res2.status).toBe(200);

      expect(res2.data).toMatchObject({
        cursor: {
          lastId,
          hasNextPage: false,
        },
        data: [],
      });
    });

    it('scenario4: should return expected result when filters params init', async () => {
      // Given
      const expectedResponse = expectedObjectScenario4;

      // When
      const res = await axios.get(
        `/api/pokemons?name=a&color=white&shape=quadruped&types=dragon`
      );

      // Then
      expect(res.status).toBe(200);

      expect(res.data).toMatchObject(expectedResponse);
    });
  });
});
