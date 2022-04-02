import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pages } from '../../../models/pages';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  questionCounter: number | null = null;
  location: string | null = null;
  pages = Pages;

  constructor(
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.location = this.getRoute();
  }

  getRoute(): string {
    return this.router.url;
  }

}
