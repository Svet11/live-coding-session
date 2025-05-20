import {BadRequestException, Injectable} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BinanceService {
  constructor(private readonly httpsService: HttpService) {}

  async getTradesByPeriod({
    symbol,
    dateFrom,
    dateTo,
    limit = 50,
  }: {
    symbol: string;
    dateFrom?: number;
    dateTo?: number;
    limit?: number;
  }) {
    try {
      if (!symbol) {
        throw new Error('Symbol is not provided');
      }
      const startDateQuery = dateFrom ? `&startTime=${dateFrom}`: '';
      const endDateQuery = dateTo ? `&endTime=${dateTo}`: '';
      const limitQuery = limit ? `&limit=${limit}` : '';
      const queryParams = startDateQuery + endDateQuery + limitQuery;
      const url = `${process.env.BINANCE_BASE_URL}/api/v3/aggTrades?symbol=${symbol}${queryParams}`;

      const result = await firstValueFrom(this.httpsService.get(url));
      return result.data;
    } catch (err) {
      console.log(err?.message);
      throw new BadRequestException(err?.message || err);
    }
  }

  async analyzeSymbolChanges({
     symbol,
     dateFrom,
     dateTo
  }:
 {
     symbol: string;
     dateFrom: number;
     dateTo: number
 }
  ): Promise<string>{
    let result = 'No enough data to analyze!';
    try {
      const symbolDataForPeriod = await this.getTradesByPeriod({ symbol, dateFrom, dateTo });

      if (symbolDataForPeriod.length < 2) return result;

      const { p: symbolStartingPrice } = symbolDataForPeriod.pop();
      const { p: symbolLastPrice } = symbolDataForPeriod.shift();

      const isGrowing = symbolLastPrice > symbolStartingPrice;
      const differencePoints = Math.abs(symbolLastPrice - symbolStartingPrice);

      if (isGrowing) {
        return `Symbol increased by ${differencePoints} points`;
      } else if (symbolLastPrice === symbolStartingPrice) {
        return `Symbol did not changed for this period`;
      }

      return `Symbol dencreased by ${differencePoints} points`;
    } catch (err) {
      console.log(err?.message)
      return result;
    }
  }
}
