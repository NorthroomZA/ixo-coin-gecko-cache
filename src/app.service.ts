import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Cache } from 'cache-manager';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import moment from 'moment';

axiosRetry(axios, { retries: 3 });

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

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

  async getChart(denom: string) {
    try {
      const res = await this.cacheManager.get(`${denom}-chart`);
      if (res) {
        return res;
      } else {
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
        await this.cacheManager.set(`${denom}-chart`, [data, sets]);
        return this.cacheManager.get(`${denom}-chart`);
      }
    } catch (error) {
      console.log(error);
      return { error: error.toString() };
    }
  }

  async getPrice(denom: string) {
    try {
      const res = await this.cacheManager.get(`${denom}-price`);
      if (res) {
        return res;
      } else {
        const temp = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${denom}`,
        );
        await this.cacheManager.set(`${denom}-price`, {
          price: temp.data.market_data.current_price.usd,
          change: temp.data.market_data.price_change_percentage_24h,
        });
        return this.cacheManager.get(`${denom}-price`);
      }
    } catch (error) {
      console.log(error);
      return { error: error.toString() };
    }
  }

  async getAllChartsAndPrices() {
    try {
      const res = await this.cacheManager.get('all');
      if (res) {
        return res;
      } else {
        const chartData: any[] = [];
        const priceData: any[] = [];
        for (const denom of this.denoms) {
          const chart = await this.getChart(denom);
          const price = await this.getPrice(denom);
          chartData.push({ [denom]: chart });
          priceData.push({ [denom]: price });
        }
        await this.cacheManager.set('all', {
          charts: chartData,
          prices: priceData,
        });
        return this.cacheManager.get('all');
      }
    } catch (error) {
      console.log(error);
      return { error: error.toString() };
    }
  }

  async getAllCharts() {
    try {
      const res = await this.cacheManager.get('allcharts');
      if (res) {
        return res;
      } else {
        const chartData: any[] = [];
        for (const denom of this.denoms) {
          const chart = await this.getChart(denom);
          chartData.push({ [denom]: chart });
        }
        await this.cacheManager.set('allcharts', chartData);
        return this.cacheManager.get('allcharts');
      }
    } catch (error) {
      console.log(error);
      return { error: error.toString() };
    }
  }

  async getAllPrices() {
    try {
      const res = await this.cacheManager.get('allprices');
      if (res) {
        return res;
      } else {
        const priceData: any[] = [];
        for (const denom of this.denoms) {
          const price = await this.getPrice(denom);
          priceData.push({ [denom]: price });
        }
        await this.cacheManager.set('allprices', priceData);
        return this.cacheManager.get('allprices');
      }
    } catch (error) {
      console.log(error);
      return { error: error.toString() };
    }
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async setCache() {
    console.log('Updating Cache');
    await this.getAllChartsAndPrices();
  }
}
