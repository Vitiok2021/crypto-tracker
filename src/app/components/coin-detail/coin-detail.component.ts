import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { CoinDetail } from '../../models/coin';
import {
  CurrencyPipe,
  DecimalPipe,
  NgIf,
  UpperCasePipe,
} from '@angular/common';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-coin-detail',
  imports: [
    DecimalPipe,
    NgIf,
    CurrencyPipe,
    UpperCasePipe,
    RouterLink,
    BaseChartDirective,
  ],
  templateUrl: './coin-detail.component.html',
  styleUrl: './coin-detail.component.scss',
})
export class CoinDetailComponent implements OnInit {
  public cryptoService = inject(CryptoService);
  storage = inject(StorageService);

  coin: CoinDetail | null = null;

  isLoading: boolean = true;

  isFavorite = false;

  currencyCode = computed(() =>
    this.cryptoService.selectedCurrency().toUpperCase(),
  );

  @Input() id = '';
  ngOnInit(): void {
    console.log('Id монети з URL', this.id);
    this.isFavorite = this.storage.isCoinFavorite(this.id);
    this.cryptoService.getCoin(this.id).subscribe((data) => {
      this.coin = data;
      console.log('Повне досьє:', data);
      this.isLoading = false;
    });
    this.loadChart();
  }
  toggleLike(event: Event) {
    this.isFavorite = !this.isFavorite;
    this.storage.toggleFavorite(this.id);
  }
  // ==========Графік============================
  public lineChartType: ChartType = 'line';

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    elements: {
      point: { radius: 1 },
    },
  };
  loadChart() {
    this.cryptoService.getMarketHistory(this.id, 1).subscribe((data) => {
      const prices = data.prices;

      const priceData = prices.map((item: any[]) => item[1]);

      const timeLabels = prices.map((item: any[]) => {
        const date = new Date(item[0]);
        return date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
      });
      this.lineChartData = {
        datasets: [
          {
            data: priceData,
            label: 'Price (USD)',
            backgroundColor: 'rgba(255, 165, 0, 0.2)',
            borderColor: 'orange',
            pointBackgroundColor: 'orange',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'orange',
            fill: 'origin', // Зафарбувати область під графіком
          },
        ],
        labels: timeLabels,
      };
    });
  }
  // ============================================
}
