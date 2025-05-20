import {BadRequestException, Injectable} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import e from "express";

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
      console.log(err?.message || err);
      throw new BadRequestException(err?.message || err);
    }
  }
}
