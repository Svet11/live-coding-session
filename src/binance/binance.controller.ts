import { Controller, Query, Get, BadRequestException } from '@nestjs/common';
import { BinanceService } from './binance.service';

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get()
  getTradesByPeriod(
    @Query('symbol') symbol: string,
    @Query('dateFrom') dateFrom?: number,
    @Query('dateTo') dateTo?: number,
    @Query('limit') limit?: number,
  ) {
    return this.binanceService.getTradesByPeriod({ symbol, dateFrom, dateTo, limit });
  }

  @Get('analyze')
  getAnalyzedDataForSymbolByperiod(
      @Query('symbol') symbol: string,
      @Query('dateFrom') dateFrom: number,
      @Query('dateTo') dateTo: number,
  ) {
    return this.binanceService.analyzeSymbolChanges({ symbol, dateFrom, dateTo });
  }
}
