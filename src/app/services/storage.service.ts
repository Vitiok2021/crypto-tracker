import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private key = 'cryptoFavorites';

  getFavorites() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  saveFavorites(ids: string[]) {
    localStorage.setItem(this.key, JSON.stringify(ids));
  }

  toggleFavorite(id: string) {
    let favList: string[] = this.getFavorites();

    if (favList.includes(id)) {
      favList = favList.filter((item) => item !== id);
    } else {
      favList.push(id);
    }
    this.saveFavorites(favList);
  }

  isCoinFavorite(id: string) {
    const data = this.getFavorites();
    return data.includes(id);
  }
}
