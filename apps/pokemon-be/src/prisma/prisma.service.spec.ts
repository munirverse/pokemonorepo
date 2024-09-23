// prisma.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { PrismaClient } from '@prisma/client';

describe('PrismaService', () => {
  let service: PrismaService;
  let prismaClient: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
    prismaClient = service; // Since PrismaService extends PrismaClient
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should call $connect', async () => {
      const connectSpy = jest
        .spyOn(prismaClient, '$connect')
        .mockResolvedValueOnce(undefined);

      await service.onModuleInit();

      expect(connectSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle $connect errors', async () => {
      const error = new Error('Connection failed');
      jest.spyOn(prismaClient, '$connect').mockRejectedValueOnce(error);

      await expect(service.onModuleInit()).rejects.toThrow('Connection failed');
    });
  });

  describe('onModuleDestroy', () => {
    it('should call $disconnect', async () => {
      const disconnectSpy = jest
        .spyOn(prismaClient, '$disconnect')
        .mockResolvedValueOnce(undefined);

      await service.onModuleDestroy();

      expect(disconnectSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle $disconnect errors', async () => {
      const error = new Error('Disconnection failed');
      jest.spyOn(prismaClient, '$disconnect').mockRejectedValueOnce(error);

      await expect(service.onModuleDestroy()).rejects.toThrow(
        'Disconnection failed'
      );
    });
  });

  // Optional: Test other PrismaClient methods if you extend PrismaService further
});
