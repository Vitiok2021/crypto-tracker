import { Component, effect, inject, OnInit } from '@angular/core';
import { CoinCardComponent } from '../coin-card/coin-card.component';
import { CryptoService } from '../../services/crypto.service';
import { Coin } from '../../models/coin';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coins-list',
  imports: [CoinCardComponent, FormsModule],
  templateUrl: './coins-list.component.html',
  styleUrl: './coins-list.component.scss',
  standalone: true,
})
export class CoinsListComponent implements OnInit {
  private cryptoService = inject(CryptoService);
  coins: Coin[] = [];
  filteredCoins: Coin[] = [];
  searchText = '';

  isLoading: boolean = true;

  errorMessage: string = '';

  currentPage = 1;

  constructor() {
    effect(() => {
      const currentCurrency = this.cryptoService.selectedCurrency();
      this.coins = [];
      this.filteredCoins = [];
      this.currentPage = 1;
      this.isLoading = true;
      this.loadCoin();
    });
  }

  ngOnInit(): void {
    // this.loadCoin();
  }

  loadCoin() {
    this.cryptoService.getCoins(this.currentPage).subscribe({
      next: (data) => {
        this.coins = [...this.coins, ...data];
        this.filteredCoins = this.coins;
        console.log(data);
        this.isLoading = false;
        this.errorMessage = '';
      },
      error: (err) => {
        console.log('Помилка API', err);
        this.errorMessage = 'Щось пішло не так. Спробуйте пізніше';
        this.isLoading = false;
      },
    });
  }
  loadMore() {
    this.currentPage++;
    this.loadCoin();
  }
  handleSearch() {
    this.filteredCoins = this.coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(this.searchText.toLowerCase())
      );
    });
  }
}
