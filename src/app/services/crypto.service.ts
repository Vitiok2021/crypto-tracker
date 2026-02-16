import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Coin, CoinDetail } from '../models/coin';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.coingecko.com/api/v3/coins/markets';

  selectedCurrency = signal<string>('usd');
  constructor() {}

  setCurrency(currency: string) {
    this.selectedCurrency.set(currency);
  }

  getCoins(page: number = 1) {
    const currency = this.selectedCurrency();
    const url = `${this.baseUrl}?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=${page}&sparkline=false`;
    return this.http.get<Coin[]>(url);
  }
  getFavoriteCoins(ids: string[]) {
    const idsString = ids.join(',');
    const url = `${this.baseUrl}?vs_currency=usd&ids=${idsString}&order=market_cap_desc&sparkline=false`;
    return this.http.get<Coin[]>(url);
  }
  getCoin(coinId: string) {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    return this.http.get<CoinDetail>(url);
  }
  getMarketHistory(coinId: string, days: number = 1) {
    const currency = this.selectedCurrency();
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`;
    return this.http.get<any>(url);
  }
}
