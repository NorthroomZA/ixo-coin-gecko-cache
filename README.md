<div align=center>

![Logo](/logo.png)

# ixo-coincodex-cache

Credit to [CoinCodex](https://coincodex.com/) for their API

![GitHub contributors](https://img.shields.io/github/contributors/ixofoundation/ixo-coin-gecko-cache?style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/ixofoundation/ixo-coin-gecko-cache?style=for-the-badge) ![Lines of code](https://img.shields.io/tokei/lines/github/ixofoundation/ixo-coin-gecko-cache?style=for-the-badge) ![Docker Pulls](https://img.shields.io/docker/pulls/northroomza/ixo-coin-gecko-cache?style=for-the-badge) ![Twitter Follow](https://img.shields.io/twitter/follow/ixoworld?style=for-the-badge)

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

</div>

## Routes

Parameter and Return Objects from [CoinCodex](https://coincodex.com/page/api/)

- GET `/`
  - Returns:
    ```
    Hello IXO!
    ```
- GET `/allcoins`
  - Returns:
    ```
    Array:
        Object:
            symbol: our unique internal id for the coin
            display_symbol: what we display as the symbol to the user (not unique)
            name: coin name
            shortname: unique slug for the coin (used in urls)
            aliases: other names for this coin
            last_price_usd: last coin price in usd
            last_update: unix timestamp of last update
            market_cap_rank: coin ranking by market cap
            market_cap_usd: coin market cap in usd
            price_change_<time>_percent: price change in percent in the last <time>
            supply: circulating supply
            trading_since: date on which the coin started trading
            volume_24_usd: 24 hour volume in usd
            volume_rank: ranking by 24 hour volume
    ```
- GET `/coin/:symbol`
  - Parameters:
    ```
    symbol
        our unique internal id for the coin
    ```
  - Returns:
    ```
    Object:
        description: html short description
        ico_price: coin start price in usd
        price_high_24_usd: highest price in the last 24 hours in usd
        price_low_24_usd: lowest price in the last 24 hours in usd
        release_date: YYYY-MM-DD or null of the coins release date
        social: Object:
            [key]: url
        today_open: today's open price in usd
        website: url
        whitepaper: url
    ```
- GET `/coinhistory/:symbol/:startdate/:enddate/:samples`
  - Parameters:
    ```
    symbol
        our unique internal id for the coin
    start_date
        YYYY-MM-DD format of start date in range
    end_date
        YYYY-MM-DD format of end date in range
    samples
        how many samples (approximately) must be returned for each coin
    ```
  - Returns:
    ```
    Object:
    [our unique internal id for the coin]: Array:
        Array:
            0: timestamp
            1: coin price in usd
            2: 24hr volume in usd
    ```
- GET `/coinmarkets/:symbol`
  - Parameters:
    ```
    symbol
        our unique internal id for the coin
    ```
  - Returns:
    ```
    Array:
        Object:
            name: exchange name
                shortname: unique exchange slug
                share: % volume share of this exchange
                volume: 24hr volume in usd
                value: Object:
                    USD: Object:
                value: coin price in usd on this exchange
                volume: 24hr volume in usd on this exchange
            markets: Array:
                [our unique internal id for the coin]
    ```
- GET `/coinranges/:symbol`
  - Parameters:
    ```
    symbol
        our unique internal id for the coin
    ```
  - Returns:
    ```
    Object:
        [our unique internal id for the coin]: Object:
            range_name: Object:
                min: minimum_value in usd
                max: maximum_value in usd
    ```
