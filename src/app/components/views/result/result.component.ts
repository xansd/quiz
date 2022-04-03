import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../../services/results.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  result: {score: number, totalTime: string} = {score: 0, totalTime: "00:00"};

  constructor(
    private resultsService: ResultsService
  ) { }

  ngOnInit(): void {
    this.getQuizState();
  }

  // Obtiene el estado del quiz (resultado y tiempo empleado)
  getQuizState() {
    this.result = this.resultsService.getResult();
  }

}
