import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get('/health')
  @ApiOperation({ summary: 'Check Health' })
  @ApiResponse({
    status: 200,
    description: 'Server health is OK',
    example: { message: 'OK' },
  })
  @HttpCode(200)
  getData() {
    return { message: 'OK' };
  }
}
