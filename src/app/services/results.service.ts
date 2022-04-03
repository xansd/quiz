import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  // Objeto que guarda el reultado del quiz (puntuación y tiempo empleado)
  result: {score: number, totalTime: any} = {score: 0, totalTime: undefined};
  // Momento en el que comienza el quiz en milisegundos
  startTime: any;
  // Momento en el que finaliza el quiz en milisigundos
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

  // Guarda el momento en que comienza el contador del quiz
  start(): void {
    this.startTime = new Date();
  }

  // Guarda el momento en que finaliza el contador del quiz formateado
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

  // Resetea el estado del quiz 
  reset(): void {
    this.result.score = 0;
    this.result.totalTime = undefined;
    this.startTime = undefined;
    this.endTime = undefined;
  }
}
