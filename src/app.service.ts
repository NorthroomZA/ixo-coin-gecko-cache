import { Injectable } from '@nestjs/common';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import moment from 'moment';

axiosRetry(axios, { retries: 3 });

@Injectable()
export class AppService {
  private denoms = [
    'bitcoin',
    'ethereum',
    'matic-wormhole',
    'ixo',
    'toucan-protocol-nature-carbon-tonne',
    'toucan-protocol-base-carbon-tonne',
    'cosmos',
    'regen',
    'osmosis',
  ];
  private currency = 'USD';
  private days = '1';

  getHello(): string {
    return 'API Running';
  }

  async getChartData(denom: string) {
    const temp = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${denom}/market_chart?vs_currency=${this.currency}&days=${this.days}`,
    );
    const label = [];
    const sets = [];

    const half12 = Math.ceil(temp.data.prices.length / 2);
    const slimtemp12 = temp.data.prices.slice(half12);

    const half6 = Math.ceil(slimtemp12.length / 2);
    const slimtemp6 = temp.data.prices.slice(half6);

    slimtemp6.forEach((price) => {
      label.push(moment(new Date(price[0])).toString());
      sets.push(price[1]);
    });

    const data = {
      labels: label,
      datasets: [
        {
          data: sets,
          color: (opacity = 0) => `#39C3E6`, // optional
        },
      ],
    };

    return [data, sets];
  }

  async getPrice(denom: string) {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${denom}`,
    );
    return {
      price: res.data.market_data.current_price.usd,
      change: res.data.market_data.price_change_percentage_24h,
    };
  }

  async getChartDataAndPrices() {
    const chartData: any[] = [];
    const priceData: any[] = [];
    this.denoms.forEach(async (denom) => {
      const chart = await this.getChartData(denom);
      const price = await this.getPrice(denom);
      chartData.push({ denom: chart });
      priceData.push({ denom: price });
    });
    return { charts: chartData, prices: priceData };
  }
}
