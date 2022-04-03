import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from './models/pages';
import { CoverComponent } from './components/views/cover/cover.component';
import { QuestionsComponent } from './components/views/questions/questions.component';
import { ResultComponent } from './components/views/result/result.component';

const routes: Routes = [
  { 
    path: '',
    redirectTo: '/' + Pages.result,
    pathMatch: 'full'   
  },
  { 
    path: Pages.cover,
    component: CoverComponent,
  },
  { 
    path: Pages.questions,
    component: QuestionsComponent,
  },
  { 
    path: Pages.result,
    component: ResultComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
