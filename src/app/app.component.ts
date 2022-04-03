import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ShareDataService } from './services/share-data.service';
import { ResultsService } from './services/results.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // Título de la aplicación
  title = 'quiz';

  constructor(
    private router: Router,
    private shareData: ShareDataService,
    private resultsService: ResultsService
    ) {
    // Detecta un cambio en la ruta
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.setCurrentRoute(this.router.url);
      }
    });
  }

  ngOnInit(): void {
    // Si refrescamos la página el quiz se reinicia
    this.resultsService.reset();
    this.router.navigate([''])
  }

  // Informa al componente correspondiente de que la ruta ha cambiado indicando su nuevo valor
  setCurrentRoute(route: string): void {
    this.shareData.setData({
      newRoute: route
    })
  }

}
