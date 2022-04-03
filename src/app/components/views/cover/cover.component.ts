import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultsService } from '../../../services/results.service';
import { Pages } from '../../../models/pages';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent implements OnInit {

  constructor(
    private router: Router,
    private resultsService: ResultsService
    ) { }

  ngOnInit(): void {
  }

  // Guarda el momento de comienzo del quiz y accede a la vista de preguntas
  startQuiz(): void {
    this.resultsService.start();
    this.router.navigateByUrl(Pages.questions);
  }

}
