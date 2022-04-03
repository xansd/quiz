import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pages } from '../../../models/pages';
import { ShareDataService } from '../../../services/share-data.service';
import { ResultsService } from '../../../services/results.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  // Vistas
  pages = Pages;
  // Ruta activa
  activeRoute: string  = Pages.cover;
  // Subscripcion: contiene la información de ruta cuando ésta cambia
  $currentRoute: Subscription | null = null;
  // Subscripcion: contiene el número total de preguntas y la pregunta activa del quiz
  $quizState: Subscription | null = null;
  // Contador de preguntas
  currentQuestion: number = 0;
  // Total de preguntas
  totalQuestions: number = 0;

  constructor(
    private shareData: ShareDataService,
    private router: Router,
    private resultsService: ResultsService
    ) {
    this.$currentRoute = this.shareData.getData().subscribe((result) => {
      if (result.newRoute) { this.setCurrentRoute(result.newRoute); }
    });
    this.$quizState = this.shareData.getData().subscribe((result) => {
      if (result.quizUpdate) {
        this.setQuizLength(result.total);
        this.setCurrentQuestion(result.active)
      }
    });
  }

  ngOnInit(): void {
  }

  // Guarda la ruta activa
  setCurrentRoute(route: string): void {
    this.activeRoute = route;
  }

  // Guarda la pregunta activa del quiz (número)
  setCurrentQuestion(n: number): void {
    this.currentQuestion = n;
  }

  // Guarda el total de preguntas del quiz
  setQuizLength(n: number): void {
    this.totalQuestions = n;
  }

  // Cancela el quiz: vuelve a la vista del cover y resetea el estado del quiz
  cancelQuiz() {
    this.resultsService.reset();
    this.totalQuestions = 0;
    this.router.navigateByUrl(Pages.cover);
  }
  

}
