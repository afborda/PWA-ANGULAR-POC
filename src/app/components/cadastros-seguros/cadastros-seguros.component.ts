import { SeguroService } from './../../services/seguro.service';
import { MarcaCarroService } from './../../services/marca-carro.service';
import { Seguro } from './../../models/Seguro';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MarcaCarro } from 'src/app/models/MarcaCarro';

@Component({
  selector: 'app-cadastros-seguros',
  templateUrl: './cadastros-seguros.component.html',
  styleUrls: ['./cadastros-seguros.component.scss'],
})
export class CadastrosSegurosComponent implements OnInit {
  public seguro = new Seguro();
  public marcasCarro$: Observable<MarcaCarro[]>;

  constructor(
    private marcaCarroService: MarcaCarroService,
    private seguroService: SeguroService
  ) {}

  ngOnInit(): void {
    this.marcasCarro$ = this.marcaCarroService.getMarcas();
  }

  enviarNotificacao() {
    console.log('Enviado');
  }
  adicionar() {
    this.seguro.id = this.seguro.placaCarro;
    this.seguroService.cadastrar(this.seguro);
  }
}
