import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'API Running';
  }

  getBitcoin() {
    return readFileSync('./src/cache/bitcoin.json');
  }

  getEthereum() {
    return readFileSync('./src/cache/ethereum.json');
  }

  getMaticWormhole() {
    return readFileSync('./src/cache/matic-wormhole.json');
  }

  getIxo() {
    return readFileSync('./src/cache/ixo.json');
  }

  getToucanProtocolNatureCarbonTonne() {
    return readFileSync('./src/cache/toucan-protocol-nature-carbon-tonne.json');
  }

  getToucanProtocolBaseCarbonTonne() {
    return readFileSync('./src/cache/toucan-protocol-base-carbon-tonne.json');
  }

  getCosmos() {
    return readFileSync('./src/cache/cosmos.json');
  }

  getRegen() {
    return readFileSync('./src/cache/regen.json');
  }

  getOsmosis() {
    return readFileSync('./src/cache/osmosis.json');
  }
}
