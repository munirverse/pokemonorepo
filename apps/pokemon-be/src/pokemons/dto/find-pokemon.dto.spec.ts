import 'reflect-metadata';
import { FindPokemonDto } from './find-pokemon.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

describe('FindPokemonDto', () => {
  // Valid Cases
  describe('happy flow scenario', () => {
    it('scenario1: should validate a DTO with all valid fields and cursor=true with lastId', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        id: '25',
        name: 'Pikachu',
        types: 'electric',
        color: 'yellow',
        shape: 'quadruped',
        page: '1',
        limit: '10',
        cursor: 'true',
        lastId: '26',
      });

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
      expect(dto).toEqual({
        id: 25,
        name: 'Pikachu',
        types: 'electric',
        color: 'yellow',
        shape: 'quadruped',
        page: 1,
        limit: 10,
        cursor: true,
        lastId: 26,
      });
    });

    it('scenario2: should validate a DTO with optional fields omitted', async () => {
      const dto = plainToInstance(FindPokemonDto, {});

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
      expect(dto).toEqual({});
    });

    it('scenario3: should validate a DTO with cursor=false and no lastId', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        cursor: 'false',
      });

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
      expect(dto).toEqual({
        cursor: false,
      });
    });

    it('scenario4: should validate a DTO with cursor=true and lastId provided', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        cursor: 'true',
        lastId: '20',
      });

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
      expect(dto).toEqual({
        cursor: true,
        lastId: 20,
      });
    });

    it('scenario5: should validate a DTO with cursor=true and all fields provided', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        id: '10',
        name: 'Bulbasaur',
        types: 'grass',
        color: 'green',
        shape: 'quadruped',
        page: '2',
        limit: '15',
        cursor: 'true',
        lastId: '30',
      });

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
      expect(dto).toEqual({
        id: 10,
        name: 'Bulbasaur',
        types: 'grass',
        color: 'green',
        shape: 'quadruped',
        page: 2,
        limit: 15,
        cursor: true,
        lastId: 30,
      });
    });

    it('scenario6: should transform string numbers to actual numbers', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        id: '30',
        page: '2',
        limit: '20',
        lastId: '40',
        cursor: true,
      });

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
      expect(dto.id).toBe(30);
      expect(dto.page).toBe(2);
      expect(dto.limit).toBe(20);
      expect(dto.lastId).toBe(40);
    });

    it('scenario7: should pass when cursor=false and lastId is not provided', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        cursor: 'false',
        // lastId is not provided
      });

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
      expect(dto).toEqual({
        cursor: false,
      });
    });
  });

  // Invalid Cases
  describe('negative flow scenario', () => {
    it('scenario8: should fail validation when id is not an integer', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        id: 'abc',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const idError = errors.find((e) => e.property === 'id');
      expect(idError).toBeDefined();
      expect(idError.constraints).toHaveProperty('isInt');
    });

    it('scenario9: should fail validation when id is less than 1', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        id: '0',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const idError = errors.find((e) => e.property === 'id');
      expect(idError).toBeDefined();
      expect(idError.constraints).toHaveProperty('min');
    });

    it('scenario10: should fail validation when name is not a string', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        name: 123,
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const nameError = errors.find((e) => e.property === 'name');
      expect(nameError).toBeDefined();
      expect(nameError.constraints).toHaveProperty('isString');
    });

    it('scenario11: should fail validation when name length is less than 1', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        name: '',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const nameError = errors.find((e) => e.property === 'name');
      expect(nameError).toBeDefined();
      expect(nameError.constraints).toHaveProperty('isLength');
    });

    it('scenario12: should fail validation when types is not a string', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        types: 123,
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const typesError = errors.find((e) => e.property === 'types');
      expect(typesError).toBeDefined();
      expect(typesError.constraints).toHaveProperty('isString');
    });

    it('scenario13: should fail validation when types length is less than 3', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        types: 'ab',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const typesError = errors.find((e) => e.property === 'types');
      expect(typesError).toBeDefined();
      expect(typesError.constraints).toHaveProperty('isLength');
    });

    it('scenario14: should fail validation when color is not a string', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        color: 123,
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const colorError = errors.find((e) => e.property === 'color');
      expect(colorError).toBeDefined();
      expect(colorError.constraints).toHaveProperty('isString');
    });

    it('scenario15: should fail validation when color length is less than 3', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        color: 'ab',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const colorError = errors.find((e) => e.property === 'color');
      expect(colorError).toBeDefined();
      expect(colorError.constraints).toHaveProperty('isLength');
    });

    it('scenario16: should fail validation when shape is not a string', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        shape: 123,
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const shapeError = errors.find((e) => e.property === 'shape');
      expect(shapeError).toBeDefined();
      expect(shapeError.constraints).toHaveProperty('isString');
    });

    it('scenario17: should fail validation when shape length is less than 3', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        shape: 'ab',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const shapeError = errors.find((e) => e.property === 'shape');
      expect(shapeError).toBeDefined();
      expect(shapeError.constraints).toHaveProperty('isLength');
    });

    it('scenario18: should fail validation when page is not an integer', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        page: 'one',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const pageError = errors.find((e) => e.property === 'page');
      expect(pageError).toBeDefined();
      expect(pageError.constraints).toHaveProperty('isInt');
    });

    it('scenario19: should fail validation when page is less than 1', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        page: '0',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const pageError = errors.find((e) => e.property === 'page');
      expect(pageError).toBeDefined();
      expect(pageError.constraints).toHaveProperty('min');
    });

    it('scenario20: should fail validation when limit is not an integer', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        limit: 'ten',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const limitError = errors.find((e) => e.property === 'limit');
      expect(limitError).toBeDefined();
      expect(limitError.constraints).toHaveProperty('isInt');
    });

    it('scenario21: should fail validation when limit is less than 1', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        limit: '0',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const limitError = errors.find((e) => e.property === 'limit');
      expect(limitError).toBeDefined();
      expect(limitError.constraints).toHaveProperty('min');
    });

    it('scenario22: should fail when cursor=true but lastId is missing', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        cursor: 'true',
        // lastId is missing
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const lastIdError = errors.find((e) => e.property === 'lastId');
      expect(lastIdError).toBeDefined();
      expect(lastIdError.constraints).toHaveProperty('IsLastIdValid');
      expect(lastIdError.constraints.IsLastIdValid).toBe(
        'lastId must be provided when cursor is true.'
      );
    });

    it('scenario23: should fail when cursor=false but lastId is provided', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        cursor: 'false',
        lastId: '10',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const lastIdError = errors.find((e) => e.property === 'lastId');
      expect(lastIdError).toBeDefined();
      expect(lastIdError.constraints).toHaveProperty('IsLastIdValid');
      expect(lastIdError.constraints.IsLastIdValid).toBe(
        'lastId must not be provided when cursor is false or not initialized.'
      );
    });

    it('scenario24: should pass when cursor=true and lastId is provided', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        cursor: 'true',
        lastId: '20',
      });

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
      expect(dto).toEqual({
        cursor: true,
        lastId: 20,
      });
    });

    it('scenario25: should fail when cursor is undefined but lastId is provided', async () => {
      const dto = plainToInstance(FindPokemonDto, {
        lastId: '15',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const lastIdError = errors.find((e) => e.property === 'lastId');
      expect(lastIdError).toBeDefined();
      expect(lastIdError.constraints).toHaveProperty('IsLastIdValid');
      expect(lastIdError.constraints.IsLastIdValid).toBe(
        'lastId must not be provided when cursor is false or not initialized.'
      );
    });
  });
});
