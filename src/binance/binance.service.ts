import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BinanceService {
  constructor(private readonly httpsService: HttpService) {}

  async getTradesByPeriod({
    symbol,
    dateFrom,
    dateTo,
  }: {
    symbol: string;
    dateFrom: number;
    dateTo: number;
  }) {
    try {
      const url = `${process.env.BINANCE_BASE_URL}/api/v3/aggTrades?symbol=${symbol}&startTime=${dateFrom}&endTime=${dateTo}&limit=10`;

      return firstValueFrom(this.httpsService.get(url));
    } catch (err) {
      console.log(err?.message || err);
    }
  }
}
