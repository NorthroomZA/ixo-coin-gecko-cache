import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  getHello(): string {
    return 'Hello IXO!';
  }

  async getAllCoins() {
    const result = await fetch(
      'https://coincodex.com/apps/coincodex/cache/all_coins.json',
    );
    const body = await result.json();
    return body;
  }

  async getCoin(symbol: string) {
    const result = await fetch(
      `https://coincodex.com/api/coincodex/get_coin/${symbol}`,
    );
    const body = await result.json();
    return body;
  }

  async getCoinHistory(
    symbol: string,
    startDate: string,
    endDate: string,
    samples: string,
  ) {
    const result = await fetch(
      `https://coincodex.com/api/coincodex/get_coin_history/${symbol}/${startDate}/${endDate}/${samples}`,
    );
    const body = await result.json();
    return body;
  }

  async getCoinMarkets(symbol: string) {
    const result = await fetch(
      `https://coincodex.com/api/exchange/get_markets_by_coin/${symbol}/`,
    );
    const body = await result.json();
    return body;
  }

  async getCoinRanges(symbol: string) {
    const result = await fetch(
      `https://coincodex.com/api/coincodex/get_coin_ranges/${symbol}/`,
    );
    const body = await result.json();
    return body;
  }
}
