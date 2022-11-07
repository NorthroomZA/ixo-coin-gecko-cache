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

  @Get('/:denom')
  getChartData(@Param('denom') denom: string) {
    return this.appService.getChartData(denom);
  }

  @Get('/:denom/price')
  getPrice(@Param('denom') denom: string) {
    return this.appService.getPrice(denom);
  }
}
