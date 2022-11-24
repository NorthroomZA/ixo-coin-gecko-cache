import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':denom')
  getChart(@Param('denom') denom: string) {
    return this.appService.getChart(denom);
  }

  @Get(':denom/price')
  getPrice(@Param('denom') denom: string) {
    return this.appService.getPrice(denom);
  }

  @Get('all')
  getAllChartsPrices() {
    return this.appService.getAllChartsAndPrices();
  }

  @Get('allcharts')
  getAllCharts() {
    return this.appService.getAllCharts();
  }

  @Get('allprices')
  getAllPrices() {
    return this.appService.getAllPrices();
  }
}
