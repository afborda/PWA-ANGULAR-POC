import { Seguro } from './../models/Seguro';
import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class SeguroService extends BaseService<Seguro> {
  constructor(protected injector: Injector) {
    super(injector, 'seguros', 'http://localhost:3333/seguros');
  }
}
