import { Injectable } from '@nestjs/common';
import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });

const currency = 'USD';
const days = '1';

@Injectable()
export class AppService {
  getHello(): string {
    return 'API Running';
  }

  async getBitcoin() {
    const denom = 'bitcoin';
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${denom}/market_chart?vs_currency=${currency}&days=${days}`,
    );
    return res.data;
  }

  async getEthereum() {
    const denom = 'ethereum';
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${denom}/market_chart?vs_currency=${currency}&days=${days}`,
    );
    return res.data;
  }

  async getMaticWormhole() {
    const denom = 'matic-wormhole';
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${denom}/market_chart?vs_currency=${currency}&days=${days}`,
    );
    return res.data;
  }

  async getIxo() {
    const denom = 'ixo';
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${denom}/market_chart?vs_currency=${currency}&days=${days}`,
    );
    return res.data;
  }

  async getToucanProtocolNatureCarbonTonne() {
    const denom = 'toucan-protocol-nature-carbon-tonne';
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${denom}/market_chart?vs_currency=${currency}&days=${days}`,
    );
    return res.data;
  }

  async getToucanProtocolBaseCarbonTonne() {
    const denom = 'toucan-protocol-base-carbon-tonne';
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${denom}/market_chart?vs_currency=${currency}&days=${days}`,
    );
    return res.data;
  }

  async getCosmos() {
    const denom = 'cosmos';
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${denom}/market_chart?vs_currency=${currency}&days=${days}`,
    );
    return res.data;
  }

  async getRegen() {
    const denom = 'regen';
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${denom}/market_chart?vs_currency=${currency}&days=${days}`,
    );
    return res.data;
  }

  async getOsmosis() {
    const denom = 'osmosis';
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${denom}/market_chart?vs_currency=${currency}&days=${days}`,
    );
    return res.data;
  }
}
