import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  cryptoService = inject(CryptoService);

  changeCurrency(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.cryptoService.setCurrency(selectElement.value);
  }
}
