import { Controller, Query, Get } from '@nestjs/common';
import { BinanceService } from './binance.service';

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get()
  getTradesByPeriod(
    @Query() symbol: string,
    @Query() dateFrom: number,
    @Query() dateTo: number,
  ) {
    return this.binanceService.getTradesByPeriod({ symbol, dateFrom, dateTo });
  }
}
