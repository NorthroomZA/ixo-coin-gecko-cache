import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('bitcoin')
  getBitcoin() {
    return this.appService.getBitcoin();
  }

  @Get('ethereum')
  getEthereum() {
    return this.appService.getEthereum();
  }

  @Get('matic-wormhole')
  getMaticWormhole() {
    return this.appService.getMaticWormhole();
  }

  @Get('ixo')
  getIxo() {
    return this.appService.getIxo();
  }

  @Get('toucan-protocol-nature-carbon-tonne')
  getToucanProtocolNatureCarbonTonne() {
    return this.appService.getToucanProtocolNatureCarbonTonne();
  }

  @Get('toucan-protocol-base-carbon-tonne')
  getToucanProtocolBaseCarbonTonne() {
    return this.appService.getToucanProtocolBaseCarbonTonne();
  }

  @Get('cosmos')
  getCosmos() {
    return this.appService.getCosmos();
  }

  @Get('regen')
  getRegen() {
    return this.appService.getRegen();
  }

  @Get('osmosis')
  getOsmosis() {
    return this.appService.getOsmosis();
  }
}
