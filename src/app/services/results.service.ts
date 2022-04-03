import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  result: {score: number, totalTime: any} = {score: 0, totalTime: undefined};
  startTime: any;
  endTime: any;

  constructor() { }

  // Actualiza la puntuación obtenida en las preguntas
  updateScore(n: number) {
    this.result.score += n;
  }

  // Retorna los resultados del quiz
  getResult(): {score: number, totalTime: any} {
    return this.result;
  }

  // Comienza el contador del quiz
  start(): void {
    this.startTime = new Date();
  }

  // Finaliza el contador del quiz
  end(): void {
    this.endTime = new Date();
    this.result.totalTime = (this.endTime - this.startTime);
    this.formatTime();
  }

  // Recibe tiempo en milsegundos y retorna un string en formato "mm:ss"
  formatTime(): string {
    this.result.totalTime =  Math.floor(this.result.totalTime/(1000*60))%60 + ":" + Math.floor(this.result.totalTime/1000)%60;
    this.result.totalTime = this.result.totalTime.replace(/(^|\D)(\d)(?!\d)/g, '$10$2');
    return this.result.totalTime;
  }

  // Resetea el estado del quiz (contador y puntuaciones)
  reset(): void {
    this.result.score = 0;
    this.result.totalTime = undefined;
    this.startTime = undefined;
    this.endTime = undefined;
  }
}
