import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('all')
  getAll() {
    try {
      return this.appService.getAll();
    } catch (error) {
      return error.toString();
    }
  }

  @Get('allcoins')
  getAllCoins() {
    try {
      return this.appService.getAllCoins();
    } catch (error) {
      return error.toString();
    }
  }

  @Get('coin/:symbol')
  getCoin(@Param('symbol') symbol: string) {
    try {
      return this.appService.getCoin(symbol);
    } catch (error) {
      return error.toString();
    }
  }

  @Get('coinhistory/:symbol/:startdate/:enddate/:samples')
  getCoinHistory(
    @Param('symbol') symbol: string,
    @Param('startdate') startDate: string,
    @Param('enddate') endDate: string,
    @Param('samples') samples: string,
  ) {
    try {
      return this.appService.getCoinHistory(
        symbol,
        startDate,
        endDate,
        samples,
      );
    } catch (error) {
      return error.toString();
    }
  }

  @Get('coinmarkets/:symbol')
  getCoinMarkets(@Param('symbol') symbol: string) {
    try {
      return this.appService.getCoinMarkets(symbol);
    } catch (error) {
      return error.toString();
    }
  }

  @Get('coinranges/:symbol')
  getCoinRanges(@Param('symbol') symbol: string) {
    try {
      return this.appService.getCoinRanges(symbol);
    } catch (error) {
      return error.toString();
    }
  }
}
