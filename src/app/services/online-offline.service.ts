import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnlineOfflineService {
  private statusConexoa$ = new Subject<boolean>();

  constructor() {
    window.addEventListener('online', () => {
      this.atualizaStatusConexao();
    });
    window.addEventListener('offline', () => {
      this.atualizaStatusConexao();
    });
  }

  get IsOnline(): boolean {
    return !!window.navigator.onLine;
  }

  get statusConexao(): Observable<boolean> {
    return this.statusConexoa$.asObservable();
  }

  atualizaStatusConexao() {
    this.statusConexoa$.next(this.IsOnline);
  }
}
