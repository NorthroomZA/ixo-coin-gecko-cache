const axios = require('axios');
import { writeFileSync } from 'fs';

const denoms = [
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
const currency = 'USD';
const days = '1';

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const startCache = async () => {
  while (true) {
    for (const denom of denoms) {
      try {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${denom}/market_chart?vs_currency=${currency}&days=${days}`,
        );
        writeFileSync(
          `${__dirname}/../../src/cache/${denom}.json`,
          JSON.stringify(res.data),
        );
      } catch (error) {
        console.log(error);
      }
    }
    await sleep(300000);
  }
};
