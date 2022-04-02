import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { ContentComponent } from './components/layout/content/content.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { CoverComponent } from './components/views/cover/cover.component';
import { QuestionsComponent } from './components/views/questions/questions.component';
import { ResultComponent } from './components/views/result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    CoverComponent,
    QuestionsComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
