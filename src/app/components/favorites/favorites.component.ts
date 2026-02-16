import { Component, inject, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { CryptoService } from '../../services/crypto.service';
import { Coin } from '../../models/coin';
import { CoinCardComponent } from '../coin-card/coin-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  imports: [CoinCardComponent, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  private storageService = inject(StorageService);
  private cryptoService = inject(CryptoService);

  coins: Coin[] = [];

  isLoading = true;

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites() {
    const ids = this.storageService.getFavorites();

    if (ids.length === 0) {
      this.isLoading = false;
      return;
    }
    this.cryptoService.getFavoriteCoins(ids).subscribe({
      next: (data) => {
        this.coins = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Помилка', err);
        this.isLoading = false;
      },
    });
  }
  removeCoin(id: string) {
    this.coins = this.coins.filter((coin) => coin.id !== id);
  }
}
