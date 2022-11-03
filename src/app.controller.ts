import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'bitcoin' })
  getBitcoin() {
    return this.appService.getBitcoin();
  }

  @MessagePattern({ cmd: 'ethereum' })
  getEthereum() {
    return this.appService.getEthereum();
  }

  @MessagePattern({ cmd: 'matic-wormhole' })
  getMaticWormhole() {
    return this.appService.getMaticWormhole();
  }

  @MessagePattern({ cmd: 'ixo' })
  getIxo() {
    return this.appService.getIxo();
  }

  @MessagePattern({ cmd: 'toucan-protocol-nature-carbon-tonne' })
  getToucanProtocolNatureCarbonTonne() {
    return this.appService.getToucanProtocolNatureCarbonTonne();
  }

  @MessagePattern({ cmd: 'toucan-protocol-base-carbon-tonne' })
  getToucanProtocolBaseCarbonTonne() {
    return this.appService.getToucanProtocolBaseCarbonTonne();
  }

  @MessagePattern({ cmd: 'cosmos' })
  getCosmos() {
    return this.appService.getCosmos();
  }

  @MessagePattern({ cmd: 'regen' })
  getRegen() {
    return this.appService.getRegen();
  }

  @MessagePattern({ cmd: 'osmosis' })
  getOsmosis() {
    return this.appService.getOsmosis();
  }
}
