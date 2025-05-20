import { Controller, Query, Get, BadRequestException } from '@nestjs/common';
import { BinanceService } from './binance.service';

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get()
  getTradesByPeriod(
    @Query('symbol') symbol: string,
    @Query('dateFrom') dateFrom: number,
    @Query('dateTo') dateTo: number,
  ) {
    return this.binanceService.getTradesByPeriod({ symbol, dateFrom, dateTo });
  }
}
