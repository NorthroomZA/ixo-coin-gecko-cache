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

  async getChartData(denom: string) {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${denom}/market_chart?vs_currency=${currency}&days=${days}`,
    );
    return res.data;
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
}
