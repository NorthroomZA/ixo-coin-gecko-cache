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
    try {
      return this.appService.getHello();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Get('/:denom')
  getChartData(@Param('denom') denom: string) {
    try {
      return this.appService.getChartData(denom);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Get('/:denom/price')
  getPrice(@Param('denom') denom: string) {
    try {
      return this.appService.getPrice(denom);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Get('/all')
  getChartDataAndPrices() {
    try {
      return this.appService.getChartDataAndPrices();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
