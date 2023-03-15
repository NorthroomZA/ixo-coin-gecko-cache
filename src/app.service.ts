import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  private symbols = [
    'atom',
    'bct10',
    'btc',
    'eth',
    'ixo',
    'matic',
    'nct1',
    'osmo',
    'regen',
  ];

  private async setAllCache() {
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
      .toISOString()
      .split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    const charts: any[] = [];
    const prices: any[] = [];
    for (const symbol of this.symbols) {
      const coinData = await this.getCoin(symbol);
      const price = {
        price: coinData.last_price_usd,
        change: coinData.price_change_1D_percent,
      };
      prices.push({ [coinData.shortname]: price });
      const chartData = await this.getCoinHistory(
        symbol,
        yesterday,
        today,
        '1',
      );
      const chart = chartData[symbol.toUpperCase()].map((e) => {
        const time = new Date(+e[0] * 1000).toISOString();
        const price = e[1];
        return { [time]: price };
      });
      charts.push({ [coinData.shortname]: chart });
    }
    const all = {
      charts,
      prices,
    };
    await this.cache.set('all', all);
  }

  getHello(): string {
    return 'Hello IXO!';
  }

  async getAll() {
    return this.cache.get('all');
  }

  async getAllCoins() {
    const response = await fetch(
      'https://coincodex.com/apps/coincodex/cache/all_coins.json',
    );
    const body = await response.json();
    return body;
  }

  async getCoin(symbol: string) {
    const response = await fetch(
      `https://coincodex.com/api/coincodex/get_coin/${symbol}`,
    );
    const body = await response.json();
    return body;
  }

  async getCoinHistory(
    symbol: string,
    startDate: string,
    endDate: string,
    samples: string,
  ) {
    const response = await fetch(
      `https://coincodex.com/api/coincodex/get_coin_history/${symbol}/${startDate}/${endDate}/${samples}`,
    );
    const body = await response.json();
    return body;
  }

  async getCoinMarkets(symbol: string) {
    const response = await fetch(
      `https://coincodex.com/api/exchange/get_markets_by_coin/${symbol}/`,
    );
    const body = await response.json();
    return body;
  }

  async getCoinRanges(symbol: string) {
    const response = await fetch(
      `https://coincodex.com/api/coincodex/get_coin_ranges/${symbol}/`,
    );
    const body = await response.json();
    return body;
  }

  @Interval(60000)
  async updateCache() {
    try {
      console.log('Updating Cache');
      console.time('Cache Update Took');
      await this.setAllCache();
      console.timeEnd('Cache Update Took');
    } catch (error) {
      console.log(error);
    }
  }
}
