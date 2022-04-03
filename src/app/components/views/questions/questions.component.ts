import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionsService } from '../../../services/api/questions.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Questions } from '../../../models/questions';
import { ShareDataService } from '../../../services/share-data.service';
import { ResultsService } from '../../../services/results.service';
import { Answers } from '../../../models/answers';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { Pages } from '../../../models/pages';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  animations: [ // Fade in aplicado a la carga de respuestas
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('1.5s ease-in', 
            style({ opacity: 1 }))
          ]
        )
      ]
    )
  ]
})
export class QuestionsComponent implements OnInit, OnDestroy {

  // Esperando respuesta de la API
  isLoading: boolean = true;
  // Información del quiz obtenida de la API
  questions: Questions[] = [];
  // Respuesta seleccionada por el usuario
  selectedResponse: number = -1;
  // Una vez hecha la selección no se puede cambiar
  disableSelect: boolean = true;
  // Número actual de pregunta del quiz y su total 
  quizState: {total: number, active: number} = { total: 0, active: 1 };
  // Limpieza de subscripciones
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private apiService: QuestionsService,
    private shareData: ShareDataService,
    private resultsService: ResultsService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Llamada a la API para obtener el JSON con los datos del quiz
  getQuestions(): void {
    this.apiService.
      getQuestions().
      pipe(takeUntil(this.destroy$)).
      subscribe({
        next: (res) => {              
          this.isLoading = false; 
          this.questions = res.data;
          this.quizState.total = res.data.length; 
          this.disableSelect = false;
          this.shareQuizState();
        },
        error: (err) => { console.error(err) },
        // complete: () => { console.log('Request complete'); }
      }
    );
  }

  // Comparte el estado del quiz con el componente correspondiente
  shareQuizState(): void {
    this.shareData.setData({
      quizUpdate: true,
      total: this.quizState.total,
      active: this.quizState.active
    })

  }

  // Cuando una respuesta es seleccionada se le aplica la clase selected, se guarda la puntuación obtenida
  // y se pasa a la siguiente pregunta si la hubiese
  selectAnswer(item: Answers, index: number): any {
    if (this.disableSelect) return false;
    this.selectedResponse = index;
    this.disableSelect = true;
    this.resultsService.updateScore(item.score);
    setTimeout(() => {
      this.nextQuestion();
    }, 300);
    
  }
  
  // Pasamos a la siguiente pregunta
  nextQuestion() {
    if (this.quizState.active < this.quizState.total) {
      this.selectedResponse = -1;
      this.quizState.active ++;
      this.disableSelect = false;
      this.shareQuizState();
    } else if (this.quizState.active === this.quizState.total) {
      // Finalizamos el contador de tiempo del quiz
      this.resultsService.end(); 
      // Accedmos a la vista de resultado     
      this.router.navigateByUrl(Pages.result);
    }
  }
}
