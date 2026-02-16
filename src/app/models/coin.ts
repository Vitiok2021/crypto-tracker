export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
  ath: number;
  last_updated: string;
}
export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  image?: {
    large: string;
    small: string;
    thumb: string;
  };
  description?: {
    en: string;
  };
  market_data?: {
    current_price?: {
      usd: number;
    };
    market_cap_rank: number;
    price_change_percentage_24h: number;
    market_cap?: {
      usd: number;
    };
    total_volume?: {
      usd: number;
    };
    high_24h?: {
      usd: number;
    };
    low_24h?: {
      usd: number;
    };
  };
}
