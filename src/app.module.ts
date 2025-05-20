import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BinanceModule } from './binance/binance.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BinanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
