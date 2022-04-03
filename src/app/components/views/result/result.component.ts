import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  result: {score: number, totalTime: string} = {score: 0, totalTime: "00:00"};

  constructor() { }

  ngOnInit(): void {
  }

}
